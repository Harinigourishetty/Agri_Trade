import { createContext, useContext, useState } from "react";
import farmersData from "../data/farmers";
import cropsData from "../data/crops";
import purchasesData from "../data/purchases";
import inventoryData from "../data/inventory";
import salesData from "../data/sales";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [farmers, setFarmers] = useState(farmersData);
  const [crops, setCrops] = useState(cropsData);
  const [purchases, setPurchases] = useState(purchasesData);
  const [inventory, setInventory] = useState(inventoryData);
  const [sales, setSales] = useState(salesData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'trader' or 'farmer'
  const [currentFarmer, setCurrentFarmer] = useState(null);

  const addFarmer = (farmer) => {
    const newFarmer = { ...farmer, id: farmers.length + 1, joinDate: new Date().toISOString().split("T")[0] };
    setFarmers([...farmers, newFarmer]);
  };

  const addCropListing = (crop) => {
    const newCrop = { ...crop, id: crops.length + 1, status: "Available" };
    setCrops([...crops, newCrop]);
  };

  const login = (role, farmerId = null) => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'farmer') {
      setCurrentFarmer(farmers.find(f => f.id === (farmerId || 1)));
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
    isAuthenticated, userRole, currentFarmer, login, logout,
    totalPurchaseCost, totalSalesRevenue, totalStock, netProfit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
