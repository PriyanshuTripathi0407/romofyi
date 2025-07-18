import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import './LottieAnimation.css';

const PaymentSuccessful = ({ paymentSessionID }) => {
  const navigate = useNavigate();
  const payment = localStorage.getItem('payment')
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/cart', { replace: true });
    }, 300000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {   
    const handlepaymentStatus = async () => {
      try {
        const resp = await fetch('http://localhost:8000/api/payments/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
        });
        const data = await resp.json();
        console.log("This is payment status data from Stripe via backend", data);
        console.log("Response of payment status data from Stripe via backend", resp);
      } catch (error) {
        console.error("Error checking payment status", error);
      }
    };
    handlepaymentStatus();
  }, [payment]);



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

