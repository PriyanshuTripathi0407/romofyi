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
    const [previewImage, setPreviewImage] = useState(null);
    const BASE_URL = 'http://localhost:8000';
    const [form] = useForm();
    const { logout } = useAuth();
    const nav = useNavigate();


    const [userData, setUserData] = useState({})
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user)
        }
    }, []);


    const [activeSection, setActiveSection] = useState("dashboard");

    function switchSection(section) {
        setActiveSection(section);
        if (section === "showProfile") {
            setShowProfile(true);
        }
    }

    function ShowProfile() {
        setShowProfile(true)
        form.setFieldsValue(userData);
        setActiveSection("dashboard");
    }

    function handleModifiedData() {
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
                        <div className='show-flex bio' onClick={() => ShowProfile()}>
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
                                <li className="nav-item" onClick={() => switchSection("dashboard")}>Dashboard</li>
                                <li className="nav-item" onClick={() => switchSection("productList")}>Products List </li>
                                <li className="nav-item" onClick={() => switchSection("requestedProduct")}>Orders </li>
                                <li className="nav-item" onClick={() => switchSection("customerTable")}>Customers Table</li>
                                <li className="nav-item" onClick={() => ShowProfile()}>Settings</li>
                                <li className="nav-item" onClick={handleLogOut}>Logout</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className='col-md-9'>
                    <ul className='vendor-header'>
                        <li onClick={() => switchSection("uploadProduct")}> Add New Products </li>
                        <li onClick={() => switchSection("soldProduct")}> Sold Products  </li>
                        <li onClick={() => switchSection("requestedProduct")}> Ordered Products  </li>
                        <li onClick={() => switchSection("customerReviews")}> Customer Reviews  </li>
                    </ul>
                    <div className='right-container'>
                        <div className='right'>
                            {activeSection === "dashboard" && <VendorCharts />}
                            {activeSection === "productList" && <ProductTable />}
                            {activeSection === "uploadProduct" && <ProductUpload />}
                            {activeSection === "soldProduct" && <SoldProducts />}
                            {activeSection === "requestedProduct" && <RequestedProduct />}
                            {activeSection === "customerReviews" && <CustomerProductReviews />}
                            {activeSection === "customerTable" && <CustomerTable />}


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
                                                        src={previewImage || (userData.image ? `${BASE_URL}${userData.image}` : vendorImage)}
                                                    />
                                                    <Form.Item
                                                        name="image"
                                                        valuePropName="file" // required to pass file object instead of event
                                                        getValueFromEvent={(e) => {
                                                            const file = e?.file?.originFileObj;
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onload = () => {
                                                                    setPreviewImage(reader.result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                            return file; // This is the value sent in formData
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


            </div >
        </div >
    )
}

export default VendorDashboard
