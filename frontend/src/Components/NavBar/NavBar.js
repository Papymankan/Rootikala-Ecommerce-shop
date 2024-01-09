import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import './NavBar.css'

export default function NavBar() {
  return (
    <>
      <div className="navBar">
        <div className="navBarContainer">
          <div className="navBarLogo">
            <Link to={'/'} className='navBarLogoLink'>
              <img src="https://roti-preview.taymakz.ir/assets/images/logo.svg" className="navBarLogoImg"/>
            </Link>
          </div>
          <div className="navBarSearch">
            <div className="navBarSearchGroup">
              <button><CiSearch/></button>
              <input type="text" />
            </div>
          </div>
          <div className="navBarActions">
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
    </>
  );
}
