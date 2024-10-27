import { Box, Typography, Divider, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

type SeatFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ticketDiscount: number;
  ticketType: string;
  ticketPrice: number;
};

type paymentInfo = {
  itinID: string;
  totalPrice: number;
  formData: Record<number, SeatFormData>;
};

const Decline: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();

  const { data, loading, error } = useFetch<{ id: string; seats: string[] }>(
    process.env.REACT_APP_CACHE_GET_ENDPOINT || "no key",
    "POST",
    JSON.stringify({ sessionID: sessionId, getSeats: true })
  );

  useEffect(() => {
    const unlockSeats = async () => {
      if (data) {
        try {
          const res = await fetch(
            process.env.REACT_APP_PUT_BUS_ENDPOINT || "no key",
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "PUT",
              body: JSON.stringify({
                itinID: data.id,
                selectedSeats: data.seats,
                lockType: "open",
              }),
            }
          );

          if (res.ok) {
            const result = await res.json();
            if (result.success) {
              console.log(result);
              navigate("/");
            }
          } else {
            console.error("Failed to unlock seats:", res.statusText);
          }
        } catch (error) {
          console.error("Error in unlocking seats:", error);
        }
      }
    };

    unlockSeats();
  }, [data, navigate]);

  return <>{loading}</>;
};

export default Decline;
