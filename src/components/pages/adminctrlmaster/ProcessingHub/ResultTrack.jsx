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
import { FaCommentDots, FaComments, FaPlus, FaPrint, FaSpinner } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";

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
import { getAllDoctorsBasedOnCentreWise, getAllObserVationDataBasedOnTestName, getAllResultTrackinDataApi } from "../../../../service/service";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import { resultTrackForPatientInformation, resultTrackingForObservationHeader, resultTrackingForReRun, ResultTrackingHeader } from "../../../listData/listData";
import { FaCircleInfo } from "react-icons/fa6";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import { MdAddCircleOutline } from "react-icons/md";
import CustomLoadingPage from "../../../global/CustomLoadingPage";
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomDropdown from "../../../global/CustomDropdown";
import CustomPopup from "../../../global/CustomPopup";
import { getDefaultCentreId } from "../../../../service/localstroageService";
import CustomFormButton from "../../../global/CustomFormButton";

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
  //!================Anil code=======================
  const user = useSelector((state) => state.userSliceName?.user || null);
  const [resultTrackData, setResultTrackData] = useState({
    doctorId: 0,
  })
  const [allResultTrackingData, setAllResultTrackingData] = useState([]);
  const [allObservationData, setAllObservationData] = useState([]);
  const [allDoctorData, setAllDoctorData] = useState([]);
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [observationValue, setObservationValue] = useState({});
  const [observationCheckValue, setObservationCheckValue] = useState({});
  const [showPopup, setShowPopup] = useState(0);
  //!================Anil code end=======================




  // useEffect(() => {
  //   AllCenterData?.fetchData(
  //     "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
  //   );
  //   TestData?.fetchData(
  //     "/itemMaster?select=itemId,ItemName&$filter=(isactive eq 1)"
  //   );

  //   DepartmentData?.fetchData(
  //     "/labDepartment?select=id,deptname&$filter=(isactive eq 1)"
  //   );
  //   // console.log(AllCenterData);
  // }, []);

  // const columns = [
  //   {
  //     field: "id",
  //     headerName: "Sr. No",
  //     width: 20,
  //     renderCell: (params) => {
  //       return (
  //         <div
  //           style={{
  //             display: "flex",
  //             gap: "10px",
  //             alignItems: "center",
  //           }}
  //         >
  //           <div>{params?.row?.id}</div>
  //           {params?.row?.urgent == 1 && (
  //             <img style={{ width: "20px" }} src={UrgentGif} alt="Urgent Gif" />
  //           )}
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     field: `bookingDate`,
  //     headerName: `Booking Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `patientId`,
  //     headerName: `Visit Id`,
  //     flex: 1,
  //   },
  //   {
  //     field: `sampleReceiveDate`,
  //     headerName: `Sample Rec. Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `patientName`,
  //     headerName: `Patient Name`,
  //     flex: 1,
  //   },
  //   {
  //     field: `age`,
  //     headerName: `Age/Gender`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div style={{ display: "flex" }}>
  //           {params?.row?.age}/{params?.row?.gender}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: `barcodeNo`,
  //     headerName: `Barcode No.`,
  //     flex: 1,
  //   },
  //   {
  //     field: `investigationName`,
  //     headerName: `Test Name`,
  //     flex: 1,
  //     renderCell: (params) => {

  //       return (
  //         <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
  //           <SubmitButton
  //             submit={false}
  //             text={params?.row?.investigationName}
  //             callBack={() => {
  //               setRow(params?.row);
  //               currentRow(params?.row?.id);
  //             }}
  //             style={{
  //               // width: "30px",
  //               fontSize: "0.75rem",
  //               padding: "0px 20px",
  //               height: "20px",
  //             }}
  //           />
  //           {/* <SubmitButton
  //             submit={false}
  //             text={"ESR"}
  //             callBack={() => {
  //               setUserObj(params?.row);
  //             }}
  //             style={{
  //               width: "30px",
  //               fontSize: "0.75rem",
  //               padding: "0px 20px",
  //               height: "20px",
  //             }}
  //           />
  //           <SubmitButton
  //             submit={false}
  //             text={"HB"}
  //             callBack={() => {
  //               setUserObj(params?.row);
  //             }}
  //             style={{
  //               width: "30px",
  //               fontSize: "0.75rem",
  //               padding: "0px 20px",
  //               height: "20px",
  //             }}
  //           />
  //           <SubmitButton
  //             submit={false}
  //             text={"HBA1"}
  //             callBack={() => {
  //               setUserObj(params?.row);
  //             }}
  //             style={{
  //               width: "30px",
  //               fontSize: "0.75rem",
  //               padding: "0px 20px",
  //               height: "20px",
  //             }}
  //           /> */}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: `approvedDate`,
  //     headerName: `Approved Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Remark`,
  //     headerName: `Remark`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div style={{
  //           display: "flex",
  //           gap: "5px",
  //           fontSize: "15px",
  //           alignItems: "center",
  //         }}>
  //           <SubmitButton
  //             submit={false}
  //             text={"+"}
  //             callBack={() => {
  //               setLocal("testName", params?.row?.TestName);
  //               setRow({ ...params?.row });
  //               setRemarkPopup(true);
  //             }}
  //             style={{ width: "30px", fontSize: "0.75rem", height: "20px" }}
  //           />
  //           {params?.row?.isremark > 0 && (
  //             <img style={{ width: "20px" }} src={RemarkGif} alt="Remark Gif" />
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: `Info`,
  //     headerName: `Info`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       // console.log(params.row)
  //       return (
  //         <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
  //           <SubmitButton
  //             submit={false}
  //             text={"i"}
  //             callBack={() => {
  //               setInfo(true);
  //             }}
  //             style={{ width: "30px", fontSize: "0.75rem", height: "20px" }}
  //           />
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     field: `comment`,
  //     headerName: `Comments`,
  //     flex: 1,
  //     renderCell: (params) => {
  //       const rowId = params.row.id;
  //       const isShown = showStates[rowId] || false;

  //       const hideComment = () => {
  //         setShowStates((prev) => ({
  //           ...prev,
  //           [rowId]: !isShown,
  //         }));
  //       };
  //       return (
  //         <>
  //           <SampleCollectionCommentPopupModal
  //             setShowPopup={hideComment}
  //             showPopup={isShown}
  //             comment={params?.row?.comment}
  //           />
  //           <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
  //             {params?.row?.comment?.slice(0, 10)}
  //             {params?.row?.comment.length > 10 && (
  //               <>
  //                 ...
  //                 <div
  //                   onClick={() => {
  //                     setShowStates((prev) => ({
  //                       ...prev,
  //                       [rowId]: !isShown,
  //                     }));
  //                   }}
  //                   className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
  //                   style={{
  //                     background: activeTheme?.menuColor,
  //                     color: activeTheme?.iconColor,
  //                   }}
  //                 >
  //                   <FaCommentDots />
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         </>
  //       );
  //     },
  //   },
  // ];


  // const row = [
  //   {
  //     id: 1,
  //     Centre: "105 - center 1",
  //     Department: "Nursing",
  //     PatientName: "John, 50032",
  //     Barcode: "10993",
  //     SampleRecDate: "10-02-2025",
  //     VisitId: "302",
  //     ApprovedDate: "12-Feb-25",
  //     SampleType: "Blood",
  //     Comments: "Lorem Ipsum",
  //     TestName: "CBC",
  //     AgeGender: "25/male",
  //     TransferDate: "15-Feb-2025",
  //     BookingDate: "11-Feb-2025",
  //     ToCentre: "New-Delhi",
  //     FromCentre: "Ayodhya",
  //     ResultBy: "Dr. John",
  //     ResultAt: "15-Feb-2025",
  //     EntryBy: "Dr. Brock",
  //     EntryAt: "11-Feb-2025",
  //     RecieveAt: "05-Feb-2025",
  //     RecieveBy: "Dr. Rock",
  //     CollectionBy: "Dr. Roman",
  //     CollectionAt: "01-Feb-2025",
  //   },
  // ];

  //accept child to parent in editor
  // const handleContentChange = (content) => {
  //   // Update editor content
  //   setCommentMasterData((preventDefault) => ({
  //     ...preventDefault,
  //     template: content,
  //   }));
  //   //setEditorContent(content);
  // };


  // -------------------------------------------------------------
  // const [tableData, setTableData] = useState([
  //   {
  //     id: 2,
  //     Test: "Thyroid - T3 T4 & TSH",
  //     R: true,
  //     Checkbox: true,
  //     ReRun: true,
  //     name: "John",
  //     Value: null,
  //     comment: false,
  //     age: 28,
  //     role: "Developer",
  //     subTest: [
  //       {
  //         id: "i1",
  //         Test: "Triodothyrine",
  //         flag: "Normal",
  //         Machine: "#01",
  //         Min: "0.70",
  //         Max: "2.10",
  //         comment: true,
  //         MachineReading: "001",
  //         Unit: "ng/ml",
  //         MethodName: "CLIA",
  //         DisplayReading: "0.82-2.34",
  //         OldReading: "0.01",
  //         Value: "Lorem Ipsum",
  //       },
  //       {
  //         id: "i2",
  //         Test: "Triodothyrine 1",
  //         flag: "Normal",
  //         Machine: "#01",
  //         Min: "0.70",
  //         Max: "2.10",
  //         comment: true,
  //         Unit: "ng/ml",
  //         MachineReading: "002",
  //         MethodName: "CLIA",
  //         DisplayReading: "0.82-2.34",
  //         OldReading: "0.01",
  //         Value: "Lorem Ipsum",
  //       },
  //       {
  //         id: "i3",
  //         Test: "Triodothyrine 2",
  //         flag: "Normal",
  //         Machine: "#01",
  //         Min: "0.70",
  //         Max: "2.10",
  //         Unit: "ng/ml",
  //         comment: true,
  //         MachineReading: "003",
  //         MethodName: "CLIA",
  //         DisplayReading: "0.82-2.34",
  //         OldReading: "0.01",
  //         Value: "Lorem Ipsum",
  //       },
  //     ],
  //   },
  // ]);

  // const columns1 = [
  //   {
  //     field: "Test",
  //     headerName: "Test Name",
  //     flex: 1,
  //     renderCell: ({ row }) => {
  //       const [Checked, setChecked] = useState(true);
  //       return (
  //         <div style={{ width: "160px" }} className="flex gap-2 text-center">
  //           {row?.Test}
  //           {row?.Checkbox && (
  //             <input
  //               type="checkbox"
  //               checked={Checked}
  //               onChange={() => setChecked(!Checked)}
  //             />
  //           )}
  //           {row?.R && (
  //             <SubmitButton
  //               submit={false}
  //               text={"Reject"}
  //               callBack={() => {
  //                 setRejectPopup(true);
  //               }}
  //               style={{
  //                 width: "80px",
  //                 fontSize: "0.75rem",
  //                 height: "20px",
  //                 backgroundColor: "red !important",
  //               }}
  //             />
  //           )}
  //           {row?.ReRun && (
  //             <SubmitButton
  //               submit={false}
  //               text={"Re-Run"}
  //               callBack={() => {
  //                 setReRun(true);
  //               }}
  //               style={{
  //                 width: "80px",
  //                 fontSize: "0.75rem",
  //                 height: "20px",
  //                 backgroundColor: "red !important",
  //               }}
  //             />
  //           )}
  //           {row?.ReRun && (
  //             <SubmitButton
  //               submit={false}
  //               text={"Comment"}
  //               style={{
  //                 width: "80px",
  //                 fontSize: "0.75rem",
  //                 height: "20px",
  //                 backgroundColor: "red !important",
  //               }}
  //             />
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: "Value",
  //     headerName: "Value",
  //     width: 80,
  //     renderCell: ({ row }) => {
  //       const [value, setValues] = useState(row?.Value);
  //       return (
  //         <div style={{ width: "80px" }} className="flex gap-2 text-center">
  //           {row?.Value ? (
  //             <input
  //               style={{ width: "80px" }}
  //               className=" border border-gray-300"
  //               type="text"
  //               value={value}
  //               onChange={(e) => setValues(e.target.value)}
  //             />
  //           ) : (
  //             ""
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     field: "flag",
  //     headerName: "Flag",
  //     flex: 1,
  //   },
  //   {
  //     field: "Comment",
  //     headerName: "Comment",
  //     flex: 1,
  //     renderCell: ({ row }) => (
  //       <>
  //         <div style={{}} className="flex gap-2 text-center">
  //           {row?.comment ? <FaComments /> : ""}
  //         </div>
  //       </>
  //     ),
  //   },
  //   {
  //     field: "MachineReading",
  //     headerName: "Machine Reading",
  //     flex: 1,
  //   },
  //   {
  //     field: "Machine",
  //     headerName: "Machine",
  //     flex: 1,
  //   },
  //   {
  //     field: "Min",
  //     headerName: "Min",
  //     flex: 1,
  //   },
  //   {
  //     field: "Max",
  //     headerName: "Max",
  //     flex: 1,
  //   },
  //   {
  //     field: "Unit",
  //     headerName: "Unit",
  //     flex: 1,
  //   },
  //   {
  //     field: "MethodName",
  //     headerName: "Method Name",
  //     flex: 1,
  //   },
  //   {
  //     field: "DisplayReading",
  //     headerName: "Display Reading",
  //     flex: 1,
  //   },
  //   {
  //     field: "OldReading",
  //     headerName: "Old Reading",
  //     flex: 1,
  //   },
  // ];



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
    //setLocal("payload", payload);

    //console.log(selectedDepartment, " ", selectedTest, " ", selectedCenter);
    // PostData?.postRequest("/tnx_BookingItem/GetResultEntryAllData", payload);
    // console.log(PostData?.data);

    try {

      const response = await getAllResultTrackinDataApi(payload);

      if (response?.success) {


        // const data = [
        //   {
        //     age: "7 Y 10 M 15 D",
        //     approveDateShow: "2025-Mar-01 01:10 PM",
        //     approved: 0,
        //     approvedDate: "2025-03-01 13:10:22",
        //     approvedDateShow: "2025-03-01 13:10:22",
        //     barcodeNo: "",
        //     bookingDate: "2025-01-09 05:25:26",
        //     centreId: 1,
        //     centreName: "GENERIC DIAGNOSTIC PVT. LTD.",
        //     centrecode: "GDPL01",
        //     comment: "Lab Name2 Lab Name2 Lab Name2 Lab Name2 Lab Name2",
        //     createdDateTime: "2025-03-01 13:10:22",
        //     departmentName: "BIOCHEMISTRY",
        //     deptId: 2,
        //     eerun: 0,
        //     gender: "M",
        //     investigationName: "24H ALBUMIN PROTEIN",
        //     investigationSortName: "",
        //     isSampleCollected: "Y",
        //     isremark: 0,
        //     itemId: 4,
        //     patientId: 2,
        //     patientName: "Mr. Shuham Tiwari",
        //     reportType: 1,
        //     resultdone: 0,
        //     rowcolor: "#FF4E12",
        //     sampleCollectionDate: "2025-03-03 08:43:10",
        //     sampleReceiveDate: "2025-03-03 17:15:04",
        //     sampleRecievedDateShow: "2025-Mar-03 05:15 PM",
        //     testid: 59,
        //     transactionId: 1,
        //     urgent: 1,
        //     workOrderId: "iMarsar1",
        //   },
        //   {
        //     age: "7 Y 10 M 15 D",
        //     approveDateShow: "1883-Mar-01 04:43 PM",
        //     approved: 0,
        //     approvedDate: "1883-03-01 16:43:30",
        //     approvedDateShow: "1883-03-01 16:43:30",
        //     barcodeNo: "",
        //     bookingDate: "2025-01-09 05:25:26",
        //     centreId: 1,
        //     centreName: "GENERIC DIAGNOSTIC PVT. LTD.",
        //     centrecode: "GDPL01",
        //     comment: "Lab Name2 Lab Name2 Lab Name2 Lab Name2 Lab Name2",
        //     createdDateTime: "2025-03-01 17:20:02",
        //     departmentName: "CLINICAL Pathology",
        //     deptId: 3,
        //     eerun: 0,
        //     gender: "M",
        //     investigationName: "24H MICROALBUMIN/CREATININE RATIO",
        //     investigationSortName: "",
        //     isSampleCollected: "Y",
        //     isremark: 0,
        //     itemId: 5,
        //     patientId: 2,
        //     patientName: "Mr. Shuham Tiwari",
        //     reportType: 1,
        //     resultdone: 0,
        //     rowcolor: "#FF4E12",
        //     sampleCollectionDate: "2025-03-03 08:43:10",
        //     sampleReceiveDate: "2025-03-03 10:18:08",
        //     sampleRecievedDateShow: "2025-Mar-03 10:18 AM",
        //     testid: 58,
        //     transactionId: 1,
        //     urgent: 1,
        //     workOrderId: "iMarsar1",
        //   },
        //   // More data entries can be added here
        // ];

        // Initialize an empty object to group by workOrderId and accumulate investigation names

        const result = {};

        // Loop through the data and group by workOrderId
        response?.data.forEach(item => {
          const { workOrderId, investigationName, testid, gender, centreId } = item;

          // If workOrderId exists in result, push the investigationName into the investigationName array
          if (result[workOrderId]) {
            result[workOrderId].investigationName.push({
              investigationName,  // Store investigationName
              testid,             // Store testId
              gender,             // Store gender
              fromAge: '36500',            // Store fromAge
              toAge: 0,              // Store toAge
              centreId
            }          // Store centreId
            );
          } else {
            // Otherwise, create a new entry for that workOrderId with the current item data and initialize the investigationName array
            result[workOrderId] = {
              ...item,  // Keep the full data
              investigationName: [{ investigationName: investigationName, testid: testid, gender: gender, fromAge: '36500', toAge: 0, centreId: centreId }]  // Add the investigationName array containing the current investigationName
            };
          }
        });

        // Convert the result object into an array if needed
        const groupedData = Object.values(result);


        setAllResultTrackingData(groupedData);
      } else {
        toast.error(response?.message);
      }

    } catch (error) {
      toast.error(error?.message);
    }
  };


  //observation data
  const handelObservationData = async (data, workOrderId) => {

    setIsButtonClick(2);
    // Find the testid(s) for the provided workOrderId
    const matchedWorkOrder = allResultTrackingData.find(order => order.workOrderId === workOrderId);

    const testid = matchedWorkOrder
      ? matchedWorkOrder.investigationName.map(item => item.testid).join(",")
      : "";

    // Construct the updatedData object with the testid and other fields
    const updatedData = (({ gender, fromAge, toAge, centreId }) => ({
      testid,       // Add the testid(s) we retrieved
      gender,
      fromAge,
      toAge,
      centreId
    }))(data);

    try {
      const response = await getAllObserVationDataBasedOnTestName(updatedData);

      if (response?.success) {
        setAllObservationData(response?.data);

        // Extract unique testIds
        const uniqueTestIds = response?.data?.reduce((acc, current) => {
          if (!acc[current.testId]) {
            acc[current.testId] = true;  // Add testId to the object with value true
          }
          return acc;
        }, {});

        // Update the state with unique testIds
        setObservationCheckValue(uniqueTestIds);

        console.log(uniqueTestIds);


      } else {
        toast.error(response?.message)
      }

    } catch (error) {
      toast.error(error?.message);
    }

    setIsButtonClick(0);
  }

  //handel check 
  // const handleInputChangeForObserVtionValue = (testId, value) => {
  //   // setObservationValue(prevState => ({
  //   //   ...prevState,
  //   //   [testId]: value
  //   // }));

  // }
  const handleInputChangeForObserVtionValue = (testId, index, value) => {

    const allowedPattern = /^[a-z0-9. -]*$/i; // Allows a-z, 0-9, dot (.), space (' '), and single quote (')

    if (allowedPattern.test(value)) {
      setObservationValue(prev => ({
        ...prev,
        [testId]: {
          ...prev[testId],
          [index]: value
        }
      }));
    } else {
      toast.error("Invalid character! Only a-z, 0-9, spaces and dots (.), are allowed.");
    }
  };


  const handelOnChangeResultTrackData = (e) => {

    setResultTrackData((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    }))
  }

  //get Doctors centerwise 
  useEffect(() => {

    const getAllData = async () => {
      const response = await getAllDoctorsBasedOnCentreWise(user?.employeeId, getDefaultCentreId())
      if (response?.success) {
        setAllDoctorData(response?.data)
      } else {
        toast.error(response?.message);
      }

    }

    if (allObservationData.length !== 0) {
      getAllData();
    }

  }, [allObservationData])

  //validation for 
  const getMissingFields = () => {
    return Object.keys(observationCheckValue) // Get all testIds
      .filter(testId => observationCheckValue[testId]) // Only validate checked testIds
      .filter(testId => {
        const textFields = observationValue[testId] || {}; // Get text fields for this testId

        if (Object.keys(textFields).length === 0) {
          return true; // Mark as missing if no fields exist
        }

        return Object.values(textFields).some(value => value.trim() === ""); // Check if any field is empty
      });
  };








  //save observation data
  const onSubmitObservationData = async (btnName, loadingButtonNo) => {


    setIsButtonClick(loadingButtonNo);


    const missingFields = getMissingFields();
    console.log(missingFields);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all mandatory fields for test IDs: ${missingFields.join(", ")}`);
      setIsButtonClick(0);
      return;
    }

    const listOfObservationData = allObservationData?.map((item) => {
      const flag = observationValue[item?.testId] < item?.minVal
        ? "N"
        : observationValue[item?.testId] > item?.maxVal
          ? "L"
          : "H";

      // Returning the object correctly
      return {
        transactionId: item?.transactionId,
        patientId: item?.patientId,
        barcodeNo: '',
        testId: item?.testId,
        labObservationId: item?.labObservationId,
        observationName: item?.observationName,
        value: observationValue[item?.testId],
        flag: flag, // Using the calculated flag
        minVal: item?.minVal,
        maxVal: item?.maxVal,
        minCritical: 0,
        maxCritical: 0,
        isCritical: 0,
        readingFormat: "",
        unit: item?.unit,
        displayReading: item?.displayReading,
        machineReading: item?.machineReading,
        machineID: item?.machineId,
        printSeperate: item?.printSeperate,
        isBold: (flag === "L" || flag === "H") ? 1 : 0,
        machineName: item?.machineName,
        showInReport: item?.showInReport,
        method: item?.method,
        isResultDone: btnName === 'Save' || btnName === 'Approve' && 1,
        isApproved: btnName === 'Approve' ? 1 : 0,
        createdBy: user?.name,
        createdById: parseInt(user?.employeeId),
        createdDate: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
        appcovaldoctorId: resultTrackData?.doctorId
      };
    });


    console.log(listOfObservationData);

    setIsButtonClick(0);
  }




  //!=========================end===============================
  // const updatedArray = addObjectId(PostData?.data);

  // const currentRow = async (id) => {
  //   const row = updatedArray?.filter((item) => item?.id == id);


  //   setUserObj(row[0]);
  //   return row[0];
  // }

  // const statuses = [
  //   {
  //     Data: 1,
  //     CallBack: () => { },
  //   },
  //   { Data: 3, CallBack: () => { } },
  //   { Data: 11, CallBack: () => { } },
  //   // { Data: "Tested", CallBack: () => {} },
  //   { Data: 5, CallBack: () => { } },
  //   { Data: 4, CallBack: () => { } },
  //   { Data: 7, CallBack: () => { } },
  //   { Data: 9, CallBack: () => { } },
  //   { Data: 12, CallBack: () => { } },
  //   { Data: 8, CallBack: () => { } },
  //   { Data: 6, CallBack: () => { } },
  //   { Data: 10, CallBack: () => { } },
  // ];

  // const InfoColumns = [
  //   { field: "id", headerName: "Sr. No", width: 20 },

  //   {
  //     field: `TestName`,
  //     headerName: `Test Name`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Barcode`,
  //     headerName: `Barcode`,
  //     flex: 1,
  //   },
  //   {
  //     field: `CollectionAt`,
  //     headerName: `Collection At`,
  //     flex: 1,
  //   },
  //   {
  //     field: `CollectionBy`,
  //     headerName: `Collection By`,
  //     flex: 1,
  //   },
  //   {
  //     field: `RecieveBy`,
  //     headerName: `Recieve By`,
  //     flex: 1,
  //   },
  //   {
  //     field: `RecieveAt`,
  //     headerName: `Recieve At`,
  //     flex: 1,
  //   },
  //   {
  //     field: `EntryAt`,
  //     headerName: `Entry At`,
  //     flex: 1,
  //   },
  //   {
  //     field: `EntryBy`,
  //     headerName: `Entry By`,
  //     flex: 1,
  //   },

  //   {
  //     field: `ResultAt`,
  //     headerName: `Result At`,
  //     flex: 1,
  //   },
  //   {
  //     field: `ResultBy`,
  //     headerName: `Result By`,
  //     flex: 1,
  //   },
  //   {
  //     field: `OutSourceDate`,
  //     headerName: `OutSource Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `OutSourceLab`,
  //     headerName: `OutSource Lab`,
  //     flex: 1,
  //   },
  //   {
  //     field: `OutSourceBy`,
  //     headerName: `OutSource By`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Out-HouseTransferDate`,
  //     headerName: `Out-House Transfer Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Out-HouseTransferLab`,
  //     headerName: `Out-House Transfer Lab`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Out-HouseTransferBy`,
  //     headerName: `Out-House Transfer By`,
  //     flex: 1,
  //   },
  // ];
  // const ReRunColumns = [
  //   {
  //     field: "id",
  //     headerName: "Sr. No",
  //     width: 20,
  //     renderCell: ({ row }) => (
  //       <>
  //         <div className="flex gap-2 text-center">
  //           {row?.id} <input type="checkbox" />
  //         </div>
  //       </>
  //     ),
  //   },

  //   {
  //     field: `TestName`,
  //     headerName: `Observation Name`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Reson`,
  //     headerName: `Re-Run Remark`,
  //     flex: 1,
  //     renderCell: ({ row }) => (
  //       <>
  //         <div style={{}} className="flex gap-2 text-center">
  //           <InputGenerator
  //             inputFields={[{ type: "select", name: "rerun", dataOptions: [] }]}
  //           />
  //         </div>
  //       </>
  //     ),
  //   },
  //   {
  //     field: `Action`,
  //     headerName: ``,
  //     flex: 1,
  //     renderCell: ({ row }) => (
  //       <>
  //         <div style={{}} className="flex gap-2 text-center">
  //           <SubmitButton
  //             text={"Save"}
  //             submit={false}
  //             style={{ width: "80px" }}
  //           />
  //         </div>
  //       </>
  //     ),
  //   },
  // ];
  // const ReRunRow = [
  //   { id: 1, TestName: "CBC" },
  //   { id: 2, TestName: "HB" },
  // ];
  return (
    <div>
      {/* <ResultTrackRemarkPopupModal
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
      /> */}
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

            {/* <LegendButtons statuses={statuses} /> */}
          </form>


          {/* <div className="mt-1" style={{ maxHeight: "200px", overflow: "scroll" }}>

            <DynamicTable
              rows={updatedArray}
              name="Patient Test Details"
              loading={PostData?.loading}
              tableStyle={{ marginBottom: "-25px" }}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div> */}

        </div>

        {/* <div>
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
          )}
        </div> */}

        <div>
          <GridDataDetails
            gridDataDetails={'Patient Record Details'}
          />

          {/* <div className="max-h-80 overflow-y-auto"> */}

          <CustomDynamicTable columns={ResultTrackingHeader} activeTheme={activeTheme} height=
            {"300px"}>
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
                    <div className="flex gap-1 items-center">
                      <div>
                        {index + 1}
                      </div>
                      {
                        data?.urgent === 1 && (
                          <div>
                            <img src={UrgentGif} alt="path not found" />
                          </div>
                        )
                      }

                    </div>
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
                    <div className="flex gap-1">
                      {data?.investigationName?.map((item, index) => (
                        <CustomeNormalButton
                          key={index}
                          activeTheme={activeTheme}
                          text={item?.investigationName}
                          onClick={() => handelObservationData(item, data?.workOrderId)}
                        />
                      ))}
                    </div>

                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    {data?.approvedDate}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >

                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                      style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                      onClick={() => setShowPopup(1)}
                    >
                      <MdAddCircleOutline className="text-base" />
                    </div>
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                      style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                      onClick={() => setShowPopup(2)}
                    >
                      <FaCircleInfo />
                    </div>
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                    {data?.comment.length >= 9 ? (
                      <div className="flex justify-center items-center gap-1">
                        {data?.comment.slice(0, 9) + " ...."} {/* Convert the sliced array to a string */}
                        <div
                          className="w-5 h-5 flex justify-center items-center rounded-sm"
                          style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                          onClick={() => setShowPopup(3)}
                        >
                          <FaCommentDots />
                        </div>
                      </div>
                    ) : (
                      data?.comment
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </CustomDynamicTable >
          {/* </div> */}

        </div >

        {/* observation data */}
        <div>

          {
            isButtonClick === 2 && (
              <CustomLoadingPage />
            )
          }

          {
            allObservationData?.length !== 0 && (
              <>
                <GridDataDetails
                  gridDataDetails={'Result Entry'}
                />

                {
                  console.log(allObservationData)

                }
                <CustomDynamicTable columns={resultTrackingForObservationHeader} activeTheme={activeTheme} height={"300px"} >
                  <tbody>
                    {allObservationData?.map((data, index) => (

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

                        {
                          data?.observationName === "" ?
                            <>
                              <td colSpan="12" className="border-b px-4 h-6 text-base font-bold text-gridTextColor w-full">
                                <div className="flex items-center  gap-2 w-full">
                                  <div>{data?.investigationName}</div>
                                  <div className="flex justify-center items-center">
                                    <input
                                      type="checkbox"
                                      checked={observationCheckValue[data?.testId] || false}
                                      onChange={() =>
                                        setObservationCheckValue(prev => ({
                                          ...prev,
                                          [data?.testId]: !prev[data?.testId] // Toggle checkbox state
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="w-20">
                                    <CustomeNormalButton activeTheme={activeTheme} text={'Reject'}
                                      onClick={() => setShowPopup(4)}
                                    />
                                  </div>
                                  <div className="w-20">
                                    <CustomeNormalButton activeTheme={activeTheme} text={'Re-Run'} onClick={() => setShowPopup(5)} />
                                  </div>
                                  <div className="w-20">
                                    <CustomeNormalButton activeTheme={activeTheme} text={'Comment'} />
                                  </div>
                                </div>
                              </td>


                            </>

                            :
                            <>
                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0px' }}>
                                {data?.observationName}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                <form autoComplete="off">


                                  <input type="text" name="charNumber" id="charNumber"
                                    value={observationValue[data?.testId]?.[index] || ""} // Get value for specific testId & index
                                    maxLength={15}
                                    onChange={(e) => handleInputChangeForObserVtionValue(data?.testId, index, e.target.value)}
                                    className="w-[5.5rem] h-[1.6rem] outline-none rounded-sm border-[1px] pl-1"
                                  />

                                </form>
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold ">
                                {observationValue[data?.testId] &&
                                  Object.values(observationValue[data?.testId]).some(value => value !== "") && (
                                    <div className="flex items-center justify-center gap-2">
                                      <FaFlag
                                        className={`text-xl  ${Object.values(observationValue[data?.testId]).some(value => Number(value) < Number(data?.minVal))
                                          ? "text-yellow-500"
                                          : Object.values(observationValue[data?.testId]).some(value => Number(value) > Number(data?.maxVal))
                                            ? "text-red-500"
                                            : "text-green-500"
                                          }`}
                                      />
                                      <div className={`text-xl font-semibold ${Object.values(observationValue[data?.testId]).some(value => Number(value) < Number(data?.minVal))
                                        ? "text-yellow-500"
                                        : Object.values(observationValue[data?.testId]).some(value => Number(value) > Number(data?.maxVal))
                                          ? "text-red-500"
                                          : "text-green-500"
                                        }`}>
                                        {Object.values(observationValue[data?.testId]).some(value => Number(value) < Number(data?.minVal))
                                          ? "L"
                                          : Object.values(observationValue[data?.testId]).some(value => Number(value) > Number(data?.maxVal))
                                            ? "H"
                                            : "N"}
                                      </div>
                                    </div>
                                  )
                                }



                              </td>



                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                {data?.machineReading}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                {data?.machineName}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                {data?.minVal}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                {data?.maxVal}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                {data?.unit}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                {data?.method}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                {data?.displayReading}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                {data?.oldreading}
                              </td>
                            </>
                        }

                      </tr>
                    ))}
                  </tbody>
                </CustomDynamicTable >

                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  my-2  mx-1 lg:mx-2 items-center">

                  <div className="relative flex-1">
                    <CustomDropdown
                      name="doctorId"
                      label="Select Doctor"
                      value={resultTrackData?.doctorId}
                      options={[
                        { label: 'Select Doctor Name', value: 0, disabled: true },
                        ...allDoctorData?.map(item => ({
                          label: item.doctorName,
                          value: parseInt(item.doctorId),
                        })),
                      ]}
                      onChange={(e) => handelOnChangeResultTrackData(e)}
                      defaultIndex={0}
                      activeTheme={activeTheme}
                      isMandatory={!resultTrackData?.doctorId}
                    />
                  </div>

                  <div className='flex gap-[0.25rem]'>
                    <div className="relative flex-1 ">
                      <CustomFormButton
                        activeTheme={activeTheme}
                        text="Save"
                        icon={FaSpinner}
                        isButtonClick={isButtonClick}
                        loadingButtonNumber={1} // Unique number for the first button
                        onClick={() => onSubmitObservationData('Save', 1)}

                      />
                    </div>
                    <div className="relative flex-1">
                      <CustomFormButton
                        activeTheme={activeTheme}
                        text="Hold"
                        icon={FaSpinner}
                        isButtonClick={isButtonClick}
                        loadingButtonNumber={2} // Unique number for the first button

                      // // disabled={allDoctorData?.find((item) => item?.doctorId === resultTrackData?.doctorId)?.hold === 1}
                      />
                    </div>
                  </div>

                  <div className='flex gap-[0.25rem]'>
                    <div className="relative flex-1 ">
                      <CustomFormButton
                        activeTheme={activeTheme}
                        text="Approve"
                        icon={FaSpinner}
                        isButtonClick={isButtonClick}
                        loadingButtonNumber={3} // Unique number for the first button
                        onClick={() => onSubmitObservationData('Approve', 3)}
                      // disabled={allDoctorData?.find((item) => item?.doctorId === resultTrackData?.doctorId)?.approve === 1}
                      />
                    </div>
                    <div className="relative flex-1">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Print Report'} />
                    </div>
                  </div>

                  <div className='flex gap-[0.25rem]'>
                    <div className="relative flex-1 ">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Add Report'} />
                    </div>
                    <div className="relative flex-1">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Add Attachment'} />
                    </div>
                  </div>

                  <div className='flex gap-[0.25rem]'>
                    <div className="relative flex-1 ">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Main List'} />
                    </div>
                    <div className="relative flex-1">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Previous'} />
                    </div>
                  </div>

                  <div className='flex gap-[0.25rem]'>
                    <div className="relative flex-1 ">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Next'} />
                    </div>
                    <div className="relative flex-1">

                    </div>
                  </div>
                </div>

              </>
            )
          }


        </div >


        {
          showPopup === 1 && (
            <CustomPopup
              headerData={'Test Remark'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla at tempora perspiciatis nostrum tempore in ducimus nam omnis sint dicta, repellat qui impedit numquam ipsam cupiditate dolorum quae sit atque! Consectetur veritatis magnam vel! Aspernatur eligendi placeat nam enim atque eaque nobis, suscipit quam exercitationem voluptate blanditiis quos accusantium architecto rerum sapiente consequuntur quo. Officia obcaecati nihil ipsam, porro neque magnam vel sequi corrupti molestias ut necessitatibus nisi sed, consequuntur amet, possimus repudiandae optio cumque. Blanditiis deleniti aperiam quo exercitationem labore quae fugiat eligendi cum, vero, dicta dignissimos aliquid amet a quos consequatur voluptatem? Alias fugit debitis autem repudiandae rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quae amet aperiam, fuga sint quam ipsam soluta numquam temporibus voluptas ut? Iste culpa laudantium excepturi vel impedit nam atque nulla quae quis! Sit enim doloremque tenetur obcaecati numquam laudantium, aperiam reiciendis ipsa natus neque temporibus ipsam, corrupti quis iste necessitatibus. Dolorem harum maxime ducimus veniam iusto autem sed nam voluptas. Nemo ipsa quidem totam quis ratione eaque tenetur necessitatibus ea excepturi autem? Odit ratione ex aut fugiat voluptate error vel, aspernatur exercitationem iusto nisi repellendus magni nulla aliquid odio corporis perferendis assumenda deserunt quidem aperiam? Laboriosam voluptatem autem reiciendis explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quis optio provident adipisci cumque! Voluptatum enim non, dicta ullam illum eveniet? Labore dolores beatae facilis voluptatum molestias placeat corrupti, iure nostrum laborum doloribus tempora velit aliquam minima vero atque delectus a ad aliquid cupiditate quaerat nemo necessitatibus iusto deleniti? Quos sapiente dolorum maiores magnam animi aspernatur. Molestiae accusamus quia eaque eius ratione veniam, sapiente, commodi excepturi quos culpa quidem officiis sint quibusdam? Sunt accusantium, veritatis ex possimus modi provident, quisquam a amet voluptatum architecto eaque. Labore voluptates esse porro dolorum consectetur beatae id voluptas aut? Ab beatae, perspiciatis distinctio culpa nobis fuga eaque molestiae aperiam consectetur ipsum soluta est magni maxime quidem quae quod modi rerum deleniti deserunt iusto officia nam. Asperiores recusandae voluptate sequi doloremque laboriosam, similique consectetur ipsam, maiores voluptatum veritatis commodi ex libero soluta veniam blanditiis. Maxime nostrum explicabo ipsa non sunt voluptatibus aliquam! Recusandae ea animi fugiat et modi amet eaque ullam, dicta architecto necessitatibus velit voluptas? Iusto soluta placeat ab. Obcaecati aut eos, sunt incidunt architecto consequatur corrupti, dolorum nisi recusandae saepe mollitia eligendi nam non. Mollitia quod similique facilis hic molestiae, sed dolore enim inventore. Perferendis a, recusandae dicta porro quidem itaque quasi ipsam ex delectus voluptatem quibusdam ratione aliquid aliquam iusto? Sequi delectus nisi cum? Reiciendis cupiditate obcaecati repudiandae deserunt sapiente, molestiae perspiciatis, nostrum minima earum, soluta repellat! Repudiandae excepturi quidem, sint provident numquam eos vitae, dicta quibusdam minima explicabo voluptatibus! Vel repudiandae excepturi blanditiis inventore fuga molestias accusamus unde architecto? Maxime et veritatis repudiandae tempora, id, officiis illum dolorem animi corporis quasi praesentium. Unde neque, blanditiis nemo veniam quis dolorem iusto id illo ut sed debitis aut minus dicta ad. Aliquid consequuntur mollitia omnis ducimus fugit quam, quibusdam explicabo sit unde eum numquam qui maxime est delectus ullam cum corrupti voluptas distinctio?

            </CustomPopup>

          )
        }

        {
          showPopup === 2 && (
            <CustomPopup
              headerData={'Patient Information'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >

              <GridDataDetails
                gridDataDetails={'Patient Details'}
              />

              <CustomDynamicTable columns={resultTrackForPatientInformation} activeTheme={activeTheme} height=
                {"300px"}>
                <tbody>

                </tbody>
              </CustomDynamicTable >

            </CustomPopup>

          )
        }

        {
          showPopup === 3 && (
            <CustomPopup
              headerData={'Comment'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet praesentium vel asperiores aliquid laboriosam, dignissimos tenetur voluptate! Voluptatibus mollitia debitis dolorum quaerat, dignissimos, vitae distinctio rem beatae aliquam qui voluptate.

            </CustomPopup>

          )
        }


        {
          showPopup === 4 && (
            <CustomPopup
              headerData={'Reject'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >
            </CustomPopup>
          )
        }

        {
          showPopup === 5 && (
            <CustomPopup
              headerData={'Re-Run'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >
              <GridDataDetails
                gridDataDetails={'Patient Details'}
              />

              <CustomDynamicTable columns={resultTrackingForReRun} activeTheme={activeTheme} height=
                {"300px"}>
                <tbody>

                </tbody>
              </CustomDynamicTable >
            </CustomPopup>
          )
        }
      </>
    </div >
  );
}
