import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

interface MapWithRoutingProps {
  waypoints: [number, number][];
}

const waypointsData: [number, number][] = [
  [40.5493, 21.4018],
  [40.6103, 21.7482],
  [40.6401, 22.9444],
];

const RoutingPlan: React.FC<MapWithRoutingProps> = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingWaypoints = waypoints.map((coords) =>
      L.latLng(coords[0], coords[1])
    );

    const createMarker = (
      waypointIndex: number,
      waypoint: L.Routing.Waypoint,
      numberOfWaypoints: number
    ) => {
      const marker = L.marker(waypoint.latLng);

      const popupContent = `Location: ${waypoint.latLng.lat.toFixed(
        4
      )}, ${waypoint.latLng.lng.toFixed(4)}`;
      marker.bindPopup(popupContent);

      return marker;
    };

    const plan = L.Routing.plan(routingWaypoints, {
      draggableWaypoints: false,
      addWaypoints: false,
      routeWhileDragging: false,
      createMarker,
    });

    const lineOptions = {
      extendToWaypoints: false,
      addWaypoints: false,
      missingRouteTolerance: 5,
      styles: [
        {
          color: "blue",
          weight: 5,
        },
      ],
    };

    const routingControl = L.Routing.control({
      plan,
      routeWhileDragging: false,
      show: false,
      lineOptions,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, waypoints]);

  return null;
};

const Map: React.FC = () => {
  return (
    <MapContainer
      center={[40.6401, 22.9444]}
      zoom={6}
      style={{
        height: "100%",
        width: "50%",
        borderRadius: "0.575rem",
        border: 0,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <RoutingPlan waypoints={waypointsData} />
    </MapContainer>
  );
};

export default Map;
