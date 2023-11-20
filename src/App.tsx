import "./styles/globals.css";
import itineraryData from "./Data/ItineraryData";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ItineraryList from "./pages/Itinerary/ItineraryList/ItineraryList";
import AdminPanel from "./pages/AdminPanel/TableData";
import TicketScreen from "./pages/TicketScreen/TicketScreen";
import PaymentScreen from "./pages/PaymentInfo/PaymentInfo";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/Home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "Home",
    element: <HomePage/>,
    
  },
  {
    path: "Itinerary",
    element: (
      <ItineraryList
        className="w-[80%] overflow-y-auto"
        // itineraries={itineraryData}
      />
    ),    
  },
  
  {
    path: "Bus",
    element: <TicketScreen />,
  },
  {
    path: "Payment",
    element: <PaymentScreen />,
  },
  {
    path: "Admin",
    element: <AdminPanel />,
  },
]);

const ItineraryPage = () => {
  return <RouterProvider router={router} />;
};

export default ItineraryPage;
