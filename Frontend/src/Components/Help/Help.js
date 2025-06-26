import React from 'react'
import './Help.css'
import Money from '../../Image/icon_moneyback.png'
import Gift from '../../Image/icon_giftpack.png'
import ship from '../../Image/icon_deliverycar.png'

function Help() {
    const data = [
        { title: "INFORMATION ", info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable" },

        { title: " MY ACCOUNT  ", info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable" },

        { title: "ABOUT ", info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable" },

        { title: "CONTACTS ", info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable" }
    ]
    const image = [
        { image: Gift, about: "Special Gift" },
        { image: Money, about: "Money Back" },
        { image: ship, about: "Free Shipping" }
    ]

    return (
        <div className='help'>
            <div style={{ display: 'flex' }}>
                {image.map(i => (
                    <div className='help_img' key={i.image}>
                        <img src={i.image} alt='' />
                    </div>
                ))}
            </div>
            <div className='help_div'>
                {data.map(i => (
                    <div key={i.title} className='container'>
                        <h1> {i.title}  </h1>
                        <p> {i.info} </p>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Help
