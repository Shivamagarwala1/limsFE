import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import clientLogo from '../../assets/client.png'
import { FaEye, FaEyeSlash, FaLock, FaSpinner, FaUser } from 'react-icons/fa'
import whatsapp from '../../assets/whatsapp.png';
import linkedin from '../../assets/linkedin.png'
import facebook from '../../assets/facebook.png';
import toast from 'react-hot-toast';
import { employeeLogin, getMenuDataBasedOnEmpIdAndRoleIdAndCentreId } from '../../service/service';
import { useNavigate } from 'react-router-dom';
import { dologin, doPasswordForgot } from '../../service/localstroageService';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlices';
import loginImage from "../../assets/loginimage.png";
import ForgotPassword from './ForgotPassword';
import { updateUserPassword } from '../../redux/updatePasswordSlice';
import Footer from './Footer'
import Notification from '../pages/Notification';
export default function Login() {

    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isButtonClick, setButtonClick] = useState(false);
    const [forgotPassord, setForgotPassword] = useState(false);
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);
    const dispatch = useDispatch();

    const handelOnChangeUserData = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    }


    const navigation = useNavigate();
    const userLoginSubmit = async (event) => {
        event.preventDefault();

        setButtonClick(true);

        // Validate inputs
        if (loginData.userName === '') {
            toast.error('Please Enter User name');
            setButtonClick(false);
            return;
        }
        if (loginData.password === '') {
            toast.error('Please Enter Password');
            setButtonClick(false);
            return;
        }

        // Perform login
        await employeeLogin(loginData)
            .then(async (resp) => {
                if (resp?.success) {
                    const combinedData = {
                        user: resp.data,
                        token: resp.token,
                    };

                    // Perform login action in Redux
                    dologin(combinedData, () => {
                        dispatch(loginUser(combinedData));

                        // Check for password change flag
                        if (resp?.message?.slice(-2) === '#1') {
                            doPasswordForgot(true);
                            dispatch(updateUserPassword({ isPasswordForgot: true }));
                        }
                    });

                    // Fetch the navigation URL based on employee data
                    const menuData = await getMenuDataBasedOnEmpIdAndRoleIdAndCentreId(
                        resp?.data?.employeeId,
                        resp?.data?.defaultRole,
                        resp?.data?.defaultCenter
                    );

                    if (menuData?.data?.length > 0 && menuData.data[0]?.children?.length > 0) {
                        const navigationURL = menuData?.data[0]?.children[0]?.navigationURL;
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
                    toast.error(resp.message);
                }
            })
            .catch((err) => {
                //toast.error('An error occurred. Please try again.');
                console.log(err?.message);
                toast.error(err?.message);
            });

        setButtonClick(false);
    };


    //icon data
    const iconData = [
        { name: whatsapp, link: "" },
        { name: linkedin, link: "" },
        { name: facebook, link: "" },
    ];


    return (


        <div
            className="bg-cover bg-center w-full h-screen sm:h-full md:h-screen overflow-hidden"
            style={{ backgroundImage: `url(${loginImage})` }}
        >

            <div className='absolute inset-0 bg-transparent '></div>


            <div className='flex flex-col lg:flex-row justify-center items-center lg:items-stretch lg:justify-between  mx-20 lg:pt-20 '>

                <div className='py-1 lg:py-0'>
                    <img src={logo} alt="path not found" className='w-32 h-10' />
                </div>

                <div className=" border-2 w-80 sm:w-96 h-auto shadow-xl rounded-lg bg-white/30 z-40">

                    <div className='flex flex-col justify-center items-center mt-6'>
                        <img src={clientLogo} alt="path not found" className='w-10 h-10 sm:w-16 sm:h-16 ' />
                    </div>


                    {/* form design */}
                    {
                        forgotPassord === false ?
                            <div>

                                <div className='flex flex-col justify-center items-center my-6'>

                                    <div className='font-bold text-sm text-center sm:text-nowrap text-black'>Sign in to manage and track your lab information</div>
                                    <p className='text-xs font-semibold text-black'>Laboratory Information Management System</p>
                                </div>

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
                                                {
                                                    showPassword === false ?
                                                        <FaEye className='text-gray-500 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />

                                                        :
                                                        <FaEyeSlash className='text-gray-500 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                                                }



                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-end mx-10 mt-2 text-sm font-semibold cursor-pointer' onClick={() => setForgotPassword(true)}>Forgot password</div>

                                    <div className="flex items-stretch border-[1px] bg-textColor border-textColor text-white mx-10 mt-2 h-10 rounded-md">
                                        <button className="w-full h-full font-semibold border-none outline-none rounded-md text-sm flex justify-center items-center">
                                            {
                                                isButtonClick ? <FaSpinner className='text-xl animate-spin' /> : 'Get started'
                                            }
                                        </button>
                                    </div>
                                </form>


                            </div>
                            :
                            <ForgotPassword />
                    }


                    <div className="my-3 mx-7 flex justify-center items-center text-xs font-bold text-black">
                        <div className="flex-1 border-t border-textColor mx-2"></div>
                        <div >Let's Connect iMARSAR Info Tech.</div>
                        <div className="flex-1 border-t border-textColor mx-2"></div>
                    </div>

                    <div className='my-3 flex justify-between items-center mx-10'>
                        {
                            iconData.map((data, index) => {
                                return (
                                    <img src={data.name} key={index} alt="path not found" className='w-7 h-7 cursor-pointer'
                                        onClick={() => setShowNotificationPopup(true)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {
                showNotificationPopup === true && (
                    <Notification setShowNotificationPopup={setShowNotificationPopup} />
                )
            }

            <Footer />
        </div>

    )
}
