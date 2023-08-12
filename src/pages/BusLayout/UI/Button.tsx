import { useState } from "react";
import "../../../styles/tempTicketScreen.css";

interface PropsType {
  isPressed: boolean;
  number: number;
  isRes: boolean;
  onClick: (event: any) => void;
  setIsPressed: (flag: boolean) => void;
  isSelected: boolean;
}

const Button = (props: PropsType) => {
  const handleClick = (event: any) => {
    props.onClick(event);
  };

  return (
    <button
      className={`${
        props.isSelected && props.isPressed ? "seat pressed" : "seat"
      }`}
      value={props.number + 1}
      onClick={handleClick}
      style={{
        cursor: props.isRes ? "not-allowed" : "pointer",
      }}
      disabled={props.isRes}
    >
      {props.number + 1}
    </button>
  );
};

export default Button;
