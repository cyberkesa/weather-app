import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
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
      <h2 className="text-center">Weather App</h2>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="dropdown-menu">
              {suggestions.map((suggestion) => (
                <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Get Weather
            </button>
          </div>
        </div>
      </form>
      {weatherData && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Город: {weatherData.name}</h3>
            <p className="card-text">Температура: {weatherData.main.temp}°C</p>
            <p className="card-text">Погода: {weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
