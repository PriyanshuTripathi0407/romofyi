import React, { useState } from 'react'
import './SoldProduct.css'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import NoDataFound from '../ShowMessages/NoDataFound';

const SoldProducts = () => {
    const [soldProducts, setSoldProducts] = useState()
    function handleViewDetails() {

    }
    return (
        <div className='SoldProductContainer'>
            <div className='col'>
                {soldProducts ? 
                (
                    <div>
                        <h1>Sold Product List </h1>
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
                            {/* <tbody>
                                {soldProducts.map((i, index) => (
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
                                                <input
                                                    type='number'
                                                    min='1'
                                                    max='20'
                                                    value={i.count || 1}                                                    
                                                />
                                            </div>
                                        </td>
                                        <td>&#8377;{(i.count || 1) * i.product_price}</td>
                                        <td >
                                            <button className='action' onClick={() => handleViewDetails(i.product_id)}><ClearOutlinedIcon style={{ fontSize: '15px' }} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody> */}
                        </table>
                    </div>
                ) 
                : 
                (
                    <div>
                        <h2> Sold Products Data </h2>
                    <NoDataFound/>
                    </div>
                )
                }
            </div >
        </div >
    )
}

export default SoldProducts
