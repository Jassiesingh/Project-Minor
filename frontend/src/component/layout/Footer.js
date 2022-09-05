import React from 'react'
import playStore from "../../images/playstore.png"
import appStore from "../../images/Appstore.png"

const Footer = () => {
    return (
        <>
            <div className="footer p-5 flex justify-evenly text-left bg-slate-300">
                <div className="w-[20%]">
                    <h4 className='font-bold text-2xl'>Download our App</h4>
                    <p className='my-2'>Download our app for Android and IOS devices</p>
                    <div className="images my-3">
                        <img className='h-10 cursor-pointer' src={playStore} alt="" />
                        <img className='h-10 my-3 cursor-pointer' src={appStore} alt="" />
                    </div>
                </div>

                <div className="2 space-y-2">
                    <h1 className='font-bold text-2xl'>Ecommmerce</h1>
                    <p>High quality is our priority</p>
                    <p><b>Copyright </b> 2022 &copy; Jassie Singh</p>
                </div>

                <div className="3">
                    <h4 className='font-bold text-2xl'>Follow us</h4>
                    <div className=' flex flex-col my-2 space-y-3'>
                        <a className='links' href="/">Instagram</a>
                        <a className='links' href="/">Facebook</a>
                        <a className='links' href="/">Twitter</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer