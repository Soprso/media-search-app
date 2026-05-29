import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";

import { getCachedData, setCachedData } from "../utils/cache";

import { fetchPhotos, fetchVideos, fetchGifs } from "../api/mediaApi";

import {
  setLoading,
  setError,
  setResults,
  appendResults,
  nextPage,
  setHasMore,
} from "../redux/features/searchSlice";

import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();

  const { query, activeTab, results, loading, error, page, hasMore } =
    useSelector((store) => store.search);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // ----------------
  // Fetch Data
  // ----------------

  useEffect(() => {
    if (!query?.trim()) return;

    const getData = async () => {
      const cacheKey = `${activeTab}-${query}-${page}`;

      const cached = getCachedData(cacheKey);

      // ----------------
      // Cache Hit
      // ----------------

      if (cached) {
        if (cached.length === 0) {
          dispatch(setHasMore(false));
          return;
        }

        if (page === 1) {
          dispatch(setResults(cached));
        } else {
          dispatch(appendResults(cached));
        }

        return;
      }

      try {
        dispatch(setLoading(true));

        dispatch(setError(null));

        let data = [];

        // ----------------
        // Photos
        // ----------------

        if (activeTab === "photos") {
          const response = await fetchPhotos(query, page);

          data = response.photos.map((item) => ({
            id: item.id,

            type: "photo",

            title: item.alt || "Photo",

            thumbnail: item.src.medium,

            src: item.src.original,
          }));

          if (response.photos.length < response.per_page) {
            dispatch(setHasMore(false));
          }
        }

        // ----------------
        // GIFs
        // ----------------
        else if (activeTab === "gifs") {
          const response = await fetchGifs(query, page);

          data = response.data.map((item) => ({
            id: item.id,

            type: "gif",

            title: item.title || "GIF",

            thumbnail: item.images.fixed_height.url,

            src: item.images.original.url,
          }));

          const { total_count, count, offset } = response.pagination;

          if (offset + count >= total_count) {
            dispatch(setHasMore(false));
          }
        }

        // ----------------
        // Videos
        // ----------------
        else {
          const response = await fetchVideos(query, page);

          data = response.videos.map((item) => ({
            id: item.id,

            type: "video",

            title: item.user?.name || "Video",

            thumbnail: item.image,

            src: item.video_files?.[0]?.link,
          }));

          if (response.videos.length < response.per_page) {
            dispatch(setHasMore(false));
          }
        }

        // ----------------
        // No More Results
        // ----------------

        if (data.length === 0) {
          dispatch(setHasMore(false));

          setCachedData(cacheKey, []);

          return;
        }

        // ----------------
        // Cache Data
        // ----------------

        setCachedData(cacheKey, data);

        // ----------------
        // Store Results
        // ----------------

        if (page === 1) {
          dispatch(setResults(data));
        } else {
          dispatch(appendResults(data));
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getData();
  }, [query, activeTab, page, dispatch]);

  // ----------------
  // Infinite Scroll
  // ----------------

  useEffect(() => {
    if (inView && !loading && hasMore && query && results.length > 0) {
      dispatch(nextPage());
    }
  }, [inView, loading, hasMore, query, results.length, dispatch]);

  const breakpointColumnsObj = {
    default: 5,
    1536: 5,
    1280: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  // ----------------
  // Error State
  // ----------------

  if (error) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        py-20
        "
      >
        <div
          className="
          bg-red-100
          text-red-600

          px-4
          py-4

          rounded-2xl

          border
          border-red-200
          "
        >
          {error}
        </div>
      </div>
    );
  }

  // ----------------
  // Initial Loading
  // ----------------

  if (loading && results.length === 0) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        py-20
        "
      >
        <div
          className="
          px-8
          py-5

          text-gray-700
          font-medium
          "
        >
          Loading media...
        </div>
      </div>
    );
  }

  // ----------------
  // Empty State
  // ----------------

  if (query && results.length === 0 && !loading) {
    return (
      <div
        className="
        text-center
        py-20
        text-gray-500
        "
      >
        No media found.
      </div>
    );
  }

  // ----------------
  // Masonry Grid
  // ----------------

  return (
    <div
      className="
      max-w-[1700px]
      mx-auto
      px-4
      py-6
      "
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="
        flex
        gap-3
        "
        columnClassName="
        space-y-3
        "
      >
        {results.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </Masonry>

      {/* Sentinel */}

      {hasMore && <div ref={ref} className="h-20" />}

      {/* Bottom Loader */}

      {loading && results.length > 0 && (
        <div
          className="
            text-center
            py-6
            text-gray-500
            "
        >
          Loading more...
        </div>
      )}

      {/* End Message */}

      {!hasMore && results.length > 0 && (
        <div
          className="
            text-center
            py-8
            text-gray-400
            "
        >
          You have reached the end.
        </div>
      )}
    </div>
  );
};

export default ResultGrid;
