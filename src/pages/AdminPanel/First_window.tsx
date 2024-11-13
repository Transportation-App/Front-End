import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import countries from "../../locales/gr/countries.json"
import ChangeLang from "./LanguageChange";
import { Alert, AlertColor, Autocomplete, Modal, Paper, Snackbar, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import 'tailwindcss/tailwind.css';

import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";

interface City {
  Id: number;
  Name: string;
  OriginCities: Array<any>;
  DestinationCities: Array<any>;
}


interface TripRow {
  id: GridRowId;
  start: string | number;         // Allow start to be either a city name (string) or city ID (number)
  destination: string | number;    // Allow destination to be either a city name (string) or city ID (number)
  departureTime: string;
  arrivalTime: string;
  price: number;
}

export default function FirstView() {
  const [openModal, setOpenModal] = useState(false);
  const [newTrip, setNewTrip] = useState<{
    start: string | number;
    destination: string | number;
    departureTime: string;
    arrivalTime: string;
    price: number;
  }>({
    start: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: 0,
  });
  
  const [rows, setRows] = useState<TripRow[]>([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

  const [cities, setCities] = useState<City[]>([]);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered');
    const url = `${process.env.REACT_APP_Admin_Panel_Get}`;
    console.log('EEnvironment URL:', process.env.REACT_APP_Admin_Panel_Get);

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('Raw data from backend:', data);
            setRawData(data);
            const formattedData = data.map((itinerary: any) => {
              // Combine date and time fields into a valid datetime string
              const departureDateTime = `${itinerary.DepartureDate}T${itinerary.DepartureTime}`;
              const arrivalDateTime = `${itinerary.ArrivalDate}T${itinerary.ArrivalTime}`;
              
              return {
                  id: itinerary.Id,
                  start: itinerary.DepartureCityObj?.Name || 'Unknown',
                  destination: itinerary.ArrivalCityObj?.Name || 'Unknown',
                  departureTime: departureDateTime, // Use the combined datetime string
                  arrivalTime: arrivalDateTime, // Use the combined datetime string
                  price: parseFloat(itinerary.Price.replace('$', '')),
              };
          });
          setRows(formattedData);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            setSnackbarMessage("Failed to fetch data");
            setSnackbarSeverity("error");
            setOpen(true);
        });
}, []);

  // Fetch cities data
  useEffect(() => {
    const url = `${process.env.REACT_APP_Admin_Panel_Get_Cities}`;
    const fetchCities = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setSnackbarMessage("Failed to fetch cities");
        setSnackbarSeverity("error");
        setOpen(true);
      }
    };
  
    fetchCities();
  }, []);

  const handleDeleteClick = (id: GridRowId) => {
    const url = `${process.env.REACT_APP_Admin_Panel_Delete}/${id}`;

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (response.ok) {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            setSnackbarMessage("Itinerary deleted successfully");
            setSnackbarSeverity("success");
            setOpen(true);
        } else {
            throw new Error("Failed to delete itinerary");
        }
    })
    .catch((error) => {
        console.error("Delete error:", error);
        setSnackbarMessage("Failed to delete itinerary");
        setSnackbarSeverity("error");
        setOpen(true);
    });
};



  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);

    setNewTrip((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) || 0 : value  // Parse price as number
    }));
  };


  const handleSubmitNewTrip = () => {
    const url = `${process.env.REACT_APP_Admin_Panel_Post}`;

    // Check if start and destination city IDs are valid
    if (!newTrip.start || !newTrip.destination) {
        setSnackbarMessage("Invalid start or destination city");
        setSnackbarSeverity("error");
        setOpen(true);
        return;
    }

    const dataToSend = {
        DepartureCity: newTrip.start, // Start is now the city ID
        ArrivalCity: newTrip.destination, // Destination is now the city ID
        DepartureDate: newTrip.departureTime.split("T")[0], // Extract date portion
        ArrivalDate: newTrip.arrivalTime.split("T")[0], // Extract date portion
        DepartureTime: newTrip.departureTime.split("T")[1], // Extract time portion
        ArrivalTime: newTrip.arrivalTime.split("T")[1], // Extract time portion
        Price: `$${Number(newTrip.price).toFixed(2)}`, // Convert price to fixed 2 decimal places
        Stops: 0, // Assuming stops default to 0
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            setRows((prevRows) => [
                ...prevRows,
                {
                    id: data.Id,
                    start: newTrip.start, // Start is the city ID
                    destination: newTrip.destination, // Destination is the city ID
                    departureTime: newTrip.departureTime,
                    arrivalTime: newTrip.arrivalTime,
                    price: Number(newTrip.price), // Store price as a number
                },
            ]);
            handleCloseModal();
            setSnackbarMessage("New trip added successfully");
            setSnackbarSeverity("success");
            setOpen(true);
        })
        .catch(() => {
            setSnackbarMessage("Failed to add new trip");
            setSnackbarSeverity("error");
            setOpen(true);
        });
  };


  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "start", headerName: "Starting Point", width: 200 },
    { field: "destination", headerName: "Destination", width: 200 },
    {
      field: "departureTime",
      headerName: "Departure Time",
      width: 180,
      type: "dateTime",
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: "arrivalTime",
      headerName: "Arrival Time",
      width: 180,
      type: "dateTime",
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      type: "number",
      valueFormatter: (params) => `${params.value.toFixed(2)}€`, // Format with € symbol
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.id)}
          />
          <GridActionsCellItem
            icon={<AddIcon />}
            label="New Entry"
            onClick={handleOpenModal}
          />
        </Box>
      ),
    },
  ];

  
  return (
    <>
      <Box sx={{ height: 600, width: "100%", margin: "0 auto" }}>
        <Paper
          className="max-h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300"
          style={{ maxHeight: "80vh" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Paper>
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Add New Trip</h2>
        <Autocomplete
          options={cities}
          getOptionLabel={(option) => option.Name || ""}
          onChange={(event, newValue) => 
            setNewTrip((prev) => ({ ...prev, start: newValue?.Id || "" })) // Store Id instead of Name
          }
          renderInput={(params) => (
            <TextField {...params} label="Starting Point" margin="normal" />
          )}
          isOptionEqualToValue={(option, value) => option.Id === value.Id} // Ensures proper matching
          loading={cities.length === 0} // Shows a loading indicator if cities are not loaded yet
        />
        <Autocomplete
          options={cities}
          getOptionLabel={(option) => option.Name || ""}
          onChange={(event, newValue) => 
            setNewTrip((prev) => ({ ...prev, destination: newValue?.Id || "" })) // Store Id instead of Name
          }
          renderInput={(params) => (
            <TextField {...params} label="Destination" margin="normal" />
          )}
          isOptionEqualToValue={(option, value) => option.Id === value.Id} // Ensures proper matching
          loading={cities.length === 0} // Shows a loading indicator if cities are not loaded yet
        />

        
        {/* Other form fields remain the same */}
        <TextField
          label="Departure Time"
          name="departureTime"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={newTrip.departureTime}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Arrival Time"
          name="arrivalTime"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={newTrip.arrivalTime}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={newTrip.price}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmitNewTrip}>Submit</Button>
          <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
    </>
  );
}
