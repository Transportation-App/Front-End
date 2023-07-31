import { useState } from "react";
import data from "../../Data/TicketData";
import { SeatType } from "../../types/SeatType";
import { TicketType } from "../../types/TicketType";
import BusLayout from "../BusLayout/BusLayout";
import SeatTicketDetails from "../SeatTicketDetails/SeatTicketDetails";
import Map from "../Map/Map";
import "../../styles/tempTicketScreen.css"

const TicketScreen = () => {
    const itinerary: TicketType = data.itinerary;
  
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
      <div className="screen">
        <div className="header-container">
        </div>
  
        <div className="main-content">
          <BusLayout
            seats={seats}
            selectedSeat={selectedSeat}
            onClick={onClickHandler}
          />
        </div>
  
        <SeatTicketDetails
          selectedSeat={selectedSeat}
          initPrice={itinerary.initPrice}
          ticketPrice={ticketPrice}
          setTicketPrice={setTicketPrice}
          isSelected={isSelected}
          confirmRes={confirmRes} 
          itinerary={{
            DeptHour: "",
            ArrHour: "",
            Duration: "",
            DeptCity: "",
            ArrCity: "",
            DeptDate: "",
            ArrDate: ""
          }}      />
        <Map />
      </div>
    );
  };
  
export default TicketScreen;