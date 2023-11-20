import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Define a type for the component's props
type LocationSelectorProps = {
  locations: string[];
};

const LocationSelector = ({ locations }: LocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <FormControl fullWidth>
      <InputLabel>Select Your Location</InputLabel>
      <Select
        value={selectedLocation}
        label="Select Your Destination"
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {locations.map(location => (
          <MenuItem key={location} value={location}>{location}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationSelector;
