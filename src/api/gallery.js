import axios from "axios";

const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY || "49647532-8f8f8f8f8f8f8f8f8f8f8f8f";

const NATURE_FALLBACK = [
  {
    id: "nature-1",
    webformatURL: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    tags: "mountains nature",
  },
  {
    id: "nature-2",
    webformatURL: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    tags: "forest nature",
  },
  {
    id: "nature-3",
    webformatURL: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    tags: "fog nature",
  },
  {
    id: "nature-4",
    webformatURL: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    tags: "lake nature",
  },
  {
    id: "nature-5",
    webformatURL: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    tags: "valley nature",
  },
  {
    id: "nature-6",
    webformatURL: "https://images.unsplash.com/photo-1518173946687-a4c036bc9683?auto=format&fit=crop&w=1200&q=80",
    tags: "river nature",
  },
  {
    id: "nature-7",
    webformatURL: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
    tags: "lake sunset nature",
  },
  {
    id: "nature-8",
    webformatURL: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80",
    tags: "green nature",
  },
];

const PETS_FALLBACK = [
  {
    id: "pet-1",
    webformatURL: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    tags: "dog pet",
  },
  {
    id: "pet-2",
    webformatURL: "https://images.unsplash.com/photo-1514881249217-7b4cb7c86a9c?auto=format&fit=crop&w=800&q=80",
    tags: "cat pet",
  },
  {
    id: "pet-3",
    webformatURL: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",
    tags: "puppy pet",
  },
  {
    id: "pet-4",
    webformatURL: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    tags: "dogs pet",
  },
];

export const GALLERY_FALLBACK_IMAGE = NATURE_FALLBACK[0].webformatURL;

export function getGalleryImageUrl(image) {
  return image?.webformatURL || image?.largeImageURL || image?.previewURL || "";
}

function normalizeGalleryImages(hits) {
  return hits
    .map((hit, index) => ({
      ...hit,
      id: hit.id ?? `gallery-${index}`,
      webformatURL: getGalleryImageUrl(hit),
    }))
    .filter((hit) => Boolean(hit.webformatURL));
}

async function fetchPixabay(query, page = 1, perPage = 4) {
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: PIXABAY_KEY,
        q: query,
        image_type: "photo",
        page,
        per_page: perPage,
      },
    });
    const hits = normalizeGalleryImages(response.data.hits ?? []);
    return hits.length ? hits : null;
  } catch {
    return null;
  }
}

export async function fetchPetsImages(page = 1) {
  const hits = await fetchPixabay("pets", page, 4);
  return hits || PETS_FALLBACK;
}

export async function fetchNatureImages(page = 1) {
  const hits = await fetchPixabay("nature", page, 8);
  return hits?.length ? hits : NATURE_FALLBACK;
}
