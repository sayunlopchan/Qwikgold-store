import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "./../css/swiper.css";

const Slider = ({
  images = [],
  slidesPerView = 1,
  spaceBetween = 20,
  autoplayDelay = 5000,
  onSlideChange,
}) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  // Handle slide change
  const handleSlideChange = (swiper) => {
    if (onSlideChange) {
      onSlideChange(swiper);
    }
  };

  return (
    <Swiper
      style={{ height: "100%", width: "100%" }}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={images.length > 1}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      autoplay={{
        delay: autoplayDelay,
        disableOnInteraction: false,
      }}
      onSlideChange={handleSlideChange}
      onAutoplay={handleSlideChange}
    >
      {images.slice(0, 10).map((img, idx) => (
        <SwiperSlide key={img.id || idx}>
          <img
            src={img.thumbnail}
            alt={img.alt || img.title || `Slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
