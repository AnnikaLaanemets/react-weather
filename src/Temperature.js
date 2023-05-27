import React, { useState } from "react";

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
        <span>{temp} °</span>
        <span className="Unit">
          C |
          <a onClick={convertF} href="/">
            F
          </a>
        </span>
        <div>Feels like: {feels} °C</div>
      </div>
    );
  } else {
    return (
      <div>
        <span>{tempF} °</span>
        <span className="Unit">
          <a onClick={convertC} href="/">
            C
          </a>
          | F
        </span>
        <div>Feels like: {feelsF} °F</div>
      </div>
    );
  }
}
