import React, { useEffect, useState } from "react";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";

import { FaDownload, FaSpinner } from "react-icons/fa";
import "./ReportDispatch.css";
import {
  InvestigationRemarkPopupModal,
  RejectPopupModal,
} from "../../../../Custom Components/PopupModal";
import { setLocal } from "usehoks";
import { FaCircleInfo, FaSquareWhatsapp } from "react-icons/fa6";
import { usePostData, useRetrieveData, viewPrintreportTrackingApi } from "../../../../service/service";
import CustomDropdown from "../../../global/CustomDropdown";
import { DatePicker } from "../../../global/DatePicker";
import { useFormattedDate, useFormattedDateTime } from "../../../customehook/useDateTimeFormate";
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomNormalFormButton from "../../../global/CustomNormalFormButton";
import { toast } from "react-toastify";
import CustomSearchInputFields from "../../../global/CustomSearchDropdown";
import CustomMultiSelectDropdown from '../../../global/CustomMultiSelectDropdown';
import FormHeader from "../../../global/FormHeader";
import GridDataDetails from '../../../global/GridDataDetails';
import CustomDynamicTable from '../../../global/CustomDynamicTable';
import { reportDispatchHeaderData, resultTrackForPatientInformation } from "../../../listData/listData";
import { MdAddCircleOutline, MdOutlineMailOutline } from "react-icons/md";
import { BiSolidLike } from 'react-icons/bi'
import CustomLoadingPage from '../../../global/CustomLoadingPage'
import { IoAlertCircleOutline } from "react-icons/io5";
import CustomFormButton from "../../../global/CustomFormButton";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CustomFormButtonWithLoading from "../../../global/CustomFormButtonWithLoading";
import { RiDeleteBin5Fill } from "react-icons/ri";
import LegandaryButton from "../../../global/LegendButtonsForFilter";
export default function ReportDispatch() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.userSliceName?.user || null);


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
  //     field: `RefDoctor`,
  //     headerName: `Ref. Doctor`,
  //     flex: 1,
  //   },
  //   {
  //     field: `RefLab`,
  //     headerName: `Ref. Lab`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Centre`,
  //     headerName: `Centre`,
  //     flex: 1,
  //   },
  //   {
  //     field: `TestName`,
  //     headerName: `Test Name`,
  //     flex: 1,
  //   },
  //   {
  //     field: `RecDate`,
  //     headerName: `Rec. Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Comments`,
  //     headerName: `Comments`,
  //     flex: 1,
  //   },
  //   {
  //     field: `CreatedBy`,
  //     headerName: `Created By`,
  //     flex: 1,
  //   },
  //   {
  //     headerName: `Print`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div style={{ display: "flex", gap: "20px" }}>
  //           <input type="checkbox" />
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: `Documents`,
  //     headerName: `Info/Documents`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div style={{ display: "flex", gap: "10px" }}>
  //           <FaCircleInfo />
  //           <FaDownload />
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: `OutSourceLab`,
  //     headerName: `Out Source Lab`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Remark`,
  //     headerName: `Remark`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       // console.log(params.row)
  //       return (
  //         <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
  //           <SubmitButton
  //             submit={false}
  //             text={"+"}
  //             callBack={() => {
  //               setLocal("testName", params?.row?.TestName);
  //               setRemarkPopup(true);
  //             }}
  //             style={{ width: "30px", fontSize: "15px" }}
  //           />
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
  //   },
  // ];

  // !===============anil code=====================
  const [reportDispatchData, setRecordDispatchData] = useState({
    centreId: 0,
    fromDate: useFormattedDate(),
    toDate: useFormattedDate(),
    searchType: 'tbi.sampleReceiveDate',
    barcodeNo: '',
    department: [],
    test: [],
    user: '',
    header: 0,
    status: ''
  })
  const allCentreData = useRetrieveData();
  const allDepartementData = useRetrieveData();
  const allTestData = useRetrieveData();
  const allUserData = useRetrieveData();
  const allSampleRemark = useRetrieveData();
  const allInfoDocument = useRetrieveData();
  const allRemarkTestData = useRetrieveData();
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [isHoveredPopupTable, setIsHoveredPopupTable] = useState(null);
  const [showPopup, setShowPopup] = useState(0);
  const [storeStatusData, setShowStatusData] = useState({

    //!====add new fileds=======
    header: 1,

    //!====end add new fileds=======
    phNo: '',
    emailId: '',
    workOrderId: '',
    nameOfUpdateStatus: ''
  })
  const [isButtonClick, setIsButtonClick] = useState(0);
  const postData = usePostData();
  const searchReportDispatch = usePostData();
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [singleRemarkData, setSingleRemarkData] = useState({
    investigationName: '',
    sampleRemark: 0,
    showInHouse: 0,
    transactionId: 0,
    workOrderId: '',
    itemId: 0,
    itemName: '',
    createdDateTime: useFormattedDateTime()
  })
  // const [selectFilterData, setSelectFilterData] = useState('');

  const allFilterData = useRetrieveData();
  const emptyCallApiData = useRetrieveData();

  useEffect(() => {

    const getAllData = async () => {
      try {
        await allFilterData.fetchDataFromApi(`/LegendColorMaster?select=id,colourCode,colourName,contantName&$filter=(isactive eq 1 and (id gt 0 and id lt 13 or id eq 24 or id eq 25))`);
      } catch (error) {
        toast.error(error.message)
      }
    }

    getAllData();
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        await allCentreData.fetchDataFromApi(`/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)`);
        //console.log(response);

        await allDepartementData.fetchDataFromApi(`/labDepartment?select=id,deptname&$filter=(isactive eq 1)`);

        await allTestData.fetchDataFromApi(`/itemMaster?select= itemId,ItemName&$filter=(deptId eq 2 and isactive eq 1)`);

        await allUserData.fetchDataFromApi(`/empMaster?select=empid,fName,lName&$filter=(isactive eq 1)`)

      } catch (error) {
        toast.error(error?.message);
      }
    };

    fetchData();
  }, []);


  //get the filter data in child component
  const handleFilterSelection = (selectedItem) => {
    setRecordDispatchData((preventData) => ({
      ...preventData,
      status: selectedItem
    }));
  };

  const handelOnChangeForReportDispatch = (e) => {
    setRecordDispatchData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handelOnChangedepartment = (updatedSelectedItems) => {
    setRecordDispatchData((preventData) => ({
      ...preventData,
      department: updatedSelectedItems
    }));
  };


  const handelOnChangetest = (updatedSelectedItems) => {
    setRecordDispatchData((preventData) => ({
      ...preventData,
      test: updatedSelectedItems
    }));
  };

  const searchReportDispatchData = async (e = null) => {

    if (e) e.preventDefault(); // Prevent default only if event exists


    const itemData = reportDispatchData?.department?.length
      ? reportDispatchData.department.map((item) => item?.id)
      : [];

    const testData = reportDispatchData?.test?.length
      ? reportDispatchData.test.map((item) => item?.itemId)
      : [];

    const updateData = {
      "centreId": reportDispatchData?.centreId,
      "fromDate": reportDispatchData?.fromDate,
      "toDate": reportDispatchData?.toDate,
      "datetype": reportDispatchData?.searchType || "",
      "searchvalue": reportDispatchData?.barcodeNo || "",
      "itemIds": testData,  // Ensures an array, not a string inside an array
      "departmentIds": itemData, // Ensures an array, not a string inside an array
      "empid": parseInt(user?.employeeId),
      status: reportDispatchData?.status
    };
    try {
      await searchReportDispatch.postRequestData(`/tnx_Booking/GetDispatchData`, updateData);
    } catch (error) {
      toast.error(error?.message)
    }

  }


  //update the whatsapp and email status

  const handelOnChangeForReportDispatchInRemark = (e) => {
    if (!e.target || !e.target.name) {
      console.error("Event target or name is missing");
      return;
    }

    console.log(e.target.name, e.target.value);

    setShowStatusData((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    }));
  };



  const handelRemarDataGetEmailMobileNo = async (workOrderId, status) => {
    console.log(workOrderId);

    if (status === 'whatsapp') {
      try {
        const response = await emptyCallApiData.fetchDataFromApi(
          `/tnx_Booking/WhatsappNo?workOrderId=${workOrderId}`
        );

        if (!emptyCallApiData?.loading) {
          setShowStatusData((preData) => ({
            ...preData,
            phNo: response?.data?.message,
          }));
        }

        // Log after the state is updated using useEffect
      } catch (error) {
        toast.error(error?.message);
      }
    } else {

      console.log(status);


      try {
        const response = await emptyCallApiData.fetchDataFromApi(
          `/tnx_Booking/SendEmailId?workOrderId=${workOrderId}`
        );

        if (!emptyCallApiData?.loading) {
          setShowStatusData((preData) => ({
            ...preData,
            emailId: response?.data?.message,
          }));
        }

        // Log after the state is updated using useEffect
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };


  const updateStatusForWhatsappAndEmail = async (e) => {
    e.preventDefault();
    setIsButtonClick(3);
    if (storeStatusData?.updateStatusName === 'whatsapp') {

      try {
        // const response = await postData.postRequestData(`/tnx_Booking/SendWhatsapp?workOrderId=${storeStatusData?.workOrderId}&Userid=${parseInt(user?.employeeId)}`);

        const response = await postData.postRequestData(`/tnx_Booking/SendWhatsapp?workOrderId=${storeStatusData?.workOrderId}&Userid=${parseInt(user?.employeeId)}&Mobileno=${storeStatusData?.phNo}&header=${storeStatusData?.header}`);

        if (response?.message) {
          toast.success(response?.message);

          setShowPopup(0);
          setShowStatusData({
            workOrderId: '',
            nameOfUpdateStatus: ''
          })

          //call the method to get updated data
          await searchReportDispatchData();

        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        toast(error?.message);
      }

    } else {

      try {

        const response = await postData.postRequestData(`/tnx_Booking/SendEmail?workOrderId=${storeStatusData?.workOrderId}&Userid=${parseInt(user?.employeeId)}`);

        if (response?.message) {
          toast.success(response?.message);

          setShowPopup(0);

          //call the method to get updated data
          await searchReportDispatchData();

        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        toast(error?.message);
      }

    }
    setIsButtonClick(0);
  }


  const handleCheckboxChange = (event, testId) => {
    if (event.target.checked) {
      setSelectedTestId(testId); // Set your desired test ID
    } else {
      setSelectedTestId(null); // Reset when unchecked
    }
  };


  const printData = async () => {
    try {

      const response = await viewPrintreportTrackingApi(selectedTestId, reportDispatchData?.header)

      // console.log(response);

      // Create a Blob URL
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open in new tab
      window.open(url, "_blank");

    } catch (error) {
      toast.error(error?.message)
    }


  }


  //test remark
  const handelOnChangetestRemark = (e) => {
    setSingleRemarkData((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {

    const getAllData = async () => {
      try {
        await allSampleRemark.fetchDataFromApi(`/SampleremarkMaster?select=id,remark&$filter=(isactive eq 1)`);

        await allRemarkTestData.fetchDataFromApi(`/tnx_InvestigationRemarks/GetSampleremark?transacctionId=${singleRemarkData?.transactionId}&WorkOrderId=${singleRemarkData?.workOrderId}&itemId=${singleRemarkData?.itemId}`);

      } catch (error) {
        toast.error(error?.message);
      }
    }

    if (showPopup === 2) {
      getAllData();
    }

  }, [showPopup, isButtonClick])


  const handelOnSubmitTestRemarkData = async (e) => {
    e.preventDefault();
    setIsButtonClick(1);

    const updateData = {
      "isActive": 1,
      "createdById": parseInt(user?.employeeId),
      "createdDateTime": singleRemarkData?.createdDateTime,
      "updateById": 0,
      "updateDateTime": new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
      "id": 0,
      "invRemarks": allSampleRemark?.data?.find((data) => data?.id === singleRemarkData?.sampleRemark).remark,
      "transactionId": singleRemarkData?.transactionId,
      "workOrderId": singleRemarkData?.workOrderId,
      "itemId": singleRemarkData?.itemId,
      "itemName": singleRemarkData?.investigationName,
      "isInternal": singleRemarkData?.showInHouse,
    }


    try {

      const response = await postData.postRequestData(`/tnx_InvestigationRemarks/AddSampleremark`, [updateData])

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message)
      }

    } catch (error) {
      toast.error(error?.message)
    }

    setIsButtonClick(0);

  }


  const handelDeleteSingleRemarkTestData = async (data) => {

    try {

      const updateData = {
        ...data,
        "isActive": 0,
        "createdDateTime": singleRemarkData?.createdDateTime,
        "updateById": parseInt(user?.employeeId),
        "updateDateTime": singleRemarkData?.createdDateTime,
        "id": data?.id,
      }

      const response = await postData.postRequestData(`/tnx_InvestigationRemarks/AddSampleremark`, [updateData])

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message)
      }

    } catch (error) {
      toast.error(error?.message)
    }
  }


  const getAllInfoDocumentData = async (testId) => {

    try {
      await allInfoDocument.fetchDataFromApi(`/tnx_Booking/GetTestInfo?TestId=${testId}`);

    } catch (error) {
      toast.error(error?.message);
    }
  }


  console.log(searchReportDispatch);


  return (
    <div>
      {/* Header Section */}
      {/* <InvestigationRemarkPopupModal
        setShowPopup={setRemarkPopup}
        showPopup={RemarkPopup}
      />

      <RejectPopupModal setShowPopup={setRejectPopup} showPopup={RejectPopup} /> */}


      <FormHeader headerData={'Report Dispatch'} />

      <form autoComplete="off" onSubmit={searchReportDispatchData}>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  my-2  mx-1 lg:mx-2 items-center">

          <div className="relative flex-1">

            <CustomSearchInputFields
              id="centreId"
              name="centreId"
              label="Centre"
              value={reportDispatchData?.centreId}
              options={allCentreData?.data}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              filterText="No records found"
              placeholder=" "
              searchWithName="companyName"
              uniqueKey="centreId"
              activeTheme={activeTheme}
            />

          </div>

          <div className='relative flex-1'>
            <DatePicker
              id="fromDate"
              name="fromDate"
              value={reportDispatchData?.fromDate || ''}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
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
              value={reportDispatchData?.toDate || ''}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              placeholder=" "
              label="To Date"
              activeTheme={activeTheme}
              currentDate={new Date()} // Current date: today
              maxDate={new Date(2025, 11, 31)}

            />
          </div>


          <div className="relative flex-1">
            {/* <CustomSearchInputFields
              id="centreId"
              name="centreId"
              label="Search Type"
              value={reportDispatchData?.centreId}
              options={allCentreData?.data}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              filterText="No records found"
              placeholder=" "
              searchWithName="companyName"
              uniqueKey="centreId"
              activeTheme={activeTheme}
            /> */}
            <CustomDropdown
              name="searchType"
              label="Search Type"
              value={reportDispatchData?.searchType}
              options={[
                // { label: 'Select Search Type ', value: 0, disabled: true },
                { label: 'Sample Recived Date', value: 'tbi.sampleReceiveDate' },
                { label: 'Sample Collection Date', value: 'tbi.sampleCollectionDate' },
                { label: 'Booking Date', value: 'tb.bookingDate' },
                { label: 'Dalivery Date', value: 'tbi.deliveryDate' },
              ]}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              defaultIndex={0}
              activeTheme={activeTheme}
            />
          </div>

          <div className="relative flex-1">
            <CustomTextBox
              type="charNumberWithSpace"
              name="barcodeNo"
              value={reportDispatchData?.barcodeNo || ''}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              label="Barcode No."
            // showLabel={true}
            />

          </div>


          <div className="relative flex-1">


            <CustomMultiSelectDropdown
              id="department"
              name="department"
              label="Select Departement"
              options={allDepartementData?.data}
              selectedItems={reportDispatchData?.department}
              onSelectionChange={handelOnChangedepartment}
              placeholder=" "
              activeTheme={activeTheme}
              uniqueId={'id'}
              searchWithName={'deptName'}
            />
          </div>


          <div className="relative flex-1">

            <CustomMultiSelectDropdown
              id="test"
              name="test"
              label="Select Test"
              options={allTestData?.data}
              selectedItems={reportDispatchData?.test}
              onSelectionChange={handelOnChangetest}
              placeholder=" "
              activeTheme={activeTheme}
              uniqueId={'itemId'}
              searchWithName={'itemName'}
            />
          </div>


          <div className="relative flex-1">

            <CustomSearchInputFields
              id="user"
              name="user"
              label="Search User"
              value={reportDispatchData?.user}
              options={allUserData?.data}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              filterText="No records found"
              placeholder=" "
              searchWithName="fName"
              uniqueKey="empid"
              activeTheme={activeTheme}
            />

            {/* <CustomDropdown
              name="user"
              label="Select User"
              value={reportDispatchData?.user}
              options={[
                { label: 'Select User ', value: 0, disabled: true },
                ...allUserData?.data?.map(item => ({
                  label: `${item?.fName} ${item?.lName}`,
                  value: parseInt(item.empid),
                })),
              ]}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              defaultIndex={0}
              activeTheme={activeTheme}
            /> */}
          </div>

          <div className="flex gap-[0.25rem]">
            <div className="relative flex-1">
              <CustomDropdown
                name="header"
                label="Select Header"
                value={reportDispatchData?.header}
                options={[
                  // { label: 'Select Header ', value: 0, disabled: true },
                  { label: 'Yes ', value: 1 },
                  { label: 'No', value: 0 },

                ]}
                onChange={(e) => handelOnChangeForReportDispatch(e)}
                defaultIndex={0}
                activeTheme={activeTheme}
              />
            </div>

            <div className="relative flex-1">
              <CustomNormalFormButton activeTheme={activeTheme} text={'Search'} />
            </div>
          </div>

          <div className="flex gap-[0.25rem]">

            <div className="relative flex-1">
              {/* <CustomeNormalButton activeTheme={activeTheme} text={'Print'}
              
              /> */}

              <CustomFormButton
                activeTheme={activeTheme}
                text="Print"
                icon={FaSpinner}
                isButtonClick={isButtonClick}
                loadingButtonNumber={4} // Unique number for the first button
                onClick={printData}
              />
            </div>

            <div className="relative flex-1">
            </div>
          </div>
        </div>

        <LegandaryButton allFilterData={allFilterData} onFilterSelect={handleFilterSelection} />
      </form>


      <GridDataDetails gridDataDetails={'Dispatch Details'} />
      {
        searchReportDispatch?.loading ?
          <div className="flex items-center justify-center w-full">
            <CustomLoadingPage />
          </div>
          :
          <CustomDynamicTable activeTheme={activeTheme} columns={reportDispatchHeaderData} >

            <tbody >
              {
                searchReportDispatch?.data?.map((data, index) => (
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
                      <div className="flex gap-3 items-center">
                        <div>
                          {index + 1}
                        </div>
                        {
                          data?.urgent === 1 && (
                            <div>
                              <img src={UrgentGif} alt="path not found" />
                            </div>
                          )
                        }
                      </div>
                    </td>

                    {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.bookingDate}
                    </td> */}

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.workOrderId}
                    </td>



                    {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.sampleReceiveDate}
                  </td> */}


                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.patientName}

                      <div className="text-xxxs">
                        {data?.bookingDate}
                      </div>
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.age}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.mobileNo}
                    </td>


                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.barcodeNo}
                    </td>

                    {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    <div className="flex gap-1">
                      {data?.investigationName?.map((item, index) => (
                        <CustomeNormalButton
                          key={index}
                          activeTheme={activeTheme}
                          text={item?.investigationName}
                          onClick={() => handelObservationData(data?.totalAge, item, data?.workOrderId, item?.reportType, item?.itemId, data?.testid, data?.deptId)}
                        />
                      ))}
                    </div>

                  </td> */}
                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                      <div className="flex flex-wrap gap-1">
                        {data?.referDoctor}

                      </div>
                    </td>


                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.centrecode}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.investigationName}
                    </td>


                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >

                      {
                        data?.approved === 1 && (
                          <input
                            type="checkbox"
                            className="flex items-center justify-center"
                            onChange={(e) => handleCheckboxChange(e, data?.testId)}
                          />
                        )
                      }

                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                      <div className="flex justify-between items-center">

                        {
                          data?.whatsapp === null ?
                            <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                              style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            >
                              <FaSquareWhatsapp className="w-4 h-4 "
                                onClick={() => {
                                  setShowStatusData((preData) => ({
                                    ...preData,
                                    // phNo: data?.barcodeNo,
                                    workOrderId: data?.workOrderId,
                                    updateStatusName: 'whatsapp'
                                  })),
                                    handelRemarDataGetEmailMobileNo(data?.workOrderId, 'whatsapp')
                                  setShowPopup(3)
                                }}
                              />
                            </div>
                            :
                            <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                              style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            >
                              <BiSolidLike className="w-4 h-4" />
                            </div>
                        }


                        {
                          data?.email === 0 ?
                            <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                              style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            // onClick={() => setShowPopup(2)}
                            >
                              <MdOutlineMailOutline className="w-4 h-4"
                                // onClick={() => updateStatusForWhatsappAndEmail(data?.workOrderId, 'email')}
                                onClick={() => {
                                  setShowStatusData({
                                    workOrderId: data?.workOrderId,
                                    updateStatusName: 'email'
                                  })
                                  handelRemarDataGetEmailMobileNo(data?.workOrderId)
                                  setShowPopup(3)

                                }}
                              />
                            </div>
                            :
                            <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                              style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            // onClick={() => setShowPopup(2)}
                            >
                              <BiSolidLike className="w-4 h-4" />
                            </div>
                        }

                      </div>
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.sampleRecievedDate}
                    </td>

                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                      {data?.comment.length >= 9 ? (
                        <div className="flex justify-center items-center gap-1" title={data?.comment}>
                          {data?.comment.slice(0, 9) + " ...."} {/* Convert the sliced array to a string */}
                        </div>
                      ) : (
                        data?.comment
                      )}
                    </td>


                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      {data?.createdBy}
                    </td>



                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                        onClick={() => { setShowPopup(4), getAllInfoDocumentData(data?.itemId) }}
                      >
                        <FaCircleInfo />
                      </div>

                    </td>



                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                      <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                        onClick={() => {
                          setShowPopup(2), setSingleRemarkData((preventData) => ({
                            ...preventData,
                            transactionId: data?.transactionId, workOrderId: data?.workOrderId, itemId: data?.itemId, investigationName: data?.investigationName,
                          }))
                        }}
                      >
                        <MdAddCircleOutline className="text-base" />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>

          </CustomDynamicTable>

      }


      {
        showPopup === 3 && (
          // <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
          //   <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50">
          //     <div className="flex mt-3 items-center">
          //       <IoAlertCircleOutline
          //         className="w-8 h-8"
          //         style={{ color: activeTheme?.menuColor }}
          //       />
          //     </div>

          //     {/* <div className="text-xs text-center font-semibold text-textColor/70">
          //     Are you leaving ?
          //   </div> */}

          //     <div className="text-xs font-semibold text-textColor/50">
          //       Are you sure want to Request ?
          //     </div>

          //     <div className="flex items-end gap-5 my-5">
          //       <div className="w-20">
          //         <CustomeNormalButton activeTheme={activeTheme} onClick={setShowPopup} text={'Cencle'} />
          //       </div>


          //       <div className="w-20">
          //         <CustomFormButton
          //           activeTheme={activeTheme}
          //           text="Request"
          //           icon={FaSpinner}
          //           isButtonClick={isButtonClick}
          //           loadingButtonNumber={3} // Unique number for the first button
          //           onClick={updateStatusForWhatsappAndEmail}
          //         />
          //       </div>

          //     </div>



          //   </div>
          // </div>

          // !========new code=================

          <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
            <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

              {/* Header */}
              <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                  {storeStatusData?.updateStatusName}
                </div>
                <IoMdCloseCircleOutline
                  className="text-xl cursor-pointer"
                  style={{ color: activeTheme?.iconColor }}
                  onClick={() => setShowPopup(0)}
                />
              </div>

              <FormHeader headerData={'Send Report'} />
              {
                console.log(storeStatusData)

              }
              {/* Form */}
              {
                emptyCallApiData?.loading ?
                  <div className="w-full flex justify-center items-center">
                    <CustomLoadingPage />
                  </div>
                  :
                  <form autoComplete="off" onSubmit={updateStatusForWhatsappAndEmail} >
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mx-1 lg:mx-2 items-center relative my-2">

                      <div className="relative flex-1">
                        {
                          storeStatusData?.updateStatusName === 'whatsapp' ? (
                            <>
                              <input
                                type="search"
                                id="phNo"
                                name="phNo"
                                value={storeStatusData?.phNo || ''}
                                // onChange={(e) => {
                                //   handelOnChangeTestMappingData(e),
                                //     setSeleDropDown((preventData) => ({
                                //       ...preventData,
                                //       testName: e.target.value
                                //     }))
                                // }}
                                readOnly
                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                              />
                              <label htmlFor="testName" className="menuPeerLevel">
                                Mobile Number
                              </label>
                            </>
                          )
                            :
                            (
                              <>
                                <input
                                  type="search"
                                  id="emailId"
                                  name="emailId"
                                  value={storeStatusData.emailId || ''}
                                  // onChange={(e) => {
                                  //   handelOnChangeTestMappingData(e),
                                  //     setSeleDropDown((preventData) => ({
                                  //       ...preventData,
                                  //       testName: e.target.value
                                  //     }))
                                  // }}
                                  readOnly
                                  placeholder=" "
                                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="testName" className="menuPeerLevel">
                                  Email Id
                                </label>
                              </>
                            )
                        }


                      </div>


                      <div className="flex gap-[0.25rem]">
                        {/* Rejection Reason Dropdown */}
                        <div className="relative flex-1">
                          <CustomDropdown
                            name="header"
                            label="Select Header"
                            value={storeStatusData.header}
                            options={[
                              // { label: 'Select Header ', value: '', disabled: true },
                              { label: 'Yes ', value: 1 },
                              { label: 'No', value: 0 },

                            ]}
                            onChange={(e) => handelOnChangeForReportDispatchInRemark(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                          />
                        </div>

                        {/* <div className="relative w-full md:w-32">
                    <CustomDropdown
                      name="showInHouse"
                      label="Select Show In House"
                      value={singleRemarkData?.showInHouse}
                      options={[
                        { label: 'Yes', value: 1 },
                        { label: 'No', value: 0 },

                      ]}
                      onChange={(e) => handelOnChangetestRemark(e)}
                      defaultIndex={0}
                      activeTheme={activeTheme}
                    />
                  </div> */}

                        <div className="relative flex-1">
                          <CustomFormButtonWithLoading
                            activeTheme={activeTheme}
                            text="Send"
                            icon={FaSpinner}
                            isButtonClick={isButtonClick}
                            loadingButtonNumber={3} // Unique number for the first button
                          />
                        </div>
                      </div>

                    </div>
                  </form>
              }


              {/* Scrollable Content */}

              {/* <GridDataDetails gridDataDetails={'Test Remark Details'} />

              {allRemarkTestData?.loading ?
                <CustomLoadingPage />
                :
                <CustomDynamicTable activeTheme={activeTheme} columns={['Sr. No', 'Test Name', 'Remark', 'Remark Date', 'Added By', 'In-House', 'Action']} height="30vh">
                  <tbody >
                    {
                      allRemarkTestData?.data?.data?.map((data, index) => (
                        <tr
                          className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                            ? ''
                            : index % 2 === 0
                              ? 'bg-gray-100'
                              : 'bg-white'
                            }`}
                          key={index}
                          onMouseEnter={() => setIsHoveredPopupTable(index)}
                          onMouseLeave={() => setIsHoveredPopupTable(null)}
                          style={{
                            background:
                              isHoveredPopupTable === index ? activeTheme?.subMenuColor : undefined,
                            // Hides scrollbar for IE/Edge
                          }}
                        >
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {index + 1}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.itemName}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.invRemarks}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.remardkDate}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.remarkAdBy}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.isInternal === 1 ? 'Yes' : 'No'}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            <RiDeleteBin5Fill className="text-red-500 w-4 h-4" />
                          </td>
                        </tr>
                      ))

                    }
                  </tbody>
                </CustomDynamicTable>
              } */}
              <div className='border-b-[1px]  flex justify-center items-center h-6 rounded-b-md text-xs font-semibold'
                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
              >

              </div>
            </div>

          </div>

        )
      }

      {
        showPopup === 2 && (
          <>
            <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
              <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                {/* Header */}
                <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                  style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                  <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                    {'Test Remark Data'}
                  </div>
                  <IoMdCloseCircleOutline
                    className="text-xl cursor-pointer"
                    style={{ color: activeTheme?.iconColor }}
                    onClick={() => setShowPopup(0)}
                  />
                </div>

                <FormHeader headerData={'Test Remark Data'} />

                {/* Form */}
                <form autoComplete="off" onSubmit={handelOnSubmitTestRemarkData} >
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-14 mx-1 lg:mx-2 items-center relative my-2">

                    <div className="relative w-full md:w-32">
                      <input
                        type="search"
                        id="investigationName"
                        name="investigationName"
                        value={singleRemarkData.investigationName || ''}
                        // onChange={(e) => {
                        //   handelOnChangeTestMappingData(e),
                        //     setSeleDropDown((preventData) => ({
                        //       ...preventData,
                        //       testName: e.target.value
                        //     }))
                        // }}
                        readOnly
                        placeholder=" "
                        className={`inputPeerField peer border-borderColor focus:outline-none`}
                      />
                      <label htmlFor="testName" className="menuPeerLevel">
                        Test Name
                      </label>

                    </div>

                    {/* Rejection Reason Dropdown */}
                    <div className="relative w-full md:w-32">
                      <CustomDropdown
                        name="sampleRemark"
                        label="Select Sample Remark"
                        value={singleRemarkData?.sampleRemark}
                        options={[
                          { label: 'Select Sample Remark', value: 0, disabled: true },
                          ...allSampleRemark?.data?.map(item => ({
                            label: item?.remark,
                            value: parseInt(item?.id),
                          })),
                        ]}
                        onChange={(e) => handelOnChangetestRemark(e)}
                        defaultIndex={0}
                        activeTheme={activeTheme}
                      />
                    </div>

                    <div className="relative w-full md:w-32">
                      <CustomDropdown
                        name="showInHouse"
                        label="Select Show In House"
                        value={singleRemarkData?.showInHouse}
                        options={[
                          { label: 'Yes', value: 1 },
                          { label: 'No', value: 0 },

                        ]}
                        onChange={(e) => handelOnChangetestRemark(e)}
                        defaultIndex={0}
                        activeTheme={activeTheme}
                      />
                    </div>

                    <div className="relative w-full">
                      <CustomFormButtonWithLoading
                        activeTheme={activeTheme}
                        text="Save"
                        icon={FaSpinner}
                        isButtonClick={isButtonClick}
                        loadingButtonNumber={1} // Unique number for the first button
                      />
                    </div>
                  </div>
                </form>

                {
                  console.log(allRemarkTestData)

                }
                {/* Scrollable Content */}

                <GridDataDetails gridDataDetails={'Test Remark Details'} />

                {allRemarkTestData?.loading ?
                  <CustomLoadingPage />
                  :
                  <CustomDynamicTable activeTheme={activeTheme} columns={['Sr. No', 'Test Name', 'Remark', 'Remark Date', 'Added By', 'In-House', 'Action']} height="30vh">
                    <tbody >
                      {
                        allRemarkTestData?.data?.data?.map((data, index) => (
                          <tr
                            className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                              ? ''
                              : index % 2 === 0
                                ? 'bg-gray-100'
                                : 'bg-white'
                              }`}
                            key={index}
                            onMouseEnter={() => setIsHoveredPopupTable(index)}
                            onMouseLeave={() => setIsHoveredPopupTable(null)}
                            style={{
                              background:
                                isHoveredPopupTable === index ? activeTheme?.subMenuColor : undefined,
                              // Hides scrollbar for IE/Edge
                            }}
                          >
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {index + 1}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.itemName}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.invRemarks}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.remardkDate}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.remarkAdBy}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.isInternal === 1 ? 'Yes' : 'No'}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              <RiDeleteBin5Fill className="text-red-500 w-4 h-4"
                                onClick={() => handelDeleteSingleRemarkTestData(data)}
                              />
                            </td>
                          </tr>
                        ))

                      }
                    </tbody>
                  </CustomDynamicTable>
                }
              </div>

            </div>
          </>
        )
      }

      {
        showPopup === 4 && (
          <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
            <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

              {/* Header */}
              <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                  {'Test Remark Data'}
                </div>
                <IoMdCloseCircleOutline
                  className="text-xl cursor-pointer"
                  style={{ color: activeTheme?.iconColor }}
                  onClick={() => setShowPopup(0)}
                />
              </div>

              {/* Scrollable Content */}
              <GridDataDetails gridDataDetails={'Test Remark Details'} />

              {allInfoDocument?.loading ?
                <CustomLoadingPage />
                :
                <CustomDynamicTable columns={resultTrackForPatientInformation} activeTheme={activeTheme} height="15vh">
                  <tbody>
                    {
                      allInfoDocument?.data?.data?.map((data, index) => (
                        <tr
                          className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                            ? ''
                            : index % 2 === 0
                              ? 'bg-gray-100'
                              : 'bg-white'
                            }`}
                          key={index}
                          onMouseEnter={() => setIsHoveredPopupTable(index)}
                          onMouseLeave={() => setIsHoveredPopupTable(null)}
                          style={{
                            background:
                              isHoveredPopupTable === index ? activeTheme?.subMenuColor : undefined,
                            // Hides scrollbar for IE/Edge
                          }}
                        >
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {index + 1}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.investigationName}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.barcodeNo}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.sampleReceiveDate}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.sampleCollectedby}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.sampleReceivedBY}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.sampleReceiveDate}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.registrationDate}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.registerBy}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.resultDate}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.resutDoneBy}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.outhouseDoneOn}
                          </td>


                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.outhouseLab}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.outhouseDoneBy}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.outSourceDate}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.outSouceLab}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.outSource}
                          </td>
                        </tr>
                      ))

                    }
                  </tbody>
                </CustomDynamicTable >
              }
            </div>

          </div>
        )
      }

      {/* <div style={{ height: "100px" }}>                                                      
        <DynamicTable                                                                            
          rows={row}                                                                             
          name="Dispatch Details"                                                                
          //   loading={loading}                                                                 
          columns={columns}                                                                      
          activeTheme={activeTheme}                                                              
        />                                                                                       
      </div> */}

    </div>
  );
}
