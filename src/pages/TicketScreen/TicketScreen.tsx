import { useState } from "react";
import data from "../../Data/TicketData";
import { SeatType } from "../../types/SeatType";
import { TicketType } from "../../types/TicketType";
import BusLayout from "../BusLayout/BusLayout";
import SeatTicketDetails from "../SeatTicketDetails/SeatTicketDetails";
import Map from "../Map/Map";
import "../../styles/tempTicketScreen.css";
import { useNavigate } from "react-router-dom";

const TicketScreen = () => {
  const itinerary: TicketType = data.itinerary;

  const navigate = useNavigate();

  const [seats, setSeats] = useState<SeatType[]>(itinerary.bus.seats);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [ticketPrice, setTicketPrice] = useState<string>("");

  const onClickHandler = (number: number) => {
    setSelectedSeat(number);
    setIsSelected(true);
  };

  const confirmRes = (ticketPrice: string) => {
    alert(
      `Reservation Completed!\nYour ticket price is: ${parseFloat(
        ticketPrice
      ).toFixed(2)}$\nYour seat is: ${selectedSeat}`
    );
    navigate("/Home");

    if (selectedSeat) {
      const updatedSeats = [...seats];
      updatedSeats[selectedSeat - 1] = {
        number: updatedSeats[selectedSeat - 1].number,
        isRes: true,
      };
      setSeats(updatedSeats);
    }

    handleReset();
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
            DeptHour: "12:30 PM",
            ArrHour: "16:30 PM",
            Duration: "3 Hours",
            DeptCity: "Thessalonikh",
            ArrCity: "A8hna",
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
