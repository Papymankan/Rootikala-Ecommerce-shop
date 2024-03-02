import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import './BreadCrumb.css'

export default function BreadCrumb({links}) {
    return (
        <>
            <div className="Container" id="breadCrumb">
                <div className="breadCrumbContainer">
                    <Link>خانه</Link>
                    <span><IoIosArrowBack /></span>
                    <Link>مردانه</Link>
                    <span><IoIosArrowBack /></span>
                    <Link>لباس مردانه</Link>
                </div>
            </div>
        </>
    );
}
