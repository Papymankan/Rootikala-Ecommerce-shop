import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Input/Input";
import NavBar from "../../Components/NavBar/NavBar";
import AuthContext from "../../Context/Context";
import { useForm } from "../../hooks/useForm";
import { emailValidator, maxValidator, minValidator, requiredValidator } from "../../Validation/rules";
import './Login.css'

export default function Login() {
    const [formState, onInputHandler] = useForm(
        {
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
    const notify2 = (text) => toast.warning(text, {
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

    const Login = () => {
        if (!formState.inputs.email.isValid) {
            notify('ایمیل معتبر نیست')
        }
        if (!formState.inputs.password.isValid) {
            notify('رمز عبور باید حداقل 8 کاراکتر داشته باشد')
        }
        if(formState.inputs.email.isValid && formState.inputs.password.isValid){
            let user = {
                email : formState.inputs.email.value,
                password : formState.inputs.password.value,
            }
            fetch('http://localhost:9000/store/auth' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => {
                console.log(res)
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(res)
            }).then(data => {
                console.log(data);
                if(data != undefined){
                    getToken(data)
                }
            }).catch(res => {
                if(res.status == 401){
                    notify('چنین کاربری وجود ندارد')
                    notify2('ایمیل و رمزعبور خود را مجدد بررسی کنید')
                }else{
                    notify('ورود با مشکل مواجه شد !')
                }
            })
        }
    }

    return (
        <>
            <NavBar />
            <div className="LoginSection">
                <div className="Container">
                    <div className="LoginRow">
                        <div className="LoginCard">
                            <img src="/Images/logo.svg" className="navBarLogoImg" />
                            <span>ورود به حساب کاربری</span>
                            <Input placeholder="ایمیل" id="email"
                                validation={[
                                    requiredValidator(),
                                    emailValidator()
                                ]}
                                onInputHandler={onInputHandler}
                                type='email'
                            />

                            <Input placeholder="رمز عبور" id="password"
                                validation={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(16)
                                ]}
                                onInputHandler={onInputHandler}
                                type="password"
                            />

                            <button onClick={Login}>ورود</button>
                            <span>حساب کاربری ندارید؟  <Link to={`/register`}>ثبت نام</Link></span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
