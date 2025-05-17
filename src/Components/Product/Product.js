import { useEffect, useState } from 'react'
import 'animate.css';
import { getData, PostData, PutData, DeleteData } from '../../API/ProductAPI/ProductAPI.js'
import './Product.css'
import Rating from '@mui/material/Rating';

function Product({ setproductId }) {
  const [RegData, setRegData] = useState([])

  function handleCart(id) {
    setproductId(id);
    // console.log(id, " This is id")
    // alert(" Added to Cart Successfully !!")
  }
  useEffect(() => {
    handleGetData();
  }, [])

  const handleGetData = async () => {
    const response = await getData()
    setRegData(response.data);
    // console.log(response.data, " This is response from db in Product.js")
  }


  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '....'
      : text;
  }

  return (
    <div className='row'>
      <h1>Products of the Day </h1> <hr />
      <div className='product_container'>
        <div className='card'>
          {
            RegData.map((i, index) => (
              <div key={i.product_id} className='card_container' >
                <div className='ImgWrapper'>
                  <img src={i.product_image} alt='Image' className='animate__animated animate__flip' />
                </div>
                <div className='info'>
                  <p> ID: <strong> {i.product_id}</strong></p>
                  <p> <strong> &#8377;{i.product_price}</strong></p>
                </div>
                <h4 className='title_name'> {i.product_name}</h4> 
                {i.product_tag && i.product_tag.length > 0 ?
                  (i.product_tag.map((tag, index) => (
                    <div className='tagname' key={tag.id} >{tag.name}</div>
                  ))
                  ) :
                  (<div > </div>)}

                <p className='description'>{truncateText(i.product_description, 25)}</p>
                <button><a href='#'>View More</a> </button> <hr/>
                <div>
                  <p style={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Ratings:</strong>
                    <Rating
                      name={`read-only-rating-${i.product_id}`}
                      value={parseFloat(i.product_rating) || 0}
                      precision={0.5}
                      readOnly
                    />
                  </p>
                  <p> <strong>Discount:</strong> <strong>{(parseInt(i.product_price) / 100)}</strong>%</p>
                </div> <hr/>
                <button onClick={() => handleCart(i.product_id)}> ADD TO CART</button>
              </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default Product
