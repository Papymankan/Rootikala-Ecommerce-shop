import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../Context/Context";

export default function PrivateRoute2({ children }) {

    const pageRender = useRef(false)

    const authContext = useContext(AuthContext)
    const notify = (text) => toast.warning(text, {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const navigate = useNavigate()

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('user'))
        if (!localData) {
            navigate('/login')
            notify('برای مشاهده ابتدا وارد حساب کاربری خود شوید')
        }
    }, [authContext.userInfos])

    return (
        <>
            {children}
        </>
    );
}
