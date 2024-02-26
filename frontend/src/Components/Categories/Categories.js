import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Categories.css'

export default function Categories() {

    useEffect(() => {
        AOS.init();
    }, [])
// data-aos="fade-up" data-aos-delay="500" data-aos-easing="ease-in-out"
    return (
        <>
            <div className="Container">
                <div className="LastCoursesHeader">
                    <h2>دسته بندی ها</h2>
                </div>
                <div className="CategoriesRowContainer">
                    <Link to={'/category/pcat_01HQ2V8MXF77XDC94V1MCKY6R6'} data-aos="fade-up" data-aos-delay="150" data-aos-duration='1500'>
                        <div className="CategoriesRow_Item">
                            <img src={`/Images/man1.jpg`} alt="" />
                            <img src="/Images/man2.jpg" alt="" />
                            <span>
                                مردانه
                            </span>
                        </div>
                    </Link>
                    <Link to={'/category/pcat_01HQ2VJGDXSNYR1H8BJG8E86NT'} data-aos="fade-up" data-aos-delay="150" data-aos-duration='1500'>
                        <div className="CategoriesRow_Item">
                            <img src={`/Images/woman1.jpg`} alt="" />
                            <img src="/Images/woman2.jpg" alt="" />
                            <span>
                                زنانه
                            </span>
                        </div>
                    </Link>
                    <Link to={'/category/pcat_01HQ2W1WCE60W6D3GWW71NSVRW'}data-aos="fade-up" data-aos-delay="150" data-aos-duration='1500'>
                        <div className="CategoriesRow_Item">

                            <img src={`/Images/perf1.jpg`} alt="" />
                            <img src="/Images/perf2.jpg" alt="" />
                            <span>
                                عطر و ادکلن
                            </span>
                        </div>
                    </Link>
                    <Link to={'/category/pcat_01HQ2VWWPG9RSB03BNNW8MB1CQ'} data-aos="fade-up" data-aos-delay="150" data-aos-duration='1500'>
                        <div className="CategoriesRow_Item">
                            <img src={`/Images/hoodie1.jpg`} alt="" />
                            <img src="/Images/hoodie2.jpg" alt="" />
                            <span>
                                هودی
                            </span>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    );
}
