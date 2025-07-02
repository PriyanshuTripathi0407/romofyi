import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { getData } from '../../API/ProductAPI/ProductAPI.js'
import './ShowProductDetails.css'
import Rating from '@mui/material/Rating';
import SellIcon from '@mui/icons-material/Sell';
import DescriptionIcon from '@mui/icons-material/Description';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { ToastContainer, toast } from 'react-toastify';


function ShowProductDetails({ setproductId }) {

  const SuccessMessage = () => toast(" Added to Cart Successfully")
  const AlertMessage = () => toast(" Please Login first ")
  const navigate = useNavigate()
  const nav = useNavigate()
  const locate = useLocation()
  const [dbproduct, setProduct] = useState([])


  useEffect(() => {
    handleGetData();
  }, [])

  const handleGetData = async () => {
    const response = await getData()
    setProduct(response.data);
    // console.log(response.data, " This is response from db in Show Product Detail.js")
  }

  

  function handleContinueShopping() {
    navigate('/product', { replace: true });
  }
  
  const [userData, setUserData] = useState({})
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      setUserData(parsedData.user)
    }
  }, []);
  
  const findProduct = locate.state
  // console.log(findProduct, " This is findProduct in Show Product Detail.js")
  
  function handleCart(id) {
    console.log("This is userData", userData)
    if (userData.valueOf.length != 0) {
      const cartData= ()=>setproductId(id);
      SuccessMessage();
    }
    else {
      AlertMessage();
    }
  }
  
  function handleBuyNow(id) {
   if (userData.valueOf.length != 0) {
      const cartData= ()=>setproductId(id);
      nav('/cart', { replace: true });      
    }
    else {
      AlertMessage();
    }
  }


  return (
    <div>
      <ToastContainer />
      <div className='showproductHead'>
        <h1><span className='txt-back'>{findProduct?.product_name}</span>Details</h1>
      </div>
      <div className='showproductDetail'>
        <div className='showproductleft'>
          <div className='showproductImage'>
            <img src={findProduct?.product_image} alt='Product Image' className='w-100' />
          </div>
          <div className='showOffer'>
            <div>
              <button onClick={() => handleCart(findProduct?.product_id)}> <ShoppingCartOutlinedIcon style={{ color: 'aqua' }} /> ADD TO CART</button>
              {/* <button><SellIcon style={{ color: 'orangered' }} /> Apply Coupons</button> */}
            </div>
          </div>
        </div>
        <div className='showproductInfo'>
          <div className='item'>
            <p><b>Product ID:</b></p>
            <p>This product is uniquely identified by the ID <span className='txt-light'> <b>{findProduct?.product_id}</b> </span>, which helps in tracking and managing inventory.</p>
          </div> <hr />
          <div className='item'>
            <p><b>Product Name:</b></p>
            <p>You are viewing <span className='txt-light'><b>{findProduct?.product_name}</b> </span>, a top-rated item in our collection known for its quality and performance.</p>
          </div> <hr />
          <div className='item'>
            <p><b>Price:<CreditCardIcon style={{ color: 'goldenrod' }} /> </b></p>
            <p>This item is available for just <span className='txt-light'> <b>{findProduct?.product_price}</b> </span>. It offers great value for the features it provides.</p>
          </div> <hr />
          <div className='item'>
            <p><b>Description: <DescriptionIcon style={{ color: 'violet' }} /> </b></p>
            <p>{findProduct?.product_description} <br />This description gives an overview of what you can expect from the product in terms of usability, style, and build quality.</p>
          </div> <hr />
          <div className='item'>
            <p><b>Brand: <SellIcon style={{ color: 'green' }} /></b></p>
            <p>Manufactured by <span className='txt-light'>  <b>{findProduct?.product_brand || "a reputed brand"}</b> </span>, ensuring reliability and customer satisfaction.</p>
          </div><hr />
          <div className='item'>
            <p><b>Category:</b></p>
            <p>This product falls under the <b>{findProduct.product_category.id || "general merchandise"}</b> category, making it suitable for a variety of use cases.</p>
          </div> <hr />
          <div className='item'>
            <p><b>Availability:</b></p>
            <p>{findProduct?.in_stock ? "This product is currently in stock and ready to be shipped." : "Sorry, this product is currently out of stock. Please check back soon."}</p>
          </div> <hr />
          <div className='item'>
            <p><b>Customer Ratings: <Rating name="half-rating-read" defaultValue={findProduct?.product_rating} precision={0.5} readOnly /></b></p>
            <p>Rated <b>{findProduct?.product_rating || "N/A"}</b> by our customers, reflecting the overall satisfaction and experience with this item.</p>
          </div> <hr />
          <div className='item'>
            <p><b>Shipping Info:</b></p>
            <p>{findProduct?.shipping_info || "Standard shipping available. Expected delivery within 3-5 business days."}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}

      <div className='showOffer'>
        <div>
          <button onClick={()=> handleBuyNow(findProduct?.product_id)}><ShoppingBagOutlinedIcon style={{ color: 'orange' }} /> BUY NOW</button>
          <button onClick={() => handleContinueShopping()}>CONTINUE SHOPPING <EastOutlinedIcon style={{ color: 'yellowgreen' }} /></button>
        </div>
      </div>
      {/* <div className='product'>
        <h1 style={{ textAlign: 'left' }}>Recommended Products </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '70px', columnGap: '60px', rowGap: '35px' }} >
          {
            filterProduct.map(i => (
              <div className='productad' onClick={() => send(i)}>
                <img src={i.image} alt='' />
                <h2> {i.tittle}</h2>
                <h4> ID: {i.id}</h4>
                <h3> Price: {i.price}</h3>
                <button>View Details</button>
              </div>
            ))
          }
        </div>
      </div> */}
    </div>
  )
}

export default ShowProductDetails
