import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "videos", "gifs"];
  const dispatch = useDispatch();
  const activeTab = useSelector((state)=>state.search.activeTab)
  return (
    <div className="flex gap-5 p-10">
      {tabs.map((elem, id) => {
        return (
          <button
            onClick={() => {
              dispatch(setActiveTabs(elem));
            }}
            className={`${(activeTab === elem?'bg-blue-700':' bg-gray-600')} transition cursor-pointer active:scale-95 px-5 py-2 rounded uppercase`}
            key={id}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
