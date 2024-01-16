import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import './LastProducts.css'


export default function LastProducts() {
    return (
        <>
            <div className="Container">
                <div className="LastCoursesContainer">
                    <div className="LastCoursesHeader">
                        <h2>جدیدترین محصولات</h2>
                        <Link>مشاهده همه <IoIosArrowBack/></Link>
                    </div>
                    <div className="LastCoursesRow">

                    </div>  
                </div>
            </div>
        </>
    );
}
