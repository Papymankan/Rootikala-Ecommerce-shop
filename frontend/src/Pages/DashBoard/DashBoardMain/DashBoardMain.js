import React, { useContext, useEffect, useRef, useState } from "react";
import './DashBoardMain.css'
import EntoFa from "../../../funcs/EntoFa/EntoFa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineAddLocationAlt, MdOutlineManageAccounts, MdLockOpen } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/Context";


export default function DashBoardMain() {

  const authContext = useContext(AuthContext)
  const orders = useRef({
    'cancle': 0,
    'new': 0,
    'fulfilling': 0,
    'shipped': 0
  })
  const [status, setStatus] = useState(false)

  useEffect(() => {
    orders.current = {
      'cancle': 0,
      'new': 0,
      'fulfilling': 0,
      'shipped': 0
    }

    if (authContext.userInfos.customer && authContext.userInfos.customer.orders.length > 0) {
      authContext.userInfos.customer.orders.map(order => {
        if (order.canceled_at) {
          orders.current = { ...orders.current, 'cancle': orders.current['cancle'] + 1 }
          return true
        } else if (order.fulfillment_status == 'not_fulfilled') {
          orders.current = { ...orders.current, 'new': orders.current['new'] + 1 }
          return true
        } else if (order.fulfillment_status == 'fulfilled') {
          orders.current = { ...orders.current, 'fulfilling': orders.current['fulfilling'] + 1 }
          return true
        } else if (order.fulfillment_status == 'shipped') {
          orders.current = { ...orders.current, 'shipped': orders.current['shipped'] + 1 }
          return true
        }
      })
      setStatus(true)
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
                <span>{(orders.current['new']).toLocaleString().EntoFa()} سفارش</span>
                <span>در انتظار ارسال</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdLockOpen /></span>
              <div>
                <span>{(orders.current['fulfilling']).toLocaleString().EntoFa()} سفارش</span>
                <span>در حال ارسال</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdOutlineAddLocationAlt /></span>
              <div>
                <span>{(orders.current['shipped']).toLocaleString().EntoFa()} سفارش</span>
                <span>ارسال شده</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdOutlineAddLocationAlt /></span>
              <div>
                <span>{(orders.current['cancle']).toLocaleString().EntoFa()} سفارش</span>
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
            {
              authContext.userInfos.customer && authContext.userInfos.customer.orders.length > 0 ? (
                authContext.userInfos.customer.orders.map(order => {

                  let paid = 0
                  order.items.map(item => {
                    paid += item.quantity * item.unit_price
                  })

                  let date1 = new Date(`${order.created_at.slice(5, 7)}/${order.created_at.slice(8, 10)}/${order.created_at.slice(0, 4)}`)

                  return (
                    <>
                      <Link>
                        <div className="dashboard_content_order">
                          <div className="dashboard_content_order_status">
                            {
                              order.canceled_at ? (
                                <span style={{ color: 'red' }}><MdOutlineManageAccounts />کنسل شده</span>
                              ) : (
                                order.payment_status == 'awaiting' ? <span style={{ color: '#0EA5E9' }}><MdOutlineManageAccounts /> تایید نشده</span> :
                                  <span><MdOutlineManageAccounts /> تایید شده</span>
                              )
                            }
                            <IoIosArrowBack />
                          </div>
                          <div className="dashboard_content_order_detail">
                            {
                              order.canceled_at ? (
                                <span style={{ color: 'red' }}>کنسل شده</span>
                              ) : (
                                <>
                                  {
                                    order.fulfillment_status == 'not_fulfilled' && <span style={{ color: '#0EA5E9' }}>منتظر ارسال</span>
                                  }
                                  {
                                    order.fulfillment_status == 'fulfilled' && <span style={{ color: '#EAB308' }}>درحال ارسال</span>
                                  }
                                  {
                                    order.fulfillment_status == 'shipped' && <span>ارسال شده</span>
                                  }
                                </>
                              )
                            }

                            <span>مبلغ کل : <span>{(paid).toLocaleString().EntoFa()} <span>تومان</span></span></span>
                            <span><span>تاریخ :</span> {date1.toLocaleDateString('fa-IR')}</span>
                          </div>
                        </div>
                      </Link>
                    </>
                  )
                })
              ) : <div className="alert alert-warning">سفارشی وجود ندارد</div>
            }


          </div>
        </div>
      </div>

    </>
  );
}
