import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import HeroSliderOneSingle from "../../components/hero-slider/HeroSliderOneSingle.js";
import { get } from "../../helpers/apiHelper";

const HeroSliderOne = (props) => {
  console.log("props.slide---------> ", props.slides);
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    height: 100,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <div className="slider-area">
      {props.slides?.length > 0 && (
        <div className="slider-active nav-style-1 slide-home">
          <Swiper {...params}>
            {props.slides?.map((single, key) => {
              return (
                <HeroSliderOneSingle
                  sliderClassName="swiper-slide"
                  data={single}
                  key={key}
                />
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default HeroSliderOne;
