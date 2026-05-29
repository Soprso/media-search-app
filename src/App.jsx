import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import MediaDetailsPage from "./pages/MediaDetailsPage";

import Navbar from "./components/Navbar";

const App = () => {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      "light"
  );
  const [isSettingsOpen, setIsSettingsOpen] =
    useState(false);

  useEffect(() => {
    const isDark =
      theme === "dark";

    document.documentElement.classList.toggle(
      "dark",
      isDark
    );
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <div
      className={`
      min-h-screen
      flex
      transition-colors
      duration-300
      ${
        theme === "dark"
          ? "bg-slate-950 text-slate-100"
          : "bg-white text-gray-900"
      }
      `}
    >
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
      />
      {/* Main Content */}

      <main
        className={`
        flex-1
        overflow-x-hidden
        pb-24
        md:pb-0
        transition-all
        duration-300
        ml-0
        ${
          isSettingsOpen
            ? "md:ml-[29rem]"
            : "md:ml-20"
        }
        `}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route
            path="/media/:type/:id"
            element={<MediaDetailsPage />}
          />
        </Routes>
      </main>

      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        toastClassName={() =>
          theme === "dark"
            ? "bg-slate-900 text-slate-100 border border-slate-700"
            : "bg-white text-gray-900 border border-gray-200"
        }
      />
    </div>
  );
};

export default App;
