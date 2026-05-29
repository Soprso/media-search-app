import { useEffect, useRef, useState } from "react";
import { RiCloseLine } from "@remixicon/react";
import gsap from "gsap";
import GsapLoader from "./GsapLoader";

const PreviewMedia = ({ item }) => {
  const [mediaReady, setMediaReady] =
    useState(false);
  const isVideo = item.type === "video";
  const mediaSrc = isVideo
    ? item.src || item.previewSrc
    : item.src || item.thumbnail;

  return (
    <div className="relative max-h-[92vh] overflow-auto flex items-center justify-center bg-black">
      {!mediaReady && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45">
          <GsapLoader label="Opening preview..." />
        </div>
      )}

      {isVideo ? (
        <video
          src={mediaSrc}
          controls
          autoPlay
          playsInline
          preload="auto"
          onLoadedData={() =>
            setMediaReady(true)
          }
          className={`w-full max-h-[86vh] object-contain bg-black transition-opacity duration-200 ${
            mediaReady ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <img
          src={mediaSrc}
          alt={item.title || "Media preview"}
          onLoad={() =>
            setMediaReady(true)
          }
          className={`w-full max-h-[86vh] object-contain bg-black transition-opacity duration-200 ${
            mediaReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

const MediaPreviewModal = ({
  item,
  isOpen,
  onClose,
}) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const prevOverflow =
      document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, {
        opacity: 0,
      });
      gsap.set(panelRef.current, {
        opacity: 0,
        y: 14,
        scale: 0.98,
      });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.18,
        ease: "power1.out",
      });

      gsap.to(panelRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.24,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen || !item) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
    >
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        aria-label="Close preview"
      />

      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-5xl max-h-[92vh] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-black/55 text-white flex items-center justify-center hover:bg-black/75 transition-colors"
          aria-label="Close preview"
        >
          <RiCloseLine size={20} />
        </button>

        <PreviewMedia
          key={`${item.type}-${item.id}`}
          item={item}
        />
      </div>
    </div>
  );
};

export default MediaPreviewModal;
