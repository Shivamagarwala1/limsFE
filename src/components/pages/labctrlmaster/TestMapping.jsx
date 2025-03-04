import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { allItemTypeInLabTestMaster, gendersInLabTestMaster, referanceRangePopUpHeaderInTestMapping, testMappingHeader, testMappingHeaderWithItemTypeIsPackage, testMappingRoundUp } from '../../listData/listData';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaSpinner } from 'react-icons/fa';
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { createNewObserVationDataApi, deleteHelpMapingApi, deleteReferancePopupDataApi, deleteSingleGridDataApi, getAllGridAllHelpMenuData, getAllHelpMenuDataApi, getAllItemObservationApi, getAllMachineDataForReferanceRangeApi, getAllReferancePopupDataApi, getAllTestMapingGridDataApi, getAllTestNameApi, getCenterDataForReferanceRangeApi, getSingleObserVationDataApi, saveGridListOfDataApi, saveHelperMenuDataApi, saveMapDataApi, saveReferanceRangePopupApi } from '../../../service/service';
import { CgAdd } from "react-icons/cg";
import toast from 'react-hot-toast';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { CiEdit } from "react-icons/ci";
import useRippleEffect from '../../customehook/useRippleEffect';

export default function TestMapping() {

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    useRippleEffect();

    const [testMappingData, setTestMapping] = useState({
        itemType: 0,
        testName: 0,
        observation: []
    });

    const [selectedDropDown, setSeleDropDown] = useState({
        testName: '',
        observationName: ''
    });

    const [selectedDropDownForRefRangePopup, setSeleDropDownForRefRangePopup] = useState({
        centreId: '',
        machineID: ''
    });

    const [newMappingData, setNewMappingData] = useState({
        isActive: 1,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        labObservationName: '',
        dlcCheck: 0,
        gender: '',
        printSeparate: 0,
        shortName: '',
        roundUp: 0,
        method: '',
        suffix: '',
        formula: '',
        observationWiseInterpretation: '',
        resultRequired: 1,
        collectionRequire: 0,
        displaySequence: 0
    });

    const [allTestNameData, setAllTestNameData] = useState([]);
    const [allObseravationData, setAllObseravationData] = useState([]);
    const [allTestMappingGridData, setAllTestMappingGridData] = useState([]);
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isHovered, setIsHovered] = useState(null);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [draggedRowIndex, setDraggedRowIndex] = useState(null);
    const [singleGridData, setSingleGridData] = useState(null);
    const [isEditNewMappingPopUp, setIsEditNewMappingPopup] = useState(false);
    const [isRemoveMappingPopUp, setIsRemoveMappingPopup] = useState(false);
    const [isOpenReferenceRangePopup, setIsOpenReferenceRangePopup] = useState(false);
    const [deletePopUp, setDeletePopup] = useState(false);
    const [menuHelperPopUp, setMenuHelperPopup] = useState(false);
    const [allCenreDataForReferanceRange, setAllCentreDataForReferanceRange] = useState([]);
    const [allMachineDataForReferanceRange, setAllMachineDataFoReferanceRange] = useState([]);
    const [referanceRangePopupFormData, setReferanceRangePopupFormData] = useState({
        isActive: 1,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        id: 0,
        observationId: 0,
        gender: '',
        genderTextValue: '',
        fromAge: 0,
        toAge: 0,
        minValue: 0,
        maxValue: 0,
        unit: '',
        reportReading: '',
        defaultValue: '',
        minCritical: 0,
        maxCritical: 0,
        minAutoApprovalValue: 0,
        maxAutoApprovalValue: 0,
        centreId: 0,
        machineID: 0
    });
    const [allreferanceRangePopupFormData, setAllReferancePopupDataApi] = useState([]);
    const [updatedRefeRangePopId, setupdatedRefeRangePopId] = useState(0);
    const [createHelpMenu, setCreateHelpMenu] = useState({
        id: 0,
        helpId: 0,
        observationId: 0,
        itemId: 0,
        mappedById: 0,
        mappedDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        isActive: 1,
        removedById: 0,
        removedDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
    })
    const [allMenuHelper, setAllMenuHelper] = useState([]);
    const [selectMenuHelper, setSelectMenuHelper] = useState('');
    const [saveMapData, setSaveMapData] = useState({ id: 0, helpName: '' });
    const [IsEdtiData, setIsEdit] = useState(false);
    const [allGridHelperMenu, setGridHelperMenu] = useState([]);
    const [singleHelperMenuData, setSingleHelperMenuData] = useState('');
    const [deleteHelpMenuData, setDeleteHelpMenuData] = useState(false);

    const handelOnChangesetReferanceRangePopupFormData = (event) => {
        const selectedGender = event.target.value;

        setReferanceRangePopupFormData((prevData) => ({
            ...prevData,
            gender: selectedGender,
        }));
    }


    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    };


    const handelOnChangeTestMappingData = (event) => {
        //setTestMapping({ ...testMappingData, [event.target.name]: event.target.value });
        setTestMapping((preventDefault) => ({
            ...preventDefault,
            [event.target.name]: event.target.value
        }))
    }

    useEffect(() => {

        const getAllTestName = async () => {

            try {
                const response = await getAllTestNameApi(testMappingData?.itemType);
                //setSeleDropDown((preventData) => ({ ...preventData, testName: '' }));
                //setTestMapping((preventData) => ({ ...preventData, testName: 0 }))

                setAllTestNameData(response);

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllTestName();

        const getAllItemObservation = async () => {
            try {
                const response = await getAllItemObservationApi(testMappingData?.itemType);
                if (response?.success) {
                    setAllObseravationData(response?.data);
                }

            } catch (error) {
                toast.error(error?.message)
            }
        }
        getAllItemObservation();

    }, [testMappingData?.itemType, isButtonClick])


    useEffect(() => {

        if (!selectedDropDown?.testName) return;


        const getGridData = async () => {

            try {
                const response = await getAllTestMapingGridDataApi(testMappingData?.itemType || '', testMappingData?.testName === '' ? 0 : testMappingData?.testName || '');

                if (response?.success) {

                    setTestMapping((preventData) => ({ ...preventData, observation: [] }));

                    setAllTestMappingGridData(response?.data);
                    //setAllTestMappingGridData((prevData) => [...prevData, ...response?.data]);
                }

            } catch (error) {
                if (error.status !== 400) {
                    toast.error(error?.message)
                }
            }
        }

        getGridData()


    }, [selectedDropDown?.testName, isButtonClick])


    const handleCheckboxChange = (e, data) => {
        const isChecked = e.target.checked;


        setTestMapping((prevData) => {

            const updatedAccess = [...prevData.observation];

            if (isChecked) {

                const updatedItem = {

                    id: data?.id,
                    observationID: data?.id,
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


    //after click mapping buttion show the data in grid
    const mapObseravationDataInGrid = () => {


        if (testMappingData?.observation?.length === 0) {
            toast.error('Please Select observation');
            return;
        }

        const updatedData = testMappingData?.observation?.map((item) => ({
            ...item,
            id: 0,
            dlcCheck: 0,
            isBold: 0,
            isCritical: 0,
            isHeader: 0,
            printOrder: 0,
            printSeparate: 0,
            showInReport: 0,
        }));



        //check the dupulicate value
        const duplicateItems = updatedData.filter((newItem) =>
            allTestMappingGridData?.some((existingItem) => existingItem.observationID === newItem.observationID)
        );

        if (duplicateItems.length !== 0) {
            toast.error(`${duplicateItems[0]?.labObservationName} allready mapped`);
            return;
        }



        setAllTestMappingGridData((prevData) => {
            // Filter out items from updatedData if their observationId exists in prevData
            const filteredData = updatedData.filter(
                (newItem) =>
                    !prevData.some((existingItem) => existingItem.observationID === newItem.observationID)
            );

            // Append only the filtered data
            return [...prevData, ...filteredData];
        });  //

        // setTestMapping((preventDefault) => ({
        //     ...preventDefault,
        //     observation: []
        // }))

    }

    //handel check box in table
    const handleCheckboxChangeForRowTable = (event, id, field) => {
        const { checked } = event.target; // Get the checked status
        const updatedData = allTestMappingGridData.map((row) =>
            row.id === id
                ? { ...row, [field]: checked ? 1 : 0 } // Update the specified field
                : row
        );
        setAllTestMappingGridData(updatedData); // Update the state with modified data
    };


    //save grid data
    const onSubmitSaveTsetMappingGridData = async () => {

        setIsButtonClick(1);

        const updatedGridData = allTestMappingGridData?.map((item, index) => ({
            ...item,
            id: item?.id !== '0' ? item?.id : 0,
            itemId: testMappingData?.testName,
            isTest: testMappingData?.itemType === "1" ? 1 : 0,
            isProfile: testMappingData?.itemType === "2" ? 1 : 0,
            isPackage: testMappingData?.itemType === "3" ? 1 : 0,
            itemType: parseInt(testMappingData?.itemType),
            formula: '',
            dlcCheck: item?.dlcCheck,
            showInReport: item?.showInReport,
            isHeader: item?.isHeader,
            isBold: item?.isBold,
            isCritical: item?.isCritical,
            printSeparate: item?.printSeparate,
            printOrder: index + 1,
            createdDateTime: new Date().toISOString(),
            createdById: parseInt(user?.employeeId),
            updateById: 0,
            updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        }));



        try {
            const response = await saveGridListOfDataApi(updatedGridData);

            if (response?.success) {
                toast.success(response?.message)

            } else {
                toast.error(response?.message)
            }

        } catch (error) {
            toast.error(error?.message);

        }

        setIsButtonClick(0);
    }

    //delete data
    const deleteGridSingleDataUsingId = async () => {

        setIsButtonClick(2);

        if (singleGridData?.id === 0) {
            //if the single grid data not save in DB but map in the grid
            const filterData = allTestMappingGridData?.filter((item) => item?.observationID !== singleGridData?.observationID);
            setAllTestMappingGridData(filterData);
            setTestMapping((preventData) => ({ ...preventData, observation: [] }))
        } else {

            try {
                const response = await deleteSingleGridDataApi(singleGridData?.id);

                if (response?.success) {
                    toast.success(response?.message);
                } else {
                    toast.error(response?.message);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }
        setIsButtonClick(0);
        setSingleGridData(null);
    }

    //dragged row
    const handleDragStart = (index) => {
        setDraggedRowIndex(index); // Store the index of the dragged row
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Allow dropping
    };

    const handleDrop = (index) => {
        const updatedData = [...allTestMappingGridData];
        const [draggedRow] = updatedData.splice(draggedRowIndex, 1); // Remove dragged row
        updatedData.splice(index, 0, draggedRow); // Insert dragged row at new index
        setAllTestMappingGridData(updatedData); // Update the state
        setDraggedRowIndex(null); // Reset dragged row index
    };


    //create new mapping
    const handelChangeOnNewObseravationData = (event) => {
        setNewMappingData({ ...newMappingData, [event.target.name]: event.target.value });
    }

    //save new mapping
    const handelOnSaveNewMapping = async (event) => {

        event.preventDefault();
        setIsButtonClick(3);

        const updateNewObseravationData = {
            ...newMappingData,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            collectionRequire: 1,
        }

        try {

            const response = await createNewObserVationDataApi(updateNewObseravationData);

            if (response?.success) {

                toast.success(response?.message);

                setNewMappingData({
                    isActive: 1,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    labObservationName: '',
                    dlcCheck: 0,
                    gender: '',
                    printSeparate: 0,
                    shortName: '',
                    roundUp: 0,
                    method: '',
                    suffix: '',
                    formula: '',
                    observationWiseInterpretation: '',
                    resultRequired: 1,
                    collectionRequire: 0,
                    displaySequence: 0
                });

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);

    }


    //get single mapping data
    const getSingleDataForNewObseravationUsingId = async (id) => {

        try {

            const response = await getSingleObserVationDataApi(id);
            setSingleGridData(response[0])

        } catch (error) {
            toast?.error(error?.message)
        }


    }


    const handelChangeOnSingleObseravationData = (event) => {
        setSingleGridData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


    const handeleUpdateForSingleMappingData = async (event) => {
        event.preventDefault();
        setIsButtonClick(4);

        const updateNewObseravationData = {
            ...singleGridData,
            updateById: parseInt(user?.employeeId),
            updateDateTime: new Date().toISOString(),
        }

        try {

            const response = await createNewObserVationDataApi(updateNewObseravationData);

            if (response?.success) {

                toast.success(response?.message);

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
        setSingleGridData('');
        setIsEditNewMappingPopup(false);
    }


    //referance range
    useEffect(() => {

        const getCenterData = async () => {

            try {

                const response = await getCenterDataForReferanceRangeApi();
                setAllCentreDataForReferanceRange(response);

                setReferanceRangePopupFormData((preventData) => ({
                    ...preventData,
                    centreId: response[0]?.centreId
                }))
                setShowSearchBarDropDown((preventData) => ({
                    ...preventData,
                    machineID: response[0]?.companyName
                }))

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getCenterData();


        const getMachineData = async () => {

            try {

                const response = await getAllMachineDataForReferanceRangeApi();

                setAllMachineDataFoReferanceRange(response);
                setReferanceRangePopupFormData((preventData) => ({
                    ...preventData,
                    machineID: response[0]?.id
                }))
                setShowSearchBarDropDown((preventData) => ({
                    ...preventData,
                    machineID: response[0]?.machineName
                }))
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getMachineData()

    }, [])


    const handelOnChangeReferanceRangePopupFormData = (event) => {
        setReferanceRangePopupFormData((preventDefault) => ({
            ...preventDefault,
            [event.target.name]: event.target.value
        }))
    }


    const onSubmitReferanceRangePopFormData = async (event) => {

        event.preventDefault();
        setIsButtonClick(5);

        let pushData = [];

        const updatedReferanceData = {
            ...referanceRangePopupFormData,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            observationId: parseInt(singleGridData?.observationID),
            genderTextValue: referanceRangePopupFormData?.gender,
            toAge: parseInt(referanceRangePopupFormData?.toAge),
            fromAge: parseInt(referanceRangePopupFormData?.fromAge),
            minValue: parseInt(referanceRangePopupFormData?.minValue),
            maxValue: parseInt(referanceRangePopupFormData?.maxValue),
            minCritical: parseInt(referanceRangePopupFormData?.minCritical),
            maxCritical: parseInt(referanceRangePopupFormData?.maxCritical),
            minAutoApprovalValue: parseInt(referanceRangePopupFormData?.minAutoApprovalValue),
            maxAutoApprovalValue: parseInt(referanceRangePopupFormData?.maxAutoApprovalValue),
        }



        pushData.push(updatedReferanceData);


        try {

            const response = await saveReferanceRangePopupApi(pushData);

            if (response?.success) {
                toast.success(response?.message);

                setReferanceRangePopupFormData({
                    isActive: 1,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    id: 0,
                    observationId: 0,
                    gender: '',
                    genderTextValue: '',
                    fromAge: 0,
                    toAge: 0,
                    minValue: 0,
                    maxValue: 0,
                    unit: '',
                    reportReading: '',
                    defaultValue: '',
                    minCritical: 0,
                    maxCritical: 0,
                    minAutoApprovalValue: 0,
                    maxAutoApprovalValue: 0,
                    centreId: 0,
                    machineID: 0
                });
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
    }


    useEffect(() => {
        const getData = async () => {
            try {

                const response = await getAllReferancePopupDataApi(singleGridData?.observationID, referanceRangePopupFormData?.gender);
                if (referanceRangePopupFormData?.gender === 'Both (F/M)') {
                    // Create two separate arrays for M and F, and add the appropriate gender label
                    const genderMResponse = response.map(item => ({ ...item, genderTextValue: 'M' }));
                    const genderFResponse = response.map(item => ({ ...item, genderTextValue: 'F' }));

                    // Combine the M and F responses
                    const doubledResponse = [...genderMResponse, ...genderFResponse];
                    setAllReferancePopupDataApi(doubledResponse)
                } else {
                    setAllReferancePopupDataApi(response);
                }
                // setAllReferancePopupDataApi(response);

            } catch (error) {
                toast.error(error?.message);

            }
        }
        if (referanceRangePopupFormData.gender !== '') {
            getData();
        }
    }, [referanceRangePopupFormData.gender])


    const handelOnChangeForUpdateReferanceRangePopupFormData = (e, id, field) => {
        const { value } = e.target;

        //handel for spiner for while updated time 
        setupdatedRefeRangePopId(id);

        // Find the object with the matching `id`
        const indexToUpdate = allreferanceRangePopupFormData.findIndex(item => item.id === id);

        if (indexToUpdate !== -1) {
            // Create a new object for the item at the specified index with the updated field
            const updatedItem = { ...allreferanceRangePopupFormData[indexToUpdate], [field]: value };

            // Create a new array with the updated item at the specific index
            const updatedData = [
                ...allreferanceRangePopupFormData.slice(0, indexToUpdate),
                updatedItem,
                ...allreferanceRangePopupFormData.slice(indexToUpdate + 1),
            ];

            // Set the updated array back into the state (don't wrap it in an extra array)
            setAllReferancePopupDataApi(updatedData);
        } else {
            console.error(`Object with id ${id} not found.`);
        }
    };


    const onSubmitUpdateReferanceRangePopFormData = async (event) => {

        event.preventDefault();
        setIsButtonClick(6);

        let updatedData;

        if (allreferanceRangePopupFormData[0]?.gender === 'Both (F/M)') {

            // Step 1: Filter out items with genderTextValue = "F"
            const filteredData = allreferanceRangePopupFormData?.filter(
                (item) => item.genderTextValue !== "F"
            );

            // Step 2: Update the remaining items
            updatedData = filteredData?.map((item) => {
                if (item.id === updatedRefeRangePopId) {
                    return {
                        ...item,
                        genderTextValue: 'Both (F/M)',
                        updateById: parseInt(user?.employeeId, 10), // Replace with actual user info
                        updateDateTime: new Date().toISOString(), // Update with current timestamp
                    };
                }
                return item; // Return other items unchanged
            });

        } else {
            updatedData = allreferanceRangePopupFormData?.map((item) => {
                if (item.id === updatedRefeRangePopId) {
                    // Update the userDid and updatedDate fields for all items with the matching id
                    return {
                        ...item,
                        updateById: parseInt(user?.employeeId, 10), // Replace with actual user info
                        updateDateTime: new Date().toISOString(), // Update with current timestamp
                    };
                }
                return item; // Return other items unchanged
            });
        }


        try {

            const response = await saveReferanceRangePopupApi(updatedData);

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

    const deleteReferanceRangeSingleDataUsingId = async () => {

        setIsButtonClick(7);


        try {
            const response = await deleteReferancePopupDataApi(singleGridData?.id);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }
        setIsButtonClick(0);
        setDeletePopup(false);
    }


    //get all menu
    useEffect(() => {

        const getAllHepMenu = async () => {

            try {
                const response = await getAllHelpMenuDataApi();
                setAllMenuHelper(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllHepMenu();

    }, [isButtonClick])

    const handelOnChangeHelperMenu = (event) => {
        setCreateHelpMenu((preventData) => ({
            ...preventData,
            helpId: event.target.value
        }))
    }


    //save helper menu
    const handelOnSubmitHelperMenu = async (event) => {

        event.preventDefault();
        setIsButtonClick(8)

        if (!testMappingData?.testName) {
            toast.error('Please Select Test Name');
            setIsButtonClick(0);
            return;
        }

        const updatedData = {
            ...createHelpMenu,
            observationId: singleGridData?.observationID,
            itemId: testMappingData?.testName,
            mappedById: parseInt(user?.employeeId),
            mappedDate: new Date().toISOString(),
            isActive: 1
        }


        try {
            const response = await saveHelperMenuDataApi(updatedData);
            if (response?.success) {
                toast.success(response?.message);
                setCreateHelpMenu({
                    id: 0,
                    helpId: 0,
                    observationId: 0,
                    itemId: 0,
                    mappedById: 0,
                    mappedDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    isActive: 1,
                    removedById: 0,
                    removedDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                });

            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error(error?.message);
        }
        setIsButtonClick(0);
    }


    const handelOnChangeMapData = (event) => {
        setSaveMapData((preventData) => ({
            ...preventData,
            helpName: event.target.value
        }));
    }

    const onSubmitSaveMapaData = async (event) => {
        event.preventDefault();
        setIsButtonClick(9);
        try {

            const response = await saveMapDataApi(saveMapData);

            if (response?.success) {
                toast.success(response?.message);
                setCreateHelpMenu({
                    id: 0,
                    helpId: 0,
                    observationId: 0,
                    itemId: 0,
                    mappedById: 0,
                    mappedDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    isActive: 1,
                    removedById: 0,
                    removedDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                });
                setSaveMapData({ id: 0, helpName: '' });
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);

        }
        setIsButtonClick(0);

    }

    //get single data
    const getSingleMapData = async () => {

        const singleData = {
            id: createHelpMenu?.helpId,
            helpName: selectMenuHelper
        }

        setSaveMapData(singleData);

    }



    const handelOnUpdateMapData = async (event) => {
        event.preventDefault();
        setIsButtonClick(9);
        try {

            const response = await saveMapDataApi(saveMapData);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);

        }
        setIsButtonClick(0);
        setSaveMapData({ id: 0, helpName: '' });
        setSelectMenuHelper('');
        setCreateHelpMenu()
    }


    //get all grid help menu data
    useEffect(() => {


        const getAllHelpMenuData = async () => {

            const response = await getAllGridAllHelpMenuData(testMappingData?.testName, singleGridData.observationID);

            if (response?.success) {
                setGridHelperMenu(response?.data)
            }
        }

        if (singleGridData?.observationID && testMappingData?.testName) {
            getAllHelpMenuData()
        }

    }, [singleGridData?.observationID, testMappingData?.testName, isButtonClick])


    //delete map data
    const deleteHelpMapData = async () => {

        setIsButtonClick(10)
        try {
            const response = await deleteHelpMapingApi(singleHelperMenuData?.id, singleHelperMenuData?.itemId, singleHelperMenuData?.observationId, user?.employeeId);
            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message)
        }
        setIsButtonClick(0)
        setDeleteHelpMenuData(false);
    }


    //save map data
    const filterAlltestNameData = allTestNameData.filter((data) => (data?.itemName?.toLowerCase() || '').includes(String(selectedDropDown?.testName?.toLowerCase() || '')));


    //    observationName
    const filterObservationNameData = allObseravationData.filter((data) => (data?.labObservationName?.toLowerCase() || '').includes(String(selectedDropDown?.observationName?.toLowerCase() || '')));


    const filterAllCentreData = allCenreDataForReferanceRange.filter((data) => (data?.companyName?.toLowerCase() || '').includes(String(selectedDropDown?.centreId?.toLowerCase() || '')));




    const filterAllMachineData = allMachineDataForReferanceRange.filter((data) => (data?.machineName?.toLowerCase() || '').includes(String(selectedDropDown?.machineID?.toLowerCase() || '')));


    const filterAllHelperMenu = allMenuHelper.filter((data) => (data?.helpName?.toLowerCase() || '').includes(String(selectMenuHelper?.toLowerCase() || '')));

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
                <div>Test Mapping</div>
            </div>

            {/* form data */}
            <form autoComplete='off'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
                    {/* item type */}
                    <div className="relative flex-1">
                        <select
                            id="itemType"
                            value={testMappingData.itemType}
                            onChange={handelOnChangeTestMappingData}
                            name='itemType'
                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                        >
                            <option hidden className='text-gray-400'>
                                Select Option
                            </option>
                            {
                                allItemTypeInLabTestMaster?.map((data, index) => (
                                    <option key={index} value={data?.id}>
                                        {data?.value}
                                    </option>
                                ))
                            }
                        </select>
                        <label htmlFor="itemType" className="menuPeerLevel">
                            Test Type
                        </label>
                    </div>

                    {/* test name */}
                    <div className="relative flex-1">
                        <input
                            type="search"
                            id="testName"
                            name="testName"
                            value={selectedDropDown?.testName || testMappingData?.testName || ''}
                            onChange={(e) => {
                                handelOnChangeTestMappingData(e),
                                    setSeleDropDown((preventData) => ({
                                        ...preventData,
                                        testName: e.target.value
                                    }))
                            }}
                            onClick={() => openShowSearchBarDropDown(1)}

                            placeholder=" "
                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                        />
                        <label htmlFor="testName" className="menuPeerLevel">
                            {
                                testMappingData?.itemType === '3' ? 'Package Name' : testMappingData?.itemType === '2' ? 'Profile Name' : 'Test Name'
                            }
                        </label>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 1 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {filterAlltestNameData?.length > 0 ? (
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
                                    ) : (
                                        <li className="py-4 text-gray-500 text-center">
                                            {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* observation */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] 
                                                   border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
                            onClick={() => showSearchBarDropDown !== 2 ? openShowSearchBarDropDown(2) : openShowSearchBarDropDown(0)}
                        >
                            <input
                                type="text"
                                id="observation"
                                name="observation"
                                value={
                                    testMappingData.observation.length === 0
                                        ? ''
                                        : testMappingData.observation
                                            .map((data) => data?.id)
                                            .join(', ')
                                }
                                readOnly
                                // onChange={handelOnChangeTestMappingData}
                                placeholder="Search observation"
                                className={`w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none`}
                            />
                            <label htmlFor="observation" className="menuPeerLevel">
                                {
                                    testMappingData?.itemType === '3' ? 'Test' : 'Observation'
                                }

                            </label>

                            <div>
                                {
                                    showSearchBarDropDown === 2 ? <RiArrowDropUpLine className='text-xl cursor-pointer' /> : <RiArrowDropDownLine className='text-xl cursor-pointer' />
                                }
                            </div>
                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 2 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">

                                {
                                    allTestNameData.length === 0 ?
                                        <div className='py-4 text-gray-500 text-center'>
                                            {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                                        </div>
                                        :
                                        allObseravationData?.length === 0 ?

                                            <div className='py-4 text-gray-500 text-center'>
                                                {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                                            </div>
                                            :
                                            <ul className='w-full'>

                                                <div className='mx-2'>
                                                    <input type="text" name="observationName"
                                                        className='border-[1px]  my-1 h-[1.6rem] rounded-md pl-2 outline-none w-full'
                                                        value={selectedDropDown?.observationName || ''}
                                                        onChange={(e) => setSeleDropDown((preventData) => ({
                                                            ...preventData,
                                                            [e.target.name]: e.target.value
                                                        }))}
                                                    />
                                                </div>

                                                {/* Individual Checkboxes */}
                                                {filterObservationNameData?.length > 0 ? (
                                                    <>

                                                        {
                                                            filterObservationNameData?.map((data, index) => {

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
                                                        }
                                                    </>
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


                    {/* button */}
                    <div className='flex gap-[0.25rem]'>
                        <div className="relative flex-1 flex justify-start items-center">
                            <button
                                type="button"
                                data-ripple-light="true"
                                className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                style={{
                                    background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                }}
                                onClick={mapObseravationDataInGrid}
                            >

                                Mapping

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

                                onClick={() => { setShowPopup(true) }}
                            >

                                {/* {
                                isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                } */}
                                New observation
                            </button>
                        </div>
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
                                onClick={onSubmitSaveTsetMappingGridData}
                            >

                                {
                                    isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save Mapping'
                                }

                            </button>
                        </div>
                        <div className="relative flex-1 flex justify-start items-center">
                        </div>
                    </div>
                </div>
            </form>


            {/* grid data */}
            <div>
                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                    </div>
                    <div>Test Mapping Details</div>
                </div>


                <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                    <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <tr>
                            {
                                testMappingData?.itemType === '3' ?
                                    testMappingHeaderWithItemTypeIsPackage.map((data, index) => (
                                        <td
                                            key={index}
                                            className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                                            style={index === 2 ? { width: '20%' } : undefined} // Apply width conditionally
                                        >
                                            {data}
                                        </td>
                                    ))
                                    :
                                    testMappingHeader.map((data, index) => (
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
                            allTestMappingGridData?.map((data, index) => {

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

                                        draggable
                                        onDragStart={() => handleDragStart(index)} // Start dragging
                                        onDragOver={handleDragOver} // Dragging over another row
                                        onDrop={() => handleDrop(index)} // Drop row
                                    >
                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {index + 1}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.observationID}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.labObservationName}
                                        </td>

                                        {
                                            testMappingData?.itemType !== '3' && (
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {/* {data?.isHeader} */}

                                                    <input
                                                        type="checkbox"
                                                        name="isHeader"
                                                        id="IsHeader"
                                                        checked={data?.isHeader === parseInt(1)} // Checked if isHeader is not 0
                                                        className='flex'
                                                        onChange={(e) => handleCheckboxChangeForRowTable(e, data?.id, "isHeader")}
                                                    />

                                                </td>

                                            )
                                        }

                                        {
                                            testMappingData?.itemType !== '3' && (
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {/* {data?.isBold} */}
                                                    <input
                                                        type="checkbox"
                                                        name="isBold"
                                                        id="isBold"
                                                        checked={data?.isBold === parseInt(1)} // Checked if isHeader is not 0
                                                        className='flex'
                                                        onChange={(e) => handleCheckboxChangeForRowTable(e, data?.id, "isBold")}
                                                    />

                                                </td>
                                            )
                                        }


                                        {
                                            testMappingData?.itemType !== '3' && (
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    {/* {data?.isCritical} */}

                                                    <input
                                                        type="checkbox"
                                                        name="isCritical"
                                                        id="isCritical"
                                                        checked={data?.isCritical === parseInt(1)} // Checked if isHeader is not 0
                                                        className='flex'
                                                        onChange={(e) => handleCheckboxChangeForRowTable(e, data?.id, "isCritical")}
                                                    />
                                                </td>

                                            )
                                        }


                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {/* {data?.printSeparate} */}
                                            <input
                                                type="checkbox"
                                                name="printSeparate"
                                                id="printSeparate"
                                                checked={data?.printSeparate === parseInt(1)} // Checked if isHeader is not 0
                                                className='flex'
                                                onChange={(e) => handleCheckboxChangeForRowTable(e, data?.id, "printSeparate")}
                                            />
                                        </td>
                                        {
                                            testMappingData?.itemType !== '3' && (
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">

                                                    <input
                                                        type="checkbox"
                                                        name="showInReport"
                                                        id="showInReport"
                                                        checked={data?.showInReport === parseInt(1)} // Checked if isHeader is not 0
                                                        className='flex'
                                                        onChange={(e) => handleCheckboxChangeForRowTable(e, data?.id, "showInReport")}
                                                    />

                                                </td>
                                            )
                                        }

                                        {
                                            testMappingData?.itemType !== '3' && (
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">


                                                    <input
                                                        type="checkbox"
                                                        name="dlcCheck"
                                                        id="dlcCheck"
                                                        checked={data?.dlcCheck === parseInt(1)} // Checked if isHeader is not 0
                                                        className='flex'
                                                        onChange={(e) => handleCheckboxChangeForRowTable(e, data?.id, "dlcCheck")}
                                                    />

                                                </td>
                                            )
                                        }

                                        {
                                            testMappingData?.itemType !== '3' && (
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    <CgAdd className='text-lg cursor-pointer' />
                                                </td>

                                            )
                                        }

                                        {
                                            testMappingData?.itemType !== '3' && (
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">

                                                    <CgAdd className='text-lg cursor-pointer'
                                                        onClick={() => {
                                                            setIsOpenReferenceRangePopup(true); setSingleGridData(data);

                                                        }}
                                                    />

                                                </td>
                                            )
                                        }


                                        {
                                            testMappingData?.itemType !== '3' && (
                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                    <CgAdd className='text-lg cursor-pointer' onClick={() => { setMenuHelperPopup(true), setSingleGridData(data) }} />
                                                </td>

                                            )
                                        }

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            <IoMdRemoveCircleOutline className='text-xl cursor-pointer' onClick={() => {
                                                setSingleGridData(data);
                                                setIsRemoveMappingPopup(true)
                                            }} />
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            <CiEdit className='text-xl cursor-pointer' onClick={() => {
                                                getSingleDataForNewObseravationUsingId(data?.observationID
                                                );
                                                setIsEditNewMappingPopup(true);
                                            }
                                            } />
                                        </td>
                                        {/*   */}
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>


            {/* popup for create obseravation */}
            {
                showPopup && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-96 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Create Observation
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(false)}
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
                                            value={newMappingData.labObservationName}
                                            onChange={handelChangeOnNewObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="labObservationName" className="menuPeerLevel">
                                            Observation Name
                                        </label>
                                    </div>

                                    {/* shortName */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="shortName"
                                            name="shortName"
                                            value={newMappingData.shortName}
                                            onChange={handelChangeOnNewObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="shortName" className="menuPeerLevel">
                                            Sort Name
                                        </label>
                                    </div>


                                    {/* suffix */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="suffix"
                                            name="suffix"
                                            value={newMappingData.suffix}
                                            onChange={handelChangeOnNewObseravationData}
                                            placeholder=" "
                                            maxLength={2}
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="suffix" className="menuPeerLevel">
                                            Suffix Name
                                        </label>
                                    </div>

                                    {/* method */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="method"
                                            name="method"
                                            value={newMappingData.method}
                                            onChange={handelChangeOnNewObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="method" className="menuPeerLevel">
                                            Method Name
                                        </label>
                                    </div>

                                    {/* Gender */}
                                    <div className="relative flex-1 ">
                                        <select
                                            id="gender"
                                            value={newMappingData.gender}
                                            onChange={handelChangeOnNewObseravationData}
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

                                    {/* roundUp */}
                                    <div className="relative flex-1 ">
                                        <select
                                            id="roundUp"
                                            value={newMappingData.roundUp}
                                            onChange={handelChangeOnNewObseravationData}
                                            name='roundUp'
                                            // defaultValue=''
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            {
                                                testMappingRoundUp?.map((data, index) => (
                                                    <option key={index} value={data}>
                                                        {data}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="roundUp" className="menuPeerLevel">
                                            Round Up
                                        </label>
                                    </div>

                                    {/* resultRequired */}
                                    <div className="relative flex-1 ">
                                        <select
                                            id="resultRequired"
                                            value={newMappingData.resultRequired}
                                            onChange={handelChangeOnNewObseravationData}
                                            name='resultRequired'
                                            // defaultValue=''
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >

                                            <option value={1}>Yes</option>
                                            <option value={0}>No</option>
                                        </select>
                                        <label htmlFor="resultRequired" className="menuPeerLevel">
                                            Result Mandatroy
                                        </label>
                                    </div>

                                    <div className="flex items-stretch  text-white  rounded-md"
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <button type="button"
                                            data-ripple-light="true" className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer"
                                            onClick={handelOnSaveNewMapping}
                                        >
                                            {
                                                isButtonClick === 3 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
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
                isEditNewMappingPopUp && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-96 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Update Observation
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setIsEditNewMappingPopup(false); setSingleGridData(null) }}
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
                                            value={singleGridData?.labObservationName || ''}
                                            onChange={handelChangeOnSingleObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="labObservationName" className="menuPeerLevel">
                                            Observation Name
                                        </label>
                                    </div>

                                    {/* shortName */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="shortName"
                                            name="shortName"
                                            value={singleGridData?.shortName || ''}
                                            onChange={handelChangeOnSingleObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="shortName" className="menuPeerLevel">
                                            Sort Name
                                        </label>
                                    </div>


                                    {/* suffix */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="suffix"
                                            name="suffix"
                                            value={singleGridData?.suffix || ''}
                                            onChange={handelChangeOnSingleObseravationData}
                                            placeholder=" "
                                            maxLength={2}
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="suffix" className="menuPeerLevel">
                                            Suffix Name
                                        </label>
                                    </div>

                                    {/* method */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="method"
                                            name="method"
                                            value={singleGridData?.method || ''}
                                            onChange={handelChangeOnSingleObseravationData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="method" className="menuPeerLevel">
                                            Method Name
                                        </label>
                                    </div>

                                    {/* Gender */}
                                    <div className="relative flex-1 ">
                                        <select
                                            id="gender"
                                            value={singleGridData?.gender || ''}
                                            onChange={handelChangeOnSingleObseravationData}
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

                                    {/* roundUp */}
                                    <div className="relative flex-1 ">
                                        <select
                                            id="roundUp"
                                            value={singleGridData?.roundUp || ''}
                                            onChange={handelChangeOnSingleObseravationData}
                                            name='roundUp'
                                            // defaultValue=''
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            {
                                                testMappingRoundUp?.map((data, index) => (
                                                    <option key={index} value={data}>
                                                        {data}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="roundUp" className="menuPeerLevel">
                                            Round Up
                                        </label>
                                    </div>

                                    {/* resultRequired */}
                                    <div className="relative flex-1 ">
                                        <select
                                            id="resultRequired"
                                            value={singleGridData?.resultRequired === 0 ? 0 : 1}
                                            onChange={(e) => {
                                                const currentValue = singleGridData?.resultRequired;
                                                // Toggle between 1 and 0
                                                setSingleGridData((prevData) => ({
                                                    ...prevData,
                                                    resultRequired: currentValue === 1 ? 0 : 1,
                                                }));
                                            }
                                            }
                                            name='resultRequired'
                                            // defaultValue=''
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >

                                            <option value={1}>Yes</option>
                                            <option value={0}>No</option>
                                        </select>
                                        <label htmlFor="resultRequired" className="menuPeerLevel">
                                            Result Mandatroy
                                        </label>
                                    </div>

                                    <div className="flex items-stretch  text-white  rounded-md"
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}

                                        onClick={handeleUpdateForSingleMappingData}
                                    >
                                        <button
                                            type="button"
                                            data-ripple-light="true"
                                            className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer">
                                            {
                                                isButtonClick === 4 ? <FaSpinner className='text-xl animate-spin' /> : 'Update'
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
                menuHelperPopUp && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-72 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Help Menu
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setMenuHelperPopup(false); setSingleGridData(null) }}
                                />
                            </div>


                            <div className='px-1 mb-1'>
                                <form autoComplete='off'>

                                    {/* test name */}
                                    <div className='flex items-center gap-1 mb-1'>
                                        <div className="relative flex-1 mt-1">
                                            <input
                                                type="search"
                                                id="helpId"
                                                name="helpId"
                                                value={selectMenuHelper || createHelpMenu?.helpId || ''}
                                                onChange={(e) => {
                                                    handelOnChangeHelperMenu(event),
                                                        setSelectMenuHelper('')
                                                }}
                                                onClick={() => openShowSearchBarDropDown(5)}

                                                placeholder=" "
                                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                                            />
                                            <label htmlFor="helpId" className="menuPeerLevel">
                                                Map Help
                                            </label>

                                            {/* Dropdown to select the menu */}
                                            {showSearchBarDropDown === 5 && (
                                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                                    <ul>
                                                        {filterAllHelperMenu?.length > 0 ? (
                                                            filterAllHelperMenu?.map((data, index) => (
                                                                <li
                                                                    key={data?.id}
                                                                    name="helpId"
                                                                    className="my-1 px-2 cursor-pointer"
                                                                    onClick={(e) => {
                                                                        openShowSearchBarDropDown(0);
                                                                        handelOnChangeHelperMenu({
                                                                            target: { name: 'helpId', value: data?.id },
                                                                        });
                                                                        setSelectMenuHelper(data?.helpName)
                                                                    }}
                                                                    onMouseEnter={() => setIsHovered(index)}
                                                                    onMouseLeave={() => setIsHovered(null)}
                                                                    style={{
                                                                        background:
                                                                            isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                                    }}
                                                                >
                                                                    {data?.helpName}
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

                                        <div className='relative flex gap-3 items-center h-full'>
                                            <div className='flex-shrink-0'>
                                                {isButtonClick === 8 ? (
                                                    <FaSpinner className='text-xl animate-spin' />
                                                ) : (
                                                    <button type='button'>
                                                        <IoMdAddCircleOutline
                                                            className='text-xl cursor-pointer'
                                                            title='Map Data'
                                                            onClick={handelOnSubmitHelperMenu}
                                                        />
                                                    </button>
                                                )}
                                            </div>

                                            <div className='flex-shrink-0'>
                                                <CiEdit
                                                    className='text-xl cursor-pointer text-blue-400'
                                                    onClick={() => {
                                                        getSingleMapData();
                                                        setIsEdit(!IsEdtiData);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                id="helpName"
                                                name="helpName"
                                                value={saveMapData?.helpName || ''}
                                                onChange={(e) => {
                                                    handelOnChangeMapData(e);
                                                }}
                                                placeholder=" "
                                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                                            />
                                            <label htmlFor="helpName" className="menuPeerLevel">
                                                Create Map
                                            </label>
                                        </div>

                                        <div className='flex gap-[0.25rem]'>
                                            {IsEdtiData ? (
                                                <div
                                                    className="flex items-stretch text-white rounded-md"
                                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                    onClick={handelOnUpdateMapData}
                                                >
                                                    <button type="button"
                                                        data-ripple-light="true" className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] px-4 rounded-md flex justify-center items-center cursor-pointer">
                                                        {isButtonClick === 9 ? (
                                                            <FaSpinner className='text-xl animate-spin' />
                                                        ) : (
                                                            'Update'
                                                        )}
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="flex items-stretch text-white rounded-md"
                                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                    onClick={onSubmitSaveMapaData}
                                                >
                                                    <button type="button"
                                                        data-ripple-light="true" className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] px-4 rounded-md flex justify-center items-center cursor-pointer">
                                                        {isButtonClick === 9 ? (
                                                            <FaSpinner className='text-xl animate-spin' />
                                                        ) : (
                                                            'Save'
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                </form>
                            </div>

                            {
                                allGridHelperMenu.length !== 0 && (
                                    <div className='max-h-16 overflow-scroll sticky mx-1'>
                                        <table className="table-auto border-collapse w-full text-xxs text-left p-2 ">

                                            <thead className='sticky top-0 bg-gray-100' style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                                                <tr>
                                                    <td className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs">ID</td>
                                                    <td className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs" style={{ width: '400px' }}>Map Name</td>
                                                    <td className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs">Action</td>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    allGridHelperMenu?.map((item, index) => (
                                                        <tr
                                                            className={`cursor-pointer 
                                                    ${isHoveredTable === index
                                                                    ? ''
                                                                    : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                                                }`}
                                                            key={index}

                                                        >
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {item?.id}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {item?.helpName}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {
                                                                    isButtonClick === 10
                                                                }
                                                                <IoMdRemoveCircleOutline className='text-xl cursor-pointer text-red-400' onClick={() => {
                                                                    setSingleHelperMenuData(item);
                                                                    setDeleteHelpMenuData(true);
                                                                }} />
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }

            {
                deleteHelpMenuData === true && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50"
                        >

                            <div className="flex mt-3 items-center">
                                <IoAlertCircleOutline className="w-8 h-8" style={{ color: activeTheme?.menuColor }} />
                            </div>

                            <div className="text-xxxs font-semibold text-textColor/50">
                                Are you sure want to delete ?
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
                                        onClick={() => setDeleteHelpMenuData(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={deleteHelpMapData}>
                                    <div>
                                        {
                                            isButtonClick === 10 ?
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

            {
                isRemoveMappingPopUp === true && (
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
                                        onClick={() => { setIsRemoveMappingPopup(false); setSingleGridData(null) }}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={deleteGridSingleDataUsingId}>
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

            {
                isOpenReferenceRangePopup === true && (

                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-10 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Reference Range
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setIsOpenReferenceRangePopup(false); setSingleGridData(null) }}
                                />
                            </div>


                            <form
                                // onSubmit={onSumitUserChangePassword}
                                autoComplete='off'>

                                <div className='mx-1 my-2 grid grid-cols-4 gap-2'>

                                    {/* centre */}
                                    <div className="relative flex-1 ">
                                        <div className="relative flex-1">
                                            <input
                                                type="search"
                                                id="centreId"
                                                name="centreId"
                                                value={selectedDropDownForRefRangePopup?.centreId || testMappingData?.centreId || ''}
                                                onChange={(e) => {
                                                    handelOnChangesetReferanceRangePopupFormData(e),
                                                        setSeleDropDown((preventData) => ({
                                                            ...preventData,
                                                            centreId: ''
                                                        }))
                                                }}
                                                onClick={() => openShowSearchBarDropDown(3)}

                                                placeholder=" "
                                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                                            />
                                            <label htmlFor="centreId" className="menuPeerLevel">
                                                Centre
                                            </label>

                                            {/* Dropdown to select the menu */}
                                            {showSearchBarDropDown === 3 && (
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
                                                                        handelOnChangesetReferanceRangePopupFormData({
                                                                            target: { name: 'centreId', value: data?.centreId },
                                                                        });
                                                                        setSeleDropDownForRefRangePopup((preventData) => ({
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

                                    {/* machine */}
                                    <div className="relative flex-1 ">

                                        <div className="relative flex-1">
                                            <input
                                                type="search"
                                                id="machineID"
                                                name="machineID"
                                                value={selectedDropDownForRefRangePopup?.machineID || testMappingData?.machineID || ''}
                                                onChange={(e) => {
                                                    handelOnChangesetReferanceRangePopupFormData(e),
                                                        setSeleDropDownForRefRangePopup((preventData) => ({
                                                            ...preventData,
                                                            machineID: ''
                                                        }))
                                                }}
                                                onClick={() => openShowSearchBarDropDown(4)}

                                                placeholder=" "
                                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                                            />
                                            <label htmlFor="machineID" className="menuPeerLevel">
                                                Machine
                                            </label>

                                            {/* Dropdown to select the menu */}
                                            {showSearchBarDropDown === 4 && (
                                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                                    <ul>
                                                        {filterAllMachineData?.length > 0 ? (
                                                            filterAllMachineData?.map((data, index) => (
                                                                <li
                                                                    key={data?.id}
                                                                    name="machineID"
                                                                    className="my-1 px-2 cursor-pointer"
                                                                    onClick={(e) => {
                                                                        openShowSearchBarDropDown(0);
                                                                        handelOnChangesetReferanceRangePopupFormData({
                                                                            target: { name: 'machineID', value: data?.machineName },
                                                                        });
                                                                        setSeleDropDownForRefRangePopup((preventData) => ({
                                                                            ...preventData,
                                                                            machineID: data?.machineName
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

                                    {/* age type */}
                                    <div className="relative flex-1 ">
                                        <select
                                            id="age"
                                            value={referanceRangePopupFormData.age}
                                            onChange={handelOnChangesetReferanceRangePopupFormData}
                                            name='age'
                                            // defaultValue=''
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            {/* <option hidden className='text-gray-400'>
                                                Select Age
                                            </option> */}
                                            {/* {
                                                gendersInLabTestMaster?.map((data, index) => (
                                                    <option key={index} value={data}>
                                                        {data}
                                                    </option>
                                                ))
                                            } */}

                                            <option value="Days">Days</option>
                                        </select>
                                        <label htmlFor="title" className="menuPeerLevel">
                                            Age Type
                                        </label>
                                    </div>

                                    <div className="relative flex-1 ">
                                        <select
                                            id="gender"
                                            value={referanceRangePopupFormData.gender}
                                            onChange={handelOnChangesetReferanceRangePopupFormData}
                                            name='gender'
                                            // defaultValue=''
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option hidden className='text-gray-400'>
                                                Select Gender
                                            </option>
                                            {
                                                gendersInLabTestMaster?.map((data, index) => (
                                                    <option key={index} value={data}>
                                                        {data}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="title" className="menuPeerLevel">
                                            Gender
                                        </label>
                                    </div>

                                </div>
                            </form>


                            {/* table data */}
                            <div className="grid grid-cols-12 gap-2 mx-1 rounded-md font-semibold p-2"
                                style={{ background: activeTheme?.subMenuColor, color: activeTheme?.iconColor }}
                            >

                                {
                                    referanceRangePopUpHeaderInTestMapping?.map((data, index) => (
                                        <div className="col-span-1  text-center text-xxs" key={index}>{data}</div>

                                    ))
                                }

                            </div>

                            {/* form data */}
                            <form autoComplete='off'>
                                <div className="grid grid-cols-12 gap-2 mx-1 rounded-md mt-1 p-1 bg-gray-100 border ">
                                    {/* FromAge */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='fromAge'
                                            value={referanceRangePopupFormData?.fromAge || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* ToAge */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='toAge'
                                            value={referanceRangePopupFormData?.toAge || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* MinValue */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='minValue'
                                            value={referanceRangePopupFormData?.minValue || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* MaxValue */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='maxValue'
                                            value={referanceRangePopupFormData?.maxValue || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* MinCritical */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='minCritical'
                                            value={referanceRangePopupFormData?.minCritical || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* MixCritical */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='maxCritical'
                                            value={referanceRangePopupFormData?.maxCritical || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* MinAutoApp */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='minAutoApprovalValue'
                                            value={referanceRangePopupFormData?.minAutoApprovalValue || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* MaxAutoApp */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='maxAutoApprovalValue'
                                            value={referanceRangePopupFormData?.maxAutoApprovalValue || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* Unit */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='unit'
                                            value={referanceRangePopupFormData?.unit || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* Ref.Range */}
                                    <div className="col-span-1">
                                        <input
                                            // rows={1}
                                            type='text'
                                            name='reportReading'
                                            value={referanceRangePopupFormData?.reportReading || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />

                                        {/* </input> */}
                                    </div>
                                    {/* DefaultValue */}
                                    <div className="col-span-1">
                                        <input
                                            type="text"
                                            name='defaultValue'
                                            value={referanceRangePopupFormData?.defaultValue || ''}
                                            onChange={handelOnChangeReferanceRangePopupFormData}
                                            className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                        />
                                    </div>
                                    {/* ADD Button */}
                                    <div className="col-span-1 text-center">
                                        <button
                                            type="button"
                                            data-ripple-light="true"
                                            className="relative overflow-hidden px-3 py-1 rounded" style={{ background: activeTheme?.subMenuColor, color: activeTheme?.iconColor }}
                                            onClick={onSubmitReferanceRangePopFormData}
                                        >
                                            {
                                                isButtonClick === 5 ?
                                                    <FaSpinner className="w-full h-full animate-spin text-textColor" />
                                                    :
                                                    <CgAdd className='text-lg cursor-pointer' />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>


                            {
                                allreferanceRangePopupFormData.map((itemData, index) => (
                                    <form autoComplete="off" key={index}>
                                        <div className="grid grid-cols-12 gap-2 mx-1 rounded-md mt-1 p-1 bg-gray-100">
                                            {/* FromAge */}
                                            <div className="flex flex-1 gap-1 items-center">
                                                <div className="text-xxxs font-semibold">
                                                    {itemData?.genderTextValue.charAt(0)}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={itemData?.fromAge}
                                                    name='fromAge'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'fromAge')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* ToAge */}
                                            <div className="col-span-1">
                                                <input
                                                    type="number"
                                                    value={itemData?.toAge}
                                                    name='toAge'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'toAge')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* MinValue */}
                                            <div className="col-span-1">
                                                <input
                                                    type="number"
                                                    value={itemData?.minValue}
                                                    name='minValue'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'minValue')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* MaxValue */}
                                            <div className="col-span-1">
                                                <input
                                                    type="number"
                                                    value={itemData?.maxValue}
                                                    name='maxValue'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'maxValue')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* MinCritical */}
                                            <div className="col-span-1">
                                                <input
                                                    type="number"
                                                    value={itemData?.minCritical}
                                                    name='minCritical'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'minCritical')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* MaxCritical */}
                                            <div className="col-span-1">
                                                <input
                                                    type="number"
                                                    value={itemData?.maxCritical}
                                                    name='maxCritical'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'maxCritical')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* MinAutoApp */}
                                            <div className="col-span-1">
                                                <input
                                                    type="number"
                                                    value={itemData?.minAutoApprovalValue}
                                                    name='minAutoApprovalValue'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'minAutoApprovalValue')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* MaxAutoApp */}
                                            <div className="col-span-1">
                                                <input
                                                    type="number"
                                                    value={itemData?.maxAutoApprovalValue}
                                                    name='maxAutoApprovalValue'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'maxAutoApprovalValue')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* Unit */}
                                            <div className="col-span-1">
                                                <input
                                                    type="text"
                                                    value={itemData?.unit}
                                                    name='unit'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'unit')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* Ref.Range */}
                                            <div className="col-span-1">
                                                <input
                                                    type="text"
                                                    value={itemData?.reportReading}
                                                    name='reportReading'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'reportReading')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* DefaultValue */}
                                            <div className="col-span-1">
                                                <input
                                                    type="text"
                                                    value={itemData?.defaultValue}
                                                    name='defaultValue'
                                                    onChange={(e) => handelOnChangeForUpdateReferanceRangePopupFormData(e, itemData?.id, 'defaultValue')}
                                                    className="border outline-none text-xxs border-gray-300 rounded w-full px-1 py-0.5"
                                                />
                                            </div>
                                            {/* ADD Button */}
                                            <div className="col-span-1 text-center flex justify-between items-center mx-5">


                                                <IoMdRemoveCircleOutline className="text-lg cursor-pointer text-red-500" onClick={() => {
                                                    setSingleGridData(itemData);
                                                    setDeletePopup(true)
                                                }} />



                                                <button type='button'
                                                    onClick={onSubmitUpdateReferanceRangePopFormData}
                                                >
                                                    {
                                                        isButtonClick === 6 && updatedRefeRangePopId === itemData?.id ?
                                                            <FaSpinner className="w-full h-full animate-spin text-textColor" />
                                                            :
                                                            <CiEdit className="text-lg cursor-pointer text-green-500" />

                                                    }
                                                </button>

                                            </div>
                                        </div>
                                    </form>
                                ))
                            }

                        </div >
                    </div >
                )
            }

            {
                deletePopUp === true && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50"
                        >

                            <div className="flex mt-3 items-center">
                                <IoAlertCircleOutline className="w-8 h-8" style={{ color: activeTheme?.menuColor }} />
                            </div>

                            <div className="text-xxxs font-semibold text-textColor/50">
                                Are you sure want to delete ?
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
                                        onClick={() => {
                                            setDeletePopup(false); setSingleGridData(null)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={deleteReferanceRangeSingleDataUsingId}>
                                    <div>
                                        {
                                            isButtonClick === 7 ?
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
