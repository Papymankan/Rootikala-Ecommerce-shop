import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import './Cart.css'
import { CiShoppingCart } from "react-icons/ci";
import { LiaShippingFastSolid, LiaTimesSolid } from "react-icons/lia";
import { SlWallet } from "react-icons/sl";
import { IoTrashOutline } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import EntoFa from "../../funcs/EntoFa/EntoFa";
import { Link } from "react-router-dom";

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
                        <span>سبد خرید<span>( 2 کالا )</span></span>
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
                        <div>
                            <div className="CartStepTitle_Container">
                                <h3 className="CartStepTitle"><Link>کفش مدل نیوبالانس</Link></h3>
                                <div>
                                    <span></span>
                                    <span>39 / آبی</span>
                                </div>
                            </div>
                            <h4>{(1200000).toLocaleString().EntoFa()} تومان</h4>
                        </div>
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
                        <div>
                            <div className="CartStepTitle_Container">
                                <h3 className="CartStepTitle"><Link>کفش مدل نیوبالانس</Link></h3>
                                <div>
                                    <span></span>
                                    <span>39 / آبی</span>
                                </div>
                            </div>
                            <h4>{(1200000).toLocaleString().EntoFa()} تومان</h4>
                        </div>
                    </div>
                </div>
                <div className="CartPrice">

                </div>
            </div>
        </>
    );
}
