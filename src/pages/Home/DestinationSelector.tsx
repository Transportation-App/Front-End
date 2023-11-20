import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Update the type for the component's props to match what you're passing
type DestinationSelectorProps = {
  destinations: string[]; // Changed from 'locations' to 'destinations'
};

const DestinationSelector = ({ destinations }: DestinationSelectorProps) => {
  const [selectedDestination, setSelectedDestination] = useState('');

  return (
    <FormControl fullWidth>
      <InputLabel>Select Your Destination</InputLabel>
      <Select
        value={selectedDestination}
        label="Select Your Destination"
        onChange={(e) => setSelectedDestination(e.target.value)}
      >
        {destinations.map(destination => (
          <MenuItem key={destination} value={destination}>{destination}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DestinationSelector;
