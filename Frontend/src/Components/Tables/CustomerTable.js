import React, { useEffect, useState } from 'react'
import { GetVendorOrderedProductData } from '../../API/ProductAPI/ProductAPI';


const CustomerTable = ({orderedProducts}) => {
   
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="card">
            {orderedProducts && orderedProducts.map((item, index) => (
                <div className="card-body card-border m-3" key={item.id} style={{ border: '1px solid #183661', borderRadius: '10px' }}>
                    <div className="d-flex justify-content-between" style={{ color: '#183661' }}>
                        <p><strong>Order ID:</strong> {item.order.id} </p>
                        <p><strong>Ordered at:</strong> {formatDate(item.order.created_at)} </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-start" style={{ color: '#183661' }}>
                            <h6 className="card-subtitle mb-2" style={{ color: '#183661' }}>
                                <strong>Item:</strong> {item.product.product_name}          </h6>
                            <h6 className="card-subtitle mb-2" style={{ color: '#183661' }}>
                                <strong>Address:</strong> {item.order.customer.address}
                            </h6>
                            <h6 className="mb-2" style={{ color: '#183661' }}>
                                <strong>Quantity:</strong> {item.quantity}<br />
                            </h6>
                            <h6 className="mb-2" style={{ color: '#183661' }}>
                                <strong>Status:</strong> {item.order.status}
                            </h6>
                        </div>

                        <div>
                            <img src={item.order.customer.image} alt="Product" className="img-fluid rounded-circle"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'contain',
                                    marginRight: '10px',
                                    border: '3px solid #183661'
                                }} />
                            <p className="card-text" style={{ color: '#183661' }}>

                                <strong>Name: </strong> {item.order.customer.first_name} {item.order.customer.last_name}

                            </p>
                        </div>
                    </div>


                </div>
            ))}
        </div>
    )
}

export default CustomerTable
