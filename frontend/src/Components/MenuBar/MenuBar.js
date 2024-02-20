import React, { useEffect, useState } from "react";
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
    const [showMegaMenu, setShowMegaMenu] = useState(false)

    const [categories, setCategories] = useState([])
    const [listedCats, setListedCats] = useState([])
    const [activeCat, setActiveCat] = useState('')


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

    useEffect(() => {

        fetch(`http://localhost:9000/store/product-categories`, {
        }).then(res => res.json()).then(data => setCategories(data.product_categories))

        // fetch(`http://localhost:9000/store/products?collection_id[]=${'pcol_01HMR5RCMZ4RCE58VJ59AWXA7V'}`, {
        // }).then(res => {
        //   return res.json()
        // }).then(data => console.log(data))

    }, [])

    useEffect(() => {
        let arrangedCategories = categories
        if (arrangedCategories) {
            let arr2 = []
            arrangedCategories.map(category => {
                if (!category.parent_category_id) {
                    let arr = []
                    category.category_children.map(child => {
                        arrangedCategories.map(cat => {
                            cat.id == child.id && arr.push(cat);
                        })
                    })
                    category['childs'] = arr
                    arr2.push(category)
                }
            })
            setListedCats(arr2)
        }
    }, [categories])

    window.addEventListener('scroll', ScrollHandler)

    return (
        <>
            <div className="topBar" style={topBarShow ? { 'top': '98px' } : { 'top': '45px' }}>
                <div className="topBarRow">
                    <div className="topBarItems" onMouseEnter={() => setShowMegaMenu(true)} onMouseLeave={() => setShowMegaMenu(false)}>
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

                {showMegaMenu &&
                    <div className="megaMenu"
                        onMouseEnter={() => {
                            setShowMegaMenu(true)
                        }}
                        onMouseLeave={() => {
                            setShowMegaMenu(false)
                        }}>
                        <div className="megaMenuRow">
                            <div className="megaMenuList">
                                <ul>
                                    {
                                        listedCats.map(cat => (
                                            <li className={`megaMenuListItems ${activeCat == cat.name && 'megaMenuActive'}`} onMouseEnter={() => setActiveCat(cat.name)}>
                                                {cat.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="megaMenuItems">
                                <div className="megaMenuItemsUp">
                                    <Link to={'/store'}>
                                        مشاهده همه <IoIosArrowBack />    
                                    </Link>
                                </div>
                                <div className="megaMenuItemsDown">
                                    {
                                        activeCat && listedCats.map(cat => cat.name == activeCat &&
                                            (
                                                cat.childs.map(child => (
                                                    <div className="subMenuItem">
                                                        <div className="subMenuItemHead">
                                                            <span></span>
                                                            <Link to={`/category/${child.id}`}>
                                                                {child.name} <IoIosArrowBack />
                                                            </Link>
                                                        </div>
                                                        <div className="subMenuItemList">
                                                            <ul>
                                                                {
                                                                    child.category_children.map(catChild => (
                                                                        <li>
                                                                            <Link to={`/category/${catChild.id}`}>
                                                                                {catChild.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))

                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>

            <Offcanvas show={showMenu} placement='end' onHide={setShowMenu}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <Link to='/'>
                            <img src="/Images/logo.svg" className="navBarLogoImg" />
                        </Link>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="SlideBarLinksList">
                        <li className="SlideBarLinks">
                            <Link><CiHome /> صفحه اصلی</Link>
                        </li>
                        <li className="SlideBarLinks">
                            <Link><SlFire /> فروش ویژه</Link>
                        </li>
                        <li className="SlideBarLinks">
                            <Link><CiShoppingBasket /> راهنمای خرید</Link>
                        </li>
                        <li className="SlideBarLinks">
                            <Link><CiMenuKebab /> سایر ...</Link>
                        </li>
                    </ul>
                    <div className="divider">
                        <span></span>
                        <HiOutlineShoppingBag />
                        <span></span>
                    </div>
                    <ul className="SlideBarLinksList">
                        <li className="SlideBarLinks">
                            <Link><CiMenuBurger /> دسته بندی ها</Link>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
}
