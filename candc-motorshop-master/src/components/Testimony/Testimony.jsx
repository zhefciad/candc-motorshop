import React, { useRef } from "react";
import "./Testimony.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination } from "swiper";
import TestimonyData from "../../data/testimonyData";
import StarIcon from "@mui/icons-material/Star";
import { Navigation } from "swiper";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { IconButton } from "@mui/material";
import useFetch from "../../hooks/useFetch";
const Testimony = () => {
  const swiperRef = useRef(null);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };
  // const { dataFetch, loading, error } = useFetch(`/products/2?populate=*`);
  // const { dataFetch, loading, error } = useFetch(`/testimonies`);

  const { dataFetch, loading, error } = useFetch(`/testimonies`);

  console.log(dataFetch, error, "TESTIMONIES");

  return (
    <div className="Testimony">
      <h2>Testimonials</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        spaceBetween={50}
        centeredSlides={true}
        loop={true}
        pagination={false}
        className="mySwiper"
        ref={swiperRef}
      >
        {TestimonyData?.map((item) => {
          const arr = Array.from({ length: item.stars }, (_, i) => i + 1);

          return (
            <SwiperSlide className="swiperTestimony">
              <h3>
                {arr?.map((star) => (
                  <StarIcon sx={{ color: "#fdb001" }} />
                ))}
              </h3>
              <p>{item.desc}</p>
              <h2>{item.name}</h2>
            </SwiperSlide>
          );
        })}

        {/* 
        {dataFetch?.map(item => {
          const arr = Array.from({ length: item.attributes.stars }, (_, i) => i + 1);
  
          return <SwiperSlide className='swiperTestimony'>
           <h3>{arr?.map(star => <StarIcon sx={{color: "#fdb001"}}/>)}</h3>
           <p>{item.attributes.desc}</p>
           <h2>{item.attributes.name}</h2>
          </SwiperSlide>
          
        })}
  */}
      </Swiper>

      <div className="swiper-buttons">
        <div>
          <IconButton
            onClick={handlePrev}
            className="leftTestButton"
            sx={{ color: "white" }}
          >
            <WestIcon sx={{ color: "black" }} />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={handleNext}
            className="rightTestButton"
            sx={{ color: "white" }}
          >
            <EastIcon sx={{ color: "black" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
