// import React from 'react'
// import { Link } from 'react-router-dom'
// import Shirt4 from './cshirt4.png'

// function Sidebar() {
//     const user = "Admin";
//     return (
//         <div>
//             <div className='sidebar'>
//                 <div>
//                     <img src={Shirt4}></img>
//                     <h2>{user}</h2>
//                 </div>
//                 <div>
//                     <ul>
//                         <Link to='/'>  <li>Home </li> </Link>
//                         <Link to='/about'> <li>About</li></Link>
//                         <Link to='/stock'> <li>Stocks</li></Link>
//                         <Link to='/review'> <li>Review</li></Link>
//                         <Link to='/order'> <li>Order</li></Link>
//                         <Link to='/productoftheday'> <li>Product of Day</li></Link>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar


import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import shirt4 from '../../Image/cshirt4.png'

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
        <div className='adminDraw'>         
            <div className='draw'>
            <h1>Welcome to Admin Dashboard</h1>
                {/* Drawer with placement from the left */}
                <Drawer
                    title="Dashboard"
                    onClose={onClose}
                    open={open}
                    placement="right"
                    style={{
                        backgroundColor: '#183661',
                        color: "gold",                       
                        listStyle: 'none',
                        width:'300px',
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
            </div>
            <div>
                <Button type="primary" onClick={showDrawer}> Admin Dock </Button>
            </div>
        </div>
    );
};

export default Sidebar;



