const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Updated function to fetch both current and forecast weather
export const fetchWeather = async (city, unit = "metric") => {
  try {
    // Get current weather by city name (free)
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
    );

    if (!currentRes.ok) throw new Error("City not found");

    const currentData = await currentRes.json();
    const { lat, lon } = currentData.coord;

    // Get 5-day forecast (free) - this is the max we can get for free
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
    );

    if (!forecastRes.ok) throw new Error("Failed to get forecast");

    const forecastData = await forecastRes.json();

    // Extract one forecast per day at 12:00:00 (or closest available time)
    const dailyForecast = {};
    forecastData.list.forEach((item) => {
      const [date, time] = item.dt_txt.split(" ");
      if (time === "12:00:00" && !dailyForecast[date]) {
        dailyForecast[date] = item;
      }
    });

    return {
      current: currentData,
      forecast: Object.values(dailyForecast).slice(0, 5), // Max 5 days with free API
      location: {
        name: currentData.name,
        country: currentData.sys.country,
        lat,
        lon,
      },
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
};
