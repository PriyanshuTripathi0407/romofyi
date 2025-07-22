import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { postData } from '../API/LoginAPI/LoginAPI';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
import { useSnackbar } from 'notistack';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LoggedInMessage from '../Components/ShowMessages/LoggedInMessage';

function Login() {
  const { login } = useAuth(); // ✅ use context login
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showAnimation, setShowAnimation] = useState(false);
  const [loginResult, setLoginResult] = useState(null);
  const [userRole, setUserRole] = useState('');

  const handleLogin = async (formData) => {
    console.log("Login Form Data:", formData);
    setShowAnimation(true);

    try {
      const response = await postData(formData);
      console.log("Login Response:", response.data);

      if (response.status === 200 && response.data.success) {
        // ✅ Store tokens & user info using context
        login(response.data);
        setUserRole(response.data.user?.role || '');
        setLoginResult('success');
      } else {
        setLoginResult('fail');
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoginResult('fail');
    }
  };

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        if (loginResult === 'success') {
          enqueueSnackbar("Logged In Successfully", { variant: 'success' });

          // ✅ Redirect based on role
          if (userRole.toLowerCase() === 'customer') {
            navigate('/user-dashboard', { replace: true });
          } else if (userRole.toLowerCase() === 'vendor') {
            navigate('/vendor-dashboard', { replace: true });
          } else {
            navigate('/', { replace: true }); // fallback
          }
        } else if (loginResult === 'fail') {
          enqueueSnackbar("Invalid Credentials !!", {
            variant: 'error',
            persist: false,
            action: (key) => (
              <p
                onClick={() => closeSnackbar(key)}
                style={{ paddingTop: '12px', cursor: 'pointer' }}
              >
                <HighlightOffOutlinedIcon />
              </p>
            ),
          });
          setShowAnimation(false);
          setLoginResult(null);
        }
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showAnimation, loginResult, userRole]);

  if (showAnimation) {
    return <LoggedInMessage />;
  }

  return (
    <div className='loginContainer'>
      <ToastContainer />
      <Form
        className='formContainer'
        layout='horizontal'
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 8 }}
        onFinish={handleLogin}
      >
        <h1>LOGIN FORM</h1><br />
        <div className='item'>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='item'>
          <Form.Item
            label='Password'
            name='pass'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className='item'>
          <Form.Item
            label='Role:'
            name='role'
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select
              placeholder='Select Role...'
              options={[
                { value: 'Customer', label: 'Customer' },
                { value: 'Vendor', label: 'Vendor' },
                { value: 'Admin', label: 'Admin' },
              ]}
            />
          </Form.Item>
        </div>

        <Button htmlType='submit' className='submitbtn'>Login</Button>

        <div className='info'>
          <p>New here? <Link to='/register'><span className='reglink'>Register</span></Link></p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
