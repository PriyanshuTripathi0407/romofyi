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

import { useEffect, useState } from 'react';
import Settings from '../../Components/Settings/Settings.js';

const UserDashboard = ({loginId, setLoginId}) => {
  const [index, setIndex] = useState(0);
  const [ProductData, setProductData] = useState([])
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
    }
  }, []);


  const [dbproduct, setProduct] = useState([]);
  
    useEffect(() => {
      handleGetData();
    }, [])
  
    const handleGetData = async () => {
      const response = await getData()
      setProduct(response.data);
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
                <h5>Viewed Products</h5>
              </div>
              <p>This is your last viewed products </p>

              <div className='d-flex justify-content-center gap-4'>
                <p>Product Name </p>
                <p>Product Image </p>
              </div>
              <div className='d-flex justify-content-between'>
                <Rating name='read-only-rating' defaultValue={4.5} readOnly />
                <EastTwoToneIcon />
              </div>
            </div>
            <div className='container-fluid logo mx-1 p-3'>
              <div className='d-flex justify-content-center gap-4'>
                <img src={romo} />
                <h5>Searched Products</h5>
              </div>
              <p>This is your last viewed products </p>
              <div className='d-flex justify-content-center gap-4'>
                <p>Product Name </p>
                <p>Product Image </p>
              </div>
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
              <p>This is your last viewed products </p>
              <div className='d-flex justify-content-center gap-4'>
                <p>Product Name </p>
                <p>Product Image </p>
              </div>
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
              <p>This is your last viewed products </p>
              <div className='d-flex justify-content-center gap-4'>
                <p>Product Name </p>
                <p>Product Image </p>
              </div>
              <div className='d-flex justify-content-between'>
                <Rating name='read-only-rating' defaultValue={4.5} readOnly />
                <EastTwoToneIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Your Orders Components */}
        <Order/>

        {/* Your Top Products Components */}
        <div className='row border py-2'>
          <h4>Top Products</h4>
          <Slider {...settings2} className='topProductsWrapper' >
              {dbproduct.map(
                (product,index) => (                 
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




// db.createCollection("university",{
// 	validator:{
// 	$jsonSchema: {
// 		required: ["name", "department","designation","age"],
// 		title:"University Object Validation",
// 		properties:{
// 			name:{
// 				bsonType:"string",
// 				description:"Name should be only in string",
// 			      },
// 			department:{
// 				bsonType:"string" ,
// 				enum:["CSIT", "Physics", "Chemistry"],
// 				description:"Department should be only either of CSIT, Physics, Chemistry ",
// 			      },
// 			designation:{
// 				bsonType:"string",
// 				enum:["HOD", "Professor", "Guard"],
// 				description:"Designation should be only either of HOD, Professor, Guard ",
// 			      },
// 			age:{
// 				bsonType:"int",
// 				description:"Age should be only in Integer",
// 			      },
// }}}});