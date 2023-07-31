import "../../styles/tempTicketScreen.css";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
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
      <ul className="list-headers">
        <li>
          <b>Dept. Hour</b>
          <p>{props.itinerary.DeptHour}</p>
        </li>
        <li>
          <b>Arr. Hour</b>
          <p>{props.itinerary.ArrHour}</p>
        </li>
        <li>
          <b>Duration</b>
          <p>{props.itinerary.Duration}</p>
        </li>
        <li>
          <b>Dept. City</b>
          <p>{props.itinerary.DeptCity}</p>
        </li>
        <li>
          <b>Arr. City</b>
          <p>{props.itinerary.ArrCity}</p>
        </li>
        <li>
          <b>Dept. Date</b>
          <p>{props.itinerary.DeptDate}</p>
        </li>
        <li>
          <b>Arr. Date</b>
          <p>{props.itinerary.ArrDate}</p>
        </li>
      </ul>
      {!props.isSelected ? (
        <div></div>
      ) : (
        <div className="content-container">
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
          </FormControl>

          {!isNaN(parseFloat(props.ticketPrice)) && (
            <p style={{ fontSize: "19px" }}>
              {"Total price: " +
                parseFloat(props.ticketPrice).toFixed(2) +
                "$" +
                " seat: " +
                props.selectedSeat}
            </p>
          )}
        </div>
      )}
      <div className="btn-container">
        <button
          className="submit-btn"
          disabled={!props.isSelected || props.ticketPrice === ""}
          onClick={onClickHandler}
        >
          Book your seat!
        </button>
      </div>
    </div>
  );
};

export default SeatTicketDetails;
