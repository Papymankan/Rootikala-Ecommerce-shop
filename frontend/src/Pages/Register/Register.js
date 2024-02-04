import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Input/Input";
import NavBar from "../../Components/NavBar/NavBar";
import { useForm } from "../../hooks/useForm";
import { toast } from 'react-toastify';
import { requiredValidator, minValidator, maxValidator, emailValidator } from '../../Validation/rules'
import AuthContext from "../../Context/Context";

export default function Register() {
    const [user , setUser] = useState({})
    const [token , setToken] = useState(null)

    const authContext = useContext(AuthContext)

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

    const getToken = () => {
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
        }).then(res => res.json()).then(data =>{
            console.log(data);
            setToken(data.access_token)})
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
        if (formState.inputs.name.isValid && formState.inputs.email.isValid && formState.inputs.password.isValid) {
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
            }).then(res => res.json()).then(data => {
                console.log(data)
                setUser(data)
                getToken()
            })
            authContext.login(user, token)
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


// s%3AP9hpqIj1Pc-DNDU75fhQdMtT31GHK81Q.b8XGPyavR%2F2HG8npiwDxXnFE1LDWYR52%2BkvARUHOW84
// s%3AP9hpqIj1Pc-DNDU75fhQdMtT31GHK81Q.b8XGPyavR%2F2HG8npiwDxXnFE1LDWYR52%2BkvARUHOW8