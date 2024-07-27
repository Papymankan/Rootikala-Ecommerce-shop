import './App.css';
import routes from './routes'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation, useRoutes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './variables.css'
import AuthContext from './Context/Context';
import { useCallback, useEffect, useState } from 'react';
import Loader from './Components/Loader/Loader';


function App() {

  const [isloggedIn, setIsloggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState({})
  const [userCart, setUserCart] = useState({})
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()


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

  const notify = (text) => toast.warning(text, {
    position: "top-right",
    autoClose: 4500,
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
    if (userInfo.customer.metadata) {
      getCart(userInfo.customer.metadata.cartID)
    }
    localStorage.setItem('user', JSON.stringify({ token }))
    notify2(`${userInfo.customer.first_name + ' ' + userInfo.customer.last_name} خوش آمدید`)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    setIsloggedIn(false)
    setUserCart({})
    localStorage.removeItem('user')
    localStorage.removeItem('cartID')
    notify2('با موفقیت خارج شدید')

  }, [])

  const setCustomer = (customer) => {
    fetch(`http://localhost:9000/store/carts/${userCart.id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipping_address: {
          first_name: customer.customer.shipping_addresses[0].first_name,
          last_name: customer.customer.shipping_addresses[0].last_name,
          address_1: customer.customer.shipping_addresses[0].address_1,
          city: customer.customer.shipping_addresses[0].city,
          country_code: customer.customer.shipping_addresses[0].country_code,
          postal_code: customer.customer.shipping_addresses[0].postal_code
        }
      })
    }).then(res => res.json()).then(data => {
      setUserCart(data.cart)
    })

    setUserInfos(customer)
  }

  const createCart = async () => {
    if (isloggedIn) {
      let cartID = ''
      await fetch(`http://localhost:9000/store/carts`, {
        'method': 'POST',
      })
        .then(res => res.json())
        .then(data => {

          setUserCart(data.cart)
          cartID = data.cart.id

          const localData = JSON.parse(localStorage.getItem('user'))
          fetch(`http://localhost:9000/store/customers/me`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localData.token}`
            },
            body: JSON.stringify({
              metadata: {
                cartID: data.cart.id
              }
            })
          })
            .then(res => res.json())
            .then(data => {
              setUserInfos(data)
              fetch(`http://localhost:9000/store/carts/${cartID}`, {
                'method': 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  customer_id: data.customer.id
                })
              }).then(res => res.json())
            })
        })
      return cartID
    } else {
      navigate('/login')
      notify('برای خرید ابتدا وارد حساب کاربری خود شوید')
    }
  }

  const getCart = (id) => {
    fetch(`http://localhost:9000/store/carts/${id}`)
      .then(res => res.json())
      .then(data => {
        setUserCart(data.cart)
      })
  }

  const setCart = useCallback((cart) => {
    setUserCart(cart)
  }, [])

  const DeleteCart = (id) => {
    setUserCart({})
    const localData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:9000/store/customers/me`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localData.token}`
      },
      body: JSON.stringify({
        metadata: {
          cartID: ''
        }
      })
    }).then(res => {
      if(res.ok){
        window.location.reload()
      }
    })
  }

  const setLoading = (state) => {
    setLoader(state)
    if (state) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const fun = () => {
    console.log('APP');
    const localData = JSON.parse(localStorage.getItem('user'))
    if (localData) {
      fetch('http://localhost:9000/store/auth', {
        headers: {
          'Authorization': `Bearer ${localData.token}`,
        }
      }).then(res => res.json())
        .then((data) => {
          setIsloggedIn(true)
          setToken(localData.token)
          setUserInfos(data)
          if (data.customer.metadata && data.customer.metadata.cartID) {
            getCart(data.customer.metadata.cartID)
          }
        })
    }
  }


  useEffect(() => {
    fun()
  }, [login])

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <>
      {
        loader &&
        <div class="overlay">
          <Loader id='overlayLoader' />
        </div>
      }

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
            getCart,
            setCart,
            setCustomer,
            setLoading,
            DeleteCart
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
