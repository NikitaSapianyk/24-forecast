import { useEffect, useState } from "react";
import { fetchNatureImages, getGalleryImageUrl, GALLERY_FALLBACK_IMAGE } from "../api/gallery";
import Loader from "./Loader";

const SLOTS = [
  { shift: -2, size: "far" },
  { shift: -1, size: "near" },
  { shift: 0, size: "center" },
  { shift: 1, size: "near" },
  { shift: 2, size: "far" },
];

export default function Gallery() {
  const [list, setList] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNatureImages(1).then(setList).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (list.length < 2) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % list.length), 2000);
    return () => clearInterval(timer);
  }, [list.length]);

  const imgAt = (shift) => list[(active + shift + list.length) % list.length];

  return (
    <section className="section gallery-section">
      <h2 className="section-title">Beautiful nature</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="gallery">
          {SLOTS.map(({ shift, size }) => {
            const img = imgAt(shift);
            return (
              <figure key={shift} className={`gallery__item gallery__item--${size}`}>
                <img
                  key={img.id}
                  src={getGalleryImageUrl(img)}
                  alt={img.tags || "Nature"}
                  onError={(e) => {
                    e.currentTarget.src = GALLERY_FALLBACK_IMAGE;
                  }}
                />
                {size !== "center" && <span className="gallery__shade" />}
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
}
