import React from 'react'
import 'animate.css';
import product from './ProductData.js'


function Product({ setproductId }) {
  function handleCart(id) {
    setproductId(id);
    alert(" Added to Cart Successfully !!")

  }


  return (
    <div className='product'>
      <h1>Products of the Day </h1>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '70px', columnGap: '60px', rowGap: '35px' }}>
          {
            product.map((i,index) => (
              <div className='productad' key={i.id} >
                <img src={i.image} alt='' className='animate__animated animate__flip' />
                <h2> {i.tittle}</h2>
                <h4> ID: {i.id}</h4>
                <h3> Price: {i.price}</h3>
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
