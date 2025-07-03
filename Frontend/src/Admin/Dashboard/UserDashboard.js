import UserInfo from '../../Components/Header/UserInfo.js';
import romo from '../../Image/BannerGirl.png'
import './UserDashboard.css';
import Slider from "react-slick";
import Order from '../../Components/Order/Order.js';

import Rating from '@mui/material/Rating';
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import HourglassFullOutlinedIcon from '@mui/icons-material/HourglassFullOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

import { getData } from '../../API/ProductAPI/ProductAPI.js'
import { getViewData } from '../../API/ViewProductAPI/ViewProductAPI.js';
import { getCartData } from '../../API/CartAPI/AddedtoCartProductAPI.js';
import { getSearchedData } from '../../API/SearchedProductAPI/SearchedProductAPI.js';
import { GetUserOrderedItem } from '../../API/OrderedProductAPI/OrderedProductAPI.js';
import { useEffect, useState } from 'react';


const UserDashboard = ({ loginId, setLoginId }) => {
  const [index, setIndex] = useState(0);
  const [dbproduct, setProduct] = useState([]); // to get data from backend
  const [viewedProduct, setViewedProduct] = useState([]); // to get Viewed data from backend
  const [cartProduct, setCartProduct] = useState([]); // to get cart data from backend
  const [searchedProduct, setSearchedProduct] = useState([]); // to get cart data from backend
  const [orderedItem, setOrderedItem] = useState([]); // to get cart data from backend


  const icons = [
    <HourglassTopOutlinedIcon key="top" fontSize="large" />,
    <HourglassFullOutlinedIcon key="full" fontSize="large" />,
    <HourglassBottomOutlinedIcon key="bottom" fontSize="large" />,
    <HourglassEmptyOutlinedIcon key="empty" fontSize="large" />
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 1000); // Change icon every 1 second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const [userData, setUserData] = useState({})
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      setUserData(parsedData.user)
      handleGetViewedData(parsedData.user)
      handleCartData(parsedData.user)
      handleGetSearchedData();
      handleGetUserOrderedItem();
    }
  }, []);




  useEffect(() => {
    handleGetData();
  }, [])

  const handleGetData = async () => {
    const response = await getData()
    setProduct(response.data);
  }

  const handleGetViewedData = async (user) => {
    const res = await getViewData();
    setViewedProduct(res.data.viewed_products.product)
  }

  const handleCartData = async (user) => {
    const res = await getCartData();
    // console.log("This is cart product from backend :", res.data.cart_products.product)
    setCartProduct(res.data.cart_products.product)
  }

  const handleGetSearchedData = async () => {
    const res = await getSearchedData()
    // console.log("Get Response in UserDashboard.js : ", res.data.searched_products.product)
    setSearchedProduct(res.data.searched_products.product)
  }

  const handleGetUserOrderedItem = async () => {
    const res = await GetUserOrderedItem()
    console.log("Get Order Items Response in UserDashboard.js : ", res.data.order_items[0].product)
    setOrderedItem(res.data.order_items[0].product)
  }



  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
  };

  var settings2 = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };


  return (
    <div className='container-fluid' >
      <div className='row'>
        <UserInfo loginId={loginId} setLoginId={setLoginId} />

        {/* Your Activities components */}
        <div className='row border py-2 '>
          <h3>Your Activities</h3>
          <div className='d-flex justify-content-between'>
            <div className='container-fluid logo mx-1 p-3'>
              <span className='time'> {icons[index]}</span>
              <div className='d-flex justify-content-center gap-4'>
                <img src={romo} />
                <h5>Last Viewed Products</h5>
              </div>
              {viewedProduct ?
                <div className='d-flex justify-content-center align-items-center viewProduct gap-4'>
                  <h6>{viewedProduct.product_name} </h6>
                  <img src={viewedProduct.product_image} alt='Product_Image' />
                </div>
                :
                <p>You've not viewed any products yet </p>
              }
              <div className='d-flex justify-content-between'>
                <Rating name='read-only-rating' defaultValue={5} precision={0.5} readOnly />
                {/* <Rating name='read-only-rating' defaultValue={viewedProduct.product_rating} precision={0.5} readOnly /> */}
                <p><EastTwoToneIcon /></p>
              </div>
            </div>
            <div className='container-fluid logo mx-1 p-3'>
              <div className='d-flex justify-content-center gap-4'>
                <img src={romo} />
                <h5>Searched Products</h5>
              </div>
              {searchedProduct ?
                <div className='d-flex justify-content-center align-items-center viewProduct gap-4'>
                  <h6>{searchedProduct.product_name} </h6>
                  <img src={searchedProduct.product_image} alt='Product_Image' />
                </div>
                :
                <p>You didn't searched anything </p>
              }

              <div className='d-flex justify-content-between'>
                <Rating name='read-only-rating' defaultValue={4.5} readOnly />
                <EastTwoToneIcon />
              </div>
            </div>
            <div className='container-fluid logo mx-1 p-3'>
              <div className='d-flex justify-content-center gap-4'>
                <img src={romo} />
                <h5>Add to Cart Products</h5>
              </div>
              {cartProduct ?
                <div className='d-flex justify-content-center align-items-center viewProduct gap-4'>
                  <h6>{cartProduct.product_name} </h6>
                  <img src={cartProduct.product_image} alt='Product_Image' />
                </div>
                :
                <p>Your Cart is empty yet </p>
              }
              <div className='d-flex justify-content-between'>
                <Rating name='read-only-rating' defaultValue={4.5} readOnly />
                <EastTwoToneIcon />
              </div>
            </div>
            <div className='container-fluid logo mx-1 p-3'>
              <div className='d-flex justify-content-center gap-4'>
                <img src={romo} />
                <h5>Ordered Product</h5>
              </div>
              {orderedItem ?
                <div className='d-flex justify-content-center align-items-center viewProduct gap-4'>
                  <h6>{orderedItem.product_name} </h6>
                  <img src={orderedItem.product_image} alt='Product_Image' />
                </div>
                :
                <p>Your Cart is empty yet </p>
              }
              <div className='d-flex justify-content-between'>
                <Rating name='read-only-rating' defaultValue={4.5} readOnly />
                <EastTwoToneIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Your Orders Components */}
        <Order />

        {/* Your Top Products Components */}
        <div className='row border py-2'>
          <h4>Top Products</h4>
          <Slider {...settings2} className='topProductsWrapper' >
            {dbproduct.map(
              (product, index) => (
                <div className='topProducts p-2' key={index}>
                  <img src={product.product_image} alt='Image ' />
                  <Rating name='read-only-rating' value={parseFloat(product.product_rating) || 0} readOnly />
                  <h6>{product.product_name}</h6>
                </div>
              )
            )}
          </Slider>

        </div>


      </div>

    </div>
  )
}

export default UserDashboard


