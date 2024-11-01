import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import useFetch from "../../hooks/useFetch";

type CoordsType = {
  Id: string;
  Name: string;
  "Lng / Lat": {
    x: number;
    y: number;
  };
};

const dummyData: { deptCity: string; arrCity: string } = {
  deptCity: "Αθήνα",
  arrCity: "Θεσσαλονίκη",
};

const RoutingPlan: React.FC<{ coords: CoordsType[] }> = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || coords.length === 0) return;

    const routingWaypoints = coords.map((coord) =>
      L.latLng(coord["Lng / Lat"].x, coord["Lng / Lat"].y)
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
  }, [map, coords]);

  return null;
};

const Map: React.FC = () => {
  const [coords, setCoords] = useState<CoordsType[]>([]);
  const { data, loading, error } = useFetch<CoordsType[]>(
    process.env.REACT_APP_GET_COORDS_ENDPOINT || "no key",
    "POST",
    JSON.stringify(dummyData)
  );

  useEffect(() => {
    if (data) {
      setCoords(data);
    }
  }, [data, setCoords]);

  if (loading) return <p>Loading map...</p>;
  if (error) return <p>Error loading map data</p>;
  if (!coords || coords.length === 0) return <p>No coordinates available</p>;

  return (
    <MapContainer
      center={[coords[0]["Lng / Lat"].x, coords[0]["Lng / Lat"].y]}
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
      <RoutingPlan coords={coords} />
    </MapContainer>
  );
};

export default Map;
