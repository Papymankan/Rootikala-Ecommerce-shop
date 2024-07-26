import { createContext } from "react";

const AuthContext = createContext({
    isloggedIn: false,
    token: null,
    userInfos: null,
    userCart: null,
    login: () => { },
    logout: () => { },
    createCart: () => { },
    getCart: () => { },
    setCart: () => { },
    setCustomer: () => { },
    setLoading: () => { },
})

export default AuthContext