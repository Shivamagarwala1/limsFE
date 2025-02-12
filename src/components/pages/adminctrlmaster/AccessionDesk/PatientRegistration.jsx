import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import UserCalendar from '../../../public/UserCalendar';
import useRippleEffect from '../../../customehook/useRippleEffect';
import { IoMdAdd, IoMdCloseCircleOutline } from 'react-icons/io';
import useOutsideClick from '../../../customehook/useOutsideClick';


export default function PatientRegistration() {

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    
    useRippleEffect();

    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [showCalander, setShowCalander] = useState(false);
    const [patientRegistrationData, setPatientRegistrationData] = useState({
        dob: ''
    });
    const [paymentMode, setPaymentMode] = useState("");

    const [showPopup, setShowPopup] = useState(0);

    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }

    const closeDropdown = () => setShowSearchBarDropDown(0);
    const dropdownRef = useOutsideClick(closeDropdown); // Use the custom hook

    const handleDateClick = (date) => {
        const formatDate = (date) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
        };

        const creditPeridos = formatDate(date);
        setPatientRegistrationData((prevData) => ({
            ...prevData,
            creditPeridos // Set formatted date in searchData
        }));
        setShowCalander(false);
    };





    return (
        <>
            {/* Header Section */}

            <div>
                {/* Header Section */}
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                    </div>
                    <div>Patient Registration Master</div>
                </div>

                {/* form data */}
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">


                        <div className="relative flex-1">
                            <select
                                id="isAllergyTest"
                                name='isAllergyTest'
                                // value={labTestMasterData.isAllergyTest}
                                // onChange={handelOnChangeLabTestMasterData}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="">B2B</option>
                                <option value="">DPS-Walking</option>
                                <option value="">Camp</option>
                            </select>
                            <label htmlFor="isAllergyTest" className="menuPeerLevel">
                                Billing Type
                            </label>
                        </div>



                        {/* center */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}
                                onClick={() => openShowSearchBarDropDown(1)}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Center
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 1 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>

                                        {
                                            /* {filterAlltestNameData?.length > 0 ? (
                                                filterAlltestNameData?.map((data, index) => (
                                                    <li
                                                        key={data?.itemId}
                                                        name="testName"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangeTestMappingData({
                                                                target: { name: 'testName', value: data?.itemId },
                                                            });
                                                            setSeleDropDown((preventData) => ({
                                                                ...preventData,
                                                                testName: data?.itemName
                                                            }))
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {data?.itemName}
                                                    </li>
    
                                                ))
                                            )  */

                                        }

                                            // : (
                                            // <li className="py-4 text-gray-500 text-center">
                                            //     {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                            // </li>
                                            // )

                                        <div>Under Processing</div>

                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Rate Type */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}
                                onClick={() => openShowSearchBarDropDown(2)}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Rate Type
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 2 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>

                                        {
                                            /* {filterAlltestNameData?.length > 0 ? (
                                                filterAlltestNameData?.map((data, index) => (
                                                    <li
                                                        key={data?.itemId}
                                                        name="testName"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangeTestMappingData({
                                                                target: { name: 'testName', value: data?.itemId },
                                                            });
                                                            setSeleDropDown((preventData) => ({
                                                                ...preventData,
                                                                testName: data?.itemName
                                                            }))
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {data?.itemName}
                                                    </li>
    
                                                ))
                                            )  */

                                        }

                                            // : (
                                            // <li className="py-4 text-gray-500 text-center">
                                            //     {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                            // </li>
                                            // )

                                        <div>Under Processing</div>

                                    </ul>
                                </div>
                            )}
                        </div>


                        {/* Edit info */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Edit info
                            </label>
                        </div>

                        {/* Edit Test */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Edit Test
                            </label>
                        </div>

                        <div className="relative flex-1">
                            <button
                                type="button"
                                data-ripple-light="true"
                                className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"

                                style={{
                                    background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                }}
                            >
                                Existing Patient
                            </button>

                        </div>
                    </div>

                    <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
                        <div className="flex gap-[0.25rem]">
                            {/* Mobile No. */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="testName"
                                    name="testName"
                                    // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                    // onChange={(e) => {
                                    //     handelOnChangeTestMappingData(e),
                                    //         setSeleDropDown((preventData) => ({
                                    //             ...preventData,
                                    //             testName: ''
                                    //         }))
                                    // }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                    Mobile No.
                                </label>
                            </div>

                            {/* title */}
                            <div className="relative flex-1">
                                <select
                                    id="isAllergyTest"
                                    name='isAllergyTest'
                                    // value={labTestMasterData.isAllergyTest}
                                    // onChange={handelOnChangeLabTestMasterData}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                >
                                    <option disabled hidden className='text-gray-400'>
                                        Select Option
                                    </option>
                                    <option value="">Mr.</option>
                                    <option value="">Ms.</option>
                                    <option value="">Other</option>
                                </select>
                                <label htmlFor="isAllergyTest" className="menuPeerLevel">
                                    Title
                                </label>
                            </div>
                        </div>


                        <div className="flex gap-[0.25rem]">
                            {/* F Name */}
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="testName"
                                    name="testName"
                                    // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                    // onChange={(e) => {
                                    //     handelOnChangeTestMappingData(e),
                                    //         setSeleDropDown((preventData) => ({
                                    //             ...preventData,
                                    //             testName: ''
                                    //         }))
                                    // }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                    F Name
                                </label>
                            </div>

                            {/* L Name */}
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="testName"
                                    name="testName"
                                    // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                    // onChange={(e) => {
                                    //     handelOnChangeTestMappingData(e),
                                    //         setSeleDropDown((preventData) => ({
                                    //             ...preventData,
                                    //             testName: ''
                                    //         }))
                                    // }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                    L Name
                                </label>
                            </div>
                        </div>


                        <div className="flex gap-[0.25rem]">
                            {/*  Day */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="testName"
                                    name="testName"
                                    // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                    // onChange={(e) => {
                                    //     handelOnChangeTestMappingData(e),
                                    //         setSeleDropDown((preventData) => ({
                                    //             ...preventData,
                                    //             testName: ''
                                    //         }))
                                    // }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                    Day
                                </label>
                            </div>

                            {/*  Month */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="testName"
                                    name="testName"
                                    // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                    // onChange={(e) => {
                                    //     handelOnChangeTestMappingData(e),
                                    //         setSeleDropDown((preventData) => ({
                                    //             ...preventData,
                                    //             testName: ''
                                    //         }))
                                    // }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                    Month
                                </label>
                            </div>

                            {/*  Year */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="testName"
                                    name="testName"
                                    // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                    // onChange={(e) => {
                                    //     handelOnChangeTestMappingData(e),
                                    //         setSeleDropDown((preventData) => ({
                                    //             ...preventData,
                                    //             testName: ''
                                    //         }))
                                    // }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                    Year
                                </label>
                            </div>
                        </div>


                        <div className="flex gap-[0.25rem]">
                            {/* DOB */}
                            <div className="relative flex-1 flex gap-[0.10rem] items-center">
                                {/* Input Field */}
                                <div className="w-full">
                                    <input
                                        type="text"
                                        id="creditPeridos"
                                        name="creditPeridos"
                                        // value={formData.creditPeridos}
                                        // onChange={handelChangeFormData}
                                        placeholder=" "
                                        className={`inputPeerField pr-10 w-full border-borderColor peer focus:outline-none`}
                                    />
                                    <label htmlFor="creditPeridos" className="menuPeerLevel">
                                        DOB
                                    </label>
                                </div>

                                {/* Calendar Icon */}
                                <div
                                    className="flex justify-center items-center cursor-pointer rounded font-semibold w-6 h-6"
                                    onClick={() => setShowCalander(!showCalander)}
                                    style={{
                                        background: activeTheme?.menuColor,
                                        color: activeTheme?.iconColor,
                                    }}
                                >
                                    <FaCalendarAlt className="w-4 h-4 font-semibold" />
                                </div>
                            </div>

                            {/* gender */}
                            <div className="relative flex-1">
                                {/* gendersInLabTestMaster */}
                                <select
                                    id="isAllergyTest"
                                    name='isAllergyTest'
                                    // value={labTestMasterData.isAllergyTest}
                                    // onChange={handelOnChangeLabTestMasterData}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                >
                                    <option disabled hidden className='text-gray-400'>
                                        Select Option
                                    </option>
                                    <option value="">Male</option>
                                    <option value="">Femail</option>
                                    <option value="">Other</option>
                                </select>
                                <label htmlFor="isAllergyTest" className="menuPeerLevel">
                                    Gender
                                </label>
                            </div>

                        </div>


                        {/* Email */}
                        <div className="relative flex-1">
                            <input
                                type="email"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Email
                            </label>
                        </div>


                        {/*  Refer Dr. */}
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    // value={selectedSearchDropDownData?.city || employeeData.city || ''}
                                    // onChange={(e) => {
                                    //     handelChangeEmployeeDetails(e)

                                    //     setSelectedSearchDropDownData((preventData) => ({
                                    //         ...preventData,
                                    //         city: '',
                                    //     }));
                                    // }}
                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor            focus:outline-none`}
                                />
                                <label htmlFor="city" className="menuPeerLevel">
                                    Refer Dr.
                                </label>
                            </div>

                            <div>
                                <div
                                    className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                    onClick={() => setShowPopup(1)}
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                >
                                    <IoMdAdd className="w-4 h-4 font-semibold" />
                                </div>
                            </div>


                        </div>

                        {/* Refer Dr2 */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Refer Dr2
                            </label>
                        </div>

                        {/* Address */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Address
                            </label>
                        </div>


                        {/* Pincode */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Pincode
                            </label>
                        </div>

                        {/* Refer Lab/Hospital */}
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    // value={selectedSearchDropDownData?.city || employeeData.city || ''}
                                    // onChange={(e) => {
                                    //     handelChangeEmployeeDetails(e)

                                    //     setSelectedSearchDropDownData((preventData) => ({
                                    //         ...preventData,
                                    //         city: '',
                                    //     }));
                                    // }}
                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor            focus:outline-none`}
                                />
                                <label htmlFor="city" className="menuPeerLevel">
                                    Refer Lab/Hospital
                                </label>
                            </div>

                            <div>
                                <div
                                    className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                    onClick={() => setShowPopup(1)}
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                >
                                    <IoMdAdd className="w-4 h-4 font-semibold" />
                                </div>
                            </div>


                        </div>

                        {/* Upload Document */}
                        <div className="relative flex-1">
                            <input
                                type="file"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Upload Document
                            </label>
                        </div>


                        {/* collection date and time */}
                        <div className="relative flex-1">
                            <input
                                type="datetime-local"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Collection Date & Time
                            </label>
                        </div>





                    </div>

                    <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
                        {/* Invastication */}
                        <div className="relative flex-1" ref={dropdownRef}>
                            <input
                                type="search"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}
                                onClick={() => openShowSearchBarDropDown(3)}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Invastication
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 3 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>

                                        {
                                            /* {filterAlltestNameData?.length > 0 ? (
                                                filterAlltestNameData?.map((data, index) => (
                                                    <li
                                                        key={data?.itemId}
                                                        name="testName"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangeTestMappingData({
                                                                target: { name: 'testName', value: data?.itemId },
                                                            });
                                                            setSeleDropDown((preventData) => ({
                                                                ...preventData,
                                                                testName: data?.itemName
                                                            }))
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {data?.itemName}
                                                    </li>
     
                                                ))
                                            )  */

                                        }

                                            // : (
                                            // <li className="py-4 text-gray-500 text-center">
                                            //     {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                            // </li>
                                            // )

                                        <div>Under Processing</div>

                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

                        {/* Currency */}
                        <div className="relative flex-1">
                            <select
                                id="isAllergyTest"
                                name='isAllergyTest'
                                // value={labTestMasterData.isAllergyTest}
                                // onChange={handelOnChangeLabTestMasterData}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="">Currency1</option>
                                <option value="">Currency2</option>
                                <option value="">Currency3</option>
                            </select>
                            <label htmlFor="isAllergyTest" className="menuPeerLevel">
                                Currency
                            </label>
                        </div>

                        {/* Payment Mode */}
                        <div className="relative flex-1">
                            <select
                                id="paymentMode"
                                name='paymentMode'
                                // value={labTestMasterData.paymentMode}
                                onChange={(event) => setPaymentMode(event.target.value)}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="1">Cash</option>
                                <option value="2">Debit/Credit Card</option>
                            </select>
                            <label htmlFor="paymentMode" className="menuPeerLevel">
                                Payment Mode
                            </label>
                        </div>

                        {
                            paymentMode === '2' && (
                                <>
                                    {/* Credit/Debit Card */}
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            id="testName"
                                            name="testName"
                                            // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                            // onChange={(e) => {
                                            //     handelOnChangeTestMappingData(e),
                                            //         setSeleDropDown((preventData) => ({
                                            //             ...preventData,
                                            //             testName: ''
                                            //         }))
                                            // }}

                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="testName" className="menuPeerLevel">
                                            Credit/Debit Card
                                        </label>
                                    </div>



                                    {/* Last 4 Digit */}
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            id="testName"
                                            name="testName"
                                            // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                            // onChange={(e) => {
                                            //     handelOnChangeTestMappingData(e),
                                            //         setSeleDropDown((preventData) => ({
                                            //             ...preventData,
                                            //             testName: ''
                                            //         }))
                                            // }}

                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="testName" className="menuPeerLevel">
                                            Last 4 Digit
                                        </label>
                                    </div>


                                    {/* Bank */}
                                    <div className="relative flex-1">
                                        <select
                                            id="paymentMode"
                                            name='paymentMode'
                                            // value={labTestMasterData.paymentMode}
                                            onChange={(event) => setPaymentMode(event.target.value)}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value="1">Bank1</option>
                                            <option value="2">Bank2</option>
                                            <option value="2">Bank3</option>
                                        </select>
                                        <label htmlFor="paymentMode" className="menuPeerLevel">
                                            Bank
                                        </label>
                                    </div>
                                </>
                            )
                        }

                        {/* Paid Ammount */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Paid Ammount
                            </label>
                        </div>

                        {/* Discount Type */}
                        <div className="relative flex-1">
                            <select
                                id="paymentMode"
                                name='paymentMode'
                                // value={labTestMasterData.paymentMode}
                                onChange={(event) => setPaymentMode(event.target.value)}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="">Discount Type</option>
                                <option value="">Discount Type</option>
                                <option value="">Discount Type</option>
                            </select>
                            <label htmlFor="paymentMode" className="menuPeerLevel">
                                Discount Type
                            </label>
                        </div>

                        {/* Cash */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Cash
                            </label>
                        </div>

                        {/* Balance Ammount */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Balance Ammount
                            </label>
                        </div>


                        {/* Discount Ammount */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Discount Ammount
                            </label>
                        </div>


                        {/* Discount % */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Discount %
                            </label>
                        </div>

                        {/* Discount Reason */}
                        <div className="relative flex-1">
                            <select
                                id="paymentMode"
                                name='paymentMode'
                                // value={labTestMasterData.paymentMode}
                                onChange={(event) => setPaymentMode(event.target.value)}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="1">Discount Reason1</option>
                                <option value="2">Discount Reason2</option>
                                <option value="2">Discount Reason3</option>
                            </select>
                            <label htmlFor="paymentMode" className="menuPeerLevel">
                                Discount Reason
                            </label>
                        </div>


                        {/* Discount Approved By */}
                        <div className="relative flex-1">
                            <select
                                id="paymentMode"
                                name='paymentMode'
                                // value={labTestMasterData.paymentMode}
                                onChange={(event) => setPaymentMode(event.target.value)}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="1">Discount Approved By1</option>
                                <option value="2">Discount Approved By2</option>
                                <option value="2">Discount Approved By3</option>
                            </select>
                            <label htmlFor="paymentMode" className="menuPeerLevel">
                                Discount Approved By
                            </label>
                        </div>


                        <div className='flex gap-[0.25rem]'>
                            <div className="relative flex-1 flex justify-start items-center">
                                <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    style={{
                                        background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    }}
                                >

                                    {/* {
                                    isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save Mapping'
                                } */}
                                    Save
                                </button>
                            </div>

                            <div className="relative flex-1 flex justify-start items-center">
                                <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    style={{
                                        background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    }}
                                >

                                    {/* {
                                    isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save Mapping'
                                } */}
                                    Clear
                                </button>
                            </div>
                        </div>

                    </div>
                </form >
            </div >



            {/* popup for active and deactive status */}
            {
                showPopup === 1 && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-96 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Add Refer Dr.
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>


                            <form
                                // onSubmit={onSumitUserChangePassword}
                                autoComplete='off'>

                                <div className='mx-1 mt-2 grid grid-cols-2 gap-2'>

                                    {/* labObservationName */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="labObservationName"
                                            name="labObservationName"
                                            // value={newMappingData.labObservationName}
                                            // onChange={handelChangeOnNewObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="labObservationName" className="menuPeerLevel">
                                            Title
                                        </label>
                                    </div>

                                    {/* shortName */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="shortName"
                                            name="shortName"
                                            // value={newMappingData.shortName}
                                            // onChange={handelChangeOnNewObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="shortName" className="menuPeerLevel">
                                            Name
                                        </label>
                                    </div>


                                    {/* suffix */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="suffix"
                                            name="suffix"
                                            // value={newMappingData.suffix}
                                            // onChange={handelChangeOnNewObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="suffix" className="menuPeerLevel">
                                            Mobile No.
                                        </label>
                                    </div>

                                    <div className="flex items-stretch  text-white  rounded-md"
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <button
                                            type="button"
                                            data-ripple-light="true"
                                            className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer"
                                        // onClick={handelOnSaveNewMapping}
                                        >
                                            {/* {
                                                isButtonClick === 3 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                            } */}
                                            Save
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                )
            }
        </>
    )
}
