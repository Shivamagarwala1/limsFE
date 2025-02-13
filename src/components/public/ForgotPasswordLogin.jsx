import React, { useState } from 'react'
import { FaEye, FaLock, FaSpinner, FaUser } from 'react-icons/fa'
import toast from 'react-hot-toast';
import { employeeLogin } from '../../service/service';
import { useNavigate } from 'react-router-dom';
import { dologin, doPasswordForgot } from '../../service/localstroageService';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlices';
import { updateUserPassword } from '../../redux/updatePasswordSlice';



export default function ForgotPasswordLogin() {

    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isButtonClick, setButtonClick] = useState(false);

    const dispatch = useDispatch();

    const handelOnChangeUserData = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    }


    const navigation = useNavigate();
    const userLoginSubmit = async (event) => {

        event.preventDefault();

        setButtonClick(true);

        if (loginData.userName === '') {
            toast.error('Please Enter User name');
            setButtonClick(false)
            return;
        }
        if (loginData.password === '') {
            toast.error('Please Enter Password');
            setButtonClick(false)

            return;
        }

        await employeeLogin(loginData).then(async (resp) => {

            if (resp.success) {

                const combinedData = {
                    user: resp.data,
                    token: resp.token
                };

                dologin((combinedData), () => {

                    //set the data in the redux
                    dispatch(loginUser(combinedData));

                    //set need to change update password if #1
                    if (resp?.message?.slice(-2) === '#1') {
                        doPasswordForgot(true);
                        dispatch(updateUserPassword(true));
                    }



                    toast.success(resp?.message.slice(0, -2));

                })


                // Fetch the navigation URL based on employee data
                const menuData = await getMenuDataBasedOnEmpIdAndRoleIdAndCentreId(
                    resp?.data?.employeeId,
                    resp?.data?.defaultRole,
                    resp?.data?.defaultCenter
                );

                if (menuData?.data?.length > 0 && menuData.data[0]?.children?.length > 0) {
                    const navigationURL = menuData.data[0].children[0].navigationURL;
                    if (navigationURL) {
                        toast.success(resp?.message?.slice(0, -2));
                        navigation(navigationURL);
                    } else {
                        toast.error(resp?.message);
                    }
                } else {
                    toast.error('Invalid menu data structure!');
                }


            } else {
                toast.error(resp.message)
            }


        }).catch((err) => {
            toast.error("An error occurred. Please try again.")

        })
        setButtonClick(false);
    }

    return (
        <div>
            <form onSubmit={userLoginSubmit} autoComplete='off'>

                <div className="flex items-stretch border-[1px] bg-white mx-10 h-10 rounded-md">

                    <div className="flex items-center px-2">
                        <FaUser className='text-gray-500' />
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            name='userName'
                            value={loginData.userName}
                            onChange={handelOnChangeUserData}
                            placeholder='User name'
                            className="w-full h-full font-semibold border-none outline-none rounded-md text-sm"
                        />
                    </div>
                </div>



                <div className='mt-4'>

                    <div className="flex items-stretch border-[1px] bg-white mx-10 h-10 rounded-md">
                        <div className="flex items-center px-2">
                            <FaLock className='text-gray-500' />
                        </div>
                        <div className="flex-1">
                            <input
                                type={showPassword === true ? 'text' : 'password'}
                                name='password'
                                value={loginData.password}
                                onChange={handelOnChangeUserData}
                                placeholder='Password'
                                className="w-full h-full font-semibold border-none outline-none rounded-md text-sm"
                            />
                        </div>
                        <div className="flex items-center px-2">
                            <FaEye className='text-gray-500 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                        </div>
                    </div>
                </div>

                <div className="flex items-stretch border-[1px] bg-textColor border-textColor text-white mx-10 mt-2 h-10 rounded-md">
                    <button className="w-full h-full font-semibold border-none outline-none rounded-md text-sm flex justify-center items-center">
                        {
                            isButtonClick ? <FaSpinner className='text-xl animate-spin' /> : 'Get started'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}
