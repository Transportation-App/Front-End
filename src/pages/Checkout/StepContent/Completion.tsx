import { Box, Typography, Divider, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  totalPrice: number;
  formData: Record<number, SeatFormData>;
};

const Completion: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();

  const [receiptData, setReceiptData] = useState<{
    id: string;
    totalPrice: number;
  }>();

  const { data, loading, error } = useFetch<{
    id: string;
    totalPrice: number;
  }>(
    process.env.REACT_APP_CACHE_GET_ENDPOINT || "no key",
    "POST",
    JSON.stringify({ sessionID: sessionId })
  );

  useEffect(() => {
    if (data) {
      setReceiptData(data);
    }
  }, [data]);

  // Navigate to homepage if data fetch fails or receiptData is undefined
  useEffect(() => {
    if (!loading && (error || !data)) {
      navigate("/");
    }
  }, [loading, error, data, navigate]);

  return (
    <Paper
      sx={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CheckCircleIcon
        sx={{ color: "green", fontSize: "60px", marginBottom: "10px" }}
      />
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Your payment of{" "}
        <strong>{(receiptData?.totalPrice as number) / 100}€</strong> has been
        processed successfully. A confirmation email has been sent to your
        inbox.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: "left" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Order Summary:
        </Typography>
        <Typography variant="body2">
          Total Price: {(receiptData?.totalPrice as number) / 100}€
        </Typography>
        <Typography variant="body2">
          Transaction ID: #{receiptData?.id}
        </Typography>
        <Typography variant="body2">
          Date: {new Date().toDateString()}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <NavLink to={"/"}>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Go to Homepage
        </Button>
      </NavLink>
    </Paper>
  );
};

export default Completion;
