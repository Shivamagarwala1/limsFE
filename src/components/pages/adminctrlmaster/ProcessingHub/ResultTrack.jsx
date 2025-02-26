import React, { useEffect, useState } from "react";
import DynamicTable, {
  TableHeader,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import UrgentGif from "../../../../assets/UrgentGif.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { useGetData, usePostData } from "../../../../service/apiService";
import { ImCross } from "react-icons/im";
import { FaCommentDots, FaComments, FaPlus, FaPrint } from "react-icons/fa";
import {
  InfoPopup,
  InvestigationRemarkPopupModal,
  RejectPopupModal,
  ReRunPopup,
  ResultTrackRejectPopupModal,
  ResultTrackRemarkPopupModal,
  SampleCollectionCommentPopupModal,
} from "../../../../Custom Components/PopupModal";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import RemarkGif from "../../../../assets/RemarkGif.gif";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import CustomHandsontable from "../../../../Custom Components/CustomHandsontable";
import { getLocal, setLocal } from "usehoks";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import { addObjectId } from "../../../../service/RedendentData";
import { toast } from "react-toastify";
import { getAllResultTrackinDataApi } from "../../../../service/service";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import { ResultTrackingHeader } from "../../../listData/listData";
import { FaCircleInfo } from "react-icons/fa6";

export default function ResultTrack() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [Organism, setOrganism] = useState([]);
  const [RemarkPopup, setRemarkPopup] = useState(false);
  const [Info, setInfo] = useState(null);
  const [Row, setRow] = useState({});
  const [ReRun, setReRun] = useState(null);
  const [UserObj, setUserObj] = useState(null);
  const [showStates, setShowStates] = useState({});
  const [RejectPopup, setRejectPopup] = useState(false);
  const AllCenterData = useGetData();
  const TestData = useGetData();
  const DepartmentData = useGetData();
  const PostData = usePostData();
  const lsData = getLocal("imarsar_laboratory");
  const [isHoveredTable, setIsHoveredTable] = useState(null);

  const [allResultTrackingData, setAllResultTrackingData] = useState([]);

  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    TestData?.fetchData(
      "/itemMaster?select=itemId,ItemName&$filter=(isactive eq 1)"
    );

    DepartmentData?.fetchData(
      "/labDepartment?select=id,deptname&$filter=(isactive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Sr. No",
      width: 20,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>{params?.row?.id}</div>
            {params?.row?.urgent == 1 && (
              <img style={{ width: "20px" }} src={UrgentGif} alt="Urgent Gif" />
            )}
          </div>
        );
      },
    },

    {
      field: `bookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `patientId`,
      headerName: `Visit Id`,
      flex: 1,
    },
    {
      field: `sampleReceiveDate`,
      headerName: `Sample Rec. Date`,
      flex: 1,
    },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `age`,
      headerName: `Age/Gender`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
            {params?.row?.age}/{params?.row?.gender}
          </div>
        );
      },
    },
    {
      field: `barcodeNo`,
      headerName: `Barcode No.`,
      flex: 1,
    },
    {
      field: `investigationName`,
      headerName: `Test Name`,
      flex: 1,
      renderCell: (params) => {

        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text={params?.row?.investigationName}
              callBack={() => {
                setRow(params?.row);
                currentRow(params?.row?.id);
              }}
              style={{
                // width: "30px",
                fontSize: "0.75rem",
                padding: "0px 20px",
                height: "20px",
              }}
            />
            {/* <SubmitButton
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
            /> */}
          </div>
        );
      },
    },
    {
      field: `approvedDate`,
      headerName: `Approved Date`,
      flex: 1,
    },
    {
      field: `Remark`,
      headerName: `Remark`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{
            display: "flex",
            gap: "5px",
            fontSize: "15px",
            alignItems: "center",
          }}>
            <SubmitButton
              submit={false}
              text={"+"}
              callBack={() => {
                setLocal("testName", params?.row?.TestName);
                setRow({ ...params?.row });
                setRemarkPopup(true);
              }}
              style={{ width: "30px", fontSize: "0.75rem", height: "20px" }}
            />
            {params?.row?.isremark > 0 && (
              <img style={{ width: "20px" }} src={RemarkGif} alt="Remark Gif" />
            )}
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

    {
      field: `comment`,
      headerName: `Comments`,
      flex: 1,
      renderCell: (params) => {
        const rowId = params.row.id;
        const isShown = showStates[rowId] || false;

        const hideComment = () => {
          setShowStates((prev) => ({
            ...prev,
            [rowId]: !isShown,
          }));
        };
        return (
          <>
            <SampleCollectionCommentPopupModal
              setShowPopup={hideComment}
              showPopup={isShown}
              comment={params?.row?.comment}
            />
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {params?.row?.comment?.slice(0, 10)}
              {params?.row?.comment.length > 10 && (
                <>
                  ...
                  <div
                    onClick={() => {
                      setShowStates((prev) => ({
                        ...prev,
                        [rowId]: !isShown,
                      }));
                    }}
                    className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                    style={{
                      background: activeTheme?.menuColor,
                      color: activeTheme?.iconColor,
                    }}
                  >
                    <FaCommentDots />
                  </div>
                </>
              )}
            </div>
          </>
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
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    const payload = {
      ...values,
      empId: lsData?.user?.employeeId,
      centreIds: selectedCenter,
      departmentIds: selectedDepartment,
      itemIds: selectedTest,
      reporttype: 2,
    };
    setLocal("payload", payload);

    console.log(payload);


    //console.log(selectedDepartment, " ", selectedTest, " ", selectedCenter);
    PostData?.postRequest("/tnx_BookingItem/GetResultEntryAllData", payload);
    console.log(PostData?.data);

    try {

      const response = await getAllResultTrackinDataApi(payload);

      console.log(response);

      if (response?.success) {
        setAllResultTrackingData(response?.data);
      } else {
        toast.error(error?.message);
      }

    } catch (error) {
      toast.error(error?.message);
    }
  };



  const updatedArray = addObjectId(PostData?.data);

  const currentRow = async (id) => {
    const row = updatedArray?.filter((item) => item?.id == id);


    setUserObj(row[0]);
    return row[0];
  }

  const statuses = [
    {
      Data: 1,
      CallBack: () => { },
    },
    { Data: 3, CallBack: () => { } },
    { Data: 11, CallBack: () => { } },
    // { Data: "Tested", CallBack: () => {} },
    { Data: 5, CallBack: () => { } },
    { Data: 4, CallBack: () => { } },
    { Data: 7, CallBack: () => { } },
    { Data: 9, CallBack: () => { } },
    { Data: 12, CallBack: () => { } },
    { Data: 8, CallBack: () => { } },
    { Data: 6, CallBack: () => { } },
    { Data: 10, CallBack: () => { } },
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
              inputFields={[{ type: "select", name: "rerun", dataOptions: [] }]}
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
      <ResultTrackRemarkPopupModal
        setShowPopup={setRemarkPopup}
        showPopup={RemarkPopup}
        rowData={Row}
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
      <ResultTrackRejectPopupModal
        rowData={Row}
        setShowPopup={setRejectPopup}
        showPopup={RejectPopup}
      />
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div className="mb-1">
          {/* Header Section */}
          <FormHeader title="Patient Search" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <UpdatedMultiSelectDropDown
                id="Center"
                name="serachCenter"
                label="Center"
                placeHolder="Search Center"
                options={AllCenterData?.data}
                isMandatory={false}
                isDisabled={false}
                optionKey="centreId"
                optionValue={["companyName"]}
                selectedValues={selectedCenter}
                setSelectedValues={setSelectedCenter}
              />

              <InputGenerator
                inputFields={[
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
                    label: "Search",
                    type: "select",
                    name: "datetype",
                    defaultView: true,
                    dataOptions: [
                      {
                        id: "tbi.sampleReceiveDate",
                        data: "Sample Received Date",
                      },
                      {
                        id: "tbi.sampleCollectionDate",
                        data: "Sample Collection Date",
                      },
                      { id: "tb.bookingDate", data: "Booking Date" },
                      { id: "tbi.deliveryDate", data: "Delivery Date" },
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
                      name: "status",
                      defaultView: true,
                      dataOptions: [
                        { id: "Pending", status: "Pending" },
                        { id: "Tested", status: "Tested" },
                        { id: "Approved", status: "Approved" },
                        { id: "Urgent", status: "Urgent" },
                        { id: "Machine Result", status: "Machine Result" },
                      ],
                    },
                    {
                      label: "Order By",
                      type: "select",
                      name: "orderby",
                      defaultView: true,
                      dataOptions: [
                        { id: "tb.bookingDate", OrderBy: "Reg. Date" },
                        { id: "tbi.workOrderId", OrderBy: "Work Order" },
                        { id: "tbi.barcodeno", OrderBy: "Barcode No." },
                        {
                          id: "tbi.sampleReceiveDate",
                          OrderBy: "Dept. Received",
                        },
                        { id: "tbi.investigationName", OrderBy: "Test Name" },
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
                    name: "searchvalue",
                  },
                ]}
              />

              <UpdatedMultiSelectDropDown
                id="serachEmployeeList"
                name="Test"
                label="Test"
                placeHolder="Search Test"
                options={TestData?.data}
                isMandatory={false}
                isDisabled={false}
                optionKey="itemId"
                optionValue={["itemName"]}
                selectedValues={selectedTest}
                setSelectedValues={setSelectedTest}
              />

              <UpdatedMultiSelectDropDown
                id="EmployeeList"
                name="serachEmployeeList"
                label="Department"
                placeHolder="Search Department"
                options={DepartmentData?.data}
                isMandatory={false}
                isDisabled={false}
                optionKey="id"
                optionValue={["deptName"]}
                selectedValues={selectedDepartment}
                setSelectedValues={setSelectedDepartment}
              />

              <SubmitButton text={"Search"} />
            </div>

            <LegendButtons statuses={statuses} />
          </form>


          <div className="mt-1" style={{ maxHeight: "200px", overflow: "scroll" }}>
           
            <DynamicTable
              rows={updatedArray}
              name="Patient Test Details"
              loading={PostData?.loading}
              tableStyle={{ marginBottom: "-25px" }}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div>
        </div>

        <div>
          {/* {UserObj && (
          <>
            <CustomHandsontable
              columns={columns1}
              rows={tableData}
              onEdit={setTableData}
              name="Result Entry"
            />
            <div
              className="w-full h-[0.10rem]"
              style={{ background: activeTheme?.menuColor }}
            ></div>

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-4 mx-1 lg:mx-2">
                  {/* Specimen Field *
                  <InputGenerator
                    inputFields={[
                      { label: "Signature", type: "select", name: "Signature" },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Save",
                        submit: false,
                        callBack: () => console.log("Save clicked"),
                      },
                      {
                        label: "Hold",
                        submit: false,
                        callBack: () => console.log("Hold clicked"),
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Approve",
                        submit: false,
                        callBack: () => console.log("Approve clicked"),
                      },
                      {
                        label: "Print Report",
                        submit: false,
                        callBack: () => console.log("Print Report clicked"),
                      },
                    ]}
                  />

                  <TwoSubmitButton
                    options={[
                      {
                        label: "Add Report",
                        submit: false,
                        callBack: () => console.log("Add Report clicked"),
                      },
                      {
                        label: "Add Attachment",
                        submit: false,
                        callBack: () => console.log("Add Attachment clicked"),
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Main List",
                        submit: false,
                        callBack: () => console.log("Main List clicked"),
                      },
                      {
                        label: "Previous",
                        submit: false,
                        callBack: () => console.log("Previous clicked"),
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Next",
                        submit: false,
                        callBack: () => console.log("Next clicked"),
                      },
                    ]}
                  />
                </div>
              </form>
            </div>
          </>
        )} */}
        </div>

        <div>
          <GridDataDetails
            gridDataDetails={'Patient Record Details'}
          />

          <CustomDynamicTable columns={ResultTrackingHeader} activeTheme={activeTheme}>
            <tbody>
              {allResultTrackingData?.map((data, index) => (
                <tr
                  className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                    ? ''
                    : index % 2 === 0
                      ? 'bg-gray-100'
                      : 'bg-white'
                    }`}
                  key={index}
                  onMouseEnter={() => setIsHoveredTable(index)}
                  onMouseLeave={() => setIsHoveredTable(null)}
                  style={{
                    background:
                      isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                    // Hides scrollbar for IE/Edge
                  }}
                >
                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                    {index + 1}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.bookingDate}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.workOrderId}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.sampleReceiveDate}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.patientName}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.age}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.barcodeNo}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.investigationName}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.approvedDate}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.isremark}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    <FaCircleInfo />
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.comment}
                  </td>



                  {/* <td className="border-b px-4 h-5 text-xs font-semibold text-gridTextColor" >
                    <div className="flex justify-start gap-5 items-startjustify-start text-xs">
                      <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                      >
                        <FaCircleInfo />
                      </div>
                      {
                        data?.documnet === 1 && (
                          <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            onClick={() => handelDownloadInfoOrDocument(data?.workOrderId)}
                          >
                            <FaDownload />
                          </div>
                        )
                      }

                    </div>
                  </td>

                  <td className="border-b px-4 h-5 text-sm font-semibold">
                    <div className="flex justify-center items-center">
                      <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <FaRupeeSign />
                      </div>
                    </div>

                  </td>

                  <td className="border-b px-4 h-5 text-sm font-semibold">
                    <div className="flex justify-center items-center">

                      <div
                        className="w-5 h-5 flex justify-center items-center rounded-sm"
                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                        onClick={() => handelDownloadCashReceipt(data?.workOrderId)}
                      >
                        <FaFilePdf />
                      </div>
                    </div>
                  </td>

                  <td className="border-b px-4 h-5 text-sm font-semibold">
                    <div className="flex justify-center items-center">

                      <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                        onClick={() => handelDownloadMRPreceipt(data?.workOrderId)}
                      >
                        <FaFilePdf />

                      </div>
                    </div>
                  </td> */}

                </tr>
              ))}
            </tbody>
          </CustomDynamicTable >
        </div >


      </>
    </div>
  );
}
