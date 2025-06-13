import React from 'react'
import { Button, Input, Form, Modal, Select } from 'antd'

const VendorModal = ({ isModalOpen, setModalOpen }) => {

    const [showDetails, setShowDetails] = useState(false);
    setModalOpen(true);
    const [form] = useForm();

    return (
        <div>
            <Modal open={isModalOpen} onCancel={() => setModalOpen(!isModalOpen)} footer={null}>
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
                    <Form.Item label='Role: ' name='role'>
                        <Select
                            placeholder="Select Role.. "
                            options={[{ value: 'cus', label: 'Customer', },
                            { value: 'ven', label: 'Vendor', },]} />
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
        </div>
    )
}

export default VendorModal
