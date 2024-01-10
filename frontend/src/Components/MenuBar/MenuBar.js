import React, { useState } from "react";
import { CiHome, CiMenuBurger, CiMenuKebab, CiShoppingBasket, CiSquareChevLeft } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { SlFire } from "react-icons/sl";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import './MenuBar.css'

export default function MenuBar({ showMenu, setShowMenu }) {

    const [scroll, setScroll] = useState(0)
    const [topBarShow, setTopBarShow] = useState(true)

    const ScrollHandler = () => {
        if (window.scrollY > scroll) {
            if (topBarShow) {
                setTopBarShow(false)
            }
        } else if (!topBarShow) {
            setTopBarShow(true)
        }

        setScroll(window.scrollY)

    }

    window.addEventListener('scroll', ScrollHandler)

    return (
        <>
            <div className="topBar" style={topBarShow ? { 'top': '98px' } : { 'top': '45px' }}>
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
                <div className="megaMenu">
                    <div className="megaMenuRow">
                        <div className="megaMenuList">
                            <ul>
                                <li className="megaMenuListItems">
                                    مردانه
                                </li>
                                <li className="megaMenuListItems megaMenuActive">
                                    مردانه
                                </li>
                                <li className="megaMenuListItems">
                                    مردانه
                                </li>
                                <li className="megaMenuListItems">
                                    ارایشی و بهداشتی
                                </li>
                                <li className="megaMenuListItems">
                                    مردانه
                                </li>
                            </ul>
                        </div>
                        <div className="megaMenuItems">
                            <div className="megaMenuItemsUp">
                                <Link>
                                    مشاهده همه <IoIosArrowBack />
                                </Link>
                            </div>
                            <div className="megaMenuItemsDown">
                                <div className="subMenuItem">
                                    <div className="subMenuItemHead">
                                        <span></span>
                                        <Link>
                                            کیف و کفش مردانه <IoIosArrowBack />
                                        </Link>
                                    </div>
                                    <div className="subMenuItemList">
                                        <ul>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="subMenuItem">
                                    <div className="subMenuItemHead">
                                        <span></span>
                                        <Link>
                                            کیف و کفش مردانه <IoIosArrowBack />
                                        </Link>
                                    </div>
                                    <div className="subMenuItemList">
                                        <ul>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="subMenuItem">
                                    <div className="subMenuItemHead">
                                        <span></span>
                                        <Link>
                                            کیف و کفش مردانه <IoIosArrowBack />
                                        </Link>
                                    </div>
                                    <div className="subMenuItemList">
                                        <ul>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    کفش
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Offcanvas show={showMenu} placement='end' onHide={setShowMenu}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <Link to='/'>
                            <img src="https://roti-preview.taymakz.ir/assets/images/logo.svg" className="SlideBarLogoImg" />
                        </Link>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="SlideBarLinksList">
                        <li className="SlideBarLinks">
                            <Link><CiHome/> صفحه اصلی</Link>
                        </li>
                        <li className="SlideBarLinks">
                            <Link><SlFire/> فروش ویژه</Link>
                        </li>
                        <li className="SlideBarLinks">
                            <Link><CiShoppingBasket/> راهنمای خرید</Link>
                        </li>
                        <li className="SlideBarLinks">
                            <Link><CiMenuKebab/> سایر ...</Link>
                        </li>
                    </ul>
                    <div className="divider">
                        <span></span>
                        <HiOutlineShoppingBag />
                        <span></span>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
}
