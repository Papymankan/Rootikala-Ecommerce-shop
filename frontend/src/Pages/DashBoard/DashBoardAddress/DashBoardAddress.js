import React, { useContext, useEffect, useState } from "react";
import './DashBoardAddress.css'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { maxValidator, minValidator, requiredValidator, emailValidator, phoneValidator } from "../../../Validation/rules";
import AuthContext from "../../../Context/Context";
import Input from "../../../Components/Input/Input"
import { useForm } from "../../../hooks/useForm";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";

export default function DashBoardAddress() {

    const [inputDisable, setInputDisable] = useState(false)

    const authContext = useContext(AuthContext)

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
            postal_code: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },

        }, false
    )

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

    const updateUser = () => {
        if (!inputDisable) {
            const localData = JSON.parse(localStorage.getItem('user'))

            if (!formState.isFormValid) {
                notify('آدرس و مشخصات را کامل کنید')
                return true
            }

            let obj = {
                address: {
                    "first_name": formState.inputs.name.value,
                    "last_name": formState.inputs.lastName.value,
                    "address_1": formState.inputs.address.value,
                    "city": formState.inputs.city.value,
                    "country_code": 'ir',
                    "postal_code": formState.inputs.postal_code.value
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
                    notify2('آدرس با موفقیت ویرایش شد')
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
                    notify2('آدرس با موفقیت ثبت شد')
                })
            }

        }
    }

    useEffect(() => {
        if (authContext.userInfos.customer && authContext.userInfos.customer.shipping_addresses.length > 0 && authContext.userInfos.customer.shipping_addresses[0].first_name) {
            setInputDisable(true)
        } else {
            setInputDisable(false)
        }
    }, [authContext.userInfos.customer])


    return (
        <>
            <div className="dashboard_account_content">
                <div className="dashboard_content_headerTitle">
                    <div className="dashboard_content_title">
                        آدرس
                    </div>
                    <button onClick={() => setInputDisable(false)}><FaRegEdit /> ویرایش آدرس</button>
                </div>
                <div className="dashboard_content_inputs">
                    <div className="dashboard_content_input" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>نام</span>
                            {
                                formState.inputs.name.isValid ? <span><FaCheck /></span> : <span style={{color:'red'}}><CloseIcon /></span>
                            }
                        </div>
                        <Input placeholder="نام" id="name"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.shipping_addresses.length > 0 && authContext.userInfos.customer.shipping_addresses[0].first_name}
                            state={formState.inputs}
                        />
                    </div>
                    <div className="dashboard_content_input" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>نام خانوادگی</span>
                            {
                                formState.inputs.lastName.isValid ? <span><FaCheck /></span> : <span style={{color:'red'}}><CloseIcon /></span>
                            }
                        </div>
                        <Input placeholder="نام خانوادگی" id="lastName"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.shipping_addresses.length > 0 && authContext.userInfos.customer.shipping_addresses[0].last_name}
                            state={formState.inputs}
                        />
                    </div>

                    <div className="dashboard_content_input" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>شهر</span>
                            {
                                formState.inputs.city.isValid ? <span><FaCheck /></span> : <span style={{color:'red'}}><CloseIcon /></span>
                            }
                        </div>
                        <Input placeholder="شهر" id="city"
                            validation={[
                                requiredValidator(),
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.shipping_addresses.length > 0 && authContext.userInfos.customer.shipping_addresses[0].city}
                            state={formState.inputs}
                        />
                    </div>

                    <div className="dashboard_content_input" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>کد پستی</span>
                            {
                                formState.inputs.postal_code.isValid ? <span><FaCheck /></span> : <span style={{color:'red'}}><CloseIcon /></span>
                            }
                        </div>
                        <Input placeholder="کد پستی" id="postal_code"
                            validation={[
                                requiredValidator(),
                            ]}
                            type='number'
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.shipping_addresses.length > 0 && authContext.userInfos.customer.shipping_addresses[0].postal_code}
                            state={formState.inputs}
                        />
                    </div>
                    <div className="dashboard_content_input" id="dashboard_content_input_textarea" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>آدرس</span>
                            {
                                formState.inputs.address.isValid ? <span><FaCheck /></span> : <span style={{color:'red'}}><CloseIcon /></span>
                            }
                        </div>
                        <Input placeholder="آدرس" id="address"
                            validation={[
                                requiredValidator(),
                            ]}
                            onInputHandler={onInputHandler}
                            element='textarea'
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.shipping_addresses.length > 0 && authContext.userInfos.customer.shipping_addresses[0].address_1}
                            state={formState.inputs}
                        />
                    </div>
                </div>
                {
                    !inputDisable && <button disabled={inputDisable} onClick={updateUser}>ثبت آدرس جدید</button>
                }

            </div>
        </>
    );
}


