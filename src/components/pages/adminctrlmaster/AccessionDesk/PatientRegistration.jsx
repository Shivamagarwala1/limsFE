import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import UserCalendar from '../../../public/UserCalendar';
import useRippleEffect from '../../../customehook/useRippleEffect';
import { IoMdAdd, IoMdCloseCircleOutline, IoMdImages } from 'react-icons/io';
import useOutsideClick from '../../../customehook/useOutsideClick';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCalendarScheduleFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { patientRegistrationInvestigation, patientRegistrationPaymentMode, paymentModes } from '../../../listData/listData';
import UserCalendarAndTime from '../../../public/UserCalendarAndTime';
import toast from 'react-hot-toast';
import { employeeWiseCentre, getAllBankNameApi, getAllDicountReasionApi, getAllDiscountApprovedBy, getAllDisCountType, getAllEmpTitleApi, getAllInvestiGationApi, getAllInvestigationGridApi, getAllRateTypeForPatientRegistrationData, getAllReferDrApi, getAllReferLabApi, saveReferDrApi } from '../../../../service/service';
import { FaSpinner } from 'react-icons/fa'

export default function PatientRegistration() {

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);

    useRippleEffect();
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [showCalander, setShowCalander] = useState(false);
    const [showCalanderAndTime, setShowCalanderAndTime] = useState(false);
    const [patientRegistrationData, setPatientRegistrationData] = useState({
        centreId: 0,
        rateId: 0,
        mobileNo: '',
        title_id: 0,
        name: '',
        ageDays: 0,
        ageMonth: 0,
        ageYear: 0,
        dob: '',
        gender: '',
        email: '',

        collectionDateAndTime: new Date('1970-01-01T00:00:00Z')
            .toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour12: true
            })
            .replace(/ /g, '-') // Replace spaces with dashes in the date part
            .replace(/(\d{2}-\w{3}-\d{4})/, '$1 00:00') // Append 00:00 as the time
            .replace(/am|pm/g, 'AM'),

        investigationName: '',
        itemId: 0,
        refDoctor1: '',
        refID1: 0,
        refDoctor2: '',
        refID2: 0,
        address: '',
        pinCode: 0,
        uploadDocument: '',
        refLabID: 0,
        refLab: '',



        paidAmount: 0,
        cashAmt: 0,
        creditCardAmt: 0,
        onlinewalletAmt: 0,

        bank_Id: 0,

        discountType: 0,
        discountid: 0,
        discountApproved: 0,
    });
    const [patientRegistrationSelectData, setPatientRegistrationSelectData] = useState({
        centreId: '',
        rateId: '',
        title_id: '',
        discountid: '',
        //bank_Id: '',
        //refDoctor1: ''
    });

    const [patientRegistrationDataForDb, setPatientRegistrationDataForDb] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
            .replace(/ /g, '-'),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
            .replace(/ /g, '-'),
        patientId: 0,
        title_id: 0,
        name: '',
        gender: '',
        ageTotal: 0,
        ageDays: 0,
        ageMonth: 0,
        ageYear: 0,
        dob: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
            .replace(/ /g, '-'),
        isActualDOB: 0,
        emailId: '',
        mobileNo: '',
        address: '',
        pinCode: 0,
        cityId: 0,
        centreId: 0,
        areaId: 0,
        stateId: 0,
        districtId: 0,
        countryId: 0,
        visitCount: 0,
        remarks: '',
        documentId: 0,
        documnetnumber: '',
        password: '',
        addBooking: [
            {
                isActive: 0,
                createdById: 0,
                createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                    .toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })
                    .replace(/ /g, '-'),
                updateById: 0,
                updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                    .toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })
                    .replace(/ /g, '-'),
                transactionId: 0,
                workOrderId: '',
                billNo: 0,
                bookingDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                    .toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })
                    .replace(/ /g, '-'),
                clientCode: '',
                patientId: 0,
                title_id: 0,
                name: '',
                gender: '',
                dob: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                    .toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })
                    .replace(/ /g, '-'),
                ageYear: 0,
                ageMonth: 0,
                ageDay: 0,
                totalAge: 0,
                mobileNo: '',
                mrp: 999999999999,
                grossAmount: 999999999999,
                discount: 999999999999,
                netAmount: 999999999999,
                paidAmount: 999999999999,
                sessionCentreid: 0,
                centreId: 0,
                rateId: 0,
                isCredit: 0,
                paymentMode: '',
                source: '',
                discountType: 0,
                discountid: 0,
                discountReason: '',
                discountApproved: 0,
                isDisCountApproved: 0,
                patientRemarks: '',
                labRemarks: '',
                otherLabRefer: '',
                otherLabReferID: 0,
                refDoctor1: '',
                refID1: 0,
                refDoctor2: '',
                refID2: 0,
                tempDOCID: 0,
                tempDoctroName: '',
                uploadDocument: '',
                invoiceNo: '',
                salesExecutiveID: 0,
                addBookingStatus: [
                    {
                        isActive: 0,
                        createdById: 0,
                        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                            .toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })
                            .replace(/ /g, '-'),
                        updateById: 0,
                        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                            .toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })
                            .replace(/ /g, '-'),
                        id: 0,
                        transactionId: 0,
                        patientId: 0,
                        barcodeNo: '',
                        status: '',
                        centreId: 0,
                        roleId: 0,
                        remarks: '',
                        testId: 0
                    }
                ],
                addBookingItem: [
                    {
                        isActive: 0,
                        createdById: 0,
                        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                            .toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })
                            .replace(/ /g, '-'),
                        updateById: 0,
                        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                            .toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })
                            .replace(/ /g, '-'),
                        id: 0,
                        workOrderId: '',
                        transactionId: 0,
                        testcode: '',
                        itemId: 0,
                        packageID: 0,
                        deptId: 0,
                        barcodeNo: '',
                        departmentName: '',
                        investigationName: '',
                        isPackage: 0,
                        packageName: '',
                        itemType: 0,
                        mrp: 999999999999,
                        rate: 999999999999,
                        discount: 999999999999,
                        netAmount: 999999999999,
                        packMrp: 999999999999,
                        packItemRate: 999999999999,
                        packItemDiscount: 999999999999,
                        packItemNet: 999999999999,
                        reportType: 0,
                        centreId: 0,
                        sessionCentreid: 0,
                        isSra: 0,
                        isMachineOrder: 0,
                        isEmailsent: 0,
                        sampleTypeId: 0,
                        sampleTypeName: '',

                    }
                ],
                addpaymentdetail: [
                    {
                        id: 0,
                        transactionId: 0,
                        transactionType: '',
                        workOrderId: '',
                        receiptNo: 0,
                        receivedAmt: 0,
                        cashAmt: 0,
                        creditCardAmt: 0,
                        creditCardNo: '',
                        chequeAmt: 0,
                        chequeNo: '',
                        onlinewalletAmt: 0,
                        walletno: '',
                        nefTamt: 0,
                        bankName: '',
                        paymentModeId: 0,
                        isCancel: 0,
                        cancelDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                            .toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })
                            .replace(/ /g, '-'),
                        canceledBy: '',
                        cancelReason: '',
                        bookingCentreId: 0,
                        settlementCentreID: 0,
                        receivedBy: '',
                        receivedID: 0
                    }
                ]
            }
        ]
    }
    )

    const [addReferDrData, setAddReferDrData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        doctorId: 0,
        doctorCode: '',
        title: '',
        doctorName: '',
        imaRegistartionNo: '',
        email: '',
        reportEmail: '',
        mobileNo: '',
        mobileno2: '',
        address1: '',
        address2: '',
        pinCode: 0,
        degreeId: 0,
        degreeName: '',
        specializationID: 0,
        specialization: '',
        dob: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        anniversary: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ /g, '-'),
        allowsharing: 0,
        referMasterShare: 0,
        proId: 0,
        areaId: 0,
        city: 0,
        state: 0,
        type: 0
    })

    const [isHovered, setIsHovered] = useState(null);


    const [allCentreData, setAllCentreData] = useState([]);
    const [allRateType, setAllRateType] = useState([]);
    const [allTitleData, setAllTitleData] = useState([]);
    const [allReferData, setAllReferData] = useState([]);
    const [allBankNameData, setAllBankNameData] = useState([]);
    const [paymentModeType, setPaymentModeType] = useState([{ value: '1', label: 'Cash' }]);
    const [allDicountTypeData, setAllDicountTypeData] = useState([]);
    const [allDiscountReasonData, setAllDiscountReasonData] = useState([]);
    const [allDiscountApprovedByData, setAllDiscountApprovedByData] = useState([]);
    const [allLabReferData, setAllLabReferData] = useState([]);
    const [allInvastigationData, setAllInvastigationData] = useState([]);
    const [investigationGridData, setinvestigationGridData] = useState([]);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [showPopup, setShowPopup] = useState(0);
    const [identifyAddReferDrOrReferLab, setIdentifyAddReferDrOrReferLab] = useState(0);
    const imgRef = useRef();


    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }

    const closeDropdown = () => setShowSearchBarDropDown(0);
    const dropdownRef = useOutsideClick(closeDropdown); // Use the custom hook

    const handleDateClick = (date) => {
        const formatDate = (date) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
        };

        const dob = formatDate(date);
        setPatientRegistrationData((prevData) => ({
            ...prevData,
            dob // Set formatted date in searchData
        }));
        setShowCalander(false);
    };

    //calculate date of birth
    useEffect(() => {

        function calculateDOB(ageDay, ageMonth, ageYear) {
            const today = new Date();

            // Subtract the given age values from today's date
            const dob = new Date(
                today.getFullYear() - ageYear,
                today.getMonth() - ageMonth,
                today.getDate() - ageDay
            );

            // Format the result as "DD-MMM-YYYY"
            const formattedDOB = dob.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short', // Short month format (e.g., Jan, Feb)
                year: 'numeric',
            });

            setPatientRegistrationData((preventData) => ({
                ...preventData,
                dob: formattedDOB.replace(/ /g, '-')
            }))
            return formattedDOB.replace(/ /g, '-'); // Replace spaces with dashes
        }

        if (patientRegistrationData?.ageDays !== 0) {
            calculateDOB(patientRegistrationData?.ageDays, patientRegistrationData?.ageMonth, patientRegistrationData?.ageYear);
        }

    }, [patientRegistrationData?.ageDays, patientRegistrationData?.ageMonth, patientRegistrationData?.ageYear]);

    //calculate paid amt.
    useEffect(() => {

        // Calculate paidAmount dynamically
        const totalPaid =
            parseInt(patientRegistrationData.cashAmt || 0) +
            parseInt(patientRegistrationData.creditCardAmt || 0) +
            parseInt(patientRegistrationData.onlinewalletAmt || 0);

        // Update paidAmount in state
        setPatientRegistrationData((prevData) => ({
            ...prevData,
            paidAmount: totalPaid,
        }));
    }, [
        patientRegistrationData.cashAmt,
        patientRegistrationData.creditCardAmt,
        patientRegistrationData.onlinewalletAmt,
    ]);

    const handleDateAndTimeClick = (date) => {
        // Format the date
        const formatDate = (date) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
        };

        // Format the time
        const formatTime = (date) => {
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert to 12-hour format, ensuring "12" is displayed for noon and midnight
            return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
        };

        // Get formatted date and time
        const formattedDate = formatDate(date);
        const formattedTime = formatTime(date);

        // Combine date and time
        const collectionDateAndTime = `${formattedDate} ${formattedTime}`;

        // Update patient registration data
        setPatientRegistrationData((prevData) => ({
            ...prevData,
            collectionDateAndTime, // Set formatted date and time in state
        }));

        //setShowCalanderAndTime(false);
    };

    const handelImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileType = file.type;

            // Handle image files
            if (fileType.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPatientRegistrationData((prevData) => ({
                        ...prevData,
                        uploadDocument: reader.result, // Store base64 image
                        fileType: "image", // Store file type
                    }));
                };
                reader.readAsDataURL(file);
            }
            // Handle PDF files
            else if (fileType === "application/pdf") {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPatientRegistrationData((prevData) => ({
                        ...prevData,
                        uploadDocument: reader.result, // Store base64 PDF
                        fileType: "pdf", // Store file type
                    }));
                };
                reader.readAsDataURL(file);
            }
            // Handle unsupported files
            else {
                toast.error("Please upload a valid image (.jpg, .jpeg, .png) or PDF file.");
            }
        }
    };



    const handelClickImage = () => {
        if (imgRef.current) {
            imgRef.current.click();
        }
    };

    const handelOnChangePatientRegistration = (event) => {

        setPatientRegistrationData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }

    const handelOnChangePatientRegistrationForSelect = (event) => {
        setPatientRegistrationSelectData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


    const handleCheckboxChange = (e, data) => {
        const isChecked = e.target.checked;

        setPaymentModeType((prevData) => {
            // Create a copy of the previous state
            const updatedAccess = [...prevData];

            if (isChecked) {
                // Check if the item already exists to avoid duplicates
                const exists = updatedAccess.some(
                    (item) => item.value === data?.value
                );
                if (!exists) {
                    updatedAccess.push(data);
                }
            } else {
                // Remove the item from the array when unchecked
                const index = updatedAccess.findIndex(
                    (item) => item?.value === data?.value
                );
                if (index !== -1) {
                    updatedAccess.splice(index, 1);
                }
            }

            // Return the updated state
            return updatedAccess;
        });
    };

    useEffect(() => {

        const getAllCentreData = async () => {
            try {
                const response = await employeeWiseCentre(user?.employeeId);

                if (response?.success) {
                    setAllCentreData(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllCentreData();


        const getAllTitleData = async () => {
            try {
                const response = await getAllEmpTitleApi();
                setAllTitleData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllTitleData();


        const getAllBankData = async () => {

            try {
                const response = await getAllBankNameApi();
                setAllBankNameData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllBankData();


        const getAllDiscountTypeData = async () => {

            try {
                const response = await getAllDisCountType();
                setAllDicountTypeData(response);

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllDiscountTypeData()


        const getAllDiscountReasonData = async () => {
            try {
                const response = await getAllDicountReasionApi();
                setAllDiscountReasonData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllDiscountReasonData();


        const getAllDiscountApprovedByData = async () => {

            try {
                const response = await getAllDiscountApprovedBy();
                setAllDiscountApprovedByData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }

        getAllDiscountApprovedByData();

    }, [])


    useEffect(() => {
        const getAllRateType = async () => {

            try {
                const response = await getAllRateTypeForPatientRegistrationData(patientRegistrationData?.centreId);

                if (response?.success) {
                    setAllRateType(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }

        getAllRateType();
    }, [patientRegistrationData?.centreId])


    useEffect(() => {

        const getAllInvastigationData = async () => {

            try {
                const response = await getAllInvestiGationApi(patientRegistrationData?.rateId);

                if (response?.success) {
                    setAllInvastigationData(response?.data);
                } else {
                    toast.error(response?.message);
                }
            } catch (error) {
                toast.error(error?.message);
            }

        }

        getAllInvastigationData();


        const getAllinvestigationGridData = async () => {
            try {
                const response = await getAllInvestigationGridApi(patientRegistrationData?.rateId, patientRegistrationData?.itemId)
                // setinvestigationGridData

                if (response?.success) {


                    if (response?.data?.length !== 0) {
                        const result = response?.data.reduce((acc, current) => {
                            if (!acc) {
                                // Initialize the accumulator with all properties from the first object
                                acc = { ...current, sampleTypeName: [current.sampleTypeName] };
                            } else {
                                // Push only sampleTypeName values into the array
                                acc.sampleTypeName.push(current.sampleTypeName);
                            }
                            return acc;
                        }, null);



                        setinvestigationGridData((prevData) => [
                            ...prevData, // Existing data
                            result       // Add the new object to the array
                        ]);
                    }

                }

            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllinvestigationGridData();

    }, [patientRegistrationData?.rateId, patientRegistrationData?.itemId])


    // Function to delete data by itemId
    const deleteinvestigationGridDataByItemId = (indexToDelete) => {

        const updatedData = [...investigationGridData]; // Create a copy of the array to avoid mutating the original
        updatedData.splice(indexToDelete, 1); // Remove the item at the specified index
        setinvestigationGridData(updatedData)

    };

    //add refer dr
    const handelChangeOnAddReferDrData = (event) => {
        setAddReferDrData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }

    const onSumitAddReferDrData = async (event) => {
        event.preventDefault();
        setIsButtonClick(1);
        try {

            const updatedAddReferDrData = {
                ...addReferDrData,
                isActive: 1,
                createdById: parseInt(user?.employeeId),
                createdDateTime: new Date()
                    .toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false, // Use 24-hour format
                    })
                    .replace(/ /g, '-')
                    .replace(',', ''),
                type: identifyAddReferDrOrReferLab === 1 ? 1 : 2
            }

            const response = await saveReferDrApi(updatedAddReferDrData);

            if (response?.success) {

                toast.success(response?.message);

                setAddReferDrData({
                    isActive: 0,
                    createdById: 0,
                    createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        .replace(/ /g, '-'),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        .replace(/ /g, '-'),
                    doctorId: 0,
                    doctorCode: '',
                    title: '',
                    doctorName: '',
                    imaRegistartionNo: '',
                    email: '',
                    reportEmail: '',
                    mobileNo: '',
                    mobileno2: '',
                    address1: '',
                    address2: '',
                    pinCode: 0,
                    degreeId: 0,
                    degreeName: '',
                    specializationID: 0,
                    specialization: '',
                    dob: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        .replace(/ /g, '-'),
                    anniversary: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        .replace(/ /g, '-'),
                    allowsharing: 0,
                    referMasterShare: 0,
                    proId: 0,
                    areaId: 0,
                    city: 0,
                    state: 0,
                    type: 0
                });

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }
        setIsButtonClick(2);
    }

    useEffect(() => {
        const getAllReferData = async () => {

            try {
                const response = await getAllReferDrApi();
                setAllReferData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllReferData();


        const getAllLabReferData = async () => {

            try {
                const response = await getAllReferLabApi();
                setAllLabReferData(response);
            } catch (error) {
                toast.error(error?.message);
            }
        }
        getAllLabReferData();
    }, [isButtonClick])

    console.log(investigationGridData);


    //save patient registration data
    const onSubmitForSavePatientRegistrationData = async () => {

        // const updatedData = {

        //     isActive: 1,
        //     createdById: parseInt(user?.employeeId),
        //     createdDateTime: new Date().toLocaleString('en-GB', {
        //         day: '2-digit',
        //         month: 'short',
        //         year: 'numeric',
        //         hour: '2-digit',
        //         minute: '2-digit',
        //         second: '2-digit',
        //     }).replace(",", "").replace(/\s/g, "-"),
        //     updateById: 0,
        //     updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
        //         .toLocaleString('en-GB', {
        //             day: '2-digit',
        //             month: 'short',
        //             year: 'numeric',
        //             hour: '2-digit',
        //             minute: '2-digit',
        //             second: '2-digit',
        //         }).replace(",", "").replace(/\s/g, "-"),
        //     patientId: 0,
        //     title_id: parseInt(patientRegistrationData?.title_id),
        //     name: patientRegistrationData?.name,
        //     gender: patientRegistrationData?.gender,
        //     ageTotal: parseInt(patientRegistrationData?.ageDays + patientRegistrationData?.ageMonth * 30 + patientRegistrationData?.ageYear * 365),
        //     ageDays: parseInt(patientRegistrationData?.ageDays),
        //     ageMonth: parseInt(patientRegistrationData?.ageMonth),
        //     ageYear: parseInt(patientRegistrationData?.ageYear),
        //     dob: patientRegistrationData?.dob,
        //     isActualDOB: 0,
        //     emailId: patientRegistrationData?.email,
        //     mobileNo: patientRegistrationData?.mobileNo,
        //     address: patientRegistrationData?.address,
        //     pinCode: patientRegistrationData?.pinCode,
        //     cityId: 0,
        //     centreId: parseInt(patientRegistrationData?.centreId),
        //     areaId: 0,
        //     stateId: 0,
        //     districtId: 0,
        //     countryId: 0,
        //     visitCount: 0,
        //     remarks: '',
        //     documentId: 0,
        //     documnetnumber: 0,
        //     password: 0
        // }

        // console.log(updatedData);

        const addBooking = investigationGridData?.map((data) => ({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }).replace(",", "").replace(/\s/g, "-"),
            updateById: 0,
            updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                .toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }).replace(",", "").replace(/\s/g, "-"),
            transactionId: 0,
            workOrderId: '',
            billNo: 0,
            bookingDate: new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).replace(/ /g, '-'),
            clientCode: patientRegistrationData?.centreId,
            patientId: 0,
            title_id: patientRegistrationData?.title_id,
            name: patientRegistrationData?.name,
            gender: patientRegistrationData?.gender,
            dob: patientRegistrationData?.dob,
            ageYear: patientRegistrationData?.ageYear,
            ageMonth: patientRegistrationData?.ageMonth,
            ageDay: patientRegistrationData?.ageDays,
            totalAge: parseInt(patientRegistrationData?.ageDays + patientRegistrationData?.ageMonth * 30 + patientRegistrationData?.ageYear * 365),
            mobileNo: patientRegistrationData?.mobileNo,
            mrp: data?.mrp,
            grossAmount: data?.grosss,
            discount: data?.discount,
            netAmount: data?.netAmt,
            paidAmount: patientRegistrationData?.paidAmount,
            sessionCentreid: parseInt(user?.defaultCenter),
            centreId: parseInt(patientRegistrationData?.centreId),
            rateId: parseInt(patientRegistrationData?.rateId),
            //====
            isCredit: 0,
            paymentMode: '',
            //====
            source: '',
            discountType: parseInt(patientRegistrationData?.discountType),
            discountid: parseInt(patientRegistrationData?.discountid),
            discountReason: patientRegistrationSelectData?.discountid,
            discountApproved: parseInt(patientRegistrationData?.discountApproved),
            isDisCountApproved: 0,
            patientRemarks: '',
            labRemarks: '',
            otherLabRefer: patientRegistrationData?.refLab,
            otherLabReferID: patientRegistrationData?.refLabID,
            refDoctor1: patientRegistrationData?.refDoctor1,
            refID1: patientRegistrationData?.refID1,
            refDoctor2: patientRegistrationData?.refDoctor2,
            refID2: patientRegistrationData?.refID2,
            tempDOCID: 0,
            tempDoctroName: '',
            uploadDocument: patientRegistrationData?.uploadDocument,
            invoiceNo: '',
            salesExecutiveID: 0
        }));
        console.log(addBooking);

        const addBookingStatus = {
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }).replace(",", "").replace(/\s/g, "-"),
            updateById: 0,
            updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                .toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }).replace(",", "").replace(/\s/g, "-"),
            id: 0,
            transactionId: 0,
            patientId: 0,
            barcodeNo: '',
            status: 'Patient Registration',
            centreId: parseInt(patientRegistrationData?.centreId),
            roleId: parseInt(user?.defaultRole),
            remarks: '',
            testId: 0,
        };
        console.log(addBookingStatus);

        const addBookingItem = investigationGridData?.map((data) => ({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }).replace(",", "").replace(/\s/g, "-"),
            updateById: 0,
            updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                .toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }).replace(",", "").replace(/\s/g, "-"),
            id: 0,
            workOrderId: '',
            transactionId: 0,
            testcode: '',
            itemId: 0,
            packageID: 0,
            deptId: 0,
            barcodeNo: '',
            departmentName: '',
            investigationName: '',
            isPackage: 0,
            packageName: '',
            itemType: data?.itemType,

            mrp: data?.mrp,
            rate: 999999999999,
            discount: data?.discount,
            netAmount: data?.netAmt,

            packMrp: 999999999999,
            packItemRate: 999999999999,
            packItemDiscount: 999999999999,
            packItemNet: 999999999999,
            reportType: 0,
            centreId: 0,
            sessionCentreid: 0,
            isSra: 0,
            isMachineOrder: 0,
            isEmailsent: 0,
            sampleTypeId: 0,
            sampleTypeName: '',
        }));


        // const updatedData2 = {
        //  addBooking:[   isActive: 1,
        //     createdById: parseInt(user?.employeeId),
        //     createdDateTime: new Date().toLocaleString('en-GB', {
        //         day: '2-digit',
        //         month: 'short',
        //         year: 'numeric',
        //         hour: '2-digit',
        //         minute: '2-digit',
        //         second: '2-digit',
        //     }).replace(",", "").replace(/\s/g, "-"),
        //     updateById: 0,
        //     updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
        //         .toLocaleString('en-GB', {
        //             day: '2-digit',
        //             month: 'short',
        //             year: 'numeric',
        //             hour: '2-digit',
        //             minute: '2-digit',
        //             second: '2-digit',
        //         }).replace(",", "").replace(/\s/g, "-"),
        //     transactionId: 0,
        //     workOrderId: '',
        //     billNo: 0,
        //     bookingDate: new Date().toLocaleString('en-GB', {
        //         day: '2-digit',
        //         month: 'short',
        //         year: 'numeric'
        //     }).replace(/ /g, '-'),
        //     clientCode: patientRegistrationData?.centreId,
        //     patientId: 0,
        //     title_id: patientRegistrationData?.title_id,
        //     name: patientRegistrationData?.name,
        //     gender: patientRegistrationData?.gender,
        //     dob: patientRegistrationData?.dob,
        //     ageYear: patientRegistrationData?.ageYear,
        //     ageMonth: patientRegistrationData?.ageMonth,
        //     ageDay: patientRegistrationData?.ageDays,
        //     totalAge: parseInt(patientRegistrationData?.ageDays + patientRegistrationData?.ageMonth * 30 + patientRegistrationData?.ageYear * 365),
        //     mobileNo: patientRegistrationData?.mobileNo,
        //     mrp: 999999999999,
        //     grossAmount: 999999999999,
        //     discount: 999999999999,
        //     netAmount: 999999999999,
        //     paidAmount: 999999999999,
        //     sessionCentreid: 0,
        //     centreId: 0,
        //     rateId: 0,
        //     isCredit: 0,
        //     paymentMode: '',
        //     source: '',
        //     discountType: 0,
        //     discountid: 0,
        //     discountReason: '',
        //     discountApproved: 0,
        //     isDisCountApproved: 0,
        //     patientRemarks: '',
        //     labRemarks: '',
        //     otherLabRefer: '',
        //     otherLabReferID: 0,
        //     refDoctor1: '',
        //     refID1: 0,
        //     refDoctor2: '',
        //     refID2: 0,
        //     tempDOCID: 0,
        //     tempDoctroName: '',
        //     uploadDocument: '',
        //     invoiceNo: '',
        //     salesExecutiveID: 0,
        //     addBookingStatus: [
        //         {
        //             isActive: 0,
        //             createdById: 0,
        //             createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
        //                 .toLocaleString('en-GB', {
        //                     day: '2-digit',
        //                     month: 'short',
        //                     year: 'numeric',
        //                     hour: '2-digit',
        //                     minute: '2-digit',
        //                     second: '2-digit',
        //                 })
        //                 .replace(/ /g, '-'),
        //             updateById: 0,
        //             updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
        //                 .toLocaleString('en-GB', {
        //                     day: '2-digit',
        //                     month: 'short',
        //                     year: 'numeric',
        //                     hour: '2-digit',
        //                     minute: '2-digit',
        //                     second: '2-digit',
        //                 })
        //                 .replace(/ /g, '-'),
        //             id: 0,
        //             transactionId: 0,
        //             patientId: 0,
        //             barcodeNo: '',
        //             status: '',
        //             centreId: 0,
        //             roleId: 0,
        //             remarks: '',
        //             testId: 0,
        //         },
        //     ],
        //     addBookingItem: [
        //         {
        //             isActive: 0,
        //             createdById: 0,
        //             createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
        //                 .toLocaleString('en-GB', {
        //                     day: '2-digit',
        //                     month: 'short',
        //                     year: 'numeric',
        //                     hour: '2-digit',
        //                     minute: '2-digit',
        //                     second: '2-digit',
        //                 })
        //                 .replace(/ /g, '-'),
        //             updateById: 0,
        //             updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
        //                 .toLocaleString('en-GB', {
        //                     day: '2-digit',
        //                     month: 'short',
        //                     year: 'numeric',
        //                     hour: '2-digit',
        //                     minute: '2-digit',
        //                     second: '2-digit',
        //                 })
        //                 .replace(/ /g, '-'),
        //             id: 0,
        //             workOrderId: '',
        //             transactionId: 0,
        //             testcode: '',
        //             itemId: 0,
        //             packageID: 0,
        //             deptId: 0,
        //             barcodeNo: '',
        //             departmentName: '',
        //             investigationName: '',
        //             isPackage: 0,
        //             packageName: '',
        //             itemType: 0,
        //             mrp: 999999999999,
        //             rate: 999999999999,
        //             discount: 999999999999,
        //             netAmount: 999999999999,
        //             packMrp: 999999999999,
        //             packItemRate: 999999999999,
        //             packItemDiscount: 999999999999,
        //             packItemNet: 999999999999,
        //             reportType: 0,
        //             centreId: 0,
        //             sessionCentreid: 0,
        //             isSra: 0,
        //             isMachineOrder: 0,
        //             isEmailsent: 0,
        //             sampleTypeId: 0,
        //             sampleTypeName: '',
        //         },
        //     ],
        //     addpaymentdetail: [
        //         {
        //             id: 0,
        //             transactionId: 0,
        //             transactionType: '',
        //             workOrderId: '',
        //             receiptNo: 0,
        //             receivedAmt: 0,
        //             cashAmt: 0,
        //             creditCardAmt: 0,
        //             creditCardNo: '',
        //             chequeAmt: 0,
        //             chequeNo: '',
        //             onlinewalletAmt: 0,
        //             walletno: '',
        //             nefTamt: 0,
        //             bankName: '',
        //             paymentModeId: 0,
        //             isCancel: 0,
        //             cancelDate: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
        //                 .toLocaleString('en-GB', {
        //                     day: '2-digit',
        //                     month: 'short',
        //                     year: 'numeric',
        //                     hour: '2-digit',
        //                     minute: '2-digit',
        //                     second: '2-digit',
        //                 })
        //                 .replace(/ /g, '-'),
        //             canceledBy: '',
        //             cancelReason: '',
        //             bookingCentreId: 0,
        //             settlementCentreID: 0,
        //             receivedBy: '',
        //             receivedID: 0,
        //         },
        //     ],
        //     ]
        // };

    }

    const filterCentreData = allCentreData.filter((data) => (data?.centreName?.toLowerCase() || '').includes(String(patientRegistrationSelectData?.centreId || '').toLowerCase()));


    const filterRateData = allRateType.filter((data) => (data?.rateName?.toLowerCase() || '').includes(String(patientRegistrationSelectData?.rateId || '').toLowerCase()));
    //
    const filterReferDrData = allReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refDoctor1 || '').toLowerCase()));


    const filterinvestigationNamerData = allInvastigationData.filter((data) => (data?.itemName?.toLowerCase() || '').includes(String(patientRegistrationData?.investigationName || '').toLowerCase()));


    const filterReferDrDataTwo = allReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refDoctor2 || '').toLowerCase()));


    const filterReferLabData = allLabReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refLab || '').toLowerCase()));


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
                    <div>Patient Registration</div>
                </div>

                {/* form data */}
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">


                        <div className="relative flex-1">
                            <select
                                id="isAllergyTest"
                                name='isAllergyTest'
                                // value={labTestMasterData.isAllergyTest}
                                // onChange={handelOnChangeLabTestMasterData}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="">B2B</option>
                                <option value="">DPS-Walking</option>
                                <option value="">Camp</option>
                            </select>
                            <label htmlFor="isAllergyTest" className="menuPeerLevel">
                                Billing Type
                            </label>
                        </div>

                        {/* center */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="centreId"
                                name="centreId"
                                value={patientRegistrationSelectData?.centreId || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistrationForSelect(e)
                                    // setPatientRegistrationSelectData((preventData) => ({
                                    //     ...preventData,
                                    //     centreId: ''
                                    // }))
                                }}
                                onClick={() => openShowSearchBarDropDown(1)}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="centreId" className="menuPeerLevel">
                                Centre
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 1 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>

                                        {
                                            filterCentreData?.length > 0 ? (
                                                filterCentreData?.map((data, index) => (
                                                    <li
                                                        key={data?.centreId}
                                                        name="centreId"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'centreId', value: data?.centreId },
                                                            });
                                                            setPatientRegistrationSelectData((preventData) => ({
                                                                ...preventData,
                                                                centreId: data?.centreName
                                                            }))
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {data?.centreName}
                                                    </li>

                                                ))
                                            )
                                                : (
                                                    <li className="py-4 text-gray-500 text-center">
                                                        {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                    </li>
                                                )

                                        }
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Rate Type */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="rateId"
                                name="rateId"
                                value={patientRegistrationSelectData?.rateId || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistrationForSelect(e)

                                }}
                                onClick={() => openShowSearchBarDropDown(2)}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="rateId" className="menuPeerLevel">
                                Rate Type
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 2 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>

                                        {
                                            filterRateData?.length > 0 ? (
                                                filterRateData?.map((data, index) => (
                                                    <li
                                                        key={data?.id}
                                                        name="rateId"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'rateId', value: data?.id },
                                                            });
                                                            setPatientRegistrationSelectData((preventData) => ({
                                                                ...preventData,
                                                                rateId: data?.rateName
                                                            }))
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
                                            )
                                                : (
                                                    <li className="py-4 text-gray-500 text-center">
                                                        {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                    </li>
                                                )

                                        }
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-[0.25rem]">
                            {/* Edit info */}
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="testName"
                                    name="testName"
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                    Edit info
                                </label>
                            </div>

                            {/* Edit Test */}
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="testName"
                                    name="testName"
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                    Edit Test
                                </label>
                            </div>
                        </div>


                        <div className="relative flex-1">
                            <button
                                type="button"
                                data-ripple-light="true"
                                className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"

                                style={{
                                    background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                }}
                            >
                                Existing Patient
                            </button>

                        </div>
                    </div>

                    <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
                        <div className="flex gap-[0.25rem]">
                            {/* Mobile No. */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="mobileNo"
                                    name="mobileNo"
                                    value={patientRegistrationData?.mobileNo || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="mobileNo" className="menuPeerLevel">
                                    Mobile No.
                                </label>
                            </div>

                            {/* title */}
                            <div className="relative flex-1">
                                <select
                                    id="title_id"
                                    name="title_id"
                                    value={patientRegistrationSelectData.title_id || ""}
                                    onChange={(event) => {
                                        handelOnChangePatientRegistrationForSelect(event);
                                        handelOnChangePatientRegistration(event);
                                    }}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none`}
                                >
                                    <option value="" disabled className="text-gray-400">
                                        Select Title
                                    </option>
                                    {allTitleData?.map((data) => (
                                        <option key={data?.id} value={parseInt(data?.id)}>
                                            {data?.title}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="title_id" className="menuPeerLevel">
                                    Title
                                </label>
                            </div>
                        </div>


                        {/* Name */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={patientRegistrationData?.name || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="name" className="menuPeerLevel">
                                Name
                            </label>
                        </div>




                        <div className="flex gap-[0.25rem]">
                            {/*  Day */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="ageDays"
                                    name="ageDays"
                                    value={patientRegistrationData?.ageDays || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="ageDays" className="menuPeerLevel">
                                    Day
                                </label>
                            </div>

                            {/*  Month */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="ageMonth"
                                    name="ageMonth"
                                    value={patientRegistrationData?.ageMonth || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="ageMonth" className="menuPeerLevel">
                                    Month
                                </label>
                            </div>

                            {/*  Year */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="ageYear"
                                    name="ageYear"
                                    value={patientRegistrationData?.ageYear || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="ageYear" className="menuPeerLevel">
                                    Year
                                </label>
                            </div>
                        </div>


                        <div className="flex gap-[0.25rem] relative">
                            {/* DOB */}
                            <div className="relative flex-1 flex gap-[0.10rem] items-center">
                                {/* Input Field */}
                                <div className="w-full">
                                    <input
                                        type="text"
                                        id="dob"
                                        name="dob"
                                        value={patientRegistrationData.dob}
                                        onChange={handelOnChangePatientRegistration}
                                        placeholder=" "
                                        className={`inputPeerField pr-10 w-full border-borderColor peer focus:outline-none`}
                                    />
                                    <label htmlFor="dob" className="menuPeerLevel">
                                        DOB
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
                                    <CiCalendarDate className="w-4 h-4 font-semibold" />
                                </div>
                            </div>

                            {/* gender */}
                            <div className="relative flex-1">
                                {/* gendersInLabTestMaster */}
                                <select
                                    id="gender"
                                    name='gender'
                                    value={patientRegistrationData?.gender}
                                    onChange={handelOnChangePatientRegistration}
                                    className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                >
                                    <option value="" disabled className="text-gray-400">
                                        Select Gender
                                    </option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="T">Transgender</option>
                                </select>
                                <label htmlFor="gender" className="menuPeerLevel">
                                    Gender
                                </label>
                            </div>

                            {/* Calendar Popup */}
                            {showCalander && (
                                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                                    <UserCalendar onDateClick={handleDateClick} />
                                </div>
                            )}
                        </div>


                        {/* Email */}
                        <div className="relative flex-1">
                            <input
                                type="email"
                                id="emailId"
                                name="emailId"
                                value={patientRegistrationData?.emailId || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="emailId" className="menuPeerLevel">
                                Email
                            </label>
                        </div>


                        {/*  Refer Dr. */}
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="refDoctor1"
                                    name="refDoctor1"
                                    value={patientRegistrationData.refDoctor1 || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}
                                    onClick={() => openShowSearchBarDropDown(4)}
                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor            focus:outline-none`}
                                />
                                <label htmlFor="refDoctor1" className="menuPeerLevel">
                                    Refer Dr.
                                </label>


                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 4 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>

                                            {
                                                filterReferDrData?.length > 0 ? (
                                                    filterReferDrData?.map((data, index) => (
                                                        <li
                                                            key={data?.doctorId}
                                                            name="refDoctor1"
                                                            className="my-1 px-2 cursor-pointer"
                                                            onClick={(e) => {
                                                                openShowSearchBarDropDown(0);
                                                                handelOnChangePatientRegistration({
                                                                    target: { name: 'refID1', value: data?.doctorId },
                                                                });

                                                                handelOnChangePatientRegistration({
                                                                    target: { name: 'refDoctor1', value: data?.doctorName },
                                                                });


                                                            }}
                                                            onMouseEnter={() => setIsHovered(index)}
                                                            onMouseLeave={() => setIsHovered(null)}
                                                            style={{
                                                                background:
                                                                    isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                            }}
                                                        >
                                                            {data?.doctorName}
                                                        </li>

                                                    ))
                                                )
                                                    : (
                                                        <li className="py-4 text-gray-500 text-center">
                                                            {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                        </li>
                                                    )

                                            }
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div
                                    className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                    onClick={() => {
                                        setShowPopup(1), setIdentifyAddReferDrOrReferLab(1)
                                    }}
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                >
                                    <IoMdAdd className="w-4 h-4 font-semibold" />
                                </div>
                            </div>




                        </div>

                        {/* Refer Dr2 */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="refDoctor2"
                                name="refDoctor2"
                                value={patientRegistrationData.refDoctor2 || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}
                                onClick={() => openShowSearchBarDropDown(5)}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor            focus:outline-none`}
                            />
                            <label htmlFor="refDoctor2" className="menuPeerLevel">
                                Refer Dr2
                            </label>


                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 5 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>

                                        {
                                            filterReferDrDataTwo?.length > 0 ? (
                                                filterReferDrDataTwo?.map((data, index) => (
                                                    <li
                                                        key={data?.doctorId}
                                                        name="refDoctor2"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'refID2', value: data?.doctorId },
                                                            });

                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'refDoctor2', value: data?.doctorName },
                                                            });


                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {data?.doctorName}
                                                    </li>

                                                ))
                                            )
                                                : (
                                                    <li className="py-4 text-gray-500 text-center">
                                                        {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                    </li>
                                                )

                                        }
                                    </ul>
                                </div>
                            )}
                        </div>


                        {/* collection date and time */}


                        <div className="relative flex-1 flex gap-[0.10rem] items-center">
                            {/* Input Field */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    id="collectionDateAndTime"
                                    name="collectionDateAndTime"
                                    value={patientRegistrationData.collectionDateAndTime || ''}
                                    onChange={handelOnChangePatientRegistration}
                                    placeholder=" "
                                    className={`inputPeerField pr-10 w-full border-borderColor peer focus:outline-none`}
                                />
                                <label htmlFor="collectionDateAndTime" className="menuPeerLevel">
                                    Collection Date & Time
                                </label>
                            </div>

                            {/* Calendar Icon */}
                            <div
                                className="flex justify-center items-center cursor-pointer rounded font-semibold w-6 h-6"
                                onClick={() => setShowCalanderAndTime(!showCalanderAndTime)}
                                style={{
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            >
                                <RiCalendarScheduleFill className="w-4 h-4 font-semibold" />
                            </div>

                            {/* Calendar Popup */}
                            {showCalanderAndTime && (
                                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                                    <UserCalendarAndTime onDateAndTimeClick={handleDateAndTimeClick} />
                                </div>
                            )}
                        </div>

                        {/* Address */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={patientRegistrationData?.address || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="address" className="menuPeerLevel">
                                Address
                            </label>
                        </div>


                        {/* Pincode */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="pinCode"
                                name="pinCode"
                                value={patientRegistrationData?.pinCode || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="pinCode" className="menuPeerLevel">
                                Pincode
                            </label>
                        </div>

                        {/* Refer Lab/Hospital */}
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    id="refLab"
                                    name="refLab"
                                    value={patientRegistrationData.refLab || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}
                                    onClick={() => openShowSearchBarDropDown(7)}
                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor            focus:outline-none`}
                                />
                                <label htmlFor="refLab" className="menuPeerLevel">
                                    Refer Lab/Hospital
                                </label>


                                {/* Dropdown to select the menu */}
                                {showSearchBarDropDown === 7 && (
                                    <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                        <ul>

                                            {
                                                filterReferLabData?.length > 0 ? (
                                                    filterReferLabData?.map((data, index) => (
                                                        <li
                                                            key={data?.doctorId}
                                                            name="refLab"
                                                            className="my-1 px-2 cursor-pointer"
                                                            onClick={(e) => {
                                                                openShowSearchBarDropDown(0);
                                                                handelOnChangePatientRegistration({
                                                                    target: { name: 'refLabID', value: data?.doctorId },
                                                                });

                                                                handelOnChangePatientRegistration({
                                                                    target: { name: 'refLab', value: data?.doctorName },
                                                                });


                                                            }}
                                                            onMouseEnter={() => setIsHovered(index)}
                                                            onMouseLeave={() => setIsHovered(null)}
                                                            style={{
                                                                background:
                                                                    isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                            }}
                                                        >
                                                            {data?.doctorName}
                                                        </li>

                                                    ))
                                                )
                                                    : (
                                                        <li className="py-4 text-gray-500 text-center">
                                                            {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                        </li>
                                                    )

                                            }
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div
                                    className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                    onClick={() => { setShowPopup(1), setIdentifyAddReferDrOrReferLab(0) }}
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                >
                                    <IoMdAdd className="w-4 h-4 font-semibold" />
                                </div>
                            </div>

                        </div>

                        {/* Upload Document */}
                        <div className="relative flex-1 flex gap-[0.10rem]">
                            <div
                                name="uploadDocument"
                                className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                                onClick={handelClickImage}
                            >
                                {
                                    patientRegistrationData.uploadDocument === '' ? (
                                        <div className="pt-2 z-40 font-semibold text-center">
                                            Upload Document
                                        </div>
                                    ) : (
                                        <div className="pt-2 z-40 text-center">
                                            Upload Document Successfully
                                        </div>
                                    )
                                }

                                <input
                                    type="file"
                                    id="uploadDocument"
                                    name="uploadDocument"
                                    ref={imgRef}
                                    onChange={handelImageChange}
                                    style={{ display: 'none' }}
                                    // accept=".jpg, .jpeg, .png"
                                    max={'150px/150px'}
                                />
                            </div>

                            <label htmlFor="uploadDocument" className="menuPeerLevel">
                                Upload Document
                            </label>

                            {
                                patientRegistrationData?.uploadDocument && (
                                    <div className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                        // onClick={() => setImageView(true)}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                                        <IoMdImages className="w-4 h-4 font-semibold" />
                                    </div>
                                )
                            }
                        </div>

                        {/* investigation */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="investigationName"
                                name="investigationName"
                                value={patientRegistrationData?.investigationName || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}
                                onClick={() => openShowSearchBarDropDown(3)}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="investigationName" className="menuPeerLevel">
                                Investigation (Multi check box)
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 3 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>
                                        {
                                            filterinvestigationNamerData?.length > 0 ? (
                                                filterinvestigationNamerData?.map((data, index) => (
                                                    <li
                                                        key={data?.itemId}
                                                        name="investigationName"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'investigationName', value: data?.itemName },
                                                            });

                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'itemId', value: data?.itemId },
                                                            });
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
                                            )
                                                : (
                                                    <li className="py-4 text-gray-500 text-center">
                                                        {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                    </li>
                                                )

                                        }
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                    <div className="grid grid-cols-12 gap-2 mt-1 mb-1 mx-1 lg:mx-2">

                        {
                            investigationGridData?.length !== 0 && (
                                <div className="col-span-12">
                                    <div className="max-h-[8.2rem] overflow-y-auto">
                                        <table className="table-auto border-collapse w-full text-xxs text-left">
                                            <thead
                                                style={{
                                                    position: "sticky",
                                                    top: 0,
                                                    zIndex: 1,
                                                    background: activeTheme?.menuColor,
                                                    color: activeTheme?.iconColor,
                                                }}
                                            >
                                                <tr>
                                                    {patientRegistrationInvestigation?.map((data, index) => (
                                                        <td
                                                            key={index}
                                                            className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                        >
                                                            {data}
                                                        </td>
                                                    ))}
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {
                                                    investigationGridData?.map((data, rowIndex) => (
                                                        <tr
                                                            //Prefer unique keys
                                                            key={rowIndex}
                                                            className={`cursor-pointer ${isHoveredTable === rowIndex
                                                                ? ""
                                                                : rowIndex % 2 === 0
                                                                    ? "bg-gray-100"
                                                                    : "bg-white"
                                                                }`}
                                                            onMouseEnter={() => setIsHoveredTable(rowIndex)}
                                                            onMouseLeave={() => setIsHoveredTable(null)}
                                                            style={{
                                                                background:
                                                                    isHoveredTable === rowIndex
                                                                        ? activeTheme?.subMenuColor
                                                                        : undefined,
                                                            }}
                                                        >
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.itemName}
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                <FontAwesomeIcon icon="fas fa-info-circle" />
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.mrp}
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.grosss}
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.discount}
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.netAmt}
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                <select className="border rounded px-1 w-full outline-none">
                                                                    {data?.sampleTypeName?.map((item, index) => (
                                                                        <option key={index} value={item}>
                                                                            {item}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                <input type="text" className='border-[1.5px] rounded outline-none px-1 w-full' />
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.deliveryDate}
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor text-center pt-1">
                                                                <input type="checkbox"
                                                                    id={`checkbox-${rowIndex}`}
                                                                />
                                                                {/* <label htmlFor={`checkbox-${rowIndex}`} className="sr-only">
                                                                    Select Row
                                                                </label> */}
                                                            </td>
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                <RiDeleteBin2Fill
                                                                    onClick={() => deleteinvestigationGridDataByItemId(rowIndex)}

                                                                    className="cursor-pointer text-red-500 text-base"
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                }


                                            </tbody>
                                        </table>
                                    </div>

                                    <div
                                        className="w-full h-4 flex gap-10 items-center text-xxs px-4 font-semibold"
                                        style={{
                                            background: activeTheme?.menuColor,
                                            color: activeTheme?.iconColor,
                                        }}
                                    >
                                        <div className="flex gap-1">
                                            <div>Test Count:</div>
                                            <div>1000</div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div>Total:</div>
                                            <div>500</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }



                    </div>


                    {/* <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-2  mx-1 lg:mx-2">

                        {/* Currency */}
                        <div className="relative flex-1">
                            <select
                                id="isAllergyTest"
                                name='isAllergyTest'
                                // value={labTestMasterData.isAllergyTest}
                                // onChange={handelOnChangeLabTestMasterData}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="">INR</option>
                                <option value="">USD</option>
                            </select>
                            <label htmlFor="isAllergyTest" className="menuPeerLevel">
                                Currency
                            </label>
                        </div>

                        {/* Payment Mode */}
                        <div className="relative flex-1">
                            <div
                                className={`flex peer items-center border-[1.5px] 
                                border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white `}
                                onClick={() => showSearchBarDropDown !== 6 ? openShowSearchBarDropDown(6) : openShowSearchBarDropDown(0)}
                            >
                                <input
                                    type="text"
                                    id="paymentModeType"
                                    name="paymentModeType"
                                    // disabled={labTestMasterData?.itemType === '3'}
                                    value={
                                        paymentModeType.length === 0
                                            ? ''
                                            : paymentModeType
                                                .map((data) => data?.label)
                                                .join(', ')
                                    }
                                    // onChange={handelOnChangePatientRegistration}
                                    readOnly
                                    placeholder="Search Payment Mode"
                                    className={`w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none cursor-pointer`}
                                />
                                <label htmlFor="paymentModeType" className="menuPeerLevel">
                                    Payment Mode
                                </label>

                                <div>
                                    {
                                        showSearchBarDropDown === 6 ? <RiArrowDropUpLine className='text-xl cursor-pointer' /> : <RiArrowDropDownLine className='text-xl cursor-pointer' />
                                    }
                                </div>
                            </div>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 6 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">

                                    {
                                        paymentModes?.length === 0 ?

                                            <div className='py-4 text-gray-500 text-center'>
                                                {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                                            </div>
                                            :
                                            <ul className='w-full'>

                                                {/* Individual Checkboxes */}
                                                {paymentModes?.length > 0 ? (
                                                    paymentModes?.map((data, index) => {

                                                        return (
                                                            <li
                                                                key={index}
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
                                                                        checked={paymentModeType?.some((item) => item?.value === data?.value)}
                                                                        onChange={(e) => handleCheckboxChange(e, data)}
                                                                    />
                                                                </div>
                                                                <div>{data?.label}</div>
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

                        {/* Paid Amt. */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="paidAmount"
                                name="paidAmount"
                                value={patientRegistrationData?.paidAmount || ''}
                                placeholder=" "
                                className="inputPeerField peer border-borderColor focus:outline-none"
                                readOnly
                            />

                            <label htmlFor="paidAmount" className="menuPeerLevel">
                                Paid Amt.
                            </label>
                        </div>

                        {/* Balance Amt. */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="balanceAmt"
                                name="balanceAmt"
                                value={100 || ''}
                                // onChange={(e) => {
                                //     handelChangeEmployeeDetails(e)

                                //     setSelectedSearchDropDownData((preventData) => ({
                                //         ...preventData,
                                //         balanceAmt: '',
                                //     }));
                                // }}
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor            focus:outline-none `}

                                readOnly
                            />
                            <label htmlFor="balanceAmt" className="menuPeerLevel">
                                Balance Amt.
                            </label>
                        </div>
                    </div>

                    {/* payment mode grid */}
                    <div className='mx-2 mb-2'>
                        <table className="table-auto border-collapse w-full text-xxs text-left">
                            {/* Table Header */}
                            <thead
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            >
                                <tr>
                                    {patientRegistrationPaymentMode?.map((data, index) => (
                                        <td
                                            key={index}
                                            className="border-b font-semibold border-gray-300 text-center text-xxs"
                                        >
                                            {data}
                                        </td>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>

                                <tr>

                                    <td className="text-xxs font-semibold text-gridTextColor"
                                    >
                                        <input type="number" name="cashAmt" id="cashAmt"
                                            value={patientRegistrationData?.cashAmt || ''}
                                            onChange={(e) => handelOnChangePatientRegistration(e)}
                                            className={`inputPeerField outline-none ${paymentModeType.some((item) => item.value === "1") ? "cursor-pointer" : "cursor-not-allowed"
                                                }`}
                                            readOnly={!paymentModeType.some((item) => item.value === "1")}
                                        />
                                    </td>


                                    <td className="text-xxs font-semibold text-gridTextColor"
                                    >
                                        <input type="number"
                                            name="creditCardAmt" id="creditCardAmt"
                                            value={patientRegistrationData?.creditCardAmt || ''}
                                            onChange={(e) => handelOnChangePatientRegistration(e)}
                                            className={`inputPeerField outline-none ${paymentModeType.some((item) => item.value === "2") ? "cursor-pointer" : "cursor-not-allowed"
                                                }`}
                                            readOnly={!paymentModeType.some((item) => item.value === "2")}
                                        />
                                    </td>

                                    <td className="text-xxs font-semibold text-gridTextColor"
                                    >
                                        <input type="number" name="" id=""
                                            className={`inputPeerField outline-none ${paymentModeType.some((item) => item.value === "2") ? "cursor-pointer" : "cursor-not-allowed"
                                                }`}
                                            readOnly={!paymentModeType.some((item) => item.value === "2")}
                                        />
                                    </td>


                                    <td className='text-xxs font-semibold text-gridTextColor'>

                                        <select
                                            id="bank_Id"
                                            name="bank_Id"
                                            value={patientRegistrationData.bank_Id || ""}
                                            onChange={(event) => {

                                                handelOnChangePatientRegistration(event);
                                            }}
                                            className={`inputPeerField border-borderColor peer focus:outline-none ${!paymentModeType.some((item) => item.value === "2") ? "cursor-not-allowed" : "cursor-pointer"
                                                }`}
                                            disabled={!paymentModeType.some((item) => item.value === "2")}
                                        >
                                            <option value="" disabled className="text-gray-400">
                                                Select Bank
                                            </option>
                                            {allBankNameData?.map((data) => (
                                                <option key={data?.id} value={parseInt(data?.id)}>
                                                    {data?.bankName}
                                                </option>
                                            ))}
                                        </select>

                                    </td>

                                    <td className="text-xxs font-semibold text-gridTextColor"
                                    >
                                        <input type="number"
                                            name="onlinewalletAmt" id="onlinewalletAmt"
                                            value={patientRegistrationData?.onlinewalletAmt || ''}
                                            onChange={(e) => handelOnChangePatientRegistration(e)}
                                            className={`inputPeerField outline-none ${!paymentModeType.some((item) => item.value === "3") ? 'cursor-not-allowed' : 'cursor-pointer'}`}

                                            readOnly={!paymentModeType.some((item) => item.value === "3")}
                                        />
                                    </td>



                                    <td className='text-xxs font-semibold text-gridTextColor'>
                                        <select
                                            id="paymentMode"
                                            name='paymentMode'
                                            // value={labTestMasterData.paymentMode}
                                            // onChange={(event) => setPaymentMode(event.target.value)}
                                            className={`inputPeerField border-borderColor peer focus:outline-none ${!paymentModeType.some((item) => item.value === "3") ? "cursor-not-allowed" : "cursor-pointer"
                                                }`}
                                            disabled={!paymentModeType.some((item) => item.value === "3")}
                                        >
                                            <option disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value="1">PayTm</option>
                                            <option value="2">PhonePay</option>
                                            <option value="3">BHIM</option>
                                            <option value="4">GooglePay</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-2  mx-1 lg:mx-2">

                        {/* Discount Type */}
                        <div className="relative flex-1">
                            <select
                                id="discountType"
                                name='discountType'
                                value={patientRegistrationData?.discountType}
                                onChange={(event) => handelOnChangePatientRegistration(event)}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option value={0} disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>

                                {
                                    allDicountTypeData?.map((data) => (
                                        <option key={data?.id} value={data?.id}>{data?.type}</option>

                                    ))
                                }

                            </select>
                            <label htmlFor="discountType" className="menuPeerLevel">
                                Discount Type
                            </label>
                        </div>


                        {/* Discount Ammount */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangePatientRegistration(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Discount Ammount
                            </label>
                        </div>

                        {/* Discount % */}
                        <div className="relative flex-1">
                            <input
                                type="number"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangePatientRegistration(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Discount %
                            </label>
                        </div>


                        {/* Discount Reason */}
                        <div className="relative flex-1">
                            <select
                                id="discountid"
                                name="discountid"
                                value={patientRegistrationData?.discountid}
                                onChange={(event) => {
                                    const selectedOption = event.target.options[event.target.selectedIndex];
                                    const id = selectedOption.value;
                                    const reasonName = selectedOption.getAttribute("data-reasonname");

                                    // Call separate methods for id and reasonName
                                    handelOnChangePatientRegistration(event);

                                    setPatientRegistrationSelectData((preventData) => ({
                                        ...preventData,
                                        discountid: reasonName
                                    }))
                                }}
                                className="inputPeerField cursor-pointer peer border-borderColor focus:outline-none"
                            >
                                <option value={0} disabled hidden className="text-gray-400">
                                    Select Option
                                </option>
                                {allDiscountReasonData?.map((data) => (
                                    <option key={data?.id} value={data?.id} data-reasonname={data?.discountReasonName}>
                                        {data?.discountReasonName}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="discountid" className="menuPeerLevel">
                                Discount Reason
                            </label>
                        </div>


                        {/* Discount Approved By */}
                        <div className="relative flex-1">
                            <select
                                id="discountApproved"
                                name='discountApproved'
                                value={patientRegistrationData?.discountApproved}
                                onChange={(event) => handelOnChangePatientRegistration(event)}
                                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                            >
                                <option value={0} disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                {
                                    allDiscountApprovedByData?.map((data) => (
                                        <option key={data?.empId} value={data?.empId}>{`${data?.fName} ${data?.lName}`}</option>

                                    ))
                                }
                            </select>
                            <label htmlFor="discountApproved" className="menuPeerLevel">
                                Discount Approved By
                            </label>
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

                                    onClick={onSubmitForSavePatientRegistrationData}
                                >

                                    {/* {
                                    isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save Mapping'
                                } */}
                                    Save
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
                                >

                                    {/* {
                                    isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save Mapping'
                                } */}
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                </form >
            </div >



            {/* popup for active and deactive status */}
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
                                    {
                                        identifyAddReferDrOrReferLab === 1 ?
                                            'Add Refer Dr.'
                                            :
                                            'Refer Lab/Hospital'
                                    }

                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setShowPopup(0), setIdentifyAddReferDrOrReferLab(0) }}
                                />
                            </div>


                            <form
                                // onSubmit={}
                                autoComplete='off'>

                                <div className='mx-1 mt-2 grid grid-cols-2 gap-2'>

                                    {/* title */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={addReferDrData.title}
                                            onChange={handelChangeOnAddReferDrData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="title" className="menuPeerLevel">
                                            Title
                                        </label>
                                    </div>

                                    {/* doctorName */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="text"
                                            id="doctorName"
                                            name="doctorName"
                                            value={addReferDrData.doctorName}
                                            onChange={handelChangeOnAddReferDrData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="doctorName" className="menuPeerLevel">
                                            Name
                                        </label>
                                    </div>


                                    {/* mobileNo */}
                                    <div className="relative flex-1 ">
                                        <input
                                            type="number"
                                            id="mobileNo"
                                            name="mobileNo"
                                            value={addReferDrData.mobileNo}
                                            onChange={handelChangeOnAddReferDrData}
                                            placeholder=" "
                                            className={`inputPeerField peer border-borderColor focus:outline-none`}
                                        />
                                        <label htmlFor="mobileNo" className="menuPeerLevel">
                                            Mobile No.
                                        </label>
                                    </div>

                                    <div className="flex items-stretch  text-white  rounded-md"
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <button
                                            type="button"
                                            data-ripple-light="true"
                                            className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                            style={{
                                                background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                            }}
                                            onClick={onSumitAddReferDrData}
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
        </>
    )
}
