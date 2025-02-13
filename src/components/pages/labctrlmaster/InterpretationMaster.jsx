import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllDepartmentApi, getAllTestNameUsingDeptId, getCenterDataForReferanceRangeApi, saveInterpreationDataApi, updateInterPreationDataApi } from '../../../service/service';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import useRippleEffect from '../../customehook/useRippleEffect';



export default function InterpretationMaster() {
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    useRippleEffect();
    
    const [interpretationMasterData, setInterpretationMasterData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        itemId: 0,
        interpretation: '',
        centreId: 0,
        showInReport: 1,
        showinPackages: 1
    })
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [isHovered, setIsHovered] = useState(null);
    const [selectInterpreationMaster, setSelectInterpreationMaster] = useState({
        centreId: '',
        itemId: ''
    });
    const [department, setDepartment] = useState('');
    const [allcenterData, setAllCenterData] = useState([]);
    const [allDepartementData, setAllDepartementData] = useState([]);
    const [allTestName, setAllTestName] = useState([]);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [singleInterpreationData, setSingleInterpreationData] = useState('');
    const user = useSelector((state) => state.userSliceName?.user || null);


    useEffect(() => {
        const getCenterData = async () => {

            try {

                const response = await getCenterDataForReferanceRangeApi();
                setAllCenterData(response);

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getCenterData();

        const getAllDepartement = async () => {

            try {
                const response = await getAllDepartmentApi();
                setAllDepartementData(response);
            } catch (err) {
                toast.error(err?.message)
            }
        }
        getAllDepartement();



    }, [])


    useEffect(() => {
        const getAllTestName = async () => {
            try {
                const response = await getAllTestNameUsingDeptId(department);
                setAllTestName(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        if (department !== '') {
            getAllTestName();
        }
    }, [department])

    useEffect(() => {

        const getData = async () => {

            const response = await updateInterPreationDataApi(interpretationMasterData?.itemId, interpretationMasterData?.centreId);

            setInterpretationMasterData(response[0]);
            setSingleInterpreationData(response[0]);
            setContent(response[0]?.interpretation)

        }

        if (interpretationMasterData?.centreId !== 0 && department !== '' && interpretationMasterData?.itemId !== 0 && singleInterpreationData === '') {
            getData();
        }

    }, [interpretationMasterData])

    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }


    const handelOnChangeInterpretationMasterData = (event) => {

        setInterpretationMasterData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }


    const onSubmitSaveInterpretationData = async (event) => {
        event.preventDefault();
        setIsButtonClick(1);
        const updatedData = {
            ...interpretationMasterData,
            interpretation: content,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            showInReport: 1,
            showinPackages: 1
        }

        try {
            const response = await saveInterpreationDataApi(updatedData);

            if (response?.success) {

                toast.success(response?.message);

                setInterpretationMasterData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    itemId: 0,
                    interpretation: '',
                    centreId: 0,
                    showInReport: 0,
                    showinPackages: 0
                });

                setSelectInterpreationMaster({
                    centreId: '',
                    itemId: ''
                });

                setContent('');

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);

    }


    const onSubmitUpdateInterpretationData = async (event) => {
        event.preventDefault();
        setIsButtonClick(1);
        const updatedData = {
            ...interpretationMasterData,
            interpretation: content,
            updateById: parseInt(user?.employeeId),
            updateDateTime: new Date().toISOString(),
        }

        try {
            const response = await saveInterpreationDataApi(updatedData);

            if (response?.success) {

                toast.success(response?.message);

                setInterpretationMasterData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    itemId: 0,
                    interpretation: '',
                    centreId: 0,
                    showInReport: 1,
                    showinPackages: 1
                });

                setSelectInterpreationMaster({
                    centreId: '',
                    itemId: ''
                });

                setContent('');
                setSingleInterpreationData('')

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
    }

    const filterAllCentreData = allcenterData.filter((data) => (data?.companyName?.toLowerCase() || '').includes(String(selectInterpreationMaster?.centreId?.toLowerCase() || '')));


    const filterAllTestData = allTestName.filter((data) => (data?.itemName?.toLowerCase() || '').includes(String(selectInterpreationMaster?.itemId?.toLowerCase() || '')));


    return (
        <>

            {/* Header Section */}
            <div
                className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                style={{ background: activeTheme?.blockColor }}
            >
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                </div>
                <div>Interpretation Master</div>
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
                                value={selectInterpreationMaster?.centreId || interpretationMasterData?.centreId || ''}
                                onChange={(e) => {
                                    handelOnChangeInterpretationMasterData(e),
                                        setSelectInterpreationMaster((preventData) => ({
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
                                                        handelOnChangeInterpretationMasterData({
                                                            target: { name: 'centreId', value: data?.centreId },
                                                        });
                                                        setSelectInterpreationMaster((preventData) => ({
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


                    {/* Departement */}
                    <div className="relative flex-1">
                        <select
                            id="deptId"
                            value={department}
                            onChange={(event) => setDepartment(event.target.value)}
                            name='deptId'
                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                        // defaultValue=''
                        >
                            <option hidden className='text-gray-400'>
                                Select Option
                            </option>
                            {
                                allDepartementData?.map((data) => (
                                    <option key={data?.id} value={data?.id}>
                                        {data?.deptName}
                                    </option>
                                ))
                            }

                        </select>
                        <label htmlFor="title" className="menuPeerLevel">
                            Departement
                        </label>
                    </div>


                    {/* item name */}
                    <div className="relative flex-1 ">
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="itemId"
                                name="itemId"
                                value={selectInterpreationMaster?.itemId || interpretationMasterData?.itemId || ''}
                                onChange={(e) => {
                                    handelOnChangeInterpretationMasterData(e),
                                        setSelectInterpreationMaster((preventData) => ({
                                            ...preventData,
                                            itemId: ''
                                        }))
                                }}
                                onClick={() => openShowSearchBarDropDown(2)}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="itemId" className="menuPeerLevel">
                                Test Name
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 2 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>
                                        {filterAllTestData?.length > 0 ? (
                                            filterAllTestData?.map((data, index) => (
                                                <li
                                                    key={data?.itemId}
                                                    name="itemId"
                                                    className="my-1 px-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        openShowSearchBarDropDown(0);
                                                        handelOnChangeInterpretationMasterData({
                                                            target: { name: 'itemId', value: data?.itemId },
                                                        });
                                                        setSelectInterpreationMaster((preventData) => ({
                                                            ...preventData,
                                                            itemId: data?.itemName
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

                    <div className='flex gap-[0.25rem]'>
                        {/* Print on Report */}
                        <div className="relative flex-1">
                            <select
                                id="showInReport"
                                name='showInReport'
                                value={interpretationMasterData.showInReport}
                                onChange={handelOnChangeInterpretationMasterData}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option value="" disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            <label htmlFor="showInReport" className="menuPeerLevel">
                                Print on Report
                            </label>
                        </div>

                        {/* print on package */}
                        <div className="relative flex-1 ">

                            <select
                                id="showinPackages"
                                name='showinPackages'
                                value={interpretationMasterData.showinPackages}
                                onChange={handelOnChangeInterpretationMasterData}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option value="" disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            <label htmlFor="showinPackages" className="menuPeerLevel">
                                Print on Package
                            </label>

                        </div>
                    </div>

                    <div className='flex gap-[0.25rem]'>
                        <div className="relative flex-1 flex justify-start items-center">

                            {
                                singleInterpreationData === ''
                                    ?
                                    <button
                                        type="button"
                                        data-ripple-light="true"
                                        className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                        style={{
                                            background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                        }}
                                        onClick={onSubmitSaveInterpretationData}
                                    >

                                        {
                                            isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
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
                                        onClick={onSubmitUpdateInterpretationData}
                                    >

                                        {
                                            isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Update'
                                        }

                                    </button>
                            }


                        </div>
                        <div className="relative flex-1 flex justify-start items-center">
                        </div>
                    </div>

                </div>


                <div className='mt-2 mb-1  mx-1 lg:mx-2'>
                    <JoditEditor
                        ref={editor}
                        value={content}

                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { setContent(newContent) }}
                    />

                </div>
            </form>
        </>
    );
}
