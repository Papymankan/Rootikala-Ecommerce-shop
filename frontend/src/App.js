import './App.css';
import routes from './routes'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useRoutes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './variables.css'
import AuthContext from './Context/Context';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [isloggedIn, setIsloggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState({})

  const router = useRoutes(routes)

  const login = useCallback((userInfo, token) => {
    setToken(token)
    setIsloggedIn(true)
    setUserInfos(userInfo)
    localStorage.setItem('user', JSON.stringify({ token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    setIsloggedIn(false)
    localStorage.removeItem('user')
  }, [])

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('user'))
    if (localData) {
      // fetch('http://localhost:4000/v1/auth/me', {
      //   headers: {
      //     'Authorization': `Bearer ${localData.token}`
      //   }
      // }).then(res => res.json())
      //   .then(data => {
      //     setIsloggedIn(true)
      //     setToken(localData.token)
      //     setUserInfos(data)
      //   })
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
