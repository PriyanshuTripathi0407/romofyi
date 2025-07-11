import React, { useState } from 'react'
import previewImage from '../../Image/BannerGirl.png'
import { Modal } from 'antd';
const OrderDataModel = () => {
    const [showProfile, setShowProfile] = useState(false)
    const [previewImage, setPreviewImage] = useState(null);
     const [isUpdating, setIsUpdating] = useState(false);
     const [status, setStatus] = useState('pending');
    const handleModifiedData = () => {
        alert("Data Uploaded")
        console.log()
    }

    const handleStatusChange=()=>{
        
    }

    return (
        <div>
            <div>
                {showProfile &&
                    <Modal open={showProfile} onCancel={() => setShowProfile(false)} footer={null} width="60vw" centered >
                        {/* <div className='edit-profile-container' >
                            <h3 className='form-title'>Romofyi Order Update</h3>
                            <Form layout='vertical' className='profile-form' onFinish={handleModifiedData} form={form}>
                                <div className='image-name-container'>
                                    <Form.Item label='Product Name' name='product_name'>
                                        <Input placeholder={userData?.product_name
                                            || "Product Name "} />
                                    </Form.Item>
                                    <Form.Item label='Color' name='product_color
'>
                                        <Input placeholder={userData?.product_color
                                            || "Color "} />
                                    </Form.Item>
                                    <div className='image-upload-container'>
                                        <Avatar
                                            size={100}
                                            src={previewImage || (userData ? userData.product_image
                                                : previewImage)}
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
                                            </Upload>
                                        </Form.Item>

                                    </div>
                                </div>
                                            
                                
                                <div className="input-group mb-3 justify-content-left">
                                    <label className="input-group-text" htmlFor={`status-select-${item.order.id}`}
                                        style={{ backgroundColor: 'white', color: '#183661', fontWeight: 'bold' }}>
                                        Update Status
                                    </label>
                                    <select
                                        className="form-select"
                                        id={`status-select-${item.id}`}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        style={{ backgroundColor: '#f8f9fa', borderColor: '#183661', maxWidth: '150px' }}
                                    >
                                        {item.status_choices.map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>


                                    <Button
                                        style={{
                                            backgroundColor: '#183661',
                                            color: 'gold',
                                            borderColor: '#183661',
                                            fontWeight: 'bold',
                                            marginLeft: '100px',
                                            marginTop: '10px'
                                        }}
                                        onClick={handleStatusChange}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? 'Saving...' : 'Save'}
                                    </Button>
                                </div>
                            </Form>
                        </div> */}
                    </Modal>
                }
            </div>

        </div>
    )
}

export default OrderDataModel
