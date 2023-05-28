import "./App.css";
import WeatherToday from "./WeatherToday";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="grid wide">
          <div>
            <WeatherToday defaultCity="Tallinn" />
          </div>
        </div>
      </div>
      <footer>
        {" "}
        <a
          href="https://github.com/AnnikaLaanemets/react-weather-board"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/AnnikaLaanemets/react-weather
        </a>
      </footer>{" "}
    </div>
  );
}
