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

export default function SampleLogisticReceive() {
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
      field: `BookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `PatientId`,
      headerName: `Patient Id`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `Barcode`,
      headerName: `Barcode No.`,
      flex: 1,
    },
    {
      field: `Department`,
      headerName: `Department`,
      flex: 1,
    },
    {
      field: `TransferDate`,
      headerName: `Transfer Date`,
      flex: 1,
    },
    {
      field: `FromCentre`,
      headerName: `From Centre`,
      flex: 1,
    },
    {
      field: `ToCentre`,
      headerName: `ToCentre`,
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
      SampleType: "Blood",
      TestName: "CBC",
      TransferDate:"15-Feb-2025",
      BookingDate:"11-Feb-2025",
      ToCentre:"New-Delhi",
      FromCentre:"Ayodhya",
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
        <div>Sample Logistic</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
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
                label: "Search Barcode,Batch No.",
                type: "text",
                name: "Search",
              }
            ]}
          />
         <SubmitButton text={'Search'} />
        </div>
      </form>
      <div style={{ height: "200px" }}>
        <DynamicTable
          rows={row}
          name="Sample Logistic Details"
          //   loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>
    </div>
  );
}
