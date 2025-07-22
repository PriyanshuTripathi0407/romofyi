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
import { getUserOrderedData, GetUserOrderedItem } from '../../API/OrderedProductAPI/OrderedProductAPI.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
  const [index, setIndex] = useState(0);
  const [dbproduct, setProduct] = useState([]); // to get data from backend
  const [viewedProduct, setViewedProduct] = useState([]); // to get Viewed data from backend
  const [cartProduct, setCartProduct] = useState([]); // to get cart data from backend
  const [searchedProduct, setSearchedProduct] = useState([]); // to get searched from backend
  const [orderedItem, setOrderedItem] = useState([]); // to get ordered item from backend
  const nav = useNavigate()

  function send(e){
    nav('/product', { state: e , replace:true });
  }

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

  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      let parsedData = JSON.parse(savedUser);
      setUserData(parsedData.user)
    }
  }, []);

  useEffect(() => {
    if (userData?.email) {
      handleGetViewedData();
      handleGetCartData();
      handleGetSearchedData();
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.id) {
      handleGetUserOrderedItem();
    }
  }, [userData])


  useEffect(() => {
    handleGetData();
  }, [])

  const handleGetData = async () => {
    const response = await getData()
    setProduct(response.data);
  }

  const handleGetViewedData = async () => {
    if (!userData?.email) return;
    try {
      const res = await getViewData(userData.email);
      console.log("Get Viewed product in UserDashboard.js:", res.data.viewed_products)
      setViewedProduct(res.data.viewed_products.product)
    } catch (error) {
      console.error("Error in getViewData", error)
    }

  }

  const handleGetCartData = async () => {
    if (!userData?.email) return;
    try {
      const res = await getCartData(userData.email);
      console.log("Get Cart product in UserDashboard.js:", res.data.cart_products.product)
      setCartProduct(res.data.cart_products.product)
    } catch (error) {
      console.error("Error in getCartData ", error)
    }
  }

  const handleGetSearchedData = async () => {
    if (!userData.email) return;
    try {
      const res = await getSearchedData(userData.email)
      console.log("Get Searched product data in UserDashboard.js : ", res.data.searched_products.product)
      setSearchedProduct(res.data.searched_products.product)
    } catch (error) {
      console.error("Error in getSearchedData ", error);
    }

  }

  const handleGetUserOrderedItem = async () => {
    if (!userData?.id) {
      console.warn("User ID is missing");
      return;
    }
    console.log("Fetching ordered items for user ID:", userData.id);
    try {
      await GetUserOrderedItem(userData.id)
        .then(res => {
          console.log("Order Data:", res.data);
          setOrderedItem(res.data.orders[0]);
        })
        .catch(err => {
          console.warn("Skipped fetch because:", err);
        });
    } catch (err) {
      console.error("Error fetching order item:", err);
    }
  };



  const handleNavigationOrderPage = () => {
    nav('/order', { replace: true })
  }
  const handleNavigationCartPage = () => {
    nav('/cart', { replace: true })
  }
  const handleNavigationProductPage = (e) => {
    nav('/product', { state: e , replace:true })
  }

  const BASE_URL = 'http://localhost:8000';
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

  if (!userData) {
    return <div>Loading user dashboard...</div>;
  }

  return (
    <div className='container-fluid' >
      <UserInfo />
      <div className='row m-2'>
        <div className='card'>
          <div className='card-body d-flex justify-content-left align-items-center'>
            <div className='ImgWrapper'>
              <img src={userData?.image ? `${BASE_URL}${userData.image}` : romo} alt='User_Image' />

            </div>
            <div className='row'>
              <div className='col-5'>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}><strong> ID : </strong></p>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}><strong> Name : </strong></p>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}><strong> Email : </strong></p>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}><strong> Mobile : </strong></p>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}><strong> Address : </strong></p>
              </div>
              <div className='col-7'>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}>{userData?.id}</p>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}>{userData?.first_name} {userData?.last_name}</p>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}>{userData?.email}</p>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}>{userData?.contact}</p>
                <p className="card-subtitle mb-2" style={{ color: '#183661' }}>{userData?.address}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='row'>

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
                <div className='d-flex justify-content-center align-items-center viewProduct gap-4' onClick={()=>handleNavigationProductPage(viewedProduct.product_category.name)}>
                  <h6>{viewedProduct?.product_name} </h6>
                  <img src={viewedProduct?.product_image ? viewedProduct?.product_image : romo} alt='Product_Image' />
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
                <div className='d-flex justify-content-center align-items-center viewProduct gap-4' onClick={()=>handleNavigationProductPage(searchedProduct.product_category.name)}>
                  <h6>{searchedProduct?.product_name} </h6>
                  <img src={searchedProduct.product_image ? searchedProduct.product_image : romo} alt='Product_Image' />
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
                <div className='d-flex justify-content-center align-items-center viewProduct gap-4' onClick={handleNavigationCartPage}>
                  <h6>{cartProduct.product_name} </h6>
                  <img src={cartProduct.product_image ? cartProduct.product_image : romo} alt='Product_Image' />
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
                <div className='d-flex justify-content-center align-items-center viewProduct gap-4' onClick={handleNavigationOrderPage}>
                  <p>Order Status: {orderedItem?.order?.status}</p>
                  <img src={orderedItem?.product?.product_image ? orderedItem?.product?.product_image : romo} alt='Product_Image' />
                </div>
                :
                <p>You've not ordered yet </p>
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
                  <img src={product.product_image ? product?.product_image : romo} alt='Image ' />
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


