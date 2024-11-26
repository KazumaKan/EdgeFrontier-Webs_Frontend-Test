import React, { useState, useEffect } from "react";
import { dataStore } from "../page/DataHost";

const DeviceL = () => {
  const [devices, setDevices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([
    "CO2",
    "VOC",
    "RA",
    "PRESSURE",
    "HUMID",
    "TEMP",
  ]);

  const metrics = [
    { key: "CO2", label: "CO2" },
    { key: "VOC", label: "VOC" },
    { key: "RA", label: "Radon" },
    { key: "PRESSURE", label: "Pressure" },
    { key: "HUMID", label: "Humidity" },
    { key: "TEMP", label: "Temperature" },
  ];

  // Update device data when WebSocket sends new data
  useEffect(() => {
    const updateDeviceData = () => {
      const updatedDevices = [];

      // Slot 1: Update with the latest data from dataStore
      updatedDevices.push({
        ID: "EF001",
        CO2: dataStore.CO2 || "N/A",
        VOC: dataStore.VOC || "N/A",
        RADON: dataStore.RA || "N/A",
        PRESSURE: dataStore.PRESSURE || "N/A",
        HUM: dataStore.HUMID || "N/A",
        TEMP: dataStore.TEMP || "N/A",
        Date: dataStore.TimeStamp
          ? new Date(dataStore.TimeStamp).toLocaleString()
          : "N/A",
        Status: dataStore.Event || "N/A",
      });

      // Slots 2 to 5: Use placeholder data
      for (let i = 2; i <= 5; i++) {
        updatedDevices.push({
          ID: `EF00${i}`,
          CO2: "N/A",
          VOC: "N/A",
          RADON: "N/A",
          PRESSURE: "N/A",
          HUM: "N/A",
          TEMP: "N/A",
          Date: "N/A",
          Status: "N/A",
        });
      }

      setDevices(updatedDevices);
    };

    const interval = setInterval(updateDeviceData, 1000); // Update every 1 second
    return () => clearInterval(interval); // Cleanup when component unmounts
  }, []);

  // Divide devices into chunks of 5
  const chunkDevices = (array, size) =>
    array.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

  const deviceChunks = chunkDevices(devices, 5); // Split into chunks of 5

  // Handle the selection/deselection of metrics in dropdown
  const toggleMetric = (key) => {
    if (selectedMetrics.includes(key)) {
      setSelectedMetrics(selectedMetrics.filter((metric) => metric !== key));
    } else {
      setSelectedMetrics([...selectedMetrics, key]);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#fff] p-5 rounded-lg shadow-xl w-full relative mt-6">
      {/* Title and Dropdown in the same row */}
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-xl font-semibold  text-[#707178]">Data</h2>

        {/* Dropdown for selecting metrics */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[#ffffff] border border-[#ddd] text-[#323232] py-2 px-4 rounded-lg shadow-sm hover:bg-[#d4d3d3] focus:outline-none transition duration-200"
          >
            Select Metrics
            <span
              className={`ml-2 transform ${dropdownOpen ? "rotate-180" : "rotate-0"} transition-transform`}
            >
              ▼
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48 transition-all duration-300 ease-in-out">
              {metrics.map((metric) => (
                <div
                  key={metric.key}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleMetric(metric.key)}
                >
                  <input
                    type="checkbox"
                    className="mr-3 w-5 h-5 appearance-none border-2 border-gray-300 rounded-sm checked:bg-[#565656] checked:border-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    checked={selectedMetrics.includes(metric.key)}
                    readOnly
                  />
                  <span className="text-sm text-gray-700">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Data */}
      {deviceChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="w-full max-w-7xl bg-[#fff] p-3 rounded-lg">
          {/* Check if chunk has no data */}
          {chunk.length === 0 ? (
            <div className="text-center text-[#fff] py-4">No Data Available</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-[#fff]">
                <thead>
                  <tr className="bg-[#58A1DC] text-white">
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">CO2</th>
                    <th className="px-4 py-2 border">VOC</th>
                    <th className="px-4 py-2 border">RADON</th>
                    <th className="px-4 py-2 border">PRESSURE</th>
                    <th className="px-4 py-2 border">HUM</th>
                    <th className="px-4 py-2 border">TEMP</th>
                    <th className="px-4 py-2 border">DATE</th>
                    <th className="px-4 py-2 border">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {chunk.map((device, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#e5e4e4]"}`}
                    >
                      <td className="px-4 py-2 border">{device.ID}</td>
                      <td className="px-4 py-2 border">
                        {selectedMetrics.includes("CO2") ? `${device.CO2} ppm` : "-"}
                      </td>
                      <td className="px-4 py-2 border">
                        {selectedMetrics.includes("VOC") ? `${device.VOC} ppm` : "-"}
                      </td>
                      <td className="px-4 py-2 border">
                        {selectedMetrics.includes("RA") ? `${device.RADON} Bq/m³` : "-"}
                      </td>
                      <td className="px-4 py-2 border">
                        {selectedMetrics.includes("PRESSURE") ? `${device.PRESSURE} Pa` : "-"}
                      </td>
                      <td className="px-4 py-2 border">
                        {selectedMetrics.includes("HUMID") ? `${device.HUM} %` : "-"}
                      </td>
                      <td className="px-4 py-2 border">
                        {selectedMetrics.includes("TEMP") ? `${device.TEMP} °C` : "-"}
                      </td>
                      <td className="px-4 py-2 border">{device.Date}</td>
                      <td
                        className={`px-4 py-2 border text-center font-semibold ${
                          device.Status.toLowerCase() === "on"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {device.Status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeviceL;