import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { IoMdAdd, IoMdCloseCircleOutline, IoMdMenu } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { FaArrowDown, FaArrowUp, FaCalendarAlt, FaRegEdit, FaSpinner } from 'react-icons/fa';
import { getAllBankNameApi, getAllBillingTypeApi, getAllCityApi, getAllDistrictApi, getAllDocumentApi, getAllParentCenterTypeApi, getAllProcessingLabApi, getAllStateApi, getAllZoneApi, getCenterAccessDataApi, getCenterTypeMasterApi, getCentreMasterApi, getRateTypeApi, getRateTypeMRPApi, getSalesExecutiveApi, getSingleClientMasterData, saveActiveAndDiActiveClientmaster, saveCentreMasterApi, saveCityApi, saveDistrictApi, saveStateApi } from '../../../../service/service';
import toast from 'react-hot-toast';
import { clientMasterHeaderList } from '../../../listData/listData';
import { ImSwitch } from 'react-icons/im';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import UserCalendar from '../../../public/UserCalendar';
import useRippleEffect from '../../../customehook/useRippleEffect';


export default function ClientMaster() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);

    useRippleEffect();

    const [billingType, setBillingType] = useState('');
    const [formData, setFormData] = useState({
        createdById: parseInt(user?.employeeId),
        centretype: '',
        centretypeid: 0,
        centreId: 0,//add new
        parentCentreID: 0,
        processingLab: 0,
        centrecode: '',
        companyName: '',
        mobileNo: '',
        address: '',
        pinCode: 0,
        //creditPeridos: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        creditPeridos: '',
        minBookingAmt: 0,
        creditLimt: 0,
        email: '',
        paymentMode: '',
        paymentModeId: 0,
        //====add new===
        reportHeader: '',
        reciptHeader: '',
        reciptFooter: '',
        reportBackImage: '',
        lockedBy: 0,
        lockDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        unlockBy: '',
        unlockDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        //===end add new====
        zoneId: 0,
        state: 0,
        districtId: 0,
        cityId: 0,
        clientmrpId: 0,
        patientRate: 0,
        clientmrp: 0,
        clientRate: 0,
        adharNo: '',
        reportEmail: '',
        ownerName: '',
        pan: '',
        addEmpCenterAccess: [],
        salesExecutiveID: 0,
        documentType: 0,
        document: '',
        chequeNo: '',
        bankName: '',
        bankID: 0,
        ifscCode: '',
        isPrePrintedBarcode: 0,
        isActive: 1,
        showBackcover: 0,
        showISO: 0,
        receptionarea: 0,
        waitingarea: 0,
        watercooler: 0,
        ac: 0,
        chequeAmount: 0,
        proId: 0,
        allowDueReport: 0,
        reportLock: 0,
        bookingLock: 0,
        unlockTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
        reporrtHeaderHeightY: 0,
        patientYHeader: 0,
        barcodeXPosition: 0,
        barcodeYPosition: 0,
        qrCodeXPosition: 0,
        qrCodeYPosition: 0,
        isQRheader: 0,
        isBarcodeHeader: 0,
        footerHeight: 0,
        nabLxPosition: 0,
        nabLyPosition: 0,
        docSignYPosition: 0,
        receiptHeaderY: 0,
        bankAccount: '',
        isDefault: 0,
        isLab: 0,
        showClientCode: 0,
        isLock: 0
    });
    const [isHovered, setIsHovered] = useState(null);
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [showRateTypeData, setShoRateTypeData] = useState({
        centerTypeId: 1,
        parentCentreId: 1
    })
    const [selectedSearchDropDownData, setSelectedSearchDropDownData] = useState({
        parentCentreID: '',
        processingLab: '',
        state: 0,
        districtId: 0,
        cityId: 0,
        clientmrp: '',
        patientRate: '',
        addEmpCenterAccess: [],
        salesExecutiveID: '',
        bankName: '',
    })
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [inputFieldForSateCityDistrict, setInputFieldForStateCityDistrict] = useState('');
    const [allBillingTypeData, setBillingTypeData] = useState([]);
    const [allCenterTypeMasterData, setAllCenterTypeMasterData] = useState([]);
    const [allBankNameData, setAllBankNameData] = useState([]);
    const [allParentCenterData, setAllParentCenterData] = useState([]);
    const [allProcessingLabData, setAllProcessingLabData] = useState([]);
    const [allZoneData, setAllZoneData] = useState([]);
    const [allStateData, setAllStateData] = useState([]);
    const [allDistrictData, setAllDistrictData] = useState([]);
    const [allCityData, setAllCityData] = useState([]);
    const [allClientMrpData, setClientMrpData] = useState([]);
    const [allRateTypeData, setRateTypeData] = useState([]);
    const [allCenterAccessData, setAllCenterAccessData] = useState([]);
    const [allSalesExecutiveData, setAllSalesExecutiveData] = useState([]);
    const [allDocumentData, setAllDocumentData] = useState([]);
    const [allCentreData, setAllCentreData] = useState([]);
    const [openModelForStateOrDistrictOrCityData, setopenModelForStateOrDistrictOrCityData] = useState('');
    const [isErrorForAddSateCityDistrict, setisErrorForAddSateCityDistrict] = useState('')
    const [documentImage, setDocumentImage] = useState();
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [showActivePopup, setShowActivePopup] = useState(false);
    const [clickedRowId, setClickedRowId] = useState(null);
    const [formErrors, setFormErrors] = useState({}); // State to track validation errors
    const [isEditData, setIsEditData] = useState(false);
    const [showCalander, setShowCalander] = useState(false);

    const [listOfSelectedEmployee, setListOfSelectedEmployee] = useState([]);

    const handleCheckboxClick = (data, isChecked) => {
        // const currentTime = new Date().toISOString(); // Get the current timestamp
        // console.log(data);

        setListOfSelectedEmployee((prevList) => {
            // Create the full data object with the default fields
            const fullData = {
                isActive: 1, // Default value for isActive
                createdById: parseInt(user?.employeeId), // Replace with actual value (e.g., user?.employeeId)
                createdDateTime: new Date().toISOString(),
                id: 0, // Default value for id
                empId: parseInt(data?.empId), // Use empId from the data
                centreId: 0, // Default value for centreId
                updateById: 0,
                updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
            };

            // Update the list based on whether the checkbox is checked or not
            if (isChecked) {
                // Add to the list if checked
                return [...prevList, fullData];
            } else {
                // Remove from the list if unchecked
                return prevList.filter((item) => item.empId !== data.empId);
            }
        });
    };

    //handel calander data click
    const handleDateClick = (date) => {
        const formatDate = (date) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
        };

        const creditPeridos = formatDate(date);
        setFormData((prevData) => ({
            ...prevData,
            creditPeridos // Set formatted date in searchData
        }));
        setShowCalander(false);
    };

    useEffect(() => {

        async function getBillingType() {
            const response = await getAllBillingTypeApi();
            setBillingTypeData(response);
        }
        getBillingType();

        async function getAllBankName() {

            await getAllBankNameApi().then((resp) => {
                setAllBankNameData(resp);
            }).catch((err) => {
                toast.error(err.message);
            })
        }

        getAllBankName();


        async function getAllParentCenter() {
            await getAllParentCenterTypeApi().then((resp) => {
                //console.log(resp);
                setAllParentCenterData(resp?.data);
            }).catch((err) => {
                toast.error(err?.message);
            })
        }
        getAllParentCenter();


        async function getAllProcessing() {
            await getAllProcessingLabApi().then((resp) => {
                if (resp.success) {

                    setAllProcessingLabData(resp?.data)
                }

            }).catch((err) => {
                toast.error(err?.message)
            })
        }
        getAllProcessing();


        async function getAllZone() {
            await getAllZoneApi().then((resp) => {
                setAllZoneData(resp);
            }).catch((err) => {
                toast.error(err?.message)
            })
        }

        getAllZone();

        async function getMrpRateType() {

            await getRateTypeMRPApi().then((resp) => {
                if (resp?.success) {
                    setClientMrpData(resp?.data);
                }
            }).catch((err) => {
                toast.error(err?.message);
            })
        }
        getMrpRateType();


        async function getCenterAccess() {
            await getCenterAccessDataApi().then((resp) => {

                setAllCenterAccessData(resp);
            }).catch((err) => {
                toast.error(err?.message);
            })
        }
        getCenterAccess();


        async function getSalesExecutive() {

            await getSalesExecutiveApi().then((resp) => {
                setAllSalesExecutiveData(resp);
            }).catch((err) => {
                toast.error(err?.message);
            })
        }
        getSalesExecutive();


        async function allDocument() {

            await getAllDocumentApi().then((resp) => {
                setAllDocumentData(resp)
            }).catch((err) => {
                toast.error(err.message);
            })
        }
        allDocument();

    }, [])

    //get center id
    useEffect(() => {

        async function getCenterTypeData() {

            await getCenterTypeMasterApi(billingType).then((resp) => {

                if (resp?.success) {

                    setAllCenterTypeMasterData(resp?.data);
                }

            }).catch((err) => {
                toast.error(err?.message);
            })
        }

        if (billingType !== '') {
            getCenterTypeData();
        }
    }, [billingType])

    useEffect(() => {
        async function getRateType() {

            await getRateTypeApi(showRateTypeData.centerTypeId, showRateTypeData.parentCentreId).then((resp) => {
                if (resp?.success) {
                    setRateTypeData(resp?.data);
                }

            }).catch((err) => {
                toast.error(err.message)
            })
        }
        getRateType();
    }, [showRateTypeData])


    useEffect(() => {

        async function getStateData() {
            await getAllStateApi().then((resp) => {
                setAllStateData(resp)
            }).catch((err) => {
                toast.error(err?.message)
            })
        }
        getStateData();

        async function getDistrictData() {
            await getAllDistrictApi().then((resp) => {
                setAllDistrictData(resp)
            }).catch((err) => {
                toast.error(err?.message)
            })
        }
        getDistrictData();


        async function getCityData() {
            await getAllCityApi().then((res) => {
                setAllCityData(res);
            }).catch((err) => {
                toast.error(err.message);
            })
        }
        getCityData();



        async function getClientMaster() {

            await getCentreMasterApi().then((resp) => {
                setAllCentreData(resp);
            }).catch((err) => {
                toast.error(err?.message);
            })
        }
        getClientMaster();

    }, [isButtonClick])


    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    };


    const handelChangeFormData = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }


    const handleDocumentChangeForImage = (event) => {

        setDocumentImage(event.target.value);

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((preventData) => ({
                    ...preventData,
                    document: reader.result
                }))
            };
            reader.readAsDataURL(file); // Convert the file to base64 URL
        }


    };

    const openModelForStateOrDistrictOrCity = (value) => {
        setopenModelForStateOrDistrictOrCityData(value)
    }


    //saveStateOrCityOrDistrict
    const saveStateOrCityOrDistrict = async () => {

        setIsButtonClick(2)

        const fieldMapping = {
            State: { dependency: 'zoneId', errorMessage: 'Please Select zone' },
            District: { dependency: 'state', errorMessage: 'Please Select state' },
            City: { dependency: 'districtId', errorMessage: 'Please Select district' },
        };

        const currentField = fieldMapping[openModelForStateOrDistrictOrCityData];


        if (currentField) {

            const dependencyValue = formData[currentField.dependency];



            if (!dependencyValue) {
                setisErrorForAddSateCityDistrict(currentField.errorMessage);
                setIsButtonClick(0);
                return;
            } else {

                if (currentField.dependency === 'zoneId') {

                    const stateData = {
                        createdById: user?.employeeId,
                        createdDateTime: new Date().toLocaleString('en-US', { hour12: true }).replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`),
                        state: inputFieldForSateCityDistrict,
                        zoneId: formData?.zoneId,
                        isActive: 1
                    }

                    await saveStateApi(stateData).then((resp) => {


                        if (resp.success) {
                            toast.success(resp?.message);
                            // setFormData((prevData) => ({
                            //     ...prevData,
                            //     state: resp?.id, // Correct usage of key
                            // }));

                            // setSelectedSearchDropDownData((preventData) => ({
                            //     ...preventData,
                            //     state: resp?.state
                            // }))
                            setopenModelForStateOrDistrictOrCityData('');
                            setInputFieldForStateCityDistrict('')

                        } else {
                            toast.success(resp.message);
                            return;
                        }

                    }).catch((err) => {
                        toast.error(err?.message);
                    })


                } else if (currentField.dependency === 'state') {

                    const districtData = {
                        createdById: user?.employeeId,
                        createdDateTime: new Date().toLocaleString('en-US', { hour12: true }).replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`),
                        district: inputFieldForSateCityDistrict,
                        stateId: formData?.state,
                        isActive: 1
                    }

                    await saveDistrictApi(districtData).then((resp) => {

                        // setFormData((prevData) => ({
                        //     ...prevData,
                        //     districtId: resp?.districtId,
                        // }));

                        if (resp?.success) {
                            toast.success(resp?.message);
                            // setFormData((prevData) => ({
                            //     ...prevData,
                            //     state: resp?.id, // Correct usage of key
                            // }));

                            // setSelectedSearchDropDownData((preventData) => ({
                            //     ...preventData,
                            //     state: resp?.state
                            // }))
                            setopenModelForStateOrDistrictOrCityData('');
                            setInputFieldForStateCityDistrict('')

                        } else {
                            toast.success(resp.message);
                            return;
                        }


                    }).catch((err) => {
                        toast.error(err?.message);
                    })

                } else {

                    const cityData = {
                        cityName: inputFieldForSateCityDistrict,
                        districtid: formData?.districtId
                    }

                    await saveCityApi(cityData).then((resp) => {
                        // setFormData((prevData) => ({
                        //     ...prevData,
                        //     city: resp?.cityName, // Correct usage of key
                        // }));

                        if (resp?.success) {
                            toast.success(resp?.message);
                            // setFormData((prevData) => ({
                            //     ...prevData,
                            //     state: resp?.id, // Correct usage of key
                            // }));

                            // setSelectedSearchDropDownData((preventData) => ({
                            //     ...preventData,
                            //     state: resp?.state
                            // }))
                            setopenModelForStateOrDistrictOrCityData('');
                            setInputFieldForStateCityDistrict('')

                        } else {
                            toast.success(resp.message);
                            return;
                        }
                    }).catch((err) => {
                        toast.error(err?.message);
                    })
                }

            }
        }

        setIsButtonClick(0);
    }


    const validateForm = () => {
        const errors = {};

        // Check for  fields
        if (!formData.centretype) errors.centretype = true;
        if (!formData.centrecode) errors.centrecode = true;
        if (!formData.companyName) errors.companyName = true;
        if (!formData.address) errors.address = true;
        if (!formData.pinCode) errors.pinCode = true;
        if (!formData.email) errors.email = true;
        if (!formData.paymentMode) errors.paymentMode = true;
        if (!formData.ownerName) errors.ownerName = true;
        if (!formData.clientmrp) errors.clientmrp = true;
        if (!formData.creditLimt) errors.creditLimt = true;
        if (!formData.salesExecutiveID) errors.salesExecutiveID = true;
        if (listOfSelectedEmployee?.length === 0) {
            if (formData?.addEmpCenterAccess?.length === 0) {
                errors.addEmpCenterAccess = true;
            }
        }

        if (!formData.adharNo) errors.adharNo = true;
        if (!formData.pan) errors.pan = true;
        if (!selectedSearchDropDownData.patientRate) errors.patientRate = true;
        if (!formData.mobileNo || !/^\d{10}$/.test(formData.mobileNo)) {
            errors.mobileNo = true;
        }

        // Conditional validation
        if (["Franchisee", "Sub-Franchisee"].includes(formData.centretype) && !formData.processingLab) {
            errors.processingLab = true;
        }
        if (formData.centretype === "Sub-Franchisee" && !formData.parentCentreID) {
            errors.parentCentreID = true;
        }

        // Payment mode-specific validation
        if (formData.paymentMode === "2") {
            if (formData.creditLimt === 0) errors.creditLimt = true;
            if (formData.creditPeridos === 0) errors.creditPeridos = true;
        }

        // Update state with errors
        setFormErrors(errors);
        // console.log(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };


    useEffect(() => {

        if (!validateForm()) {
            setIsButtonClick(0);
        }
    }, [formData, listOfSelectedEmployee]);

    //save client master data
    const onSubmitClientMasterData = async (event) => {
        event.preventDefault();
        setIsButtonClick(1)

        // Validate form before submitting
        if (!validateForm()) {
            toast.error("Please fill in all mandatory fields correctly.");
            setIsButtonClick(0);
            return;
        }

        const updatedFormData = {
            ...formData,
            addEmpCenterAccess: listOfSelectedEmployee,
            createdDateTime: new Date().toISOString()
        };

        await saveCentreMasterApi(updatedFormData).then((resp) => {

            if (resp.success) {
                toast.success(resp?.message);

                setFormData({
                    createdById: parseInt(user?.employeeId),
                    centretype: '',
                    centretypeid: 0,
                    centreId: 0,//add new
                    parentCentreID: 0,
                    processingLab: 0,
                    centrecode: '',
                    companyName: '',
                    mobileNo: '',
                    address: '',
                    pinCode: 0,
                    creditPeridos: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    minBookingAmt: 0,
                    creditLimt: 0,
                    email: '',
                    paymentMode: '',
                    paymentModeId: 0,
                    //====add new===
                    reportHeader: '',
                    reciptHeader: '',
                    reciptFooter: '',
                    reportBackImage: '',
                    lockedBy: 0,
                    lockDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    unlockBy: '',
                    unlockDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    //===end add new====
                    zoneId: 0,
                    state: 0,
                    districtId: 0,//
                    cityId: 0,//
                    //clientmrpId: 0,
                    patientRate: 0,
                    clientmrp: 0,
                    clientRate: 0,
                    adharNo: '',
                    reportEmail: '',
                    ownerName: '',
                    pan: '',
                    addEmpCenterAccess: [],
                    salesExecutiveID: 0,
                    documentType: 0,
                    document: '',
                    chequeNo: '',
                    bankName: '',
                    bankID: 0,
                    ifscCode: '',
                    isPrePrintedBarcode: 0,
                    isActive: 1,
                    showBackcover: 0,
                    showISO: 0,
                    receptionarea: 0,
                    waitingarea: 0,
                    watercooler: 0,
                    ac: 0,
                    chequeAmount: 0,
                    proId: 0,
                    allowDueReport: 0,
                    reportLock: 0,
                    bookingLock: 0,
                    unlockTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
                    reporrtHeaderHeightY: 0,
                    patientYHeader: 0,
                    barcodeXPosition: 0,
                    barcodeYPosition: 0,
                    qrCodeXPosition: 0,
                    qrCodeYPosition: 0,
                    isQRheader: 0,
                    isBarcodeHeader: 0,
                    footerHeight: 0,
                    nabLxPosition: 0,
                    nabLyPosition: 0,
                    docSignYPosition: 0,
                    receiptHeaderY: 0,
                    bankAccount: '',
                    isDefault: 0,
                    isLab: 0,
                    showClientCode: 0,
                    isLock: 0
                });
            } else {
                toast.error(resp?.message);
            }

        }).catch((err) => {
            toast.error(err?.message);
            console.log(err);

        })

        setIsButtonClick(0);
    }


    //get single menu data for update
    const getSingleMenuDataForUpDate = async (data) => {

        await getSingleClientMasterData(data?.centreId).then((centerData) => {

            if (centerData.success) {
                async function getRateType() {

                    await getRateTypeApi(
                        data?.centretypeid,
                        data?.parentCentreID === 0 ? 1 : data?.parentCentreID
                    ).then((resp) => {

                        if (resp?.success) {


                            setRateTypeData(resp?.data);


                            setSelectedSearchDropDownData((...prevData) => ({
                                ...prevData,
                                parentCentreID: allParentCenterData?.find((item) => item?.centreId === data?.parentCentreID)?.companyName || '',
                                //need to change==================
                                processingLab: allParentCenterData?.filter((item) => item?.centreId
                                    === data?.parentCentreID)[0]?.companyName || '',
                                state: data?.state || '',
                                district: data?.district || '',
                                city: data?.city || '',

                                clientmrp: allClientMrpData?.filter((item) => item?.id === data?.clientmrp)[0]?.rateName || '',

                                patientRate: allRateTypeData?.filter((item) => item?.id === data?.patientRate)[0]?.rateName || 'Self',


                                addEmpCenterAccess: centerData?.data?.employeeAccess || '',


                                salesExecutiveID: allSalesExecutiveData?.find(item => item.empId === data?.salesExecutiveID)?.fName + " " + allSalesExecutiveData?.find(item => item.empId === data?.salesExecutiveID)?.lName,
                                bankName: data?.bankName || '',
                            }))



                            //setFormData(data);
                            setFormData({
                                ...data,
                                addEmpCenterAccess: centerData?.data?.employeeAccess || ''
                            })

                        }
                    }).catch((err) => {
                        toast.error(err.message);
                    });

                }
                getRateType();
            } else {
                toast.success(centerData.message)
            }


        }).catch((err) => {
            toast.error(err.message)
        })

    }


    //update client master data
    const onSubmitClientMasterDataForUpdate = async (event) => {

        event.preventDefault();
        setIsButtonClick(1)

        // Validate form before submitting
        if (!validateForm()) {
            toast.error("Please fill in all mandatory fields correctly.");
            setIsButtonClick(0);
            return;
        }

        const updatedFormData = {
            ...formData,
            addEmpCenterAccess: [],//selectedSearchDropDownData?.addEmpCenterAccess,
            updateDateTime: new Date().toISOString(),
            updateById: parseInt(user?.employeeId)
        };



        await saveCentreMasterApi(updatedFormData).then((resp) => {
            if (resp.success) {
                toast.success(resp?.message);
                setIsEditData(false);
            } else {
                toast.error(resp?.message);
            }

        }).catch((err) => {
            toast.error(err?.message);
            console.log(err);

        })

        setIsButtonClick(0);
    }


    //update menu is active or inactive
    const handleTheUpdateStatusMenu = async () => {

        setIsButtonClick(4);

        const newValue = clickedRowId?.isActive === 1 ? 0 : 1;


        await saveActiveAndDiActiveClientmaster(clickedRowId?.centreId, newValue, clickedRowId?.createdById).then((resp) => {

            if (resp?.success) {
                toast.success(resp?.message)
            } else {
                toast.error('Menu status not update');
            }

        }).catch((err) => {
            toast.error('Menu status not update error')
        })

        setIsButtonClick(0);
        setShowActivePopup(false);
    }

    //filter data
    const filterAllParentCenterData = allParentCenterData?.filter((data) =>
        data?.companyName.toLowerCase().includes(String(formData?.parentCentreID || '').toLowerCase())
    );



    //===========================================

    const filterAllProcessingLabData = allProcessingLabData?.filter((data) =>
        data?.companyName.toLowerCase().includes(String(formData?.processingLab || '').toLowerCase())
    );


    //allStateData
    const filterAllStateData = allStateData?.filter((data) =>
        data?.state.toLowerCase().includes(String(formData?.state || '').toLowerCase())
    );

    const filterAllDistrictData = allDistrictData?.filter((data) =>
        data?.district.toLowerCase().includes(String(formData?.districtId || '').toLowerCase())
    );

    const filterAllCityData = allCityData?.filter((data) =>
        data?.cityName.toLowerCase().includes(String(formData?.cityId || '').toLowerCase())
    );


    const filterclientMrpData = allClientMrpData?.filter((data) =>
        data?.rateName.toLowerCase().includes(String(formData?.clientmrp || '').toLowerCase())
    );



    const filterRateTypeData = allRateTypeData?.filter((data) =>
        data?.rateName.toLowerCase().includes(String(formData?.patientRate || '').toLowerCase())
    );

    const filtercenterAccessData = allCenterAccessData?.filter((data) =>
        data?.fName.toLowerCase().includes(String(formData?.addEmpCenterAccess || '').toLowerCase()) || data?.lName.toLowerCase().includes(String(formData?.addEmpCenterAccess || '').toLowerCase())
    );



    const filterSalesExecutiveData = allSalesExecutiveData?.filter((data) =>
        (data?.fName || '').toLowerCase().includes(String(formData?.salesExecutiveID || '').toLowerCase()) ||
        (data?.lName || '').toLowerCase().includes(String(formData?.salesExecutiveID || '').toLowerCase())
    );


    const filterBankNameData = allBankNameData?.filter((data) =>
        data?.bankName.toLowerCase().includes(String(formData?.bankName || '').toLowerCase())
    );


    return (
        <>
            {/* header sections */}
            <div
                className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                style={{ background: activeTheme?.blockColor }}
            >
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                </div>
                <div>Client Master</div>
            </div>

            <form autoComplete='off'>
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">


                    <div className='flex gap-[0.25rem]'>
                        <div className="relative flex-1">
                            <select
                                id="billingType"
                                name='billingType'
                                value={billingType || ''}
                                onChange={(e) => setBillingType(e.target.value)}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none ${billingType === '' ? "border-b-red-500" : "border-borderColor"}`}
                            >
                                <option value="" disabled className="text-gray-400">
                                    Select Option
                                </option>
                                {
                                    allBillingTypeData?.map((data) => (
                                        <option key={data?.id} value={data?.id}>{data?.billingTypeName}</option>

                                    ))
                                }
                            </select>
                            <label htmlFor="billingType" className="menuPeerLevel">
                                Billing Type
                            </label>
                        </div>

                        {/* centerType */}
                        <div className="relative flex-1">
                            <select
                                id="centretype"
                                value={formData?.centretype || ''}
                                name="centretype"
                                onChange={(e) => {

                                    const selectedOption = allCenterTypeMasterData.find(
                                        (data) => data.centerTypeName === e.target.value
                                    );

                                    setFormData((prevData) => ({
                                        ...prevData,
                                        centretype: e.target.value,
                                        centretypeid: selectedOption?.id,
                                    }));

                                    setShoRateTypeData((preventData) => ({
                                        ...preventData,
                                        centerTypeId: selectedOption?.id
                                    }))
                                }}
                                className={`inputPeerField cursor-pointer peer border focus:outline-none 
                                ${formErrors.centretype ? "border-b-red-500" : "border-borderColor"
                                    }`}
                            >
                                <option value="" disabled className="text-gray-400">
                                    Select Option
                                </option>
                                {allCenterTypeMasterData?.map((data) => (
                                    <option key={data.id} value={data.centerTypeName}>
                                        {data.centerTypeName}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="centretype" className="menuPeerLevel">
                                Centre Type
                            </label>
                            {/* {formErrors.centretype && (
                            <span className="text-red-500 text-xs">{formErrors.centretype}</span>
                        )} */}
                        </div>
                    </div>


                    {/* parentCenter */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] 
                             rounded text-xxxs h-[1.6rem] text-[#495057] bg-white 
                             ${formErrors.parentCentreID ? "border-b-red-500" : "border-borderColor"}`}
                        >
                            <input
                                type="search"
                                id="parentCentreID"
                                name="parentCentreID"
                                value={selectedSearchDropDownData?.parentCentreID || formData.parentCentreID || ''}  // Display selected menu name or the value from ,.menu
                                onChange={(e) => {
                                    handelChangeFormData(e)
                                    setSelectedSearchDropDownData(1);
                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        centerType: ''
                                    }))
                                }}
                                onClick={() => openShowSearchBarDropDown(1)}
                                autoComplete="off"
                                className={`w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none ${formData.centretype === 'SateLite Lab' || formData.centretype === 'Franchisee' ? 'cursor-not-allowed' : ''}`}
                                placeholder='Search Data'


                                disabled={formData.centretype === 'SateLite Lab' || formData.centretype === 'Franchisee'}  // Disable if Parent Menu is Yes
                            />

                            <label htmlFor="parentCentreID" className="menuPeerLevel">
                                Search Parent Center
                            </label>
                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 1 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {filterAllParentCenterData?.length > 0 ? (
                                        filterAllParentCenterData?.map((data, index) => (
                                            <li
                                                key={data.centreId}
                                                name="parentCentreID"
                                                className="my-1 px-2 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedSearchDropDownData((preventData) => ({
                                                        ...preventData,
                                                        parentCentreID: data?.companyName,
                                                    }));
                                                    openShowSearchBarDropDown(0);
                                                    handelChangeFormData({
                                                        target: { name: 'parentCentreID', value: data?.centreId },
                                                    }); // Simulated event

                                                    setShoRateTypeData((preventData) => ({
                                                        ...preventData,
                                                        parentCentreId: data?.centreId
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


                    {/* processingLab */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] ${formErrors.processingLab ? "border-b-red-500" : "border-borderColor"
                                } rounded text-xxxs h-[1.6rem] text-[#495057] bg-white 
                            
                            `}
                        >
                            <input
                                type="search"
                                id="processingLab"
                                name="processingLab"
                                value={selectedSearchDropDownData?.processingLab || formData.processingLab || ''}  // Display selected menu name or the value from ,.menu
                                onChange={(e) => {
                                    handelChangeFormData(e)

                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        processingLab: ''
                                    }))
                                }}
                                onClick={() => openShowSearchBarDropDown(2)}
                                autoComplete="off"
                                className={` w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none 
                                ${formData.centretype === 'SateLite Lab' ? 'cursor-not-allowed' : ''}
                                `}
                                placeholder='Search Data'

                                disabled={formData.centretype === 'SateLite Lab'}
                            />

                            <label htmlFor="processingLab" className="menuPeerLevel">
                                Search Processing Lab
                            </label>
                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 2 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {filterAllProcessingLabData?.length > 0 ? (
                                        filterAllProcessingLabData?.map((data, index) => (
                                            <li
                                                key={data.centreId}
                                                name="processingLab"
                                                className="my-1 px-2 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedSearchDropDownData((preventData) => ({
                                                        ...preventData,
                                                        processingLab: data?.companyName,
                                                    }));
                                                    openShowSearchBarDropDown(0);
                                                    handelChangeFormData({
                                                        target: { name: 'processingLab', value: data?.centreId },
                                                    }); // Simulated event
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


                    <div className='flex gap-[0.25rem]'>
                        {/* center code */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="centrecode"
                                name="centrecode"
                                value={formData.centrecode || ''}
                                onChange={handelChangeFormData}
                                placeholder=" "
                                className={`inputPeerField ${formErrors.centrecode ? "border-b-red-500" : "border-borderColor"
                                    } peer focus:outline-none`}
                            />
                            <label htmlFor="centrecode" className="menuPeerLevel">
                                Center Code
                            </label>
                        </div>

                        {/* mobileNo */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="mobileNo"
                                name="mobileNo"
                                value={formData.mobileNo || ''}
                                onChange={handelChangeFormData}
                                placeholder=" "
                                className={`inputPeerField ${formErrors.mobileNo ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none`}
                            />
                            <label htmlFor="mobileNo" className="menuPeerLevel">
                                Mobile Number
                            </label>
                        </div>
                    </div>

                    {/* Center Name */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName || ''}
                            onChange={handelChangeFormData}
                            placeholder=" "
                            className={`inputPeerField ${formErrors.companyName ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none`}
                        />
                        <label htmlFor="companyName" className="menuPeerLevel">
                            Center Name
                        </label>
                    </div>



                    {/* Center Address */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData?.address || ''}
                            onChange={handelChangeFormData}
                            placeholder=''
                            className={`inputPeerField 
                                ${formErrors.address ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none
                            `}
                        />
                        <label htmlFor="address" className="menuPeerLevel">
                            Center Address
                        </label>
                    </div>

                    <div className='flex gap-[0.25rem]'>
                        {/* pin code */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="pinCode"
                                name="pinCode"
                                value={formData.pinCode || ''}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        [event.target.name]: parseInt(event.target.value, 10) || 0,
                                    })
                                }
                                placeholder=" "
                                className={`inputPeerField ${formErrors.pinCode ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none `}
                            />
                            <label htmlFor="pinCode" className="menuPeerLevel">
                                Center Pincode
                            </label>
                        </div>

                        {/* credit limit */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="creditLimt"
                                name="creditLimt"
                                value={formData.creditLimt}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        [event.target.name]: parseInt(event.target.value, 10) || 0,
                                    })
                                }
                                placeholder=" "
                                className={`inputPeerField ${formErrors.creditLimt ? "border-b-red-500" : "border-borderColor"}
                                peer focus:outline-none`}
                            />
                            <label htmlFor="creditLimt" className="menuPeerLevel">
                                Credit Limit
                            </label>
                        </div>
                    </div>

                    {/* Credit Period */}
                    <div className="flex gap-[0.25rem] relative">
                        {/* Credit Period Input Field with Icon */}
                        <div className="relative flex-1 flex gap-[0.10rem] items-center">
                            {/* Input Field */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    id="creditPeridos"
                                    name="creditPeridos"
                                    value={formData.creditPeridos}
                                    onChange={handelChangeFormData}
                                    placeholder=" "
                                    className={`inputPeerField pr-10 w-full ${formErrors.creditPeridos ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none`}
                                />
                                <label htmlFor="creditPeridos" className="menuPeerLevel">
                                    Credit Period
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
                                <FaCalendarAlt className="w-4 h-4 font-semibold" />
                            </div>
                        </div>


                        {/* Min Cash Book Input Field */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="minBookingAmt"
                                name="minBookingAmt"
                                value={formData.minBookingAmt}
                                onChange={handelChangeFormData}
                                placeholder=" "
                                className={`inputPeerField ${formErrors.minBookingAmt ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none`}
                            />
                            <label htmlFor="minBookingAmt" className="menuPeerLevel">
                                Min Cash Book
                            </label>
                        </div>

                        {/* Calendar Popup */}
                        {showCalander && (
                            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                                <UserCalendar onDateClick={handleDateClick} />
                            </div>
                        )}
                    </div>




                    {/* Center Email Id */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handelChangeFormData}
                            placeholder=" "
                            className={`inputPeerField ${formErrors.email ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none`}
                        />
                        <label htmlFor="email" className="menuPeerLevel">
                            Center Email Id
                        </label>
                    </div>

                    {/* payment mode */}
                    <div className="relative flex-1">
                        <select
                            id="paymentMode"
                            name="paymentMode"
                            value={formData?.paymentMode || ''}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const paymentModeId = selectedValue === 'Cash' ? 1 : 2; // Determine the paymentModeId based on the selected value

                                setFormData((prevData) => ({
                                    ...prevData,
                                    paymentMode: selectedValue, // Update the paymentMode
                                    paymentModeId: paymentModeId, // Update the paymentModeId
                                }));
                            }}
                            className={`inputPeerField ${formErrors.paymentMode ? "border-b-red-500" : "border-borderColor"} cursor-pointer peer focus:outline-none`}
                        >
                            <option value="" disabled className="text-gray-400">
                                Select Option
                            </option>
                            <option value={1}>Cash</option>
                            <option value={2}>Credit</option>
                        </select>
                        <label htmlFor="paymentMode" className="menuPeerLevel">
                            Payment Mode
                        </label>
                    </div>


                    {/* Client MRP */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] ${formErrors.clientmrp ? "border-b-red-500" : "border-borderColor"
                                } rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
                        >
                            <input
                                type="search"
                                id="clientmrp"
                                name="clientmrp"
                                value={selectedSearchDropDownData?.clientmrp || formData.clientmrp || ''}  // Display selected menu name or the value from ,.menu
                                onChange={(e) => {
                                    handelChangeFormData(e)
                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        clientmrp: ''
                                    }))
                                }}
                                onClick={() => openShowSearchBarDropDown(6)}
                                autoComplete="off"
                                className=" w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                placeholder='Search Data'


                            // disabled={isParentMenu === 'Yes'}  // Disable if Parent Menu is Yes
                            />

                            <label htmlFor="clientmrp" className="menuPeerLevel">
                                Client MRP
                            </label>
                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 6 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {filterclientMrpData?.length > 0 ? (
                                        filterclientMrpData?.map((data, index) => (
                                            <li
                                                key={data.id}
                                                name="clientmrp"
                                                className="my-1 px-2 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedSearchDropDownData((preventData) => ({
                                                        ...preventData,
                                                        clientmrp: data?.rateName,
                                                    }));
                                                    openShowSearchBarDropDown(0);
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        //clientmrpId: data?.id,
                                                        clientmrp: data?.id,
                                                    })); // Simulated event
                                                }}
                                                onMouseEnter={() => setIsHovered(index)}
                                                onMouseLeave={() => setIsHovered(null)}
                                                style={{
                                                    background:
                                                        isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                }}
                                            >
                                                {data?.rateName}
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

                    {/* Rate Type */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] ${formErrors.patientRate ? "border-b-red-500" : "border-borderColor"} rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
                        >
                            <input
                                type="search"
                                id="patientRate"
                                name="patientRate"
                                value={selectedSearchDropDownData?.patientRate || formData.patientRate || ''}  // Display selected menu name or the value from ,.menu
                                onChange={(e) => {
                                    handelChangeFormData(e)
                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        patientRate: ''
                                    }))
                                }}
                                onClick={() => openShowSearchBarDropDown(7)}
                                autoComplete="off"
                                className=" w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                placeholder='Search Data'


                            // disabled={isParentMenu === 'Yes'}  // Disable if Parent Menu is Yes
                            />

                            <label htmlFor="patientRate" className="menuPeerLevel">
                                Rate Type
                            </label>
                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 7 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {filterRateTypeData?.length > 0 ? (
                                        filterRateTypeData?.map((data, index) => (
                                            <li
                                                key={data.id}
                                                name="patientRate"
                                                className="my-1 px-2 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedSearchDropDownData((preventData) => ({
                                                        ...preventData,
                                                        patientRate: data?.rateName,
                                                    }));
                                                    openShowSearchBarDropDown(0);
                                                    handelChangeFormData({
                                                        target: {
                                                            name: 'patientRate', value: data?.id
                                                        },
                                                    }); // Simulated event
                                                }}
                                                onMouseEnter={() => setIsHovered(index)}
                                                onMouseLeave={() => setIsHovered(null)}
                                                style={{
                                                    background:
                                                        isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                }}
                                            >
                                                {data?.rateName}
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


                    {/* zoneId */}
                    <div className="relative flex-1">
                        <select
                            id="zoneId"
                            value={formData?.zoneId || ''}
                            name='zoneId'
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    [event.target.name]: parseInt(event.target.value, 10) || 0,
                                })
                            }
                            className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none`}
                        // defaultValue={0}
                        >
                            <option value="" disabled className='text-gray-400'>
                                Select Option
                            </option>

                            {
                                allZoneData?.map((data) => (
                                    <option key={data?.id} value={data?.id}>
                                        {data?.zone}
                                    </option>
                                ))
                            }

                        </select>
                        <label htmlFor="zoneId" className="menuPeerLevel">
                            Select Zone
                        </label>
                    </div>


                    {/* state */}
                    <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
                        <div
                            className={`flex peer items-center border-[1.5px] border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white w-full`}
                        >
                            <input
                                type="search"
                                id="state"
                                name="state"
                                value={selectedSearchDropDownData?.state || formData.state || ''}
                                onChange={(e) => {
                                    handelChangeFormData(e);

                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        state: '',
                                    }));
                                }}
                                onClick={() => openShowSearchBarDropDown(3)}
                                autoComplete="off"
                                className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                placeholder="Search Data"

                            />

                            <label htmlFor="state" className="menuPeerLevel">
                                Search State
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 3 && (
                                <div
                                    className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs"
                                    style={{ top: '100%', left: 0 }}
                                >
                                    <ul>
                                        {filterAllStateData?.length > 0 ? (
                                            filterAllStateData?.map((data, index) => (
                                                <li
                                                    key={data.id}
                                                    name="state"
                                                    className="my-1 px-2 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedSearchDropDownData((preventData) => ({
                                                            ...preventData,
                                                            state: data?.state,
                                                        }));
                                                        openShowSearchBarDropDown(0);
                                                        handelChangeFormData({
                                                            target: { name: 'state', value: data?.id },
                                                        });
                                                    }}
                                                    onMouseEnter={() => setIsHovered(index)}
                                                    onMouseLeave={() => setIsHovered(null)}
                                                    style={{
                                                        background:
                                                            isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                    }}
                                                >
                                                    {data?.state}
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

                        <div>
                            <div
                                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                onClick={() => openModelForStateOrDistrictOrCity('State')}
                                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            >
                                <IoMdAdd className="w-4 h-4 font-semibold" />
                            </div>
                        </div>
                    </div>


                    {/* Search District */}
                    <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
                        <div
                            className={`flex peer items-center border-[1.5px] border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white w-full`}
                        >
                            <input
                                type="search"
                                id="districtId"
                                name="districtId"
                                value={selectedSearchDropDownData?.districtId || formData.districtId || ''}
                                onChange={(e) => {
                                    handelChangeFormData(e);

                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        districtId: '',
                                    }));
                                }}
                                onClick={() => openShowSearchBarDropDown(4)}
                                autoComplete="off"
                                className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                placeholder="Search Data"

                            />

                            <label htmlFor="districtId" className="menuPeerLevel">
                                Search District
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 4 && (
                                <div
                                    className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs"
                                    style={{ top: '100%', left: 0 }}
                                >
                                    <ul>
                                        {filterAllDistrictData?.length > 0 ? (
                                            filterAllDistrictData?.map((data, index) => (
                                                <li
                                                    key={data.id}
                                                    name="districtId"
                                                    className="my-1 px-2 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedSearchDropDownData((preventData) => ({
                                                            ...preventData,
                                                            districtId: data?.district,
                                                        }));
                                                        openShowSearchBarDropDown(0);
                                                        handelChangeFormData({
                                                            target: { name: 'districtId', value: data?.id },
                                                        });
                                                    }}
                                                    onMouseEnter={() => setIsHovered(index)}
                                                    onMouseLeave={() => setIsHovered(null)}
                                                    style={{
                                                        background:
                                                            isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                    }}
                                                >
                                                    {data?.district}
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

                        <div>
                            <div
                                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                onClick={() => openModelForStateOrDistrictOrCity('District')}
                                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            >
                                <IoMdAdd className="w-4 h-4 font-semibold" />
                            </div>
                        </div>
                    </div>



                    {/* search city */}
                    <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
                        <div
                            className={`flex peer items-center border-[1.5px] border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white w-full`}
                        >
                            <input
                                type="search"
                                id="cityId"
                                name="cityId"
                                value={selectedSearchDropDownData?.cityId || formData.cityId || ''}
                                onChange={(e) => {
                                    handelChangeFormData(e);

                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        cityId: '',
                                    }));
                                }}
                                onClick={() => openShowSearchBarDropDown(5)}
                                autoComplete="off"
                                className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                placeholder="Search Data"

                            />

                            <label htmlFor="cityId" className="menuPeerLevel">
                                Search City
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 5 && (
                                <div
                                    className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs"
                                    style={{ top: '100%', left: 0 }}
                                >
                                    <ul>
                                        {filterAllCityData?.length > 0 ? (
                                            filterAllCityData?.map((data, index) => (
                                                <li
                                                    key={data.id}
                                                    name="cityId"
                                                    className="my-1 px-2 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedSearchDropDownData((preventData) => ({
                                                            ...preventData,
                                                            cityId: data?.cityName,
                                                        }));
                                                        openShowSearchBarDropDown(0);
                                                        handelChangeFormData({
                                                            target: { name: 'cityId', value: data?.id },
                                                        });
                                                    }}
                                                    onMouseEnter={() => setIsHovered(index)}
                                                    onMouseLeave={() => setIsHovered(null)}
                                                    style={{
                                                        background:
                                                            isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                    }}
                                                >
                                                    {data?.cityName}
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

                        <div>
                            <div
                                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                onClick={() => openModelForStateOrDistrictOrCity('City')}
                                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            >
                                <IoMdAdd className="w-4 h-4 font-semibold" />
                            </div>
                        </div>
                    </div>


                    {/* Center Access */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] ${formErrors.addEmpCenterAccess ? "border-b-red-500" : "border-borderColor"} rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
                            onClick={() => showSearchBarDropDown !== 8 ? openShowSearchBarDropDown(8) : openShowSearchBarDropDown(0)}
                        >

                            <input
                                type="search"
                                id="addEmpCenterAccess"
                                name="addEmpCenterAccess"
                                value={
                                    (
                                        selectedSearchDropDownData?.addEmpCenterAccess?.map((data) => {
                                            return data;
                                        }) || listOfSelectedEmployee?.map((data) => {

                                            return data.empId;
                                        })
                                    ).join(', ') // Convert array to a string
                                }
                                onClick={() => openShowSearchBarDropDown(8)}
                                autoComplete="off"
                                readOnly
                                className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                placeholder="Search Data"
                            />

                            <div>
                                {
                                    showSearchBarDropDown === 8 ? <RiArrowDropUpLine className='text-xl cursor-pointer' /> : <RiArrowDropDownLine className='text-xl cursor-pointer' />
                                }
                            </div>
                            <label htmlFor="addEmpCenterAccess" className="menuPeerLevel">
                                Search Employee List
                            </label>

                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 8 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {/* Select All Checkbox */}
                                    {allCenterAccessData?.length > 0 && (
                                        <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full">
                                            <div>
                                                {/* <input
                                                    type="checkbox"
                                                    checked={isSelectAll}
                                                    onChange={(e) => handleSelectAll(e.target.checked)}

                                                /> */}
                                            </div>
                                            {/* <div className="w-full">
                                                <input
                                                    type="search"
                                                    name="serachEmployeeList"
                                                    id="serachEmployeeList"
                                                    className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.5rem]"
                                                    onChange={handleSearchMultiSelectDropDown}
                                                    placeholder="Search..."
                                                />
                                            </div> */}
                                        </li>
                                    )}

                                    {/* Individual Employee Checkboxes */}
                                    {filtercenterAccessData?.length > 0 ? (
                                        filtercenterAccessData?.map((data, index) => (
                                            <li
                                                key={data?.empId}
                                                className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2"
                                                name="addEmpCenterAccess"
                                                onMouseEnter={() => setIsHovered(index)}
                                                onMouseLeave={() => setIsHovered(null)}
                                                style={{
                                                    background: isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                }}
                                            >
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name='addEmpCenterAccess'
                                                        checked={
                                                            listOfSelectedEmployee?.some((item) => item.empId === data.empId)
                                                        }
                                                        onChange={(e) => handleCheckboxClick(data, e.target.checked)}
                                                    />
                                                </div>
                                                <div>{`${data?.fName} ${data?.lName}`}</div>
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


                    {/* Sales Exet. */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] ${formErrors.salesExecutiveID ? "border-b-red-500" : "border-borderColor"} rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
                        >
                            <input
                                type="search"
                                id="salesExecutiveID"
                                name="salesExecutiveID"
                                value={selectedSearchDropDownData?.salesExecutiveID || formData?.salesExecutiveID || ''} // Display the selected name
                                onChange={(e) => {
                                    handelChangeFormData(e);

                                    // Reset dropdown data when typing in the search bar
                                    setSelectedSearchDropDownData((prevData) => ({
                                        ...prevData,
                                        salesExecutive: '',
                                    }));
                                }}
                                onClick={() => openShowSearchBarDropDown(9)}
                                autoComplete="off"
                                className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                placeholder="Search Data"

                            />

                            <label htmlFor="salesExecutiveID" className="menuPeerLevel">
                                Search Sales Exet.
                            </label>
                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 9 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {filterSalesExecutiveData?.length > 0 ? (
                                        filterSalesExecutiveData?.map((data, index) => (
                                            <li
                                                key={data.empId}
                                                className="my-1 px-2 cursor-pointer"
                                                onClick={() => {
                                                    // Update selected data to display fName and lName in the input
                                                    setSelectedSearchDropDownData((prevData) => ({
                                                        ...prevData,
                                                        salesExecutiveID: `${data?.fName} ${data?.lName}`,
                                                    }));

                                                    // Update form data with the salesExecutiveID
                                                    handelChangeFormData({
                                                        target: {
                                                            name: 'salesExecutiveID',
                                                            value: data.empId,
                                                        },
                                                    });

                                                    // Close the dropdown
                                                    openShowSearchBarDropDown(0);
                                                }}
                                                onMouseEnter={() => setIsHovered(index)}
                                                onMouseLeave={() => setIsHovered(null)}
                                                style={{
                                                    background:
                                                        isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                }}
                                            >
                                                {data?.fName} {data?.lName}
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


                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-bold text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Client KYC</div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-2 lg:mx-2">


                    {/* Adhar Card No. */}
                    <div className="relative flex-1">
                        <input
                            type="number"
                            id="adharNo"
                            name="adharNo"
                            value={formData.adharNo || ''}
                            onChange={handelChangeFormData}
                            placeholder=" "
                            className={`inputPeerField ${formErrors.adharNo ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none`}
                        />
                        <label htmlFor="adharNo" className="menuPeerLevel">
                            Adhar Card No.
                        </label>
                    </div>

                    {/* Report Email */}
                    <div className="relative flex-1">
                        <input
                            type="email"
                            id="reportEmail"
                            name="reportEmail"
                            value={formData.reportEmail || ''}
                            onChange={handelChangeFormData}
                            placeholder=" "
                            className={`inputPeerField border-borderColor peer focus:outline-none`}
                        />
                        <label htmlFor="reportEmail" className="menuPeerLevel">
                            Report Email
                        </label>
                    </div>

                    {/* Owner Name */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName || ''}
                            onChange={handelChangeFormData}
                            placeholder=" "
                            className={`inputPeerField  ${formErrors.ownerName ? "border-b-red-500" : "border-borderColor"
                                } peer focus:outline-none`}
                        />
                        <label htmlFor="ownerName" className="menuPeerLevel">
                            Owner Name
                        </label>
                    </div>

                    {/* Pan No. */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            id="pan"
                            name="pan"
                            value={formData.pan || ''}
                            onChange={handelChangeFormData}
                            placeholder=" "
                            className={`inputPeerField ${formErrors.pan ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none`}
                        />
                        <label htmlFor="pan" className="menuPeerLevel">
                            Pan No.
                        </label>
                    </div>


                    {/* Cheque No. and chqque ammount */}
                    <div className=" flex gap-[0.25rem]">
                        {/* Cheque No. */}
                        <div className='relative flex-1'>
                            <input
                                type="text"
                                id="chequeNo"
                                name="chequeNo"
                                value={formData.chequeNo}
                                onChange={handelChangeFormData}
                                placeholder=" "
                                className={`inputPeerField border-borderColor peer focus:outline-none`}
                            />
                            <label htmlFor="chequeNo" className="menuPeerLevel">
                                Cheque No.
                            </label>
                        </div>

                        {/* check ammount */}
                        <div className='relative flex-1'>
                            <input
                                type="text"
                                id=" chequeAmount"
                                name="chequeAmount"
                                value={formData.chequeAmount}
                                onChange={handelChangeFormData}
                                placeholder=" "
                                className={`inputPeerField border-borderColor peer focus:outline-none`}
                            />
                            <label htmlFor=" chequeAmount" className="menuPeerLevel">
                                Cheque Amount
                            </label>
                        </div>
                    </div>




                    {/* bank name */}
                    <div className="relative flex-1">
                        <div
                            className={`flex peer items-center border-[1.5px] border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
                        >
                            <input
                                type="search"
                                id="bankName"
                                name="bankName"
                                value={selectedSearchDropDownData?.bankName || formData?.bankName || ''}
                                onChange={(e) => {
                                    handelChangeFormData(e)
                                    setShowSearchBarDropDown(11);
                                    setSelectedSearchDropDownData((preventData) => ({
                                        ...preventData,
                                        bankName: ''
                                    }));

                                }}
                                autoComplete="off"
                                className=" w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                placeholder='Search Data'
                                onClick={() => openShowSearchBarDropDown(11)}

                            />

                            <label htmlFor="bankName" className="menuPeerLevel">
                                Bank Name
                            </label>
                        </div>

                        {/* Dropdown to select the menu */}
                        {showSearchBarDropDown === 11 && (
                            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                <ul>
                                    {filterBankNameData.length > 0 ? (
                                        filterBankNameData.map((data, index) => (
                                            <li
                                                key={data.id}

                                                className="my-1 px-2 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedSearchDropDownData((preventData) => ({
                                                        ...preventData,
                                                        bankName: data?.bankName
                                                    }));

                                                    setFormData((preventData) => ({
                                                        ...preventData,
                                                        bankID: data?.id,
                                                        bankName: data?.bankName
                                                    }))

                                                    setShowSearchBarDropDown(0)
                                                }
                                                } // Update menu on click
                                                onMouseEnter={() => setIsHovered(index)}
                                                onMouseLeave={() => setIsHovered(null)}
                                                style={{
                                                    background: isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                }}
                                            >
                                                {data?.bankName}
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


                {/* <div className='w-full h-[0.25rem]' style={{ background: activeTheme?.menuColor }}></div>

                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-bold text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Upload Documents</div>
                </div> */}


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-2 lg:mx-2">

                    {/* Document Type */}
                    <div className="relative flex-1">
                        <select
                            id="documentType"
                            value={formData?.documentType || ''}
                            name='documentType'
                            onChange={handelChangeFormData}
                            className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none`}
                        // defaultValue={0}
                        >
                            <option value="" disabled hidden className='text-gray-400'>
                                Select Option
                            </option>

                            {
                                allDocumentData?.map((data) => (
                                    <option key={data?.id} value={parseInt(data?.id)}>{data?.documentType}</option>

                                ))
                            }

                        </select>
                        <label htmlFor="documentType" className="menuPeerLevel">
                            Document Type
                        </label>
                    </div>

                    {/* Upload Documents */}
                    <div className="relative flex-1">
                        <input
                            type="file"
                            id="documentImage"
                            name="documentImage"
                            value={documentImage || ''}
                            onChange={handleDocumentChangeForImage}
                            accept="image/*"
                            placeholder=" "
                            className={`inputPeerField border-borderColor  peer focus:outline-none`}
                        />
                        <label htmlFor="documentImage" className="menuPeerLevel">
                            Upload Documents
                        </label>
                    </div>




                    {/* <div className="relative flex-1">
                        <input
                            type="text"
                            id="ifscCode"
                            name="ifscCode"
                            value={formData.ifscCode || ''}
                            onChange={handelChangeFormData}
                            placeholder=" "
                            className={`inputPeerField border-borderColor peer focus:outline-none`}
                        />
                        <label htmlFor="ifscCode" className="menuPeerLevel">
                            IFSC Code
                        </label>
                    </div> */}





                    {/* <div className='w-full h-[0.25rem]' style={{ background: activeTheme?.menuColor }}></div>

                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-bold text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Access Type</div>
                </div> */}





                    {/* Pre Printed Barcode */}
                    <div className="relative flex-1">
                        <select
                            id="isPrePrintedBarcode"
                            name='isPrePrintedBarcode'
                            value={formData?.isPrePrintedBarcode || ''}
                            onChange={handelChangeFormData}
                            className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none
                        
                        `}
                        >
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                        <label htmlFor="isPrePrintedBarcode" className="menuPeerLevel">
                            Pre Printed Barcode
                        </label>
                    </div>




                    <div className='flex gap-[0.25rem]'>
                        {/* showBackcover */}
                        <div className="relative flex-1">
                            <select
                                id="showBackcover"
                                name='showBackcover'
                                value={formData?.showBackcover || ''}
                                onChange={handelChangeFormData}
                                className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none
                        
                        `}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                            <label htmlFor="showBackcover" className="menuPeerLevel">
                                Back Letterhead
                            </label>
                        </div>

                        {/* show iso */}
                        <div className="relative flex-1">
                            <select
                                id="showISO"
                                name='showISO'
                                value={formData?.showISO || ''}
                                onChange={handelChangeFormData}
                                className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none
                        
                        `}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                            <label htmlFor="showISO" className="menuPeerLevel">
                                Show ISO
                            </label>
                        </div>
                    </div>

                    <div className='flex gap-[0.25rem]'>
                        {/* Reception area */}
                        <div className="relative flex-1">
                            <select
                                id="receptionarea"
                                name='receptionarea'
                                value={formData?.receptionarea || ''}
                                onChange={handelChangeFormData}
                                className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none
                        
                        `}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                            <label htmlFor="receptionarea" className="menuPeerLevel">
                                Reception area
                            </label>
                        </div>

                        {/* Waiting area */}
                        <div className="relative flex-1">
                            <select
                                id="waitingarea"
                                name='waitingarea'
                                value={formData?.waitingarea || ''}
                                onChange={handelChangeFormData}
                                className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none
                        `}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                            <label htmlFor="waitingarea" className="menuPeerLevel">
                                Waiting area
                            </label>
                        </div>
                    </div>




                    <div className='flex gap-[0.25rem]'>
                        {/* watercooler */}
                        <div className="relative flex-1">
                            <select
                                id="watercooler"
                                name='watercooler'
                                value={formData?.watercooler || ''}
                                onChange={handelChangeFormData}
                                className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none
                        
                        `}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                            <label htmlFor="watercooler" className="menuPeerLevel">
                                Watercooler
                            </label>
                        </div>

                        {/* AC */}
                        <div className="relative flex-1">
                            <select
                                id="ac"
                                name='ac'
                                value={formData?.ac || ''}
                                onChange={handelChangeFormData}
                                className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none
                        `}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                            <label htmlFor="ac" className="menuPeerLevel">
                                AC
                            </label>
                        </div>
                    </div>



                    <div className='flex gap-[0.25rem]'>
                        {/* active */}
                        <div className="relative flex-1">
                            <select
                                id="isActive"
                                name='isActive'
                                value={formData?.isActive || ''}
                                onChange={handelChangeFormData}
                                className={`inputPeerField border-borderColor cursor-pointer peer  focus:outline-none
                        
                        `}
                            >
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            <label htmlFor="isActive" className="menuPeerLevel">
                                Active
                            </label>
                        </div>

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
                                        onClick={onSubmitClientMasterDataForUpdate}
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
                                        onClick={onSubmitClientMasterData}
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

            {/* display the data */}
            < div className='w-full' >
                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Client Master Details</div>
                </div>


                <div className="mb-2">
                    <table className="table-auto border-collapse w-full text-xxs text-left">
                        <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                            <tr>
                                {clientMasterHeaderList.map((data, index) => (
                                    <td
                                        key={index}
                                        className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                                    // style={{ width: index === 0 ? '0%' : index === 1 ? '11%' : '15%' }} // Customize width here
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
                            {allCentreData?.map((data) => (
                                <tr
                                    className={`cursor-pointer ${isHoveredTable === data?.centreId
                                        ? ''
                                        : data?.centreId % 2 === 0
                                            ? 'bg-gray-100'
                                            : 'bg-white'
                                        }`}
                                    key={data?.centreId}
                                    onMouseEnter={() => setIsHoveredTable(data?.centreId)}
                                    onMouseLeave={() => setIsHoveredTable(null)}
                                    style={{
                                        background:
                                            isHoveredTable === data?.centreId ? activeTheme?.subMenuColor : undefined,
                                    }}
                                >
                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                        {data?.centreId}
                                    </td>
                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                        {data?.centrecode}
                                    </td>
                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                        {data?.centretype}
                                    </td>

                                    {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                        {data?.addEmpCenterAccess[0].empId}
                                    </td> */}

                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                        {data?.companyName}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.companyName}
                                    </td>

                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                        {data?.mobileNo}
                                    </td>

                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                        {data?.email}
                                    </td>

                                    <td className="border-b px-4 h-5 flex items-center text-xxs font-semibold gap-2">
                                        <button
                                            type="button"
                                            data-ripple-light="true"
                                            className="relative overflow-hidden w-4 h-4 flex justify-center items-center">
                                            <FaRegEdit
                                                className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                                    }`}
                                                onClick={() => {
                                                    if (data?.isActive === 1) {
                                                        getSingleMenuDataForUpDate(data);
                                                        setIsEditData(true);
                                                    }
                                                }}
                                            />

                                        </button>
                                        <button
                                            type="button"
                                            data-ripple-light="true"
                                            className={`relative overflow-hidden w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'
                                                }`}
                                        >

                                            <ImSwitch className="w-full h-full"
                                                onClick={() => {
                                                    setClickedRowId(data);
                                                    setShowActivePopup(true);
                                                }} />
                                            {/* )} */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>








            </div >


            {/* popup for active and deactive status */}
            {
                showActivePopup && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50"
                        >

                            <div className="flex mt-3 items-center">
                                <IoAlertCircleOutline className="w-8 h-8" style={{ color: activeTheme?.menuColor }} />
                            </div>

                            {/* <div className="text-xxxs text-center font-semibold text-textColor/70">
                Are you leaving ?
              </div> */}

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
                                        onClick={() => setShowActivePopup(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={handleTheUpdateStatusMenu}>
                                    <div>
                                        {
                                            isButtonClick === 4 ?
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
                openModelForStateOrDistrictOrCityData !== '' && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="border-[1px] w-72 flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50"
                        >


                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Add {openModelForStateOrDistrictOrCityData}
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => {
                                        setopenModelForStateOrDistrictOrCityData(''), setisErrorForAddSateCityDistrict('')
                                    }}
                                />
                            </div>


                            <div>

                                <div className='text-center text-xs mt-3 font-semibold text-red-500'>
                                    {isErrorForAddSateCityDistrict}
                                </div>


                                <div className="relative flex-1 mt-5 mx-3">


                                    <input
                                        type="text"
                                        id={`${openModelForStateOrDistrictOrCityData}`}
                                        autoComplete='off'
                                        name={`${openModelForStateOrDistrictOrCityData}`}
                                        value={inputFieldForSateCityDistrict}
                                        onChange={(event) => setInputFieldForStateCityDistrict(event.target.value)}
                                        required
                                        placeholder={`Enter ${openModelForStateOrDistrictOrCityData}`} className={`w-full font-semibold outline-none pl-2 text-sm  border-[1.5px] bg-white h-9 rounded-md`}
                                    />


                                    {/* <label htmlFor={`${openModelForStateOrDistrictOrCityData}`} className="menuPeerLevel">
                                        Enter {openModelForStateOrDistrictOrCityData}
                                    </label> */}
                                </div>

                                <div className=" w-16 h-8 my-3 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer ml-3"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={saveStateOrCityOrDistrict}

                                >
                                    {
                                        isButtonClick === 2 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                    }
                                </div>


                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )
}
