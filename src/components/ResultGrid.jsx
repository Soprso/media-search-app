import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, fetchVideos, fetchGifs } from "../api/mediaApi";
import {
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";

import { useEffect } from "react";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();

  const { query, activeTab, results, loading, error, page } = useSelector(
    (store) => store.search,
  );

  useEffect(() => {
    if (!query?.trim()) return;

    const getData = async () => {
      try {
        dispatch(setLoading(true));

        dispatch(setError(null));

        let data = [];

        if (activeTab === "photos") {
          const response = await fetchPhotos(query, page);

          data = response.results.map((item) => ({
            id: item.id,

            type: "photo",

            title: item.alt_description || "Photo",

            thumbnail: item.urls.small,

            src: item.urls.full,
          }));
        } else if (activeTab === "gifs") {
          const response = await fetchGifs(query, page);

          data = response.data.map((item) => ({
            id: item.id,

            type: "gif",

            title: item.title || "GIF",

            thumbnail: item.images.fixed_height.url,

            src: item.images.original.url,
          }));
        } else {
          const response = await fetchVideos(query, page);

          data = response.videos.map((item) => ({
            id: item.id,

            type: "video",

            title: item.user?.name || "Video",

            thumbnail: item.image,

            src: item.video_files?.[0]?.link,
          }));
        }

        dispatch(setResults(data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getData();
  }, [query, activeTab, page, dispatch]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-6
    p-6
    "
    >
      {results.map((item) => (
        <ResultCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ResultGrid;
