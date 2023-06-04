import React from "react";

import "./App.css";

export default function Temperature(props) {
  let temp = Math.round(props.celsius);
  let feels = Math.round(props.feels);
  let tempF = Math.round(temp * 1.8 + 32);
  let feelsF = Math.round(feels * 1.8 + 32);
  function ConvertF(event) {
    event.preventDefault();
    props.setUnit("Fahrenheit");
  }
  function ConvertC(event) {
    event.preventDefault();
    props.setUnit("Celsius");
  }
  if (props.unit === "Celsius") {
    return (
      <div>
        <span className="temperature">{temp} °</span>
        <span className="unit">
          C |
          <a
            onClick={function (event) {
              ConvertF(event);
            }}
            href="/"
          >
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
          <a onClick={ConvertC} href="/">
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
