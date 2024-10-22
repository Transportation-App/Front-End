import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type DestinationSelectorProps = {
  destinations: string[];
};

const DestinationSelector = ({ destinations }: DestinationSelectorProps) => {
  const [selectedDestination, setSelectedDestination] = useState('');

  // Remove duplicates by using Set
  const uniqueDestinations = Array.from(new Set(destinations));

  const handleDestinationChange = (event: any) => {
    setSelectedDestination(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Επιλέξτε Πόλη Προορισμού</InputLabel>
      <Select
        value={selectedDestination}
        onChange={handleDestinationChange}
        label="Επιλέξτε Πόλη Προορισμού"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 150,
              overflow: 'auto',
            },
          },
        }}
      >
        {uniqueDestinations.length > 0 ? (
          uniqueDestinations.map((destination, index) => (
            <MenuItem key={`${destination}-${index}`} value={destination}>
              {destination}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No destinations available</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default DestinationSelector;
