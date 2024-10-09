import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, CircularProgress, Box } from "@mui/material";
import { useState } from "react";
import Completion from "./Completion";

const PaymentForm = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        letterSpacing: "0.025em",
        lineHeight: "24px",
        padding: "10px",
        // border: "1px solid black",
        // borderRadius: "4px",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
      //   complete: {
      //     color: "#b7f5d1",
      //   },
    },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setLoading(true);

    try {
      const res = await fetch(
        process.env.REACT_APP_STRIPE_PAYMENT_ENDPOINT || "no key",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalPrice * 100 }), // Convert to cents for Stripe
        }
      );
      const { clientSecret } = await res.json();

      // Confirm the card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
        },
      });

      if (result.error) {
        console.log(result.error.message);
        setLoading(false);
      } else if (result.paymentIntent?.status === "succeeded") {
        setIsSucceeded(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (isSucceeded) {
    return <Completion totalPrice={totalPrice} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[50%] border">
      <Box sx={{ my: 2, p: 2, width: "100%" }}>
        <CardElement options={cardElementOptions} />
      </Box>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? <CircularProgress size={24} /> : `Pay ${totalPrice}€`}
      </Button>
    </form>
  );
};

export default PaymentForm;
