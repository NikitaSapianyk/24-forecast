import { Link } from "react-router-dom";
import { FiRefreshCw, FiHeart, FiTrash2 } from "react-icons/fi";
import { getWeatherIconUrl } from "../api/weather";
import { formatCardDate, getCityNowTimestamp } from "../utils/date";
import { useCityClock } from "../hooks/useCityClock";
import Loader from "./Loader";

export default function WeatherCard({
  cityName,
  weather,
  loading,
  isFavorite,
  onRefresh,
  onRemove,
  onToggleFavorite,
}) {
  const tz = weather?.timezone ?? 0;
  const cityTime = useCityClock(tz);

  if (loading || !weather) {
    return (
      <article className="weather-card">
        <Loader small />
      </article>
    );
  }

  const { main, weather: conditions, sys } = weather;
  const icon = conditions[0]?.icon;
  const description = conditions[0]?.description;
  const cityDate = formatCardDate(getCityNowTimestamp(), tz);

  return (
    <article className="weather-card">
      <div className="weather-card__top">
        <h3 className="weather-card__city">{weather.name || cityName}</h3>
        <span className="weather-card__country">{sys.country}</span>
      </div>

      <p className="weather-card__time">{cityTime}</p>
      <span className="weather-card__badge">Hourly forecast</span>
      <p className="weather-card__date">{cityDate}</p>

      <Link className="weather-card__main" to={`/city/${encodeURIComponent(cityName)}`}>
        {icon && <img className="weather-card__icon" src={getWeatherIconUrl(icon)} alt={description} />}
        <p className="weather-card__temp">{Math.round(main.temp)}°C</p>
      </Link>

      <div className="weather-card__actions">
        <button className="icon-btn" onClick={() => onRefresh(cityName)} aria-label="Refresh weather">
          <FiRefreshCw />
        </button>
        <button
          className={`icon-btn${isFavorite ? " icon-btn--active" : ""}`}
          onClick={() => onToggleFavorite(cityName)}
          aria-label="Toggle favorite"
        >
          <FiHeart fill={isFavorite ? "currentColor" : "none"} />
        </button>
        <Link className="weather-card__see-more" to={`/city/${encodeURIComponent(cityName)}`}>
          See more
        </Link>
        <button className="icon-btn" onClick={() => onRemove(cityName)} aria-label="Remove city">
          <FiTrash2 />
        </button>
      </div>
    </article>
  );
}
