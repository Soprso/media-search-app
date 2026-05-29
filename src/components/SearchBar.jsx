import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiSearchLine } from "@remixicon/react";

import {
  setQuery,
  clearResults,
  setPage,
} from "../redux/features/searchSlice";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const currentQuery = useSelector(
    (store) => store.search.query
  );

  const submitHandler = (e) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (!trimmed) return;

    if (trimmed === currentQuery) return;

    dispatch(clearResults());

    dispatch(setPage(1));

    dispatch(setQuery(trimmed));
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="
        relative
        min-w-full
        mx-auto
        px-4
        "
      >
        <input
          type="text"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search movies, music, books..."
          className="
          w-full

          pl-14
          pr-16
          py-4
          bg-gray-200

          rounded-2xl

          border
          border-gray-200

          text-gray-900

          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
          focus:border-blue-500
          focus:border-4
          transition-all
          duration-200
          "
        />

        <button
          type="submit"
          className="
          absolute
          right-8
          top-1/2
          -translate-y-1/2

          w-10
          h-10

          flex
          items-center
          justify-center

          rounded-full

          text-blue-600
          hover:text-blue-700
          hover:scale-150

          transition-all
          duration-200

          cursor-pointer
          "
        >
          <RiSearchLine size={18} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;