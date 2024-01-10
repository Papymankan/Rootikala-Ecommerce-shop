import React from "react";
import { CiMenuBurger, CiSquareChevLeft } from "react-icons/ci";
import { Link } from "react-router-dom";
import './MenuBar.css'

export default function MenuBar() {
    return (
        <>
            <div className="topBar">
                <div className="topBarRow">
                    <div className="topBarItems">
                        <Link>
                            <CiMenuBurger />
                            دسته بندی ها
                        </Link>
                    </div>
                    <div className="topBarItems">
                        <Link>
                            فروش ویژه
                        </Link>
                    </div>
                    <div className="topBarItems">
                        <Link>
                            راهنمای خرید
                        </Link>
                    </div>
                    <div className="topBarItems">
                        <Link>
                            سایر ...
                        </Link>
                    </div>
                </div>
            </div>
            <div className="megaMenu">
                <div className="megaMenuRow">
                    <div className="megaMenuList">
                        <ul>
                            <li className="megaMenuListItems">
                                مردانه <CiSquareChevLeft/>
                            </li>
                            <li className="megaMenuListItems">
                                مردانه <CiSquareChevLeft/>
                            </li>
                            <li className="megaMenuListItems">
                                مردانه <CiSquareChevLeft/>
                            </li>
                            <li className="megaMenuListItems">
                                ارایشی و بهداشتی <CiSquareChevLeft/>
                            </li>
                            <li className="megaMenuListItems">
                                مردانه <CiSquareChevLeft/>
                            </li>
                        </ul>
                    </div>
                    <div className="megaMenuItems"></div>
                </div>
            </div>
        </>
    );
}
