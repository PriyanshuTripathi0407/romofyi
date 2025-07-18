import { useEffect, useState } from 'react'
import 'animate.css';
import { getData } from '../../API/ProductAPI/ProductAPI.js'
import './Product.css'
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from 'react-toastify';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { PostViewData, PostWishedlistedData } from '../../API/ViewProductAPI/ViewProductAPI.js'
import { PostCartData } from '../../API/CartAPI/AddedtoCartProductAPI.js';
import { PostSearchedData, getSearchedData } from '../../API/SearchedProductAPI/SearchedProductAPI.js';
import ShowLoginErrorMessage from '../ShowMessages/ShowLoginErrorMessage.js';

function Product({ setproductId }) {
  const [showCatfilter, setshowCatfilter] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  // const [showPricefilter, setshowPricefilter] = useState(false);
  // const [showRatingfilter, setshowRatingfilter] = useState(false);
  // const [productRating, setProductRating] = useState('');
  // const [productPrice, setProductPrice] = useState('');
  const [searchedProduct, setSearchedProduct] = useState('');

  const nav = useNavigate();
  const locate = useLocation();
  const categoryProduct = locate.state;

  const message = () => toast(" Added to Cart Successfully")
  const [ProductData, setProductData] = useState([])
  const handleCart = async (id) => {
    if (userData && userData.email) {
      const viewedProductData = {
        customer: userData.email,
        product: id,
      };
      const res = await PostCartData(viewedProductData)
      // console.log("This is Cart Added",res)
      setproductId(id);
      message();
    }
     else {
      ShowLoginErrorMessage();
      return;
    }
  }
  const handleOrderNow = async (id) => {
    if (userData && userData.email) {
      const viewedProductData = {
        customer: userData.email,
        product: id,
      };
      // const res = await PostCartData(viewedProductData)
      // console.log("This is Ordered Product",res)
      setproductId(id);
      nav('/cart', { replace: true })
    }
    else {
      ShowLoginErrorMessage();
      return;
    }
  }

  useEffect(() => {
    handleGetData();
    if (!categoryProduct) {
      setProductCategory()
    } else {
      setProductCategory(categoryProduct)
    }
  }, [])

  const [userData, setUserData] = useState({})
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      setUserData(parsedData.user)
    }
  }, []);


  useEffect(() => {
    if (searchedProduct) {
      handlePostSearchedProduct(searchedProduct);
    }
  }, [searchedProduct])

  const handleGetData = async () => {
    const response = await getData()
    // console.log("This is product in Product **", response)
    setProductData(response.data);
  }


  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '....'
      : text;
  }

  function handleSearch(e) {
    console.log("Searched ",e.target.value)
    setSearchedProduct(e.target.value);
  }

  const handleView = async (product) => {
    if (userData) {
      const viewedProductData = {
        customer: userData.email,
        product: product.product_id,
      };
      const res = await PostViewData(viewedProductData)
    }
    nav('/productDetails', { state: product, replace: true })
  }

  const handleWishlist = async (product) => {
    if (userData) {
      const viewedProductData = {
        customer: userData.email,
        product: product.product_id,
      };
      const res = await PostWishedlistedData(viewedProductData)
    }
  }

  const handlePostSearchedProduct = async (product) => {
    if (userData && searchedProduct) {
      const viewedProductData = {
        customer: userData.email,
        product: product,
      };
      // console.log("Searched in Product.js : ", viewedProductData)
      const res = await PostSearchedData(viewedProductData)
      console.log("Post Response in Product.js : ", res.data)
    }
  }


return (
    <>
      <ToastContainer position='top-right' style={{top:'90px' }}/>
      <div className='row text-center mx-0'>
        <div className='d-flex justify-content-between align-items-center px-4 my-3'>
          <h1 className="mb-0">Products</h1>
          <input type="text" placeholder="Search products..." className="form-control w-50" onChange={handleSearch} />
        </div>

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
            {/* <div className='filterby' onClick={() => setshowPricefilter(!showPricefilter)}>
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
            </div> */}
          </div>
        </div>
        <div className='col-10'>
          <div className='product_container'>
            <div className='card'>
              {ProductData
                .filter((i) =>
                  (!productCategory || (i.product_category && i.product_category.name === productCategory)) &&
                  (!searchedProduct || i.product_name.toLowerCase().includes(searchedProduct.toLowerCase()))
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
                        <FavoriteBorderOutlinedIcon onClick={() => handleWishlist(i)} />
                        <img src={i.product_image} alt='Image' className='animate__animated animate__flip' />
                      </div>
                      <div className='info'>
                        <p> <strong> <span className='txt-id'> {i.product_id} </span> </strong> </p>
                        <p> <strong> {i.product_name}<br /> @<span className='txt-price'> &#8377;{i.product_price}</span> </strong></p>
                        <p className='description'>{truncateText(i.product_description, 10)}</p>

                        <button onClick={() => handleView(i)}>View Details </button>
                      </div>
                    </div>
                    <div className='review'>
                      <Rating
                        name={`read-only-rating-${i.product_id}`}
                        value={parseFloat(i.product_rating) || 0}
                        precision={0.5}
                        readOnly
                      />
                      <p> Vendor : <strong>
                        {i.vendor.first_name}  {i.vendor.last_name}
                      </strong></p>
                    </div>
                    <div className='d-flex justify-content-between gap-4'>
                      <button onClick={() => handleCart(i.product_id)} > ADD TO CART</button>
                      <button onClick={() => handleOrderNow(i.product_id)} > Order Now</button>
                    </div>
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
