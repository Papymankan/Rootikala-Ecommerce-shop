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

export default function NavBar() {

  const [showMenu, setShowMenu] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [categories, setCategories] = useState([])
  const [listedCats, setListedCats] = useState([])
  const authContext = useContext(AuthContext)
  const [cart, setCart] = useState({})

  useEffect(() => {
    fetch(`http://localhost:9000/store/product-categories`, {
    }).then(res => res.json()).then(data => setCategories(data.product_categories))
    // console.log(authContext.userCart);
    // setCart(authContext.userCart)
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
          <Offcanvas.Title>سبد خرید</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="cartSlideBody">

          <div className="cartSlideContainer">
            {
              Object.keys(authContext.userCart).length != 0 ? (
                <>
                  {
                    authContext.userCart.items.length != 0 ? (
                      <>
                        {
                          authContext.userCart && authContext.userCart.items.map(item => (
                            <div className="cartSlideItem">
                              <div className="cartSlideItemImg">
                                <div className="cartSlideCrossBtn">
                                  <LiaTimesSolid />
                                </div>
                                <img src="http://localhost:9000/uploads/1708421712623-503a50201bfdeca14002b8bd006ac2f1cee7c661_1662029535.webp" />
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
                          ))
                        }
                      </>
                    ) : (
                      <div className="alert alert-warning">سبد خرید شما خالی است</div>
                    )
                  }
                </>
              ) : (
                <div className="alert alert-warning">سبد خریدی برای شما وجود ندارد</div>
              )
            }

          </div>

          {
            Object.keys(authContext.userCart).length != 0 && authContext.userCart.items.length != 0 && (
              <div className="cartSlideActions">
                <div>
                  <span>مبلغ قابل پرداخت</span>
                  <span>{(authContext.userCart.subtotal).toLocaleString()} تومان</span>
                </div>
                <div>
                  <button>مشاهده و پرداخت</button>
                </div>
              </div>
            )
          }

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
