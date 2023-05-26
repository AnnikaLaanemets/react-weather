import React from "react";
import axios from "axios";
import WeatherToday from "./WeatherToday";

export default function button() {
  navigator.geolocation.getCurrentPosition(myLocation);
}

function myLocation(position) {
  const apiKey = "d606e3cc0939fabb37c7eb84c5c555bc";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(WeatherToday);
}
