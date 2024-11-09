import "./styles/globals.css";
import itineraryData from "./Data/ItineraryData"
import ItineraryList from "./pages/Itinerary/ItineraryList/ItineraryList";
import FirstView from "./pages/AdminPanel/First_window";

// import TicketScreen from "./pages/TicketScreen/TicketScreen";
const ItineraryPage = () => {
  return (
    <FirstView></FirstView>
    // <ItineraryList
    //   className="w-[80%] h-full overflow-y-auto"
    //   itineraries={itineraryData}
    // />
    // <TicketScreen />
  );
}

export default ItineraryPage