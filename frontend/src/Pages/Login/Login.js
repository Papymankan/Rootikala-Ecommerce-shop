import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import './Login.css'

export default function Login() {
    return (
        <>
            <NavBar />
            <div className="LoginSection">
                <div className="Container">
                    <div className="LoginRow">
                        <div className="LoginCard">
                            <img src="/Images/logo.svg" className="navBarLogoImg" />
                            <span>ورود به حساب کاربری</span>
                            <input type="text" placeholder="ایمیل خود را وارد کنید"/>
                            <input type="text" placeholder="رمز عبور خود را وارد کنید"/>
                            <button>ورود</button>
                            <span>حساب کاربری ندارید؟  <Link>ثبت نام</Link></span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
