import { IoMdNotifications } from "react-icons/io";
import "../styles/ContentHeader.css";
import { useState, useEffect } from "react";

const ContentHeader = () => {
  const [list, setList] = useState([]); // State to hold the list of hardware
  const api = "https://server-test-latest.onrender.com/list"; // API URL

  useEffect(() => {
    const fetchHardwareList = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error fetching hardware list: ${response.statusText}`
          );
        }

        const data = await response.json();
        setList(data); // Set the hardware list
      } catch (error) {
        console.error("Failed to fetch hardware list:", error);
      }
    };

    fetchHardwareList();
  }, [api]);

  return (
    <div className="content--header">
      <div className="header--activity">
        {/* Message Box */}
        <div className="message-box">
          <span>wss://server-test-v1-1.onrender.com/demo</span>
        </div>

        {/* Switch */}
        <div className="styled-wrapper">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider" />
          </label>
        </div>

        {/* Notification Icon */}
        <div className="notify">
          <IoMdNotifications className="icon" />
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
