import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Input/Input";
import NavBar from "../../Components/NavBar/NavBar";
import { useForm } from "../../hooks/useForm";
import { toast } from 'react-toastify';
import { requiredValidator, minValidator, maxValidator, emailValidator } from '../../Validation/rules'

export default function Register() {
    const notify = (text) => toast.error(text, {
        position: "bottom-right",
        autoClose: 25000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    // useEffect(() => {
    //     notify()
    // }, [])

    const register = ()=>{
        if(!formState.inputs.name.isValid){
            notify('نام و نام خانوادگی باید حداقل 2 حرفی باشند')
        }
        if(!formState.inputs.email.isValid){
            notify('ایمیل معتبر نیست')
        }
        if(!formState.inputs.password.isValid){
            notify('رمز عبور باید حداقل 8 کاراکتر داشته باشد')
        }
    }

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
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
        }, false
    )

    return (
        <>
            <NavBar />
            <div className="LoginSection">
                <div className="Container">
                    <div className="LoginRow">
                        <div className="LoginCard">
                            <img src="/Images/logo.svg" className="navBarLogoImg" />
                            <span>ساخت حساب کاربری</span>
                            <Input placeholder="نام" id="name" validation={[
                                requiredValidator(),
                                minValidator(2),
                                maxValidator(14)
                            ]}
                                onInputHandler={onInputHandler}
                            />
                            <Input placeholder="نام خانوادگی" id="lastName" validation={[
                                requiredValidator(),
                                minValidator(2),
                                maxValidator(14)
                            ]}
                                onInputHandler={onInputHandler}
                            />
                            <Input placeholder="ایمیل" id="email" validation={[
                                requiredValidator(),
                                emailValidator()
                            ]}
                                onInputHandler={onInputHandler}
                            />
                            <Input placeholder="رمز عبور" id="lastName" validation={[
                                requiredValidator(),
                                minValidator(8),
                                maxValidator(16)
                            ]}
                                onInputHandler={onInputHandler}
                                type="password"
                            />
                            <button onClick={register}>ثبت نام</button>
                            <span>حساب کاربری دارید؟  <Link to={`/login`}>ورود</Link></span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
