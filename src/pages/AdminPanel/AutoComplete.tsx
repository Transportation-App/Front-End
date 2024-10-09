import * as React from 'react';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { createTheme, useTheme, ThemeProvider, Theme } from '@mui/material/styles';
import englishBusLocations from '../../locales/en/englishBusLocations.json'
import greekBusLocations from '../../locales/gr/greekBusLocations.json'

// Theme.ts
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiAutocomplete: {
        defaultProps: {
          renderOption: (props, option, state, ownerState) => (
            <Box
              sx={{
                borderRadius: '8px',
                margin: '5px',
                [`&.${autocompleteClasses.option}`]: {
                  padding: '8px',
                },
              }}
              component="li"
              {...props}
            >
              {ownerState.getOptionLabel?.(option)}
            </Box>
          ),
        },
      },
    },
  });

export default function GloballyCustomizedOptions() {
  // useTheme is used to determine the dark or light mode of the docs to maintain the Autocomplete component default styles.
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Stack spacing={5} sx={{ width: 300 }}>
        <CitySelect />
      </Stack>
    </ThemeProvider>
  );
}

function CitySelect() {
  return (
    <Autocomplete
        options={greekBusLocations}
        getOptionLabel={(option: FilmOptionType) => `${option.title}`}
        id="movie-customized-option-demo"
        // freeSolo 
        renderInput={(params) => (
      <TextField {...params} label="" variant="standard" />
    )}
  />
  );
}


interface FilmOptionType {
  title: string;
}

// const greekBusLocations = [
//     { title: 'Αθήνα' },
//     { title: 'Θεσσαλονίκη' },
//     { title: 'Πάτρα' },
//     { title: 'Ηράκλειο' },
//     { title: 'Λάρισα' },
//     { title: 'Βόλος' },
//     { title: 'Ιωάννινα' },
//     { title: 'Χανιά' },
//     { title: 'Χαλκίδα' },
//     { title: 'Ρόδος' },
//     { title: 'Πάτρα' },
//     { title: 'Καβάλα' },
//     { title: 'Ρέθυμνο' },
//     { title: 'Λάρισα' },
//     { title: 'Χίος' },
//     { title: 'Κομοτηνή' },
//     { title: 'Σέρρες' },
//     { title: 'Καλαμάτα' },
//     { title: 'Κέρκυρα' }
//   ];
  

//   const englishBusLocations = [
//     { title: 'Athens' },
//     { title: 'Thessaloniki' },
//     { title: 'Patra' },
//     { title: 'Heraklion' },
//     { title: 'Larissa' },
//     { title: 'Volos' },
//     { title: 'Ioannina' },
//     { title: 'Chania' },
//     { title: 'Chalcis' },
//     { title: 'Rhodes' },
//     { title: 'Heraklion' },
//     { title: 'Patra' },
//     { title: 'Kavala' },
//     { title: 'Rethymno' },
//     { title: 'Larissa' },
//     { title: 'Chios' },
//     { title: 'Komotini' },
//     { title: 'Serres' },
//     { title: 'Kalamata' },
//     { title: 'Corfu' }
//   ];
  
