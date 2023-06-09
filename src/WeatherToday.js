import React, { useState } from "react";
import ActivateButton from "./ActivateButton";
import FormattedDate from "./FormattedDate";
import Temperature from "./Temperature";
import WeatherIcon from "./WeatherIcon";
import Forecast from "./Forecast";
import Countries from "./countries";
import axios from "axios";
import "./App.css";

export function HandleResponse(response) {
  return {
    ready: true,
    coords: response.data.coord,
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

  function HandleSubmit(event) {
    event.preventDefault();
    Search();
  }

  function HandleChange(event) {
    setCity(event.target.value);
  }
  function SetDatafromResponse(response) {
    setData(HandleResponse(response));
  }

  function Search() {
    const key = "d606e3cc0939fabb37c7eb84c5c555bc";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url).then(SetDatafromResponse);
  }

  if (data.ready) {
    return (
      <div>
        <div className="search-form">
          <form onSubmit={HandleSubmit}>
            <input
              type="text"
              placeholder="Search city"
              autoComplete="off"
              autoFocus="on"
              id="search-input"
              onChange={HandleChange}
            />
            <input type="submit" value="Submit" />
          </form>
          <button
            onClick={() => {
              ActivateButton(setData);
            }}
          >
            Show my current location
          </button>
        </div>
        <div className="grid two-columns">
          <div
            className={`
            ${
              data.icon === "01d" ||
              data.icon === "02d" ||
              data.icon === "03d" ||
              data.icon === "04d"
                ? "day"
                : ""
            } ${data.icon === "03d" || data.icon === "04d" ? "clouds" : ""} ${
              data.icon === "01n" ||
              data.icon === "02n" ||
              data.icon === "03n" ||
              data.icon === "04n" ||
              data.icon === "09n" ||
              data.icon === "10n" ||
              data.icon === "11n"
                ? "night"
                : ""
            }
          
             ${
               data.icon === "09d" ||
               data.icon === "10d" ||
               data.icon === "11d" ||
               data.icon === "50d" ||
               data.icon === "50n"
                 ? "fog"
                 : ""
             } 
             ${data.temperature < 2 ? "snow" : ""}
           `}
          >
            <h1>
              {data.city},&nbsp;
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
              <h3 className={data.description.length > 15 ? "smaller" : ""}>
                {data.description}
              </h3>
              <div>
                <WeatherIcon icon={data.icon} description={data.description} />
              </div>
              <Temperature
                setUnit={props.setUnit}
                unit={props.unit}
                celsius={data.temperature}
                feels={data.feels}
              />
            </div>
          </div>
          <div className="description">
            <div>Wind: {data.wind} m/s</div>
            <div>Humidity: {data.humidity} %</div>
            <div>Visibility: {data.visibility} m </div>
            <div>Pressure: {data.pressure} hPa </div>

            <img
              className="sunset"
              src={require("./icons/sunset.png")}
              alt="Sunset icon"
            />

            <FormattedDate
              className="date"
              current={data.date}
              sr={data.sunrise}
              ss={data.sunset}
              hasDate={false}
              hasSunrise={true}
              hasSunset={true}
            />
          </div>
        </div>

        <Forecast coordinates={data.coords} unit={props.unit} />
      </div>
    );
  } else {
    return (
      <div>
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
          <div className="fog">
            <h1>Loading...</h1>
          </div>
          <div className="description">
            <div>...</div>
          </div>
        </div>
      </div>
    );
  }
}
