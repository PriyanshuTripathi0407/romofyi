import React from 'react'
import './VendorDashboard.css'
import vendorImage from '../../Image/BannerGirl.png'
import VendorCharts from '../../Components/Charts/VendorCharts'
import ProductUpload from '../../Components/ProductUploads/ProductUpload'

const VendorDashboard = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3 logo'>
                    <h5>Vendor Details</h5>
                    <div className='sidebar'>
                        <div className='show-flex'>
                            <div className='imageWrapper'>
                                <img src={vendorImage} alt='Vendor Image' />
                            </div>
                            <div className='info'>
                                <h6>SHO85AJ </h6>
                                <h6>Ajay Sinha </h6>
                                <h6>Ajay Fruits Shop</h6>
                            </div>
                        </div>
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">Dashboard</li>
                                <li className="nav-item">Products</li>
                                <li className="nav-item">Orders </li>
                                <li className="nav-item">Customers</li>
                                <li className="nav-item">Settings</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className='col-md-9'>
                    <ul className='vendor-header'>
                        <li> Add New Products </li>
                        <li> Sold Products  </li>
                        <li> Ordered Products  </li>
                        <li> Customer Reviews  </li>
                    </ul>
                    <div className='right-container'>
                        <div className='right'>                           
                            <VendorCharts/>
                        </div>
                        <div className='right'>
                            <p>This is my New Product Uploads Data </p>
                            <ProductUpload/>
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
