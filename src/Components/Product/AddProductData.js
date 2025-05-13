// import React, { useEffect, useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const { TextArea } = Input;
// const { Option } = Select;

// const sizeOptions = ['S', 'M', 'L', 'XL'];
// const ratingOptions = Array.from({ length: 11 }, (_, i) => i * 0.5);

// const normFile = (e) => {
//   if (Array.isArray(e)) return e;
//   return e?.fileList;
// };

// import { getData, PostData, PutData, DeleteData } from '../../API/ProductAPI/ProductAPI.js'
// import {
//   Form,
//   Input,
//   Select,
//   InputNumber,
//   Upload,
//   Button,
//   message,
// } from 'antd';

// const AddProductData = () => {
//   const [form] = Form.useForm();
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);

//   const handlepostData = async (data) => {
//     const msg = await PostData(data)
//     console.log(msg, "This is Post Message")
//   }

//   useEffect(() => {
//     axios.get('/api/categories/').then((res) => setCategories(res.data));
//     axios.get('/api/tags/').then((res) => setTags(res.data));
//   }, []);


//   return (
//     <div>

//       <Form form={form} layout="vertical" onFinish={handlepostData}>
//         <Form.Item
//           name="product_name"
//           label="Product Name"
//           rules={[{ required: true, message: 'Please enter product name' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item name="product_id" label="Product ID">
//           <Input disabled />
//         </Form.Item>

//         <Form.Item
//           name="product_image"
//           label="Product Image"
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
//             <div>
//               <PlusOutlined />
//               <div>Upload</div>
//             </div>
//           </Upload>
//         </Form.Item>

//         <Form.Item name="product_category" label="Product Category">
//           <Select allowClear placeholder="Select a category">
//             {categories.map((cat) => (
//               <Option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="product_color" label="Product Color">
//           <Input />
//         </Form.Item>

//         <Form.Item name="product_weight" label="Product Weight (kg)">
//           <InputNumber min={0} style={{ width: '100%' }} />
//         </Form.Item>

//         <Form.Item name="product_size" label="Product Size">
//           <Select allowClear placeholder="Select a size">
//             {sizeOptions.map((size) => (
//               <Option key={size} value={size}>
//                 {size}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="product_tag" label="Product Tags">
//           <Select
//             mode="multiple"
//             placeholder="Select tags"
//             allowClear
//             showSearch
//           >
//             {tags.map((tag) => (
//               <Option key={tag.id} value={tag.id}>
//                 {tag.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="product_description" label="Product Description">
//           <TextArea rows={4} />
//         </Form.Item>

//         <Form.Item name="product_price" label="Product Price">
//           <InputNumber
//             min={0}
//             step={0.01}
//             precision={2}
//             style={{ width: '100%' }}
//           />
//         </Form.Item>

//         <Form.Item name="product_rating" label="Product Rating">
//           <Select>
//             {ratingOptions.map((rate) => (
//               <Option key={rate} value={rate}>
//                 {rate}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit Product
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   )
// }

// export default AddProductData

import React from 'react'

const AddProductData = () => {
  return (
    <div>
      
    </div>
  )
}

export default AddProductData



