import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './LottieAnimation.css'

const LoggedInMessage = () => {
  return (
   <div className='lottie-container'>
       <DotLottieReact
      src="https://lottie.host/7a8b0efb-5df6-4140-a362-5c678d3d2d0e/yGlqsolrPC.lottie"
      loop
      className='lottie-animation'
      autoplay
    />
    </div>
  )
}

export default LoggedInMessage

