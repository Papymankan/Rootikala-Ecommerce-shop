import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
// import './LastProducts.css'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function PopularProducts() {
    return (
        <>
            <div className="Container">
                <div className="LastCoursesContainer">
                    <div className="LastCoursesHeader">
                        <h2>محبوب ترین محصولات</h2>
                        <Link>مشاهده همه <IoIosArrowBack /></Link>
                    </div>
                    <div className="LastCoursesRow">
                        <Swiper
                            slidesPerView={5.5}
                            spaceBetween={15}
                            className="myProductsSwiper"
                        >
                            <SwiperSlide className="productSlide">
                                <div className="ProductCard">
                                    <Link>
                                        <img src="/Images/p2.png" />
                                        <span>تیشرت اسپورت اسپورت اسپورت اسپورت اسپورت اسپورت مردانه</span>
                                        <div>
                                            <span>{(10000000).toLocaleString()}</span>
                                            <span>
                                                {(1350000).toLocaleString()} تومان
                                                <span>
                                                    50%
                                                </span>
                                            </span>
                                        </div>
                                        <span>{(1350000).toLocaleString()} تومان</span>
                                    </Link>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
}
