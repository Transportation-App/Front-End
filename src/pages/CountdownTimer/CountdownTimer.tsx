import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

interface TimerProps {
  expiryTime: number;
  open: boolean;
  handleClose: () => void;
}

const CountdownTimer: React.FC<TimerProps> = ({
  expiryTime,
  open,
  handleClose,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(expiryTime - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = expiryTime - Date.now();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(intervalId);
        handleClose();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryTime, handleClose]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="info">
          <AlertTitle>Reservation Timer</AlertTitle>
          Reservation expires in{" "}
          <strong>
            {minutes}:{seconds < 10 ? "0" : ""}
            {seconds} minutes
          </strong>
        </Alert>
      </Snackbar>
    </>
  );
};

export default CountdownTimer;
