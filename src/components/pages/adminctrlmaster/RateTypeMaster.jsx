import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { IoMdMenu } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { FaArrowDown, FaArrowUp, FaRegEdit, FaSpinner } from 'react-icons/fa';
import { rateTypeMasterHeader } from '../../listData/listData';
import { getAllCentreApi, getAllRateTypeMasterApi, saveRateTypeMaster, updateStatusForRateTypeMasterData } from '../../../service/service';
import toast from 'react-hot-toast';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { ImSwitch } from 'react-icons/im';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useRippleEffect from '../../customehook/useRippleEffect';

export default function RateTypeMaster() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);
    useRippleEffect();

    const [rateTypeMasterData, setRateTypeMasterData] = useState({
        rateTypeId: 0,
        rateTypeName: '',
        CentreId: [],
        userId: 0
    })

    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [allCentreData, setAllCentreData] = useState([]);
    const [isHovered, setIsHovered] = useState(null);
    const [allRateTypeMaster, setAllRateTypeMaster] = useState([]);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [clickedRowId, setClickedRowId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isEditData, setIsEditData] = useState(false);

    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }

    useEffect(() => {
        const getAllCentreData = async () => {

            try {
                const response = await getAllCentreApi();
                setAllCentreData(response);
            } catch (error) {
                toast.error(error?.message);
            }

        }
        getAllCentreData()
    }, [])

    const handelOnChangeForRateTypeMaster = (event) => {
        setRateTypeMasterData({ ...rateTypeMasterData, [event.target.name]: event.target.value })
    }

    const handleCheckboxChange = (e, data) => {

        const isChecked = e.target.checked;

        setRateTypeMasterData((prevData) => {
            const updatedAccess = [...prevData.CentreId];

            if (isChecked) {
                // Add the department data
                // updatedAccess.push({
                //     centreId: data
                // });

                updatedAccess.push(data);
            } else {
                // Remove the department data
                const index = updatedAccess.findIndex(
                    (item) => item.centreId === data.centreId
                );
                if (index !== -1) {
                    updatedAccess.splice(index, 1);
                }
            }

            return {
                ...prevData,
                CentreId: updatedAccess,
            };
        });
    }


    const onSubmitRateTypeMaster = async () => {

        setIsButtonClick(1);

        const updateData = {
            ...rateTypeMasterData,
            userId: parseInt(user?.employeeId),
            CentreId: rateTypeMasterData.CentreId?.map(item => item).join(",")
        }

        try {
            const response = await saveRateTypeMaster(updateData?.rateTypeId, updateData?.rateTypeName, updateData?.CentreId, updateData?.userId);

            if (response?.success) {
                toast.success(response?.message);
                setRateTypeMasterData({
                    rateTypeId: 0,
                    rateTypeName: '',
                    CentreId: [],
                    userId: 0
                });
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);

        }

        setIsButtonClick(0);
        setIsEditData(false);
    }

    useEffect(() => {

        const getAllDataRateType = async () => {
            try {
                const response = await getAllRateTypeMasterApi();
                if (response?.success) {
                    setAllRateTypeMaster(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllDataRateType();

    }, [isButtonClick])


    //handel update
    const getSingleRateTypeDataForUpDate = async (data) => {

        const listData = Array.isArray(data?.centreId)
            ? data.centreId // If it's already an array, use it as is.
            : data?.centreId?.trim()
                ? data.centreId.split(",").map(Number)
                : []; // If empty or undefined, assign an empty array.


        const updateData = {
            rateTypeId: data?.id,
            rateTypeName: data?.rateName,
            CentreId: listData.length === 0 ? '' : listData, // Always an array
        };

        setRateTypeMasterData(updateData);
    };


    //handel status
    const handleTheUpdateStatusMenu = async () => {

        setIsButtonClick(3);
        try {
            const newValue = clickedRowId?.isActive === 1 ? 0 : 1;

            const response = await updateStatusForRateTypeMasterData(clickedRowId?.id, newValue, user?.employeeId);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error(error?.message);

        }
        setIsButtonClick(0);
        setShowPopup(false)
        setClickedRowId(null);
    }

    return (
        <>
            <div>
                {/* Header Section */}
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                    </div>
                    <div>Rate Type Master</div>
                </div>

                {/* form data */}
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">


                        {/* Rate Type */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="rateTypeName"
                                name="rateTypeName"
                                value={rateTypeMasterData?.rateTypeName || ''}
                                onChange={handelOnChangeForRateTypeMaster}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="rateTypeName" className="menuPeerLevel">
                                Rate Type
                            </label>
                        </div>

                        {/* Centre */}
                        <div className="relative flex-1">
                            <div
                                className={`flex peer items-center border-[1.5px] border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
                                onClick={() => showSearchBarDropDown !== 2 ? openShowSearchBarDropDown(2) : openShowSearchBarDropDown(0)}
                            >
                                <input
                                    type="text"
                                    id="CentreId"
                                    name="CentreId"
                                    value={
                                        rateTypeMasterData?.CentreId?.length === 0
                                            ? ''
                                            : rateTypeMasterData?.CentreId
                                                .map((data) => data) // Extract departmentId
                                                .join(', ') // Join the array into a string separated by commas
                                    }
                                    readOnly
                                    onClick={() => openShowSearchBarDropDown(2)}
                                    placeholder="Search Data"
                                    className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                />

                                <div>
                                    {
                                        showSearchBarDropDown === 2 ? <RiArrowDropUpLine className='text-xl cursor-pointer' /> : <RiArrowDropDownLine className='text-xl cursor-pointer' />
                                    }
                                </div>

                                <label htmlFor="CentreId" className="menuPeerLevel">
                                    Centre
                                </label>

                            </div>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 2 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>

                                        {allCentreData?.length > 0 ? (
                                            allCentreData?.map((data, index) => {

                                                return (
                                                    <li
                                                        key={data?.centreId}
                                                        className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2"
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background: isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        <div>
                                                            <input
                                                                type="checkbox"
                                                                name='CerterId'
                                                                checked={rateTypeMasterData?.CentreId?.includes(data?.centreId)}

                                                                onChange={(e) => handleCheckboxChange(e, data?.centreId)}
                                                            />
                                                        </div>
                                                        <div>{data?.companyName}</div>
                                                    </li>
                                                )
                                            })
                                        ) : (
                                            <li className="py-4 text-gray-500 text-center">
                                                {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>


                        <div className='flex gap-[0.25rem]'>

                            <div className="relative flex-1 flex justify-start items-center">

                                {
                                    // isEditData ? <button
                                    //     className={`font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    //     style={{
                                    //         background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    //     }}
                                    //     onClick={onSubmitUpdateEmployeeMaster}
                                    // >

                                    //     {
                                    //         isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Update'
                                    //     }

                                    // </button>
                                    //     :
                                    <button
                                        type="button"
                                        data-ripple-light="true"
                                        className={`font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                        style={{
                                            background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                        }}
                                        onClick={onSubmitRateTypeMaster}
                                    >
                                        {
                                            isEditData ? isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Update' : isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                        }




                                    </button>
                                }

                            </div>

                            <div className="relative flex-1"></div>
                        </div>
                    </div>
                </form>
            </div>

            {/* grid data */}
            <div>
                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Rate Type Details</div>
                </div>

                <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                    <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <tr>
                            {rateTypeMasterHeader.map((data, index) => (
                                <td
                                    key={index}
                                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                                    style={{ width: index === 0 ? '50px' : index === 1 ? '150px' : '' }}
                                >
                                    <div className="flex gap-1">
                                        <div>{data}</div>
                                        {/* {data !== 'Action' && (
                                            <div className="flex items-center gap-1">
                                                <div>
                                                    <FaArrowUp className="text-xxs cursor-pointer" />
                                                </div>
                                                <div>
                                                    <FaArrowDown className="text-xxs cursor-pointer" />
                                                </div>
                                            </div>
                                        )} */}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </thead>

                    <tbody>

                        {
                            allRateTypeMaster?.map((data, index) => {

                                return (
                                    <tr
                                        className={`cursor-pointer ${isHoveredTable === data?.id
                                            ? ''
                                            : data?.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                            }`}
                                        key={data?.id}
                                        onMouseEnter={() => setIsHoveredTable(data?.id)}
                                        onMouseLeave={() => setIsHoveredTable(null)}
                                        style={{
                                            background:
                                                isHoveredTable === data?.id ? activeTheme?.subMenuColor : undefined,
                                        }}
                                    >
                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {index + 1}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.rateName}
                                        </td>


                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.centreName}
                                        </td>

                                        <td className="border-b px-4 h-5 flex items-center text-xxs font-semibold gap-2">
                                            <button
                                                type="button"
                                                data-ripple-light="true"
                                                className="w-4 h-4 flex justify-center items-center">
                                                <FaRegEdit
                                                    className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                                        }`}
                                                    onClick={() => {
                                                        if (data?.isActive === 1) {
                                                            getSingleRateTypeDataForUpDate(data);
                                                            //setRateTypeMasterData(data);
                                                            setIsEditData(true);
                                                        }
                                                    }}
                                                />

                                            </button>
                                            <button
                                                type="button"
                                                data-ripple-light="true"
                                                className={`w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                            >

                                                <ImSwitch className="w-full h-full"
                                                    onClick={() => {
                                                        setClickedRowId(data);
                                                        setShowPopup(true);
                                                    }}
                                                />

                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>



            {/* popup for active and deactive status */}
            {
                showPopup && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50"
                        >

                            <div className="flex mt-3 items-center">
                                <IoAlertCircleOutline className="w-8 h-8" style={{ color: activeTheme?.menuColor }} />
                            </div>

                            <div className="text-xxxs font-semibold text-textColor/50">
                                Are you sure want to update ?
                            </div>

                            <div className="flex items-end gap-5 my-5">

                                <div>
                                    <button
                                        type="button"
                                        data-ripple-light="true"
                                        className="relative overflow-hidden border-[1.5px] w-16 h-8 rounded-md font-semibold text-textColor transition-all duration-300 text-sm "
                                        style={{
                                            borderImageSource: activeTheme?.menuColor,
                                            borderImageSlice: 1,

                                        }}
                                        onClick={() => setShowPopup(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={handleTheUpdateStatusMenu}>
                                    <div>
                                        {
                                            isButtonClick === 3 ?
                                                <FaSpinner className="w-full h-full animate-spin text-textColor" />
                                                :
                                                'Yes'
                                        }
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
