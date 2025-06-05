import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import fastDelivery from '../../Image/fast.png'
import orderPlaced from '../../Image/order-delivery.png'
import packaged from '../../Image/box.png'
import delivered from '../../Image/delivery-man.png'
import './Wishlist.css'

function Wishlist() {
    return (
        <div className='container-fluid my-3'>
            <div className='row wishlistContainer'>
                <h4>Wishlisted Product Details <FavoriteIcon /> </h4>
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

                

            </div>

        </div>
    )
}

export default Wishlist
