import React, { useContext } from "react";
import './DashBoardOrders.css'
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import EntoFa from "../../../funcs/EntoFa/EntoFa";
import AuthContext from "../../../Context/Context";
import { Link } from "react-router-dom";

export default function DashBoardOrders() {

    const authContext = useContext(AuthContext)

    return (
        <>
            <div className="dashboard_orders_content">
                <div className="dashboard_content_title">
                    سفارش ها
                </div>
                <div className="dashboard_orders_filters">
                    <div className="dashboard_orders_filter dashboard_orders_filter_active">
                        همه
                    </div>
                    <div className="dashboard_orders_filter">
                        در انتظار ارسال
                    </div>
                    <div className="dashboard_orders_filter">
                        در حال ارسال
                    </div>
                    <div className="dashboard_orders_filter">
                        ارسال شده
                    </div>
                    <div className="dashboard_orders_filter">
                        کنسل شده
                    </div>
                </div>
                <div className="dashboard_orders">
                    {
                        authContext.userInfos.customer && authContext.userInfos.customer.orders ?
                            authContext.userInfos.customer.orders.map(order => {

                                let paid = 0
                                order.items.map(item => {
                                    paid += item.quantity * item.unit_price
                                })

                                let date1 = new Date(`${order.created_at.slice(5, 7)}/${order.created_at.slice(8, 10)}/${order.created_at.slice(0, 4)}`)

                                return (
                                    < div className="dashboard_order" >
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
                                                <div className="dashboard_content_items">
                                                    {
                                                        order.items.map(item => (
                                                            <div className="dashboard_content_item">
                                                                <img src={item.thumbnail} />
                                                                <div>
                                                                    <span>{item.title}</span>
                                                                    <span>تعداد : {item.quantity}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )

                            }) : <div className="alert alert-warning">سفارشی وجود ندارد</div>
                    }

                </div>
            </div >
        </>
    );
}
