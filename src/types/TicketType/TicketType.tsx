import { BusType } from "../BusType";

export type TicketType = {
  DeptHour: string;
  ArrHour: string;
  Duration: number;
  DeptCity: string;
  ArrCity: string;
  DeptDate: string;
  ArrDate: string;
  initPrice: number;
  bus: BusType;
  numberOfPassenger: number;
};
