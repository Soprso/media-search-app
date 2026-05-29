import React, { useRef } from "react";

import {
  RiDownloadLine,
  RiBookmarkLine,
  RiBookmarkFill,
} from "@remixicon/react";

const ResultCard = ({ item }) => {
  const videoRef = useRef(null);

  // -----------------------------
  // Favorites / Collection
  // -----------------------------

  const addToCollection = (item) => {
    const oldData =
      JSON.parse(localStorage.getItem("collection")) || [];

    const alreadyExists = oldData.some(
      (data) => data.id === item.id
    );

    if (alreadyExists) return;

    const newData = [...oldData, item];

    localStorage.setItem(
      "collection",
      JSON.stringify(newData)
    );
  };

  const collection =
    JSON.parse(localStorage.getItem("collection")) || [];

  const isSaved = collection.some(
    (data) => data.id === item.id
  );

  // -----------------------------
  // Video Hover
  // -----------------------------

  const playVideo = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
    }
  };

  // -----------------------------
  // Download
  // -----------------------------

  const downloadMedia = async (e) => {
    e.stopPropagation();

    try {
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
    <div
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
      className="
      group
      relative

      overflow-hidden

      rounded-2xl

      bg-white

      shadow-sm
      hover:shadow-xl

      transition-all
      duration-300

      break-inside-avoid
      "
    >
      {/* Media */}

      {item.type === "video" ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
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
            src={item.src}
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

      {/* Overlay */}

      <div
        className="
        absolute
        inset-0

        bg-gradient-to-t
        from-black/80
        via-black/10
        to-transparent

        opacity-0
        group-hover:opacity-100

        transition-all
        duration-300
        "
      />

      {/* Download */}

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

        opacity-0
        group-hover:opacity-100

        hover:bg-blue-600
        hover:text-white

        transition-all
        duration-300

        cursor-pointer
        "
      >
        <RiDownloadLine size={18} />
      </button>

      {/* Collection */}

      <button
        onClick={() => addToCollection(item)}
        className="
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

        text-gray-800

        opacity-0
        group-hover:opacity-100

        hover:bg-red-500
        hover:text-white

        transition-all
        duration-300

        cursor-pointer
        "
      >
        {isSaved ? (
          <RiBookmarkFill size={18} />
        ) : (
          <RiBookmarkLine size={18} />
        )}
      </button>

      {/* Media Type */}

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

        opacity-0
        group-hover:opacity-100

        transition-all
        duration-300
        "
      >
        {item.type}
      </div>

      {/* Title */}

      <div
        className="
        absolute
        bottom-0

        w-full

        p-4

        text-white

        opacity-0
        group-hover:opacity-100

        transition-all
        duration-300
        "
      >
        <h2
          className="
          font-medium
          text-sm

          line-clamp-2
          "
        >
          {item.title}
        </h2>
      </div>
    </div>
  );
};

export default ResultCard;