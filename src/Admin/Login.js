
import React, { useState, useEffect } from 'react'
import { Button, Input, Form, Select, message} from 'antd'
import { useNavigate } from 'react-router-dom';
function Login({loginId,setloginId}) {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    // const [storedData,setUserData]= useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("person")) || [];
        setData(storedData)
    }, [])
    const validUsers = [
        { email: 'admin', pass: '123', role: 'Admin' }
    ];

    function saveData(formData) {
        const IsValid = validUsers.some(user =>
            user.email === formData.email &&
            user.pass === formData.pass &&
            user.role === formData.role
        );

        if (IsValid) {
            message.success("You are Logging as Admin")
            setloginId(true);
            navigate('/dashboard', { replace: true })
        }
        else {
            message.error("Invalid credentials ")
        }
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form style={{ textAlign: 'center', backgroundColor: 'gold', fontWeight: '700', color: 'darkblue', width: 'max-content' }} onFinish={saveData}>
                <h1 style={{ textAlign: 'center', marginTop: '0px', paddingTop: '10px' }}>Login Form</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: "2rem", padding: '0 2rem 0 2rem' }}>
                    <Form.Item label='Email' name='email' style={{ paddingLeft: '30px' }}>
                        <Input style={{ width: "90%" }} />
                    </Form.Item>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', columnGap: '8rem', padding: '0 2rem 0 2rem' }}>
                    <Form.Item label='Password' name='pass'>
                        <Input style={{ maxWidth: "150px" }} />
                    </Form.Item>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', columnGap: '8rem', padding: '0 2rem 0 2rem' }}>
                    <Form.Item label='Role: ' name='role' style={{ width: 'max-content' }}>
                        <Select
                            placeholder="Select Role.. "
                            options={[{ value: 'Admin', label: 'Admin' }, { value: 'Customer', label: 'Customer' }, { value: 'Seller', label: 'Seller' },]} />
                    </Form.Item>
                </div>

                <Button htmlType='submit' style={{ marginBottom: '30px', fontWeight: '800' }}>Login</Button>
            </Form>


        </div>
    )
}

export default Login
