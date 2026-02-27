// import React, { useRef, useState, useEffect } from "react";

// export default function SwiperScroll({
//   children,
//   itemClassName = "w-50 sm:w-62.5",
//   desktopItemClassName = "w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] 2xl:w-[calc(20%-1rem)]",
//   snapDuration = 300,
//   gridRows = 2, // Default to 2 rows, set to 1 for single row
// }) {
//   const scrollContainerRef = useRef(null);
//   const containerRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [translateX, setTranslateX] = useState(0);
//   const [maxTranslate, setMaxTranslate] = useState(0);
//   const [snapPoints, setSnapPoints] = useState([]);

//   const dragStartRef = useRef(0);
//   const lastXRef = useRef(0);
//   const velocityRef = useRef(0);
//   const animationRef = useRef(null);
//   const lastTimeRef = useRef(0);
//   const startTimeRef = useRef(0);
//   const moveDistanceRef = useRef(0);

//   // Convert children to array
//   const childArray = React.Children.toArray(children);

//   // Generate grid class based on gridRows prop
//   const gridRowsClass =
//     gridRows === 1
//       ? "grid-rows-1"
//       : gridRows === 2
//       ? "grid-rows-2"
//       : gridRows === 3
//       ? "grid-rows-3"
//       : `grid-rows-${gridRows}`;

//   useEffect(() => {
//     const updateMaxScroll = () => {
//       if (scrollContainerRef.current && containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const contentWidth = scrollContainerRef.current.scrollWidth;
//         const maxScroll = containerWidth - contentWidth;
//         setMaxTranslate(maxScroll);

//         // Calculate snap points (one for each card)
//         const cards = scrollContainerRef.current.children;
//         const points = [0]; // Start at 0

//         Array.from(cards).forEach((card, index) => {
//           if (index > 0) {
//             const cardLeft = card.offsetLeft;
//             const snapPosition = -cardLeft;
//             if (snapPosition > maxScroll) {
//               points.push(snapPosition);
//             }
//           }
//         });

//         // Add final snap point at the end
//         if (maxScroll < 0) {
//           points.push(maxScroll);
//         }

//         setSnapPoints(points);
//       }
//     };

//     updateMaxScroll();
//     window.addEventListener("resize", updateMaxScroll);
//     return () => window.removeEventListener("resize", updateMaxScroll);
//   }, [childArray.length]);

//   const findNearestSnapPoint = (position, velocity = 0) => {
//     if (snapPoints.length === 0) return position;

//     // If velocity is significant, predict where user wants to go
//     const momentumOffset = velocity * 100; // Adjust this multiplier for sensitivity

//     let targetPosition = position + momentumOffset;

//     // Find closest snap point
//     let nearest = snapPoints[0];
//     let minDistance = Math.abs(targetPosition - nearest);

//     snapPoints.forEach((point) => {
//       const distance = Math.abs(targetPosition - point);
//       if (distance < minDistance) {
//         minDistance = distance;
//         nearest = point;
//       }
//     });

//     // Ensure we're within bounds
//     if (nearest > 0) nearest = 0;
//     if (nearest < maxTranslate) nearest = maxTranslate;

//     return nearest;
//   };

//   const animateToPosition = (targetPosition, duration = snapDuration) => {
//     const startPosition = translateX;
//     const distance = targetPosition - startPosition;
//     const startTime = Date.now();

//     const animate = () => {
//       const currentTime = Date.now();
//       const elapsed = currentTime - startTime;
//       const progress = Math.min(elapsed / duration, 1);

//       // Easing function (ease-out)
//       const easeOut = 1 - Math.pow(1 - progress, 3);
//       const newPosition = startPosition + distance * easeOut;

//       setTranslateX(newPosition);
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.style.transform = `translateX(${newPosition}px)`;
//       }

//       if (progress < 1) {
//         animationRef.current = requestAnimationFrame(animate);
//       } else {
//         animationRef.current = null;
//         setIsScrolling(false);
//       }
//     };

//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }
//     setIsScrolling(true);
//     animationRef.current = requestAnimationFrame(animate);
//   };

//   const handleDragStart = (clientX) => {
//     // Cancel any ongoing animation
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//       animationRef.current = null;
//     }

//     setIsDragging(true);
//     setIsScrolling(false);
//     setStartX(clientX - translateX);
//     dragStartRef.current = clientX;
//     lastXRef.current = clientX;
//     lastTimeRef.current = Date.now();
//     startTimeRef.current = Date.now();
//     moveDistanceRef.current = 0;
//     velocityRef.current = 0;
//   };

//   const handleDragMove = (clientX) => {
//     if (!isDragging) return;

//     const currentTime = Date.now();
//     const deltaTime = currentTime - lastTimeRef.current;
//     const deltaX = clientX - lastXRef.current;

//     // Calculate total move distance
//     moveDistanceRef.current += Math.abs(deltaX);

//     // Calculate velocity (pixels per millisecond)
//     if (deltaTime > 0) {
//       velocityRef.current = deltaX / deltaTime;
//     }

//     lastXRef.current = clientX;
//     lastTimeRef.current = currentTime;

//     const currentX = clientX - startX;

//     // Boundary checks with resistance
//     let newTranslate = currentX;
//     if (newTranslate > 0) {
//       newTranslate = Math.log(1 + newTranslate) * 30;
//     }
//     if (newTranslate < maxTranslate) {
//       newTranslate =
//         maxTranslate - Math.log(1 + (maxTranslate - newTranslate)) * 30;
//     }

//     setTranslateX(newTranslate);
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.style.transform = `translateX(${newTranslate}px)`;
//     }
//   };

//   const handleDragEnd = (e) => {
//     if (!isDragging) return;

//     const dragTime = Date.now() - startTimeRef.current;
//     const isQuickTap = dragTime < 200 && moveDistanceRef.current < 10;

//     setIsDragging(false);

//     // If it was a quick tap, don't snap - allow click to pass through
//     if (!isQuickTap) {
//       // Find nearest snap point based on current position and velocity
//       const snapTarget = findNearestSnapPoint(translateX, velocityRef.current);
//       // Animate to snap point
//       animateToPosition(snapTarget);
//     } else {
//       // Reset transform to current position without animation
//       setTranslateX(translateX);
//       setIsScrolling(false);
//     }
//   };

//   // Mouse events
//   const handleMouseDown = (e) => {
//     e.preventDefault();
//     handleDragStart(e.pageX);
//   };

//   const handleMouseMove = (e) => {
//     e.preventDefault();
//     handleDragMove(e.pageX);
//   };

//   const handleMouseUp = (e) => {
//     handleDragEnd(e);
//   };

//   const handleMouseLeave = () => {
//     if (isDragging) {
//       handleDragEnd();
//     }
//   };

//   // Touch events for mobile
//   const handleTouchStart = (e) => {
//     const touch = e.touches[0];
//     handleDragStart(touch.pageX);
//   };

//   const handleTouchMove = (e) => {
//     e.preventDefault(); // Prevent page scroll
//     const touch = e.touches[0];
//     handleDragMove(touch.pageX);
//   };

//   const handleTouchEnd = (e) => {
//     handleDragEnd(e);
//   };

//   const handleTouchCancel = (e) => {
//     handleDragEnd(e);
//   };

//   // Handle click on child elements
//   const handleChildClick = (e, child) => {
//     // If we were scrolling, prevent the click
//     if (isScrolling || moveDistanceRef.current > 10) {
//       e.preventDefault();
//       e.stopPropagation();
//       return false;
//     }
//     // Otherwise, let the click through
//     return true;
//   };

//   // Cleanup animation on unmount
//   useEffect(() => {
//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section>
//       {/* Mobile/Tablet view - drag to scroll */}
//       <div className="relative lg:hidden">
//         <div ref={containerRef} className="overflow-hidden select-none">
//           <div
//             ref={scrollContainerRef}
//             className={`grid ${gridRowsClass} grid-flow-col gap-4 auto-cols-max`}
//             style={{
//               cursor: isDragging ? "grabbing" : "grab",
//               transform: `translateX(${translateX}px)`,
//               transition: isDragging ? "none" : "transform 0.3s ease-out",
//               touchAction: "pan-y", // Allow vertical scrolling, handle horizontal manually
//             }}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//             onMouseLeave={handleMouseLeave}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//             onTouchCancel={handleTouchCancel}
//           >
//             {childArray.map((child, index) => (
//               <div
//                 key={index}
//                 className={itemClassName}
//                 style={{
//                   pointerEvents: isDragging ? "none" : "auto",
//                 }}
//                 onClick={(e) => {
//                   // Allow click if not dragging/scrolling
//                   if (isScrolling || moveDistanceRef.current > 10) {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }
//                 }}
//               >
//                 {child}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Optional: Add scroll indicators or hint */}
//         {maxTranslate < 0 && (
//           <div className="flex justify-center mt-4 gap-1">
//             <div
//               className={`w-1 h-1 rounded-full transition-all ${
//                 translateX > maxTranslate * 0.2 ? "bg-gray-400" : "bg-gray-300"
//               }`}
//             />
//             <div
//               className={`w-1 h-1 rounded-full transition-all ${
//                 translateX <= maxTranslate * 0.2 &&
//                 translateX > maxTranslate * 0.8
//                   ? "bg-gray-400"
//                   : "bg-gray-300"
//               }`}
//             />
//             <div
//               className={`w-1 h-1 rounded-full transition-all ${
//                 translateX <= maxTranslate * 0.8 ? "bg-gray-400" : "bg-gray-300"
//               }`}
//             />
//           </div>
//         )}
//       </div>

//       {/* Desktop view - static flex with wrapping */}
//       <div className="hidden lg:flex lg:flex-wrap lg:gap-4">
//         {childArray.map((child, index) => (
//           <div key={index} className={desktopItemClassName}>
//             {child}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "../css/swiperScroll.css";

export default function SwiperScroll({
  children,
  itemClassName = "w-50 sm:w-62.5",
  desktopItemClassName = "w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] 2xl:w-[calc(20%-1rem)]",
  gridRows = 2,
}) {
  const childArray = React.Children.toArray(children);

  // For mobile: group items into sets based on gridRows
  const groupedItems = [];
  for (let i = 0; i < childArray.length; i += gridRows) {
    groupedItems.push(childArray.slice(i, i + gridRows));
  }

  // For desktop grid view
  const getDesktopGridClasses = () => {
    let gridColsClass = "grid-cols-3";

    if (desktopItemClassName.includes("xl:w-[calc(25%-1rem)]")) {
      gridColsClass = "grid-cols-3 xl:grid-cols-4";
    }
    if (desktopItemClassName.includes("2xl:w-[calc(20%-1rem)]")) {
      gridColsClass = "grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
    }

    return `grid ${gridColsClass} gap-4`;
  };

  return (
    <section>
      {/* Mobile/Tablet view - Swiper with drag and snap */}
      <div className="lg:hidden">
        <Swiper
          freeMode={{
            enabled: true,
            momentum: true,
            momentumBounce: true,
            momentumBounceRatio: 0.5,
            momentumRatio: 0.5,
            sticky: true,
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
          }}
          slidesPerView="auto"
          spaceBetween={16}
          modules={[FreeMode, Mousewheel]}
          className="overflow-visible!"
          grabCursor={true}
          touchRatio={1.2}
          resistance={true}
          resistanceRatio={0.6}
          speed={400}
          threshold={5}
        >
          {groupedItems.map((group, groupIndex) => (
            <SwiperSlide key={groupIndex} className="w-auto!">
              <div className={`grid grid-rows-${gridRows} gap-4`}>
                {group.map((child, index) => (
                  <div key={`${groupIndex}-${index}`} className={itemClassName}>
                    {child}
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop view - static grid with wrapping */}
      <div className="hidden lg:block">
        <div className={getDesktopGridClasses()}>
          {childArray.map((child, index) => (
            <div key={index} className="w-full">
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
