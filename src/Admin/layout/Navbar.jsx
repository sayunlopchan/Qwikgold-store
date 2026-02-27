import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container max-sm:w-full w-[80%] lg:max-w-7xl mx-auto text-white py-4 max-md:px-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Admin Panel</h2>

      <div className="flex gap-5">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `text-white no-underline transition-colors hover:text-gray-300 ${
              isActive ? "border-b-2 border-white" : ""
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/order"
          className={({ isActive }) =>
            `text-white no-underline transition-colors hover:text-gray-300 ${
              isActive ? "border-b-2 border-white" : ""
            }`
          }
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
