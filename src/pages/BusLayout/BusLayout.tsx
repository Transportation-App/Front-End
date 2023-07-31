
import "../../styles/tempTicketScreen.css";
import { SeatType } from "../../types/SeatType";
import Button from "./UI/Button";
import { useState } from "react";

interface PropsType {
  seats: SeatType[];
  selectedSeat: number | null;
  onClick: (number: number) => void;
}

const BusLayout = (props: PropsType) => {
  const seatsPerRow = 2;
  const rows = Math.floor(props.seats.length / seatsPerRow);
  let count = props.seats.length - 1;
  const [isPressed, setIsPressed] = useState(false);

  const handleClickEvent = (event: any) => {
    if (!event.currentTarget) return;

    const button = event.currentTarget;

    if (isPressed && button.value !== props.selectedSeat) {
      props.onClick(parseInt(button.value));
      return;
    }

    setIsPressed(!isPressed);
    props.onClick(parseInt(button.value));
  };

  const createSeats = () => {
    const tempSeats = [];

    for (let i = 0; i < seatsPerRow; i++) {
      tempSeats.push(
        <Button
          isPressed={isPressed}
          key={count}
          number={count}
          isRes={props.seats[count].isRes}
          onClick={handleClickEvent}
          setIsPressed={setIsPressed}
          isSelected={props.selectedSeat === count + 1}
        />
      );
      count--;
    }

    return tempSeats;
  };

  const createRows = () => {
    const tempRows = [];

    for (let i = 0; i < rows / 2; i++) {
      tempRows.push(
        <div key={Math.random()} className="row">
          {i == Math.floor(rows / 4) ? (
            <>
              <div key={Math.random()} className="aisle"></div>
              <div key={Math.random()} className="aisle"></div>
            </>
          ) : (
            createSeats()
          )}

          {i != 0 ? (
            <div key={i} className="aisle"></div>
          ) : (
            <Button
              isPressed={isPressed}
              key={count--}
              number={count}
              isRes={props.seats[count].isRes}
              onClick={handleClickEvent}
              setIsPressed={setIsPressed}
              isSelected={props.selectedSeat === count + 1}
            />
          )}
          {createSeats()}
        </div>
      );
      if (i == Math.floor(rows / 4)) count -= 2;
    }

    return tempRows;
  };

  return (
    <div
      className="bus-layout">
      {createRows()}
    </div>
  );
};

export default BusLayout;
