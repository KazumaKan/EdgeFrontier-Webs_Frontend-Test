import { useState, useEffect } from "react";
import proF from "../assets/profile.png";
import factory from "../assets/factory.png";
import { IoMdNotifications } from "react-icons/io";
import "../styles/ContentHeader.css";
import { HardwareID, setMode, setSpeed } from "./ListHID"; // Assuming these come from a state management

export const postMode = async (mode) => {
  try {
    const response = await fetch(
      "https://server-test-latest.onrender.com/command",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode }),
      }
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Failed to change mode:", err);
    throw err;
  }
};

export const getSpeedMode = async (speedMode) => {
  try {
    const response = await fetch(
      `https://server-test-latest.onrender.com/list?speedMode=${speedMode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Failed to change speed mode:", err);
    throw err;
  }
};

const CardMode = () => {
  const [selectedMode, setSelectedMode] = useState(""); // State for Mode selection
  const [selectedSpeed, setSelectedSpeed] = useState(""); // State for Speed selection
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
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
        setList(data);

        // Assuming the first hardware item is the default choice
        if (data.length > 0) {
          const defaultItem = data[0];
          setSelectedMode(defaultItem.Mode);
          setSelectedSpeed(defaultItem.Speed);
          setMode(defaultItem.Mode); // Set global state
          setSpeed(defaultItem.Speed); // Set global state
        }
      } catch (error) {
        console.error("Failed to fetch hardware list:", error);
      }
    };

    fetchHardwareList();
  }, [api]);

  const handleSubmit = async () => {
    const payload = {
      HardwareID: HardwareID, // Use the fixed HardwareID from the stateStore
      Mode: selectedMode,
      Speed: selectedSpeed,
    };

    try {
      const response = await fetch(
        "https://server-test-latest.onrender.com/command",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Command sent successfully");
      } else {
        throw new Error("Failed to send command");
      }
    } catch (error) {
      console.error("Error sending command:", error);
    }
  };

  return (
    <div className="flex-1 relative bg-[#f1f5f9] rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={proF}
          alt="profile"
          className="w-32 h-32 rounded-full shadow-md"
        />
        <h3 className="text-lg text-gray-700 font-semibold">User Profile</h3>
      </div>

      {/* Mode Section */}
      <div className="mt-6 space-y-4">
        <h2>Mode:</h2>
        <div className="dropdown-wrapper">
          <select
            className="dropdown"
            value={selectedMode}
            onChange={(e) => {
              setSelectedMode(e.target.value);
              setMode(e.target.value); // Update global state
            }}
          >
            <option value="SAFE">SAFE</option>
            <option value="AUTO">AUTO</option>
            <option value="MANUAL">MANUAL</option>
            <option value="OFF">OFF</option>
          </select>
        </div>

        {/* Speed Section */}
        <h2>Speed:</h2>
        <div className="dropdown-wrapper">
          <select
            className="dropdown"
            value={selectedSpeed}
            onChange={(e) => {
              setSelectedSpeed(e.target.value);
              setSpeed(e.target.value); // Update global state
            }}
          >
            <option value="FAST">FAST</option>
            <option value="SLOW">SLOW</option>
            <option value="NORMAL">NORMAL</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          Submit
        </button>
      </div>

      {/* Hardware ID Section */}
      <div className="mt-6">
        <h2>Hardware ID:</h2>
        <div className="dropdown-wrapper">
          <input type="text" value={HardwareID} disabled className="dropdown" />
        </div>
      </div>

      {/* Factory Image */}
      <div className="mt-6 flex justify-center">
        <img
          src={factory}
          alt="factory"
          className="w-36 h-auto rounded-lg shadow-md"
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
