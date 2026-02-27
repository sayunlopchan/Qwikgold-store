// import React from "react";

const OfferCard = ({ title, thumbnail, description, discount }) => {
  //   return (
  //     <div className="rounded-xl max-sm:w-50 w-full bg-gray-800 text-[0.7rem] relative mt-4 mr-3 mb-3 text-white flex flex-col shrink-0 overflow-visible">
  //       <div className="px-2 py-3 rounded-xl bg-gray-500 relative">
  //         {/* Image positioned to overlap */}
  //         <div className="size-14 rounded-xl absolute -top-4 left-2 overflow-hidden z-10 bg-gray-600">
  //           <img
  //             src={thumbnail}
  //             alt={title}
  //             className="w-full h-full object-cover"
  //             onError={(e) => {
  //               e.target.onerror = null;
  //               e.target.src = "noimg";
  //             }}
  //           />
  //         </div>
  //         <div className="grid grid-cols-3 w-full">
  //           <div className="col-span-1"></div>
  //           <div className="col-span-2 pl-2">
  //             <p className="font-semibold leading-tight truncate">{title}</p>
  //             <p className="font-light leading-tight truncate opacity-90">
  //               {description}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //       {/* Footer with PROMO and DISCOUNT */}
  //       <div className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-b-xl">
  //         <span className="bg-red-500 px-3 py-1 rounded-2xl font-semibold text-white text-[0.7rem] leading-none">
  //           PROMO
  //         </span>
  //         <span className="font-medium text-white text-[0.7rem] leading-none">
  //           {discount}%
  //         </span>
  //       </div>
  //     </div>
  //   );
  return (
    <div className="group rounded-lg w-full min-w-45 xs:min-w-[200px] sm:min-w-55 max-w-65 bg-gray-50 border border-gray-200 relative hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="flex p-2 gap-2">
        {/* Thumbnail */}
        <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-lg overflow-hidden bg-gray-200 shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-xs xs:text-sm text-gray-900 line-clamp-1">
            {title}
          </h3>
          <p className="text-[0.6rem] xs:text-xs text-gray-500 line-clamp-1">
            {description}
          </p>

          {/* Discount Badge */}
          <div className="flex items-center gap-1 mt-1">
            <span className="bg-red-500 text-white text-[0.5rem] xs:text-[0.6rem] font-bold px-1.5 py-0.5 rounded">
              {discount}% OFF
            </span>
            <span className="text-[0.5rem] text-gray-400">PROMO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
