import { getTemperaturePosition } from "../utils/weatherHelpers";

export default function TempIndicator({ currentTemp, hourlyData }) {
  const temps = hourlyData?.map((item) => item.main.temp) ?? [];
  const min = temps.length ? Math.min(...temps) : -10;
  const max = temps.length ? Math.max(...temps) : 35;
  const position = getTemperaturePosition(currentTemp, min, max);

  return (
    <div className="temp-indicator">
      <h3 className="temp-indicator__title">Temperature position (today)</h3>
      <div className="temp-indicator__scale">
        <div className="temp-indicator__marker" style={{ left: `${position}%` }} />
      </div>
      <div className="temp-indicator__labels">
        <span>{Math.round(min)}°C</span>
        <span>{Math.round(max)}°C</span>
      </div>
      <p className="temp-indicator__current">Current: {Math.round(currentTemp)}°C</p>
    </div>
  );
}
