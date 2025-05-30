import React from 'react'
import fashion from '../../Image/fashion.jpg'
import './Fashion.css'
import Slider from "react-slick";

function Fashion() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,

    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

  };
  return (
    <div >
      <Slider {...settings}>
        <div className='fashion' >
          <img src={fashion} alt='Image Fashion' className='w-100' />
        </div>
        <div className='fashion' >
          <img src={fashion} alt='Image Fashion' className='w-100' />
        </div>
        <div className='fashion' >
          <img src={fashion} alt='Image Fashion' className='w-100' />
        </div>
      </Slider>
    </div>
  )
}

export default Fashion
