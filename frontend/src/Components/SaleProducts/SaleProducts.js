import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
// import './LastProducts.css'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from "../ProductCard/ProductCard";

export default function SaleProducts({products}) {

    const [saleProducts, setSaleProducts] = useState([])

    useEffect(()=>{
        setSaleProducts(products.filter(product => product.collection_id == 'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V'))
    } , [products])

    return (
        <>
            <div className="Container">
                <div className="LastCoursesContainer">
                    <div className="LastCoursesHeader">
                        <h2>فروش ویژه روز</h2>
                        <Link>مشاهده همه <IoIosArrowBack /></Link>
                    </div>
                    <div className="LastCoursesRow">
                        <Swiper
                            slidesPerView={5.5}
                            spaceBetween={15}
                            className="myProductsSwiper"
                        >
                            {
                                saleProducts.length >= 1 && saleProducts.map(product => (
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
