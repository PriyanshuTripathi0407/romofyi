
import React, { useState, useEffect } from 'react'
import { Button, Input, Form, Select, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { postData } from '../API/LoginAPI/LoginAPI';
import { useForm } from 'antd/es/form/Form';

function Login({loginId,setloginId}) {
  const [Regdata, setRegData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [searchedData, setSearchedData] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [RegRecord, setRegRecord] = useState('');
  const [form] = useForm();

  const getRegistration = async (formData) => {
    console.log(formData,"This is my form Data");

    const response = await postData(formData)
    // setRegData(response.data)
    console.log(response, "Data from backend in Login js")
    
  }

  console.log(getRegistration, " This is data in Login page ")

    const [data, setData] = useState([]);
    const navigate = useNavigate()
    // const [storedData,setUserData]= useState([]);

    // useEffect(() => {
    //     const storedData = JSON.parse(localStorage.getItem("person")) || [];
    //     setData(storedData)
    // }, [])

    // const validUsers = [
    //     { email: 'admin', pass: '123', role: 'Admin' }
    // ];

    // function submitData(formData) {
    //     const IsValid = Regdata.some(user =>
    //         user.email === formData.email &&
    //         user.pass === formData.pass &&
    //         user.role === formData.role
    //     );

    //     if (IsValid) {
    //         message.success("You are Logging as Admin")
    //         setloginId(true);
    //         navigate('/dashboard', { replace: true })
    //     }
    //     else {
    //         message.error("Invalid credentials ")
    //     }
    // }


    return (
        <div className='loginContainer' >
            <Form className='formContainer' onFinish={getRegistration}>
                <h1>LOGIN FORM</h1><br/>
                <div className='item'>
                    <Form.Item label='Email' name='email'  rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input  />
                    </Form.Item>
                </div>
                <div className='item'>
                    <Form.Item label='Password' name='pass'  rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input />
                    </Form.Item>
                </div>
                <div className='item'>
                    <Form.Item label='Role: ' name='role'  rules={[{ required: true, message: 'Please select role !!' }]}>
                        <Select
                            placeholder="Select Role.. "
                            options={[{ value: 'admin', label: 'Admin' }, { value: 'cus', label: 'Customer' }, { value: 'ven', label: 'Vendor' },]} />
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
