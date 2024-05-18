import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import './BreadCrumb.css'

export default function BreadCrumb({ categoryDetails }) {
    return (
        <>
            {/* <div className="Container" id="breadCrumb">
                <div className="breadCrumbContainer">
                    <Link to={'/'}>خانه</Link>
                    <span><IoIosArrowBack /></span>
                    {
                        categoryDetails.parent_category && (
                            <>
                                <Link to={`/category/${categoryDetails.parent_category.id}`}>{categoryDetails.parent_category.name}</Link>
                                <span><IoIosArrowBack /></span>
                            </>
                        )
                    }
                    {
                        categoryDetails && (
                            <>
                                <Link to={`/category/${categoryDetails.id}`}>{categoryDetails.name}</Link>
                            </>
                        )
                    }
                </div>
            </div> */}
              <div className="breadCrumbContainer">
                    <Link to={'/'}>خانه</Link>
                    <span><IoIosArrowBack /></span>
                    {
                        categoryDetails.parent_category && (
                            <>
                                <Link to={`/category/${categoryDetails.parent_category.id}`}>{categoryDetails.parent_category.name}</Link>
                                <span><IoIosArrowBack /></span>
                            </>
                        )
                    }
                    {
                        categoryDetails && (
                            <>
                                <Link to={`/category/${categoryDetails.id}`}>{categoryDetails.name}</Link>
                            </>
                        )
                    }
                </div>
        </>
    );
}
