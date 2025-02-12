import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getAllItemNameApi, getAllTemplateMasterDataApi, getCenterDataForReferanceRangeApi, getSingleTemplateDataApi, saveTemplateMasterDataApi, updateStatusCommentMasterDataApi } from '../../../service/service';
import { gendersInLabTestMaster, templateMasterHeader } from '../../listData/listData';
import CustomeEditor from '../../sharecomponent/CustomeEditor';
import { FaRegEdit, FaSpinner } from 'react-icons/fa';
import { ImSwitch } from 'react-icons/im';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useRippleEffect from '../../customehook/useRippleEffect';

export default function TemplateMaster() {
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    useRippleEffect();

    const [templateMasterData, setTemplateMasterData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        itemId: 0,
        template: '',
        centreId: 0,
        gender: '',
        name: ''
    })
    const [selectedTemplateMasterData, setSelectedTemplateMasterData] = useState({
        centreId: '',
        itemId: ''
    });
    const [allTemplateMasterData, setAllTemplateMasterData] = useState([]);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [allCenterData, setAllCenterData] = useState([]);
    const [allTestNameData, setAllTestName] = useState([]);
    const [singleTemplateData, setSingleTemplateData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isEditData, setIsEditData] = useState(false);
    const [isHovered, setIsHovered] = useState(null);
    const [editorContent, setEditorContent] = useState("");
    const [isButtonClick, setIsButtonClick] = useState(0);

    const handelOnChangeTemplateMasterData = (event) => {
        setTemplateMasterData((preventData) => ({
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
                setSelectedTemplateMasterData((preventData) => ({
                    ...preventData,
                    centreId: response[0]?.companyName
                }))
                setTemplateMasterData((preventData) => ({
                    ...preventData,
                    centreId: response[0]?.centreId
                }))
                setAllCenterData(response);
            } catch (error) {
                toast.error(error?.message);
            }

        }
        getCenterData();


        const getTestData = async () => {

            try {
                const response = await getAllItemNameApi();

                if (response?.success) {
                    setSelectedTemplateMasterData((preventData) => ({
                        ...preventData,
                        itemId: response?.data[0]?.itemName
                    }))
                    setTemplateMasterData((preventData) => ({
                        ...preventData,
                        itemId: response?.data[0]?.itemId
                    }))
                    setAllTestName(response?.data);
                }


            } catch (error) {
                toast.error(error?.message);
            }

        }
        getTestData();



    }, [isButtonClick])



    useEffect(() => {

        const getAllTemplateMasterData = async () => {

            try {
                const centreId = templateMasterData?.centreId === '' ? 0 : templateMasterData?.centreId
                const itemId = templateMasterData?.itemId === '' ? 0 : templateMasterData?.itemId;

                const response = await getAllTemplateMasterDataApi(centreId, itemId);
                if (response?.success) {
                    setAllTemplateMasterData(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }


        getAllTemplateMasterData();

    }, [templateMasterData?.centreId, templateMasterData?.itemId, isButtonClick])


    //accept child to parent in editor
    const handleContentChange = (content) => {
        // Update editor content
        setTemplateMasterData((preventDefault) => ({
            ...preventDefault,
            template: content
        }))
        //setEditorContent(content);

    };


    //save template master
    const onSubmitTemplateMasterData = async () => {
        setIsButtonClick(1);

        const updatedFormData = {
            ...templateMasterData,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            isActive: 1
        }

        try {

            const response = await saveTemplateMasterDataApi(updatedFormData);

            if (response?.success) {
                toast.success(response?.message);
                setTemplateMasterData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    itemId: 0,
                    template: '',
                    centreId: 0,
                    gender: '',
                    name: ''
                })
                setEditorContent('');
            } else {
                toast.error(response?.message)

            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);

    }

    //update the status
    const handleTheUpdateStatus = async () => {

        setIsButtonClick(3);

        const activeStatus = singleTemplateData?.isActive === 1 ? 0 : 1;

        try {

            const response = await updateStatusCommentMasterDataApi(singleTemplateData?.id, activeStatus, user?.employeeId);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setShowPopup(false);
        setSingleTemplateData(null);
        setIsButtonClick(0);
    }

    //get single data
    const getSingleTemplatetData = async (id) => {

        try {
            const response = await getSingleTemplateDataApi(id);

            setTemplateMasterData(response[0]);
            setEditorContent(response[0]?.template)
            // setSelectedTemplateMasterData(allObservationData?.filter((data) => data?.id === response[0]?.id)[0]?.labObservationName)
        } catch (error) {
            toast.error(error?.message);
        }
    }

    //update data
    const onSubmitUpdateTemplateMasterData = async () => {
        setIsButtonClick(1);

        const updatedFormData = {
            ...templateMasterData,
            updateById: parseInt(user?.employeeId),
            updateDateTime: new Date().toISOString(),
        }




        try {

            const response = await saveTemplateMasterDataApi(updatedFormData);

            if (response?.success) {
                toast.success(response?.message);
                setTemplateMasterData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    itemId: 0,
                    template: '',
                    centreId: 0,
                    gender: '',
                    name: ''
                })
                setEditorContent('');
            } else {
                toast.error(response?.message)

            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
    }

    const filterAllCentreData = allCenterData?.filter((data) => (data?.companyName?.toLowerCase() || '').includes(String(selectedTemplateMasterData?.centreId?.toLowerCase() || '')));


    const filterAllItemData = allTestNameData?.filter((data) => (data?.itemName?.toLowerCase() || '').includes(String(selectedTemplateMasterData?.itemId?.toLowerCase() || '')));


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
                <div>Template Master</div>
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
                                value={selectedTemplateMasterData?.centreId || templateMasterData?.centreId || ''}
                                onChange={(e) => {
                                    handelOnChangeTemplateMasterData(e),
                                        setSelectedTemplateMasterData((preventData) => ({
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
                                                        handelOnChangeTemplateMasterData({
                                                            target: { name: 'centreId', value: data?.centreId },
                                                        });
                                                        setSelectedTemplateMasterData((preventData) => ({
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

                    {/* template name */}
                    <div className="relative flex-1 ">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={templateMasterData.name}
                            onChange={handelOnChangeTemplateMasterData}
                            placeholder=" "
                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                        />
                        <label htmlFor="name" className="menuPeerLevel">
                            Template Name
                        </label>
                    </div>


                    {/* test name */}
                    <div className="relative flex-1 ">
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="itemId"
                                name="itemId"
                                value={selectedTemplateMasterData?.itemId || templateMasterData?.itemId || ''}
                                onChange={(e) => {
                                    handelOnChangeTemplateMasterData(e),
                                        setSelectedTemplateMasterData((preventData) => ({
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
                                        {filterAllItemData?.length > 0 ? (
                                            filterAllItemData?.map((data, index) => (
                                                <li
                                                    key={data?.itemId}
                                                    name="itemId"
                                                    className="my-1 px-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        openShowSearchBarDropDown(0);
                                                        handelOnChangeTemplateMasterData({
                                                            target: { name: 'itemId', value: data?.itemId },
                                                        });
                                                        setSelectedTemplateMasterData((preventData) => ({
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


                    {/* Gender */}
                    <div className="relative flex-1 ">
                        <select
                            id="gender"
                            value={templateMasterData.gender}
                            onChange={handelOnChangeTemplateMasterData}
                            name='gender'
                            // defaultValue=''
                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                        >
                            <option hidden className='text-gray-400'>
                                Select Option
                            </option>
                            {
                                gendersInLabTestMaster?.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))
                            }
                        </select>
                        <label htmlFor="gender" className="menuPeerLevel">
                            Gender
                        </label>
                    </div>


                    <div className='flex gap-[0.25rem]'>
                        <div className="relative flex-1 flex justify-start items-center">
                            {
                                isEditData ?
                                    <button
                                        type="button"
                                        data-ripple-light="true"
                                        className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                        style={{
                                            background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                        }}
                                        onClick={onSubmitUpdateTemplateMasterData}
                                    >

                                        {
                                            isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Update Template'
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
                                        onClick={onSubmitTemplateMasterData}
                                    >

                                        {
                                            isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save Template'
                                        }

                                    </button>

                            }

                        </div>
                        <div className="relative flex-1 flex justify-start items-center">
                        </div>
                    </div>

                </div>
                <div className='w-full h-[0.10rem] ' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold mb-2"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                    </div>
                    <div>Type Message</div>
                </div>
                {/* editor */}
                <CustomeEditor
                    value={editorContent} // Controlled value for the editor
                    onContentChange={handleContentChange} />

            </form >


            {/* table data */}
            {
                allTemplateMasterData?.length !== 0 && (

                    <div>
                        <div className='w-full h-[0.10rem] mt-1' style={{ background: activeTheme?.menuColor }}></div>
                        <div
                            className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                            style={{ background: activeTheme?.blockColor }}
                        >
                            <div>
                                <FontAwesomeIcon icon="fa-solid fa-house" />
                            </div>
                            <div>Template Details</div>
                        </div>



                        {/* templateMasterHeader */}
                        <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                            <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                                <tr>
                                    {

                                        templateMasterHeader?.map((data, index) => (
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
                                    allTemplateMasterData?.map((data, index) => {

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

                                                    {data?.companyName}
                                                </td>

                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {data?.itemName}
                                                </td>

                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {data?.name}
                                                </td>


                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {data?.gender}
                                                </td>

                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: (() => {
                                                                // Create a temporary element to strip HTML tags
                                                                const tempElement = document.createElement("div");
                                                                tempElement.innerHTML = data?.template || "";

                                                                // Extract plain text
                                                                const plainText = tempElement.textContent || tempElement.innerText || "";

                                                                // Truncate and return HTML-safe text
                                                                return plainText.length > 40
                                                                    ? `${plainText.substring(0, 40)}...`
                                                                    : plainText;
                                                            })(),
                                                        }}
                                                    ></div>
                                                </td>

                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor flex gap-1">
                                                    <button className="w-4 h-4 flex justify-center items-center">
                                                        <FaRegEdit
                                                            className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                                                }`}
                                                            onClick={() => {
                                                                if (data?.isActive === 1) {
                                                                    getSingleTemplatetData(data?.id);
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
                                                                setSingleTemplateData(data);
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
