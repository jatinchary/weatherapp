// server/src/models/WeatherData.ts
import mongoose from 'mongoose';

const weatherDataSchema = new mongoose.Schema({
  city: String,
  main: String,
  temp: Number,
  feels_like: Number,
  dt: Number,
});

export default mongoose.model('WeatherData', weatherDataSchema);
