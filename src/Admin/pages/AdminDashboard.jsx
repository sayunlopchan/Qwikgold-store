import React, { useState } from "react";
import {
  Package,
  Ticket,
  Image as ImageIcon,
  PieChart,
  Plus,
  Upload,
  Save,
  X,
  Percent,
  Calendar,
  Hash,
  Gamepad2,
  Coins,
  Sword,
  Trophy,
  Gem,
  Trash2,
  Power,
  CheckSquare,
  Square,
} from "lucide-react";

const AdminDashboard = () => {
  // State for add item form (game-specific)
  const [itemForm, setItemForm] = useState({
    name: "",
    price: "",
    type: "",
    rarity: "",
    stock: "",
  });

  // State for coupon form
  const [couponForm, setCouponForm] = useState({
    code: "",
    discount: "",
    expiry: "",
    maxUses: "",
  });

  // State for promo cards list
  const [promoCards, setPromoCards] = useState([
    { id: 1, title: "Starter Pack", discount: "20%", active: true },
    { id: 2, title: "Legendary Crate", discount: "15%", active: false },
    { id: 3, title: "Weekly Boost", discount: "10%", active: true },
  ]);

  // State for selected promo cards
  const [selectedCards, setSelectedCards] = useState([]);

  // State for add promo dialog
  const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false);
  const [newPromoCard, setNewPromoCard] = useState({
    title: "",
    discount: "",
    active: true,
  });

  // State for banner preview
  const [bannerPreview, setBannerPreview] = useState(null);

  // Sample pie chart data (order metrics)
  const pieData = [
    { category: "Delivered", value: 45, color: "#10b981" }, // green-500
    { category: "In Transit", value: 25, color: "#3b82f6" }, // blue-500
    { category: "Processing", value: 15, color: "#f59e0b" }, // amber-500
    { category: "Cancelled", value: 10, color: "#ef4444" }, // red-500
    { category: "Returned", value: 5, color: "#6b7280" }, // gray-500
  ];

  const total = pieData.reduce((acc, item) => acc + item.value, 0);

  // Handle item input change
  const handleItemChange = (e) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
  };

  // Handle coupon input change
  const handleCouponChange = (e) => {
    setCouponForm({ ...couponForm, [e.target.name]: e.target.value });
  };

  // Handle new promo input change
  const handleNewPromoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPromoCard({
      ...newPromoCard,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle banner upload
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new promo card from dialog
  const addPromoCard = () => {
    if (newPromoCard.title && newPromoCard.discount) {
      const newCard = {
        id: Date.now(),
        title: newPromoCard.title,
        discount: newPromoCard.discount.includes("%")
          ? newPromoCard.discount
          : `${newPromoCard.discount}%`,
        active: newPromoCard.active,
      };
      setPromoCards([...promoCards, newCard]);
      setNewPromoCard({ title: "", discount: "", active: true });
      setIsPromoDialogOpen(false);
    }
  };

  // Toggle card selection
  const toggleCardSelection = (cardId) => {
    setSelectedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  // Select all cards
  const selectAllCards = () => {
    if (selectedCards.length === promoCards.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(promoCards.map((card) => card.id));
    }
  };

  // Delete selected cards
  const deleteSelectedCards = () => {
    setPromoCards((prev) =>
      prev.filter((card) => !selectedCards.includes(card.id))
    );
    setSelectedCards([]);
  };

  // Toggle active status for selected cards
  const toggleSelectedCardsActive = () => {
    setPromoCards((prev) =>
      prev.map((card) =>
        selectedCards.includes(card.id)
          ? { ...card, active: !card.active }
          : card
      )
    );
    setSelectedCards([]);
  };

  return (
    <div className="max-md:p-2 py-6 text-gray-800 container max-md:w-full w-[80%] lg:max-w-7xl mx-auto">
      {/* Header with game flavor */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight flex items-center gap-2">
            <Gamepad2 size={28} className="text-gray-700" />
            Game Store Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage in-app items, promotions, and banners
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-md border border-gray-200">
            <Coins size={16} className="text-gray-600" />
            <span>
              Revenue: 12,450 <span className="text-gray-400">gems</span>
            </span>
          </div>
        </div>
      </div>

      {/* Add Promo Dialog */}
      {isPromoDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Promo Card</h3>
              <button
                onClick={() => setIsPromoDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newPromoCard.title}
                  onChange={handleNewPromoChange}
                  placeholder="e.g. Flash Sale"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Discount
                </label>
                <input
                  type="text"
                  name="discount"
                  value={newPromoCard.discount}
                  onChange={handleNewPromoChange}
                  placeholder="25%"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={newPromoCard.active}
                  onChange={handleNewPromoChange}
                  className="rounded border-gray-300 text-gray-800 focus:ring-gray-400"
                />
                <label htmlFor="active" className="text-sm text-gray-700">
                  Active
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsPromoDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addPromoCard}
                disabled={!newPromoCard.title || !newPromoCard.discount}
                className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN (2/3) - Add item + Coupon + Promo cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Item Section (game items) */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <Package size={20} className="text-gray-600" />
              <h2 className="font-medium text-gray-700">Add In-Game Item</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={itemForm.name}
                  onChange={handleItemChange}
                  placeholder="e.g. Dragon Skin"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Price (gems)
                </label>
                <input
                  type="number"
                  name="price"
                  value={itemForm.price}
                  onChange={handleItemChange}
                  placeholder="499"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Item Type
                </label>
                <select
                  name="type"
                  value={itemForm.type}
                  onChange={handleItemChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">Select</option>
                  <option value="Skin">Skin</option>
                  <option value="Crate">Crate</option>
                  <option value="Booster">Booster</option>
                  <option value="Currency">Currency Pack</option>
                  <option value="Pass">Battle Pass</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Rarity
                </label>
                <select
                  name="rarity"
                  value={itemForm.rarity}
                  onChange={handleItemChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">Select</option>
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Stock (quantity)
                </label>
                <input
                  type="number"
                  name="stock"
                  value={itemForm.stock}
                  onChange={handleItemChange}
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="flex items-center gap-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-md transition-colors">
                <Plus size={16} />
                Add to Store
              </button>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <Ticket size={20} className="text-gray-600" />
              <h2 className="font-medium text-gray-700">
                Generate Game Coupon
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={couponForm.code}
                  onChange={handleCouponChange}
                  placeholder="SUMMER25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Discount %
                </label>
                <input
                  type="number"
                  name="discount"
                  value={couponForm.discount}
                  onChange={handleCouponChange}
                  placeholder="15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Expiry
                </label>
                <input
                  type="date"
                  name="expiry"
                  value={couponForm.expiry}
                  onChange={handleCouponChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1">
                  Max Uses
                </label>
                <input
                  type="number"
                  name="maxUses"
                  value={couponForm.maxUses}
                  onChange={handleCouponChange}
                  placeholder="500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="flex items-center gap-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-md transition-colors">
                <Save size={16} />
                Create Coupon
              </button>
            </div>
          </div>

          {/* Promo Cards Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Gem size={20} className="text-gray-600" />
                <h2 className="font-medium text-gray-700">
                  In-Game Promo Cards
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {selectedCards.length > 0 && (
                  <>
                    <button
                      onClick={toggleSelectedCardsActive}
                      className="text-xs flex items-center gap-1 px-2 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded"
                      title="Toggle active status"
                    >
                      <Power size={14} /> Toggle
                    </button>
                    <button
                      onClick={deleteSelectedCards}
                      className="text-xs flex items-center gap-1 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded"
                      title="Delete selected"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsPromoDialogOpen(true)}
                  className="text-xs flex items-center gap-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  <Plus size={14} /> Add Promo
                </button>
              </div>
            </div>

            {/* Selection controls */}
            {promoCards.length > 0 && (
              <div className="flex items-center gap-2 mb-3 px-1">
                <button
                  onClick={selectAllCards}
                  className="text-xs flex items-center gap-1 text-gray-600 hover:text-gray-800"
                >
                  {selectedCards.length === promoCards.length ? (
                    <CheckSquare size={14} />
                  ) : (
                    <Square size={14} />
                  )}
                  Select All
                </button>
                <span className="text-xs text-gray-400">
                  {selectedCards.length} selected
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {promoCards.map((card) => (
                <div
                  key={card.id}
                  className={`border rounded-md p-3 flex items-center justify-between ${
                    selectedCards.includes(card.id)
                      ? "border-gray-500 bg-gray-100"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCardSelection(card.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {selectedCards.includes(card.id) ? (
                        <CheckSquare size={16} className="text-gray-700" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>
                    <div>
                      <p className="font-medium text-sm flex items-center gap-1">
                        <Trophy size={14} className="text-gray-500" />
                        {card.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Percent size={12} /> {card.discount} OFF
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      card.active
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {card.active ? "Active" : "Inactive"}
                  </span>
                </div>
              ))}
              {promoCards.length === 0 && (
                <p className="text-sm text-gray-400 col-span-2 text-center py-4">
                  No promo cards yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3) - Banner upload + Pie chart */}
        <div className="space-y-6">
          {/* Banner Image Upload */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <ImageIcon size={20} className="text-gray-600" />
              <h2 className="font-medium text-gray-700">Game Banner</h2>
            </div>
            <div className="space-y-3">
              {bannerPreview ? (
                <div className="relative">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded-md border border-gray-200"
                  />
                  <button
                    onClick={() => setBannerPreview(null)}
                    className="absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <ImageIcon size={28} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 mb-2">
                    Upload in-game banner
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs rounded-md">
                    <Upload size={14} />
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
              <p className="text-xs text-gray-400">
                Recommended: 1200x400px (event banner)
              </p>
            </div>
          </div>

          {/* Pie Chart with Legends - Order Status Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <PieChart size={20} className="text-gray-600" />
              <h2 className="font-medium text-gray-700">
                Order Status Overview
              </h2>
            </div>

            {/* Simple Pie Chart Representation */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border border-gray-200 mb-4">
                {/* This is a CSS conic-gradient pie chart */}
                <div
                  className="w-full h-full"
                  style={{
                    background: `conic-gradient(
                      ${pieData[0].color} 0deg ${
                      (pieData[0].value / total) * 360
                    }deg,
                      ${pieData[1].color} ${
                      (pieData[0].value / total) * 360
                    }deg ${
                      ((pieData[0].value + pieData[1].value) / total) * 360
                    }deg,
                      ${pieData[2].color} ${
                      ((pieData[0].value + pieData[1].value) / total) * 360
                    }deg ${
                      ((pieData[0].value +
                        pieData[1].value +
                        pieData[2].value) /
                        total) *
                      360
                    }deg,
                      ${pieData[3].color} ${
                      ((pieData[0].value +
                        pieData[1].value +
                        pieData[2].value) /
                        total) *
                      360
                    }deg ${
                      ((pieData[0].value +
                        pieData[1].value +
                        pieData[2].value +
                        pieData[3].value) /
                        total) *
                      360
                    }deg,
                      ${pieData[4].color} ${
                      ((pieData[0].value +
                        pieData[1].value +
                        pieData[2].value +
                        pieData[3].value) /
                        total) *
                      360
                    }deg 360deg
                    )`,
                  }}
                ></div>
              </div>

              {/* Legends */}
              <div className="w-full space-y-2 text-sm">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-gray-700">{item.category}</span>
                    </div>
                    <span className="text-gray-600 font-medium">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-50 p-2 rounded">
                  <span className="text-gray-500">Success Rate</span>
                  <p className="text-green-600 font-medium text-sm">94.2%</p>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <span className="text-gray-500">Active Orders</span>
                  <p className="text-blue-600 font-medium text-sm">847</p>
                </div>
                <div className="bg-amber-50 p-2 rounded">
                  <span className="text-gray-500">Processing</span>
                  <p className="text-amber-600 font-medium text-sm">156</p>
                </div>
                <div className="bg-red-50 p-2 rounded">
                  <span className="text-gray-500">Issues</span>
                  <p className="text-red-600 font-medium text-sm">48</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional bottom detail bar */}
      <div className="mt-6 text-center text-xs text-gray-400 border-t border-gray-200 pt-4 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <Sword size={12} /> In-game store v2.4
        </span>
        <span>•</span>
        <span>Last updated: Today 10:23 AM</span>
        <span>•</span>
        <span>Total Orders: 1,245</span>
      </div>
    </div>
  );
};

export default AdminDashboard;
