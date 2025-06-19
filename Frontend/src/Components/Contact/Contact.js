import { Button, Form, Input } from 'antd';
import Banner from '../../Image/BannerGirl.png'
import './Contact.css'
import { PostData } from '../../API/ContactAPI/ContactAPI';

function Contact() {
  function Submit() {
    alert("Your Message sent Successfully");
  }

  const handleSubmitMessage = async (values) => {
    // const res = await PostData(data);
    console.log(values, "This is response from contact page ")
    // console.log(res, "This is response from contact page ")
  }

  return (
    <div className='contactContainer'>
      <div class="form_Container">
        <Form layout='vertical' onFinish={handleSubmitMessage}>
          <h2 class="title"> Contact form </h2>
          <Form.Item label="Firstname" name="first_name">
            <Input placeholder="Firstname" />  <br />
          </Form.Item>

          <Form.Item label="Lastname" name="last_name">
            <Input placeholder="Lastname" />  <br />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="Email" /> <br />
          </Form.Item>

          <Form.Item label="Contact Number" name="contact">
            <Input placeholder="+91" /> <br />
          </Form.Item>

          <Form.Item label="Message" name="message">
            <Input.TextArea showCount maxLength={1000}  placeholder="Write your message here" /> <br />
          </Form.Item>

          <Form.Item>
            <Button class="submit" >Submit</Button>
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



