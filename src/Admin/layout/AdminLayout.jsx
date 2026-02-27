import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <>
      <header className="bg-[#080707] w-full">
        <Navbar />
      </header>
      <div style={{ padding: "30px" }}>
        <Outlet />
      </div>
      <hr className="bg-gray-400 h-px" />
      <footer className="bg-[#080707] w-full">
        <Footer />
      </footer>
    </>
  );
};

export default AdminLayout;
