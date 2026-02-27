import React, { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import SwiperScroll from "../../components/SwiperScroll";
import OfferCard from "../../components//OfferCard";
import CouponCard from "../../components/CouponCard";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import {
  Globe,
  Smartphone,
  Gamepad2,
  Play,
  Zap,
  ShoppingBag,
  Shield,
  Users,
  Tag,
  Star,
} from "lucide-react";

import { game_data } from "../../Mock/mock_data.js";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeColor, setActiveColor] = useState("#f9fafb");
  const [showAll, setShowAll] = useState(false);

  // Load mock data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        setData(game_data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load mock data");
        setLoading(false);
      }
    }, 500);
  }, []);

  // Handle slide change
  const handleSlideChange = (swiper) => {
    // Get the real index (works even with loop mode)
    const realIndex = swiper.realIndex;

    // Get the current game based on index
    const currentGame = data[realIndex];

    // Update background color based on game's primary color
    if (currentGame?.color_theme?.primary) {
      setActiveColor(currentGame.color_theme.primary);
    }
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  // Function to handle show less on large screens
  const handleShowLess = () => {
    setShowAll(false);
  };

  // Determine which items to display based on screen size and showAll state
  const getDisplayedItems = () => {
    // For small screens (< lg), show all data (no slicing)
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return data;
    }

    // For large screens (≥ lg), respect showAll state
    return showAll ? data : data.slice(0, 8);
  };

  const displayedItems = getDisplayedItems();
  const hasMoreItems = data.length > 8;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div
      className="space-y-16 md:space-y-20 lg:space-y-24 transition-colors duration-700 ease-in-out"
      style={{
        background: `linear-gradient(180deg, 
      ${activeColor}50 0%, 
      ${activeColor}25 25%, 
      ${activeColor}08 40%, 
      ${activeColor}03 60%, 
      ${activeColor}20 100%
    )`,
      }}
    >
      {/* SLIDER START */}
      <section className="container mx-auto max-md:w-full w-[80%] lg:max-w-7xl px-4 pt-5">
        {/* IMPORTANT!! NO MORE THAN 10 DATA, IF MORE THAN 10 THE PAGINATION WILL OVERFLOW BECAUSE OF MANY NO SPACE */}
        <NavLink to={"/game/detail"}>
          <Slider
            images={data}
            slidesPerView={1}
            spaceBetween={20}
            autoplayDelay={5000}
            onSlideChange={handleSlideChange}
          />
        </NavLink>
      </section>
      {/* SLIDER END */}
      {/* OFFER CARD START */}
      <section className="container mx-auto max-md:w-full w-[80%] lg:max-w-7xl space-y-6 px-4 overflow-hidden">
        {/* Header with improved styling */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900">
            Exclusive Offers
          </h2>
          <div className="w-12 h-0.5 bg-gray-300 mt-2 mb-3 mx-auto md:mx-0"></div>
          <p className="text-sm text-gray-500 max-w-2xl md:max-w-none">
            Don't miss our limited-time offers! Discover current deals today!
          </p>
        </div>

        <SwiperScroll gridRows={2}>
          {/* added slice to show 20 for development: remove later */}
          {displayedItems.slice(0, 20).map((item) => (
            <NavLink to={"/game/detail"} key={item.id}>
              <OfferCard
                title={item.title}
                thumbnail={item.thumbnail}
                description={item.short_description}
                discount={item.discount || "20"}
              />
            </NavLink>
          ))}
        </SwiperScroll>

        {/* Show More/Less Button - ONLY visible on lg screens and above AND only if there are more than 8 items */}
        {hasMoreItems && (
          <div className="hidden lg:flex justify-center mt-8">
            {!showAll ? (
              <button
                onClick={handleShowMore}
                className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 group"
              >
                <span>Show More Offers</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 group"
              >
                <span>Show Less</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Optional: Show item count on large screens */}
        {hasMoreItems && (
          <div className="hidden lg:block text-center text-sm text-gray-500 mt-3">
            {showAll
              ? `Showing all ${data.length} offers`
              : `Showing 8 of ${data.length} offers`}
          </div>
        )}
      </section>
      {/* OFFER CARD END */}
      {/* COUPON CARD START */}
      <section className="container mx-auto max-md:w-full w-[80%] lg:max-w-7xl space-y-6 px-4 overflow-hidden">
        {/* Header with improved styling */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900">
            Available Coupons
          </h2>
          <div className="w-12 h-0.5 bg-gray-300 mt-2 mb-3 mx-auto md:mx-0"></div>
          <p className="text-sm text-gray-500 max-w-2xl">
            Claim your coupon now for extra savings! Do not miss out
          </p>
        </div>

        {/* Swiper Scroll Component */}
        <SwiperScroll gridRows={1}>
          {data.slice(0, 8).map((item, idx) => (
            <NavLink to={"/coupon/detail"} key={item.id || idx}>
              <CouponCard
                title={item.title}
                thumbnail={item.thumbnail}
                description={item.short_description}
                discount={item.discount || "20"}
                link={"/game/detail"}
              />
            </NavLink>
          ))}
        </SwiperScroll>

        {/* View All Link with improved styling */}
        <div className="flex justify-center md:justify-start mt-6">
          <Link
            to={"/coupons"}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors group"
          >
            <span>View All Coupons</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Optional: Show count indicator */}
        <div className="text-center md:text-left text-xs text-gray-400 mt-3">
          {data.length} coupons available
        </div>
      </section>
      {/* COUPON CARD END  */}
      {/* Gift Cards & Digital Codes */}
      <section className="container mx-auto max-md:w-full w-[80%] lg:max-w-7xl px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with decorative elements */}
          <div className="text-center mb-12 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5">
              <div className="w-40 h-40 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full blur-3xl"></div>
            </div>

            <span className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-3 block">
              DIGITAL COLLECTION
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
              Gift Cards & Digital Codes
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 mx-auto mt-5"></div>
            <p className="text-sm text-gray-500 mt-5 max-w-2xl mx-auto leading-relaxed">
              Instant delivery with 24/7 live support, globally trusted
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon with animated gradient */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <product.icon className="w-6 h-6 text-gray-700" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                      {product.region || "Global"}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {product.features}
                  </p>

                  {/* Trust indicators with icons */}
                  <div className="flex items-center gap-3 pt-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                      <Zap className="w-3 h-3 text-gray-400" />
                      Instant
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                      <Shield className="w-3 h-3 text-gray-400" />
                      Secure
                    </span>
                  </div>
                </div>

                {/* Hover overlay with price indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-medium text-gray-400">
                    {product.priceRange || "₱100-10,000"}
                  </span>
                </div>

                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-gray-200 to-gray-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors group">
              <span>View All Gift Cards</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>

          {/* Footer note with icon */}
          <div className="text-center mt-10 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <Shield className="w-3 h-3" />* All cards are delivered instantly.
              Region restrictions may apply.
            </p>
          </div>
        </div>
      </section>
      {/* Why Choose Us*/}
      <section className="container mx-auto max-md:w-full w-[80%] lg:max-w-7xl px-4 md:px-6 relative overflow-hidden pb-16">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-gray-100 to-transparent opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gray-300 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with animation */}
          <div className="text-center mb-16">
            <span className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-3 block">
              WHY GAMERS CHOOSE US
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
              Why Choose Us
            </h2>
            <div className="flex justify-center gap-1 mt-5">
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="w-4 h-0.5 bg-gray-400"></div>
              <div className="w-2 h-0.5 bg-gray-500"></div>
            </div>
            <p className="text-sm text-gray-500 mt-5 max-w-2xl mx-auto">
              The trusted platform for millions of gamers worldwide
            </p>
          </div>

          {/* Features Grid with staggered animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon container with floating animation */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  {/* Decorative dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-medium text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats mini card */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {feature.statLabel || "Active users"}
                    </span>
                    <span className="font-medium text-gray-700">
                      {feature.statValue || "10k+"}
                    </span>
                  </div>
                </div>

                {/* Gradient hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>

          {/* Stats Section with counters */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 place-items-center">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center group w-full">
                <div className="flex justify-center mb-3 transform group-hover:scale-110 transition-transform">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-light text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges with hover effects */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 transition-colors group">
              <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 transition-colors group">
              <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 transition-colors group">
              <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 transition-colors group">
              <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <Tag className="w-3.5 h-3.5" />
              </div>
              <span>Best Prices</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 transition-colors group">
              <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <span>Global Coverage</span>
            </div>
          </div>

          {/* CTA Note */}
          <div className="text-center mt-12">
            <p className="text-xs text-gray-400 italic">
              Join millions of satisfied gamers who trust us for their gaming
              needs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

const products = [
  {
    id: 1,
    title: "Steam Wallet Codes",
    description: "Up To 33 Regions",
    features: "Thousands of games, DLC & in-game purchases",
    icon: Globe,
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/20",
  },
  {
    id: 2,
    title: "iTunes Gift Card",
    description: "Endless possibility. Instant delivery.",
    features: "Apps, games, music & more",
    icon: Smartphone,
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/20",
  },
  {
    id: 3,
    title: "Razer Gold",
    description: "The go-to for mobile gaming",
    features: "Mobile Legends & 8 regions",
    icon: Zap,
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/20",
  },
  {
    id: 4,
    title: "PlayStation Store",
    description: "Entertainment and adventures",
    features: "Games, movies, music & more",
    icon: Play,
    color: "from-indigo-500/20 to-indigo-600/20",
    borderColor: "border-indigo-500/20",
  },
  {
    id: 5,
    title: "Google Play Gift Card",
    description: "Your smartphone library",
    features: "Up to 15 regions, games, movies, ebooks",
    icon: Gamepad2,
    color: "from-orange-500/20 to-orange-600/20",
    borderColor: "border-orange-500/20",
  },
  {
    id: 6,
    title: "Nintendo eShop",
    description: "Nintendo Switch Online",
    features: "Cloud saves, online play & special offers",
    icon: ShoppingBag,
    color: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/20",
  },
];

const features = [
  {
    id: 1,
    title: "Fast & Secure Transactions",
    description:
      "Instant game top-up services with a smooth and reliable process. Your payment and account information are fully protected with industry-standard encryption and secure systems, so you can top up with confidence anytime, anywhere.",
    icon: Shield,
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: 2,
    title: "Trusted by Players Worldwide",
    description:
      "Our platform has served players across different countries and regions with consistent, high-quality service. From popular games to niche titles, we've built a reputation for being dependable, responsive, and gamer-friendly.",
    icon: Users,
    color: "from-green-500/20 to-green-600/20",
  },
  {
    id: 3,
    title: "Competitive Prices with Special Offers",
    description:
      "We provide competitive pricing for different games, so you can always get cost-effective services. Added to this, there are regular promotions and discounts that will save you even more as you fully enjoy your favorite games.",
    icon: Tag,
    color: "from-purple-500/20 to-purple-600/20",
  },
];

// Additional stats for credibility
const stats = [
  { id: 1, value: "500K+", label: "Happy Players", icon: Star },
  { id: 2, value: "50+", label: "Games Available", icon: Globe },
  { id: 3, value: "99.9%", label: "Uptime", icon: Zap },
];
