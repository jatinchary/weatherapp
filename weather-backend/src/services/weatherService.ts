// server/src/services/weatherService.ts
import axios from 'axios';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

export async function fetchWeatherData() {
  const weatherData = await Promise.all(
    CITIES.map(async (city) => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      return {
        city,
        main: response.data.weather[0].main,
        temp: response.data.main.temp - 273.15, // Convert to Celsius
        feels_like: response.data.main.feels_like - 273.15,
        dt: response.data.dt,
      };
    })
  );
  return weatherData;
}
