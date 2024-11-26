import React, { useState } from "react";

export const dataStore = {
  CO2: null,
  HUMID: null,
  PRESSURE: null,
  RA: null,
  TEMP: null,
  VOC: null,
  Event: null,
  HardwareID: null,
  TimeStamp: null,
  lastReceivedTime: null,
  speed: null,

  Prediction: {
    Cold: null,
    Warm: null,
    Hot: null,
    Dry: null,
    Wet: null,
    Normal: null,
    Unknown: null,
  },
};

const DataHost = () => {
  const [serverUrl, setServerUrl] = useState(""); // เก็บค่าที่ผู้ใช้ป้อน
  const [connectionStatus, setConnectionStatus] = useState(""); // แสดงสถานะการเชื่อมต่อ
  const [socket, setSocket] = useState(null); // เก็บ WebSocket instance

  const handleConnect = () => {
    if (socket) {
      socket.close(); // ปิดการเชื่อมต่อเก่าหากมี
    }

    const newSocket = new WebSocket(serverUrl);

    newSocket.onopen = () => {
      setConnectionStatus("Connected");
      console.info("WebSocket connected");
    };

    newSocket.onerror = (error) => {
      setConnectionStatus("Connection failed");
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = () => {
      setConnectionStatus("Connection closed");
      console.warn("WebSocket connection closed");
    };

    newSocket.onmessage = (event) => {
      try {
        if (event.data) {
          const parsedData = JSON.parse(event.data);
          const currentTime = Date.now();

          if (dataStore.lastReceivedTime) {
            const timeDiff = currentTime - dataStore.lastReceivedTime;
            dataStore.speed = 1000 / timeDiff;
          }

          dataStore.CO2 = parseFloat(parsedData.Data.CO2).toFixed(2);
          dataStore.HUMID = parseFloat(parsedData.Data.HUMID).toFixed(2);
          dataStore.PRESSURE = parseFloat(parsedData.Data.PRESSURE).toFixed(2);
          dataStore.RA = parseFloat(parsedData.Data.RA).toFixed(2);
          dataStore.TEMP = parseFloat(parsedData.Data.TEMP).toFixed(2);
          dataStore.VOC = parseFloat(parsedData.Data.VOC).toFixed(2);
          dataStore.Event = parsedData.Event;

          dataStore.Prediction.Cold = parsedData.Prediction?.Cold ?? "N/A";
          dataStore.Prediction.Warm = parsedData.Prediction?.Warm ?? "N/A";
          dataStore.Prediction.Hot = parsedData.Prediction?.Hot ?? "N/A";
          dataStore.Prediction.Dry = parsedData.Prediction?.Dry ?? "N/A";
          dataStore.Prediction.Wet = parsedData.Prediction?.Wet ?? "N/A";
          dataStore.Prediction.Normal = parsedData.Prediction?.Normal ?? "N/A";
          dataStore.Prediction.Unknown =
            parsedData.Prediction?.Unknown ?? "N/A";

          dataStore.lastReceivedTime = currentTime;
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    setSocket(newSocket); // เก็บ instance ใหม่
  };

  return (
    <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      margin: "15px",
      fontFamily: "Arial, sans-serif",
    }}
    >
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter server URL"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "16px",
            border: `2px solid ${
              connectionStatus === "Connected"
                ? "green"
                : connectionStatus === "Connection failed"
                ? "red"
                : "#ccc"
            }`,
            borderRadius: "10px",
            transition: "border-color 0.3s",
          }}
        />
        <button
          onClick={handleConnect}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4A90E2",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#357ABD")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4A90E2")}
        >
          Connect
        </button>
      
      </div>
      <div className="styled-wrapper mb-5 p-2">
      <label className="switch">
        <input type="checkbox" />
        <span className="slider" />
      </label>
    </div>
    </div>
  );
};

export default DataHost;
