import React, { useState } from 'react'
import { Form, Input, InputNumber, Select, Button, message, Upload, Avatar } from "antd";
import { useForm } from 'antd/es/form/Form';
import './ProductUpload.css'
import { UploadOutlined } from "@ant-design/icons";
import { PostData } from '../../API/ProductAPI/ProductAPI'


const { Option } = Select;
const { TextArea } = Input;
const ProductUpload = () => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);



  const handleImageChange = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      setSelectedImageFile(file); // <- set the selected image file
      setPreviewImage(URL.createObjectURL(file)); // show preview
    }
  };

  const postData = async (formValues) => {
    console.log("This is my uploaded product without img", formValues)
    const formData = new FormData();

    // Append all form fields
    for (let key in formValues) {
      formData.append(key, formValues[key]);
    }

    // Append image file
    if (selectedImageFile) {
      formData.append('image', selectedImageFile);
    }

    try {
      const response = await PostData(formData);
      console.log("This is my Response in product Upload", response)
      message.success("Product Uploaded Successfully!!");
    } catch (error) {
      console.error(error);
      message.error("Registration Failed");
    }
  };


  return (
    <div className='productUploadContainer'>
      <h4>Upload Your New Products </h4>
      <Form form={form} layout="vertical" onFinish={postData} className='FormContainer'>
        <div className='show-col-wrap'>
          <Form.Item name="product_name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
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
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
                  <Avatar
                    src={previewImage || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                    size={100}
                  />
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </div>
              </Upload>
            </Form.Item>
          </div>
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


          <Form.Item name="product_price" label="New Price (&#8377;)" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} step={0.01} />
          </Form.Item>
          <Form.Item name="product_oldprice" label="Old Price (&#8377;)" rules={[{ required: true }]}>
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
            <TextArea rows={4} cols={80} placeholder="Enter product description" />
          </Form.Item>
        </div>

        <div className='show-inline '>
          <Form.Item>
            <Button type="primary" htmlType="submit">Upload Product</Button>
          </Form.Item>
        </div>
      </Form>
    </div >
  )
}

export default ProductUpload


