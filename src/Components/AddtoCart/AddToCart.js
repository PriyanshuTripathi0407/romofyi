import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { Button, Rating } from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import './AddtoCart.css';
import CloudOffIcon from '@mui/icons-material/CloudOff';


const AddToCart = () => {
    const locate = useLocation();
    // console.log("This is add to cart", locate.state)
    const [cartProduct, setCartProduct] = useState([]);
    const [inputValue, setInputValue] = useState(1);
    // console.log(cartProduct?.price ? parseFloat(cartProduct.price) * parseInt(inputValue) : 0, " Total wala price")
    // console.log()

    function handleChange(value) {
        setInputValue(value);
    }
    // useEffect(() => {
    //     setCartProduct(cartProduct => [...cartProduct, locate.state]);
    // }, []);

    return (
        <>
            <section className='cartSection'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='d-flex align-items-center w-100'>
                            <h1 className='hd'>Your Cart
                            </h1>
                        </div>

                        <div className='cartWrapper'>
                            {locate.state.length > 0 ?
                                <div className='table-responsive'>
                                    <table className='table'>
                                        <thead className='thead'>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Product</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>SubTotal</th>
                                            </tr>
                                        </thead>

                                        {locate.state.map((item, index) => (
                                            <tbody>
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className='productDetails'>
                                                            <div className='imgWrapper'>
                                                                <img src={item.image} alt='Product image' className='w-100' />
                                                            </div>
                                                            <div className='info p-4'>
                                                                <Link to=''><h4>{item.tittle}</h4> </Link>
                                                                <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                                                                <span className='text-light'> (4.5)</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td> &#8377;{item.price}</td>
                                                    <td>
                                                        <input type='number' min="0" max="20" step="1" value={inputValue} onChange={(e) => handleChange(e.target.value)}
                                                        />
                                                    </td>
                                                    <td className='text-g'>&#8377;{parseFloat(parseFloat(item.price) * Number(inputValue))} </td>

                                                </tr>
                                            </tbody>
                                        ))}


                                    </table>
                                    <div className='details'>

                                        <div>
                                            <Button className='btn-lg'>Save Details</Button>
                                        </div>
                                        <div>
                                            <Button className='btn-lg'><RemoveShoppingCartOutlinedIcon /> Clear Cart</Button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <h1 style={{ textAlign: 'center', fontSize: '80px', color: 'lightgray' }}><CloudOffIcon /> Empty</h1>
                                </div>
                            }
                            <hr />


                            <div className='m-3 d-flex' style={{ justifyContent: 'space-between' }}>
                                <div>
                                    <Link to='/stock'>  <Button className='btn-lg btn-g   '><KeyboardBackspaceOutlinedIcon />  Continue Shopping</Button> </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default AddToCart
