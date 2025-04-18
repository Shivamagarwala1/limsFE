import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { CiCalendarDate } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import UserCalendar from '../../../public/UserCalendar';
import useRippleEffect from '../../../customehook/useRippleEffect';
import { IoMdAdd, IoMdCloseCircleOutline } from 'react-icons/io';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { dummyDataForpatientRegistrationoldPatient, patientRegistrationInvestigation, patientRegistrationoldPatient, patientRegistrationPaymentMode, paymentModes } from '../../../listData/listData';
import { CustomEmailInput } from '../../../global/CustomEmailInput'
import { getAllBankNameApi, getAllCentreForPatientRegistrationData, getAllDicountReasionApi, getAllDiscountApprovedBy, getAllDisCountType, getAllEmpTitleApi, getAllInvestiGationApi, getAllInvestigationGridApi, getAllRateTypeForPatientRegistrationData, getAllReferDrApi, getAllReferLabApi, getOldPatientApi, getSingleEditInfoApi, getSingleEditTestApi, getSingleOldPatientDataInOldPatientPopupApi, printBarCodeData, savePatientRegistrationDataApi, saveReferDrApi, updateEditInfoApi, updateEditTestApi } from '../../../../service/service';
import { FaSearch, FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { CustomTextBox } from '../../../global/CustomTextBox';
import { CustomNumberInput } from '../../../global/CustomNumberInput';
import CustomDropdown from '../../../global/CustomDropdown';
import { DatePicker } from '../../../global/DatePicker';
import CustomFormButton from '../../../global/CustomFormButton'
import CustomFileUpload from '../../../global/CustomFileUpload';
import CustomMultiSelectDropdown from '../../../global/CustomMultiSelectDropdown'
import CustomSearchInputFields from '../../../global/CustomSearchDropdown';
import { useFormattedDate, useFormattedDateTime } from '../../../customehook/useDateTimeFormate';
import FormHeader from '../../../global/FormHeader';
import PopupFooter from '../../../global/PopupFooter';
import CustomeNormalButton from '../../../global/CustomeNormalButton';



export default function PatientRegistration() {

    const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);

    useRippleEffect();

    const [isHoveredTable, setIsHoveredTable] = useState(null);
    //const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [showCalander, setShowCalander] = useState(false);
    // const [showCalanderAndTime, setShowCalanderAndTime] = useState(false);
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

        collectionDateAndTime: '',

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

        balnceAmt: '',

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
        editTestId: '',
        oldPatientId: ''
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

    const [editInfoData, seteditInfoData] = useState(null);
    const [editTestData, setEditTestData] = useState(null);
    const [oldPatientId, setOLdPatientId] = useState([]);
    const [patientWiseBarcode, setPatientWiseBarcode] = useState(false)

    const [allEditTestDataForInvasticationName, setallEditTestDataForInvasticationName] = useState([]);

    const [gridDataBarCodeandSampleType, setGridDataBarCodeandSampleType] = useState({
        barCode: [],
        sampleType: [],
        discount: []
    });

    const [patientRegistrationDataError, setPatientRegistrationDataError] = useState([]);
    const [patientRegistrationForEditInfoDataError, setPatientRegistrationForEditInfoDataError] = useState([]);
    const [patientRegistrationForEditTestDataError, setPatientRegistrationForEditTestDataError] = useState([]);

    const [selectCurrencyValue, setSelectCurrencyValue] = useState('1');

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
    //const imgRef = useRef();
    const [isPreprintedCode, setIsPrePrintedCode] = useState(10);

    // const openShowSearchBarDropDown = (val) => {
    //     setShowSearchBarDropDown(val);
    // }

    // const closeDropdown = () => setShowSearchBarDropDown(0);
    // const dropdownRef = useOutsideClick(closeDropdown); // Use the custom hook


    //search data
    const handelOnChangeSearchData = (event) => {
        setSearchData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


    const handelOnChangeSelectCurrencyValue = (e) => {
        setSelectCurrencyValue(e.target.value);
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

        //check if years is grater then 150 
        if (years > 150) {
            toast.error('150 exceeds professional age limit.');
            setPatientRegistrationData((preventData) => ({
                ...preventData,
                ageMonth: 0
            }))
            return;
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

        //calculate the total net amt
        // const totaNetAmt = investigationGridData
        //     ? investigationGridData.reduce((sum, data) => sum + (parseInt(data?.netAmt) || 0), 0)
        //     : 0;

        // console.log(totaNetAmt);
        // 

        if (totalPaid > patientRegistrationData?.grossAmount) {
            toast.error('Paid amount cannot exceed the total amount.');
            setPatientRegistrationData((preventData) => ({
                ...preventData,
                balnceAmt: 0,
                paidAmount: 0
            }))
            return;
        }
        // Update paidAmount in state, ensuring it's a double (two decimal places)
        setPatientRegistrationData((prevData) => ({
            ...prevData,
            paidAmount: parseFloat(totalPaid.toFixed(2)), // Ensures double value with 2 decimals
            balnceAmt: patientRegistrationData?.grossAmount - patientRegistrationData?.cashAmt - patientRegistrationData?.creditCardAmt - patientRegistrationData?.onlinewalletAmt
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
    }, [patientRegistrationData?.discountAmmount]);

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



    // const handleDateAndTimeClick = (date) => {
    //     // Format the date
    //     const formatDate = (date) => {
    //         const options = { day: '2-digit', month: 'short', year: 'numeric' };
    //         return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    //     };

    //     // Format the time
    //     const formatTime = (date) => {
    //         let hours = date.getHours();
    //         const minutes = date.getMinutes().toString().padStart(2, '0');
    //         const period = hours >= 12 ? 'PM' : 'AM';
    //         hours = hours % 12 || 12; // Convert to 12-hour format, ensuring "12" is displayed for noon and midnight
    //         return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
    //     };

    //     // Get formatted date and time
    //     const formattedDate = formatDate(date);
    //     const formattedTime = formatTime(date);

    //     // Combine date and time
    //     const collectionDateAndTime = `${formattedDate} ${formattedTime}`;

    //     // Update patient registration data
    //     setPatientRegistrationData((prevData) => ({
    //         ...prevData,
    //         collectionDateAndTime, // Set formatted date and time in state
    //     }));

    //     //setShowCalanderAndTime(false);
    // };

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


    // const handelClickImage = () => {
    //     if (imgRef.current) {
    //         imgRef.current.click();
    //     }
    // };

    const handelOnChangePatientRegistration = (event) => {

        setPatientRegistrationData((preventData) => ({
            ...preventData,
            [event?.target?.name]: event?.target?.value
        }))
    }



    const handleCheckboxChange = (index, isChecked) => {

        setinvestigationGridData((prevData) =>
            prevData.map((item, idx) =>
                idx === index ? { ...item, isUrgent: isChecked ? 1 : 0 } : item
            )
        );

    };


    //editTestData?.testData
    const handleCheckboxChangeEditTestCheckBo = (index, isChecked) => {

        setEditTestData((prevData) => {

            // Ensure prevData.testData exists and is an array
            const updatedTestData = Array.isArray(prevData?.testData)
                ? prevData.testData.map((item, idx) =>
                    idx === index ? { ...item, isUrgent: isChecked ? 1 : 0 } : item
                )
                : [];

            return {
                ...prevData, // Keep other properties intact
                testData: updatedTestData,
            };
            // });

        });

    };




    const handelOnChangePaymentMode = (updatedSelectedItems) => {
        setPaymentModeType(updatedSelectedItems);
    };



    useEffect(() => {

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
        const getAllCentreData = async () => {
            try {
                const response = await getAllCentreForPatientRegistrationData(user?.employeeId || 0, patientRegistrationData?.billingType || 0);

                if (response?.success) {
                    setAllCentreData(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }

        if (patientRegistrationData?.billingType !== '') {
            getAllCentreData();
        }

    }, [patientRegistrationData?.billingType])


    useEffect(() => {

        const getData = () => {
            const foundData = allCentreData?.find(data => data?.centreId === patientRegistrationData?.centreId?.centreId);
            console.log(foundData);


            setIsPrePrintedCode(foundData?.isPrePrintedBarcode || 10);
            setPatientWiseBarcode(foundData?.barcodeType === 0 ? true : false || false)
        };
        if (patientRegistrationData?.centreId !== 0) {
            getData()
        }
    }, [patientRegistrationData?.centreId])


    useEffect(() => {
        const getAllRateType = async () => {

            try {
                const response = await getAllRateTypeForPatientRegistrationData(patientRegistrationData?.centreId || 0);

                if (response?.success) {
                    setAllRateType(response?.data);
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }

        if (patientRegistrationData?.centreId !== 0) {
            getAllRateType();
        }
    }, [patientRegistrationData?.centreId])


    useEffect(() => {

        const getAllInvastigationData = async () => {

            try {
                const response = await getAllInvestiGationApi(patientRegistrationData?.rateId?.id || 0);

                if (response?.success) {
                    setAllInvastigationData(response?.data);
                } else {
                    toast.error(response?.message);
                }
            } catch (error) {
                toast.error(error?.message);
            }

        }

        if (patientRegistrationData?.rateId !== 0) {
            getAllInvastigationData();

        }


        const getAllinvestigationGridData = async () => {

            try {
                const response = await getAllInvestigationGridApi(
                    patientRegistrationData?.rateId?.id || 0,
                    patientRegistrationData?.itemId?.itemId || 0
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


                        //find out the test name is exit or not
                        let isDuplicateData = investigationGridData?.some((item) => item?.itemId === result?.itemId);


                        if (isDuplicateData) {
                            toast.info("Item already selected. Choose another.")
                            return;
                        }

                        // Use a functional update for setState to check for duplicates
                        setinvestigationGridData((prevData) => {

                            const updateedData = {
                                ...result,
                                discount: (result?.netAmt - patientRegistrationData?.discountPercentage) / 100 || 0
                            }

                            return [...prevData, updateedData];
                        });


                        //===============need to check for discount ===================
                        // setinvestigationGridData((prevData) => {
                        //     const isDuplicate = prevData.some((item) => item.itemId === result.itemId);

                        //     if (isDuplicate) {
                        //         return prevData; // No changes if duplicate
                        //     }

                        //     // Add new result to investigationGridData
                        //     const updatedData = [...prevData, result];

                        //     // Also update gridDataBarCodeandSampleType
                        //     setGridDataBarCodeandSampleType((prevState) => {
                        //         const isDiscountDuplicate = prevState.discount.some((item) => item.itemId === result.itemId);

                        //         if (!isDiscountDuplicate) {
                        //             return {
                        //                 ...prevState,
                        //                 discount: [...prevState.discount, { itemId: result.itemId, discount: result.discount }]
                        //             };
                        //         }

                        //         return prevState;
                        //     });

                        //     return updatedData;
                        // });



                    }
                }

            } catch (error) {
                toast.error(error?.message);
            }


        }
        if (patientRegistrationData?.rateId !== 0 && patientRegistrationData?.itemId !== 0) {
            getAllinvestigationGridData();

        }

    }, [patientRegistrationData?.rateId, patientRegistrationData?.itemId])





    // Function to delete data by itemId
    const deleteinvestigationGridDataByItemId = (indexToDelete) => {

        const updatedData = [...investigationGridData]; // Create a copy of the array to avoid mutating the original
        updatedData.splice(indexToDelete, 1); // Remove the item at the specified index
        setinvestigationGridData(updatedData)

    };

    //
    const deleteinvestigationGridDataByForEditTestDataUsingItemId = (indexToDelete) => {

        const updatedData = [...editTestData?.testData]; // Create a copy of the array to avoid mutating the original
        //updatedData.splice(indexToDelete, 1); // Remove the item at the specified index


        // Check if the item exists at the specified index
        if (updatedData[indexToDelete]) {
            updatedData[indexToDelete] = {
                ...updatedData[indexToDelete],
                isRemoveItem: updatedData[indexToDelete]?.isRemoveItem === 1 ? 0 : 1 // Set isRemoveItem to 1
            };
        }

        setEditTestData((prevData) => ({
            ...prevData,
            testData: updatedData
        }));


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
                    .toISOString()
                    .replace('T', ' ')
                    .split('.')[0], // Outputs: "2025-02-28 15:57:11"

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

                setPatientRegistrationData((preventData) => ({
                    ...preventData,
                    refID1: response[0]
                }))
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

    const [changePartiCularDiscount, setChangeParticularDiscount] = useState(0);


    // Copy `investigationGridData?.discount` initially
    useEffect(() => {
        if (investigationGridData?.discount?.length) {
            setGridDataBarCodeandSampleType({ discount: [...investigationGridData.discount] });
        }

    }, [investigationGridData?.discount]);

    //handel on chenge grid data
    const handleInputChange = (rowId, value, inputFields) => {
        setChangeParticularDiscount(1);

        setGridDataBarCodeandSampleType((prevState) => {
            if (inputFields === '1') {
                // Ensure value is a valid number
                const discountValue = isNaN(value) || value === "" ? 0 : Number(value);

                // Update existing item or add new one
                const updatedDiscount = prevState.discount.map((item) =>
                    item.itemId === rowId ? { ...item, discount: discountValue } : item
                );

                // If item does not exist, add it
                const isRowPresent = prevState.discount.some(item => item.itemId === rowId);
                if (!isRowPresent) {
                    updatedDiscount.push({ itemId: rowId, discount: discountValue });
                }

                return { discount: updatedDiscount };
            } else {
                // Preserve barCode values while updating only the changed row
                const updatedBarCode = prevState.barCode.map(item =>
                    item.itemId === rowId ? { ...item, name: value } : item
                );

                const isBarCodePresent = prevState.barCode.some(item => item.itemId === rowId);
                if (!isBarCodePresent) {
                    updatedBarCode.push({ itemId: rowId, name: value });
                }

                return { ...prevState, barCode: updatedBarCode };
            }
        });

        if (inputFields === '1') {
            setinvestigationGridData((prevData) =>
                prevData.map((item) =>
                    item.itemId === rowId
                        ? { ...item, discount: value }
                        : item
                )
            );
        }
    };

    useEffect(() => {
        setinvestigationGridData((prevData) =>
            prevData.map((item) => ({
                ...item,
                discount: (item?.grosss * patientRegistrationData?.discountPercentage) / 100, // Ensuring a default value
            }))
        );

    }, [patientRegistrationData?.discountAmmount]);



    const handleSampleTypeChange = (event, index, itemId) => {
        const selectedOption = event.target.value;


        // Create the updated sample type object based on the selected option
        const updatedSampleType = {
            // Get the id based on selected option
            name: selectedOption,  // The name is the selected value
            id: itemId      // Assuming itemType comes from props or state
        };

        setGridDataBarCodeandSampleType((prevState) => {
            // Check if the updatedSampleType.id already exists in the sampleType array
            const existingSampleTypeIndex = prevState.sampleType.findIndex(item => item.id === updatedSampleType.id);

            if (existingSampleTypeIndex !== -1) {
                // If the id exists, update the sampleTypeName for that item
                const updatedSampleTypes = prevState.sampleType.map((item, idx) =>
                    idx === existingSampleTypeIndex ? { ...item, name: selectedOption } : item
                );

                return {
                    ...prevState,
                    sampleType: updatedSampleTypes,
                };
            } else {
                // If the id does not exist, push the new sampleType
                return {
                    ...prevState,
                    sampleType: [...prevState.sampleType, updatedSampleType],
                };
            }
        });
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
        if (!patientRegistrationData.refID1) errors.refID1 = true


        if (!patientRegistrationData?.mobileNo || !/^\d{10}$/.test(patientRegistrationData?.mobileNo)) {
            errors.mobileNo = true;
        }

        if (!patientRegistrationData.gender) errors.gender = true;
        //if (!patientRegistrationData.investigationName) errors.investigationName = true;


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
                    if (!patientRegistrationData.bank_Id) {
                        errors.bank_Id = true;
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

        // if (patientRegistrationData?.billingType !== 1) {
        //     if (!patientRegistrationData.discountAmmount) errors.discountAmmount = true;
        //     if (!patientRegistrationData.discountPercentage) errors.discountPercentage = true;
        // }

        if (patientRegistrationData?.discountPercentage !== 0) {

            if (!patientRegistrationData.discountid) errors.discountid = true;
            if (!patientRegistrationData.discountApproved) errors.discountApproved = true;

            if (!patientRegistrationData.discountAmmount) errors.discountAmmount = true;
            if (!patientRegistrationData.discountType) errors.discountType = true;

        }


        // Update state with errors
        setPatientRegistrationDataError(errors);
        //console.log(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {

        if (!validateForm()) {
            setIsButtonClick(0);
        }
    }, [patientRegistrationData, paymentModeType]);


    //cheack bar code data which showPopup===6
    const [checkedItems, setCheckedItems] = useState({});
    const [barcodeValues, setBarcodeValues] = useState({});

    // Function to handle checkbox toggle
    const handleCheckboxChange123 = (itemId) => {
        setCheckedItems((prev) => ({
            ...prev,
            [itemId]: !prev[itemId], // Toggle checkbox state manually
        }));
    };

    // Function to handle barcode input change
    // const handleInputChangeForPopUpGridData = (rowId, value) => {

    //     setGridDataBarCodeandSampleType((prevState) => {

    //         console.log(prevState);


    //         // Preserve barCode values while updating only the changed row
    //         const updatedBarCode = prevState.barCode.map(item =>
    //             item.itemId === rowId ? { ...item, name: value } : item
    //         );

    //         const isBarCodePresent = prevState.barCode.some(item => item.itemId === rowId);
    //         if (!isBarCodePresent) {
    //             updatedBarCode.push({ itemId: rowId, name: value });
    //         }

    //         console.log(updatedBarCode);


    //         return { ...prevState, barCode: updatedBarCode };

    //     });

    //     console.log(gridDataBarCodeandSampleType);

    //     // Automatically check if there's a barcode entered
    // setCheckedItems((prev) => ({
    //     ...prev,
    //     [itemId]: value.length > 0, // Check if barcode is not empty
    // }));
    // };

    //function for det the default value of sample type


    useEffect(() => {

        const storeSampleTypeDefaultValue = () => {
            // Transform investigationGridData to extract itemId and the first sampleTypeName
            const transformedItems = investigationGridData.map(item => ({
                id: item.itemId,
                name: item.sampleTypeName[0] || '', // Access the first element of the array, fallback to empty string if the array is empty
                itemName: item?.itemName
            }));

            const transBarcodeItems = investigationGridData.map(item => ({
                itemId: item.itemId,
                name: '', // Access the first element of the array, fallback to empty string if the array is empty
                sampleTypeName: item.sampleTypeName[0]
            }));

            // Update the state with the transformed sampleType values
            setGridDataBarCodeandSampleType((prevState) => ({
                ...prevState,
                sampleType: transformedItems,
                barCode: transBarcodeItems
            }));



        }

        // Only run this logic when showPopup equals 6
        if (showPopup === 6) {
            storeSampleTypeDefaultValue();
        }

    }, [showPopup]); // Runs when showPopup changes


    // console.log(gridDataBarCodeandSampleType);


    //func  to handel barcode input change
    const handleInputChangeForPopUpGridData = (rowId, value) => {
        //console.log(gridDataBarCodeandSampleType.barCode);

        setGridDataBarCodeandSampleType((prevState) => {
            // Get the sampleTypeName of the current row being updated
            const currentSampleTypeName = prevState.barCode?.find(
                (item) => item.itemId === rowId
            )?.sampleTypeName;

            // Update barCode values based on condition
            const updatedBarCode = prevState.barCode.map((item) => {
                if (patientWiseBarcode) {
                    // If patientWiseBarcode is true, update all name values
                    return { ...item, name: value };
                } else {
                    // Otherwise, update only matching sampleTypeName
                    return item.sampleTypeName === currentSampleTypeName
                        ? { ...item, name: value }
                        : item;
                }
            });

            return { ...prevState, barCode: updatedBarCode };
        });

        // Optional: Update checkedItems if needed
        setCheckedItems((prev) => ({
            ...prev,
            [rowId]: value.length > 0, // Check if barcode is not empty
        }));
    };











    //console.log(gridDataBarCodeandSampleType?.barCode);
    //!========================in the bellow code there may be chance of getting some issue if i we provied discount for each item =====================
    // Auto-check the checkbox if a barcode exists initially
    useEffect(() => {
        const updatedCheckedItems = {};
        const updatedBarcodeValues = {};

        investigationGridData?.forEach((data) => {
            const barcodeValue = gridDataBarCodeandSampleType?.barCode.find(
                (item) => item.itemId === data?.itemId
            )?.name;

            if (barcodeValue) {
                updatedCheckedItems[data?.itemId] = true; // Auto-check if barcode exists
                updatedBarcodeValues[data?.itemId] = barcodeValue; // Store initial barcode value
            }
        });

        setCheckedItems(updatedCheckedItems);
        setBarcodeValues(updatedBarcodeValues);
    }, [gridDataBarCodeandSampleType?.barCode]);

    //handel code for PatientWiseBarcode
    const handelToUpdatePatientWiseBarcode = () => {

        setPatientWiseBarcode((preventData) => !preventData)

        const firstBarCodeName = gridDataBarCodeandSampleType?.barCode[0]?.name

        if (!patientWiseBarcode) {

            const updatedBarCodes = gridDataBarCodeandSampleType?.barCode?.map((item) => ({
                ...item, // Spread the existing item properties
                name: firstBarCodeName // Assign firstBarCodeName to the 'name' property
            }));

            setGridDataBarCodeandSampleType((preventData) => ({
                ...preventData,
                barCode: updatedBarCodes
            }))

        }

    }





    //save patient registration data
    const onSubmitForSavePatientRegistrationData = async (val) => {

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
            centreId: parseInt(patientRegistrationData?.centreId?.centreId),
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
                    clientCode: patientRegistrationData?.centreId?.centreId,
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
                    // discount: investigationGridData?.reduce((sum, item) => sum + (item.discount || 0), 0),
                    discount: patientRegistrationData?.discountAmmount,
                    netAmount: investigationGridData?.reduce((sum, item) => sum + (item.netAmt || 0), 0),
                    paidAmount: patientRegistrationData?.paidAmount,
                    sessionCentreid: parseInt(user?.defaultCenter),
                    centreId: parseInt(patientRegistrationData?.centreId?.centreId),
                    rateId: parseInt(patientRegistrationData?.rateId?.id),
                    isCredit: patientRegistrationData?.paymentMode === "Cash" ? 0 : 1,
                    paymentMode: allCentreData?.find((data) => data?.centreId === patientRegistrationData?.centreId?.centreId)?.paymentMode,
                    source: '',
                    discountType: parseInt(patientRegistrationData?.discountType),
                    discountid: parseInt(patientRegistrationData?.discountid),
                    discountReason: patientRegistrationSelectData?.discountid, //need to check
                    discountApproved: parseInt(patientRegistrationData?.discountApproved),
                    isDisCountApproved: 0,
                    patientRemarks: '',
                    labRemarks: '',
                    otherLabRefer: patientRegistrationData?.refLab?.doctorName,
                    otherLabReferID: patientRegistrationData?.refLabID?.doctorId,
                    refDoctor1: allReferData.filter((data) => data?.doctorId === patientRegistrationData?.refID1?.doctorId)[0]?.doctorName, //need to filter the data baed on refId1
                    refID1: patientRegistrationData?.refID1?.doctorId,

                    refDoctor2: allReferData.filter((data) => data?.doctorId === patientRegistrationData?.refID2?.doctorId)[0]?.doctorName, //need to filter the data baed on refId2
                    refID2: patientRegistrationData?.refID2?.doctorId,
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
                            centreId: parseInt(patientRegistrationData?.centreId?.centreId),
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
                        investigationName: investigationGridData?.find(barcode => barcode.itemId === data.itemId)?.itemName || '',
                        isPackage: data?.itemType === 3 ? 1 : 0,
                        packageName: data?.itemType === 3 ? investigationGridData?.find(barcode => barcode.itemId === data.itemId)?.itemName : '',
                        itemType: data?.itemType,

                        mrp: data?.mrp,
                        rate: data?.grosss,
                        discount: data?.discount,
                        //discount: patientRegistrationData?.discountAmmount,

                        netAmount: data?.netAmt - data?.discount,

                        packMrp: data?.itemType === 3 ? data?.mrp : 0,
                        packItemRate: data?.grosss === 3 ? data?.grosss : 0,
                        packItemDiscount: data?.itemType === 3 ? data?.netAmt - data?.discount : 0,
                        // packItemDiscount: data?.itemType === 3 ? patientRegistrationData?.discountAmmount : 0,
                        packItemNet: data?.itemType === 3 ? data?.netAmt : 0,
                        reportType: 0,

                        centreId: parseInt(patientRegistrationData?.centreId?.centreId), //
                        sessionCentreid: parseInt(user?.defaultCenter),
                        isSra: 0,
                        isMachineOrder: 0,
                        isEmailsent: 0,
                        sampleTypeId: gridDataBarCodeandSampleType?.sampleType?.find(barcode => barcode.id === data.itemId) ? gridDataBarCodeandSampleType?.sampleType?.find(barcode => barcode.id === data.itemId).id : 0,
                        sampleTypeName: gridDataBarCodeandSampleType?.sampleType?.length !== 0 ? gridDataBarCodeandSampleType?.sampleType?.find(barcode => barcode.id === data.itemId)?.name : data?.sampleTypeName[0],

                        "sampleCollectionDate": patientRegistrationData?.collectionDateAndTime || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),

                        "sampleCollectedby": user?.name,
                        "sampleCollectedID": parseInt(user?.employeeId),
                        "sampleReceiveDate": val === 2 ? new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`) : '',
                        "sampleReceivedBY": val === 2 ? user?.name : '',
                        "resultDate": "2025-03-03T04:27:32.292Z",
                        "resultDoneByID": 0,
                        "resutDoneBy": '',
                        "isResultDone": 0,
                        "isApproved": 0,
                        "approvedDate": "2025-03-03T04:27:32.292Z",
                        "approvedByID": 0,
                        "approvedbyName": '',
                        "notApprovedBy": '',
                        "notApprovedDate": "2025-03-03T04:27:32.292Z",
                        "isReporting": 0,
                        "isCritical": 0,
                        "deliveryDate": "2025-03-03T04:27:32.292Z",
                        "isInvoiceCreated": 0,
                        "invoiceNumber": 0,
                        "isUrgent": 0,
                        "isSampleCollected": val === 1 ? checkedItems[data?.itemId] ? 'S' : 'N' : checkedItems[data?.itemId] ? 'Y' : 'N',
                        "samplecollectionremarks": '',
                        "departmentReceiveRemarks": '',
                        "departmentReceiveDate": "2025-03-03T04:27:32.292Z",
                        "departmentReceiveBy": '',
                        "departmentReceiveByID": 0,
                        "isRemoveItem": 0,
                        "sampleRejectionBy": 0,
                        "sampleRejectionByName": '',
                        "sampleRejectionOn": "2025-03-03T04:27:32.292Z",
                        "interpretationId": 0,
                        "approvalDoctor": 0,
                        "isOuthouse": 0,
                        "outhouseLab": 0,
                        "labName": '',
                        "outhouseDoneBy": 0,
                        "outhouseDoneOn": "2025-03-03T04:27:32.292Z",
                        "sampleRecollectedby": 0,
                        "sampleRecollectedDate": "2025-03-03T04:27:32.292Z",
                        "isrerun": 0,
                        "invoiceNo": '',
                        "invoiceDate": "2025-03-03T04:27:32.292Z",
                        "invoiceCycle": '',
                        "invoiceAmount": 0,
                        "invoiceCreatedBy": 0,
                        "invoiceNoOld": '',
                        "remarks": '',
                        "showonReportdate": "2025-03-03T04:27:32.292Z",
                        "hold": 0,
                        "holdById": 0,
                        "holdDate": "2025-03-03T04:27:32.292Z",
                        "unholdById": 0,
                        "unHoldDate": "2025-03-03T04:27:32.292Z",
                        "doctorSignId": 0,
                        "holdReason": '',
                        "rejectedReason": ''

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
                        bankName: data?.value === '2' ? allBankNameData.filter((data) => data?.id === patientRegistrationData?.bank_Id)[0]?.bankName : '',//need to find bank name from allbankdata isequal to patientRegistrationData?.bank_Id
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
                        bookingCentreId: parseInt(patientRegistrationData?.centreId?.centreId),
                        settlementCentreID: 0,
                        receivedBy: user?.name,
                        receivedID: parseInt(user?.employeeId)
                    }))

                }
            ]
        };

        //Validate form before submitting
        if (!validateForm()) {
            toast.info("Please fill in all mandatory fields.");
            setIsButtonClick(0);
            return;
        }

        try {
            const response = await savePatientRegistrationDataApi(updatedData);

            if (response?.success) {
                toast.success(response?.message);

                try {
                    const response2 = await printBarCodeData(response?.data?.barcodeNo);
                    if (response2.success) {

                        // const encodedData = encodeURIComponent(response2?.data);
                        // // Get base URL dynamically
                        // const baseUrl = window.location.origin;

                        // // Construct barcode URL with base URL
                        // const barcodeUrl = `${baseUrl}/barcode?cmd=${encodedData}`;

                        // // Open in a new tab
                        // window.open(barcodeUrl, '_blank'); 

                        const data = response2?.data;
                        const blob = new Blob([data], { type: "text/plain" });

                        // Create a Blob URL
                        const blobUrl = URL.createObjectURL(blob);

                        // Open the Blob URL in a new tab to show the text
                        window.open(blobUrl);


                    } else {
                        toast.error(error?.message);
                    }
                } catch (error) {
                    toast.error(error?.message);
                    console.log(error);

                }

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

                // setPatientRegistrationData({
                //     billingType: '',

                //     centreId: 0,
                //     paymentMode: '',
                //     paymentModeId: 0,
                //     rateId: 0,
                //     mobileNo: '',
                //     title_id: 0,
                //     name: '',
                //     ageDays: 0,
                //     ageMonth: 0,
                //     ageYear: 0,
                //     dob: useFormattedDate(),
                //     gender: '',
                //     emailId: '',

                //     collectionDateAndTime: useFormattedDateTime(),

                //     investigationName: '',
                //     itemId: 0,
                //     refDoctor1: '',
                //     refID1: 0,
                //     refDoctor2: '',
                //     refID2: 0,
                //     address: '',
                //     pinCode: 0,
                //     uploadDocument: '',
                //     refLabID: 0,
                //     refLab: '',



                //     paidAmount: 0,
                //     cashAmt: 0,
                //     creditCardAmt: 0,
                //     lastFoureDigit: 0,
                //     bankName: '',
                //     onlinewalletAmt: 0,

                //     grossAmount: 0,

                //     balnceAmt: '',

                //     bank_Id: 0,
                //     discountAmmount: 0,
                //     discountPercentage: 0,
                //     discountType: 0,
                //     discountid: 0,
                //     discountApproved: 0,
                // })

                setShowPopup(0);
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

    //edit info
    const handelOnClickEditInfoData = async () => {
        try {
            const response = await getSingleEditInfoApi(searchData?.editInfoId);

            if (response?.success) {

                const matchedDoctor1 = allReferData?.find((data) => data?.doctorId === response?.data?.refID1);

                const matchedDoctor2 = allReferData?.find((data) => data?.doctorId === response?.data?.refID2);

                const matchedLab = allLabReferData?.find((data) => data?.doctorId === response?.data?.otherLabReferID);


                seteditInfoData({
                    ...response?.data,
                    dob: new Date(response?.data?.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(" ", "-"),
                    refID1: matchedDoctor1
                        ? { doctorId: matchedDoctor1?.doctorId, doctorName: matchedDoctor1?.doctorName }
                        : null, // If no match, set to null
                    refID2: matchedDoctor2
                        ? { doctorId: matchedDoctor2?.doctorId, doctorName: matchedDoctor2?.doctorName }
                        : null,
                    otherLabReferID: matchedLab
                        ? { otherLabReferID: matchedLab?.doctorId, otherLabRefer: matchedLab?.doctorName }
                        : null
                });

                setShowPopup(2);

            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            if (error.status === 400) {
                toast.error('Please enter edit info data')
            } else {
                toast.error(error?.message);
            }

        }
    };


    const handelOnChangeEditInfo = (e) => {
        seteditInfoData((preventData) => ({
            ...preventData,
            [e.target.name]: e.target.value
        }))
    }


    const handelImageChangeForEditInfo = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileType = file.type;

            // Handle image files
            if (fileType.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    seteditInfoData((prevData) => ({
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
                    seteditInfoData((prevData) => ({
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


    //calculate date of birth
    const calculateDOBForEditInfo = (ageDay, ageMonth, ageYear) => {

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
        seteditInfoData((prevData) => {
            const newDOB = formattedDOB.replace(/ /g, '-');
            if (prevData.dob !== newDOB) {
                return { ...prevData, dob: newDOB };
            }
            return prevData;
        });
    };


    // Function to calculate age based on DOB
    const calculateAgeForEditInfo = (dob) => {
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

        //check if years is grater then 150 
        if (years > 150) {
            toast.error('150 exceeds professional age limit.');
            setPatientRegistrationData((preventData) => ({
                ...preventData,
                ageMonth: 0
            }))
            return;
        }

        // Ensure months and years are zero if there is no difference
        if (years < 0) years = 0; // Handle edge cases where dob is in the future
        if (months < 0) months = 0;

        // Update age only if it changes
        seteditInfoData((prevData) => {
            if (
                prevData.ageYear !== years ||
                prevData.ageMonth !== months ||
                prevData.ageDay !== days
            ) {
                // Construct the updated data
                const updatedData = {
                    ...prevData,
                    ageYear: years || "0",
                    ageMonth: months || "0",
                    ageDay: days || "0",
                };


                // Return the updated data
                return updatedData;
            }
            // Return the unchanged data
            return prevData;
        });

    };


    const [isUpdating, setIsUpdating] = useState(false);

    // Recalculate DOB if age fields change
    useEffect(() => {
        if (!isUpdating && (editInfoData?.ageYear || editInfoData?.ageMonth || editInfoData?.ageDay)) {
            setIsUpdating(true); // Prevent loop
            calculateDOBForEditInfo(
                editInfoData?.ageDay,
                editInfoData?.ageMonth,
                editInfoData?.ageYear
            );
        }
    }, [editInfoData?.ageDay, editInfoData?.ageMonth, editInfoData?.ageYear]);

    // Recalculate age if DOB changes
    useEffect(() => {
        if (isUpdating) {
            setIsUpdating(false); // Allow updates again
        } else if (editInfoData?.dob) {
            setIsUpdating(true);
            calculateAgeForEditInfo(editInfoData?.dob);
        }
    }, [editInfoData?.dob]);



    //validations
    const validateFormForEditInfo = () => {

        const errors = {};



        // Check for  fields
        if (!editInfoData?.mobileNo) errors.mobileNo = true;



        if (!editInfoData?.title_id) errors.title_id = true;
        if (!editInfoData?.name) errors.name = true;

        if (!editInfoData?.ageDay) errors.ageDay = true;
        if (!editInfoData?.ageMonth) errors.ageMonth = true;
        if (!editInfoData?.ageYear) errors.ageYear = true;
        if (!editInfoData?.dob) errors.dob = true;

        if (!editInfoData?.gender) errors.gender = true;
        if (!editInfoData?.emailId) errors.emailId = true;

        //sampleTypeName filed required

        if (!editInfoData?.refID1) errors.refID1 = true;
        if (!editInfoData?.refID2) errors.refID2 = true;
        if (!editInfoData?.address) errors.address = true;
        if (!editInfoData?.otherLabReferID) errors.otherLabReferID = true;
        if (!editInfoData?.pinCode) errors.pinCode = true;
        if (!editInfoData?.uploadDocument) errors.uploadDocument = true;

        // Update state with errors
        setPatientRegistrationForEditInfoDataError(errors);
        // console.log(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };


    useEffect(() => {

        if (!validateFormForEditInfo()) {
            setIsButtonClick(0);
        }

    }, [editInfoData]);



    const onSubmitForSaveEditInfoData = async () => {
        setIsButtonClick(3);

        const { refID1, refID2, otherLabReferID, ...filteredEditInfoData } = editInfoData;

        const updatedData = {
            ...filteredEditInfoData, // Keeps all properties except refID1, refID2, and otherLabReferID
            refID1: editInfoData?.refID1?.doctorId,
            refID2: editInfoData?.refID2?.doctorId,
            otherLabReferID: editInfoData?.otherLabReferID?.otherLabReferID, // Extract doctorId from otherLabReferID
            otherLabRefer: editInfoData?.otherLabReferID?.otherLabRefer, // Extract doctorName from otherLabReferID
        };

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (updatedData?.mobileNo.toString().length !== 10) {
            toast.error('Mobile number must be exactly 10 digits.');
            setIsButtonClick(0);
            return;
        } else if (updatedData?.pinCode.toString().length !== 6) {
            toast.error('Pincode must be exactly 6 digits.');
            setIsButtonClick(0);
            return;
        } else if (!emailRegex.test(updatedData?.emailId)) {
            toast.error("Enter a valid email address.");
            setIsButtonClick(0);
            return;
        }

        // Validate form before submitting                                                      
        if (!validateFormForEditInfo()) {
            toast.info("Please fill in all mandatory fields.");
            setIsButtonClick(0);
            return;
        }

        try {
            const response = await updateEditInfoApi(updatedData);
            if (response?.success) {
                toast.success(response?.message);
                seteditInfoData('')
            } else {
                toast.error(response?.message)
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);

    }


    //edit test
    const handelOnClickEditTestData = async () => {

        try {

            const response = await getSingleEditTestApi(searchData?.editTestId);


            // const gridDataBarCodeandSampleType = {
            //     barCode: response?.itemdetail?.map(({ itemId, barcodeNo }) => ({ itemId, barcodeNo }))
            // };

            //saign barcode number based on itemId
            setGridDataBarCodeandSampleType(prevState => ({
                ...prevState,
                barCode: response?.data?.itemdetail?.map(({ itemId, barcodeNo, sampleTypeName }) => ({
                    itemId,
                    name: barcodeNo,
                    sampleTypeName
                }))
            }));

            if (response?.success) {

                try {

                    const response2 = await getAllInvestiGationApi(response?.data?.rateId || 0);

                    if (response2?.success) {
                        setallEditTestDataForInvasticationName(response2?.data);
                    } else {
                        toast.error(response2?.message);
                    }
                } catch (error) {
                    toast.error(error?.message);
                }





                const matchedDoctor1 = allReferData?.find((data) => data?.doctorId === response?.data?.refID1);

                const matchedDoctor2 = allReferData?.find((data) => data?.doctorId === response?.data?.refID2);

                const matchedLab = allLabReferData?.find((data) => data?.doctorId === response?.data?.otherLabReferID);

                setEditTestData({
                    ...response?.data,
                    dob: new Date(response?.data?.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(" ", "-"),
                    refID1: matchedDoctor1
                        ? { doctorId: matchedDoctor1?.doctorId, doctorName: matchedDoctor1?.doctorName }
                        : null, // If no match, set to null
                    refID2: matchedDoctor2
                        ? { doctorId: matchedDoctor2?.doctorId, doctorName: matchedDoctor2?.doctorName }
                        : null,
                    otherLabReferID: matchedLab
                        ? { otherLabReferID: matchedLab?.doctorId, otherLabRefer: matchedLab?.doctorName }
                        : null,
                    rateId: response?.data?.rateId,
                    itemId: response?.data?.itemId,
                    centreId: response?.data?.centreId,
                    // testData: response?.data.slice(0, 3).map(({ investigationName, mrp,
                    //     netAmount, rate, deliveryDate, isUrgent, itemId, discount, id, itemType, isSampleCollected, deptId }) => ({
                    //         itemName: investigationName,
                    //         mrp,
                    //         netAmt: netAmount,
                    //         grosss: rate,
                    //         isUrgent,
                    //         deliveryDate,
                    //         itemId,
                    //         discount,
                    //         id,
                    //         itemType,
                    //         isSampleCollected,
                    //         deptId
                    //     }))

                    testData: [...response?.data?.itemdetail]
                })

                setShowPopup(3)

            } else {
                toast.error(error?.message);
            }

        } catch (error) {
            if (error.status === 400) {
                toast.error('Please enter edit test data')
            } else {
                toast.error(error?.message);
            }
        }

    }


    const [isHandelClick, setIsHandelClick] = useState(false);

    const handelOnChangePatientRegistrationSelect = (selectedItem) => {
        //console.log(selectedItem?.target?.value?.itemId);

        setEditTestData((prevState) => ({
            ...prevState,
            itemId: selectedItem?.target?.value?.itemId, // Ensure itemId is correctly updated
        }));
        setIsHandelClick(true);
    };

    // console.log(editTestData);


    //change the gender value based on the title
    useEffect(() => {
        const genderMap = { 1: 'M', 6: 'M', 2: 'F', 5: 'F' };
        setPatientRegistrationData(prev => ({
            ...prev,
            gender: genderMap[patientRegistrationData?.title_id] || ''
        }));
    }, [patientRegistrationData?.title_id]);


    //after selete Test Search By Name Or Code data need to bind in table
    useEffect(() => {

        const getData = async () => {

            const response = await getAllInvestigationGridApi(
                editTestData?.rateId || 0,
                editTestData?.itemId || 0
            );

            setEditTestData((prevState) => {
                const existingTestData = prevState?.testData || [];

                const newTestData = Array.isArray(response?.data) ? response.data.map(({
                    itemName, mrp, netAmt, deliveryDate, isUrgent, itemId, discount, id, itemType, grosss,
                    sampleTypeName, sortName, testcode, defaultsampletype, departmentname, deptId, gender,
                    sampleTypeId, approvedDate, departmentReceiveDate, invoiceDate, notApprovedDate,
                    outhouseDoneOn, resultDate, sampleCollectionDate, sampleReceiveDate, sampleRecollectedDate, holdDate, unHoldDate,
                    sampleRejectionOn, showonReportdate
                }) => ({
                    investigationName: itemName,
                    mrp,
                    netAmount: netAmt,
                    rate: grosss,
                    isUrgent: isUrgent || 0,
                    deliveryDate,
                    discount,
                    id: id || 0,
                    defaultsampletype,
                    departmentName: departmentname,
                    sampleTypeName,
                    gender,
                    sampleTypeId,
                    sortName,
                    createdById: parseInt(user?.employeeId) || 0,
                    createdDateTime: new Date().toISOString(),
                    isActive: 1,
                    updateById: 0,
                    updateDateTime: new Date('1888-03-01T10:22:20.044Z').toISOString(),
                    workOrderId: editTestData?.workOrderId || 0,
                    transactionId: editTestData?.transactionId || 0,
                    testcode,
                    itemId: itemId || 0,
                    packageID: 0,
                    deptId,
                    barcodeNo: '',
                    isPackage: 0,
                    packageName: '',
                    itemType,
                    packMrp: 0,
                    packItemRate: 0,
                    packItemDiscount: 0,
                    packItemNet: 0,
                    reportType: 0,
                    centreId: editTestData?.centreId || 0,
                    sessionCentreid: 0,
                    isSra: 0,
                    isMachineOrder: 0,
                    isEmailsent: 0,
                    sampleCollectionDate: sampleCollectionDate || new Date().toISOString(),
                    sampleReceiveDate: sampleReceiveDate || new Date().toISOString(),
                    resultDate: resultDate || new Date().toISOString(),
                    approvedDate: approvedDate || new Date().toISOString(),
                    notApprovedDate: notApprovedDate || new Date().toISOString(),
                    deliveryDate: deliveryDate || new Date().toISOString(),
                    departmentReceiveDate: departmentReceiveDate || new Date().toISOString(),
                    sampleRejectionOn: sampleRejectionOn || new Date().toISOString(),
                    outhouseDoneOn: outhouseDoneOn || new Date().toISOString(),
                    sampleRecollectedDate: sampleRecollectedDate || new Date().toISOString(),
                    invoiceDate: invoiceDate || new Date().toISOString(),
                    showonReportdate: showonReportdate || new Date().toISOString(),
                    holdDate: holdDate || new Date().toISOString(),
                    unHoldDate: unHoldDate || new Date().toISOString(),
                })) : [];


                let duplicateFound = false; // Flag to track if any duplicates exist

                const uniqueNewData = newTestData.filter(newItem => {
                    const isDuplicate = existingTestData.some(existingItem => existingItem.itemId === newItem.itemId);
                    if (isDuplicate) {
                        duplicateFound = true; // Set flag if at least one duplicate is found
                    }
                    return !isDuplicate;
                });

                // Show toast only once if any duplicates exist
                if (duplicateFound) {
                    toast.error("Some tests already exist and were not added!");
                }

                return {
                    ...prevState,
                    testData: [...existingTestData, ...uniqueNewData], // Append only unique new data
                };
            });

            setIsHandelClick(false)
        }

        if (isHandelClick && editTestData?.itemId !== 0 && editTestData?.itemId !== 0) {
            getData()
        }




    }, [editTestData?.itemId, editTestData?.itemId])


    const handelOnChangeEditTest = (e) => {
        setEditTestData((preventData) => ({
            ...preventData,
            [e.target.name]: e.target.value
        }))
    }


    const handelImageChangeForEditTest = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileType = file.type;

            // Handle image files
            if (fileType.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setEditTestData((prevData) => ({
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
                    seteditInfoData((prevData) => ({
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

    //calculate date of birth
    const calculateDOBForEditTest = (ageDay, ageMonth, ageYear) => {

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
        setEditTestData((prevData) => {
            const newDOB = formattedDOB.replace(/ /g, '-');
            if (prevData.dob !== newDOB) {
                return { ...prevData, dob: newDOB };
            }
            return prevData;
        });
    };


    // Function to calculate age based on DOB
    const calculateAgeForEditTest = (dob) => {
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

        //check if years is grater then 150 
        if (years > 150) {
            toast.error('150 exceeds professional age limit.');
            setEditTestData((preventData) => ({
                ...preventData,
                ageMonth: 0
            }))
            return;
        }

        // Ensure months and years are zero if there is no difference
        if (years < 0) years = 0; // Handle edge cases where dob is in the future
        if (months < 0) months = 0;

        // Update age only if it changes
        setEditTestData((prevData) => {
            if (
                prevData.ageYear !== years ||
                prevData.ageMonth !== months ||
                prevData.ageDay !== days
            ) {
                // Construct the updated data
                const updatedData = {
                    ...prevData,
                    ageYear: years || "0",
                    ageMonth: months || "0",
                    ageDay: days || "0",
                };


                // Return the updated data
                return updatedData;
            }
            // Return the unchanged data
            return prevData;
        });

    };


    const [isUpdating1, setIsUpdating1] = useState(false);

    // Recalculate DOB if age fields change
    useEffect(() => {
        if (!isUpdating1 && (editTestData?.ageYear || editTestData?.ageMonth || editTestData?.ageDay)) {
            setIsUpdating1(true); // Prevent loop
            calculateDOBForEditTest(
                editTestData?.ageDay,
                editTestData?.ageMonth,
                editTestData?.ageYear
            );
        }
    }, [editTestData?.ageDay, editTestData?.ageMonth, editTestData?.ageYear]);

    // Recalculate age if DOB changes
    useEffect(() => {
        if (isUpdating1) {
            setIsUpdating1(false); // Allow updates again
        } else if (editTestData?.dob) {
            setIsUpdating1(true);
            calculateAgeForEditTest(editTestData?.dob);
        }
    }, [editTestData?.dob]);



    //validations
    const validateFormForEditTest = () => {

        const errors = {};

        // Check for  fields
        if (!editTestData?.mobileNo) errors.mobileNo = true;

        if (!editTestData?.title_id) errors.title_id = true;
        if (!editTestData?.name) errors.name = true;

        if (!editTestData?.ageDay) errors.ageDay = true;
        if (!editTestData?.ageMonth) errors.ageMonth = true;
        if (!editTestData?.ageYear) errors.ageYear = true;
        if (!editTestData?.dob) errors.dob = true;

        if (!editTestData?.gender) errors.gender = true;
        if (!editTestData?.emailId) errors.emailId = true;

        //sampleTypeName filed required

        if (!editTestData?.refID1) errors.refID1 = true;
        if (!editTestData?.refID2) errors.refID2 = true;
        if (!editTestData?.address) errors.address = true;
        if (!editTestData?.otherLabReferID) errors.otherLabReferID = true;
        if (!editTestData?.pinCode) errors.pinCode = true;
        if (!editTestData?.uploadDocument) errors.uploadDocument = true;

        // Update state with errors
        setPatientRegistrationForEditTestDataError(errors);
        // console.log(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };


    useEffect(() => {

        if (!validateFormForEditTest()) {
            setIsButtonClick(0);
        }

    }, [editTestData]);

    const handleInputChangeEditTestDsicount = (itemId, value, type) => {
        setEditTestData((prevData) => ({
            ...prevData,
            testData: prevData?.testData?.map((item) =>
                item.itemId === itemId
                    ? {
                        ...item,
                        discount: value,
                        netAmt: value === "0" || value === 0 ? item.grosss : item.grosss - value // Reset netAmt if discount is zero
                    }
                    : item
            ),
        }));
    };



    const onSubmitForSaveEditTestData = async () => {
        setIsButtonClick(4);

        // Generate the transformed list based on testData
        const transformedList = editTestData?.testData.map((data) => ({

            isActive: 1,
            createdById: data?.createdById,
            createdDateTime: data?.createdDateTime,
            updateById: parseInt(user?.employeeId),
            updateDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            id: data?.id || 0,
            workOrderId: data?.workOrderId,
            transactionId: data?.transactionId,
            testcode: data?.testcode, //need to check
            itemId: parseInt(data?.itemId),
            packageID: data?.itemType === 3 ? parseInt(data?.itemType) : 0,
            deptId: data?.deptId,

            // barcodeNo: gridDataBarCodeandSampleType.barCode.find(barcode => barcode.itemId === data.itemId)?.name || '',

            barcodeNo: gridDataBarCodeandSampleType.barCode.find(barcode => barcode.itemId === data.itemId)?.name ||
                gridDataBarCodeandSampleType.barCode.find(barcode => barcode.sampleTypeName === data.sampleTypeName)?.name || '',

            departmentName: data?.departmentName || '',
            // investigationName: investigationGridData?.find(barcode => barcode.itemId === data.itemId)?.itemName || '',
            investigationName: data?.investigationName,
            isPackage: data?.itemType === 3 ? 1 : 0,
            packageName: data?.itemType === 3 ? selectedInvastigationList?.find(barcode => barcode.itemId === data.itemId)?.
                //itemName : '',
                itemType : data?.itemType,

            mrp: data?.mrp,
            rate: data?.rate,
            discount: data?.discount,
            netAmount: data?.netAmount,

            packMrp: data?.itemType === 3 ? data?.mrp : 0,
            packItemRate: data?.rate === 3 ? data?.rate : 0,
            packItemDiscount: data?.itemType === 3 ? data?.discount : 0,
            packItemNet: data?.itemType === 3 ? data?.netAmt : 0,
            reportType: 0,

            centreId: parseInt(editTestData?.centreId), //
            sessionCentreid: parseInt(user?.defaultCenter),
            isSra: 0,
            isMachineOrder: 0,
            isEmailsent: 0,
            sampleTypeId: gridDataBarCodeandSampleType?.sampleType?.find(barcode => barcode.itemId === data.itemType) ? id : 0,
            // sampleTypeName: gridDataBarCodeandSampleType?.sampleType?.length !== 0 ? gridDataBarCodeandSampleType?.sampleType?.find(barcode => barcode.itemType === data.itemType)?.name : '',
            sampleTypeName: data?.sampleTypeName,

            sampleCollectionDate: data?.sampleCollectionDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            sampleCollectedby: "",
            sampleCollectedID: 0,
            sampleReceiveDate: data?.sampleReceiveDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            sampleReceivedBY: "",
            resultDate: data?.resultDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            resultDoneByID: 0,
            resutDoneBy: "0",
            isResultDone: 0,
            isApproved: 0,
            approvedDate: data?.approvedDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            approvedByID: 0,
            approvedbyName: "0",
            notApprovedBy: "0",
            notApprovedDate: data?.notApprovedDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            isReporting: 0,
            isCritical: 0,
            deliveryDate: data?.deliveryDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            isInvoiceCreated: 0,
            invoiceNumber: 0,
            isUrgent: data?.isUrgent,
            isSampleCollected: data?.id !== 0 ? data?.isSampleCollected : "N",
            samplecollectionremarks: "",
            departmentReceiveRemarks: "",
            departmentReceiveDate: data?.departmentReceiveDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            departmentReceiveBy: "",
            departmentReceiveByID: 0,
            isRemoveItem: data?.isRemoveItem,
            sampleRejectionBy: 0,
            sampleRejectionByName: "",
            sampleRejectionOn: data?.sampleRejectionOn || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            interpretationId: 0,
            approvalDoctor: 0,
            isOuthouse: 0,
            outhouseLab: 0,
            labName: "",
            outhouseDoneBy: 0,
            outhouseDoneOn: data?.outhouseDoneOn || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            sampleRecollectedby: 0,
            sampleRecollectedDate: data?.sampleCollectionDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            isrerun: 0,
            invoiceNo: "0",
            invoiceDate: data?.invoiceDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            invoiceCycle: "",
            invoiceAmount: 0,
            invoiceCreatedBy: 0,
            invoiceNoOld: "",
            remarks: "",
            showonReportdate: data?.showonReportdate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            hold: 0,
            holdById: 0,
            holdDate: data?.holdDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            unholdById: 0,
            unHoldDate: data?.unHoldDate || new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            doctorSignId: 0,
            holdReason: ""

        }))




        try {
            const response = await updateEditTestApi(transformedList);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.error)
            }

        } catch (error) {
            toast.error(error?.message);
            console.log(error);

        }
        setIsButtonClick(0);
    }


    //old patient
    const handelOnClickOldPatientData = async () => {
        try {

            const response = await getOldPatientApi(searchData?.oldPatientId);

            if (response?.success) {

                setOLdPatientId([response?.data])
                setShowPopup(4)

            } else {
                toast.error(error?.message);
            }

        } catch (error) {
            if (error.status === 400) {
                toast.error('Please Enter old patient data')
            } else {
                toast.error(error?.message);
            }
        }
    }


    const onClickHandelOldPatientInfo = async (val) => {

        // try {

        //     const response = await getSingleOldPatientDataInOldPatientPopupApi(val);

        //     console.log(response);


        // } catch (error) {
        //     toast.error(error?.message);
        //     console.log(error);

        // }

        const response = oldPatientId.filter((data) => data?.patientId === val)

        setPatientRegistrationData((preventData) => ({
            ...preventData,
            ageDays: response[0]?.ageDay,
            ageMonth: response[0]?.ageMonth,
            ageYear: response[0]?.ageYear,
            emailId: response[0]?.emailId,
            gender: response[0]?.gender,
            mobileNo: response[0]?.mobileNo,
            name: response[0]?.name,
            title_id: response[0]?.title_id
        }))
        setShowPopup(0);
    }


    // const filterCentreData = allCentreData.filter((data) => (data?.centreName?.toLowerCase() || '').includes(String(patientRegistrationSelectData?.centreId || '').toLowerCase()));


    // const filterRateData = allRateType.filter((data) => (data?.rateName?.toLowerCase() || '').includes(String(patientRegistrationSelectData?.rateId || '').toLowerCase()));
    // //
    // const filterReferDrData = allReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refDoctor1 || '').toLowerCase()));


    // const filterinvestigationNamerData = allInvastigationData.filter((data) => (data?.itemName?.toLowerCase() || '').includes(String(patientRegistrationData?.investigationName || '').toLowerCase()));


    // const filterReferDrDataTwo = allReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refDoctor2 || '').toLowerCase()));


    // const filterReferLabData = allLabReferData.filter((data) => (data?.doctorName?.toLowerCase() || '').includes(String(patientRegistrationData?.refLab || '').toLowerCase()));


    // const calendarRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (calendarRef.current && !calendarRef.current.contains(event.target)) {
    //             setShowCalanderAndTime(0);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, []);

    return (
        <>
            <div>
                {/* Header Section */}
                <FormHeader headerData='Patient Registration' />

                {/* form data */}
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

                        <div className="relative flex-1">
                            <CustomDropdown
                                name="billingType"
                                label="Select Billing Type"
                                value={patientRegistrationData?.billingType}
                                options={[
                                    { label: 'Select Option', value: 0, disabled: true },
                                    { label: 'B2B', value: 1 },
                                    { label: 'DPS-Walking', value: 2 },
                                    { label: 'Camp', value: 3 },
                                    { label: 'DSA Agent', value: 4 },
                                    { label: 'Corporate coll.', value: 5 },
                                ]}
                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                defaultIndex={0}
                                activeTheme={activeTheme}
                                // isMandatory={!Boolean(patientRegistrationData?.title_id)}
                                isMandatory={patientRegistrationDataError?.billingType}

                            />
                        </div>

                        {/* center */}
                        <div className="relative flex-1">
                            {/* <input
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
                            </label> */}

                            {/* Dropdown to select the menu */}
                            {/* {showSearchBarDropDown === 1 && (
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
                            )} */}

                            <CustomSearchInputFields
                                id="centreId"
                                name="centreId"
                                label="Centre"
                                value={patientRegistrationData?.centreId}
                                options={allCentreData}
                                onChange={handelOnChangePatientRegistration}
                                filterText="No records found"
                                placeholder=" "
                                searchWithName="centreName"
                                uniqueKey="centreId"
                                activeTheme={activeTheme}
                            />

                        </div>

                        {/* Rate Type */}
                        <div className="relative flex-1">
                            {/* <input
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
                            </label> */}

                            {/* Dropdown to select the menu */}
                            {/* {showSearchBarDropDown === 2 && (
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
                            )} */}

                            <CustomSearchInputFields
                                id="rateId"
                                name="rateId"
                                label="Rate Type"
                                value={patientRegistrationData?.rateId}
                                options={allRateType}
                                onChange={handelOnChangePatientRegistration}
                                filterText="No records found"
                                placeholder=" "
                                searchWithName="rateName"
                                uniqueKey="id"
                                activeTheme={activeTheme}
                            />
                        </div>

                        <div className="flex gap-[0.25rem]">

                            <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                <div className="relative flex-1">

                                    <CustomTextBox
                                        type="charNumber"
                                        name="editInfoId"
                                        value={searchData?.editInfoId || ''}
                                        onChange={(e) => handelOnChangeSearchData(e)}
                                        label="Edit info"
                                        isDisabled={false}
                                        maxLength={15}
                                        allowSpecialChars={false}
                                        isMandatory={false}
                                    />

                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className="h-[1.6rem] w-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold "
                                        onClick={() => {
                                            handelOnClickEditInfoData()
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
                                        type="charNumber"
                                        name="editTestId"
                                        value={searchData?.editTestId || ''}
                                        onChange={(e) => handelOnChangeSearchData(e)}
                                        label="Edit Test"
                                        isDisabled={false}
                                        maxLength={15}
                                        allowSpecialChars={false}
                                        isMandatory={false}

                                    />

                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className=" h-[1.6rem] w-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold "
                                        onClick={() => {
                                            // setShowPopup(3)
                                            handelOnClickEditTestData()
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
                                        type="charNumber"
                                        name="oldPatientId"
                                        value={searchData?.oldPatientId || ''}
                                        onChange={(e) => handelOnChangeSearchData(e)}
                                        label="Old Patient"
                                        isDisabled={false}
                                        maxLength={15}
                                        allowSpecialChars={false}
                                        isMandatory={false}

                                    />

                                </div>

                                <div>
                                    <button
                                        type='button'
                                        className="h-[1.6rem] w-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold "
                                        onClick={() => {
                                            handelOnClickOldPatientData()
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
                                {/* <input
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
                                </label> */}
                                <CustomNumberInput
                                    name="mobileNo"
                                    value={patientRegistrationData?.mobileNo || ''}
                                    onChange={(e) => {
                                        handelOnChangePatientRegistration(e)
                                    }}
                                    label="Mobile No."
                                    maxLength={10}
                                    isMandatory={patientRegistrationDataError?.mobileNo}
                                />
                            </div>

                            {/* title */}
                            <div className="relative flex-1">
                                {/* <select
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
                                </label> */}



                                <div className="relative flex-1">
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
                                        isMandatory={patientRegistrationDataError?.title_id}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Name */}
                        <div className="relative flex-1">
                            {/* <input
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
                            </label> */}
                            <CustomTextBox
                                type="propercase"
                                name="name"
                                value={patientRegistrationData?.name || ''}
                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                label="Name"
                                isDisabled={false}
                                isMandatory={patientRegistrationDataError?.name}
                            />
                        </div>




                        <div className="flex gap-[0.25rem]">

                            {/*  Year */}
                            <div className="relative flex-1">
                                {/* <input
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
                                </label> */}
                                <CustomTextBox
                                    type="years"
                                    name="ageYear"
                                    value={patientRegistrationData?.ageYear || ''}
                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                    label="Year"
                                    isMandatory={patientRegistrationDataError?.ageYear}
                                />
                            </div>



                            {/*  Month */}
                            <div className="relative flex-1">
                                {/* <input
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
                                </label> */}
                                <CustomTextBox
                                    type="months"
                                    name="ageMonth"
                                    value={patientRegistrationData?.ageMonth || ''}
                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                    label="Month"
                                    isMandatory={patientRegistrationDataError?.ageMonth}
                                />
                            </div>

                            {/*  Day */}
                            <div className="relative flex-1">
                                {/* <input
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
                                </label> */}
                                <CustomTextBox
                                    type="days"
                                    name="ageDays"
                                    value={patientRegistrationData?.ageDays || ''}
                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                    label="Days"
                                    isMandatory={patientRegistrationDataError?.ageDays}
                                />
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
                                {/* <select
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
                                </label> */}
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
                                    isMandatory={patientRegistrationDataError?.gender}
                                />
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
                            {/* <input
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
                            </label> */}

                            <CustomEmailInput
                                name="emailId"
                                value={patientRegistrationData?.emailId}
                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                label="Email"
                            />
                        </div>


                        {/*  Refer Dr. */}
                        {/* <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
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

                        </div> */}

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
                                    isMandatory={patientRegistrationDataError?.refID1}
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


                        {/* Refer Dr2 */}
                        {/* <div className="relative flex-1">
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
                        </div> */}
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



                        {/* collection date and time */}

                        {/* <div className="relative flex-1 flex gap-[0.10rem] items-center">
                          
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

                            
                            {showCalanderAndTime === 2 && (
                                <div
                                    ref={calendarRef}
                                    className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                                    
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
                        </div> */}
                        <div className='relative flex-1'>
                            <DatePicker
                                id="collectionDateAndTime"
                                name="collectionDateAndTime"
                                value={patientRegistrationData?.collectionDateAndTime || ''}
                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                placeholder=" "
                                label="Collection Date & Time"
                                activeTheme={activeTheme}

                                currentDate={new Date()} // Current date: today
                                maxDate={new Date(2025, 11, 31)}
                                showTime={true}
                                showBigerCalandar={true}
                            />
                        </div>

                        {/* Address */}
                        <div className="relative flex-1">
                            {/* <input
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
                            </label> */}
                            <CustomTextBox
                                type="text"
                                name="address"
                                value={patientRegistrationData?.address || ''}
                                onChange={(e) => handelOnChangePatientRegistration(e)}
                                label="Address"
                                isDisabled={false}
                            />
                        </div>


                        {/* Pincode */}
                        <div className="relative flex-1">
                            {/* <input
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
                            </label> */}
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
                        {/* <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

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


                              =
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

                        </div> */}
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



                        {/* Upload Document */}
                        {/* <div className="relative flex-1 flex gap-[0.10rem]">
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
                        </div> */}

                        <div className="relative flex-1">
                            <CustomFileUpload
                                value={patientRegistrationData?.uploadDocument}
                                label='Upload Document'
                                handelImageChange={handelImageChange}
                                activeTheme={activeTheme}
                            />
                        </div>



                        {/* investigation */}
                        {/* <div className="relative flex-2 lg:col-span-2">
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
                        </div> */}
                        <div className="relative w-[200%]">
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
                                showDataInTextField={false}
                            />
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
                                                        (data, rowIndex) => {
                                                            // Find the discount for the current row
                                                            const existingDiscount = gridDataBarCodeandSampleType?.discount.find(
                                                                (item) => item.itemId === data?.itemId
                                                            )?.discount;


                                                            return (
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
                                                                        {/* <input
                                                                            type="text"
                                                                            className="border-[1.5px] rounded outline-none px-1 w-full"
                                                                            // value={
                                                                            // patientRegistrationData?.discountAmmount !== 0 ?
                                                                            //     patientRegistrationData?.discountAmmount :
                                                                            //     gridDataBarCodeandSampleType?.discount.find(
                                                                            //         (item) =>
                                                                            //             item.itemId ===
                                                                            //             data?.itemId
                                                                            //     )?.discount || ""
                                                                            //}

                                                                            value={
                                                                                existingDiscount !== undefined
                                                                                    ? existingDiscount // Use updated discount if exists
                                                                                    : changePartiCularDiscount === 0
                                                                                        ? patientRegistrationData?.discountPercentage === 0
                                                                                            ? patientRegistrationData?.discountPercentage
                                                                                            : data?.grosss - (data?.grosss * (patientRegistrationData?.discountPercentage || 0) / 100)
                                                                                        : data.discount || "" // Keep previous value
                                                                            }


                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    data?.itemId,
                                                                                    e.target.value,
                                                                                    "1"
                                                                                )
                                                                            }
                                                                        /> */}
                                                                        {/* <input
                                                                            type="text"
                                                                            className="border-[1.5px] rounded outline-none px-1 w-full"
                                                                            value={
                                                                                existingDiscount !== undefined
                                                                                    ? existingDiscount // Keep previous discount if exists
                                                                                    : (changePartiCularDiscount === 0
                                                                                        ? patientRegistrationData?.discountPercentage === 0
                                                                                            ? 0 // If no discount, set to 0
                                                                                            : data?.grosss - (data?.grosss * (patientRegistrationData?.discountPercentage || 0) / 100)
                                                                                        : 0) // Default to 0 if no value is present
                                                                            }
                                                                            onChange={(e) => handleInputChange(data?.itemId, e.target.value, "1")}
                                                                        /> */}
                                                                        {/* ======night code====== */}
                                                                        <input
                                                                            type="text"
                                                                            className="border-[1.5px] rounded outline-none px-1 w-full cursor-not-allowed bg-gray-200"
                                                                            // value={
                                                                            //     (data?.grosss * patientRegistrationData?.discountPercentage) / 100
                                                                            // }

                                                                            value={gridDataBarCodeandSampleType?.discount.find(d => d.itemId === data?.itemId)?.discount || (data?.grosss * patientRegistrationData?.discountPercentage) / 100}

                                                                            onChange={(e) => handleInputChange(data?.itemId, e.target.value, "1")}

                                                                            readOnly
                                                                        />
                                                                    </td>

                                                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                        {/* {(
                                                                            (data?.netAmt || 0) -
                                                                            parseFloat(
                                                                                gridDataBarCodeandSampleType?.discount.find(
                                                                                    (item) =>
                                                                                        item.itemId ===
                                                                                        data?.itemId
                                                                                )?.discount || 0
                                                                            )
                                                                        ).toFixed(2)} */}

                                                                        {/* //====night code==== */}
                                                                        {
                                                                            patientRegistrationData?.discountPercentage ?
                                                                                data?.netAmt - ((data?.grosss * patientRegistrationData?.discountPercentage) / 100)
                                                                                : data?.netAmt
                                                                        }
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
                                                                            checked={data?.isUrgent === 1} // Checkbox checked if isUrgent is 1
                                                                            onChange={(e) => handleCheckboxChange(rowIndex, e.target.checked)}
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
                                                        }
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
                                                            {/* {investigationGridData.reduce(
                                                                (sum, data) =>
                                                                    sum +
                                                                    parseFloat(
                                                                        gridDataBarCodeandSampleType?.discount.find(
                                                                            (item) => item.itemId === data?.itemId
                                                                        )?.discount || 0
                                                                    ),
                                                                0
                                                            )} */}
                                                            {patientRegistrationData?.discountAmmount}
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
                                {
                                    parseInt(patientRegistrationData?.billingType) !== 1 && (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-2  mx-1 lg:mx-2">





                                                {/* Currency */}
                                                <div className="relative flex-1">
                                                    {/* <select
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
</label> */}

                                                    <CustomDropdown
                                                        name="Currency"
                                                        label="Select Currency"
                                                        value={selectCurrencyValue || ''}
                                                        options={[
                                                            { label: 'INR', value: '1' },
                                                            { label: 'USD', value: '2' },
                                                        ]}
                                                        onChange={(e) => handelOnChangeSelectCurrencyValue(e)}
                                                        defaultIndex={0}
                                                        activeTheme={activeTheme}
                                                        isMandatory={false}
                                                    />
                                                </div>

                                                {/* Payment Mode */}
                                                {/* <div className="relative flex-1">
<div
className={`flex peer items-center border-[1.5px] 
border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] bg-white `}
onClick={() => showSearchBarDropDown !== 6 ? openShowSearchBarDropDown(6) : openShowSearchBarDropDown(0)}
>
<input
    type="text"
    id="paymentModeType"
    name="paymentModeType"
   
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

{showSearchBarDropDown === 6 && (
<div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">

    {
        paymentModes?.length === 0 ?

            <div className='py-4 text-gray-500 text-center'>
                {import.meta.env.VITE_API_RECORD_NOT_FOUND}
            </div>
            :
            <ul className='w-full'>

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
</div> */}

                                                <div className="relative flex-1">
                                                    <CustomMultiSelectDropdown
                                                        id="paymentModeType"
                                                        name="paymentModeType"
                                                        label="Select Payment Modes"
                                                        options={paymentModes}
                                                        selectedItems={paymentModeType}
                                                        onSelectionChange={handelOnChangePaymentMode}
                                                        placeholder=" "
                                                        activeTheme={activeTheme}
                                                        uniqueId={'value'}
                                                        searchWithName={'label'}
                                                    />
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
                                                    {/* <CustomTextBox
type="decimalpositive"
name="paidAmount"
value={patientRegistrationData?.paidAmount || ''}
onChange={(e) => handelOnChangePatientRegistration(e)}
label="Paid Amt."
isDisabled={false}
/> */}
                                                </div>

                                                {/* Balance Amt. */}
                                                <div className="relative flex-1">
                                                    <input
                                                        type="text"
                                                        id="balanceAmt"
                                                        name="balanceAmt"
                                                        value={patientRegistrationData?.balnceAmt}

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
                                                        <tr className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2'>
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

                                                        <tr className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2'>

                                                            <td className="text-xxs font-semibold text-gridTextColor relative flex-1"
                                                            >
                                                                {/* <input type="number" name="cashAmt" id="cashAmt"
    value={patientRegistrationData?.cashAmt || ''}
    onChange={(e) => handelOnChangePatientRegistration(e)}
    className={`inputPeerField  ${patientRegistrationDataError.cashAmt ? "border-b-red-500" : "border-borderColor"} outline-none ${paymentModeType.some((item) => item.value === "1") ? "cursor-pointer" : "cursor-not-allowed"
        }`}
    readOnly={!paymentModeType.some((item) => item.value === "1")}
/> */}
                                                                <CustomTextBox
                                                                    type="decimalpositive"
                                                                    name="cashAmt"
                                                                    value={patientRegistrationData?.cashAmt || ''}
                                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                                    label="Paid Amt."
                                                                    isDisabled={!paymentModeType.some((item) => item.value === "1")}
                                                                    isMandatory={patientRegistrationDataError.cashAmt}
                                                                    readOnly={!paymentModeType.some((item) => item.value === "1")}
                                                                    showLabel={true}
                                                                />
                                                            </td>


                                                            <td className="text-xxs font-semibold text-gridTextColor relative flex-1"
                                                            >
                                                                {/* <input type="number"
    name="creditCardAmt" id="creditCardAmt"
    value={patientRegistrationData?.creditCardAmt || ''}
    onChange={(e) => handelOnChangePatientRegistration(e)}
    className={`inputPeerField
                
                ${patientRegistrationDataError.creditCardAmt ? "border-b-red-500" : "border-borderColor"}

                outline-none ${paymentModeType.some((item) => item.value === "2") ? "cursor-pointer" : "cursor-not-allowed"
        }`}
    readOnly={!paymentModeType.some((item) => item.value === "2")}
/> */}

                                                                <CustomTextBox
                                                                    type="decimalpositive"
                                                                    name="creditCardAmt"
                                                                    value={patientRegistrationData?.creditCardAmt || ''}
                                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                                    label="Credit Card Amt."
                                                                    isDisabled={!paymentModeType.some((item) => item.value === "2")}
                                                                    isMandatory={patientRegistrationDataError.creditCardAmt}
                                                                    readOnly={!paymentModeType.some((item) => item.value === "2")}
                                                                    showLabel={true}
                                                                />
                                                            </td>

                                                            <td className="text-xxs font-semibold text-gridTextColor relative flex-1"
                                                            >
                                                                {/* <input type="number" name="lastFoureDigit" id="lastFoureDigit"
    value={patientRegistrationData?.lastFoureDigit || ''}
    onChange={(e) => handelOnChangePatientRegistration(e)}
    maxLength={4}
    className={`inputPeerField
                ${patientRegistrationDataError.lastFoureDigit ? "border-b-red-500" : "border-borderColor"}
                outline-none ${paymentModeType.some((item) => item.value === "2") ? "cursor-pointer" : "cursor-not-allowed"
        }`}
    readOnly={!paymentModeType.some((item) => item.value === "2")}
/> */}

                                                                <CustomTextBox
                                                                    type="positive"
                                                                    name="lastFoureDigit"
                                                                    value={patientRegistrationData?.lastFoureDigit || ''}
                                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                                    label="Last 4 digits"
                                                                    isDisabled={!paymentModeType.some((item) => item.value === "2")}
                                                                    isMandatory={patientRegistrationDataError.lastFoureDigit}
                                                                    maxLength={4}
                                                                    readOnly={!paymentModeType.some((item) => item.value === "2")}
                                                                    showLabel={true}
                                                                />
                                                            </td>


                                                            <td className='text-xxs font-semibold text-gridTextColor relative flex-1 -mt-[1.9px]'>
                                                                {/* 
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

*/}


                                                                <CustomDropdown
                                                                    name="bank_Id"
                                                                    label="Select Bank"
                                                                    value={patientRegistrationData?.bank_Id}
                                                                    options={[
                                                                        { label: 'Select Bank Name', value: 0, disabled: true },
                                                                        ...allBankNameData?.map(item => ({
                                                                            label: item.bankName,
                                                                            value: parseInt(item.id),
                                                                        })),
                                                                    ]}
                                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                                    defaultIndex={0}
                                                                    isDisabled={!paymentModeType.some((item) => item.value === "2")}
                                                                    activeTheme={activeTheme}
                                                                    showLabel={false}
                                                                    isMandatory={patientRegistrationDataError?.bank_Id}
                                                                />
                                                            </td>

                                                            <td className="text-xxs font-semibold text-gridTextColor relative flex-1"
                                                            >
                                                                {/* <input type="number"
    name="onlinewalletAmt" id="onlinewalletAmt"
    value={patientRegistrationData?.onlinewalletAmt || ''}
    onChange={(e) => handelOnChangePatientRegistration(e)}
    className={`inputPeerField  ${patientRegistrationDataError.onlinewalletAmt ? "border-b-red-500" : "border-borderColor"} outline-none ${!paymentModeType.some((item) => item.value === "3") ? 'cursor-not-allowed' : 'cursor-pointer'}`}

    readOnly={!paymentModeType.some((item) => item.value === "3")}
/> */}

                                                                <CustomTextBox
                                                                    type="decimalpositive"
                                                                    name="onlinewalletAmt"
                                                                    value={patientRegistrationData?.onlinewalletAmt || ''}
                                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                                    label="Last 4 digits"
                                                                    isDisabled={!paymentModeType.some((item) => item.value === "3")}
                                                                    isMandatory={patientRegistrationDataError.onlinewalletAmt}

                                                                    readOnly={!paymentModeType.some((item) => item.value === "3")}
                                                                    showLabel={true}
                                                                />
                                                            </td>



                                                            <td className='text-xxs font-semibold text-gridTextColor relative flex-1'>
                                                                {/* <select
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
</select> */}

                                                                <CustomDropdown
                                                                    name="paymentModeId"
                                                                    label="Select Bank"
                                                                    value={patientRegistrationData?.paymentModeId}
                                                                    options={[
                                                                        { label: 'Select Payment Mode', value: 0, disabled: true },
                                                                        { label: 'Paytm', value: 1, },
                                                                        { label: 'PhonePay', value: 2, },
                                                                        { label: 'BHIM', value: 3, },
                                                                        { label: 'GooglePay', value: 4, },
                                                                    ]}
                                                                    onChange={(e) => handelOnChangePatientRegistration(e)}
                                                                    defaultIndex={0}
                                                                    isDisabled={!paymentModeType.some((item) => item.value === "3")}
                                                                    activeTheme={activeTheme}
                                                                    showLabel={false}
                                                                    isMandatory={patientRegistrationDataError?.paymentModeId}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>


                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-2  mx-1 lg:mx-2">

                                                {/* Discount Type */}
                                                <div className="relative flex-1">
                                                    {/* <select
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
</label> */}

                                                    <CustomDropdown
                                                        name="discountType"
                                                        label="Discount Type"
                                                        value={patientRegistrationData?.discountType}
                                                        options={[
                                                            { label: 'Discount Type', value: 0, disabled: true },
                                                            ...allDicountTypeData?.map(item => ({
                                                                label: item.type,
                                                                value: parseInt(item.id),
                                                            })),
                                                        ]}
                                                        onChange={(e) => handelOnChangePatientRegistration(e)}
                                                        defaultIndex={0}
                                                        activeTheme={activeTheme}
                                                        isMandatory={patientRegistrationDataError?.discountType}
                                                    />
                                                </div>


                                                {/* Discount Ammount */}
                                                <div className="relative flex-1"
                                                    onBlur={() =>
                                                        (patientRegistrationData?.cashAmt || patientRegistrationData?.creditCardAmt || patientRegistrationData?.onlinewalletAmt) && toast.error('Remove your amt')
                                                    }
                                                >
                                                    {/* <input
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
                                                        </label> */}

                                                    <CustomTextBox
                                                        type="decimalpositive"
                                                        name="discountAmmount"
                                                        value={patientRegistrationData?.discountAmmount || ''}
                                                        onChange={(e) => handelOnChangePatientRegistration(e)}
                                                        label="Discount Ammount"
                                                        readOnly={patientRegistrationData?.cashAmt || patientRegistrationData?.creditCardAmt || patientRegistrationData?.onlinewalletAmt}
                                                        isMandatory={patientRegistrationDataError.discountAmmount}
                                                    />
                                                </div>

                                                {/* Discount % */}
                                                <div className="relative flex-1"
                                                    onBlur={() =>
                                                        (patientRegistrationData?.cashAmt || patientRegistrationData?.creditCardAmt || patientRegistrationData?.onlinewalletAmt) && toast.error('Remove your amt')
                                                    }
                                                >
                                                    {/* <input
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
                                                            </label> */}

                                                    <CustomTextBox
                                                        type="decimalpositive"
                                                        name="discountPercentage"
                                                        value={patientRegistrationData?.discountPercentage || ''}
                                                        onChange={(e) => handelOnChangePatientRegistration(e)}
                                                        label="Discount %"
                                                        readOnly={patientRegistrationData?.cashAmt || patientRegistrationData?.creditCardAmt || patientRegistrationData?.onlinewalletAmt}
                                                        isMandatory={patientRegistrationDataError.discountPercentage}
                                                    />
                                                </div>


                                                {/* Discount Reason */}
                                                <div className="relative flex-1">
                                                    {/* <select
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
                                                        </label> */}

                                                    <CustomDropdown
                                                        name="discountid"
                                                        label="Discount Reason"
                                                        value={patientRegistrationData?.discountid}
                                                        options={[
                                                            { label: 'Select Discount Reason', value: 0, disabled: true },
                                                            ...allDiscountReasonData?.map(item => ({
                                                                label: item.discountReasonName,
                                                                value: item.id,
                                                            })),
                                                        ]}
                                                        onChange={(e) => handelOnChangePatientRegistration(e)}
                                                        defaultIndex={0}
                                                        activeTheme={activeTheme}
                                                        isMandatory={patientRegistrationDataError?.discountid}
                                                    />
                                                </div>


                                                {/* Discount Approved By */}
                                                <div className="relative flex-1">
                                                    {/* <select
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
</label> */}

                                                    <CustomDropdown
                                                        name="discountApproved"
                                                        label="Discount Approved By"
                                                        value={patientRegistrationData?.discountApproved}
                                                        options={[
                                                            { label: 'Select Discount Approved By', value: 0, disabled: true },
                                                            ...allDiscountApprovedByData?.map(item => ({
                                                                label: `${item?.fName} ${item?.lName}`,
                                                                value: item.empId,
                                                            })),
                                                        ]}
                                                        onChange={(e) => handelOnChangePatientRegistration(e)}
                                                        defaultIndex={0}
                                                        activeTheme={activeTheme}
                                                        isMandatory={patientRegistrationDataError?.discountApproved}
                                                    />
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

                                                            onClick={() => {
                                                                if (isPreprintedCode === 0) {
                                                                    onSubmitForSavePatientRegistrationData(0);
                                                                } else {

                                                                    setShowPopup(6);
                                                                }
                                                            }}
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

                                {
                                    parseInt(patientRegistrationData?.billingType) === 1 && (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-3  mx-1 lg:mx-2 ">

                                                <div className='flex gap-[0.25rem] '>
                                                    <div className="relative flex-1 flex justify-start items-center">


                                                        <button
                                                            type="button"
                                                            data-ripple-light="true"
                                                            className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                                            style={{
                                                                background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                                            }}

                                                            onClick={() => {
                                                                if (isPreprintedCode === 0) {
                                                                    onSubmitForSavePatientRegistrationData(0);
                                                                } else {
                                                                    setShowPopup(6);

                                                                }
                                                            }}
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
                    <div className="fixed inset-0 px-2 lg:px-32  bg-black bg-opacity-50 z-50">
                        <div className="w-full lg:mx-2  mt-10 bg-white rounded-lg shadow-2xl animate-slideDown pb-3">

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
                                                    value={editInfoData?.mobileNo || ''}
                                                    onChange={(e) => {
                                                        handelOnChangeEditInfo(e)
                                                    }}
                                                    maxLength={10}
                                                    label="Mobile No."
                                                    isMandatory={patientRegistrationForEditInfoDataError?.mobileNo}
                                                />
                                            </div>

                                            <div className='relative flex-1 '>
                                                <CustomDropdown
                                                    name="title_id"
                                                    label="Select Title"
                                                    value={editInfoData?.title_id}
                                                    options={[
                                                        { label: 'Select Option', value: 0, disabled: true },
                                                        ...allTitleData?.map(item => ({
                                                            label: item.title,
                                                            value: item.id,
                                                        })),
                                                    ]}
                                                    onChange={(e) => handelOnChangeEditInfo(e)}
                                                    defaultIndex={0}
                                                    activeTheme={activeTheme}
                                                    isMandatory={patientRegistrationForEditInfoDataError?.title_id}
                                                />

                                            </div>
                                        </div>


                                        <div className='relative flex-1'>
                                            <CustomTextBox
                                                type="propercase"
                                                name="name"
                                                value={editInfoData?.name || ''}
                                                onChange={(e) => handelOnChangeEditInfo(e)}
                                                label="Name"
                                                isDisabled={false}
                                                isMandatory={patientRegistrationForEditInfoDataError?.name}
                                            />
                                        </div>

                                        <div className='flex gap-[0.25rem]'>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="years"
                                                    name="ageYear"
                                                    value={editInfoData?.ageYear || ''}
                                                    onChange={(e) => handelOnChangeEditInfo(e)}
                                                    label="Years"
                                                    isDisabled={false}
                                                    maxLength={3}
                                                    allowSpecialChars={false}
                                                    isMandatory={patientRegistrationForEditInfoDataError?.ageYear}

                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="months"
                                                    name="ageMonth"
                                                    value={editInfoData?.ageMonth || ''}
                                                    onChange={(e) => handelOnChangeEditInfo(e)}
                                                    label="Months"
                                                    isDisabled={false}
                                                    maxLength={2}
                                                    allowSpecialChars={false}
                                                    isMandatory={patientRegistrationForEditInfoDataError?.ageMonth}

                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="days"
                                                    name="ageDay"
                                                    value={editInfoData?.ageDay || ''}
                                                    onChange={(e) => handelOnChangeEditInfo(e)}
                                                    label="Days"
                                                    isDisabled={false}
                                                    maxLength={2}
                                                    allowSpecialChars={false}
                                                    isMandatory={patientRegistrationForEditInfoDataError?.ageDay}
                                                />

                                            </div>

                                        </div>


                                        <div className='flex gap-[0.25rem]'>

                                            <div className='relative flex-1'>
                                                <DatePicker
                                                    id="dob"
                                                    name="dob"
                                                    value={editInfoData?.dob || ''}
                                                    onChange={(e) => handelOnChangeEditInfo(e)}
                                                    placeholder=" "
                                                    label="Dob"
                                                    activeTheme={activeTheme}
                                                    //isDisabled={false}
                                                    isMandatory={patientRegistrationForEditInfoDataError?.dob}
                                                    currentDate={new Date()} // Current date: today
                                                    maxDate={new Date(2025, 11, 31)}
                                                    showTime={false}
                                                    showBigerCalandar={true}
                                                />
                                            </div>

                                            <div className='relative flex-1 '>
                                                <CustomDropdown
                                                    name="gender"
                                                    label="Select Gender"
                                                    value={editInfoData?.gender || ''}
                                                    options={[
                                                        { label: 'Select Option', value: '', disabled: true },
                                                        { label: 'Male', value: 'M' },
                                                        { label: 'Female', value: 'F' },
                                                        { label: 'Transgender', value: 'T' },
                                                    ]}
                                                    onChange={(e) => handelOnChangeEditInfo(e)}
                                                    defaultIndex={0}
                                                    activeTheme={activeTheme}
                                                    isMandatory={patientRegistrationForEditInfoDataError?.gender}
                                                />

                                            </div>
                                        </div>


                                        <div className="relative flex-1">
                                            <CustomEmailInput
                                                name="emailId"
                                                value={editInfoData?.emailId}
                                                onChange={(e) => handelOnChangeEditInfo(e)}
                                                label="Email"
                                                isMandatory={patientRegistrationForEditInfoDataError?.emailId}
                                            />
                                        </div>


                                        {/* <div className='relative flex-1'>
                                            <DatePicker
                                                id="collectionDateAndTime"
                                                name="collectionDateAndTime"
                                                value={editInfoData?.collectionDateAndTime || ''}
                                                onChange={(e) => handelOnChangeEditInfo(e)}
                                                placeholder=" "
                                                label="Collection Date & Time"
                                                activeTheme={activeTheme}
                                                //isDisabled={false}
                                                isMandatory={!Boolean(editInfoData?.dob)}
                                                currentDate={new Date()} // Current date: today

                                                showTime={true}
                                                showBigerCalandar={false}
                                            />

                                        </div> */}




                                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                            <div className="relative flex-1">
                                                <CustomSearchInputFields
                                                    id="refID1"
                                                    name="refID1"
                                                    label="Refer Dr."
                                                    value={editInfoData?.refID1 || { doctorId: "", doctorName: "" }} // Ensure an object is passed
                                                    options={allReferData}
                                                    onChange={(e) => {
                                                        // const { name, value } = e.target;
                                                        // seteditInfoData((prev) => ({
                                                        //     ...prev,
                                                        //     [name]: value, // Store entire selected object
                                                        // }));
                                                        handelOnChangeEditInfo(e)
                                                    }}
                                                    filterText="No records found"
                                                    placeholder=" "
                                                    searchWithName="doctorName"
                                                    uniqueKey="doctorId"
                                                    activeTheme={activeTheme}
                                                    isMandatory={patientRegistrationForEditInfoDataError?.refID1}
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
                                                value={editInfoData?.refID2}
                                                options={allReferData}
                                                onChange={(e) => handelOnChangeEditInfo(e)}
                                                filterText="No records found"
                                                placeholder=" "
                                                searchWithName='doctorName'
                                                uniqueKey='doctorId'
                                                activeTheme={activeTheme}
                                                isMandatory={patientRegistrationForEditInfoDataError?.refID2}
                                            />
                                        </div>



                                        <div className="relative flex-1">
                                            <CustomTextBox
                                                type='allCharacters'
                                                name='address'
                                                value={editInfoData?.address}
                                                placeholder=' '
                                                allowSpecialChars={true}
                                                onChange={(e) => handelOnChangeEditInfo(e)}
                                                label='Address'
                                                isMandatory={patientRegistrationForEditInfoDataError?.address}
                                            />
                                        </div>


                                        <div className='relative flex-1'>
                                            <CustomNumberInput
                                                type="pinCode"
                                                name="pinCode"
                                                value={editInfoData?.pinCode || ''}
                                                onChange={(e) => {
                                                    handelOnChangeEditInfo(e)
                                                }}
                                                maxLength={6}
                                                label="Pin Code"
                                                isMandatory={patientRegistrationForEditInfoDataError?.pinCode}
                                            />
                                        </div>

                                        {/* Refer Lab/Hospital */}
                                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                            <div className="relative flex-1">

                                                <CustomSearchInputFields
                                                    id="otherLabReferID"
                                                    name="otherLabReferID"
                                                    label="Refer Lab/Hospital"
                                                    value={editInfoData?.otherLabReferID || null} // Pass the selected object instead of just ID
                                                    options={allLabReferData.map(({ doctorId, doctorName }) => ({
                                                        otherLabReferID: doctorId,
                                                        otherLabRefer: doctorName
                                                    }))}
                                                    onChange={(e) => handelOnChangeEditInfo(e)}
                                                    filterText="No records found"
                                                    placeholder=" "
                                                    searchWithName="otherLabRefer"
                                                    uniqueKey="otherLabReferID"
                                                    activeTheme={activeTheme}
                                                    isMandatory={patientRegistrationForEditInfoDataError?.otherLabReferID}
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
                                                value={editInfoData?.uploadDocument}
                                                handelImageChange={handelImageChangeForEditInfo}
                                                activeTheme={activeTheme}
                                                isMandatory={patientRegistrationForEditInfoDataError?.uploadDocument}
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
                                                    onClick={() => onSubmitForSaveEditInfoData()} // Pass button number to handler
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
                        <div className="w-full  mt-10 bg-white rounded-lg shadow-2xl animate-slideDown pb-3">

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
                                                    value={editTestData?.mobileNo || ''}
                                                    onChange={(e) => {
                                                        handelOnChangeEditTest(e)
                                                    }}
                                                    maxLength={10}
                                                    label="Mobile No."
                                                    readOnly={true}
                                                    isMandatory={patientRegistrationForEditTestDataError?.mobileNo}
                                                />
                                            </div>

                                            <div className='relative flex-1 '>
                                                <CustomDropdown
                                                    name="title_id"
                                                    label="Select Title"
                                                    value={editTestData?.title_id}
                                                    options={[
                                                        { label: 'Select Option', value: 0, disabled: true },
                                                        ...allTitleData?.map(item => ({
                                                            label: item.title,
                                                            value: item.id,
                                                        })),
                                                    ]}
                                                    onChange={(e) => handelOnChangeEditTest(e)}
                                                    defaultIndex={0}
                                                    activeTheme={activeTheme}
                                                    readOnly={true}
                                                    isMandatory={patientRegistrationForEditTestDataError?.title_id}
                                                />

                                            </div>
                                        </div>


                                        <div className='relative flex-1'>
                                            <CustomTextBox
                                                type="propercase"
                                                name="name"
                                                value={editTestData?.name || ''}
                                                onChange={(e) => handelOnChangeEditTest(e)}
                                                label="Name"
                                                readOnly={true}
                                                isMandatory={patientRegistrationForEditTestDataError?.name}
                                            />
                                        </div>


                                        <div className='flex gap-[0.25rem]'>


                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="years"
                                                    name="ageYear"
                                                    value={editTestData?.ageYear || ''}
                                                    onChange={(e) => handelOnChangeEditTest(e)}
                                                    label="Years"
                                                    isDisabled={false}
                                                    maxLength={3}
                                                    allowSpecialChars={false}
                                                    readOnly={true}
                                                    isMandatory={patientRegistrationForEditTestDataError?.ageYear}

                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="months"
                                                    name="ageMonth"
                                                    value={editTestData?.ageMonth || ''}
                                                    onChange={(e) => handelOnChangeEditTest(e)}
                                                    label="Months"
                                                    isDisabled={false}
                                                    maxLength={2}
                                                    allowSpecialChars={false}
                                                    readOnly={true}
                                                    isMandatory={patientRegistrationForEditTestDataError?.ageMonth}

                                                />
                                            </div>

                                            <div className='relative flex-1'>
                                                <CustomTextBox
                                                    type="days"
                                                    name="ageDay"
                                                    value={editTestData?.ageDay || ''}
                                                    onChange={(e) => handelOnChangeEditTest(e)}
                                                    label="Days"
                                                    isDisabled={false}
                                                    maxLength={2}
                                                    readOnly={true}
                                                    isMandatory={patientRegistrationForEditTestDataError?.ageDay}

                                                />

                                            </div>

                                        </div>


                                        <div className='flex gap-[0.25rem]'>

                                            <div className='relative flex-1'>
                                                <DatePicker
                                                    id="dob"
                                                    name="dob"
                                                    value={editTestData?.dob || ''}
                                                    onChange={(e) => handelOnChangeEditTest(e)}
                                                    placeholder=" "
                                                    label="DOB"
                                                    activeTheme={activeTheme}
                                                    //isDisabled={false}
                                                    isMandatory={!Boolean(patientRegistrationData?.dob)}
                                                    currentDate={new Date()} // Current date: today
                                                    maxDate={new Date(2025, 11, 31)} // Maximum date: December 31, 2025
                                                    readOnly={true}
                                                    showTime={false}
                                                    showBigerCalandar={true}

                                                />
                                                {/* </div> */}

                                            </div>

                                            <div className='relative flex-1 '>
                                                <CustomDropdown
                                                    name="gender"
                                                    label="Select Gender"
                                                    value={editTestData?.gender || ''}
                                                    options={[
                                                        { label: 'Select Option', value: '', disabled: true },
                                                        { label: 'Male', value: 'M' },
                                                        { label: 'Female', value: 'F' },
                                                        { label: 'Transgender', value: 'T' },
                                                    ]}
                                                    onChange={(e) => handelOnChangeEditTest(e)}
                                                    defaultIndex={0}
                                                    activeTheme={activeTheme}
                                                    readOnly={true}
                                                    isMandatory={patientRegistrationForEditTestDataError?.gender}
                                                />

                                            </div>
                                        </div>


                                        <div className="relative flex-1">
                                            <CustomEmailInput
                                                name="emailId"
                                                value={editTestData?.emailId}
                                                onChange={(e) => handelOnChangeEditTest(e)}
                                                label="Email"
                                                readOnly={true}
                                                isMandatory={patientRegistrationForEditTestDataError?.emailId}
                                            />
                                        </div>

                                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                            <div className="relative flex-1">
                                                <CustomSearchInputFields
                                                    id="refID1"
                                                    name="refID1"
                                                    label="Refer Dr."
                                                    value={editTestData?.refID1}
                                                    options={allReferData}
                                                    onChange={handelOnChangeEditTest}
                                                    filterText="No records found"
                                                    placeholder=" "
                                                    searchWithName='doctorName'
                                                    readOnly={true}
                                                    uniqueKey='doctorId'
                                                    activeTheme={activeTheme}
                                                    isMandatory={patientRegistrationForEditTestDataError?.refID1}
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
                                                value={editTestData?.refID2}
                                                options={allReferData}
                                                onChange={handelOnChangeEditTest}
                                                filterText="No records found"
                                                placeholder=" "
                                                searchWithName='doctorName'
                                                uniqueKey='doctorId'
                                                readOnly={true}
                                                activeTheme={activeTheme}
                                                isMandatory={patientRegistrationForEditTestDataError?.refID2}
                                            />
                                        </div>


                                        {/* <div className='relative flex-1'>
                                            <DatePicker
                                                id="collectionDateAndTime"
                                                name="collectionDateAndTime"
                                                value={patientRegistrationData?.collectionDateAndTime || ''}
                                                onChange={(e) => handelOnChangeEditTest(e)}
                                                placeholder=" "
                                                label="Collection Date & Time"
                                                activeTheme={activeTheme}
                                                //isDisabled={false}
                                                isMandatory={!Boolean(patientRegistrationData?.dob)}
                                                currentDate={new Date()} // Current date: today

                                                showTime={true}
                                                showBigerCalandar={false}
                                            />


                                        </div> */}


                                        <div className="relative flex-1">
                                            <CustomTextBox
                                                // type="text", name, id, value, placeholder, onChange, label
                                                type='allCharacters'
                                                name='address'
                                                allowSpecialChars={true}
                                                value={editTestData?.address}
                                                placeholder=' '
                                                onChange={(e) => handelOnChangeEditTest(e)}
                                                label='Address'
                                                readOnly={true}
                                                isMandatory={patientRegistrationForEditTestDataError?.address}
                                            />
                                        </div>


                                        <div className='relative flex-1'>
                                            <CustomNumberInput
                                                type="pinCode"
                                                name="pinCode"
                                                value={editTestData?.pinCode || ''}
                                                onChange={(e) => {
                                                    handelOnChangeEditTest(e)
                                                }}
                                                maxLength={6}
                                                label="Pin Code"
                                                readOnly={true}
                                                isMandatory={patientRegistrationForEditTestDataError?.pinCode}
                                            />
                                        </div>

                                        {/* Refer Lab/Hospital */}
                                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>

                                            <div className="relative flex-1">
                                                <CustomSearchInputFields
                                                    id="otherLabReferID"
                                                    name="otherLabReferID"
                                                    label="Refer Lab/Hospital"
                                                    value={editTestData?.otherLabReferID || null} // Pass the selected object instead of just ID
                                                    options={allLabReferData.map(({ doctorId, doctorName }) => ({
                                                        otherLabReferID: doctorId,
                                                        otherLabRefer: doctorName
                                                    }))}
                                                    onChange={(e) => handelOnChangeEditTest(e)}
                                                    filterText="No records found"
                                                    placeholder=" "
                                                    searchWithName="otherLabRefer"
                                                    uniqueKey="otherLabReferID"
                                                    readOnly={true}
                                                    activeTheme={activeTheme}
                                                    isMandatory={patientRegistrationForEditTestDataError?.otherLabReferID}
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
                                                value={editTestData?.uploadDocument}
                                                handelImageChange={handelImageChangeForEditTest}
                                                activeTheme={activeTheme}
                                                readOnly={true}

                                            />
                                        </div>

                                        {/* <div className="relative flex-1">

                                            <CustomSearchInputFields
                                                id="itemId"
                                                name="itemId"
                                                label="Test Search By Name Or Code"
                                                value={editTestData?.itemId}
                                                options={allInvastigationData}
                                                onChange={handelOnChangePatientRegistration}
                                                filterText="No records found"
                                                placeholder=" "
                                                searchWithName='itemName'
                                                uniqueKey='itemId'
                                                activeTheme={activeTheme}
                                            />

                                        </div> */}


                                        <div className="relative flex-1">
                                            <CustomSearchInputFields
                                                id="itemId"
                                                name="itemId"
                                                label="Test Search By Name Or Code"
                                                value={editTestData?.itemId}
                                                options={allEditTestDataForInvasticationName}
                                                onChange={handelOnChangePatientRegistrationSelect}
                                                filterText="No records found"
                                                placeholder=" "
                                                readOnly={false}
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

                                                    loadingButtonNumber={4} // Unique number for the first button
                                                    onClick={() => onSubmitForSaveEditTestData()} // Pass button number to handler
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
                                        editTestData?.testData?.length !== 0 && (
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
                                                                {editTestData?.testData?.map((data, rowIndex) => {
                                                                    return (
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
                                                                                {data?.investigationName}
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
                                                                                {data?.rate}
                                                                            </td>
                                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor w-24">
                                                                                <input
                                                                                    type="text"
                                                                                    className="border-[1.5px] rounded outline-none px-1 w-full bg-gray-100 cursor-not-allowed"

                                                                                    value={editTestData?.testData?.find((item) => item?.itemId === data?.itemId)?.discount ?? 0}

                                                                                    readOnly

                                                                                    onChange={(e) =>
                                                                                        handleInputChangeEditTestDsicount(data?.itemId, e.target.value, "1")
                                                                                    }
                                                                                />
                                                                            </td>
                                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                                {(
                                                                                    (data?.netAmount || 0) -
                                                                                    parseFloat(
                                                                                        gridDataBarCodeandSampleType?.discount.find(
                                                                                            (item) => item.itemId === data?.itemId
                                                                                        )?.discount || 0
                                                                                    )
                                                                                ).toFixed(2)}
                                                                            </td>

                                                                            {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
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
                                                                        </td> */}

                                                                            {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
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
                                                                        </td> */}
                                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                                {data?.deliveryDate}
                                                                            </td>
                                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor text-center pt-1">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`checkbox-${rowIndex}`}
                                                                                    checked={data?.isUrgent === 1} // Checkbox checked if isUrgent is 1
                                                                                    onChange={(e) => handleCheckboxChangeEditTestCheckBo(rowIndex, e.target.checked)}
                                                                                />
                                                                            </td>
                                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">

                                                                                {(data?.isSampleCollected === "N" || data?.isSampleCollected === "R") && (
                                                                                    <RiDeleteBin2Fill
                                                                                        onClick={() => deleteinvestigationGridDataByForEditTestDataUsingItemId(rowIndex)}
                                                                                        className={`cursor-pointer ${data?.isRemoveItem === 1 ? 'text-gray-300' : 'text-red-500'}  text-base`}
                                                                                    />
                                                                                )}


                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
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
                                                                        {(editTestData?.testData || []).reduce((sum, data) => sum + (data?.mrp || 0), 0)}
                                                                    </td>

                                                                    <td className="px-4 h-5 text-xxs font-semibold">

                                                                        {editTestData?.testData.reduce(
                                                                            (sum, data) => sum + (data?.rate || 0),
                                                                            0
                                                                        )}
                                                                    </td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold">
                                                                        {editTestData?.testData?.reduce(
                                                                            (sum, item) => sum + (item?.discount || 0),
                                                                            0
                                                                        )}


                                                                    </td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold">
                                                                        {editTestData?.testData.reduce((sum, data) => sum + (data?.netAmount || 0), 0)}
                                                                    </td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    {/* <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td> */}
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

                                <div className="grid grid-cols-12 gap-2 mt-[2px] mb-1 mx-1 ">
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
                                                    {oldPatientId?.map((data, rowIndex) => (
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
                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                                                                onClick={() => onClickHandelOldPatientInfo(data?.patientId)}
                                                            >
                                                                Selected
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.patientId}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.name}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.ageShow}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.gender}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.mobileNo}
                                                            </td>

                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.emailId}
                                                            </td>


                                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                                                {data?.bookingDate}
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
                                                            Collect
                                                        </td>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {investigationGridData?.map((data, rowIndex) => {
                                                        // Declare barcodeValue inside the map function
                                                        const barcodeValue =
                                                            gridDataBarCodeandSampleType?.barCode.find(
                                                                (item) => item.itemId === data?.itemId
                                                            )?.name || "";

                                                        return (
                                                            <tr
                                                                key={rowIndex}
                                                                className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                                                                onMouseEnter={() => setIsHoveredTable(rowIndex)}
                                                                onMouseLeave={() => setIsHoveredTable(null)}
                                                                style={{
                                                                    background: isHoveredTable === rowIndex ? activeTheme?.subMenuColor : undefined,
                                                                }}
                                                            >
                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "10%" }}>
                                                                    {data?.itemName}
                                                                </td>

                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "3%" }}>
                                                                    <select
                                                                        className="border rounded px-1 w-full outline-none"
                                                                        onChange={(e) => handleSampleTypeChange(e, rowIndex, data?.itemId)}
                                                                        defaultValue={data?.sampleTypeName?.[0] || 0} // Set to the first value in the array
                                                                    >
                                                                        <option value={0} disabled hidden className="text-gray-400">
                                                                            Select Option
                                                                        </option>
                                                                        {data?.sampleTypeName?.map((item, index) => (
                                                                            <option key={index} value={item}>
                                                                                {item}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                </td>

                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "3%" }}>
                                                                    <form autoComplete='off'>
                                                                        <CustomTextBox
                                                                            type="barcode"
                                                                            name="barCode"
                                                                            maxLength={12}
                                                                            value={barcodeValue || ""}

                                                                            // readOnly={patientWiseBarcode}

                                                                            onChange={(e) => handleInputChangeForPopUpGridData(data?.itemId, e.target.value)}
                                                                            placeholder=" "
                                                                            label="Barcode"
                                                                            showLabel='false'
                                                                        />
                                                                    </form>
                                                                </td>

                                                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "3%" }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={checkedItems[data?.itemId] || false} // Use updated state
                                                                        onChange={() => handleCheckboxChange123(data?.itemId)} // Allow manual toggle
                                                                    />
                                                                </td>


                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                </div>

                                {/* {
                                    console.log(patientWiseBarcode)

                                } */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mb-1 mx-1">
                                    <div className="relative flex-1"></div>
                                    <div className="relative flex-1"></div>
                                    <div className="relative flex-1"></div>
                                    <div
                                        className={`relative flex-1 overflow-hidden cursor-pointer flex items-center gap-1 w-full rounded-md pl-2 text-xxxs h-[1.6rem] font-semibold ${patientWiseBarcode ? 'opacity-60 cursor-not-allowed' : 'opacity-100'} `}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                        type="button"
                                        data-ripple-light="true"
                                        onClick={() => {
                                            if (patientWiseBarcode === '0') {
                                                handelToUpdatePatientWiseBarcode();
                                            }
                                        }
                                        } // Toggle state on div click
                                    >
                                        <input
                                            type="checkbox"
                                            name="patientWiseBarcode"
                                            checked={patientWiseBarcode} // Bind checked state
                                            readOnly // Prevent direct interaction with the checkbox
                                        />
                                        <div className=''>
                                            Patient wise barcode
                                        </div>
                                    </div>

                                    <div className="relative flex-1">
                                        {/* <CustomeNormalButton activeTheme={activeTheme} text='' /> */}
                                        <CustomFormButton
                                            activeTheme={activeTheme}
                                            text="Collect & Save"
                                            icon={FaSpinner}
                                            isButtonClick={isButtonClick}
                                            loadingButtonNumber={5} // Unique number for the first button
                                            onClick={() => onSubmitForSavePatientRegistrationData(1)} // Pass button number to handler
                                        />
                                    </div>

                                    <div className="relative flex-1">
                                        <CustomFormButton
                                            activeTheme={activeTheme}
                                            text="Recive & Save"
                                            icon={FaSpinner}
                                            isButtonClick={isButtonClick}
                                            loadingButtonNumber={5} // Unique number for the first button
                                            onClick={() => onSubmitForSavePatientRegistrationData(2)} // Pass button number to handler
                                        />
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