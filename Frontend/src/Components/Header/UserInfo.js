import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Button } from 'antd';
const UserInfo = () => {
    return (
        <div className='container-fluid'>
            <div className='row d-flex align-items-center'>
                <div className='col-md-5'>
                    <h3>Hi UserName</h3>                    
                </div>
                <div className='col-md-5'>
                    <ul className='d-flex align-items-center mt-2 list-unstyled gap-4' >
                        <li>Home </li>
                        <li>Account </li>
                        <li>Order </li>
                        <li>History </li>
                        <li>Favourites </li>
                    </ul>
                </div>
                <div className='col-md-2'>
                    <Button className='rounded'><LogoutOutlinedIcon /> <span>LogOut</span></Button>
                </div>
            </div>

        </div>
    )
}

export default UserInfo
