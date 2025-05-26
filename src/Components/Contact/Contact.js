import Banner from '../../Image/BannerGirl.png'
import './Contact.css'

function Contact() {
  function Submit() {
    alert("Your Message sent Successfully");
  }
  return (
    <div className='contactContainer'>
      <div class="formContainer">
        <form >
          <h2 class="title"> Contact form </h2>
          <label >Firstname:  </label> <br />
          <input type="text" placeholder="Firstname" required /> <br /> <br />

          <label >Lastname:  </label> <br />
          <input type="text" placeholder="Lastname" required /> <br /> <br />

          <label >Email: </label> <br />
          <input type="email" placeholder="Email" required /> <br /> <br />

          <label >Contact Number: </label> <br />
          <input type="text" placeholder="+91" required /> <br /> <br />

          <label >Message: </label> <br />
          <input type='textfield' placeholder="Write your message here" required /> <br /> <br />

          <button class="submit" onClick={() => Submit()}>Submit</button>

        </form>
      </div>
      <div className='advertise'>
        <div className='info'>
          <h1>Romofyi</h1>
          <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dolore similique officia corporis veniam modi rerum iste. Dolorum ut provident est rem qui quibusdam, neque unde, id iure laboriosam quo tempore asperiores ad libero sed voluptatum, nesciunt quae modi impedit. Est, aut iusto error amet assumenda inventore! Nam possimus pariatur quaerat sit, ea doloremque placeat magnam at adipisci sint aliquid, facilis sapiente dolorum? Neque placeat consequuntur harum quam adipisci debitis. Inventore reprehenderit error maxime. </p>
        </div>
        <div className='banner'>
          <img src={Banner} alt=''></img>
        </div>
      </div>
    </div>
  )
}

export default Contact



