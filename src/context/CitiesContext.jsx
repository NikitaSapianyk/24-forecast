import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { fetchCurrentWeather } from "../api/weather";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CitiesContext = createContext(null);

const DEFAULT_CITIES = ["Warsaw", "Kyiv", "London"];

export function CitiesProvider({ children }) {
  const [cities, setCities] = useLocalStorage("weather_cities_v4", DEFAULT_CITIES);
  const [weatherMap, setWeatherMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [favorites, setFavorites] = useLocalStorage("weather_favorites", []);

  const loadWeather = useCallback(async (cityName) => {
    setLoadingMap((prev) => ({ ...prev, [cityName]: true }));
    try {
      const data = await fetchCurrentWeather(cityName);
      setWeatherMap((prev) => ({ ...prev, [cityName]: data }));
      return data;
    } catch (error) {
      toast.error(`Failed to load weather for ${cityName}: ${error.message}`);
      throw error;
    } finally {
      setLoadingMap((prev) => ({ ...prev, [cityName]: false }));
    }
  }, []);

  useEffect(() => {
    cities.forEach((city) => {
      loadWeather(city);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addCity = useCallback(
    async (cityName) => {
      const normalized = cityName.trim();
      if (!normalized) return false;

      if (cities.some((c) => c.toLowerCase() === normalized.toLowerCase())) {
        toast.info(`${normalized} is already in your list`);
        return false;
      }

      try {
        await loadWeather(normalized);
        setCities((prev) => [...prev, normalized]);
        toast.success(`${normalized} added`);
        return true;
      } catch {
        return false;
      }
    },
    [cities, loadWeather, setCities]
  );

  const removeCity = useCallback(
    (cityName) => {
      setCities((prev) => prev.filter((c) => c !== cityName));
      setWeatherMap((prev) => {
        const next = { ...prev };
        delete next[cityName];
        return next;
      });
      setFavorites((prev) => prev.filter((c) => c !== cityName));
      toast.success(`${cityName} removed`);
    },
    [setCities, setFavorites]
  );

  const refreshCity = useCallback(
    async (cityName) => {
      try {
        await loadWeather(cityName);
        toast.success(`Weather updated for ${cityName}`);
      } catch {
        /* handled in loadWeather */
      }
    },
    [loadWeather]
  );

  const toggleFavorite = useCallback(
    (cityName) => {
      setFavorites((prev) =>
        prev.includes(cityName)
          ? prev.filter((c) => c !== cityName)
          : [...prev, cityName]
      );
    },
    [setFavorites]
  );

  return (
    <CitiesContext.Provider
      value={{
        cities,
        weatherMap,
        loadingMap,
        favorites,
        addCity,
        removeCity,
        refreshCity,
        toggleFavorite,
        loadWeather,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("useCities must be used within CitiesProvider");
  return context;
}
