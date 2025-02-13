import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye, FaLock, FaSpinner } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { updateEmployeePassword } from '../../service/service';
import { removePasswordForgot } from '../../service/localstroageService';
import { removeUpdateUserPassword } from '../../redux/updatePasswordSlice';
import { IoMdCloseCircleOutline } from 'react-icons/io';

export default function ChangePassword({ showCloseIconInChangePassword = false, handleShowChangePassword }) {

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);


    const dispatch = useDispatch();

    const [forgotEmpPassword, setForgotEmpPassword] = useState({
        Employeeid: user?.employeeId || '', // Default to user?.employeeId
        Password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isButtonClick, setIsButtonClick] = useState(false);


    const handelOnChangeUserData = (event) => {
        setForgotEmpPassword({ ...forgotEmpPassword, [event.target.name]: event.target.value })
    }
    const onSumitUserChangePassword = async (event) => {
        event.preventDefault();
        setIsButtonClick(true);

        if (forgotEmpPassword.Password === '') {
            toast.error('Please Enter Password');
            setIsButtonClick(false)
            return;
        }


        if (forgotEmpPassword.Password !== forgotEmpPassword.confirmPassword) {

            toast.error('Please verify your Password');
            setIsButtonClick(false);
            return;
        }

        await updateEmployeePassword(forgotEmpPassword).then((resp) => {

            if (showCloseIconInChangePassword === true) {
                if (resp.success === true) {
                    toast.success(resp.message);
                } else {
                    toast.error('Something wrong for Password change')
                }
                handleShowChangePassword(false)
            } else {
                if (resp.success === true) {
                    removePasswordForgot(() => {
                        toast.success(resp.message);

                        dispatch(removeUpdateUserPassword());
                    });

                } else {
                    toast.error('Something wrong for Password change')
                }
            }


            //console.log(resp);

        }).catch((err) => {
            toast.error('Something went wrong For Password Change');
        })
        //console.log(forgotEmpPassword);
        setIsButtonClick(false)
    }

    return (
        <div>

            <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                <div className="w-96 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3"

                >

                    {
                        showCloseIconInChangePassword === true ?
                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Change Your Password
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => handleShowChangePassword(false)}
                                />
                            </div>
                            :
                            <div className="text-center font-semibold rounded-t-md py-2"
                                style={{ color: activeTheme?.iconColor, background: activeTheme?.menuColor }}
                            >
                                Change Your Password
                            </div>
                    }

                    <form onSubmit={onSumitUserChangePassword} autoComplete='off'>



                        <div className="flex-1">
                            <input
                                type="text"
                                name='Employeeid'
                                value={forgotEmpPassword.Employeeid}
                                onChange={handelOnChangeUserData}
                                placeholder='User name'
                                readOnly
                                className="w-full h-full font-semibold border-none outline-none rounded-md text-sm hidden"
                            />
                        </div>



                        <div className='mt-4'>

                            <div className="flex items-stretch border-[1.5px] bg-white mx-10 h-9 rounded-md">
                                <div className="flex items-center px-2">
                                    <FaLock className='text-gray-500' />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type={showPassword === true ? 'text' : 'password'}
                                        name='Password'
                                        value={forgotEmpPassword.Password}
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

                        <div className='mt-4'>

                            <div className="flex items-stretch border-[1.5px] bg-white mx-10 h-9 rounded-md">
                                <div className="flex items-center px-2">
                                    <FaLock className='text-gray-500' />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type={showPassword === true ? 'text' : 'password'}
                                        name='confirmPassword'
                                        value={forgotEmpPassword.confirmPassword}
                                        onChange={handelOnChangeUserData}
                                        placeholder='Confirm Password'
                                        className="w-full h-full font-semibold border-none outline-none rounded-md text-sm"
                                    />
                                </div>
                                <div className="flex items-center px-2">
                                    <FaEye className='text-gray-500 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                                </div>
                            </div>
                        </div>


                        <div className="flex items-stretch  text-white mx-10 mt-4 h-10 rounded-md"
                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                        >
                            <button className="w-full h-full font-semibold border-none outline-none rounded-md text-sm flex justify-center items-center">
                                {
                                    isButtonClick ? <FaSpinner className='text-xl animate-spin' /> : 'Update Password'
                                }
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            
        </div>
    )
}
