import '../../App.css'
import HomeProduct from '../Product/HomeProduct'
import Fashion from '../Fashion/Fashion.js'
import News from '../News/News.js'
import Subscribe from '../Subscribe/Subscribe'
import Help from '../Help/Help.js'
import HomeSlider from '../HomeSlider/HomeSlider.js'
import Category from '../Category/Category.js'
function Home() {
  return (
    <div>     
      <HomeSlider/>
      <Category/>
      <HomeProduct />
      <Category/>
      <Fashion />
      <News />
      <Subscribe />
      <Help />
    </div>
  )
}

export default Home
