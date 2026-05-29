import { useState } from "react";
import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import CollectionCard from "./CollectionCard";
import MediaPreviewModal from "./MediaPreviewModal";

const CollectionGrid = () => {
  const collectionItems = useSelector(
    (state) => state.collection.items
  );
  const [previewItem, setPreviewItem] =
    useState(null);

  const breakpointColumnsObj = {
    default: 5,
    1536: 5,
    1280: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  if (collectionItems.length === 0) {
    return (
      <div className="text-center py-20 px-5">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-2">
          Nothing saved yet
        </h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400">
          Bookmark media from search and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto px-3 sm:px-4 pb-10">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-3"
        columnClassName="space-y-3"
      >
        {collectionItems.map((item) => (
          <CollectionCard
            key={`${item.type}-${item.id}`}
            item={item}
            onPreviewOpen={setPreviewItem}
          />
        ))}
      </Masonry>

      <MediaPreviewModal
        item={previewItem}
        isOpen={Boolean(previewItem)}
        onClose={() =>
          setPreviewItem(null)
        }
      />
    </div>
  );
};

export default CollectionGrid;
