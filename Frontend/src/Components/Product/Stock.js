import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function Stock({ products}) {
  const navigate = useNavigate();
  function send(e) {
    alert(e.id)
   
  
    // navigate('/addtoCart',{state:data},{ replace: true })
  }
  function demo() {
    // navigate('/addtoCart', { state: data },{ replace: true })
  }
  return (
    <div className='addToCart'>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '70px', columnGap: '60px', rowGap: '35px' }}>
        {
          products.map(i => (
            <div className='productad' onClick={() => send(i)}>
              <img src={i.image} alt='' />
              <h2> {i.tittle}</h2>
              <h4> ID: {i.id}</h4>
              <h3> Price: {i.price}</h3>
              <button >Add to Cart</button>
            </div>
          ))}

        <button className='product_btn'>See More</button>

      </div>
      <button className='product_btn' onClick={demo}>See More</button>
    </div>
  )
}

export default Stock
