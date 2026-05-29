import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  switchTab,
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

    dispatch(switchTab(tab));
  };

  return (
    <div
      className="
      flex
      items-center
      gap-5
      sm:gap-8
      overflow-x-auto
      whitespace-nowrap
      px-3
      sm:px-4
      py-3
      sm:py-4
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
                  dark:text-blue-400
                  border-blue-600
                  dark:border-blue-400
                  `
                  : `
                  text-gray-500
                  dark:text-slate-400
                  border-transparent

                  hover:text-gray-800
                  dark:hover:text-slate-100
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
