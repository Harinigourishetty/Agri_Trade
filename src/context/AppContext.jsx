import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import farmersData from "../data/farmers";
import cropsData from "../data/crops";
import purchasesData from "../data/purchases";
import inventoryData from "../data/inventory";
import salesData from "../data/sales";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [farmers, setFarmers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [purchases, setPurchases] = useState(purchasesData); // Keep mock since no BE table
  const [inventory, setInventory] = useState(inventoryData); // Keep mock since no BE table
  const [sales, setSales] = useState(salesData); // Keep mock since no BE table
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'trader' or 'farmer'
  const [currentFarmer, setCurrentFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch crops (products) from backend
  const fetchCrops = async () => {
    try {
      const response = await axios.get("/api/products/all");
      if (response.data && response.data.success) {
        // Map backend products to frontend structure
        const mappedCrops = response.data.data.map(p => ({
          id: p.id,
          farmerId: p.farmer ? p.farmer.id : null,
          farmerName: p.farmer ? p.farmer.name : "Unknown",
          cropName: p.name,
          quantity: p.quantity,
          unit: p.unit,
          expectedPrice: p.price,
          location: p.farmer && p.farmer.location ? p.farmer.location : "Unknown",
          status: p.quantity > 0 ? "Available" : "Sold"
        }));
        setCrops(mappedCrops);
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  // Fetch users (farmers and traders) from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/all");
      if (response.data && response.data.success) {
        const allUsers = response.data.data;
        
        // Filter users by role and map to farmer structure
        const mappedFarmers = allUsers
          .filter(u => u.role && u.role.toLowerCase() === "farmer")
          .map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            location: u.location || "Unknown",
            contact: u.contact || "Unknown",
            joinDate: new Date().toISOString().split("T")[0]
          }));
        setFarmers(mappedFarmers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchCrops(), fetchUsers()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addFarmer = (farmer) => {
    const newFarmer = { ...farmer, id: farmers.length + 1, joinDate: new Date().toISOString().split("T")[0] };
    setFarmers([...farmers, newFarmer]);
  };

  const addCropListing = async (crop) => {
    try {
      const response = await axios.post("/api/products/list", {
        name: crop.cropName,
        category: "Crops",
        quantity: crop.quantity,
        unit: crop.unit,
        price: crop.expectedPrice,
        farmerId: crop.farmerId
      });
      if (response.data && response.data.success) {
        await fetchCrops(); // reload listings from backend
        return true;
      }
    } catch (error) {
      console.error("Error listing crop:", error);
      throw error;
    }
    return false;
  };

  const login = async (email, password, role) => {
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password
      });

      if (response.data && response.data.success) {
        const user = response.data.data;
        // Verify role
        if (user.role.toLowerCase() !== role.toLowerCase()) {
          throw new Error(`This account is registered as a ${user.role}. Please select the correct role.`);
        }
        
        setIsAuthenticated(true);
        setUserRole(user.role.toLowerCase());
        
        if (user.role.toLowerCase() === "farmer") {
          setCurrentFarmer({
            id: user.id,
            name: user.name,
            email: user.email,
            location: user.location,
            contact: user.contact
          });
        }
        return user;
      }
    } catch (error) {
      console.error("Login request failed:", error);
      const errorMsg = error.response?.data?.message || error.message || "Invalid credentials";
      throw new Error(errorMsg);
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post("/api/users/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role.toUpperCase(), // 'FARMER' or 'TRADER'
        location: userData.location,
        contact: userData.contact
      });
      if (response.data && response.data.success) {
        await fetchUsers(); // refresh the list of farmers/users
        return response.data.data;
      }
    } catch (error) {
      console.error("Registration request failed:", error);
      const errorMsg = error.response?.data?.message || error.message || "Registration failed";
      throw new Error(errorMsg);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentFarmer(null);
  };

  const totalPurchaseCost = purchases.reduce((sum, p) => sum + p.totalCost, 0);
  const totalSalesRevenue = sales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalStock = inventory.reduce((sum, i) => sum + i.quantityAvailable, 0);
  const netProfit = totalSalesRevenue - totalPurchaseCost;

  const addPurchase = (purchase) => {
    const newPurchase = { ...purchase, id: purchases.length + 1, totalCost: purchase.quantity * purchase.pricePerUnit };
    setPurchases([...purchases, newPurchase]);
  };

  const addSale = (sale) => {
    const newSale = { ...sale, id: sales.length + 1, totalRevenue: sale.quantity * sale.sellingPrice };
    setSales([...sales, newSale]);
  };

  const value = {
    farmers, setFarmers, addFarmer,
    crops, setCrops, addCropListing,
    purchases, setPurchases, addPurchase,
    inventory, setInventory,
    sales, setSales, addSale,
    isAuthenticated, userRole, currentFarmer, login, logout, register,
    totalPurchaseCost, totalSalesRevenue, totalStock, netProfit,
    loading, reloadData: loadData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
