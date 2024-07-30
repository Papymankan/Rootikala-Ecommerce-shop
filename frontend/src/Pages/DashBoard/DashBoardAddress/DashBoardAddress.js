import React, { useContext, useState } from "react";
import './DashBoardAddress.css'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { maxValidator, minValidator, requiredValidator, emailValidator, phoneValidator } from "../../../Validation/rules";
import AuthContext from "../../../Context/Context";
import Input from "../../../Components/Input/Input"
import { useForm } from "../../../hooks/useForm";
import { toast } from "react-toastify";

export default function DashBoardAddress() {

    const [inputDisable, setInputDisable] = useState(true)

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
            phone: {
                value: '',
                isValid: false
            },
            email: {
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

    const updateUser = () => {
        const localData = JSON.parse(localStorage.getItem('user'))

        fetch(`http://localhost:9000/store/customers/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localData.token}`
            },
            body: JSON.stringify({
                first_name : formState.inputs.name.value,
                last_name : formState.inputs.lastName.value,
                email : formState.inputs.email.value,
                phone : formState.inputs.phone.value
            })
        }).then(res => {
            if(res.ok){
                setInputDisable(true)
                notify2('اطلاعات ویرایش شد')
            }
            return res.json()
        }).then(data => {
            console.log(data);
        })
    }


    return (
        <>
            <div className="dashboard_account_content">
                <div className="dashboard_content_headerTitle">
                    <div className="dashboard_content_title">
                        اطلاعات حساب کاربری
                    </div>
                    <button onClick={() => setInputDisable(false)}><FaRegEdit /> ویرایش اطلاعات</button>
                </div>
                <div className="dashboard_content_inputs">
                    <div className="dashboard_content_input" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>نام</span>
                            <span><FaCheck /></span>
                        </div>
                        <Input placeholder="نام" id="name"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.first_name}
                            state={formState.inputs}
                        />

                    </div>

                    <div className="dashboard_content_input" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>نام خانوادگی</span>
                            <span><FaCheck /></span>
                        </div>
                        <Input placeholder="نام خانوادگی" id="lastName"
                            validation={[
                                requiredValidator(),
                                minValidator(2),
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.last_name}
                            state={formState.inputs}
                        />
                    </div>

                    <div className="dashboard_content_input" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>شماره تماس</span>
                            <span><FaCheck /></span>
                        </div>
                        <Input placeholder="شماره تماس" id="phone"
                            validation={[
                                requiredValidator(),
                                phoneValidator()
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.phone ? authContext.userInfos.customer.phone : 'ثبت نشده است'}
                            state={formState.inputs}
                        />
                    </div>

                    <div className="dashboard_content_input" style={!inputDisable ? ({ backgroundColor: 'white' }) : ({})}>
                        <div>
                            <span>ایمیل</span>
                            <span><FaCheck /></span>
                        </div>
                        <Input placeholder="ایمیل" id="email"
                            validation={[
                                requiredValidator(),
                                emailValidator()
                            ]}
                            onInputHandler={onInputHandler}
                            disabled={inputDisable}
                            Value={authContext.userInfos.customer && authContext.userInfos.customer.email}
                            state={formState.inputs}
                        />
                    </div>
                </div>
                {
                    !inputDisable && <button disabled={inputDisable} onClick={updateUser}>ثبت اطلاعات جدید</button>
                }

            </div>
        </>
    );
}


