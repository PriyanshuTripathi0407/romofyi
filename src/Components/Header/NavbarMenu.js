import NewReleasesIcon from '@mui/icons-material/NewReleases';
import WatchIcon from '@mui/icons-material/Watch';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link, useNavigate } from 'react-router-dom'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css'

export default function NavbarMenu() {
    return (
        <div className='head3'>
            <ul className="navbar-menu">
                <li><HomeIcon fontSize="small" /> Home</li>
                <li><NewReleasesIcon fontSize="small" /> New Arrivals</li>
                <li><WidgetsIcon /> Products</li>
                <li><LocalOfferIcon fontSize="small" /> Sale</li>
                <li><ContactMailIcon fontSize="small" /> Contact</li>
                <Link to='/news' > <li> <NewspaperIcon /> News</li>  </Link>
                <Link to='/login' > <li><AccountCircleIcon /> Login</li>  </Link>
                <Link to='/register' > <li><HowToRegOutlinedIcon /> Registration</li>  </Link>
            </ul>
        </div>
    );
}
