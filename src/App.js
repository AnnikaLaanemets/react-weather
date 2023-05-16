import logo from "./logo.svg";
import "./App.css";
import WeatherToday from "./WeatherToday";
import Sunset from "./Sunset";
import Forecast from "./Forecast";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div class="grid wide">
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
}

export default App;
