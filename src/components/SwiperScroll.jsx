import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "../css/swiperScroll.css";

export default function SwiperScroll({
  children,
  itemClassName = "w-50 sm:w-62.5",
  desktopItemClassName = "w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] 2xl:w-[calc(20%-1rem)]",
  gridRows,
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
