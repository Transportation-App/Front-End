import { Button, Stepper, Step, StepLabel, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SeatsDetails from "./StepContent/SeatsDetails";
import Overview from "./StepContent/Overview";
import PaymentForm from "./StepContent/PaymentForm";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import useWebSocket from "../../hooks/useWebSocket";

interface SeatFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ticketDiscount: number;
  ticketType: string;
  ticketPrice: number;
}

const steps = ["Seats Details", "Overview", "Payment/Completion"];

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { messages, sendMessage, socket } = useWebSocket(
    process.env.REACT_APP_WS_ENDPOINT || "no key"
  );

  const {
    itinID,
    selectedSeats = [],
    initPrice,
  } = (location.state as {
    itinID: string;
    selectedSeats: number[];
    initPrice: number;
  }) || {};

  const [activeStep, setActiveStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<number, SeatFormData>>(
    selectedSeats.reduce((acc, seat) => {
      acc[seat] = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        ticketDiscount: 100,
        ticketType: "Κανονικό",
        ticketPrice: initPrice,
      };
      return acc;
    }, {} as Record<number, SeatFormData>)
  );

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const total = Object.values(formData).reduce(
      (acc, seat) => acc + seat.ticketPrice,
      0
    );
    setTotalPrice(total);
  }, [formData]);

  useEffect(() => {
    if (selectedSeats.length === 0) {
      navigate("/");
    }
  }, [selectedSeats, navigate]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (messages.length > 0) {
      timeoutId = setTimeout(() => {
        messages.forEach((msg) => {
          if (msg) {
            const currentTime = Date.now();
            const parsedMessage = JSON.parse(msg);
            const remainingTime = parsedMessage.expiryTime - currentTime;

            if (remainingTime > 0) {
              setTimeLeft(remainingTime);
              setOpenSnackbar(true);
            } else {
              navigate("/");
            }
          }
        });
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [messages, navigate]);

  useEffect(() => {
    if (socket) {
      sendSelectedSeatsToWebSocket();
    }
  }, [socket]);

  const sendSelectedSeatsToWebSocket = () => {
    if (socket) {
      const message = JSON.stringify({
        type: "GET_EXPIRY_TIME",
        data: { itinID, selectedSeats },
      });
      sendMessage(message);
    }
  };

  const handleInputChange = (
    seat: number,
    field: keyof SeatFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        [field]: value,
      },
    }));
  };

  const handleSelectChange = (seat: number, value: number, e: any) => {
    const ticketType = e.explicitOriginalTarget.id;
    const discountedPrice = (initPrice * value) / 100;

    setFormData((prev) => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        ticketDiscount: value,
        ticketType: ticketType,
        ticketPrice: Number(discountedPrice.toFixed(2)),
      },
    }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const areAllFieldsFilled = () => {
    return selectedSeats.every((seat) => {
      const data = formData[seat];
      return (
        data.firstName.trim() !== "" &&
        data.lastName.trim() !== "" &&
        data.email.trim() !== "" &&
        data.phoneNumber.trim() !== ""
      );
    });
  };

  const StepContent: { [step: number]: JSX.Element } = {
    0: (
      <SeatsDetails
        selectedSeats={selectedSeats}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
    ),
    1: <Overview formData={formData} />,
    2: <PaymentForm totalPrice={totalPrice} formData={formData} />,
  };

  if (timeLeft === null) {
    return <>loading...</>;
  }

  if (timeLeft < 0) {
    navigate("/");
  }

  return (
    <div className="flex flex-col gap-2 h-full w-full px-[100px]">
      <nav className="flex justify-between items-center w-full border border-black rounded-[0.575rem] p-3">
        <Stepper
          activeStep={activeStep}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!areAllFieldsFilled() || activeStep === steps.length - 1}
          sx={{
            display: activeStep === steps.length - 1 ? "none" : "block",
          }}
        >
          Next
        </Button>
      </nav>

      <section className="flex justify-evenly items-center flex-col h-[80vh] w-full ">
        {StepContent[activeStep]}
      </section>

      {openSnackbar && timeLeft > 0 && (
        <CountdownTimer expiryTime={Date.now() + timeLeft} />
      )}
    </div>
  );
};

export default Checkout;
