import {
  ChevronDown,
  GamepadDirectional,
  GamepadIcon,
  LaptopMinimal,
  LucideGamepad2,
  Menu,
  Search,
  Smartphone,
  Target,
  X,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleMobileDropdown = (name) => {
    setMobileDropdown((prev) => (prev === name ? null : name));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }

      // Close mobile menu when clicking outside
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }

      // Close search when clicking outside
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest(".search-button")
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={navbarRef}
      className="container max-md:w-full w-[80%] lg:max-w-7xl mx-auto text-white flex justify-between py-4 max-sm:px-2"
    >
      {/* Left */}
      <div className="flex gap-x-5 items-center">
        {/* Hamburger Menu Icon - Visible on smaller screens */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="menu-button lg:hidden text-white hover:text-blue-400"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo - Hidden on mobile, visible on larger screens */}
        <NavLink to={"/"} className="hidden lg:block py-5">
          Qwikgold
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-3 text-xs font-bold ">
          {/* GAMES */}
          <li
            className={`relative cursor-pointer group flex gap-x-2 items-center p-4 rounded-sm transition-colors duration-300 ease-in-out ${
              openDropdown === "games" ? "bg-blue-400/20" : ""
            }`}
            onMouseEnter={(e) => {
              if (openDropdown !== "games") {
                e.currentTarget.classList.add("bg-blue-400/20");
              }
            }}
            onMouseLeave={(e) => {
              if (openDropdown !== "games") {
                e.currentTarget.classList.remove("bg-blue-400/20");
              }
            }}
          >
            <NavLink
              to="/games"
              className={` ${
                openDropdown === "games"
                  ? "text-blue-400"
                  : "group-hover:text-blue-400"
              }`}
            >
              GAMES
            </NavLink>

            <span
              onClick={() => handleDropdown("games")}
              className={`dropdown-icon cursor-pointer p-1 rounded-sm transition-all duration-300 ${
                openDropdown === "games" ? "bg-blue-400 " : "hover:bg-blue-400"
              }`}
            >
              <ChevronDown size={15} />
            </span>

            {/* Drop down */}
            {openDropdown === "games" && (
              <ul className="absolute z-50 top-16 left-0 bg-gray-600 text-white p-5 rounded min-w-96 grid grid-cols-2 gap-5 shadow-lg border border-blue-400/20 ">
                <li className="hover:bg-blue-400/40 rounded-md">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <LaptopMinimal size={18} />
                    PC
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <Target size={18} />
                    Webgame
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <Smartphone size={18} />
                    Mobile
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <GamepadDirectional size={18} />
                    Playstation
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <LucideGamepad2 size={18} />
                    Xbox
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <GamepadIcon size={18} />
                    Nintendo Switch
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* CARDS */}
          <li
            className={`relative cursor-pointer group flex gap-x-2 items-center rounded-sm p-4 transition-colors duration-300 ease-in-out${
              openDropdown === "cards" ? "bg-blue-400/20" : ""
            }`}
            onMouseEnter={(e) => {
              if (openDropdown !== "cards") {
                e.currentTarget.classList.add("bg-blue-400/20");
              }
            }}
            onMouseLeave={(e) => {
              if (openDropdown !== "cards") {
                e.currentTarget.classList.remove("bg-blue-400/20");
              }
            }}
          >
            <NavLink
              to="/cards"
              className={`${
                openDropdown === "cards"
                  ? "text-blue-400"
                  : "group-hover:text-blue-400"
              }`}
            >
              CARDS
            </NavLink>

            <span
              onClick={() => handleDropdown("cards")}
              className={`dropdown-icon cursor-pointer p-1 rounded-sm ${
                openDropdown === "cards" ? "bg-blue-400 " : "hover:bg-blue-400"
              }`}
            >
              <ChevronDown size={15} />
            </span>

            {/* Drop down */}
            {openDropdown === "cards" && (
              <ul className="absolute z-50 top-16 left-0 bg-gray-600 text-white p-5 rounded min-w-96 grid grid-cols-2 gap-5 shadow-lg border border-blue-400/20">
                <li className="hover:bg-blue-400/40 rounded-md transition-colors duration-300">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <LaptopMinimal size={18} />
                    PC
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md transition-colors duration-300">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <Target size={18} />
                    Webgame
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md transition-colors duration-300">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <Smartphone size={18} />
                    Mobile
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md transition-colors duration-300">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <GamepadDirectional size={18} />
                    Playstation
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md transition-colors duration-300">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <LucideGamepad2 size={18} />
                    Xbox
                  </NavLink>
                </li>

                <li className="hover:bg-blue-400/40 rounded-md transition-colors duration-300">
                  <NavLink to="/" className="flex gap-x-3 items-center p-2">
                    <GamepadIcon size={18} />
                    Nintendo Switch
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* nav links-2 */}
      <ul className="flex h-fit gap-5 my-auto items-center">
        {/* Search for small to large screens (sm-lg) */}
        <div className="block lg:hidden">
          {isSearchOpen ? (
            <div ref={searchRef} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm outline-none focus:ring-1 focus:ring-white"
                autoFocus
              />
            </div>
          ) : (
            <Search
              size={20}
              onClick={() => setIsSearchOpen(true)}
              className="search-button cursor-pointer hover:text-blue-400 transition-all duration-300 ease-in-out"
            />
          )}
        </div>

        {/* Search for extra large screens (xl and above) */}
        <div className="hidden lg:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="text-white px-3 py-1 rounded-l-md text-sm outline-none focus:ring-1 focus:ring-white"
          />
          <Search
            size={20}
            className="p-1 rounded-r-md cursor-pointer"
            style={{ height: "30px", width: "30px" }}
          />
        </div>

        <div
          className={`relative rounded-full size-8 bg-red-100 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all duration-300 ease-in-out ${
            openDropdown === "profile" ? "bg-blue-400 " : "hover:bg-blue-400"
          }`}
          onClick={() => handleDropdown("profile")}
        >
          {/* Profile Drop down */}
          {openDropdown === "profile" && (
            <ul className="absolute z-50 top-10 min-w-36 -left-28 bg-gray-600 text-white py-2 rounded shadow-lg border border-blue-400/20 text-xs px-2 grid gap-2">
              <NavLink to="/sign-in">
                <li className="hover:bg-blue-400/40 px-2 rounded transition-colors duration-300 cursor-pointer">
                  Sign in
                </li>
              </NavLink>
              <NavLink to="/sign-up">
                <li className="hover:bg-blue-400/40 px-2 rounded transition-colors duration-300 cursor-pointer">
                  Sign up
                </li>
              </NavLink>
              <NavLink to="/profile">
                <li className="hover:bg-blue-400/40 px-2 rounded transition-colors duration-300 cursor-pointer">
                  Profile
                </li>
              </NavLink>
              <NavLink to="/admin/dashboard">
                <li className="hover:bg-blue-400/40 px-2 rounded transition-colors duration-300 cursor-pointer">
                  Dashboard
                </li>
              </NavLink>
            </ul>
          )}
        </div>
      </ul>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 w-80 h-full bg-[#292F32]  lg:hidden z-50 shadow-xl ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <NavLink to={"/"} className="text-white font-bold text-lg">
            Qwikgold
          </NavLink>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-blue-400 p-1 hover:bg-blue-400/20 rounded"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <ul className="flex flex-col py-4 text-sm font-bold overflow-y-auto h-[calc(100%-73px)]">
          {/* GAMES - Mobile */}
          <li className="border-b border-gray-700">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-blue-400/20">
              <NavLink
                to="/games"
                className="text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GAMES
              </NavLink>
              <button
                onClick={() => handleMobileDropdown("games")}
                className="p-1 hover:bg-blue-400 rounded-sm transition-colors duration-300"
              >
                <ChevronDown
                  size={18}
                  className={`cursor-pointer  ${
                    mobileDropdown === "games" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Mobile Games Dropdown */}
            {mobileDropdown === "games" && (
              <ul className="bg-gray-700 py-2">
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LaptopMinimal size={16} />
                    PC
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Target size={16} />
                    Webgame
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Smartphone size={16} />
                    Mobile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GamepadDirectional size={16} />
                    Playstation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LucideGamepad2 size={16} />
                    Xbox
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GamepadIcon size={16} />
                    Nintendo Switch
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* CARDS - Mobile */}
          <li className="border-b border-gray-700">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-blue-400/20">
              <NavLink
                to="/games"
                className="text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CARDS
              </NavLink>
              <button
                onClick={() => handleMobileDropdown("cards")}
                className="p-1 hover:bg-blue-400 rounded-sm "
              >
                <ChevronDown
                  size={18}
                  className={`cursor-pointer ${
                    mobileDropdown === "cards" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Mobile Cards Dropdown */}
            {mobileDropdown === "cards" && (
              <ul className="bg-gray-700 py-2">
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LaptopMinimal size={16} />
                    PC
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Target size={16} />
                    Webgame
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Smartphone size={16} />
                    Mobile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GamepadDirectional size={16} />
                    Playstation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LucideGamepad2 size={16} />
                    Xbox
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex gap-x-3 items-center px-8 py-2 hover:bg-blue-400/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GamepadIcon size={16} />
                    Nintendo Switch
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* DIRECT TOP-UP - Mobile */}
          <li className="border-b border-gray-700">
            <NavLink
              to="/direct-top-up"
              className="block px-4 py-3 hover:bg-blue-400/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              DIRECT TOP-UP
            </NavLink>
          </li>

          {/* MOBILE RECHARGE - Mobile */}
          <li className="border-b border-gray-700">
            <NavLink
              to="/mobile-recharge"
              className="block px-4 py-3 hover:bg-blue-400/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              MOBILE RECHARGE
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
