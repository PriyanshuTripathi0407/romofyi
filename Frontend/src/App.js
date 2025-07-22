// import React, { useContext, useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { SnackbarProvider } from 'notistack';

// import Header from './Components/Header/Header.js';
// import NavbarMenu from './Components/Header/NavbarMenu.js';
// import UserMenuItems from './Components/Header/UserMenuItems.js';
// import Footer from './Components/Footer/Foooter.js';
// import Home from './Components/Home/Home.js';
// import Product from './Components/Product/Product.js';
// import NewArrivals from './Components/Product/NewArrivals.js';
// import Fashion from './Components/Fashion/Fashion.js';
// import About from './Components/About/About.js';
// import News from './Components/News/News.js';
// import Contact from './Components/Contact/Contact.js';
// import Shirt from './Components/Product/ShirtProduct.js';
// import ShowProductDetails from './Components/Product/ShowProductDetails.js';
// import Register from './Admin/Register.js';
// import CustomerRegister from './Admin/Registration/Register.js';
// import Login from './Admin/Login.js';
// import UserDashboard from './Admin/Dashboard/UserDashboard.js';
// // import Sidebar from './Components/Sidebar/Sidebar.js';
// import Order from './Components/Order/Order.js';
// import Review from './Components/Review/Review.js';
// import Stock from './Components/Product/Stock.js';
// import ProductoftheDay from './Components/Product/ProductoftheDay.js';
// import Cart from './Components/AddtoCart/Cart.js';
// import UserInfo from './Components/Header/UserInfo.js';
// import Settings from './Components/Settings/Settings.js';
// import Wishlist from './Components/Wishlist/Wishlist.js';
// import PaymentSuccessful from './Components/ShowMessages/PaymentSuccessful.js'
// import PageNotFound from './Components/ShowMessages/PageNotFound.js'
// import { getData } from './API/ProductAPI/ProductAPI.js';
// import VendorDashboard from './Admin/Dashboard/VendorDashboard.js';
// import PrivateRouter from './Components/Routes/PrivateRouter.js';
// import Ordercard from './Components/Order/Ordercard.js';
// import OrderDataModel from './Components/Order/OrderDataModel.js';
// import Chatbot from './Components/Chatbot/Chatbot.js';
// import FloatingChatbot from './Components/Chatbot/FloatingChatbot.js';
// import CheckoutModal from './Components/Checkout/CheckoutModal.js';


// function App() {
//   const [loginId, setLoginId] = useState(false);
//   const [productId, setProductId] = useState('');
//   const [cartProduct, setCartProduct] = useState([]);
//   const [dbData, setDbData] = useState([]);
//   const [paymentSessionID, setPaymentSessionID] = useState('')

//   useEffect(() => {
//     const fetchAndFilter = async () => {
//       const response = await getData();
//       setDbData(response.data);

//       if (productId) {
//         const matched = response.data.filter(p => p.product_id === productId);
//         setCartProduct(prev => {
//           const unique = matched.filter(m => !prev.some(cp => cp.product_id === m.product_id));
//           return [...prev, ...unique];
//         });
//       }
//     };

//     fetchAndFilter();
//   }, [productId]);

//   // Common routes for all users
//   const commonRoutes = [
//     { path: '/', element: <Home /> },
//     { path: '/about', element: <About /> },
//     { path: '/chat-bot', element: <Chatbot /> },
//     { path: '*', element: <Chatbot /> },
//     { path: '/product', element: <Product setproductId={setProductId} /> },
//     { path: '/newarrivals', element: <NewArrivals /> },
//     { path: '/fashion', element: <Fashion /> },
//     { path: '/shirt', element: <Shirt /> },
//     { path: '/news', element: <News /> },
//     { path: '/contact', element: <Contact /> },
//     { path: '/productDetails', element: <ShowProductDetails /> },
//     { path: '/register', element: <Register /> },
//     { path: '/custom', element: <CustomerRegister /> },
//     { path: '/login', element: <Login loginId={loginId} setLoginId={setLoginId} /> },
//     { path: '/review', element: <Review /> },
//     { path: '/stock', element: <Stock /> },
//     { path: '/succesful-payment', element: <PaymentSuccessful /> },
//     { path: '/sale', element: <ProductoftheDay /> },
//   ];

//   // Routes only for logged-in users
//   const privateRoutes = [
//     { path: '/user-dashboard', element: <UserDashboard loginId={loginId} setLoginId={setLoginId} /> },
//     { path: '/vendor-dashboard', element: <VendorDashboard loginId={loginId} setLoginId={setLoginId} /> },
//     { path: '/home', element: <Home /> },
//     { path: '*', element: <PageNotFound /> },
//     { path: '/order-card', element: <Ordercard/> },
//     {
//       path: '/userinfo', element: <UserInfo loginId={loginId} setLoginId={setLoginId} />
//     },
//     { path: '/order', element: <Order /> },
//     { path: '/checkout', element: <CheckoutModal /> },
//     { path: '/orderdatamodel', element: <OrderDataModel /> },
//     {
//       path: '/cart',
//       element: <Cart cartProduct={cartProduct} setPaymentSessionID= {setPaymentSessionID} setCartProduct={setCartProduct} paymentSessionID={paymentSessionID} />
//     },
//     { path: '/setting', element: <Settings /> },
//     { path: '/wishlist', element: <Wishlist /> },
//     { path: '/succesful-payment', element: <PaymentSuccessful paymentSessionID={paymentSessionID} /> },

//   ];

//   return (
//     <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//       <BrowserRouter>      
//         <Header cartProduct={cartProduct} />
//         {loginId ? <UserMenuItems /> : <NavbarMenu />}
//         <Routes>
//           {commonRoutes.map((route, i) => (
//             <Route key={i} path={route.path} element={route.element} />
//           ))
//           }
//           {privateRoutes.map((route, i) => (
//             <Route
//               key={`private-${i}`}
//               path={route.path}
//               element={
//                 <PrivateRouter isAuthenticated={loginId}>
//                   {route.element}
//                 </PrivateRouter>
//               }
//             />
//           ))}
//         </Routes>
//         <FloatingChatbot />
//         <Footer />
//       </BrowserRouter>
//     </SnackbarProvider>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Header from './Components/Header/Header.js';
import NavbarMenu from './Components/Header/NavbarMenu.js';
import UserMenuItems from './Components/Header/UserMenuItems.js';
import Footer from './Components/Footer/Foooter.js';
import Home from './Components/Home/Home.js';
import Product from './Components/Product/Product.js';
import NewArrivals from './Components/Product/NewArrivals.js';
import Fashion from './Components/Fashion/Fashion.js';
import About from './Components/About/About.js';
import News from './Components/News/News.js';
import Contact from './Components/Contact/Contact.js';
import Shirt from './Components/Product/ShirtProduct.js';
import ShowProductDetails from './Components/Product/ShowProductDetails.js';
import Register from './Admin/Register.js';
import CustomerRegister from './Admin/Registration/Register.js';
import Login from './Admin/Login.js';
import UserDashboard from './Admin/Dashboard/UserDashboard.js';
import Order from './Components/Order/Order.js';
import Review from './Components/Review/Review.js';
import Stock from './Components/Product/Stock.js';
import ProductoftheDay from './Components/Product/ProductoftheDay.js';
import Cart from './Components/AddtoCart/Cart.js';
import UserInfo from './Components/Header/UserInfo.js';
import Settings from './Components/Settings/Settings.js';
import Wishlist from './Components/Wishlist/Wishlist.js';
import PaymentSuccessful from './Components/ShowMessages/PaymentSuccessful.js';
import PageNotFound from './Components/ShowMessages/PageNotFound.js';
import VendorDashboard from './Admin/Dashboard/VendorDashboard.js';
import PrivateRouter from './Components/Routes/PrivateRouter.js';
import Ordercard from './Components/Order/Ordercard.js';
import OrderDataModel from './Components/Order/OrderDataModel.js';
import Chatbot from './Components/Chatbot/Chatbot.js';
import FloatingChatbot from './Components/Chatbot/FloatingChatbot.js';
import CheckoutModal from './Components/Checkout/CheckoutModal.js';

import { getData } from './API/ProductAPI/ProductAPI.js';
import { useAuth } from './AuthContext.js'; // 👈 Import AuthContext hook

function App() {
  const { user } = useAuth(); // 👈 Get current user from context
  const isAuthenticated = Object.keys(user).length > 0;

  const [productId, setProductId] = useState('');
  const [cartProduct, setCartProduct] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [paymentSessionID, setPaymentSessionID] = useState('');

  useEffect(() => {
    const fetchAndFilter = async () => {
      const response = await getData();
      setDbData(response.data);

      if (productId) {
        const matched = response.data.filter(p => p.product_id === productId);
        setCartProduct(prev => {
          const unique = matched.filter(m => !prev.some(cp => cp.product_id === m.product_id));
          return [...prev, ...unique];
        });
      }
    };

    fetchAndFilter();
  }, [productId]);

  const commonRoutes = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/chat-bot', element: <Chatbot /> },
    { path: '*', element: <Chatbot /> },
    { path: '/product', element: <Product setproductId={setProductId} /> },
    { path: '/newarrivals', element: <NewArrivals /> },
    { path: '/fashion', element: <Fashion /> },
    { path: '/shirt', element: <Shirt /> },
    { path: '/news', element: <News /> },
    { path: '/contact', element: <Contact /> },
    { path: '/productDetails', element: <ShowProductDetails /> },
    { path: '/register', element: <Register /> },
    { path: '/custom', element: <CustomerRegister /> },
    { path: '/login', element: <Login /> },
    { path: '/review', element: <Review /> },
    { path: '/stock', element: <Stock /> },
    { path: '/succesful-payment', element: <PaymentSuccessful /> },
    { path: '/sale', element: <ProductoftheDay /> },
  ];

  const privateRoutes = [
    { path: '/user-dashboard', element: <UserDashboard /> },
    { path: '/vendor-dashboard', element: <VendorDashboard /> },
    { path: '/home', element: <Home /> },
    { path: '*', element: <PageNotFound /> },
    { path: '/order-card', element: <Ordercard /> },
    { path: '/userinfo', element: <UserInfo /> },
    { path: '/order', element: <Order /> },
    { path: '/checkout', element: <CheckoutModal /> },
    { path: '/orderdatamodel', element: <OrderDataModel /> },
    {
      path: '/cart',
      element: (
        <Cart
          cartProduct={cartProduct}
          setPaymentSessionID={setPaymentSessionID}
          setCartProduct={setCartProduct}
          paymentSessionID={paymentSessionID}
        />
      ),
    },
    { path: '/setting', element: <Settings /> },
    { path: '/wishlist', element: <Wishlist /> },
    { path: '/succesful-payment', element: <PaymentSuccessful paymentSessionID={paymentSessionID} /> },
  ];

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <BrowserRouter>
        <Header />
        {isAuthenticated ? <UserMenuItems /> : <NavbarMenu />}

        <Routes>
          {commonRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          {privateRoutes.map((route, i) => (
            <Route
              key={`private-${i}`}
              path={route.path}
              element={<PrivateRouter isAuthenticated={isAuthenticated}>{route.element}</PrivateRouter>}
            />
          ))}
        </Routes>

        <FloatingChatbot />
        <Footer />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
