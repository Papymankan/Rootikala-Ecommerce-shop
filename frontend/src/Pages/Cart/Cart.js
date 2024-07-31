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
import { Link, useNavigate } from "react-router-dom";
import { maxValidator, minValidator, requiredValidator } from "../../Validation/rules";
import { useForm } from "../../hooks/useForm";
import AuthContext from "../../Context/Context";
import { toast } from "react-toastify";

export default function Cart() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

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
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const notify2 = (text) => toast.success(text, {
        position: "top-right",
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

            if (authContext.userInfos.customer.shipping_addresses.length) {
                fetch(`http://localhost:9000/store/customers/me/addresses/${authContext.userInfos.customer.shipping_addresses[0].id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localData.token}`
                    },
                    body: JSON.stringify(obj.address)
                }).then(res => res.json()).then(data => {
                    authContext.setCustomer(data)
                    setInputDisable(true)
                })
            } else {
                fetch(`http://localhost:9000/store/customers/me/addresses`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localData.token}`
                    },
                    body: JSON.stringify(obj)
                }).then(res => res.json()).then(data => {
                    authContext.setCustomer(data)
                    setInputDisable(true)
                })
            }

        }
    }

    const CompletePurchase = () => {
        const localData = JSON.parse(localStorage.getItem('user'))
        if (authContext.userCart.payment_sessions.length == 0) {
            fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}/payment-sessions`, {
                method: 'POST',
            }).then(res => res.json()).then(data => {
                authContext.setCart(data.cart)
                fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}/complete`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(res => res.json()).then(data => {
                    if (data.type == 'order') {
                        notify2('سفارش شما ثبت شد')
                        navigate('/')
                        authContext.DeleteCart()
                    }
                })
            })
        } else {
            fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}/complete`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json()).then(data => {
                if (data.type == 'order') {
                    notify2('سفارش شما ثبت شد')
                    navigate('/')
                    authContext.DeleteCart()
                }
            })
        }
    }

    const IncreaseQuantity = (item) => {
        if (item.quantity < item.variant.inventory_quantity) {
            const updatedQuantity = {
                quantity: item.quantity + 1
            }
            fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}/line-items/${item.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedQuantity)
            }).then(res => res.json())
                .then(data => {
                    authContext.setCart(data.cart)
                })
        } else {
            notify('این تعداد موجود نمی باشد')
        }
    }
    const DecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            const updatedQuantity = {
                quantity: item.quantity - 1
            }
            fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}/line-items/${item.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedQuantity)
            }).then(res => res.json())
                .then(data => {
                    authContext.setCart(data.cart)
                })
        }
    }
    const DeleteItem = (id) => {
        fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}/line-items/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(data => {
                authContext.setCart(data.cart)
            })
    }
    const DeleteAll = () => {
        if (authContext.userCart.items.length) {
            authContext.setLoading(true)
            authContext.userCart.items.map((item, index) => {
                DeleteItem(item.id)
                if (index + 1 == authContext.userCart.items.length) {
                    authContext.setLoading(false)
                }
            })
        }
    }


    const [shippings, setShippings] = useState([])
    const [inputDisable, setInputDisable] = useState(false)
    const [step, setStep] = useState(1)

    useEffect(() => {
        if (authContext.userCart.id) {
            if (authContext.userCart.items.length > 0) {
                fetch(`http://localhost:9000/store/shipping-options/${authContext.userCart.id}`).then(res => res.json())
                    .then(shippingOptions => {
                        if (authContext.userCart.shipping_methods.length == 0) {
                            fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}/shipping-methods`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    option_id: shippingOptions.shipping_options[0].id
                                })
                            }).then(res => res.json())
                                .then(data => {
                                    authContext.setCart(data.cart)
                                    setShippings(shippingOptions.shipping_options)
                                })
                        } else {
                            setShippings(shippingOptions.shipping_options)
                        }
                    })
            }
        }

        if (authContext.userInfos.customer && authContext.userInfos.customer.shipping_addresses.length > 0 && authContext.userInfos.customer.shipping_addresses[0].id && !authContext.userCart.shipping_address.first_name) {
            fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shipping_address: {
                        first_name: authContext.userInfos.customer.shipping_addresses[0].first_name,
                        last_name: authContext.userInfos.customer.shipping_addresses[0].last_name,
                        address_1: authContext.userInfos.customer.shipping_addresses[0].address_1,
                        city: authContext.userInfos.customer.shipping_addresses[0].city,
                        country_code: authContext.userInfos.customer.shipping_addresses[0].country_code,
                        postal_code: authContext.userInfos.customer.shipping_addresses[0].postal_code
                    }
                })
            }).then(res => res.json()).then(data => {
                authContext.setCart(data.cart)
                if (data.cart.shipping_address && data.cart.shipping_address.first_name) {
                    setInputDisable(true)
                }
            })
        } 
        // else if (authContext.userInfos.customer && authContext.userInfos.customer.shipping_addresses.length > 0 && authContext.userCart.shipping_address.first_name && authContext.userCart.shipping_address.first_name != authContext.userInfos.customer.shipping_addresses[0].first_name) {
        //     fetch(`http://localhost:9000/store/carts/${authContext.userCart.id}`, {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             shipping_address: {
        //                 first_name: authContext.userInfos.customer.shipping_addresses[0].first_name,
        //                 last_name: authContext.userInfos.customer.shipping_addresses[0].last_name,
        //                 address_1: authContext.userInfos.customer.shipping_addresses[0].address_1,
        //                 city: authContext.userInfos.customer.shipping_addresses[0].city,
        //                 country_code: authContext.userInfos.customer.shipping_addresses[0].country_code,
        //                 postal_code: authContext.userInfos.customer.shipping_addresses[0].postal_code
        //             }
        //         })
        //     }).then(res => res.json()).then(data => {
        //         authContext.setCart(data.cart)
        //         if (data.cart.shipping_address && data.cart.shipping_address.first_name) {
        //             setInputDisable(true)
        //         }
        //     })
        // }
        else {
            if (authContext.userCart.shipping_address && authContext.userCart.shipping_address.first_name) {
                setInputDisable(true)
            }
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
                <div className={step == 1 ? 'purchaseProductStep purchaseProductStep_active' : 'purchaseProductStep'} onClick={() => {
                    setStep(1)
                }}>
                    <span>
                        <CiShoppingCart />
                        سبد خرید
                    </span>
                </div>
                <div className={step == 2 ? 'purchaseProductStep purchaseProductStep_active' : 'purchaseProductStep'} onClick={() => {
                    if (authContext.userCart.items && authContext.userCart.items.length > 0) {
                        setStep(2)
                    } else {
                        notify('سبد خرید شما خالی است')
                    }
                }}>
                    <span>
                        <LiaShippingFastSolid />
                        شیوه ارسال
                    </span>
                </div>
                <div className={step == 3 ? 'purchaseProductStep purchaseProductStep_active' : 'purchaseProductStep'} onClick={() => {
                    if (authContext.userCart.items && authContext.userCart.items.length > 0) {
                        if (authContext.userCart.shipping_methods.length > 0) {
                            setStep(3)
                            completeCart()
                        } else {
                            notify('شیوه ارسال را انتخاب نمایید')
                            setStep(2)
                        }
                    } else {
                        notify('سبد خرید شما خالی است')
                    }
                }}>
                    <span>
                        <SlWallet />
                        پرداخت
                    </span>
                </div>
            </div>
            <div className="Container" id="CartSteps_Container" style={step == 3 ? ({ justifyContent: 'center' }) : ({ justifyContent: 'space-between' })}>
                {
                    step == 1 && (
                        <div className="CartStep">
                            <div>
                                <span>سبد خرید<span>( {authContext.userCart.items && authContext.userCart.items.length.toLocaleString().EntoFa()} کالا )</span></span>
                                <button onClick={() => DeleteAll()}><IoTrashOutline />حذف همه</button>
                            </div>
                            {
                                authContext.userCart.items && authContext.userCart.items.length > 0 ? authContext.userCart.items.map(item => (
                                    <div className="CartStepItem">
                                        <div>
                                            <div className="CartStepImg">
                                                <span onClick={() => DeleteItem(item.id)}>
                                                    <LiaTimesSolid />
                                                </span>
                                                <img src={item.thumbnail} />
                                            </div>
                                            <div className="quantity">
                                                <FaPlus onClick={() => IncreaseQuantity(item)} />
                                                {item.quantity}
                                                < FaMinus onClick={() => DecreaseQuantity(item)} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="CartStepTitle_Container">
                                                <h3 className="CartStepTitle"><Link>{item.title}</Link></h3>
                                                <div>
                                                    <span style={{ backgroundColor: item.variant.metadata.color }}></span>
                                                    <span>{item.description}</span>
                                                </div>
                                            </div>
                                            <h4>{(item.unit_price * item.quantity).toLocaleString().EntoFa()} تومان</h4>
                                        </div>
                                    </div>
                                )) : <div className="alert alert-warning">سبد خرید شما خالی است</div>
                            }

                        </div>
                    )
                }
                {
                    step == 2 && (
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
                                {
                                    console.log(authContext.userCart.shipping_address)
                                }
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
                                    authContext.userCart.shipping_methods && shippings.length > 0 && shippings.map(shipping => (
                                        <div className={authContext.userCart && authContext.userCart.shipping_methods.length > 0 && authContext.userCart.shipping_methods[0].shipping_option.id == shipping.id ? `CartAdress_Shipping CartAdress_Shipping_active` : 'CartAdress_Shipping'} onClick={() => AddShippingMethod(shipping.id)}>
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
                    )
                }

                <div className="CartPricing" >
                    <div className="CartPricing_Price">
                        <span>قیمت کالا ها ({authContext.userCart.items && authContext.userCart.items.length.toLocaleString().EntoFa()})</span>
                        <span>{authContext.userCart.subtotal && (authContext.userCart.subtotal.toLocaleString()).EntoFa()} تومان</span>
                    </div>
                    {
                        authContext.userCart.discount_total > 0 &&
                        <div className="CartPricing_Price CartPricing_Price_Sale">
                            <span>تخفیف</span>
                            <span>{authContext.userCart.discount_total && (authContext.userCart.discount_total.toLocaleString().EntoFa())} تومان</span>
                        </div>
                    }
                    {
                        authContext.userCart.shipping_total > 0 && <div className="CartPricing_Price">
                            <span>هزینه ارسال</span>
                            <span>{authContext.userCart.shipping_total && (authContext.userCart.shipping_total.toLocaleString()).EntoFa()} تومان</span>
                        </div>
                    }


                    <div className="CartPricing_Price">
                        <span>مبلغ قابل پرداخت</span>
                        <span>{authContext.userCart.total && (authContext.userCart.total.toLocaleString()).EntoFa()} تومان</span>
                    </div>
                    <button onClick={() => {
                        if (step == 1) {
                            if (authContext.userCart.items && authContext.userCart.items.length > 0) {
                                setStep(2)
                            } else {
                                notify('سبد خرید شما خالی است')
                            }
                        } else if (step == 2) {
                            if (authContext.userCart.items && authContext.userCart.items.length > 0) {
                                if (authContext.userCart.shipping_methods.length > 0) {
                                    setStep(3)
                                    completeCart()
                                } else {
                                    notify('شیوه ارسال را انتخاب نمایید')
                                }
                            } else {
                                notify('سبد خرید شما خالی است')
                                setStep(1)
                            }

                        } else if (step == 3) {
                            if (authContext.userCart.items && authContext.userCart.items.length > 0) {
                                CompletePurchase()
                            } else {
                                notify('سبد خرید شما خالی است')
                                setStep(1)
                            }
                        }
                    }}>{step == 3 ? 'پرداخت' : 'ادامه فرایند پرداخت'}</button>
                </div>
            </div>
            <div className="CartPricing_fixed">
                <button onClick={() => {
                    if (step == 1) {
                        if (authContext.userCart.items && authContext.userCart.items.length > 0) {
                            setStep(2)
                        } else {
                            notify('سبد خرید شما خالی است')
                        }
                    } else if (step == 2) {
                        if (authContext.userCart.items && authContext.userCart.items.length > 0) {
                            if (authContext.userCart.shipping_methods.length > 0) {
                                setStep(3)
                                completeCart()
                            } else {
                                notify('شیوه ارسال را انتخاب نمایید')
                            }
                        } else {
                            notify('سبد خرید شما خالی است')
                            setStep(1)
                        }

                    } else if (step == 3) {
                        if (authContext.userCart.items && authContext.userCart.items.length > 0) {
                            CompletePurchase()
                        } else {
                            notify('سبد خرید شما خالی است')
                            setStep(1)
                        }
                    }
                }}>{step == 3 ? 'پرداخت' : 'ادامه فرایند پرداخت'}</button>
                <div>
                    <span>مبلغ قابل پرداخت</span>
                    <span>{authContext.userCart.subtotal && (authContext.userCart.total.toLocaleString()).EntoFa()} تومان</span>
                </div>
            </div>
            <Footer />
        </>
    );
}
