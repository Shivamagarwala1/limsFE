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
import { getAllCentreApi, getAllEmployeeApi, getGridDataBasedOnPatientRecordData, getSearchBtnColorCodeInPatientRecordApi, handelDownloadCashReceiptApi, handelDownloadInfoOrDocumentApi, handelDownloadMRPreceiptApi } from "../../../../service/service";
import CustomDropdown from "../../../global/CustomDropdown";
import { useFormattedDate } from "../../../customehook/useDateTimeFormate";
import { DatePicker } from "../../../global/DatePicker";
import { toast } from "react-toastify";
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import GridDataDetails from '../../../global/GridDataDetails';
import useRippleEffect from "../../../customehook/useRippleEffect";
import CustomeSearchInputFields from "../../../global/CustomeSearchInputFields";
import { patientRecordHeader } from "../../../listData/listData";
import CustomFormButton from "../../../global/CustomFormButton";

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
        console.log(response?.data);
        
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error);

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
            {allPatientRecordData?.map((data, index) => (
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
                  {index + 1}
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
                  {data?.paidAmount}
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
                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                      style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                      <FaRupeeSign />
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
            ))}
          </tbody>
        </CustomDynamicTable >
      </div >

    </>




  );




}
