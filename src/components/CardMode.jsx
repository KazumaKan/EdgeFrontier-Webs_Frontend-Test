import React, { useState, useEffect } from "react";
import proF from "../assets/profile.png";
import factory from "../assets/factory.png";
import { IoMdNotifications } from "react-icons/io";
import ChangeModeData from "../components/ChangeModeData";

import "../styles/ContentHeader.css";

const CardMode = () => {
  const [hardwareList, setHardwareList] = useState([]);
  const [selectedHardware, setSelectedHardware] = useState("");
  const [selectedMode, setSelectedMode] = useState("SAFE");
  const [selectedSpeed, setSelectedSpeed] = useState("MEDIUM");

  useEffect(() => {
    // ดึงข้อมูล Hardware ID จาก server
    const fetchHardwareList = async () => {
      try {
        const response = await fetch(
          "https://server-test-latest.onrender.com/list"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setHardwareList(data);
        if (data.length > 0) setSelectedHardware(data[0].HardwareID);
      } catch (error) {
        console.error("Failed to fetch hardware list:", error);
      }
    };

    fetchHardwareList();
  }, []);

  const handleChangeMode = async () => {
    try {
      const response = await fetch(
        "https://server-test-latest.onrender.com/command",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            HardwareID: selectedHardware,
            Mode: selectedMode,
            Speed: selectedSpeed,
          }),
        }
      );
      if (!response.ok)
        throw new Error(`Error changing mode: ${response.statusText}`);
      console.log("Mode changed successfully");
    } catch (error) {
      console.error("Failed to change mode:", error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await fetch(
        "https://server-test-latest.onrender.com/command",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            HardwareID: selectedHardware,
            Mode: selectedMode,
            Speed: selectedSpeed,
          }),
        }
      );
      if (!response.ok)
        throw new Error(`Error completing action: ${response.statusText}`);
      console.log("Action completed successfully");
    } catch (error) {
      console.error("Failed to complete action:", error);
    }
  };

  return (
    <div className="flex-1 relative bg-[#f1f5f9] rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 mt-5">
        <img
          src={proF}
          alt="profile"
          className="w-32 h-32 rounded-full shadow-md"
        />
        <h3 className="text-lg text-gray-700 font-semibold">User Profile</h3>
      </div>

      {/* Content Section */}
      <div className="mt-5 space-y-4">
        {/* Hardware ID Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-center font-semibold text-gray-700 mb-2">
            Hardware ID:
          </h2>
          <select
            className="dropdown w-3/4 p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-gray-300"
            value={selectedHardware}
            onChange={(e) => setSelectedHardware(e.target.value)}
          >
            {hardwareList.map((hardware) => (
              <option key={hardware.HardwareID} value={hardware.HardwareID}>
                {hardware.HardwareID}
              </option>
            ))}
          </select>
        </div>

        {/* Mode and Speed Section */}
        <div className="flex justify-between items-center space-x-4">
          <div className="w-1/2">
            <h2 className="text-gray-700 font-semibold mb-1">Mode:</h2>
            <select
              className="dropdown w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-gray-300"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <option value="SAFE">SAFE</option>
              <option value="PREDICTION">PREDICTION</option>
            </select>
          </div>
          <div className="w-1/2">
            <h2 className="text-gray-700 font-semibold mb-1">Speed:</h2>
            <select
              className="dropdown w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-gray-300"
              value={selectedSpeed}
              onChange={(e) => setSelectedSpeed(e.target.value)}
            >
              <option value="FAST">FAST</option>
              <option value="SLOW">SLOW</option>
              <option value="MEDIUM">MEDIUM</option>
            </select>
          </div>
        </div>

        {/* Complete Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleComplete}
            className="w-3/4 p-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
          >
            Complete
          </button>
        </div>
      </div>

      <div>
        <ChangeModeData selectedMode={selectedMode} />
      </div>

      {/* Factory Image */}
      <div className="flex justify-center mt-auto">
        <img
          src={factory}
          alt="factory"
          className="w-auto  h-25 rounded-lg mb-0  mt-5"
          style={{ marginBottom: 0 }}
        />
      </div>
      {/* Notification Icon */}
      <div className="notify absolute top-6 right-6">
        <IoMdNotifications className="icon" />
      </div>
    </div>
  );
};

export default CardMode;
