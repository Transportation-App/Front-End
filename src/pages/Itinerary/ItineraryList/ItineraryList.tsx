import { ItineraryType } from "../../../types/ItineraryType";
import ListItem from "./ListItem/ListItem";

interface PropsType  {
  className?: string;
  itineraries: ItineraryType[];
};

const ItineraryList = (props: PropsType) => {
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

export default ItineraryList