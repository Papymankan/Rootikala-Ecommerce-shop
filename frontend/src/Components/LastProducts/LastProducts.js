import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import './LastProducts.css'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from "../ProductCard/ProductCard";

export default function LastProducts({products}) {
    const [lastProducts, setLastProducts] = useState([])
    const [slidesPerViewNum , setSlidesPerViewNum] = useState(5.5)

    useEffect(()=>{
        setLastProducts(products.slice(0 ,9))
    } , [products])


    return (
        <>
            <div className="Container">
                <div className="LastCoursesContainer">
                    <div className="LastCoursesHeader">
                        <h2>جدیدترین محصولات</h2>
                        <Link to={'/store'}>مشاهده همه <IoIosArrowBack /></Link>
                    </div>
                    <div className="LastCoursesRow">
                        <Swiper
                            slidesPerView={'auto'}
                            spaceBetween={15}
                            className="myProductsSwiper"
                        >
                            {
                                lastProducts.length >= 1 && lastProducts.map(product => (
                                    <SwiperSlide className="productSlide" key={product.id}>
                                        <ProductCard {...product}/>
                                    </SwiperSlide>
                                ))
                            }
                            
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
}
