import React from 'react'
import { Rate, Spin, Table } from "antd";
const ProductTable = ({Productdata,loading}) => {  

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

    return (
        <div>          
            {loading ? (
                <div >
                    <Spin tip="Loading products..." />
                </div>
            ) : (
                <Table
                    dataSource={Productdata} columns={col}
                    rowKey={(record) => record.product_id || record.id}
                    locale={{ emptyText: 'No products found' }}
                />
            )}
        </div>
    )
}

export default ProductTable
