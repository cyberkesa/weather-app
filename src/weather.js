import React, { useState, useEffect } from "react";
import axios from "axios";
import './Weather.css'; 

const Weather = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bc7a189c92dab3721b18a73a237d32c0&units=metric&lang=ru`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="container">
      <h2
        className="text-center"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      >
        Weather App
      </h2>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Введите город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="dropdown-menu">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Узнать погоду
            </button>
          </div>
        </div>
      </form>
      {weatherData && (
        <div className="card">
          <div className="card-body">
            <h3 className="location">{weatherData.name}, {weatherData.sys.country}</h3>
            <p className="temperature">{weatherData.main.temp}°C</p>
            <p className="card-text" style={{ display: "inline-block" }}>
              Погода: {weatherData.weather[0].description}
            </p>
            <img
              src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              style={{ display: "inline-block", marginLeft: "10px" }}
              alt="Weather Icon"
            />
            <p className="card-text">Влажность: {weatherData.main.humidity}%</p>
            <p className="card-text">
              Скорость ветра: {weatherData.wind.speed} м/с
            </p>
            <p className="card-text">Облачность: {weatherData.clouds.all}%</p>
            <p className="card-text">
              Давление: {weatherData.main.pressure} гПа
            </p>
            <p className="card-text">
              Восход солнца:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="card-text">
              Заход солнца:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
