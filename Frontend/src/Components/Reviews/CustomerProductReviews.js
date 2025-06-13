import React, { useState } from 'react'
import './Review.css'
import { Rating } from '@mui/material'
import romo from '../../Image/BannerGirl.png'

const CustomerProductReviews = () => {
    const [customer, setCustomer] = useState()

    return (
        <div className='container-fluid'>
            <div className='row'>
                <h2>Customer Reviews </h2>
                <div className='comment'>
                    <div className='ReviewContainer'>
                        <div className='ImageInfo'>
                            <img src={romo} alt='User Image' /><span>UserName</span>
                        </div>
                        <div className='comments'>
                            <Rating name='read-only-rating' className='rating' value={3.5} precision={0.5} readOnly />
                            <p>Customer Comments </p>
                        </div>
                    </div>
                    <div className='ReviewContainer'>
                        <div className='ImageInfo'>
                            <img src={romo} alt='User Image' /><span>UserName</span>
                        </div>
                        <div className='comments'>
                            <Rating name='read-only-rating' className='rating' value={3.5} precision={0.5} readOnly />
                            <p>Customer Comments </p>
                        </div>
                    </div>
                    <div className='ReviewContainer'>
                        <div className='ImageInfo'>
                            <img src={romo} alt='User Image' /><span>UserName</span>
                        </div>
                        <div className='comments'>
                            <Rating name='read-only-rating' className='rating' value={3.5} precision={0.5} readOnly />
                            <p>Customer Comments </p>
                        </div>
                    </div>
                    <div className='ReviewContainer'>
                        <div className='ImageInfo'>
                            <img src={romo} alt='User Image' /><span>UserName</span>
                        </div>
                        <div className='comments'>
                            <Rating name='read-only-rating' className='rating' value={3.5} precision={0.5} readOnly />
                            <p>Customer Comments </p>
                        </div>
                    </div>
                    <div className='ReviewContainer'>
                        <div className='ImageInfo'>
                            <img src={romo} alt='User Image' /><span>UserName</span>
                        </div>
                        <div className='comments'>
                            <Rating name='read-only-rating' className='rating' value={3.5} precision={0.5} readOnly />
                            <p>Customer Comments </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CustomerProductReviews
