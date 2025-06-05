// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { SnackbarProvider } from 'notistack';
// // import {Link} from 'react-router-dom'
// import Header from './Components/Header/Header.js'
// import NavbarMenu from './Components/Header/NavbarMenu.js';
// import UserMenuItems from './Components/Header/UserMenuItems.js';
// import Home from './Components/Home/Home.js'
// import Footer from './Components/Footer/Foooter.js'
// import Product from './Components/Product/Product.js'
// import NewArrivals from './Components/Product/NewArrivals.js'
// import Fashion from './Components/Fashion/Fashion.js'
// import About from './Components/About/About.js'
// import News from './Components/News/News.js'
// import Contact from './Components/Contact/Contact.js'
// import Shirt from './Components/Product/ShirtProduct.js';
// import ShowProductDetails from './Components/Product/ShowProductDetails.js';
// import Register from './Admin/Register.js';
// import Sidebar from './Components/Sidebar/Sidebar.js';
// import Order from './Components/Order/Order.js'
// import Review from './Components/Review/Review.js'
// import Stock from './Components/Product/Stock.js'
// import ProductoftheDay from './Components/Product/ProductoftheDay.js'
// import Login from './Admin/Login.js';
// import Dashboard from './Admin/Dashboard/Dashboard.js';
// // import AddToCart from './Components/AddtoCart/AddToCart.js';

// import Cart from './Components/AddtoCart/Cart.js'
// import CustomerRegister from './Admin/Registration/Register.js'
// import { getData, PostData, PutData, DeleteData } from './API/ProductAPI/ProductAPI.js'
// import UserInfo from './Components/Header/UserInfo.js';
// import Settings from './Components/Settings/Settings.js';
// import Wishlist from './Components/Wishlist/Wishlist.js';

// function App() {
//   const [loginId, setloginId] = useState(false)
//   const [productId, setproductId] = useState('');
//   const [cartProduct, setCartProduct] = useState([]);
//   const [dbData, setdbData] = useState([])


//   // const handleGetData = async () => {
//   //   const response = await getData()
//   //   setdbData(response.data);
//   //   console.log(response.data, " This is response from db in App.js")
//   // }

//   // // console.log("Product Id is : ", productId)
//   // useEffect(() => {
//   //   handleGetData()
//   //   const filterProductData = dbData.filter((product) => product.product_id === productId);
//   //   setCartProduct([...cartProduct, ...filterProductData])
//   // }, [productId]);

//   useEffect(() => {
//     const fetchAndFilter = async () => {
//       const response = await getData();
//       setdbData(response.data);
//       const filterProductData = response.data.filter((product) => product.product_id === productId);
//       setCartProduct(prev => [...prev, ...filterProductData]);
//     };

//     if (productId) {
//       fetchAndFilter();
//     }
//   }, [productId]);


//   return (
//     (loginId) ?
//       <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//         <BrowserRouter>
//           {/* <Header cartProduct={cartProduct}/> */}
//           <Header cartProduct={cartProduct} />
//           <UserMenuItems />
//           <Routes>
//             <Route path='/home' element={<Home />}></Route>
//             <Route path='/dashboard' element={<Dashboard />}></Route>
//             <Route path='/custom' element={<CustomerRegister />}></Route>
//             <Route path='/userinfo' element={<UserInfo loginId={loginId} setloginId={setloginId} />}></Route>
//             <Route path='/about' element={<About />}></Route>
//             <Route path='/product' element={<Product setproductId={setproductId} />}></Route>
//             <Route path='/newarrivals' element={<NewArrivals />}></Route>
//             <Route path='/fashion' element={<Fashion />}></Route>
//             <Route path='/shirt' element={<Shirt />}></Route>
//             <Route path='/news' element={<News />}></Route>
//             <Route path='/contact' element={<Contact />}></Route>
//             <Route path='/productDetails' element={<ShowProductDetails />}></Route>
//             <Route path='/register' element={<Register />}></Route>
//             <Route path='/login' element={<Login loginId={loginId} setloginId={setloginId} />}></Route>
//             <Route path='/order' element={<Order />}></Route>
//             <Route path='/setting' element={<Settings />}></Route>
//             <Route path='/review' element={<Review />}></Route>
//             <Route path='/wishlist' element={<Wishlist />}></Route>
//             <Route path='/cart' element={<Cart cartProduct={cartProduct} setCartProduct={setCartProduct} />}></Route>
//             <Route path='/order' element={<Order />}></Route>
//             {/* <Route path='/stock' element={<Stock products={product} />}></Route> */}

//             {/* <Route path='/addtoCart' element={<AddtoCart   cartProduct={cartProduct} setCartProduct={setCartProduct}/>}></Route> */}
//             <Route path='/productoftheday' element={<ProductoftheDay />}></Route>
//           </Routes>
//           <Footer />
//         </BrowserRouter>
//       </SnackbarProvider>
//       :
//       <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
//         <BrowserRouter>
//           <div>
//             <Header cartProduct={cartProduct} />
//             <NavbarMenu />
//             <Routes>
//               <Route path='/' element={<Home />}></Route>
//               {/* <Route path='/' element={<Dashboard />}></Route> */}
//               <Route path='/cart' element={<Cart cartProduct={cartProduct} setCartProduct={setCartProduct} />}></Route>
//               <Route path='/about' element={<About />}></Route>
//               <Route path='/newarrivals' element={<NewArrivals />}></Route>
//               <Route path='/product' element={<Product setproductId={setproductId} />}></Route>
//               <Route path='/fashion' element={<Fashion />}></Route>
//               <Route path='/shirt' element={<Shirt />}></Route>
//               <Route path='/news' element={<News />}></Route>
//               <Route path='/contact' element={<Contact />}></Route>
//               <Route path='/productDetails' element={<ShowProductDetails setproductId={setproductId} />}></Route>
//               <Route path='/register' element={<Register />}></Route>
//               <Route path='/login' element={<Login loginId={loginId} setloginId={setloginId} />}></Route>
//               <Route path='/review' element={<Review />}></Route>
//               <Route path='/stock' element={<Stock />}></Route>
//               {/* <Route path='/addtoCart' element={<AddtoCart   cartProduct={cartProduct} setCartProduct={setCartProduct}/>}></Route> */}
//               <Route path='/productoftheday' element={<ProductoftheDay />}></Route>
//             </Routes>
//             <Footer />
//           </div>

//         </BrowserRouter>
//       </SnackbarProvider>
//   );
// }

// export default App;



import React, { useContext, useEffect, useState } from 'react';
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
import Dashboard from './Admin/Dashboard/Dashboard.js';
import Sidebar from './Components/Sidebar/Sidebar.js';
import Order from './Components/Order/Order.js';
import Review from './Components/Review/Review.js';
import Stock from './Components/Product/Stock.js';
import ProductoftheDay from './Components/Product/ProductoftheDay.js';
import Cart from './Components/AddtoCart/Cart.js';
import UserInfo from './Components/Header/UserInfo.js';
import Settings from './Components/Settings/Settings.js';
import Wishlist from './Components/Wishlist/Wishlist.js';

import { getData } from './API/ProductAPI/ProductAPI.js';

function App() {
  const [loginId, setloginId] = useState(false)
  const [productId, setProductId] = useState('');
  const [cartProduct, setCartProduct] = useState([]);
  const [dbData, setDbData] = useState([]);

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

  // Common routes for all users
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
    { path: '/login', element: <Login loginId={loginId} setloginId={setloginId} /> },
    { path: '/review', element: <Review /> },
    { path: '/stock', element: <Stock /> },
    { path: '/productoftheday', element: <ProductoftheDay /> },
  ];
  
  // Routes only for logged-in users
  const privateRoutes = [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/home', element: <Home /> },
    {
      path:'/userinfo' ,element: <UserInfo loginId={loginId} setloginId={setloginId} />
    },
    { path: '/order', element: <Order /> },
    {
      path: '/cart',
      element: <Cart cartProduct={cartProduct} setCartProduct={setCartProduct} />
    },
    { path: '/setting', element: <Settings /> },
    { path: '/wishlist', element: <Wishlist /> },
  ];

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <BrowserRouter>
        <Header cartProduct={cartProduct} />
        {loginId ? <UserMenuItems /> : <NavbarMenu />}
        <Routes>
          {commonRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          {loginId &&
            privateRoutes.map((route, i) => (
              <Route key={`private-${i}`} path={route.path} element={route.element} />
            ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
