import { SwiperProps } from "swiper/react";

export const heroSwiperParams: SwiperProps = {
    autoHeight: false,
    spaceBetween: 10,
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    speed: 1000,
    pagination: { clickable: true }
};