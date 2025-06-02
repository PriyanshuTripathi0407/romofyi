import { Form, Input, Select, Upload, Button, Avatar } from 'antd'
import React, { useState } from 'react'
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import './Settings.css'
import userImage from '../../Image/BannerGirl.png'
const Settings = () => {
    const [showProfile, setShowProfile] = useState(true);
    const [showComplain, setShowComplain] = useState(false);
    const [showhelp, setShowHelp] = useState(false);


    function handleshowProfile() {
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


    return (
            <div className='settings'>
                <div className='col'>
                    <ul className='d-flex align-items-center mt-2 list-unstyled justify-content-between'>
                        <li onClick={handleshowProfile}>Edit Profile</li>
                        <li onClick={handleshowComplain}>Complain & Suggestions</li>
                        <li onClick={handleshowHelp}>Help & Contact</li>
                    </ul>
                </div>

                {showProfile &&
                    <div className='edit-profile-container'>
                        <h3 className='form-title'>Romofyi Profile Editor</h3>
                        <Form layout='vertical' className='profile-form'>
                            <div className='image-name-container'>
                                <Form.Item label='First Name' name='first_name'>
                                    <Input />
                                </Form.Item>
                                <Form.Item label='Last Name' name='last_name'>
                                    <Input />
                                </Form.Item>
                                <div className='image-upload-container'>
                                    <Avatar
                                        size={100}
                                        src={userImage}
                                    />
                                    <Upload showUploadList={false}>
                                        <Button icon={<UploadOutlined />} className='upload-btn'>Upload Image</Button>
                                    </Upload>
                                </div>
                            </div>
                            <div className='info-container'>
                                <Form.Item label='Email' name='email'>
                                    <Input />
                                </Form.Item>
                                <Form.Item label='Contact' name='contact'>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className='info-container'>

                                <Form.Item label='Role' name='role'>
                                    <Select
                                        placeholder='Select Role..'
                                        options={[
                                            { value: 'Customer', label: 'Customer' },
                                            { value: 'Seller', label: 'Seller' },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label='Password' name='password'>
                                    <Input.Password />
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
                }

                {showComplain &&
                    <div className='complain'>
                        <h3 className='form-title'>Romofyi Complain Portal </h3>
                        <div className='about'>
                            <div className='d-flex justify-content-between align-items-start flex-column '>
                                <h5>Name: Romofyi</h5>
                                <h5>Email: romofyi@gmail.com</h5>
                            </div>
                            <div className='image-upload-container'>
                                <Avatar
                                    size={100}
                                    src={userImage}
                                />
                            </div>
                        </div>
                        <Form layout='vertical' className='profile-form'>
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
                }
                {showhelp &&
                    <div className='contact'>
                        <h3 className='form-title'>Romofyi Contact Portal </h3>
                        <div className='about'>
                            <div className='d-flex justify-content-between align-items-start flex-column '>
                                <h5>Name: Romofyi</h5>
                                <h5>Email: romofyi@gmail.com</h5>
                            </div>
                            <div className='image-upload-container'>
                                <Avatar
                                    size={100}
                                    src={userImage}
                                />
                            </div>
                        </div>
                        <Form layout='vertical' className='profile-form'>
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
