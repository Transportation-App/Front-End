import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import DepartureDate from './DepartureDate';
import ArrivalDate from './ArrivalDate';
import LocationSelector from './LocationSelector';
import DestinationSelector from './DestinationSelector';

const MainComponent = () => {
  const [locations, setLocations] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch locations and destinations from the database
  }, []);

  return (
    <Container>
      <DepartureDate />
      <ArrivalDate />
      <LocationSelector locations={locations} />
      <DestinationSelector destinations={destinations} /> 
    </Container>
  );
};

export default MainComponent;
