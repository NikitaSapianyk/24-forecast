import { isSameDay } from "./date";

export function getHourlyForecastForToday(forecastList) {
  const today = new Date();
  return forecastList.filter((item) => isSameDay(new Date(item.dt * 1000), today));
}

export function getWeeklyForecast(forecastList) {
  const dayMap = new Map();

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const key = date.toDateString();

    if (!dayMap.has(key)) {
      dayMap.set(key, {
        date,
        temps: [],
        icons: [],
        descriptions: [],
        items: [],
      });
    }

    const entry = dayMap.get(key);
    entry.temps.push(item.main.temp);
    entry.icons.push(item.weather[0].icon);
    entry.descriptions.push(item.weather[0].description);
    entry.items.push(item);
  });

  return Array.from(dayMap.values())
    .slice(0, 7)
    .map((day) => ({
      date: day.date,
      min: Math.round(Math.min(...day.temps)),
      max: Math.round(Math.max(...day.temps)),
      icon: day.icons[Math.floor(day.icons.length / 2)],
      description: day.descriptions[0],
    }));
}

export function getTemperaturePosition(temp, min, max) {
  const rangeMin = min ?? -20;
  const rangeMax = max ?? 40;
  const clamped = Math.min(Math.max(temp, rangeMin), rangeMax);
  const percent = ((clamped - rangeMin) / (rangeMax - rangeMin)) * 100;
  return Math.round(percent);
}
