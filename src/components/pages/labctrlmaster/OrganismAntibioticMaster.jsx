import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { formulaOrganismAnitibioticHeaderMicroTypeAntibiotic, formulaOrganismAnitibioticHeaderMicroTypeOrganism, organismAntibioticMasterTagPopupHeader } from '../../listData/listData';
import { IoMdCloseCircleOutline, IoMdMenu } from 'react-icons/io';
import { IoAddCircleOutline, IoAlertCircleOutline } from 'react-icons/io5';
import { ImSwitch } from 'react-icons/im'
import toast from 'react-hot-toast';
import { filterDataOrganismAntibioticMasterApi, getAllOrganismAntibioticMaster, getAllOrganismAntibioticTagMasterApi, getgetSingleOrganismAntibioticMasterApi, saveOrganismAntiBioticMaster, saveOrganismAntiBioticMasterTagPopupApi, updateStatusOrganismAntibioticMasterApi } from '../../../service/service';
import { FaRegEdit, FaSpinner } from 'react-icons/fa';
import useRippleEffect from '../../customehook/useRippleEffect';

export default function OrganismAntibioticMaster() {

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    useRippleEffect();

    const [organismAntibioticMasterData, setOrganismAntibioticMasterData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        organismAntibiotic: '',
        machineCode: '',
        microType: 1
    });

    const [isButtonClick, setIsButtonClick] = useState(0);
    // const [allOrganismAntibioticMaster, setAllOrganismAntibioticMaster] = useState([]);
    const [allFilterOrganismAntibioticMaster, setAllFilterOrganismAntibioticMaster] = useState([]);
    const [getSingleOrganismData, setGetSingleOrganismData] = useState([]);
    const [filterOrganismData, setFilterOrganismData] = useState({
        microType: 1,
        isActive: 1
    })
    const [isEditData, setIsEditData] = useState(false);

    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [allTagPopupData, setAllTagPopupData] = useState([]);

    const [showPopup, setShowPopup] = useState({
        showTagPopup: false,
        showActivePopup: false
    })


    const handelOnChangeOrganismAntibioticMaster = (event) => {
        setOrganismAntibioticMasterData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }

    //save data
    const handelOnSubmitOrganismAntibioticMaster = async (event) => {

        event.preventDefault();
        setIsButtonClick(1);

        const updateData = {
            ...organismAntibioticMasterData,
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            microType: parseInt(organismAntibioticMasterData?.microType)
        }

        try {

            const response = await saveOrganismAntiBioticMaster(updateData);

            if (response?.success) {
                toast.success(response?.message);
                setOrganismAntibioticMasterData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    organismAntibiotic: '',
                    machineCode: '',
                    microType: 0
                })
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message)
        }
        setIsButtonClick(0);
    }

    //get all data
    useEffect(() => {

        const getAllData = async () => {

            // const response = await getAllOrganismAntibioticMaster();
            // //setAllOrganismAntibioticMaster(response);
            // setAllFilterOrganismAntibioticMaster(response);

            const response = await filterDataOrganismAntibioticMasterApi(parseInt(filterOrganismData?.microType), parseInt(filterOrganismData?.isActive));

            if (response.length !== 0) {
                setAllFilterOrganismAntibioticMaster(response);
            } else {
                toast.error('Data not found');
                setAllFilterOrganismAntibioticMaster(response);
            }
        }
        getAllData();

    }, [isButtonClick])

    //update status
    const updateStatusOrganismAntibiotic = async () => {

        setIsButtonClick(2);

        try {

            const status = getSingleOrganismData?.isActive === 1 ? 0 : 1;

            const response = await updateStatusOrganismAntibioticMasterApi(getSingleOrganismData?.id, status, parseInt(user?.employeeId));

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message)
        }

        setShowPopup((preveData) => ({
            ...preveData,
            showActivePopup: false
        }));

        setIsButtonClick(0);
    }

    //get single data
    const getgetSingleOrganismAntibioticMaster = async (id) => {

        try {
            const response = await getgetSingleOrganismAntibioticMasterApi(id);
            setOrganismAntibioticMasterData(response[0]);
        } catch (error) {
            toast.error(error?.message);
        }
    }

    //filter data
    const handelOnChangeFilterData = (event) => {

        setFilterOrganismData((preveData) => ({
            ...preveData,
            [event.target.name]: event.target.value
        }))

    }

    useEffect(() => {

        const getFilterData = async () => {
            const response = await filterDataOrganismAntibioticMasterApi(parseInt(filterOrganismData?.microType), parseInt(filterOrganismData?.isActive));

            if (response.length !== 0) {
                setAllFilterOrganismAntibioticMaster(response);
            } else {
                toast.error('Data not found');
                setAllFilterOrganismAntibioticMaster(response);
            }
        }

        getFilterData();

    }, [filterOrganismData])


    //get all tag data
    const openTagPopupWithData = async (id) => {

        try {

            const response = await getAllOrganismAntibioticTagMasterApi(id);

            if (response?.success) {
                setAllTagPopupData(response?.data)
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

    }

    //handel check box in table
    const handleCheckboxChangeForRowTable = (event, id, field) => {
        const { checked } = event.target; // Get the checked status
        const updatedData = allTagPopupData.map((row) =>
            row.id === id
                ? { ...row, [field]: checked ? "1" : "0" } // Update the specified field
                : row
        );
        setAllTagPopupData(updatedData); // Update the state with modified data
    };

    //save the data for update
    const saveTheTapPopupData = async () => {
        // event.preventDefault();
        /*
        {
    "isActive": 0,
    "createdById": 0,
    "createdDateTime": "2025-01-29T11:06:52.295Z",
    "updateById": 0,
    "updateDateTime": "2025-01-29T11:06:52.295Z",
    "id": 0,
    "organismId": 0,
    "antibiticId": 0,
    "centreId": 0
  }
        */


        setIsButtonClick(3);
        const updatedGridData = allTagPopupData?.filter((data) => data?.mapped === '1')?.map((item) => ({
            // ...item,
            id: 0,
            isActive: 1,
            organismId: getSingleOrganismData?.id,
            antibiticId: item?.id,
            centreId: 1,
            createdDateTime: new Date().toISOString(),
            createdById: parseInt(user?.employeeId),
            updateById: 0,
            updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        }));

        try {

            const response = await saveOrganismAntiBioticMasterTagPopupApi(updatedGridData);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
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
                    <div>Organism Antibiotic</div>
                </div>

                {/* form data */}
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

                        <div className='relative flex-1'>

                            <select
                                id="microType"
                                name='microType'
                                value={organismAntibioticMasterData?.microType}
                                onChange={handelOnChangeOrganismAntibioticMaster}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

                            // defaultValue={""}
                            >
                                <option value={""} disabled hidden className='text-gray-400'>
                                    Select Micro Type
                                </option>
                                <option value={1}>Organism</option>
                                <option value={2}>Antibiotic</option>

                            </select>
                            <label htmlFor="microType" className="menuPeerLevel">
                                Micro Type
                            </label>
                        </div>

                        {/* Organism Antibiotic */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="organismAntibiotic"
                                name="organismAntibiotic"
                                value={organismAntibioticMasterData.organismAntibiotic}
                                onChange={handelOnChangeOrganismAntibioticMaster}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="organismAntibiotic" className="menuPeerLevel">
                                Organism Antibiotic
                            </label>
                        </div>

                        {/* Machine Code */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="machineCode"
                                name="machineCode"
                                value={organismAntibioticMasterData.machineCode}
                                onChange={handelOnChangeOrganismAntibioticMaster}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="machineCode" className="menuPeerLevel">
                                Machine Code
                            </label>
                        </div>


                        <div className='flex gap-[0.25rem] items-center'>

                            <div className="relative flex-1">

                                <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    style={{
                                        background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    }}
                                    onClick={handelOnSubmitOrganismAntibioticMaster}
                                >

                                    {
                                        isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : isEditData ? 'Update' : 'Save'
                                    }
                                </button>

                            </div>

                            <div className="relative flex-1">
                            </div>
                        </div>

                        <div className="relative flex-1 md:block hidden"></div>

                        <div className='flex  gap-[0.25rem] items-center'>
                            <div className='relative flex-1'>
                                <select
                                    id="microType"
                                    name='microType'
                                    value={filterOrganismData.microType}
                                    onChange={handelOnChangeFilterData}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

                                // defaultValue={""}
                                >
                                    <option value={""} disabled hidden className='text-gray-400'>
                                        Filter Micro Type
                                    </option>
                                    <option value={1}>Organism</option>
                                    <option value={2}>Antibiotic</option>
                                </select>
                                <label htmlFor="microType" className="menuPeerLevel">
                                    Micro Type
                                </label>
                            </div>

                            <div className='relative flex-1'>

                                <select
                                    id="isActive"
                                    name='isActive'
                                    value={filterOrganismData.isActive}
                                    onChange={handelOnChangeFilterData}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

                                // defaultValue={""}
                                >
                                    <option value={""} disabled hidden className='text-gray-400'>
                                        Filter by Status
                                    </option>
                                    {/* <option value="all">All</option> */}
                                    <option value={1}>Active</option>
                                    <option value={0}>Deactive</option>
                                </select>
                                <label htmlFor="isActive" className="menuPeerLevel">
                                    Filter Active
                                </label>
                            </div>
                        </div>
                    </div>
                </form>

            </div>


            {/* grid data */}
            <div>
                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold text-textColor border-b"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Organism Antibiotic Details</div>
                </div>


                {/* templateMasterHeader */}
                {
                    allFilterOrganismAntibioticMaster.length !== 0 && (
                        <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                            <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                                <tr>
                                    {

                                        filterOrganismData?.microType === 1
                                            ?
                                            formulaOrganismAnitibioticHeaderMicroTypeOrganism?.map((data, index) => (
                                                <td
                                                    key={index}
                                                    className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                    style={{
                                                        width: index === 0 ? "80px" : "auto", // Set a smaller width for the first row
                                                    }}
                                                >
                                                    {data}
                                                </td>

                                            ))
                                            :
                                            formulaOrganismAnitibioticHeaderMicroTypeAntibiotic?.map((data, index) => (
                                                <td
                                                    key={index}
                                                    className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                    style={{
                                                        width: index === 0 ? "80px" : "auto", // Set a smaller width for the first row
                                                    }}
                                                >
                                                    {data}
                                                </td>

                                            ))
                                    }

                                </tr>
                            </thead>

                            {/* <tbody>
                        <tr
                        // className={`cursor-pointer 
                        //     ${isHoveredTable === index
                        //         ? ''
                        //         : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                        //     }`}
                        // key={index}
                        // onMouseEnter={() => setIsHoveredTable(index)}
                        // onMouseLeave={() => setIsHoveredTable(null)}
                        // style={{
                        //     background:
                        //         isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                        // }}

                        >
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                {1}
                            </td>
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                {1}
                            </td>
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                {1}
                            </td>
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                {1}
                            </td>
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                {1}
                            </td>
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                <button type='button' className="w-4 h-4 flex justify-center items-center">
                                    <IoAddCircleOutline
                                        className={`w-full h-full text-blue-500 cursor-pointer "text-gray-400 cursor-not-allowed"
                                            }`}
                                        onClick={() => {
                                            setShowPopup((...prevData) => ({
                                                ...prevData,
                                                showTagPopup: true
                                            }))
                                        }}
                                    />

                                </button>
                            </td>
                        </tr>
                    </tbody> */}

                            <tbody>

                                {

                                    allFilterOrganismAntibioticMaster?.map((data, index) => {

                                        return (
                                            <tr
                                                className={`cursor-pointer 
                                        ${isHoveredTable === index ? '' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
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

                                                    {data?.microType === parseInt(1) ? 'Organism' : 'Antibiotic'}
                                                </td>

                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {data?.organismAntibiotic}
                                                </td>

                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {data?.machineCode}
                                                </td>

                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor flex gap-1">
                                                    <button className="w-4 h-4 flex justify-center items-center">
                                                        <FaRegEdit
                                                            className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                                                }`}
                                                            onClick={() => {
                                                                if (data?.isActive === 1) {
                                                                    getgetSingleOrganismAntibioticMaster(data?.id);
                                                                    setIsEditData(true);
                                                                }
                                                            }}
                                                        />

                                                    </button>
                                                    <button
                                                        className={`w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'} `}
                                                    >

                                                        <ImSwitch className="w-full h-full"
                                                            onClick={() => {
                                                                setGetSingleOrganismData(data);
                                                                setShowPopup((preventData) => ({
                                                                    ...preventData,
                                                                    showActivePopup: true
                                                                }))
                                                            }}
                                                        />

                                                    </button>
                                                </td>
                                                {
                                                    filterOrganismData?.microType === 1 && (
                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">

                                                            <button type='button' className="w-4 h-4 flex justify-center items-center">
                                                                <IoAddCircleOutline
                                                                    className={`w-full h-full text-blue-500 cursor-pointer "text-gray-400 cursor-not-allowed"
                                                }`}
                                                                    onClick={() => {
                                                                        setShowPopup((...prevData) => ({
                                                                            ...prevData,
                                                                            showTagPopup: true
                                                                        }));

                                                                        setGetSingleOrganismData(data);

                                                                        openTagPopupWithData(data?.id);

                                                                    }}
                                                                />

                                                            </button>
                                                        </td>
                                                    )
                                                }

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    )
                }

            </div>


            {
                showPopup?.showTagPopup === true && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50 py-8">

                        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50 py-8">
                            <div className="border-[1px] w-[30%] mx-20 flex flex-col max-h-[83%] shadow-2xl bg-white rounded-md animate-slideDown z-50 ">

                                <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md mb-1"
                                    style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                                >
                                    <div className="font-semibold" style={{ color: activeTheme?.iconColor }}>
                                        {getSingleOrganismData?.organismAntibiotic}
                                    </div>
                                    <IoMdCloseCircleOutline
                                        className="text-xl cursor-pointer"
                                        style={{ color: activeTheme?.iconColor }}
                                        onClick={() => { setShowPopup((preveData) => ({ ...preveData, showTagPopup: false })); setAllTagPopupData([]); setGetSingleOrganismData([]) }}
                                    />
                                </div>

                                <div className="max-h-[20rem] overflow-y-auto ml-1">
                                    <table className="table-auto border-collapse w-full text-xxs text-left">
                                        <thead
                                            className="sticky top-0 bg-gray-100 z-10"
                                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                        >
                                            <tr>
                                                {organismAntibioticMasterTagPopupHeader?.map((data, index) => (
                                                    <th
                                                        key={index}
                                                        className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                        style={{ width: index === 0 || index === 1 ? "30px" : "auto" }}
                                                    >
                                                        {data}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allTagPopupData?.map((data, index) => (
                                                <tr
                                                    key={index}
                                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                                >
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        <input type="checkbox"
                                                            name='mapped'
                                                            checked={data?.mapped === "1"} // Checked if isHeader is not 0
                                                            onChange={(e) => handleCheckboxChangeForRowTable(e, data?.id, "mapped")}
                                                            className="cursor-pointer flex items-center" />
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {data?.id}
                                                    </td>
                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {data?.antibiotic}
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className='flex justify-end mr-2 mb-2'>
                                    <button type="button"
                                        data-ripple-light="true"
                                        className='relative overflow-hidden text-sm mt-2 w-20 h-8 text-center rounded-md font-semibold' style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                        onClick={() => saveTheTapPopupData()}
                                    >{
                                            isButtonClick === 3 ?
                                                <FaSpinner className="w-full h-full animate-spin text-textColor" />
                                                :
                                                'Save'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                )
            }

            {
                showPopup?.showActivePopup === true && (
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
                                        onClick={() => setShowPopup((preveData) => ({
                                            ...preveData,
                                            showActivePopup: false
                                        }))}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={updateStatusOrganismAntibiotic}>
                                    <div>
                                        {
                                            isButtonClick === 2 ?
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
