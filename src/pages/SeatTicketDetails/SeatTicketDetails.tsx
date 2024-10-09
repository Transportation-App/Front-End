import { NavLink } from "react-router-dom";
import "../../styles/tempTicketScreen.css";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface PropsType {
  itinerary: {
    DeptHour: string;
    ArrHour: string;
    Duration: number;
    DeptCity: string;
    ArrCity: string;
    DeptDate: string;
    ArrDate: string;
  };
  initPrice: number;
  selectedSeats: number[];
}

const SeatTicketDetails: React.FC<PropsType> = ({
  itinerary,
  selectedSeats,
  initPrice,
}) => {
  return (
    <div className="seat-ticket-details">
      {!(selectedSeats.length > 0) ? (
        <h2 className="text-gray-500 text-opacity-80 font-semibold italic text-3xl text-center m-auto">
          Παρακαλώ επιλέξτε μία Θέση
        </h2>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ backgroundColor: "inherit" }}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <b>Dept. Hour</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Arr. Hour</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Duration</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Dept. City</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Arr. City</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Dept. Date</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Arr. Date</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={0}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {itinerary.DeptHour}
                  </TableCell>
                  <TableCell align="center">{itinerary.ArrHour}</TableCell>
                  <TableCell align="center">{itinerary.Duration}</TableCell>
                  <TableCell align="center">{itinerary.DeptCity}</TableCell>
                  <TableCell align="center">{itinerary.ArrCity}</TableCell>
                  <TableCell align="center">{itinerary.DeptDate}</TableCell>
                  <TableCell align="center">{itinerary.ArrDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex w-full items-end justify-between px-4 h-[70%]">
            <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col w-full items-center h-full justify-between">
                <h3 className="font-semibold text-xl">Θέση/εις:</h3>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    border: "1px solid black",
                    borderRadius: "0.575rem",
                    width: "410px",
                    height: "165px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                  }}
                >
                  {selectedSeats.map((seat) => (
                    <Box
                      key={seat}
                      sx={{
                        width: "30px",
                        height: "30px",
                        bgcolor: "black",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                        borderRadius: "0.575rem",
                        fontSize: 20,
                        m: "2px",
                      }}
                    >
                      {seat}
                    </Box>
                  ))}
                </Box>
              </div>
            </div>
            <div className="flex items-end w-full justify-end gap-3">
              <NavLink
                to={"/Checkout"}
                state={{ selectedSeats: selectedSeats, initPrice: initPrice }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  className="submit-btn"
                  // disabled={!(selectedSeats.length > 0)}
                >
                  {"Book your seat!"}
                </Button>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SeatTicketDetails;
