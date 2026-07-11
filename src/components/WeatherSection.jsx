import { useCities } from "../context/CitiesContext";
import WeatherCard from "./WeatherCard";

export default function WeatherSection() {
  const { cities, weatherMap, loadingMap, favorites, refreshCity, removeCity, toggleFavorite } = useCities();

  return (
    <section className="section" id="menu">
      <div className="weather-grid">
        {cities.map((city) => (
          <WeatherCard
            key={city}
            cityName={city}
            weather={weatherMap[city]}
            loading={loadingMap[city]}
            isFavorite={favorites.includes(city)}
            onRefresh={refreshCity}
            onRemove={removeCity}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
