import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Gamepad,
  GamepadDirectional,
  LaptopMinimal,
  LucideGamepad2,
  Smartphone,
  Filter,
  X,
  Home,
  ChevronRight,
  Search,
  Grid3x3,
  List,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const ListItemsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Disable body scroll when mobile filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  // Fetch games data
  useEffect(() => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPIDAPI_BASE,
      headers: {
        "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          "Something went wrong! " +
            (err.response?.data?.message || err.message)
        );
        setLoading(false);
      });
  }, []);

  const platforms = [
    {
      icon: LaptopMinimal,
      name: "PC",
      apiValue: "PC (Windows)" || "PC",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Gamepad,
      name: "Web Game",
      apiValue: "Web Browser",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Smartphone,
      name: "Mobile",
      apiValue: "Mobile",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: GamepadDirectional,
      name: "PlayStation",
      apiValue: "PlayStation",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: LucideGamepad2,
      name: "Xbox",
      apiValue: "Xbox One",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Gamepad,
      name: "Nintendo Switch",
      apiValue: "Nintendo Switch",
      color: "from-red-500 to-red-600",
    },
  ];

  // Count games per platform
  const getPlatformCount = (apiValue) =>
    data.filter((game) => game.platform === apiValue).length;

  // Filter games by platform and search query
  const filteredGames = data.filter((game) => {
    const matchesPlatform = selectedPlatform
      ? game.platform === selectedPlatform
      : true;
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const handlePlatformSelect = (apiValue) => {
    setSelectedPlatform(apiValue === selectedPlatform ? null : apiValue);
    if (window.innerWidth < 1024) {
      setIsFilterOpen(false);
    }
  };

  const clearFilters = () => {
    setSelectedPlatform(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-md:w-full w-[90%] lg:max-w-7xl py-6 px-4 md:px-0">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link
            to="/"
            className="hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Games</span>
          {selectedPlatform && (
            <>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-red-500">
                {platforms.find((p) => p.apiValue === selectedPlatform)?.name}
              </span>
            </>
          )}
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-light text-gray-900">
              Game Library
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredGames.length} games available
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 md:flex-none md:w-64">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* View Toggle */}
            <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-red-500 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-red-500 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedPlatform || searchQuery) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-gray-500">Active filters:</span>
            {selectedPlatform && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {platforms.find((p) => p.apiValue === selectedPlatform)?.name}
                <button
                  onClick={() => setSelectedPlatform(null)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-purple-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-72 xl:w-80">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-6">
              <div className="mb-5">
                <h2 className="text-lg font-medium text-gray-900">Platforms</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Select platform to filter games
                </p>
              </div>

              {!loading && !error && (
                <div className="space-y-1.5">
                  {platforms.map((platform, index) => (
                    <button
                      key={index}
                      onClick={() => handlePlatformSelect(platform.apiValue)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        selectedPlatform === platform.apiValue
                          ? `bg-linear-to-r ${platform.color} text-white shadow-md`
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedPlatform === platform.apiValue
                              ? "bg-white/20"
                              : "bg-gray-100"
                          }`}
                        >
                          <platform.icon
                            className={`w-4 h-4 ${
                              selectedPlatform === platform.apiValue
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <span className="font-medium text-sm">
                          {platform.name}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          selectedPlatform === platform.apiValue
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {getPlatformCount(platform.apiValue)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-3">
                    Loading platforms...
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <div
            className={`
              fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden
              ${isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            onClick={() => setIsFilterOpen(false)}
          />

          <aside
            className={`
              fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden
              ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <div className="h-full overflow-y-auto">
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-medium text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="mb-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Platforms
                  </h3>
                  <div className="space-y-1.5">
                    {platforms.map((platform, index) => (
                      <button
                        key={index}
                        onClick={() => handlePlatformSelect(platform.apiValue)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          selectedPlatform === platform.apiValue
                            ? `bg-gradient-to-r ${platform.color} text-white`
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <platform.icon className="w-4 h-4" />
                          <span className="font-medium text-sm">
                            {platform.name}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedPlatform === platform.apiValue
                              ? "bg-white/20"
                              : "bg-gray-100"
                          }`}
                        >
                          {getPlatformCount(platform.apiValue)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-xl border border-gray-200 p-12">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"></div>
                  <p className="text-sm text-gray-500 mt-4">Loading games...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-white rounded-xl border border-gray-200 p-12">
                <div className="text-center">
                  <div className="text-red-500 text-5xl mb-4">😕</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-sm text-gray-500">{error}</p>
                </div>
              </div>
            )}

            {/* Games Grid */}
            {!loading && !error && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                {filteredGames.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-gray-400 text-5xl mb-4">!</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No games found
                    </h3>
                    <p className="text-sm text-gray-500">
                      Try adjusting your filters or search query
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Grid View */}
                    {viewMode === "grid" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredGames.map((game) => (
                          <NavLink
                            to={`/game/${game.id}`}
                            key={game.id}
                            className="group block"
                          >
                            <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                              <div className="relative pb-[133%] bg-gray-200">
                                <img
                                  src={game.thumbnail}
                                  alt={game.title}
                                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/300x400?text=Game";
                                  }}
                                />
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium text-sm text-gray-900 line-clamp-1">
                                  {game.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                  {game.genre}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-gray-400">
                                    {game.platform?.split(" ")[0]}
                                  </span>
                                  <span className="text-xs font-medium text-red-500">
                                    View →
                                  </span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    )}

                    {/* List View */}
                    {viewMode === "list" && (
                      <div className="space-y-3">
                        {filteredGames.map((game) => (
                          <NavLink
                            to={`/game/${game.id}`}
                            key={game.id}
                            className="block group"
                          >
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300">
                              <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                <img
                                  src={game.thumbnail}
                                  alt={game.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/64x64?text=Game";
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 line-clamp-1">
                                  {game.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                                  {game.genre}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-400">
                                    {game.platform}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListItemsPage;
