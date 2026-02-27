import React, { useState, useRef, useEffect } from "react";
import {
  Gift,
  Award,
  Sparkles,
  X,
  RotateCcw,
  Ticket,
  Coins,
} from "lucide-react";

const LuckyDrawSpin = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [showHistory, setShowHistory] = useState(false);
  const [spinHistory, setSpinHistory] = useState([]);

  const wheelRef = useRef(null);

  // Prize data with colors and values
  const prizes = [
    { id: 1, name: "100 Gems", value: 100, color: "#FF6B6B", probability: 20 },
    { id: 2, name: "50 Gems", value: 50, color: "#4ECDC4", probability: 30 },
    { id: 3, name: "25 Gems", value: 25, color: "#45B7D1", probability: 25 },
    { id: 4, name: "10 Gems", value: 10, color: "#96CEB4", probability: 15 },
    { id: 5, name: "5 Gems", value: 5, color: "#FFEEAD", probability: 8 },
    { id: 6, name: "1 Gem", value: 1, color: "#D4A5A5", probability: 2 },
  ];

  // Calculate total probability
  const totalProbability = prizes.reduce(
    (sum, prize) => sum + prize.probability,
    0
  );

  // Function to get random prize based on probability
  const getRandomPrize = () => {
    const random = Math.random() * totalProbability;
    let cumulative = 0;

    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random < cumulative) {
        return prize;
      }
    }
    return prizes[0];
  };

  // Calculate segment angles
  const getSegmentAngle = (index) => {
    const total = prizes.reduce((sum, p) => sum + p.probability, 0);
    const startAngle = prizes
      .slice(0, index)
      .reduce((sum, p) => sum + (p.probability / total) * 360, 0);
    const endAngle = startAngle + (prizes[index].probability / total) * 360;
    return { startAngle, endAngle };
  };

  // Spin the wheel
  const spinWheel = () => {
    if (isSpinning || spinsLeft <= 0) return;

    setIsSpinning(true);
    setShowResult(false);

    // Get random prize
    const prize = getRandomPrize();

    // Calculate rotation for the prize to land at top (0 degrees)
    const prizeIndex = prizes.findIndex((p) => p.id === prize.id);
    const { startAngle, endAngle } = getSegmentAngle(prizeIndex);
    const targetAngle = (startAngle + endAngle) / 2;

    // Add multiple spins (5-10 full rotations) plus the target angle
    const spins = 5 + Math.floor(Math.random() * 5);
    const finalRotation = rotation + spins * 360 + (360 - targetAngle);

    setRotation(finalRotation);

    // Set timeout for when spinning stops
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(prize);
      setShowResult(true);
      setSpinsLeft((prev) => prev - 1);

      // Add to history
      setSpinHistory((prev) =>
        [
          {
            id: Date.now(),
            prize: prize.name,
            value: prize.value,
            date: new Date().toLocaleString(),
          },
          ...prev,
        ].slice(0, 10)
      ); // Keep last 10 spins
    }, 3000);
  };

  // Reset wheel
  const resetWheel = () => {
    setRotation(0);
    setSelectedPrize(null);
    setShowResult(false);
  };

  // Calculate position for prize labels on wheel
  const getLabelPosition = (index) => {
    const { startAngle, endAngle } = getSegmentAngle(index);
    const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
    const radius = 100;
    const x = 150 + radius * 0.7 * Math.sin(midAngle);
    const y = 150 - radius * 0.7 * Math.cos(midAngle);
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-red-400" />
            <h1 className="text-2xl md:text-3xl font-light tracking-tight">
              Lucky Draw Spin
            </h1>
          </div>

          {/* Spins left indicator */}
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
              <Ticket className="w-4 h-4 text-red-400" />
              <span className="font-medium">Spins: {spinsLeft}</span>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
            >
              <Award className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Spin wheel */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              {/* Wheel container */}
              <div className="relative flex justify-center items-center py-8">
                {/* SVG Wheel */}
                <svg
                  ref={wheelRef}
                  width="300"
                  height="300"
                  viewBox="0 0 300 300"
                  className="transform transition-transform duration-3000 ease-out"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning
                      ? "transform 3s cubic-bezier(0.25, 0.1, 0.15, 1)"
                      : "none",
                  }}
                >
                  {/* Wheel segments */}
                  {prizes.map((prize, index) => {
                    const { startAngle, endAngle } = getSegmentAngle(index);
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;

                    // Calculate SVG arc path
                    const x1 = 150 + 140 * Math.sin(startRad);
                    const y1 = 150 - 140 * Math.cos(startRad);
                    const x2 = 150 + 140 * Math.sin(endRad);
                    const y2 = 150 - 140 * Math.cos(endRad);

                    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                    const path = `
                      M 150 150
                      L ${x1} ${y1}
                      A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2}
                      Z
                    `;

                    return (
                      <g key={prize.id}>
                        <path
                          d={path}
                          fill={prize.color}
                          stroke="#1F2937"
                          strokeWidth="2"
                        />
                      </g>
                    );
                  })}

                  {/* Center circle */}
                  <circle
                    cx="150"
                    cy="150"
                    r="40"
                    fill="#1F2937"
                    stroke="#4B5563"
                    strokeWidth="3"
                  />

                  {/* Prize labels */}
                  {prizes.map((prize, index) => {
                    const pos = getLabelPosition(index);
                    return (
                      <text
                        key={`label-${prize.id}`}
                        x={pos.x}
                        y={pos.y}
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${90}, ${pos.x}, ${pos.y})`}
                      >
                        {prize.name}
                      </text>
                    );
                  })}
                </svg>

                {/* Pointer indicator */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-red-500"></div>
                </div>
              </div>

              {/* Spin button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={spinWheel}
                  disabled={isSpinning || spinsLeft <= 0}
                  className={`px-8 py-3 rounded-lg font-medium text-lg flex items-center gap-2 transition-all ${
                    isSpinning || spinsLeft <= 0
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 hover:scale-105"
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  {isSpinning
                    ? "Spinning..."
                    : spinsLeft <= 0
                    ? "No Spins Left"
                    : "SPIN NOW"}
                </button>
              </div>

              {/* Reset button */}
              {!isSpinning && (
                <div className="flex justify-center mt-3">
                  <button
                    onClick={resetWheel}
                    className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Wheel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Prizes and history */}
          <div className="space-y-6">
            {/* Prize list */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700">
              <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-400" />
                Available Prizes
              </h2>
              <div className="space-y-2">
                {prizes.map((prize) => (
                  <div
                    key={prize.id}
                    className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: prize.color }}
                      ></div>
                      <span className="text-sm">{prize.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {prize.probability}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Result display */}
            {showResult && selectedPrize && (
              <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-5 border border-red-500/30">
                <h2 className="text-sm text-gray-300 mb-2">Congratulations!</h2>
                <div className="flex items-center gap-3">
                  <Coins className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-xl font-bold">{selectedPrize.name}</p>
                    <p className="text-sm text-gray-300">
                      Worth {selectedPrize.value} gems
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Spin history */}
            {showHistory && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-medium">Recent Spins</h2>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {spinHistory.length > 0 ? (
                    spinHistory.map((spin) => (
                      <div
                        key={spin.id}
                        className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg text-sm"
                      >
                        <span className="text-gray-300">{spin.prize}</span>
                        <span className="text-xs text-gray-400">
                          {spin.date}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No spins yet
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">
              {spinHistory.length}
            </p>
            <p className="text-xs text-gray-400">Total Spins</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">
              {spinHistory.reduce((sum, spin) => {
                const prize = prizes.find((p) => p.name === spin.prize);
                return sum + (prize?.value || 0);
              }, 0)}
            </p>
            <p className="text-xs text-gray-400">Gems Earned</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{spinsLeft}</p>
            <p className="text-xs text-gray-400">Spins Left</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckyDrawSpin;
