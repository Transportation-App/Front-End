import React from "react";

const Itineraryitem = {
  name: "kostas thomson",
  category: "full",
  price: 40.0,
  curr: "euro",
  seat: 15,
  round_trip: false,
  itinerary_id: 1,
  departure: "08:00",
  arrive: "14:00",
};

export default function PaymentScreen() {
  return (
    <main>
      <ItineraryInfo />
      <PaymentButton />
    </main>
  );
}

function ItemDetails(props: { info: {key: string, value: any}}) {
  return <li>{props.info.key.toString() + " " + props.info.value}</li>;
}

function ItineraryInfo() {
  return (
    <ul>
      {Object.keys(Itineraryitem).map((key) => {
        return <ItemDetails key={key} info={{key: key, value: Itineraryitem[key as keyof typeof Itineraryitem]}} />;
      })}
    </ul>
  );
}

function PaymentButton() {
  return (
    <button
      onClick={(e) =>
        (location.href = "https://buy.stripe.com/test_eVa9Ep3pbgoG0Sc4gg")
      }
    >
      Pay Now
    </button>
  );
}
