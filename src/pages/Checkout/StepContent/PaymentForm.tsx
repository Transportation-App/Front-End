import { Button, CircularProgress, Box } from "@mui/material";
import { useState } from "react";

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

const PaymentForm: React.FC<paymentInfo> = ({
  itinID,
  totalPrice,
  formData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

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
            itinID: itinID,
            totalPrice: (totalPrice * 100).toFixed(2),
            formData: formData,
          }),
        }
      );

      const { url } = await res.json();

      // Redirect to Stripe Checkout page
      window.location.href = url;
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
