import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
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
import GsapLoader from "./GsapLoader";

const pickVideoSources = (videoFiles = []) => {
  const mp4Files = videoFiles.filter(
    (file) => file.file_type === "video/mp4" && file.link
  );

  if (mp4Files.length === 0) {
    return {
      previewSrc: null,
      src: null,
    };
  }

  const byResolution = [...mp4Files].sort((a, b) => {
    const aPixels = (a.width || 0) * (a.height || 0);
    const bPixels = (b.width || 0) * (b.height || 0);

    return aPixels - bPixels;
  });

  const sdCandidate = mp4Files.find(
    (file) => file.quality === "sd"
  );
  const hdCandidate = [...mp4Files]
    .reverse()
    .find((file) => file.quality === "hd");

  const previewSrc =
    sdCandidate?.link || byResolution[0]?.link;
  const src =
    hdCandidate?.link ||
    byResolution[byResolution.length - 1]?.link ||
    previewSrc;

  return {
    previewSrc,
    src,
  };
};

const ResultGrid = () => {
  const dispatch = useDispatch();

  const {
    query,
    activeTab,
    results,
    loading,
    error,
    page,
    hasMore,
  } = useSelector((store) => store.search);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const requestedPagesRef = useRef(new Set());
  const loadedPagesRef = useRef(new Set());
  const lastAutoAdvanceKeyRef = useRef("");

  useEffect(() => {
    requestedPagesRef.current.clear();
    loadedPagesRef.current.clear();
    lastAutoAdvanceKeyRef.current = "";

    if (!query?.trim()) {
      dispatch(setLoading(false));
      dispatch(setError(null));
    }
  }, [query, activeTab, dispatch]);

  // ----------------
  // Fetch Data
  // ----------------

  useEffect(() => {
    if (!query?.trim()) return;

    const requestKey = `${activeTab}-${query}-${page}`;

    if (requestedPagesRef.current.has(requestKey)) {
      return;
    }

    requestedPagesRef.current.add(requestKey);

    const controller = new AbortController();

    const getData = async () => {
      const cached = getCachedData(requestKey);

      if (cached) {
        if (cached.length === 0) {
          loadedPagesRef.current.add(requestKey);
          dispatch(setHasMore(false));
          return;
        }

        if (page === 1) {
          dispatch(setResults(cached));
        } else {
          dispatch(appendResults(cached));
        }

        loadedPagesRef.current.add(requestKey);
        return;
      }

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        let data = [];

        if (activeTab === "photos") {
          const response = await fetchPhotos(
            query,
            page,
            60,
            controller.signal
          );

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
        } else if (activeTab === "gifs") {
          const response = await fetchGifs(
            query,
            page,
            60,
            controller.signal
          );

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
        } else {
          const response = await fetchVideos(
            query,
            page,
            15,
            controller.signal
          );

          data = response.videos.map((item) => {
            const { previewSrc, src } =
              pickVideoSources(item.video_files);

            return {
              id: item.id,
              type: "video",
              title: item.user?.name || "Video",
              thumbnail: item.image,
              previewSrc,
              src,
            };
          });

          if (response.videos.length < response.per_page) {
            dispatch(setHasMore(false));
          }
        }

        if (controller.signal.aborted) return;

        if (data.length === 0) {
          loadedPagesRef.current.add(requestKey);
          dispatch(setHasMore(false));
          setCachedData(requestKey, []);
          return;
        }

        setCachedData(requestKey, data);

        if (page === 1) {
          dispatch(setResults(data));
        } else {
          dispatch(appendResults(data));
        }

        loadedPagesRef.current.add(requestKey);
      } catch (fetchError) {
        if (fetchError?.name === "AbortError") {
          return;
        }

        requestedPagesRef.current.delete(requestKey);
        dispatch(
          setError(fetchError?.message || "Unable to fetch data")
        );
      } finally {
        if (!controller.signal.aborted) {
          dispatch(setLoading(false));
        }
      }
    };

    getData();

    return () => {
      controller.abort();
    };
  }, [query, activeTab, page, dispatch]);

  // ----------------
  // Infinite Scroll
  // ----------------

  useEffect(() => {
    if (
      !inView ||
      loading ||
      !hasMore ||
      !query?.trim() ||
      results.length === 0
    ) {
      return;
    }

    const loadedKey = `${activeTab}-${query}-${page}`;

    if (!loadedPagesRef.current.has(loadedKey)) {
      return;
    }

    if (lastAutoAdvanceKeyRef.current === loadedKey) {
      return;
    }

    lastAutoAdvanceKeyRef.current = loadedKey;
    dispatch(nextPage());
  }, [
    inView,
    loading,
    hasMore,
    query,
    activeTab,
    page,
    results.length,
    dispatch,
  ]);

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
      <div className="w-full py-20 flex items-center justify-center">
        <GsapLoader label="Loading results..." />
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
        dark:text-slate-400
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
      px-3
      sm:px-4
      py-5
      sm:py-6
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
          <ResultCard
            key={`${item.type}-${item.id}`}
            item={item}
          />
        ))}
      </Masonry>

      {hasMore && <div ref={ref} className="h-20" />}

      {loading && results.length > 0 && (
        <div className="w-full py-7 flex items-center justify-center">
          <GsapLoader label="Loading more..." />
        </div>
      )}

      {!hasMore && results.length > 0 && (
        <div
          className="
            text-center
            py-8
            text-gray-400
            dark:text-slate-500
            "
        >
          You have reached the end.
        </div>
      )}
    </div>
  );
};

export default ResultGrid;
