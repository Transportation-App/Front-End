import React from "react"
import { useState } from "react";
import "./styles/globals.css";
import {Button,Typography,Divider} from '@mui/material'
import data, { itineraryType, seatType } from "./data";
// import "./styles/tempTicketScreen.css";
import BusLayout from "./BusLayout/page";
import SeatTicketDetails from "./SeatTicketDetails";
// import Map from "./Map/page";
class DBManager {
  static itineraries: itinerary[] = [
    {
      hours: [
        {
          departure: "08:00",
          arrive: "14:00",
        },
      ],
      stations: [
        {
          from: "Thessaloniki",
          to: "Athens",
        },
      ],
      stops: [
        { seqNum: "11", name: "Plaza", location: "Katerini", time: 10 },
        { seqNum: "12", name: "Plaza", location: "Volos", time: 10 },
      ],
      numberOfPassengers: 10,
    },
    {
      hours: [
        { departure: "09:00", arrive: "12:00" },
        { departure: "13:00", arrive: "16:00" },
      ],
      stations: [
        {
          from: "Thessaloniki",
          to: "Volos",
        },
        {
          from: "Volos",
          to: "Athens",
        },
      ],
      stops: [
        { seqNum: "11", name: "Plaza", location: "Katerini", time: 10 },
        { seqNum: "12", name: "Plaza", location: "Platamonas", time: 10 },
        { seqNum: "21", name: "Plaza", location: "Lamia", time: 10 },
        { seqNum: "22", name: "Plaza", location: "Kammena Vourla", time: 10 },
      ],
      numberOfPassengers: 10,
    },
  ];
  static getJson() {
    return JSON.stringify(DBManager.itineraries);
  }
}

type hour = {
  departure: string;
  arrive: string;
};

type station = {
  from: string;
  to: string;
};

type stop = {
  seqNum: string;
  name: string;
  location: string;
  time: number; //minutes
};

type itinerary = {
  hours: hour[];
  stations: station[];
  stops: stop[];
  numberOfPassengers: number;
};

type ListProps = {
  className?: string;
  itineraries: itinerary[];
};

type ItemProps = {
  className?: string;
  itinerary: itinerary;
};

type ItineraryInfoProps = {
  className?: string;
  departureHour: string;
  arriveHour: string;
  cityFrom: string;
  cityTo: string;
  duration: number;
  numberOfPassengers: number;
};

type ItineraryDesProps = {
  id?: string;
  className?: string;
  itinerary: itinerary;
};

function ItineraryList(props: ListProps) {
  return (
    <ul className={props.className}>
      {props.itineraries.map((itinerary, index) => (
        <ListItem
          key={index}
          className="flex flex-col justify-center items-center"
          itinerary={itinerary}
        />
      ))}
    </ul>
  );
}

function ListItem(props: ItemProps) {
  const [reveal, setReveal] = useState(false);

  const handleRotate = () => {
    setReveal(!reveal);
  };

  const durationCalculator = (h1: string, h2: string): number => {
    type time = {
      hour: number;
      minutes: number;
    };
    const timeConverter = (h: string): time => {
      const split = h.split(":");
      return {
        hour: Number.parseInt(split[0]),
        minutes: Number.parseInt(split[1]),
      };
    };
    const t1: time = timeConverter(h1);
    const t2: time = timeConverter(h2);
    return (
      ((t2.hour - t1.hour) % 24) * 3600 + ((t2.minutes - t1.minutes) % 60) * 60
    );
  };

  const firstAndLast = (arg: {
    hours: hour[];
    stations: station[];
  }): {
    departure: string;
    arrive: string;
    cityFrom: string;
    cityTo: string;
  } => {
    return {
      departure: arg.hours[0].departure,
      arrive: arg.hours[arg.hours.length - 1].arrive,
      cityFrom: arg.stations[0].from,
      cityTo: arg.stations[arg.stations.length - 1].to,
    };
  };

  const { hours }: itinerary = props.itinerary;
  const { stations }: itinerary = props.itinerary;
  const { numberOfPassengers }: itinerary = props.itinerary;
  const { departure, arrive, cityFrom, cityTo } = firstAndLast({
    hours,
    stations,
  });
  const duration: number = durationCalculator(departure, arrive);

  return (
    <li className={props.className}>
      <div className="w-full h-24 mt-10 mb-2 flex justify-center items-center bg-white border-transparent rounded-lg shadow-md">
        {/* <Image
          src={expand_more_svg}
          alt="expand_more"
          width={32}
          height={32}
          className={`pointer ${
            reveal
              ? "rotate-180 duration-100 ease-in-out"
              : "duration-100 ease-in-out"
          }`}
          onClick={handleRotate}
        /> */}
        <ItineraryInfo
          className="w-[90%] flex justify-evenly items-center text-center"
          departureHour={departure}
          arriveHour={arrive}
          duration={duration}
          cityFrom={cityFrom}
          cityTo={cityTo}
          numberOfPassengers={numberOfPassengers}
        />
      </div>
      <ItineraryDescription
        className={`w-[90%] p-5 flex flex-col justify-center items-center bg-white border-transparent rounded-lg shadow-md ${
          reveal ? " " : " hidden"
        }`}
        itinerary={props.itinerary}
      />
    </li>
  );
}

function ItineraryInfo(props: ItineraryInfoProps) {
  let hour = Math.floor(props.duration / 3600);
  let minutes = Math.round((props.duration / 3600 - hour) * 60);

  return (
    <div className={props.className}>
      <p className="w-max flex flex-col">
        <span>
          <span className="departureHour">{props.departureHour}</span>
          <span className="hyphen">-</span>
          <span className="arriveHour">{props.arriveHour}</span>
        </span>
        <span className="duration">
          <span className="hours">
            {hour == 0 ? "" : hour + (hour > 1 ? " hours " : "hour ")}
          </span>
          <span className="minutes">
            {minutes == 0
              ? ""
              : minutes + (minutes > 1 ? " minutes" : " minute")}
          </span>
        </span>
      </p>
      <p className="w-max">
        <span className="cityFrom">{props.cityFrom}</span>
        <span className="hyphen">-</span>
        <span className="cityTo">{props.cityTo}</span>
      </p>
      <p className="w-max">{props.numberOfPassengers}</p>
      <Button 
          variant="contained"
          color="primary"
          className="w-28 h-12">
        Book It
      </Button>
    </div>
  );
}

function ItineraryDescription(props: ItineraryDesProps) {
  const { hours, stations, stops } = props.itinerary;
  const max = Math.max(hours.length, stations.length, stops.length);
  return (
    <div className={props.className}>
      <Typography sx={{fontWeight:'bold',fontSize:'text-xl'}}
        variant="h5"
      >
        Itinerary Description
      </Typography>
      <Divider 
        variant="middle"
        className="w-[65%] bg-gray-300"
      />
      <div
        className={`w-full grid grid-rows-${max} grid-cols-2 place-items-center`}
      >
        <Typography variant="h6">
          Hours
        </Typography>
        <Typography variant="h6">
          Stations
        </Typography>
        <div>
          {hours.map((obj, index) => {
            return <p key={index}>{obj.departure + " - " + obj.arrive}</p>;
          })}
        </div>
        <div>
          {stations.map((obj, index) => {
            return <p key={index}>{obj.from + " - " + obj.to}</p>;
          })}
        </div>
        <Typography 
          variant="h6"
          className="col-span-2">
          Stops
        </Typography>
        {stops.map((obj) => {
          return (
            <p key={obj.seqNum}>
              {Number.parseInt(obj.seqNum) +
                ". " +
                obj.name +
                " " +
                obj.location +
                " " +
                obj.time +
                "'' "}
            </p>
          );
        })}
      </div>
    </div>
  );
}

const TicketScreen = () => {
  const itinerary: itineraryType = data.itinerary;

  const [seats, setSeats] = useState<seatType[]>(itinerary.bus.seats);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [ticketPrice, setTicketPrice] = useState<string>("");

  const onClickHandler = (number: number) => {
    setSelectedSeat(number);
    setIsSelected(true);
  };

  const confirmRes = (ticketPrice: string) => {
    alert(
      `Reservation Completed!\nYour ticket price is: ${parseFloat(
        ticketPrice
      ).toFixed(2)}$\nYour seat is: ${selectedSeat}`
    );

    if (selectedSeat) {
      const updatedSeats = [...seats];
      updatedSeats[selectedSeat - 1] = {
        number: updatedSeats[selectedSeat - 1].number,
        isRes: true,
      };
      setSeats(updatedSeats);
    }

    handleReset();
  };

  const handleReset = () => {
    setIsSelected(false);
    setTicketPrice("");
  };

  return (
    <div className="screen">
      <div className="header-container">
      </div>

      <div className="main-content">
        <BusLayout
          seats={seats}
          selectedSeat={selectedSeat}
          onClick={onClickHandler}
        />
      </div>

      <SeatTicketDetails
        selectedSeat={selectedSeat}
        initPrice={itinerary.initPrice}
        ticketPrice={ticketPrice}
        setTicketPrice={setTicketPrice}
        isSelected={isSelected}
        confirmRes={confirmRes} 
        itinerary={{
          DeptHour: "",
          ArrHour: "",
          Duration: "",
          DeptCity: "",
          ArrCity: "",
          DeptDate: "",
          ArrDate: ""
        }}      />
      {/* <Map /> */}
    </div>
  );
};

// export default TicketScreen;

export default function ItineraryPage() {
  return (
    <ItineraryList
      className="w-[80%] h-full overflow-y-auto"
      itineraries={DBManager.itineraries}
    />
  );
}