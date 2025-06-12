import React from 'react'
import './VendorDashboard.css'
import vendorImage from '../../Image/BannerGirl.png'

const VendorDashboard = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-4 logo'>
                    <h5>Vendor Details</h5>
                    <div className='sidebar'>
                        <div className='show-flex'>
                            <div className='imageWrapper'>
                                <img src={vendorImage} alt='Vendor Image' />
                            </div>
                            <div className='info'>
                                <p>Vendor Id: </p>
                                <p>Vendor Name: </p>
                                <p>Vendor Shop Name: </p>
                            </div>
                        </div>
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item"><a className="nav-link active" href="#">Dashboard</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Products</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Orders</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Customers</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">Settings</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className='col-md-8'>
                    <ul className='vendor-header'>
                        <li> New Products Upload </li>
                        <li> Sold Products  </li>
                        <li> Requested Products  </li>
                        <li> Customer Reviews  </li>
                    </ul>
                    <div className='right-container'>
                        <div className='right'>
                            <p>This is Default Data Analysis </p>
                        </div>
                        <div className='right'>
                            <p>This is my New Product Uploads Data </p>
                        </div>
                        <div className='right'>
                            <p>This is my Sold Products Data </p>
                        </div>
                        <div className='right'>
                            <p>This is my Requested Products Data </p>
                        </div>
                        <div className='right'>
                            <p>This is my Customer Reviews Data </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default VendorDashboard
