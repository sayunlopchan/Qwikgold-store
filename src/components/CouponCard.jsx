// import React from "react";

// const CouponCard = ({ title, description, discount }) => {
//   return (
//     <div className="w-full max-lg:md:min-w-60 space-y-4 p-4 m-2 rounded-2xl bg-white shadow shadow-black/10 text-gray-700 border border-black max-h-32">
//       <div className="flex justify-between">
//         <div className="text-xl font-bold relative">
//           <span>{discount}%</span>
//           <span className="text-sm absolute top-0">OFF</span>
//         </div>
//         <div className="bg-gray-600 text-white px-2 rounded-lg">CLAIM</div>
//       </div>
//       <div className="leading-tight truncate">
//         <div className="text-sm font-semibold">{title}</div>
//         <div className="text-xs">{description}</div>
//       </div>
//     </div>
//   );
// };

// export default CouponCard;

import React from "react";
import { Ticket, Gift } from "lucide-react";

const CouponCard = ({ title, description, discount }) => {
  return (
    <div className="w-full min-w-45 sm:min-w-55 md:min-w-60 max-w-full group relative bg-white rounded-lg sm:rounded-xl border border-gray-200 p-2 sm:p-3 md:p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 bg-linear-to-br from-gray-100 to-gray-50 rounded-bl-full z-0 opacity-50"></div>

      {/* Main content */}
      <div className="relative z-10 space-y-1.5 sm:space-y-2 md:space-y-3">
        {/* Header with discount */}
        <div className="flex items-start justify-between">
          <div className="flex items-baseline gap-0.5 sm:gap-1">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              {discount}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              % OFF
            </span>
          </div>

          {/* Claim button */}
          <button className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-[8px] sm:text-[10px] md:text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm whitespace-nowrap">
            Claim
          </button>
        </div>

        {/* Coupon details */}
        <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5">
          <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 line-clamp-1">
            {title}
          </h3>
          <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer with coupon icon and expiry hint */}
        <div className="flex items-center justify-between pt-1 sm:pt-1.5 md:pt-2 border-t border-gray-100">
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
            <Ticket className="w-2.5 sm:w-3 md:w-3.5 h-2.5 sm:h-3 md:h-3.5 text-gray-400" />
            <span className="text-[6px] sm:text-[8px] md:text-xs text-gray-400 whitespace-nowrap">
              Limited time
            </span>
          </div>
          <Gift className="w-2.5 sm:w-3 md:w-3.5 h-2.5 sm:h-3 md:h-3.5 text-gray-300 flex-shrink-0" />
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

export default CouponCard;
