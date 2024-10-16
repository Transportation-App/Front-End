import { useEffect, useState } from "react";
import { TicketType } from "../../types/TicketType";
import BusLayout from "../BusLayout/BusLayout";
import SeatTicketDetails from "../SeatTicketDetails/SeatTicketDetails";
import Map from "../Map/Map";
import "../../styles/tempTicketScreen.css";
import useFetch from "../../hooks/useFetch";
import useWebSocket from "../../hooks/useWebSocket";

const TicketScreen = () => {
  const { messages, sendMessage, socket } = useWebSocket(
    process.env.REACT_APP_WS_ENDPOINT || "no key"
  );

  const itinID: string = "itin2";
  const [tickets, setTickets] = useState<TicketType>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const { data, loading, error } = useFetch<TicketType>(
    process.env.REACT_APP_GET_BUS_ENDPOINT || "no key",
    "POST",
    JSON.stringify({ id: itinID })
  );

  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data]);

  const handleSelectedSeats = (updatedSeats: number[]) => {
    setSelectedSeats(updatedSeats);
  };

  if (loading) {
    return <>loading</>;
  }

  if (!tickets) {
    return <>No ticket data available</>;
  }

  return (
    <div className="MainContainer">
      <BusLayout
        seats={tickets?.bus.seats}
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
