import React, { useRef } from "react";

const ResultCard = ({ item }) => {

  const videoRef = useRef(null);

  const playVideo = () => {
    if (
      item.type === "video" &&
      videoRef.current
    ) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (
      item.type === "video" &&
      videoRef.current
    ) {
      videoRef.current.pause();
    }
  };

  const downloadMedia =
  async (e) => {

    e.stopPropagation();

    try {

      const response =
      await fetch(
        item.src
      );

      const blob =
      await response.blob();

      const url =
      window.URL
      .createObjectURL(
        blob
      );

      const link =
      document
      .createElement(
        "a"
      );

      link.href =
      url;

      link.download =
      `${item.title}.${item.type === "photo"
      ? "jpg"
      : "mp4"}`;

      document
      .body
      .appendChild(
        link
      );

      link.click();

      link.remove();

      window
      .URL
      .revokeObjectURL(
        url
      );

    } catch {

      alert(
        "Download failed"
      );

    }

  };

  return (

    <div
      onMouseEnter={
        playVideo
      }

      onMouseLeave={
        pauseVideo
      }

      className="
      group
      relative
      overflow-hidden
      rounded-2xl
      bg-gray-900
      shadow-xl
      hover:scale-[1.02]
      transition
      "
    >

      {

      item.type ===
      "video"

      ?

      (

        <video

          ref={
            videoRef
          }

          muted
          loop
          playsInline

          poster={
            item.thumbnail
          }

          className="
          w-full
          h-64
          object-cover
          "
        >

          <source
            src={
              item.src
            }
          />

        </video>

      )

      :

      (

        <img

          src={
            item.thumbnail
          }

          alt={
            item.title
          }

          className="
          w-full
          h-64
          object-cover
          "

        />

      )

      }

      {/* Overlay */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/80
        to-transparent
        opacity-0
        group-hover:opacity-100
        transition

        "
      />

      {/* Save */}

      <button

        onClick={
          downloadMedia
        }

        className="
        absolute
        top-3
        left-3
        cursor-pointer
        px-4
        py-2

        rounded-xl

        bg-green-600
        hover:bg-green-500

        text-sm

        font-semibold

        z-20
        "

      >

        Save ↓

      </button>

      {/* Type */}

      <div
        className="
        absolute
        top-3
        right-3

        px-3
        py-1

        rounded-full

        bg-black/40

        text-sm
        "
      >

        {
          item.type
        }

      </div>

      {/* Title */}

      <div
        className="
        absolute
        bottom-0

        p-4

        text-white
        "
      >

        <h2
          className="
          font-semibold
          "
        >

          {
            item.title
          }

        </h2>

      </div>

    </div>

  );
};

export default ResultCard;