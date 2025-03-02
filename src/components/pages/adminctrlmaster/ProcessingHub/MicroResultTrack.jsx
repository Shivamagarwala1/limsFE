import React, { Suspense, useEffect, useState } from "react";
import DynamicTable, {
  TableHeader,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  StatusSubmitButton,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import RemarkGif from "../../../../assets/RemarkGif.gif";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import CustomeEditor from "../../../sharecomponent/CustomeEditor";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import {
  addObjectId,
  mergeArrays,
  splitArrayInTwo,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";
import { getLocal, setLocal } from "usehoks";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import {
  HistoAddAttachmentPopupModal,
  HistoFileUploadPopupModal,
  HistoHoldUnholdPopupModal,
  HistoResultTrackRemarkPopupModal,
  SampleCollectionCommentPopupModal,
} from "../../../../Custom Components/PopupModal";
import AntibioticTable from "../../../../Custom Components/AntibioticTable";
import toast from "react-hot-toast";
import axios from "axios";

export default function MicroResultTrack() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const SaveForm = useFormHandler();
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedAntibiotic, setSelectedAntibiotic] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [showStates, setShowStates] = useState({});
  const [OrganismPostObj, setOrganismPostObj] = useState({});
  const [Organism, setOrganism] = useState([]);
  const [ApprovedDocId, setApprovedDocId] = useState("");
  const [DrId, setDrId] = useState({
    id: 4,
    doctorId: 3,
    doctorName: "Anil Das",
    signature: "",
    approve: 1,
    notApprove: 1,
    hold: 1,
    unHold: 1,
  });
  const [HistoObservation, setHistoObservation] = useState(null);
  const [CurrentId, setCurrentId] = useState(0);
  const [RemarkPopup, setRemarkPopup] = useState(false);
  const [HoldUnHold, setHoldUnHold] = useState(false);
  const [Flag, setFlag] = useState(false);
  const [FileUploadPopupModal, setFileUploadPopupModal] = useState(false);
  const [AddAttachmentPopupModal, setAddAttachmentPopupModal] = useState(false);
  const [HoldUnHoldDetails, setHoldUnHoldDetails] = useState({});
  const [Row, setRow] = useState({});
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);
  const [UserObj, setUserObj] = useState(null);
  const [ThirdArr, setThirdArr] = useState({ FirstHalf: [], SecondHalf: [] });
  const AllCenterData = useGetData();
  const TestData = useGetData();
  const DepartmentData = useGetData();
  const PostData = usePostData();
  const SavePostData = usePostData();
  const ApprovedPostData = usePostData();
  const retreveTest = useGetData();
  const OrganismData = useGetData();
  const getAntibioticData = useGetData();
  const getTemplateData = usePostData();
  const Signature = useGetData();
  const lsData = getLocal("imarsar_laboratory");
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    OrganismData?.fetchData(
      "/organismAntibioticMaster?select=id,organismAntibiotic&$filter=(microType eq 1 and isActive eq 1)"
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
  }, [Flag]);

  // const splitedArray = getAntibioticData?.data?.data || [];
  useEffect(() => {
    if (Row?.testid) {
      retreveTestData(Row?.testid);
    }
  }, [HoldUnHold]);

  let PayloadData = getLocal("HistoPayload");
  const updatedArray = addObjectId(PostData?.data);

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
            <StatusSubmitButton
              submit={false}
              text={params?.row}
              callBack={() => {
                setRow(params?.row);
                retreveTestData(params?.row?.testid);
                getTemplates(params?.row?.itemId);
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
            </div>
          </>
        );
      },
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

  const currentRow = async (id) => {
    const row = updatedArray?.find((item) => item?.id === id); // Use find() instead of filter()

    if (!row) {
      console.warn(`Row with id ${id} not found.`);
      setUserObj(null);
      setCurrentId(0);
      return null;
    }

    setUserObj(row);
    setRow(row);
    console.log(row?.testid);

    await retreveTestData(row?.testid);

    return row;
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
      reporttype: 4,
    };
    setLocal("HistoPayload", payload);
    console.log(selectedDepartment, " ", selectedTest, " ", selectedCenter);
    PostData?.postRequest("/tnx_BookingItem/GetResultEntryAllData", payload);
    console.log(PostData?.data);
  };

  const retreveTestData = async (id) => {
    try {
      const res = await retreveTest?.fetchData(
        `/tnx_Booking/GetMicroresult?testid=${id}`
      );
      console.log(res);

      if (res?.data?.data) {
        const testData = res.data.data;
        setHistoObservation(testData);

        const filterDr = Signature?.data?.data.find(
          (item) => item?.doctorId === testData?.approvalDoctor
        );

        if (filterDr) {
          setDrId(filterDr);
        } else {
          console.warn("Doctor not found for ID:", testData?.appcovaldoctorId);
        }
        // await getAntibioticData?.fetchData(
        //   `/organismAntibioticTagMaster/OrganismAntibioticeTagging?OrganismId=${testData.organismId}`
        // );
        SaveForm?.setValues([
          {
            reportStatus: testData.intrim,
            colonyCount: testData.colonyCount || "",
            comments: testData.comments || "",
            Organism: testData.organismId || "",
            Template: testData.result || "",
          },
        ]);

        setEditorContent(testData?.result);
        setOrganism(testData?.organismMapped);
      } else {
        console.warn("No data found for test ID:", id);
        SaveForm?.setValues([
          {
            specimen: "",
            biospyNumber: "",
            clinicalHistory: "",
            typesFixativeUsed: "",
            blockKeys: "",
            stainsPerformed: "",
            comment: "",
          },
        ]);

        // setEditorContent("");
      }
    } catch (error) {
      console.error("Error retrieving test data:", error);
    }
  };
  console.log(retreveTest?.data.data, getAntibioticData?.data?.data?.length);
  // console.log(editorContent)
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
    console.log(UserObj, " mm ", OrganismPostObj);
    const values = SaveForm?.getValues();
    const payload = {
      ...values,
      id: 0,
      testId: Row?.testid,
      observationName: UserObj?.investigationName,
      transactionId: UserObj?.transactionId,
      approvedBy: 0,
      approvedName: lsData?.user?.name,
      isApproved: 0,
      appcovaldoctorId: 0,
      selectedorganism: Organism,
      result: editorContent,
      createdBy: lsData?.user?.name,
      createdById: parseInt(lsData?.user?.employeeId),
    };
    const res = await SavePostData?.postRequest(
      "/tnx_BookingItem/SaveMicroResult",
      payload
    );
    console.log(res);
    if (res?.success) {
      toast.success(res?.message);
      // alert(res?.message);
      setHistoObservation(null);
    } else {
      toast.error(res?.message);
    }
  };
  const getTemplates = async (id) => {
    try {
      await getTemplateData?.postRequest(
        `/itemTemplate/GetTemplateData?CentreID=${lsData?.user?.defaultCenter}&testid=${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const organismCallBack = async (e) => {
    const data = OrganismData?.data?.find((item) => item?.id == e.target.value);

    // Check if the organism already exists to prevent infinite loop
    if (!Organism.some((org) => org.organismId === data?.id)) {
      setOrganismPostObj({
        organismId: data?.id,
        organismName: data?.organismAntibiotic,
      });
      setOrganism((prev) => [
        ...prev,
        {
          organismId: data.id,
          organismName: data.organismAntibiotic,
        },
      ]);
    }

    await getAntibioticData?.fetchData(
      `/organismAntibioticTagMaster/OrganismAntibioticeTagging?OrganismId=${e.target.value}`
    );
  };
  const ApproveCase = async () => {
    
    if (!ApprovedDocId) {
      toast.error("Please select Doctor Signature");
      return;
    }
  
    try {
      const payload = {
        isApproved: 1,
        testId: Row?.testid,
        observationName: UserObj?.investigationName,
        transactionId: UserObj?.transactionId,
        appcovaldoctorId: ApprovedDocId,
        approvedName: lsData?.user?.name,
        approvedBy: lsData?.user?.employeeId,
        result: editorContent,
        selectedorganism: Organism,
        createdBy: lsData?.user?.name,
        hold: 0,
      };
  
      const { data } = await axios.post(
        `${BASE_URL}/tnx_BookingItem/SaveMicroResult`,
        payload
      );
  
      if (data?.success) {
        toast.success(data.message);
        console.log("Payload Sent:", payload);
        setFlag((prev) => !prev);
        retreveTestData(HistoObservation?.testId);
      } else {
        toast.error(data?.message || "Approval failed");
      }
    } catch (error) {
      console.error("Approval Error:", error);
      toast.error("Something went wrong, please try again.");
    }
  };
  // const ApproveCase = async () => {
  //   if (!ApprovedDocId) {
  //     toast.error("Please select Doctor Signature");
  //     return;
  //   }
  //   const payload = {
  //     isApproved: 1,
  //     testId: Row?.testid,
  //     observationName: UserObj?.investigationName,
  //     transactionId: UserObj?.transactionId,
  //     appcovaldoctorId: ApprovedDocId,
  //     approvedName: lsData?.user?.name,
  //     approved: 1,
  //     result: editorContent,
  //     selectedorganism:Organism,
  //     approvedBy: lsData?.user?.employeeId,
  //     isApproved: 1,
  //     createdBy: lsData?.user?.name,
  //     hold: 0,
  //   };
  //   const res = await SavePostData?.postRequest(
  //     "/tnx_BookingItem/SaveMicroResult",
  //     payload
  //   );
  //   if (res?.success) {
  //     toast.success(res?.message);
  //     console.log(payload);
  //     setFlag(!Flag);
  //     retreveTestData(HistoObservation?.testId);
  //   } else {
  //     toast.error(res?.message);
  //   }
  // };
  console.log(Organism);
  return (
    <div>
      <>
        <HistoResultTrackRemarkPopupModal
          setShowPopup={setRemarkPopup}
          showPopup={RemarkPopup}
          rowData={Row}
        />
        <HistoHoldUnholdPopupModal
          rowData={HoldUnHoldDetails}
          setShowPopup={setHoldUnHold}
          showPopup={HoldUnHold}
          retreveTestData={retreveTestData}
        />

        <HistoFileUploadPopupModal
          rowData={{ ...HistoObservation, testId: Row?.testid }}
          setShowPopup={setFileUploadPopupModal}
          showPopup={FileUploadPopupModal}
          retreveTestData={retreveTestData}
        />
        <HistoAddAttachmentPopupModal
          rowData={{ ...HistoObservation, testId: Row?.testid }}
          setShowPopup={setAddAttachmentPopupModal}
          showPopup={AddAttachmentPopupModal}
          retreveTestData={retreveTestData}
        />
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Micro Result Track" />
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
            <FormHeader title="Micro Result Track" />
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
                        label: "Intrim",
                        type: "select",
                        name: "reportStatus",
                        dataOptions: [
                          { id: 0, data: "Intrim" },
                          { id: 1, data: "Final" },
                        ],
                      },
                    ]}
                  />
                </div>
                {/* Biospy No. Field */}
                <div className="w-full sm:w-[48%] md:w-[15%]">
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Select Template",
                        type: "select",
                        name: "Template",
                        keyField: "template",
                        callBack: (e) => {
                          setEditorContent(e.target.value);
                        },
                        showValueField: "name",
                        dataOptions: getTemplateData?.data,
                      },
                    ]}
                  />
                </div>
                <div className="w-full sm:w-[48%] md:w-[15%]">
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Colony Counts",
                        type: "text",
                        name: "colonyCount",
                      },
                    ]}
                  />
                </div>
                <InputGenerator
                  inputFields={[
                    {
                      label: "Enter Comments",
                      type: "text",
                      name: "comments",
                    },
                  ]}
                />
              </div>
              <TableHeader title="" />
              <CustomeEditor
                value={editorContent} // Controlled value for the editor
                onContentChange={handleContentChange}
              />
              <FormHeader title="Organism" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-1 mt-2 mb-2 mx-1 lg:mx-2">
                <InputGenerator
                  inputFields={[
                    {
                      label: "Organism",
                      type: "select",
                      name: "Organism",
                      callBack: (e) => {
                        const data = OrganismData?.data?.find(
                          (item) => item?.id == e.target.value
                        );
                        organismCallBack(e);
                      },
                      dataOptions: OrganismData?.data,
                    },
                  ]}
                />
                {Organism?.map((item, idx) => {
                  return (
                    <SubmitButton
                      key={idx}
                      submit={false}
                      callBack={() => {
                        // add logic to delete organism
                        setOrganism((prev) =>
                          prev.filter(
                            (org) => org.organismId !== item.organismId
                          )
                        );
                      }}
                      text={`Delete ${item?.organismName}`}
                    />
                  );
                })}
              </div>
              <AntibioticTables
                Organism={Organism}
                setOrganism={setOrganism}
                ThirdArr={getAntibioticData?.data?.data}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-2 mx-1 lg:mx-2">
                {/* Specimen Field */}
                <InputGenerator
                  inputFields={[
                    {
                      label: "Select Dr. Signature",
                      type: "select",
                      name: "appcovaldoctorId",
                      showValueField: "doctorName",
                      keyField: "doctorId",
                      // defaultView: true,
                      callBack: (e) => {
                        const filterDr = Signature?.data?.data.filter(
                          (item) => item?.doctorId == e.target.value
                        );
                        setApprovedDocId(filterDr[0]?.doctorId);
                        setDrId(filterDr[0]);
                      },
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
                      label:
                        HistoObservation?.isApproved === 1
                          ? "Not Approved"
                          : "Approved",
                      submit: false,
                      callBack: () => {
                        const ReportNotApprove = async () => {
                          try {
                            const { data } = await axios.post(`${BASE_URL}/tnx_Observations/ReportNotApprove`, null, {
                              params: {
                                TestId: HistoObservation?.testId,
                                userid: lsData?.user?.employeeId,
                              },
                            });
                        
                            console.log("API Response:", data);
                        
                            if (data?.success) {
                              toast.success(data.message);
                              setFlag((prev) => !prev);
                            } else {
                              toast.error(data?.message || "Action failed");
                            }
                          } catch (error) {
                            console.error("Report Not Approve Error:", error);
                            toast.error("Something went wrong, please try again.");
                          }
                        };
                        console.log(
                          HistoObservation?.isApproved === 1
                            ? "Not Approved clicked"
                            : "Approved clicked"
                        );
                        retreveTestData(HistoObservation?.testId);
                        if (HistoObservation?.isApproved === 1) {
                          // ApprovedPostData?.postRequest(
                          //   `/tnx_Observations/ReportNotApprove?TestId=${HistoObservation?.testId}&userid=${lsData?.user?.employeeId}`
                          // );
                          // console.log(ApprovedPostData.response);
                          // toast.success(ApprovedPostData.response.message);
                          ReportNotApprove();
                        } else {
                          ApproveCase();
                        }
                        
                      },
                    },
                  ]}
                />
                <TwoSubmitButton
                  options={[
                    {
                      label: HistoObservation?.hold === 1 ? "Un Hold" : "Hold",
                      submit: false,
                      callBack: () => {
                        console.log(
                          HistoObservation,
                          HistoObservation?.hold === 1
                            ? "UnHold clicked"
                            : "Hold clicked"
                        );

                        setHoldUnHoldDetails({
                          hold: HistoObservation?.hold,
                          testId: Row?.testid,
                          bool: HistoObservation?.hold === 1 ? false : true,
                        });
                        setHoldUnHold(true);
                      },
                    },
                    {
                      label: "Print Report",
                      submit: false,
                      callBack: () => {
                        ViewOrDownloandPDF(
                          `/tnx_Observations_Histo/GetMicroReport?testId=${Row?.testid}`
                        );
                      },
                    },
                  ]}
                />

                <TwoSubmitButton
                  options={[
                    {
                      label: "Add Report",
                      submit: false,
                      callBack: () => {
                        setFileUploadPopupModal(true);
                      },
                    },
                    {
                      label: "Add Attachment",
                      submit: false,
                      callBack: () => {
                        setAddAttachmentPopupModal(true);
                      },
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
                        // retreveTestData(HistoObservation?.testId);
                        setCurrentId(CurrentId - 1);
                        currentRow(CurrentId - 1);
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
                        // retreveTestData(HistoObservation?.testId);
                        setCurrentId(CurrentId + 1);
                        currentRow(CurrentId + 1);
                      },
                    },
                  ]}
                />
              </div>
            </form>

            {/* </div> */}
            {/* Scrollable section ends here */}
          </div>
        )}
      </>
    </div>
  );
}

const AntibioticTables = ({ Organism, setOrganism, ThirdArr }) => {
  // Ensure the Organism array has an even length
  const adjustedOrganism = [...Organism];
  const isOdd = adjustedOrganism.length % 2 !== 0;

  if (isOdd) {
    adjustedOrganism.push(null); // Push a null placeholder
  }

  const groupedOrganisms = adjustedOrganism.reduce((acc, _, index, array) => {
    if (index % 2 === 0) {
      acc.push(array.slice(index, index + 2)); // Group every two items
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {groupedOrganisms.map((pair, idx) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row justify-start items-baseline w-full gap-2"
        >
          {pair.map((item, itemIdx) =>
            item ? (
              <Suspense key={itemIdx} fallback={<div>Loading Table...</div>}>
                <AntibioticTable
                  Organism={Organism}
                  setOrganism={setOrganism}
                  // selectedAntibiotic={selectedAntibiotic}
                  // setSelectedAntibiotic={setSelectedAntibiotic}
                  item={item}
                />
              </Suspense>
            ) : (
              <div key={itemIdx} className="flex flex-col w-full" />
            )
          )}
        </div>
      ))}
    </div>
  );
};
