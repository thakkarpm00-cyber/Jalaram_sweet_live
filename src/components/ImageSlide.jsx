import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const ImageSlide = () => {
  return (
    <div className="relative w-full mt-20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <img
            src="./images/slide1.png"
            alt="Slide 1"
            className="w-full h-[550px] object-fill md:h-[510px] sm:h-[280px]"
          />
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <img
            src="./images/slide2.jpg"
            alt="Slide 2"
            className="w-full h-[550px] object-fill md:h-[510px] sm:h-[280px]"
          />
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <img
            src="./images/slide3.jpeg"
            alt="Slide 3"
            className="w-full h-[550px] object-fill md:h-[510px] sm:h-[280px]"
          />
        </SwiperSlide>
      </Swiper>

      {/* Swiper default buttons and pagination styling overrides */}
      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #fff;
        }
        .swiper-pagination-bullet-active {
          background-color: #2e86c1;
        }
      `}</style>
    </div>
  );
};

export default ImageSlide;
