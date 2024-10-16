import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TimerProps {
  expiryTime: number;
}

const CountdownTimer: React.FC<TimerProps> = ({ expiryTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(expiryTime - Date.now());
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = expiryTime - Date.now();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(intervalId);
        setOpen(false);
        alert("Reservation expired!");
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryTime]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const handleClose = () => {
    setOpen(false);
  };

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
