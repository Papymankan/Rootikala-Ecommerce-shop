import React, { useContext, useEffect, useRef, useState } from "react";
import './DashBoardMain.css'
import EntoFa from "../../../funcs/EntoFa/EntoFa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineAddLocationAlt, MdOutlineManageAccounts, MdLockOpen , MdOutlineCancel  } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsBox2 } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
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
  const [lastOrder, setLastOrder] = useState({})
  const [paid, setPaid] = useState(0)
  const navigate = useNavigate()


  useEffect(() => {
    orders.current = {
      'cancle': 0,
      'new': 0,
      'fulfilling': 0,
      'shipped': 0
    }

    if (authContext.userInfos.customer && authContext.userInfos.customer.orders && authContext.userInfos.customer.orders.length > 0) {
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

    if (authContext.userInfos.customer && authContext.userInfos.customer.orders && authContext.userInfos.customer.orders.length > 0) {
      let id = 0
      let order1 = {}
      authContext.userInfos.customer.orders.map(order => {
        if (order.display_id > id) {
          id = order.display_id
          order1 = order
        }
      })
      let paid = 0
      order1.items.map(item => {
        paid += item.quantity * item.unit_price
      })
      setPaid(paid)
      setLastOrder(order1)
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
            <div className="dashboard_content_account_action" onClick={() => navigate('/dashboard/account')}>
              <span><MdOutlineManageAccounts /></span>
              تکمیل مشخصات
            </div>
            <div className="dashboard_content_account_action" onClick={() => navigate('/dashboard/password')}>
              <span><MdLockOpen /></span>
              تغییر رمز عبور
            </div>
            <div className="dashboard_content_account_action" onClick={() => navigate('/dashboard/address')}>
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
              <span><LiaShippingFastSolid /></span>
              <div>
                <span>{(orders.current['fulfilling']).toLocaleString().EntoFa()} سفارش</span>
                <span>در حال ارسال</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><BsBox2 /></span>
              <div>
                <span>{(orders.current['shipped']).toLocaleString().EntoFa()} سفارش</span>
                <span>ارسال شده</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdOutlineCancel /></span>
              <div>
                <span>{(orders.current['cancle']).toLocaleString().EntoFa()} سفارش</span>
                <span>کنسل شده</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard_content_account">
          <div className="dashboard_content_account__headerTitle">
            <div className="dashboard_content_account_title">
              <span></span>
              آخرین سفارش
            </div>
            <Link to={'/dashboard/orders'}>
              مشاهده همه
              <IoIosArrowBack />
            </Link>
          </div>
          <div className="dashboard_content_orders">
            {
              lastOrder.id ? (
                <>
                    <div className="dashboard_content_order">
                      <div className="dashboard_content_order_status">
                        {
                          lastOrder.canceled_at ? (
                            <span style={{ color: 'red' }}><MdOutlineManageAccounts />کنسل شده</span>
                          ) : (
                            lastOrder.payment_status == 'awaiting' ? <span style={{ color: '#0EA5E9' }}><MdOutlineManageAccounts /> تایید نشده</span> :
                              <span><MdOutlineManageAccounts /> تایید شده</span>
                          )
                        }
                        <IoIosArrowBack />
                      </div>
                      <div className="dashboard_content_order_detail">
                        {
                          lastOrder.canceled_at ? (
                            <span style={{ color: 'red' }}>کنسل شده</span>
                          ) : (
                            <>
                              {
                                lastOrder.fulfillment_status == 'not_fulfilled' && <span style={{ color: '#0EA5E9' }}>منتظر ارسال</span>
                              }
                              {
                                lastOrder.fulfillment_status == 'fulfilled' && <span style={{ color: '#EAB308' }}>درحال ارسال</span>
                              }
                              {
                                lastOrder.fulfillment_status == 'shipped' && <span>ارسال شده</span>
                              }
                            </>
                          )
                        }

                        <span>مبلغ کل : <span>{(paid).toLocaleString().EntoFa()} <span>تومان</span></span></span>
                        <span><span>تاریخ :</span> {new Date(`${lastOrder.created_at.slice(5, 7)}/${lastOrder.created_at.slice(8, 10)}/${lastOrder.created_at.slice(0, 4)}`).toLocaleDateString('fa-IR')}</span>
                      </div>
                    </div>
                </>
              ) : <div className="alert alert-warning">سفارشی وجود ندارد</div>
            }

          </div>
        </div>
      </div >

    </>
  );
}
