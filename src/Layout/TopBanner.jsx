import { BoxIcon, Globe, DollarSign, X, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const TopBanner = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);

  // Language and currency state
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [tempLanguage, setTempLanguage] = useState("EN");
  const [tempCurrency, setTempCurrency] = useState("USD");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLanguageDialog = () => {
    setTempLanguage(selectedLanguage);
    setTempCurrency(selectedCurrency);
    setIsLanguageDialogOpen(true);
  };

  const closeLanguageDialog = () => {
    setIsLanguageDialogOpen(false);
  };

  const saveSettings = () => {
    setSelectedLanguage(tempLanguage);
    setSelectedCurrency(tempCurrency);
    setIsLanguageDialogOpen(false);
  };

  // Available options
  const languages = ["EN", "ES", "FR", "DE", "JP", "CN", "KR"];
  const currencies = ["USD", "EUR", "GBP", "JPY", "CNY", "KRW"];

  return (
    <>
      <nav className="container max-sm:w-full w-[80%] lg:max-w-7xl mx-auto text-white py-3 max-sm:px-2">
        {/* Top bar with menu icon and language selector */}
        <div className="flex items-center justify-between">
          <div className="menu lg:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <BoxIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop menu - hidden on mobile */}
          <ul className="hidden lg:flex gap-4 text-xs">
            <NavLink to="/spin" className="hover:text-red-500">
              SPIN REWARD
            </NavLink>
            <NavLink to="/support" className="hover:text-red-500">
              SUPPORT
            </NavLink>
            <NavLink to="/news" className="hover:text-red-500">
              NEWS
            </NavLink>
            <NavLink to="/lucky-draw" className="hover:text-red-500">
              LUCKY DRAW
            </NavLink>
          </ul>

          {/* Language/Currency selector - clickable */}
          <ul>
            <li className="font-semibold text-sm">
              <button
                onClick={openLanguageDialog}
                className="flex items-center gap-1 hover:text-red-500 transition-colors"
              >
                <Globe size={14} />
                {selectedLanguage} <span className="font-light">/</span>{" "}
                {selectedCurrency}
                <ChevronDown size={12} className="ml-1" />
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile menu dropdown - appears below the nav when toggled */}
        {isMenuOpen && (
          <div className="lg:hidden  mt-4 bg-gray-900 rounded-lg overflow-hidden transition-all duration-300">
            <ul className="py-2">
              <li>
                <NavLink
                  to="/spin"
                  className="block px-4 py-3 text-white hover:bg-gray-800 hover:text-red-500 text-sm"
                  onClick={toggleMenu}
                >
                  SPIN REWARD
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className="block px-4 py-3 text-white hover:bg-gray-800 hover:text-red-500 text-sm"
                  onClick={toggleMenu}
                >
                  SUPPORT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/news"
                  className="block px-4 py-3 text-white hover:bg-gray-800 hover:text-red-500 text-sm"
                  onClick={toggleMenu}
                >
                  NEWS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/lucky-draw"
                  className="block px-4 py-3 text-white hover:bg-gray-800 hover:text-red-500 text-sm"
                  onClick={toggleMenu}
                >
                  LUCKY DRAW
                </NavLink>
              </li>
            </ul>

            {/* Mobile language selector */}
            <div className="border-t border-gray-800 px-4 py-3">
              <button
                onClick={() => {
                  toggleMenu();
                  openLanguageDialog();
                }}
                className="flex items-center justify-between w-full text-left"
              >
                <div>
                  <p className="text-gray-400 text-xs">Language / Currency</p>
                  <p className="text-white font-semibold text-sm mt-1">
                    {selectedLanguage} <span className="text-gray-500">/</span>{" "}
                    {selectedCurrency}
                  </p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Language/Currency Dialog */}
      {isLanguageDialogOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={closeLanguageDialog}
          />

          {/* Dialog */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-900 rounded-xl z-50 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h2 className="text-white font-medium text-lg">
                Language & Currency
              </h2>
              <button
                onClick={closeLanguageDialog}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6">
              {/* Language Selection */}
              <div>
                <label className="block text-gray-400 text-xs uppercase mb-3">
                  Select Language
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setTempLanguage(lang)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        tempLanguage === lang
                          ? "bg-red-500 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency Selection */}
              <div>
                <label className="block text-gray-400 text-xs uppercase mb-3">
                  Select Currency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setTempCurrency(curr)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        tempCurrency === curr
                          ? "bg-red-500 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Selection Summary */}
              <div className="bg-gray-800/50 rounded-lg p-3 flex items-center gap-2">
                <Globe size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">
                  Current: {tempLanguage} / {tempCurrency}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-5 border-t border-gray-800">
              <button
                onClick={closeLanguageDialog}
                className="flex-1 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopBanner;
