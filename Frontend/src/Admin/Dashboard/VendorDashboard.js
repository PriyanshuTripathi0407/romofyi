import React, { useEffect, useState } from 'react'
import './VendorDashboard.css'
import vendorImage from '../../Image/BannerGirl.png'
import VendorCharts from '../../Components/Charts/VendorCharts'
import ProductUpload from '../../Components/ProductUploads/ProductUpload'
import SoldProducts from '../../Components/Product/SoldProducts'
import CustomerProductReviews from '../../Components/Reviews/CustomerProductReviews'
import RequestedProduct from '../../Components/Product/RequestedProduct'
import { Form, Input, Modal, Select, Upload, Button, Avatar } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom'
import ProductTable from '../../Components/Tables/ProductTable'
import CustomerTable from '../../Components/Tables/CustomerTable'

const VendorDashboard = ({ loginId, setLoginId }) => {
    const [showProfile, setShowProfile] = useState(false)
    const BASE_URL = 'http://localhost:8000';
    const [form] = useForm();
    const { logout } = useAuth();
    const nav = useNavigate();
    const [uploadProduct, setUploadProduct] = useState(false)
    const [soldProduct, setSoldProduct] = useState(false)
    const [showProductList, setShowProductList] = useState(false)
    const [showCustomerList, setShowCustomerList] = useState(false)
    const [showDashboard, setShowDashboard] = useState(true)
    const [requestedProduct, setRequestedProduct] = useState(false)
    const [reviews, setReviews] = useState(false)

    const [userData, setUserData] = useState({})
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user)
        }
    }, []);


    function handleModifiedData() {

    }
    function ShowDashboard() {
        setUploadProduct(false);
        setSoldProduct(false);
        setShowDashboard(true);
        setRequestedProduct(false);
        setReviews(false);
        setShowProfile(false);
        setShowProductList(false);
        setShowCustomerList(false);
    }
    function ShowRequestedProduct() {
        setUploadProduct(false);
        setSoldProduct(false);
        setShowDashboard(false);
        setRequestedProduct(true);
        setReviews(false);
        setShowProfile(false);
        setShowProductList(false);
        setShowCustomerList(false);
    }
    function ShowSoldProduct() {
        setUploadProduct(false);
        setSoldProduct(true);
        setShowDashboard(false);
        setRequestedProduct(false);
        setReviews(false);
        setShowProfile(false);
        setShowProductList(false);
        setShowCustomerList(false);
    }
    function ShowUploadProduct() {
        setUploadProduct(true);
        setSoldProduct(false);
        setShowDashboard(false);
        setRequestedProduct(false);
        setReviews(false);
        setShowProfile(false);
        setShowProductList(false);
        setShowCustomerList(false);
    }
    function ShowReviews() {
        setUploadProduct(false);
        setSoldProduct(false);
        setShowDashboard(false);
        setRequestedProduct(false);
        setReviews(true);
        setShowProfile(false);
        setShowProductList(false);
        setShowCustomerList(false);
    }
    function ShowProductList() {
        setUploadProduct(false);
        setSoldProduct(false);
        setShowDashboard(false);
        setRequestedProduct(false);
        setReviews(false);
        setShowProfile(false);
        setShowProductList(true);
        setShowCustomerList(false);
    }
    function ShowCustomerList() {
        setUploadProduct(false);
        setSoldProduct(false);
        setShowDashboard(false);
        setRequestedProduct(false);
        setReviews(false);
        setShowProfile(false);
        setShowProductList(false);
        setShowCustomerList(true);
    }
    function ShowProfile() {
        setUploadProduct(false);
        setSoldProduct(false);
        setShowDashboard(true);
        setRequestedProduct(false);
        setReviews(false);
        setShowProfile(true);
        setShowProductList(false);
        setShowCustomerList(false);
        form.setFieldsValue(userData)
    }


    function handleLogOut() {
        setLoginId(false);
        logout();
        nav('/', { replace: true })
    }

    console.log("This is vendor data in vendor Dashboard", userData)
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3 logo py-1'>
                    <h5>Vendor Details</h5>
                    <div className='sidebar'>
                        <div className='show-flex bio' onClick={ShowProfile}>
                            <div className='imageWrapper' >
                                <img src={userData.image ? `${BASE_URL}${userData.image}` : vendorImage} alt='Vendor Image' />
                            </div>
                            <div className='vendor-info'>
                                <h6>{userData.email || "SHOJ123"} </h6>
                                <h6>{userData.first_name || "Ajay Sinha"} {userData.last_name} </h6>
                                <h6>{userData.first_name || "Ajay "} Fruits Shop</h6>
                            </div>
                        </div>
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item" onClick={ShowDashboard}>Dashboard</li>
                                <li className="nav-item" onClick={ShowProductList}>Products List </li>
                                <li className="nav-item" onClick={ShowRequestedProduct}>Orders </li>
                                <li className="nav-item" onClick={ShowCustomerList}>Customers Table</li>
                                <li className="nav-item" onClick={ShowProfile}>Settings Need User</li>
                                <li className="nav-item" onClick={handleLogOut}>Logout</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className='col-md-9'>
                    <ul className='vendor-header'>
                        <li onClick={ShowUploadProduct}> Add New Products </li>
                        <li onClick={ShowSoldProduct}> Sold Products  </li>
                        <li onClick={ShowRequestedProduct}> Ordered Products  </li>
                        <li onClick={ShowReviews}> Customer Reviews  </li>
                    </ul>
                    <div className='right-container'>
                        <div className='right'>
                            {showDashboard &&
                                <VendorCharts />
                            }

                            {uploadProduct &&
                                <ProductUpload />
                            }

                            {soldProduct &&
                                <SoldProducts />
                            }

                            {requestedProduct &&
                                <RequestedProduct />
                            }

                            {reviews &&
                                <CustomerProductReviews />
                            }

                            {showProductList &&
                                <ProductTable />
                            }

                            {showCustomerList &&
                                <CustomerTable />
                            }
                        </div>
                        <div>
                            {showProfile &&
                                <Modal open={showProfile} onCancel={() => setShowProfile(false)} footer={null} width="60vw" centered >
                                    <div className='edit-profile-container' >
                                        <h3 className='form-title'>Romofyi Profile Editor</h3>
                                        <Form layout='vertical' className='profile-form' onFinish={handleModifiedData} form={form}>
                                            <div className='image-name-container'>
                                                <Form.Item label='First Name' name='first_name'>
                                                    <Input placeholder={userData?.first_name || "User First name "} />
                                                </Form.Item>
                                                <Form.Item label='Last Name' name='last_name'>
                                                    <Input placeholder={userData?.first_name || "User Last name "} />
                                                </Form.Item>
                                                <div className='image-upload-container'>
                                                    <Avatar
                                                        size={100}
                                                        src={userData.image ? `${BASE_URL}${userData.image}` : vendorImage}
                                                    />
                                                    <Form.Item
                                                        name="image"
                                                        valuePropName="file" // required to pass file object instead of event
                                                        getValueFromEvent={(e) => {
                                                            // SAFETY: Handle both drag & click upload events
                                                            if (Array.isArray(e)) return e;
                                                            return e?.file?.originFileObj;
                                                        }}
                                                    >
                                                        <Upload
                                                            showUploadList={false}
                                                            beforeUpload={() => false} // prevents auto-upload
                                                        >
                                                            <Button icon={<UploadOutlined />} className='upload-btn'>
                                                                Upload Image
                                                            </Button>
                                                        </Upload>
                                                    </Form.Item>

                                                </div>
                                            </div>
                                            <div className='info-container'>
                                                <Form.Item label='Email' name='email'>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item label='Password' name='password'>
                                                    <Input.Password />
                                                </Form.Item>
                                                <Form.Item label='Contact' name='contact'>
                                                    <Input />
                                                </Form.Item>

                                            </div>
                                            <Form.Item label='Address' name='address'>
                                                <Input.TextArea rows={3} />
                                            </Form.Item>
                                            <div>
                                                <Form.Item>
                                                    <Button type='primary' htmlType='submit'>
                                                        Save Changes
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        </Form>
                                    </div>
                                </Modal>
                            }
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default VendorDashboard
