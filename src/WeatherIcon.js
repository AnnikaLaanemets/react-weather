import React from "react";
import "./App.css";

export default function WeatherIcon(props) {
  let icon = props.icon;
  let description = props.description;
  const icons = {
    "01d": "./icons/sun.png",
    "01n": "./icons/moon.png",
    "02d": "./icons/partly-sunny.png",
    "02n": "./icons/night.png",
    "03d": "./icons/clouds.png",
    "03n": "./icons/clouds.png",
    "04d": "./icons/clouds.png",
    "04n": "./icons/clouds.png",
    "09d": "./icons/rain.png",
    "09n": "./icons/rain-night.png",
    "10d": "./icons/light-rain.png",
    "10n": "./icons/rain-night.png",
    "11d": "./icons/thunder-rain.png",
    "11n": "./icons/thunder-night.png",
    "13d": "./icons/snow.png",
    "13n": "./icons/snow.png",
    "50d": "./icons/fog.png",
    "50n": "./icons/fog.png",
  };

  return (
    <img
      className="icon-main"
      src={require(`${icons[icon]}`)}
      alt={description}
    />
  );
}
