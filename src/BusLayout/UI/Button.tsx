import { useState } from "react";
import "../../styles/tempTicketScreen.css";
import { url } from "inspector";

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
  className={`seat ${props.isSelected && props.isPressed ? "pressed" : ""}`}
  value={props.number + 1}
  onClick={handleClick}
  style={{
    backgroundColor: props.isRes ? "#c62828" : "#e0e0e0",
    border: "none",
    borderRadius: "50%",
    color: "#000",
    cursor: props.isRes ? "not-allowed" : "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "bold",
    height: "50px",
    width: "50px",
    transition: "background-color 0.3s ease",
  }}
  disabled={props.isRes}
>
  {props.number + 1}
</button>

  );
  
};

export default Button;
