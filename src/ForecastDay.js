import React, { useState, useEffect } from "react";
import ForecastIcon from "./ForecastIcon";
import moment from "moment";
import "./App.css";

export default function ForecastDay(props) {
  let [day, setDay] = useState(false);

  function ShowDay() {
    let Day = props.data.time * 1000;
    Day = new Date(Day);
    Day = moment(Day).format("dddd");

    useEffect(() => {
      setTimeout(() => {
        setDay(Day);
      }, 100);
    });
    return day;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.temperature.minimum);
    return `${temperature}`;
  }

  function maxTemperature() {
    let temperature = Math.round(props.data.temperature.maximum);
    return `${temperature}`;
  }

  return (
    <div className="grid three-rows">
      <div>{ShowDay()}</div>
      <div>
        <ForecastIcon
          icon={props.data.condition.icon}
          description={props.data.condition.description}
        />
      </div>
      <div className="dailyTemperature">
        {minTemperature()} | {maxTemperature()}
        °C
      </div>
    </div>
  );
}
