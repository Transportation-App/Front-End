import { Box, Typography, Divider, Button, Paper } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { NavLink } from "react-router-dom";

type propsType = {
  totalPrice: number;
};

const Completion: React.FC<propsType> = ({ totalPrice }) => {
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
        Your payment of <strong>{totalPrice}€</strong> has been processed
        successfully. A confirmation email has been sent to your inbox.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: "left" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Order Summary:
        </Typography>
        <Typography variant="body2">Total Price: {totalPrice}€</Typography>
        <Typography variant="body2">
          Transaction ID: #{Math.floor(Math.random() * 1000000000)}
        </Typography>
        <Typography variant="body2">
          Date: {new Date().toDateString()}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <NavLink to={"/"}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Go to Homepage
        </Button>
      </NavLink>
    </Paper>
  );
};

export default Completion;
