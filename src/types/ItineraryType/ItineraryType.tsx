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

export type ItineraryDBType = {
  Id: number;
	ArrivalCity: number;
	ArrivalDate: string;
	ArrivalTime: string;
	DepartureCity: number;
	DepartureDate: string;
	DepartureTime: string;
	Price: string;
	Stops: number;
  ArrivalCityObj?: CityObj;
  DepartureCityObj?: CityObj;
}

export type CityObj = {
  Id: number;
  Name: string;
  DestinationCities?: CityObj[];
  OriginCities?: CityObj[]; 
}