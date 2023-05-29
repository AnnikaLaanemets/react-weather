import React from "react";

export default function ForecastIcon(props) {
  let icon = props.icon;
  let description = props.description;
  const icons = {
    "clear-sky-day": "./icons/sun.png",
    "clear-sky-night": "./icons/moon.png",
    "few-clouds-day": "./icons/partly-sunny.png",
    "few-clouds-night": "./icons/night.png",
    "scattered-clouds-day": "./icons/clouds.png",
    "scattered-clouds-night": "./icons/clouds.png",
    "broken-clouds-day": "./icons/clouds.png",
    "broken-clouds-night": "./icons/clouds.png",
    "shower-rain-day": "./icons/rain.png",
    "shower-rain-night": "./icons/rain-night.png",
    "rain-day": "./icons/light-rain.png",
    "rain-night": "./icons/rain-night.png",
    "thunderstorm-day": "./icons/thunder-rain.png",
    "thunderstorm-night": "./icons/thunder-night.png",
    "snow-day": "./icons/snow.png",
    "snow-night": "./icons/snow.png",
    "mist-day": "./icons/fog.png",
    "mist-night": "./icons/fog.png",
  };

  return (
    <img className="icon" src={require(`${icons[icon]}`)} alt={description} />
  );
}
