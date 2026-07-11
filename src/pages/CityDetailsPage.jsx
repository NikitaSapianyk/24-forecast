import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";
import { fetchCurrentWeather, fetchForecast, getWeatherIconUrl } from "../api/weather";
import { getHourlyForecastForToday, getWeeklyForecast } from "../utils/weatherHelpers";
import { formatCardDate } from "../utils/date";
import HourlyChart from "../components/HourlyChart";
import WeeklyForecast from "../components/WeeklyForecast";
import TempIndicator from "../components/TempIndicator";
import Loader from "../components/Loader";

export default function CityDetailsPage() {
  const { cityName } = useParams();
  const decodedCity = decodeURIComponent(cityName);

  const [weather, setWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weekLoading, setWeekLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(decodedCity),
        fetchForecast(decodedCity),
      ]);
      setWeather(current);
      setHourlyData(getHourlyForecastForToday(forecast.list));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [decodedCity]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleWeekForecast = async () => {
    setWeekLoading(true);
    try {
      const forecast = await fetchForecast(decodedCity);
      setWeeklyData(getWeeklyForecast(forecast.list));
      toast.success("7-day forecast loaded");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWeekLoading(false);
    }
  };

  if (loading) {
    return <main className="details-page"><Loader /></main>;
  }

  if (!weather) {
    return (
      <main className="details-page">
        <Link className="details-page__back" to="/"><FiArrowLeft /> Back to dashboard</Link>
        <p>Weather data unavailable.</p>
      </main>
    );
  }

  const { main, weather: conditions, wind, sys, dt, timezone: tz } = weather;

  return (
    <main className="details-page">
      <Link className="details-page__back" to="/"><FiArrowLeft /> Back to dashboard</Link>

      <div className="details-page__header">
        <div>
          <h1 className="details-page__city">{weather.name}</h1>
          <p className="details-page__country">{sys.country}</p>
          <p className="details-page__date">{formatCardDate(dt, tz)}</p>
        </div>
        <button className="btn-primary details-page__refresh" onClick={loadData}>
          <FiRefreshCw /> Refresh
        </button>
      </div>

      <div className="details-page__grid">
        <div className="details-weather">
          <img className="details-weather__icon" src={getWeatherIconUrl(conditions[0].icon)} alt={conditions[0].description} />
          <p className="details-weather__temp">{Math.round(main.temp)}°C</p>
          <p className="details-weather__desc">{conditions[0].description}</p>
          <p>Feels like {Math.round(main.feels_like)}°C</p>
        </div>

        <div className="details-list">
          <div><span className="details-list__label">Humidity</span><span className="details-list__value">{main.humidity}%</span></div>
          <div><span className="details-list__label">Pressure</span><span className="details-list__value">{main.pressure} hPa</span></div>
          <div><span className="details-list__label">Wind</span><span className="details-list__value">{wind.speed} m/s</span></div>
          <div><span className="details-list__label">Min / Max</span><span className="details-list__value">{Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°</span></div>
          <div><span className="details-list__label">Visibility</span><span className="details-list__value">{(weather.visibility / 1000).toFixed(1)} km</span></div>
          <div><span className="details-list__label">Clouds</span><span className="details-list__value">{weather.clouds.all}%</span></div>
        </div>

        <TempIndicator currentTemp={main.temp} hourlyData={hourlyData} />
      </div>

      <HourlyChart hourlyData={hourlyData} />

      <button className="btn-primary details-page__week-btn" onClick={handleWeekForecast} disabled={weekLoading}>
        {weekLoading ? "Loading..." : "7-day forecast"}
      </button>

      {weeklyData && <WeeklyForecast weeklyData={weeklyData} />}
    </main>
  );
}
