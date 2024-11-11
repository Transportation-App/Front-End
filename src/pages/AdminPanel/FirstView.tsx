import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import gr from "../../locales/gr/common.json";
import ChangeLang from "./LanguageChange";
import { Alert, AlertColor, Modal, Paper, Snackbar, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// import DarkThemButton from "./DarkThemeButton";
import 'tailwindcss/tailwind.css';


import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";

interface TripRow {
    id: GridRowId;
    start: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
}
  
export default function FirstView() {
    const [openModal, setOpenModal] = useState(false); // State for modal
    const [newTrip, setNewTrip] = useState({ start: "", destination: "", departureTime: "", arrivalTime: "", price: 0 }); // New trip state
    const [rows, setRows] = useState<TripRow[]>([]);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
    const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

    useEffect(() => {
        // Using fetch to call the API
        const url = `${process.env.REACT_APP_Admin_Panel_Post}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const formattedData = data.map((itinerary: any) => ({
                    id: itinerary.id,
                    start: itinerary.DepartureCityDetails.Name,
                    destination: itinerary.ArrivalCityDetails.Name,
                    departureTime: itinerary.departureTime,
                    arrivalTime: itinerary.arrivalTime,
                    price: parseFloat(itinerary.price.replace('$', '')),
                }));
                setRows(formattedData);
            })
            .catch(() => {
                setSnackbarMessage("Failed to fetch data");
                setSnackbarSeverity("error");
                setOpen(true);
            });
    }, []);

    const handleDeleteClick = (id: GridRowId) => () => {
        const url = `${process.env.REACT_APP_API_URL}`;
        fetch(url)
        .then((response) => {
            if (response.ok) {
              setRows((prevRows) => prevRows.filter((row) => row.id !== id));
              setSnackbarMessage("Record deleted successfully");
              setSnackbarSeverity("success");
              setOpen(true);
            } else {
              throw new Error("Failed to delete record");
            }
          })
          .catch(() => {
            setSnackbarMessage("Failed to delete record");
            setSnackbarSeverity("error");
            setOpen(true);
          });
    };

    // Handle modal open/close
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Handle form change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTrip({ ...newTrip, [name]: value });
    };

    // Handle form submit (POST new trip)
    const handleSubmitNewTrip = () => {
        fetch("http://localhost:4000/trips", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTrip),
        })
          .then((response) => response.json())
          .then((data) => {
            setRows((prevRows) => [...prevRows, data]); // Add the new row to the table
            handleCloseModal(); // Close modal
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
        { field: "price", headerName: "Price", width: 130, type: "number" },
    
        {
            field: "actions",
            headerName: "Actions",
            width: 350, // Make it wider to allow space for alignment
            headerAlign: "right", // Align header to the right
            align: "right",       // Align buttons to the right
            renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                  <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(params.id)} />
                  <GridActionsCellItem icon={<AddIcon />} label="New Entry" onClick={handleOpenModal} /> {/* Add new entry button */}
                </Box>
            ),
        },
    ];

    return (
        <>
          {/* Table */}
          <Box sx={{ height: 600, width: "80%", margin: "0 auto" }}>
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
    
          {/* Snackbar for success or error messages */}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
    
          {/* Modal for new entry */}
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
              <TextField
                label="Starting Point"
                name="start"
                fullWidth
                margin="normal"
                value={newTrip.start}
                onChange={handleInputChange}
              />
              <TextField
                label="Destination"
                name="destination"
                fullWidth
                margin="normal"
                value={newTrip.destination}
                onChange={handleInputChange}
              />
              <TextField
                label="Departure Time"
                name="departureTime"
                type="datetime-local"
                fullWidth
                margin="normal"
                value={newTrip.departureTime}
                onChange={handleInputChange}
              />
              <TextField
                label="Arrival Time"
                name="arrivalTime"
                type="datetime-local"
                fullWidth
                margin="normal"
                value={newTrip.arrivalTime}
                onChange={handleInputChange}
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                margin="normal"
                value={newTrip.price}
                onChange={handleInputChange}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSubmitNewTrip}>
                  Submit
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      );
}