import '../../App.css'
import HomeProduct from '../Product/HomeProduct'
import Fashion from '../Fashion/Fashion.js'
import News from '../News/News.js'
import Help from '../Help/Help.js'
import HomeSlider from '../HomeSlider/HomeSlider.js'
import Category from '../Category/Category.js'

function Home() {

  return (
    <div>     
      <HomeSlider/>
      <Category  />
      <HomeProduct />
      <Category/>
      <Fashion />
      <News />   
      <Help />
    </div>
  )
}

export default Home
