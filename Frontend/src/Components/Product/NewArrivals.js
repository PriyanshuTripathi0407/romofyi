import { useEffect, useState } from 'react'
import 'animate.css';
import { getData, PostData, PutData, DeleteData } from '../../API/ProductAPI/ProductAPI.js'
import './Product.css'
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from 'react-toastify';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DiscountIcon from '@mui/icons-material/Discount';

function Product({ setproductId }) {
    const message = () => toast(" Added to Cart Successfully")
    const [ProductData, setProductData] = useState([])
    function handleCart(id, pName) {
        setproductId(id);
        message();
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

    console.log("This is new Arrival ", ProductData)

    return (
        <>
            <ToastContainer />
            <div className='row text-center'>
                <h1>New Arrivals Products</h1>
                <div className='col'>
                    <div className='product_container'>

                        <div className='card'>

                            {ProductData
                                .filter((i) =>
                                    ((i.product_tag && i.product_tag[0].name === 'New') || (i.product_tag && i.product_tag[0].name === "fresh"))
                                )
                                .map((i, index) => (


                                    <div key={index} className='card_container' >
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
                                            <p> <strong><DiscountIcon /></strong> <strong>{(parseInt(i.product_price) / 100)}</strong>%</p>
                                        </div> <hr />
                                        <h4 className='title_name'> {i.product_name}</h4>
                                        {i.product_tag && i.product_tag.length > 0 ?
                                            (i.product_tag.map((tag, index) => (
                                                <div className='tagname' key={tag.id} >{tag.name}</div>
                                            ))
                                            ) :
                                            (<div > </div>)}

                                        <p className='description'>{truncateText(i.product_description, 25)}</p>
                                        <button><a href='#'>View Details</a> </button> <hr />
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
