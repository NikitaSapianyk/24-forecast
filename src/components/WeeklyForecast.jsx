import { getWeatherIconUrl } from "../api/weather";

export default function WeeklyForecast({ weeklyData }) {
  if (!weeklyData?.length) return null;

  return (
    <div className="weekly">
      <h3 className="weekly__title">7-day forecast</h3>
      <div className="weekly__grid">
        {weeklyData.map((day) => (
          <div className="weekly__day" key={day.date.toISOString()}>
            <span className="weekly__day-name">
              {day.date.toLocaleString("en-US", { weekday: "short" })}
            </span>
            <span className="weekly__day-date">
              {day.date.toLocaleString("en-US", { month: "short", day: "numeric" })}
            </span>
            <img className="weekly__icon" src={getWeatherIconUrl(day.icon)} alt={day.description} />
            <span className="weekly__temp">{day.max}° / {day.min}°</span>
            <span className="weekly__desc">{day.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
