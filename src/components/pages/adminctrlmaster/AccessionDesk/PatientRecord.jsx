import React, { useEffect, useState } from "react";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { useGetData } from "../../../../service/apiService";
import { ImCross } from "react-icons/im";
import { FaDownload, FaFilePdf, FaRupeeSign, FaSpinner } from "react-icons/fa";
import "./ReportDispatch.css";
import {
  InvestigationRemarkPopupModal,
  RejectPopupModal,
} from "../../../../Custom Components/PopupModal";
import { setLocal } from "usehoks";
import { FaCircleInfo } from "react-icons/fa6";
import { RiBillLine } from "react-icons/ri";
import FormHeader from "../../../global/FormHeader";
import CustomSearchInputFields from "../../../global/CustomSearchDropdown";
import { getAllBankNameApi, getAllCentreApi, getAllEmployeeApi, getGridDataBasedOnPatientRecordData, getSearchBtnColorCodeInPatientRecordApi, handelDownloadCashReceiptApi, handelDownloadInfoOrDocumentApi, handelDownloadMRPreceiptApi, usePostData, useRetrieveData } from "../../../../service/service";
import CustomDropdown from "../../../global/CustomDropdown";
import { useFormattedDate } from "../../../customehook/useDateTimeFormate";
import { DatePicker } from "../../../global/DatePicker";
import { toast } from "react-toastify";
import CustomMultiSelectDropdown from '../../../global/CustomMultiSelectDropdown'
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import GridDataDetails from '../../../global/GridDataDetails';
import useRippleEffect from "../../../customehook/useRippleEffect";
import CustomeSearchInputFields from "../../../global/CustomeSearchInputFields";
import { patientRecordHeader, patientRegistrationPaymentMode, paymentModes } from "../../../listData/listData";
import CustomFormButton from "../../../global/CustomFormButton";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbCoinRupeeFilled } from "react-icons/tb";
import CustomSmallPopup from "../../../global/CustomSmallPopup";
import CustomFormButtonWithLoading from "../../../global/CustomFormButtonWithLoading";
import Payment from "../../payment/Payment";
import CustomPopupWithResponsive from "../../../global/CustomPopupWithResponsive";


export default function PatientRecord() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  // const { formRef, getValues, setValues } = useFormHandler();
  // const [RejectPopup, setRejectPopup] = useState(false);
  // const [RemarkPopup, setRemarkPopup] = useState(false);
  // const [selectedCenter, setSelectedCenter] = useState([]);
  // const AllCenterData = useGetData();
  // useEffect(() => {
  //   AllCenterData?.fetchData(
  //     "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
  //   );
  //   // console.log(AllCenterData);
  // }, []);
  // const columns = [
  //   { field: "id", headerName: "Sr. No", width: 20 },
  //   {
  //     field: `BookingDate`,
  //     headerName: `Booking Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `VisiotId`,
  //     headerName: `Visiter Id`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Barcode`,
  //     headerName: `Barcode`,
  //     flex: 1,
  //   },
  //   {
  //     field: `VisitorName`,
  //     headerName: `Visitor Name`,
  //     flex: 1,
  //   },
  //   {
  //     field: `AgeGender`,
  //     headerName: `Age/Gender`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Mobile`,
  //     headerName: `Mobile`,
  //     flex: 1,
  //   },
  //   {
  //     field: `AgeSex`,
  //     headerName: `Age/Sex`,
  //     flex: 1,
  //   },
  //   {
  //     field: `RefDoctor`,
  //     headerName: `Ref. Doctor`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Centre`,
  //     headerName: `Centre`,
  //     flex: 1,
  //   },
  //   {
  //     field: `RateType`,
  //     headerName: `Rate Type`,
  //     flex: 1,
  //   },
  //   {
  //     field: `RegBy`,
  //     headerName: `Reg. By`,
  //     flex: 1,
  //   },

  //   {
  //     field: `GrossAmount`,
  //     headerName: `Gross Amount`,
  //     flex: 1,
  //   },
  //   {
  //     field: `DisAmount`,
  //     headerName: `Dis. Amount`,
  //     flex: 1,
  //   },
  //   {
  //     field: `NetAmount`,
  //     headerName: `Net. Amount`,
  //     flex: 1,
  //   },
  //   {
  //     field: `PaidAmount`,
  //     headerName: `Paid Amount`,
  //     flex: 1,
  //   },
  //   {
  //     field: `DueAmount`,
  //     headerName: `Due Amount`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Documents`,
  //     headerName: `Info/Documents`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div style={{ display: "flex", gap: "10px", fontSize: "15px" }}>
  //           <FaCircleInfo />
  //           <FaDownload />
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     headerName: `Settlement`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
  //           <FaRegFilePdf />
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     headerName: `Cash Recipt`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
  //           <FaRegMoneyBillAlt />
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     headerName: `MRP Recipt`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
  //           <RiBillLine />
  //         </div>
  //       );
  //     },
  //   },
  // ];
  // const row = [
  //   {
  //     id: 1,
  //     Centre: "105 - center 1",
  //     Department: "Nursing",
  //     RegId: "10993",
  //     VisiotId: "302",
  //     RateType: "Type 1",
  //     VisitorName: "John Doe",
  //     AgeGender: "25,Male",
  //     TestName: "CBC",
  //     Comments: "lorem ipsum",
  //     BookingDate: "11-Feb-2025",
  //     Barcode: "123456",
  //     Mobile: "9876543210",
  //     RefDoctor: "Dr. Smith",
  //     RefLab: "Lab A",
  //     RecDate: "10-Feb-2025",
  //     CreatedBy: "Admin",
  //     OutSourceLab: "Lab B",
  //     Remark: "No remarks",
  //     AgeSex: "23/male",
  //     GrossAmount: 1000,
  //     DisAmount: 100,
  //     NetAmount: 900,
  //     PaidAmount: 500,
  //     DueAmount: 400,
  //     RegBy: "Admin"
  //   },
  // ];

  const handleSubmit = () => { };


  //!===========================Anil code==========================
  const user = useSelector((state) => state.userSliceName?.user || null);

  const [patientRecordData, setPatientRecordData] = useState({
    centreIds: 0,
    fromDate: useFormattedDate(),
    toDate: useFormattedDate(),
    searchValue: '',
    userId: 0,
    status: '',
    empId: 0
  });
  const [isButtonClick, setIsButtonClick] = useState(0);

  const [allCentreData, setAllCentreData] = useState([]);
  const [allUserData, setAllUserData] = useState([]);
  const [allSearchBtnWithColor, setAllSearchBtnWithColor] = useState([]);
  const [allPatientRecordData, setAllPatientRecordData] = useState([]);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [loadingId, setLoadingId] = useState(0);
  const [showPopup, setShowPopup] = useState(0);
  const ammountData = useRetrieveData();

  const [settelmentData, setSettelmentData] = useState({
    selectCurrencyValue: '1',
    creditCardAmt: '',
    lastFoureDigit: '',
    bank_Id: 0,
    onlinewalletAmt: '',
    paymentModeId: 0,
    paidAmount: 0,
    balanceAmt: 0,
    centreId: 0,
    workOrderId: ''
  })
  const [paymentModeType, setPaymentModeType] = useState([{ value: '1', label: 'Cash' }]);
  const [patientRegistrationDataError, setPatientRegistrationDataError] = useState([]);
  const [allBankNameData, setAllBankNameData] = useState([]);
  const patientRecordPostData = usePostData();
  const [duePaymentAmt, setDuePaymentAmt] = useState({
    amount: 0,
    receipt: '',
    workorderId: '',
    centreID: 0,
    payType: '',
    transactionId: 0,
    dueAmtData: 0,
    paidAmount: 0
  });
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useRippleEffect();

  const handelOnChangePatientRecord = (e) => {
    setPatientRecordData((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    const getAllCentreData = async () => {
      try {
        const response = await getAllCentreApi();

        setAllCentreData(response);


      } catch (error) {
        toast.error(error?.message);
      }
    }
    getAllCentreData();


    const getAlluserData = async () => {

      try {
        const response = await getAllEmployeeApi();
        setAllUserData(response);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getAlluserData();


    const getAllSearcgBtnColor = async () => {

      try {
        const response = await getSearchBtnColorCodeInPatientRecordApi();
        setAllSearchBtnWithColor(response);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getAllSearcgBtnColor();


  }, [])


  const handleSearchPatientRecordData = async (status, loadId) => {

    setIsButtonClick(loadId);

    const updateData = {
      centreIds: patientRecordData?.centreIds ? [patientRecordData?.centreIds] : [],
      fromDate: patientRecordData?.fromDate,
      toDate: patientRecordData?.toDate,
      searchValue: patientRecordData?.searchValue,
      status: status,
      userId: patientRecordData?.userId,
      empId: parseInt(user?.employeeId)
    }



    try {
      const response = await getGridDataBasedOnPatientRecordData(updateData);
      if (response?.success) {
        setAllPatientRecordData(response?.data)

      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }

    setIsButtonClick(0);
    setLoadingId(0);
  }

  const handelDownloadCashReceipt = async (workId) => {

    try {
      const response = await handelDownloadCashReceiptApi(workId);
      const blob = new Blob([response.data], { type: response.headers["content-type"] });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Open in a new tab
      window.open(url, "_blank");

      // Optionally revoke the object URL later
      setTimeout(() => URL.revokeObjectURL(url), 10000);

    } catch (error) {
      toast.error(error?.message);
    }
  }


  //
  const handelDownloadMRPreceipt = async (workId) => {

    try {
      const response = await handelDownloadMRPreceiptApi(workId);
      const blob = new Blob([response.data], { type: response.headers["content-type"] });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Open in a new tab
      window.open(url, "_blank");

      // Optionally revoke the object URL later
      setTimeout(() => URL.revokeObjectURL(url), 10000);

    } catch (error) {
      toast.error(error?.message);
    }
  }

  //
  const handelDownloadInfoOrDocument = async (workId) => {

    try {
      const response = await handelDownloadInfoOrDocumentApi(workId);
      const blob = new Blob([response.data], { type: response.headers["content-type"] });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Open in a new tab
      window.open(url, "_blank");

      // Optionally revoke the object URL later
      setTimeout(() => URL.revokeObjectURL(url), 10000);

    } catch (error) {
      toast.error(error?.message);
    }
  }

  //!=================setelement data==================

  const handelOpenSettlementData = (data) => {

    setSettelmentData((preventData) => ({
      ...preventData,
      paidAmount: data?.paidAmount || 0,
      balanceAmt: data?.dueAmt || 0,
      centreId: data?.centreId,
      workOrderId: data?.workOrderId
    }))

    setShowPopup(1);

  }

  //calculate paid amt.
  useEffect(() => {
    // Calculate paidAmount dynamically
    const totalPaid =
      parseFloat(settelmentData.cashAmt || 0) +
      parseFloat(settelmentData.creditCardAmt || 0) +
      parseFloat(settelmentData.onlinewalletAmt || 0);

    //calculate the total net amt
    // const totaNetAmt = investigationGridData
    //     ? investigationGridData.reduce((sum, data) => sum + (parseInt(data?.netAmt) || 0), 0)
    //     : 0;

    // console.log(totaNetAmt);
    // 

    if (totalPaid > settelmentData?.grossAmount) {
      toast.error('Paid amount cannot exceed the total amount.');
      setSettelmentData((preventData) => ({
        ...preventData,
        balanceAmt: 0,
        paidAmount: 0
      }))
      return;
    }
    // Update paidAmount in state, ensuring it's a double (two decimal places)
    setSettelmentData((prevData) => ({
      ...prevData,
      paidAmount: parseFloat(totalPaid.toFixed(2)), // Ensures double value with 2 decimals
      balanceAmt: settelmentData?.balanceAmt - settelmentData?.cashAmt - settelmentData?.creditCardAmt - settelmentData?.onlinewalletAmt
    }));
  }, [
    settelmentData.cashAmt,
    settelmentData.creditCardAmt,
    settelmentData.onlinewalletAmt,
  ]);


  const handelOnChangeSelectCurrencyValue = (e) => {
    setSettelmentData((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    }));
  }

  const handelOnChangePaymentMode = (updatedSelectedItems) => {
    setPaymentModeType(updatedSelectedItems);
  };

  //validations
  const validateForm = () => {

    const errors = {};

    // Validate based on paymentModeType
    paymentModeType?.forEach((paymentMode) => {

      switch (paymentMode?.label) {

        case 'Debit/Credit Card':
          if (!settelmentData.creditCardAmt) {
            errors.creditCardAmt = true;
          }
          if (!settelmentData.lastFoureDigit) {
            errors.lastFoureDigit = true;
          }
          if (!settelmentData.bank_Id) {
            errors.bank_Id = true;
          }
          break;

        case 'UPI':
          if (!settelmentData.onlinewalletAmt) {
            errors.onlinewalletAmt = true;
          }
          break;

        default:
          break;
      }
    })

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
  }, [settelmentData, paymentModeType]);


  useEffect(() => {
    const getAllBankData = async () => {

      try {
        const response = await getAllBankNameApi();
        setAllBankNameData(response);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getAllBankData();
  }, [showPopup])


  const saveSettlementData = async (e) => {

    e.preventDefault();

    setIsButtonClick(2);

    if (!validateForm()) {
      toast.info("Please fill in all mandatory fields.");
      setIsButtonClick(0);
      return;
    }

    const addpaymentdetail = paymentModeType?.map((data) => ({

      "transactionId": 0,
      "transactionType": data?.paymentMode,
      "workOrderId": settelmentData?.workOrderId,
      "receiptNo": 0,
      "receivedAmt": 0,
      "cashAmt": data?.value === '1' ? parseFloat(settelmentData?.cashAmt) : 0,
      "creditCardAmt": data?.value === '2' ? parseFloat(settelmentData?.creditCardAmt) : 0,
      "creditCardNo": settelmentData?.lastFoureDigit,
      "chequeAmt": 0,
      "chequeNo": "",
      "onlinewalletAmt": parseInt(settelmentData?.onlinewalletAmt),
      "walletno": "",
      "nefTamt": 0,
      "bankName": data?.value === '2' ? allBankNameData.filter((data) => data?.id === settelmentData?.bank_Id)[0]?.bankName : '',
      "paymentModeId": parseInt(data?.value),
      "isCancel": 0,
      "cancelDate": "",
      "canceledBy": "",
      "cancelReason": "",
      "bookingCentreId": parseInt(settelmentData?.centreId),
      "settlementCentreID": 0,
      "receivedBy": user?.name,
      "receivedID": parseInt(user?.employeeId),
      "paidAmt": settelmentData?.paidAmount
    }))


    try {
      const response = await patientRecordPostData.postRequestData(`/tnx_Booking/SaveSettelmentDetail`, addpaymentdetail);

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


  //!==============payment data==============
  const getAmmountData = async (workOrderId, centreId, transactionId, paidAmount) => {

    try {
      const response = await ammountData.fetchDataFromApi(`/tnx_Booking/GetPendingPayment?workOrderId=${workOrderId}`);

      console.log(response);

      // setDuePaymentAmt((preventData) => ({
      //   ...preventData,
      //   workorderId: workOrderId,
      //   centreID: centreId
      // }));

      if (response?.data?.success) {
        setDuePaymentAmt((preventData) => ({
          ...preventData,
          workorderId: workOrderId,
          centreID: centreId,
          dueAmtData: response?.data?.data?.dueAmt,
          transactionId: transactionId,
          paidAmount: paidAmount
        }))
        setShowPopup(2);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  //function for due amt

  // Dynamically load the Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onSubmitForDueAmt = async () => {

    const updateData = {
      amount: (duePaymentAmt?.dueAmtData),
      receipt: 'welcome to imarsar',
      workorderId: duePaymentAmt?.workorderId,
      centreID: duePaymentAmt?.centreID,
      payType: 'Patient settelment'
    }

    try {
      const response = await patientRecordPostData.postRequestData('/centreInvoice/create-order', updateData);

      //handel payment load
      if (!scriptLoaded) {
        toast.error('Razorpay script is still loading. Please try again.')
        return;
      }

      const options = {
        key: import.meta.env.VITE_API_KEY, // Replace with your Razorpay key
        amount: duePaymentAmt?.dueAmtData, // Amount in paise (e.g., 100 paise = ₹1)
        currency: 'INR',
        name: 'Imarsar Infotech Pvt Ltd.',
        description: 'Test Transaction for 1 rs',
        order_id: response?.orderId, // Use the order ID generated by your backend
        handler: function (response) {

          verifyPayment(response);
        },
        prefill: {
          name: import.meta.env.VITE_API_PREFILL_NAME,
          email: import.meta.env.VITE_API_PREFILL_EMAIL,
          contact: import.meta.env.VITE_API_PREFILL_CONTACT,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Open the Razorpay payment modal
      const rzp = new window.Razorpay(options); // Use the global Razorpay object
      rzp.open();


    } catch (error) {
      toast.error(error?.message);
    }

  }


  const verifyPayment = async (response) => {

    const updatedData = {
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      signature: response.razorpay_signature,
    }


    try {

      const response = await patientRecordPostData.postRequestData('/centreInvoice/verify-payment', updatedData);

      toast.success(response.status);

      if (response.status === 'success') {

        const updatedData = {
          "transactionId": duePaymentAmt?.transactionId,
          "transactionType": "Online wallet",
          "workOrderId": duePaymentAmt?.workorderId,
          "receiptNo": 0,
          "receivedAmt": duePaymentAmt?.dueAmtData,
          "cashAmt": 0,
          "creditCardAmt": 0,
          "creditCardNo": "",
          "chequeAmt": 0,
          "chequeNo": "",
          "onlinewalletAmt": duePaymentAmt?.dueAmtData,
          "walletno": duePaymentAmt?.workorderId,
          "nefTamt": 0,
          "bankName": "",
          "paymentModeId": 3,
          "isCancel": 0,
          "cancelDate": "0001-01-01",
          "canceledBy": "",
          "cancelReason": "",
          "bookingCentreId": duePaymentAmt?.centreID,
          "settlementCentreID": parseInt(user?.defaultCenter),
          "receivedBy": user?.name,
          "receivedID": parseInt(user?.employeeId),
          "paidAmt": (duePaymentAmt?.paidAmount + duePaymentAmt?.dueAmtData)
        }

        console.log(updatedData);


        try {
          const response = await patientRecordPostData.postRequestData('/tnx_Booking/SaveSettelmentDetail', [updatedData]);


          console.log(response?.data);

          console.log(response?.data?.message);

          console.log(response?.data?.success);

          console.log(response);


          if (response?.data?.success) {
            toast.success(response?.data?.message);
            setShowPopup(2);
            await handleSearchPatientRecordData('', 1)
          } else {
            toast.error(response?.data?.message);
          }
        } catch (error) {
          toast.error(error?.message);
        }
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (

    <>
      {/* <div>
        {/* Header Section *
        <InvestigationRemarkPopupModal
          setShowPopup={setRemarkPopup}
          showPopup={RemarkPopup}
        />
        <RejectPopupModal setShowPopup={setRejectPopup} showPopup={RejectPopup} />
        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
          style={{ background: activeTheme?.blockColor }}
        >
          <div>
            <FontAwesomeIcon icon="fa-solid fa-house" />
          </div>
          <div>Patient Record</div>
        </div>

        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            <InputGenerator
              inputFields={[
                {
                  label: "Centre",
                  type: "select",
                  name: "centre",
                  dataOptions: AllCenterData?.data,
                },
                {
                  label: "From Date",
                  type: "customDateField",
                  name: "FromDate",
                },
                {
                  label: "To Date",
                  type: "customDateField",
                  name: "ToDate",
                },
                {
                  label: "Rate Type",
                  type: "select",
                  name: "RateType",
                  dataOptions: [],
                },
                {
                  label: "Search",
                  type: "text",
                  name: "Search",
                },
                {
                  label: "Barcode No.",
                  type: "text",
                  name: "Barcode",
                },
                {
                  label: "User",
                  type: "select",
                  name: "User",
                  dataOptions: [],
                },
              ]}
            />
            <div className="relative flex flex-1">
              <div className="relative flex-1 gap-1 flex justify-center items-center text-xs">
                <div
                  style={{ backgroundColor: "#d7cdc6" }}
                  className="w-5 h-5 bg-grey-300 rounded-full "
                ></div>
                Credit
              </div>
              <div className="relative flex-1 gap-1 flex justify-center items-center text-xs">
                <div
                  style={{ backgroundColor: "#6595ed" }}
                  className="w-5 h-5 bg-grey-300 rounded-full "
                ></div>
                Paid
              </div>
            </div>
            <div className="relative flex flex-1">
              <div className="relative flex-1 gap-1 flex justify-center items-center text-xs">
                <div
                  style={{ backgroundColor: "#ff6349" }}
                  className="w-5 h-5 bg-grey-300 rounded-full "
                ></div>
                Unpaid
              </div>
              <div className="relative flex-1 gap-1 flex justify-center items-center text-xs">
                <div
                  style={{ backgroundColor: "#fea501" }}
                  className="w-5 h-5 bg-grey-300 rounded-full "
                ></div>
                Partial Paid
              </div>
            </div>
            <SubmitButton text={"Search"} />
          </div>
        </form>

        <div style={{ height: "300px" }}>
          <DynamicTable
            rows={row}
            name="Patient Record Details"
            //   loading={loading}
            columns={columns}
            activeTheme={activeTheme}
          />
        </div>
      </div> */}

      {/* //!=====================Anil code============================ */}
      <FormHeader headerData='Patient Record' />

      <div>

        <form autoComplete='off'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

            <div className="relative flex-1">
              <CustomDropdown
                name="centreIds"
                label="Select Centre"
                value={patientRecordData?.centreIds}
                options={[
                  { label: 'Select Option', value: 0, disabled: true },
                  ...allCentreData?.map(item => ({
                    label: item.companyName,
                    value: item.centreId,
                  })),
                ]}
                onChange={(e) => handelOnChangePatientRecord(e)}
                defaultIndex={0}
                activeTheme={activeTheme}
              // isMandatory={patientRecordDataError?.centreId}
              />
            </div>

            <div className='relative flex-1'>
              <DatePicker
                id="fromDate"
                name="fromDate"
                value={patientRecordData?.fromDate || ''}
                onChange={(e) => handelOnChangePatientRecord(e)}
                placeholder=" "
                label="From Date"
                activeTheme={activeTheme}

                currentDate={new Date()} // Current date: today
                maxDate={new Date(2025, 11, 31)}

              />
            </div>

            <div className='relative flex-1'>
              <DatePicker
                id="toDate"
                name="toDate"
                value={patientRecordData?.toDate || ''}
                onChange={(e) => handelOnChangePatientRecord(e)}
                placeholder=" "
                label="To Date"
                activeTheme={activeTheme}

                currentDate={new Date()} // Current date: today
                maxDate={new Date(2025, 11, 31)}

              />
            </div>

            <div className="relative flex-1">
              <CustomeSearchInputFields
                type="search"
                name="searchValue"
                value={patientRecordData?.searchValue || ''}
                onChange={(e) => handelOnChangePatientRecord(e)}
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    handleSearchPatientRecordData('', 1)
                  }
                }}

                label="Search By Visit Id or Patient name"
                isDisabled={false}
              />
            </div>


            <div className="relative flex-1">
              <CustomDropdown
                name="userId"
                label="Select User"
                value={patientRecordData?.userId}
                options={[
                  { label: 'Select Option', value: 0, disabled: true },
                  ...allUserData?.map(item => ({
                    label: `${item?.fName} ${item?.lName}`,
                    value: item.empId,
                  })),
                ]}
                onChange={(e) => handelOnChangePatientRecord(e)}
                defaultIndex={0}
                activeTheme={activeTheme}
              // isMandatory={patientRecordDataError?.centreId}
              />
            </div>


            <div className="flex gap-[0.25rem]">
              <div className="relative flex-1">

                <CustomFormButton
                  activeTheme={activeTheme}
                  text="Search"
                  icon={FaSpinner}
                  isButtonClick={isButtonClick}
                  loadingButtonNumber={1} // Unique number for the first button
                  onClick={() => handleSearchPatientRecordData('', 1)} // Pass button number to handler
                />

                {/* <CustomeNormalButton
                  text={'Search'}
                  activeTheme={activeTheme}
                  onClick={handleSearchPatientRecordData}val,status
                /> */}
              </div>

              <div className="relative flex-1">
              </div>
            </div>


          </div>

          {/* search btn data */}
          <div className="flex justify-between mx-1 lg:mx-2 ">
            {
              allSearchBtnWithColor?.map((data) => (
                <div key={data?.id}>
                  <button
                    type="button"
                    data-ripple-light="true"
                    className="relative overflow-hidden w-24 h-[1.6rem] my-1 rounded-md text-xxxs font-semibold flex justify-center items-center"
                    style={{ background: data?.colourCode }}
                    onClick={() => {
                      setLoadingId(data?.id)
                      if (data?.id === 13) handleSearchPatientRecordData("Paid", 2);
                      else if (data?.id === 14) handleSearchPatientRecordData("UnPaid", 2);
                      else if (data?.id === 15) handleSearchPatientRecordData("PartialPaid", 2);
                      else if (data?.id === 16) handleSearchPatientRecordData("Credit", 2);
                      else handleSearchPatientRecordData(); // Default case
                    }}
                  >
                    {
                      loadingId === data?.id ?
                        <FaSpinner className="text-xxs animate-spin" />
                        :
                        data?.contantName
                    }
                  </button>
                </div>
              ))
            }

          </div>

        </form>

      </div>

      <div>
        <GridDataDetails
          gridDataDetails={'Patient Record Details'}
        />


        <CustomDynamicTable columns={patientRecordHeader} activeTheme={activeTheme}>
          <tbody>
            {
              allPatientRecordData?.map((data, index) => {

                const colorCode = allSearchBtnWithColor.find((item) => item?.contantName === data?.status)?.colourCode

                return (
                  <tr
                    className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                      ? ''
                      : index % 2 === 0
                        ? 'bg-gray-100'
                        : 'bg-white'
                      }`}
                    key={index}
                    onMouseEnter={() => setIsHoveredTable(index)}
                    onMouseLeave={() => setIsHoveredTable(null)}
                    style={{
                      background:
                        isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                      // Hides scrollbar for IE/Edge
                    }}
                  >
                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                      <div className="flex gap-1 items-center justify-between">
                        <div>
                          {index + 1}
                        </div>
                        {/* <div className="w-2 h-2 rounded-full" style={{ background: colorCode }}>

                        </div> */}
                      </div>
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.bookingDate}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.workOrderId}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.name}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.age}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.mobileNo}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.refDoctor}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.centreName}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.ratetype}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.regBy}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.grossAmount}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.discount}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.netAmount}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >

                      <div style={{ background: colorCode }} className="text-center rounded-md">
                        {data?.paidAmount}
                      </div>
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.dueAmt}
                    </td>

                    <td className="border-b px-4 h-5 text-xs font-semibold text-gridTextColor" >
                      <div className="flex justify-start gap-5 items-startjustify-start text-xs">
                        <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                          style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                        >
                          <FaCircleInfo />
                        </div>
                        {
                          data?.documnet === 1 && (
                            <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                              style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                              onClick={() => handelDownloadInfoOrDocument(data?.workOrderId)}
                            >
                              <FaDownload />
                            </div>
                          )
                        }

                      </div>
                    </td>

                    <td className="border-b px-4 h-5 text-sm font-semibold">

                      <div className="flex justify-center items-center">
                        <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.dueAmt !== 0 || data?.status === 'UnPaid' || data?.status === 'Partial Paid' ? 'opacity-100' : 'cursor-not-allowed opacity-65'}`}
                          style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                          onClick={() => {
                            if (data?.dueAmt !== 0 || data?.status === 'UnPaid' || data?.status === 'Partial Paid')
                              handelOpenSettlementData(data)
                          }}
                        >
                          <FaRupeeSign />
                        </div>
                      </div>


                    </td>

                    {/*   */}
                    <td className="border-b px-4 h-5 text-sm font-semibold">


                      <div className="flex justify-center items-center">
                        <div
                          className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.dueAmt !== 0 || data?.status === 'UnPaid' || data?.status === 'Partial Paid' ? 'opacity-100' : 'cursor-not-allowed opacity-65'}`}
                          style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                          onClick={() => {
                            if (data?.dueAmt !== 0 || data?.status === 'UnPaid' || data?.status === 'Partial Paid') {

                              getAmmountData(data?.workOrderId, data?.centreId, data?.transactionId, data?.paidAmount)

                            }
                          }}
                        >
                          <TbCoinRupeeFilled />
                        </div>
                      </div>



                    </td>

                    <td className="border-b px-4 h-5 text-sm font-semibold">
                      <div className="flex justify-center items-center">

                        <div
                          className="w-5 h-5 flex justify-center items-center rounded-sm"
                          style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                          onClick={() => handelDownloadCashReceipt(data?.workOrderId)}
                        >
                          <FaFilePdf />
                        </div>
                      </div>
                    </td>

                    <td className="border-b px-4 h-5 text-sm font-semibold">
                      <div className="flex justify-center items-center">

                        <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                          style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                          onClick={() => handelDownloadMRPreceipt(data?.workOrderId)}
                        >
                          <FaFilePdf />

                        </div>
                      </div>
                    </td>

                  </tr>
                )
              }
              )
            }
          </tbody>
        </CustomDynamicTable >
      </div >


      {
        showPopup === 1 && (
          <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
            <div className="w-80 max-h-[50vh] md:w-[800px] md:max-h-[40vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

              <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
              >
                <div className=" font-semibold"
                  style={{ color: activeTheme?.iconColor }}
                >
                  Edit Settelment

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
                  <div>Settelment  Details</div>
                </div>

                <form autoComplete='off' onSubmit={saveSettlementData}>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">

                    <div className="relative flex-1">
                      <CustomDropdown
                        name="selectCurrencyValue"
                        label="Select Currency"
                        value={settelmentData?.selectCurrencyValue || ''}
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
                        value={settelmentData?.paidAmount || 0}
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
                        value={settelmentData?.balanceAmt || ''}
                        placeholder=" "
                        className={`inputPeerField peer border-borderColor            focus:outline-none `}
                        readOnly
                      />
                      <label htmlFor="balanceAmt" className="menuPeerLevel">
                        Balance Amt.
                      </label>
                    </div>



                    <div className="flex gap-[0.25rem]">
                      <div className="relative flex-1">
                        <CustomFormButtonWithLoading
                          activeTheme={activeTheme}
                          text="Update"
                          icon={FaSpinner}
                          isButtonClick={isButtonClick}
                          loadingButtonNumber={2} // Unique number for the first button
                        />
                      </div>

                      <div className="relative flex-1"></div>
                    </div>
                  </div>

                  {/* grid data */}
                  <CustomDynamicTable columns={patientRegistrationPaymentMode} activeTheme={activeTheme} >
                    <tbody>
                      <tr className="cursor-pointer whitespace-nowrap">
                        {/* Paid Amount */}
                        <td className="text-xxs font-semibold text-gridTextColor relative w-1/6 px-1">
                          <CustomTextBox
                            type="decimalpositive"
                            name="cashAmt"
                            value={settelmentData?.cashAmt || ''}
                            onChange={(e) => handelOnChangeSelectCurrencyValue(e)}
                            label="Paid Amt."
                            isDisabled={!paymentModeType.some((item) => item.value === "1")}
                            isMandatory={patientRegistrationDataError.cashAmt}
                            readOnly={!paymentModeType.some((item) => item.value === "1")}
                            showLabel={true}
                          />
                        </td>

                        {/* Partial Paid/Debit Card Amount */}
                        <td className="text-xxs font-semibold text-gridTextColor relative w-1/6 px-1">
                          <CustomTextBox
                            type="decimalpositive"
                            name="creditCardAmt"
                            value={settelmentData?.creditCardAmt || ''}
                            onChange={(e) => handelOnChangeSelectCurrencyValue(e)}
                            label="Credit Card Amt."
                            isDisabled={!paymentModeType.some((item) => item.value === "2")}
                            isMandatory={patientRegistrationDataError.creditCardAmt}
                            readOnly={!paymentModeType.some((item) => item.value === "2")}
                            showLabel={true}
                          />
                        </td>

                        {/* Last 4 Digits */}
                        <td className="text-xxs font-semibold text-gridTextColor relative w-1/6 px-1">
                          <CustomTextBox
                            type="positive"
                            name="lastFoureDigit"
                            value={settelmentData?.lastFoureDigit || ''}
                            onChange={(e) => handelOnChangeSelectCurrencyValue(e)}
                            label="Last 4 digits"
                            isDisabled={!paymentModeType.some((item) => item.value === "2")}
                            isMandatory={patientRegistrationDataError.lastFoureDigit}
                            maxLength={4}
                            readOnly={!paymentModeType.some((item) => item.value === "2")}
                            showLabel={true}
                          />
                        </td>

                        {/* Select Bank */}
                        <td className="text-xxs font-semibold text-gridTextColor relative w-1/6 px-1">
                          <CustomDropdown
                            name="bank_Id"
                            label="Select Bank"
                            value={settelmentData?.bank_Id}
                            options={[
                              { label: 'Select Bank Name', value: 0, disabled: true },
                              ...allBankNameData?.map(item => ({
                                label: item.bankName,
                                value: parseInt(item.id),
                              })),
                            ]}
                            onChange={(e) => handelOnChangeSelectCurrencyValue(e)}
                            defaultIndex={0}
                            isDisabled={!paymentModeType.some((item) => item.value === "2")}
                            activeTheme={activeTheme}
                            showLabel={false}
                            isMandatory={patientRegistrationDataError?.bank_Id}
                          />
                        </td>

                        {/* UPI Amount */}
                        <td className="text-xxs font-semibold text-gridTextColor relative w-1/6 px-1">
                          <CustomTextBox
                            type="decimalpositive"
                            name="onlinewalletAmt"
                            value={settelmentData?.onlinewalletAmt || ''}
                            onChange={(e) => handelOnChangeSelectCurrencyValue(e)}
                            label="Last 4 digits"
                            isDisabled={!paymentModeType.some((item) => item.value === "3")}
                            isMandatory={patientRegistrationDataError.onlinewalletAmt}

                            readOnly={!paymentModeType.some((item) => item.value === "3")}
                            showLabel={true}
                          />
                        </td>

                        {/* UPI Type */}
                        <td className="text-xxs font-semibold text-gridTextColor relative w-1/6 px-1">
                          <CustomDropdown
                            name="paymentModeId"
                            label="Select Bank"
                            value={settelmentData?.paymentModeId}
                            options={[
                              { label: 'Select Payment Mode', value: 0, disabled: true },
                              { label: 'Paytm', value: 1, },
                              { label: 'PhonePay', value: 2, },
                              { label: 'BHIM', value: 3, },
                              { label: 'GooglePay', value: 4, },
                            ]}
                            onChange={(e) => handelOnChangeSelectCurrencyValue(e)}
                            defaultIndex={0}
                            isDisabled={!paymentModeType.some((item) => item.value === "3")}
                            activeTheme={activeTheme}
                            showLabel={false}
                            isMandatory={patientRegistrationDataError?.paymentModeId}
                          />

                        </td>
                      </tr>
                    </tbody>

                  </CustomDynamicTable>



                </form>

              </div>

              {/* footer */}
              <div
                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                style={{
                  borderImage: activeTheme?.menuColor,
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              ></div>
            </div>
          </div>
        )
      }


      {
        showPopup === 2 && (
          <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Recharge your wallet'} setShowPopup={setShowPopup} popuptype={'medium'} >
            <Payment showAmt={false} lable={'Due Ammount : '}
              amount={duePaymentAmt?.dueAmtData}
              onSubmitForAmt={onSubmitForDueAmt}
            />
          </CustomPopupWithResponsive>
        )
      }

    </>
  );
}
