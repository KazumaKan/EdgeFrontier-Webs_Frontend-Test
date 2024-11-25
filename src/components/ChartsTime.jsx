// ChartsTime.jsx
import React, { useState, useEffect } from "react";
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
import { dataStore } from "../page/DataHost"; // นำเข้าข้อมูลจาก DataHost.jsx

const ChartsTime = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataStore.speed) {
        setChartData((prevData) => {
          const newData = {
            timestamp: new Date().toLocaleTimeString(),
            speed: dataStore.speed,
          };

          // เพิ่มข้อมูลใหม่เข้าไปใน chartData
          const updatedData = [...prevData, newData];

          // จำกัดให้แสดงแค่ 5 ค่าสุดท้าย
          if (updatedData.length > 10) {
            updatedData.shift(); // ลบข้อมูลที่เก่าที่สุด
          }

          return updatedData;
        });
      }
    }, 1000); // อัปเดตข้อมูลทุกๆ 1 วินาที

    return () => clearInterval(interval); // ควบคุมการหยุดการอัปเดตเมื่อคอมโพเนนต์ถูกทำลาย
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis
          domain={["auto", "auto"]} // การตั้งค่าให้ Y-axis ปรับช่วงอัตโนมัติ
          tickFormatter={(value) => value.toFixed(2)} // การจัดรูปแบบตัวเลขให้แสดง 2 ตำแหน่งทศนิยม
          label={{
            value: "Speed (data/sec)", // ชื่อของแกน Y
            angle: -90,
            position: "insideLeft",
            style: {
              textAnchor: "middle",
              fontSize: 14,
            },
          }}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="speed" stroke="#FF0400" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartsTime;
