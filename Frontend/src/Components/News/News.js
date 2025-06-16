import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import News1 from '../../Image/news_img1.jpg'
import News2 from '../../Image/news_img2.jpg'
import News3 from '../../Image/news_img3.jpg'
import './News.css'
import { getData } from '../../API/NewsAPI/NewsAPI'

function News() {
  const BASE_URL = 'http://localhost:8000';
  const [news, setNews] = useState()
  const [isExpanded, setIsExpanded] = useState(false)
  const getNewsData = async () => {
    const res = await getData();
    setNews(res.data)
    console.log(res.data, "This is news Data in Newsjs")
    // console.log(res, "This is news in Newsjs")
    return res;
  }

  useEffect(() => {
    getNewsData()
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className='newsContainer'>
      <h1>Latest Updates</h1><hr />
      {news && news.length > 0 && (
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="15"
          className='headlines'          
        >
          {news.map((item, index) => (
            <span key={item.id || index} style={{ marginRight: "40px" }}>
              📰 {item.headline}
            </span>
          ))}
        </marquee>
      )}

      <Slider {...settings} >
        {news ? news.map(i => (
          <div className='d-flex gap-2 info' key={i.image}>
            <div className='Image_Wrapper'>
              <img src={`${BASE_URL}${i.image}`} alt=''></img>
            </div>
            <div className='news'>
              <h1>{i.headline}</h1>
              <div className='d-flex justify-content-between px-4'>
                <p>{i.created_at}</p>
                <h2> {i.tags} </h2>
              </div>
              <div className='description'>
                <p>
                  {isExpanded ? i.description : i.description.slice(0, 150) + (i.description.length > 150 ? "..." : "")}
                  {i.description.length > 150 && (
                    <button onClick={() => setIsExpanded(!isExpanded)} style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}>
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
            </div>

          </div>
        ))
          :
          <div>
            <p>No news found</p>
          </div>
        }
      </Slider>


    </div>
  )
}

export default News
