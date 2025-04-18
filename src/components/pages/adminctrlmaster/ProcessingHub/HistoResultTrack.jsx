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
  HistoAddAttachmentPopupModal,
  HistoApprovedPopupModal,
  HistoFileUploadPopupModal,
  HistoHoldUnholdPopupModal,
  HistoResultTrackRemarkPopupModal,
  SampleCollectionCommentPopupModal,
} from "../../../../Custom Components/PopupModal";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import { getLocal, setLocal } from "usehoks";
import { addObjectId } from "../../../../service/RedendentData";
import RemarkGif from "../../../../assets/RemarkGif.gif";
import toast from "react-hot-toast";
import axios from "axios";
import { useRetrieveData } from "../../../../service/service";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomLoadingPage from "../../../global/CustomLoadingPage";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import { resultTrackForPatientInformation } from "../../../listData/listData";
import { PopupFooter } from "../../../../Custom Components/NewPopups";

export default function HistoResultTrack() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const SaveForm = useFormHandler();
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [ApproveBtn, setApproveBtn] = useState();
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [RemarkPopup, setRemarkPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [isHoveredPopupTable, setIsHoveredPopupTable] = useState(null);
  const [HoldUnHold, setHoldUnHold] = useState(false);
  const [Flag, setFlag] = useState(false);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [FileUploadPopupModal, setFileUploadPopupModal] = useState(false);
  const [AddAttachmentPopupModal, setAddAttachmentPopupModal] = useState(false);
  const [HoldUnHoldDetails, setHoldUnHoldDetails] = useState({});
  const [Row, setRow] = useState({});
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
  const [editorContent, setEditorContent] = useState("");
  const [editorContent1, setEditorContent1] = useState("");
  const [editorContent2, setEditorContent2] = useState("");
  const [UserObj, setUserObj] = useState(null);
  const [ApprovedDocId, setApprovedDocId] = useState("");
  const [HistoObservation, setHistoObservation] = useState(null);
  const [CurrentId, setCurrentId] = useState(0);
  const [showStates, setShowStates] = useState({});
  const AllCenterData = useGetData();
  const TestData = useGetData();
  const DepartmentData = useGetData();
  const PostData = usePostData();
  const SavePostData = usePostData();
  const ApprovedPostData = usePostData();
  const retreveTest = useGetData();
  const Signature = useGetData();
  const lsData = getLocal("imarsar_laboratory");
  const allInfoDocument = useRetrieveData();
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
  }, [HoldUnHold, Flag]);

  let PayloadData = getLocal("HistoPayload");
  const updatedArray = addObjectId(PostData?.data);
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

  console.log("Content => ", editorContent2);

  const allFilterData = useRetrieveData();

  useEffect(() => {

    const getAllData = async () => {
      try {
        await allFilterData.fetchDataFromApi(`/LegendColorMaster?select=id,colourCode,colourName,contantName&$filter=(isactive eq 1 and (id gt 2 and id lt 13 or id eq 1))`);

      } catch (error) {
        toast.error(error.message)
      }
    }

    getAllData();
  }, [])

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
              themecolor={allFilterData?.data.find((item) => item?.contantName === params?.row?.status)?.colourCode}
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
          <div
            className="w-5 h-5 flex justify-center items-center rounded-sm"
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
            onClick={() => {
              setShowPopup1(2), getAllInfoDocumentData(params?.row?.itemId);
            }}
          >
            <FaCircleInfo />
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
            <div
              onClick={() => {
                hideComment();
              }}
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              {params?.row?.comment?.slice(0, 10)}
            </div>
          </>
        );
      },
    },
  ];
  const getAllInfoDocumentData = async (testId) => {
    console.log(testId);

    try {
      await allInfoDocument.fetchDataFromApi(
        `/tnx_Booking/GetTestInfo?TestId=${testId}`
      );
    } catch (error) {
      toast.error(error?.message);
    }
  };
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
  console.log(DrId);
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
    // PostData?.postRequest("/tnx_BookingItem/GetResultEntryAllData", payload);
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
    // {
    //   Data: 9,
    //   CallBack: () => {
    //     // Sample Rerun
    //     const data = { ...PayloadData, status: "Sample Rerun" };
    //     LegendButtonSearch(data);
    //   },
    // },
    // {
    //   Data: 12,
    //   CallBack: () => {
    //     // Under Machine
    //     const data = { ...PayloadData, status: "Under Machine" };
    //     LegendButtonSearch(data);
    //   },
    // },
    // {
    //   Data: 8,
    //   CallBack: () => {
    //     // Machine Data
    //     const data = { ...PayloadData, status: "Machine Data" };
    //     LegendButtonSearch(data);
    //   },
    // },
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
    if (HistoObservation?.isApproved == 1) {
      toast.error("Report Is Already Approved And Not Editable.");
      return;
    }
    const payload = {
      ...values,
      ...UserObj,
      gross: editorContent,
      microscopy: editorContent1,
      histoObservationId: HistoObservation
        ? HistoObservation?.histoObservationId
        : 0,
      finalImpression: editorContent2,
      approvaldoctorId: DrId?.doctorId,
      comment: values?.comment,
      createdBy: lsData?.user?.employeeId,
    };
    const res = await SavePostData?.postRequest(
      "/tnx_BookingItem/SaveHistoResult",
      payload
    );
    setFlag(!Flag);
    if (res?.success) {
      toast.success(res?.message);
      setHistoObservation(null);
      console.log(payload);
    } else {
      toast.error(res?.message);
    }
  };
  //0 h to approved 1 h to not approved & null ya 0 h to Hold 1 h to Unhold

  const retreveTestData = async (id) => {
    try {
      const res = await retreveTest?.fetchData(
        `/tnx_Booking/GetHistoresult?testid=${id}`
      );
      console.log("Retrieving test data for ID:", id);

      if (res?.data?.data?.length > 0) {
        const testData = res.data.data[0];
        setHistoObservation(testData);
        setApproveBtn(testData?.isApproved == "0" ? false : true);
        const filterDr = Signature?.data?.data.find(
          (item) => item?.doctorId === testData?.appcovaldoctorId
        );

        if (filterDr) {
          setDrId(filterDr);
        } else {
          console.warn("Doctor not found for ID:", testData?.appcovaldoctorId);
        }
        setApprovedDocId(testData.approvalDoctor);
        SaveForm?.setValues([
          {
            specimen: testData.specimen || "",
            biospyNumber: testData.biospyNumber || "",
            clinicalHistory: testData.clinicalHistory || "",
            typesFixativeUsed: testData.typesFixativeUsed || "",
            blockKeys: testData.blockKeys || "",
            stainsPerformed: testData.stainsPerformed || "",
            comment: testData.comment || "",
            appcovaldoctorId: testData.approvalDoctor || "",
          },
        ]);

        setEditorContent(testData.gross || "");
        setEditorContent1(testData.microscopy || "");
        setEditorContent2(testData.finalImpression || "");
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

        setEditorContent("");
        setEditorContent1("");
        setEditorContent2("");
      }
    } catch (error) {
      console.error("Error retrieving test data:", error);
    }
  };

  const ApproveCase = async () => {
    if (!ApprovedDocId) {
      toast.error("Please select Doctor Signature");
      return;
    }
    if (HistoObservation?.isApproved == 1) {
      toast.error("Report Is Already Approved And Not Editable.");
      return;
    }
    const payload = {
      ...HistoObservation,
      ...UserObj,
      isApproved: 1,
      createdBy: lsData?.user?.employeeId,
      approvaldoctorId: ApprovedDocId,
      approved: 1,
      approvedByID: lsData?.user?.employeeId,
      isApproved: 1,
      hold: 0,
    };
    const res = await SavePostData?.postRequest(
      "/tnx_BookingItem/SaveHistoResult",
      payload
    );
    if (res?.success) {
      toast.success(res?.message);
      console.log(payload);
      setFlag(!Flag);
      retreveTestData(HistoObservation?.testId);
    } else {
      toast.error(res?.message);
    }
  };

  const downloadReportPDF = async (ReportId) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      // Retrieve the token from localStorage
      const token = lsData?.token;

      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      // Perform the GET request to download the PDF
      const response = await axios.get(
        `${BASE_URL}/tnx_Observations_Histo/GetHistoReport?testId=${ReportId}`,
        {
          responseType: "blob", // To handle binary response
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`, // Add the token to Authorization header
          },
        }
      );

      // Check if the content type is PDF
      const contentType = response.headers["content-type"];
      if (contentType === "application/pdf") {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl, "_blank");
        console.log("PDF downloaded successfully.");
      } else {
        console.error(
          `Unexpected content type: ${contentType}. Unable to download PDF.`
        );
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);

      if (error.response?.status === 401) {
        console.error("Unauthorized. Token might be invalid or expired.");
      } else if (error.response) {
        console.error(
          "Unexpected response from server:",
          error.response.data || error.response.statusText
        );
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  const ApproveCallback = async () => {
    console.log(
      HistoObservation?.isApproved === 1
        ? "Not Approved clicked"
        : "Approved clicked"
    );
    if (ApproveBtn) {
      const data = await ApprovedPostData?.postRequest(
        `/tnx_Observations/ReportNotApprove?TestId=${Row?.testid}&userid=${lsData?.user?.employeeId}`
      );
      if (data?.success) {
        toast.success(ApprovedPostData.response.message);
        setFlag(!Flag);
      }
      console.log(ApprovedPostData.response);
    } else {
      await ApproveCase();
    }
    await retreveTestData(Row?.testid);
  };

  return (
    <div>
      <>
        <HistoResultTrackRemarkPopupModal
          setShowPopup={setRemarkPopup}
          showPopup={RemarkPopup}
          setFlag={setFlag}
          Flag={Flag}
          rowData={Row}
        />
        <HistoHoldUnholdPopupModal
          rowData={HoldUnHoldDetails}
          setShowPopup={setHoldUnHold}
          showPopup={HoldUnHold}
          setFlag={setFlag}
          Flag={Flag}
          retreveTestData={retreveTestData}
        />

        <HistoFileUploadPopupModal
          rowData={HistoObservation}
          setShowPopup={setFileUploadPopupModal}
          showPopup={FileUploadPopupModal}
          retreveTestData={retreveTestData}
          setFlag={setFlag}
          Flag={Flag}
        />
        <HistoAddAttachmentPopupModal
          rowData={HistoObservation}
          setFlag={setFlag}
          Flag={Flag}
          setShowPopup={setAddAttachmentPopupModal}
          showPopup={AddAttachmentPopupModal}
          retreveTestData={retreveTestData}
        />
        {showPopup1 === 2 && (
          <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
            <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">
              {/* Header */}
              <div
                className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                style={{
                  borderImage: activeTheme?.menuColor,
                  background: activeTheme?.menuColor,
                }}
              >
                <div
                  className="font-semibold text-xxs md:text-sm"
                  style={{ color: activeTheme?.iconColor }}
                >
                  {"Test Remark Data"}
                </div>
                <IoMdCloseCircleOutline
                  className="text-xl cursor-pointer"
                  style={{ color: activeTheme?.iconColor }}
                  onClick={() => setShowPopup1(0)}
                />
              </div>

              {/* Scrollable Content */}
              <GridDataDetails gridDataDetails={"Test Remark Details"} />

              {allInfoDocument?.loading ? (
                <CustomLoadingPage />
              ) : (
                <CustomDynamicTable
                  columns={resultTrackForPatientInformation}
                  activeTheme={activeTheme}
                  height="15vh"
                >
                  <tbody>
                    {allInfoDocument?.data?.data?.map((data, index) => (
                      <tr
                        className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                          ? ""
                          : index % 2 === 0
                            ? "bg-gray-100"
                            : "bg-white"
                          }`}
                        key={index}
                        onMouseEnter={() => setIsHoveredPopupTable(index)}
                        onMouseLeave={() => setIsHoveredPopupTable(null)}
                        style={{
                          background:
                            isHoveredPopupTable === index
                              ? activeTheme?.subMenuColor
                              : undefined,
                          // Hides scrollbar for IE/Edge
                        }}
                      >
                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {index + 1}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.investigationName}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.barcodeNo}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.sampleReceiveDate}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.sampleCollectedby}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.sampleReceivedBY}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.sampleReceiveDate}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.registrationDate}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.registerBy}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.resultDate}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.resutDoneBy}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.outhouseDoneOn}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.outhouseLab}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.outhouseDoneBy}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.outSourceDate}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.outSouceLab}
                        </td>

                        <td
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                          style={{ width: "0%" }}
                        >
                          {data?.outSource}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </CustomDynamicTable>
              )}
              <PopupFooter />

            </div>
          </div>
        )}
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
                        name: "comment",
                      },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-1  mt-2 mb-4  mx-1 lg:mx-2">
                  {/* Specimen Field */}
                  <div className="flex gap-[0.25rem]">
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
                  </div>
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Save",
                        submit: true,
                        callBack: () => console.log("Save clicked"),
                      },
                      {
                        label: ApproveBtn ? "Not Approved" : "Approved",
                        submit: false,
                        callBack: () => {
                          ApproveCallback();
                        },
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label:
                          HistoObservation?.hold === 1 ? "Un Hold" : "Hold",
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
                            testId: HistoObservation?.testId,
                            bool: HistoObservation?.hold === 1 ? false : true,
                          });
                          setHoldUnHold(true);
                        },
                      },
                      {
                        label: "Print Report",
                        submit: false,
                        callBack: () => {
                          downloadReportPDF(HistoObservation?.testId);
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
            </div>
          </div>
        )}
      </>
    </div>
  );
}
