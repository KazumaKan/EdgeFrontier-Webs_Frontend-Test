import React, { useState, useEffect } from "react";
import { dataStore } from "../page/DataHost";

const ChangeModeData = ({ selectedMode }) => {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => { 
    const fetchData = () => {
      if (selectedMode === "SAFE") {
        setDisplayData([
          { label: "CO2", value: dataStore.CO2 },
          { label: "VOC", value: dataStore.VOC },
          { label: "RA", value: dataStore.RA },
          { label: "PRESSURE", value: dataStore.PRESSURE },
          { label: "TEMP", value: dataStore.TEMP },
          { label: "HUMID", value: dataStore.HUMID },
        ]);
      } else if (selectedMode === "PREDICTION") {
        setDisplayData([
          { label: "Cold", value: dataStore.Prediction.Cold },
          { label: "Warm", value: dataStore.Prediction.Warm },
          { label: "Hot", value: dataStore.Prediction.Hot },
          { label: "Dry", value: dataStore.Prediction.Dry },
          { label: "Wet", value: dataStore.Prediction.Wet },
          { label: "Normal", value: dataStore.Prediction.Normal },
          { label: "Unknown", value: dataStore.Prediction.Unknown },
        ]);
      }
    };

    const interval = setInterval(fetchData, 1000); // อัปเดตข้อมูลทุก 1 วินาที
    return () => clearInterval(interval);
  }, [selectedMode]);

  return (
    <div className="card bg-white rounded-lg shadow-md p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-600">
        {selectedMode === "SAFE" ? "SAFE Mode Data" : "Prediction Mode Data"}
      </h2>
      <ul>
        {displayData.map((item) => (
          <li key={item.label} className="flex justify-between border-b py-2 text-gray-600">
            <span className="font-medium">{item.label}</span>
            <span>{item.value ?? "N/A"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChangeModeData;