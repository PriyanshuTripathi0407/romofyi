import react from 'react'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';;

const ShowLoginErrorMessage = () => {
  toast.info(
    <div>
        Please <strong>Login</strong> to continue !!
      <br />
      <Link to="/login" style={{ color: 'gold',fontWeight:'600', textDecoration: 'underline' }}>
        Go to Login
      </Link>
    </div>,{
      style: {
      background: '#183661',
      color: 'gold',
    },
    }
  );
};


export default ShowLoginErrorMessage;