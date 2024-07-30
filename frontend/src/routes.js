import Category from "./Pages/Category/Category";
import Store from "./Pages/Store/Store";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Sales from "./Pages/Sales/Sales";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import DashBoard from "./Pages/DashBoard/DashBoard";
import DashBoardMain from "./Pages/DashBoard/DashBoardMain/DashBoardMain";
import DashBoardAcount from "./Pages/DashBoard/DashBoardAcount/DashBoardAcount";
import DashBoardOrders from "./Pages/DashBoard/DashBoardOrders/DashBoardOrders";

const routes = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/category/:id', element: <Category /> },
    { path: '/store', element: <Store /> },
    { path: '/sales', element: <Sales /> },
    { path: '/product/:id', element: <Product /> },
    { path: '/cart', element: <PrivateRoute> <Cart /> </PrivateRoute> },
    {
        path: '/dashboard/*', element: <PrivateRoute><DashBoard /></PrivateRoute>, children: [
            { path: 'main', element: <DashBoardMain /> },
            { path: 'account', element: <DashBoardAcount /> },
            { path: 'orders', element: <DashBoardOrders /> }
        ]
    },
]

export default routes