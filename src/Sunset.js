import React from "react";
import axios from "axios";
import "./App.css";

export default function Sunset() {
  return (
    <div className="sunset">
      <div>
        <img
          className="icon"
          src={require("./icons/sunset.png")}
          width="180px"
          alt="sunset/sunrise"
        />
      </div>
      <br />
      <div className="grid two-columns">
        <h4>SUNRISE</h4>
        <h4>SUNSET</h4>
        <div>6:49</div>
        <div>20:47</div>
        <div>14 °C</div>
        <div>17 °C</div>
        <div>12 km/h</div>
        <div>26 km/h</div>
        <div>Clear sky</div>
        <div>Clear sky</div>
      </div>
    </div>
  );
}
