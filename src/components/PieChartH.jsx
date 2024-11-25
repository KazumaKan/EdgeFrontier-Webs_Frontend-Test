import React from "react";
import "../styles/PieChartH.css";
import Hum from "../assets/hum1.png"

const PieChartH = ({ percentage, color, image }) => {
  return (
    <div
      className="pieH"
      style={{
        "--p": percentage,
        "--c": color,
        "--b": "15px",
        "--w": "100px",
      }}
    >
      <img src={Hum} alt="Center Icon" className="center-image" />
    </div>
  );
};

export default PieChartH;

