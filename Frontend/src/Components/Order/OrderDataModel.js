import React, { useEffect, useState } from 'react'
import './Order.css'
import { GetUserOrderedItem } from '../../API/OrderedProductAPI/OrderedProductAPI';
import fastDelivery from '../../Image/fast.png'
import orderPlaced from '../../Image/order-delivery.png'
import packaged from '../../Image/box.png'
import delivered from '../../Image/delivery-man.png'

const OrderDataModel = () => {
    const [orderedItem, setOrderedItem] = useState([]); // to get ordered item from backend

    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            let parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user)
        }
    }, []);

    useEffect(() => {
        if (userData?.id) {
            handleGetUserOrderedItem();
        }
    }, [userData])


    const handleGetUserOrderedItem = async () => {
        if (!userData?.id) {
            console.warn("User ID is missing");
            return;
        }
        console.log("Fetching ordered items for user ID:", userData.id);
        try {
            await GetUserOrderedItem(userData.id)
                .then(res => {
                    console.log("Order Data:", res.data);
                    setOrderedItem(res.data.orders);
                })
                .catch(err => {
                    console.warn("Skipped fetch because:", err);
                });
        } catch (err) {
            console.error("Error fetching order item:", err);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Default locale format (can customize)
    };

    return (
        <div >
            {orderedItem && orderedItem.map((product, index) => (
                <div className="card mb-3 card-box" key={index}>
                    <h5 className="card-header"> <strong> Order Id: {product.order.id}</strong> </h5>
                    <div className='d-flex justify-content-between'>
                        <div className="card-body">
                            <img src={product.product.product_image} alt="Product" className="img-fluid rounded-circle"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'contain',
                                    marginRight: '10px',
                                    border: '3px solid #183661'
                                }} />
                            <h5 className="card-title" style={{ color: '#183661' }}>
                                <strong>Product Name:</strong> {product.product.product_name}
                            </h5>
                            <h5 className="card-title" style={{ color: '#183661' }}>
                                <strong>Product Id:</strong> {product.product.product_id}
                            </h5>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"><strong>Order Created : </strong> {formatDate(product.order.created_at)}</h5>
                            <h5 className="card-title"><strong>Order Status: </strong> {product?.status_display}</h5>
                            <h5 className="card-title"><strong>Price: </strong> {product?.product?.product_price}</h5>
                            <h5 className="card-title"><strong>Vendor Name: </strong> {product?.product?.vendor.first_name} {product?.product?.vendor.last_name}</h5>
                            <h5 className="card-title"><strong>Quantity: </strong> {product?.quantity}</h5>
                            <h5 className="card-title"><strong>Payment Done: </strong> {product?.order.is_paid ? "Paid" : "Unpaid"}</h5>


                        </div>
                    </div>
                    <div className='card-header'>
                        <h5>Ordered Product Status </h5>
                        <div className='StatusWrapper' >
                            <img src={orderPlaced} alt='' style={{
                                backgroundColor: `${(product.status_display === 'Order Placed' || product.status_display === 'Packed' || product.status_display === 'Shipped' || product.status_display === 'Delivered') ? 'green' : 'gold'}`,
                            }} />
                            <img src={packaged} alt='' style={{
                                backgroundColor: `${(product.status_display === 'Packed' || product.status_display === 'Shipped' || product.status_display === 'Delivered') ? 'green' : 'gold'}`
                            }} />
                            <img src={fastDelivery} alt='' style={{
                                backgroundColor: `${(product.status_display === 'Shipped' || product.status_display === 'Delivered') ? 'green' : 'gold'}`
                            }} />
                            <img src={delivered} alt='' style={{
                                backgroundColor: `${(product.status_display === 'Delivered') ? 'green' : 'gold'}`
                            }} />
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default OrderDataModel
