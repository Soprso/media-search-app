import React, { useState } from "react";
import { fetchPhotos } from "../api/mediaApi";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";



const SearchBar = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted");
    dispatch(setQuery(input))

    // setInput("")
  };

  return (
    <div>
      <form className="flex bg-gray-900 gap-5 p-10" onSubmit={submitHandler}>
        <input
          required
          className="border-2 w-full px-4 py-2 text-xl rounded outline-none"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Search anything..."
        />
        <button 
        className="hover:bg-white hover:text-black active:scale-95 border-2 px-4 py-2 text-xl rounded outline-none cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
