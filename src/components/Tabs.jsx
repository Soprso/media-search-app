import React from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  setActiveTabs,
  clearResults,
  setPage,
} from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = [
    "photos",
    "videos",
    "gifs",
  ];

  const dispatch = useDispatch();

  const activeTab = useSelector(
    (state) => state.search.activeTab
  );

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    dispatch(clearResults());
    dispatch(setPage(1));
    dispatch(setActiveTabs(tab));
  };

  return (
    <div
      className="
      flex
      items-center

      gap-8

      px-4
      py-4
      "
    >
      {tabs.map((elem) => {
        const isActive =
          activeTab === elem;

        return (
          <button
            key={elem}
            onClick={() =>
              handleTabChange(elem)
            }
            className={`
              pb-2

              font-medium
              capitalize

              border-b-2

              transition-all
              duration-200

              cursor-pointer

              ${
                isActive
                  ? `
                  text-blue-600
                  border-blue-600
                  `
                  : `
                  text-gray-500
                  border-transparent

                  hover:text-gray-800
                  `
              }
            `}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;