import { useEffect, useMemo } from "react";
import {
  RiArrowLeftLine,
  RiBookmarkFill,
  RiBookmarkLine,
  RiDownloadLine,
} from "@remixicon/react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCollection,
  removeCollection,
} from "../redux/features/collectionSlice";
import {
  startSearch,
  switchTab,
} from "../redux/features/searchSlice";
import ResultGrid from "../components/ResultGrid";

const tabByType = {
  photo: "photos",
  video: "videos",
  gif: "gifs",
  photos: "photos",
  videos: "videos",
  gifs: "gifs",
};

const deriveQueryFromTitle = (title = "") =>
  title
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .join(" ")
    .trim();

const MediaDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, type } = useParams();

  const {
    query,
    activeTab,
    results: searchResults,
  } = useSelector((state) => state.search);
  const collectionItems = useSelector(
    (state) => state.collection.items
  );

  const routeItem = location.state?.item || null;
  const relatedQueryFromState =
    location.state?.relatedQuery?.trim() || "";
  const openedFromCollection =
    location.state?.from === "/collection";

  const item = useMemo(() => {
    if (routeItem) return routeItem;

    const fromSearch = searchResults.find(
      (entry) =>
        String(entry.id) === String(id) &&
        entry.type === type
    );

    if (fromSearch) return fromSearch;

    return (
      collectionItems.find(
        (entry) =>
          String(entry.id) === String(id) &&
          entry.type === type
      ) || null
    );
  }, [
    routeItem,
    searchResults,
    collectionItems,
    id,
    type,
  ]);

  const targetTab = tabByType[item?.type || type];

  useEffect(() => {
    if (targetTab && activeTab !== targetTab) {
      dispatch(switchTab(targetTab));
    }
  }, [targetTab, activeTab, dispatch]);

  useEffect(() => {
    const fallbackQuery =
      deriveQueryFromTitle(item?.title || "") ||
      item?.type ||
      "";
    const nextQuery =
      relatedQueryFromState ||
      (openedFromCollection
        ? fallbackQuery
        : query?.trim() || fallbackQuery);

    if (
      nextQuery &&
      nextQuery !== query
    ) {
      dispatch(startSearch(nextQuery));
    }
  }, [
    relatedQueryFromState,
    openedFromCollection,
    query,
    item?.title,
    item?.type,
    dispatch,
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [id, type]);

  const saved = item
    ? collectionItems.some(
        (entry) =>
          entry.id === item.id &&
          entry.type === item.type
      )
    : false;

  const toggleCollection = () => {
    if (!item) return;

    if (saved) {
      dispatch(removeCollection(item));
      toast.info("Removed from collection");
      return;
    }

    dispatch(addCollection(item));
    toast.success("Saved to collection");
  };

  const handleDownload = async () => {
    if (!item?.src) {
      toast.error("Media source unavailable");
      return;
    }

    try {
      const response = await fetch(item.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${item.title || "media"}.${
        item.type === "photo"
          ? "jpg"
          : item.type === "gif"
          ? "gif"
          : "mp4"
      }`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Download failed");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const mediaSrc = item
    ? item.type === "video"
      ? item.src || item.previewSrc
      : item.src || item.thumbnail
    : null;

  if (!item) {
    return (
      <div className="w-full min-h-screen px-4 py-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 w-10 h-10 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          aria-label="Back to search"
        >
          <RiArrowLeftLine size={18} />
        </button>
        <p className="mt-6 text-gray-500 dark:text-slate-400">
          Media details unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-3 sm:px-4 py-4 sm:py-6">
      <section className="mt-4 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] gap-5">
          <div className="relative rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <button
              onClick={handleBack}
              className="absolute top-3 right-3 z-20 inline-flex items-center justify-center rounded-full w-10 h-10 bg-black/60 text-white hover:bg-black/75 transition-colors cursor-pointer"
              aria-label="Back to search"
            >
              <RiArrowLeftLine size={18} />
            </button>

            {item.type === "video" ? (
              <video
                src={mediaSrc}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[72vh] object-contain"
              />
            ) : (
              <img
                src={mediaSrc}
                alt={item.title || "Media detail"}
                className="w-full max-h-[72vh] object-contain"
              />
            )}
          </div>

          <aside className="rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5 bg-gray-50 dark:bg-slate-950">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-slate-100">
              {item.title || "Untitled"}
            </h1>

            <p className="mt-2 inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-slate-800 dark:text-blue-300">
              {item.type}
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <button
                onClick={toggleCollection}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  saved
                    ? "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/45"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {saved ? (
                  <RiBookmarkFill size={18} />
                ) : (
                  <RiBookmarkLine size={18} />
                )}
                {saved
                  ? "Remove from Collection"
                  : "Add to Collection"}
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium bg-slate-900 text-white hover:bg-black dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-colors cursor-pointer"
              >
                <RiDownloadLine size={18} />
                Download
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-6">
        <div className="px-1 sm:px-2 mb-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-slate-100">
            Related Results
          </h2>
        </div>
        <ResultGrid />
      </section>
    </div>
  );
};

export default MediaDetailsPage;
