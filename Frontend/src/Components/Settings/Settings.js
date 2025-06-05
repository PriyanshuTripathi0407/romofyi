import { Form, Input, Modal, Select, Upload, Button, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import './Settings.css'
import userImage from '../../Image/BannerGirl.png'
import { useForm } from 'antd/es/form/Form';

const Settings = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [showComplain, setShowComplain] = useState(false);
    const [showhelp, setShowHelp] = useState(false);
    const [form] = useForm();

    const [userData, setUserData] = useState({})
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedData = JSON.parse(savedUser);
            setUserData(parsedData.user)
        }
    }, []);

    const BASE_URL = 'http://localhost:8000';
    const ShowModal = (record) => {
        form.setFieldsValue(record)
    }

    // const putData = async (values) => {
    //     setRegRecord(values.id);
    //     const response = await PutData(RegRecord, values)
    //     alert("Data Updated Successfully!! ")
    //     setShowProfile(false);
    //   }

    function handleshowProfile() {
        ShowModal(userData)
        setShowProfile(true)
        setShowComplain(false)
        setShowHelp(false)
    }

    function handleshowComplain() {
        setShowComplain(true)
        setShowProfile(false)
        setShowHelp(false)
    }

    function handleshowHelp() {
        setShowHelp(true)
        setShowProfile(false)
        setShowComplain(false)
    }

    function handleModifiedData(formData) {
        console.log(formData, "This is Modified Data");
    }

    function handleComplaintData(formData) {
        console.log(formData, "This is Complaint Data");
    }

    function handleSuggestionData(formData) {
        console.log(formData, "This is Complaint Data");
    }




    return (
        <div className='settings'>
            <div className='col container'>
                <ul className='d-flex align-items-start flex-column mt-1 list-unstyled'>
                    <li onClick={handleshowProfile}>Edit Profile</li>
                    <li onClick={handleshowComplain}>Complain & Suggestions</li>
                    <li onClick={handleshowHelp}>Help & Contact</li>
                </ul>
            </div>

            {showProfile &&
                <Modal open={showProfile} onCancel={() => setShowProfile(false)} footer={null} width="60vw" centered >
                    <div className='edit-profile-container' >
                        <h3 className='form-title'>Romofyi Profile Editor</h3>
                        <Form layout='vertical' className='profile-form' onFinish={handleModifiedData} form={form}>
                            <div className='image-name-container'>
                                <Form.Item label='First Name' name='first_name'>
                                    <Input placeholder={userData?.first_name || " "} />
                                </Form.Item>
                                <Form.Item label='Last Name' name='last_name'>
                                    <Input />
                                </Form.Item>
                                <div className='image-upload-container'>
                                    <Avatar
                                        size={100}
                                        src={userData.image ? `${BASE_URL}${userData.image}` : userImage}
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

            {showComplain &&
                <Modal open={showComplain} onCancel={() => setShowComplain(false)} footer={null} width="60vw" centered >
                    <div className='complain'>
                        <h3 className='form-title'>Romofyi Complain Portal </h3>
                        <div className='about'>
                            <div className='image-upload-container'>
                                <Avatar
                                    size={100}
                                    shape="square"
                                    src={userData.image ? `${BASE_URL}${userData.image}` : userImage}
                                    className='custom-avatar'
                                />
                            </div>
                            <div className='d-flex justify-content-between align-items-start  '>
                                <p><strong> Name:</strong> {userData.first_name} {userData.last_name} <br /> <strong>Email: </strong>{userData.email}</p>
                            </div>
                        </div>
                        <Form layout='vertical' className='profile-form' onFinish={handleComplaintData}>
                            <Form.Item label='Complain/Suggestion' name='message'>
                                <Input.TextArea rows={9} />
                            </Form.Item>
                            <div>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </Modal>
            }
            {showhelp &&
                <div className='contact'>
                    <h3 className='form-title'>Romofyi Contact Portal </h3>
                    <div className='about'>
                        <div className='image-upload-container'>
                            <Avatar
                                size={100}
                                shape="square"
                                src={userData.image ? `${BASE_URL}${userData.image}` : userImage}
                                className='custom-avatar'
                            />
                        </div>
                        <div className='d-flex justify-content-between align-items-start  '>
                            <p><strong> Name:</strong> {userData.first_name} {userData.last_name} <br /> <strong>Email: </strong>{userData.email}</p>
                        </div>
                    </div>

                    <Form layout='vertical' className='profile-form' onFinish={handleSuggestionData}>
                        <Form.Item label='Messages' name='message'>
                            <Input.TextArea rows={9} />
                        </Form.Item>
                        <div>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            }

        </div>


    )
}

export default Settings
