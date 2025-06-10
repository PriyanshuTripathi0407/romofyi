import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import shirt4 from '../../Image/cshirt4.png'
import UserDashboard from '../../Admin/user-dashboard/UserDashboard';

// import { FiAlignJustify } from "react-icons/fi";

function Sidebar() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <div className='adminDraw'>
                <div className='draw'>
                    <h1>Welcome to User Dashboard</h1>
                    Drawer with placement from the left
                    <Drawer
                        title="Dashboard"
                        onClose={onClose}
                        open={open}
                        placement="right"
                        style={{
                            backgroundColor: '#183661',
                            color: "gold",
                            listStyle: 'none',
                            width: '300px',
                        }} className='draw'>
                        <img src={shirt4}></img>
                        <ul>
                            <Link to='/'>  <li>Home </li> </Link>
                            <Link to='/about'> <li>About</li></Link>
                            <Link to='/stock'> <li>Stocks</li></Link>
                            <Link to='/review'> <li>Review</li></Link>
                            <Link to='/order'> <li>Order</li></Link>
                            <Link to='/login'> <li>Login</li></Link>
                            <Link to='/register'> <li>Register</li></Link>
                            <Link to='/productoftheday'> <li>Product of Day</li></Link>
                        </ul>
                    </Drawer>
                <div>
                    <Button type="primary" onClick={showDrawer}> Admin Dock </Button>
                </div>
                </div>
            </div> */}
            <UserDashboard/>
        </>
    );
};

export default Sidebar;



