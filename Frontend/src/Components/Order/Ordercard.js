import React, { useEffect, useState } from 'react';
import { GetVendorOrderedProductData } from '../../API/ProductAPI/ProductAPI';

const Ordercard = ({ order, onStatusChange }) => {
    const [status, setStatus] = useState('pending');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async () => {
        setIsUpdating(true);

        setIsUpdating(false);
    };

    const [orderedProducts, setOrderedProducts] = useState();
    let savedUser = localStorage.getItem('user');

    useEffect(() => {
        getVendorOrderedProductData();
    }, [savedUser])
    const getVendorOrderedProductData = async () => {
        try {
            const resp = await GetVendorOrderedProductData();
            console.log('This is Ordered Product', resp.data);
            setOrderedProducts(resp.data.order_items);
        } catch (error) {
            console.error('Error fetching vendor product data:', error);
        }
    };

    return (
        <div className="card mb-3">
            {orderedProducts.map((item, index) => (
                <div className="card-body" key={index}>
                    <h5 className="card-title">Order ID:{item.id} </h5>
                    <h5 className="card-title">Order created at:{item.order.created_at} </h5>
                    <h6 className="card-subtitle mb-2 text-muted">Customer: {item.order.customer.first_name} {item.order.customer.last_name}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Customer: {item.order.customer.address}</h6>
                    <p className="card-text">
                        <strong>Item:</strong> {item.product.product_name}<br />
                        <strong>Quantity:</strong> {item.quantity}<br />
                        <strong>Status:</strong>{item.order.status}
                    </p>

                    <div className="input-group mb-3">
                        <label className="input-group-text"
                        //   htmlFor={`status-select-${order.id}`}
                        >Update Status</label>
                        <select
                            className="form-select"
                            id={`status-select-${item.id}`}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {item.status_choices.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleStatusChange}
                    //   disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Update Status'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Ordercard;
