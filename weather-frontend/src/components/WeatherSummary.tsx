// client/src/components/WeatherSummary.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherSummaryProps {
  city: string;
}

function WeatherSummary({ city }: WeatherSummaryProps) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await axios.get(`/api/weather/summary/${city}`);
      setSummary(response.data);
    };
    fetchSummary();
  }, [city]);

  if (!summary) return <div>Loading...</div>;

  return (
    <div>
      <h2>{city} Weather Summary</h2>
      <p>Average Temperature: {summary.avgTemp.toFixed(1)}°C</p>
      <p>Max Temperature: {summary.maxTemp.toFixed(1)}°C</p>
      <p>Min Temperature: {summary.minTemp.toFixed(1)}°C</p>
      <p>Dominant Weather: {summary.dominantWeather}</p>
    </div>
  );
}

export default WeatherSummary;
