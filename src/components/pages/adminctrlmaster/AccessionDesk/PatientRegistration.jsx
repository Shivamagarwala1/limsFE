import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import UserCalendar from '../../../public/UserCalendar';
import useRippleEffect from '../../../customehook/useRippleEffect';
import { IoMdAdd, IoMdCloseCircleOutline, IoMdImages } from 'react-icons/io';
import useOutsideClick from '../../../customehook/useOutsideClick';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCalendarScheduleFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { dummyDataForpatientRegistrationoldPatient, patientRegistrationInvestigation, patientRegistrationoldPatient, patientRegistrationPaymentMode, paymentModes } from '../../../listData/listData';
import { CustomEmailInput } from '../../../global/CustomEmailInput'
import { employeeWiseCentre, getAllBankNameApi, getAllDicountReasionApi, getAllDiscountApprovedBy, getAllDisCountType, getAllEmpTitleApi, getAllInvestiGationApi, getAllInvestigationGridApi, getAllRateTypeForPatientRegistrationData, getAllReferDrApi, getAllReferLabApi, savePatientRegistrationDataApi, saveReferDrApi } from '../../../../service/service';
import { FaSearch, FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { toProperCase } from '../../../global/InputFieldValidations';
import { CustomTextBox } from '../../../global/CustomTextBox';
import { CustomNumberInput } from '../../../global/CustomNumberInput';
import CustomDropdown from '../../../global/CustomDropdown';
import { DatePicker } from '../../../global/DatePicker';
import CustomFormButton from '../../../global/CustomFormButton'
import CustomFileUpload from '../../../global/CustomFileUpload';
import CustomSearchInputFields from '../../../global/CustomSearchDropdown';
import { useFormattedDate, useFormattedDateTime } from '../../../customehook/useDateTimeFormate';
import FormHeader from '../../../global/FormHeader';
import PopupFooter from '../../../global/PopupFooter';
import GridDataDetails from '../../../global/GridDataDetails';
import CustomeNormalButton from '../../../global/CustomeNormalButton';

export default function PatientRegistration() {

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);

    useRippleEffect();

    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [showCalander, setShowCalander] = useState(false);
    const [showCalanderAndTime, setShowCalanderAndTime] = useState(false);
    const [patientRegistrationData, setPatientRegistrationData] = useState({

        //additional
        billingType: '',

        centreId: 0,
        paymentMode: '',
        paymentModeId: 0,
        rateId: 0,
        mobileNo: '',
        title_id: 0,
        name: '',
        ageDays: 0,
        ageMonth: 0,
        ageYear: 0,
        dob: useFormattedDate(),
        gender: '',
        emailId: '',

        collectionDateAndTime: useFormattedDateTime(),

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
        lastFoureDigit: 0,
        bankName: '',
        onlinewalletAmt: 0,

        grossAmount: 0,

        bank_Id: 0,
        discountAmmount: 0,
        discountPercentage: 0,
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

    const [searchData, setSearchData] = useState({
        editInfoId: '',
        editTestId: ''
    })

    const [addReferDrData, setAddReferDrData] = useState({
        isActive: 0,
        createdById: 0,
        createdDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
        updateById: 0,
        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
            .toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
        doctorId: 0,
        doctorCode: '',
        title: '',
        doctorName: '',
        imaRegistartionNo: '',
        emailId: '',
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

    const [gridDataBarCodeandSampleType, setGridDataBarCodeandSampleType] = useState({
        barCode: [],
        sampleType: [],
        discount: []
    });

    const [patientRegistrationDataError, setPatientRegistrationDataError] = useState([]);

    const [selectedInvastigationList, setSelectedInvastigationList] = useState([]);
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


    //search data
    const handelOnChangeSearchData = (event) => {
        setSearchData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


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
    const calculateDOB = (ageDay, ageMonth, ageYear) => {
        const today = new Date();
        const dob = new Date(
            today.getFullYear() - ageYear,
            today.getMonth() - ageMonth,
            today.getDate() - ageDay
        );

        const formattedDOB = dob.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

        // Update DOB only if it changes
        setPatientRegistrationData((prevData) => {
            const newDOB = formattedDOB.replace(/ /g, '-');
            if (prevData.dob !== newDOB) {
                return { ...prevData, dob: newDOB };
            }
            return prevData;
        });
    };

    // Function to calculate age based on DOB
    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const currentDate = new Date();

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        // Adjust for negative days
        if (days < 0) {
            months--;
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += lastMonth.getDate();
        }

        // Ensure months and years are zero if there is no difference
        if (years < 0) years = 0; // Handle edge cases where dob is in the future
        if (months < 0) months = 0;

        // Update age only if it changes
        setPatientRegistrationData((prevData) => {
            if (
                prevData.ageYear !== years ||
                prevData.ageMonth !== months ||
                prevData.ageDays !== days
            ) {
                // Construct the updated data
                const updatedData = {
                    ...prevData,
                    ageYear: years || "0",
                    ageMonth: months || "0",
                    ageDays: days || "0",
                };


                // Return the updated data
                return updatedData;
            }
            // Return the unchanged data
            return prevData;
        });

    };


    // Recalculate DOB if age fields change
    useEffect(() => {
        if (
            patientRegistrationData?.ageYear ||
            patientRegistrationData?.ageMonth ||
            patientRegistrationData?.ageDays
        ) {
            calculateDOB(
                patientRegistrationData?.ageDays,
                patientRegistrationData?.ageMonth,
                patientRegistrationData?.ageYear
            );
        }
    }, [patientRegistrationData?.ageDays, patientRegistrationData?.ageMonth, patientRegistrationData?.ageYear]);

    // Recalculate age if DOB changes
    useEffect(() => {
        if (patientRegistrationData?.dob) {
            calculateAge(patientRegistrationData?.dob);
        }
    }, [patientRegistrationData?.dob]);


    //calculate paid amt.
    useEffect(() => {
        // Calculate paidAmount dynamically
        const totalPaid =
            parseFloat(patientRegistrationData.cashAmt || 0) +
            parseFloat(patientRegistrationData.creditCardAmt || 0) +
            parseFloat(patientRegistrationData.onlinewalletAmt || 0);

        // Update paidAmount in state, ensuring it's a double (two decimal places)
        setPatientRegistrationData((prevData) => ({
            ...prevData,
            paidAmount: parseFloat(totalPaid.toFixed(2)), // Ensures double value with 2 decimals
        }));
    }, [
        patientRegistrationData.cashAmt,
        patientRegistrationData.creditCardAmt,
        patientRegistrationData.onlinewalletAmt,
    ]);

    //calculate discount data for each item
    useEffect(() => {

        const discountAmmount = gridDataBarCodeandSampleType?.discount
            ? parseInt(
                gridDataBarCodeandSampleType?.discount?.reduce(
                    (sum, data) => sum + (parseInt(data?.discount) || 0),
                    0
                ) || 0
            )
            : 0;

        const totalGross = investigationGridData
            ? investigationGridData.reduce((sum, data) => sum + (parseInt(data?.grosss) || 0), 0)
            : 0;

        const discountPercentage = totalGross > 0
            ? ((discountAmmount / totalGross) * 100).toFixed(4)
            : 0.0000;


        if (gridDataBarCodeandSampleType?.discount?.length !== 0) {

            setPatientRegistrationData((preventdata) => ({
                ...preventdata,
                discountAmmount: discountAmmount,
                discountPercentage: discountPercentage,
                grossAmount: investigationGridData.reduce(
                    (sum, data) =>
                        sum +
                        (data?.netAmt || 0) -
                        parseFloat(
                            gridDataBarCodeandSampleType?.discount.find(
                                (item) =>
                                    item.itemId ===
                                    data?.itemId
                            )?.discount || 0
                        ),
                    0
                )
            }))
        }

    }, [gridDataBarCodeandSampleType?.discount])

    //calculate discount amt to discount %
    // Function to calculate Discount Percentage from Discount Amount
    const AmtToPercentage = (totalGross, discountAmount) => {
        return totalGross > 0
            ? ((discountAmount / totalGross) * 100).toFixed(4)
            : 0.0000;
    };

    // Function to calculate Discount Amount from Discount Percentage
    const PercentageToAmt = (totalGross, discountPercentage) => {
        return totalGross > 0
            ? ((discountPercentage / 100) * totalGross).toFixed(2)
            : 0.0000;
    };

    // useEffect for Discount Amount to Percentage
    useEffect(() => {

        const totalGross = investigationGridData
            ? investigationGridData.reduce((sum, data) => sum + (parseInt(data?.grosss) || 0), 0)
            : 0;

        if (patientRegistrationData?.discountAmmount !== undefined) {
            const discountPercentage = AmtToPercentage(totalGross, patientRegistrationData?.discountAmmount);

            // Update only the discountPercentage field
            setPatientRegistrationData((prevData) => ({
                ...prevData,
                discountPercentage: parseFloat(discountPercentage),
                grossAmount: investigationGridData.reduce(
                    (sum, data) => sum + (data?.netAmt || 0),
                    0
                ) - (patientRegistrationData?.discountAmmount || 0)
            }));
        }
    }, [patientRegistrationData?.discountAmmount, investigationGridData]);

    // useEffect for Discount Percentage to Amount
    useEffect(() => {

        const totalGross = investigationGridData
            ? investigationGridData.reduce((sum, data) => sum + (parseInt(data?.grosss) || 0), 0)
            : 0;

        if (patientRegistrationData?.discountPercentage !== undefined) {
            const discountAmount = PercentageToAmt(totalGross, patientRegistrationData?.discountPercentage);

            // Update only the discountAmmount field
            setPatientRegistrationData((prevData) => ({
                ...prevData,
                discountAmmount: parseFloat(discountAmount),
                grossAmount: investigationGridData.reduce(
                    (sum, data) => sum + (data?.netAmt || 0),
                    0
                ) - (patientRegistrationData?.discountAmmount || 0)
            }));
        }
    }, [patientRegistrationData?.discountPercentage, investigationGridData]);



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
                toast.info("Please upload a valid image (.jpg, .jpeg, .png) or PDF file.")
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
            [event?.target?.name]: event?.target?.value
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
                const response = await getAllInvestiGationApi(patientRegistrationData?.rateId || 0);

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
                const response = await getAllInvestigationGridApi(
                    patientRegistrationData?.rateId || 0,
                    patientRegistrationData?.itemId || 0
                );


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


                        // Use a functional update for setState to check for duplicates
                        let isDuplicate = false;
                        setinvestigationGridData((prevData) => {

                            isDuplicate = prevData.some((item) => item.itemId === result.itemId);
                            if (isDuplicate) {
                                return prevData; // No changes if duplicate
                            }
                            return [...prevData, result];
                        });

                        // Show toast if duplicate is detected
                        if (isDuplicate) {
                            toast.error("Duplicate item selected. Please select a different item.");
                        }
                    }
                }

            } catch (error) {
                toast.error(error?.message);
            }


        }
        getAllinvestigationGridData();

    }, [patientRegistrationData?.rateId, patientRegistrationData?.itemId])


    //selecte only single data
    const handelSelecteOnlyUniqueTestData = (data) => {

        let isDuplicate = investigationGridData?.some((item) => item.itemId === data.itemId);

        if (isDuplicate) {
            toast.info('Already select the item')
        } else {
            setSelectedInvastigationList(prevList => [...prevList, { itemId: data?.itemId, itemName: data?.itemName }])
        }
        //console.log(investigationGridData);

    }


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
                    createdDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
                    doctorId: 0,
                    doctorCode: '',
                    title: '',
                    doctorName: '',
                    imaRegistartionNo: '',
                    emailId: '',
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


    //handel on chenge grid data
    const handleInputChange = (rowId, value, inputFields) => {

        if (inputFields === '1') {
            setGridDataBarCodeandSampleType((prevState) => {
                // Filter out the existing entry for this rowId in the `discount` array
                const updatedDiscount = prevState.discount.filter((item) => item.itemId !== rowId);

                // Add the updated entry with the new value
                return {
                    ...prevState,
                    discount: [...updatedDiscount, { itemId: rowId, discount: value }],
                };
            });
        } else {
            setGridDataBarCodeandSampleType((prevState) => {
                // Filter out the existing entry for this rowId in the `barCode` array
                const updatedBarCode = prevState.barCode.filter((item) => item.itemId !== rowId);

                // Add the updated entry with the new value
                return {
                    ...prevState,
                    barCode: [...updatedBarCode, { itemId: rowId, name: value }],
                };
            });
        }
    };



    const handleSampleTypeChange = (event, index, itemType) => {

        const selectedOption = event.target.value;

        const sampleTypeName = investigationGridData[index]?.sampleTypeName;
        const updatedSampleType = {
            id: sampleTypeName.indexOf(selectedOption) + 1,

            name: selectedOption,  // The name is the selected value
            itemType: itemType
        };

        setGridDataBarCodeandSampleType((prevState) => ({
            ...prevState,
            sampleType: [updatedSampleType], // Store the single selected sample type
        }));
    };


    //validations
    const validateForm = () => {

        const errors = {};



        // Check for  fields
        if (!patientRegistrationData.billingType) errors.billingType = true;



        if (!patientRegistrationData.title_id) errors.title_id = true;
        if (!patientRegistrationData.name) errors.name = true;

        if (!patientRegistrationData.ageDays) errors.ageDays = true;
        if (!patientRegistrationData.ageMonth) errors.ageMonth = true;
        if (!patientRegistrationData.ageYear) errors.ageYear = true;
        if (!patientRegistrationData.dob) errors.dob = true;

        if (!patientRegistrationData.gender) errors.gender = true;
        if (!patientRegistrationData.investigationName) errors.investigationName = true;


        // Validate based on paymentModeType
        paymentModeType?.forEach((paymentMode) => {

            switch (paymentMode?.label) {

                case 'Debit/Credit Card':
                    if (!patientRegistrationData.creditCardAmt) {
                        errors.creditCardAmt = true;
                    }
                    if (!patientRegistrationData.lastFoureDigit) {
                        errors.lastFoureDigit = true;
                    }
                    break;

                case 'UPI':
                    if (!patientRegistrationData.onlinewalletAmt) {
                        errors.onlinewalletAmt = true;
                    }
                    break;

                default:
                    break;
            }
        })

        //sampleTypeName filed required

        if (!patientRegistrationData.discountAmmount) errors.discountAmmount = true;
        if (!patientRegistrationData.discountPercentage) errors.discountPercentage = true;
        if (!patientRegistrationData.discountid) errors.discountid = true;
        if (!patientRegistrationData.discountApproved) errors.discountApproved = true;

        // Update state with errors
        setPatientRegistrationDataError(errors);
        // console.log(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };


    useEffect(() => {

        if (!validateForm()) {
            setIsButtonClick(0);
        }
    }, [patientRegistrationData, paymentModeType]);

    //save patient registration data
    const onSubmitForSavePatientRegistrationData = async () => {

        setIsButtonClick(2);

        const updatedData = {

            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            updateById: 0,
            updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                .toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            patientId: 0,
            title_id: parseInt(patientRegistrationData?.title_id),
            name: patientRegistrationData?.name,
            gender: patientRegistrationData?.gender,
            ageTotal: parseInt(patientRegistrationData?.ageDays + patientRegistrationData?.ageMonth * 30 + patientRegistrationData?.ageYear * 365),
            ageDays: parseInt(patientRegistrationData?.ageDays),
            ageMonth: parseInt(patientRegistrationData?.ageMonth),
            ageYear: parseInt(patientRegistrationData?.ageYear),
            dob: patientRegistrationData?.dob,
            isActualDOB: 0,
            emailId: patientRegistrationData?.emailId,
            mobileNo: patientRegistrationData?.mobileNo,
            address: patientRegistrationData?.address,
            pinCode: patientRegistrationData?.pinCode,
            cityId: 0,
            centreId: parseInt(patientRegistrationData?.centreId),
            areaId: 0,
            stateId: 0,
            districtId: 0,
            countryId: 0,
            visitCount: 0,
            remarks: '',
            documentId: 0,
            documnetnumber: 0,
            password: 0,
            addBooking: [
                {
                    isActive: 1,
                    createdById: parseInt(user?.employeeId),
                    createdDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
                    updateById: 0,
                    updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                        .toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
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
                    mrp: investigationGridData?.reduce((sum, item) => sum + (item.mrp || 0), 0),
                    grossAmount: investigationGridData?.reduce((sum, item) => sum + (item.grosss || 0), 0),
                    discount: investigationGridData?.reduce((sum, item) => sum + (item.discount || 0), 0),
                    netAmount: investigationGridData?.reduce((sum, item) => sum + (item.netAmt || 0), 0),
                    paidAmount: patientRegistrationData?.paidAmount,
                    sessionCentreid: parseInt(user?.defaultCenter),
                    centreId: parseInt(patientRegistrationData?.centreId),
                    rateId: parseInt(patientRegistrationData?.rateId),
                    isCredit: patientRegistrationData?.paymentMode === "Cash" ? 0 : 1,
                    paymentMode: patientRegistrationData?.paymentMode,
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
                    refDoctor1: patientRegistrationData?.refDoctor1, //need to filter the data baed on refId1
                    refID1: patientRegistrationData?.refID1,
                    refDoctor2: patientRegistrationData?.refDoctor2, //need to filter the data baed on refId2
                    refID2: patientRegistrationData?.refID2,
                    tempDOCID: 0,
                    tempDoctroName: '',
                    uploadDocument: patientRegistrationData?.uploadDocument,
                    invoiceNo: '',
                    salesExecutiveID: 0,
                    addBookingStatus: [
                        {
                            isActive: 1,
                            createdById: parseInt(user?.employeeId),
                            createdDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
                            updateById: 0,
                            updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                                .toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
                            id: 0,
                            transactionId: 0,
                            patientId: 0,
                            barcodeNo: '',
                            status: 'Patient Registration',
                            centreId: parseInt(patientRegistrationData?.centreId),
                            roleId: parseInt(user?.defaultRole),
                            remarks: '',
                            testId: 0,
                        }
                    ],
                    addBookingItem: investigationGridData?.map((data) => ({

                        isActive: 1,
                        createdById: parseInt(user?.employeeId),
                        createdDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
                        updateById: 0,
                        updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                            .toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
                        id: 0,
                        workOrderId: '',
                        transactionId: 0,
                        testcode: data?.testcode,
                        itemId: parseInt(data?.itemId),
                        packageID: data?.itemType === 3 ? parseInt(data?.itemType) : 0,
                        deptId: data?.deptId,
                        barcodeNo: gridDataBarCodeandSampleType.barCode.find(barcode => barcode.itemId === data.itemId)?.name || '',
                        departmentName: data?.departmentname || '',
                        investigationName: selectedInvastigationList?.find(barcode => barcode.itemId === data.itemType)?.itemName || '',
                        isPackage: data?.itemType === 3 ? 1 : 0,
                        packageName: data?.itemType === 3 ? selectedInvastigationList?.find(barcode => barcode.itemId === data.itemType)?.itemName : '',
                        itemType: data?.itemType,

                        mrp: data?.mrp,
                        rate: data?.grosss,
                        discount: data?.discount,
                        netAmount: data?.netAmt,

                        packMrp: data?.itemType === 3 ? data?.mrp : 0,
                        packItemRate: data?.grosss === 3 ? data?.grosss : 0,
                        packItemDiscount: data?.itemType === 3 ? data?.discount : 0,
                        packItemNet: data?.itemType === 3 ? data?.netAmt : 0,
                        reportType: 0,

                        centreId: parseInt(patientRegistrationData?.centreId), //
                        sessionCentreid: parseInt(user?.defaultCenter),
                        isSra: 0,
                        isMachineOrder: 0,
                        isEmailsent: 0,
                        sampleTypeId: gridDataBarCodeandSampleType?.sampleType?.find(barcode => barcode.itemId === data.itemType) ? id : 0,
                        sampleTypeName: gridDataBarCodeandSampleType?.sampleType?.find(barcode => barcode.itemType === data.itemType)?.name,

                    })),
                    addpaymentdetail: paymentModeType?.map((data) => ({
                        id: 0,
                        transactionId: 0,
                        transactionType: patientRegistrationData?.paymentMode,
                        workOrderId: '',
                        receiptNo: 0,
                        receivedAmt: 0,
                        cashAmt: data?.value === '1' ? parseFloat(patientRegistrationData?.cashAmt) : 0,
                        creditCardAmt: data?.value === '2' ? parseFloat(patientRegistrationData?.creditCardAmt) : 0,
                        creditCardNo: patientRegistrationData?.lastFoureDigit,
                        chequeAmt: 0,
                        chequeNo: '',
                        onlinewalletAmt: parseInt(patientRegistrationData?.onlinewalletAmt),
                        walletno: '',
                        nefTamt: 0,
                        bankName: data?.value === '2' ? patientRegistrationData?.bankName : '',
                        paymentModeId: parseInt(data?.value),
                        isCancel: 0,
                        // cancelDate: new Date().toLocaleString('en-GB', {
                        //     day: '2-digit',
                        //     month: 'short',
                        //     year: 'numeric',
                        //     hour: '2-digit',
                        //     minute: '2-digit',
                        //     second: '2-digit',
                        // }).replace(",", "").replace(/\s/g, "-"),
                        cancelDate: '',
                        canceledBy: '',
                        cancelReason: '',
                        bookingCentreId: parseInt(patientRegistrationData?.centreId),
                        settlementCentreID: 0,
                        receivedBy: user?.name,
                        receivedID: parseInt(user?.employeeId)
                    }))

                }
            ]
        };

        console.log(updatedData);



        // Validate form before submitting
        if (!validateForm()) {
            toast.info("Please fill in all mandatory fields.");
            setIsButtonClick(0);
            return;
        }

        try {
            const response = await savePatientRegistrationDataApi(updatedData);

            if (response?.success) {
                toast.success(response?.message);

                setPatientRegistrationData(
                    {
                        "address": "",
                        "ageDays": 0,
                        "ageMonth": 0,
                        "ageTotal": 0,
                        "ageYear": 0,
                        "areaId": 0,
                        "centreId": 0,
                        "cityId": 0,
                        "countryId": 0,
                        "createdById": 0,
                        "createdDateTime": "",
                        "districtId": 0,
                        "dob": "",
                        "documentId": 0,
                        "documnetnumber": 0,
                        "emailId": "",
                        "gender": "",
                        "isActive": 0,
                        "isActualDOB": 0,
                        "mobileNo": "",
                        "name": "",
                        "password": 0,
                        "patientId": 0,
                        "pinCode": "",
                        "remarks": "",
                        "stateId": 0,
                        "title_id": 0,
                        "updateById": 0,
                        "updateDateTime": "",
                        "visitCount": 0,
                        "addBooking": [
                            {
                                "ageDay": "",
                                "ageMonth": "",
                                "ageYear": "",
                                "billNo": 0,
                                "bookingDate": "",
                                "centreId": 0,
                                "clientCode": 0,
                                "createdById": 0,
                                "createdDateTime": "",
                                "discount": 0,
                                "discountApproved": 0,
                                "discountReason": "",
                                "discountType": 0,
                                "discountid": 0,
                                "dob": "",
                                "gender": "",
                                "grossAmount": 0,
                                "invoiceNo": "",
                                "isActive": 0,
                                "isCredit": 0,
                                "isDisCountApproved": 0,
                                "labRemarks": "",
                                "mobileNo": "",
                                "mrp": 0,
                                "name": "",
                                "netAmount": 0,
                                "otherLabRefer": "",
                                "otherLabReferID": 0,
                                "paidAmount": 0,
                                "patientId": 0,
                                "patientRemarks": "",
                                "paymentMode": "",
                                "rateId": 0,
                                "refDoctor1": "",
                                "refDoctor2": "",
                                "refID1": 0,
                                "refID2": 0,
                                "salesExecutiveID": 0,
                                "sessionCentreid": 0,
                                "source": "",
                                "tempDOCID": 0,
                                "tempDoctroName": "",
                                "title_id": "",
                                "totalAge": 0,
                                "transactionId": 0,
                                "updateById": 0,
                                "updateDateTime": "",
                                "uploadDocument": "",
                                "workOrderId": "",
                                "addBookingStatus": [
                                    {
                                        "barcodeNo": "",
                                        "centreId": 0,
                                        "createdById": 0,
                                        "createdDateTime": "",
                                        "id": 0,
                                        "isActive": 0,
                                        "patientId": 0,
                                        "remarks": "",
                                        "roleId": 0,
                                        "status": "",
                                        "testId": 0,
                                        "transactionId": 0,
                                        "updateById": 0,
                                        "updateDateTime": ""
                                    }
                                ],
                                "addBookingItem": [
                                    {
                                        "barcodeNo": "",
                                        "centreId": 0,
                                        "createdById": 0,
                                        "createdDateTime": "",
                                        "departmentName": "",
                                        "deptId": 0,
                                        "discount": 0,
                                        "id": 0,
                                        "investigationName": "",
                                        "isActive": 0,
                                        "isEmailsent": 0,
                                        "isMachineOrder": 0,
                                        "isPackage": 0,
                                        "isSra": 0,
                                        "itemId": 0,
                                        "itemType": 0,
                                        "mrp": 0,
                                        "netAmount": 0,
                                        "packItemDiscount": 0,
                                        "packItemNet": 0,
                                        "packItemRate": 0,
                                        "packMrp": 0,
                                        "packageID": 0,
                                        "packageName": "",
                                        "rate": 0,
                                        "reportType": 0,
                                        "sampleTypeId": 0,
                                        "sampleTypeName": "",
                                        "sessionCentreid": 0,
                                        "testcode": "",
                                        "transactionId": 0,
                                        "updateById": 0,
                                        "updateDateTime": "",
                                        "workOrderId": ""
                                    },
                                    {
                                        "barcodeNo": "",
                                        "centreId": 0,
                                        "createdById": 0,
                                        "createdDateTime": "",
                                        "departmentName": "",
                                        "deptId": 0,
                                        "discount": 0,
                                        "id": 0,
                                        "investigationName": "",
                                        "isActive": 0,
                                        "isEmailsent": 0,
                                        "isMachineOrder": 0,
                                        "isPackage": 0,
                                        "isSra": 0,
                                        "itemId": 0,
                                        "itemType": 0,
                                        "mrp": 0,
                                        "netAmount": 0,
                                        "packItemDiscount": 0,
                                        "packItemNet": 0,
                                        "packItemRate": 0,
                                        "packMrp": 0,
                                        "packageID": 0,
                                        "packageName": "",
                                        "rate": 0,
                                        "reportType": 0,
                                        "sampleTypeId": 0,
                                        "sampleTypeName": "",
                                        "sessionCentreid": 0,
                                        "testcode": "",
                                        "transactionId": 0,
                                        "updateById": 0,
                                        "updateDateTime": "",
                                        "workOrderId": ""
                                    }
                                ],
                                "addpaymentdetail": [
                                    {
                                        "bankName": "",
                                        "bookingCentreId": 0,
                                        "cancelDate": "",
                                        "cancelReason": "",
                                        "canceledBy": "",
                                        "cashAmt": 0,
                                        "chequeAmt": 0,
                                        "chequeNo": "",
                                        "creditCardAmt": 0,
                                        "creditCardNo": "",
                                        "id": 0,
                                        "isCancel": 0,
                                        "nefTamt": 0,
                                        "onlinewalletAmt": 0,
                                        "paymentModeId": 0,
                                        "receiptNo": 0,
                                        "receivedAmt": 0,
                                        "receivedBy": "",
                                        "receivedID": 0,
                                        "settlementCentreID": 0,
                                        "transactionId": 0,
                                        "transactionType": "",
                                        "walletno": "",
                                        "workOrderId": ""
                                    },
                                    {
                                        "bankName": "",
                                        "bookingCentreId": 0,
                                        "cancelDate": "",
                                        "cancelReason": "",
                                        "canceledBy": "",
                                        "cashAmt": 0,
                                        "chequeAmt": 0,
                                        "chequeNo": "",
                                        "creditCardAmt": 0,
                                        "creditCardNo": "",
                                        "id": 0,
                                        "isCancel": 0,
                                        "nefTamt": 0,
                                        "onlinewalletAmt": 0,
                                        "paymentModeId": 0,
                                        "receiptNo": 0,
                                        "receivedAmt": 0,
                                        "receivedBy": "",
                                        "receivedID": 0,
                                        "settlementCentreID": 0,
                                        "transactionId": 0,
                                        "transactionType": "",
                                        "walletno": "",
                                        "workOrderId": ""
                                    }
                                ]
                            }
                        ]
                    }

                );

                setinvestigationGridData([]);

            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
            console.log(error);
        }

        setIsButtonClick(0);
    }

    const filterCentreData = allCentreData.filter((data) => (data?.centreName?.toLowerCase() || '').includes(String(patientRegistrationSelectData?.centreId || '').toLowerCase()));


    const filterRateData = allRateType.filter((data) => (data?.rateName?.toLowerCase() || '').includes(String(patientRegistrationSelectData?.rateId || '').toLowerCase()));
    //
    const filterReferDrData = allReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refDoctor1 || '').toLowerCase()));


    const filterinvestigationNamerData = allInvastigationData.filter((data) => (data?.itemName?.toLowerCase() || '').includes(String(patientRegistrationData?.investigationName || '').toLowerCase()));


    const filterReferDrDataTwo = allReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refDoctor2 || '').toLowerCase()));


    const filterReferLabData = allLabReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refLab || '').toLowerCase()));



    //experiment
    // const [email, setEmail] = useState('');

    // const handelEmail = (name, value) => {
    //     setEmail(value)
    // }

    // const [isLoading, setIsLoading] = useState(0); // State to track loading status

    // const handleButtonClick = (loadingValue) => {
    //     setIsLoading(loadingValue); // Set loading state to 2
    //     // Simulate an API call or async operation
    //     setTimeout(() => {
    //         setIsLoading(0); // Reset loading state after operation is complete
    //     }, 2000); // Change 2000ms to any desired duration
    // };

    const calendarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalanderAndTime(0);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>


            {/* <CustomTextBox
                type="days" //email,text
                name="email"
                label="Digit"
                value={email}
                onChange={(name, value) => setEmail(value)}

                isMandatory={true}
                maxLength={100}
            />

            <CustomFormButton
                activeTheme={activeTheme}
                text="Save Button 2"
                icon={FaSpinner}
                isButtonClick={isLoading}
                loadingButtonNumber={2} // Unique number for the second button
                onClick={() => handleButtonClick(2)} // Pass button number to handler
            />



            <CustomNumberInput
                type="phoneNumber"
                name="phoneNumber"
                value={email}
                onChange={handelEmail}
                maxLength={10}
                label="Phone Number"
            />

            <CustomFormButton
                activeTheme={activeTheme}
                text="Save Button 1"
                icon={FaSpinner}
                isButtonClick={isLoading}
                loadingButtonNumber={1} // Unique number for the first button
                onClick={() => handleButtonClick(1)} // Pass button number to handler
            />

            <CustomNumberInput
                type="pinCode"
                name="pinCode"
                value={email}
                onChange={handelEmail}
                maxLength={6}
                label="Pin Code"
            />

            <CustomeNormalButton
                activeTheme={activeTheme}
                text="Open Popup"
            />

            <p className='text-xl font-semibold'>Pincode</p>
            <CustomEmailInput
                name="email"
                value={email}
                onChange={handelEmail}
                label="Enter your email"
            /> */}

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
                                id="billingType"
                                name='billingType'
                                value={patientRegistrationData?.billingType}
                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                className={`inputPeerField cursor-pointer peer  ${patientRegistrationDataError?.billingType ? "border-b-red-500" : "border-borderColor"
                                    } focus:outline-none `}
                            >
                                <option value='' disabled hidden className='text-gray-400'>
                                    Select Option
                                </option>
                                <option value="1">B2B</option>
                                <option value="2">DPS-Walking</option>
                                <option value="3">Camp</option>
                                <option value="4">DSA Agent</option>
                            </select>
                            <label htmlFor="billingType" className="menuPeerLevel">
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

                                                            setPatientRegistrationData((preventData) => ({
                                                                ...preventData,
                                                                paymentMode: data?.paymentMode,
                                                                paymentModeId: data?.paymentModeId
                                                            }))

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

                            <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                <div className="relative flex-1">

                                    <CustomTextBox
                                        type="alphabetandchar"
                                        name="editInfoId"
                                        value={searchData?.editInfoId || ''}
                                        onChange={(e) => handelOnChangeSearchData(e)}
                                        label="Edit info"
                                        isDisabled={false}
                                        maxLength={10}
                                        allowSpecialChars={false}
                                        isMandatory={false}
                                        decimalPrecision={4}
                                    />

                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className="h-[1.6rem] w-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold "
                                        onClick={() => {
                                            setShowPopup(2)
                                        }}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <FaSearch className="w-3 h-3 font-semibold" />
                                    </button>
                                </div>




                            </div>

                            {/* Edit Test */}
                            <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                <div className="relative flex-1">

                                    <CustomTextBox
                                        type="alphabetandchar"
                                        name="editTestId"
                                        value={searchData?.editTestId || ''}
                                        onChange={(e) => handelOnChangeSearchData(e)}
                                        label="Edit Test"
                                        isDisabled={false}
                                        maxLength={10}
                                        allowSpecialChars={false}
                                        isMandatory={false}
                                        decimalPrecision={4}
                                    />

                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className=" h-[1.6rem] w-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold "
                                        onClick={() => {
                                            setShowPopup(3)
                                        }}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <FaSearch className="w-3 h-3 font-semibold" />
                                    </button>
                                </div>




                            </div>
                        </div>


                        <div className="flex gap-[0.25rem]">



                            <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                <div className="relative flex-1">

                                    <CustomTextBox
                                        type="alphabetandchar"
                                        name="oldPatient"
                                        value={searchData?.editTestId || ''}
                                        onChange={(e) => handelOnChangeSearchData(e)}
                                        label="Old Patient"
                                        isDisabled={false}
                                        maxLength={10}
                                        allowSpecialChars={false}
                                        isMandatory={false}
                                        decimalPrecision={4}
                                    />

                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className="h-[1.6rem] w-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold "
                                        onClick={() => {
                                            setShowPopup(4)
                                        }}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <FaSearch className="w-3 h-3 font-semibold" />
                                    </button>
                                </div>




                            </div>

                            <div className="relative flex-1"></div>
                        </div>
                    </div>

                    <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
                        <div className="flex gap-[0.25rem]">
                            {/* Mobile No. */}
                            <div className="relative flex-1">
                                <input
                                    type="text"
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
                                    value={patientRegistrationData?.title_id || ""}
                                    onChange={(event) => {
                                        handelOnChangePatientRegistrationForSelect(event);
                                        handelOnChangePatientRegistration(event);
                                    }}
                                    className={`inputPeerField cursor-pointer peer ${patientRegistrationDataError?.title_id ? "border-b-red-500" : "border-borderColor"
                                        } focus:outline-none`}
                                >
                                    <option value="" disabled className="text-gray-400">
                                        Select Title
                                    </option>
                                    {allTitleData?.map((data) => (
                                        <option key={data?.id} value={data?.id}>
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
                                id="fullName"
                                name="name"
                                value={toProperCase(patientRegistrationData?.name) || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}

                                placeholder=" "
                                className={`inputPeerField peer ${patientRegistrationDataError.name ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
                            />
                            <label htmlFor="fullName" className="menuPeerLevel">
                                Name
                            </label>
                        </div>




                        <div className="flex gap-[0.25rem]">

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
                                    className={`inputPeerField peer ${patientRegistrationDataError.ageYear ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
                                />
                                <label htmlFor="ageYear" className="menuPeerLevel">
                                    Year
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
                                    className={`inputPeerField peer ${patientRegistrationDataError.ageMonth ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
                                />
                                <label htmlFor="ageMonth" className="menuPeerLevel">
                                    Month
                                </label>
                            </div>

                            {/*  Day */}
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="ageDays"
                                    name="ageDays"
                                    value={patientRegistrationData?.ageDays || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer ${patientRegistrationDataError.ageDays ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
                                />
                                <label htmlFor="ageDays" className="menuPeerLevel">
                                    Days
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
                                        readOnly
                                        className={`inputPeerField pr-10 w-full ${patientRegistrationDataError.dob ? "border-b-red-500" : "border-borderColor"} peer focus:outline-none`}
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
                                    className={`inputPeerField cursor-pointer peer ${patientRegistrationDataError.gender ? "border-b-red-500" : "border-borderColor"} focus:outline-none `}
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
                                    <UserCalendar
                                        onDateClick={handleDateClick}

                                        minDate={new Date(new Date().getFullYear() - 150, 11, 31)} // Default min date: January 1, 1950
                                        maxDate={new Date(new Date().getFullYear() + 1, 11, 31)} // Default max date: December 31, 2100
                                        startDayOfWeek={0} // 0 = Sunday, 1 = Monday, etc.

                                        showTime={false} // Whether to show time selection
                                        activeTheme={activeTheme}
                                        tillDate={new Date()} // Default till date: today
                                        timeFormat={"12"} // Default time format: 24-hour
                                    />
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
                                onClick={() => setShowCalanderAndTime(2)}
                                style={{
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            >
                                <RiCalendarScheduleFill className="w-4 h-4 font-semibold" />
                            </div>

                            {/* Calendar Popup */}
                            {showCalanderAndTime === 2 && (
                                <div
                                    ref={calendarRef}
                                    className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                                    {/* <UserCalendarAndTime onDateAndTimeClick={handleDateAndTimeClick} /> */}
                                    <UserCalendar
                                        onDateClick={handleDateAndTimeClick}

                                        minDate={new Date(new Date().getFullYear() - 150, 11, 31)} // Default min date: January 1, 1950
                                        maxDate={new Date(new Date().getFullYear() + 1, 11, 31)} // Default max date: December 31, 2100
                                        startDayOfWeek={0} // 0 = Sunday, 1 = Monday, etc.

                                        showTime={true} // Whether to show time selection
                                        activeTheme={activeTheme}
                                        tillDate={new Date()} // Default till date: today
                                        timeFormat={"12"} // Default time format: 24-hour
                                    />
                                </div>
                            )}
                        </div>

                        {/* Address */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="patientAddress"
                                name="address"
                                value={patientRegistrationData?.address || ''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="patientAddress" className="menuPeerLevel">
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
                        <div className="relative flex-2 lg:col-span-2">
                            <input
                                type="search"
                                id="investigationName"
                                name="investigationName"
                                value={patientRegistrationData?.investigationName || ''}
                                // value={''}
                                onChange={(e) => {
                                    handelOnChangePatientRegistration(e)
                                }}
                                onClick={() => openShowSearchBarDropDown(3)}
                                placeholder=" "
                                className={`inputPeerField peer ${patientRegistrationDataError.investigationName ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
                            />
                            <label htmlFor="investigationName" className="menuPeerLevel">
                                Test Search By Name or Code
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
                                                                target: { name: 'investigationName', value: ' ' },
                                                            });

                                                            handelOnChangePatientRegistration({
                                                                target: { name: 'itemId', value: data?.itemId },
                                                            });

                                                            // setSelectedInvastigationList(prevList => [...prevList, { itemId: data?.itemId, itemName: data?.itemName }]);

                                                            handelSelecteOnlyUniqueTestData(data)

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

                    {/* Divider Line */}
                    <div
                        className="w-full h-[0.10rem]"
                        style={{ background: activeTheme?.menuColor }}
                    ></div>
                    {
                        investigationGridData?.length !== 0 && (
                            <>


                                {/* Table Container */}
                                <div className="grid grid-cols-12 gap-2 mt-1 mb-1 mx-1 lg:mx-2">
                                    <div className="col-span-12">
                                        <div className="max-h-56 overflow-y-auto">
                                            {/* Table */}
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
                                                        {patientRegistrationInvestigation?.map(
                                                            (data, index) => (
                                                                <td
                                                                    key={index}
                                                                    className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                                >
                                                                    {data}
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                </thead>


                                                <tbody>

                                                    {/* Data Rows */}
                                                    {investigationGridData?.map(
                                                        (data, rowIndex) => (
                                                            <tr
                                                                key={rowIndex}
                                                                className={`cursor-pointer ${rowIndex % 2 === 0
                                                                    ? "bg-gray-100"
                                                                    : "bg-white"
                                                                    } `}
                                                                onMouseEnter={() =>
                                                                    setIsHoveredTable(rowIndex)
                                                                }
                                                                onMouseLeave={() =>
                                                                    setIsHoveredTable(null)
                                                                }

                                                                style={{
                                                                    background:
                                                                        isHoveredTable === rowIndex ? activeTheme?.subMenuColor : undefined,
                                                                }}
                                                            >
                                                                {/* Table Cells */}
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    {data?.itemName}
                                                                </td>
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    <FontAwesomeIcon icon="fas fa-info-circle" onClick={() => setShowPopup(5)} />
                                                                </td>
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    {data?.mrp}
                                                                </td>
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    {data?.grosss}
                                                                </td>
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor w-24">
                                                                    <input
                                                                        type="text"
                                                                        className="border-[1.5px] rounded outline-none px-1 w-full"
                                                                        value={
                                                                            gridDataBarCodeandSampleType?.discount.find(
                                                                                (item) =>
                                                                                    item.itemId ===
                                                                                    data?.itemId
                                                                            )?.discount || ""
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleInputChange(
                                                                                data?.itemId,
                                                                                e.target.value,
                                                                                "1"
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    {(
                                                                        (data?.netAmt || 0) -
                                                                        parseFloat(
                                                                            gridDataBarCodeandSampleType?.discount.find(
                                                                                (item) =>
                                                                                    item.itemId ===
                                                                                    data?.itemId
                                                                            )?.discount || 0
                                                                        )
                                                                    ).toFixed(2)}
                                                                </td>
                                                                {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    <select
                                                                        className="border rounded px-1 w-full outline-none"
                                                                        onChange={(e) =>
                                                                            handleSampleTypeChange(
                                                                                e,
                                                                                rowIndex,
                                                                                data?.itemType
                                                                            )
                                                                        }
                                                                        defaultValue={0}
                                                                    >
                                                                        <option
                                                                            value={0}
                                                                            disabled
                                                                            hidden
                                                                            className="text-gray-400"
                                                                        >
                                                                            Select Option
                                                                        </option>
                                                                        {data?.sampleTypeName?.map(
                                                                            (item, index) => (
                                                                                <option
                                                                                    key={index}
                                                                                    value={item}
                                                                                >
                                                                                    {item}
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </td> */}


                                                                {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    <input
                                                                        type="text"
                                                                        className="border-[1.5px] rounded outline-none px-1 w-[6.2rem]"
                                                                        value={
                                                                            gridDataBarCodeandSampleType.barCode.find(
                                                                                (item) =>
                                                                                    item.itemId ===
                                                                                    data?.itemId
                                                                            )?.name || ""
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleInputChange(
                                                                                data?.itemId,
                                                                                e.target.value,
                                                                                "2"
                                                                            )
                                                                        }
                                                                    />
                                                                </td> */}


                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    {data?.deliveryDate}
                                                                </td>
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor text-center pt-1">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`checkbox-${rowIndex}`}
                                                                    />
                                                                </td>
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                    <RiDeleteBin2Fill
                                                                        onClick={() =>
                                                                            deleteinvestigationGridDataByItemId(
                                                                                rowIndex
                                                                            )
                                                                        }
                                                                        className="cursor-pointer text-red-500 text-base"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}

                                                </tbody>

                                                {/* Table Footer */}
                                                <tfoot
                                                    style={{
                                                        position: "sticky",
                                                        bottom: 0,
                                                        zIndex: 1,
                                                        background: activeTheme?.menuColor,
                                                        color: activeTheme?.iconColor,
                                                    }}
                                                >
                                                    <tr>
                                                        <td className="px-4 h-5 text-xxs font-semibold">
                                                            Test Count: {investigationGridData?.length}
                                                        </td>
                                                        <td className="px-4 h-5 text-xxs font-semibold">Total Amt.</td>
                                                        <td className="px-4 h-5 text-xxs font-semibold">
                                                            {investigationGridData.reduce((sum, data) => sum + (data?.mrp || 0), 0)}
                                                        </td>
                                                        <td className="px-4 h-5 text-xxs font-semibold">
                                                            {investigationGridData.reduce((sum, data) => sum + (data?.grosss || 0), 0)}
                                                        </td>
                                                        <td className="px-4 h-5 text-xxs font-semibold">
                                                            {investigationGridData.reduce(
                                                                (sum, data) =>
                                                                    sum +
                                                                    parseFloat(
                                                                        gridDataBarCodeandSampleType?.discount.find(
                                                                            (item) => item.itemId === data?.itemId
                                                                        )?.discount || 0
                                                                    ),
                                                                0
                                                            )}
                                                        </td>
                                                        <td className="px-4 h-5 text-xxs font-semibold">
                                                            {patientRegistrationData?.grossAmount}
                                                        </td>
                                                        <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                        <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                        <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>


                                    </div>
                                </div>



                                {/* <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div> */}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-2  mx-1 lg:mx-2">

                                    {/* Currency */}
                                    <div className="relative flex-1">
                                        <select
                                            id="currency"
                                            name='currency'
                                            // value={labTestMasterData.currency}
                                            // onChange={handelOnChangeLabTestMasterData}
                                            className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
                                        >
                                            <option disabled hidden className='text-gray-400'>
                                                Select Option
                                            </option>
                                            <option value="">INR</option>
                                            <option value="">USD</option>
                                        </select>
                                        <label htmlFor="currency" className="menuPeerLevel">
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
                                            value={patientRegistrationData?.grossAmount - patientRegistrationData?.cashAmt - patientRegistrationData?.creditCardAmt - patientRegistrationData?.onlinewalletAmt}

                                            // value={
                                            //     investigationGridData
                                            //     ? investigationGridData.reduce((sum, data) => {
                                            //         // Find the discount for the current item
                                            //         const discount = gridDataBarCodeandSampleType?.discount.find(item => item?.itemId === data?.itemId)?.discount || 0;

                                            //         // Subtract the discount from the netAmt and accumulate the total
                                            //         const adjustedNetAmt = (data?.netAmt || 0) - parseFloat(discount);
                                            //         return ((sum + adjustedNetAmt) - patientRegistrationData?.cashAmt - patientRegistrationData?.creditCardAmt - patientRegistrationData?.onlinewalletAmt);
                                            //     }, 0)
                                            //     : 0
                                            // }

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
                                                        className={`inputPeerField  ${patientRegistrationDataError.cashAmt ? "border-b-red-500" : "border-borderColor"} outline-none ${paymentModeType.some((item) => item.value === "1") ? "cursor-pointer" : "cursor-not-allowed"
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
                                                        className={`inputPeerField
                                                            
                                                            ${patientRegistrationDataError.creditCardAmt ? "border-b-red-500" : "border-borderColor"}

                                                            outline-none ${paymentModeType.some((item) => item.value === "2") ? "cursor-pointer" : "cursor-not-allowed"
                                                            }`}
                                                        readOnly={!paymentModeType.some((item) => item.value === "2")}
                                                    />
                                                </td>

                                                <td className="text-xxs font-semibold text-gridTextColor"
                                                >
                                                    <input type="number" name="lastFoureDigit" id="lastFoureDigit"
                                                        value={patientRegistrationData?.lastFoureDigit || ''}
                                                        onChange={(e) => handelOnChangePatientRegistration(e)}
                                                        maxLength={4}
                                                        className={`inputPeerField
                                                            ${patientRegistrationDataError.lastFoureDigit ? "border-b-red-500" : "border-borderColor"}
                                                            outline-none ${paymentModeType.some((item) => item.value === "2") ? "cursor-pointer" : "cursor-not-allowed"
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
                                                            // Find the selected bank's data
                                                            const selectedBank = allBankNameData?.find(
                                                                (data) => parseInt(data.id) === parseInt(event.target.value)
                                                            );

                                                            // Update the state
                                                            handelOnChangePatientRegistration(event);

                                                            setPatientRegistrationData((prevData) => ({
                                                                ...prevData,
                                                                bankName: selectedBank?.bankName || "",
                                                                bank_Id: event.target.value, // Optionally store the ID as well
                                                            }));
                                                        }}
                                                        className={`inputPeerField border-borderColor peer focus:outline-none ${!paymentModeType.some((item) => item.value === "2")
                                                            ? "cursor-not-allowed"
                                                            : "cursor-pointer"
                                                            }`}
                                                        disabled={!paymentModeType.some((item) => item.value === "2")}
                                                    >
                                                        <option value="" disabled className="text-gray-400">
                                                            Select Bank
                                                        </option>
                                                        {allBankNameData?.map((data) => (
                                                            <option key={data?.id} value={data?.id}>
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
                                                        className={`inputPeerField  ${patientRegistrationDataError.onlinewalletAmt ? "border-b-red-500" : "border-borderColor"} outline-none ${!paymentModeType.some((item) => item.value === "3") ? 'cursor-not-allowed' : 'cursor-pointer'}`}

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
                                            id="discountAmmount"
                                            name="discountAmmount"
                                            value={patientRegistrationData?.discountAmmount}
                                            onChange={(event) => handelOnChangePatientRegistration(event)}
                                            placeholder=" "
                                            className={`inputPeerField peer ${patientRegistrationDataError.discountAmmount ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
                                        />

                                        <label htmlFor="discountAmmount" className="menuPeerLevel">
                                            Discount Ammount
                                        </label>
                                    </div>

                                    {/* Discount % */}
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            id="discountPercentage"
                                            name="discountPercentage"
                                            value={patientRegistrationData?.discountPercentage}

                                            onChange={(e) => handelOnChangePatientRegistration(e)}

                                            placeholder=" "
                                            className={`inputPeerField  ${patientRegistrationDataError.discountPercentage ? "border-b-red-500" : "border-borderColor"} focus:outline-none `}
                                        />
                                        <label htmlFor="discountPercentage" className="menuPeerLevel">
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
                                            className={`inputPeerField cursor-pointer peer  ${patientRegistrationDataError.discountid ? "border-b-red-500" : "border-borderColor"} focus:outline-none`}
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
                                            className={`inputPeerField cursor-pointer peer  ${patientRegistrationDataError.discountApproved ? "border-b-red-500" : "border-borderColor"} focus:outline-none `}
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
                                            {/* <button
                                                type="button"
                                                data-ripple-light="true"
                                                className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                                style={{
                                                    background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                                }}

                                                onClick={onSubmitForSavePatientRegistrationData}
                                            >

                                                {
                                                    isButtonClick === 2 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                                }

                                            </button> */}


                                            <button
                                                type="button"
                                                data-ripple-light="true"
                                                className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                                style={{
                                                    background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                                }}

                                                onClick={() => setShowPopup(6)}
                                            >
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
                            </>
                        )
                    }

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

                            <div>


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
                    </div>
                )
            }


            {
                showPopup === 2 && (
                    <div className="fixed inset-0 px-32 bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-2  mt-10 bg-white rounded-lg shadow-2xl animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Edit Info.

                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setShowPopup(0) }}
                                />
                            </div>

                            <div className=''>

                                <div
                                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                                    style={{ background: activeTheme?.blockColor }}
                                >
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-house" />
                                    </div>
                                    <div>Patient Info.</div>
                                </div>

                                <form autoComplete='off'>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">

                                        <div className='flex gap-[0.25rem]'>
                                            <div className='relative flex-1'>
                                                <CustomNumberInput
                                                    type="phoneNumber"
                                                    name="mobileNo"
                                                    value={patientRegistrationData?.mobileNo || ''}
                                                    onChange={(e) => {
                                                        handelOnChangePatientRegistration(e)
                                                    }}
                                                    maxLength={10}
                                                    label="Mobile No."
                                                />
                                            </div>

                                            <div className='relative flex-1 mt-[1.9px]'>
                                                <CustomDropdown
                                                    name="title_id"
                                                    label="Select Title"
                                                    value={patientRegistrationData?.title_id}
                                                    options={[
                                                        { label: 'Select Option', value: 0, disabled: true },
                                                        ...allTitleData?.map(item => ({
                                                            label: item.title,
                                                            value: item.id,
                                                        })),
                                                    ]}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    defaultIndex={0}
                                                    activeTheme={activeTheme}
                                                    isMandatory={!Boolean(patientRegistrationData?.title_id)}
                                                />

                                            </div>
                                        </div>


                                        <div className='relative flex-1'>
                                            <CustomTextBox
                                                type="propercase"
                                                name="name"
                                                value={patientRegistrationData?.name || ''}
                                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                                label="Name"
                                                isDisabled={false}
                                                isMandatory={!Boolean(patientRegistrationData?.name)}
                                            />
                                        </div>

                                        <div className='flex gap-[0.25rem]'>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="years"
                                                    name="ageYear"
                                                    value={patientRegistrationData?.ageYear || ''}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    label="Years"
                                                    isDisabled={false}
                                                    maxLength={3}
                                                    allowSpecialChars={false}
                                                    isMandatory={!Boolean(patientRegistrationData?.ageYear)}
                                                    decimalPrecision={4}
                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="months"
                                                    name="ageMonth"
                                                    value={patientRegistrationData?.ageMonth || ''}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    label="Months"
                                                    isDisabled={false}
                                                    maxLength={2}
                                                    allowSpecialChars={false}
                                                    isMandatory={!Boolean(patientRegistrationData?.ageMonth)}
                                                    decimalPrecision={4}
                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="days"
                                                    name="ageDays"
                                                    value={patientRegistrationData?.ageDays || ''}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    label="Days"
                                                    isDisabled={false}
                                                    maxLength={2}
                                                    allowSpecialChars={false}
                                                    isMandatory={!Boolean(patientRegistrationData?.ageDays)}
                                                    decimalPrecision={4}
                                                />

                                            </div>

                                        </div>


                                        <div className='flex gap-[0.25rem]'>

                                            <div className='relative flex-1'>
                                                <DatePicker
                                                    id="dob"
                                                    name="dob"
                                                    value={patientRegistrationData?.dob || ''}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    placeholder=" "
                                                    label="DOB"
                                                    activeTheme={activeTheme}
                                                    //isDisabled={false}
                                                    isMandatory={!Boolean(patientRegistrationData?.dob)}
                                                    currentDate={new Date()} // Current date: today
                                                    maxDate={new Date(2025, 11, 31)}
                                                    showTime={false}
                                                    showBigerCalandar={true}
                                                />
                                                {/* </div> */}

                                            </div>

                                            <div className='relative flex-1 mt-[1.9px]'>
                                                <CustomDropdown
                                                    name="gender"
                                                    label="Select Gender"
                                                    value={patientRegistrationData?.gender || ''}
                                                    options={[
                                                        { label: 'Select Option', value: '', disabled: true },
                                                        { label: 'Male', value: 'M' },
                                                        { label: 'Female', value: 'F' },
                                                        { label: 'Transgender', value: 'T' },
                                                    ]}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    defaultIndex={0}
                                                    activeTheme={activeTheme}
                                                    isMandatory={false}
                                                />

                                            </div>
                                        </div>


                                        <div className="relative flex-1">
                                            <CustomEmailInput
                                                name="emailId"
                                                value={patientRegistrationData?.emailId}
                                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                                label="Email"
                                            />
                                        </div>


                                        <div className='relative flex-1'>
                                            <DatePicker
                                                id="collectionDateAndTime"
                                                name="collectionDateAndTime"
                                                value={patientRegistrationData?.collectionDateAndTime || ''}
                                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                                placeholder=" "
                                                label="Collection Date & Time"
                                                activeTheme={activeTheme}
                                                //isDisabled={false}
                                                isMandatory={!Boolean(patientRegistrationData?.dob)}
                                                currentDate={new Date()} // Current date: today

                                                showTime={true}
                                                showBigerCalandar={false}
                                            />

                                        </div>




                                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                            <div className="relative flex-1">
                                                <CustomSearchInputFields
                                                    id="refID1"
                                                    name="refID1"
                                                    label="Refer Dr."
                                                    value={patientRegistrationData?.refID1}
                                                    options={allReferData}
                                                    onChange={handelOnChangePatientRegistration}
                                                    filterText="No records found"
                                                    placeholder=" "
                                                    searchWithName='doctorName'
                                                    uniqueKey='doctorId'
                                                    activeTheme={activeTheme}
                                                />
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


                                        <div className="relative flex-1">
                                            <CustomSearchInputFields
                                                id="refID2"
                                                name="refID2"
                                                label="Refer Dr2"
                                                value={patientRegistrationData?.refID2}
                                                options={allReferData}
                                                onChange={handelOnChangePatientRegistration}
                                                filterText="No records found"
                                                placeholder=" "
                                                searchWithName='doctorName'
                                                uniqueKey='doctorId'
                                                activeTheme={activeTheme}
                                            />
                                        </div>



                                        <div className="relative flex-1">
                                            <CustomTextBox
                                                // type="text", name, id, value, placeholder, onChange, label
                                                type='alphabetandcharWithSpace'
                                                name='address'
                                                value={patientRegistrationData?.address}
                                                placeholder=' '
                                                allowSpecialChars={true}
                                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                                label='Address'
                                            />
                                        </div>


                                        <div className='relative flex-1'>
                                            <CustomNumberInput
                                                type="pinCode"
                                                name="pinCode"
                                                value={patientRegistrationData?.pinCode || ''}
                                                onChange={(e) => {
                                                    handelOnChangePatientRegistration(e)
                                                }}
                                                maxLength={6}
                                                label="Pin Code"
                                            />
                                        </div>

                                        {/* Refer Lab/Hospital */}
                                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                            <div className="relative flex-1">
                                                <CustomSearchInputFields
                                                    id="refLabID"
                                                    name="refLabID"
                                                    label="Refer Lab/Hospital"
                                                    value={patientRegistrationData?.refLabID}
                                                    options={allLabReferData}
                                                    onChange={handelOnChangePatientRegistration}
                                                    filterText="No records found"
                                                    placeholder=" "
                                                    searchWithName='doctorName'
                                                    uniqueKey='doctorId'
                                                    activeTheme={activeTheme}
                                                />

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


                                        <div className="relative flex-1">
                                            <CustomFileUpload
                                                value={patientRegistrationData?.uploadDocument}
                                                handelImageChange={handelImageChange}
                                                activeTheme={activeTheme}
                                            />
                                        </div>

                                        <div className='flex gap-[0.25rem]'>
                                            <div className='relative flex-1'>
                                                <CustomFormButton
                                                    activeTheme={activeTheme}
                                                    text="Update"
                                                    icon={FaSpinner}
                                                    isButtonClick={isButtonClick}
                                                    loadingButtonNumber={3} // Unique number for the first button
                                                    onClick={() => onSubmitForSavePatientRegistrationData} // Pass button number to handler
                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                            </div>
                                        </div>

                                        {/* </div> */}

                                        {/* <CustomeNormalButton
                                            activeTheme={activeTheme}
                                            text="Open Popup"

                                            onClick={buttonClick}
                                        /> */}

                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                )
            }



            {
                showPopup === 3 && (
                    <div className="fixed inset-0 px-2 bg-black bg-opacity-50 z-50">
                        <div className="w-full   mt-10 bg-white rounded-lg shadow-2xl animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Edit Test

                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setShowPopup(0) }}
                                />
                            </div>

                            <div className=''>

                                <div
                                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                                    style={{ background: activeTheme?.blockColor }}
                                >
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-house" />
                                    </div>
                                    <div>Patient Test Details</div>
                                </div>

                                <form autoComplete='off'>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">

                                        <div className='flex gap-[0.25rem]'>
                                            <div className='relative flex-1'>
                                                <CustomNumberInput
                                                    type="phoneNumber"
                                                    name="mobileNo"
                                                    value={patientRegistrationData?.mobileNo || ''}
                                                    onChange={(e) => {
                                                        handelOnChangePatientRegistration(e)
                                                    }}
                                                    maxLength={10}
                                                    label="Mobile No."
                                                />
                                            </div>

                                            <div className='relative flex-1 mt-[1.9px]'>
                                                <CustomDropdown
                                                    name="title_id"
                                                    label="Select Title"
                                                    value={patientRegistrationData?.title_id}
                                                    options={[
                                                        { label: 'Select Option', value: 0, disabled: true },
                                                        ...allTitleData?.map(item => ({
                                                            label: item.title,
                                                            value: item.id,
                                                        })),
                                                    ]}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    defaultIndex={0}
                                                    activeTheme={activeTheme}
                                                    isMandatory={!Boolean(patientRegistrationData?.title_id)}
                                                />

                                            </div>
                                        </div>


                                        <div className='relative flex-1'>
                                            <CustomTextBox
                                                type="propercase"
                                                name="name"
                                                value={patientRegistrationData?.name || ''}
                                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                                label="Name"
                                                isMandatory={!Boolean(patientRegistrationData?.name)}
                                            />
                                        </div>


                                        <div className='flex gap-[0.25rem]'>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="days"
                                                    name="ageDays"
                                                    value={patientRegistrationData?.ageDays || ''}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    label="Days"
                                                    isDisabled={false}
                                                    maxLength={2}

                                                    isMandatory={!Boolean(patientRegistrationData?.ageDays)}

                                                />

                                            </div>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="months"
                                                    name="ageMonth"
                                                    value={patientRegistrationData?.ageMonth || ''}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    label="Months"
                                                    isDisabled={false}
                                                    maxLength={2}
                                                    allowSpecialChars={false}
                                                    isMandatory={!Boolean(patientRegistrationData?.ageMonth)}
                                                    decimalPrecision={4}
                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="years"
                                                    name="ageYear"
                                                    value={patientRegistrationData?.ageYear || ''}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    label="Years"
                                                    isDisabled={false}
                                                    maxLength={3}
                                                    allowSpecialChars={false}
                                                    isMandatory={!Boolean(patientRegistrationData?.ageYear)}
                                                    decimalPrecision={4}
                                                />
                                            </div>

                                        </div>


                                        <div className='flex gap-[0.25rem]'>

                                            <div className='relative flex-1'>
                                                <DatePicker
                                                    id="dob"
                                                    name="dob"
                                                    value={patientRegistrationData?.dob || ''}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    placeholder=" "
                                                    label="DOB"
                                                    activeTheme={activeTheme}
                                                    //isDisabled={false}
                                                    isMandatory={!Boolean(patientRegistrationData?.dob)}
                                                    currentDate={new Date()} // Current date: today
                                                    maxDate={new Date(2025, 11, 31)} // Maximum date: December 31, 2025

                                                    showTime={false}
                                                    showBigerCalandar={true}
                                                />
                                                {/* </div> */}

                                            </div>

                                            <div className='relative flex-1 mt-[1.9px]'>
                                                <CustomDropdown
                                                    name="gender"
                                                    label="Select Gender"
                                                    value={patientRegistrationData?.gender || ''}
                                                    options={[
                                                        { label: 'Select Option', value: '', disabled: true },
                                                        { label: 'Male', value: 'M' },
                                                        { label: 'Female', value: 'F' },
                                                        { label: 'Transgender', value: 'T' },
                                                    ]}
                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                    defaultIndex={0}
                                                    activeTheme={activeTheme}
                                                    isMandatory={false}
                                                />

                                            </div>
                                        </div>


                                        <div className="relative flex-1">
                                            <CustomEmailInput
                                                name="emailId"
                                                value={patientRegistrationData?.emailId}
                                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                                label="Email"
                                            />
                                        </div>

                                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                            <div className="relative flex-1">
                                                <CustomSearchInputFields
                                                    id="refID1"
                                                    name="refID1"
                                                    label="Refer Dr."
                                                    value={patientRegistrationData?.refID1}
                                                    options={allReferData}
                                                    onChange={handelOnChangePatientRegistration}
                                                    filterText="No records found"
                                                    placeholder=" "
                                                    searchWithName='doctorName'
                                                    uniqueKey='doctorId'
                                                    activeTheme={activeTheme}
                                                />
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


                                        <div className="relative flex-1">
                                            <CustomSearchInputFields
                                                id="refID2"
                                                name="refID2"
                                                label="Refer Dr2"
                                                value={patientRegistrationData?.refID2}
                                                options={allReferData}
                                                onChange={handelOnChangePatientRegistration}
                                                filterText="No records found"
                                                placeholder=" "
                                                searchWithName='doctorName'
                                                uniqueKey='doctorId'
                                                activeTheme={activeTheme}
                                            />
                                        </div>


                                        <div className='relative flex-1'>
                                            <DatePicker
                                                id="collectionDateAndTime"
                                                name="collectionDateAndTime"
                                                value={patientRegistrationData?.collectionDateAndTime || ''}
                                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                                placeholder=" "
                                                label="Collection Date & Time"
                                                activeTheme={activeTheme}
                                                //isDisabled={false}
                                                isMandatory={!Boolean(patientRegistrationData?.dob)}
                                                currentDate={new Date()} // Current date: today

                                                showTime={true}
                                                showBigerCalandar={false}
                                            />


                                        </div>


                                        <div className="relative flex-1">
                                            <CustomTextBox
                                                // type="text", name, id, value, placeholder, onChange, label
                                                type='alphabetandcharWithSpace'
                                                name='address'
                                                allowSpecialChars={true}
                                                value={patientRegistrationData?.address}
                                                placeholder=' '
                                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                                label='Address'
                                            />
                                        </div>


                                        <div className='relative flex-1'>
                                            <CustomNumberInput
                                                type="pinCode"
                                                name="pinCode"
                                                value={patientRegistrationData?.pinCode || ''}
                                                onChange={(e) => {
                                                    handelOnChangePatientRegistration(e)
                                                }}
                                                maxLength={6}
                                                label="Pin Code"
                                            />
                                        </div>

                                        {/* Refer Lab/Hospital */}
                                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                            <div className="relative flex-1">
                                                <CustomSearchInputFields
                                                    id="refLabID"
                                                    name="refLabID"
                                                    label="Refer Lab/Hospital"
                                                    value={patientRegistrationData?.refLabID}
                                                    options={allLabReferData}
                                                    onChange={handelOnChangePatientRegistration}
                                                    filterText="No records found"
                                                    placeholder=" "
                                                    searchWithName='doctorName'
                                                    uniqueKey='doctorId'
                                                    activeTheme={activeTheme}
                                                />

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


                                        <div className="relative flex-1">
                                            <CustomFileUpload
                                                value={patientRegistrationData?.uploadDocument}
                                                handelImageChange={handelImageChange}
                                                activeTheme={activeTheme}
                                            />
                                        </div>

                                        <div className="relative flex-1">

                                            <CustomSearchInputFields
                                                id="itemId"
                                                name="itemId"
                                                label="Test Search By Name Or Code"
                                                value={patientRegistrationData?.itemId}
                                                options={allInvastigationData}
                                                onChange={handelOnChangePatientRegistration}
                                                filterText="No records found"
                                                placeholder=" "
                                                searchWithName='itemName'
                                                uniqueKey='itemId'
                                                activeTheme={activeTheme}
                                            />

                                        </div>





                                        <div className='flex gap-[0.25rem]'>
                                            <div className='relative flex-1'>
                                                <CustomFormButton
                                                    activeTheme={activeTheme}
                                                    text="Update"
                                                    icon={FaSpinner}
                                                    isButtonClick={isButtonClick}
                                                    loadingButtonNumber={3} // Unique number for the first button
                                                    onClick={() => onSubmitForSavePatientRegistrationData} // Pass button number to handler
                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                            </div>
                                        </div>

                                        {/* </div> */}

                                        {/* <CustomeNormalButton
                                            activeTheme={activeTheme}
                                            text="Open Popup"

                                            onClick={buttonClick}
                                        /> */}

                                    </div>


                                    {/* grid data */}
                                    {
                                        investigationGridData?.length !== 0 && (
                                            // Table Container
                                            <div className="grid grid-cols-12 gap-2 mt-1 mb-1 mx-1 lg:mx-2">
                                                <div className="col-span-12">
                                                    <div className="max-h-[8.2rem] overflow-y-auto">
                                                        {/* Table */}
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
                                                                {/* Data Rows */}
                                                                {investigationGridData?.map((data, rowIndex) => (
                                                                    <tr
                                                                        key={rowIndex}
                                                                        className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                                                                            } `}
                                                                        onMouseEnter={() => setIsHoveredTable(rowIndex)}
                                                                        onMouseLeave={() => setIsHoveredTable(null)}

                                                                        style={{
                                                                            background:
                                                                                isHoveredTable === rowIndex ? activeTheme?.subMenuColor : undefined,
                                                                        }}
                                                                    >
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                            {data?.itemName}
                                                                        </td>

                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"

                                                                        >
                                                                            <FontAwesomeIcon icon="fas fa-info-circle"

                                                                            />
                                                                        </td>

                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                            {data?.mrp}
                                                                        </td>
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                            {data?.grosss}
                                                                        </td>
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor w-24">
                                                                            <input
                                                                                type="text"
                                                                                className="border-[1.5px] rounded outline-none px-1 w-full"
                                                                                value={
                                                                                    gridDataBarCodeandSampleType?.discount.find(
                                                                                        (item) => item.itemId === data?.itemId
                                                                                    )?.discount || ""
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleInputChange(data?.itemId, e.target.value, "1")
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                            {(
                                                                                (data?.netAmt || 0) -
                                                                                parseFloat(
                                                                                    gridDataBarCodeandSampleType?.discount.find(
                                                                                        (item) => item.itemId === data?.itemId
                                                                                    )?.discount || 0
                                                                                )
                                                                            ).toFixed(2)}
                                                                        </td>
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                            <select
                                                                                className="border rounded px-1 w-full outline-none"
                                                                                onChange={(e) =>
                                                                                    handleSampleTypeChange(e, rowIndex, data?.itemType)
                                                                                }
                                                                                defaultValue={0}
                                                                            >
                                                                                <option
                                                                                    value={0}
                                                                                    disabled
                                                                                    hidden
                                                                                    className="text-gray-400"
                                                                                >
                                                                                    Select Option
                                                                                </option>
                                                                                {data?.sampleTypeName?.map((item, index) => (
                                                                                    <option key={index} value={item}>
                                                                                        {item}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </td>
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                            <input
                                                                                type="text"
                                                                                className="border-[1.5px] rounded outline-none px-1 w-[6.2rem]"
                                                                                value={
                                                                                    gridDataBarCodeandSampleType?.barCode.find(
                                                                                        (item) => item.itemId === data?.itemId
                                                                                    )?.name || ""
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleInputChange(data?.itemId, e.target.value, "2")
                                                                                }
                                                                            />
                                                                        </td>
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                            {data?.deliveryDate}
                                                                        </td>
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor text-center pt-1">
                                                                            <input type="checkbox" id={`checkbox-${rowIndex}`} />
                                                                        </td>
                                                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                            <RiDeleteBin2Fill
                                                                                onClick={() => deleteinvestigationGridDataByItemId(rowIndex)}
                                                                                className="cursor-pointer text-red-500 text-base"
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                                {/* Footer Row */}
                                                                <tr
                                                                    style={{
                                                                        background: activeTheme?.menuColor,
                                                                        color: activeTheme?.iconColor,
                                                                    }}
                                                                >
                                                                    <td className="px-4 h-5 text-xxs font-semibold">
                                                                        Test Count: {investigationGridData?.length}
                                                                    </td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold">Total Amt.</td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold">
                                                                        {investigationGridData.reduce((sum, data) => sum + (data?.mrp || 0), 0)}
                                                                    </td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold">
                                                                        {investigationGridData.reduce(
                                                                            (sum, data) => sum + (data?.grosss || 0),
                                                                            0
                                                                        )}
                                                                    </td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold">
                                                                        {investigationGridData.reduce(
                                                                            (sum, data) =>
                                                                                sum +
                                                                                parseFloat(
                                                                                    gridDataBarCodeandSampleType?.discount.find(
                                                                                        (item) => item.itemId === data?.itemId
                                                                                    )?.discount || 0
                                                                                ),
                                                                            0
                                                                        )}
                                                                    </td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold">
                                                                        {patientRegistrationData?.grossAmount}
                                                                    </td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                </form>

                            </div>

                        </div>
                    </div>
                )
            }

            {
                showPopup === 4 && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-2 lg:mx-32 h-auto z-50 shadow-2xl bg-white rounded-lg  animate-slideDown pb-3">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Old Patient
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setShowPopup(0) }}
                                />
                            </div>

                            <div className=''>

                                <div
                                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                                    style={{ background: activeTheme?.blockColor }}
                                >
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-house" />
                                    </div>
                                    <div>Old Patient Info.</div>
                                </div>

                                <div className="grid grid-cols-12 gap-2 mt-[2px] mb-1 mx-1 lg:mx-2">
                                    <div className="col-span-12">
                                        <div className="max-h-[8.2rem] overflow-y-auto">
                                            {/* Table */}
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
                                                        {patientRegistrationoldPatient?.map((data, index) => (
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

                                                    {/* Data Rows */}
                                                    {dummyDataForpatientRegistrationoldPatient?.map((data, rowIndex) => (
                                                        <tr
                                                            key={rowIndex}
                                                            className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                                                                } `}

                                                            onMouseEnter={() => setIsHoveredTable(rowIndex)}
                                                            onMouseLeave={() => setIsHoveredTable(null)}


                                                            style={{
                                                                background:
                                                                    isHoveredTable === rowIndex ? activeTheme?.subMenuColor : undefined,
                                                            }}
                                                        >
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                Selected
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.PatientId}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.PatientName}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.age}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.Gender}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.Mobile}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.Email}
                                                            </td>


                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.RegDate}
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                )
            }


            {
                showPopup === 5 && (

                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-[30rem] mx-2 lg:mx-80 h-auto z-50 shadow-2xl bg-white rounded-lg  animate-slideDown ">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Test And Parameter Details
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setShowPopup(0) }}
                                />
                            </div>



                            <div>

                                <FormHeader headerData='Test Details' />

                                <div className="grid grid-cols-12 gap-2 mt-[2px] mb-1">
                                    <div className="col-span-12">
                                        <div className="max-h-64 overflow-y-auto">
                                            {/* Table */}
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

                                                        <td
                                                            className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                        >
                                                            Test Code
                                                        </td>

                                                        <td
                                                            className="border-b font-semibold border-gray-300 px-4 text-xxs"
                                                        >
                                                            Test Name
                                                        </td>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {/* Data Rows */}
                                                    {dummyDataForpatientRegistrationoldPatient?.map((data, rowIndex) => (
                                                        <tr
                                                            key={rowIndex}
                                                            className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                                                                } `}

                                                            onMouseEnter={() => setIsHoveredTable(rowIndex)}
                                                            onMouseLeave={() => setIsHoveredTable(null)}


                                                            style={{
                                                                background:
                                                                    isHoveredTable === rowIndex ? activeTheme?.subMenuColor : undefined,
                                                                width: rowIndex === 0 ? '20px' : ''
                                                            }}
                                                        >
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor w-[15%]">
                                                                Selected
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor w-[45%]">
                                                                {data?.PatientId} Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                            </td>



                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <PopupFooter />
                            </div>
                        </div>
                    </div>
                )
            }


            {
                showPopup === 6 && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-2 lg:mx-60 h-auto z-50 shadow-2xl bg-white rounded-lg  animate-slideDown">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    Sample Collection Details
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => { setShowPopup(0) }}
                                />
                            </div>

                            <div className=''>

                                <div
                                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                                    style={{ background: activeTheme?.blockColor }}
                                >
                                    <div>
                                        <FontAwesomeIcon icon="fa-solid fa-house" />
                                    </div>
                                    <div>Old Patient Info.</div>
                                </div>

                                <div className="grid grid-cols-12 gap-2 mt-[2px]  mx-1 mb-1 bg-white">
                                    <div className="col-span-12 bg-white">
                                        <div className="max-h-96 overflow-y-auto ">
                                            {/* Table */}
                                            <table className="table-auto border-collapse w-full text-xxs text-left ">
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
                                                        <td className="border-b font-semibold border-gray-300 px-4 text-xxs" style={{ width: "10%" }}>
                                                            Investigation
                                                        </td>

                                                        <td className="border-b font-semibold border-gray-300 px-4 text-xxs" style={{ width: "3%" }}>
                                                            Sample Type
                                                        </td>

                                                        <td className="border-b font-semibold border-gray-300 px-4 text-xxs" style={{ width: "3%" }}>
                                                            Barcode
                                                        </td>

                                                        <td className="border-b font-semibold border-gray-300 px-4 text-xxs" style={{ width: "3%" }}>
                                                            Not Coll.
                                                        </td>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {dummyDataForpatientRegistrationoldPatient?.map((data, rowIndex) => (
                                                        <tr
                                                            key={rowIndex}
                                                            className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"} `}
                                                            onMouseEnter={() => setIsHoveredTable(rowIndex)}
                                                            onMouseLeave={() => setIsHoveredTable(null)}
                                                            style={{
                                                                background: isHoveredTable === rowIndex ? activeTheme?.subMenuColor : undefined,
                                                            }}
                                                        >
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor " style={{ width: "10%" }}>
                                                                Selected
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor " style={{ width: "3%" }}>

                                                                <div className='relative'>
                                                                    <CustomDropdown
                                                                        name="title_id"
                                                                        label="Select Title"
                                                                        showLabel={false}
                                                                        value={patientRegistrationData?.title_id}
                                                                        options={[
                                                                            { label: 'Select Option', value: 0, disabled: true },
                                                                            ...allTitleData?.map(item => ({
                                                                                label: item.title,
                                                                                value: item.id,
                                                                            })),
                                                                        ]}
                                                                        onChange={(e) => handelOnChangePatientRegistration(e)}
                                                                        defaultIndex={0}
                                                                        activeTheme={activeTheme}
                                                                        isMandatory={!Boolean(patientRegistrationData?.title_id)}
                                                                    />
                                                                </div>

                                                                {/* <select name="" id="" className='w-full'>
                                                                    <option value="1">1</option>
                                                                    <option value="1">1</option>
                                                                    <option value="1">1</option>
                                                                    <option value="1">1</option>
                                                                </select> */}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "3%" }}>
                                                                <CustomTextBox
                                                                    type="barcode"
                                                                    name="address"
                                                                    maxLength={12}
                                                                    value={patientRegistrationData?.address}
                                                                    placeholder=" "
                                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                                    label="Barcode"
                                                                />
                                                            </td>


                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "3%" }}>
                                                                <input type="checkbox" name="" id="" />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mb-1 mx-1">
                                    <div className="relative flex-1"></div>
                                    <div className="relative flex-1"></div>
                                    <div className="relative flex-1"></div>
                                    <div className="relative flex-1 flex items-center gap-1 w-full rounded-md pl-2" style={{ background: activeTheme?.menuColor }}>
                                        <input type="checkbox" name="" id="" />
                                        <CustomeNormalButton activeTheme={activeTheme} text='Per same barcode' />
                                    </div>
                                    <div className="relative flex-1">
                                        <CustomeNormalButton activeTheme={activeTheme} text='Collect & Save' />
                                    </div>

                                    <div className="relative flex-1">
                                        <CustomeNormalButton activeTheme={activeTheme} text='Recive & Save' />
                                    </div>
                                </div>


                                <PopupFooter />
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )
}
