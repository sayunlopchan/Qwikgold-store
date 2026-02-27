import {
  ChevronRight,
  Edit3Icon,
  HandCoins,
  Wallet,
  Ticket,
  NotepadText,
  UserCircle2Icon,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  CreditCard,
  Gift,
  LogOut,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    wallet: 250.75,
    points: 1250,
    coupons: 3,
    avatar: null, // Add avatar URL if available
  };

  // Order status data
  const orderStats = [
    { status: "Unpaid", count: 2, icon: Clock, color: "text-yellow-500" },
    { status: "Pending", count: 1, icon: Clock, color: "text-blue-500" },
    { status: "Processing", count: 3, icon: Package, color: "text-purple-500" },
    {
      status: "Completed",
      count: 12,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    { status: "Cancelled", count: 1, icon: XCircle, color: "text-red-500" },
  ];

  return (
    <div className="container mx-auto max-md:w-full w-[80%] lg:max-w-7xl px-4 md:px-0 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <NavLink to="/" className="hover:text-red-500 transition-colors">
          Home
        </NavLink>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Profile</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Hidden on mobile */}
        <aside className="lg:w-64 xl:w-72 hidden lg:block">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
            {/* User Summary in Sidebar */}
            <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <UserCircle2Icon className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{userData.name}</p>
                  <p className="text-xs text-white/80 truncate">
                    {userData.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-3">
              {[
                { to: "/profile", icon: UserCircle2Icon, label: "My Profile" },
                {
                  to: "/profile/my-wallet",
                  icon: Wallet,
                  label: "My Wallet",
                  badge: `$${userData.wallet}`,
                },
                {
                  to: "/profile/my-coupons",
                  icon: Ticket,
                  label: "My Coupons",
                  badge: userData.coupons,
                },
                {
                  to: "/profile/my-points",
                  icon: HandCoins,
                  label: "My Points",
                  badge: userData.points,
                },
                {
                  to: "/profile/my-orders",
                  icon: NotepadText,
                  label: "My Orders",
                },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 mb-1 ${
                      isActive
                        ? "bg-red-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.to === "/profile/my-wallet"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}

              {/* Logout Button */}
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 mt-4 border-t border-gray-100 pt-4">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-5">
          {/* Profile Header Card - Mobile Friendly */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Avatar */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center text-white text-2xl font-bold">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    userData.name.charAt(0)
                  )}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Edit3Icon className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userData.name}
                  </h2>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <Edit3Icon className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{userData.email}</p>

                {/* Quick Stats - Mobile */}
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">
                      {userData.points}
                    </p>
                    <p className="text-xs text-gray-500">Points</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">
                      {userData.coupons}
                    </p>
                    <p className="text-xs text-gray-500">Coupons</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Wallet Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${userData.wallet.toFixed(2)}
                  </p>
                </div>
              </div>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                Top Up Now
              </button>
            </div>
          </div>

          {/* Points & Coupons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Points Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <HandCoins className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  Earn More
                </span>
              </div>
              <p className="text-sm text-gray-500">Available Points</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {userData.points.toLocaleString()}
              </p>
            </div>

            {/* Coupons Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-500">Active Coupons</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {userData.coupons}
              </p>
            </div>
          </div>

          {/* Orders Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">Recent Orders</h3>
              <NavLink
                to="/profile/my-orders"
                className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>

            {/* Order Status Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {orderStats.map((stat) => (
                <div key={stat.status} className="text-center">
                  <div
                    className={`w-10 h-10 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-2 ${stat.color}`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {stat.count}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.status}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders List */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center">
                No recent orders to display
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="grid grid-cols-5 gap-1">
          {[
            { to: "/profile", icon: UserCircle2Icon, label: "Profile" },
            { to: "/profile/my-wallet", icon: Wallet, label: "Wallet" },
            { to: "/profile/my-coupons", icon: Ticket, label: "Coupons" },
            { to: "/profile/my-points", icon: HandCoins, label: "Points" },
            { to: "/profile/my-orders", icon: NotepadText, label: "Orders" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-0.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-red-500"
                    : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[0.6rem] mt-0.5">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Add padding to bottom on mobile for fixed navigation */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
};

export default Profile;
