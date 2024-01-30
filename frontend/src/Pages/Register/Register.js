import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";

export default function Register() {
    return (
        <>
            <NavBar />
            <div className="LoginSection">
                <div className="Container">
                    <div className="LoginRow">
                        <div className="LoginCard">
                            <img src="/Images/logo.svg" className="navBarLogoImg" />
                            <span>ساخت حساب کاربری</span>
                            <input type="text" placeholder="نام"/>
                            <input type="text" placeholder="نام خانوادگی"/>
                            <input type="text" placeholder="ایمیل"/>
                            <input type="text" placeholder="رمز عبور"/>
                            <button>ثبت نام</button>
                            <span>حساب کاربری دارید؟  <Link to={`/login`}>ورود</Link></span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
