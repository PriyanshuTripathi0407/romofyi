import React from 'react'
import '../../App.css'
import HomeProduct from '../Product/HomeProduct'
import Fashion from '../Fashion/Fashion.js'
import Shoe from '../../Image/ishoes.png'
import UnderWear from '../../Image/iunderwear.png'
import Pent from '../../Image/ipent.png'
import tshirt from '../../Image/it_shart.png'
import card from '../../Image/ijakit.png'
import top from '../../Image/ihelbet.png'
import News from '../News/News.js'
import Subscribe from '../Subscribe/Subscribe'
import Help from '../Help/Help.js'
import { useNavigate } from 'react-router-dom'


function Home() {

  const product = [
    { image: Shoe, tittle: 'SHOES' },
    { image: UnderWear, tittle: 'SHIRTS' },
    { image: Pent, tittle: 'PANTS & SOCKS' },
    { image: tshirt, tittle: 'T-SHIRT & TANKSTOP' },
    { image: card, tittle: 'CARDIGANS & JUMPERS' },
    { image: top, tittle: 'TOP & HAT' }
  ]
  const nav = useNavigate()

  function send(e) {
    nav('/shirt', { state: e },{ replace: true })
  }

  return (
    <div>

      {/* <Carousel className='poster' autoplay>
        <div >
          <div className='poster_div'>
            <div>
              <h1 > Romofyi </h1>
              <h2>Trends 2045 </h2>
              <p>A huge fashion collection forever</p>
              <button>Shop Now</button>
            </div>
            <div>
              <img src={banner}></img>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <img src={fash} style={{width:'1344px'}}></img>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <img src={yash} style={{width:'1344px'}}></img>
            </div>
          </div>
        </div>
      </Carousel> */}



      <div>
        <div style={{ display: 'flex' }}>
          {product.map(i => (
            <div className='advertise' key={i.tittle} onClick={() => send(i.tittle)} >
              <img src={i.image} alt='' />
              <h2 style={{ color: 'yellow', fontFamily: 'cursive', fontSize: '18px' }}>{i.tittle}</h2>
            </div>
          ))}
        </div>
      </div>
      <HomeProduct />
      <Fashion />
      <News />
      <Subscribe />
      <Help />
    </div>
  )
}

export default Home
