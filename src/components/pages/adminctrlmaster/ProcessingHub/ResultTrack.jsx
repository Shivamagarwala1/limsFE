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
import { FaCommentDots, FaComments, FaEye, FaPlus, FaPrint, FaSpinner } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import CustomeEditor from '../../../sharecomponent/CustomeEditor'
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
import { convertUnApproveToApprove, convsertHoldToUnHoldOrUnHoldToHold, getAllDoctorsBasedOnCentreWise, getAllObserVationDataBasedOnTestName, getAllResultTrackinDataApi, getAllTemplateDataForResultTrackingApi, saveAttachementDataInResultTrackingApi, saveAttachementInResultTrackingApi, saveReportInResultTrackingApi, SaveTestObservationsDataApi, viewUploadResultTrackingApi } from "../../../../service/service";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import { resultTrackForPatientInformation, resultTrackingForObservationHeader, resultTrackingForReRun, ResultTrackingHeader } from "../../../listData/listData";
import { FaCircleInfo } from "react-icons/fa6";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import CustomLoadingPage from "../../../global/CustomLoadingPage";
import CustomDropdown from "../../../global/CustomDropdown";
import CustomPopup from "../../../global/CustomPopup";
import { getDefaultCentreId } from "../../../../service/localstroageService";
import CustomFormButton from "../../../global/CustomFormButton";
import CustomSmallPopup from "../../../global/CustomSmallPopup";
import CustomFileUpload from "../../../global/CustomFileUpload";

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
    template: 0
  })
  const [allResultTrackingData, setAllResultTrackingData] = useState([]);
  const [allObservationData, setAllObservationData] = useState([]);
  const [allDoctorData, setAllDoctorData] = useState([]);
  const [allTemplateData, setAllTemplateData] = useState([]);
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [observationValue, setObservationValue] = useState({});
  const [observationCheckValue, setObservationCheckValue] = useState({});
  const [showPopup, setShowPopup] = useState(0);
  const [testIsHold, setTestIsHold] = useState({
    testIdHold: 0,
    hold: 0,
    testIdApprove: 0,
    isApproved: 0
  });
  const [reasionForHoldOrUnHoldAndApprovedOrNotApproved, setReasionForHoldOrUnHoldAndApprovedOrNotApproved] = useState('');
  const [trackingHoldOrApproved, setTrackingHoldOrApproved] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [addAttachment, setAddAttachment] = useState('');
  const [testIdForTracingAddAttachement, setTestIdForTracingAddAttachement] = useState(0);
  const [imageLocationPath, setImageLocationPath] = useState([]);
  //!================Anil code end=======================

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


        setIsButtonClick(1);

        // Initialize an empty object to group by workOrderId and accumulate investigation names

        const result = {};

        // Loop through the data and group by workOrderId
        response?.data.forEach(item => {
          const { workOrderId, investigationName, testid, gender, centreId, reportType, itemId } = item;

          // If workOrderId exists in result, push the investigationName into the investigationName array
          if (result[workOrderId]) {
            result[workOrderId].investigationName.push({
              investigationName,  // Store investigationName
              testid,             // Store testId
              gender,             // Store gender
              fromAge: 0,            // Store fromAge
              toAge: 0,              // Store toAge
              centreId,
              reportType,
              itemId
            }          // Store centreId
            );
          } else {
            // Otherwise, create a new entry for that workOrderId with the current item data and initialize the investigationName array
            result[workOrderId] = {
              ...item,  // Keep the full data
              investigationName: [{ investigationName: investigationName, testid: testid, gender: gender, fromAge: 0, toAge: 0, centreId: centreId, reportType: reportType, itemId: itemId }]  // Add the investigationName array containing the current investigationName
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

    setIsButtonClick(0);
  };


  //observation data
  const handelObservationData = async (totalAge, data, workOrderId, reportType, itemId, clickedRowTestId) => {

    setIsButtonClick(2);
    setAllObservationData([]);

    //strore the test id for uploading attachement
    setTestIdForTracingAddAttachement(data?.testid)

    // Find the testid(s) for the provided workOrderId
    const matchedWorkOrder = allResultTrackingData.find(order => order.workOrderId === workOrderId);

    const testid = matchedWorkOrder
      ? matchedWorkOrder.investigationName.map(item => item.testid).join(",")
      : "";



    //set specific result tracking data after click the specific row
    const specificRowSelectedData = allResultTrackingData?.filter((data) => data?.testid === clickedRowTestId);


    setAllResultTrackingData(specificRowSelectedData)


    // Construct the updatedData object with the testid and other fields
    const updatedData = (({ gender, centreId, }) => ({
      testid,       // Add the testid(s) we retrieved
      gender,
      fromAge: totalAge,
      toAge: totalAge,
      centreId
    }))(data);


    try {
      const response = await getAllObserVationDataBasedOnTestName(updatedData);

      if (response?.success) {

        setAllObservationData(response?.data);

        //check which button is hold or unhold
        const dataForHoldOrUnHold = response?.data.find((item) => item?.hold === 1);
        if (dataForHoldOrUnHold === undefined) {
          setTestIsHold((preventData) => ({
            ...preventData,
            testIdHold: response?.data[0]?.testId,
            hold: response?.data[0]?.hold
          }))
        } else {
          setTestIsHold((preventData) => ({
            ...preventData,
            testIdHold: dataForHoldOrUnHold?.testId,
            hold: dataForHoldOrUnHold?.hold
          }))
        }


        const dataForApprovedOrUnApproved = response?.data.find((item) => item?.isapproved === 1);
        if (dataForApprovedOrUnApproved === undefined) {
          setTestIsHold((preventData) => ({
            ...preventData,
            testIdApprove: response?.data[0]?.testId,
            isApproved: response?.data[0]?.isapproved
          }))
        } else {
          setTestIsHold((preventData) => ({
            ...preventData,
            testIdApprove: dataForApprovedOrUnApproved?.testId,
            isApproved: dataForApprovedOrUnApproved?.isapproved
          }))
        }



        //check reporttype!==1 then only open editor
        const isOpenEditor = String(reportType) !== '1';

        if (isOpenEditor) {
          try {
            const response = await getAllTemplateDataForResultTrackingApi(getDefaultCentreId(), itemId);

            if (response?.success) {
              setAllTemplateData(response?.data);
            } else {
              console.log(response?.message);
              toast.error(error?.message);
            }

          } catch (error) {
            toast.error(error?.message)
          }
        }
        setIsEditorOpen(isOpenEditor);

        // Extract unique testIds
        const uniqueTestIds = response?.data?.reduce((acc, current) => {
          if (String(current.reportType) === '1' && !acc[current.testId]) {

            acc[current.testId] = true;  // Add testId to the object with value true
          }
          return acc;
        }, {});



        // Update the state with unique testIds
        setObservationCheckValue(uniqueTestIds);

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

    if (missingFields.length > 0) {
      toast.info(`Please fill in all mandatory fields`);
      setIsButtonClick(0);
      return;
    }



    const listOfObservationData = allObservationData
      ?.filter(item => observationCheckValue[item?.testId]) // Only include checked items
      .filter(item => item?.observationName !== '')
      .map((item, index) => {
        const flag = observationValue[item?.testId]?.[index + 1] !== undefined && observationValue[item?.testId]?.[index + 1] !== null
          ? Number(observationValue[item?.testId]?.[index + 1]) < Number(item?.minVal)
            ? "L"  // If value is less than minVal, set flag to "L"
            : Number(observationValue[item?.testId]?.[index + 1]) > Number(item?.maxVal)
              ? "H"  // If value is greater than maxVal, set flag to "H"
              : "N"  // Otherwise, set flag to "N"
          : "";  // If no value exists at the specified index, set flag to an empty string

        // Returning the object correctly
        return {
          transactionId: item?.transactionId,
          patientId: item?.patientId,
          barcodeNo: '',
          testId: item?.testId,
          labObservationId: item?.labObservationId,
          observationName: item?.observationName,
          value: observationValue[item?.testId][index + 1] || item?.value,
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
          machineID: item?.machineId || 1,
          printSeperate: item?.printSeperate,
          isBold: (flag === "L" || flag === "H") ? 1 : 0,
          machineName: item?.machineName,
          showInReport: item?.showInReport,
          method: item?.method,
          isResultDone: btnName === 'Save' || btnName === 'Approve' ? 1 : 0,
          isApproved: btnName === 'Approve' ? 1 : 0,
          createdBy: user?.name,
          createdById: parseInt(user?.employeeId),
          createdDate: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
          appcovaldoctorId: btnName === 'Approve' ? resultTrackData?.doctorId : 0
        };
      });


    if (listOfObservationData.length !== 0) {

      try {
        const response = await SaveTestObservationsDataApi(listOfObservationData);

        if (response?.success) {
          toast.success(response?.message);

          //find any fields are approved  or not
          if (btnName === 'Approve') {

            // console.log(listOfObservationData);
            const dataForApprovedOrUnApproved = listOfObservationData?.find((item) => item?.isApproved === 1);

            setTestIsHold((preventData) => ({
              ...preventData,
              testIdApprove: dataForApprovedOrUnApproved?.testId,
              isApproved: dataForApprovedOrUnApproved?.isapproved
            }))

          }

        } else {
          toast.error(response?.message)
        }

      } catch (error) {
        toast.error(error?.message)
        console.log(error);
      }

    } else {
      toast.warning('Empty Data')
    }

    setIsButtonClick(0);
  }


  //update approve, hold
  const onSubmitReasionForHoldOrUnHoldAndApprovedOrNotApproved = async () => {

    setIsButtonClick(3)

    if (trackingHoldOrApproved === 'Hold') {

      const isHold = String(testIsHold?.hold) === '1' ? 0 : 1;

      try {

        const response = await convsertHoldToUnHoldOrUnHoldToHold(testIsHold?.testIdHold, isHold, parseInt(user?.employeeId), reasionForHoldOrUnHoldAndApprovedOrNotApproved);

        if (response?.success) {
          toast.success(response?.message);
          setShowPopup(0);
          setTestIsHold((preventData) => ({
            ...preventData,
            hold: isHold
          }));
          setTrackingHoldOrApproved('');
          setReasionForHoldOrUnHoldAndApprovedOrNotApproved('');
        } else {
          toast.success(response?.message);
        }

      } catch (error) {
        toast.error(error?.message)
      }
    } else {

      try {
        const response = await convertUnApproveToApprove(testIsHold?.testIdApprove, parseInt(user?.employeeId));

        if (response?.success) {
          toast.success(response?.message);
          setTestIsHold((preventData) => ({
            ...preventData,
            isApproved: 0
          }));
          setTrackingHoldOrApproved('');
          setReasionForHoldOrUnHoldAndApprovedOrNotApproved('');
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        toast.error(error?.message)
      }

    }

    setIsButtonClick(0);
  }


  //add attachement
  const handelImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAddAttachment(file); // Store the file object directly
    }
  };

  //upload attachemtnt file
  const uploadAttachmentFiles = async (imageType) => {
    setIsButtonClick(4);

    if (addAttachment === '') {
      toast.error('Select attachment');
      setIsButtonClick(0);
      return;
    }


    if (imageType === 'pdf') {

      try {
        const response = await saveAttachementDataInResultTrackingApi(addAttachment);

        if (response?.success) {



          const updatedData = {

            "isActive": 1,
            "createdById": parseInt(user?.employeeId),
            "createdDateTime": new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            "updateById": 0,
            "updateDateTime": new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            "id": 0,
            "testId": testIdForTracingAddAttachement,
            "attachment": response?.data?.filePath
          }

          try {
            const responseAttatchement = await saveAttachementInResultTrackingApi(updatedData);

            if (responseAttatchement?.success) {
              toast.success(responseAttatchement?.message);
              setImageLocationPath([response?.data?.filePath])
              setAddAttachment('')
            } else {
              toast.error(responseAttatchement?.message);
            }
          } catch (error) {
            toast.error(error?.message)
            console.log(error);
          }

        } else {
          toast.error(error?.message);
        }

      } catch (error) {
        toast.error(error?.message);
        console.log(error);
      }

    } else {

      try {
        const response = await saveAttachementDataInResultTrackingApi(addAttachment);

        if (response?.success) {

          const updatedData = {

            "isActive": 1,
            "createdById": parseInt(user?.employeeId),
            "createdDateTime": new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            "updateById": 0,
            "updateDateTime": new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
            "id": 0,
            "testId": testIdForTracingAddAttachement,
            "attachment": response?.data?.filePath
          }

          try {
            const responseAttatchement = await saveReportInResultTrackingApi(updatedData);

            if (responseAttatchement?.success) {
              toast.success(responseAttatchement?.message);
              setImageLocationPath([response?.data?.filePath])
              setAddAttachment('')
            } else {
              toast.error(responseAttatchement?.message);
            }
          } catch (error) {
            toast.error(error?.message)
            console.log(error);
          }

        } else {
          toast.error(error?.message);
        }

      } catch (error) {
        toast.error(error?.message);
        console.log(error);
      }

    }
    setIsButtonClick(0);
  }

  //view image
  const viewResultData = async (path) => {

    try {

      const response = await viewUploadResultTrackingApi(path);

      // Ensure the response is valid
      if (response && response.data) {
        // Check if the 'content-type' header exists and is valid
        const contentType = response.headers["content-type"];
        if (!contentType) {
          console.error("Content-Type header is missing");
          return;
        }

        // Create a blob with the correct content type
        const blob = new Blob([response.data], { type: contentType });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Open the file in a new tab
        window.open(url, "_blank");

        // Optionally revoke the object URL after 10 seconds to free up memory
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      } else {
        console.error("Invalid response or missing data");
      }


    } catch (error) {
      toast.error(error?.message)
      console.log(error);

    }
  }


  //!=========================end===============================
  // const updatedArray = addObjectId(PostData?.data);

  // const currentRow = async (id) => {
  //   const row = updatedArray?.filter((item) => item?.id == id);


  //   setUserObj(row[0]);
  //   return row[0];
  // }

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

              <div className="flex gap-[0.25rem]">
                <div className="relative flex-1">
                  <SubmitButton text={"Search"} />
                </div>
                <div className="relative flex-1">
                </div>
              </div>
            </div>

            <LegendButtons statuses={statuses} />
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



        <div>

          {/* {
            isButtonClick === 1 && (
              <CustomLoadingPage />
            )
          } */}

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
                          onClick={() => handelObservationData(data?.totalAge, item, data?.workOrderId, item?.reportType, item?.itemId, data?.testid)}
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
                  isEditorOpen ?

                    <>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  my-2  mx-1 lg:mx-2 items-center">
                        <div className="relative flex-1">
                          <CustomDropdown
                            name="template"
                            label="Select Template"
                            value={resultTrackData?.template}
                            options={[
                              { label: 'Select Template Name', value: 0, disabled: true },
                              ...allTemplateData?.map(item => ({
                                label: item.name,
                                value: parseInt(item.id),
                              })),
                            ]}
                            onChange={(e) => handelOnChangeResultTrackData(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                            isMandatory={!resultTrackData?.template}
                          />

                        </div>
                      </div>


                      <div className="mb-2">
                        <CustomeEditor />
                      </div>
                    </>
                    :

                    <CustomDynamicTable CustomDynamicTable columns={resultTrackingForObservationHeader} activeTheme={activeTheme} height={"300px"} >
                      <tbody>
                        {allObservationData?.map((data, index) => {

                          const isNextAvailable = index < allObservationData.length - 1;

                          return (
                            data?.reportType === 1 &&
                              data?.observationName === "" ? (
                              <React.Fragment key={index}>

                                {
                                  index !== 0 && (
                                    isNextAvailable && (
                                      <tr>
                                        <td colSpan="12" className="border-b px-4 h-6 text-base font-bold text-gridTextColor w-full">
                                        </td>
                                      </tr>
                                    )
                                  )
                                }


                                <tr>
                                  <td colSpan="12" className="border-b px-4 h-6 text-base font-bold text-gridTextColor w-full">
                                    <div className="flex items-center gap-2 w-full">
                                      <div style={{
                                        background: activeTheme?.menuColor,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                      }}>{data?.investigationName}</div>
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
                                        <CustomeNormalButton
                                          activeTheme={activeTheme}
                                          text={'Reject'}
                                          disabled={String(data?.isapproved) !== '0'}
                                          onClick={() => setShowPopup(4)}
                                        />
                                      </div>
                                      <div className="w-20">
                                        <CustomeNormalButton activeTheme={activeTheme}
                                          text={'Re-Run'}
                                          disabled={String(data?.isapproved) !== '0'}
                                          onClick={() => setShowPopup(5)} />
                                      </div>
                                      <div className="w-20">
                                        <CustomeNormalButton activeTheme={activeTheme}
                                          text={'Comment'}
                                          disabled={String(data?.isapproved) !== '0'}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>


                              </React.Fragment>
                            )
                              :

                              data?.reportType === 1 && (

                                <tr
                                  className={`cursor-pointer whitespace-nowrap 
                                  ${isHoveredTable === index ? '' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}  
                                  ${data?.value !== "" && data?.value !== "Header"
                                      ? Number(data?.value) < Number(data?.minVal)
                                        ? "bg-yellow-500"
                                        : Number(data?.value) > Number(data?.maxVal)
                                          ? "bg-red-500"
                                          : "bg-green-500"
                                      : "" // No background color if value is "Header" or ""
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
                                  <td className="border-b px-4 h-5 text-xxxs font-semibold text-gridTextColor" style={{ width: '0px' }}>
                                    <div className="flex items-center gap-1">
                                      <div>
                                        {data?.observationName}
                                      </div>
                                      {
                                        data?.observationName === 'DIFFERENTIAL LEUKOCYTE COUNT(DLC)' && (
                                          <div>
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
                                        )
                                      }

                                    </div>
                                  </td>

                                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                    <form autoComplete="off">
                                      <input
                                        type="text"
                                        name="charNumber"
                                        id="charNumber"
                                        value={observationValue[data?.testId]?.[index] ?? data?.value ?? ""} // Get value for specific testId & index
                                        maxLength={15}
                                        readOnly={data?.value}
                                        onChange={(e) => handleInputChangeForObserVtionValue(data?.testId, index, e.target.value)}
                                        className={`w-[5.5rem] h-[1.2rem] outline-none rounded-sm border-[1px] pl-1 ${data?.value ? 'bg-gray-200' : 'bg-white'}  }`}

                                        style={{
                                          background: data?.value === "Header" ? activeTheme?.menuColor : "black",
                                          WebkitBackgroundClip: "text",
                                          WebkitTextFillColor: "transparent",
                                          display: "inline-block", // Ensures proper rendering of gradient
                                        }}
                                      />
                                    </form>
                                  </td>

                                  <td className="border-b px-4 h-5 text-xxs font-semibold">

                                    {data?.value !== 'Header' && data?.value ?
                                      <div className="flex items-center justify-center gap-2">
                                        <FaFlag
                                          className={`text-base ${Number(data?.value) < Number(data?.minVal)
                                            ? "text-yellow-500"
                                            : Number(data?.value) > Number(data?.maxVal)
                                              ? "text-red-500"
                                              : "text-green-500"
                                            }`}
                                        />
                                        <div className={`text-base font-semibold ${Number(data?.value) < Number(data?.minVal)
                                          ? "text-yellow-500"
                                          : Number(data?.value) > Number(data?.maxVal)
                                            ? "text-red-500"
                                            : "text-green-500"
                                          }`}>
                                          {Number(data?.value) < Number(data?.minVal)
                                            ? "L"
                                            : Number(data?.value) > Number(data?.maxVal)
                                              ? "H"
                                              : "N"}
                                        </div>
                                      </div>
                                      :
                                      observationValue[data?.testId]?.[index] && observationValue[data?.testId]?.[index] !== "" && (
                                        <div className="flex items-center justify-center gap-2">
                                          <FaFlag
                                            className={`text-base ${Number(observationValue[data?.testId]?.[index]) < Number(data?.minVal)
                                              ? "text-yellow-500"
                                              : Number(observationValue[data?.testId]?.[index]) > Number(data?.maxVal)
                                                ? "text-red-500"
                                                : "text-green-500"
                                              }`}
                                          />
                                          <div className={`text-base font-semibold ${Number(observationValue[data?.testId]?.[index]) < Number(data?.minVal)
                                            ? "text-yellow-500"
                                            : Number(observationValue[data?.testId]?.[index]) > Number(data?.maxVal)
                                              ? "text-red-500"
                                              : "text-green-500"
                                            }`}>
                                            {Number(observationValue[data?.testId]?.[index]) < Number(data?.minVal)
                                              ? "L"
                                              : Number(observationValue[data?.testId]?.[index]) > Number(data?.maxVal)
                                                ? "H"
                                                : "N"}
                                          </div>
                                        </div>
                                      )}
                                  </td>


                                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" title={data?.machineReading}>
                                    {/* {data?.machineReading} */}
                                    {data?.machineReading?.length > 7 ? `${data.machineReading.slice(0, 19)}...` : data?.machineReading}

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

                                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" title={data?.method}>
                                    {data?.method?.length > 19 ? `${data.method.slice(0, 19)}...` : data?.method}

                                  </td>

                                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" title={data?.displayReading}>
                                    {/* {data?.displayReading} */}
                                    {data?.displayReading?.length > 19 ? `${data.displayReading.slice(0, 19)}...` : data?.displayReading}

                                  </td>

                                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                    {data?.oldreading}
                                  </td>

                                </tr >

                              )

                          )
                        }
                        )}
                      </tbody>
                    </CustomDynamicTable >
                }
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
                      <CustomeNormalButton
                        activeTheme={activeTheme}
                        text={String(testIsHold?.hold) === '1' ? 'UnHold' : 'Hold'}
                        onClick={() => { setShowPopup(6), setTrackingHoldOrApproved('Hold') }}

                      // // disabled={allDoctorData?.find((item) => item?.doctorId === resultTrackData?.doctorId)?.hold === 1}
                      />
                    </div>
                  </div>

                  <div className='flex gap-[0.25rem]'>
                    <div className="relative flex-1 ">
                      {
                        String(testIsHold?.isApproved) === '1' ?
                          <CustomeNormalButton
                            activeTheme={activeTheme}
                            text={'Un Approve'}

                            icon={FaSpinner}
                            isButtonClick={isButtonClick}
                            loadingButtonNumber={2} // Unique number for the first button
                            // onClick={() => onSubmitObservationData('Approve', 3)}
                            // disabled={allDoctorData?.find((item) => item?.doctorId === resultTrackData?.doctorId)?.approve === 1}
                            onClick={() => { setTrackingHoldOrApproved('Approve'), onSubmitReasionForHoldOrUnHoldAndApprovedOrNotApproved() }}
                          />

                          :
                          <CustomFormButton
                            activeTheme={activeTheme}
                            text="Approve"
                            icon={FaSpinner}
                            isButtonClick={isButtonClick}
                            loadingButtonNumber={3} // Unique number for the first button

                            // disabled={allDoctorData?.find((item) => item?.doctorId === resultTrackData?.doctorId)?.approve === 1}

                            disabled={resultTrackData?.doctorId === 0}
                            onClick={() => onSubmitObservationData('Approve', 3)}
                          />

                      }


                    </div>
                    <div className="relative flex-1">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Print Report'} />
                    </div>
                  </div>

                  <div className='flex gap-[0.25rem]'>
                    <div className="relative flex-1 ">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Add Report'}
                        onClick={() => setShowPopup(8)}
                      />
                    </div>
                    <div className="relative flex-1">
                      <CustomeNormalButton activeTheme={activeTheme} text={'Add Attachment'} onClick={() => setShowPopup(7)} />
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

        {
          showPopup === 6 && (
            <CustomSmallPopup
              headerData={trackingHoldOrApproved === 'Hold' ? String(testIsHold?.hold) === '1' ? 'UnHold' : 'Hold' : testIsHold?.isApproved === '1' ? 'Not Approve' : 'Approve'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >
              <GridDataDetails
                gridDataDetails={trackingHoldOrApproved === 'Hold' ? String(testIsHold?.hold) === '1' ? 'UnHold Reason' : 'Hold Reason' : testIsHold?.isApproved === '1' ? 'Not Approve Reason' : 'Approve Reason'}
              />
              <div className="flex justify-between items-center gap-2 mx-2">

                {/* <form autoComplete="off">
                  <div className="realative flex-1 w-full">
                    <CustomTextBox
                      type="text"
                      name="reasionForHoldOrUnHoldAndApprovedOrNotApproved"
                      value={reasionForHoldOrUnHoldAndApprovedOrNotApproved || ''}
                      onChange={(e) => setReasionForHoldOrUnHoldAndApprovedOrNotApproved(e.target.value)}
                      label="Reason"
                      isDisabled={false}
                      showLabel={true}
                    />
                  </div> */}

                <input
                  type="text"
                  id="reasionForHoldOrUnHoldAndApprovedOrNotApproved"
                  name="reasionForHoldOrUnHoldAndApprovedOrNotApproved"
                  value={reasionForHoldOrUnHoldAndApprovedOrNotApproved}
                  onChange={(e) => setReasionForHoldOrUnHoldAndApprovedOrNotApproved(e.target.value)}
                  autoComplete="off"
                  placeholder=" "
                  className={`inputPeerField peer mt-2 border-borderColor focus:outline-none`}
                />

                {/* </form> */}

                <div className="w-20 md:w-20 mt-2">
                  <CustomFormButton activeTheme={activeTheme} icon={FaSpinner} text={'Update'}
                    isButtonClick={isButtonClick}
                    loadingButtonNumber={3} // Unique number for the first button
                    onClick={() => onSubmitReasionForHoldOrUnHoldAndApprovedOrNotApproved()}
                  />
                </div>

              </div>


            </CustomSmallPopup>
          )
        }

        {/* add attachment */}
        {
          showPopup === 7 && (
            <CustomSmallPopup
              headerData={'Add Attachment'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >
              <GridDataDetails
                gridDataDetails={'Add Attachment'}
              />
              <div className="flex justify-between items-center gap-2 mx-2 mt-2">

                <CustomFileUpload
                  value={addAttachment}
                  label='Upload Document'
                  handelImageChange={handelImageChange}
                  activeTheme={activeTheme}
                  fileType={'all'}
                />


                <div className="w-20 md:w-20 ">
                  <CustomFormButton activeTheme={activeTheme} icon={FaSpinner} text={'Save'}
                    isButtonClick={isButtonClick}
                    loadingButtonNumber={4} // Unique number for the first button
                    onClick={() => uploadAttachmentFiles('pdf')}
                  />
                </div>

              </div>

              <div className="my-1">
                <GridDataDetails gridDataDetails={'Attachement Information'} />
                <CustomDynamicTable activeTheme={activeTheme} columns={['Path', 'Action']} height="80px">
                  <tbody>
                    {
                      imageLocationPath.map((data, index) => (
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
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                            {data}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                            <div className="flex gap-2 items-center text-base">
                              <div>
                                <FaEye className="text-blue-500"
                                  onClick={() => viewResultData(data)}
                                />
                              </div>
                              <div>
                                <MdDelete className="text-red-500" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </CustomDynamicTable>
              </div>

            </CustomSmallPopup>
          )
        }


        {/* add report */}
        {
          showPopup === 8 && (
            <CustomSmallPopup
              headerData={'Add Report'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >
              <GridDataDetails
                gridDataDetails={'Add Report'}
              />
              <div className="flex justify-between items-center gap-2 mx-2 mt-2">

                <CustomFileUpload
                  value={addAttachment}
                  label='Upload Report'
                  handelImageChange={handelImageChange}
                  activeTheme={activeTheme}
                  fileType={'img'}
                />


                <div className="w-20 md:w-20 ">
                  <CustomFormButton activeTheme={activeTheme} icon={FaSpinner} text={'Save'}
                    isButtonClick={isButtonClick}
                    loadingButtonNumber={4} // Unique number for the first button
                    onClick={() => uploadAttachmentFiles('img')}
                  />
                </div>

              </div>

              <div className="my-1">
                <GridDataDetails gridDataDetails={'Attachement Information'} />
                <CustomDynamicTable activeTheme={activeTheme} columns={['Path', 'Action']} height="100px">
                  <tbody>
                    {
                      imageLocationPath.map((data, index) => (
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
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                            {data}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                            <div className="flex gap-2 items-center text-base">
                              <div>
                                <FaEye className="text-blue-500"
                                  onClick={() => viewResultData(data)}
                                />
                              </div>
                              <div>
                                <MdDelete className="text-red-500" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>

                </CustomDynamicTable>
              </div>

            </CustomSmallPopup>
          )
        }
      </>
    </div >
  );
}
