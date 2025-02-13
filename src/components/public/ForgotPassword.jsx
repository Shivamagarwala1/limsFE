import React, { useState } from 'react'
import { FaUser, FaSpinner } from 'react-icons/fa'
import { forgotUserPassord } from '../../service/service';
import toast from 'react-hot-toast';
import ForgotPasswordLogin from './ForgotPasswordLogin';
export default function ForgotPassword() {

    const [isButtonClick, setIsButtonClick] = useState(false);
    const [Username, setUsername] = useState('');
    const [isOTPGotSuccessfully, setIsOTPGotSuccessfully] = useState(false);
    const [isError, setIsError] = useState(false);


    const handelOnChangeUserData = (event) => {
        setIsError(false)
        setUsername(event.target.value)
    }

    const onSubmitGetOtp = async (event) => {

        event.preventDefault();
        setIsButtonClick(true)

        if (Username === '') {
            setIsError(true);
            setIsButtonClick(false);
            return;
        }

        await forgotUserPassord(Username).then((resp) => {

            if (resp.success) {
                toast.success(resp.message);
                setIsOTPGotSuccessfully(resp.success);
            } else {
                toast.error(resp.message)
            }

        }).catch((err) => {
            console.log(err);

        })

        setIsButtonClick(false)
    }

    return (
        <>
            <div className='font-bold text-sm text-white mb-4 text-center'>Forgot Your Password</div>

            {
                !isOTPGotSuccessfully ?
                    <div>
                        <div className={`flex items-stretch ${isError === true ? 'border-red-400 border-2' : ' border-[1px]'} bg-white mx-10 h-10 rounded-md`}>
                            <div className="flex items-center px-2">
                                <FaUser className='text-gray-500' />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name='Username'
                                    value={Username}
                                    onChange={handelOnChangeUserData}
                                    autoComplete='off'
                                    placeholder='User name'
                                    className={`w-full h-full font-semibold border-none outline-none rounded-md text-sm`}
                                />
                            </div>

                        </div>

                        <div className="flex items-stretch border-[1px] bg-textColor border-textColor text-white mx-10 mt-2 h-10 rounded-md">
                            <button className="w-full h-full font-semibold border-none outline-none rounded-md text-sm flex justify-center items-center" onClick={onSubmitGetOtp}>
                                {
                                    isButtonClick ? <FaSpinner className='text-xl animate-spin' /> : 'Get Temporary Password'
                                }
                            </button>
                        </div>
                    </div>
                    :

                    <ForgotPasswordLogin />
            }
        </>
    )
}
