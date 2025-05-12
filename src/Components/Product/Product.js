import React, { useEffect, useState } from 'react'
import 'animate.css';
import product from './ProductData.js'
import { getData, PostData, PutData, DeleteData } from '../../API/ProductAPI/ProductAPI.js'

function Product({ setproductId }) {
  const [RegData, setRegData] = useState([])
  function handleCart(id) {
    setproductId(id);
    alert(" Added to Cart Successfully !!")
  }


  const handleGetData = async () => {
    const response = await getData()
    setRegData(response.data);
    console.log(response.data, " This is response from db")
  }

  function truncateText(text, wordLimit) {
  const words = text.split(' ');
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;
}

  // id :  1
  // product_category :  1
  // product_color :  "red"
  // product_description  :   "Enjoy the perfect blend of sweetness and crunch with Fresh Red Apples. Handpicked from organic orchards, these apples are rich in fiber, packed with antioxidants, and bursting with natural flavor. Ideal for snacking, baking, juicing, or adding a healthy twist to your salads."
  // product_id  :  "AFT001"
  // product_image :   null
  // product_name  :  "Apple"
  // product_price :  "100.00"
  // product_rating :  4.5
  // product_size :   null
  // product_tag :  []
  // product_weight :



  return (
    <div className='product'>
      <button onClick={handleGetData}>GET DATA</button>
      <h1>Products of the Day </h1>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '70px', columnGap: '60px', rowGap: '35px' }}>
          {
            RegData.map((i, index) => (
              <div className='productad' key={i.product_id} >
                <img src={i.product_image} alt='Image' className='animate__animated animate__flip' />
                <h2> {i.product_name}</h2>
                {i.product_tag && i.product_tag.length > 0 ? 
                (i.product_tag.map((tag, index) => (
                    <span key={tag.id} style={{ marginRight: "8px" }}>
                      #{tag.name}
                    </span>
                  ))  
                ) : 
                (<span>No Tags</span> )}
                
                <h4> ID: {i.product_id}</h4>
                <h3> Price: &#8377;{i.product_price}</h3>
                <p>{truncateText(i.product_description, 10)}</p>
                <button onClick={() => handleCart(i.id)}>AddtoCart</button>
              </div>
            ))}
        </div>

        <button className='product_btn'>See More</button>

      </div>
    </div>
  )
}

export default Product
