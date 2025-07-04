import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { GetVendorProductData } from '../../API/ProductAPI/ProductAPI'

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
        { title: 'Ratings', dataIndex: 'product_rating' },
        {
            title: 'Image', dataIndex: 'product_image', render: (url) => (
                <img
                    src={url}
                    alt="Product"
                    style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 8 }}
                />)
        },
    ]
    
    useEffect(() => {
        getRegisteredVendorProductData();
    }, [])
    
     const getRegisteredVendorProductData = async () => {
        try {
            const resp = await GetVendorProductData();
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
