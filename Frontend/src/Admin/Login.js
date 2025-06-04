
import React, { useState, useEffect } from 'react'
import { Button, Input, Form, Select, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { postData } from '../API/LoginAPI/LoginAPI';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'antd/es/form/Form';
import { useAuth } from '../AuthContext';
import { useSnackbar } from 'notistack';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

function Login({ loginId, setloginId }) {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const InvalidCredentials = () => toast.error(" Invalid Credentials !!! ")
    const successCredentials = () => toast.success(" Successfuly Logged In !! ")


    const getRegistration = async (formData) => {
        try {
            const response = await postData(formData);
            if (response.status === 200 && response.data.success) {
                login(response.data);
                enqueueSnackbar("Logged In Successfully", { variant: 'success' })
                setloginId(true);
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                enqueueSnackbar("Invalid Credentials !! ", {
                    variant: 'error', persist: false, action: (key) => (
                        <p onClick={() => closeSnackbar(key)} style={{paddingTop:'12px', cursor:'pointer'}}><HighlightOffOutlinedIcon/></p>
                    )
                }) 
            } else {
                console.error('Unexpected error:', error);
                message.error('Something went wrong. Please try again.');
            }
        }
    };



    console.log(getRegistration, " This is data in Login page ")



    return (
        <div className='loginContainer' >
            <ToastContainer />
            <Form className='formContainer' onFinish={getRegistration}>
                <h1>LOGIN FORM</h1><br />
                <div className='item'>
                    <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input />
                    </Form.Item>
                </div>
                <div className='item'>
                    <Form.Item label='Password' name='pass' rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input />
                    </Form.Item>
                </div>
                <div className='item'>
                    <Form.Item label='Role: ' name='role' rules={[{ required: true, message: 'Please select role !!' }]}>
                        <Select
                            placeholder="Select Role.. "
                            options={[{ value: 'Customer', label: 'Customer', },
                            { value: 'Admin', label: 'Admin', },
                            { value: 'Vendor', label: 'Vendor', },]} />
                    </Form.Item>
                </div>

                <Button htmlType='submit' className='submitbtn'>Login</Button>
                <div className='info'>
                    <p>New here?<Link to='/register'><span className='reglink'>Register</span></Link></p>
                </div>
            </Form>

        </div>
    )
}

export default Login
