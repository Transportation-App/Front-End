import {Typography, Divider} from "@mui/material";
import { ItineraryType } from "../../../types/ItineraryType";

type PropsType = {
  id?: string;
  className?: string;
  itinerary: ItineraryType;
};

const ItineraryDescription = (props: PropsType) => {
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

export default ItineraryDescription