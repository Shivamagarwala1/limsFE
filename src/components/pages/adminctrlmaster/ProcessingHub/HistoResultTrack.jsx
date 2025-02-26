import React, { useEffect, useState } from "react";
import DynamicTable, {
  TableHeader,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  MinMaxInputGenerator,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import CustomeEditor from "../../../sharecomponent/CustomeEditor";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import {
  HistoResultTrackRemarkPopupModal,
  SampleCollectionCommentPopupModal,
} from "../../../../Custom Components/PopupModal";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import { getLocal, setLocal } from "usehoks";
import { addObjectId } from "../../../../service/RedendentData";
import RemarkGif from "../../../../assets/RemarkGif.gif";
import toast from "react-hot-toast";

export default function HistoResultTrack() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const SaveForm = useFormHandler();
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [RemarkPopup, setRemarkPopup] = useState(false);
  const [Row, setRow] = useState({});
  const [Specimen, setSpecimen] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editorContent1, setEditorContent1] = useState("");
  const [editorContent2, setEditorContent2] = useState("");
  const [UserObj, setUserObj] = useState(null);
  const [CurrentId, setCurrentId] = useState(0);
  const [showStates, setShowStates] = useState({});
  const AllCenterData = useGetData();
  const TestData = useGetData();
  const DepartmentData = useGetData();
  const PostData = usePostData();
  const SavePostData = usePostData();
  const retreveTest = useGetData();
  const Signature = useGetData();
  const lsData = getLocal("imarsar_laboratory");
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    TestData?.fetchData(
      "/itemMaster?select=itemId,ItemName&$filter=(isactive eq 1)"
    );
    Signature?.fetchData(
      `/doctorApprovalMaster/Doctorcenterwise?empid=${lsData?.user?.employeeId}&centreid=${lsData?.user?.defaultCenter}`
    );
    DepartmentData?.fetchData(
      "/labDepartment?select=id,deptname&$filter=(isactive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);

  let PayloadData = getLocal("HistoPayload");
  const updatedArray = addObjectId(PostData?.data);
  const currentRow = async (id) => {
    const row = updatedArray?.filter((item) => item?.id == id);
    setUserObj(row[0]);
    return row[0];
  };

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
                retreveTestData(params?.row?.testid);
                setCurrentId(params?.row?.id);
                currentRow(params?.row?.id);
              }}
              style={{
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
          <div
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "15px",
              alignItems: "center",
            }}
          >
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
              {/* {params?.row?.comment.length > 10 && (
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
              )} */}
            </div>
          </>
        );
      },
    },
  ];

  //accept child to parent in editor
  const handleContentChange = (content) => {
    // Update editor content
    setEditorContent(content);
  };
  //accept child to parent in editor
  const handleContentChange1 = (content) => {
    // Update editor content
    setEditorContent1(content);
  };
  const handleContentChange2 = (content) => {
    // Update editor content
    setEditorContent2(content);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = getValues();
    const payload = {
      ...values,
      empId: lsData?.user?.employeeId,
      centreIds: selectedCenter,
      departmentIds: selectedDepartment,
      itemIds: selectedTest,
      status: values?.status,
      reporttype: 5,
    };
    setLocal("HistoPayload", payload);
    console.log(selectedDepartment, " ", selectedTest, " ", selectedCenter);
    PostData?.postRequest("/tnx_BookingItem/GetResultEntryAllData", payload);
    console.log(PostData?.data);
  };
  const statuses = [
    {
      Data: 1,
      CallBack: () => {
        // Sample Collected
        const data = { ...PayloadData, status: "Sample Collected" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 3,
      CallBack: () => {
        // Reject-Sample
        const data = { ...PayloadData, status: "Reject-Sample" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 11,
      CallBack: () => {
        // Pending Report
        const data = { ...PayloadData, status: "Pending Report" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 5,
      CallBack: () => {
        // Report Hold
        const data = { ...PayloadData, status: "Report Hold" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 4,
      CallBack: () => {
        // Approved Report
        const data = { ...PayloadData, status: "Approved Report" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 7,
      CallBack: () => {
        // Report Print
        const data = { ...PayloadData, status: "Report Print" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 9,
      CallBack: () => {
        // Sample Rerun
        const data = { ...PayloadData, status: "Sample Rerun" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 12,
      CallBack: () => {
        // Under Machine
        const data = { ...PayloadData, status: "Under Machine" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 8,
      CallBack: () => {
        // Machine Data
        const data = { ...PayloadData, status: "Machine Data" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 6,
      CallBack: () => {
        // Report Save
        const data = { ...PayloadData, status: "Report Save" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 10,
      CallBack: () => {
        // Out Source
        const data = { ...PayloadData, status: "Out Source" };
        LegendButtonSearch(data);
      },
    },
  ];

  const LegendButtonSearch = async (Data) => {
    try {
      PostData?.postRequest("/tnx_BookingItem/GetSampleProcessingData", Data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const values = SaveForm?.getValues();
    const payload = {
      ...values,
      ...UserObj,
      gross: editorContent,
      microscopy: editorContent1,
      finalImpression: editorContent2,
      createdBy: lsData?.user?.employeeId,
    };
    const res = await SavePostData?.postRequest(
      "/tnx_BookingItem/SaveHistoResult",
      payload
    );
    if (res?.success) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
    console.log(editorContent1, " ", editorContent, " ", editorContent2);
    console.log(values);
  };

  console.log(Signature?.data);
  const retreveTestData = async (id) => {
    const res = await retreveTest?.fetchData(
      `/tnx_Observations_Histo?$filter=(testId eq ${id})`
    );
    console.log(res);
    if (res?.data.length > 0) {
      SaveForm?.setValues([
        {
          specimen: res?.data[0]?.specimen,
          biospyNumber: res?.data[0]?.biospyNumber,
          clinicalHistory: res?.data[0]?.clinicalHistory,
          typesFixativeUsed: res?.data[0]?.typesFixativeUsed,
          blockKeys: res?.data[0]?.blockKeys,
          stainsPerformed: res?.data[0]?.stainsPerformed,
        },
      ]);
      setEditorContent(res?.data[0]?.gross);
      setEditorContent1(res?.data[0]?.microscopy);
      setEditorContent2(res?.data[0]?.finalImpression);
    } else {
      // SaveForm?.setValues([
      //   {
      //     specimen: "",
      //     biospyNumber: "",
      //     clinicalHistory: "",
      //     typesFixativeUsed: "",
      //     blockKeys: "",
      //     stainsPerformed: "",
      //   },
      // ]);
      setEditorContent("");
      setEditorContent1("");
      setEditorContent2("");
    }
  };

  return (
    <div>
      <>
        <HistoResultTrackRemarkPopupModal
          setShowPopup={setRemarkPopup}
          showPopup={RemarkPopup}
          rowData={Row}
        />
        {/* Header Section */}
        <div>
          <FormHeader title="Histo Result Track" />
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
          {UserObj ? (
            <div style={{ height: "60px" }}>
              <DynamicTable
                rows={[UserObj]}
                name="Patient Information"
                loading={PostData?.loading}
                tableStyle={{ marginBottom: "-25px" }}
                columns={columns}
                activeTheme={activeTheme}
              />
            </div>
          ) : (
            <div style={{ maxHeight: "400px" }}>
              <DynamicTable
                rows={updatedArray}
                name="Patient Information"
                loading={PostData?.loading}
                tableStyle={{ marginBottom: "-25px" }}
                columns={columns}
                activeTheme={activeTheme}
              />
            </div>
          )}
        </div>
        {UserObj && (
          <div>
            <FormHeader title="Report Details" />
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <form
                autoComplete="off"
                ref={SaveForm?.formRef}
                onSubmit={handleSave}
              >
                <div className="flex flex-wrap gap-2 mt-2 mb-1 mx-1 lg:mx-2 items-end">
                  {/* Specimen Field */}
                  <div className="w-full sm:w-[48%] md:w-[15%]">
                    <InputGenerator
                      inputFields={[
                        {
                          label: "Specimen",
                          type: "text",
                          name: "specimen",
                          maxLength: "30",
                        },
                      ]}
                    />
                  </div>

                  {/* Biospy No. Field */}
                  <div className="w-full sm:w-[48%] md:w-[15%]">
                    <InputGenerator
                      inputFields={[
                        {
                          label: "Biospy No.", // 20 max
                          type: "number",
                          name: "biospyNumber",
                          maxLength: "20",
                        },
                      ]}
                    />
                  </div>

                  {/* Clinical History Field */}
                  <div className="w-full md:w-[30%]">
                    <InputGenerator
                      inputFields={[
                        {
                          label: "Clinical History", // 100 max
                          type: "text",
                          name: "clinicalHistory",
                          maxLength: "100",
                        },
                      ]}
                    />
                  </div>
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Fixative Types", // 50 max
                        type: "text",
                        name: "typesFixativeUsed",
                        maxLength: "50",
                      },
                      {
                        label: "Block Keys",
                        type: "text",
                        name: "blockKeys",
                        maxLength: "20",
                      }, // 20 max
                      {
                        label: "Stains Performed", // 20
                        type: "text",
                        name: "stainsPerformed",
                        maxLength: "20",
                      },
                    ]}
                  />
                </div>
                <TableHeader title="Gross" />
                <CustomeEditor
                  value={editorContent} // Controlled value for the editor
                  onContentChange={handleContentChange}
                />
                <TableHeader title="Microscopy" />
                <CustomeEditor
                  value={editorContent1} // Controlled value for the editor
                  onContentChange={handleContentChange1}
                />
                <TableHeader title="Final Impression" />
                <CustomeEditor
                  value={editorContent2} // Controlled value for the editor
                  onContentChange={handleContentChange2}
                />
                <div className="flex flex-wrap gap-2 mt-2 mb-1 mx-1 lg:mx-2 items-end">
                  {/* Specimen Field */}
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Comments",
                        type: "text",
                        // name: "Comments",
                      },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-4  mx-1 lg:mx-2">
                  {/* Specimen Field */}
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Select Dr. Signature",
                        type: "select",
                        name: "DoctorSign",
                        showValueField: "doctorName",
                        keyField:"signature",
                        dataOptions: Signature?.data?.data,
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Save",
                        submit: true,
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
                        callBack: () => {
                          setUserObj(null);
                        },
                      },
                      {
                        label: "Previous",
                        submit: false,
                        callBack: () => {
                          // setCurrentId(CurrentId - 1);
                          // currentRow(CurrentId - 1);
                        },
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Next",
                        submit: false,
                        callBack: () => {
                          // setCurrentId(CurrentId + 1);
                          // currentRow(CurrentId + 1);
                        },
                      },
                    ]}
                  />
                </div>
              </form>

              {/* <form autoComplete="off" ref={formRef} onSubmit={handleSave}>
              
              </form> */}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
