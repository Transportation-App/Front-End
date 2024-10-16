import { Button, CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Completion from "./Completion";
import { NavLink } from "react-router-dom";
import { URL } from "url";
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

const PaymentForm: React.FC<paymentInfo> = ({ totalPrice, formData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      const res: Response = await fetch(
        process.env.REACT_APP_STRIPE_PAYMENT_ENDPOINT || "no key",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalPrice: totalPrice * 100,
            formData: formData,
          }),
        }
      );

      const { url } = await res.json();

      // Redirect to Stripe Checkout page
      window.location.href = url;
      setUrl(url);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[50%] border">
      <Box sx={{ my: 2, p: 2, width: "100%" }}>
        <p>Product: Your Product Name</p>
        <p>Total: {totalPrice}€</p>
      </Box>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : `Pay ${totalPrice}€`}
      </Button>
    </form>
  );
};

export default PaymentForm;
