import "../../styles/tempTicketScreen.css";
import React from 'react';
// import GoogleMapReact from '../../node_modules/google-map-react';

const Map = () => {
  const pathCoordinates = [
    { lat: 37.7749, lng: -122.4194 }, // starting point
    { lat: 39.0742, lng: 21.8243 }, // ending point
  ];

  interface MarkerProps {
    lat: number;
    lng: number;
  }
  
  const Marker = ({ lat, lng }: MarkerProps) => (
    <div className="marker" style={{ position: 'absolute', left: lng, top: lat }}>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  );
  

  return (
    <div className="map">
      {/* <GoogleMapReact
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={7}
      >
        <Marker lat={pathCoordinates[0].lat} lng={pathCoordinates[0].lng} />
        <Marker lat={pathCoordinates[1].lat} lng={pathCoordinates[1].lng} />
      </GoogleMapReact> */}
    </div>
  );
};

export default Map;
