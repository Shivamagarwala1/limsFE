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
import { useGetData, usePostData } from "../../../../service/apiService";
import { ImCross } from "react-icons/im";
import { FaCommentDots, FaComments, FaPlus, FaPrint } from "react-icons/fa";
import {
  InfoPopup,
  InvestigationRemarkPopupModal,
  RejectPopupModal,
  ReRunPopup,
  ResultTrackRemarkPopupModal,
  SampleCollectionCommentPopupModal,
} from "../../../../Custom Components/PopupModal";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import CustomeEditor from "../../../sharecomponent/CustomeEditor";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import CustomHandsontable from "../../../../Custom Components/CustomHandsontable";
import { getLocal, setLocal } from "usehoks";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import { addObjectId } from "../../../../service/RedendentData";

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
    { field: "id", headerName: "Sr. No", width: 20 },

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
                setUserObj(params?.row);
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
              {params?.row?.comment.length > 0 && (
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
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
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
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = getValues();
    const payload = {
      ...values,
      empId: lsData?.user?.employeeId,
      centreIds: selectedCenter,
      departmentIds: selectedDepartment,
      itemIds: selectedTest,
    };
    setLocal("payload", payload);
    console.log(selectedDepartment, " ", selectedTest, " ", selectedCenter);
    PostData?.postRequest("/tnx_BookingItem/GetResultEntryAllData", payload);
    console.log(PostData?.data);
  };

  const updatedArray = addObjectId(PostData?.data);

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
      <RejectPopupModal setShowPopup={setRejectPopup} showPopup={RejectPopup} />
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
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={updatedArray}
              name="Patient Test Details"
              loading={PostData?.loading}
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
              name="Result Entry"
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
