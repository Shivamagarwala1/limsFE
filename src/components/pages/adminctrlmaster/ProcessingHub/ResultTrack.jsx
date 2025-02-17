import React, { useEffect, useState } from "react";
import DynamicTable, {
  TableHeader,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { useGetData } from "../../../../service/apiService";
import { ImCross } from "react-icons/im";
import { FaComments, FaPlus, FaPrint } from "react-icons/fa";
import {
  InfoPopup,
  InvestigationRemarkPopupModal,
  RejectPopupModal,
  ReRunPopup,
} from "../../../../Custom Components/PopupModal";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import CustomeEditor from "../../../sharecomponent/CustomeEditor";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import CustomHandsontable from "../../../../Custom Components/CustomHandsontable";
import { setLocal } from "usehoks";

export default function ResultTrack() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [Organism, setOrganism] = useState([]);
  const [RemarkPopup, setRemarkPopup] = useState(false);
  const [Info, setInfo] = useState(null);
  const [ReRun, setReRun] = useState(null);
  const [UserObj, setUserObj] = useState(null);
  const [RejectPopup, setRejectPopup] = useState(false);
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
      field: `VisitId`,
      headerName: `Visit Id`,
      flex: 1,
    },
    {
      field: `SampleRecDate`,
      headerName: `Sample Rec. Date`,
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
      headerName: `Barcode No.`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params.row)
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text={params?.row?.TestName}
              callBack={() => {
                setUserObj(params?.row);
              }}
              style={{
                width: "30px",
                fontSize: "0.75rem",
                padding: "0px 20px",
                height: "20px",
              }}
            />
            <SubmitButton
              submit={false}
              text={"ESR"}
              callBack={() => {
                setUserObj(params?.row);
              }}
              style={{
                width: "30px",
                fontSize: "0.75rem",
                padding: "0px 20px",
                height: "20px",
              }}
            />
            <SubmitButton
              submit={false}
              text={"HB"}
              callBack={() => {
                setUserObj(params?.row);
              }}
              style={{
                width: "30px",
                fontSize: "0.75rem",
                padding: "0px 20px",
                height: "20px",
              }}
            />
            <SubmitButton
              submit={false}
              text={"HBA1"}
              callBack={() => {
                setUserObj(params?.row);
              }}
              style={{
                width: "30px",
                fontSize: "0.75rem",
                padding: "0px 20px",
                height: "20px",
              }}
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
    {
      field: `ApprovedDate`,
      headerName: `Approved Date`,
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
              style={{ width: "30px", fontSize: "0.75rem", height: "20px" }}
            />
          </div>
        );
      },
    },
    {
      field: `Info`,
      headerName: `Info`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params.row)
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text={"i"}
              callBack={() => {
                setInfo(true);
              }}
              style={{ width: "30px", fontSize: "0.75rem", height: "20px" }}
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
      PatientName: "John, 50032",
      Barcode: "10993",
      SampleRecDate: "10-02-2025",
      VisitId: "302",
      ApprovedDate: "12-Feb-25",
      SampleType: "Blood",
      Comments: "Lorem Ipsum",
      TestName: "CBC",
      AgeGender: "25/male",
      TransferDate: "15-Feb-2025",
      BookingDate: "11-Feb-2025",
      ToCentre: "New-Delhi",
      FromCentre: "Ayodhya",
      ResultBy: "Dr. John",
      ResultAt: "15-Feb-2025",
      EntryBy: "Dr. Brock",
      EntryAt: "11-Feb-2025",
      RecieveAt: "05-Feb-2025",
      RecieveBy: "Dr. Rock",
      CollectionBy: "Dr. Roman",
      CollectionAt: "01-Feb-2025",
    },
  ];

  //accept child to parent in editor
  const handleContentChange = (content) => {
    // Update editor content
    setCommentMasterData((preventDefault) => ({
      ...preventDefault,
      template: content,
    }));
    //setEditorContent(content);
  };

  // -------------------------------------------------------------
  const [tableData, setTableData] = useState([
    {
      id: 2,
      Test: "Thyroid - T3 T4 & TSH",
      R: true,
      Checkbox: true,
      ReRun: true,
      name: "John",
      Value: null,
      comment: false,
      age: 28,
      role: "Developer",
      subTest: [
        {
          id: "i1",
          Test: "Triodothyrine",
          flag: "Normal",
          Machine: "#01",
          Min: "0.70",
          Max: "2.10",
          comment: true,
          MachineReading: "001",
          Unit: "ng/ml",
          MethodName: "CLIA",
          DisplayReading: "0.82-2.34",
          OldReading: "0.01",
          Value: "Lorem Ipsum",
        },
        {
          id: "i2",
          Test: "Triodothyrine 1",
          flag: "Normal",
          Machine: "#01",
          Min: "0.70",
          Max: "2.10",
          comment: true,
          Unit: "ng/ml",
          MachineReading: "002",
          MethodName: "CLIA",
          DisplayReading: "0.82-2.34",
          OldReading: "0.01",
          Value: "Lorem Ipsum",
        },
        {
          id: "i3",
          Test: "Triodothyrine 2",
          flag: "Normal",
          Machine: "#01",
          Min: "0.70",
          Max: "2.10",
          Unit: "ng/ml",
          comment: true,
          MachineReading: "003",
          MethodName: "CLIA",
          DisplayReading: "0.82-2.34",
          OldReading: "0.01",
          Value: "Lorem Ipsum",
        },
      ],
    },
  ]);

  const columns1 = [
    {
      field: "Test",
      headerName: "Test Name",
      flex: 1,
      renderCell: ({ row }) => {
        const [Checked, setChecked] = useState(true);
        return (
          <div style={{ width: "160px" }} className="flex gap-2 text-center">
            {row?.Test}
            {row?.Checkbox && (
              <input
                type="checkbox"
                checked={Checked}
                onChange={() => setChecked(!Checked)}
              />
            )}
            {row?.R && (
              <SubmitButton
                submit={false}
                text={"Reject"}
                callBack={() => {
                  setRejectPopup(true);
                }}
                style={{
                  width: "80px",
                  fontSize: "0.75rem",
                  height: "20px",
                  backgroundColor: "red !important",
                }}
              />
            )}
            {row?.ReRun && (
              <SubmitButton
                submit={false}
                text={"Re-Run"}
                callBack={() => {
                  setReRun(true);
                }}
                style={{
                  width: "80px",
                  fontSize: "0.75rem",
                  height: "20px",
                  backgroundColor: "red !important",
                }}
              />
            )}
            {row?.ReRun && (
              <SubmitButton
                submit={false}
                text={"Comment"}
                style={{
                  width: "80px",
                  fontSize: "0.75rem",
                  height: "20px",
                  backgroundColor: "red !important",
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "Value",
      headerName: "Value",
      width: 80,
      renderCell: ({ row }) => {
        const [value, setValues] = useState(row?.Value);
        return (
          <div style={{ width: "80px" }} className="flex gap-2 text-center">
            {row?.Value ? (
              <input
                style={{ width: "80px" }}
                className=" border border-gray-300"
                type="text"
                value={value}
                onChange={(e) => setValues(e.target.value)}
              />
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    {
      field: "flag",
      headerName: "Flag",
      flex: 1,
    },
    {
      field: "Comment",
      headerName: "Comment",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <div style={{}} className="flex gap-2 text-center">
            {row?.comment ? <FaComments /> : ""}
          </div>
        </>
      ),
    },
    {
      field: "MachineReading",
      headerName: "Machine Reading",
      flex: 1,
    },
    {
      field: "Machine",
      headerName: "Machine",
      flex: 1,
    },
    {
      field: "Min",
      headerName: "Min",
      flex: 1,
    },
    {
      field: "Max",
      headerName: "Max",
      flex: 1,
    },
    {
      field: "Unit",
      headerName: "Unit",
      flex: 1,
    },
    {
      field: "MethodName",
      headerName: "Method Name",
      flex: 1,
    },
    {
      field: "DisplayReading",
      headerName: "Display Reading",
      flex: 1,
    },
    {
      field: "OldReading",
      headerName: "Old Reading",
      flex: 1,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell: ({ row }) => (
    //     <button onClick={() => alert(`Editing ${row.name}`)}>Edit</button>
    //   ),
    // },
  ];

  const handleSubmit = () => {};
  const statuses = [
    {
      Data: 1,
      CallBack: () => {},
    },
    { Data: 3, CallBack: () => {} },
    { Data: 11, CallBack: () => {} },
    // { Data: "Tested", CallBack: () => {} },
    { Data: 5, CallBack: () => {} },
    { Data: 4, CallBack: () => {} },
    { Data: 7, CallBack: () => {} },
    { Data: 9, CallBack: () => {} },
    { Data: 12, CallBack: () => {} },
    { Data: 8, CallBack: () => {} },
    { Data: 6, CallBack: () => {} },
    { Data: 10, CallBack: () => {} },
  ];

  const InfoColumns = [
    { field: "id", headerName: "Sr. No", width: 20 },

    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `Barcode`,
      headerName: `Barcode`,
      flex: 1,
    },
    {
      field: `CollectionAt`,
      headerName: `Collection At`,
      flex: 1,
    },
    {
      field: `CollectionBy`,
      headerName: `Collection By`,
      flex: 1,
    },
    {
      field: `RecieveBy`,
      headerName: `Recieve By`,
      flex: 1,
    },
    {
      field: `RecieveAt`,
      headerName: `Recieve At`,
      flex: 1,
    },
    {
      field: `EntryAt`,
      headerName: `Entry At`,
      flex: 1,
    },
    {
      field: `EntryBy`,
      headerName: `Entry By`,
      flex: 1,
    },

    {
      field: `ResultAt`,
      headerName: `Result At`,
      flex: 1,
    },
    {
      field: `ResultBy`,
      headerName: `Result By`,
      flex: 1,
    },
    {
      field: `OutSourceDate`,
      headerName: `OutSource Date`,
      flex: 1,
    },
    {
      field: `OutSourceLab`,
      headerName: `OutSource Lab`,
      flex: 1,
    },
    {
      field: `OutSourceBy`,
      headerName: `OutSource By`,
      flex: 1,
    },
    {
      field: `Out-HouseTransferDate`,
      headerName: `Out-House Transfer Date`,
      flex: 1,
    },
    {
      field: `Out-HouseTransferLab`,
      headerName: `Out-House Transfer Lab`,
      flex: 1,
    },
    {
      field: `Out-HouseTransferBy`,
      headerName: `Out-House Transfer By`,
      flex: 1,
    },
  ];
  const ReRunColumns = [
    {
      field: "id",
      headerName: "Sr. No",
      width: 20,
      renderCell: ({ row }) => (
        <>
          <div className="flex gap-2 text-center">
            {row?.id} <input type="checkbox" /> 
          </div>
        </>
      ),
    },

    {
      field: `TestName`,
      headerName: `Observation Name`,
      flex: 1,
    },
    {
      field: `Reson`,
      headerName: `Re-Run Remark`,
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <div style={{}} className="flex gap-2 text-center">
            <InputGenerator
              inputFields={[
                { type: "select", name: "rerun",dataOptions:[] },
              ]}
            />
          </div>
        </>
      ),
    },
    {
      field: `Action`,
      headerName: ``,
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <div style={{}} className="flex gap-2 text-center">
            <SubmitButton
              text={"Save"}
              submit={false}
              style={{ width: "80px" }}
            />
          </div>
        </>
      ),
    },
  ];
  const ReRunRow = [
    { id: 1, TestName: "CBC" },
    { id: 2, TestName: "HB" },
  ];
  return (
    <div>
      {" "}
      <InvestigationRemarkPopupModal
        setShowPopup={setRemarkPopup}
        showPopup={RemarkPopup}
      />
      <ReRunPopup
        heading="Re-Run"
        setShowPopup={setReRun}
        showPopup={ReRun}
        rows={ReRunRow}
        columns={ReRunColumns}
      />
      <InfoPopup
        heading="Patient Information"
        setShowPopup={setInfo}
        rows={row}
        columns={InfoColumns}
        showPopup={Info}
      />
      <RejectPopupModal setShowPopup={setRejectPopup} showPopup={RejectPopup} />
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div className="mb-1">
          {/* Header Section */}
          <FormHeader title="Result Track" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <MultiSelectDropdown
                field={{
                  label: "Centre",
                  name: "CentreMode",
                  keyField: "centreId",
                  selectedValues: selectedCenter,
                  showValueField: "companyName",
                  dataOptions: AllCenterData?.data,
                  callBack: (selected) => setSelectedCenter(selected),
                }}
              />
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
                    label: "Search",
                    type: "select",
                    name: "Search1",
                    defaultView: true,
                    dataOptions: [
                      { id: 1, data: "Sample Received Date" },
                      { id: 2, data: "Sample Collection Date" },
                      { id: 3, data: "Booking Date" },
                      { id: 4, data: "Delivery Date" },
                    ],
                  },
                ]}
              />
              <div className="flex gap-[0.25rem]">
                <InputGenerator
                  inputFields={[
                    {
                      label: "Status",
                      type: "select",
                      name: "Status",
                      defaultView: true,
                      dataOptions: [
                        { id: 1, status: "Pending" },
                        { id: 2, status: "Tested" },
                        { id: 3, status: "Approved" },
                        { id: 4, status: "Urgent" },
                        { id: 5, status: "Machine Result" },
                      ],
                    },
                    {
                      label: "Order By",
                      type: "select",
                      name: "OrderBy",
                      defaultView: true,
                      dataOptions: [
                        { id: 1, OrderBy: "Reg. Date" },
                        { id: 2, OrderBy: "Work Order" },
                        { id: 3, OrderBy: "Barcode No." },
                        { id: 4, OrderBy: "Dept. Received" },
                        { id: 5, OrderBy: "Test Name" },
                      ],
                    },
                  ]}
                />
              </div>
              <InputGenerator
                inputFields={[
                  {
                    label: "Search Barcode,Batch No.",
                    type: "text",
                    name: "Search",
                  },
                  {
                    label: "Test",
                    type: "select",
                    name: "Test",
                    dataOptions: [],
                  },
                  {
                    label: "Department",
                    type: "select",
                    name: "Department",
                    dataOptions: [],
                  },
                ]}
              />

              <SubmitButton text={"Search"} />
            </div>

            <LegendButtons statuses={statuses} />
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="Result Track Details"
              //   loading={loading}
              tableStyle={{ marginBottom: "-10px" }}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div>
        </div>
        {UserObj && (
          <>
            <CustomHandsontable
              columns={columns1}
              rows={tableData}
              onEdit={setTableData}
              name="User Table"
            />
            <div
              className="w-full h-[0.10rem]"
              style={{ background: activeTheme?.menuColor }}
            ></div>
          </>
        )}
      </>
    </div>
  );
}
