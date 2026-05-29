import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";

import { fetchPhotos, fetchVideos, fetchGifs } from "../api/mediaApi";

import {
  setLoading,
  setError,
  setResults,
  appendResults,
  nextPage,
} from "../redux/features/searchSlice";

import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();

  const { query, activeTab, results, loading, error, page } = useSelector(
    (store) => store.search,
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // ----------------
  // Fetch Data
  // ----------------

  useEffect(() => {
    if (!query?.trim()) return;

    const getData = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        let data = [];

        // Photos

        if (activeTab === "photos") {
          const response = await fetchPhotos(query, page);

          data = response.photos.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt || "Photo",
            thumbnail: item.src.medium,
            src: item.src.original,
          }));
        }

        // GIFs
        else if (activeTab === "gifs") {
          const response = await fetchGifs(query, page);

          data = response.data.map((item) => ({
            id: item.id,
            type: "gif",
            title: item.title || "GIF",
            thumbnail: item.images.fixed_height.url,
            src: item.images.original.url,
          }));
        }

        // Videos
        else {
          const response = await fetchVideos(query, page);

          data = response.videos.map((item) => ({
            id: item.id,
            type: "video",
            title: item.user?.name || "Video",
            thumbnail: item.image,
            src: item.video_files?.[0]?.link,
          }));
        }

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
    if (inView && !loading && results.length > 0) {
      dispatch(nextPage());
    }
  }, [inView, loading, results.length, dispatch]);

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
        className="flex gap-3"
        columnClassName="space-y-3"
      >
        {results.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </Masonry>

      {/* Sentinel */}

      <div ref={ref} className="h-20" />

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
    </div>
  );
};

export default ResultGrid;
