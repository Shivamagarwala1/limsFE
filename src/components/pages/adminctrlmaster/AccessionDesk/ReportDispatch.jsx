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
import { FaCommentDots, FaDownload, FaPlus } from "react-icons/fa";
import "./ReportDispatch.css";
import {
  InvestigationRemarkPopupModal,
  RejectPopupModal,
} from "../../../../Custom Components/PopupModal";
import { setLocal } from "usehoks";
import { FaCircleInfo, FaSquareWhatsapp } from "react-icons/fa6";
import { saveData, usePostData, useRetrieveData } from "../../../../service/service";
import CustomDropdown from "../../../global/CustomDropdown";
import { DatePicker } from "../../../global/DatePicker";
import { useFormattedDate } from "../../../customehook/useDateTimeFormate";
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import CustomNormalFormButton from "../../../global/CustomNormalFormButton";
import { toast } from "react-toastify";
import CustomSearchInputFields from "../../../global/CustomSearchDropdown";
import CustomMultiSelectDropdown from '../../../global/CustomMultiSelectDropdown';
import FormHeader from "../../../global/FormHeader";
import GridDataDetails from '../../../global/GridDataDetails';
import CustomDynamicTable from '../../../global/CustomDynamicTable';
import { reportDispatchHeaderData } from "../../../listData/listData";
import { MdAddCircleOutline, MdOutlineMailOutline } from "react-icons/md";
import { BiSolidLike } from 'react-icons/bi'
export default function ReportDispatch() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.userSliceName?.user || null);


  const { formRef, getValues, setValues } = useFormHandler();
  const [RejectPopup, setRejectPopup] = useState(false);
  const [RemarkPopup, setRemarkPopup] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState([]);
  const AllCenterData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `BookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `VisiotId`,
      headerName: `Visiter Id`,
      flex: 1,
    },
    {
      field: `Barcode`,
      headerName: `Barcode`,
      flex: 1,
    },
    {
      field: `VisitorName`,
      headerName: `Visitor Name`,
      flex: 1,
    },
    {
      field: `AgeGender`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `Mobile`,
      headerName: `Mobile`,
      flex: 1,
    },
    {
      field: `RefDoctor`,
      headerName: `Ref. Doctor`,
      flex: 1,
    },
    {
      field: `RefLab`,
      headerName: `Ref. Lab`,
      flex: 1,
    },
    {
      field: `Centre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `RecDate`,
      headerName: `Rec. Date`,
      flex: 1,
    },
    {
      field: `Comments`,
      headerName: `Comments`,
      flex: 1,
    },
    {
      field: `CreatedBy`,
      headerName: `Created By`,
      flex: 1,
    },
    {
      headerName: `Print`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <input type="checkbox" />
          </div>
        );
      },
    },
    {
      field: `Documents`,
      headerName: `Info/Documents`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <FaCircleInfo />
            <FaDownload />
          </div>
        );
      },
    },
    {
      field: `OutSourceLab`,
      headerName: `Out Source Lab`,
      flex: 1,
    },
    {
      field: `Remark`,
      headerName: `Remark`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params.row)
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text={"+"}
              callBack={() => {
                setLocal("testName", params?.row?.TestName);
                setRemarkPopup(true);
              }}
              style={{ width: "30px", fontSize: "15px" }}
            />
          </div>
        );
      },
    },
  ];

  const row = [
    {
      id: 1,
      Centre: "105 - center 1",
      Department: "Nursing",
      RegId: "10993",
      VisiotId: "302",
      RateType: "Type 1",
      VisitorName: "John Doe",
      AgeGender: "25,Male",
      TestName: "CBC",
      Comments: "lorem ipsum",
      BookingDate: "11-Feb-2025",
      Barcode: "123456",
      Mobile: "9876543210",
      RefDoctor: "Dr. Smith",
      RefLab: "Lab A",
      RecDate: "10-Feb-2025",
      CreatedBy: "Admin",
      OutSourceLab: "Lab B",
      Remark: "No remarks",
    },
  ];

  const handleSubmit = () => { };
  // !===============anil code=====================
  const [reportDispatchData, setRecordDispatchData] = useState({
    centreId: 0,
    fromDate: useFormattedDate(),
    toDate: useFormattedDate(),
    searchType: '',
    barcodeNo: '',
    department: [],
    test: [],
    user: '',
    header: 0
  })
  const allCentreData = useRetrieveData();
  const allDepartementData = useRetrieveData();
  const allTestData = useRetrieveData();
  const allUserData = useRetrieveData();
  const [isHoveredTable, setIsHoveredTable] = useState(null);

  const searchReportDispatch = usePostData();

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

  const searchReportDispatchData = async (e) => {
    e.preventDefault();

    const itemData = reportDispatchData?.department?.length
      ? reportDispatchData.department.map((item) => item?.id)
      : [];

    const testData = reportDispatchData?.test?.length
      ? reportDispatchData.test.map((item) => item?.itemId)
      : [];

    const updateData = {
      "centreId": reportDispatchData?.centreId,
      "fromDate": reportDispatchData?.fromDate || "2025-03-12T16:39:45.806Z",
      "toDate": reportDispatchData?.toDate || "2025-03-12T16:39:45.806Z",
      "datetype": reportDispatchData?.searchType || "",
      "searchvalue": reportDispatchData?.barcodeNo || "",
      "itemIds": testData,  // Ensures an array, not a string inside an array
      "departmentIds": itemData, // Ensures an array, not a string inside an array
      "empid": parseInt(user?.employeeId)
    };




    console.log(updateData);


    try {
      const response = await searchReportDispatch.postRequestData(`/tnx_Booking/GetDispatchData`, updateData);

      console.log(response);
      // const resp = await saveData(updateData);
      // console.log(resp);

    } catch (error) {
      toast.error(error?.message)
    }

  }

  return (
    <div>
      {/* Header Section */}
      <InvestigationRemarkPopupModal
        setShowPopup={setRemarkPopup}
        showPopup={RemarkPopup}
      />
      <RejectPopupModal setShowPopup={setRejectPopup} showPopup={RejectPopup} />
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
                { label: 'Select Search Type ', value: 0, disabled: true },
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
              <CustomeNormalButton activeTheme={activeTheme} text={'Print'} />
            </div>

            <div className="relative flex-1">
            </div>
          </div>
        </div>
      </form>



      <GridDataDetails gridDataDetails={'Dispatch Details'} />

      <CustomDynamicTable activeTheme={activeTheme} columns={reportDispatchHeaderData} height="300px">

        <tbody>
          {searchReportDispatch?.data?.map((data, index) => (

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

              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {data?.bookingDate}
              </td>

              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {data?.workOrderId}
              </td>

              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {data?.barcodeNo}
              </td>

              {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {data?.sampleReceiveDate}
              </td> */}


              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {data?.patientName}
              </td>

              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {data?.age}
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
                {data?.centreName}
              </td>

              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {data?.investigationName}
                {/* <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                  style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                  // onClick={() => setShowPopup(1)}
                >
                  <MdAddCircleOutline className="text-base" />
                </div> */}
              </td>

              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {/* <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                  style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                // onClick={() => setShowPopup(2)}
                >
                  <FaCircleInfo />
                </div> */}
                {
                  data?.sampleRecievedDate
                }
              </td>

              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                {data?.comment.length >= 9 ? (
                  <div className="flex justify-center items-center gap-1" title={data?.comment}>
                    {data?.comment.slice(0, 9) + " ...."} {/* Convert the sliced array to a string */}
                    {/* <div
                      className="w-5 h-5 flex justify-center items-center rounded-sm"
                      style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                      onClick={() => setShowPopup(3)}
                    >
                      <FaCommentDots />
                    </div> */}
                  </div>
                ) : (
                  data?.comment
                )}
              </td>


              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                {data?.createdBy}
              </td>

              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                <input type="checkbox" name="" id="" className="flex items-center justify-center" />
              </td>


              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                <div className="flex justify-between items-center">

                  <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                  // onClick={() => setShowPopup(2)}
                  >
                    <FaSquareWhatsapp className="w-4 h-4 " />
                  </div>


                  <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                  // onClick={() => setShowPopup(2)}
                  >
                    <BiSolidLike className="w-4 h-4" />
                  </div>


                  <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                  // onClick={() => setShowPopup(2)}
                  >
                    <MdOutlineMailOutline
                      className="w-4 h-4" />
                  </div>

                  <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                  // onClick={() => setShowPopup(2)}
                  >
                    <BiSolidLike className="w-4 h-4" />
                  </div>
                </div>
              </td>


              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                  style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                // onClick={() => setShowPopup(2)}
                >
                  <FaCircleInfo />
                </div>

              </td>



              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                  style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                // onClick={() => setShowPopup(1)}
                >
                  <MdAddCircleOutline className="text-base" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </CustomDynamicTable>


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
