import React, { useState } from 'react'
import { IoMdCloseCircleOutline, IoMdHappy } from 'react-icons/io';
import { MdOutlineFeedback, MdOutlineSentimentNeutral } from 'react-icons/md';
import { useSelector } from 'react-redux';
import FormHeader from '../../global/FormHeader';
import { RiEmotionUnhappyLine, RiEmotionHappyLine } from 'react-icons/ri';
import { BiSad } from 'react-icons/bi'
import CustomFormButton from '../../global/CustomFormButton';
import { FaSpinner } from 'react-icons/fa';

export default function FeedBackSave() {
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [showChartPopup, setShowChartPopup] = useState(false);


    // {/* 1st */ }
    // <BiSad className='text-8xl text-[]' />
    // {/* 2nd */ }
    // <RiEmotionUnhappyLine className='text-8xl text-[#ff965c]' />

    // {/* 3rd */ }
    // <MdOutlineSentimentNeutral className='text-8xl text-[#99ef2afe]' />

    // {/* 4th */ }
    // <RiEmotionHappyLine className='text-8xl text-[#25f06f] ' />

    // {/* 5th */ }
    // <IoMdHappy className='text-8xl text-[#139c43]' />

    const IconData = [
        { icon: <BiSad />, color: '#ff6838', title: 'Bad' },
        { icon: <RiEmotionUnhappyLine />, color: '#ff965c', title: 'Poor' },
        { icon: <MdOutlineSentimentNeutral />, color: '#99ef2afe', title: 'Average' },
        { icon: <RiEmotionHappyLine />, color: '#25f06f', title: 'Good' },
        { icon: <IoMdHappy />, color: '#139c43', title: 'Excellent' },
    ]
    const [isButtonClick, setIsButtonClick] = useState(0);

    const onsubmitFeedBackData = () => {
        setIsButtonClick(1);

        setIsButtonClick(0);
    }
    return (
        <>
            <div className='fixed bottom-20 right-3  p-2 rounded-full z-30 shadow-2xl cursor-pointer' title='Chart With Friends'
                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}

                onClick={() => setShowChartPopup(!showChartPopup)}
            >
                <MdOutlineFeedback className='text-2xl' />
            </div>


            {
                showChartPopup === true && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-96 z-50 shadow-2xl bg-white rounded-lg    animate-slideDown ">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md text-xs'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Feedback
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowChartPopup(!showChartPopup)}
                                />
                            </div>


                            <div className=''>

                                <FormHeader
                                    headerData='Software Feedback'
                                    activeTheme={activeTheme}
                                />

                                <div className='mt-[2px] mx-4'>

                                    {/* icon */}

                                    <div className='flex justify-between items-center '>

                                        <div className='font-semibold text-sm'>
                                            <span className='text-red-700'>Q.1)</span> Overall Software experience
                                        </div>

                                        {
                                            IconData?.reverse().map((data, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex  flex-col items-center justify-between text-[${data?.color}] text-4xl cursor-pointer `}>

                                                    <div className={`border-2 rounded-full border-[${data?.color}] text-white`}
                                                        style={{
                                                            background: data?.color
                                                        }}
                                                    >
                                                        {data?.icon}
                                                    </div>

                                                    <div className={`text-xs -mt-1 font-semibold mb-1`} >{data?.title}</div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <textarea
                                        rows={2}
                                        maxLength={1000}
                                        className='w-full border-2 outline-none mb-1 pl-1 rounded-md'
                                    />


                                </div>

                                <FormHeader
                                    headerData='Service Feedback'
                                    activeTheme={activeTheme}
                                />

                                <div className='mt-[2px] mx-4'>

                                    {/* icon */}

                                    <div className='flex justify-between items-center '>

                                        <div className='font-semibold text-sm'>
                                            <span className='text-red-700'>Q.2)</span> Overall support experience
                                        </div>

                                        {
                                            IconData?.map((data, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex  flex-col items-center justify-between text-[${data?.color}] text-4xl cursor-pointer `}>

                                                    <div className={`border-2 rounded-full border-[${data?.color}] text-white`}
                                                        style={{
                                                            background: data?.color
                                                        }}
                                                    >
                                                        {data?.icon}
                                                    </div>

                                                    <div className={`text-xs -mt-1 font-semibold mb-1`} >{data?.title}</div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <textarea
                                        rows={2}
                                        maxLength={1000}
                                        className='w-full border-2 outline-none mb-1 pl-1 rounded-md'
                                    />


                                </div>

                                <FormHeader
                                    headerData='Comment and Suggestions'
                                    activeTheme={activeTheme}
                                />

                                <div className='mt-[2px] mx-4'>

                                    {/* icon */}

                                    <div className='flex justify-between items-center '>

                                        <div className='font-semibold text-sm my-2'>
                                            <span className='text-red-700'>Q.3)</span> Any new feature or suggestion required
                                        </div>


                                    </div>

                                    <textarea
                                        rows={4}
                                        maxLength={2000}
                                        className='w-full border-2 outline-none mb-1 pl-1 rounded-md'
                                    />

                                </div>


                                <div className="w-32 mx-auto -mt-1  mb-1">

                                    <CustomFormButton
                                        activeTheme={activeTheme}
                                        text='Submit'
                                        icon={<FaSpinner />} // Renamed to Icon (to follow React component conventions)
                                        isButtonClick={isButtonClick}
                                        loadingButtonNumber={1}
                                        onClick={onsubmitFeedBackData}
                                    />
                                </div>
                            </div>


                            <div className='border-b-[1px]  flex justify-between items-center h-6 rounded-b-md text-xs'
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
