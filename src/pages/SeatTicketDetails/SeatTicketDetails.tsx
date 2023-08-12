import "../../styles/tempTicketScreen.css";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { Button, List, ListItem, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface PropsType {
  itinerary: {
    DeptHour: string;
    ArrHour: string;
    Duration: string;
    DeptCity: string;
    ArrCity: string;
    DeptDate: string;
    ArrDate: string;
  };
  initPrice: number;
  selectedSeat: number | null;
  ticketPrice: string;
  setTicketPrice: (string: string) => void;
  isSelected: boolean;
  confirmRes: (ticketPrice: string) => void;
}

const SeatTicketDetails = (props: PropsType) => {
  const handleChange = (event: any) => {
    props.setTicketPrice(event.target.value as string);
  };

  const onClickHandler = () => {
    props.confirmRes(props.ticketPrice);
  };

  return (
    <div className="seat-ticket-details">
      <List className="list-headers">
        <ListItem disablePadding>
          <b>Dept. Hour</b>
          <p>{props.itinerary.DeptHour}</p>
        </ListItem>
        <ListItem disablePadding>
          <b>Arr. Hour</b>
          <p>{props.itinerary.ArrHour}</p>
        </ListItem>
        <ListItem disablePadding>
          <b>Duration</b>
          <p>{props.itinerary.Duration}</p>
        </ListItem>
        <ListItem disablePadding>
          <b>Dept. City</b>
          <p>{props.itinerary.DeptCity}</p>
        </ListItem>
        <ListItem disablePadding>
          <b>Arr. City</b>
          <p>{props.itinerary.ArrCity}</p>
        </ListItem>
        <ListItem disablePadding>
          <b>Dept. Date</b>
          <p>{props.itinerary.DeptDate}</p>
        </ListItem>
        <ListItem disablePadding>
          <b>Arr. Date</b>
          <p>{props.itinerary.ArrDate}</p>
        </ListItem>
      </List>
      {!props.isSelected ? (
        <b>Επίλεξε μία θέση!</b>
      ) : (
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">
            Επίλεξε εισιτήριο
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.ticketPrice}
            label="Επίλεξε εισιτήριο"
            onChange={handleChange}
          >
            <MenuItem value={props.initPrice}>{"Κανονικό "}</MenuItem>
            <MenuItem value={(props.initPrice * 75) / 100}>
              {"Μειωμένο(μαθητικά,πολύτεκνοι) -25%"}
            </MenuItem>
            <MenuItem value={(props.initPrice * 50) / 100}>
              {"Φοιτητικό -50%"}
            </MenuItem>
          </Select>
          <FormHelperText>
            Επίλεξε το εισιτήριό σου και την κατάλληλη έκπτωση
          </FormHelperText>

          {!isNaN(parseFloat(props.ticketPrice)) && (
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              {"Total price: " +
                parseFloat(props.ticketPrice).toFixed(2) +
                "$" +
                " seat: " +
                props.selectedSeat}
            </p>
          )}
        </FormControl>
      )}
      <Button
        variant="contained"
        className="submit-btn"
        sx={[{ marginBottom: "10px" }]}
        disabled={!props.isSelected || props.ticketPrice === ""}
        onClick={onClickHandler}
      >
        {"Book your seat!"}
      </Button>
    </div>
  );
};

export default SeatTicketDetails;
