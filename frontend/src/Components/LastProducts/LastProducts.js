import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import './LastProducts.css'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function LastProducts() {
    return (
        <>
            <div className="Container">
                <div className="LastCoursesContainer">
                    <div className="LastCoursesHeader">
                        <h2>جدیدترین محصولات</h2>
                        <Link>مشاهده همه <IoIosArrowBack /></Link>
                    </div>
                    <div className="LastCoursesRow">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={15}
                            // centeredSlides={true}
                            // pagination={{
                            //     clickable: true,
                            // }}
                            // modules={[Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide className="productSlide">
                                <div className="ProductCard">
                                    <img src="/Images/p2.png" />
                                    <span>تیشرت اسپورت اسپورت اسپورت اسپورت اسپورت اسپورت مردانه</span>
                                    <span>{(1350000).toLocaleString()} تومان</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="productSlide">
                                <div className="ProductCard">
                                    <img src="/Images/p2.png" />
                                    <span>تیشرت اسپورت مردانه</span>
                                    <span>{(1350000).toLocaleString()} تومان</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="productSlide">
                                <div className="ProductCard">
                                    <img src="/Images/p2.png" />
                                    <span>تیشرت اسپورت مردانه</span>
                                    <span>{(1350000).toLocaleString()} تومان</span>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
}
