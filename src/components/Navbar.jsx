import logo from "../assets/Pengu.svg";
import { Link, useLocation } from "react-router-dom";
import {
  RiSearchLine,
  RiBookmarkLine,
  RiSettings3Line,
  RiCloseLine,
  RiSunLine,
  RiMoonClearLine,
  RiDeleteBinFill,
} from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCollection } from "../redux/features/collectionSlice";

const SettingsContent = ({
  theme,
  toggleTheme,
  onClearCollection,
}) => (
  <div className="space-y-4">
    <div className="rounded-2xl border border-gray-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-slate-200">
            Theme
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Switch light and dark mode
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className={`
            w-14
            h-8
            rounded-full
            relative
            transition-colors
            duration-300
            cursor-pointer
            ${
              theme === "dark"
                ? "bg-blue-600"
                : "bg-gray-300"
            }
          `}
        >
          <span
            className={`
              absolute
              top-1
              h-6
              w-6
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              text-[10px]
              transition-all
              duration-300
              ${
                theme === "dark"
                  ? "left-7 text-blue-600"
                  : "left-1 text-gray-500"
              }
            `}
          >
            {theme === "dark" ? (
              <RiMoonClearLine size={12} />
            ) : (
              <RiSunLine size={12} />
            )}
          </span>
        </button>
      </div>
    </div>

    <div className="rounded-2xl border border-gray-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-slate-200">
            Clear Collections
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Delete all saved media
          </p>
        </div>

        <button
          onClick={onClearCollection}
          className="
            p-2.5
            rounded-lg
            cursor-pointer
            bg-red-500
            text-white
            hover:bg-red-600
            transition-colors
            duration-200
          "
        >
          <RiDeleteBinFill size={20} />
        </button>
      </div>
    </div>
  </div>
);

const Navbar = ({
  theme,
  toggleTheme,
  isSettingsOpen,
  setIsSettingsOpen,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const collectionCount = useSelector(
    (state) => state.collection.items.length
  );

  const handleClearCollection = () => {
    if (collectionCount === 0) {
      toast.info("Collection is already empty");
      return;
    }

    dispatch(clearCollection());
    toast.success("Collection cleared");
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <>
      <aside
        className="
          hidden
          md:flex
          fixed
          left-0
          top-0
          w-20
          bg-white/95
          dark:bg-slate-900/95
          border-r
          border-gray-300
          dark:border-slate-700
          min-h-screen
          flex-col
          items-center
          py-6
          backdrop-blur-sm
          z-50
        "
      >
        <img
          src={logo}
          alt="MediaSearch Logo"
          className="w-12 h-12 object-contain mb-10"
        />

        <nav className="flex flex-col gap-3 w-full items-center">
          <Link
            to="/"
            onClick={closeSettings}
            className={`
              p-2.5
              rounded-xl
              transition-all
              duration-200
              ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-600 dark:bg-slate-700"
                  : "text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >
            <RiSearchLine size={20} />
          </Link>

          <Link
            to="/collection"
            onClick={closeSettings}
            className={`
              p-2.5
              rounded-xl
              transition-all
              duration-200
              ${
                location.pathname === "/collection"
                  ? "bg-blue-100 text-blue-600 dark:bg-slate-700"
                  : "text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >
            <RiBookmarkLine size={20} />
          </Link>
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            className={`
              p-2.5
              rounded-xl
              transition-all
              duration-200
              cursor-pointer
              ${
                isSettingsOpen
                  ? "bg-blue-100 text-blue-600 dark:bg-slate-700"
                  : "text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >
            <RiSettings3Line size={20} />
          </button>
        </div>
      </aside>

      <section
        className={`
          hidden
          md:block
          fixed
          left-20
          top-0
          h-screen
          w-[24rem]
          bg-white
          dark:bg-slate-900
          border-r
          border-gray-300
          dark:border-slate-700
          z-40
          overflow-y-auto
          transition-all
          duration-300
          ${
            isSettingsOpen
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-10 pointer-events-none"
          }
        `}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[2rem] leading-tight font-semibold text-gray-900 dark:text-slate-100">
              Settings & Support
            </h2>

            <button
              onClick={closeSettings}
              className="
                p-2
                rounded-lg
                text-gray-500
                dark:text-slate-300
                hover:bg-gray-100
                dark:hover:bg-slate-800
              "
            >
              <RiCloseLine size={22} />
            </button>
          </div>

          <SettingsContent
            theme={theme}
            toggleTheme={toggleTheme}
            onClearCollection={handleClearCollection}
          />
        </div>
      </section>

      <nav
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-50
          border-t
          border-gray-200
          dark:border-slate-700
          bg-white/95
          dark:bg-slate-900/95
          backdrop-blur-sm
          px-4
          pt-2
          pb-[calc(0.75rem+env(safe-area-inset-bottom))]
        "
      >
        <div className="flex items-center justify-around">
          <Link
            to="/"
            onClick={closeSettings}
            className={`
              flex
              flex-col
              items-center
              gap-1
              px-4
              py-1.5
              rounded-xl
              text-xs
              ${
                location.pathname === "/"
                  ? "text-blue-600 bg-blue-100 dark:bg-slate-700"
                  : "text-gray-600 dark:text-slate-300"
              }
            `}
          >
            <RiSearchLine size={20} />
            <span>Search</span>
          </Link>

          <Link
            to="/collection"
            onClick={closeSettings}
            className={`
              flex
              flex-col
              items-center
              gap-1
              px-4
              py-1.5
              rounded-xl
              text-xs
              ${
                location.pathname === "/collection"
                  ? "text-blue-600 bg-blue-100 dark:bg-slate-700"
                  : "text-gray-600 dark:text-slate-300"
              }
            `}
          >
            <RiBookmarkLine size={20} />
            <span>Collection</span>
          </Link>

          <button
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            className={`
              flex
              flex-col
              items-center
              gap-1
              px-4
              py-1.5
              rounded-xl
              text-xs
              ${
                isSettingsOpen
                  ? "text-blue-600 bg-blue-100 dark:bg-slate-700"
                  : "text-gray-600 dark:text-slate-300"
              }
            `}
          >
            <RiSettings3Line size={20} />
            <span>Settings</span>
          </button>
        </div>
      </nav>

      <section
        className={`
          md:hidden
          fixed
          inset-0
          z-[60]
          transition-opacity
          duration-300
          ${
            isSettingsOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <button
          onClick={closeSettings}
          className="absolute inset-0 bg-black/35"
          aria-label="Close settings"
        />

        <div
          className={`
            absolute
            left-0
            right-0
            bottom-0
            max-h-[85vh]
            rounded-t-3xl
            bg-white
            dark:bg-slate-900
            border-t
            border-gray-200
            dark:border-slate-700
            px-5
            pt-3
            pb-[calc(1rem+env(safe-area-inset-bottom))]
            overflow-y-auto
            transition-transform
            duration-300
            ${
              isSettingsOpen
                ? "translate-y-0"
                : "translate-y-full"
            }
          `}
        >
          <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-slate-700 mx-auto mb-4" />

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
              Settings
            </h2>

            <button
              onClick={closeSettings}
              className="p-2 rounded-lg text-gray-500 dark:text-slate-300"
            >
              <RiCloseLine size={20} />
            </button>
          </div>

          <SettingsContent
            theme={theme}
            toggleTheme={toggleTheme}
            onClearCollection={handleClearCollection}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
