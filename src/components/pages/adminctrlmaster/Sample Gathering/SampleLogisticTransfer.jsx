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
import { FaPlus, FaPrint } from "react-icons/fa";

export default function SampleLogisticTransfer() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
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
      field: `PatientId`,
      headerName: `Patient Id`,
      flex: 1,
    },
    {
      field: `VisitorName`,
      headerName: `Visitor Name`,
      flex: 1,
    },
    {
      field: `Remark`,
      headerName: `Remark`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <InputGenerator
              inputFields={[{ type: "text", placeholder: "Remark" }]}
            />
          </div>
        );
      },
    },
    {
      field: `Barcode`,
      headerName: `Barcode No.`,
      flex: 1,
    },
    {
      field: `DateTime`,
      headerName: `Date & Time`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `SampleType`,
      headerName: `Sample Type`,
      flex: 1,
    },
  
  ];
  const row = [
    {
      id: 1,
      Centre: "105 - center 1",
      Department: "Nursing",
      Barcode: "10993",
      PatientId: "302",
      DateTime: "12-Feb-25",
      VisitorName: "John Doe",
      SampleType: "Blood",
      TestName: "CBC",
      Remark: "lorem ipsum",
    },
  ];
  const columns1 = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `FromCentre`,
      headerName: `From Centre`,
      flex: 1,
    },
    {
      field: `ToCentre`,
      headerName: `To Centre`,
      flex: 1,
    },
    {
      field: `Batch`,
      headerName: `Batch`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <InputGenerator
              inputFields={[{ type: "text", placeholder: "Batch No." }]}
            />
          </div>
        );
      },
    },
    {
      field: `TransferThrough`,
      headerName: `Transfer Through`,
      flex: 1,
    },
    {
      field: `TransferBy`,
      headerName: `Transfer By`,
      flex: 1,
    },
    {
      field: `TransferDate`,
      headerName: `Transfer Date`,
      flex: 1,
    },
  
  ];
  const row1 = [
    {
      id: 1,
      FromCentre: "105 - center 1",
      ToCentre: "105 - center 5",
      TransferThrough: "10993",
      TransferDate: "25-Feb-25",
      TransferBy: "John Doe",
      SampleType: "Blood",
      TestName: "CBC",
      Remark: "lorem ipsum",
    },
  ];
  const handleSubmit = () => {};

  return (
    <div>
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Sample Transfer</div>
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
                label: "Batch No.",
                type: "text",
                name: "Batch",
              },
              {
                label: "Filter",
                type: "select",
                name: "filter",
                dataOptions: [
                  { id: 1, type: "Today" },
                  { id: 2, type: "Yesterday" },
                  { id: 3, type: "Last 7 Days" },
                  { id: 4, type: "Custom" },
                ],
              },
              {
                label: "Barcode",
                type: "text",
                name: "Barcode",
              },
              {
                label: "Transfer",
                type: "select",
                name: "transfer",
                dataOptions: [
                  { id: 1, type: "Phelebo" },
                  { id: 2, type: "By Bus" },
                  { id: 3, type: "By Train" },
                  { id: 4, type: "Courier" },
                ],
              },
            ]}
          />
          <div className="flex gap-[0.25rem]">
            <div className="relative flex-1 gap-1 flex justify-start items-center">
              <button
                type={"button"} // Corrected type handling
                onClick={() => {}} // Directly pass the callback
                className="font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                View
              </button>
              <button
                type={"button"} // Corrected type handling
                onClick={() => {}} // Directly pass the callback
                className="font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                Transfer All
              </button>
            </div>
          </div>
        </div>
      </form>
      <div style={{ height: "200px" }}>
        <DynamicTable
          rows={row}
          name="Sample Details"
          //   loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>
      <div style={{ height: "200px" }}>
        <DynamicTable
          rows={row1}
          name="Transfer Details"
          //   loading={loading}
          columns={columns1}
          activeTheme={activeTheme}
        />
      </div>
    </div>
  );
}
