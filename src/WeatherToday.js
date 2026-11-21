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

function getBackgroundClass(icon) {
  const condition = icon.slice(0, 2);
  if (condition === "13") return "snow";
  if (condition === "50") return "fog";
  if (icon.endsWith("n")) return "night";
  if (["09", "10", "11"].includes(condition)) return "fog";
  if (condition === "03" || condition === "04") return "clouds";
  return "day";
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
          <div className={getBackgroundClass(data.icon)}>
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
