import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger, CiMenuKebab, CiSearch, CiShoppingCart } from "react-icons/ci";
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
            <button onClick={()=>setShowCart(true)}><CiShoppingCart /></button>
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
              <button onClick={()=>setShowCart(true)}><CiShoppingCart /></button>
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
          <div className="cartSlideContainer"></div>
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
