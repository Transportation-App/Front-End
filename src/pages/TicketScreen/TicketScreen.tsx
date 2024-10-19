import { useEffect, useState } from "react";
import { TicketType } from "../../types/TicketType";
import BusLayout from "../BusLayout/BusLayout";
import SeatTicketDetails from "../SeatTicketDetails/SeatTicketDetails";
import Map from "../Map/Map";
import "../../styles/tempTicketScreen.css";
import useFetch from "../../hooks/useFetch";
import useWebSocket from "../../hooks/useWebSocket";
import { SeatType } from "../../types/SeatType";

const TicketScreen = () => {
  const itinID: string = "2";
  const { sendMessage, socket } = useWebSocket(
    process.env.REACT_APP_WS_ENDPOINT || "no key",
    itinID
  );

  const [tickets, setTickets] = useState<TicketType | undefined>(undefined);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const { data, loading, error } = useFetch<TicketType>(
    process.env.REACT_APP_GET_BUS_ENDPOINT || "no key",
    "POST",
    JSON.stringify({ id: itinID })
  );

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "GET_SEATS_REAL_TIME",
        data: { itinID, selectedSeats: [] },
      });
      sendMessage(message);
    }
  }, [socket, itinID, sendMessage]);

  useEffect(() => {
    const handleMessage = (message: string) => {
      try {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === "SEATS_UPDATE") {
          const updatedSeats = parsedMessage.data;

          setTickets((prevTickets) => {
            if (!prevTickets) return undefined;

            const updatedBus = {
              ...prevTickets.bus,
              seats: updatedSeats.map((updatedSeat: SeatType) => {
                return { ...updatedSeat };
              }),
            };

            return {
              ...prevTickets,
              bus: updatedBus,
            };
          });
        }
      } catch (error) {
        console.error("Error parsing incoming message:", error);
      }
    };

    if (socket) {
      socket.addEventListener("message", (event) => handleMessage(event.data));
    }
    return () => {
      if (socket) {
        socket.removeEventListener("message", (event) =>
          handleMessage(event.data)
        );
      }
    };
  }, [socket]);

  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data]);

  const handleSelectedSeats = (updatedSeats: number[]) => {
    setSelectedSeats(updatedSeats);
  };

  if (loading) {
    return <>Loading...</>;
  }

  if (!tickets) {
    return <>No ticket data available.</>;
  }

  return (
    <div className="MainContainer">
      <BusLayout
        seats={tickets.bus.seats}
        selectedSeats={selectedSeats}
        onClick={handleSelectedSeats}
      />

      <div className="ticketMap">
        <SeatTicketDetails
          selectedSeats={selectedSeats}
          initPrice={tickets.initPrice}
          itinerary={{
            itinID: itinID,
            DeptHour: tickets.DeptHour,
            ArrHour: tickets.ArrHour,
            Duration: tickets.Duration,
            DeptCity: tickets.DeptCity,
            ArrCity: tickets.ArrCity,
            DeptDate: "23/10/2023",
            ArrDate: "23/10/2023",
          }}
        />
        <Map />
      </div>
    </div>
  );
};

export default TicketScreen;
