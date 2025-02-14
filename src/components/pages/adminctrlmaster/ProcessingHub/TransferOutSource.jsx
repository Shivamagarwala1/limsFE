import React, { useEffect, useState } from "react";
import InputGenerator, {
  ClickChangeButton,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { FormHeader } from "../../../../Custom Components/FormGenerator";

export default function TransferOutSource() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
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
      field: `VisitId`,
      headerName: `Visit Id`,
      flex: 1,
    },
    {
      field: `PatientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `AgeGender`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `Barcode`,
      headerName: `Barcode`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `BookingRate`,
      headerName: `Booking Rate`,
      flex: 1,
    },
    {
      field: `OutSourceLab`,
      headerName: `Out Source Lab`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator
              inputFields={[
                {
                  type: "select",
                  dataOptions: [],
                  name: "LabName",
                  style: { width: "120px" },
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      field: `Action`,
      headerName: `Action`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <input type="checkbox" />
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
      PatientName: "John Snow",
      Barcode: "10993",
      SampleRecDate: "10-02-2025",
      VisitId: "302",
      BookingRate: "75",
      OutSourceLab: "Dr. LalPath Labs",
      ApprovedDate: "12-Feb-25",
      Reading: "Lorem Ipsum",
      MachineComment: "Lorem Ipsum",
      Remark: "Lorem Ipsum",
      NotApprovedBy: "Tyron",
      Machine: "Machine 1",
      Params: "Alpu",
      CollRec: "0",
      RegColl: "0",
      TestName: "CBC",
      AgeGender: "25/male",
      TransferDate: "15-Feb-2025",
      Date: "11-Feb-2025",
      ToCentre: "New-Delhi",
      FromCentre: "Ayodhya",
    },
  ];

  const handleSubmit = () => {};

  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Transfer Out Source" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <InputGenerator
                inputFields={[
                  { type: "customDateField", label: "From", name: "from" },
                  { type: "customDateField", label: "To", name: "to" },
                  {
                    type: "text",
                    label: "Search by Name/Visitor Id",
                    name: "search",
                  },
                ]}
              />
              <TwoSubmitButton
                options={[
                  { submit: false, label: "Search" },
                  { submit: false, label: "Export to Excel" },
                ]}
              />
            </div>
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="Transfer Out Source Details"
              //   loading={loading}
              tableStyle={{ marginBottom: "-10px" }}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div>
        </div>
      </>
    </div>
  );
}
