import { useNavigate } from "react-router-dom";
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
import { useState } from "react";

interface PropsType {
  itinerary: {
    itinID: string;
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
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickHandler = async (e: any) => {
    try {
      setLoadingUpdate(true);
      const res = await fetch(
        process.env.REACT_APP_PUT_BUS_ENDPOINT || "no key",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            itinID: itinerary.itinID,
            selectedSeats: selectedSeats,
            lockType: "tempLocked",
          }),
        }
      );

      if (res.ok) {
        const data: {
          success: boolean;
          message: string;
          data: { updated: boolean } | null;
        } = await res.json();

        if (data.success) {
          const expiryTime = Date.now() + 8 * 60 * 1000;

          navigate("/checkout", {
            state: {
              expiryTime: expiryTime,
              itinID: itinerary.itinID,
              selectedSeats: selectedSeats,
              initPrice: initPrice,
            },
          });
        } else {
          console.log("Something went wrong");
        }
      } else {
        console.log("Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

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
              <Button
                size="medium"
                variant="contained"
                className="submit-btn"
                onClick={onClickHandler}
                // disabled={!(selectedSeats.length > 0)}
              >
                {"Book your seat!"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SeatTicketDetails;
