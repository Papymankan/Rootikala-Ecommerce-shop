import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger, CiMenuKebab, CiSearch, CiShoppingCart } from "react-icons/ci";
import Avatar from '@mui/material/Avatar';
import { FaPlus, FaMinus } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoSignIn } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import Offcanvas from 'react-bootstrap/Offcanvas';
import './NavBar.css'
import MenuBar from "../MenuBar/MenuBar";
import AuthContext from "../../Context/Context";

export default function NavBar({ listedCats }) {

  const [showMenu, setShowMenu] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const authContext = useContext(AuthContext)


  return (
    <>
      <div className="navBar">
        <div className="navBarContainer">
          <div className="navBarLogo">
            <Link to={'/'} className='navBarLogoLink'>
              <img src="/Images/logo.svg" className="navBarLogoImg" />
            </Link>
          </div>
          <div className="navBarSearch">
            <div className="navBarSearchGroup">
              <button><CiSearch /></button>
              <input type="text" placeholder="جستجو کنید ..." />
            </div>
          </div>
          <div className="navBarActions">
            {authContext.isloggedIn ? (
              <>
                <button onClick={() => {
                  if (showActions) {
                    setShowActions(false)
                  } else {
                    setShowActions(true)
                  }
                }}>
                  <CiMenuKebab />
                </button>
                <button onClick={() => setShowCart(true)}><CiShoppingCart /></button>

                {showActions && <div className="actionMenu" onMouseLeave={() => setShowActions(false)}>
                  <div className="actionMenuList">
                    <ul>
                      <li>
                        <Link>
                          <Avatar sx={{ bgcolor: '#10B981', marginLeft: '10px', width: 30, height: 30, display: "flex", justifyContent: 'center', alignItems: 'center' }}>P</Avatar>
                          {authContext.userInfos.customer.first_name + ' ' + authContext.userInfos.customer.last_name}  <IoIosArrowBack />
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <HiOutlineShoppingBag />سفارش ها
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <HiOutlineShoppingBag />پیام ها
                        </Link>
                      </li>
                      <li>
                        <Link onClick={() => {
                          authContext.logout()
                        }}>
                          <HiOutlineShoppingBag />خروج
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>}
              </>
            ) : (
              <>
                <Link className="navBarRegisterBtn" to={'/login'}>ورود</Link>
                <Link className="navBarRegisterBtn" to={'/register'}>ثبت نام</Link>
              </>
            )
            }

          </div>
        </div>


        <div className="navBarContainer2">
          <div className="navBarUp">
            <div className="navBarActions">
              <button onClick={() => setShowMenu(true)}><CiMenuBurger /></button>
            </div>

            <div className="navBarLogo">
              <Link to={'/'} className='navBarLogoLink'>
                <img src="/Images/logo.svg" className="navBarLogoImg" />
              </Link>
            </div>

            <div className="navBarActions">
              {authContext.isloggedIn ? (
                <>
                  <button onClick={() => {
                    if (showActions) {
                      setShowActions(false)
                    } else {
                      setShowActions(true)
                    }
                  }}>
                    <CiMenuKebab />
                  </button>
                  <button onClick={() => setShowCart(true)}><CiShoppingCart /></button>

                  {showActions && <div className="actionMenu" onMouseLeave={() => setShowActions(false)}>
                    <div className="actionMenuList">
                      <ul>
                        <li>
                          <Link>
                            <Avatar sx={{ bgcolor: '#10B981', marginLeft: '10px', width: 30, height: 30, display: "flex", justifyContent: 'center', alignItems: 'center' }}>P</Avatar>
                            {authContext.userInfos.customer.first_name + ' ' + authContext.userInfos.customer.last_name}  <IoIosArrowBack />
                          </Link>
                        </li>
                        <li>
                          <Link>
                            <HiOutlineShoppingBag />سفارش ها
                          </Link>
                        </li>
                        <li>
                          <Link>
                            <HiOutlineShoppingBag />پیام ها
                          </Link>
                        </li>
                        <li>
                          <Link onClick={() => {
                            authContext.logout()
                          }}>
                            <HiOutlineShoppingBag />خروج
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>}

                </>
              ) : (
                <>
                  <Link className="navBarRegisterBtn" id="navBarRegisterBtnS" to={'/login'}><GoSignIn /></Link>
                </>
              )}
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
      <MenuBar showMenu={showMenu} setShowMenu={setShowMenu} listedCats={listedCats} />

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
                <span className="cartSlideItemTitle">
                  <Link>
                    تیشرت اسپورت مردانه
                  </Link>
                </span>
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
            <div className="cartSlideItem">
              <div className="cartSlideItemImg">
                <div className="cartSlideCrossBtn">
                  <LiaTimesSolid />
                </div>
                <img src="/Images/p2.png" alt="" />
              </div>
              <div className="cartSlideItemDetail">
                <span className="cartSlideItemTitle">
                  <Link>
                    تیشرت اسپورت مردانه
                  </Link>
                </span>
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
            <div className="cartSlideItem">
              <div className="cartSlideItemImg">
                <div className="cartSlideCrossBtn">
                  <LiaTimesSolid />
                </div>
                <img src="/Images/p2.png" alt="" />
              </div>
              <div className="cartSlideItemDetail">
                <span className="cartSlideItemTitle">
                  <Link>
                    تیشرت اسپورت مردانه
                  </Link>
                </span>
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
            <div className="cartSlideItem">
              <div className="cartSlideItemImg">
                <div className="cartSlideCrossBtn">
                  <LiaTimesSolid />
                </div>
                <img src="/Images/p2.png" alt="" />
              </div>
              <div className="cartSlideItemDetail">
                <span className="cartSlideItemTitle">
                  <Link>
                    تیشرت اسپورت مردانه
                  </Link>
                </span>
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
            <div className="cartSlideItem">
              <div className="cartSlideItemImg">
                <div className="cartSlideCrossBtn">
                  <LiaTimesSolid />
                </div>
                <img src="/Images/p2.png" alt="" />
              </div>
              <div className="cartSlideItemDetail">
                <span className="cartSlideItemTitle">
                  <Link>
                    تیشرت اسپورت مردانه
                  </Link>
                </span>
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
            <div className="cartSlideItem">
              <div className="cartSlideItemImg">
                <div className="cartSlideCrossBtn">
                  <LiaTimesSolid />
                </div>
                <img src="/Images/p2.png" alt="" />
              </div>
              <div className="cartSlideItemDetail">
                <span className="cartSlideItemTitle">
                  <Link>
                    تیشرت اسپورت مردانه
                  </Link>
                </span>
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
