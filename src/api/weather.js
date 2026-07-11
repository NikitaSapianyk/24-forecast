const API_KEY = "e61dbff2fd0a2c9200f19f874c58c3e9";

export async function fetchCurrentWeather(cityName) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "City not found");
  }

  return response.json();
}

export async function fetchForecast(cityName) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Forecast unavailable");
  }

  return response.json();
}

export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
