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
  onSlideChange, // Add this prop
}) => {
  if (!images || images.length === 0) {
    return "hello";
  }

  // Handle slide change
  const handleSlideChange = (swiper) => {
    if (onSlideChange) {
      onSlideChange(swiper);
    }
  };

  return (
    <Swiper
      className="max-sm:max-h-56 max-md:w-full w-[75%] lg:max-w-7xl"
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
      onSlideChange={handleSlideChange} // Add this
      onAutoplay={handleSlideChange} // Also trigger on autoplay
      breakpoints={{
        // Responsive breakpoints
        640: {
          slidesPerView: Math.min(slidesPerView, 2),
        },
        768: {
          slidesPerView: Math.min(slidesPerView, 3),
        },
        1024: {
          slidesPerView: slidesPerView,
        },
      }}
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
