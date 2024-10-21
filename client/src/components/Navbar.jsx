import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../assets/logo-istts.png";
import elang from "../assets/elang-ai.png";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth < 1024);

  const api = import.meta.env.VITE_BASE_URL;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const response = await fetch(
          `${api}/games/search?title=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("Screen size changed: ", window.innerWidth);
    console.log("isMdScreen: ", isMdScreen);
    if (!isMdScreen) {
      setIsOpen(false);
    }
  }, [isMdScreen]);

  useEffect(() => {
    console.log("Menu state changed: ", isOpen);
  }, [isOpen]);

  return (
    <nav className="bg-white flex top-0 z-50 font-sans">
      <div className="container mx-auto">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-4 md:px-0 gap-4 text-center">
          <Link to="/" className="flex gap-2 items-center">
            <img src={logo} alt="Logo" className="w-14 h-14" />
            <img src={elang} alt="Elang" className="w-16 h-16" />
            {!isMdScreen && (
              <span className="self-center text-2xl font-bold whitespace-nowrap ">
                Game and Multimedia Research Center
              </span>
            )}
          </Link>
          {isMdScreen ? (
            <div className="flex justify-between items-center w-full">
              <form
                onSubmit={handleSearch}
                className="flex justify-center relative w-full max-w-sm gap-4"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-7 h-7 absolute left-7 md:left-11 top-1/2 transform -translate-y-1/2"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border w-1/2 px-4 py-2 rounded-md"
                  placeholder="Search"
                />
              </form>
              <div>
                {isOpen ? (
                  <button onClick={toggleMenu} className="text-primary mr-4">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                ) : (
                  <button onClick={toggleMenu} className="text-primary mr-4">
                    <Bars3Icon className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="w-full flex justify-center items-center">
                <ul className="w-full font-bold flex justify-end items-center gap-10">
                  <CustomLink to="/">Home</CustomLink>
                  <CustomLink to="/games">Games</CustomLink>
                  <CustomLink to="/about">About</CustomLink>
                </ul>
              </div>
              <div className="flex justify-center items-center w-full">
                <form
                  onSubmit={handleSearch}
                  className="relative w-full max-w-sm"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-7 h-7 absolute left-3 top-1/2 transform -translate-y-1/2"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border w-full px-12 py-2 rounded-md"
                    placeholder="Search"
                  />
                </form>
              </div>
            </>
          )}
        </div>
        {searchResults.length > 0 && (
          <div className="container mx-auto mt-4">
            <ul className="px-2 py-1">
              <h1 className="font-bold text-xl">Search Result</h1>
              {searchResults.map((game) => (
                <li key={game.id} className="font-semibold">
                  <Link to={`/games/${game.id}`} onClick={clearSearchResults}>
                    {game.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isMdScreen && isOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b text-white from-slate-700 to-black via-slate-700 overflow-auto z-50">
          <div className="flex items-center justify-between mt-7 px-4 pl-6 text-xl mb-4 font-bold">
            <Link
              to="/"
              className={({ isActive }) =>
                isActive ? "block px-4 py-2 underline " : "block px-4 py-2 "
              }
            >
              Home
            </Link>
            <button onClick={toggleMenu} className="text-primary mr-4 ">
              <XMarkIcon className="h-6 w-6 items-end hover:outline-8" />
            </button>
          </div>
          <div className="flex flex-col pl-6 text-xl gap-5 font-bold">
            <Link
              to="/games"
              className={({ isActive }) =>
                isActive ? "block px-4 py-2 underline" : "block px-4 py-2"
              }
            >
              Games
            </Link>
            <Link
              to="/about"
              className={({ isActive }) =>
                isActive ? "block px-4 py-2 underline" : "block px-4 py-2"
              }
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={`relative group ${isActive ? "active" : ""}`}>
      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
