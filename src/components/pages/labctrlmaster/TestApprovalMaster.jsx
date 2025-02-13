import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getAllDoctorNameForTestApprovalMasterApi, getAllEmployeeForTestApprovalMasterApi, getAllTestApprovalMasterApi, getCenterDataForReferanceRangeApi, getSingleTestApprovalMasterApi, saveTestApprovalMasterData, updateTestApprovalMaster } from '../../../service/service';
import { IoMdImages } from 'react-icons/io';
import { FaRegEdit, FaSpinner } from 'react-icons/fa';
import { testApprovalMasterHeader } from '../../listData/listData';
import { ImSwitch } from 'react-icons/im';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useRippleEffect from '../../customehook/useRippleEffect'
export default function TestApprovalMaster() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);
    useRippleEffect();

    const [testMasterMasterApprovalData, setTestMasterMasterApprovalData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        centreId: 0,
        empId: 0,
        empName: '',
        doctorName: '',
        signature: '',
        approve: 1,
        notApprove: 1,
        hold: 1,
        unHold: 1,
        doctorId: 0
    })
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [isHovered, setIsHovered] = useState(null);
    const [allCenterData, setAllCenterData] = useState([]);
    const [allEmployeeData, setAllEmployeeData] = useState([]);
    const [allDoctorData, setAllDoctorData] = useState([]);
    const [allTestApprovalMasterData, setAllTestMasterApprovalMasterData] = useState([]);
    const [selectTestApprovalMasterData, setSelectTestApprovalMasterData] = useState({
        centreId: '',
        empName: '',
        doctorName: ''
    })
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [singleTestApprovalMasterData, setSingleTestApprovalMasterData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isEditData, setIsEditData] = useState(false);
    const [imageView, setImageView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {


        const getCenterData = async () => {

            try {
                const response = await getCenterDataForReferanceRangeApi();
                setSelectTestApprovalMasterData((preventData) => ({
                    ...preventData,
                    centreId: response[0]?.companyName
                }))
                setTestMasterMasterApprovalData((preventData) => ({
                    ...preventData,
                    centreId: response[0]?.centreId
                }))
                setAllCenterData(response);
            } catch (error) {
                toast.error(error?.message);
            }

        }
        getCenterData();


        //get all emp
        const getAllEmployee = async () => {
            try {
                const response = await getAllEmployeeForTestApprovalMasterApi();

                // Ensure response is a valid array
                if (Array.isArray(response) && response.length > 0) {
                    setAllEmployeeData(response);

                    // Select the first employee from the response
                    const firstEmployee = response[0];

                    setSelectTestApprovalMasterData((prevData) => ({
                        ...prevData,
                        empName: `${firstEmployee.fName} ${firstEmployee.lName}`, // Concatenate fName and lName
                    }));

                    setTestMasterMasterApprovalData((prevData) => ({
                        ...prevData,
                        empName: `${firstEmployee.fName} ${firstEmployee.lName}`,
                        empId: firstEmployee.empId, // Set the empId
                    }));
                } else {
                    console.error('No employee data found');
                    // Handle empty response
                    setAllEmployeeData([]);
                    setSelectTestApprovalMasterData((prevData) => ({ ...prevData, empName: '' }));
                    setTestMasterMasterApprovalData((prevData) => ({ ...prevData, empName: '', empId: null }));
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
                // Optional: Handle errors, such as showing a notification to the user
            }

        }
        getAllEmployee();


        //get all doctor
        const getAllDoctor = async () => {
            try {
                const response = await getAllDoctorNameForTestApprovalMasterApi();

                // Ensure response is a valid array
                if (Array.isArray(response) && response.length > 0) {
                    setAllDoctorData(response);

                    // Select the first employee from the response
                    const firstEmployee = response[0];

                    setSelectTestApprovalMasterData((prevData) => ({
                        ...prevData,
                        doctorName: `${firstEmployee.fName} ${firstEmployee.lName}`, // Concatenate fName and lName
                    }));

                    setTestMasterMasterApprovalData((prevData) => ({
                        ...prevData,
                        doctorName: `${firstEmployee.fName} ${firstEmployee.lName}`,
                        doctorId: firstEmployee.empId, // Set the empId
                    }));
                } else {
                    console.error('No employee data found');
                    // Handle empty response
                    setAllDoctorData([]);
                    setSelectTestApprovalMasterData((prevData) => ({ ...prevData, doctorName: '' }));
                    setTestMasterMasterApprovalData((prevData) => ({ ...prevData, doctorName: '', doctorId: null }));
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
                // Optional: Handle errors, such as showing a notification to the user
            }

        }
        getAllDoctor();
    }, [])

    const handelOnChnageTestApproveMaster = (event) => {

        setTestMasterMasterApprovalData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))

    }

    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }


    const handelClickImage = () => {
        if (imgRef.current) {
            imgRef.current.click();
        }
    };

    const handelImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;

                img.onload = () => {
                    // Check if the image dimensions are less than or equal to 150px by 150px
                    if (img.width <= 815 && img.height <= 110) {
                        setTestMasterMasterApprovalData((prevData) => ({
                            ...prevData,
                            signature: reader.result, // Store the base64 image
                        }));
                    } else {
                        toast.error("Please upload an image with dimensions 150px by 150px")
                    }
                };
            };

            reader.readAsDataURL(file); // Read the image file as a data URL (base64)
        }
    };


    const onSubmitSaveTestApproveMasterData = async () => {
        setIsButtonClick(1);

        const updatedData = {
            ...testMasterMasterApprovalData,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            approve: parseInt(testMasterMasterApprovalData?.approve),
            notApprove: parseInt(testMasterMasterApprovalData?.notApprove),
            hold: parseInt(testMasterMasterApprovalData?.hold),
            unHold: parseInt(testMasterMasterApprovalData?.unHold),
            isActive: 1
        }

        try {

            const response = await saveTestApprovalMasterData(updatedData);

            if (response?.success) {
                toast.success(response?.message);

                setTestMasterMasterApprovalData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    centreId: 0,
                    empId: 0,
                    empName: '',
                    doctorName: '',
                    signature: '',
                    approve: 1,
                    notApprove: 1,
                    hold: 1,
                    unHold: 1,
                    doctorId: 0
                })
            } else {
                toast.error(response?.error);
            }

        } catch (error) {
            toast.error(error?.message);

        }

        setIsButtonClick(0);
    }


    useEffect(() => {

        const getAllTestApprovalMaster = async () => {
            try {
                const response = await getAllTestApprovalMasterApi();

                if (response?.success) {
                    setAllTestMasterApprovalMasterData(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllTestApprovalMaster();

    }, [isButtonClick])


    //status update
    const handelStatusUpdateTestApproval = async () => {

        setIsButtonClick(3);

        const activeStatus = singleTestApprovalMasterData?.isActive === 1 ? 0 : 1;

        try {

            const response = await updateTestApprovalMaster(singleTestApprovalMasterData?.id, activeStatus, parseInt(user?.employeeId));

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setShowPopup(false);
        setSingleTestApprovalMasterData(null);
        setIsButtonClick(0);
    }


    //get single data
    const getSingleTestApprovalMastertData = async (id) => {

        try {
            const response = await getSingleTestApprovalMasterApi(id);
            setTestMasterMasterApprovalData(response[0]);
            setSelectTestApprovalMasterData((preventData) => ({
                ...preventData,
                centreId: allCenterData?.filter((data) => data?.centreId === response[0]?.centreId)[0]?.companyName,
                doctorName: response[0]?.doctorName,
                empName: response[0]?.empName
            }))
        } catch (error) {
            toast.error(error?.message);
        }

    }

    const onSubmitUpdateTestApproveMasterData = async () => {

        setIsButtonClick(1);

        const updatedData = {
            ...testMasterMasterApprovalData,
            updateById: parseInt(user?.employeeId),
            updateDateTime: new Date().toISOString(),
            approve: parseInt(testMasterMasterApprovalData?.approve),
            notApprove: parseInt(testMasterMasterApprovalData?.notApprove),
            hold: parseInt(testMasterMasterApprovalData?.hold),
            unHold: parseInt(testMasterMasterApprovalData?.unHold),
        }


        try {

            const response = await saveTestApprovalMasterData(updatedData);

            if (response?.success) {
                toast.success(response?.message);

                setTestMasterMasterApprovalData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    centreId: 0,
                    empId: 0,
                    empName: '',
                    doctorName: '',
                    signature: '',
                    approve: 1,
                    notApprove: 1,
                    hold: 1,
                    unHold: 1,
                    doctorId: 0
                })
            } else {
                toast.error(response?.error);
            }

        } catch (error) {
            toast.error(error?.message);

        }

        setIsButtonClick(0);
    }

    const filterAllCentreData = allCenterData?.filter((data) => (data?.companyName?.toLowerCase() || '').includes(String(selectTestApprovalMasterData?.centreId?.toLowerCase() || '')));


    const filterAllDoctoreData = allDoctorData.filter((data) =>
        `${data.fName} ${data.lName}`.toLowerCase().includes(testMasterMasterApprovalData?.doctorName?.toLowerCase())
    );


    const filterAllEmpData = allEmployeeData.filter((data) =>
        `${data.fName} ${data.lName}`.toLowerCase().includes(testMasterMasterApprovalData?.empName?.toLowerCase())
    );




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
                    <div>Test Approval Master</div>
                </div>

                {/* form data */}
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">


                        {/* centre name */}
                        <div className="relative flex-1 ">
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="centreId"
                                    name="centreId"
                                    value={selectTestApprovalMasterData?.centreId || testMasterMasterApprovalData?.centreId || ''}
                                    onChange={(e) => {
                                        handelOnChnageTestApproveMaster(e),
                                            setSelectTestApprovalMasterData((preventData) => ({
                                                ...preventData,
                                                centreId: ''
                                            }))
                                    }}
                                    onClick={() => openShowSearchBarDropDown(1)}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="centreId" className="menuPeerLevel">
                                    Centre Name
                                </label>

                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 1 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>
                                            {filterAllCentreData?.length > 0 ? (
                                                filterAllCentreData?.map((data, index) => (
                                                    <li
                                                        key={data?.centreId}
                                                        name="centreId"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChnageTestApproveMaster({
                                                                target: { name: 'centreId', value: data?.centreId },
                                                            });
                                                            setSelectTestApprovalMasterData((preventData) => ({
                                                                ...preventData,
                                                                centreId: data?.companyName
                                                            }))
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {data?.companyName}
                                                    </li>

                                                ))
                                            ) : (
                                                <li className="py-4 text-gray-500 text-center">
                                                    {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* employee name */}
                        <div className="relative flex-1 ">
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="empName"
                                    name="empName"
                                    value={selectTestApprovalMasterData?.empName || testMasterMasterApprovalData?.empName || ''}
                                    onChange={(e) => {
                                        handelOnChnageTestApproveMaster(e),
                                            setSelectTestApprovalMasterData((preventData) => ({
                                                ...preventData,
                                                empName: ''
                                            }))
                                    }}
                                    onClick={() => openShowSearchBarDropDown(2)}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="empName" className="menuPeerLevel">
                                    Employee Name
                                </label>

                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 2 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>
                                            {filterAllEmpData?.length > 0 ? (
                                                filterAllEmpData?.map((data, index) => (
                                                    <li
                                                        key={data?.empId}
                                                        name="empName"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChnageTestApproveMaster({
                                                                target: { name: 'empName', value: `${data?.fName} ${data?.lName}` },
                                                            });

                                                            setSelectTestApprovalMasterData((preventData) => ({
                                                                ...preventData,
                                                                empName: `${data?.fName} ${data?.lName}`
                                                            }))

                                                            setTestMasterMasterApprovalData({
                                                                ...testMasterMasterApprovalData,
                                                                empId: data?.empId,
                                                                empName: `${data?.fName} ${data?.lName}`
                                                            })
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {`${data?.fName} ${data?.lName}`}
                                                    </li>

                                                ))
                                            ) : (
                                                <li className="py-4 text-gray-500 text-center">
                                                    {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* doctore name */}
                        <div className="relative flex-1 ">
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="doctorName"
                                    name="doctorName"
                                    value={selectTestApprovalMasterData?.doctorName || testMasterMasterApprovalData?.doctorName || ''}
                                    onChange={(e) => {
                                        handelOnChnageTestApproveMaster(e),
                                            setSelectTestApprovalMasterData((preventData) => ({
                                                ...preventData,
                                                doctorName: ''
                                            }))
                                    }}
                                    onClick={() => openShowSearchBarDropDown(3)}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="doctorName" className="menuPeerLevel">
                                    Select Doctor
                                </label>

                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 3 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>
                                            {filterAllDoctoreData?.length > 0 ? (
                                                filterAllDoctoreData?.map((data, index) => (
                                                    <li
                                                        key={data?.empId}
                                                        name="doctorName"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChnageTestApproveMaster({
                                                                target: { name: 'doctorName', value: `${data?.fName} ${data?.lName}` },
                                                            });

                                                            setSelectTestApprovalMasterData((preventData) => ({
                                                                ...preventData,
                                                                doctorName: `${data?.fName} ${data?.lName}`
                                                            }))

                                                            setTestMasterMasterApprovalData({
                                                                ...testMasterMasterApprovalData,
                                                                doctorId: data?.empId,
                                                                doctorName: `${data?.fName} ${data?.lName}`
                                                            })
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {`${data?.fName} ${data?.lName}`}
                                                    </li>

                                                ))
                                            ) : (
                                                <li className="py-4 text-gray-500 text-center">
                                                    {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>




                        {/* doctor signature */}
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
                            <div className="relative flex-1">

                                <div
                                    name="signature"
                                    className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                                    onClick={handelClickImage}
                                >
                                    {
                                        testMasterMasterApprovalData.signature === '' ? (
                                            <div className="pt-2 z-40 font-semibold text-center">
                                                Upload Image
                                            </div>
                                        ) : (
                                            <div className="pt-2 z-40 text-center">
                                                Image uploaded Successfully
                                            </div>
                                        )
                                    }

                                    <input
                                        type="file"
                                        id="signature"
                                        name="signature"
                                        ref={imgRef}
                                        onChange={handelImageChange}
                                        style={{ display: 'none' }}
                                        accept=".jpg, .jpeg, .png"
                                        max={'150px/150px'}
                                    />
                                </div>



                                <label htmlFor="signature" className="menuPeerLevel">
                                    Signature
                                </label>

                            </div>

                            {
                                testMasterMasterApprovalData?.signature && (
                                    <div className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                        onClick={() => setImageView(true)}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                                        <IoMdImages className="w-4 h-4 font-semibold" />
                                    </div>
                                )
                            }

                        </div>


                        {/* approved & not approved */}
                        <div className='flex gap-[0.25rem]'>
                            {/* approved */}
                            <div className="relative flex-1">
                                <select
                                    id="approve"
                                    name='approve'
                                    value={testMasterMasterApprovalData.approve}
                                    onChange={handelOnChnageTestApproveMaster}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                >
                                    <option value="" disabled hidden className='text-gray-400'>
                                        Select Option
                                    </option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>
                                <label htmlFor="approve" className="menuPeerLevel">
                                    Approve
                                </label>
                            </div>

                            <div className="relative flex-1">
                                <select
                                    id="notApprove"
                                    name='notApprove'
                                    value={testMasterMasterApprovalData.notApprove}
                                    onChange={handelOnChnageTestApproveMaster}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                >
                                    <option value="" disabled hidden className='text-gray-400'>
                                        Select Option
                                    </option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>
                                <label htmlFor="notApprove" className="menuPeerLevel">
                                    Not Approve
                                </label>
                            </div>
                        </div>

                        {/* hold & unhold */}
                        <div className='flex gap-[0.25rem]'>
                            {/* Active */}
                            <div className="relative flex-1">
                                <select
                                    id="hold"
                                    name='hold'
                                    value={testMasterMasterApprovalData.hold}
                                    onChange={handelOnChnageTestApproveMaster}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                >
                                    <option value="" disabled hidden className='text-gray-400'>
                                        Select Option
                                    </option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>
                                <label htmlFor="hold" className="menuPeerLevel">
                                    Hold
                                </label>
                            </div>

                            <div className="relative flex-1">
                                <select
                                    id="unHold"
                                    name='unHold'
                                    value={testMasterMasterApprovalData.unHold}
                                    onChange={handelOnChnageTestApproveMaster}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                >
                                    <option value="" disabled hidden className='text-gray-400'>
                                        Select Option
                                    </option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>
                                <label htmlFor="unHold" className="menuPeerLevel">
                                    Un Hold
                                </label>
                            </div>
                        </div>



                        {/* save data */}
                        <div className='flex gap-[0.25rem]'>
                            {/* save */}
                            <div className="relative flex-1">

                                {
                                    isEditData ?
                                        <button
                                            type="button"
                                            data-ripple-light="true"
                                            className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                            style={{
                                                background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                            }}
                                            onClick={onSubmitUpdateTestApproveMasterData}
                                        >

                                            {
                                                isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Update Comment'
                                            }

                                        </button>
                                        :
                                        <button
                                            type="button"
                                            data-ripple-light="true"
                                            className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                            style={{
                                                background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                            }}
                                            onClick={onSubmitSaveTestApproveMasterData}
                                        >

                                            {
                                                isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save Approval'
                                            }

                                        </button>
                                }

                            </div>

                            <div className="flex-1"></div>
                        </div>
                    </div>
                </form>
            </div>


            {/* table data */}
            <div>
                <div className='w-full h-[0.10rem] mt-1' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                    </div>
                    <div>Test Approval Details</div>
                </div>


                {/* testApprovalMasterHeader */}
                <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                    <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <tr>
                            {
                                testApprovalMasterHeader?.map((data, index) => (
                                    <td
                                        key={index}
                                        className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                                    >
                                        {data}
                                    </td>
                                ))
                            }

                        </tr>
                    </thead>


                    <tbody>

                        {
                            allTestApprovalMasterData?.map((data, index) => {

                                return (
                                    <tr
                                        className={`cursor-pointer ${isHoveredTable === index ? ''
                                            : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                            `}
                                        key={index}
                                        onMouseEnter={() => setIsHoveredTable(index)}
                                        onMouseLeave={() => setIsHoveredTable(null)}
                                        style={{
                                            background:
                                                isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                                        }}

                                    >
                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.id}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">

                                            {data?.companyName}
                                        </td>


                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.empName}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.doctorName}
                                        </td>


                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            <img src={data?.signature} alt="path not found" className='w-52 h-4'
                                                onClick={() => { setSingleTestApprovalMasterData(data); setImageView(true) }}
                                            />
                                        </td>


                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor flex gap-1">
                                            <button className="w-4 h-4 flex justify-center items-center">
                                                <FaRegEdit
                                                    className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                                        }`}
                                                    onClick={() => {
                                                        if (data?.isActive === 1) {
                                                            getSingleTestApprovalMastertData(data?.id);
                                                            setIsEditData(true);
                                                        }
                                                    }}
                                                />

                                            </button>
                                            <button
                                                className={`w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                            >

                                                <ImSwitch className="w-full h-full"
                                                    onClick={() => {
                                                        setSingleTestApprovalMasterData(data);
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

            {
                imageView && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50"
                        >

                            <div className="flex flex-col items-center gap-5 my-2">

                                <div>
                                    {
                                        testMasterMasterApprovalData?.signature !== '' ?
                                            <img src={testMasterMasterApprovalData?.signature} alt="path not found" />
                                            :
                                            <img src={singleTestApprovalMasterData?.signature} alt="path not found" />
                                    }

                                </div>

                                <div>
                                    <button
                                        type="button"
                                        data-ripple-light="true"
                                        className="overflow-hidden relative border-[1.5px] w-16 h-8 rounded-md font-semibold text-textColor transition-all duration-300 text-sm "
                                        style={{
                                            borderImageSource: activeTheme?.menuColor,
                                            borderImageSlice: 1,
                                            borderRadius: '5px',
                                            overflow: 'hidden',
                                            WebkitMaskImage: 'radial-gradient(circle, white 90%, transparent 100%)', // Optional for additional support
                                        }}
                                        onClick={() => { setImageView(false), setSingleTestApprovalMasterData(null) }}
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }


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
                                    onClick={handelStatusUpdateTestApproval}>
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
