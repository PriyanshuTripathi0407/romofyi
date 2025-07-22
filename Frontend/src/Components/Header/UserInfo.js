import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Button } from 'antd';
import './Header.css';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from '../Settings/Settings';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // ✅ Correct path

const UserInfo = () => {
  const { logout, user } = useAuth(); // ✅ Get user and logout from context
  const [showSetting, setShowSetting] = useState(false);
  const nav = useNavigate();
  const BASE_URL = 'http://localhost:8000';

  const handleSettings = () => {
    setShowSetting(!showSetting);
  };

  const handleLogOut = () => {
    logout(); // ✅ Removes user from context + localStorage
    nav('/', { replace: true });
  };

  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      let parsedData = JSON.parse(savedUser);
      setUserData(parsedData.user)
    }
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row d-flex align-items-center'>
        <div className='col-md-5 user'>
          <img src={`${BASE_URL}${userData?.image || ''}`} alt='User_Image' />
          <h3>
            Hi {userData?.first_name || 'ROMOFYI'} Welcome to Dashboard
          </h3>
        </div>
        <div className='col-md-5 info'>
          <ul className='d-flex align-items-center mt-2 list-unstyled gap-4'>
            <Link to='/order'>
              <LocalMallIcon /> Order
            </Link>
            <Link to='/order'>
              <HistoryIcon /> History
            </Link>
            <Link to='/wishlist'>
              <FavoriteIcon /> Favourites
            </Link>
            <Link to='/setting'>
              <SettingsIcon /> Settings
            </Link>
          </ul>
        </div>
        <div className='col-md-2'>
          <Button className='rounded' onClick={handleLogOut}>
            <LogoutOutlinedIcon /> <span>LogOut</span>
          </Button>
        </div>
      </div>
      {showSetting && <Settings />}
    </div>
  );
};

export default UserInfo;
