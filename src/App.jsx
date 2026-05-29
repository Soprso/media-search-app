import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div
      className="
      min-h-screen
      bg-white
      flex
      "
    >
     <Navbar></Navbar>
      {/* Main Content */}

      <main
        className="
        flex-1
        overflow-x-hidden
        "
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
