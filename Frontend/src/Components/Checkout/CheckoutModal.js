import React, { useState } from 'react';
import { Modal, Button, Card } from 'antd';

const CheckoutModal = ({showModal,orderId, setShowModal, userData, cartProduct, handleCheckout }) => {    

    const getUserData = (field) => userData?.[field] || 'Not available';
    const getCartTotal = () => cartProduct.reduce((total, item) => total + (item.count || 1) * item.product_price, 0);
    const getItemName = (item) => item.product_name || 'Unknown Product';
    const getItemPrice = (item) => item.product_price || 0;

    
    return (
        <Modal
            show={showModal}
            open={true}
            onCancel={() => setShowModal(false)}
            footer={null}
            title="Romofyi Checkout Information"
            style={{ top: 20 }}
            centered
        >
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>

                {/* User Info */}
                <Card title="User Information" style={{ marginBottom: '20px' }}>
                    <p><strong>Name:</strong> {getUserData('first_name')} {getUserData('last_name')}</p>
                    <p><strong>Email:</strong> {getUserData('email')}</p>
                    <p><strong>Phone:</strong> {getUserData('contact')}</p>
                    <p><strong>Address:</strong> {getUserData('address')}</p>
                </Card>
                <Card title="Order Information">
                    <p><strong>Order Id:</strong> {orderId}</p>
                </Card>

                {/* Cart Product Information */}
                <Card title="Items to be Purchased" style={{ marginBottom: '20px' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {cartProduct ? cartProduct.map((item, index) => (
                            <li key={item.product_id} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{getItemName(item)} (x{item.count || 1})</span>
                                    <span>₹{getItemPrice(item) * (item.count || 1)}</span>
                                </div>
                            </li>
                        )) : (
                            <p>No items in the cart.</p>
                        )}
                    </ul>
                </Card>

                {/* Order Summary */}
                <Card title="Order Summary" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span><strong>Total Amount:</strong></span>
                        <span>₹{getCartTotal()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <span><strong>Delivery:</strong></span>
                        <span>Free</span>
                    </div>
                </Card>

                {/* Checkout Button */}
                <div style={{ textAlign: 'right' }}>
                    <Button
                        type="default"
                        onClick={() => setShowModal(false)}
                        style={{ marginRight: '10px' }}
                    >
                        Close
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleCheckout}
                        disabled={cartProduct.length === 0}
                    >
                        Pay Now
                    </Button>
                </div>

            </div>
        </Modal>
    );
};

export default CheckoutModal;
