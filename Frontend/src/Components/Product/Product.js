import { useEffect, useState } from 'react'
import 'animate.css';
import { getData, PostData, PutData, DeleteData } from '../../API/ProductAPI/ProductAPI.js'
import './Product.css'
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from 'react-toastify';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DiscountIcon from '@mui/icons-material/Discount';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useLocation } from 'react-router-dom';
function Product({ setproductId }) {
  const [showCatfilter, setshowCatfilter] = useState(false);
  const [showPricefilter, setshowPricefilter] = useState(false);
  const [showRatingfilter, setshowRatingfilter] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [productRating, setProductRating] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [filteredProduct, setfilteredProduct] = useState([]);

  const locate = useLocation();
  const categoryProduct = locate.state

  const message = () => toast(" Added to Cart Successfully")
  const [ProductData, setProductData] = useState([])
  function handleCart(id, pName) {
    setproductId(id);
    message();
  }
  useEffect(() => {
    handleGetData();
    if (!categoryProduct) {
      setProductCategory()
    }else {
      setProductCategory(categoryProduct)
    }
  }, [])

  const handleGetData = async () => {
    const response = await getData()
    setProductData(response.data);
  }


  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '....'
      : text;
  }


  return (
    <>
      <ToastContainer />
      <div className='row text-center mx-0'>
        <h1>Products</h1>
        <div className='col-2'>

          <div className='filtercontainer'>
            <p>FILTER PRODUCTS BY </p>
            <div className='filterby' onClick={() => setshowCatfilter(!showCatfilter)}>
              <p> Category {showCatfilter ? <ArrowCircleUpOutlinedIcon /> : <ArrowDropDownCircleOutlinedIcon />} </p>
              {showCatfilter ?
                <ul>
                  <li onClick={() => setProductCategory('')}>All Categories</li>
                  {[
                    ...new Map(
                      ProductData
                        .filter(i => i.product_category) // remove null categories
                        .map(i => [i.product_category.id, i.product_category])
                    ).values()
                  ].map((category, index) => (
                    <li key={index} onClick={() => setProductCategory(category.name)}>{category.name}</li>
                  ))}
                </ul>
                : ''}
            </div>
            <div className='filterby' onClick={() => setshowPricefilter(!showPricefilter)}>
              <p> Price {showPricefilter ? <ArrowCircleUpOutlinedIcon /> : <ArrowDropDownCircleOutlinedIcon />} </p>
              {showPricefilter ?
                <ul>
                  <li onClick={() => setProductCategory('')}>All Prices</li>
                  {[...new Set(ProductData.map((i) => (i.product_price)))].sort((a, b) => a - b).map((price, index) => (<li key={index} onClick={() => setProductPrice(price)}>{price}</li>
                  ))}
                </ul>
                : ''}
            </div>
            <div className='filterby' onClick={() => setshowRatingfilter(!showRatingfilter)}>
              <p> Ratings {showRatingfilter ? <ArrowCircleUpOutlinedIcon /> : <ArrowDropDownCircleOutlinedIcon />} </p>
              {showRatingfilter ?
                <ul>
                  <li onClick={() => setProductCategory('')}>All Ratings</li>
                  {[...new Set(ProductData.map((i) => (i.product_rating)))].sort((a, b) => a - b).map((rating, index) => (<li key={index} onClick={() => setProductRating(rating)}>{rating}</li>
                  ))}
                </ul>
                : ''}
            </div>
          </div>
        </div>
        <div className='col-10'>
          <div className='product_container'>

            <div className='card'>

              {ProductData
                .filter((i) =>
                  !productCategory || (i.product_category && i.product_category.name === productCategory)
                )
                .map((i, index) => (
                  <div key={index} className='card_container' >
                    <div className='first'>
                      <div className='ImgWrapper'>
                        {i.product_tag && i.product_tag.length > 0 ?
                          (i.product_tag.map((tag, index) => (
                            <div className='tagname' key={tag.id} >{tag.name}</div>
                          ))
                          ) :
                          (<div > </div>)}
                        <FavoriteBorderOutlinedIcon />
                        <img src={i.product_image} alt='Image' className='animate__animated animate__flip' />
                      </div>
                      <div className='info'>
                        <p> <strong> <span className='txt-id'> {i.product_id} </span> </strong> </p>
                        <p> <strong> {i.product_name}<br /> @<span className='txt-price'> &#8377;{i.product_price}</span> </strong></p>
                        <p className='description'>{truncateText(i.product_description, 10)}</p>

                        <button><a href='#'>View Details</a> </button>
                      </div>
                    </div>
                    <div className='review'>
                      <Rating
                        name={`read-only-rating-${i.product_id}`}
                        value={parseFloat(i.product_rating) || 0}
                        precision={0.5}
                        readOnly
                      />
                      <p> <strong>
                        <u>{(parseInt(i.product_rating) * 10)} Reviews</u>
                      </strong></p>
                    </div>
                    {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
                        <strong>Ratings:</strong>
                        <Rating
                          name={`read-only-rating-${i.product_id}`}
                          value={parseFloat(i.product_rating) || 0}
                          precision={0.5}
                          readOnly
                        />
                      </p>
                      <p> <strong><DiscountIcon /></strong> <strong>{(parseInt(i.product_price) / 100)}</strong>%</p>
                    </div> <hr />
                    <h4 className='title_name'> {i.product_name}</h4>
                    {i.product_tag && i.product_tag.length > 0 ?
                      (i.product_tag.map((tag, index) => (
                        <div className='tagname' key={tag.id} >{tag.name}</div>
                      ))
                      ) :
                      (<div > </div>)}*/}


                    <button onClick={() => handleCart(i.product_id)} > ADD TO CART</button>

                  </div>
                ))}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
