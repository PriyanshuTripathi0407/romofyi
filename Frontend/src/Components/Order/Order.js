import React, { useState, useEffect } from 'react'
import './Order.css'
import fastDelivery from '../../Image/fast.png'
import orderPlaced from '../../Image/order-delivery.png'
import packaged from '../../Image/box.png'
import delivered from '../../Image/delivery-man.png'
import { GetUserOrderedItem } from '../../API/OrderedProductAPI/OrderedProductAPI'


function Order() {
  const [orderedItem, setOrderedItem] = useState(); // to get ordered item from backend
  
  const [userData, setUserData] = useState({})
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      setUserData(parsedData.user)
      handleGetUserOrderedItem();
    }
  }, []);

  const handleGetUserOrderedItem = async () => {
    const res = await GetUserOrderedItem()
    console.log("Get Order Items Response in Order.js : ", res.data.order_items)
    setOrderedItem(res.data.order_items)
  }
  return (
    <div className='container-fluid my-3'>
      <div className='row orderContainer p-2'>
        <h3>Your Orders</h3>
        {orderedItem ?
          orderedItem.map((product) => (
            <>
              <div className='col-4  d-flex flex-column'>
                <div className='ImageWrapper'>
                  <img src={product.product.product_image} alt='' />
                  <p>{product.product.product_name}</p>
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
              <div className='col-1 '>
              </div>

              <div className='col-7 order mb-2'>
                <h5> Ordered Product Details </h5>
                <ul>
                  <li><span className='item'>Product Id: {product.product.product_id} </span></li>
                  <li><span className='item'>Product Name: {product.product.product_name} </span></li>
                  <li><span className='item'>Product Price: {product.product.product_price} </span></li>
                  <li><span className='item'>Order Status: {product.order.status} </span></li>
                  <li><span className='item'>Product Weight:</span></li>
                  <li><span className='item'>Product Color: {product.product.product_color}</span></li>
                  <li><span className='item'>Product Category: {product.product.product_category.name} </span></li>
                  <li><span className='item'>Product Sub-category: </span></li>
                  <li><span className='item'>Product Origin: {product.product.vendor} </span></li>
                  <li><span className='item'>Product Quantity: {product.quantity} </span></li>
                  <li><span className='item'>Product Tags: {product.product.product_tag[0].name} </span></li>
                </ul>
              </div>
            </>
          ))
          :
          <>
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
          </>
        }
      </div>

    </div>
  )
}

export default Order
