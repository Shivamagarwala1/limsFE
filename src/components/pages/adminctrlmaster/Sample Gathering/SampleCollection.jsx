import React, { useEffect, useState } from "react";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { useGetData, usePostData } from "../../../../service/apiService";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import {
  InvestigationRemarkPopupModal,
  RejectPopupModal,
  SampleCollectionRejectPopupModal,
  SampleCollectionRemarkPopupModal,
} from "../../../../Custom Components/PopupModal";
import { getLocal, setLocal } from "usehoks";
import {
  addObjectId,
  SampleCollectionStatus,
} from "../../../../service/RedendentData";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";

export default function SampleCollection() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [RejectPopup, setRejectPopup] = useState(false);
  const [RemarkPopup, setRemarkPopup] = useState(false);
  const [AllCollected, setAllCollected] = useState([]);
  const [AllReceived, setAllReceived] = useState([]);
  const [Row, setRow] = useState({});
  const AllCenterData = useGetData();
  const BulkPostData = usePostData();
  const PostData = usePostData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
  }, []);
  console.log(AllCollected);
  const updatedArray = addObjectId(PostData?.data);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `centreName`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `departmentName`,
      headerName: `Department`,
      flex: 1,
    },
    // {
    //   field: `RegId`,
    //   headerName: `Reg. Id`,
    //   flex: 1,
    // },
    {
      field: `patientId`,
      headerName: `Patient Id`,
      flex: 1,
    },
    // {
    //   field: `RateType`,
    //   headerName: `Rate Type`,
    //   flex: 1,
    // },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `age`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `investigationName`,
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
            {params?.row?.barcodeNo !== "" ? (
              <>{params?.row?.barcodeNo}</>
            ) : (
              // <InputGenerator
              //   inputFields={[{ type: "text", placeholder: "Barcode" }]}
              // />
              ""
            )}
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
            <input
              type="checkbox"
              checked={
                params?.row?.isSampleCollected === "S" ||
                params?.row?.isSampleCollected === "Y"
                  ? false
                  : AllCollected.some((item) => item.id === params?.row.id)
              }
              disabled={
                params?.row?.isSampleCollected === "S" ||
                params?.row?.isSampleCollected === "Y"
              }
              onClick={() =>
                setAllCollected(
                  (prev) =>
                    prev.some((item) => item.id === params?.row.id)
                      ? prev.filter((item) => item.id !== params?.row.id) // Remove if exists
                      : [...prev, { ...params?.row, isSampleCollected: "S" }] // Add if not
                )
              }
            />
            Collected
          </div>
        );
      },
      renderHeaderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <p>Sample Collected</p> {/* <input type="checkbox" /> */}
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
            <input
              type="checkbox"
              disabled={params?.row?.isSampleCollected === "Y"}
              checked={
                params?.row?.isSampleCollected === "Y"
                  ? false
                  : AllReceived.some((item) => item.id === params?.row.id)
              }
              onClick={() =>
                setAllReceived(
                  (prev) =>
                    prev.some((item) => item.id === params?.row.id)
                      ? prev.filter((item) => item.id !== params?.row.id) // Remove if exists
                      : [
                          ...prev,
                          {
                            ...params?.row,
                            isSampleCollected: "Y",
                            empId: 1,
                          },
                        ] // Add if not
                )
              }
            />
            Received
          </div>
        );
      },
      renderHeaderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <p>Dept. Receive</p>
            {/* <input type="checkbox" /> */}
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
                setRow(params?.row);
                setRejectPopup(true);
              }}
              style={{ width: "30px", fontSize: "0.75rem" }}
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
                setRow(params?.row);
                setRemarkPopup(true);
              }}
              style={{ width: "30px", fontSize: "0.75rem" }}
            />
          </div>
        );
      },
    },
    {
      field: `comment`,
      headerName: `Comments`,
      flex: 1,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = getValues();
    const lsData = getLocal("imarsar_laboratory");
    const payload = { ...values, createdById: lsData?.user?.employeeId };
    console.log(payload);
    PostData?.postRequest("/tnx_BookingItem/GetSampleProcessingData", payload);
    console.log(PostData?.data);
  };

  const statuses = [
    { Data: 11, CallBack: () => {} },
    { Data: 1, CallBack: () => {} },
    { Data: 24, CallBack: () => {} },
    { Data: 3, CallBack: () => {} },
    { Data: 25, CallBack: () => {} },
  ];

  return (
    <div>
      {/* Header Section */}
      <SampleCollectionRemarkPopupModal
        setShowPopup={setRemarkPopup}
        showPopup={RemarkPopup}
        rowData={Row}
      />
      <SampleCollectionRejectPopupModal
        rowData={Row}
        setShowPopup={setRejectPopup}
        showPopup={RejectPopup}
      />
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
                name: "centreId",
                dataOptions: AllCenterData?.data,
              },
              {
                label: "From Date",
                type: "customDateField",
                name: "fromDate",
              },
              {
                label: "To Date",
                type: "customDateField",
                name: "toDate",
              },
              {
                label: "Barcode",
                type: "text",
                name: "barcodeNo",
              },
              {
                label: "Status",
                type: "select",
                name: "status",
                keyField: "value",
                dataOptions: SampleCollectionStatus,
              },
            ]}
          />
          <SubmitButton text={"Search"} />
        </div>
        <LegendButtons statuses={statuses} />
      </form>
      <div style={{ maxHeight: "350px", overflowY: "auto" }}>
        <DynamicTable
          rows={updatedArray}
          name="Sample Details"
          loading={PostData?.loading}
          columns={columns}
          activeTheme={activeTheme}
          legendColors={true}
        />
      </div>

      {PostData?.data.length !== 0 && (
        <div className="flex gap-3 mb-4 flex-row items-end justify-end mx-2">
          <TwoSubmitButton
            options={[
              {
                submit: false,
                label: "Sample Collection",
                style: { width: "120px" },
                callBack: () => {
                  BulkPostData?.postRequest(
                    "/tnx_BookingItem/UpdateSampleStatus",
                    AllCollected
                  );
                },
              },
              {
                submit: false,
                label: "Sample Receive",
                style: { width: "120px" },
                callBack: () => {
                  BulkPostData?.postRequest(
                    "/tnx_BookingItem/UpdateSampleStatus",
                    AllReceived
                  );
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
