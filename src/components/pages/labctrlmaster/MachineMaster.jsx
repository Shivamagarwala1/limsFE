import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllGridMachineMasterApi, getAllItemObservationApi, getAllMachineMasterDataApi, getCenterDataForReferanceRangeApi, getSingleMachineMasterDataApi, saveMachineMasterPopupApi, saveParamasMachineMasterDataApi } from '../../../service/service';
import { IoMdCloseCircleOutline, IoMdMenu } from 'react-icons/io';
import toast from 'react-hot-toast';
import { FaRegEdit, FaSpinner } from 'react-icons/fa';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { machineMasterHeaderData } from '../../listData/listData';
import { ImSwitch } from 'react-icons/im';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useRippleEffect from '../../customehook/useRippleEffect';

export default function MachineMaster() {


    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);
    useRippleEffect();

    const [machineMasterData, setMachineMasterData] = useState({
        centreId: 0,
        machineId: 0,
    })
    const [selectMachinelMasterData, setSelectMachinelMasterData] = useState({
        centreId: '',
        machineId: '',
    })

    const [saveMachinePopupData, setSaveMachinePopupData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        machineName: '',
        machineType: '',
        centreId: 0,
        referRange: 0,
        comPort: '',
        boundRate: 32000,
        dataBit: 0,
        stopBit: 0,
        parity: '',
        machinePortNo: 0,
        machineIP: ''
    });

    const [addParamasPopupData, setAddParamasPopupData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        machineId: 0,
        assay: '',
        labTestID: 0,
        isOrderable: 1,
        formula: '',
        roundUp: 0,
        multiplication: 0,
        suffix: ''
    });

    const [selectAddParams, setSelectAddParams] = useState({
        machineId: ''
    });

    const [selectMachinePopupData, setSelectMachinePopupData] = useState({
        centreId: '',
        referRange: ''
    })
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [allCenterData, setAllCenterData] = useState([]);
    const [allMachineData, setAllMachineData] = useState([]);
    const [allObseravationData, setAllObseravationData] = useState([]);
    const [allGridMachineMaster, setAllGridMachineMaster] = useState([]);
    const [testMappingData, setTestMapping] = useState({
        observation: []
    });
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const [showPopup, setShowPopup] = useState(0);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [singleTemplateData, setSingleTemplateData] = useState(null);
    const [isEditData, setIsEditData] = useState(false);

    const handelOnChnageTestApproveMaster = (event) => {

        setMachineMasterData((...preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))

    }

    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }

    useEffect(() => {

        const getCenterData = async () => {

            try {
                const response = await getCenterDataForReferanceRangeApi();

                setSelectMachinelMasterData((preventData) => ({
                    ...preventData,
                    centreId: response[0]?.companyName
                }))

                setAllCenterData(response);

            } catch (error) {

                toast.error(error?.message);
            }

        }
        getCenterData();


        const getAllMachine = async () => {

            try {

                const response = await getAllMachineMasterDataApi();
                setAllMachineData(response);
                setSelectMachinelMasterData((preventData) => ({
                    ...preventData,
                    machineId: response[0]?.machineName
                }))

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllMachine();

        const getAllItemObservation = async () => {
            try {
                const response = await getAllItemObservationApi(1);
                if (response?.success) {
                    setAllObseravationData(response?.data);
                }

            } catch (error) {
                toast.error(error?.message)
            }
        }
        getAllItemObservation();
    }, [])


    const handeleOnChnageForSaveMachinePopup = (event) => {
        setSaveMachinePopupData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


    //save machine master popup data
    const handelOnSubmitMachinePopupData = async (event) => {
        event.preventDefault();
        setIsButtonClick(1);

        let updatedData = {
            ...saveMachinePopupData,
            createdById: parseInt(user?.employeeId),
            isActive: 1,
            createdDateTime: new Date().toISOString(),
            boundRate: parseInt(saveMachinePopupData?.boundRate),
            dataBit: parseInt(saveMachinePopupData?.dataBit),
            stopBit: parseInt(saveMachinePopupData?.stopBit),
            machinePortNo: parseInt(saveMachinePopupData?.machinePortNo),
        }

        try {

            const response = await saveMachineMasterPopupApi(updatedData);

            if (response?.success) {
                toast.success(response?.message);
                setSaveMachinePopupData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    machineName: '',
                    machineType: '',
                    centreId: 0,
                    referRange: 0,
                    comPort: '',
                    boundRate: 32000,
                    dataBit: 0,
                    stopBit: 0,
                    parity: '',
                    machinePortNo: 0,
                    machineIP: ''
                })
                setSelectMachinePopupData({
                    centreId: '',
                    referRange: ''
                })
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
    }


    //params
    const handelOnChnageForAddParams = (event) => {
        setAddParamasPopupData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


    const handleCheckboxChange = (e, data) => {
        const isChecked = e.target.checked;

        setTestMapping((prevData) => {

            const updatedAccess = [...prevData.observation];

            if (isChecked) {

                const updatedItem = {

                    id: data?.id,
                    observation: data?.id,
                    labObservationName: data?.labObservationName
                };

                updatedAccess.push(updatedItem);

            } else {
                // Remove the department data
                const index = updatedAccess.findIndex(
                    (item) => item?.id === data?.id
                );
                if (index !== -1) {
                    updatedAccess.splice(index, 1);
                }
            }

            return {
                ...prevData,
                observation: updatedAccess,
            };
        });

    };


    const handelOnSubmitParamasData = async (event) => {

        event.preventDefault();

        setIsButtonClick(2);

        let listOfAddParamasPopupData = [];

        testMappingData?.observation?.forEach((item) => {
            listOfAddParamasPopupData.push({
                isActive: 1,
                createdById: parseInt(user?.employeeId),
                createdDateTime: new Date().toISOString(),
                updateById: 0,
                updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                id: 0,
                machineId: parseInt(addParamasPopupData.machineId),
                assay: addParamasPopupData.assay,
                labTestID: item?.id, // Update labTestID with the current item's id
                isOrderable: parseInt(addParamasPopupData?.isOrderable),
                formula: addParamasPopupData?.formula,
                roundUp: parseInt(addParamasPopupData?.roundUp),
                multiplication: parseInt(addParamasPopupData?.multiplication),
                suffix: addParamasPopupData?.suffix,
            });
        });

        try {

            const response = await saveParamasMachineMasterDataApi(listOfAddParamasPopupData);

            if (response?.success) {
                toast.success(response?.message);
                setAddParamasPopupData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    machineId: 0,
                    assay: '',
                    labTestID: 0,
                    isOrderable: 1,
                    formula: '',
                    roundUp: 0,
                    multiplication: 0,
                    suffix: ''
                })
                listOfAddParamasPopupData = [];
                setTestMapping({ ...testMappingData, observation: [] })
                setSelectAddParams({
                    machineId: ''
                })
            } else {
                toast.error(response?.message);
            }


        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
    }


    useEffect(() => {

        const getAllData = async () => {

            try {
                const response = await getAllGridMachineMasterApi();

                if (response?.success) {
                    setAllGridMachineMaster(response?.data)
                }

            } catch (error) {
                toast.error(error?.message)
            }
        }
        getAllData();

    }, [isButtonClick])


    //update the status
    const handleTheUpdateStatus = async () => {

        setIsButtonClick(3);

        const activeStatus = singleTemplateData?.isActive === 1 ? 0 : 1;

        try {

            const response = await updateStatusCommentMasterDataApi(singleTemplateData?.id, activeStatus, singleTemplateData?.createdById);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setShowPopup(0);
        setSingleTemplateData(null);
        setIsButtonClick(0);
    }


    //get single data
    const getSingleTemplatetData = async (assay) => {

        try {

            const response = await getSingleMachineMasterDataApi(assay);

            const allObservationDataList = [];

            response.forEach((item) => {
                const allObserData = allObseravationData.filter((data) => data?.id === item?.labTestID);
                allObservationDataList.push(...allObserData); // Collect all matching data
            });

            // Update the state once after the loop
            setTestMapping((prevData) => ({
                ...prevData,
                observation: allObservationDataList, // Combine all data into the observation array
            }));

            setAddParamasPopupData(response[0]);
            setSelectAddParams((preventData) => ({
                ...preventData,
                machineId: allMachineData?.filter((item) => item?.id === response[0]?.machineId)[0]?.machineName
            }))
        } catch (error) {
            toast.error(error?.message);
        }
    }


    //update data
    const handelOnUpdateParamasData = async (event) => {

        event.preventDefault();

        setIsButtonClick(2);

        let listOfAddParamasPopupData = [];

        testMappingData?.observation?.forEach((item) => {
            listOfAddParamasPopupData.push({
                isActive: 1,
                createdById: parseInt(user?.employeeId),
                createdDateTime: new Date().toISOString(),
                updateById: 0,
                updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                id: 0,
                machineId: parseInt(addParamasPopupData.machineId),
                assay: addParamasPopupData.assay,
                labTestID: item?.id, // Update labTestID with the current item's id
                isOrderable: parseInt(addParamasPopupData?.isOrderable),
                formula: addParamasPopupData?.formula,
                roundUp: parseInt(addParamasPopupData?.roundUp),
                multiplication: parseInt(addParamasPopupData?.multiplication),
                suffix: addParamasPopupData?.suffix,
            });
        });


        try {

            const response = await saveParamasMachineMasterDataApi(listOfAddParamasPopupData);

            if (response?.success) {
                toast.success(response?.message);
                setAddParamasPopupData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    machineId: 0,
                    assay: '',
                    labTestID: 0,
                    isOrderable: 1,
                    formula: '',
                    roundUp: 0,
                    multiplication: 0,
                    suffix: ''
                })
                listOfAddParamasPopupData = [];
                setTestMapping({ ...testMappingData, observation: [] })
                setSelectAddParams({
                    machineId: ''
                })

            } else {
                toast.error(response?.message);
            }


        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
    }


    const filterAllCentreData = allCenterData?.filter((data) => (data?.companyName?.toLowerCase() || '').includes(String(selectMachinelMasterData?.centreId?.toLowerCase() || '')));

    const filterAllMachineData = allMachineData?.filter((data) => (data?.machineName?.toLowerCase() || '').includes(String(selectMachinelMasterData?.machineId?.toLowerCase() || '')));


    const filterAllMachineDataForPopup = allMachineData?.filter((data) => (data?.machineName?.toLowerCase() || '').includes(String(saveMachinePopupData?.machineName?.toLowerCase() || '')));

    //referance range
    const filterAllReferanceRangeForPopup = allMachineData?.filter((data) => (data?.machineName?.toLowerCase() || '').includes(String(selectMachinePopupData?.referRange?.toLowerCase() || '')));


    const filterAllCentreDataForPopup = allCenterData?.filter((data) => (data?.companyName?.toLowerCase() || '').includes(String(selectMachinePopupData?.centreId?.toLowerCase() || '')));



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
                    <div>Machine Master</div>
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
                                    value={selectMachinelMasterData?.centreId || machineMasterData?.centreId || ''}
                                    onChange={(e) => {
                                        handelOnChnageTestApproveMaster(e),
                                            setSelectMachinelMasterData((preventData) => ({
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
                                                            setSelectMachinelMasterData((preventData) => ({
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


                        {/* Machine name */}
                        <div className="relative flex-1 ">
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="machineId"
                                    name="machineId"
                                    value={selectMachinelMasterData?.machineId || machineMasterData?.machineId || ''}
                                    onChange={(e) => {
                                        handelOnChnageTestApproveMaster(e),
                                            setSelectMachinelMasterData((preventData) => ({
                                                ...preventData,
                                                machineId: ''
                                            }))
                                    }}
                                    onClick={() => openShowSearchBarDropDown(2)}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="machineId" className="menuPeerLevel">
                                    Machine Name
                                </label>

                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 2 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>
                                            {filterAllMachineData?.length > 0 ? (
                                                filterAllMachineData?.map((data, index) => (
                                                    <li
                                                        key={data?.id}
                                                        name="machineId"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChnageTestApproveMaster({
                                                                target: { name: 'machineId', value: data?.id },
                                                            });
                                                            setSelectMachinelMasterData((preventData) => ({
                                                                ...preventData,
                                                                machineId: data?.machineName
                                                            }))
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {data?.machineName}
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

                        {/* save data */}
                        <div className='flex gap-[0.25rem]'>

                            <div className="relative flex-1">

                                <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`relative overflow-hidden 
                                    font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    style={{
                                        background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    }}
                                    onClick={() => setShowPopup(1)}
                                >
                                    Add Machine
                                </button>

                            </div>

                            <div className="relative flex-1">

                                <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    style={{
                                        background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    }}
                                    onClick={() => setShowPopup(2)}
                                >
                                    Add Params
                                </button>

                            </div>

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
                    <div>Machine Details</div>
                </div>



                {/* templateMasterHeader */}
                <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                    <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <tr>
                            {

                                machineMasterHeaderData?.map((data, index) => (
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
                            allGridMachineMaster?.map((data, index) => {

                                return (
                                    <tr
                                        className={`cursor-pointer 
                                                        ${isHoveredTable === index
                                                ? ''
                                                : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                            }`}
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

                                            {data?.machineName}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.suffix}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.assay}
                                        </td>


                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.roundUp}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.isOrderable}
                                        </td>



                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.testName}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor flex gap-1">
                                            <button className="w-4 h-4 flex justify-center items-center">
                                                <FaRegEdit
                                                    className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                                        }`}
                                                    onClick={() => {
                                                        if (data?.isActive === 1) {
                                                            getSingleTemplatetData(data?.assay);
                                                            setIsEditData(true);
                                                            setShowPopup(2)
                                                        }
                                                    }}
                                                />

                                            </button>
                                            {/* <button
                                                className={`w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                            >

                                                <ImSwitch className="w-full h-full"
                                                    onClick={() => {
                                                        setSingleTemplateData(data);
                                                        setShowPopup(3);
                                                    }}
                                                />

                                            </button> */}
                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>


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
                                    Create Machine
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

                                    {/* machine type */}
                                    <div className="relative flex-1 ">

                                        <select
                                            id="machineType"
                                            name='machineType'
                                            value={saveMachinePopupData.machineType}
                                            onChange={handeleOnChnageForSaveMachinePopup}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option value="" disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value={"Serial Port"}>Serial Port</option>
                                            <option value={"Com Port"}>Com Port</option>
                                        </select>
                                        <label htmlFor="machineType" className="menuPeerLevel">
                                            Machine Type
                                        </label>
                                    </div>


                                    {/* Machine name */}
                                    <div className="relative flex-1 ">
                                        <div className="relative flex-1">
                                            <input
                                                type="search"
                                                id="machineName"
                                                name="machineName"
                                                value={saveMachinePopupData?.machineName || ''}
                                                onChange={(e) =>
                                                    handeleOnChnageForSaveMachinePopup(e)
                                                }
                                                // onClick={() => openShowSearchBarDropDown(3)}

                                                placeholder=" "
                                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                                            />
                                            <label htmlFor="machineName" className="menuPeerLevel">
                                                Machine Name
                                            </label>


                                        </div>
                                    </div>

                                    {/* centre name */}
                                    <div className="relative flex-1 ">
                                        <div className="relative flex-1">
                                            <input
                                                type="search"
                                                id="centreId"
                                                name="centreId"
                                                value={selectMachinePopupData?.centreId || saveMachinePopupData?.centreId || ''}
                                                onChange={(e) => {
                                                    handeleOnChnageForSaveMachinePopup(e),
                                                        setSelectMachinePopupData((preventData) => ({
                                                            ...preventData,
                                                            centreId: ''
                                                        }))
                                                }}
                                                onClick={() => openShowSearchBarDropDown(4)}

                                                placeholder=" "
                                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                                            />
                                            <label htmlFor="centreId" className="menuPeerLevel">
                                                Centre Name
                                            </label>

                                            {/* Dropdown to select the menu */}
                                            {showSearchBarDropDown === 4 && (
                                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                                    <ul>
                                                        {filterAllCentreDataForPopup?.length > 0 ? (
                                                            filterAllCentreDataForPopup?.map((data, index) => (
                                                                <li
                                                                    key={data?.centreId}
                                                                    name="centreId"
                                                                    className="my-1 px-2 cursor-pointer"
                                                                    onClick={(e) => {
                                                                        openShowSearchBarDropDown(0);
                                                                        handeleOnChnageForSaveMachinePopup({
                                                                            target: { name: 'centreId', value: data?.centreId },
                                                                        });
                                                                        setSelectMachinePopupData((preventData) => ({
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

                                    {/* referance range */}
                                    <div className="relative flex-1 ">
                                        <div className="relative flex-1">
                                            <input
                                                type="search"
                                                id="referRange"
                                                name="referRange"
                                                value={selectMachinePopupData?.referRange || saveMachinePopupData?.referRange || ''}
                                                onChange={(e) => {
                                                    handeleOnChnageForSaveMachinePopup(e),
                                                        setSelectMachinePopupData((preventData) => ({
                                                            ...preventData,
                                                            referRange: ''
                                                        }))
                                                }
                                                }
                                                onClick={() => openShowSearchBarDropDown(5)}

                                                placeholder=" "
                                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                                            />
                                            <label htmlFor="referRange" className="menuPeerLevel">
                                                Refer Range
                                            </label>

                                            {/* Dropdown to select the menu */}
                                            {showSearchBarDropDown === 5 && (
                                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                                    <ul>
                                                        {filterAllReferanceRangeForPopup?.length > 0 ? (
                                                            filterAllReferanceRangeForPopup?.map((data, index) => (
                                                                <li
                                                                    key={data?.id}
                                                                    name="referRange"
                                                                    className="my-1 px-2 cursor-pointer"
                                                                    onClick={(e) => {
                                                                        openShowSearchBarDropDown(0);
                                                                        handeleOnChnageForSaveMachinePopup({
                                                                            target: { name: 'referRange', value: data?.id },
                                                                        });
                                                                        setSelectMachinePopupData((preventData) => ({
                                                                            ...preventData,
                                                                            referRange: data?.machineName
                                                                        }))
                                                                    }}
                                                                    onMouseEnter={() => setIsHovered(index)}
                                                                    onMouseLeave={() => setIsHovered(null)}
                                                                    style={{
                                                                        background:
                                                                            isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                                    }}
                                                                >
                                                                    {data?.machineName}
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


                                    {/* comPort */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="comPort"
                                            name="comPort"
                                            value={saveMachinePopupData.comPort || ''}
                                            onChange={handeleOnChnageForSaveMachinePopup}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="comPort" className="menuPeerLevel">
                                            COM Port No.
                                        </label>
                                    </div>


                                    {/* boundRate */}

                                    <div className="relative flex-1 ">

                                        <select
                                            id="boundRate"
                                            name='boundRate'
                                            value={saveMachinePopupData.boundRate}
                                            onChange={handeleOnChnageForSaveMachinePopup}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option value="" disabled className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value={32000}>32000</option>
                                            <option value={64000}>64000</option>
                                            <option value={96000}>96000</option>
                                        </select>
                                        <label htmlFor="boundRate" className="menuPeerLevel">
                                            Bound Rate
                                        </label>
                                    </div>


                                    {/* data bit */}
                                    <div className="relative flex-1 ">

                                        <select
                                            id="dataBit"
                                            name='dataBit'
                                            value={saveMachinePopupData.dataBit}
                                            onChange={handeleOnChnageForSaveMachinePopup}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option value="" disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value={0}>0</option>
                                            <option value={8}>8</option>
                                            <option value={16}>16</option>
                                            <option value={32}>32</option>
                                        </select>
                                        <label htmlFor="dataBit" className="menuPeerLevel">
                                            Data Bit
                                        </label>
                                    </div>


                                    {/* stop bit */}
                                    <div className="relative flex-1 ">

                                        <select
                                            id="stopBit"
                                            name='stopBit'
                                            value={saveMachinePopupData.stopBit}
                                            onChange={handeleOnChnageForSaveMachinePopup}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option value="" disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                        </select>
                                        <label htmlFor="stopBit" className="menuPeerLevel">
                                            Stop Bit
                                        </label>
                                    </div>


                                    {/* Parity */}
                                    <div className="relative flex-1 ">

                                        <select
                                            id="parity"
                                            name='parity'
                                            value={saveMachinePopupData.parity}
                                            onChange={handeleOnChnageForSaveMachinePopup}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option value="" disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value={"none"}>None</option>
                                            <option value={"one"}>One</option>
                                        </select>
                                        <label htmlFor="parity" className="menuPeerLevel">
                                            Parity
                                        </label>
                                    </div>

                                    {/* machinePortNo */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="number"
                                            id="machinePortNo"
                                            name="machinePortNo"
                                            value={saveMachinePopupData.machinePortNo || ''}
                                            onChange={handeleOnChnageForSaveMachinePopup}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="machinePortNo" className="menuPeerLevel">
                                            Machine Port No
                                        </label>
                                    </div>


                                    {/* machineIP */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="machineIP"
                                            name="machineIP"
                                            value={saveMachinePopupData.machineIP || ''}
                                            onChange={handeleOnChnageForSaveMachinePopup}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="machineIP" className="menuPeerLevel">
                                            Machine IP
                                        </label>
                                    </div>




                                    <div className="flex items-stretch  text-white  rounded-md"
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <button type="button"
                                            data-ripple-light="true"
                                            className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer"
                                            onClick={handelOnSubmitMachinePopupData}
                                        >
                                            {
                                                isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                            }
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                )
            }


            {
                showPopup === 2 && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-96 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Create Params
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

                                    {/* Machine name */}
                                    <div className="relative flex-1">
                                        <input
                                            type="search"
                                            id="machineId"
                                            name="machineId"
                                            value={selectAddParams?.machineId || addParamasPopupData?.machineId || ''}
                                            onChange={(e) => {
                                                handelOnChnageForAddParams(e),
                                                    setSelectAddParams((preventData) => ({
                                                        ...preventData,
                                                        machineId: ''
                                                    }))
                                            }}
                                            onClick={() => openShowSearchBarDropDown(6)}

                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="machineId" className="menuPeerLevel">
                                            Machine Name
                                        </label>

                                        {/* Dropdown to select the menu */}
                                        {showSearchBarDropDown === 6 && (
                                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                                <ul>
                                                    {filterAllMachineDataForPopup?.length > 0 ? (
                                                        filterAllMachineDataForPopup?.map((data, index) => (
                                                            <li
                                                                key={data?.id}
                                                                name="machineId"
                                                                className="my-1 px-2 cursor-pointer"
                                                                onClick={(e) => {
                                                                    openShowSearchBarDropDown(0);
                                                                    handelOnChnageForAddParams({
                                                                        target: { name: 'machineId', value: data?.id },
                                                                    });
                                                                    setSelectAddParams((preventData) => ({
                                                                        ...preventData,
                                                                        machineId: data?.machineName
                                                                    }))
                                                                }}
                                                                onMouseEnter={() => setIsHovered(index)}
                                                                onMouseLeave={() => setIsHovered(null)}
                                                                style={{
                                                                    background:
                                                                        isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                                }}
                                                            >
                                                                {data?.machineName}
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

                                    {/* assay */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="assay"
                                            name="assay"
                                            value={addParamasPopupData.assay}
                                            onChange={handelOnChnageForAddParams}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="assay" className="menuPeerLevel">
                                            Assay No.
                                        </label>
                                    </div>


                                    {/* suffix */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="suffix"
                                            name="suffix"
                                            value={addParamasPopupData.suffix}
                                            onChange={handelOnChnageForAddParams}
                                            placeholder=" "
                                            maxLength={2}
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="suffix" className="menuPeerLevel">
                                            Suffix
                                        </label>
                                    </div>


                                    {/* roundUp */}
                                    <div className="relative flex-1 ">
                                        <select
                                            id="roundUp"
                                            name='roundUp'
                                            value={addParamasPopupData.roundUp}
                                            onChange={handelOnChnageForAddParams}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option value="" disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                        </select>
                                        <label htmlFor="roundUp" className="menuPeerLevel">
                                            RoundUp
                                        </label>
                                    </div>


                                    {/* formula */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="formula"
                                            name="formula"
                                            value={addParamasPopupData.formula}
                                            onChange={handelOnChnageForAddParams}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="formula" className="menuPeerLevel">
                                            Formula
                                        </label>
                                    </div>

                                    {/* isOrderable */}
                                    <div className="relative flex-1">
                                        <select
                                            id="isOrderable"
                                            name='isOrderable'
                                            value={addParamasPopupData.isOrderable}
                                            onChange={handelOnChnageForAddParams}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option value="" disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value={1}>Yes</option>
                                            <option value={0}>No</option>
                                        </select>
                                        <label htmlFor="isOrderable" className="menuPeerLevel">
                                            Orderable
                                        </label>
                                    </div>

                                    {/* observation */}
                                    <div className="relative flex-1">
                                        <div
                                            className={`flex peer items-center border-[1.5px] 
                                                                                       border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
                                            onClick={() => showSearchBarDropDown !== 7 ? openShowSearchBarDropDown(7) : openShowSearchBarDropDown(0)}
                                        >
                                            <input
                                                type="text"
                                                id="labTestID"
                                                name="labTestID"
                                                value={
                                                    testMappingData.observation.length === 0
                                                        ? ''
                                                        : testMappingData.observation
                                                            .map((data) => data?.id)
                                                            .join(', ')
                                                }
                                                readOnly
                                                //onChange={handelOnChangeTestMappingData}
                                                placeholder="Search labTestID"
                                                className={`w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none`}
                                            />
                                            <label htmlFor="labTestID" className="menuPeerLevel">
                                                Observation
                                            </label>

                                            <div>
                                                {
                                                    showSearchBarDropDown === 7 ? <RiArrowDropUpLine className='text-xl cursor-pointer' /> : <RiArrowDropDownLine className='text-xl cursor-pointer' />
                                                }
                                            </div>
                                        </div>

                                        {/* Dropdown to select the menu */}
                                        {showSearchBarDropDown === 7 && (
                                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-32 w-full bg-white overflow-y-auto text-xxxs">

                                                {

                                                    <ul className='w-full'>

                                                        {/* Individual Checkboxes */}
                                                        {allObseravationData?.length > 0 ? (
                                                            allObseravationData?.map((data, index) => {

                                                                return (
                                                                    <li
                                                                        key={data?.id}
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
                                                                                checked={testMappingData?.observation?.some((item) => item?.id === data?.id)}
                                                                                onChange={(e) => handleCheckboxChange(e, data)}
                                                                            />
                                                                        </div>
                                                                        <div>{data?.labObservationName}</div>
                                                                    </li>
                                                                )
                                                            })
                                                        ) : (
                                                            <li className="py-4 text-gray-500 text-center">
                                                                {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                                                            </li>
                                                        )}
                                                    </ul>
                                                }



                                            </div>
                                        )}
                                    </div>


                                    <div className="flex items-stretch  text-white  rounded-md"
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        {
                                            isEditData ?
                                                <button type="button"
                                                    data-ripple-light="true"
                                                    className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer"
                                                    onClick={handelOnUpdateParamasData}
                                                >
                                                    {
                                                        isButtonClick === 2 ? <FaSpinner className='text-xl animate-spin' /> : 'Update'
                                                    }
                                                </button>
                                                :
                                                <button type="button"
                                                    data-ripple-light="true"
                                                    className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer"
                                                    onClick={handelOnSubmitParamasData}
                                                >
                                                    {
                                                        isButtonClick === 2 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                                    }
                                                </button>
                                        }

                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                )
            }


            {/* popup for active and deactive status */}
            {
                showPopup === 3 && (
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
                                        onClick={() => setShowPopup(0)}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={handleTheUpdateStatus}>
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
