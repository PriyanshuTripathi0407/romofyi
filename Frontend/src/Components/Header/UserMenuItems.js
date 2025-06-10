import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import romo from '../../Image/BannerGirl.png'
import './Header.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserMenuItems() {
  const BASE_URL = 'http://localhost:8000';
  const [userData, setUserData] = useState({})
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      setUserData(parsedData.user)
    }
  }, []);

  return (
    <>
      <div className='head3'>
        <ul className="navbar-menu">
          <Link to='/user-dashboard'><li className='logo'><img src={userData.image ? `${BASE_URL}${userData.image}` : romo} /> Romofyi </li> </Link>
          <Link to='/home'><li><HomeIcon fontSize="small" /> Home</li> </Link>
          <Link to='/product'><li><StorefrontIcon fontSize="small" /> Shopping Port</li> </Link>
          <Link to='/cart'><li><ShoppingCartOutlinedIcon /> Cart</li></Link>
          <Link to='/order'><li><ListAltIcon fontSize="small" /> Orders</li></Link>
          <Link to='/wishlist'> <li><FavoriteIcon fontSize="small" /> Wishlist</li> </Link>
          <Link to='/setting'><li><AccountCircleIcon fontSize="small" /> Account</li> </Link>
        </ul>
      </div>
    </>
  );
}
