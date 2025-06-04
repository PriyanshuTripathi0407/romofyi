import React from 'react'
import './Order.css'
import fastDelivery from '../../Image/fast.png'
import orderPlaced from '../../Image/order-delivery.png'
import packaged from '../../Image/box.png'
import delivered from '../../Image/delivery-man.png'


function Order() {
  return (
    <div className='container-fluid my-3'>
      <div className='row orderContainer p-2'>        
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
          <div className='col-1'></div>
          <div className='col-7 order '>
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

    </div>
  )
}

export default Order
