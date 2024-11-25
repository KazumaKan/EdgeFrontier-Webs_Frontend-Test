import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { SlGraph } from "react-icons/sl";
import "../styles/Sidbar.css"

const Sidbar = () => {
  // State to track active menu item
  const [activeItem, setActiveItem] = useState("dashboard");

  // Function to handle item click and set active state
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="Sidbar">
      <div className="menu">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-img" />
        </div>
        <div className="menu--list">
            <a
              className={`item ${activeItem === "dashboard" ? "active" : ""}`}
              onClick={() => handleItemClick("dashboard")}
            >
              <RiDashboardHorizontalFill className="icon" />
              Dashboard
            </a>

            <a
              className={`item ${activeItem === "statistic" ? "active" : ""}`}
              onClick={() => handleItemClick("statistic")}
            >
              <SlGraph className="icon" />
              Statistics
            </a>

            <a
              className={`item ${activeItem === "settings" ? "active" : ""}`}
              onClick={() => handleItemClick("settings")}
            >
              <IoSettingsSharp className="icon" />
              Setting
            </a>
            
        </div>
      </div>
      <div className="menu-logout">
        
          <a
            className={`item ${activeItem === "logout" ? "active" : ""}`}
            onClick={() => handleItemClick("logout")}
          >
            <IoLogOut className="icon" />
            LogOut
          </a>
    </div>
    </div>
  );
};

export default Sidbar;
