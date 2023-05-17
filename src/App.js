import logo from "./logo.svg";
import "./App.css";
import WeatherToday from "./WeatherToday";
import Sunset from "./Sunset";
import Forecast from "./Forecast";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="grid wide">
          <div>
            <WeatherToday />
          </div>
          <div>
            <Sunset />
          </div>
        </div>
        <div>
          <Forecast />
        </div>
      </div>
    </div>
  );
  <footer>https://github.com/AnnikaLaanemets/react-weather-board</footer>;
}

export default App;
