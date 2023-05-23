import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import axios from "axios";
import "./App.css";

export default function WeatherToday(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [data, setData] = useState({ ready: false });
  const [firstRun, setFirstRun] = useState(true);
  if (firstRun) {
    Search();
    setFirstRun(false);
  }

  function handleResponse(response) {
    console.log(response);
    setData({
      ready: true,
      city: response.data.name,
      date: new Date(response.data.timezone * 1000),
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feels: Math.round(response.data.main.feels_like),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      visibility: response.data.visibility,
      pressure: response.data.main.pressure,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    Search();
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  function Search() {
    const key = "d606e3cc0939fabb37c7eb84c5c555bc";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url).then(handleResponse);
  }

  if (data.ready) {
    return (
      <div>
        <div className="search-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search city"
              autoComplete="off"
              autoFocus="on"
              id="search-input"
              onChange={handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
          <button>Show my current location</button>
        </div>
        <div className="grid two-columns">
          <div className="description">
            <h3>{data.description}</h3>
            <div>Wind: {data.wind} km/h</div>
            <div>Humidity: {data.humidity} %</div>
            <div>Visibility: {data.visibility} % </div>
            <div>Pressure: {data.pressure} % </div>
            <div>Sunrise: {data.sunrise}</div>
            <div>Sunset: {data.sunset}</div>
          </div>

          <div className="main">
            <h1>
              {data.city}, {data.country}
            </h1>
            <div>
              <div>
                <FormattedDate date={data.date} />
              </div>
              <div>
                <img
                  className="icon-main"
                  src={require("./icons/sun.png")}
                  width="200px"
                  alt="weather icon"
                ></img>
              </div>
              <div className="grid wide">
                <span id="temperature">{data.temperature} °C</span>

                <br />
                <div>
                  <span>Feels like: {data.feels} °C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
