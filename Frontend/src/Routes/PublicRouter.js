import React from 'react'
import Home from '../Components/Home/Home'
import About from '../Components/About/About'
import Product from '../Components/Product/Product'
import NewArrivals from '../Components/Product/NewArrivals'
import Fashion from '../Components/Fashion/Fashion'
import Shirt from '../Components/Product/ShirtProduct'
import News from '../Components/News/News'
import Contact from '../Components/Contact/Contact'
import ShowProductDetails from '../Components/Product/ShowProductDetails'
import Register from '../Admin/Register'
import Login from '../Admin/Login'
import Review from '../Components/Review/Review'
import Stock from '../Components/Product/Stock'
import ProductoftheDay from '../Components/Product/ProductoftheDay'
import PaymentSuccessful from '../Components/ShowMessages/PaymentSuccessful'
import { Route, Routes } from 'react-router-dom'

const PublicRouter = () => {
    const commonRoutes = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/product', element: <Product setproductId={setProductId} /> },
    { path: '/newarrivals', element: <NewArrivals /> },
    { path: '/fashion', element: <Fashion /> },
    { path: '/shirt', element: <Shirt /> },
    { path: '/news', element: <News /> },
    { path: '/contact', element: <Contact /> },
    { path: '/productDetails', element: <ShowProductDetails /> },
    { path: '/register', element: <Register /> },
    { path: '/custom', element: <CustomerRegister /> },
    { path: '/login', element: <Login loginId={loginId} setLoginId={setLoginId} /> },
    { path: '/review', element: <Review /> },
    { path: '/stock', element: <Stock /> },
    { path: '/productoftheday', element: <ProductoftheDay /> },
    { path: '/succesful-payment', element: <PaymentSuccessful /> },
  ]
  return (
    <div>
        <Routes>
            {commonRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Routes>
      
    </div>
  )
}

export default PublicRouter
