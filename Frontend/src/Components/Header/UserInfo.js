import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Button } from 'antd';
import './Header.css'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from '../Settings/Settings';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const UserInfo = ({ loginId, setloginId }) => {

    const { logout } = useAuth();
    const [showSetting, setShowSetting] = useState(false)
    const navigate = useNavigate();
    const BASE_URL = 'http://localhost:8000';

    // const [userData, setUserData] = useState({})
    // useEffect(() => {
    //     const savedUser = localStorage.getItem('user');
    //     if (savedUser) {
    //         const parsedData = JSON.parse(savedUser);
    //         setUserData(parsedData.user)
    //     }
    // }, []);

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user);
        }
    }, []);

    useEffect(() => {
        console.log(userData, "this user Data in UserInfo.js");
    }, [userData]);

    function handleSettings() {
        setShowSetting(!showSetting)
    }

    function handleLogOut() {
        const login = () => setloginId(false);
        logout();
    }
    const userName = "Romofyi";
    return (
        <div className='container-fluid'>
            <div className='row d-flex align-items-center'>
                <div className='col-md-5 user'>
                    <img src={`${BASE_URL}${userData.image}`} alt='User_Image' />
                    <h3>Hi {userData?.first_name || "ROMOFYI"}</h3>
                </div>
                <div className='col-md-5 info'>
                    <ul className='d-flex align-items-center mt-2 list-unstyled gap-4' >
                        <li><LocalMallIcon /> Order </li>
                        <li><HistoryIcon /> History </li>
                        <li><FavoriteIcon /> Favourites </li>
                        <li onClick={handleSettings}><SettingsIcon /> Settings </li>
                    </ul>
                </div>
                <div className='col-md-2'>
                    <Button className='rounded' onClick={handleLogOut}><LogoutOutlinedIcon /> <span>LogOut</span></Button>
                </div>
            </div>
            {showSetting && <Settings />}

        </div>
    )
}

export default UserInfo
