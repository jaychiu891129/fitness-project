// Weather.jsx
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const API_KEY = "YOUR_API_KEY"; // 替換為你的 OpenWeather API Key

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    });
  }, []);

  if (!weather) return <p>載入天氣資料中...</p>;

  return (
    <div className="weather">
      <h3>當前天氣</h3>
      <p>{weather.name}</p>
      <p>{weather.main.temp}°C</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
};

export default Weather;
