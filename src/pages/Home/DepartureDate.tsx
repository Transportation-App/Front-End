import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

const DepartureDate = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <TextField
      label="Αναχώρηση"  
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
      InputLabelProps={{
        shrink: true,  
      }}
      fullWidth
    />
  );
};

export default DepartureDate;
