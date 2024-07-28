import React, { useContext } from "react";
import './DashBoard.css'
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import AuthContext from "../../Context/Context";
import { FaRegEdit } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiHomeSmile2Line } from "react-icons/ri";
import { MdOutlineAddLocationAlt, MdOutlineManageAccounts } from "react-icons/md";
import { SlLogout } from "react-icons/sl";


export default function DashBoard() {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <>
      <NavBar />
      <div className="Container" id="dashboard_Container">
        <div className="dashboard_Menu">
          <div className="Profile">
            <div className="Profile_Detail">
              <Avatar sx={{ bgcolor: '#10B981', marginLeft: '20px', width: 40, height: 40, display: "flex", justifyContent: 'center', alignItems: 'center', fontSize: '22px' }}>
                {authContext.userInfos.customer && authContext.userInfos.customer.first_name[0]}
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

        </div>
        <div className="dashboard">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

