import React, { useEffect } from "react";
import './Landing.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { Pagination, Autoplay } from 'swiper/modules';

export default function Landing() {
    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>
            <div className="Container">

                <div className="LandingContainer">
                    <div className="landingSwiper" data-aos="fade-left" data-aos-delay="50" data-aos-duration='800'>

                        <Swiper
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Pagination, Autoplay]}
                            className="mySwiper"    
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                        >
                            <SwiperSlide>
                                <img src="/Images/main-slider-1.jpg" alt="landPic" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/Images/main-slider-2.jpg" alt="landPic" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/Images/main-slider-3.jpg" alt="landPic" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="landingPicture" data-aos="fade-right" data-aos-delay="50" data-aos-duration='800'>
                        <div>
                            <img src="/Images/main-banner-top.jpg" alt="landPic" />
                        </div>
                        <div>
                            <img src="/Images/main-bot.gif" alt="landPic" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
