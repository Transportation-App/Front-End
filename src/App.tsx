import "./styles/globals.css";
import itineraryData from "./Data/ItineraryData";
import ItineraryList from "./pages/Itinerary/ItineraryList/ItineraryList";
import AdminPanel from "./pages/AdminPanel/TableData";

// import TicketScreen from "./pages/TicketScreen/TicketScreen";
const ItineraryPage = () => {
  return (
    // <AdminPanel />
    <ItineraryList
      className="w-[80%] h-full overflow-y-auto"
      itineraries={itineraryData}
    />
    // <TicketScreen />
  );
};

export default ItineraryPage;
