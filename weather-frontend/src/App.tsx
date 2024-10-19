// client/src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSummary from './components/WeatherSummary';
import WeatherChart from './components/WeatherChart';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Delhi');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/weather/current');
      setWeatherData(response.data);
    };
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Fetch every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Weather Monitoring System</h1>
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        {weatherData.map((data) => (
          <option key={data.city} value={data.city}>
            {data.city}
          </option>
        ))}
      </select>
      <WeatherSummary city={selectedCity} />
      <WeatherChart city={selectedCity} />
    </div>
  );
}

export default App;
