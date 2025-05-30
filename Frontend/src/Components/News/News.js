import React from 'react'
import Slider from "react-slick";
import News1 from '../../Image/news_img1.jpg'
import News2 from '../../Image/news_img2.jpg'
import News3 from '../../Image/news_img3.jpg'
import './News.css'

function News() {

  const news = [
    { image: News1, title: 'It has survived not only five', date: '7 July 2045', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
    { image: News2, title: 'It has survived not only five', date: '7 July 2045', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
    { image: News3, title: 'It has survived not only five', date: '7 July 2045', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }

  ]
  var settings = {
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className='newsContainer'>
      <h1>Latest Updates</h1><hr />
      <marquee behavior="scroll" direction="left" className='headlines'>
        This is a scrolling message which will give you updates of the sale on our shopping page Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. . . .  
      </marquee>
      <Slider {...settings} >
        {news.map(i => (
          <div className='d-flex gap-5 info' key={i.image}>
            <div className='ImageWrapper'>
              <img src={i.image} alt=''></img>
            </div>
            <div className='news'>
              <h1>{i.title}</h1>
              <div className='d-flex justify-content-between px-4'>
                <h2>{i.date}</h2>
                <button> View </button>
              </div>
              <p>{i.description}</p>
            </div>

          </div>
        ))}
      </Slider>


    </div>
  )
}

export default News
