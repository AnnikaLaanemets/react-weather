import "./App.css";

export default function WeatherToday() {
  return (
    <div className="grid two-rows">
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
        <div className="description">
          <h3>Partly sunny</h3>
          <div>
            <span>Precipitation: </span>
            <span>12%</span>
          </div>
          <div>
            <span>Wind: </span>
            <span>8 km/h</span>
          </div>
          <div>
            <span>Humidity: </span>
            <span>82%</span>
          </div>
          <div>
            <span>Visibility: </span>
            <span id="visibility">10 km</span>
          </div>
          <div>
            <span>UV-index: </span>
            <span>3</span>
          </div>
        </div>

        <div className="main">
          <h1>Barcelona, Spain</h1>
          <div id="date">Sunday 14:00</div>
          <div className="grid wide">
            <span id="temperature">21°C</span>
            <img
              className="icon"
              src={require("./icons/rain.png")}
              width="200px"
            />
          </div>
          <br />
          <div>
            <span>Feels like: </span>
            <span>22°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
