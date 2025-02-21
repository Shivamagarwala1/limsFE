import React, { useState } from 'react'
import { IoMdCloseCircleOutline, IoMdHelpCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import hellpandsupport from '../../../assets/helpandsupport.png'


export default function HelpAndSupprot() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [showhelpAndSupportPopup, setShowhelpAndSupportPopup] = useState(false);

    return (
        <>
            <div className='fixed bottom-36 right-3  p-2 rounded-full z-30 shadow-2xl cursor-pointer' title='Help And Support'
                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}

                onClick={() => setShowhelpAndSupportPopup(!showhelpAndSupportPopup)}
            >
                <IoMdHelpCircle className='text-2xl' />
            </div>


            {
                showhelpAndSupportPopup === true && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-52 z-50 shadow-2xl bg-white rounded-lg    animate-slideDown ">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md text-xs'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Help And Support
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowhelpAndSupportPopup(!showhelpAndSupportPopup)}
                                />
                            </div>


                            <div>
                                <div className='bg-[#c1dbff] m-3 rounded px-3'>

                                    <div className='grid grid-cols-12 items-center'>
                                        <div className='col-span-5'>
                                            <img src={hellpandsupport} alt="" className='w-full h-full' />
                                        </div>
                                        <div className='col-span-7'>
                                            <div className='text-xl'>
                                                Help Center
                                            </div>
                                            <div>
                                                Your Feedback matters, We believe only Your Feedback will help us to move forward.
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className='bg-[#c1dbff] m-3 rounded px-3'>

                                    <div className='grid grid-cols-12 items-center'>

                                        <div className='col-span-5'>
                                            <div className='text-xl'>
                                                Get in touch with us
                                            </div>
                                            <div className='text-sm'>
                                                Drop us a line or give us a shout - we're always here to chart and lend a helping hand. React out and let's connect!
                                            </div>
                                        </div>

                                        <div className='col-span-7'>
                                            <img src={hellpandsupport} alt="" className='w-full h-full' />
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )
}
