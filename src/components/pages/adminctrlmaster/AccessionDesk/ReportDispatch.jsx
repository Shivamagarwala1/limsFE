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
import { FaDownload, FaPlus } from "react-icons/fa";
import "./ReportDispatch.css";
import {
  InvestigationRemarkPopupModal,
  RejectPopupModal,
} from "../../../../Custom Components/PopupModal";
import { setLocal } from "usehoks";
import { FaCircleInfo } from "react-icons/fa6";
import { useRetrieveData } from "../../../../service/service";
import CustomDropdown from "../../../global/CustomDropdown";
import { DatePicker } from "../../../global/DatePicker";
import { useFormattedDate } from "../../../customehook/useDateTimeFormate";
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import CustomNormalFormButton from "../../../global/CustomNormalFormButton";
import { toast } from "react-toastify";
import CustomSearchInputFields from "../../../global/CustomSearchDropdown";

export default function ReportDispatch() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
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
    department: '',
    test: '',
    user: '',
    header: 0
  })
  const allCentreData = useRetrieveData();
  const allDepartementData = useRetrieveData();
  const allTestData = useRetrieveData();
  const allUserData = useRetrieveData();

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

  console.log(allTestData);

  const searchReportDispatchData = (e) => {
    e.preventDefault();

    console.log('Search data.......');

  }

  return (
    <div>
      {/* Header Section */}
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
        <div>Report Dispatch</div>
      </div>

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
            <CustomSearchInputFields
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
            <CustomSearchInputFields
              id="department"
              name="department"
              label="Search Departement"
              value={reportDispatchData?.department}
              options={allDepartementData?.data}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              filterText="No records found"
              placeholder=" "
              searchWithName="deptName"
              uniqueKey="id"
              activeTheme={activeTheme}
            />
          </div>


          <div className="relative flex-1">
            <CustomSearchInputFields
              id="test"
              name="test"
              label="Search Departement"
              value={reportDispatchData?.test}
              options={allTestData?.data}
              onChange={(e) => handelOnChangeForReportDispatch(e)}
              filterText="No records found"
              placeholder=" "
              searchWithName="itemName"
              uniqueKey="itemId"
              activeTheme={activeTheme}
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

      <div style={{ height: "100px" }}>
        <DynamicTable
          rows={row}
          name="Dispatch Details"
          //   loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>









    </div>
  );
}
