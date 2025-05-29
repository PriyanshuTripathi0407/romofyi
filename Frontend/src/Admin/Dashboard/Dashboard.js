import Dropdowns from '../../Components/Dropdown/Dropdowns';
import UserInfo from '../../Components/Header/UserInfo';
import Sidebar from '../../Components/Sidebar/Sidebar';
import romo from '../../Image/BannerGirl.png'
import './Dashboard.css';
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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

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

  return (
    <div className='container-fluid' >
      <div className='row'>
        <UserInfo />
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

        <div className='row border'>
          <h3>Your Orders</h3>
          <div className='col-4 order '>
            <div>  Ordered Product Image </div>
            <div className='d-flex justify-content-between     '>  Ordered Product Status 
        <img src={orderPlaced} alt=''/>
        <img src={packaged} alt=''/>
        <img src={fastDelivery} alt=''/>
        <img src={delivered} alt=''/>
            </div>
          </div>
          <div className='col-8 order '>Ordered Product Details</div>
        </div>

        <div className='col-md-8 '>
          {/* <Dropdowns /> */}
          <div className='container-fluid'>
            <div className='d-flex align-items-center justify-content-between w-100'>
              <div className='p-2'>
                <img src='' alt='Product Image' />
                <p className='fw-bold mb-0'>Product Name</p>
                <div className='d-flex justify-content-between flex-row gap-5'>
                  <p>Product Price</p>
                  <p>Product Discount</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='col-md-4'>

        </div>
      </div>

    </div>
  )
}

export default Dashboard
