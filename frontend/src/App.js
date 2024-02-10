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
    notify2(`${userInfos.customer.first_name + ' ' +userInfos.customer.last_name} خوش آمدید`)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    setIsloggedIn(false)
    localStorage.removeItem('user')
    notify2('با موفقیت خارج شدید')
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
  }, [login])


  return (
    <>
      <div className="App">

        <AuthContext.Provider
          value={{
            isloggedIn,
            token,
            userInfos,
            login,
            logout
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
