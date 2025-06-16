import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { getData, PostData, PutData } from '../../API/ProductAPI/ProductAPI'

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
    const getRegistration = async () => {
        const response = await getData()
        setProductData(response.data)
        console.log(Productdata, "Productdata Data in Table")
    }

    useEffect(() => {
        getRegistration();
    }, [])

    return (
        <div>
            <Table dataSource={Productdata} columns={col} />;
        </div>
    )
}

export default ProductTable
