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
import { toast } from "react-toastify";

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
            authContext.setCart(data.cart)
        })
    }

    const addAddress = () => {
        if (!inputDisable) {
            return true
        } else {
            setInputDisable(false)
            onInputSubmit()
        }

    }

    const notify = (text) => toast.error(text, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const completeCart = () => {
        if (!inputDisable) {
            const localData = JSON.parse(localStorage.getItem('user'))
            if (!formState.isFormValid) {
                notify('آدرس و مشخصات سفارش را کامل کنید')
                return true
            }
            let obj = {
                address: {
                    "first_name": formState.inputs.name.value,
                    "last_name": formState.inputs.lastName.value,
                    "address_1": formState.inputs.address.value,
                    "city": formState.inputs.city.value,
                    "country_code": 'ir',
                    "postal_code": formState.inputs.post_Code.value
                }
            }
            if (authContext.userInfos.customer.shipping_addresses) {
                fetch(`http://localhost:9000/store/customers/me/addresses/${authContext.userInfos.customer.shipping_addresses[0].id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localData.token}`
                    },
                    body: JSON.stringify(obj.address)
                }).then(res => res.json()).then(data => {
                    console.log(data);
                    authContext.setCustomer(data)
                })
            } else {
                fetch(`http://localhost:9000/store/customers/me/addresses}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localData.token}`
                    },
                    body: JSON.stringify(obj)
                }).then(res => res.json()).then(data => {
                    console.log(data);
                    authContext.setCustomer(data)
                })
            }

        }
    }
    const [shippings, setShippings] = useState([])
    const [inputDisable, setInputDisable] = useState(false)

    useEffect(() => {
        if (authContext.userCart.id) {
            fetch(`http://localhost:9000/store/shipping-options/${authContext.userCart.id}`).then(res => res.json())
                .then(data => setShippings(data.shipping_options))
        }
        if (authContext.userCart.shipping_address) {
            setInputDisable(true)
        }
    }, [authContext.userCart.id])

    const [formState, onInputHandler, onInputSubmit] = useForm(
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
                            <button onClick={addAddress}>
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
                            disabled={inputDisable}
                            Value={authContext.userCart.shipping_address && authContext.userCart.shipping_address.first_name}
                            state={formState.inputs}
                        />
                        <Input placeholder="نام خانوادگی" id="lastName"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userCart.shipping_address && authContext.userCart.shipping_address.last_name}
                            state={formState.inputs}
                        />
                        <Input placeholder="شهر" id="city"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userCart.shipping_address && authContext.userCart.shipping_address.city}
                            state={formState.inputs}
                        />
                        <Input placeholder="کدپستی" id="post_Code"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            type='number'
                            Value={authContext.userCart.shipping_address && authContext.userCart.shipping_address.postal_code}
                            state={formState.inputs}
                        />
                        <Input element='textarea'
                            placeholder="آدرس"
                            id='address'
                            onInputHandler={onInputHandler}
                            validation={[
                                requiredValidator(),
                                minValidator(5),
                            ]}
                            disabled={inputDisable}
                            Value={authContext.userCart.shipping_address && authContext.userCart.shipping_address.address_1}
                            state={formState.inputs}
                        />
                    </div>
                    <div className="CartAdress_Shippings">
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
                        <span>{authContext.userCart.subtotal && (authContext.userCart.subtotal.toLocaleString()).EntoFa()} تومان</span>
                    </div>
                    {
                        authContext.userCart.discount_total > 0 &&
                        <div className="CartPricing_Price CartPricing_Price_Sale">
                            <span>تخفیف</span>
                            <span>{authContext.userCart.discount_total && (authContext.userCart.discount_total.toLocaleString().EntoFa())} تومان</span>
                        </div>
                    }

                    <div className="CartPricing_Price">
                        <span>هزینه ارسال</span>
                        <span>{authContext.userCart.shipping_total && (authContext.userCart.shipping_total.toLocaleString()).EntoFa()} تومان</span>
                    </div>
                    <div className="CartPricing_Price">
                        <span>مبلغ قابل پرداخت</span>
                        <span>{authContext.userCart.total && (authContext.userCart.total.toLocaleString()).EntoFa()} تومان</span>
                    </div>
                    <button onClick={completeCart}>ادامه فرایند پرداخت</button>
                </div>
            </div>
            <div className="CartPricing_fixed">
                <button onClick={completeCart}>ادامه فرایند پرداخت</button>
                <div>
                    <span>مبلغ قابل پرداخت</span>
                    <span>{authContext.userCart.subtotal && (authContext.userCart.total.toLocaleString()).EntoFa()} تومان</span>
                </div>
            </div>
            <Footer />
        </>
    );
}
