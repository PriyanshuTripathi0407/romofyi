import NewReleasesIcon from '@mui/icons-material/NewReleases';
import WatchIcon from '@mui/icons-material/Watch';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css'

export default function NavbarMenu() {
    return (
        <div className='head3'>
            <ul className="navbar-menu">
                <Link to='/' ><li><HomeIcon fontSize="small" /> Home</li> </Link>
                <Link to='/newarrivals' ><li><NewReleasesIcon fontSize="small" /> New Arrivals</li> </Link>
                <Link to='/product' ><li><WidgetsIcon /> Products</li> </Link>
                <Link to='/sale' ><li><LocalOfferIcon fontSize="small" /> Sale</li> </Link>
                <Link to='/contact' ><li><ContactMailIcon fontSize="small" /> Contact</li> </Link>
                <Link to='/news' > <li> <NewspaperIcon /> News</li>  </Link>
                <Link to='/login' > <li><AccountCircleIcon /> Login</li>  </Link>
                <Link to='/register' > <li><HowToRegOutlinedIcon /> Registration</li>  </Link>
            </ul>
        </div>
    );
}
