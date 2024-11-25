import React from "react";
import "../styles/PieChartT.css";
import Tum from "../assets/pngegg.png";

const PieChartT = ({ percentage, color }) => {
    return (
      <div
        className="pieT"
        style={{
          "--p": percentage, // ค่า percentage ควรอยู่ในช่วง 0-100
          "--c": color, // สีที่ต้องการ
          "--b": "15px",
          "--w": "100px",
        }}
      >
        <img src={Tum} alt="Center Icon" className="center-image" />
      </div>
    );
  };
  
export default PieChartT;
