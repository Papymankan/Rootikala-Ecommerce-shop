import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Input/Input";
import NavBar from "../../Components/NavBar/NavBar";
import { useForm } from "../../hooks/useForm";
import { toast } from 'react-toastify';
import { requiredValidator, minValidator, maxValidator, emailValidator } from '../../Validation/rules'
import AuthContext from "../../Context/Context";

export default function Register() {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

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

    const getToken = (user) => {
        let registeredUser = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        }
        fetch(`http://localhost:9000/store/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registeredUser)
        }).then(res => res.json()).then(data => {
            console.log(data);
            authContext.login(user, data.access_token)
            navigate('/')
        })
    }

    const register = () => {
        if (!formState.inputs.name.isValid) {
            notify('نام و باید حداقل 2 حرفی باشند')
        }
        if (!formState.inputs.lastName.isValid) {
            notify('نام خانوادگی باید حداقل 2 حرفی باشند')
        }
        if (!formState.inputs.email.isValid) {
            notify('ایمیل معتبر نیست')
        }
        if (!formState.inputs.password.isValid) {
            notify('رمز عبور باید حداقل 8 کاراکتر داشته باشد')
        }
        if (formState.inputs.name.isValid && formState.inputs.lastName.isValid &&formState.inputs.email.isValid && formState.inputs.password.isValid) {
            let user = {
                first_name: formState.inputs.name.value,
                last_name: formState.inputs.lastName.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            }
            fetch(`http://localhost:9000/store/customers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => {
                console.log(res);
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res)
            }).then(data => {
                if (data != undefined) {
                    console.log(data)
                    getToken(data)
                }
            }).catch(res => {
                if(res.status == 422){
                    notify('کاربری با چنین ایمیلی قبلا ثبت نام کرده است')
                } else{
                    notify('ثبت نام با مشکل مواجه شد !')
                }
            })
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
                                type='email'
                            />
                            <Input placeholder="رمز عبور" id="password" validation={[
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
