import React, { useEffect, useState } from 'react';
import './Cart.css';
import { getData, PostData, PutData, DeleteData } from '../../API/CartAPI/CartAPI';
import PaymentIcon from '@mui/icons-material/Payment';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import ReadytoPayment from '../ShowMessages/ReadytoPayment'

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

    // Payment Gateway code
    const stripePromise = loadStripe('pk_test_51RXFo72eRp4TJiWZ9KuZmQKA3d65X0UASU1jgzXEIzUxCy0XORTzCdpZwdg8ue1hTdRc0xarOtVdE0XYgiWEK8S400VlzoisnI'); // Replace with your real publishable key
    const [showAnimation, setShowAnimation] = useState(false);
    const handleCheckout = async () => {
        setShowAnimation(true); // Show animation immediately

        setTimeout(async () => {
            const totalAmount = cartProduct.reduce((total, item) => {
                return total + (item.product_price * (item.count || 1));
            }, 0);

            try {
                const res = await fetch('http://localhost:8000/api/create-checkout-session/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        items: cartProduct.map(item => ({
                            product_name: item.product_name,
                            product_price: item.product_price,
                            count: item.count || 1,
                        }))
                    }),

                });

                console.log("This is my Checkout session called in cart",res)
                const data = await res.json();
                // Waits for the server to respond, and parses the returned JSON data

                if (data.id) {
                    const stripe = await stripePromise;
                    await stripe.redirectToCheckout({ sessionId: data.id });
                } else {
                    alert('Failed to create Stripe session');
                }
            } catch (error) {
                console.error('Error during Stripe checkout:', error);
                alert('Error initiating payment');
            }
        }, 2000);
    };

    if (showAnimation) {
        return <ReadytoPayment />;
    }

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
            <div className='col-4 '>
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
                            <h6>Total Fare : ₹
                                {cartProduct.reduce((total, item) => total + (item.count || 1) * item.product_price, 0)}
                            </h6>
                        </div>
                    </div>
                </div>
                <div className='productPayment'>
                    <button onClick={handleCheckout} className="payNowBtn">
                        Continue to Payment <ArrowCircleRightOutlinedIcon />
                    </button>
                </div>
                <div className='productPayment'>
                    <Link to='/product'>
                        <h1><ArrowCircleLeftOutlinedIcon /> Back to Shopping </h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddtoCart;
