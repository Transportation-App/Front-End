import "../../styles/tempTicketScreen.css";
import { SeatType } from "../../types/SeatType";
import React from "react";
import Seat from "./UI/Seat";

interface PropsType {
  seats: SeatType[];
  selectedSeats: number[];
  onClick: (number: number[]) => void;
}

const BusLayout: React.FC<PropsType> = ({ seats, selectedSeats, onClick }) => {
  const seatsPerRow = 2;
  const rows = Math.floor(seats.length / seatsPerRow);
  let count = 0;

  const handleSeatChange = (updatedSeats: number[]) => {
    onClick(updatedSeats);
  };

  const createSeats = () => {
    const tempSeats = [];

    for (let i = 0; i < seatsPerRow; i++) {
      tempSeats.push(
        <Seat
          status={seats[count].status}
          key={count}
          count={count}
          selectedSeats={selectedSeats}
          onSeatChange={handleSeatChange}
        />
      );
      count++;
    }

    return tempSeats;
  };

  const createRows = () => {
    const tempRows = [];

    for (let i = 0; i < rows / 2; i++) {
      tempRows.push(
        <div key={Math.random()} className="row">
          {createSeats()}

          {i !== Math.floor(rows / 2) - 1 ? (
            <div key={i} className="aisle"></div>
          ) : (
            <Seat
              status={seats[count].status}
              count={count++}
              selectedSeats={selectedSeats}
              onSeatChange={handleSeatChange}
            />
          )}

          {i === Math.floor(rows / 4) ? (
            <>
              <div key={Math.random()} className="aisle-door"></div>
              <div key={Math.random()} className="aisle-door"></div>
            </>
          ) : (
            createSeats()
          )}
        </div>
      );
      if (i === Math.floor(rows / 4)) count += 2;
    }

    return tempRows;
  };

  return (
    <div className="bus-layout">
      <h2 className="text-gray-500 text-opacity-80 font-semibold italic text-2xl text-center pt-[10px]">
        Επιλέξτε Θέση
      </h2>
      <main className="bus-container">{createRows()}</main>
    </div>
  );
};

export default BusLayout;
