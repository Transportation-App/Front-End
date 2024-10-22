import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import DepartureDate from './DepartureDate';
import ArrivalDate from './ArrivalDate';
import LocationSelector from './LocationSelector';
import DestinationSelector from './DestinationSelector';
import useFetch from '../../hooks/useFetch';
import { StationType } from '../../types/StationType';

const HomePage = () => {
  const [stations, setStations] = useState<{ from: string; to: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>(''); // Track selected location
  const { data, loading, error } = useFetch<StationType>(
    process.env.REACT_APP_GET_CITIES_ENDPOINT || 'no key',
    'POST',
    JSON.stringify({ id: "itinerary_service" })
  );

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data); // Debugging fetched data

      // Check if `data` is an array of station objects
      if (Array.isArray(data)) {
        const fetchedStations = data.map((station: any) => {
          return {
            from: station.from,
            to: station.to,
          };
        });

        setStations(fetchedStations);
        console.log("Processed stations:", fetchedStations); // Debugging processed stations
      } else {
        console.error("Data is not in the expected array format:", data);
      }
    } else {
      console.error("Data is null or undefined:", data); // Debugging statement
    }
  }, [data]);

  console.log("Number of stations:", stations.length); // Log the number of stations

  // Safeguard for cases when `stations` is not an array
  if (!Array.isArray(stations)) {
    console.error("Stations is not an array:", stations); // Debugging statement
    return <Typography>Error: Stations is not an array</Typography>;
  }

  if (loading) {
    return <Typography>Loading stations...</Typography>;
  }

  if (error) {
    return <Typography>Error loading stations: {error.message}</Typography>;
  }

  // Filter destinations based on the selected location
  const filteredDestinations = selectedLocation
    ? stations.filter(station => station.from === selectedLocation).map(station => station.to)
    : []; // Initially empty list

  // Handle location selection from LocationSelector
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location); // Update selected location
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        position: 'fixed',
        mt: 'auto 0',
        pt: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: 'auto',
      }}
    >
      {/* Heading */}
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4, mt: 0 }}>
        Προγραμματίστε το ταξίδι σας
      </Typography>

      {/* Flex container for the boxes */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {/* Box for Dates */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '2rem 4rem',
            borderRadius: '12px',
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '1000px',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
            Επιλέξτε Ημερομηνίες
          </Typography>

          {/* Centering the Date Grids */}
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={4}>
              <DepartureDate />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ArrivalDate />
            </Grid>
          </Grid>
        </Box>

        {/* Box for Cities */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '2rem 4rem',
            borderRadius: '12px',
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '1000px',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
            Επιλέξτε Πόλεις
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              {stations.length > 0 ? (
                <LocationSelector 
                  locations={Array.from(new Set(stations.map(station => station.from)))}
                  onLocationSelect={handleLocationSelect} // Pass handler to LocationSelector
                />
              ) : (
                <Typography>No locations available</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <DestinationSelector destinations={filteredDestinations} /> {/* Render empty list initially */}
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Next Button */}
      <Box textAlign="center" marginTop={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ padding: '1.2rem 3rem', fontSize: '1.3rem' }}
        >
          ΕΠΟΜΕΝΟ
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
