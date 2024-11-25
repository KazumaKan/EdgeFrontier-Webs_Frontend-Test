import React from "react";
import "../styles/RangeMeter.css";

const RangeMeter = ({ value }) => {
  // Normalize the range to between 0 and 100 for the slider
  const normalizedValue = Math.min(Math.max(value, 0), 100); // Ensure the value is between 0 and 100
  
  const rotateClock = -90 + (normalizedValue * 180) / 100;

  return (
    <div className="wrapper">
      <div className="rang">
        <svg className="meter">
          <circle className="meter-left" r="96" cx="135" cy="142" />
          <circle className="meter-center" r="96" cx="136" cy="142" />
          <circle className="meter-right" r="96" cx="138" cy="142" />
          <polygon
            className="meter-clock"
            points="129,145 137,90 145,145"
            style={{
              transform: `rotate(${rotateClock}deg)`,
              transformOrigin: "137px 146px",
            }}
          />
          <circle className="meter-circle" r="10" cx="137" cy="145" />
        </svg>
      </div>
    </div>
  );
};

export default RangeMeter;
