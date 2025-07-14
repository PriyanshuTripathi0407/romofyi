import React, { useState } from 'react'
import { Form, Input, Button, Upload, Modal, Select, message, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { getData, PostData, PutData } from '../API/API'
import { useForm } from 'antd/es/form/Form';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { PostRegistrationEmail } from '../API/SendEmail/SendEmailAPI'



function Register() {
  const [Regdata, setRegData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [searchedData, setSearchedData] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [RegRecord, setRegRecord] = useState('');
  const [form] = useForm();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

const postData = async (formValues) => {

  const requiredFields = ['first_name','confirm_password','role','contact','image', 'last_name', 'email', 'password'];

  // Check if any required field is missing
  for (let field of requiredFields) {
    if (!formValues[field]) {
      message.error(`${field.replace('_', ' ')} is required.`);  
      return; 
    }
  }

  const formData = new FormData();

  // Append all form fields
  for (let key in formValues) {
    formData.append(key, formValues[key]);
  }

  if (selectedImageFile) {
    formData.append('image', selectedImageFile);
  }

  try {
    console.log("Data sending for Registration: ", formData);
    console.log("Data sending from Form: ", formValues);
    const response = await PostData(formData);
    console.log("Registration response:", response.data);

    // Assuming the backend returns success status
    if (response?.status === 201 || response?.data?.success) {
      message.success("Registration successful!");
      navigate('/login', { replace: true });
      const data= {
        email: formValues.email,
        subject:"Successful Registration 🥳🎉✨",
        username: formValues.first_name + " " + formValues.last_name,
        password: formValues.password 
      }
      const res= await PostRegistrationEmail(data);
      console.log(res, "response from mail")
    } else {
      message.error("Something went wrong during registration.");
    }
  } catch (error) {
    console.error("This is Registration error:", error.response.data.error);
    message.error(error.response.data.error || "Registration failed");
  }
};



  const ShowModal = (record) => {
    setModalOpen(!isModalOpen);
    // console.log(record, "Record Data in Modal")
    // console.log(record.id, "Record id Data in Modal")
    // console.log(RegRecord, "useState mein hai Record id in Modal")
    form.setFieldsValue(record)
  }

  // const col = [
  //   { title: 'ID', dataIndex: 'id' },
  //   { title: 'First Name', dataIndex: 'first_name' },
  //   { title: 'Last Name', dataIndex: 'last_name' },
  //   { title: 'Contact', dataIndex: 'contact' },
  //   { title: 'Email', dataIndex: 'email' },
  //   { title: 'Address', dataIndex: 'address' },
  //   { title: 'Password', dataIndex: 'password' },
  //   {
  //     title: 'Action', render: (_, record) => (
  //       <Button onClick={() => { ShowModal(record); setRegRecord(record.id); }}>Edit</Button>
  //     )
  //   }
  // ]


  const getRegistration = async () => {
    const response = await getData()
    setRegData(response.data)
    // console.log(Regdata, "Registered Data")
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
  // console.log(searchedRegisterData, " Mil gya searched Data")


  const handleImageChange = (info) => {
  const file = info.file.originFileObj;
  if (file) {
    setSelectedImageFile(file); // <- set the selected image file
    setPreviewImage(URL.createObjectURL(file)); // show preview
  }
};


  return (
    <>
      <div className='registerContainer'>
        <Form className='formContainer' onFinish={postData} labelCol={{ span: 9 }} wrapperCol={{ span: 8 }}  >
          <h1>REGISTRATION FORM </h1>
          <div >
            <div >
              <Form.Item label="Profile Image" name="image"
                valuePropName="file"
                getValueFromEvent={e => {
                  if (Array.isArray(e)) return e;
                  return e?.file?.originFileObj;
                }}
              >
                <Upload
                  showUploadList={false} 
                  onChange={handleImageChange}
                  accept="image/*"
                >
                  <div style={{ display: 'flex', alignItems: 'center',flexDirection:'column', gap: '10px' }}>
                    <Avatar
                      src={previewImage || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                      size={100}
                    />
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <Form.Item label='First Name' name='first_name'>
              <Input />
            </Form.Item>
            <Form.Item label='Last Name' name='last_name'>
              <Input />
            </Form.Item>
            <Form.Item label='Email' name='email' >
              <Input />
            </Form.Item>
            <Form.Item label='Contact' name='contact' >
              <Input />
            </Form.Item>
            <Form.Item label='Password: ' name='password'>
              <Input type='password' />
            </Form.Item>
            <Form.Item label='Confirm Password: ' name='confirm_password'>
              <Input type='password' />
            </Form.Item>
            <Form.Item label='Role: ' name='role'>
              <Select
                placeholder="Select Role.. "
                options={[{ value: 'Customer', label: 'Customer', },
                { value: 'Admin', label: 'Admin', },
                { value: 'Vendor', label: 'Vendor', },]} />
            </Form.Item>

            <Form.Item label='Address' name='address' >
              <Input type='text' size='large' />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button htmlType='submit' >Register</Button>
          </div>
        </Form>
        {/* <Table dataSource={Regdata} columns={col} />; */}
        {isModalOpen
          ?
          <Modal open={isModalOpen} onCancel={() => setModalOpen(false)} footer={null}>
            <Form layout='vertical' onFinish={putData} form={form}>
              <Form.Item label='ID' name='id'>
                <Input />
              </Form.Item>
              <Form.Item label='First Name' name='first_name'>
                <Input />
              </Form.Item>
              <Form.Item label='Last Name' name='last_name'>
                <Input />
              </Form.Item>
              <Form.Item label='Contact' name='contact'>
                <Input />
              </Form.Item>
              <Form.Item label='Email' name='email'>
                <Input />
              </Form.Item>
              <Form.Item label='Address' name='address'>
                <Input />
              </Form.Item>
              <Form.Item label='Password' name='password'>
                <Input />
              </Form.Item>
              <br />
              <Button htmlType='submit'> Update</Button>
            </Form>
          </Modal>
          :
          <> </>
        }

        </div>
    </>
  )
}

export default Register


