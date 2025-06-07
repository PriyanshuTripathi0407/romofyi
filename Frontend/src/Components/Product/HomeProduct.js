import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getData } from '../../API/ProductAPI/ProductAPI.js';
import './HomeProduct.css';
import Rating from '@mui/material/Rating';

function HomeProduct() {

  const nav = useNavigate();  
  const [dbproduct, setProduct] = useState([]);

  useEffect(() => {
    handleGetData();
  }, [])

  const handleGetData = async () => {
    const response = await getData()
    setProduct(response.data);
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

  // Assuming your array is named 'productData'
  const productData = uniqueByCategory(dbproduct);


  const showProductDetails = (e) => {
    nav('/productDetails', { state: e }, { replace: true })
  }


  return (
    <div className='homeProduct' >
      <h1>Featured Product</h1>
      <div className='product'>
        {
          productData.map(i => (
            <div className='productad' key={i.product_id} onClick={() => showProductDetails(i)}>
              <img src={i.product_image} alt='' />
              {/* <p>{i.product_tag}</p> */}
              <p> <Rating name="half-rating-read" defaultValue={i.product_rating} precision={0.5} readOnly /></p>
              <p className='productName'> {i.product_name.slice(0,21).toUpperCase()}</p>
              {/* {i.product_tag.map((i)=>(
                  <p>{i}</p>
                ))} */}

              <p className='productPrice'> &#8377;{parseInt(i.product_price)}/-</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default HomeProduct
