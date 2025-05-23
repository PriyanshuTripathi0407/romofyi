import React, { useEffect, useState } from 'react';
import './Cart.css';
import { getData, PostData, PutData, DeleteData } from '../../API/CartAPI/CartAPI';
import PaymentIcon from '@mui/icons-material/Payment';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
const AddtoCart = ({ cartProduct, setCartProduct }) => {


    console.log(cartProduct, "This is cartproduct of Cart.js")
    const handleIncrease = (id) => {
        setCartProduct((prevCart) =>
            prevCart.map((item) =>
                item.product_id === id ? { ...item, count: (item.count || 1) + 1 } : item
            )
        );
    };

    const handleDecrease = (id) => {
        setCartProduct((prevCart) =>
            prevCart.map((item) =>
                item.product_id === id && (item.count || 1) > 1
                    ? { ...item, count: (item.count || 1) - 1 }
                    : item
            )
        );
    };

    const handleDelete = (id) => {
        const filterItem = cartProduct.filter((item) => item.product_id !== id);
        setCartProduct(filterItem);
    };

    const handleChange = (id, value) => {
        const numericValue = Number(value);
        if (numericValue >= 1) {
            setCartProduct((prevCart) =>
                prevCart.map((item) =>
                    item.product_id === id ? { ...item, count: numericValue } : item
                )
            );
        }
    };

    return (
        <div className='cartContainer'>
            <div className='col-7 addCart'>
                {!cartProduct || cartProduct.length === 0 ? (
                    <div>
                        <h2>Your Cart is Empty</h2>
                    </div>
                ) : (
                    <div>
                        <h1>My Cart </h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartProduct.map((i, index) => (
                                    <tr key={i.product_id}>
                                        <td>{index + 1}</td>
                                        <td>{i.product_id}</td>
                                        <td>
                                            <div className='productShow'>
                                                <img src={i.product_image} alt='Product' />
                                                <div className='productName'>{i.product_name}</div>
                                            </div>
                                        </td>
                                        <td>&#8377;{i.product_price}</td>
                                        <td>
                                            <div className='cartOperation'>
                                                <button onClick={() => handleDecrease(i.product_id)}>-</button>
                                                <input
                                                    type='number'
                                                    min='1'
                                                    max='20'
                                                    value={i.count || 1}
                                                    onChange={(e) => handleChange(i.id, e.target.value)}
                                                />
                                                <button onClick={() => handleIncrease(i.product_id)}>+</button>
                                            </div>
                                        </td>
                                        <td>&#8377;{(i.count || 1) * i.product_price}</td>
                                        <td >
                                            <button className='action' onClick={() => handleDelete(i.product_id)}><ClearOutlinedIcon style={{ fontSize: '15px' }} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className='col-4'>
                <div className='paymentDetails'>
                    <h1><PaymentIcon /> Payment Details </h1>
                    <div className='priceInfo'>
                        {cartProduct.map((item) => (
                            <div className='item'>
                                <p>{item.product_name}</p>
                                <p>&#8377;{item.product_price}</p>
                            </div>
                        ))}
                        <div>
                            <hr />
                            <h6>Delivery Charge : </h6>
                            <h6>Discount : </h6>
                            <h6>Total Fare : </h6>
                        </div>
                    </div>
                </div>
                <div className='productPayment'>
                    <h1>Continue to Payment <ArrowCircleRightOutlinedIcon/></h1>
                </div>
            </div>
        </div>
    );
};

export default AddtoCart;
