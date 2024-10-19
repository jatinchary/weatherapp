// server/src/controllers/weatherController.ts
import WeatherData from '../models/WeatherData';
import { fetchWeatherData } from '../services/weatherService';

export async function processWeatherData() {
  const weatherData = await fetchWeatherData();
  await WeatherData.insertMany(weatherData);
  return weatherData;
}

export async function getDailySummary(city: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const dailyData = await WeatherData.find({
    city,
    dt: { $gte: startOfDay.getTime() / 1000, $lte: endOfDay.getTime() / 1000 },
  });

  const temperatures = dailyData.map((data) => data.temp);
  const weatherConditions = dailyData.map((data) => data.main);

  return {
    city,
    date: date.toISOString().split('T')[0],
    avgTemp: temperatures.reduce((a, b) => a + b, 0) / temperatures.length,
    maxTemp: Math.max(...temperatures),
    minTemp: Math.min(...temperatures),
    dominantWeather: getDominantWeather(weatherConditions),
  };
}

function getDominantWeather(conditions: string[]): string {
  const counts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}
