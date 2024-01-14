import React from "react";
import './Footer.css'
import { IoIosArrowUp } from "react-icons/io";
import { FaTelegram, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";


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
                        <div className="footerLinks">
                            <div>
                                <div>
                                    <h2>روتی کالا</h2>
                                    <Link>شرایط مرجوعی</Link>
                                    <Link>راهنمای خرید</Link>
                                    <Link>قوانین</Link>
                                </div>
                                <div>
                                    <h2>دسترسی سریع</h2>
                                    <Link>پیگیری سفارسات</Link>
                                    <Link>تماس با ما</Link>
                                    <Link>درباره ما</Link>
                                </div>
                            </div>
                            <div>
                                <img src="Images/samandehi.webp" alt="" />
                                <img src="Images/etemad.png" alt="" />
                            </div>
                        </div>
                        <div className="footerCopyRight">
                        کلیه حقوق این سایت متعلق به فروشگاه روتی کالا می‌باشد.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
