import React, { useState, useEffect } from "react";
import { fetchWeather } from "../Api/weatherApi";
import DashSkeleton from "../Components/dashSkeleton";

const WeatherDetail = ({ icon, label, value }) => (
  <div className="flex items-center">
    <img
      className="size-12"
      src={`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${icon}.svg`}
      alt={`${label} icon`}
    />
    <span className="text-lg">
      {label}: {value}
    </span>
  </div>
);

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Weather UI Icons - Animated SVGs
  const getWeatherIcon = (condition, isDay = true) => {
    const baseUrl =
      "https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/";

    const iconMap = {
      Clear: isDay ? "clear-day.svg" : "clear-night.svg",
      Clouds: isDay ? "cloudy.svg" : "cloudy-night.svg",
      Rain: "rain.svg",
      Drizzle: "drizzle.svg",
      Thunderstorm: "thunderstorms.svg",
      Snow: "snow.svg",
      Mist: "fog.svg",
      Fog: "fog.svg",
      Haze: "haze.svg",
    };

    return baseUrl + (iconMap[condition] || "cloudy.svg");
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError("City Not Found");
      setWeatherData(null);
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Helper function to get day name
  const getDayName = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <div className="w-screen font-display bg-gradient-to-br from-neutral-900 to-stone-600 h-screen flex flex-col items-center justify-evenly">
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2 rounded-2xl font-semibold bg-white focus:outline-none focus:ring-0 focus:bg-neutral-200"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-3 py-2 bg-neutral-500 text-white rounded-2xl hover:bg-neutral-700 "
        >
          Search
        </button>
      </div>

      {loading && <DashSkeleton />}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && !loading && (
        <div className="w-3/4 h-3/4 p-4 text-gray-50 text-center flex flex-col items-center justify-evenly rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          {/* Current Weather Section */}
          <div className="flex justify-evenly items-center w-full">
            <p className="text-xl">{`The current weather in ${weatherData.location.name} is ${weatherData.current.weather[0].main}`}</p>
            <img
              className="size-24"
              src={getWeatherIcon(weatherData.current.weather[0].main)}
              alt={`${weatherData.current.weather[0].main}'s icon`}
            />
            <div className="font-mono flex flex-col gap-1 opacity-55 items-center">
              <p>
                {weatherData.location.name}, {weatherData.location.country}
              </p>
              <p>{new Date().toLocaleTimeString()}</p>
              <p>{new Date().toDateString()}</p>
            </div>
          </div>

          {/* Current Weather Details */}
          <div className="flex w-full items-center gap-4 justify-center">
            <WeatherDetail
              icon="cloudy"
              label="Condition"
              value={weatherData.current.weather[0].main}
            />
            <WeatherDetail
              icon="thermometer"
              label="Temperature"
              value={`${Math.round(weatherData.current.main.temp)}°C`}
            />
            <WeatherDetail
              icon="thermometer-warmer"
              label="Feels like"
              value={`${Math.round(weatherData.current.main.feels_like)}°C`}
            />
            <WeatherDetail
              icon="humidity"
              label="Humidity"
              value={`${weatherData.current.main.humidity}%`}
            />
            <WeatherDetail
              icon="wind"
              label="Wind Speed"
              value={`${weatherData.current.wind.speed} m/s`}
            />
          </div>

          {/* 5-Day Forecast Section */}
          <div className="h-1/2 w-full rounded-lg p-4">
            <h3 className="text-2xl font-semibold mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-2 h-full overflow-y-auto">
              {weatherData.forecast.map((day, index) => (
                <div
                  key={index}
                  className="flex gap-2 flex-col border-l-1 border-r-1 border-neutral-500 items-center justify-center bg-white/5 rounded-lg p-2"
                >
                  <p className="font-semibold  text-sm">
                    {getDayName(day.dt_txt)}
                  </p>
                  <p className="text-xs opacity-55 font-mono">
                    {formatDate(day.dt_txt)}
                  </p>
                  <img
                    className="size-8 my-1"
                    src={getWeatherIcon(day.weather[0].main)}
                    alt={day.weather[0].description}
                  />
                  <p className="text-xs">{day.weather[0].main}</p>
                  <div className="text-xs">
                    <p className="font-semibold">
                      {" "}
                      Max:
                      {Math.round(day.main.temp_max)}°
                    </p>
                    <p className="text-gray-400">
                      {" "}
                      Min:
                      {Math.round(day.main.temp_min)}°
                    </p>
                  </div>
                  <p className="text-xs">💧 {day.main.humidity}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-neutral-200 fixed bottom-4 text-sm opacity-60 flex gap-4">
        Made by Apurv Pandey |
        <span className="underline"> apurvwork13@gmail.com</span>|
        <a
          href="http://apurvp.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition-all duration-200"
        >
          apurvp.com
        </a>
      </p>
    </div>
  );
};

export default Dashboard;
