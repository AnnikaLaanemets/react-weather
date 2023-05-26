import React, { useState } from "react";
import button from "./button";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import Countries from "./countries";
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
      date: response.data.timezone,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feels: Math.round(response.data.main.feels_like),
      icon: response.data.weather[0].icon,
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
          <button onClick={button}>Show my current location</button>
        </div>
        <div className="grid two-columns">
          <div className="main">
            <h1>
              {data.city}
              <Countries country={data.country} />
            </h1>
            <div>
              <div>
                <FormattedDate
                  current={data.date}
                  sr={data.sunrise}
                  ss={data.sunset}
                />
              </div>
              <div>
                <WeatherIcon icon={data.icon} description={data.description} />
              </div>
              <div className="grid">
                <span id="temperature">{data.temperature} °C</span>
                <div>
                  <span>Feels like: {data.feels} °C</span>
                </div>
              </div>
            </div>
          </div>
          <div className="description">
            <h3>{data.description}</h3>
            <div>Wind: {data.wind} km/h</div>
            <div>Humidity: {data.humidity} %</div>
            <div>Visibility: {data.visibility} % </div>
            <div>Pressure: {data.pressure} % </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
