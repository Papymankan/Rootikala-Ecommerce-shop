import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer"
import Input from "../../Components/Input/Input"
import './Cart.css'
import { CiShoppingCart } from "react-icons/ci";
import { LiaShippingFastSolid, LiaTimesSolid } from "react-icons/lia";
import { SlWallet } from "react-icons/sl";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import EntoFa from "../../funcs/EntoFa/EntoFa";
import { Link } from "react-router-dom";
import { maxValidator, minValidator, requiredValidator } from "../../Validation/rules";
import { useForm } from "../../hooks/useForm";
import AuthContext from "../../Context/Context";

export default function Cart() {

    const authContext = useContext(AuthContext)

    const AddShippingMethod = (id) => {
        fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}/shipping-methods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                option_id: id
            })
        }).then(res => res.json()).then(data => {
            authContext.getCart(authContext.userCart.id)
        })
    }
    const [shippings, setShippings] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9000/store/shipping-options/cart_01J32A03NTM8NH9FKY3XBAWRJ7`).then(res => res.json())
            .then(data => setShippings(data.shipping_options))
    }, [])

    const [formState, onInputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            lastName: {
                value: '',
                isValid: false
            },
            city: {
                value: '',
                isValid: false
            },
            post_Code: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },
        }, false
    )

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
                {/* <div className="CartStep">
                    <div>
                        <span>سبد خرید<span>( 2 کالا )</span></span>
                        <button onClick={addAdress}><IoTrashOutline />حذف همه</button>
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
                </div> */}
                <div className="CartAdress">
                    <div className="CartAdress_Inputs">
                        <div className="CartAdress_Title">
                            <span>آدرس تحویل سفارش</span>
                            <button>
                                <MdOutlineAddLocationAlt />
                                آدرس جدید
                            </button>
                        </div>
                        <Input placeholder="نام" id="name"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                        />
                        <Input placeholder="نام خانوادگی" id="lastName"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                        />
                        <Input placeholder="شهر" id="city"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                        />
                        <Input placeholder="کدپستی" id="post_Code"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                            type='number'
                        />
                        <Input element='textarea'
                            placeholder="آدرس"
                            id='address'
                            onInputHandler={onInputHandler}
                            validation={[
                                requiredValidator(),
                                minValidator(5),
                            ]}
                        />
                    </div>
                    <div className="CartAdress_Shippings">
                        {/* <div className="CartAdress_Shipping">
                            <div className="CartAdress_Shipping_Title">
                                <span>تیپاکس</span>
                                <span>{(60000).toLocaleString().EntoFa()} تومان</span>
                            </div>
                            <div className="CartAdress_Shipping_Logo">
                                <img src="/Images/image-removebg-preview.png" />
                            </div>
                        </div>
                        <div className="CartAdress_Shipping">
                            <div className="CartAdress_Shipping_Title">
                                <span>تیپاکس</span>
                                <span>{(60000).toLocaleString().EntoFa()} تومان</span>
                            </div>
                            <div className="CartAdress_Shipping_Logo">
                                <img src="/Images/download-removebg-preview.png" />
                            </div>
                        </div> */}
                        {
                            shippings.length > 0 && shippings.map(shipping => (
                                <div className={authContext.userCart && authContext.userCart.shipping_methods[0].shipping_option.id == shipping.id ? `CartAdress_Shipping CartAdress_Shipping_active` : 'CartAdress_Shipping'} onClick={() => AddShippingMethod(shipping.id)}>
                                    <div className="CartAdress_Shipping_Title">
                                        <span>{shipping.name}</span>
                                        <span>{(shipping.amount).toLocaleString().EntoFa()} تومان</span>
                                    </div>
                                    <div className="CartAdress_Shipping_Logo">
                                        <img src={`/Images/${shipping.metadata.img}`} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="CartPricing">
                    <div className="CartPricing_Price">
                        <span>قیمت کالا ها (2)</span>
                        <span>{(240000000).toLocaleString().EntoFa()} تومان</span>
                    </div>
                    <div className="CartPricing_Price">
                        <span>تخفیف</span>
                        <span>{(1200000).toLocaleString().EntoFa()} تومان</span>
                    </div>
                    <div className="CartPricing_Price">
                        <span>هزینه ارسال</span>
                        <span>{(24000).toLocaleString().EntoFa()} تومان</span>
                    </div>
                    <div className="CartPricing_Price">
                        <span>مبلغ قابل پرداخت</span>
                        <span>{(240000000).toLocaleString().EntoFa()} تومان</span>
                    </div>
                    <button>ادامه فرایند پرداخت</button>
                </div>
            </div>
            <div className="CartPricing_fixed">
                <button>ادامه فرایند پرداخت</button>
                <div>
                    <span>مبلغ قابل پرداخت</span>
                    <span>{(240000000).toLocaleString().EntoFa()} تومان</span>
                </div>
            </div>
            <Footer />
        </>
    );
}
