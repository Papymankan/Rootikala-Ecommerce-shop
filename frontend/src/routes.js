import Category from "./Pages/Category/Category";
import Store from "./Pages/Store/Store";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

const routes = [
    {path:'/' , element:<Home/>},
    {path:'/login' , element:<Login/>},
    {path:'/register' , element:<Register/>},
    {path:'/category/:id' , element:<Category/>},
    {path:'/store' , element:<Store/>},
]

export default routes