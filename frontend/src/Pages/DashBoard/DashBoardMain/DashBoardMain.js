import React, { useContext, useEffect, useState } from "react";
import './DashBoardMain.css'
import EntoFa from "../../../funcs/EntoFa/EntoFa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineAddLocationAlt, MdOutlineManageAccounts, MdLockOpen } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/Context";


export default function DashBoardMain() {

  const authContext = useContext(AuthContext)
  const [orders, setOrders] = useState({
    'cancle': 0,
    'new': 0,
    'fulfilling': 0,
    'shipped': 0
  })

  useEffect(() => {
    setOrders({
      'cancle': 0,
      'new': 0,
      'fulfilling': 0,
      'shipped': 0
    })
    if (authContext.userInfos.customer && authContext.userInfos.customer.orders.length > 0) {
      authContext.userInfos.customer.orders.map(order => {
        if (order.canceled_at) {
          setOrders({ ...orders, 'cancle': orders['cancle'] + 1 })
          return true
        } else if (order.fulfillment_status == 'not_fulfilled') {
          setOrders({ ...orders, 'new': orders['new'] + 1 })
          return true
        } else if (order.fulfillment_status == 'fulfilled') {
          setOrders({ ...orders, 'fulfilling': orders['fulfilling'] + 1 })
          return true
        } else if (order.fulfillment_status == 'shipped') {
          setOrders({ ...orders, 'shipped': orders['shipped'] + 1 })
          return true
        }
      })
    }
  }, [authContext.userInfos])

  return (
    <>
      <div className="dashboard_content">
        <div className="dashboard_content_title">
          پیشخوان
        </div>
        <div className="dashboard_content_account">
          <div className="dashboard_content_account_title">
            <span></span>
            حساب کاربری
          </div>
          <div className="dashboard_content_account_actions">
            <div className="dashboard_content_account_action">
              <span><MdOutlineManageAccounts /></span>
              تکمیل مشخصات
            </div>
            <div className="dashboard_content_account_action">
              <span><MdLockOpen /></span>
              تغییر رمز عبور
            </div>
            <div className="dashboard_content_account_action">
              <span><MdOutlineAddLocationAlt /></span>
              آدرس ها
            </div>
          </div>
        </div>

        <div className="dashboard_content_account">
          <div className="dashboard_content_account_title">
            <span></span>
            وضعیت سفارش های شما
          </div>
          <div className="dashboard_content_account_actions">
            <div className="dashboard_content_order_action">
              <span><HiOutlineShoppingBag /></span>
              <div>
                <span>{(orders['new']).toLocaleString().EntoFa()} سفارش</span>
                <span>در انتظار ارسال</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdLockOpen /></span>
              <div>
                <span>{(orders['fulfilling']).toLocaleString().EntoFa()} سفارش</span>
                <span>در حال ارسال</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdOutlineAddLocationAlt /></span>
              <div>
                <span>{(orders['shipped']).toLocaleString().EntoFa()} سفارش</span>
                <span>ارسال شده</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdOutlineAddLocationAlt /></span>
              <div>
                <span>{(orders['cancle']).toLocaleString().EntoFa()} سفارش</span>
                <span>کنسل شده</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard_content_account">
          <div className="dashboard_content_account_title">
            <span></span>
            سفارشات
          </div>
          <div className="dashboard_content_orders">
            <Link>
              <div className="dashboard_content_order">
                <div className="dashboard_content_order_status">
                  <span><MdOutlineManageAccounts /> تایید شده</span>
                  <IoIosArrowBack />
                </div>
                <div className="dashboard_content_order_detail">
                  <span>در حال بارگیری</span>
                  <span>مبلغ کل : <span>{(12000000).toLocaleString().EntoFa()} <span>تومان</span></span></span>
                  <span><span>تاریخ :</span> 3 / 12 / 1402</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}
