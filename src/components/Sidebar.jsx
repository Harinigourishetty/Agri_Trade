import { NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  FaTachometerAlt, FaUsers, FaSeedling, FaShoppingCart,
  FaWarehouse, FaChartLine, FaFileAlt, FaSignOutAlt, FaBuilding
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const traderNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/farmers", label: "Farmers", icon: <FaUsers /> },
  { path: "/crops", label: "Crops", icon: <FaSeedling /> },
  { path: "/purchases", label: "Purchases", icon: <FaShoppingCart /> },
  { path: "/inventory", label: "Inventory", icon: <FaWarehouse /> },
  { path: "/sales", label: "Sales", icon: <FaChartLine /> },
  { path: "/reports", label: "Reports", icon: <FaFileAlt /> },
];

const farmerNavItems = [
  { path: "/farmer-dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/my-listings", label: "My Listings", icon: <FaSeedling /> },
  { path: "/buyer-directory", label: "Buyers", icon: <FaBuilding /> },
];

export default function Sidebar({ isOpen, toggle }) {
  const { logout, userRole } = useAppContext();
  const navigate = useNavigate();

  const navItems = userRole === 'farmer' ? farmerNavItems : traderNavItems;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-brand">
        <FaSeedling className="brand-icon" />
        {isOpen && <span className="brand-text">AgriTrade</span>}
      </div>

      <Nav className="flex-column sidebar-nav">
        {navItems.map((item) => (
          <Nav.Item key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={() => {
                if (window.innerWidth < 992) toggle();
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {isOpen && <span className="sidebar-label">{item.label}</span>}
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>

      <div className="sidebar-footer">
        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <span className="sidebar-icon"><FaSignOutAlt /></span>
          {isOpen && <span className="sidebar-label">Logout</span>}
        </button>
      </div>
    </div>
  );
}
