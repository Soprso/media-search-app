import ResultGrid from "../components/ResultGrid";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";

import { useSelector } from "react-redux";

const HomePage = () => {
  const { query } = useSelector((store) => store.search);

  return (
    <div
      className="
      w-full
      min-h-screen

      "
    >
      {/* Search Section */}

      <div
        className="
        min-w-full
        mx-auto
        "
      >
        <div className=" py-4 ">
          <SearchBar />
        </div>

        {query ? (
          <>
            <div className="mb-1">
              <Tabs />
            </div>

            <ResultGrid />

          </>
        ) : (
          <div
            className="
            flex
            items-center
            justify-center
            h-[60vh]
            "
          >
            <div
              className="
              text-center
              "
            >
              <h2
                className="
                text-3xl
                font-bold
                text-gray-800
                mb-3
                "
              >
                Search Movies, Music & Books
              </h2>

              <p
                className="
                text-gray-500
                "
              >
                Start by entering a keyword above.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;