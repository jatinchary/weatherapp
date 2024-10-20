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
    avgTemp: temperatures.filter((temp): temp is number => temp !== null && temp !== undefined)
      .reduce((a, b) => a + b, 0) / temperatures.filter((temp): temp is number => temp !== null && temp !== undefined).length,
    maxTemp: Math.max(...temperatures.filter((temp): temp is number => temp !== null && temp !== undefined)),
    minTemp: Math.min(...temperatures.filter((temp): temp is number => temp !== null && temp !== undefined)),
    dominantWeather: getDominantWeather(weatherConditions.filter((condition): condition is string => condition !== null && condition !== undefined)),
  };
  
  
}

function getDominantWeather(conditions: string[]): string {
  const counts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}
