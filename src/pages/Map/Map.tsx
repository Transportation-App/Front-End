import React from "react";
import "../../styles/tempTicketScreen.css";

const Map = () => {
  // Define your locations
  const origin = { lat: 40.6401, lng: 22.9444 }; // Thessaloniki
  const destination = { lat: 40.5411, lng: 21.4046 }; // Florina
  const waypoints = [
    { lat: 40.7489, lng: 22.0082 }, // Edessa
    { lat: 40.5833, lng: 21.67 }, // Amyntaio
  ];

  // Construct OSM URL
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    (origin.lng + destination.lng) / 2 - 0.5
  },${(origin.lat + destination.lat) / 2 - 0.5},${
    (origin.lng + destination.lng) / 2 + 0.5
  },${(origin.lat + destination.lat) / 2 + 0.5}&layer=mapnik&marker=${
    origin.lat
  },${origin.lng}&marker=${destination.lat},${
    destination.lng
  }&marker=${waypoints.map((wp) => `${wp.lat},${wp.lng}`).join("&marker=")}`;

  return (
    <div className="map">
      <iframe
        src={osmUrl}
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: "0.575rem" }}
        loading="lazy"
        title="OpenStreetMap Route"
      ></iframe>
    </div>
  );
};

export default Map;
