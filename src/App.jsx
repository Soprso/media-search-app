import ResultGrid from "./components/ResultGrid";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import Pagination from "./components/Pagination";

const App = () => {
  return (
    <div
      className="
      min-h-screen
      bg-gray-950
      text-white
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        "
      >
        {/* Search */}
        <div
          className="
          mb-6
          "
        >
          <SearchBar />
        </div>

        {/* Tabs */}
        <div
          className="
          mb-10
          "
        >
          <Tabs />
        </div>

        {/* Results */}
        <ResultGrid />
        <Pagination />
      </div>
    </div>
  );
};

export default App;
