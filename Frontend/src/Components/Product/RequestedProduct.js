import React, { useState, useEffect } from 'react'
import './RequestProduct.css'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import NoDataFound from '../ShowMessages/NoDataFound';
import { GetVendorOrderedProductData } from '../../API/ProductAPI/ProductAPI';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Ordercard from '../Order/Ordercard';
const RequestedProduct = () => {
    const [orderedProducts, setOrderedProducts] = useState();
    let savedUser = localStorage.getItem('user');

    const [userData, setUserData] = useState({})
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            let parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user)
        }
    }, []);

    useEffect(() => {
        getVendorOrderedProductData();
    }, [savedUser])
    
    const getVendorOrderedProductData = async () => {
        try {
            const resp = await GetVendorOrderedProductData(userData.id);
            console.log('This is Ordered Product', resp.data);
            setOrderedProducts(resp.data.order_items);
        } catch (error) {
            console.error('Error fetching vendor product data:', error);
        }
    };

    return (
        <div className='OrderProductContainer'>
            <h2> Ordered Products Data </h2>
            <div className='col'>
                {orderedProducts ?
                    (
                        <div>
                            <Ordercard />
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
