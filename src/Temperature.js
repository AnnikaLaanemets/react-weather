import React, { useState } from "react";
import "./App.css";

export default function Temperature(props) {
  const [unit, setUnit] = useState("Celsius");
  let temp = Math.round(props.celsius);
  let feels = Math.round(props.feels);
  let tempF = Math.round(temp * 1.8 + 32);
  let feelsF = Math.round(feels * 1.8 + 32);
  function convertF(event) {
    event.preventDefault();
    setUnit("Fahrenheit");
  }
  function convertC(event) {
    event.preventDefault();
    setUnit("Celsius");
  }
  if (unit === "Celsius") {
    return (
      <div>
        <span className="temperature">{temp} °</span>
        <span className="unit">
          C |
          <a onClick={convertF} href="/">
            F
          </a>
        </span>
        <br />
        <br />
        <div className="feels">Feels like: {feels} °C</div>
      </div>
    );
  } else {
    return (
      <div>
        <span className="temperature">{tempF} °</span>
        <span className="unit">
          <a onClick={convertC} href="/">
            C
          </a>
          | F
        </span>
        <br />
        <br />
        <div className="feels">Feels like: {feelsF} °F</div>
      </div>
    );
  }
}
