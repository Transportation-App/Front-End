import "./styles/globals.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ItineraryList from "./pages/Itinerary/ItineraryList/ItineraryList";
import AdminPanel from "./pages/AdminPanel/TableData";
import TicketScreen from "./pages/TicketScreen/TicketScreen";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/Home/HomePage";
import Checkout from "./pages/Checkout/Checkout";
import Layout from "./Layout/Layout";
import Completion from "./pages/Checkout/StepContent/Completion";
import Decline from "./pages/Checkout/StepContent/Decline";

const ItineraryPage = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />} index></Route>
          <Route
            path="/Itinerary"
            element={<ItineraryList className="w-[80%] overflow-y-auto" />}
          ></Route>
          <Route path="/bus" element={<TicketScreen />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/receipt/:sessionId" element={<Completion />}></Route>
          <Route path="/decline/:sessionId" element={<Decline />}></Route>
          <Route path="/admin" element={<AdminPanel />}></Route>
          <Route path="*" element={<Navigate to={"/home"} />}></Route>
        </Routes>
      </Layout>
    </>
  );
};

export default ItineraryPage;
