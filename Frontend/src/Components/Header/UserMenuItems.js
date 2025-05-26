import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import './Header.css'

export default function UserMenuItems() {
  return (
    <>
      <div className='head3'>
        <ul className="navbar-menu">
          <li><AccountCircleIcon fontSize="small" /> My Account</li>
          <li><HomeIcon fontSize="small" /> Home</li>
          <li><StorefrontIcon fontSize="small" /> Shopping Port</li>
          <li><ShoppingCartOutlinedIcon /> Cart</li>
          <li><ListAltIcon fontSize="small" /> Orders</li>
          <li><FavoriteIcon fontSize="small" /> Wishlist</li>
          <li><LogoutIcon fontSize="small" /> Logout</li>
        </ul>
      </div>
    </>
  );
}