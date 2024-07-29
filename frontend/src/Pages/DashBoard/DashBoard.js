import React, { useContext, useState } from "react";
import './DashBoard.css'
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import AuthContext from "../../Context/Context";
import { FaRegEdit } from "react-icons/fa";
import { Avatar, Drawer } from "@mui/material";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiHomeSmile2Line } from "react-icons/ri";
import { CiMenuBurger } from "react-icons/ci";
import { MdOutlineAddLocationAlt, MdOutlineManageAccounts } from "react-icons/md";
import { SlLogout } from "react-icons/sl";


export default function DashBoard() {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(true)


  const toggleDrawer = (open) => (event) => {
    console.log('clicked');
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open)
  };

  const DrawerFilter = () => {
    return (
      <div className="Container">
        <button onClick={toggleDrawer(false)} id='filterDrawer_Close'>
          {/* <CloseIcon /> */}
        </button>
        <div className="DrawerFilters">
          <div>
            <h2>فیلتر ها</h2>
            <a>حذف همه</a>
          </div>
          <div className="priceRange">
            <div>محدوده قیمت</div>

            <div className="priceRange_prices">
              {/* <span>{(value[1] / 100 * 50000000).toLocaleString()}<sub>تومان</sub> </span>
              <span>{(value[0] / 100 * 50000000).toLocaleString()}<sub>تومان</sub> </span> */}
            </div>
          </div>
          <div className="FilterToggles">
            <span>فقط کالا های موجود</span>

          </div>
          <div className="FilterToggles">
            <span>فقط کالا های دارای تخفیف</span>

          </div>
        </div>
      </div>
    )
  }

  return (

    <>
      <NavBar />
      <div className="Container" id="dashboard_Container">
        <div className="dashboard_Menu">
          <div className="Profile">
            <div className="Profile_Detail">
              <Avatar sx={{ bgcolor: '#556080', marginLeft: '20px', width: 40, height: 40, display: "flex", justifyContent: 'center', alignItems: 'center', fontSize: '22px' }}>
              </Avatar>

              <div className="Profile_Name">
                <span>{authContext.userInfos.customer && authContext.userInfos.customer.first_name + ' ' + authContext.userInfos.customer.last_name}</span>
                <span>{('09111111111111').toLocaleString().EntoFa()}</span>
              </div>
            </div>
            <FaRegEdit />
          </div>
          <div className="dashboard_Menu_actionList">
            <ul>
              <li className="dashboard_Menu_actionList-active">
                <Link>
                  <RiHomeSmile2Line />
                  <span>پیشخوان</span>
                </Link>
              </li>
              <li>
                <Link>
                  <HiOutlineShoppingBag />
                  <span>سفارش ها</span>
                </Link>
              </li>
              <li>
                <Link>
                  <MdOutlineAddLocationAlt />
                  <span>آدرس</span>
                </Link>
              </li>
              <li>
                <Link>
                  <MdOutlineManageAccounts />
                  <span>اطلاعات حساب کاربری</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => {
                  authContext.logout()
                }} to={'/'}>
                  <SlLogout />
                  <span>خروج</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="Profile2">
            <span>
              <FaRegEdit />
            </span>
            <Avatar sx={{ bgcolor: '#556080', width: 60, height: 60, display: "flex", justifyContent: 'center', alignItems: 'center', fontSize: '22px' }}>
            </Avatar>
            <div className="Profile_Name">
              <span>{authContext.userInfos.customer && authContext.userInfos.customer.first_name + ' ' + authContext.userInfos.customer.last_name}</span>
              <span>{('09111111111111').toLocaleString().EntoFa()}</span>
            </div>
            <button><CiMenuBurger/> منوی کاربری</button>
          </div>
        </div>


        <div className="dashboard">
          <Outlet />
        </div>
      </div>
      <Footer />
      <Drawer
        anchor={'bottom'}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {DrawerFilter()}
      </Drawer>
    </>
  );
}

