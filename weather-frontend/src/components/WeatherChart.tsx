// client/src/components/WeatherChart.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  city: string;
}

function WeatherChart({ city }: WeatherChartProps) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await axios.get(`/api/weather/daily/${city}`);
      const data = response.data;
      
      const labels = data.map((entry: any) => new Date(entry.dt * 1000).toLocaleTimeString());
      const temperatures = data.map((entry: any) => entry.temp);

      setChartData({
        labels,
        datasets: [
          {
            label: `${city} Temperature (°C)`,
            data: temperatures,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchChartData();
  }, [city]);

  if (!chartData.labels.length) return <div>Loading...</div>;

  return (
    <div>
      <h3>Temperature Chart for {city}</h3>
      <Line data={chartData} />
    </div>
  );
}

export default WeatherChart;
