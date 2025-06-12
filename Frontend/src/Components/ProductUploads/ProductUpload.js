import React from 'react'
import { Form, Input, InputNumber, Select, Button, Upload } from "antd";
import { useForm } from 'antd/es/form/Form';
import './ProductUpload.css'
import { UploadOutlined } from "@ant-design/icons";



const { Option } = Select;
const { TextArea } = Input;
const ProductUpload = () => {
  const [form] = Form.useForm();
  function onFinish() {
    alert("clicke Submit")
  }

  return (
    <div>
      <Form form={form}  layout="horizontal" onFinish={onFinish} className='FormContainer'>
        <div className='left col-md-4'>
          <Form.Item
            name="product_image"
            label="Product Image"
            valuePropName="fileList"
            // getValueFromEvent={normFile}
            rules={[{ required: true }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </div>
        <div className='right col-md-8'>
          <div className='show-col-wrap'>
            <Form.Item name="product_name" label="Product Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="product_color" label="Color">
              <Input />
            </Form.Item>
            <Form.Item name="product_size" label="Size">
              <Select style={{ width: "200%" }}>
                <Option value="S">Small</Option>
                <Option value="M">Medium</Option>
                <Option value="L">Large</Option>
                <Option value="XL">Extra Large</Option>
              </Select>
            </Form.Item>
            <Form.Item name="product_tag" label="Tag">
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="product_category" label="Category">
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="product_weight" label="Weight (kg)">
              <InputNumber style={{ width: "100%" }} step={0.01} />
            </Form.Item>


            <Form.Item name="product_price" label="Price (&#8377;)" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} step={0.01} />
            </Form.Item>

            <Form.Item name="product_rating" label="Rating">
              <Select style={{ width: "200%" }}>
                {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rate) => (
                  <Option key={rate} value={rate}>{rate}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="product_description" label="Description" rules={[{ required: true }]}>
              <TextArea rows={4} cols={50} placeholder="Enter product description"  />
            </Form.Item>
          </div>

          <div className='show-inline'>
            <Form.Item>
              <Button type="primary" htmlType="submit">Upload Product</Button>
            </Form.Item>
          </div>
        </div>

      </Form>
    </div >
  )
}

export default ProductUpload
