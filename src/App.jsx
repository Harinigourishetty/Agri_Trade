import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import MyListings from "./pages/MyListings";
import BuyerDirectory from "./pages/BuyerDirectory";
import Farmers from "./pages/Farmers";
import Crops from "./pages/Crops";
import Purchases from "./pages/Purchases";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { userRole } = useAppContext();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/buyer-directory" element={<BuyerDirectory />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/reports" element={<Reports />} />
      </Route>

      <Route path="*" element={
        <Navigate to={userRole === 'farmer' ? "/farmer-dashboard" : "/dashboard"} />
      } />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
        <ToastContainer position="bottom-right" theme="colored" />
      </Router>
    </AppProvider>
  );
}

export default App;
