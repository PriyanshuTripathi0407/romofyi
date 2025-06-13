import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserDashboard from '../Admin/user-dashboard/UserDashboard';
import Home from '../Components/Home/Home';
import UserInfo from '../Components/Header/UserInfo';
import Order from '../Components/Order/Order';
import Cart from '../Components/AddtoCart/Cart'
import Settings from '../Components/Settings/Settings';
import Wishlist from '../Components/Wishlist/Wishlist';
import PaymentSuccessful from '../Components/ShowMessages/PaymentSuccessful';

const UserRouter = () => {
    const privateRoutes = [
        { path: '/user-dashboard', element: <UserDashboard /> },
        { path: '/home', element: <Home /> },
        {
            path: '/userinfo', element: <UserInfo loginId={loginId} setLoginId={setLoginId} />
        },
        { path: '/order', element: <Order /> },
        {
            path: '/cart',
            element: <Cart cartProduct={cartProduct} setCartProduct={setCartProduct} />
        },
        { path: '/setting', element: <Settings /> },
        { path: '/wishlist', element: <Wishlist /> },
        { path: '/succesful-payment', element: <PaymentSuccessful /> },

    ];
    return (
        <div>
            <Routes>
                {privateRoutes.map((route, i) => (
                    <Route key={`private-${i}`} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    )
}

export default UserRouter
