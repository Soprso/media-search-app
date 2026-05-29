import { memo, useRef } from "react";
import {
  RiDownloadLine,
  RiBookmarkLine,
  RiBookmarkFill,
} from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCollection,
  removeCollection,
} from "../redux/features/collectionSlice";

const ResultCard = ({ item }) => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { items: collectionItems } = useSelector(
    (state) => state.collection
  );
  const currentQuery = useSelector(
    (state) => state.search.query
  );

  const saved = collectionItems.some(
    (data) =>
      data.id === item.id &&
      data.type === item.type
  );

  const addToCollection = () => {
    if (saved) {
      dispatch(removeCollection(item));
      toast.info("Removed from collection");
    } else {
      dispatch(addCollection(item));
      toast.success("Saved to collection");
    }
  };

  const playVideo = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current
        .play()
        .catch(() => null);
    }
  };

  const pauseVideo = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const downloadMedia = async (event) => {
    event.stopPropagation();

    try {
      if (!item.src) {
        throw new Error("Media source unavailable");
      }

      const response = await fetch(item.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${item.title}.${
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
      alert("Download failed");
    }
  };

  return (
    <>
      <div
        onClick={() =>
          navigate(
            `/media/${item.type}/${item.id}`,
            {
              state: {
                item,
                from: location.pathname,
                relatedQuery: currentQuery,
              },
            }
          )
        }
        onMouseEnter={playVideo}
        onMouseLeave={pauseVideo}
        className="
        group
        relative
        overflow-hidden
        rounded-2xl
        bg-white
        dark:bg-slate-900
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        break-inside-avoid
        cursor-pointer
      "
      >
        {item.type === "video" ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={item.thumbnail}
            className="
            w-full
            h-auto
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
          >
            <source
              src={item.previewSrc || item.src}
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="
            w-full
            h-auto
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
          />
        )}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-transparent
          opacity-100
          md:opacity-0
          md:group-hover:opacity-100
          transition-all
          duration-300
        "
        />

        <button
          onClick={downloadMedia}
          className="
          absolute
          top-3
          left-3
          z-20
          w-10
          h-10
          flex
          items-center
          justify-center
          rounded-full
          bg-white/90
          backdrop-blur-md
          text-gray-800
          opacity-100
          md:opacity-0
          md:group-hover:opacity-100
          hover:bg-blue-600
          hover:text-white
          transition-all
          duration-300
          cursor-pointer
        "
        >
          <RiDownloadLine size={18} />
        </button>

        <button
          onClick={(event) => {
            event.stopPropagation();
            addToCollection();
          }}
          className={`
          absolute
          top-3
          right-3
          z-20
          w-10
          h-10
          flex
          items-center
          justify-center
          rounded-full
          bg-white/90
          backdrop-blur-md
          ${
            saved
              ? "text-red-500"
              : "text-gray-800 hover:text-red-500"
          }
          opacity-100
          md:opacity-0
          md:group-hover:opacity-100
          transition-all
          duration-300
          cursor-pointer
        `}
        >
          {saved ? (
            <RiBookmarkFill size={18} />
          ) : (
            <RiBookmarkLine size={18} />
          )}
        </button>

        <div
          className="
          absolute
          bottom-16
          left-4
          px-3
          py-1
          rounded-full
          bg-white/90
          backdrop-blur-md
          text-[11px]
          font-semibold
          uppercase
          tracking-wide
          text-gray-800
          opacity-100
          md:opacity-0
          md:group-hover:opacity-100
          transition-all
          duration-300
        "
        >
          {item.type}
        </div>

        <div
          className="
          absolute
          bottom-0
          w-full
          p-4
          text-white
          opacity-100
          md:opacity-0
          md:group-hover:opacity-100
          transition-all
          duration-300
        "
        >
          <h2 className="font-medium text-sm line-clamp-2">
            {item.title}
          </h2>
        </div>
      </div>
    </>
  );
};

export default memo(ResultCard);
