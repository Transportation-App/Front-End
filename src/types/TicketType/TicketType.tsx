import { BusType } from "../BusType";

export type TicketType = {
  initPrice: number;
  Bus: BusType;
  numberOfPassenger: number;
};
