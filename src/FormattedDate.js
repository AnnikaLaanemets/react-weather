import React from "react";
import moment from "moment";

//näitab ainult minu ajatsooni aega õigesti
export default function FormattedDate(props) {
  let date = new Date();
  let sunriseTime = new Date(props.sr * 1000);
  let sunsetTime = new Date(props.ss * 1000);

  let timezone = props.current;
  let timeZoneOffset = date.getTimezoneOffset();
  let offsetHours = -timeZoneOffset / 60;
  let TZ = timezone / 3600;
  let local = TZ - offsetHours;
  let adjustedTime = new Date(date.getTime() + local * 3600 * 1000);
  let time = moment(adjustedTime).format("YYYY MMMM DD dddd, HH:mm");

  let sunrise = moment(sunriseTime.getTime() + local * 3600 * 1000).format(
    "HH:mm"
  );
  let sunset = moment(sunsetTime.getTime() + local * 3600 * 1000).format(
    "HH:mm"
  );

  return (
    <div>
      {props.hasDate && <div>{time}</div>}
      {props.hasSunrise && <div>Sunrise: {sunrise}</div>}
      {props.hasSunset && <div>Sunset: {sunset}</div>}
    </div>
  );
}
