const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXEL_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs";

const BASE_URL = "https://api.unsplash.com";

const PEXEL_BASE_URL = "https://api.pexels.com";

export const fetchPhotos = async (query, page = 1, perPage = 20) => {
  try {
    if (!query?.trim()) {
      throw new Error("Search query required");
    }

    const params = new URLSearchParams({
      query,
      page: String(page),
      per_page: String(perPage),
    });

    const response = await fetch(`${BASE_URL}/search/photos?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data)

    if (!response.ok) {
      throw new Error(
        data.errors?.[0] || data.message || "Unable to fetch photos",
      );
    }

    return data;
  } catch (error) {
    console.error("Unsplash Error:", error);

    throw error;
  }
};

export const fetchVideos = async (query, page = 1, per_page = 15) => {
  try {
    // console.log("PEXEL_KEY:", PEXEL_KEY)
    if (!query?.trim()) {
      throw new Error("Search Query Required");
    }

    const params = new URLSearchParams({
      query,
      page,
      per_page: String(per_page),
    });

    const response = await fetch(`${PEXEL_BASE_URL}/videos/search?${params}`, {
      method: "GET",

      headers: {
        Authorization: PEXEL_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Unable to fetch videos");
    }

    return data;
  } catch (error) {
    console.log("PEXEL ERROR:", error);

    throw error;
  }
};

export const fetchGifs = async (query, page = 1, limit = 20) => {
  try {
    if (!query?.trim()) {
      throw new Error("Search query required");
    }

    const offset = (page - 1) * limit;

    const params = new URLSearchParams({
      api_key: GIPHY_KEY,
      q: query,
      limit: String(limit),
      offset: String(offset),
    });

    const response = await fetch(`${GIPHY_BASE_URL}/search?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to fetch gifs");
    }

    return data;
  } catch (error) {
    console.error("GIPHY ERROR:", error);

    throw error;
  }
};
