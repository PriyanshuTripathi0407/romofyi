import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import orderPlaced from '../../Image/order-delivery.png'
import { getWishlistedData } from '../../API/ViewProductAPI/ViewProductAPI';
import './Wishlist.css'

function Wishlist() {

    const [wishlistData, setWishlistedData] = useState()
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user)
        }
    }, []);
    
    useEffect(()=>{
        if(userData.email){
            handleGetWishlistedData();
        }
    },[userData])

    const handleGetWishlistedData = async () => {
        if (!userData) return;
        try{
            const res = await getWishlistedData(userData.email);
            console.log("Wishlist Data ", res.data.wishlisted_products)
            setWishlistedData(res.data.wishlisted_products)
        }catch(error){
            console.error("Error in Wishlist Data ",error);
            
        }
    }
    return (
        <div className='container-fluid my-3'>
            <div className='row wishlistContainer'>
                <h4>Wishlisted Product Details <FavoriteIcon /> </h4>
                {wishlistData ?
                    wishlistData.map((product, index) => (
                        <>
                            <div className='card  box-card my-2' key={index.id}>
                                <div className='d-flex justify-content-center align-items-center flex-column'>
                                    <div className='ImageWrapper'>
                                        <img src={product.product.product_image} alt='' />
                                    </div>
                                    <div>
                                        <p className='card-title'><strong> Product ID: </strong> {product.product.product_id} </p>
                                        <p className='card-title'><strong> Product Name: </strong> {product.product.product_name}</p>
                                        <p className='card-title'><strong> Product Price: </strong>{product.product.product_price} </p>
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
