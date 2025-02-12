import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { allItemTypeInLabTestMaster, allSampleVolumeInLabTestMaster, colorsAndTypesInLabTestMaster, gendersInLabTestMaster, labTestMasterHeaderData, reportTypesInLabTestMaster } from '../../listData/listData';
import { getAllDepartmentApi, getAllDocumentApi, getAllLabMaterApi, getAllSampleTypeMaster, getSingleLabTestMasterData, saveTestLabMasterData, updateItemMasterStatus } from '../../../service/service';
import toast from 'react-hot-toast';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaArrowDown, FaArrowUp, FaRegEdit, FaSpinner } from 'react-icons/fa';
import { ImSwitch } from 'react-icons/im';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useRippleEffect from '../../customehook/useRippleEffect';

export default function LabTestMaster() {


    const [labTestMasterData, setLabTestMasterData] = useState({
        isActive: 1,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        itemId: 0,
        itemName: '',
        dispalyName: '',
        testMethod: '',
        deptId: 0,
        code: '',
        sortName: '',
        allowDiscont: 0,
        allowShare: 0,
        allowReporting: 0,
        itemType: 0,
        isOutsource: 0,
        lmpRequire: 0,
        reportType: 0,
        gender: '',
        DocumentId: 0,
        sampleVolume: '',
        containerColor: '',
        testRemarks: '',
        defaultsampletype: 0,
        agegroup: 0,
        samplelogisticstemp: '',
        printsamplename: 0,
        showinpatientreport: 0,
        showinonlinereport: 0,
        autosaveautoapprove: 0,
        printseperate: 0,
        isorganism: 0,
        culturereport: 0,
        ismic: 0,
        // showOnWebsite: 0,
        isSpecialItem: 0,
        isAllergyTest: 0,
        displaySequence: 0,
        consentForm: '',
        addSampletype: []
    });

    const [selectedSearchDropDownData, setSelectedSearchDropDownData] = useState({
        defaultsampletype: '',
    });

    const [clickedRowId, setClickedRowId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [formErrors, setFormErrors] = useState({}); // State to track validation errors

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    useRippleEffect();

    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isHovered, setIsHovered] = useState(null);
    const [allSampleTypeMasterData, setAllSampleTypeMaster] = useState([]);
    const [allDepartementData, setAllDepartementData] = useState([]);
    const [allDocumentData, setAllDocumentData] = useState([]);
    const [allDefaultSampleType, setAllDefaultSampleType] = useState([]);
    const [allTestLabMasterData, setAllTestLabMasterData] = useState([]);
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [isEditData, setIsEditData] = useState(false);

    useEffect(() => {

        const getAllTypeMaster = async () => {
            try {
                const response = await getAllSampleTypeMaster();
                setAllSampleTypeMaster(response);
            } catch (err) {
                toast.error(err?.message);
            }
        };

        getAllTypeMaster();


        const getAllDepartement = async () => {

            try {
                const response = await getAllDepartmentApi();
                setAllDepartementData(response);
            } catch (err) {
                toast.error(err?.message)
            }
        }
        getAllDepartement();


        const getAllDocument = async () => {
            try {
                const resp = await getAllDocumentApi();
                setAllDocumentData(resp);
            } catch (error) {
                toast.error(error?.message)
            }
        }
        getAllDocument();


    }, [])


    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    };


    const handelOnChangeLabTestMasterData = (event) => {
        // setLabTestMasterData({ ...labTestMasterData, [event.target.name]: event.target.value });
        setLabTestMasterData((preventDefault) => ({
            ...preventDefault,
            [event.target.name]: event.target.value
        }));

    }


    const handleCheckboxChange = (e, data) => {
        const isChecked = e.target.checked;

        //store the defaultsample type
        setAllDefaultSampleType((prev) => {
            if (isChecked) {
                // Add the new data to the state
                return [...prev, data];
            } else {
                // Remove the data from the state if unchecked
                return prev.filter((item) => item.id !== data.id);
            }
        });


        setLabTestMasterData((prevData) => {

            const updatedAccess = [...prevData.addSampletype];

            if (isChecked) {

                const updatedItem = {
                    isActive: 1,
                    id: 0,
                    itemId: 0,
                    sampleTypeId: data?.id,
                    sampleTypeName: data?.sampleTypeName,
                    isDefault: 0,
                    createdById: parseInt(user?.employeeId),
                    createdDateTime: new Date().toISOString(),
                    updateById: 0,
                    updateDateTime: null
                };


                updatedAccess.push(updatedItem);

            } else {
                // Remove the department data
                const index = updatedAccess.findIndex(
                    (item) => item?.sampleTypeId === data?.id
                );
                if (index !== -1) {
                    updatedAccess.splice(index, 1);
                }
            }

            return {
                ...prevData,
                addSampletype: updatedAccess,
            };
        });

    };


    const validateForm = () => {
        const errors = {};

        // Check for  fields
        if (!labTestMasterData.code) errors.code = true;
        if (!labTestMasterData.itemName) errors.itemName = true;

        if (labTestMasterData.itemType === '3') {
            errors.sampleVolume = false;
        } else if (!labTestMasterData.sampleVolume) {
            errors.sampleVolume = true;
        }


        if (labTestMasterData.itemType === '3') {
            errors.containerColor = false;
        } else if (!labTestMasterData.containerColor) {
            errors.containerColor = true;
        }


        if (labTestMasterData.itemType === '3') {
            errors.reportType = false;
        } else if (!labTestMasterData.reportType) {
            errors.reportType = true;
        }

        if (labTestMasterData.itemType === '3') {
            errors.addSampletype = false;
        } else if (!labTestMasterData?.addSampletype?.length) {
            errors.addSampletype = true;
        }

        if (labTestMasterData.itemType === '3') {
            errors.defaultsampletype = false;
        } else if (!labTestMasterData.defaultsampletype) errors.defaultsampletype = true;



        if (!labTestMasterData.sortName) errors.sortName = true;

        if (!labTestMasterData.testMethod) errors.testMethod = true;
        if (!labTestMasterData.itemType) errors.itemType = true;

        if (!labTestMasterData.deptId) errors.deptId = true;


        // Update state with errors
        setFormErrors(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };


    useEffect(() => {
        if (!validateForm()) {
            setIsButtonClick(0);
        }
    }, [labTestMasterData]);


    //save lab test master data
    const onSubmitSaveLabTestMaster = async (event) => {

        event.preventDefault();
        setIsButtonClick(1);

        // Validate form before submitting
        if (!validateForm()) {
            toast.error("Please fill in all mandatory fields correctly.");
            setIsButtonClick(0);
            return;
        }

        const updatedFormData = {
            ...labTestMasterData,
            createdDateTime: new Date().toISOString(),
            createdById: parseInt(user?.employeeId),
            dispalyName: labTestMasterData?.itemName,
            DocumentId: parseInt(labTestMasterData?.DocumentId)
        };



        try {
            const resp = await saveTestLabMasterData(updatedFormData);
            if (resp?.success) {
                toast.success(resp?.message);
                setLabTestMasterData({
                    isActive: 1,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    itemId: 0,
                    itemName: '',
                    dispalyName: '',
                    testMethod: '',
                    deptId: 0,
                    code: '',
                    sortName: '',
                    allowDiscont: 0,
                    allowShare: 0,
                    allowReporting: 0,
                    itemType: 0,
                    isOutsource: 0,
                    lmpRequire: 0,
                    reportType: 0,
                    gender: '',
                    DocumentId: 0,
                    sampleVolume: '',
                    containerColor: '',
                    testRemarks: '',
                    defaultsampletype: 0,
                    agegroup: 0,
                    samplelogisticstemp: '',
                    printsamplename: 0,
                    showinpatientreport: 0,
                    showinonlinereport: 0,
                    autosaveautoapprove: 0,
                    printseperate: 0,
                    isorganism: 0,
                    culturereport: 0,
                    ismic: 0,
                    isSpecialItem: 0,
                    isAllergyTest: 0,
                    displaySequence: 0,
                    consentForm: '',
                    addSampletype: []
                });

                setSelectedSearchDropDownData({ defaultsampletype: '' });

            } else {
                toast.error(resp?.message)
            }

        } catch (error) {
            toast.error(error?.message);

        }

        setIsButtonClick(0);
    }

    // get all lab test master
    useEffect(() => {

        const getAllLabMasterData = async () => {

            try {
                const response = await getAllLabMaterApi();
                setAllTestLabMasterData(response?.data);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllLabMasterData();

    }, [isButtonClick])



    //update test master  status
    const handleTheUpdateStatus = async () => {

        setIsButtonClick(3);
        const userId = user?.employeeId;

        const newValue = clickedRowId?.isActive === 1 ? 0 : 1;


        await updateItemMasterStatus(clickedRowId?.itemId, newValue, userId).then((resp) => {

            if (resp?.success) {
                toast.success(resp?.message)
            } else {
                toast.error(resp?.message);
            }

        }).catch((err) => {
            toast.error(err?.message);
        })

        setIsButtonClick(0);
        setShowPopup(false);
    }


    //get single data for update
    const getSingleTestLabMasterDataForUpDate = async (itemId) => {

        try {
            const resp = await getSingleLabTestMasterData(itemId);

            if (resp?.success) {

                // Filter all centers based on matching centreId
                const filterSampleTypeData = allSampleTypeMasterData?.filter((center) =>
                    resp?.data?.addSampletype?.some(
                        (access) => access.sampleTypeId === center?.id
                    )
                );

                setAllDefaultSampleType(filterSampleTypeData);


                // Set selected dropdown values
                setSelectedSearchDropDownData((preventData) => ({
                    ...preventData,
                    defaultsampletype: allSampleTypeMasterData.filter((item) => item?.id === resp?.data?.defaultsampletype)[0]?.sampleTypeName,

                }));

                // Set lab test master data
                setLabTestMasterData((prevData) => ({
                    ...prevData, // Retain existing state values
                    ...resp.data, // Merge new data from response
                }));
            }
        } catch (err) {
            toast.error(err?.message || "An error occurred while fetching data.");
        }

    }


    //update lab test master data
    const onSubmitUpdateLabTestMaster = async (event) => {

        event.preventDefault();
        setIsButtonClick(1);


        // Validate form before submitting
        if (!validateForm()) {
            toast.error("Please fill in all mandatory fields correctly.");
            setIsButtonClick(0);
            return;
        }

        const updatedFormData = {
            ...labTestMasterData,
            updateDateTime: new Date().toISOString(),
            updateById: parseInt(user?.employeeId)
        };



        try {
            const resp = await saveTestLabMasterData(updatedFormData);

            if (resp?.success) {
                toast.success(resp?.message);
                setLabTestMasterData({
                    isActive: 1,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    itemId: 0,
                    itemName: '',
                    dispalyName: '',
                    testMethod: '',
                    deptId: 0,
                    code: '',
                    sortName: '',
                    allowDiscont: 0,
                    allowShare: 0,
                    allowReporting: 0,
                    itemType: 0,
                    isOutsource: 0,
                    lmpRequire: 0,
                    reportType: 0,
                    gender: '',
                    DocumentId: 0,
                    sampleVolume: '',
                    containerColor: '',
                    testRemarks: '',
                    defaultsampletype: 0,
                    agegroup: 0,
                    samplelogisticstemp: '',
                    printsamplename: 0,
                    showinpatientreport: 0,
                    showinonlinereport: 0,
                    autosaveautoapprove: 0,
                    printseperate: 0,
                    isorganism: 0,
                    culturereport: 0,
                    ismic: 0,
                    isSpecialItem: 0,
                    isAllergyTest: 0,
                    displaySequence: 0,
                    consentForm: '',
                    addSampletype: []
                });

                setSelectedSearchDropDownData({ defaultsampletype: '' });
            } else {
                toast.error(resp?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
    }

    const filterAllDefaultSampleTypeData = allDefaultSampleType?.filter((data) =>
        (data?.sampleTypeName?.toLowerCase() || '').includes(String(labTestMasterData?.defaultsampletype || '').toLowerCase())
    );



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
                <div>Lab Test Master</div>
            </div>

            {/* from data */}
            <form autoComplete='off'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

                    <div className='flex gap-[0.25rem]'>
                        {/* item type */}
                        <div className="relative flex-1">
                            <select
                                id="itemType"
                                value={labTestMasterData.itemType}
                                onChange={handelOnChangeLabTestMasterData}
                                name='itemType'
                                // defaultValue=''
                                className={`inputPeerField cursor-pointer peer ${formErrors.itemType ? "border-b-red-500" : "border-borderColor"
                                    } focus:outline-none `}
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

                        {/* Test Code */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="code"
                                name="code"
                                value={labTestMasterData.code}
                                onChange={handelOnChangeLabTestMasterData}
                                placeholder=" "
                                className={`inputPeerField peer ${formErrors.code ? "border-b-red-500" : "border-borderColor"
                                    } focus:outline-none`}
                            />
                            <label htmlFor="code" className="menuPeerLevel">
                                Test Code
                            </label>
                        </div>

                    </div>

                    {/* Test name */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            value={labTestMasterData.itemName}
                            onChange={handelOnChangeLabTestMasterData}
                            placeholder=" "
                            className={`inputPeerField peer ${formErrors.itemName ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
                        />
                        <label htmlFor="itemName" className="menuPeerLevel">
                            Test Name
                        </label>
                    </div>



                    {/*Short Name */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="sortName"
                            name="sortName"
                            value={labTestMasterData.sortName}
                            onChange={handelOnChangeLabTestMasterData}
                            placeholder=" "
                            className={`inputPeerField peer ${formErrors.sortName ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
                        />
                        <label htmlFor="sortName" className="menuPeerLevel">
                            Short Name
                        </label>
                    </div>



                    {/* Test Method */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="testMethod"
                            name="testMethod"
                            value={labTestMasterData.testMethod}
                            onChange={handelOnChangeLabTestMasterData}
                            placeholder=" "
                            className={`inputPeerField peer ${formErrors.testMethod ? "border-b-red-500" : "border-borderColor"
                                } focus:outline-none`}
                        />
                        <label htmlFor="testMethod" className="menuPeerLevel">
                            Test Method
                        </label>
                    </div>

                    {/* Sample Volume */}
                    <div className="relative flex-1">
                        <select
                            id="sampleVolume"
                            value={labTestMasterData.sampleVolume}
                            onChange={handelOnChangeLabTestMasterData}
                            name='sampleVolume'
                            disabled={labTestMasterData?.itemType === '3'}
                            className={`inputPeerField  peer ${formErrors.sampleVolume ? "border-b-red-500" : "border-borderColor"
                                } focus:outline-none ${labTestMasterData.itemType === '3' ? "cursor-not-allowed bg-gray-200" : "cursor-pointer"}`}
                        >
                            <option hidden className='text-gray-400'>
                                Select Option
                            </option>
                            {
                                allSampleVolumeInLabTestMaster?.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))
                            }

                        </select>
                        <label htmlFor="title" className="menuPeerLevel">
                            Sample Volume
                        </label>
                    </div>


                    {/* Container Color */}
                    <div className="relative flex-1">
                        <select
                            id="containerColor"
                            value={labTestMasterData.containerColor}
                            onChange={handelOnChangeLabTestMasterData}
                            name='containerColor'
                            disabled={labTestMasterData?.itemType === '3'}
                            className={`inputPeerField  peer ${formErrors.containerColor ? "border-b-red-500" : "border-borderColor"
                                } focus:outline-none ${labTestMasterData.itemType === '3' ? "cursor-not-allowed bg-gray-200" : "cursor-pointer"}`}
                        >
                            <option hidden className='text-gray-400'>
                                Select Option
                            </option>
                            {
                                colorsAndTypesInLabTestMaster?.map((data, index) => (
                                    <option key={index} value={data?.id}>
                                        {data?.value}
                                    </option>
                                ))
                            }
                        </select>
                        <label htmlFor="title" className="menuPeerLevel">
                            Container Color
                        </label>
                    </div>


                    {/*Test Remarks */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="testRemarks"
                            name="testRemarks"
                            value={labTestMasterData.testRemarks}
                            onChange={handelOnChangeLabTestMasterData}
                            placeholder=" "
                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                        />
                        <label htmlFor="testRemarks" className="menuPeerLevel">
                            Test Remarks
                        </label>
                    </div>


                    {/* Departement */}
                    <div className="relative flex-1">
                        <select
                            id="deptId"
                            value={labTestMasterData.deptId}
                            onChange={handelOnChangeLabTestMasterData}
                            name='deptId'
                            className={`inputPeerField cursor-pointer peer ${formErrors.deptId ? "border-b-red-500" : "border-borderColor"} focus:outline-none `}
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


                    {/* Gender */}
                    <div className="relative flex-1">
                        <select
                            id="gender"
                            value={labTestMasterData.gender}
                            onChange={handelOnChangeLabTestMasterData}
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
                        <label htmlFor="title" className="menuPeerLevel">
                            Gender
                        </label>
                    </div>

                    {/* Report Type */}
                    <div className="relative flex-1">
                        <select
                            id="reportType"
                            value={labTestMasterData.reportType}
                            onChange={handelOnChangeLabTestMasterData}
                            name='reportType'
                            disabled={labTestMasterData?.itemType === '3'}
                            className={`inputPeerField  peer ${formErrors.reportType ? "border-b-red-500" : "border-borderColor"
                                } focus:outline-none ${labTestMasterData.itemType === '3' ? "cursor-not-allowed bg-gray-200" : "cursor-pointer"}`}
                        >
                            <option hidden className='text-gray-400'>
                                Select Option
                            </option>
                            {
                                reportTypesInLabTestMaster?.map((data, index) => (
                                    <option key={index} value={data?.id}>
                                        {data?.value}
                                    </option>
                                ))
                            }
                        </select>
                        <label htmlFor="title" className="menuPeerLevel">
                            Report Type
                        </label>
                    </div>

                    {/* Sample Type */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] 
                               ${formErrors?.addSampletype ? "border-b-red-500" : "border-borderColor"
                                } rounded text-xxxs h-[1.6rem] text-[#495057] bg-white ${labTestMasterData.itemType === '3' ? "cursor-not-allowed " : ""}`}
                            onClick={() => showSearchBarDropDown !== 1 ? openShowSearchBarDropDown(1) : openShowSearchBarDropDown(0)}
                        >
                            <input
                                type="text"
                                id="addSampletype"
                                name="addSampletype"
                                disabled={labTestMasterData?.itemType === '3'}
                                value={
                                    labTestMasterData.addSampletype.length === 0
                                        ? ''
                                        : labTestMasterData.addSampletype
                                            .map((data) => data?.sampleTypeId)
                                            .join(', ')
                                }
                                onChange={handelOnChangeLabTestMasterData}
                                placeholder="Search Sample Type"
                                className={`w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none ${labTestMasterData.itemType === '3' ? "cursor-not-allowed " : "cursor-pointer"}`}
                            />
                            <label htmlFor="addSampletype" className="menuPeerLevel">
                                Sample Type
                            </label>

                            <div>
                                {
                                    showSearchBarDropDown === 1 ? <RiArrowDropUpLine className='text-xl cursor-pointer' /> : <RiArrowDropDownLine className='text-xl cursor-pointer' />
                                }
                            </div>
                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 1 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">

                                {
                                    allSampleTypeMasterData?.length === 0 ?

                                        <div className='py-4 text-gray-500 text-center'>
                                            {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                                        </div>
                                        :
                                        <ul className='w-full'>
                                            {/* Select All Checkbox */}
                                            <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full h-full">
                                                <div>
                                                    {/* <input
                                                                            type="checkbox"
                                                                            checked={formData.subMenuId.split(',').length === allSubMenuData?.length && allSubMenuData?.length > 0}
                                                                            onChange={(e) => {
                                                                                const allIds = allSubMenuData?.map((data) => data.id.toString());
                                                                                if (e.target.checked) {
                                                                                    // Select all checkboxes
                                                                                    setFormData((prevFormData) => ({
                                                                                        ...prevFormData,
                                                                                        subMenuId: allIds.join(','),
                                                                                    }));
                                                                                    setIsValid((prevState) => ({
                                                                                        ...prevState,
                                                                                        subMenuId: allIds.length > 0,
                                                                                    }));
                                                                                } else {
                                                                                    // Deselect all checkboxes
                                                                                    setFormData((prevFormData) => ({
                                                                                        ...prevFormData,
                                                                                        subMenuId: '',
                                                                                    }));
                                                                                    setIsValid((prevState) => ({
                                                                                        ...prevState,
                                                                                        subMenuId: false,
                                                                                    }));
                                                                                }
                                                                            }}
                                                                        /> */}
                                                </div>
                                                <div className="w-full">
                                                    {/* <input
                                                                            type="search"
                                                                            name="searchSubMenuList"
                                                                            id="searchSubMenuList"
                                                                            className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.6rem]"
                                                                            // onChange={handleSearchMultiSelectDropDown}
                                                                            placeholder="Search..."
                                                                        /> */}
                                                </div>
                                            </li>


                                            {/* Individual Checkboxes */}
                                            {allSampleTypeMasterData?.length > 0 ? (
                                                allSampleTypeMasterData?.map((data, index) => {

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
                                                                    checked={labTestMasterData?.addSampletype?.some((item) => item?.sampleTypeId === data?.id)}
                                                                    onChange={(e) => handleCheckboxChange(e, data)}
                                                                />
                                                            </div>
                                                            <div>{data?.sampleTypeName}</div>
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


                    {/* Default Sample Type */}
                    <div className="relative flex-1">
                        <input
                            type="search"
                            id="defaultsampletype"
                            name="defaultsampletype"
                            disabled={labTestMasterData?.itemType === '3'}
                            value={selectedSearchDropDownData?.defaultsampletype || labTestMasterData?.defaultsampletype || ''}
                            onChange={(e) => {
                                handelOnChangeLabTestMasterData(e),
                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        defaultsampletype: ''
                                    }))
                            }}
                            onClick={() => openShowSearchBarDropDown(3)}
                            placeholder=" "
                            className={`inputPeerField peer ${formErrors?.defaultsampletype ? "border-b-red-500" : "border-borderColor"
                                } focus:outline-none ${labTestMasterData.itemType === '3' ? "cursor-not-allowed bg-gray-200" : "cursor-pointer"}`}
                        />
                        <label htmlFor="defaultsampletype" className="menuPeerLevel">
                            Default Sample Type
                        </label>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 3 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {filterAllDefaultSampleTypeData?.length > 0 ? (
                                        filterAllDefaultSampleTypeData?.map((data, index) => (
                                            <li
                                                key={data?.id}
                                                name="defaultsampletype"
                                                className="my-1 px-2 cursor-pointer"
                                                onClick={(e) => {
                                                    setSelectedSearchDropDownData((preventData) => ({
                                                        ...preventData,
                                                        defaultsampletype: data?.sampleTypeName,
                                                    }));
                                                    openShowSearchBarDropDown(0);
                                                    handelOnChangeLabTestMasterData({
                                                        target: { name: 'defaultsampletype', value: data?.id },
                                                    });
                                                }}
                                                onMouseEnter={() => setIsHovered(index)}
                                                onMouseLeave={() => setIsHovered(null)}
                                                style={{
                                                    background:
                                                        isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                }}
                                            >
                                                {data?.sampleTypeName}
                                            </li>

                                        ))
                                    ) : (
                                        <li className="py-4 text-gray-500 text-center">
                                            {import.meta.env.VITE_API_SELECT_SAMPLE_TYPE || 'No records found'}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Document */}
                    <div className="relative flex-1">
                        <select
                            id="DocumentId"
                            value={labTestMasterData.DocumentId}
                            onChange={handelOnChangeLabTestMasterData}
                            name='DocumentId'
                            // defaultValue=''
                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                        >
                            <option hidden className='text-gray-400'>
                                Select Option
                            </option>
                            {
                                allDocumentData?.map((data) => (
                                    <option key={data?.id} value={data?.id}>
                                        {data?.documentType}
                                    </option>
                                ))
                            }
                        </select>
                        <label htmlFor="DocumentId" className="menuPeerLevel">
                            Document
                        </label>
                    </div>


                    {/*Age Group (In Days) */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="agegroup"
                            name="agegroup"
                            value={labTestMasterData.agegroup}
                            onChange={handelOnChangeLabTestMasterData}
                            placeholder=" "
                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                        />
                        <label htmlFor="agegroup" className="menuPeerLevel">
                            Age Group (In Days)
                        </label>
                    </div>


                    {/*Sample Logistics Temp */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="samplelogisticstemp"
                            name="samplelogisticstemp"
                            value={labTestMasterData.samplelogisticstemp}
                            onChange={handelOnChangeLabTestMasterData}
                            placeholder=" "
                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                        />
                        <label htmlFor="samplelogisticstemp" className="menuPeerLevel">
                            Sample Logistics Temp
                        </label>
                    </div>


                    {/* Is Allergy Test */}
                    <div className="relative flex-1">
                        <select
                            id="isAllergyTest"
                            name='isAllergyTest'
                            disabled={labTestMasterData?.itemType === '3'}
                            value={labTestMasterData.isAllergyTest}
                            onChange={handelOnChangeLabTestMasterData}
                            className={`inputPeerField ${labTestMasterData.itemType === '3' ? "cursor-not-allowed bg-gray-200" : "cursor-pointer"} peer border-borderColor focus:outline-none `}
                        >
                            <option disabled hidden className='text-gray-400'>
                                Select Option
                            </option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                        <label htmlFor="isAllergyTest" className="menuPeerLevel">
                            Allergy Test
                        </label>
                    </div>

                    {/* Show In Patlent Report */}
                    <div className="relative flex-1">
                        <select
                            id="showinpatientreport"
                            name='showinpatientreport'
                            value={labTestMasterData.showinpatientreport}
                            onChange={handelOnChangeLabTestMasterData}
                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                        >
                            <option disabled hidden className='text-gray-400'>
                                Select Option
                            </option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                        <label htmlFor="showinpatientreport" className="menuPeerLevel">
                            Show In Patlent Report
                        </label>
                    </div>


                    {/* Print Separate */}
                    <div className="relative flex-1">
                        <select
                            id="printseperate"
                            name='printseperate'
                            disabled={labTestMasterData?.itemType === '3'}
                            value={labTestMasterData.printseperate}
                            onChange={handelOnChangeLabTestMasterData}
                            className={`inputPeerField ${labTestMasterData.itemType === '3' ? "cursor-not-allowed bg-gray-200" : "cursor-pointer"} peer border-borderColor focus:outline-none `}
                        >
                            <option value="" disabled hidden className='text-gray-400'>
                                Select Option
                            </option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                        <label htmlFor="printseperate" className="menuPeerLevel">
                            Print Separate
                        </label>
                    </div>

                    <div className='flex gap-[0.25rem]'>
                        {/* Active */}
                        <div className="relative flex-1">
                            <select
                                id="isActive"
                                name='isActive'
                                value={labTestMasterData.isActive}
                                onChange={handelOnChangeLabTestMasterData}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option value="" disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            <label htmlFor="isActive" className="menuPeerLevel">
                                Active
                            </label>
                        </div>

                        <div className="relative flex-1 flex justify-start items-center">

                            {
                                isEditData ? <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    style={{
                                        background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    }}
                                    onClick={onSubmitUpdateLabTestMaster}
                                >

                                    {
                                        isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Update'
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
                                        onClick={onSubmitSaveLabTestMaster}
                                    >

                                        {
                                            isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                        }

                                    </button>
                            }

                        </div>
                    </div>
                </div>
            </form>


            <div>
                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                    </div>
                    <div>Lab Test Master Details</div>
                </div>

                {/* show data in table */}
                <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                    <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <tr>
                            {labTestMasterHeaderData.map((data, index) => (
                                <td
                                    key={index}
                                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                                >
                                    <div className="flex gap-1">
                                        <div>{data}</div>
                                        {data !== 'Action' && (
                                            <div className="flex items-center gap-1">
                                                <div>
                                                    <FaArrowUp className="text-xxs cursor-pointer" />
                                                </div>
                                                <div>
                                                    <FaArrowDown className="text-xxs cursor-pointer" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </thead>

                    <tbody>

                        {
                            allTestLabMasterData?.map((data, index) => {

                                return (
                                    <tr
                                        className={`cursor-pointer 
                                                        ${isHoveredTable === data?.empId
                                                ? ''
                                                : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                            }`}
                                        key={data?.itemId}
                                        onMouseEnter={() => setIsHoveredTable(data?.itemId)}
                                        onMouseLeave={() => setIsHoveredTable(null)}
                                        style={{
                                            background:
                                                isHoveredTable === data?.itemId ? activeTheme?.subMenuColor : undefined,
                                        }}
                                    >
                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.itemId}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.itemType}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.itemCode}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.itemName}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.deptName}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.sampleTypeName}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.reporttype}
                                        </td>

                                        <td className="border-b px-4 h-5 flex items-center text-xxs font-semibold gap-2">
                                            <button className="w-4 h-4 flex justify-center items-center">
                                                <FaRegEdit
                                                    className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                                        }`}
                                                    onClick={() => {
                                                        if (data?.isActive === 1) {
                                                            getSingleTestLabMasterDataForUpDate(data?.itemId);
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
                                                        setClickedRowId(data);
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
