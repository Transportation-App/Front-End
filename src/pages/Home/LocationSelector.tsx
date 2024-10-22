import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type LocationSelectorProps = {
  locations: string[];
  onLocationSelect: (location: string) => void; // Add a prop for handling location selection
};

const LocationSelector = ({ locations, onLocationSelect }: LocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState('');

  // Remove duplicates by using Set
  const uniqueLocations = Array.from(new Set(locations));

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    onLocationSelect(newLocation); // Pass the selected location to the parent component
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Επιλέξτε Πόλη Αναχώρησης</InputLabel>
      <Select
        value={selectedLocation}
        onChange={handleLocationChange}
        label="Επιλέξτε Πόλη Αναχώρησης"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 150,  // Reduced max height to 150px
              overflow: 'auto',
            },
          },
        }}
      >
        {uniqueLocations.map((location, index) => (
          <MenuItem key={`${location}-${index}`} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationSelector;
