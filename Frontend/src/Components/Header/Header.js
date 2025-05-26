import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import romo from '../../Image/romofyilogo.png'
import bag from '../../Image/shoppingbag.png'
import XIcon from '@mui/icons-material/X';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Header({ cartProduct }) {

    return (
       
            <div className='head2'>

                <div>
                    <Link to='/' > <img src={romo} alt=''></img> </Link>
                </div>
                <ul >
                    <li> <MailOutlineOutlinedIcon fontSize='small' /> </li>
                    <li><FacebookOutlinedIcon fontSize='small' /></li>
                    <li><XIcon fontSize='small' /></li>
                    <li><LinkedInIcon fontSize='small' /></li>
                    <li><InstagramIcon fontSize='small' /></li>
                </ul>
               

                {/* <div className='head3'>
                    <ul className='navbar-menu'>
                        <Link to='/' > <li><HomeOutlinedIcon/> HOME</li>  </Link>
                        <Link to='/product' > <li><WidgetsIcon/> PRODUCTS</li>  </Link>
                        <Link to='/fashion' > <li> <DiamondIcon/> FASHION</li>  </Link>
                        <Link to='/contact' > <li><ContactSupportIcon/> CONTACT</li>  </Link>
                        <Link to='/news' > <li> <NewspaperIcon/> NEWS</li>  </Link>
                        <Link to='/login' > <li><AccountCircleIcon/> LOGIN</li>  </Link>
                        <Link to='/register' > <li><HowToRegOutlinedIcon/> REGISTRATION</li>  </Link>
                    </ul>
                </div> */}
            </div>

        
    )
}







