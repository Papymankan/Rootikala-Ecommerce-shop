import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger, CiMenuKebab, CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import Offcanvas from 'react-bootstrap/Offcanvas';
import './NavBar.css'
import MenuBar from "../MenuBar/MenuBar";

export default function NavBar() {

  const [showMenu, setShowMenu] = useState(false)
  const [showCart, setShowCart] = useState(true)


  return (
    <>
      <div className="navBar">
        <div className="navBarContainer">
          <div className="navBarLogo">
            <Link to={'/'} className='navBarLogoLink'>
              <img src="https://roti-preview.taymakz.ir/assets/images/logo.svg" className="navBarLogoImg" />
            </Link>
          </div>
          <div className="navBarSearch">
            <div className="navBarSearchGroup">
              <button><CiSearch /></button>
              <input type="text" placeholder="جستجو کنید ..." />
            </div>
          </div>
          <div className="navBarActions">
            <button><CiMenuKebab /></button>
            <button onClick={() => setShowCart(true)}><CiShoppingCart /></button>
          </div>
        </div>


        <div className="navBarContainer2">
          <div className="navBarUp">
            <div className="navBarActions">
              <button onClick={() => setShowMenu(true)}><CiMenuBurger /></button>
            </div>

            <div className="navBarLogo">
              <Link to={'/'} className='navBarLogoLink'>
                <img src="https://roti-preview.taymakz.ir/assets/images/logo.svg" className="navBarLogoImg" />
              </Link>
            </div>

            <div className="navBarActions">
              <button><CiMenuKebab /></button>
              <button onClick={() => setShowCart(true)}><CiShoppingCart /></button>
            </div>

          </div>
          <div className="navBarSearch">
            <div className="navBarSearchGroup">
              <button><CiSearch /></button>
              <input type="text" placeholder="جستجو کنید ..." />
            </div>
          </div>
        </div>

      </div>
      <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} />

      <Offcanvas show={showCart} onHide={setShowCart}>
        <Offcanvas.Header closeButton className="cartSlideHeader">
          <Offcanvas.Title>سبد خرید (5)</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="cartSlideBody">

          <div className="cartSlideContainer">
            <div className="cartSlideItem">
              <div className="cartSlideItemImg">
                <div className="cartSlideCrossBtn">
                  <LiaTimesSolid />
                </div>
                <img src="/Images/p2.png" alt="" />
              </div>
              <div className="cartSlideItemDetail">
                <span className="cartSlideItemTitle"></span>
                <div>تعداد : 2  | سایز : 42</div>
                <div>
                  <span>{(1350000).toLocaleString()} تومان</span>
                  <div className="quantity">
                    <FaPlus />
                    2
                    <FaMinus />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cartSlideActions">
            <div>
              <span>مبلغ قابل پرداخت</span>
              <span>{(1350000).toLocaleString()} تومان</span>
            </div>
            <div>
              <button>مشاهده و پرداخت</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
