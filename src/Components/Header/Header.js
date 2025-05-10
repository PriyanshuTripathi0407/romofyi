import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../App.css'
import fb from '../../Image/fb.png' 
import twitter from '../../Image/twitter.png'
import linkedin from '../../Image/in.png'
import insta from '../../Image/insta.png'
import email from '../../Image/email.png'
import romo from '../../Image/logo.png'
import bag from '../../Image/shoppingbag.png'
import search from '../../Image/search.png'


function Header({cartProduct}) {
    const nav = useNavigate();
    function send(e) {
        nav('/login',{ replace: true });
    }
    return (
        <div>

            <div className='head2'>
                <div>
                    <ul >
                        <li> <img src={email} alt='' /> </li>
                        <li><img src={fb} alt=''></img></li>
                        <li><img src={twitter} alt=''></img></li>
                        <li><img src={linkedin} alt=''></img></li>
                        <li><img src={insta} alt=''></img></li>
                    </ul>
                </div>
                <div>
                    <Link to='/' > <img src={romo} alt=''></img> </Link>
                </div>
                <div >
                    <img src={bag} alt=''></img>
                    <span> {cartProduct.count} </span>
                </div>
                <div>
                    <Link to='/login' > <button>Login</button>  </Link>
                </div>
                <div>
                    <Link to='/register' > <button>Register</button>  </Link>
                </div>
            </div>

            <div className='head3'>
                <div>
                    <ul>
                        <Link to='/' > <li>HOME</li>  </Link>
                        <Link to='/cart'> <li>CART</li>  </Link>
                        <Link to='/product' > <li>PRODUCTS</li>  </Link>
                        <Link to='/fashion' > <li>FASHION</li>  </Link>
                        <Link to='/news' > <li>NEWS</li>  </Link>
                        <Link to='/contact' > <li>CONTACT</li>  </Link>

                    </ul>
                </div>
                <div className='inp'>
                    <input type='text' placeholder='Search here...' />
                    <img src={search} alt='' />
                </div>
            </div>

        </div>
    )
}

export default Header
