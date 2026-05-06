import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 992);

  return (
    <div className="app-layout">
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
        <header className="top-bar">
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <div className="top-bar-right">
            <span className="welcome-text">Welcome, Trader</span>
            <div className="avatar">T</div>
          </div>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
