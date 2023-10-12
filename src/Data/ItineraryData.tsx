import { ItineraryType } from "../types/ItineraryType";

const dummy: ItineraryType[] = [
  {
    id: "itin1",
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
    numberOfPassengers: 60,
  },
  {
    id: "itin2",
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
    numberOfPassengers: 60,
  },
];

export default dummy;
