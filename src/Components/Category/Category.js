import React, { useState, useEffect } from 'react'
import { getData } from '../../API/ProductAPI/ProductAPI.js'
import { useNavigate } from 'react-router-dom'
import Shoe from '../../Image/ishoes.png'
import UnderWear from '../../Image/iunderwear.png'
import Pent from '../../Image/ipent.png'
import tshirt from '../../Image/it_shart.png'
import card from '../../Image/ijakit.png'
import top from '../../Image/ihelbet.png'
import './Category.css'



const Category = () => {
    const [dbproduct, setProduct] = useState([])
    useEffect(() => {
        handleGetData();
    }, [])

    const handleGetData = async () => {
        const response = await getData()
        setProduct(response.data);
        console.log(response.data, " This is response from db in Category.js")
    }

    const uniqueByCategory = (arr) => {
        const categoryMap = new Map();
        for (const item of arr) {
            if (!categoryMap.has(item.product_category)) {
                categoryMap.set(item.product_category, item);
            }
        }
        return Array.from(categoryMap.values());
    };

    // Assuming your array is named 'allProducts'
    const productData = uniqueByCategory(dbproduct);
    console.log(productData, " This is filtered Data in Category.js")





    const product = [
        { image: Shoe, tittle: 'SHOES' },
        { image: UnderWear, tittle: 'SHIRTS' },
        { image: Pent, tittle: 'PANTS & SOCKS' },
        { image: tshirt, tittle: 'T-SHIRT & TANKSTOP' },
        { image: card, tittle: 'CARDIGANS & JUMPERS' },
        { image: top, tittle: 'TOP & HAT' }
    ]
    const nav = useNavigate()

    function send(e) {
        nav('/shirt', { state: e }, { replace: true })
    }
    return (
        <div className='categoryContainer'>
            {product.map(i => (
                <div className='advertise' key={i.tittle} onClick={() => send(i.tittle)} >
                    <img src={i.image} alt='' />
                    <h2 style={{ color: 'yellow', fontFamily: 'cursive', fontSize: '18px' }}>{i.tittle}</h2>
                </div>
            ))}
        </div>

    )
}

export default Category
