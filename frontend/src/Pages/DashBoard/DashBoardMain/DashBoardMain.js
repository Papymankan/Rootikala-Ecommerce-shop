import React from "react";
import './DashBoardMain.css'
import EntoFa from "../../../funcs/EntoFa/EntoFa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineAddLocationAlt, MdOutlineManageAccounts, MdLockOpen } from "react-icons/md";


export default function DashBoardMain() {
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
                <span>{(0).toLocaleString().EntoFa()} سفارش</span>
                <span>فعلی</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdLockOpen /></span>
              <div>
                <span>{(0).toLocaleString().EntoFa()} سفارش</span>
                <span>فعلی</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdOutlineAddLocationAlt /></span>
              <div>
                <span>{(0).toLocaleString().EntoFa()} سفارش</span>
                <span>فعلی</span>
              </div>
            </div>
            <div className="dashboard_content_order_action">
              <span><MdOutlineAddLocationAlt /></span>
              <div>
                <span>{(0).toLocaleString().EntoFa()} سفارش</span>
                <span>فعلی</span>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
