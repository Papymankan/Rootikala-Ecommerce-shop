import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import './Cart.css'
import { CiShoppingCart } from "react-icons/ci";
import { LiaShippingFastSolid, LiaTimesSolid } from "react-icons/lia";
import { SlWallet } from "react-icons/sl";
import { IoTrashOutline } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Cart() {
    return (
        <>
            <NavBar />
            <div className="Container" id="purchaseProductSteps_Container">
                <div className="purchaseProductStep">
                    <span>
                        <CiShoppingCart />
                        سبد خرید
                    </span>
                </div>
                <div className="purchaseProductStep">
                    <span>
                        <LiaShippingFastSolid />
                        شیوه ارسال
                    </span>
                </div>
                <div className="purchaseProductStep">
                    <span>
                        <SlWallet />
                        پرداخت
                    </span>
                </div>
            </div>
            <div className="Container" id="CartSteps_Container">
                <div className="CartStep">
                    <div>
                        <span>سبد خرید</span>
                        <button><IoTrashOutline />حذف همه</button>
                    </div>
                    <div className="CartStepItem">
                        <div>
                            <div className="CartStepImg">
                                <span>
                                    <LiaTimesSolid />
                                </span>
                                <img src="http://localhost:9000/uploads/1705775340738-p2.png" />
                            </div>
                            <div className="quantity">
                                <FaPlus />
                                3
                                < FaMinus />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="CartPrice">

                </div>
            </div>
        </>
    );
}
