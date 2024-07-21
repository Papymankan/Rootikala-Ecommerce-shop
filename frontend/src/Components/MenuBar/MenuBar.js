import React, { useEffect, useState } from "react";
import { CiHome, CiMenuBurger, CiMenuKebab, CiShoppingBasket, CiSquareChevLeft } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { SlFire } from "react-icons/sl";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoIosArrowBack, IoMdArrowDropleft } from "react-icons/io";
import { Link } from "react-router-dom";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import './MenuBar.css'

export default function MenuBar({ showMenu, setShowMenu, listedCats }) {

    const [scroll, setScroll] = useState(0)
    const [topBarShow, setTopBarShow] = useState(true)
    const [showMegaMenu, setShowMegaMenu] = useState(false)
    const [listedCategories, setListedCats] = useState([])
    const [activeCat, setActiveCat] = useState('مردانه')

    const folder = {
        name: "",
        children:
            listedCategories.map(category => {
                return {
                    name: category.name,
                    id: category.id,
                    children:
                        category.childs.map(child => {
                            return {
                                name: child.name,
                                id: child.id,
                                children:
                                    child.category_children.map(category_child => {
                                        return {
                                            name: category_child.name,
                                            id: category_child.id
                                        }
                                    })

                            }
                        })

                }
            })

    };

    const data = flattenTree(folder);
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

    const ArrowIcon = ({ isOpen, className }) => {
        const baseClass = "arrow";
        const classes = cx(
            baseClass,
            { [`${baseClass}--closed`]: !isOpen },
            { [`${baseClass}--open`]: isOpen },
            className
        );
        return <IoMdArrowDropleft className={classes} />;
    };

    useEffect(() => {
        setListedCats(listedCats)
    }, [listedCats])

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
                        <Link to={'/sales'}>
                            <span className="Blinking_Spot"></span> فروش ویژه
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
                                        listedCategories && listedCategories.map(cat => (
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
                                        activeCat && listedCategories.map(cat => cat.name == activeCat &&
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
                            <img src="/Images/logo.svg" className="SlideBarLogoImg" />
                        </Link>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="SlideBarLinksList">
                        <li className="SlideBarLinks">
                            <Link to={'/'}><CiHome /> صفحه اصلی</Link>
                        </li>
                        <li className="SlideBarLinks">
                            <Link to={'/sales'}><SlFire /> فروش ویژه</Link>
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
                    <TreeView
                        data={data}
                        aria-label="Controlled expanded node tree"
                        // expandedIds={expandedIds}
                        defaultExpandedIds={[1]}
                        nodeRenderer={({
                            element,
                            isBranch,
                            isExpanded,
                            isDisabled,
                            getNodeProps,
                            level,
                            handleExpand,
                        }) => {
                            return (
                                <>
                                    <div
                                        {...getNodeProps({ onClick: handleExpand })}
                                        style={{
                                            marginRight: 30 * (level - 1),
                                            opacity: isDisabled ? 0.5 : 1,
                                            padding: '7px 0'
                                        }}
                                    >
                                        <Link className="name" to={`/category/${element.id}`}>
                                            {element.name}
                                        </Link>
                                        {isBranch && <ArrowIcon isOpen={isExpanded} />}
                                    </div>
                                </>
                            );
                        }}
                    />
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
}
