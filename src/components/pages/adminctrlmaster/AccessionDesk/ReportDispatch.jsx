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

  const handleSubmit = () => {};

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
                label: "Search",
                type: "select",
                name: "Search",
                dataOptions: [
                  { id: 1, option: "Sample Recived Date" },
                  { id: 2, option: "Sample Collection Date" },
                  { id: 1, option: "Booked Date" },
                  { id: 1, option: "Delivery Date" },
                ],
              },
              {
                label: "Barcode No.",
                type: "text",
                name: "Barcode",
              },
              {
                label: "Department",
                type: "select",
                name: "Department",
                dataOptions: [],
              },
              {
                label: "Test",
                type: "select",
                name: "Test",
                dataOptions: [],
              },
              {
                label: "User",
                type: "select",
                name: "User",
                dataOptions: [],
              },
              {
                label: "Header",
                type: "select",
                name: "Header",
                dataOptions: [
                  { id: 1, key: "Yes" },
                  { id: 2, key: "No" },
                ],
              },
            ]}
          />
          <SubmitButton text={"Search"} />
          <SubmitButton submit={false} text={"Print"} />
        </div>
        <div className="flex flex-wrap items-center">
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#d7cdc6" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Not Coll.
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#6595ed" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Collected
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#ff6349" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Rejected
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#fea501" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Sample Run
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "rgb(74 74 74)" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Pending
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#ffb6c1" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Tested
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#ffff01" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Hold
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#05ca67" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Approved
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#bbf1f3" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Printed
          </div>
          <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
            <div
              style={{ backgroundColor: "#a56abe" }}
              className="w-7 h-7 bg-grey-300 rounded-full "
            ></div>
            Out Source
          </div>
        </div>
      </form>
      <div style={{ height: "300px" }}>
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
