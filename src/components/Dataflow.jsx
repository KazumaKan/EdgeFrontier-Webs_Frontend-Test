import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { dataStore } from "../page/DataHost"; // Assuming dataStore is available like in Card

const FlowData = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([
    "TEMP",
    "HUMID",
    "CO2",
    "VOC",
    "RODON",
    "PRESSURE",
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const metrics = [
    { key: "TEMP", label: "Temperature" },
    { key: "HUMID", label: "Humidity" },
    { key: "CO2", label: "CO2" },
    { key: "VOC", label: "VOC" },
    { key: "RODON", label: "Radon" },
    { key: "PRESSURE", label: "Pressure" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = {
        time: new Date().toLocaleTimeString(),
        TEMP: dataStore.TEMP || Math.random() * 40,
        HUMID: dataStore.HUMID || Math.random() * 100,
        CO2: dataStore.CO2 || Math.random() * 2000,
        VOC: dataStore.VOC || Math.random() * 300,
        RODON: dataStore.RA || Math.random() * 10,
        PRESSURE: dataStore.PRESSURE || Math.random() * 1000,
      };

      setChartData((prevData) => [...prevData.slice(-10), updatedData]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleMetric = (key) => {
    if (selectedMetrics.includes(key)) {
      setSelectedMetrics(selectedMetrics.filter((metric) => metric !== key));
    } else {
      setSelectedMetrics([...selectedMetrics, key]);
    }
  };

  return (
    <div className="bg-gradient-to-r bg-gray-200 p-5 rounded-lg shadow-xl w-full relative mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-[#707178]">Flow Data Visualization</h2>

        {/* Dropdown for selecting metrics */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none transition duration-200"
          >
            ALL
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
                >
                  <input
                    type="checkbox"
                    className="mr-3 w-5 h-5 appearance-none border-2 border-gray-300 rounded-sm checked:bg-[#565656] checked:border-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    checked={selectedMetrics.includes(metric.key)}
                    onChange={() => toggleMetric(metric.key)}
                  />
                  <span className="text-sm text-gray-700">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedMetrics.includes("TEMP") && <Line type="monotone" dataKey="TEMP" stroke="#3ABEFF" />}
            {selectedMetrics.includes("HUMID") && <Line type="monotone" dataKey="HUMID" stroke="#0F5DC3" />}
            {selectedMetrics.includes("CO2") && <Line type="monotone" dataKey="CO2" stroke="#FF9D00" />}
            {selectedMetrics.includes("VOC") && <Line type="monotone" dataKey="VOC" stroke="#43D2A7" />}
            {selectedMetrics.includes("RODON") && <Line type="monotone" dataKey="RODON" stroke="#67A4F4" />}
            {selectedMetrics.includes("PRESSURE") && <Line type="monotone" dataKey="PRESSURE" stroke="#DB2777" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FlowData;
