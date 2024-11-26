import React, { useState, useEffect } from "react";
import { LuSettings2 } from "react-icons/lu";

// ดึงข้อมูลจาก dataStore
import { dataStore } from "../page/DataHost";

const InvoiceStatistic = () => {
  // State สำหรับข้อมูลที่แสดง
  const [data, setData] = useState([]);

  // State สำหรับการแสดง/ซ่อนข้อมูล
  const [visibleItems, setVisibleItems] = useState({
    CO2: true,
    VOC: true,
    RA: true,
    PRESSURE: true,
    HUMID: true,
    TEMP: true,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ดึงข้อมูลแบบเรียลไทม์จาก dataStore
  useEffect(() => {
    // ฟังก์ชันที่จะทำให้ข้อมูลใน dataStore อัปเดต
    const updateData = () => {
      const updatedData = Object.keys(dataStore)
        .filter((key) => !["Event", "HardwareID", "TimeStamp"].includes(key)) // กรองข้อมูลที่ไม่ต้องการ
        .map((key) => ({
          label: key.toUpperCase(),
          value: dataStore[key],
          color: getColorByKey(key), // ใช้ฟังก์ชันเพื่อกำหนดสี
        }));
      setData(updatedData); // อัปเดตข้อมูล
    };

    // เรียก updateData ทุกครั้งที่ WebSocket ส่งข้อมูลใหม่มา
    const interval = setInterval(updateData, 2000); // ทุกๆ 2 วินาที

    return () => clearInterval(interval); // เคลียร์ interval เมื่อ component ถูกทำลาย
  }, []);

  // ฟังก์ชันเพื่อกำหนดสีตามค่า key
  const getColorByKey = (key) => {
    const colors = {
      CO2: "#FF5733",
      HUMID: "#FFF600",
      PRESSURE: "#1E90FF",
      RA: "#807FCF",
      TEMP: "#FF6F00",
      VOC: "#39D353",
    };
    return colors[key] || "#ccc"; // กำหนดสี default
  };

  // ฟิลเตอร์ข้อมูลที่มองเห็น
  const visibleData = data.filter((item) => visibleItems[item.label]);

  // คำนวณ total และเปอร์เซ็นต์ใหม่
  const visibleTotal = visibleData.reduce((sum, item) => sum + item.value, 0);
  const adjustedData = visibleData.map((item) => ({
    ...item,
    adjustedPercentage:
      visibleTotal > 0 ? Math.round((item.value / visibleTotal) * 100) : 0,
  }));

  // สร้าง Gradient สำหรับ Pie Chart
  let cumulativeValue = 0;
  const gradientSegments = adjustedData
    .map((item) => {
      const startPercentage = cumulativeValue;
      cumulativeValue += item.adjustedPercentage;
      return `${item.color} ${startPercentage}% ${cumulativeValue}%`;
    })
    .join(", ");

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  const handleToggleItem = (label) => {
    setVisibleItems((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <main className="flex flex-col items-center justify-start bg-[#fff] p-5 rounded-lg shadow-xl relative mt-6 ">
      <h2 className="text-xl font-semibold  text-[#707178] mb-6">
        Invoice Statistic
      </h2>

      <div className="flex items-center mt-8">
        {/* Pie Chart */}
        <div
          className="relative w-52 h-52 rounded-full"
          style={{
            background:
              visibleTotal > 0 ? `conic-gradient(${gradientSegments})` : "gray",
          }}
        >
          <div className="absolute inset-6 bg-[#fff] rounded-full"></div>
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-lg font-bold text-[#454444]">
              {visibleTotal} Total
            </span>
          </div>
        </div>

        {/* Settings Button */}
        <button
          onClick={toggleDropdown}
          className="absolute top-4 right-4 p-2 text-white bg-gray-400 rounded-full flex items-center justify-center"
        >
          <LuSettings2 size={20} />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-12 right-4 bg-white shadow-lg rounded-lg w-48 p-4 text-sm text-gray-700">
            {data
              .filter(
                (item) =>
                  ![
                    "Event",
                    "HardwareID",
                    "TimeStamp",
                    "LASTRECEIVEDTIME",
                    "SPEED",
                  ].includes(item.label) // เพิ่ม LASTRECEIVEDTIME และ SPEED ในเงื่อนไขการกรอง
              )
              .map((item) => (
                <div key={item.label} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={visibleItems[item.label]}
                    onChange={() => handleToggleItem(item.label)}
                    className="mr-2"
                  />
                  <label>{item.label}</label>
                </div>
              ))}
          </div>
        )}

        {/* Legend */}
        <ul className="mt-0 ml-6 bg-[#F9F8F8] shadow-lg rounded-lg w-64 p-4 text-sm text-[#595959]">
          {adjustedData.map((item) => (
            <li
              key={item.label}
              className="flex justify-between items-center mb-2 last:mb-0"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.label}</span>
              <span>
                {item.value} ({item.adjustedPercentage}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default InvoiceStatistic;
