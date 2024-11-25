// CardMode.jsx
import React, { useState } from "react";

// ฟังก์ชันสำหรับส่ง API เพื่อเปลี่ยนโหมด
export const postMode = async (mode) => {
  try {
    const response = await fetch(
      "https://server-test-latest.onrender.com/"  ,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode }), // ส่ง mode เป็น "safe" หรือ "prediction"
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Mode changed successfully:", result);
    return result;
  } catch (err) {
    console.error("Failed to change mode:", err);
  }
};

// ฟังก์ชันสำหรับส่ง API เพื่อเปลี่ยน Speed โหมด
export const postSpeedMode = async (speedMode) => {
  try {
    const response = await fetch("https://server-test-latest.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ speedMode }), // ส่ง mode เป็น "safe" หรือ "prediction"
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Mode changed successfully:", result);
    return result;
  } catch (err) {
    console.error("Failed to change mode:", err);
  }
};

const CardMode = () => {
  const [mode, setMode] = useState(true);
  const [speedMode, setSpeedMode] = useState("MEDIUM");

  const modeChangeHandler = () => {
    setMode(!mode);
    postMode(mode ? "PREDICTION_MODE" : "SAFE_MODE");
  };

  const onClickHandler = () => {
    console.log("post: ", speedMode);
    postSpeedMode(speedMode);
  };

  return (
    <div>
      <div>
        <button
          className="bg-gray-700 text-white p-2 rounded-[30px]"
          onClick={() => modeChangeHandler()}
        >
          {mode ? "Prediction Mode" : "Safe Mode"}
        </button>
        <select
          className="bg-gray-700 text-white p-2 rounded-[30px]"
          id="speed"
          value={speedMode}
          onChange={(e) => setSpeedMode(e.target.value)}
        >
          <option value="SLOW">SLOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="FAST">FAST</option>
        </select>{" "}
        <button onClick={() => onClickHandler()}>Confirm</button>
      </div>
    </div>
  );
};

export default CardMode;
