import ForecastIcon from "./ForecastIcon";
import moment from "moment";
import "./App.css";

export default function ForecastDay(props) {
  const day = moment(new Date(props.data.time * 1000)).format("dddd");

  function minTemperature() {
    let temperature = Math.round(props.data.temperature.minimum);
    if (props.unit === "Celsius") {
      return `${temperature}`;
    }
    return `${Math.round(temperature * 1.8 + 32)}`;
  }

  function maxTemperature() {
    let temperature = Math.round(props.data.temperature.maximum);
    if (props.unit === "Celsius") {
      return `${temperature}  °C`;
    }
    return `${Math.round(temperature * 1.8 + 32)}  °F`;
  }

  return (
    <div className="grid three-rows">
      <div>{day}</div>
      <div>
        <ForecastIcon
          icon={props.data.condition.icon}
          description={props.data.condition.description}
        />
      </div>
      <div className="dailyTemperature">
        {minTemperature()} / {maxTemperature()}
      </div>
    </div>
  );
}
