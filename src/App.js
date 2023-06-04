import "./App.css";
import WeatherToday from "./WeatherToday";
import React, { useState } from "react";

export default function App() {
  const [unit, setUnit] = useState("Celsius");
  return (
    <div className="App">
      <div className="container">
        <div className="grid wide">
          <div>
            <WeatherToday
              defaultCity="Barcelona"
              setUnit={setUnit}
              unit={unit}
            />
          </div>
        </div>
      </div>
      <footer>
        {" "}
        <a
          href="https://github.com/AnnikaLaanemets/react-weather-board"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/AnnikaLaanemets/react-weather
        </a>
      </footer>{" "}
    </div>
  );
}
