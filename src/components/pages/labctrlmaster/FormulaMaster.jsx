import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { formulaMasterHeader } from '../../listData/listData';
import { IoMdMenu } from 'react-icons/io';
import toast from 'react-hot-toast';
import { getAllObservationData, getAllProfileDataBasedOnItemType, getCalCulatorData, saveFormulaMasterData } from '../../../service/service';
import { FaSpinner } from 'react-icons/fa';
import useRippleEffect from '../../customehook/useRippleEffect';

export default function FormulaMaster() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);
    useRippleEffect();

    const [formulaMasterData, setFormulaMasterData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        itemId: 0,
        observationId: 0,
        formula: '',
        formulaText: ''
    });
    const [selectedFormulaMaster, setSelectedFormulaMaster] = useState({
        itemId: '',
        observationId: ''
    })
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [content, setContent] = useState("");
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [allProfileData, setAllProfileData] = useState([]);
    const [allObservationData, setAllObservationData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isAlreadyExit, setIsAlreadyExit] = useState(false);

    const specialSymbols = new Set(["+", "-", "*", "/", "%", "(", ")", "^", ".", "X"]);

    const handleButtonClick = (text) => {

        setContent((prevContent) => {

            const prevString = String(prevContent ?? ""); // Ensure it's a string

            if (text === "X") {
                // If "X" is clicked, remove the last character
                // return prevString.slice(0, -1);
                return '';
            }
            const lastChar = prevString.slice(-1); // Get last character

            if (specialSymbols.has(lastChar) && specialSymbols.has(text)) {
                return prevString; // Prevent adding consecutive special symbols
            }
            return prevString + text; // Append normally
        });

        setSelectedId((prevContent) => {

            let prevString = String(prevContent ?? ""); // Ensure it's a string

            if (text === "X") {
                // If "X" is clicked, remove the last character
                // return prevString.slice(0, -1);
                return '';
            }

            const lastChar = prevString.slice(-1); // Get last character

            // Prevent consecutive special symbols (excluding "X")
            if (specialSymbols.has(lastChar) && specialSymbols.has(text) && text !== "X") {
                return prevString; // Keep previous state
            }

            // Only store special symbols (excluding numbers & letters)
            return specialSymbols.has(text) ? prevString + text : prevString;

        });
    };


    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }


    useEffect(() => {

        const getAllProfileData = async () => {

            try {
                const response = await getAllProfileDataBasedOnItemType();
                setAllProfileData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }

        getAllProfileData();

    }, [])

    useEffect(() => {

        const getAllData = async () => {

            // try {
            const response = await getAllObservationData(formulaMasterData?.itemId ? formulaMasterData?.itemId : 0);

            if (response?.success) {
                setAllObservationData(response?.data);
            } else {
                toast.error(response?.message);
            }

            // } catch (error) {
            //     toast.error(error?.message)
            // }

        }

        if (formulaMasterData?.itemId !== 0 || formulaMasterData?.itemId !== '') {
            getAllData()
        }

    }, [formulaMasterData?.itemId])


    useEffect(() => {

        const getAllData = async () => {

            const response = await getCalCulatorData(formulaMasterData?.itemId, formulaMasterData?.observationId);

            if (response.length !== 0) {
                setContent(response[0]?.formulaText)
                setIsAlreadyExit(true);
            }

        }

        if (formulaMasterData?.itemId !== 0 && formulaMasterData?.observationId !== 0) {
            getAllData();
        }

    }, [formulaMasterData?.itemId, formulaMasterData?.observationId])

    const handelOnChnageFormulaMasterData = (event) => {
        setFormulaMasterData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmitSaveFormulaMasterData = async () => {

        setIsButtonClick(1);
        const updatedData = {
            ...formulaMasterData,
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            itemId: formulaMasterData?.itemId,
            observationId: formulaMasterData?.observationId,
            formula: selectedId,
            formulaText: content
        }

        try {
            const response = await saveFormulaMasterData(updatedData);

            if (response?.success) {
                toast.success(response?.message);

                setFormulaMasterData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    itemId: 0,
                    observationId: 0,
                    formula: ''
                });

                setContent('');
                setSelectedId(null);

                setSelectedFormulaMaster({
                    itemId: '',
                    observationId: ''
                })

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }
        setIsButtonClick(0);
    }

    const filterAllProfileData = allProfileData?.filter((data) =>
        (data?.itemName?.toLowerCase() || '').includes(String(selectedFormulaMaster?.itemId || '').toLowerCase())
    );


    const filterAllObservationData = allObservationData?.filter((data) =>
        (data?.labObservationName?.toLowerCase() || '').includes(String(selectedFormulaMaster?.observationId || '').toLowerCase())
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
                    <div>Formula Master</div>
                </div>

                <form autoComplete="off">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-2 my-1">
                        {/* centre name */}
                        <div className="relative flex-1 ">
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="itemId"
                                    name="itemId"
                                    value={selectedFormulaMaster?.itemId || formulaMasterData?.itemId || ''}
                                    onChange={(e) => {
                                        // handelOnChnageFormulaMasterData(e),
                                        setSelectedFormulaMaster((preventData) => ({
                                            ...preventData,
                                            itemId: e.target.value
                                        }))
                                    }}
                                    onClick={() => openShowSearchBarDropDown(1)}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="itemId" className="menuPeerLevel">
                                    Profile
                                </label>

                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 1 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>
                                            {filterAllProfileData?.length > 0 ? (
                                                filterAllProfileData?.map((data, index) => (
                                                    <li
                                                        key={data?.itemId}
                                                        name="itemId"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChnageFormulaMasterData({
                                                                target: { name: 'itemId', value: data?.itemId },
                                                            });
                                                            setSelectedFormulaMaster((preventData) => ({
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


                        {/* centre name */}
                        <div className="relative flex-1 ">
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="observationId"
                                    name="observationId"
                                    value={selectedFormulaMaster?.observationId || formulaMasterData?.observationId || ''}
                                    onChange={(e) => {
                                        // handelOnChnageFormulaMasterData(e),
                                        setSelectedFormulaMaster((preventData) => ({
                                            ...preventData,
                                            observationId: e.target.value
                                        }))
                                    }}
                                    onClick={() => openShowSearchBarDropDown(2)}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="observationId" className="menuPeerLevel">
                                    Observation
                                </label>

                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 2 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>
                                            {filterAllObservationData?.length > 0 ? (
                                                filterAllObservationData?.map((data, index) => (

                                                    <li
                                                        key={data?.id}
                                                        name="observationId"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChnageFormulaMasterData({
                                                                target: { name: 'observationId', value: data?.id },
                                                            });
                                                            setSelectedFormulaMaster((preventData) => ({
                                                                ...preventData,
                                                                observationId: data?.labObservationName
                                                            }))
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


                        {/* save data */}

                        <div className='flex gap-[0.25rem] items-center'>

                            <div className="relative flex-1">

                                <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    style={{
                                        background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    }}
                                    onClick={onSubmitSaveFormulaMasterData}
                                >
                                    {
                                        isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                    }
                                </button>

                            </div>

                            <div className="relative flex-1">
                            </div>
                        </div>
                    </div>
                </form >
            </div>

            <div>

                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Formula Details</div>
                </div>

                <div className='grid grid-cols-12 gap-1'>
                    {/* grid data */}
                    <div className='col-span-9'>
                        <div className="max-h-[22rem] overflow-y-auto ">

                            {selectedFormulaMaster?.observationId !== '' && (
                                <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
                                    <thead
                                        className="sticky top-0 bg-gray-100"
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <tr>
                                            {formulaMasterHeader?.map((data, index) => (
                                                <td
                                                    key={index}
                                                    className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                    style={{ width: index === 0 ? "50px" : "auto" }}
                                                >
                                                    {data}
                                                </td>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-y-auto max-h-80 w-full">
                                        {allObservationData?.filter((item) => item?.id !== formulaMasterData?.observationId).map((data, index) => (
                                            <tr
                                                className={`cursor-pointer ${isHoveredTable === index ? '' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                                    }`}
                                                key={index}
                                                onMouseEnter={() => setIsHoveredTable(index)}
                                                onMouseLeave={() => setIsHoveredTable(null)}
                                                style={{
                                                    background: isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                                                }}
                                                onClick={() => {
                                                    if (isAlreadyExit) {
                                                        setContent('');
                                                        setIsAlreadyExit(false);
                                                        setContent((preventData) => preventData + data?.labObservationName)
                                                    } else {
                                                        handleButtonClick(data?.labObservationName);

                                                    }
                                                    setSelectedId((prevData) => String(prevData ?? '') + data?.id);

                                                }}
                                            >
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {data?.id}
                                                </td>
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {data?.labObservationName}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}


                        </div>
                    </div>

                    {/* calculator */}
                    <div className="col-span-3 mr-1 h-full mt-[0.20rem] border-[1px] rounded-lg shadow-xl">
                        <div
                            // contentEditable={true}

                            className="outline-none border-b-[1px] shadow h-36 overflow-y-auto overflow-x-hidden relative p-1 text-left space-y-2 rounded-lg"
                            suppressContentEditableWarning
                            dangerouslySetInnerHTML={{ __html: content }}
                        ></div>

                        <div className="rounded-md mt-2 overflow-scroll">
                            <div className="grid grid-cols-8 ml-2 mb-1 h-full">
                                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "%", "(", ")", "^", ".", "X"].map((item) => (
                                    <div
                                        key={item}
                                        className="h-6 w-6 flex items-center justify-center mt-2 rounded-full cursor-pointer text-xxs"
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                        onClick={() => {
                                            //setContent(item)
                                            setSelectedId((preventData) => preventData + item);
                                            handleButtonClick(item)
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}
