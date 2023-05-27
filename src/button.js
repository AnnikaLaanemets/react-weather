import React from "react";
import axios from "axios";
import { handleResponse } from "./WeatherToday";

export default function button(setData) {
  navigator.geolocation.getCurrentPosition((position) => {
    const url = myLocationUrl(position);
    axios.get(url).then((response) => {
      setData(handleResponse(response));
    });
  });
}

function myLocationUrl(position) {
  const apiKey = "d606e3cc0939fabb37c7eb84c5c555bc";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  return url;
}
