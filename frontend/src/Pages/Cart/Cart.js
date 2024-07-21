import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import './Cart.css'
import { CiShoppingCart } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { SlWallet } from "react-icons/sl";

export default function Cart() {
    return (
        <>
            <NavBar />
            <div className="Container" id="purchaseProductSteps_Container">
                <div className="purchaseProductStep">
                    <span>
                        <CiShoppingCart/>
                        سبد خرید
                    </span>
                </div>
                <div className="purchaseProductStep">
                    <span>
                        <LiaShippingFastSolid/>
                        شیوه ارسال
                    </span>
                </div>
                <div className="purchaseProductStep">
                    <span>
                        <SlWallet/>
                        پرداخت
                    </span>
                </div>
            </div>
        </>
    );
}
