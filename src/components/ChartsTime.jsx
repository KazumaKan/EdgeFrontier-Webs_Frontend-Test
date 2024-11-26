import { useState, useEffect } from "react";
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
      if (dataStore.speed && isFinite(dataStore.speed)) { // ตรวจสอบว่า speed มีค่าและไม่ใช่ Infinity
        setChartData((prevData) => {
          const newData = {
            timestamp: new Date().toLocaleTimeString(), // เวลาปัจจุบัน
            speed: dataStore.speed,
          };

          // เพิ่มข้อมูลใหม่เข้าไปใน chartData
          const updatedData = [...prevData, newData];

          // จำกัดให้แสดงแค่ 7 ค่าสุดท้าย
          if (updatedData.length > 7) {
            updatedData.shift(); // ลบข้อมูลที่เก่าที่สุด
          }

          return updatedData;
        });
      }
    }, 1000); // อัปเดตข้อมูลทุกๆ 1 วินาที

    return () => clearInterval(interval); // หยุด interval เมื่อ component ถูกทำลาย
  }, []);

  return (
    <div className="bg-[#fff] p-6 rounded-lg shadow-xl mt-6 ">
      <h2 className="text-xl font-semibold text-[#707178] text-center mb-6">
        Speed Over Time
      </h2>
      <ResponsiveContainer width={572} height={330}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="timestamp" // ใช้ "timestamp" ในการแสดงเวลาบนแกน X
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={{ stroke: "#ddd" }}
            interval={0} // แสดงทุกค่าบนแกน X (ไม่เว้นระยะ)
          />
          <YAxis
            domain={[0, 50]} // การตั้งค่าช่วงของแกน Y ให้มีค่า 0 ถึง 50
            tickFormatter={(value) => value.toFixed(2)} // การจัดรูปแบบตัวเลขให้แสดง 2 ตำแหน่งทศนิยม
            label={{
              value: "Speed (data/sec)", // ชื่อของแกน Y
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fontSize: 14,
                fill: "#555",
              },
            }}
            tick={{ fontSize: 12, fill: "#555" }}
          />
          <Tooltip
            wrapperStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "14px",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#555",
            }}
          />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#007BFF" // สีของเส้นกราฟ (เช่น ฟ้า)
            strokeWidth={3}
            dot={{ r: 5, fill: "#007BFF" }} // ปรับจุดในกราฟ
            activeDot={{ r: 8, stroke: "#0056b3", strokeWidth: 2 }} // ปรับ active dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsTime;