
import React, { useState, useEffect } from 'react'
import { Button, Input, Form, Select, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { postData } from '../API/LoginAPI/LoginAPI';
import { useForm } from 'antd/es/form/Form';
import {useAuth} from '../AuthContext';

function Login({ loginId, setloginId }) {
    const {login} = useAuth();
    const navigate= useNavigate();

    const getRegistration = async (formData) => {
        console.log(formData, "This is my form Data");
        const response = await postData(formData)
        // setRegData(response.data)
        // console.log(response, "Data from backend in Login js")
        if (response.status === 200 && response.data.success) {
            login(response.data);
            message.success('Login successful!');
            setloginId(true)
            navigate('/')
        } else {
            message.error(response.data.error || 'Login failed');
        }

    }

    console.log(getRegistration, " This is data in Login page ")



    return (
        <div className='loginContainer' >
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
