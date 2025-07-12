import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import orderPlaced from '../../Image/order-delivery.png'
import { getWishlistedData } from '../../API/ViewProductAPI/ViewProductAPI';
import './Wishlist.css'

function Wishlist() {

    const [wishlistData, setWishlistedData] = useState()
    const [userData, setUserData] = useState({})
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user)
            handleGetWishlistedData();
        }
    }, []);

    const handleGetWishlistedData = async () => {
        const res = await getWishlistedData();
        console.log("Wishlist Data ", res.data.wishlisted_products)
        setWishlistedData(res.data.wishlisted_products)
    }
    return (
        <div className='container-fluid my-3'>
            <div className='row wishlistContainer'>
                <h4>Wishlisted Product Details <FavoriteIcon /> </h4>
                {wishlistData ?
                    wishlistData.map((product, index) => (
                        <>
                            <div className='card  card-box' key={index.id}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='ImageWrapper'>
                                        <img src={product.product.product_image} alt='' />
                                    </div>
                                    <div>
                                        <p className='item card-title'>Product ID: {product.product.product_id} </p>
                                        <p className='item card-title'>Product Name: {product.product.product_name}</p>
                                        <p className='item card-title'>Product Price:{product.product.product_price} </p>
                                        <p className='item card-title'>Product Brand: {product.product.product_category.name}</p>
                                        <p className='item card-title'>Product Tags: {product.product.product_tag[0].name} </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                    :
                    <div className='wishlist'>
                        <div className='ImageWrapper col-3'>
                            <img src={orderPlaced} alt='' />
                            <p>Wishlist Product Image</p>
                        </div>

                        <div className='col-9'>
                            <h4> Wishlisted Product </h4>
                            <ul >
                                <li><span className='item'>Product Name: </span></li>
                                <li><span className='item'>Product Price: </span></li>
                                <li><span className='item'>Product Discounts: </span></li>
                                <li><span className='item'>Product Brand: </span></li>
                                <li><span className='item'>Product Tags: </span></li>
                            </ul>
                        </div>
                    </div>

                }






            </div>

        </div>
    )
}

export default Wishlist
