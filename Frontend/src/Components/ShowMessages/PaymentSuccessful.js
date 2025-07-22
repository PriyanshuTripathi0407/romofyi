import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import './LottieAnimation.css';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccessful = ({ paymentSessionID }) => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  console.log("This is session ID ", sessionId)
  useEffect(() => {
    if (sessionId) {
      // First API call: Payment API
      fetch('http://localhost:8000/api/payments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripe_session_id: sessionId }),
      })
        .then(res => res.json())
        .then(data => {
          console.log("Payment recorded", data);

          // Now that the payment is recorded, call the second API (order with session)
          fetch('http://localhost:8000/api/order-with-session/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stripe_session_id: sessionId }),
          })
            .then(res => res.json())
            .then(orderData => {
              console.log("Order updated with session", orderData);
            })
            .catch(err => console.error("Failed to update order with session", err));
        })
        .catch(err => {
          console.error("Failed to record payment", err);
        });
    }
  }, [sessionId]);

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/cart', { replace: true });
    }, 300000);

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

