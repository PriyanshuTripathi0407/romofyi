import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { getData, PostData, PutData } from '../../API/API'


const CustomerTable = () => {
  const [Regdata, setRegData] = useState([]);
    const col = [
        { title: 'S.No.', dataIndex: 'id' },
        { title: 'First Name', dataIndex: 'first_name' },
        { title: 'Last Name', dataIndex: 'last_name' },
        { title: 'Contact', dataIndex: 'contact' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Address', dataIndex: 'address' },
    ]
    const getRegistration = async () => {
        const response = await getData()
        setRegData(response.data)
        // console.log(Regdata, "Registered Data")
    }

    useEffect(()=>{
        getRegistration();
    },[])

    return (
        <div>
            <Table dataSource={Regdata} columns={col} />;
        </div>
    )
}

export default CustomerTable
