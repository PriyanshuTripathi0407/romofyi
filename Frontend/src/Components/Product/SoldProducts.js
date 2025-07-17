import React, { useEffect, useState } from 'react'
import './SoldProduct.css'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import NoDataFound from '../ShowMessages/NoDataFound';
import { Button } from 'antd';
import { GetVendorOrderedProductData } from '../../API/ProductAPI/ProductAPI';

const SoldProducts = ({orderedProducts}) => {
       
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); 
    };

    return (
        <div className='SoldProductContainer'>
            <div className='col'>
                <h2>Sold Products Data</h2>
                {orderedProducts && orderedProducts.length > 0 ?
                    orderedProducts.filter(i => i.status_display === "Delivered").map((item, index) => (
                        <div className="card-body card-border m-3 p-2" key={item.id} style={{ border: '1px solid #183661', borderRadius: '10px' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-start" style={{ color: '#183661' }}>
                                    <p className="card-subtitle mb-2"><strong>Order ID:</strong> {item.order.id} </p>
                                    <p className="card-subtitle mb-2"><strong>Product ID:</strong> {item.product.product_id} </p>
                                    <p className="card-subtitle mb-2"><strong>Ordered at:</strong> {formatDate(item.order.created_at)} </p>
                                    <h6 className="card-subtitle mb-2" style={{ color: '#183661' }}>
                                        <strong>Customer:</strong> {item.order.customer.first_name} {item.order.customer.last_name}
                                    </h6>
                                    <h6 className="card-subtitle mb-2" style={{ color: '#183661' }}>
                                        <strong>Address:</strong> {item.order.customer.address}
                                    </h6>
                                    <h6 className="mb-2" style={{ color: '#183661' }}>
                                        <strong>Quantity:</strong> {item.quantity}<br />
                                    </h6>
                                    <h6 className="mb-2" style={{ color: '#183661' }}>
                                        <strong>Status:</strong> {item.status_display}
                                    </h6>
                                </div>

                                <div>
                                    <img src={item.product.product_image} alt="Product" className="img-fluid rounded-circle"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'contain',
                                            marginRight: '10px',
                                            border: '3px solid #183661'
                                        }} />
                                    <p className="card-text" style={{ color: '#183661' }}>
                                        <strong>Item:</strong> {item.product.product_name}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))
                    :
                    (
                        <div>
                            <NoDataFound />
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default SoldProducts
