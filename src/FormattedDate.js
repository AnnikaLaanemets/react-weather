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
  let TZ = timezones[timezone];
  let local = TZ - offsetHours;
  let adjustedTime = new Date(date.getTime() + local * 3600 * 1000);
  let time = moment(adjustedTime).format("YYYY MMMM DD dddd, HH:mm");

  let sunrise = moment(sunriseTime.getTime() + local * 3600 * 1000).format(
    "YYYY HH:mm"
  );
  let sunset = moment(sunsetTime.getTime() + local * 3600 * 1000).format(
    "YYYY HH:mm"
  );

  return (
    <div>
      <div>{time}</div>
      <div>{sunrise}</div>
      <div>{sunset}</div>
    </div>
  );
}

let timezones = {
  "-43200": "-12",
  "-39600": "-11",
  "-36000": "-10",
  "-34200": "-9.5",
  "-32400": "-9",
  "-28800": "-8",
  "-25200": "-7",
  "-21600": "-6",
  "-18000": "-5",
  "-16200": "-4.5",
  "-14400": "-4",
  "-12600": "-3.5",
  "-10800": "-3",
  "-7200": "-2",
  "-3600": "-1",
  0: "0",
  3600: "1",
  7200: "2",
  10800: "3",
  12600: "3.5",
  14400: "4",
  16200: "4.5",
  18000: "5",
  19800: "5.5",
  20700: "5.75",
  21600: "6",
  23400: "6.5",
  25200: "7",
  28800: "8",
  32400: "9",
  34200: "9.5",
  36000: "10",
  37800: "10.5",
  39600: "11",
  41400: "11.5",
  43200: "12",
  45900: "12.75",
  46800: "13",
  50400: "14",
};
