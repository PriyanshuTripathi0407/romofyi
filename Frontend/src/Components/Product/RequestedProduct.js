import React, { useState, useEffect } from 'react'
import './RequestProduct.css'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import NoDataFound from '../ShowMessages/NoDataFound';
import { GetVendorOrderedProductData } from '../../API/ProductAPI/ProductAPI';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
const RequestedProduct = () => {
    const [orderedProducts, setOrderedProducts] = useState();
    useEffect(() => {
        getVendorOrderedProductData();
    }, [])
let savedUser = localStorage.getItem('user');
    const getVendorOrderedProductData = async () => {
        try {
            const resp = await GetVendorOrderedProductData();
            console.log('This is Ordered Product', resp.data);
            setOrderedProducts(resp.data.order_items);
        } catch (error) {
            console.error('Error fetching vendor product data:', error);
        }
    };
    console.log('This is user in Ordered Product', savedUser);
    return (
        <div className='OrderProductContainer'>
            <h2> Ordered Products Data </h2>
            <div className='col'>
                {orderedProducts ?
                    (
                        <div>
                            <table className="table table-striped table-bordered table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Customer</th>
                                        <th>Customer Address</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderedProducts.map((i, index) => (
                                        <tr key={i.id}>
                                            <td>{index + 1}</td>
                                            <td>{i.product.product_id}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={i.product.product_image}
                                                        alt="Product"
                                                        className="img-fluid rounded-circle"
                                                        style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                                                    />
                                                    <div className="productName">{i.product.product_name}</div>
                                                </div>
                                            </td>
                                            <td>{i.quantity}</td>
                                            <td>{i.order.customer.first_name} {i.order.customer.last_name}</td>
                                            <td>{i.order.customer.address}</td>
                                            <td>&#8377;{(i.quantity || 1) * i.product.product_price}</td>
                                            <td>{i.order.status}</td>
                                            <td>                                                
                                                <button className="action">
                                                    <CheckRoundedIcon  />
                                                </button>                                                
                                                <button className="action">
                                                    <ClearOutlinedIcon  />
                                                </button>                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    :
                    (
                        <div>
                            <NoDataFound />
                        </div>
                    )
                }
            </div >
        </div >
    )
}

export default RequestedProduct
