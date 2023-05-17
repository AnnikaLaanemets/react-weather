import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function WeatherToday(props) {
  let [data, setData] = useState({ ready: false });

  function handleresponse(response) {
    console.log(response);
    setData({
      ready: true,
      city: response.data.city,
      country: response.data.country,
      temperature: response.data.temperature.current,
      feels: response.data.temperature.feels_like,
      description: response.data.description,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
    });
  }

  if (data.ready) {
    return (
      <div className="grid two-rows">
        <div className="search-form">
          <form>
            <input
              type="text"
              placeholder="Search city"
              autoComplete="off"
              autoFocus="on"
              id="search-input"
            />
            <input type="submit" value="Submit" />
          </form>
          <button>Show my current location</button>
        </div>

        <div className="grid two-columns">
          <div className="description">
            <h3>{data.description}</h3>
            <div>
              <span>Precipitation: </span>
              <span>12%</span>
            </div>
            <div>
              <span>Wind: </span>
              <span>{data.wind}</span>
            </div>
            <div>
              <span>Humidity: </span>
              <span>{data.humidity}</span>
            </div>
            <div>
              <span>Visibility: </span>
              <span id="visibility">10 km</span>
            </div>
            <div>
              <span>UV-index: </span>
              <span>3</span>
            </div>
          </div>

          <div className="main">
            <h1>
              {data.city}, {data.country}
            </h1>
            <div id="date">Sunday 14:00</div>
            <div className="grid wide">
              <span id="temperature">{Math.round(data.temperature)}</span>
              <img
                className="icon"
                src={require("./icons/rain.png")}
                width="200px"
                alt="weather icon"
              />
            </div>
            <br />
            <div>
              <span>Feels like: {Math.round(data.feels)} </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const key = "baf15f814713odta8a4baa99ed0733e5";
    let query = "Copenhagen";
    let url = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${key}&units=metric`;
    axios.get(url).then(handleresponse);

    return "Loading...";
  }
}
