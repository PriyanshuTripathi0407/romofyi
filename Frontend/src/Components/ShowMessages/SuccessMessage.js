import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const SuccessAnimation = () => {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(true);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '18px' }}>
                Show Success 🎉
            </button>
            {show && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 999
                }}>
                    <DotLottieReact
                        src="https://lottie.host/1d79eeb8-9c80-42b8-b616-30fdcc13ce6d/deQRPW4Pya.lottie"
                        loop
                        style={{
                            width: '300px',
                            height: '300px',
                            color:'orange',
                            filter: 'hue-rotate(120deg)' // shifts colors, but not very precise
                        }}
                        autoplay
                    />
                </div>
            )}


        </div>
    );
};

export default SuccessAnimation;

