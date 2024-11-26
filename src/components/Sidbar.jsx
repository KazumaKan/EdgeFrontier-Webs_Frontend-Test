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
        <Link  to="Dashboard/">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-img" />
        </div>
        </Link>
        <div className="menu--list">
          <Link to="Dashboard/">
            <a
              className={`item ${activeItem === "dashboard" ? "active" : ""}`}
              onClick={() => handleItemClick("dashboard")}
            >
              <RiDashboardHorizontalFill className="icon" />
              Dashboard
            </a>
            </Link>

            <Link to="Statistics/">
            <a
              className={`item ${activeItem === "statistic" ? "active" : ""}`}
              onClick={() => handleItemClick("statistic")}
            >
              <SlGraph className="icon" />
              Statistics
            </a>
            </Link>

            <Link to="Setting/">
            <a
              className={`item ${activeItem === "settings" ? "active" : ""}`}
              onClick={() => handleItemClick("settings")}
            >
              <IoSettingsSharp className="icon" />
              Setting
            </a>
            </Link>
            
        </div>
      </div>
      <div className="menu-logout">
          <Link to="LogOut/">
          <a
            className={`item ${activeItem === "logout" ? "active" : ""}`}
            onClick={() => handleItemClick("logout")}
          >
            <IoLogOut className="icon" />
            LogOut
          </a>
          </Link>
    </div>
    </div>
  );
};

export default Sidbar;
