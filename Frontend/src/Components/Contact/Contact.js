import { Button, Form, Input, TextArea } from 'antd';
import Banner from '../../Image/BannerGirl.png'
import './Contact.css'
import { postData } from '../../API/ContactAPI/ContactAPI';

function Contact() {
  function Submit(formData) {
    console.log("This is form data in contact js", formData);
    PostData(formData); 
  }

  const PostData = async (formData) => {
    const res= await postData(formData)
    if (res){
      alert("Message sent Successfully ")
    }
    else{
      alert("Something went wrong ")
    }
  }
  return (
    <div className='contactContainer'>
      <div class="form_Container">
        <Form layout="vertical" onFinish={Submit}>
          <h2 className="title">Contact Form</h2>

          <Form.Item
            label="Firstname"
            name="first_name"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="last_name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contact"
            rules={[{ required: true, message: 'Please enter your contact number' }]}
          >
            <Input placeholder="+91" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input placeholder="Write your message here" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
      <div className='advertise'>
        <div className='company-details'>
          <h1>Romofyi</h1>
          <p><b> Romofyi</b> is a feature-rich, scalable, and <strong>user-friendly</strong> e-commerce web application designed as a bazaar-style online shopping platform, offering a wide variety of products across multiple categories — from <strong>electronics and fashion to groceries, home decor, beauty, accessories,</strong>and more.
            It aims to replicate the diverse experience of a physical marketplace in the digital world, catering to sellers and buyers with robust,<strong>interactive features</strong>  and a seamless user experience. It enables vendors to manage products, inventory, and orders efficiently. </p>
        </div>
        <div className='banner'>
          <img src={Banner} alt=''></img>
        </div>
      </div>
    </div>
  )
}

export default Contact



