import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../Context/Context";

export default function PrivateRoute({ children }) {

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
        if (!authContext.isloggedIn) {
            console.log(authContext.userInfos.id);
            navigate('/login')
            notify('برای مشاهده سبد خرید ابتدا وارد حساب کاربری خود شوید')
        }
    }, [])

    return (
        <>
            {children}
        </>
    );
}
