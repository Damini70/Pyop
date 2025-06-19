import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Carousel = ({ data = [] }) => {
  return (
    <div>
      <span className="fs-2 ">Hot Picks</span>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination]}
        className="mySwiper mt-4"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide>
              <div className="card border-0 p-2">
                <img className="rounded-4" src={item.image}></img>
                <div className="mt-3">
                  <span className="fs-5">{item.title}</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
