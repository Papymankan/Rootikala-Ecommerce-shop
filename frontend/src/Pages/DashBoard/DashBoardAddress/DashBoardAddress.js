import React, { useContext, useState } from "react";
import './DashBoardAddress.css'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { maxValidator, minValidator, requiredValidator, emailValidator , phoneValidator } from "../../../Validation/rules";
import AuthContext from "../../../Context/Context";
import Input from "../../../Components/Input/Input"
import { useForm } from "../../../hooks/useForm";

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

    return (
        <>
            <div className="dashboard_address_content">
                <div className="dashboard_content_headerTitle">
                    <div className="dashboard_content_title">
                        اطلاعات حساب کاربری
                    </div>
                    <button><FaRegEdit /> ویرایش اطلاعات</button>
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
                        <Input placeholder="ایمیل" id="lastName"
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
                <button>ثبت اطلاعات جدید</button>
            </div>
        </>
    );
}


