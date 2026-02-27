import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  ChevronLeft,
  ChevronRight,
  Coins,
  User,
} from "lucide-react";

const OrderPage = () => {
  // Sample order data (game items purchased)
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      player: "DragonSlayer99",
      playerId: "PL-8723",
      item: "Legendary Dragon Skin",
      type: "Skin",
      rarity: "Legendary",
      price: 1299,
      currency: "gems",
      date: "2026-02-24 14:32",
      status: "completed",
      paymentMethod: "Google Play",
    },
    {
      id: "ORD-1002",
      player: "NightWolf",
      playerId: "PL-4512",
      item: "Mythic Crate (x5)",
      type: "Crate",
      rarity: "Mythic",
      price: 2499,
      currency: "gems",
      date: "2026-02-24 11:15",
      status: "completed",
      paymentMethod: "Apple Pay",
    },
    {
      id: "ORD-1003",
      player: "ShadowHunter",
      playerId: "PL-6789",
      item: "XP Booster - 7 days",
      type: "Booster",
      rarity: "Rare",
      price: 499,
      currency: "gems",
      date: "2026-02-24 09:47",
      status: "pending",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1004",
      player: "FireMage",
      playerId: "PL-2341",
      item: "Battle Pass Season 7",
      type: "Pass",
      rarity: "Epic",
      price: 1499,
      currency: "gems",
      date: "2026-02-23 22:08",
      status: "completed",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-1005",
      player: "IceQueen",
      playerId: "PL-5632",
      item: "5000 Gems Pack",
      type: "Currency",
      rarity: "Common",
      price: 4999,
      currency: "gems",
      date: "2026-02-23 18:30",
      status: "cancelled",
      paymentMethod: "Google Play",
      cancellationReason: "Payment declined",
    },
    {
      id: "ORD-1006",
      player: "ThunderGod",
      playerId: "PL-9087",
      item: "Thunder Hammer Weapon",
      type: "Skin",
      rarity: "Epic",
      price: 899,
      currency: "gems",
      date: "2026-02-23 15:22",
      status: "refunded",
      paymentMethod: "Apple Pay",
    },
    {
      id: "ORD-1007",
      player: "SilentAssassin",
      playerId: "PL-3456",
      item: "Stealth Suit Skin",
      type: "Skin",
      rarity: "Rare",
      price: 599,
      currency: "gems",
      date: "2026-02-23 12:44",
      status: "completed",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1008",
      player: "BattleMaster",
      playerId: "PL-7890",
      item: "Double XP Weekend Pass",
      type: "Booster",
      rarity: "Epic",
      price: 799,
      currency: "gems",
      date: "2026-02-22 20:19",
      status: "completed",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-1009",
      player: "ArcaneWizard",
      playerId: "PL-1234",
      item: "Spellbook: Ancient Magic",
      type: "Skin",
      rarity: "Legendary",
      price: 1899,
      currency: "gems",
      date: "2026-02-22 16:05",
      status: "pending",
      paymentMethod: "Google Play",
    },
    {
      id: "ORD-1010",
      player: "CrystalKnight",
      playerId: "PL-5678",
      item: "Crystal Armor Set",
      type: "Skin",
      rarity: "Epic",
      price: 1299,
      currency: "gems",
      date: "2026-02-22 10:37",
      status: "cancelled",
      paymentMethod: "Apple Pay",
      cancellationReason: "Player cancelled",
    },
    {
      id: "ORD-1011",
      player: "PhoenixRising",
      playerId: "PL-9012",
      item: "Phoenix Mount",
      type: "Skin",
      rarity: "Legendary",
      price: 2999,
      currency: "gems",
      date: "2026-02-21 23:51",
      status: "completed",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1012",
      player: "ShadowStalker",
      playerId: "PL-3451",
      item: "Nightshade Dagger",
      type: "Skin",
      rarity: "Rare",
      price: 499,
      currency: "gems",
      date: "2026-02-21 19:28",
      status: "refunded",
      paymentMethod: "PayPal",
    },
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Selected order for detail view
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Get unique values for filters
  const statuses = ["all", ...new Set(orders.map((o) => o.status))];
  const types = ["all", ...new Set(orders.map((o) => o.type))];

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    // Type filter
    const matchesType = typeFilter === "all" || order.type === typeFilter;

    // Date filter (simplified)
    let matchesDate = true;
    if (dateFilter !== "all") {
      const orderDate = new Date(order.date);
      const today = new Date();
      const diffDays = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

      if (dateFilter === "today" && diffDays > 0) matchesDate = false;
      else if (dateFilter === "week" && diffDays > 7) matchesDate = false;
      else if (dateFilter === "month" && diffDays > 30) matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      completed: {
        icon: CheckCircle,
        text: "Completed",
        bg: "bg-gray-100",
        textColor: "text-gray-700",
        iconColor: "text-gray-600",
      },
      pending: {
        icon: Clock,
        text: "Pending",
        bg: "bg-gray-100",
        textColor: "text-gray-600",
        iconColor: "text-gray-500",
      },
      cancelled: {
        icon: XCircle,
        text: "Cancelled",
        bg: "bg-gray-100",
        textColor: "text-gray-600",
        iconColor: "text-gray-500",
      },
      refunded: {
        icon: AlertTriangle,
        text: "Refunded",
        bg: "bg-gray-100",
        textColor: "text-gray-600",
        iconColor: "text-gray-500",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.textColor}`}
      >
        <Icon size={12} className={config.iconColor} />
        {config.text}
      </span>
    );
  };

  // Rarity badge
  const RarityBadge = ({ rarity }) => {
    const rarityColors = {
      Common: "text-gray-500",
      Rare: "text-gray-600",
      Epic: "text-gray-700",
      Legendary: "text-gray-900 font-semibold",
      Mythic: "text-gray-900 font-bold",
    };

    return (
      <span className={`text-xs ${rarityColors[rarity] || "text-gray-500"}`}>
        {rarity}
      </span>
    );
  };

  return (
    <div className="max-md:p-2 py-6 min-h-screen text-gray-800 container max-md:w-full w-[80%] lg:max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight flex items-center gap-2">
            <ShoppingBag size={28} className="text-gray-700" />
            Order Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage in-game purchases
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-md border border-gray-200">
            <Coins size={16} className="text-gray-600" />
            <span>
              Total Revenue: 18,489 <span className="text-gray-400">gems</span>
            </span>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Total Orders</p>
              <p className="text-2xl font-light mt-1">{orders.length}</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <ShoppingBag size={20} className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Completed</p>
              <p className="text-2xl font-light mt-1">
                {orders.filter((o) => o.status === "completed").length}
              </p>
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <CheckCircle size={20} className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">Pending</p>
              <p className="text-2xl font-light mt-1">
                {orders.filter((o) => o.status === "pending").length}
              </p>
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <Clock size={20} className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase">
                Cancelled/Refunded
              </p>
              <p className="text-2xl font-light mt-1">
                {
                  orders.filter(
                    (o) => o.status === "cancelled" || o.status === "refunded"
                  ).length
                }
              </p>
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <AlertTriangle size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by order ID, player, or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Status filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Type filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>

          {/* Date filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type/Rarity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <User size={14} className="text-gray-400" />
                      <span className="text-gray-800">{order.player}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {order.playerId}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">
                      {order.item}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-700">{order.type}</div>
                    <RarityBadge rarity={order.rarity} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Coins size={14} className="text-gray-500" />
                      <span className="font-medium">{order.price}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                    {order.cancellationReason && (
                      <div className="text-xs text-gray-400 mt-1">
                        {order.cancellationReason}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {order.paymentMethod}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No results */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">
              No orders found matching your filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-1 rounded-md border border-gray-200 ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`p-1 rounded-md border border-gray-200 ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-mono font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p>{selectedOrder.date}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2">Player Information</p>
                <div className="flex items-center gap-2 mb-1">
                  <User size={14} className="text-gray-400" />
                  <span className="font-medium">{selectedOrder.player}</span>
                </div>
                <p className="text-xs text-gray-400 ml-6">
                  ID: {selectedOrder.playerId}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2">Item Details</p>
                <p className="font-medium">{selectedOrder.item}</p>
                <div className="flex gap-2 mt-1 text-xs">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    {selectedOrder.type}
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    {selectedOrder.rarity}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2">Payment</p>
                <div className="flex items-center gap-2">
                  <Coins size={14} className="text-gray-500" />
                  <span className="font-medium">
                    {selectedOrder.price} gems
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Method: {selectedOrder.paymentMethod}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2">Status</p>
                <StatusBadge status={selectedOrder.status} />
                {selectedOrder.cancellationReason && (
                  <p className="text-xs text-gray-500 mt-2">
                    Reason: {selectedOrder.cancellationReason}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
