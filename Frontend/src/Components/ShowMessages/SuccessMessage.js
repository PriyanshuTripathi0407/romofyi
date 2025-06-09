import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './LottieAnimation.css'

const SuccessAnimation = () => {

    return (
        <div className='lottie-container'>
            <DotLottieReact
                src="https://lottie.host/1d79eeb8-9c80-42b8-b616-30fdcc13ce6d/deQRPW4Pya.lottie"
                loop
                className='lottie-animation'
                autoplay 
            />

        </div >
    );
};

export default SuccessAnimation;

