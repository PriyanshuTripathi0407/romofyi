import UserInfo from '../../Components/Header/UserInfo';
import romo from '../../Image/BannerGirl.png'
import './Dashboard.css';
import Slider from "react-slick";
import fastDelivery from '../../Image/fast.png'
import orderPlaced from '../../Image/order-delivery.png'
import packaged from '../../Image/box.png'
import delivered from '../../Image/delivery-man.png'

import Rating from '@mui/material/Rating';
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import HourglassFullOutlinedIcon from '@mui/icons-material/HourglassFullOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';


import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [index, setIndex] = useState(0);
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


  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className='container-fluid' >
      <div className='row'>
        <UserInfo />

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
        <div className='row border py-2'>
          <h3>Your Orders</h3>
          <div className='col-4 order d-flex flex-column'>
            <div className='ImageWrapper'>
              <img src={orderPlaced} alt='' />
              <p>Ordered Product Image</p>
            </div> <hr />
            <div>
              <h5>Ordered Product Status </h5>
              <div className='StatusWrapper'>
                <img src={orderPlaced} alt='' />
                <img src={packaged} alt='' />
                <img src={fastDelivery} alt='' />
                <img src={delivered} alt='' />
              </div>
            </div>
          </div>
          <div className='col-8 order '>
            <h5> Ordered Product Details </h5>
            <ul>
              <li><span className='item'>Product Name: </span></li>
              <li><span className='item'>Product Price: </span></li>
              <li><span className='item'>Product Discounts: </span></li>
              <li><span className='item'>Product Size/dimensions</span></li>
              <li><span className='item'>Product Weight:</span></li>
              <li><span className='item'>Product Color:</span></li>
              <li><span className='item'>Product Category: </span></li>
              <li><span className='item'>Product Sub-category: </span></li>
              <li><span className='item'>Product Origin: </span></li>
              <li><span className='item'>Product Brand: </span></li>
              <li><span className='item'>Product Tags: </span></li>
            </ul>
          </div>
        </div>

        {/* Your Top Products Components */}
        <div className='row border py-2'>
          <h4>Top Products</h4>
          <Slider {...settings} className='topProductsWrapper' >
            <div className='topProducts mx-1 p-3'>
              <img src={orderPlaced} alt='Image ' />
              <h4>Product 1</h4>
              <Rating name='read-only-rating' defaultValue={4.5} readOnly />
            </div>
            <div className='topProducts mx-1 p-3'>
              <img src={orderPlaced} alt='Image ' />
              <h4>Product 2</h4>
              <Rating name='read-only-rating' defaultValue={4.5} readOnly />
            </div>
            <div className='topProducts mx-1 p-3'>
              <img src={orderPlaced} alt='Image ' />
              <h4>Product 3</h4>
              <Rating name='read-only-rating' defaultValue={4.5} readOnly />
            </div>
            <div className='topProducts mx-1 p-3'>
              <img src={orderPlaced} alt='Image ' />
              <h4>Product 4</h4>
              <Rating name='read-only-rating' defaultValue={4.5} readOnly />
            </div>
            <div className='topProducts mx-1 p-3'>
              <img src={orderPlaced} alt='Image ' />
              <h4>Product 5</h4>
              <Rating name='read-only-rating' defaultValue={4.5} readOnly />
            </div>



          </Slider>

        </div>


       
      </div>

    </div>
  )
}

export default Dashboard




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