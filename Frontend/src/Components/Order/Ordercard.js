import React, { useEffect, useState } from 'react';
import { GetVendorOrderedProductData, PostOrderedProductStatus } from '../../API/ProductAPI/ProductAPI';
import { Avatar, Button, Form, Input, Upload } from 'antd';
import { Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import NoDataFound from '../ShowMessages/NoDataFound';

const Ordercard = ({ orderedProducts, setOrderedProducts }) => {
    const [showProfile, setShowProfile] = useState(false)
    const [previewImage, setPreviewImage] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState('pending');
    const [form] = useForm();

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const parsedData = JSON.parse(savedUser);
                setUserData(parsedData.user);
            }
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
        }
    }, []);

    const handleStatusChange = async (item) => {
        console.log("Sending this data in model", item)
        if (userData.id) {
            const data = {
                order_item_id: item.order_item_id,
                status: status,
                vendor: userData.id
            }
            const res = await PostOrderedProductStatus(data);
            console.log("Getting status updated data from backend", res.data.updated_order_item)
            //Add Order updation Email here
            setOrderedProducts(res.data.updated_order_item)
            setShowProfile(false);
        }
    };

    const [orderedProductData, setOrderedProductData] = useState();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Default locale format (can customize)
    };

    const openModal = (item) => {
        setOrderedProductData(item);
        form.setFieldsValue({
            order_item_id: item.id,
            product_id: item.product.product_id,
            product_name: item.product.product_name,
            product_color: item.product.product_color,
            order_by: item.order.customer.first_name,
            status: item.status_display,
        });
        setTimeout(() => {
            setShowProfile(true);
        }, 0);
    };

    return (
        <>
            <h2> Ordered Products Data </h2>
            <div className="card">
                {orderedProducts ?
                    orderedProducts.map((item, index) => (
                        <div
                            className="card-body card-border m-3"
                            key={item.id}
                            style={{
                                backgroundColor: item.order.is_paid ? '#d4edda' : '#ffffff',  // light green or white
                                border: '1px solid #183661',
                                borderRadius: '10px'
                            }}
                        >
                            <div className="d-flex justify-content-between" style={{ color: '#183661' }}>
                                <p><strong>Order ID:</strong> {item.order.id} </p>
                                <p><strong>Product ID:</strong> {item.product.product_id} </p>
                                <p><strong>Ordered at:</strong> {formatDate(item.order.created_at)} </p>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-start" style={{ color: '#183661' }}>
                                    <h6 className="card-subtitle mb-2" style={{ color: '#183661' }}>
                                        <strong>Customer:</strong> {item.order.customer.first_name} {item.order.customer.last_name}
                                    </h6>
                                    <h6 className="card-subtitle mb-2" style={{ color: '#183661' }}>
                                        <strong>Address:</strong> {item.order.customer.address}
                                    </h6>
                                    <h6 className="mb-2" style={{ color: '#183661' }}>
                                        <strong>Quantity:</strong> {item.quantity}<br />
                                    </h6>
                                    <h6 className="mb-2" style={{ color: '#183661' }}>
                                        <strong>Payment:</strong> {item.order.is_paid ? "Paid Done" : "Not Paid Yet"}
                                    </h6>
                                    <h6 className="mb-2" style={{ color: '#183661' }}>
                                        <strong>Status:</strong> {item.status_display}
                                    </h6>
                                </div>

                                <div>
                                    <img src={item.product.product_image} alt="Product" className="img-fluid rounded-circle"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'contain',
                                            marginRight: '10px',
                                            border: '3px solid #183661'
                                        }} />
                                    <p className="card-text" style={{ color: '#183661' }}>
                                        <strong>Item:</strong> {item.product.product_name}
                                    </p>
                                </div>
                            </div>

                            <div className="input-group mb-3 justify-content-left">
                                <Button
                                    style={{
                                        backgroundColor: '#183661',
                                        color: 'gold',
                                        borderColor: '#183661',
                                        fontWeight: 'bold',
                                        marginLeft: '100px',
                                        marginTop: '10px',
                                        fontSize: '16px'
                                    }}
                                    onClick={() => openModal(item)}
                                >Update Status
                                </Button>
                            </div>


                            {showProfile && (
                                <Modal
                                    open={showProfile}
                                    onCancel={() => setShowProfile(false)}
                                    footer={null}
                                    width="60vw"
                                    centered
                                >
                                    <div className="edit-profile-container">
                                        <h3 className="form-title">Romofyi Order Update</h3>
                                        <Form layout="vertical" className="profile-form" onFinish={handleStatusChange} form={form}>
                                            <div className="image-name-container">
                                                <Form.Item label="Product Id" name="product_id">
                                                    <Input placeholder={orderedProductData.product.product_id || "Product Id"} style={{ color: 'gold' }} disabled />
                                                </Form.Item>
                                                <Form.Item label="Product Name" name="product_name">
                                                    <Input placeholder={orderedProductData.product.product_name || "Product Name"} style={{ color: 'gold' }} disabled />
                                                </Form.Item>
                                                <Form.Item label="Color" name="product_color">
                                                    <Input placeholder={orderedProductData.product.product_color || "Color"} style={{ color: 'gold' }} disabled />
                                                </Form.Item>

                                                <div className="image-upload-container">
                                                    <Avatar
                                                        size={100}
                                                        src={previewImage || (orderedProductData ? orderedProductData.product.product_image : previewImage)}
                                                        disabled />
                                                    <Form.Item
                                                        name="image"
                                                        valuePropName="file"
                                                        getValueFromEvent={(e) => {
                                                            const file = e?.file?.originFileObj;
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onload = () => {
                                                                    setPreviewImage(reader.result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                            return file;
                                                        }}
                                                    >
                                                        <Upload showUploadList={false} beforeUpload={() => false}>
                                                            {/* Upload Button (if needed) */}
                                                        </Upload>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="image-name-container">
                                                <Form.Item label="Order by" name="order_by">
                                                    <Input placeholder={orderedProductData.product.product_id || "Product Id"} style={{ color: 'gold' }} disabled />
                                                </Form.Item>
                                                <Form.Item label="Current Status" name="status">
                                                    <Input placeholder={orderedProductData.product.product_name || "Product Name"} style={{ color: 'gold' }} disabled />
                                                </Form.Item>
                                                <Form.Item label="Order Id" name="order_item_id">
                                                    <Input placeholder={orderedProductData.id || "Undefined"} style={{ color: 'gold' }} disabled />
                                                </Form.Item>

                                            </div>

                                            <div className="input-group mb-3 justify-content-left">
                                                <label
                                                    className="input-group-text"
                                                    htmlFor={`status-select-${orderedProductData.order.id}`}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        color: '#183661',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Update Status
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id={`status-select-${orderedProductData.id}`}
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    style={{
                                                        backgroundColor: '#f8f9fa',
                                                        borderColor: '#183661',
                                                        maxWidth: '150px',
                                                    }}
                                                >
                                                    {orderedProductData.status_choices.map(([value, label]) => (
                                                        <option key={value} value={value}>
                                                            {label}
                                                        </option>
                                                    ))}
                                                </select>

                                                <Button
                                                    style={{
                                                        backgroundColor: 'gold',
                                                        color: '#183661',
                                                        borderColor: '#183661',
                                                        fontWeight: 'bold',
                                                        marginLeft: '100px',
                                                        marginTop: '10px',
                                                    }}
                                                    htmlType='submit'
                                                    disabled={isUpdating}
                                                >
                                                    {isUpdating ? 'Saving...' : 'Save'}
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Modal>
                            )}


                        </div>
                    ))
                    :
                    <>
                        <NoDataFound />
                    </>
                }
            </div>
        </>
    );
};

export default Ordercard;
