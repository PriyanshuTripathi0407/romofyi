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
import { PostUserOrderData } from '../../API/OrderedProductAPI/OrderedProductAPI'
import { message } from 'antd';
import { PostOrderPlacedEmail } from '../../API/SendEmail/SendEmailAPI';
import CheckoutModal from '../Checkout/CheckoutModal';

const AddtoCart = ({ cartProduct, setCartProduct, setPaymentSessionID, paymentSessionID }) => {

    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState(null);
    const [orderId, setOrderId] = useState('');
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user);
        }
    }, []);

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

    const stripePromise = loadStripe('pk_test_51RXFo72eRp4TJiWZ9KuZmQKA3d65X0UASU1jgzXEIzUxCy0XORTzCdpZwdg8ue1hTdRc0xarOtVdE0XYgiWEK8S400VlzoisnI'); // Replace with your real publishable key
    const [showAnimation, setShowAnimation] = useState(false);



    const handleUserOrder = async () => {
        if (!userData.id) {
            message.error("Missing user ID");
            return;
        }

        try {
            const items = cartProduct.map(item => ({
                product_id: item.id,
                count: item.count || 1,
                name: item.product_name,
                image: item.product_image,
                price: item.product_price,
            }));

            const orderProduct = {
                customer: userData.id,
                items: items,
                // session_id: session,
            };

            const resp = await PostUserOrderData(orderProduct);
            setOrderId(resp.data.order_id)
            if (resp?.status === 201) {
                console.log("This is Order Data Added", resp.data);
                const data = {
                    username: userData.first_name + " " + userData.last_name,
                    subject: "Order 🎁 placed successfully !! 🎉✨",
                    email: userData.email,
                    date: new Date(),
                    items: items,
                    address: userData.address,
                    total: cartProduct.reduce((total, item) => total + (item.count || 1) * item.product_price, 0),
                };
                const res = await PostOrderPlacedEmail(data);
                console.log("Order Placed ", res);
            }
        } catch (error) {
            message.error("Order placement failed");
            console.error("Error placing order:", error);
        }

    };

    const handleCheckout = async () => {
        if (cartProduct.length === 0) {
            message.warning("Please add products to the cart.");
            return;
        }

        setShowAnimation(true);
        setTimeout(async () => {
            const totalAmount = cartProduct.reduce((total, item) => {
                return total + (item.product_price * (item.count || 1));
            }, 0);

            try {
                if (orderId) {
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
                            })),
                            user: userData.id,
                            order: orderId,
                        }),
                    });

                    const data = await res.json();
                    // console.log("User Order Id ",orderId)
                    // if (!orderId) {
                    //     await handleUserOrder(data.id);
                    // }                   

                    // Stripe Payment Code 
                    if (data.id) {
                        console.log("This is session Id in Cart ",data.id)
                        const stripe = await stripePromise;
                        await stripe.redirectToCheckout({ sessionId: data.id });
                    } else {
                        message.error('Failed to create Stripe session.');
                    }
                }
            } catch (error) {
                console.error('Error during Stripe checkout:', error);
                message.error('Error initiating payment.');
            } finally {
                setShowAnimation(false);
            }

        }, 2000);
    };

    const handleUserOrderCheckout = async () => {
        if (!orderId) {
            await handleUserOrder();
        }
        // const checkout = await handleCheckout();
        setShowModal(true);
    }

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
                                    <tr key={i.product_id || index}>
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
                        {cartProduct.map((item, index) => (
                            <div className='item' key={index}>
                                <p>{item.product_name}</p>
                                <p>&#8377;{item.product_price}</p>
                            </div>
                        ))}
                        <div>
                            <hr />
                            <h6>Delivery Charge : 0/- Now </h6>
                            {/* <h6>Discount : </h6> */}
                            <h6>Total Fare : ₹
                                {cartProduct.reduce((total, item) => total + (item.count || 1) * item.product_price, 0)}
                            </h6>
                        </div>
                    </div>
                </div>
                <div className='productPayment'>
                    <h1
                        onClick={userData ? handleUserOrderCheckout : () => message.error("User not loaded")}
                        className="payNowBtn"
                    >
                        Continue to Order <ArrowCircleRightOutlinedIcon />
                    </h1>
                </div>
                <div className='productPayment'>
                    <Link to='/product'>
                        <h1><ArrowCircleLeftOutlinedIcon /> Back to Shopping </h1>
                    </Link>
                </div>
            </div>
            {showModal && (
                <CheckoutModal orderId={orderId} showModal={showModal} setShowModal={setShowModal} userData={userData} cartProduct={cartProduct} handleCheckout={handleCheckout} />
            )}

        </div>
    );
};

export default AddtoCart;
