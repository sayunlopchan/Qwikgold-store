import React from "react";
import NavBar from "./NavBar";
import TopBanner from "./TopBanner";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div>
      <div className="bg-[#080707]">
        <TopBanner />
      </div>
      <hr className="bg-gray-400 h-px" />
      <header className="sticky top-0 z-50 bg-[#080707]">
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <hr className="bg-gray-400 h-px" />
      <footer className="bg-[#080707] w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
