import Slider from "react-slick";
import './HomeSlider.css'
import slide1 from '../../Image/DealsonIphone.webp'
import slide2 from '../../Image/ExclusiveTshirt.webp'
import slide3 from '../../Image/GrocerySuperSavers.webp'
import slide4 from '../../Image/StyleSaree.webp'

const HomeSlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1240, // < 1240px
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 868, // < 868px
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <Slider {...settings} className="home-slider">
            <div className='item'>
                <img src={slide1} alt="Offer Image" />
            </div>
            <div className='item'>
                <img src={slide2} alt="Offer Image" />
            </div>
            <div className='item'>
                <img src={slide3} alt="Offer Image" />
            </div>
            <div className='item'>
                <img src={slide4} alt="Offer Image" />
            </div>
        </Slider>
    )
}

export default HomeSlider
