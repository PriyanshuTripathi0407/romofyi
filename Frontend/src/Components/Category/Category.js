import React, { useState, useEffect } from 'react'
import { getData } from '../../API/ProductAPI/ProductAPI.js'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import './Category.css'



const Category = () => {
    const [dbproduct, setProduct] = useState([])
    useEffect(() => {
        handleGetData();
    }, [])

    const handleGetData = async () => {
        const response = await getData()
        setProduct(response.data);
        // console.log(response.data, " This is response from db in Category.js")
    }

    const uniqueByCategory = (arr) => {
        const categoryMap = new Map();
        for (const item of arr) {
            const categoryName = item.product_category?.name;
            if (categoryName && !categoryMap.has(categoryName)) {
                categoryMap.set(categoryName, item);
            }
        }
        return Array.from(categoryMap.values());
    };

    const productData = uniqueByCategory(dbproduct);
    // console.log(productData, " This is filtered Data in Category.js")

    const nav = useNavigate()

    function send(e) {
        nav('/product', { state: e }, { replace: true });
    }

    const settings = {
        infinite: true,
        speed: 3000, // slow, smooth transition
        autoplay: true,
        autoplaySpeed: 0, // no delay between transitions
        cssEase: "circular", // smooth, non-easing animation
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1240, // < 1240px
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1000, // < 868px
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 800, // < 868px
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600, // < 868px
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };


    return (
        <div className="categoryContainer">
      <Slider {...settings}>
        {productData.map((i, index) => (
          <div key={index}>
            <div
              className="advertise"
              onClick={() => send(i.product_category.name)}
            >
              <div className="ImageWrapper">
                <img src={i.product_image} alt="Product" />
              </div>
              <h2>{i.product_category.name.toUpperCase()}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>

    )
}

export default Category
