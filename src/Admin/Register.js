import React, { useState } from 'react'
import { Button, Input, Form,Table,Modal } from 'antd'
import { getData, PostData,PutData } from '../API/API'
import { useForm } from 'antd/es/form/Form';



function Register() {
  const [Regdata, setRegData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [searchedData, setSearchedData] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [RegRecord, setRegRecord] = useState('');
  const [form] = useForm();

  const postData = async (formData) => {
    const response = await PostData(formData);
    if (formData) {
      alert("Registered Successfully!! ")
    }
    getRegistration();
  }

  const ShowModal = (record)=>{
    setModalOpen(!isModalOpen);    
    console.log(record,"Record Data in Modal")
    console.log(record.id,"Record id Data in Modal")
    console.log(RegRecord,"useState mein hai Record id in Modal")
    form.setFieldsValue(record)
  }

  const col= [
    {title:'ID', dataIndex:'id'},
    {title:'First Name', dataIndex:'first_name'},
    {title:'Last Name', dataIndex:'last_name'},
    {title:'Contact', dataIndex:'contact'},
    {title:'Email', dataIndex:'email'},
    {title:'Address', dataIndex:'address'},
    {title:'Password', dataIndex:'password'},
    {title:'Action', render:(_,record)=>(
      <Button onClick={()=>{ShowModal(record); setRegRecord(record.id);}}>Edit</Button>
    )}
  ]

  const DataSource= [
    {
      id:'1',
      fname:'Priyanshu',
      lname:'Tripathi',
      contact:'9876123450',
      email:'p@gmail.com',
      address:'Birgaon, Raipur, CG',
      password:'123'
    },
    {
      id:'2',
      fname:'Rahul',
      lname:'Tripathi',
      contact:'5432167890',
      email:'r@gmail.com',
      address:'Bhanpuri, Raipur, CG',
      password:'123'
    },
    {
      id:'3',
      fname:'Akshay',
      lname:'Tripathi',
      contact:'1234567890',
      email:'a@gmail.com',
      address:'Urkura, Raipur, CG',
      password:'123'
    }
  ]

  const getRegistration = async () => {
    const response = await getData()
    setRegData(response.data)
    console.log(Regdata, "Registered Data")
    setShowDetails(!showDetails)
  }

  const putData = async (values)=>{
    setRegRecord(values.id);
    const response = await PutData(RegRecord,values)
    alert("Data Updated Successfully!! ")
    setModalOpen(false);
    getRegistration();
    // form.resetFields();
  }

  function searchData(e){
    const data= e.target.value
    setSearchedData(data)
    console.log(data, "DATA")
  }
  // const test= Regdata.map(i=>(i.first_name))
  const searchedRegisterData= Regdata.filter(i=>(i.first_name.toLowerCase().includes(searchedData.toLowerCase())))
    console.log(searchedRegisterData," Mil gya searched Data")

    

  return (
    <>

      <div style={{ display: 'block', justifyContent: 'center', alignItems: 'center' }}>

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

            {/* <Form.Item label='Role: ' name='role' style={{ width: 'max-content' }}>
              <Select
                placeholder="Select Role.. "
                options={[{ value: 'Customer', label: 'Customer', },
                { value: 'Seller', label: 'Seller', },]} />
            </Form.Item> */}
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

        <Table dataSource={Regdata} columns={col} />;
        {isModalOpen
        ?
        <Modal open={isModalOpen} onCancel={()=>setModalOpen(false)} footer={null}>          
          <Form layout='vertical' onFinish={putData} form={form}>
            <Form.Item label='ID' name='id'>
              <Input/>
            </Form.Item>
            <Form.Item label='First Name' name='first_name'>
              <Input/>
            </Form.Item>
            <Form.Item label='Last Name' name='last_name'>
              <Input />
            </Form.Item>
            <Form.Item label='Contact' name='contact'>
              <Input />
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <Input/>
            </Form.Item>
            <Form.Item label='Address' name='address'>
              <Input/>
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input/>
            </Form.Item>
              <br/>
              <Button htmlType='submit'> Update</Button>            
          </Form>
        </Modal>          
         :<> </>}

        <div>          
          {showDetails 
          ?
            <div>
              <button onClick={getRegistration}>Hide all Registered Customer</button>
              <div style={{ height: '35px' }}>
                <input type='text' placeholder='Search here...' style={{ height: '27px' }} onChange={searchData} 
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}/>
              </div>
              <div>
                <table border='10px solid black' style={{ textAlign: 'center' }}>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Password</th>
                    <th>Confirm Password</th>
                  </tr>
                
                  {(isActive) ?
                  <>
                    {searchedRegisterData.map((i) => (
                      <tr>
                        <td>{i.id}</td>
                        <td>{i.first_name}</td>
                        <td>{i.last_name}</td>
                        <td>{i.contact}</td>
                        <td>{i.email}</td>
                        <td>{i.address}</td>
                        <td>{i.password}</td>
                        <td>{i.confirm_password}</td>
                      </tr>                         
                    ))}
                  </>
                  :
                  <>
                  {Regdata.map((i) => (
                    <tr>
                      <td>{i.id}</td>
                      <td>{i.first_name}</td>
                      <td>{i.last_name}</td>
                      <td>{i.contact}</td>
                      <td>{i.email}</td>
                      <td>{i.address}</td>
                      <td>{i.password}</td>
                      <td>{i.confirm_password}</td>
                    </tr>
                  ))}
                  </>
                  }
                </table>              
              </div>
            </div>
            :
            <div>
               <button onClick={getRegistration}>Show all Registered Customer</button>
            </div>
          }
        </div>

      </div>
    </>
  )
}

export default Register


