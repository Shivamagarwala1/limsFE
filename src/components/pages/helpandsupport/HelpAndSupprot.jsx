import React, { useRef, useState } from 'react'
import { IoMdCloseCircleOutline, IoMdHelpCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import hellpandsupport from '../../../assets/helpandsupport.png'
import FromHeader from '../../global/FormHeader'
import { MdEmail, MdHome, } from 'react-icons/md';
import { FaSquarePhone } from 'react-icons/fa6';
import { FaWhatsappSquare } from 'react-icons/fa'
import GridDataDetails from '../../global/GridDataDetails'
import Draggable from 'react-draggable';

export default function HelpAndSupprot() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [showhelpAndSupportPopup, setShowhelpAndSupportPopup] = useState(false);
    const dragRef = useRef(null);

    return (
        <>
            <Draggable nodeRef={dragRef} >
                <div ref={dragRef} className='fixed bottom-36 right-3  p-2 rounded-full z-30 shadow-2xl cursor-pointer' title='Help And Support'
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}

                    onClick={() => setShowhelpAndSupportPopup(!showhelpAndSupportPopup)}
                >
                    <IoMdHelpCircle className='text-2xl' />
                </div>
            </Draggable>

            {
                showhelpAndSupportPopup === true && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-56 z-50 shadow-2xl bg-white rounded-lg    animate-slideDown ">

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

                            <FromHeader
                                headerData='Customer Support Timing'
                            />

                            <div>
                                <div className='bg-[#c1dbff]  rounded px-3'>

                                    <div className='grid grid-cols-12 items-center'>
                                        <div className='col-span-5'>
                                            <img src={hellpandsupport} alt="" className='w-full h-full' />
                                        </div>
                                        <div className='col-span-7'>
                                            <div className='text-base font-semibold'>
                                                Help Center
                                            </div>
                                            <div className='text-xxs font-semibold'>
                                                Your Feedback matters, We believe only Your Feedback will help us to move forward.


                                            </div>

                                            <div className='text-sm text-red-600 font-bold mt-2'>
                                                Customer Support Timing : 8AM to 8PM
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <GridDataDetails gridDataDetails='Support Contact Details' />


                                <div className='px-3 py-1'>

                                    <div className='grid grid-cols-12 '>

                                        <div className='col-span-5'>
                                            <div className='text-base font-semibold flex items-start'>
                                                Contact us
                                            </div>
                                            <div className='text-xs font-semibold '>
                                                Send us a message or give us a shout - we're always here to chat and help. Get in touch, and let's connect!
                                            </div>
                                        </div>


                                        <div className='col-span-7 gap-2 '>

                                            <div className=' grid grid-cols-2 gap-2 mb-2'>
                                                <div className='flex gap-2 font-semibold items-center text-xs border-[1.5px] border-red-400 h-10 rounded-md px-2 cursor-pointer'>
                                                    <div><MdEmail className='text-xl text-red-400' /></div>
                                                    <div>compaint@wellnessdiagnostic.in</div>
                                                </div>


                                                <div className='flex gap-2 font-semibold items-center text-xs border-[1.5px] border-blue-400  h-10 rounded-md px-2 cursor-pointer'>
                                                    <div className='flex gap-2'>
                                                        <FaSquarePhone className='text-xl text-blue-400' /> (&)
                                                        <FaWhatsappSquare className='text-xl text-green-400' />
                                                    </div>
                                                    <div>8826991992</div>
                                                </div>

                                            </div>

                                            <div className='flex gap-2 font-semibold items-center text-xs border-[1.5px] border-purple-400 h-10 rounded-md px-2 cursor-pointer col-span-12'>
                                                <div><MdHome className='text-xl text-purple-400' /></div>
                                                <div>Bagga Link Road Rithala Street No 18</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <GridDataDetails gridDataDetails='Account Details' />

                                <div className='px-3 py-1'>

                                    <div className='grid grid-cols-12 '>

                                        <div className='col-span-5'>
                                            <div className='text-base font-semibold flex items-start'>
                                                Account Details
                                            </div>
                                            <div className='text-xs font-semibold '>
                                                Please find the company account details side for easy reference. For any transaction or inquiries, feel free to reach out to us by customer care . We're here to assist you!
                                            </div>
                                        </div>


                                        <div className='col-span-7 gap-2 '>

                                            <div className=' grid grid-cols-2 gap-2 mb-2'>
                                                <div className='flex gap-2 font-semibold items-center text-xs border-[1.5px] border-red-400 h-10 rounded-md px-2 cursor-pointer'>
                                                    <div>Account Name :</div>
                                                    <div>xxx xxx xxx 2134</div>
                                                </div>


                                                <div className='flex gap-2 font-semibold items-center text-xs border-[1.5px] border-blue-400  h-10 rounded-md px-2 cursor-pointer'>
                                                    <div className=''>
                                                        Account Number :
                                                    </div>
                                                    <div>8826991992</div>
                                                </div>



                                                <div className='flex gap-2 font-semibold items-center text-xs border-[1.5px] border-purple-400 h-10 rounded-md px-2 cursor-pointer '>
                                                    <div>IFSC Code : </div>
                                                    <div>111111</div>
                                                </div>


                                                <div className='flex gap-2 font-semibold items-center text-xs border-[1.5px] border-indigo-400 h-10 rounded-md px-2 cursor-pointer '>
                                                    <div>Bank Name : </div>
                                                    <div>SBI</div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className='border-b-[1px] -mt-2  flex justify-between items-center h-6 rounded-b-md text-xs'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >

                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
