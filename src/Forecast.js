import React, { useState, useEffect } from "react";
import ForecastDay from "./ForecastDay";

import axios from "axios";
import "./App.css";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function showForecast(response) {
    setLoaded(true);
    setForecast(response.data.daily);
  }

  if (loaded) {
    return (
      <div>
        <div className="grid row">
          {forecast.map(function (daily, index) {
            if (index < 8) {
              return (
                <div key={index} className={index < 1 ? "today" : ""}>
                  <ForecastDay unit={props.unit} data={daily} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    const key = "baf15f814713odta8a4baa99ed0733e5";
    let latitude = props.coordinates.lat;
    let longitude = props.coordinates.lon;
    const url = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${key}&units=metric`;
    axios.get(url).then(showForecast);
  }
}
