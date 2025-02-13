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
import { FaPlus } from "react-icons/fa";
import { InvestigationRemarkPopupModal, RejectPopupModal } from "../../../../Custom Components/PopupModal";
import { setLocal } from "usehoks";

export default function SampleCollection() {
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
      field: `Centre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `Department`,
      headerName: `Department`,
      flex: 1,
    },
    {
      field: `RegId`,
      headerName: `Reg. Id`,
      flex: 1,
    },
    {
      field: `VisiotId`,
      headerName: `Visiot Id`,
      flex: 1,
    },
    {
      field: `RateType`,
      headerName: `Rate Type`,
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
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `Barcode`,
      headerName: `Barcode`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <InputGenerator
              inputFields={[{ type: "text", placeholder: "Barcode" }]}
            />
          </div>
        );
      },
    },
    {
      field: `Sample Type`,
      headerName: `Sample Type`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <InputGenerator
              inputFields={[{ type: "select", dataOptions: [] }]}
            />
          </div>
        );
      },
    },
    {
      headerName: `Sample Coll.`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <input type="checkbox" /> Collected
          </div>
        );
      },
      renderHeaderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <p>Sample Coll.</p> <input type="checkbox" />
          </div>
        );
      },
    },
    {
      field: `Dept. Rec.`,
      headerName: `Dept. Rec.`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <input type="checkbox" /> Recived
          </div>
        );
      },
      renderHeaderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <p>Dept. Rec.</p> <input type="checkbox" />
          </div>
        );
      },
    },
    {
      field: `Reject`,
      headerName: `Reject`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <SubmitButton
              submit={false}
              text={"R"}
              callBack={() => {
                setRejectPopup(true);
              }}
              style={{ width: "30px",fontSize:"0.75rem" }}
            />
            {/* <ImCross /> */}
          </div>
        );
      },
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
                setLocal("testName",params?.row?.TestName);
                setRemarkPopup(true);
              }}
              style={{ width: "30px", fontSize:"0.75rem" }}
            />
          </div>
        );
      },
    },
    {
      field: `Comments`,
      headerName: `Comments`,
      flex: 1,
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
    },
  ];

  const handleSubmit = () => {};

  return (
    <div>
      {/* Header Section */}
      <InvestigationRemarkPopupModal setShowPopup={setRemarkPopup} showPopup={RemarkPopup} />
      <RejectPopupModal setShowPopup={setRejectPopup} showPopup={RejectPopup} />
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Sample Collection</div>
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
                label: "Barcode",
                type: "text",
                name: "Barcode",
              },
              {
                label: "Status",
                type: "select",
                name: "Status",
                dataOptions: [],
              },
            ]}
          />
          <div className="flex gap-[0.25rem]">
            <div className="relative flex-1 gap-1 flex justify-center items-center">
              <div className="relative flex-1 gap-1 flex justify-center items-center text-xs">
                <div className="w-5 h-5 bg-blue-300 rounded-full"></div>
                Pending
              </div>
              <div className="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div className="w-5 h-5 bg-green-300 rounded-full"></div>
                Collected
              </div>
              <div className="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div className="w-5 h-5 bg-fuchsia-500 rounded-full"></div>
                Recived
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="relative flex-1 gap-4 flex justify-center items-center">
              <div className="relative gap-1 ml-5 flex justify-start items-center text-xs">
                <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                Reject
              </div>
              {/* <div className="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div className="w-5 h-5 bg-green-300 rounded-full"></div>
                Urgent Sample
              </div> */}
              <div className="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div className="w-5 h-5 bg-amber-300 rounded-full"></div>
                Urgent Sample
              </div>
            </div>
          </div>
          <SubmitButton text={"Search"} />
        </div>
      </form>
      <div style={{ height: "300px" }}>
        <DynamicTable
          rows={row}
          name="Sample Details"
          //   loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>
      <div className="flex gap-3 flex-row items-end justify-end mx-2 ">
        {" "}
        <SubmitButton
          text={"Sample Collection"}
          submit={false}
          callBack={() => {}}
          style={{ padding: "5px 10px", width: "150px" }}
        />
        <SubmitButton
          text={"Department Receive"}
          submit={false}
          callBack={() => {}}
          style={{ padding: "5px 10px", width: "150px" }}
        />
      </div>
    </div>
  );
}
