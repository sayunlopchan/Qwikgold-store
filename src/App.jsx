import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home/Pages/Home";
import ListItemsPage from "./Home/Pages/ListItemsPage";
import Test from "./Home/Pages/Test";
import RootLayout from "./Layout/RootLayout";
import Profile from "./Home/Pages/Profile";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import Detail from "./Home/Pages/Detail";
import Topup from "./Home/Pages/Topup";
import CouponDetailPage from "./Home/Pages/CouponDetailPage";

import AdminDashboard from "./Admin/pages/AdminDashboard";
import OrderPage from "./Admin/pages/OrderPage";
import AdminLayout from "./Admin/layout/AdminLayout";
import LuckyDrawSpin from "./Home/Features/LuckyDrawSpin";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes (No Navbar) */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* User Routes (With RootLayout Navbar + Footer) */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<ListItemsPage />} />
          <Route path="cards" element={<ListItemsPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="game/detail" element={<Detail />} />
          <Route path="coupon/detail" element={<CouponDetailPage />} />
          <Route path="game/top-up" element={<Topup />} />
          <Route path="/lucky-draw-spin" element={<LuckyDrawSpin />} />
          <Route path="test" element={<Test />} />
        </Route>

        {/* Admin Routes (Different Layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/order" element={<OrderPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
