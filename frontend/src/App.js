import './App.css';
import routes from './routes'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useRoutes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './variables.css'
import AuthContext from './Context/Context';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [isloggedIn, setIsloggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState({})
  const [userCart, setUserCart] = useState({})

  const router = useRoutes(routes)

  const notify2 = (text) => toast.success(text, {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const login = useCallback((userInfo, token) => {
    setToken(token)
    setIsloggedIn(true)
    setUserInfos(userInfo)
    localStorage.setItem('user', JSON.stringify({ token }))
    console.log(userInfo);
    notify2(`${userInfo.customer.first_name + ' ' + userInfo.customer.last_name} خوش آمدید`)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    setIsloggedIn(false)
    localStorage.removeItem('user')
    notify2('با موفقیت خارج شدید')
  }, [])

  const createCart = useCallback(() => {
    fetch(`http://localhost:9000/store/carts`, {
      'method': 'POST'
    })
      .then(res => res.json())
      .then(data => {
        setUserCart(data.cart)
        localStorage.setItem('cartID', JSON.stringify(data.cart.id))
      })
  }, [])

  const getCart = useCallback((id) => {
    console.log('GOT');
    fetch(`http://localhost:9000/store/carts/${id}`)
      .then(res => res.json())
      .then(data => setUserCart(data.cart))
  }, [])


  useEffect(() => {
    console.log('APP');
    const localData = JSON.parse(localStorage.getItem('user'))
    if (localData) {
      fetch('http://localhost:9000/store/auth', {
        headers: {
          'Authorization': `Bearer ${localData.token}`
        }
      }).then(res => res.json())
        .then(data => {
          setIsloggedIn(true)
          setToken(localData.token)
          setUserInfos(data)
        })
    }
    const cartID = JSON.parse(localStorage.getItem('cartID'))
    if (cartID) {
      getCart(cartID)
    }
  }, [login])

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <>
      <div className="App">

        <AuthContext.Provider
          value={{
            isloggedIn,
            token,
            userInfos,
            createCart,
            login,
            logout,
            userCart,
            getCart
          }}
        >
          {router}
        </AuthContext.Provider>


        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default App;
