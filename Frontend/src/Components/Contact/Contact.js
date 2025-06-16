import { Button, Form, Input,TextArea } from 'antd';
import Banner from '../../Image/BannerGirl.png'
import './Contact.css'

function Contact() {
  function Submit() {
    alert("Your Message sent Successfully");
  }
  return (
    <div className='contactContainer'>
      <div class="form_Container">
        <Form layout='vertical'>
          <h2 class="title"> Contact form </h2>
          <Form.Item label="Firstname" name="first_name">        
            <Input type="text" placeholder="Firstname" required />  <br />
          </Form.Item>

          <Form.Item label="Lastname" name="last_name">           
            <Input type="text" placeholder="Lastname" required />  <br />
          </Form.Item>

          <Form.Item label="Email" name="email">      
            <Input type="email" placeholder="Email" required /> <br />
          </Form.Item>

          <Form.Item label="Contact Number" name="contact">        
            <Input type="text" placeholder="+91" required /> <br />
          </Form.Item>

          <Form.Item label="Message" name="message">         
            <Input type='textfield' placeholder="Write your message here" required /> <br />
          </Form.Item>

          <Form.Item>
            <Button class="submit" onClick={() => Submit()}>Submit</Button>
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



