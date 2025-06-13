import React, { useState } from 'react'
import './RequestProduct.css'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import NoDataFound from '../ShowMessages/NoDataFound';

const RequestedProduct = () => {
    const [orderedProducts, setOrderedProducts]= useState()
  return (
   <div className='OrderProductContainer'>
            <div className='col'>
                {orderedProducts ? 
                (
                    <div>
                        <h1>Request Order Product List </h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Customer</th>
                                    <th>Customer Adress</th>
                                    <th>Total</th>
                                    <th>Status</th>
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
                                        <td>{i.count}</td>
                                        <td>{i.customer_name}</td>                                        
                                        <td>{i.customer_address}</td>                                        
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
                        <h2> Ordered Products Data </h2>
                    <NoDataFound/>
                    </div>
                )
                }
            </div >
        </div >
  )
}

export default RequestedProduct
