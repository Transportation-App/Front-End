import "../../../styles/tempTicketScreen.css";
import { FormControlLabel, Checkbox } from "@mui/material";

interface PropsType {
  isRes: boolean;
  count: number;
  selectedSeats: number[];
  onSeatChange: (updatedSeats: number[]) => void;
}

const Seat: React.FC<PropsType> = ({
  isRes,
  count,
  selectedSeats,
  onSeatChange,
}) => {
  const seatNumber = count + 1;
  const isChecked = selectedSeats.includes(seatNumber);

  const handleClickEvent = (event: any) => {
    const { checked, value } = event.target;
    const seatValue = Number(value);

    if (checked) {
      const updatedSeats = [...selectedSeats, seatValue];
      onSeatChange(updatedSeats);
    } else {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatValue);
      onSeatChange(updatedSeats);
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={String(seatNumber)}
          onChange={handleClickEvent}
          value={seatNumber}
          sx={{ display: "none" }}
          checked={isChecked}
          disabled={isRes}
        />
      }
      label={seatNumber}
      disabled={isRes}
      sx={{
        margin: 0,
        padding: 0,
        width: "40px",
        height: "44px",
        fontSize: "14px",
        fontWeight: "bold",
        color: isRes ? "white" : isChecked ? "white" : "#000",
        backgroundColor: isRes
          ? "red"
          : isChecked
          ? "rgb(0, 169, 0)"
          : "#e0e0e0",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: isRes ? "not-allowed" : "pointer",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: isRes
            ? "red"
            : isChecked
            ? "rgb(0, 169, 0)"
            : "#737373",
          color: "white",
        },
        "&:disabled": {
          color: "white",
          backgroundColor: "red",
        },
      }}
      htmlFor={String(seatNumber)}
    />
  );
};

export default Seat;
