import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './LottieAnimation.css';

const PaymentSuccessful = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentDetails, setPaymentDetails] = useState(null);
  console.log(sessionId, "This is session id")

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/cart', { replace: true });
    }, 300000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    if (sessionId) {
      const timer = setTimeout(() => {
        fetch("http://localhost:8000/api/get-payment-details/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ session_id: sessionId })
        })
          .then(res => res.json())
          .then(data => {
            console.log("Payment Details:", data);
            setPaymentDetails(data);
          });
      }, 2000);  // 2-second delay

      return () => clearTimeout(timer);
    }
  }, [sessionId]);



  return (
    <>
      <div>
        {paymentDetails ? (
          <div>
            <p><strong>Name:</strong> {paymentDetails.customer_name}</p>
            <p><strong>Email:</strong> {paymentDetails.customer_email}</p>
            <p><strong>Amount Paid:</strong> ₹{paymentDetails.amount_paid}</p>
            <p><a href={paymentDetails.receipt_url} target="_blank" rel="noreferrer">View Receipt</a></p>
            <p>⏳ You’ll be redirected to dashboard in 300 seconds...</p>
          </div>
        ) : (
          <p>Fetching payment details...</p>
        )}
      </div>
      <div className='lottie-container'>
        <DotLottieReact
          src="https://lottie.host/7208aec2-5d84-4a70-82b3-cd74a1b3dd52/2nlIgjnFNA.lottie"
          loop={false}
          autoplay
          className='lottie-animation'
        />
      </div>

    </>
  );
};

export default PaymentSuccessful;

