import { useEffect, useState } from 'react'
import 'animate.css';
import { getData, PostData, PutData, DeleteData } from '../../API/ProductAPI/ProductAPI.js'
import './Product.css'
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from 'react-toastify';
import DiscountIcon from '@mui/icons-material/Discount';
import { useNavigate } from 'react-router-dom';
import ShowLoginErrorMessage from '../ShowMessages/ShowLoginErrorMessage.js';

function Product({ setproductId }) {
    const nav = useNavigate();

    const message = () => toast(" Added to Cart Successfully")
    const [ProductData, setProductData] = useState([])
    function handleCart(id) {
        if (userData && userData.email) {
            setproductId(id);
            message();
        }
        else {
            ShowLoginErrorMessage();
            return;
        }
    }
    useEffect(() => {
        handleGetData();
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

    const [userData, setUserData] = useState({})
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const parsedData = JSON.parse(savedUser);
                setUserData(parsedData.user);
            }
        } catch (e) {
            console.error("Failed to parse user data:", e);
            setUserData(null);
        }
    }, []);


    const handleView = async (product) => {
        if (userData) {
            const viewedProductData = {
                customer: userData.email,
                product: product.product_id,
            };
            const res = await PostData(viewedProductData)
        }
        nav('/productDetails', { state: product, replace: true });

    }


    return (
        <>
            <ToastContainer position='top-right' style={{top:'90px' }}/>
            <div className='text-center'>
                <h1 style={{ backgroundColor: 'gold', color: '#183661', fontFamily: 'Roboto' }}>New Arrivals Products</h1>
                <div className='col mx-2'>
                    <div className='product_container'>

                        <div className='card'>

                            {ProductData
                                .filter((i) =>
                                    ((i.product_tag && i.product_tag[0].name === 'New') || (i.product_tag && i.product_tag[0].name === "fresh"))
                                )
                                .map((i, index) => (


                                    <div key={index} className='card_container' >
                                        <div className='d-flex align-items-center'>
                                            <div className='border'>
                                                <div className='ImgWrapper'>
                                                    <img src={i.product_image} alt='Image' className='animate__animated animate__flip' />
                                                </div>
                                                <div className='info'>
                                                    <p> ID: <strong> {i.product_id}</strong></p>
                                                    <p> <strong> &#8377;{i.product_price}</strong></p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <p style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
                                                        <strong>Ratings:</strong>
                                                        <Rating
                                                            name={`read-only-rating-${i.product_id}`}
                                                            value={parseFloat(i.product_rating) || 0}
                                                            precision={0.5}
                                                            readOnly
                                                        />
                                                    </p>
                                                    <p> <strong><DiscountIcon /></strong></p>
                                                </div>
                                            </div>


                                            <div>
                                                <h4 className='title_name'> {i.product_name}</h4>
                                                <h6>Vendor: {i.vendor.first_name} {i.vendor.last_name}</h6>
                                                {i.product_tag && i.product_tag.length > 0 ?
                                                    (i.product_tag.map((tag, index) => (
                                                        <div className='tagname' key={`${i.product_id}-${index}`} >{tag.name}</div>
                                                    ))
                                                    ) :
                                                    (<div > </div>)}

                                                <p className='description'>{truncateText(i.product_description, 25)}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-between gap-4'>
                                            <button onClick={() => handleView(i)}>View Details</button> <hr />
                                            <button onClick={() => handleCart(i.product_id)}>ADD TO CART</button>


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
