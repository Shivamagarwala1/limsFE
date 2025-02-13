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
import {
  FaDownload,
  FaPlus,
  FaRegFilePdf,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import "./ReportDispatch.css";
import {
  InvestigationRemarkPopupModal,
  RejectPopupModal,
} from "../../../../Custom Components/PopupModal";
import { setLocal } from "usehoks";
import { FaCircleInfo } from "react-icons/fa6";
import { RiBillLine } from "react-icons/ri";
import { FormHeader } from "../../../../Custom Components/FormGenerator";

export default function ChangeBarcode() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

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
      field: `VisitorName`,
      headerName: `Visitor Name`,
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
      field: `SampleType`,
      headerName: `Sample Type`,
      flex: 1,
    },
    {
      headerName: `New Barcode`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator inputFields={[{
              type:"text",
              placeholder:"New Barcode"
            }]} />
          </div>
        );
      },
    },
    {
      headerName: `Remark`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator inputFields={[{
              type:"text",
              placeholder:"Remark"
            }]} />
          </div>
        );
      },
    },
  ];
  const row = [
    {
      id: 1,
      VisiotId: "302",
      VisitorName: "John Doe",
      TestName: "CBC",
      BookingDate: "11-Feb-2025",
      Barcode: "123456",
      SampleType:"Blood"
    },
  ];

  const handleSubmit = () => {};

  return (
    <div>
      <FormHeader title="Change Barcode" />
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Visitor  Id",
                type: "text",
                name: "VisitorId",
              },
            ]}
          />
          <SubmitButton text={"Search"} />
        </div>
      </form>
      <div style={{ height: "300px" }}>
        <DynamicTable
          rows={row}
          name="Barcode Details"
          //   loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>
    </div>
  );
}
