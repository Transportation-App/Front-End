import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import gr from "../../locales/gr/common.json";
import grData from "../../locales/gr/db.json";
import ChangeLang from "./LanguageChange";
import { Alert, AlertColor, Paper, Snackbar} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// import DarkThemButton from "./DarkThemeButton";
import 'tailwindcss/tailwind.css';
import axios from "axios";


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
    const [rows, setRows] = useState<TripRow[]>([]);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
    const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

    useEffect(() => {
        axios
          .get("http://localhost:4000/trips")
          .then((response) => {
            setRows(response.data);
          })
          .catch(() => {
            setSnackbarMessage("Failed to fetch data");
            setSnackbarSeverity("error");
            setOpen(true);
          });
    }, []);

    const handleDeleteClick = (id: GridRowId) => () => {
        axios
        .delete(`http://localhost:4000/trips/${id}`)
        .then(() => {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            setSnackbarMessage("Record deleted successfully");
            setSnackbarSeverity("success");
            setOpen(true);
        })
        .catch((error) => {
            setSnackbarMessage("Failed to delete record");
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
    
        // Use valueGetter to convert string to Date object for the departureTime field
        {
            field: "departureTime",
            headerName: "Departure Time",
            width: 180,
            type: "dateTime",
            valueGetter: (params) => new Date(params.value),  // Convert the string to a Date object
        },
    
        // Use valueGetter to convert string to Date object for the arrivalTime field
        {
            field: "arrivalTime",
            headerName: "Arrival Time",
            width: 180,
            type: "dateTime",
            valueGetter: (params) => new Date(params.value),  // Convert the string to a Date object
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
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(params.id)}
                    />
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ height: 600, width: "80%", margin: "0 auto" }}>
        <Paper className="max-h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300" style={{ maxHeight: "80vh" }}>
            <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}  
            disableRowSelectionOnClick
            />
        </Paper>

        {/* Snackbar for success or error messages */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
            </Alert>
        </Snackbar>
        </Box>
    );
}