import React, { useState } from 'react'
import { Button, Input, Form,Select, Table, Modal } from 'antd'
import { getData, PostData, PutData } from '../../API/API'
import { useForm } from 'antd/es/form/Form';

const Register = () => {
  const [Regdata, setRegData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [searchedData, setSearchedData] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [RegRecord, setRegRecord] = useState('');
  const [form] = useForm();

  const postData = async (formData) => {
    const response = await PostData(formData);
    // console.log(response, "+++++++");
    if (formData) {
      alert("Registered Successfully!! ")
    }
    getRegistration();
  }

  const ShowModal = (record) => {
    setModalOpen(!isModalOpen);
    console.log(record, "Record Data in Modal")
    console.log(record.id, "Record id Data in Modal")
    console.log(RegRecord, "useState mein hai Record id in Modal")
    form.setFieldsValue(record)
  }

  const col = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'First Name', dataIndex: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name' },
    { title: 'Contact', dataIndex: 'contact' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Address', dataIndex: 'address' },
    { title: 'Password', dataIndex: 'password' },
    {
      title: 'Action', render: (_, record) => (
        <Button onClick={() => { ShowModal(record); setRegRecord(record.id); }}>Edit</Button>
      )
    }
  ]
  const getRegistration = async () => {
    const response = await getData()
    setRegData(response.data)
    console.log(Regdata, "Registered Data")
    setShowDetails(!showDetails)
  }

  const putData = async (values) => {
    setRegRecord(values.id);
    const response = await PutData(RegRecord, values)
    alert("Data Updated Successfully!! ")
    setModalOpen(false);
    getRegistration();
    // form.resetFields();
  }

  function searchData(e) {
    const data = e.target.value
    setSearchedData(data)
    console.log(data, "DATA")
  }
  // const test= Regdata.map(i=>(i.first_name))
  const searchedRegisterData = Regdata.filter(i => (i.first_name.toLowerCase().includes(searchedData.toLowerCase())))
  console.log(searchedRegisterData, " Mil gya searched Data")




  return (
    <div>
      <Form style={{ textAlign: 'center', backgroundColor: 'gold', fontWeight: '700', color: 'darkblue', width: 'max-content' }} onFinish={postData}>
        <h1 style={{ textAlign: 'center', marginTop: '0px', paddingTop: '10px' }}>Register Form</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: "2rem", padding: '0 2rem 0 2rem' }}>
          <Form.Item label='First Name' name='first_name'>
            <Input style={{ maxWidth: "150px" }} />
          </Form.Item>
          <Form.Item label='Last Name' name='last_name'>
            <Input style={{ maxWidth: "150px" }} />
          </Form.Item>
        </div>
        <Form.Item label='Email' name='email' style={{ paddingLeft: '30px' }}>
          <Input style={{ width: "90%" }} />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', columnGap: '2rem', padding: '0 2rem 0 2rem' }}>
          <Form.Item label='Role: ' name='role' style={{ width: 'max-content' }}>
            <Select
              placeholder="Select Role.. "
              options={[{ value: 'Customer', label: 'Customer', },
              { value: 'Seller', label: 'Seller', },]} />
          </Form.Item>
          <Form.Item label='Password: ' name='password'>
            <Input type='password' style={{ maxWidth: "150px" }} />
          </Form.Item>
          <Form.Item label='Confirm Password: ' name='confirm_password'>
            <Input type='password' style={{ maxWidth: "150px" }} />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', columnGap: '2rem', padding: '0 2rem 0 2rem' }}>
          <Form.Item label='Contact' name='contact' >
            <Input style={{ maxWidth: "150px" }} />
          </Form.Item>
          <Form.Item label='Address' name='address' >
            <Input style={{ width: "90%" }} />
          </Form.Item>
        </div>
        <Button htmlType='submit' style={{ marginBottom: '30px', fontWeight: '800' }}>Register</Button>
      </Form>

    </div>
  )
}

export default Register
