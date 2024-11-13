import "../../../styles/tempTicketScreen.css";
import { FormControlLabel, Checkbox } from "@mui/material";

interface PropsType {
  status: string;
  count: number;
  selectedSeats: number[];
  onSeatChange: (updatedSeats: number[]) => void;
}

const Seat: React.FC<PropsType> = ({
  status,
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

  const isLocked = status === "locked";
  const isTempLocked = status === "tempLocked";

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={String(seatNumber)}
          onChange={handleClickEvent}
          value={seatNumber}
          sx={{ display: "none" }}
          checked={isChecked}
          disabled={isLocked || isTempLocked}
        />
      }
      label={seatNumber}
      disabled={isLocked || isTempLocked}
      sx={{
        margin: 0,
        padding: 0,
        width: "40px",
        height: "44px",
        fontSize: "14px",
        fontWeight: "bold",
        ".MuiFormControlLabel-label.Mui-disabled": { color: "white" },
        color: isChecked ? "white" : "#000",
        backgroundColor: isLocked
          ? "red"
          : isTempLocked
          ? "orange"
          : isChecked
          ? "rgb(0, 169, 0)"
          : "#e0e0e0",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: isLocked || isTempLocked ? "not-allowed !important" : "pointer",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: isLocked
            ? "red"
            : isTempLocked
            ? "orange"
            : isChecked
            ? "rgb(0, 169, 0)"
            : "#737373",
          color: "white",
        },
        "&:disabled": {
          color: "white",
          backgroundColor: isLocked ? "red" : isTempLocked ? "orange" : "",
        },
      }}
      htmlFor={String(seatNumber)}
    />
  );
};

export default Seat;
