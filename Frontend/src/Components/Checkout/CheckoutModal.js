import React from 'react';
import { Modal, Button } from 'antd';

const CheckoutModal = ({ showModal, setShowModal, userData, cartProduct, handleCheckout }) => {
    return (
        <Modal show={showModal} onCancel={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Romofyi Checkout Information</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
                {/* User Info */}
                <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="card-body">
                        <h5 className="card-title">User Information</h5>
                        <p><strong>Name:</strong> {userData?.first_name} {userData?.last_name}</p>
                        <p><strong>Email:</strong> {userData?.email}</p>
                        <p><strong>Phone:</strong> {userData?.phone || 'Not provided'}</p>
                        <p><strong>Address:</strong> {userData?.address || 'Not available'}</p>
                    </div>
                </div>

                {/* Cart Product Information */}
                <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="card-body">
                        <h5 className="card-title">Items to be Purchased</h5>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {cartProduct.map((item, index) => (
                                <li key={item.product_id} style={{ marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{item.product_name} (x{item.count || 1})</span>
                                        <span>₹{item.product_price * (item.count || 1)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="card-body">
                        <h5 className="card-title">Order Summary</h5>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Total Amount:</span>
                            <span>₹{cartProduct.reduce((total, item) => total + (item.count || 1) * item.product_price, 0)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <span>Delivery:</span>
                            <span>Free</span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="primary" onClick={handleCheckout}>Pay Now</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CheckoutModal;
