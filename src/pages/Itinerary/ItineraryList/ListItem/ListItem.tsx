import { useState } from "react";
import { ItineraryType } from "../../../../types/ItineraryType";
import { HourType } from "../../../../types/HourType";
import { StationType } from "../../../../types/StationType";
import ItineraryInfo from "../../ItineraryInfo/ItineraryInfo";
import ItineraryDescription from "../../ItineraryDescription/ItineraryDescription";
  
interface PropsType  {
  className?: string;
  itinerary: ItineraryType;
};

const ListItem = (props: PropsType) => {
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
    hours: HourType[];
    stations: StationType[];
  }) => {
    return {
      departure: arg.hours[0].departure,
      arrive: arg.hours[arg.hours.length - 1].arrive,
      cityFrom: arg.stations[0].from,
      cityTo: arg.stations[arg.stations.length - 1].to,
    };
  };

  const { hours }: ItineraryType = props.itinerary;
  const { stations }: ItineraryType = props.itinerary;
  const { numberOfPassengers }: ItineraryType = props.itinerary;

  const { departure, arrive, cityFrom, cityTo } = firstAndLast({
    hours,
    stations,
  });
  const duration: number = durationCalculator(departure, arrive);

  return (
    <li className={props.className}>
      <div className="w-full h-24 mt-10 mb-2 flex justify-center items-center bg-white border-transparent rounded-lg shadow-md">
        <img
          // src={expand_more_svg}
          alt="expand_more"
          width={32}
          height={32}
          className={`pointer ${
            reveal
              ? "rotate-180 duration-100 ease-in-out"
              : "duration-100 ease-in-out"
          }`}
          onClick={handleRotate}
        />
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

export default ListItem