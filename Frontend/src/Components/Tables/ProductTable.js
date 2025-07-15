import React, { useEffect, useState } from 'react'
import { Rate, Table } from "antd";
import { GetVendorProductData } from '../../API/ProductAPI/ProductAPI';

const ProductTable = () => {
    const [Productdata, setProductData] = useState([]);
    const col = [
        { title: 'Product Id', dataIndex: 'product_id' },
        { title: 'Name', dataIndex: 'product_name' },
        {
            title: 'Category',
            dataIndex: 'product_category',
            render: (category) => category?.name || 'N/A'
        },
        { title: 'Tag', dataIndex: 'product_tag', render: (tag) => tag[0].name || 'N/A' },
        { title: 'Price', dataIndex: 'product_price' },
        {
            title: 'Ratings',
            dataIndex: 'product_rating',
            render: (rating) => (
                <div>
                    <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{rating} </span>
                    <Rate disabled value={rating} style={{ fontSize: '16px' }} />
                </div>
            ),
        },
        {
            title: 'Image', dataIndex: 'product_image', render: (url) => (
                <img
                    src={url}
                    alt="Product"
                    style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 8 }}
                />)
        },
    ]

    const [userData, setUserData] = useState({})
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            let parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user)
        }
    }, []);


    useEffect(() => {
        getRegisteredVendorProductData();
    }, [])

    const getRegisteredVendorProductData = async () => {
        try {
            const resp = await GetVendorProductData(userData.id);
            setProductData(resp.data.product);
            console.log('This is vendor Product', resp.data);
        } catch (error) {
            console.error('Error fetching vendor product data:', error);
        }
    };



    return (
        <div>
            <Table dataSource={Productdata} columns={col} />
        </div>
    )
}

export default ProductTable
