import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import './LottieAnimation.css';

const PaymentSuccessful = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/cart',{ replace: true }); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className='lottie-container'>
      <DotLottieReact
        src="https://lottie.host/7208aec2-5d84-4a70-82b3-cd74a1b3dd52/2nlIgjnFNA.lottie"
        loop={false}
        autoplay
        className='lottie-animation'
      />
    </div>
  );
};

export default PaymentSuccessful;

