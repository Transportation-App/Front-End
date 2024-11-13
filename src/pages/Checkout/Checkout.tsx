import { Button, Stepper, Step, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SeatsDetails from "./StepContent/SeatsDetails";
import Overview from "./StepContent/Overview";
import PaymentForm from "./StepContent/PaymentForm";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import useWebSocket from "../../hooks/useWebSocket";
import useBeforeUnload from "../../hooks/useBeforeUnload";

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

  const {
    expiryTime,
    itinID,
    selectedSeats = [],
    initPrice,
  } = (location.state as {
    expiryTime: number | null;
    itinID: string;
    selectedSeats: number[];
    initPrice: number;
  }) || {};

  const timeLeft: number | null = expiryTime!! - Date.now();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState<boolean>(true);
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
    console.log("Previous page:", location);
  }, []);

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
    if (timeLeft > 0) {
      setOpenSnackbar(true);
    } else {
      navigate("/");
    }
  }, [timeLeft, setOpenSnackbar, navigate]);

  useBeforeUnload(() => {
    fetch(process.env.REACT_APP_PUT_BUS_ENDPOINT || "no key", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        itinID: itinID,
        selectedSeats: selectedSeats,
        lockType: "open",
      }),
    });
  }, activeStep === 0);

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

  const handleClose = async () => {
    setOpen(false);
    const res = await fetch(
      process.env.REACT_APP_PUT_BUS_ENDPOINT || "no key",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          itinID: itinID,
          selectedSeats: selectedSeats,
          lockType: "open",
        }),
      }
    );

    if (res.ok) {
      const data: {
        success: boolean;
        message: string;
        data: { updated: boolean } | null;
      } = await res.json();

      if (data.success) {
        alert("Reservation expired!");
        navigate("/");
      }
    }
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
    2: (
      <PaymentForm
        itinID={itinID}
        totalPrice={totalPrice}
        formData={formData}
      />
    ),
  };

  if (timeLeft === null) {
    return <>loading...</>;
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
        <CountdownTimer
          expiryTime={Date.now() + timeLeft}
          open={open}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Checkout;
