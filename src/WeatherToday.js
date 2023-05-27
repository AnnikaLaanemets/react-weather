import React, { useState } from "react";
import button from "./button";
import FormattedDate from "./FormattedDate";
import Temperature from "./Temperature";
import WeatherIcon from "./WeatherIcon";
import Countries from "./countries";
import axios from "axios";
import "./App.css";

export function handleResponse(response) {
  return {
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
  };
}

export default function WeatherToday(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [data, setData] = useState({ ready: false });
  const [firstRun, setFirstRun] = useState(true);
  if (firstRun) {
    Search();
    setFirstRun(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Search();
  }

  function handleChange(event) {
    setCity(event.target.value);
  }
  function setDatafromResponse(response) {
    console.log(response);
    console.log(handleResponse(response));
    setData(handleResponse(response));
  }

  function Search() {
    const key = "d606e3cc0939fabb37c7eb84c5c555bc";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url).then(setDatafromResponse);
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
          <button
            onClick={() => {
              button(setData);
            }}
          >
            Show my current location
          </button>
        </div>
        <div className="grid two-columns">
          <div
            className={`${
              data.icon === "01d" ||
              data.icon === "02d" ||
              data.icon === "03d" ||
              data.icon === "04d" ||
              data.icon === "50d"
                ? "day"
                : ""
            } ${
              data.icon === "01n" ||
              data.icon === "02n" ||
              data.icon === "03n" ||
              data.icon === "04n" ||
              data.icon === "13n" ||
              data.icon === "50n"
                ? "night"
                : ""
            }
             ${
               data.icon === "09d" || data.icon === "10d" || data.icon === "11d"
                 ? "rain"
                 : ""
             } ${data.temperature < 0 ? "snow" : ""} 
           `}
          >
            <h1>
              {data.city},
              <Countries country={data.country} />
            </h1>
            <div>
              <div>
                <FormattedDate
                  current={data.date}
                  sr={data.sunrise}
                  ss={data.sunset}
                  hasDate={true}
                  hasSunrise={false}
                  hasSunset={false}
                />
              </div>
              <div>
                <WeatherIcon icon={data.icon} description={data.description} />
              </div>
              <Temperature celsius={data.temperature} feels={data.feels} />
            </div>
          </div>
          <div className="description">
            <h3>{data.description}</h3>
            <div>Wind: {data.wind} km/h</div>
            <div>Humidity: {data.humidity} %</div>
            <div>Visibility: {data.visibility} % </div>
            <div>Pressure: {data.pressure} % </div>
            <FormattedDate
              current={data.date}
              sr={data.sunrise}
              ss={data.sunset}
              hasDate={false}
              hasSunrise={true}
              hasSunset={true}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
