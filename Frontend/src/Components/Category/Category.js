import React, { useState, useEffect } from 'react'
import { getData } from '../../API/ProductAPI/ProductAPI.js'
import { useNavigate } from 'react-router-dom'
import './Category.css'



const Category = ({ fromArray, toArray }) => {
    const [dbproduct, setProduct] = useState([])
    useEffect(() => {
        handleGetData();
    }, [])

    const handleGetData = async () => {
        const response = await getData()
        setProduct(response.data);
        // console.log(response.data, " This is response from db in Category.js")
    }

    const uniqueByCategory = (arr) => {
        const categoryMap = new Map();
        for (const item of arr) {
            const categoryName = item.product_category?.name;
            if (categoryName && !categoryMap.has(categoryName)) {
                categoryMap.set(categoryName, item);
            }
        }
        return Array.from(categoryMap.values());
    };

    const productData = uniqueByCategory(dbproduct);
    // console.log(productData, " This is filtered Data in Category.js")

    const nav = useNavigate()

    function send(e) {
        nav('/product', { state: e }, { replace: true })
    }
    return (
        <div className='categoryContainer'>
            {productData.slice(fromArray, toArray).map((i,index) => (
                <div className='advertise' key={index} onClick={() => send(i.product_category.name)} >
                    <div className='ImageWrapper'>
                        <img src={i.product_image} alt='Product Image' />
                    </div>
                    <h2>{i.product_category.name.toUpperCase()}</h2>
                </div>
            ))}
        </div>

    )
}

export default Category
