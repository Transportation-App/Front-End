import { HourType } from "../HourType";
import { StationType } from "../StationType";
import { StopType } from "../StopType";

export type ItineraryType = {
  id: string;
  hours: HourType[];
  stations: StationType[];
  stops: StopType[];
  numberOfPassengers: number;
};
