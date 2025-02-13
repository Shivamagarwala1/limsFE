import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomeEditor from '../../sharecomponent/CustomeEditor';
import { commentMasterHeader } from '../../listData/listData';
import toast from 'react-hot-toast';
import { getAllCommentMasterData, getAllItemObservationApi, getCenterDataForReferanceRangeApi, getSingleCommentDataApi, saveCommentMasterDataApi, updateStatusCommentMasterData } from '../../../service/service';
import { FaRegEdit, FaSpinner } from 'react-icons/fa';
import { ImSwitch } from 'react-icons/im';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useRippleEffect from '../../customehook/useRippleEffect';

export default function CommentMaster() {
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    useRippleEffect();

    const [commentMasterData, setCommentMasterData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        type: 'Item Wise',
        itemId: 0,
        centreId: 0,
        observationId: 0,
        templateName: '',
        template: ''
    })
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [allObservationData, setAllObservationData] = useState([]);
    const [allCommentData, setAllCommentData] = useState([]);
    const [allCenterData, setAllCenterData] = useState([]);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const [selectedObseravation, setselectedObseravation] = useState('');
    const [SeleteItemType, setSeleteItemType] = useState('');
    const [selectCentre, setSelectCentre] = useState('');
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isEditData, setIsEditData] = useState(false);
    const [singleCommentData, setSingleCommentData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // New: State for editor content
    const [editorContent, setEditorContent] = useState("");


    useEffect(() => {

        const getAllData = async () => {
            try {

                const response = await getAllItemObservationApi(commentMasterData?.type === 'Item Wise' ? 3 : 1);
                if (response?.success) {
                    setAllObservationData(response?.data)
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllData();

    }, [commentMasterData?.type])



    useEffect(() => {


        const getCenterData = async () => {

            try {
                const response = await getCenterDataForReferanceRangeApi();
                setSelectCentre(response[0]?.companyName)
                setCommentMasterData((preventData) => ({
                    ...preventData,
                    centreId: response[0]?.centreId
                }))
                setAllCenterData(response);
            } catch (error) {
                toast.error(error?.message);
            }

        }
        getCenterData();



    }, [isButtonClick])


    //get comment data
    useEffect(() => {
        const getAllCmtData = async () => {

            // Extract necessary data
            const centerId = commentMasterData?.centreId;
            const type = commentMasterData?.type;

            const itemType = commentMasterData?.type === 'Item Wise' ? commentMasterData?.itemId === '' ? 0 : commentMasterData?.itemId : commentMasterData?.observationId === '' ? 0 : commentMasterData?.observationId;

            // Fetch data
            const response = await getAllCommentMasterData(centerId, type, itemType);

            // Uncomment below if needed
            setAllCommentData(response?.data);
        };

        // Ensure all conditions are satisfied before calling the function
        if (commentMasterData?.centreId !== 0 && commentMasterData?.type !== '' && (commentMasterData?.itemType !== 0 || commentMasterData?.observationId !== 0)) {
            getAllCmtData();
        }
    }, [
        commentMasterData?.centreId,
        commentMasterData?.type,
        commentMasterData?.itemId,
        commentMasterData?.observationId,
    ]);


    const handeleOnChangeCommentMasterData = (event) => {

        setCommentMasterData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }



    //accept child to parent in editor
    const handleContentChange = (content) => {
        // Update editor content
        setCommentMasterData((preventDefault) => ({
            ...preventDefault,
            template: content
        }))
        //setEditorContent(content);

    };


    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }


    const onSubmitSaveCommentMasterData = async () => {

        setIsButtonClick(1);

        const updatedData = {
            ...commentMasterData,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            isActive: 1
        }

        try {
            const response = await saveCommentMasterDataApi(updatedData);
            if (response?.success) {
                toast.success(response?.message);

                setCommentMasterData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    type: 'Item Wise',
                    itemId: 0,
                    observationId: 0,
                    templateName: '',
                    centreId: 0,
                    template: ''
                });
                setEditorContent(""); // Clear the editor

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(toast?.message)

        }

        setIsButtonClick(0);
    }


    //get single data
    const getSingleCommentData = async (id) => {

        try {
            const response = await getSingleCommentDataApi(id);

            setCommentMasterData(response[0]);
            setEditorContent(response[0]?.template)
            setselectedObseravation(allObservationData?.filter((data) => data?.id === response[0]?.id)[0]?.labObservationName)
            setSeleteItemType(allObservationData?.filter((data) => data?.id === response[0]?.id)[0]?.labObservationName)
        } catch (error) {
            toast.error(error?.message);
        }
    }


    //update the data
    const onSubmitUpdateCommentMasterData = async () => {

        setIsButtonClick(1);

        const updatedData = {
            ...commentMasterData,
            updateById: parseInt(user?.employeeId),
            updateDateTime: new Date().toISOString(),
        }

        try {
            const response = await saveCommentMasterDataApi(updatedData);
            if (response?.success) {
                toast.success(response?.message);

                setCommentMasterData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    type: 'Item Wise',
                    itemId: 0,
                    observationId: 0,
                    centreId: 0,
                    templateName: '',
                    template: ''
                });
                setEditorContent(""); // Clear the editor

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(toast?.message)
        }

        setIsButtonClick(0);
        setIsEditData(false);
    }

    //update the status
    const handleTheUpdateStatus = async () => {

        setIsButtonClick(3);

        const activeStatus = singleCommentData?.isActive === 1 ? 0 : 1;

        try {

            const response = await updateStatusCommentMasterData(singleCommentData?.id, activeStatus, user?.employeeId);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setShowPopup(false);
        setSingleCommentData(null);
        setIsButtonClick(0);
    }

    const filterAllObseravationData = allObservationData?.filter((data) => (data?.labObservationName?.toLowerCase() || '').includes(String(selectedObseravation?.toLowerCase() || '')));

    const filterAllCentreData = allCenterData?.filter((data) => (data?.companyName?.toLowerCase() || '').includes(String(selectCentre?.toLowerCase() || '')));

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
                    <div>Comment Master</div>
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
                                    value={selectCentre || commentMasterData?.centreId || ''}
                                    onChange={(e) => {
                                        handeleOnChangeCommentMasterData(e),
                                            setSelectCentre('')
                                    }}
                                    onClick={() => openShowSearchBarDropDown(2)}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="centreId" className="menuPeerLevel">
                                    Centre Name
                                </label>

                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 2 && (
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
                                                            handeleOnChangeCommentMasterData({
                                                                target: { name: 'centreId', value: data?.centreId },
                                                            });
                                                            setSelectCentre(data?.companyName)
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


                        {/*  type of wise */}
                        <div className="relative flex-1">
                            <select
                                id="type"
                                value={commentMasterData.type}
                                onChange={handeleOnChangeCommentMasterData}
                                name='type'
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option value="Item Wise">
                                    Test Wise
                                </option>
                                <option value="Observation  Wise">
                                    Observation  Wise
                                </option>
                            </select>
                            <label htmlFor="type" className="menuPeerLevel">
                                Type Of Wise
                            </label>
                        </div>



                        {/* comment name */}
                        <div className="relative flex-1 ">
                            <input
                                type="text"
                                id="templateName"
                                name="templateName"
                                value={commentMasterData.templateName}
                                onChange={handeleOnChangeCommentMasterData}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="templateName" className="menuPeerLevel">
                                Comment Name
                            </label>
                        </div>



                        {
                            commentMasterData?.type === "Item Wise" ? (

                                <div className="relative flex-1 ">
                                    <div className="relative flex-1">
                                        <input
                                            type="search"
                                            id="itemId"
                                            name="itemId"
                                            value={SeleteItemType || commentMasterData?.itemId || ''}
                                            onChange={(e) => {
                                                handeleOnChangeCommentMasterData(e),
                                                    setSeleteItemType(e.target.value);
                                            }}
                                            onClick={() => openShowSearchBarDropDown(1)}

                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="itemId" className="menuPeerLevel">
                                            Test Name
                                        </label>

                                        {/* Dropdown to select the menu */}
                                        {showSearchBarDropDown === 1 && (
                                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                                <ul>
                                                    {filterAllObseravationData?.length > 0 ? (
                                                        filterAllObseravationData?.map((data, index) => (
                                                            <li
                                                                key={data?.id}
                                                                name="itemId"
                                                                className="my-1 px-2 cursor-pointer"
                                                                onClick={(e) => {
                                                                    openShowSearchBarDropDown(0);
                                                                    handeleOnChangeCommentMasterData({
                                                                        target: { name: 'itemId', value: data?.id },
                                                                    });
                                                                    setSeleteItemType(data?.labObservationName
                                                                    )
                                                                }}
                                                                onMouseEnter={() => setIsHovered(index)}
                                                                onMouseLeave={() => setIsHovered(null)}
                                                                style={{
                                                                    background:
                                                                        isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                                }}
                                                            >
                                                                {data?.labObservationName}
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
                            ) : (
                                // Observation Dropdown

                                <div className="relative flex-1 ">
                                    <div className="relative flex-1">
                                        <input
                                            type="search"
                                            id="observationId"
                                            name="observationId"
                                            value={selectedObseravation || commentMasterData?.observationId || ''}
                                            onChange={(e) => {
                                                handeleOnChangeCommentMasterData(e),
                                                    setselectedObseravation(e.target.value);
                                            }}
                                            onClick={() => openShowSearchBarDropDown(1)}

                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="observationId" className="menuPeerLevel">
                                            Observation
                                        </label>

                                        {/* Dropdown to select the menu */}
                                        {showSearchBarDropDown === 1 && (
                                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                                <ul>
                                                    {filterAllObseravationData?.length > 0 ? (
                                                        filterAllObseravationData?.map((data, index) => (
                                                            <li
                                                                key={data?.id}
                                                                name="selectedObseravation"
                                                                className="my-1 px-2 cursor-pointer"
                                                                onClick={(e) => {
                                                                    openShowSearchBarDropDown(0);
                                                                    handeleOnChangeCommentMasterData({
                                                                        target: { name: 'observationId', value: data?.id },
                                                                    });
                                                                    setselectedObseravation(data?.labObservationName
                                                                    )
                                                                }}
                                                                onMouseEnter={() => setIsHovered(index)}
                                                                onMouseLeave={() => setIsHovered(null)}
                                                                style={{
                                                                    background:
                                                                        isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                                }}
                                                            >
                                                                {data?.labObservationName}
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
                            )
                        }





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
                                            onClick={onSubmitUpdateCommentMasterData}
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
                                            onClick={onSubmitSaveCommentMasterData}
                                        >

                                            {
                                                isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save Comment'
                                            }

                                        </button>
                                }

                            </div>
                            <div className="relative flex-1 flex justify-start items-center">
                            </div>
                        </div>


                    </div>
                    <div className='w-full h-[0.10rem] mt-1' style={{ background: activeTheme?.menuColor }}></div>
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
            </div>

            <div>
                {
                    allCommentData?.length !== 0 && (
                        <>
                            <div className='w-full h-[0.10rem] mt-1' style={{ background: activeTheme?.menuColor }}></div>
                            <div
                                className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                                style={{ background: activeTheme?.blockColor }}
                            >
                                <div>
                                    <FontAwesomeIcon icon="fa-solid fa-house" />
                                </div>
                                <div>Comment Details</div>
                            </div>


                            <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                                <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                                    <tr>
                                        {

                                            commentMasterHeader.map((data, index) => (
                                                <td
                                                    key={index}
                                                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                                                    style={index === 2 ? { width: '20%' } : undefined} // Apply width conditionally
                                                >
                                                    {data}
                                                </td>
                                            ))
                                        }

                                    </tr>
                                </thead>


                                <tbody>

                                    {

                                        allCommentData?.map((data, index) => {

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
                                                        {data?.type}
                                                    </td>

                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {data?.itemName}
                                                    </td>

                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                        {data?.templateName}
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
                                                        <button type="button"
                                                            data-ripple-light="true" className="relative overflow-hidden w-4 h-4 flex justify-center items-center">
                                                            <FaRegEdit
                                                                className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                                                    }`}
                                                                onClick={() => {
                                                                    if (data?.isActive === 1) {
                                                                        getSingleCommentData(data?.id);
                                                                        setIsEditData(true);
                                                                    }
                                                                }}
                                                            />

                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-ripple-light="true"
                                                            className={`relative overflow-hidden   w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'
                                                                }`}
                                                        >

                                                            <ImSwitch className="w-full h-full"
                                                                onClick={() => {
                                                                    setSingleCommentData(data);
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
                        </>

                    )
                }
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
