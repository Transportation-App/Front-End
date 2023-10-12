import { useState } from "react";
import { SeatType } from "../../types/SeatType";
import { TicketType } from "../../types/TicketType";
import BusLayout from "../BusLayout/BusLayout";
import SeatTicketDetails from "../SeatTicketDetails/SeatTicketDetails";
import Map from "../Map/Map";
import "../../styles/tempTicketScreen.css";
import { useLocation, useNavigate } from "react-router-dom";

const TicketScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const itinerary: TicketType = location.state.data;
  const itinID: string = location.state.itinID;

  const [seats, setSeats] = useState<SeatType[]>(itinerary.bus.seats);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [ticketPrice, setTicketPrice] = useState<string>("");

  const onClickHandler = (number: number) => {
    setSelectedSeat(number);
    setIsSelected(true);
  };

  const confirmRes = async (ticketPrice: string) => {
    const response = await fetch("http://localhost:3000/bus", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itinID: itinID, seatRes: selectedSeat }),
    });

    if (response.ok) {
      alert(
        `Reservation Completed!\nYour ticket price is: ${parseFloat(
          ticketPrice
        ).toFixed(2)}$\nYour seat is: ${selectedSeat}`
      );
      handleReset();
      navigate("/Home");
    } else {
      console.error("Error sending data");
    }
  };

  const handleReset = () => {
    setIsSelected(false);
    setTicketPrice("");
  };

  return (
    <div className="MainContainer">
      <BusLayout
        seats={seats}
        selectedSeat={selectedSeat}
        onClick={onClickHandler}
      />

      <div className="ticketMap">
        <SeatTicketDetails
          selectedSeat={selectedSeat}
          initPrice={itinerary.initPrice}
          ticketPrice={ticketPrice}
          setTicketPrice={setTicketPrice}
          isSelected={isSelected}
          confirmRes={confirmRes}
          itinerary={{
            DeptHour: itinerary.DeptHour,
            ArrHour: itinerary.ArrHour,
            Duration: itinerary.Duration,
            DeptCity: itinerary.DeptCity,
            ArrCity: itinerary.ArrCity,
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
