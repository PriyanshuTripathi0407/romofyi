import React from 'react'
import './VendorDashboard.css'
const VendorDashboard = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-4 logo'>
                    <div className='sidebar'>
                        <p>Vendor Details</p>
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
