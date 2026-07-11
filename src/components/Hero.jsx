import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { formatBannerDate } from "../utils/date";
import { useCities } from "../context/CitiesContext";
import heroBackground from "../assets/backraund.png";

export default function Hero() {
  const [query, setQuery] = useState("");
  const { addCity } = useCities();
  const bannerDate = formatBannerDate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addCity(query);
    if (success) setQuery("");
  };

  return (
    <section className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="hero__content">
        <h1 className="hero__title">Weather dashboard</h1>
        <div className="hero__info">
          <div className="hero__info-block">
            Create your personal list of favorite cities and always be aware of the weather.
          </div>
          <div className="hero__divider" />
          <div className="hero__info-block hero__date">
            <div>{bannerDate.monthYear}</div>
            <div>{bannerDate.weekdayLine}</div>
          </div>
        </div>
        <form className="hero__search" onSubmit={handleSubmit}>
          <input
            className="hero__search-input"
            type="text"
            placeholder="Search location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="hero__search-btn" type="submit" aria-label="Search">
            <FiSearch />
          </button>
        </form>
      </div>
    </section>
  );
}
