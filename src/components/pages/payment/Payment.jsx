import React, { useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { SiRazorpay } from "react-icons/si";
import useRippleEffect from '../../customehook/useRippleEffect';

export default function Payment({ showAmt = true, lable, amount = 0 }) {

    const [ammountRecharge, setAmmountRecharge] = useState(0);

    useRippleEffect();

    return (
        <>
            <div className='flex justify-center items-center font-semibold text-xs h-9 bg-gray-300/15 text-green-500'>
                <div>
                    {lable}
                </div>
                <div>
                    <FaRupeeSign className='text-xxs flex items-center' />
                </div>
                <div>
                    {amount}
                </div>
            </div>

            <div className="m-4">

                {/* amount input field */}
                <div>
                    <label className="block text-gray-600 text-xs mb-2 font-semibold">Enter Recharge Amount</label>
                    <div className="relative flex  items-center">
                        {/* <span className="absolute left-3 top-2 text-gray-500 ">₹</span> */}
                        <div className='absolute left-3  text-gray-500'>
                            <FaRupeeSign className='text-xxs flex items-center' />
                        </div>
                        <div className="pl-7 pr-3 py-2 border-[1.5px] text-xs rounded-lg font-semibold focus:outline-none w-48">
                            {ammountRecharge}
                        </div>
                    </div>
                </div>

                {/* ammount  */}
                {
                    showAmt && (
                        <div className='flex justify-between items-center gap-4 my-2'>
                            {
                                [500, 1000, 1500, 2500, 5000].map((data, index) => (
                                    <div className={`border-[1.5px] rounded-md w-20 h-8 flex justify-center items-center font-semibold cursor-pointer text-xxs ${ammountRecharge === data ? 'border-indigo-900' : ''}`} key={index}
                                        onClick={() => setAmmountRecharge(data)}
                                    >
                                        {data}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }


                {/* payment icon */}
                <div className={`${!showAmt ? 'my-2' : ''}`}>
                    <div className='text-gray-600 text-xs mb-2 font-semibold'>
                        Select payment method
                    </div>

                    <div className='border-[1.5px] w-20 h-8 rounded-md flex justify-center items-center border-indigo-900 text-indigo-900'>
                        <SiRazorpay className='text-base' />
                    </div>
                </div>

                <div className='font-semibold text-xs text-gray-500 my-4'>
                    <p>
                        * Allows payment via UPI, Credit/Debit cards and Net-banking
                    </p>

                    <p>
                        ** Payment done will reflect in your ledger within 15 minutes
                    </p>
                </div>
            </div>

            <div className='m-4'>
                <div className='w-full'>
                    <button type="button"
                        data-ripple-light="true" className='
                    relative overflow-hidden border-[1.5px] w-full h-8 rounded-md bg-indigo-900 border-indigo-900 text-white'>
                        Continue
                    </button>
                </div>
            </div >
        </>
    )
}
