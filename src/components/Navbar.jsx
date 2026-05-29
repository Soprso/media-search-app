import logo from "../assets/ms-icon.png";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { RiSearchLine, RiBookmarkLine } from "@remixicon/react";
const Navbar = () => {
  return (
    <div>
       {/* Sidebar */}

      <aside
        className="
        w-20
        bg-white
        border-r-1
        border-gray-300
        min-h-screen
        flex
        flex-col
        items-center

        py-6
        "
      >
        {/* Logo */}

        <img
          src={logo}
          alt="MediaSearch Logo"
          className="
          w-12
          h-12
          object-contain
          mb-10
          "
        />

        {/* Navigation */}

        <nav
          className="
          flex
          flex-col
          gap-3
          "
        >
          <Link
            to="/"
            className={`
              p-2.5
              rounded-xl

              transition-all
              duration-200

              ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            <RiSearchLine size={18} />
          </Link>

          <Link
            to="/collection"
            className={`
              p-2.5
              rounded-xl

              transition-all
              duration-200

              ${
                location.pathname === "/collection"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            <RiBookmarkLine size={18} />
          </Link>
        </nav>
      </aside>

    </div>
  )
}

export default Navbar
