import { useEffect, useState } from "react";
import { fetchPetsImages } from "../api/gallery";
import Loader from "./Loader";

const NEWS_TITLES = [
  "How pets help us cope with stress every day",
  "Best activities to enjoy with your furry friend",
  "Why regular vet visits matter for pet health",
  "Creating a cozy space for your companion at home",
];

export default function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPetsImages(1).then((hits) => {
      setItems(
        hits.slice(0, 4).map((hit, i) => ({
          id: hit.id,
          image: hit.webformatURL || hit.largeImageURL,
          title: NEWS_TITLES[i] || hit.tags,
        }))
      );
      setLoading(false);
    });
  }, []);

  return (
    <section className="section" id="about">
      <h2 className="section-title">Interacting with our pets</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="news-grid">
            {items.map((item) => (
              <article className="news-card" key={item.id}>
                <img className="news-card__img" src={item.image} alt={item.title} loading="lazy" />
                <h3 className="news-card__title">{item.title}</h3>
              </article>
            ))}
          </div>
          <button className="btn-primary news__see-more">See more</button>
        </>
      )}
    </section>
  );
}
