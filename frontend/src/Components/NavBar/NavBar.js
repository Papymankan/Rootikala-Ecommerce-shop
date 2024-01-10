import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger, CiMenuKebab, CiSearch, CiShoppingCart } from "react-icons/ci";
import './NavBar.css'
import MenuBar from "../MenuBar/MenuBar";

export default function NavBar() {

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
              <input type="text" placeholder="جستجو کنید ..."/>
            </div>
          </div>
          <div className="navBarActions">
            <button><CiMenuKebab /></button>
            <button><CiShoppingCart /></button>
          </div>
        </div>


        <div className="navBarContainer2">
          <div className="navBarUp">
            <div className="navBarActions">
              <button><CiMenuBurger /></button>
            </div>

            <div className="navBarLogo">
              <Link to={'/'} className='navBarLogoLink'>
                <img src="https://roti-preview.taymakz.ir/assets/images/logo.svg" className="navBarLogoImg" />
              </Link>
            </div>

            <div className="navBarActions">
              <button><CiMenuKebab /></button>
              <button><CiShoppingCart /></button>
            </div>

          </div>
          <div className="navBarSearch">
            <div className="navBarSearchGroup">
              <button><CiSearch /></button>
              <input type="text" placeholder="جستجو کنید ..."/>
            </div>
          </div>
        </div>

      </div>
      <MenuBar/>
    </>
  );
}
