import Category from "./Pages/Category/Category";
import Store from "./Pages/Store/Store";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Sales from "./Pages/Sales/Sales";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

const routes = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/category/:id', element: <Category /> },
    { path: '/store', element: <Store /> },
    { path: '/sales', element: <Sales /> },
    { path: '/product/:id', element: <Product /> },
    { path: '/cart', element: <Cart /> },
]

export default routes