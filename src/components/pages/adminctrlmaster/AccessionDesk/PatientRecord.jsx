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
import { FaDownload, FaPlus, FaRegFilePdf, FaRegMoneyBillAlt } from "react-icons/fa";
import "./ReportDispatch.css";
import {
  InvestigationRemarkPopupModal,
  RejectPopupModal,
} from "../../../../Custom Components/PopupModal";
import { setLocal } from "usehoks";
import { FaCircleInfo } from "react-icons/fa6";
import { RiBillLine } from "react-icons/ri";

export default function PatientRecord() {
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
      field: `AgeSex`,
      headerName: `Age/Sex`,
      flex: 1,
    },
    {
      field: `RefDoctor`,
      headerName: `Ref. Doctor`,
      flex: 1,
    },
    {
      field: `Centre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `RateType`,
      headerName: `Rate Type`,
      flex: 1,
    },
    {
      field: `RegBy`,
      headerName: `Reg. By`,
      flex: 1,
    },
    
    {
      field: `GrossAmount`,
      headerName: `Gross Amount`,
      flex: 1,
    },
    {
      field: `DisAmount`,
      headerName: `Dis. Amount`,
      flex: 1,
    },
    {
      field: `NetAmount`,
      headerName: `Net. Amount`,
      flex: 1,
    },
    {
      field: `PaidAmount`,
      headerName: `Paid Amount`,
      flex: 1,
    },
    {
      field: `DueAmount`,
      headerName: `Due Amount`,
      flex: 1,
    },
    {
      field: `Documents`,
      headerName: `Info/Documents`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "10px",fontSize:"15px" }}>
            <FaCircleInfo />
            <FaDownload />
          </div>
        );
      },
    },
    {
      headerName: `Settlement`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px",fontSize:"15px" }}>
            <FaRegFilePdf />
          </div>
        );
      },
    },
    {
      headerName: `Cash Recipt`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px",fontSize:"15px" }}>
            <FaRegMoneyBillAlt />
          </div>
        );
      },
    },
    {
      headerName: `MRP Recipt`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px",fontSize:"15px" }}>
            <RiBillLine />
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
      AgeSex: "23/male",
      GrossAmount: 1000,
      DisAmount: 100,
      NetAmount: 900,
      PaidAmount: 500,
      DueAmount: 400,
      RegBy:"Admin"
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
    </div>
  );
}
