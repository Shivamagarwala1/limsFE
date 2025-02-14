import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import UserCalendar from '../../../public/UserCalendar';
import useRippleEffect from '../../../customehook/useRippleEffect';
import { IoMdAdd, IoMdCloseCircleOutline } from 'react-icons/io';
import useOutsideClick from '../../../customehook/useOutsideClick';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCalendarScheduleFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { patientRegistrationInvestigation, patientRegistrationPaymentMode, paymentModes } from '../../../listData/listData';
import UserCalendarAndTime from '../../../public/UserCalendarAndTime';
import toast from 'react-hot-toast';
import { employeeWiseCentre, getAllBankNameApi, getAllDicountReasionApi, getAllDiscountApprovedBy, getAllDisCountType, getAllEmpTitleApi, getAllInvestiGationApi, getAllInvestigationGridApi, getAllRateTypeForPatientRegistrationData, getAllReferDrApi, getAllReferLabApi, saveReferDrApi } from '../../../../service/service';
import { FaSpinner } from 'react-icons/fa'

export default function PatientRegistration() {

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);

    useRippleEffect();
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [showCalander, setShowCalander] = useState(false);
    const [showCalanderAndTime, setShowCalanderAndTime] = useState(false);
    const [patientRegistrationData, setPatientRegistrationData] = useState({

        creditPeridos: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        collectionDateAndTime: new Date('1970-01-01T00:00:00Z')
            .toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour12: true
            })
            .replace(/ /g, '-') // Replace spaces with dashes in the date part
            .replace(/(\d{2}-\w{3}-\d{4})/, '$1 00:00') // Append 00:00 as the time
            .replace(/am|pm/g, 'AM'),

        investigationName: '',
        itemId: 0,
        refDoctor1: '',
        refID1: 0,
        refDoctor2: '',
        refID2: 0,

        refLabID: 0,
        refLab: '',
        bank_Id: 0,
    });
    const [patientRegistrationSelectData, setPatientRegistrationSelectData] = useState({
        centreId: '',
        rateId: '',
        title_id: '',
        //bank_Id: '',
        //refDoctor1: ''
    });


    const [addReferDrData, setAddReferDrData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        doctorId: 0,
        doctorCode: '',
        title: '',
        doctorName: '',
        imaRegistartionNo: '',
        email: '',
        reportEmail: '',
        mobileNo: '',
        mobileno2: '',
        address1: '',
        address2: '',
        pinCode: 0,
        degreeId: 0,
        degreeName: '',
        specializationID: 0,
        specialization: '',
        dob: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        anniversary: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        allowsharing: 0,
        referMasterShare: 0,
        proId: 0,
        areaId: 0,
        city: 0,
        state: 0,
        type: 0
    })

    const [isHovered, setIsHovered] = useState(null);


    const [allCentreData, setAllCentreData] = useState([]);
    const [allRateType, setAllRateType] = useState([]);
    const [allTitleData, setAllTitleData] = useState([]);
    const [allReferData, setAllReferData] = useState([]);
    const [allBankNameData, setAllBankNameData] = useState([]);
    const [paymentModeType, setPaymentModeType] = useState([{ value: '1', label: 'Cash' }]);
    const [allDicountTypeData, setAllDicountTypeData] = useState([]);
    const [allDiscountReasonData, setAllDiscountReasonData] = useState([]);
    const [allDiscountApprovedByData, setAllDiscountApprovedByData] = useState([]);
    const [allLabReferData, setAllLabReferData] = useState([]);
    const [allInvastigationData, setAllInvastigationData] = useState([]);
    const [investigationGridData, setinvestigationGridData] = useState([]);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [showPopup, setShowPopup] = useState(0);
    const [identifyAddReferDrOrReferLab, setIdentifyAddReferDrOrReferLab] = useState(0);


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



    const handleDateAndTimeClick = (date) => {
        // Format the date
        const formatDate = (date) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
        };

        // Format the time
        const formatTime = (date) => {
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert to 12-hour format, ensuring "12" is displayed for noon and midnight
            return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
        };

        // Get formatted date and time
        const formattedDate = formatDate(date);
        const formattedTime = formatTime(date);

        // Combine date and time
        const collectionDateAndTime = `${formattedDate} ${formattedTime}`;

        // Update patient registration data
        setPatientRegistrationData((prevData) => ({
            ...prevData,
            collectionDateAndTime, // Set formatted date and time in state
        }));

        //setShowCalanderAndTime(false);
    };




    const handelOnChangePatientRegistration = (event) => {

        setPatientRegistrationData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }

    const handelOnChangePatientRegistrationForSelect = (event) => {
        setPatientRegistrationSelectData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


    const handleCheckboxChange = (e, data) => {
        const isChecked = e.target.checked;

        setPaymentModeType((prevData) => {
            // Create a copy of the previous state
            const updatedAccess = [...prevData];

            if (isChecked) {
                // Check if the item already exists to avoid duplicates
                const exists = updatedAccess.some(
                    (item) => item.value === data?.value
                );
                if (!exists) {
                    updatedAccess.push(data);
                }
            } else {
                // Remove the item from the array when unchecked
                const index = updatedAccess.findIndex(
                    (item) => item?.value === data?.value
                );
                if (index !== -1) {
                    updatedAccess.splice(index, 1);
                }
            }

            // Return the updated state
            return updatedAccess;
        });
    };

    useEffect(() => {

        const getAllCentreData = async () => {
            try {
                const response = await employeeWiseCentre(user?.employeeId);

                if (response?.success) {
                    setAllCentreData(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllCentreData();


        const getAllTitleData = async () => {
            try {
                const response = await getAllEmpTitleApi();
                setAllTitleData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllTitleData();


        const getAllBankData = async () => {

            try {
                const response = await getAllBankNameApi();
                setAllBankNameData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllBankData();


        const getAllDiscountTypeData = async () => {

            try {
                const response = await getAllDisCountType();
                setAllDicountTypeData(response);

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllDiscountTypeData()


        const getAllDiscountReasonData = async () => {
            try {
                const response = await getAllDicountReasionApi();
                setAllDiscountReasonData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllDiscountReasonData();


        const getAllDiscountApprovedByData = async () => {

            try {
                const response = await getAllDiscountApprovedBy();
                setAllDiscountApprovedByData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }

        getAllDiscountApprovedByData();

    }, [])


    useEffect(() => {
        const getAllRateType = async () => {

            try {
                const response = await getAllRateTypeForPatientRegistrationData(patientRegistrationData?.centreId);

                if (response?.success) {
                    setAllRateType(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }

        getAllRateType();
    }, [patientRegistrationData?.centreId])


    useEffect(() => {

        const getAllInvastigationData = async () => {

            try {
                const response = await getAllInvestiGationApi(patientRegistrationData?.rateId);

                if (response?.success) {
                    setAllInvastigationData(response?.data);
                } else {
                    toast.error(response?.message);
                }
            } catch (error) {
                toast.error(error?.message);
            }

        }

        getAllInvastigationData();


        const getAllinvestigationGridData = async () => {
            try {
                const response = await getAllInvestigationGridApi(patientRegistrationData?.rateId, patientRegistrationData?.itemId)
                // setinvestigationGridData

                if (response?.success) {
                    setinvestigationGridData(response?.data)
                }
                console.log(response);

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllinvestigationGridData();

    }, [patientRegistrationData?.rateId, patientRegistrationData?.itemId])


    //add refer dr
    const handelChangeOnAddReferDrData = (event) => {
        setAddReferDrData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }

    const onSumitAddReferDrData = async (event) => {
        event.preventDefault();
        setIsButtonClick(1);
        try {

            const updatedAddReferDrData = {
                ...addReferDrData,
                isActive: 1,
                createdById: parseInt(user?.employeeId),
                createdDateTime: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    .replace(/ /g, '-'),
                type: identifyAddReferDrOrReferLab === 1 ? 1 : 2
            }

            const response = await saveReferDrApi(updatedAddReferDrData);

            if (response?.success) {

                toast.success(response?.message);

                setAddReferDrData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        .replace(/ /g, '-'),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        .replace(/ /g, '-'),
                    doctorId: 0,
                    doctorCode: '',
                    title: '',
                    doctorName: '',
                    imaRegistartionNo: '',
                    email: '',
                    reportEmail: '',
                    mobileNo: '',
                    mobileno2: '',
                    address1: '',
                    address2: '',
                    pinCode: 0,
                    degreeId: 0,
                    degreeName: '',
                    specializationID: 0,
                    specialization: '',
                    dob: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        .replace(/ /g, '-'),
                    anniversary: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        .replace(/ /g, '-'),
                    allowsharing: 0,
                    referMasterShare: 0,
                    proId: 0,
                    areaId: 0,
                    city: 0,
                    state: 0,
                    type: 0
                });

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }
        setIsButtonClick(2);
    }

    useEffect(() => {
        const getAllReferData = async () => {

            try {
                const response = await getAllReferDrApi();
                setAllReferData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllReferData();


        const getAllLabReferData = async () => {

            try {
                const response = await getAllReferLabApi();
                setAllLabReferData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllLabReferData();
    }, [isButtonClick])

    const filterCentreData = allCentreData.filter((data) => (data?.centreName?.toLowerCase() || '').includes(String(patientRegistrationSelectData?.centreId || '').toLowerCase()));


    const filterRateData = allRateType.filter((data) => (data?.rateName?.toLowerCase() || '').includes(String(patientRegistrationSelectData?.rateId || '').toLowerCase()));
    //
    const filterReferDrData = allReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refDoctor1 || '').toLowerCase()));


    const filterinvestigationNamerData = allInvastigationData.filter((data) => (data?.itemName?.toLowerCase() || '').includes(String(patientRegistrationData?.investigationName || '').toLowerCase()));


    const filterReferDrDataTwo = allReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refDoctor2 || '').toLowerCase()));


    const filterReferLabData = allLabReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refLab || '').toLowerCase()));


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
                    <div>Patient Registration</div>
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
                            <label htmlFor="centreId" className="menuPeerLevel">
                                Centre
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

                        <div className="flex gap-[0.25rem]">
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


                        {/* Name */}
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
                                Name
                            </label>
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


                        <div className="flex gap-[0.25rem] relative">
                            {/* DOB */}
                            <div className="relative flex-1 flex gap-[0.10rem] items-center">
                                {/* Input Field */}
                                <div className="w-full">
                                    <input
                                        type="text"
                                        id="creditPeridos"
                                        name="creditPeridos"
                                        value={patientRegistrationData.creditPeridos}
                                        onChange={handelOnChangePatientRegistration}
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
                                    <CiCalendarDate className="w-4 h-4 font-semibold" />
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
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="T">Transgender</option>
                                </select>
                                <label htmlFor="isAllergyTest" className="menuPeerLevel">
                                    Gender
                                </label>
                            </div>

                            {/* Calendar Popup */}
                            {showCalander && (
                                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                                    <UserCalendar onDateClick={handleDateClick} />
                                </div>
                            )}
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
                                    onClick={() => {
                                        setShowPopup(1), setIdentifyAddReferDrOrReferLab(1)
                                    }}
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


                        {/* collection date and time */}


                        <div className="relative flex-1 flex gap-[0.10rem] items-center">
                            {/* Input Field */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    id="collectionDateAndTime"
                                    name="collectionDateAndTime"
                                    value={patientRegistrationData.collectionDateAndTime || ''}
                                    onChange={handelOnChangePatientRegistration}
                                    placeholder=" "
                                    className={`inputPeerField pr-10 w-full border-borderColor peer focus:outline-none`}
                                />
                                <label htmlFor="collectionDateAndTime" className="menuPeerLevel">
                                    Collection Date & Time
                                </label>
                            </div>

                            {/* Calendar Icon */}
                            <div
                                className="flex justify-center items-center cursor-pointer rounded font-semibold w-6 h-6"
                                onClick={() => setShowCalanderAndTime(!showCalanderAndTime)}
                                style={{
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            >
                                <RiCalendarScheduleFill className="w-4 h-4 font-semibold" />
                            </div>

                            {/* Calendar Popup */}
                            {showCalanderAndTime && (
                                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                                    <UserCalendarAndTime onDateAndTimeClick={handleDateAndTimeClick} />
                                </div>
                            )}
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
                                    type="search"
                                    id="refLab"
                                    name="refLab"
                                    value={patientRegistrationData.refLab || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}
                                    onClick={() => openShowSearchBarDropDown(7)}
                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor            focus:outline-none`}
                                />
                                <label htmlFor="refLab" className="menuPeerLevel">
                                    Refer Lab/Hospital
                                </label>


                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 7 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>

                                            {
                                                filterReferLabData?.length > 0 ? (
                                                    filterReferLabData?.map((data, index) => (
                                                        <li
                                                            key={data?.doctorId}
                                                            name="refLab"
                                                            className="my-1 px-2 cursor-pointer"
                                                            onClick={(e) => {
                                                                openShowSearchBarDropDown(0);
                                                                handelOnChangePatientRegistration({
                                                                    target: { name: 'refLabID', value: data?.doctorId },
                                                                });

                                                                handelOnChangePatientRegistration({
                                                                    target: { name: 'refLab', value: data?.doctorName },
                                                                });


                                                            }}
                                                            onMouseEnter={() => setIsHovered(index)}
                                                            onMouseLeave={() => setIsHovered(null)}
                                                            style={{
                                                                background:
                                                                    isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                            }}
                                                        >
                                                            {data?.doctorName}
                                                        </li>

                                                    ))
                                                )
                                                    : (
                                                        <li className="py-4 text-gray-500 text-center">
                                                            {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                        </li>
                                                    )

                                            }
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div
                                    className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                    onClick={() => { setShowPopup(1), setIdentifyAddReferDrOrReferLab(0) }}
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

                        {/* investigation */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="investigationName"
                                name="investigationName"
                                value={patientRegistrationData?.investigationName || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}
                                onClick={() => openShowSearchBarDropDown(3)}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="investigationName" className="menuPeerLevel">
                                Investigation (Multi check box)
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 3 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>
                                        {
                                            filterinvestigationNamerData?.length > 0 ? (
                                                filterinvestigationNamerData?.map((data, index) => (
                                                    <li
                                                        key={data?.itemId}
                                                        name="investigationName"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'investigationName', value: data?.itemName },
                                                            });

                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'itemId', value: data?.itemId },
                                                            });
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
                                            )
                                                : (
                                                    <li className="py-4 text-gray-500 text-center">
                                                        {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                    </li>
                                                )

                                        }
                                    </ul>
                                </div>
                            )}
                        </div>


                    </div>

                    <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                    <div className="grid grid-cols-12 gap-2 mt-1 mb-1 mx-1 lg:mx-2">

                        {
                            investigationGridData?.length !== 0 && (
                                <div className="col-span-12">
                                    <div className="max-h-[7.5rem] overflow-y-auto">
                                        <table className="table-auto border-collapse w-full text-xxs text-left">
                                            <thead
                                                style={{
                                                    position: "sticky",
                                                    top: 0,
                                                    zIndex: 1,
                                                    background: activeTheme?.menuColor,
                                                    color: activeTheme?.iconColor,
                                                }}
                                            >
                                                <tr>
                                                    {patientRegistrationInvestigation?.map((data, index) => (
                                                        <td
                                                            key={index}
                                                            className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                        >
                                                            {data}
                                                        </td>
                                                    ))}
                                                </tr>
                                            </thead>

                                            <tbody>

                                                <tr
                                                // Prefer unique keys
                                                // className={`cursor-pointer ${isHoveredTable === rowIndex
                                                //     ? ""
                                                //     : rowIndex % 2 === 0
                                                //         ? "bg-gray-100"
                                                //         : "bg-white"
                                                //     }`}
                                                // onMouseEnter={() => setIsHoveredTable(rowIndex)}
                                                // onMouseLeave={() => setIsHoveredTable(null)}
                                                // style={{
                                                //     background:
                                                //         isHoveredTable === rowIndex
                                                //             ? activeTheme?.subMenuColor
                                                //             : undefined,
                                                // }}
                                                >
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {investigationGridData[0]?.itemName}
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        <FontAwesomeIcon icon="fas fa-info-circle" />
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {investigationGridData[0]?.mrp}
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {investigationGridData[0]?.grosss}
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {investigationGridData[0]?.discount}
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {investigationGridData[0]?.netAmt}
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        <select className="border rounded px-2 py-1 outline-none">
                                                            {investigationGridData?.map((item, index) => (
                                                                <option key={index} value={item.sampleTypeName}>
                                                                    {item.sampleTypeName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        <input type="text" className='border-[1.5px] rounded outline-none pl-1 w-full' />
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {investigationGridData[0]?.deliveryDate}
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        <input type="checkbox"
                                                        // id={`checkbox-${rowIndex}`} 
                                                        />
                                                        {/* <label htmlFor={`checkbox-${rowIndex}`} className="sr-only">
                                                            Select Row
                                                        </label> */}
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        <RiDeleteBin2Fill
                                                            // onClick={() => handleDelete(rowIndex)}
                                                            className="cursor-pointer text-red-500"
                                                        />
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                    <div
                                        className="w-full h-4 flex gap-10 items-center text-xxs px-4 font-semibold"
                                        style={{
                                            background: activeTheme?.menuColor,
                                            color: activeTheme?.iconColor,
                                        }}
                                    >
                                        <div className="flex gap-1">
                                            <div>Test Count:</div>
                                            <div>1000</div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div>Total:</div>
                                            <div>500</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }



                    </div>


                    {/* <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-2  mx-1 lg:mx-2">

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
                                <option value="">INR</option>
                                <option value="">USD</option>
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
                                <option value="2">UPI</option>
                            </select>
                            <label htmlFor="paymentMode" className="menuPeerLevel">
                                Payment Mode
                            </label>
                        </div>

                        {/* Paid Amt. */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="paidAmt"
                                name="paidAmt"
                                value={1000 || ''}
                                // onChange={(e) => {
                                //     handelChangeEmployeeDetails(e)

                                //     setSelectedSearchDropDownData((preventData) => ({
                                //         ...preventData,
                                //         paidAmt: '',
                                //     }));
                                // }}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor            focus:outline-none`}
                                readOnly
                            />
                            <label htmlFor="paidAmt" className="menuPeerLevel">
                                Paid Amt.(Cash Amt+Credit/debit amt+ upi amt)
                            </label>
                        </div>

                        {/* Balance Amt. */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="balanceAmt"
                                name="balanceAmt"
                                value={100 || ''}
                                // onChange={(e) => {
                                //     handelChangeEmployeeDetails(e)

                                //     setSelectedSearchDropDownData((preventData) => ({
                                //         ...preventData,
                                //         balanceAmt: '',
                                //     }));
                                // }}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor            focus:outline-none `}

                                readOnly
                            />
                            <label htmlFor="balanceAmt" className="menuPeerLevel">
                                Balance Amt.
                            </label>
                        </div>
                    </div>

                    {/* payment mode grid */}
                    <div className='mx-2 mb-2'>
                        <table className="table-auto border-collapse w-full text-xxs text-left">
                            {/* Table Header */}
                            <thead
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            >
                                <tr>
                                    {patientRegistrationPaymentMode?.map((data, index) => (
                                        <td
                                            key={index}
                                            className="border-b font-semibold border-gray-300 text-center text-xxs"
                                        >
                                            {data}
                                        </td>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>

                                <tr>

                                    <td className="text-xxs font-semibold text-gridTextColor"
                                    >
                                        <input type="number" name="" id=""
                                            className='inputPeerField outline-none'
                                        />
                                    </td>


                                    <td className="text-xxs font-semibold text-gridTextColor"
                                    >
                                        <input type="number" name="" id=""
                                            className={`inputPeerField outline-none ${paymentMode !== '2' ? 'cursor-not-allowed' : 'cursor-pointer'}`}

                                            readOnly={paymentMode !== "2"}
                                        />
                                    </td>

                                    <td className="text-xxs font-semibold text-gridTextColor"
                                    >
                                        <input type="number" name="" id=""
                                            className={`inputPeerField outline-none ${paymentMode !== '2' ? 'cursor-not-allowed' : 'cursor-pointer'}`}

                                            readOnly={paymentMode !== "2"}
                                        />
                                    </td>


                                    <td className='text-xxs font-semibold text-gridTextColor'>
                                        <select
                                            id="paymentMode"
                                            name='paymentMode'
                                            // value={labTestMasterData.paymentMode}
                                            onChange={(event) => setPaymentMode(event.target.value)}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none ${paymentMode !== '2' ? 'cursor-not-allowed' : 'cursor-pointer'}`}


                                            readOnly={paymentMode !== "2"}
                                        >
                                            <option disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value="1">Bank1</option>
                                            <option value="2">Bank2</option>
                                            <option value="2">Bank3</option>
                                        </select>
                                    </td>

                                    <td className="text-xxs font-semibold text-gridTextColor"
                                    >
                                        <input type="number" name="" id=""
                                            className='inputPeerField outline-none'
                                        />
                                    </td>



                                    <td className='text-xxs font-semibold text-gridTextColor'>
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-2  mx-1 lg:mx-2">

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
                                    Reset
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
                                    {
                                        identifyAddReferDrOrReferLab === 1 ?
                                            'Add Refer Dr.'
                                            :
                                            'Refer Lab/Hospital'
                                    }

                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setShowPopup(0), setIdentifyAddReferDrOrReferLab(0) }}
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
                                            className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                            style={{
                                                background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                            }}
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
