import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {Link} from 'react-router-dom'
import Header from './Components/Header/Header.js'
import Home from './Components/Home/Home.js'
import Footer from './Components/Footer/Foooter.js'
import Product from './Components/Product/Product.js'
import Fashion from './Components/Fashion/Fashion.js'
import About from './Components/About/About.js'
import News from './Components/News/News.js'
import Contact from './Components/Contact/Contact.js'
import Shirt from './Components/Product/ShirtProduct.js';
import ShowProductDetails from './Components/Product/ShowProductDetails.js';
import Register from './Admin/Register.js';
import Sidebar from './Components/Sidebar/Sidebar.js';
import Order from './Components/Order/Order.js'
import Review from './Components/Review/Review.js'
import Stock from './Components/Product/Stock.js'
import ProductoftheDay from './Components/Product/ProductoftheDay.js'
import Login from './Admin/Login.js';
import Dashboard from './Admin/Dashboard/Dashboard.js';
import AddToCart from './Components/AddtoCart/AddToCart.js';
import product from './Components/Product/ProductData.js'
import Cart from './Components/AddtoCart/Cart.js'
import CustomerRegister from './Admin/Registration/Register.js'

function App() {
  const [loginId, setloginId]= useState(false)
  const [productId, setproductId] = useState('');
  const [cartProduct, setCartProduct] = useState([]);

  console.log("Product Id is : ", productId)
  useEffect(() => {
    const filterProductData = product.filter((product) => product.id === productId);
    setCartProduct([...cartProduct,...filterProductData])
  }, [productId]);

  return (
    (loginId) ?
      <BrowserRouter>
        {/* <Header cartProduct={cartProduct}/> */}
        <Sidebar />        
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/custom' element={<CustomerRegister />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/fashion' element={<Fashion />}></Route>
          <Route path='/shirt' element={<Shirt />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/productDetails' element={<ShowProductDetails />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login loginId={loginId} setloginId={setloginId} />}></Route>
          <Route path='/order' element={<Order />}></Route>
          <Route path='/review' element={<Review />}></Route>
          <Route path='/stock' element={<Stock products={product} />}></Route>
          <Route path='/addtoCart' element={<AddToCart />}></Route>
          <Route path='/productoftheday' element={<ProductoftheDay />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      :
      <BrowserRouter>
        <div>
          <Header cartProduct={cartProduct} />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/cart' element={<Cart cartProduct={cartProduct} setCartProduct={setCartProduct} />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/product' element={<Product setproductId={setproductId} />}></Route>
            <Route path='/fashion' element={<Fashion />}></Route>
            <Route path='/shirt' element={<Shirt />}></Route>
            <Route path='/news' element={<News />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/productDetails' element={<ShowProductDetails />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login loginId={loginId} setloginId={setloginId} />}></Route>
            <Route path='/order' element={<Order />}></Route>
            <Route path='/review' element={<Review />}></Route>
            <Route path='/stock' element={<Stock />}></Route>
            <Route path='/addtoCart' element={<AddToCart />}></Route>
            <Route path='/productoftheday' element={<ProductoftheDay />}></Route>
          </Routes>
          <Footer />
        </div>

      </BrowserRouter>
  );
}

export default App;
