const PEXEL_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs";

const PEXEL_BASE_URL = "https://api.pexels.com";

export const fetchPhotos = async (query, page = 1, per_page = 60) => {
  try {
    if (!query?.trim()) {
      throw new Error("Search query required");
    }

    const params = new URLSearchParams({
      query,
      page,
      per_page: String(per_page),
    });

    const response = await fetch(`${PEXEL_BASE_URL}/v1/search?${params}`, {
      method: "GET",
      headers: {
        Authorization: PEXEL_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Unable to fetch photos");
    }

    return data;
  } catch (error) {
    console.error("PEXELS PHOTO ERROR:", error);

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

export const fetchGifs = async (query, page = 1, limit = 60) => {
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
