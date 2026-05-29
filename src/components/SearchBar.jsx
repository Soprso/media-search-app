import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiSearchLine } from "@remixicon/react";
import { startSearch } from "../redux/features/searchSlice";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const currentQuery = useSelector((store) => store.search.query);

  const submitHandler = (e) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (!trimmed) return;

    if (trimmed === currentQuery) return;

    dispatch(startSearch(trimmed));
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="
        relative
        min-w-full
        mx-auto
        px-3
        sm:px-4
        "
      >
        <input
          type="text"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
          className="
          w-full

          pl-4
          pr-14
          py-3
          sm:py-4
          bg-gray-100
          dark:bg-slate-800

          rounded-2xl

          border
          border-gray-200
          dark:border-slate-700

          text-gray-900
          dark:text-slate-100
          text-sm
          sm:text-base

          placeholder:text-gray-500
          dark:placeholder:text-slate-400
          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
          dark:focus:ring-blue-900/50
          focus:border-blue-500
          transition-all
          duration-200
          "
        />

        <button
          type="submit"
          className="
          absolute
          right-6
          sm:right-8
          top-1/2
          -translate-y-1/2

          w-10
          h-10

          flex
          items-center
          justify-center

          rounded-full

          text-blue-600
          dark:text-blue-400
          hover:text-blue-700
          md:hover:scale-110

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
