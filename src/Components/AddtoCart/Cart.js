import React, { useEffect, useState } from 'react';
import './Cart.css';

const AddtoCart = ({ cartProduct, setCartProduct }) => {

    const handleIncrease = (id) => {
        setCartProduct((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, count: (item.count || 1) + 1 } : item
            )
        );
    };

    const handleDecrease = (id) => {
        setCartProduct((prevCart) =>
            prevCart.map((item) =>
                item.id === id && (item.count || 1) > 1
                    ? { ...item, count: (item.count || 1) - 1 }
                    : item
            )
        );
    };

    const handleDelete = (id) => {
        const filterItem = cartProduct.filter((item) => item.id !== id);
        setCartProduct(filterItem);
    };

    const handleChange = (id, value) => {
        const numericValue = Number(value);
        if (numericValue >= 1) {
            setCartProduct((prevCart) =>
                prevCart.map((item) =>
                    item.id === id ? { ...item, count: numericValue } : item
                )
            );
        }
    };

    return (
        <div className='addCart'>
            {!cartProduct || cartProduct.length === 0 ? (
                <div>
                    <h2>Your Cart is Empty</h2>
                </div>
            ) : (
                <div>
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
                                <tr key={i.id}>
                                    <td>{index + 1}</td>
                                    <td>{i.id}</td>
                                    <td>
                                        <div className='productShow'>
                                            <img src={i.image} alt='Product' />
                                            <div>{i.tittle}</div>
                                        </div>
                                    </td>
                                    <td>&#8377;{i.price}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <button onClick={() => handleDecrease(i.id)}>-</button>
                                            <input
                                                type='number'
                                                min='1'
                                                max='20'
                                                value={i.count || 1}
                                                onChange={(e) => handleChange(i.id, e.target.value)}
                                                style={{ width: '50px', margin: '0 5px' }}
                                            />
                                            <button onClick={() => handleIncrease(i.id)}>+</button>
                                        </div>
                                    </td>
                                    <td>&#8377;{(i.count || 1) * i.price}</td>
                                    <td>
                                        <button onClick={() => handleDelete(i.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AddtoCart;
