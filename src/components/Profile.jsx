import React from "react";
import "../styles/Profile.css";

import proF from "../assets/profile.png";
import factory from "../assets/factory.png"

const profile = () => {
  return (
    <div className="profile">
      <div className="user--profile">
        <div className="user--detail">
          <img src={proF} alt="profile"/>
          <h3 className="username">oooooooo</h3>
        </div>

        <div className="analyze-container">
          <div className="analyze">
            <p>Analyze Content Here</p>
          </div>
        </div>
        <img src={factory} alt="factory"/>
      </div>
    </div>
  );
};

export default profile;
