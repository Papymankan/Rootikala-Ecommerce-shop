import React from "react";
import './Footer.css'
import { IoIosArrowUp } from "react-icons/io";
import { FaTelegram, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <>
            <div className="footer">
                <div className="Container">
                    <div className="footerContainer">
                        <div className="footerTop">
                            <div>
                                <span>تلفن پشتیبانی 0000000 - 021</span>
                                <span>|</span>
                                <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
                            </div>
                            <div>
                                <button>برگشت به بالا <IoIosArrowUp /></button>
                            </div>
                        </div>
                        <div className="footerEmail">
                            <span>از جدیدترین تخفیف ها با خبر شوید</span>
                            <div>
                                <input type="text" placeholder="ایمیل شما"/>
                                <button>ثبت</button>
                            </div>
                            <div>
                                <FaXTwitter />
                                <FaInstagram />
                                <FaTelegram />
                            </div>
                        </div>
                        <div className="footerLinks"></div>
                        <div className="footerCopyRight"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
