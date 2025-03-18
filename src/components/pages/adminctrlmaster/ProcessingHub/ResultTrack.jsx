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
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";
import { usePostData } from "../../../../service/service";
import { ImCross } from "react-icons/im";
import { FaCommentDots, FaEye, FaSpinner } from "react-icons/fa";
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
import LegandaryButton from "../../../global/LegendButtonsForFilter";
import CustomHandsontable from "../../../../Custom Components/CustomHandsontable";
import { getLocal, setLocal } from "usehoks";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import { addObjectId } from "../../../../service/RedendentData";
import { toast } from "react-toastify";
import { convertUnApproveToApprove, convsertHoldToUnHoldOrUnHoldToHold, getAllDoctorsBasedOnCentreWise, getAllObserVationDataBasedOnTestName, getAllResultTrackinDataApi, getAllTemplateDataForResultTrackingApi, saveAttachementDataInResultTrackingApi, saveAttachementInResultTrackingApi, saveCommentDataApi, saveRejectApi, saveReportInResultTrackingApi, saveRerunDataApi, SaveTestObservationsDataApi, useRetrieveData, viewPrintreportTrackingApi, viewUploadResultTrackingApi } from "../../../../service/service";
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
import { data } from "react-router-dom";
import { useFormattedDateTime } from "../../../customehook/useDateTimeFormate";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CustomFormButtonWithLoading from "../../../global/CustomFormButtonWithLoading";
import { RiDeleteBin5Fill } from "react-icons/ri";

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

  const lsData = getLocal("imarsar_laboratory");
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  //!================Anil code=======================
  const user = useSelector((state) => state.userSliceName?.user || null);
  const [resultTrackData, setResultTrackData] = useState({
    doctorId: 0,
    template: 0
  });
  const [isHoveredPopupTable, setIsHoveredPopupTable] = useState(null);

  const [resonForReRunData, setReasonForReRundata] = useState(
    {
      "id": 0,
      "observationId": 0,
      "testID": 0,
      "workorderid": "string",
      "macReading": "string", //if value is exit then value : ''
      "macID": 0, //same : 0
      "labObservationName": "string",
      "investigationName": "string",
      "rerunReason": "string",
      "rerunbyid": [],
      "rerunDate": "2025-03-10T16:07:02.993Z"
    }
  );

  const [allReRunReasonData, setAllRerunReasonData] = useState([]);
  const [allSelectedReRunReasonData, setAllSelectedRerunReasonData] = useState([]);

  const [allResultTrackingData, setAllResultTrackingData] = useState([]);
  const [allResultTrackingForNextAndPrevious, setAllResultTrackingForNextAndPrevious] = useState([]);
  const [allObservationData, setAllObservationData] = useState([]);
  const [allDoctorData, setAllDoctorData] = useState([]);
  const [allTemplateData, setAllTemplateData] = useState([]);
  const [summedValuesForFormuladata, setSummedValuesForFormuladata] = useState([]);
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
  const [storeWorkOrderId, setStoreWorkOrderId] = useState(0);
  const [selectRejections, setSelectRejections] = useState(0);
  const [editorContent, setEditorContent] = useState({
    tempName: '',
    template: '',
    commentDataExit: false,
    id: 0
  });
  const postData = usePostData();
  const [singleRemarkData, setSingleRemarkData] = useState({
    investigationName: '',
    rejectionReason: 0,
    showInHouse: 0,
    transactionId: 0,
    workOrderId: '',
    itemId: 0,
    itemName: '',
    createdDateTime: useFormattedDateTime()
  })
  const [filteringData, setFilteringData] = useState('');
  const allRemarkTestData = useRetrieveData();
  const allSampleRejection = useRetrieveData();

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

  const handleFilterSelection = (selectedItem) => {
    setFilteringData(selectedItem);
  };

  //test remark
  const handelOnChangetestRemark = (e) => {
    setSingleRemarkData((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {

    const getAllData = async () => {
      try {
        await allSampleRejection.fetchDataFromApi(`/SampleremarkMaster?select=id,remark&$filter=(isactive eq 1)`);

        await allRemarkTestData.fetchDataFromApi(`/tnx_InvestigationRemarks/GetSampleremark?transacctionId=${singleRemarkData?.transactionId}&WorkOrderId=${singleRemarkData?.workOrderId}&itemId=${singleRemarkData?.itemId}`);

      } catch (error) {
        toast.error(error?.message)
      }
    }

    if (showPopup === 1) {
      getAllData();
    }

  }, [showPopup, isButtonClick])


  const handelOnSubmitTestRemarkData = async (e) => {
    e.preventDefault();
    setIsButtonClick(6);


    const updateData = {
      "isActive": 1,
      "createdById": parseInt(user?.employeeId),
      "createdDateTime": singleRemarkData?.createdDateTime,
      "updateById": 0,
      "updateDateTime": new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
      "id": 0,
      "invRemarks": allSampleRejection?.data?.find((data) => data?.id === singleRemarkData?.rejectionReason).remark,
      "transactionId": singleRemarkData?.transactionId,
      "workOrderId": singleRemarkData?.workOrderId,
      "itemId": singleRemarkData?.itemId,
      "itemName": singleRemarkData?.investigationName,
      "isInternal": singleRemarkData?.showInHouse,
    }

    try {

      const response = await postData.postRequestData(`/tnx_InvestigationRemarks/AddSampleremark`, [updateData])

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message)
      }

    } catch (error) {
      toast.error(error?.message)
      console.log(error);

    }

    setIsButtonClick(0);

  }
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
      status: filteringData
    };


    try {

      const response = await getAllResultTrackinDataApi(payload);

      if (response?.success) {

        setIsButtonClick(1);

        // Initialize an empty object to group by workOrderId and accumulate investigation names

        //!===================================================                                   
        // const result = {};                                                                    

        // // Loop through the data and group by workOrderId                                     
        // response?.data.forEach(item => {                                                      
        //   const { workOrderId, investigationName, testid, gender, centreId, reportType,  itemId } = item;                                                                         

        //   // If workOrderId exists in result, push the investigationName into the investigationName array
        //   if (result[workOrderId]) {
        //     result[workOrderId].investigationName.push({
        //       investigationName,  // Store investigationName
        //       testid,             // Store testId
        //       gender,             // Store gender
        //       fromAge: 0,            // Store fromAge
        //       toAge: 0,              // Store toAge
        //       centreId,
        //       reportType,
        //       itemId
        //     }          // Store centreId
        //     );
        //   } else {
        //     // Otherwise, create a new entry for that workOrderId with the current item data and initialize the investigationName array
        //     result[workOrderId] = {
        //       ...item,  // Keep the full data
        //       investigationName: [{ investigationName: investigationName, testid: testid, gender: gender, fromAge: 0, toAge: 0, centreId: centreId, reportType: reportType, itemId: itemId }]  // Add the investigationName array containing the current investigationName
        //     };
        //   }
        // });                                                                                   

        // // Convert the result object into an array if needed                                  
        // const groupedData = Object.values(result);                                            

        //!===================================================                                   



        const result = {};

        response?.data.forEach(item => {
          const { workOrderId, deptId, investigationName, testid, gender, centreId, reportType, itemId } = item;

          // Create a unique key combining workOrderId and deptId
          const key = `${workOrderId}_${deptId}`;

          // If the key exists, push the investigationName details into the investigationName array
          if (result[key]) {
            result[key].investigationName.push({
              investigationName,  // Store investigationName
              testid,             // Store testId
              gender,             // Store gender
              fromAge: 0,         // Store fromAge
              toAge: 0,           // Store toAge
              centreId,
              reportType,
              itemId
            });
          } else {
            // Otherwise, create a new entry for that key with the current item data
            result[key] = {
              ...item,  // Keep the full data
              investigationName: [{
                investigationName,
                testid,
                gender,
                fromAge: 0,
                toAge: 0,
                centreId,
                reportType,
                itemId
              }]
            };
          }
        });

        // Convert object to array if needed
        const groupedData = Object.values(result);


        //need to clear all observation data because of Main List button Click.
        setAllObservationData([]);

        setAllResultTrackingData(groupedData);
        setAllResultTrackingForNextAndPrevious(groupedData)
      } else {
        toast.error(response?.message);
      }

    } catch (error) {
      toast.error(error?.message);
    }

    setIsButtonClick(0);
  };


  //observation data
  const handelObservationData = async (totalAge, data, workOrderId, reportType, itemId, clickedRowTestId, deptId) => {

    setIsButtonClick(2);
    setAllObservationData([]);

    //store the test id for uploading attachement
    setTestIdForTracingAddAttachement(data?.testid)

    // Find the testid(s) for the provided workOrderId and dept id
    const matchedWorkOrders = allResultTrackingData.find(order =>
      order.workOrderId === workOrderId && order.deptId === deptId
    );


    //set workorder id
    setStoreWorkOrderId(workOrderId)


    const testid = matchedWorkOrders
      ? matchedWorkOrders?.investigationName?.map(item => item.testid).join(",")
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

    //console.log(allResultTrackingData);


    try {
      const response = await getAllObserVationDataBasedOnTestName(updatedData);


      if (response?.success) {


        //check
        setAllObservationData(response?.data.filter((item) => item?.reportType === 1));

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

        //approved or not approved
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

  useEffect(() => {
    if (allObservationData && Array.isArray(allObservationData)) {
      const formulaIndexMap = []; // Stores index positions where formula exists

      allObservationData.forEach((item, index) => {
        if (item.formula) {
          formulaIndexMap.push(index);
        }
      });


      const filteredObservationData = allObservationData
        .filter((item) => item.formula)
        .map((item) => ({
          formula: item.formula,
          labObservationId: item.labObservationId,
          index: allObservationData.indexOf(item), // Store the index
        }));

      setSummedValuesForFormuladata(filteredObservationData);

      const computedValues = {};

      filteredObservationData.forEach(({ formula, labObservationId, index }) => {
        const observationIds = formula.match(/\d+/g)?.map(Number) || [];

        let evaluatedFormula = formula;
        let containsHeader = false;
        let hasValue = false;

        observationIds.forEach((obsId) => {
          const obsData = allObservationData.find((item) => item.labObservationId === obsId);

          if (obsData?.value === "Header") {
            containsHeader = true;
          }

          if (obsData?.value !== undefined && obsData?.value !== null) {
            hasValue = true;
          }

          const value = obsData ? (obsData.value === "Header" ? "Header" : Number(obsData.value)) : 0;
          evaluatedFormula = evaluatedFormula.replace(obsId, value);
        });

        let computedValue;
        if (containsHeader) {
          computedValue = "Header";
        } else {
          try {
            computedValue = hasValue ? eval(evaluatedFormula) : 0;
          } catch (error) {
            console.error("Error evaluating formula:", evaluatedFormula);
            computedValue = 0;
          }
        }

        const testObj = allObservationData.find((item) => item.labObservationId === labObservationId);
        if (!testObj || !testObj.testId) return;

        const testId = testObj.testId;

        if (!computedValues[testId]) {
          computedValues[testId] = {};
        }

        // Use the actual index instead of sequential numbers (0, 1, etc.)
        computedValues[testId][index] = String(computedValue);
      });


      setObservationValue(computedValues);
    }
  }, [allObservationData]);




  // useEffect(() => {
  //   // Step 1: Filter `reportType === 1`
  //   const filteredData = allObservationData?.filter(item => item?.reportType === 1);

  //   let calculatedValues = {};

  //   // Step 2: Process formulas
  //   filteredData.forEach((formulaEntry) => {
  //     if (formulaEntry.formula) {
  //       const formula = formulaEntry.formula; // e.g. "357+708"
  //       const observationIds = formula.match(/\d+/g)?.map(Number) || []; // Extract numbers

  //       // Find values of matching observations
  //       const matchedObservations = filteredData.filter(item =>
  //         observationIds.includes(item.labObservationId)
  //       );

  //       // Sum their values
  //       const totalSum = matchedObservations.reduce((sum, obs) => {
  //         return sum + (parseFloat(obs.value) || 0);
  //       }, 0);

  //       // Store summed value
  //       calculatedValues[formulaEntry.testId] = { ...calculatedValues[formulaEntry.testId], sum: totalSum };
  //     }
  //   });

  //   setSummedValuesForFormuladata(calculatedValues); // Store calculated values
  // }, [allObservationData]);

  // const handleInputChangeForObserVtionValue = (testId, index, value) => {

  //   const allowedPattern = /^[a-z0-9. -]*$/i; // Allows a-z, 0-9, dot (.), space (' '), and single quote (')


  //   if (allowedPattern.test(value)) {
  //     setObservationValue(prev => ({
  //       ...prev,
  //       [testId]: {
  //         ...prev[testId],
  //         [index]: value
  //       }
  //     }));

  //     // Step 1: Filter `reportType === 1`
  //     const filteredData = allObservationData?.filter(item => item?.reportType === 1);

  //     console.log(filteredData);


  //     let calculatedValues = {};

  //     // Step 2: Process formulas
  //     filteredData.forEach((formulaEntry) => {
  //       if (formulaEntry.formula) {
  //         const formula = formulaEntry.formula; // e.g. "357+708"
  //         const observationIds = formula.match(/\d+/g)?.map(Number) || []; // Extract numbers

  //         // Find values of matching observations
  //         const matchedObservations = filteredData.filter(item =>
  //           observationIds.includes(item.labObservationId)
  //         );

  //         console.log(matchedObservations);


  //         // Sum their values
  //         const totalSum = matchedObservations.reduce((sum, obs) => {
  //           return sum + (parseFloat(obs.value) || 0);
  //         }, 0);

  //         // Store summed value
  //         calculatedValues[formulaEntry.testId] = { ...calculatedValues[formulaEntry.testId], sum: totalSum };
  //       }
  //     });

  //     setSummedValuesForFormuladata(calculatedValues); // Store calculated values

  //     console.log(summedValuesForFormuladata);


  //   } else {
  //     toast.error("Invalid character! Only a-z, 0-9, spaces and dots (.), are allowed.");
  //   }
  // };


  const handleInputChangeForObserVtionValue = (testId, index, value) => {
    const allowedPattern = /^[a-z0-9. -]*$/i; // Allow a-z, 0-9, dot (.), space (' '), and hyphen (-)

    if (!allowedPattern.test(value)) {
      toast.error("Invalid character! Only a-z, 0-9, spaces, dots (.), and hyphens (-) are allowed.");
      return;
    }

    setObservationValue((prev) => {
      let updatedValues = {
        ...prev,
        [testId]: {
          ...prev[testId],
          [index]: value, // ✅ Allow user to type freely
        },
      };


      // Delay restoring default value only if input is completely empty
      if (value.trim() === "") {
        setTimeout(() => {
          setObservationValue((prev) => {
            const observationItem = allObservationData.find((item) => item.testId === testId);

            if (observationItem) {
              return {
                ...prev,
                [testId]: {
                  ...prev[testId],
                  [index]: String(observationItem.labObservationId), // Restore only if still empty
                },
              };
            }
            return prev;
          });
        }, 500); // Wait before restoring to allow user typing
      }

      // Compute values based on formulas
      summedValuesForFormuladata.forEach(({ formula, labObservationId }) => {
        const observationIds = formula.match(/\d+/g)?.map(Number) || [];


        // Fetch corresponding values from updated state
        const values = observationIds.map((obsId) => {
          for (const testKey in updatedValues) {
            for (const idx in updatedValues[testKey]) {
              if (allObservationData.find((item) => item.labObservationId === obsId)) {
                return Number(updatedValues[testKey][idx]) || 0;
              }
            }
          }
          return 0;
        });


        let computedValue = 0;
        try {
          computedValue = eval(formula); // Compute formula result
        } catch (error) {
          console.error("Error evaluating formula:", formula);
        }

        // Identify testId for this formula-based observation
        const testObj = allObservationData.find((item) => item.labObservationId === labObservationId);
        if (!testObj || !testObj.testId) return;

        const formulaTestId = testObj.testId;

        // Ensure computed value is stored correctly
        updatedValues = {
          ...updatedValues,
          [formulaTestId]: {
            ...updatedValues[formulaTestId],
            [`formula_${labObservationId}`]: String(computedValue), // Store computed formula result
          },
        };
      });

      return updatedValues; // Update state
    });
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
          appcovaldoctorId: btnName === 'Approve' ? resultTrackData?.doctorId : 0,
          reportType: item?.reportType
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
              setAddAttachment('')
              showPopup(8);
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

      // Check the content type
      const contentType = response.headers["content-type"];


      if (contentType === "application/pdf") {
        // Handle PDF
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
        console.log("PDF opened successfully.");
      } else if (
        contentType === "image"
      ) {
        // Handle Image
        const imageBlob = new Blob([response.data], { type: contentType });
        const imageUrl = URL.createObjectURL(imageBlob);
        window.open(imageUrl, "_blank");
        console.log("Image opened successfully.");
      } else {
        console.error(
          `Unexpected content type: ${contentType}. Unable to open file.`
        );
      }



    } catch (error) {
      toast.error(error?.message)
      console.log(error);

    }
  }

  //show observation data based on nextprevious
  const showTheDataForNextAndPrevious = (testid, trackingPreOrNxtValue) => {

    const index = allResultTrackingForNextAndPrevious.findIndex(test => test.testid === testid);

    if (trackingPreOrNxtValue === 1) {
      if (index > 0) {
        setTestIdForTracingAddAttachement(allResultTrackingForNextAndPrevious[index - 1]?.testid)
      }

      if (index > 0) {
        const previousTest = allResultTrackingForNextAndPrevious[index - 1];
        setAllResultTrackingData([previousTest]);
        return previousTest;
      } else {
        toast.warning('No more previous data')
      }
    } else {

      if (index < allResultTrackingForNextAndPrevious.length - 1) {
        setTestIdForTracingAddAttachement(allResultTrackingForNextAndPrevious[index + 1]?.testid)
      }


      if (index < allResultTrackingForNextAndPrevious.length - 1) {
        const previousTest = allResultTrackingForNextAndPrevious[index + 1];
        setAllResultTrackingData([previousTest]);
        return previousTest;
      } else {
        toast.warning('No more next data')
      }
    }


  }

  //show print report
  const handelOnSubmitForPrintReport = async (workOrderId) => {

    // Find the testid(s) for the provided workOrderId
    const matchedWorkOrder = allResultTrackingForNextAndPrevious.find(order => order.workOrderId === workOrderId);


    const testid = matchedWorkOrder
      ? matchedWorkOrder.investigationName.map(item => item.testid).join(",")
      : "";

    try {

      const response = await viewPrintreportTrackingApi(testid, 1);

      // // Check the content type
      const contentType = response.headers["content-type"];


      if (contentType === "application/pdf") {
        // Handle PDF
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
        console.log("PDF opened successfully.");
      } else if (
        contentType === "image"
      ) {
        // Handle Image
        const imageBlob = new Blob([response.data], { type: contentType });
        const imageUrl = URL.createObjectURL(imageBlob);
        window.open(imageUrl, "_blank");
        console.log("Image opened successfully.");
      } else {
        console.error(
          `Unexpected content type: ${contentType}. Unable to open file.`
        );
      }



    } catch (error) {
      toast.error(error?.message)
      console.log(error);

    }

  }



  //!============morden way code===============                                                  
  const allFileAttachementData = useRetrieveData();
  const allReportFileData = useRetrieveData();
  const allRejectionData = useRetrieveData();
  const allCommentData = useRetrieveData();
  const allSampleRerunData = useRetrieveData();
  const allInfoDocument = useRetrieveData();


  useEffect(() => {

    if (showPopup === 7) {
      allFileAttachementData.fetchDataFromApi(`/tnx_InvestigationAttchment?$filter=(testid eq ${testIdForTracingAddAttachement} and isactive eq 1)`);
    }

    if (showPopup === 8) {
      allReportFileData.fetchDataFromApi(`/tnx_InvestigationAddReport?$filter=(testid eq ${testIdForTracingAddAttachement} and isactive eq 1)`);
    }


    if (showPopup === 4) {
      allRejectionData?.fetchDataFromApi(`/sampleRejectionReason?select=id,rejectionReason&$filter=(isactive eq 1)`);
    }

    if (showPopup === 5) {
      allSampleRerunData?.fetchDataFromApi(`/SampleRerunReason?select=id,reason&$filter=(isActive eq 1) `);
    }

  }, [showPopup])


  const getCommentDatabasedOnTestId = async (testId) => {
    try {

      //clear all data 
      setEditorContent({
        tempName: '',
        template: '',
        commentDataExit: false
      })

      // Make the GET request
      const response = await allCommentData.fetchDataFromApi(
        `/tnx_testcomment?select=id,comment&$filter=(testid eq ${testId})`
      );

      //! Proceed with your logic if data exists
      if (response?.data?.length > 0) {
        setEditorContent((prevData) => ({
          ...prevData,
          template: response?.data[0]?.Comment,
          commentDataExit: true,
          id: response?.data[0]?.id
        }));
      } else {

        // Await the fetchDataFromApi function for the second API call
        const itemCommentResponse = await allCommentData.fetchDataFromApi(
          `/itemCommentMaster?select=templateName,template&$filter=(type eq 'Item Wise' and isActive eq 1 and itemId eq 1 and centreId eq 1)`
        );

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleContentChange = (e) => {
    // if (e && e.target) {
    setEditorContent((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    })); // Update state with the new content
    // }
  };


  //edittor handel change
  const handleContentChangeForEditor = (content) => {
    setEditorContent((preventData) => ({
      ...preventData,
      template: content
    }))
  }


  useEffect(() => {

    const getCommentData = () => {
      setEditorContent((preventData) => ({
        ...preventData,
        template: allCommentData?.data[editorContent?.tempName - 1]?.template
      }))
    }

    if (allCommentData?.length !== 0 && editorContent?.tempName !== 0) {
      getCommentData()
    }

  }, [editorContent?.tempName])


  const onSubmitCommentData = async () => {

    setIsButtonClick(4);

    const updatedData = {
      "isActive": 1,
      "createdById": parseInt(user?.employeeId),
      "createdDateTime": new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
      "updateById": editorContent?.commentDataExit ? parseInt(user?.employeeId) : 0,
      "updateDateTime": editorContent?.commentDataExit ? new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`) : new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
      "id": editorContent?.id || 0,
      "testid": testIdForTracingAddAttachement,
      "comment": editorContent?.template
    }


    try {

      const response = await saveCommentDataApi(updatedData);

      if (response?.success) {
        toast.success(response?.message);
        setShowPopup(9);
      } else {
        toast.error(response?.message);
      }

    } catch (error) {
      toast.error(error?.message);
    }

    setIsButtonClick(0);
  }

  //handel submit handel data
  const onSubmitHandelData = async () => {
    setIsButtonClick(3);

    // Filter parentdata and perticularData based on the testId
    const parentdata = allResultTrackingForNextAndPrevious.filter((item) => item?.testid === testIdForTracingAddAttachement);

    const perticularData = allObservationData.filter((item) => item?.testId === testIdForTracingAddAttachement);

    //console.log(perticularData);

    // Merge parentdata with perticularData
    const updatedData = parentdata?.map((parentItem) => {
      // Find the matching item from perticularData
      const matchedItem = perticularData.find((perticularItem) => perticularItem?.testId === parentItem?.testid);

      return {
        centreId: user?.defaultCenter,
        centreName: "",
        deptId: parentItem?.deptId,
        departmentName: parentItem?.departmentName,
        patientId: parentItem?.patientId,
        workOrderId: parentItem?.workOrderId,
        patientName: parentItem?.patientName,
        age: parentItem?.age,
        itemId: parentItem?.itemId,
        investigationName: parentItem?.investigationName?.find((data) => data?.testid === testIdForTracingAddAttachement)?.investigationName,
        barcodeNo: parentItem?.barcodeNo,
        sampleTypeId: 0,
        sampleTypeName: "",
        isSampleCollected: "R",
        comment: parentItem?.comment,
        transactionId: parseInt(parentItem?.transactionId),
        createdDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
        rejectionReason: allRejectionData?.data?.find((item) => item?.id === selectRejections)?.rejectionReason,
        empId: parseInt(user?.employeeId),
        urgent: parentItem?.urgent,
        rowcolor: parentItem?.rowcolor,
        isRemoveItem: 0,
        sampletypedata: "",
        containercolor: "",
        isremark: 0,
        bookingdate: parentItem?.bookingDate,
        samplecollectiondate: parentItem?.sampleCollectionDate,
        sampleRecievedDate: parentItem?.sampleReceiveDate,
        resultdone: parentItem?.resultdone,

        // Add properties from perticularData
        ...matchedItem, // Merge perticularItem data with parentItem data
      };
    });

    try {
      const response = await saveRejectApi(updatedData);

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }

    } catch (error) {
      toast.error(error?.message)
    }

    setIsButtonClick(0);
  }



  // Assuming the following function is inside your component
  const handelOnChangeReRun = (e, index) => {
    const newValue = e.target.value; // Get the selected value from the dropdown (rerunbyid)

    setReasonForReRundata((prevData) => {
      // Make a shallow copy of the previous data to avoid mutating it directly
      const updatedData = [...prevData.rerunbyid];  // Copy the current rerunbyid array

      // Check if the index exists in the array, and if it does, update the rerunbyid value
      const existingIndex = updatedData.findIndex(item => item.index === index);

      if (existingIndex !== -1) {
        // If the index is found, update the corresponding rerunbyid value
        updatedData[existingIndex] = {
          index,
          rerunbyid: newValue,
        };
      } else {
        // If the index is not found, add a new object with the current index and rerunbyid value
        updatedData.push({
          index,
          rerunbyid: newValue,
        });
      }

      // Return the updated state
      return {
        ...prevData,
        rerunbyid: updatedData,
      };
    });

    // setAllSelectedRerunReasonData(prevData => {
    //   // Check if prevData contains the item with the given index
    //   const updatedData = prevData.map(item => {
    //     if (item.rowIndex === index) {
    //       // If the item is found, update rerunbyid
    //       return { ...item, rerunbyid: newValue };
    //     }
    //     return item; // Keep other items unchanged
    //   });

    //   console.log("Updated Data: ", updatedData); // Log to see the updated data
    //   return updatedData; // Return updated data to set the new state
    // });
  };

  const handelPushAllAllTestDatabasedOnTestId = (testId) => {
    setAllRerunReasonData(allObservationData.filter((item) => item?.testId === testId))
  }


  const handleCheckboxChange = (index, testData) => {
    setAllSelectedRerunReasonData(prevData => {
      // Check if the item exists by its rowIndex (unique per row)
      const exists = prevData.findIndex(item => item.rowIndex === index);

      if (exists !== -1) {
        // If exists, remove the item (uncheck behavior)
        return prevData.filter(item => item.rowIndex !== index);
      } else {
        // If not exists, add a new entry with the rowIndex
        return [
          ...prevData,
          {
            id: 0,
            observationId: 0,
            testID: testData.testID, // Even though testID is the same, we use it to group data
            workorderid: testData?.workOrderId,
            macReading: testData?.machineReading,
            macID: testData?.machineID,
            labObservationName: testData?.labObservationId || '',
            investigationName: testData?.investigationName || '',
            rerunReason: "string",
            rerunbyid: 0,
            rerunDate: new Date().toISOString(),
            rowIndex: index // Use index to store the unique reference
          }
        ];
      }
    });
  };



  const saveReasionRerunData = async () => {
    setIsButtonClick(5);
    try {

      const updateData = allSelectedReRunReasonData?.map((item, index) => {
        // Access rerunbyid from resonForReRunData and get the corresponding value from allReRunReasonData
        const rerunbyidValue = resonForReRunData?.rerunbyid?.find(data => data.index === index)?.rerunbyid || 0;

        // Find the actual rerun reason based on rerunbyidValue
        const rerunReason = allSampleRerunData?.data?.find(option => option.id === rerunbyidValue)?.reason || '';

        return {
          "id": item?.id,
          "observationId": item?.observationId,
          "testID": testIdForTracingAddAttachement,
          "workorderid": item?.workorderid,
          "macReading": item?.macReading || '',
          "macID": item?.macID || 0,
          "labObservationName": item?.labObservationName,
          "investigationName": item?.investigationName,
          "rerunReason": rerunReason,
          "rerunbyid": rerunbyidValue,
          "rerunDate": new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`)
        };
      });

      try {

        const response = await saveRerunDataApi(updateData);

        if (response?.success) {

          toast.success(response?.message)
        } else {
          toast.error(response?.message)
        }

      } catch (error) {
        toast.error(error?.message)
        console.log(error);

      }
      console.log(updateData);


    } catch (error) {
      toast.error(error?.message);
      console.log(error);

    }
    setIsButtonClick(0);
  }


  //info/ document
  const getAllInfoDocumentData = async (testId) => {
    console.log(testId);

    try {
      await allInfoDocument.fetchDataFromApi(`/tnx_Booking/GetTestInfo?TestId=${testId}`);

    } catch (error) {
      toast.error(error?.message);
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
      CallBack: () => {
        console.log('sample');

      },
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

            {/* <LegendButtons statuses={statuses} /> */}

            <LegandaryButton allFilterData={allFilterData} onFilterSelect={handleFilterSelection} />

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

                  {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    <div className="flex gap-1">
                      {data?.investigationName?.map((item, index) => (
                        <CustomeNormalButton
                          key={index}
                          activeTheme={activeTheme}
                          text={item?.investigationName}
                          onClick={() => handelObservationData(data?.totalAge, item, data?.workOrderId, item?.reportType, item?.itemId, data?.testid, data?.deptId)}
                        />
                      ))}
                    </div>

                  </td> */}
                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                    <div className="flex flex-wrap gap-1">
                      {data?.investigationName?.map((item, index) => (
                        <CustomeNormalButton
                          key={index}
                          activeTheme={activeTheme}
                          text={item?.investigationName}
                          onClick={() =>
                            handelObservationData(
                              data?.totalAge,
                              item,
                              data?.workOrderId,
                              item?.reportType,
                              item?.itemId,
                              data?.testid,
                              data?.deptId
                            )
                          }
                          className="w-auto" // Optional: Adjust button width if needed
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
                      onClick={() => {
                        setShowPopup(1), setSingleRemarkData((preventData) => ({
                          ...preventData,
                          transactionId: data?.transactionId, workOrderId: data?.workOrderId, itemId: data?.itemId, investigationName: data?.investigationName[index]?.investigationName,
                        }))
                      }}
                    >
                      <MdAddCircleOutline className="text-base" />
                    </div>
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                      style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                      onClick={() => { setShowPopup(2), getAllInfoDocumentData(data?.itemId) }}
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



        </div >


        {/* observation data */}
        <div>

          {
            isButtonClick === 2 && (
              <CustomLoadingPage />
            )
          }


          {
            //allObservationData?.length !== 0 && (

            <>
              {/* <GridDataDetails
                gridDataDetails={'Result Entry'}
              /> */}

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
                          <CustomeNormalButton activeTheme={activeTheme} text={'Print Report'}
                            onClick={() => handelOnSubmitForPrintReport(storeWorkOrderId)}
                          />
                        </div>
                      </div>

                      {/* <div className='flex gap-[0.25rem]'>
                        <div className="relative flex-1 ">
                          <CustomeNormalButton activeTheme={activeTheme} text={'Add Report'}
                            onClick={() => setShowPopup(8)}
                          />
                        </div>
                        <div className="relative flex-1">
                          <CustomeNormalButton activeTheme={activeTheme} text={'Add Attachment'} onClick={() => setShowPopup(7)} />
                        </div>
                      </div> */}

                      <div className='flex gap-[0.25rem]'>
                        <div className="relative flex-1 ">
                          <CustomeNormalButton activeTheme={activeTheme} text={'Main List'} onClick={handleSubmit} />
                        </div>
                        <div className="relative flex-1">
                          <CustomeNormalButton activeTheme={activeTheme} text={'Previous'}
                            onClick={() => showTheDataForNextAndPrevious(testIdForTracingAddAttachement, 1)}
                          />
                        </div>
                      </div>

                      <div className='flex gap-[0.25rem]'>
                        <div className="relative flex-1 ">
                          <CustomeNormalButton activeTheme={activeTheme} text={'Next'}
                            onClick={() => showTheDataForNextAndPrevious(testIdForTracingAddAttachement, 0)}
                          />
                        </div>
                        <div className="relative flex-1">

                        </div>
                      </div>
                    </div>

                  </>
                  :
                  allObservationData?.length !== 0 && (
                    <>
                      <GridDataDetails
                        gridDataDetails={'Result Entry'}
                      />
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
                                    <td colSpan="12" className="border-b px-4 h-6 text-xs font-extrabold text-gridTextColor w-full">
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
                                            onClick={() => { setShowPopup(4), setTestIdForTracingAddAttachement(data?.testId) }}
                                          />
                                        </div>
                                        <div className="w-20">
                                          <CustomeNormalButton activeTheme={activeTheme}
                                            text={'Re-Run'}
                                            disabled={String(data?.isapproved) !== '0'}
                                            onClick={() => {
                                              setShowPopup(5), setTestIdForTracingAddAttachement(data?.testId),
                                                handelPushAllAllTestDatabasedOnTestId(data?.testId)
                                            }} />
                                        </div>
                                        <div className="w-20">
                                          <CustomeNormalButton activeTheme={activeTheme}
                                            text={'Comment'}
                                            onClick={() => {
                                              setShowPopup(9),
                                                // setTestIdForTracingAddAttachement(data?.testId),

                                                getCommentDatabasedOnTestId(data?.testId)
                                            }}
                                            disabled={String(data?.isapproved) !== '0'}
                                          />
                                        </div>

                                        <div className='flex gap-[0.25rem]'>
                                          <div className="relative flex-1 ">
                                            <CustomeNormalButton activeTheme={activeTheme} text={'Add Report'}
                                              onClick={() => setShowPopup(8)}
                                              disabled={String(data?.isapproved) !== '0'}
                                            />
                                          </div>
                                          <div className="relative flex-1">
                                            <CustomeNormalButton activeTheme={activeTheme} text={'Add Attachment'} onClick={() => setShowPopup(7)} disabled={String(data?.isapproved) !== '0'} />
                                          </div>
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
                                  `}

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
                                        {/* <input
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
                                        /> */}

                                        <input
                                          type="text"
                                          name="charNumber"
                                          id="charNumber"
                                          value={
                                            data?.value === 'Header'
                                              ? data?.value
                                              : data?.formula
                                                ? (observationValue[data?.testId]?.[index] !== undefined
                                                  ? observationValue[data?.testId]?.[index]  // Use computed value if index exists
                                                  : data?.value) // Otherwise, keep original value
                                                : observationValue[data?.testId]?.[index] ?? data?.value
                                          }

                                          maxLength={15}
                                          // readOnly={data?.value}
                                          onChange={(e) => handleInputChangeForObserVtionValue(data?.testId, index, e.target.value)}
                                          className={`w-[5.5rem] h-[1.2rem] outline-none rounded-sm border-[1px] pl-1 ${data?.value ? 'bg-gray-200' : 'bg-white'}  } ${data?.value !== "" && data?.value !== "Header"
                                            ? Number(data?.value) < Number(data?.minVal)
                                              ? "bg-yellow-500"
                                              : Number(data?.value) > Number(data?.maxVal)
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                            : "" // No background color if value is "Header" or ""
                                            }`}
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

                      <>
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
                              <CustomeNormalButton activeTheme={activeTheme} text={'Print Report'}
                                onClick={() => handelOnSubmitForPrintReport(storeWorkOrderId)}
                              />
                            </div>
                          </div>

                          {/* <div className='flex gap-[0.25rem]'>
                            <div className="relative flex-1 ">
                              <CustomeNormalButton activeTheme={activeTheme} text={'Add Report'}
                                onClick={() => setShowPopup(8)}
                              />
                            </div>
                            <div className="relative flex-1">
                              <CustomeNormalButton activeTheme={activeTheme} text={'Add Attachment'} onClick={() => setShowPopup(7)} />
                            </div>
                          </div> */}

                          <div className='flex gap-[0.25rem]'>
                            <div className="relative flex-1 ">
                              <CustomeNormalButton activeTheme={activeTheme} text={'Main List'} onClick={handleSubmit} />
                            </div>
                            <div className="relative flex-1">
                              <CustomeNormalButton activeTheme={activeTheme} text={'Previous'}
                                onClick={() => showTheDataForNextAndPrevious(testIdForTracingAddAttachement, 1)}
                              />
                            </div>
                          </div>

                          <div className='flex gap-[0.25rem]'>
                            <div className="relative flex-1 ">
                              <CustomeNormalButton activeTheme={activeTheme} text={'Next'}
                                onClick={() => showTheDataForNextAndPrevious(testIdForTracingAddAttachement, 0)}
                              />
                            </div>
                            <div className="relative flex-1">

                            </div>
                          </div>
                        </div>
                      </>
                    </>
                  )
              }

            </>
            //)
          }


        </div >



        {
          showPopup === 1 && (
            <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
              <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                {/* Header */}
                <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                  style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                  <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                    {'Test Remark Data'}
                  </div>
                  <IoMdCloseCircleOutline
                    className="text-xl cursor-pointer"
                    style={{ color: activeTheme?.iconColor }}
                    onClick={() => setShowPopup(0)}
                  />
                </div>

                <FormHeader headerData={'Test Remark Data'} />

                {/* Form */}
                <form autoComplete="off" onSubmit={handelOnSubmitTestRemarkData} >
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-14 mx-1 lg:mx-2 items-center relative my-2">

                    <div className="relative w-full md:w-32">
                      <input
                        type="search"
                        id="investigationName"
                        name="investigationName"
                        value={singleRemarkData.investigationName || ''}
                        // onChange={(e) => {
                        //   handelOnChangeTestMappingData(e),
                        //     setSeleDropDown((preventData) => ({
                        //       ...preventData,
                        //       testName: e.target.value
                        //     }))
                        // }}
                        readOnly
                        placeholder=" "
                        className={`inputPeerField peer border-borderColor focus:outline-none`}
                      />
                      <label htmlFor="testName" className="menuPeerLevel">
                        Test Name
                      </label>

                    </div>

                    {/* Rejection Reason Dropdown */}
                    <div className="relative w-full md:w-32">
                      <CustomDropdown
                        name="rejectionReason"
                        label="Select Remark Reason"
                        value={singleRemarkData?.rejectionReason}
                        options={[
                          { label: 'Select Remark Reason', value: 0, disabled: true },
                          ...allSampleRejection?.data?.map(item => ({
                            label: item?.remark,
                            value: parseInt(item?.id),
                          })),
                        ]}
                        onChange={(e) => handelOnChangetestRemark(e)}
                        defaultIndex={0}
                        activeTheme={activeTheme}
                      />
                    </div>

                    <div className="relative w-full md:w-32">
                      <CustomDropdown
                        name="showInHouse"
                        label="Select Show In House"
                        value={singleRemarkData?.showInHouse}
                        options={[
                          { label: 'Yes', value: 1 },
                          { label: 'No', value: 0 },

                        ]}
                        onChange={(e) => handelOnChangetestRemark(e)}
                        defaultIndex={0}
                        activeTheme={activeTheme}
                      />
                    </div>

                    <div className="relative w-full">
                      <CustomFormButtonWithLoading
                        activeTheme={activeTheme}
                        text="Save"
                        icon={FaSpinner}
                        isButtonClick={isButtonClick}
                        loadingButtonNumber={6} // Unique number for the first button
                      />
                    </div>
                  </div>
                </form>

                {/* Scrollable Content */}

                <GridDataDetails gridDataDetails={'Test Remark Details'} />

                {allRemarkTestData?.loading ?
                  <CustomLoadingPage />
                  :
                  <CustomDynamicTable activeTheme={activeTheme} columns={['Sr. No', 'Test Name', 'Remark', 'Remark Date', 'Added By', 'In-House', 'Action']} height="30vh">
                    <tbody >
                      {
                        allRemarkTestData?.data?.data?.map((data, index) => (
                          <tr
                            className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                              ? ''
                              : index % 2 === 0
                                ? 'bg-gray-100'
                                : 'bg-white'
                              }`}
                            key={index}
                            onMouseEnter={() => setIsHoveredPopupTable(index)}
                            onMouseLeave={() => setIsHoveredPopupTable(null)}
                            style={{
                              background:
                                isHoveredPopupTable === index ? activeTheme?.subMenuColor : undefined,
                              // Hides scrollbar for IE/Edge
                            }}
                          >
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {index + 1}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.itemName}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.invRemarks}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.remardkDate}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.remarkAdBy}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.isInternal === 1 ? 'Yes' : 'No'}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {
                                data?.isapproved !== 1 && (
                                  <RiDeleteBin5Fill className="text-red-500 w-4 h-4" />
                                )
                              }
                            </td>
                          </tr>
                        ))

                      }
                    </tbody>
                  </CustomDynamicTable>
                }
              </div>

            </div>
          )
        }

        {
          showPopup === 2 && (
            <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
              <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                {/* Header */}
                <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                  style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                  <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                    {'Test Remark Data'}
                  </div>
                  <IoMdCloseCircleOutline
                    className="text-xl cursor-pointer"
                    style={{ color: activeTheme?.iconColor }}
                    onClick={() => setShowPopup(0)}
                  />
                </div>

                {/* Scrollable Content */}
                <GridDataDetails gridDataDetails={'Test Remark Details'} />

                {allInfoDocument?.loading ?
                  <CustomLoadingPage />
                  :
                  <CustomDynamicTable columns={resultTrackForPatientInformation} activeTheme={activeTheme} height="15vh">
                    <tbody>
                      {
                        allInfoDocument?.data?.data?.map((data, index) => (
                          <tr
                            className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                              ? ''
                              : index % 2 === 0
                                ? 'bg-gray-100'
                                : 'bg-white'
                              }`}
                            key={index}
                            onMouseEnter={() => setIsHoveredPopupTable(index)}
                            onMouseLeave={() => setIsHoveredPopupTable(null)}
                            style={{
                              background:
                                isHoveredPopupTable === index ? activeTheme?.subMenuColor : undefined,
                              // Hides scrollbar for IE/Edge
                            }}
                          >
                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {index + 1}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.investigationName}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.barcodeNo}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.sampleReceiveDate}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.sampleCollectedby}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.sampleReceivedBY}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.sampleReceiveDate}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.registrationDate}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.registerBy}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.resultDate}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.resutDoneBy}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.outhouseDoneOn}
                            </td>


                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.outhouseLab}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.outhouseDoneBy}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.outSourceDate}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.outSouceLab}
                            </td>

                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                              {data?.outSource}
                            </td>
                          </tr>
                        ))

                      }
                    </tbody>
                  </CustomDynamicTable >
                }
              </div>

            </div>
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
            // <CustomPopup
            //   headerData={'Reject'}
            //   activeTheme={activeTheme}
            //   setShowPopup={setShowPopup} // Pass the function, not the value
            // >
            // </CustomPopup>
            <div className="relative">
              <CustomSmallPopup activeTheme={activeTheme} headerData={'Reject'} setShowPopup={setShowPopup}>
                <FormHeader title={'Rejection Reason'} />
                <div className="flex justify-between items-center gap-2 mx-2">


                  {
                    allRejectionData?.loading ?
                      <CustomLoadingPage />
                      :
                      <>
                        <div className="absolute w-72 mt-1">
                          <CustomDropdown
                            name="billingType"
                            label="Select Billing Type"
                            value={selectRejections || ''}
                            options={[
                              { label: 'Select Option', value: 0, disabled: true },
                              ...allRejectionData?.data?.map(item => ({
                                label: item.rejectionReason,
                                value: item.id,
                              })),
                            ]}
                            onChange={(e) => setSelectRejections(e.target.value)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                            showLabel={false}
                          />
                        </div>



                        <div className="w-20 md:w-20 mt-1 ml-[18.5rem]">
                          <CustomFormButton activeTheme={activeTheme} icon={FaSpinner} text={'Save'}
                            isButtonClick={isButtonClick}
                            loadingButtonNumber={3} // Unique number for the first button
                            onClick={() => onSubmitHandelData()}
                          />
                        </div>
                      </>

                  }

                </div>


              </CustomSmallPopup>
            </div>

          )
        }

        {
          showPopup === 5 && (
            <CustomPopup
              headerData={'Re-Run'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >
              {/* <GridDataDetails
                gridDataDetails={'Patient Details'}
              /> */}

              {/* <CustomDynamicTable columns={resultTrackingForReRun} activeTheme={activeTheme} height=
                {"300px"}>
                <tbody>

                </tbody>
              </CustomDynamicTable > */}

              {
                allReRunReasonData?.length !== 0 && (
                  <>
                    <GridDataDetails
                      gridDataDetails={'Re-run Details'}
                    />

                    <CustomDynamicTable columns={[' ', 'Test Name', 'Rerun Reason']} activeTheme={activeTheme} height={"200px"} >
                      <tbody className="mb-1">
                        {allObservationData?.map((data, index) => {

                          return (

                            data?.reportType === 1 && index !== 0 && (

                              <tr
                                className={`cursor-pointer whitespace-nowrap 
                                  ${isHoveredTable === index ? '' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}  
                                  `}

                                key={index}
                                onMouseEnter={() => setIsHoveredTable(index)}
                                onMouseLeave={() => setIsHoveredTable(null)}
                                style={{
                                  background:
                                    isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                                  // Hides scrollbar for IE/Edge
                                }}
                              >

                                <td className="border-b px-4 h-5 text-xxxs font-semibold text-gridTextColor">
                                  <input
                                    type="checkbox"
                                    checked={allSelectedReRunReasonData.some(item => item.rowIndex === index)}
                                    onChange={() => handleCheckboxChange(index, data)}
                                  />
                                </td>
                                <td className="border-b px-4 h-5 text-xxxs font-semibold text-gridTextColor" style={{ width: '0px' }}>
                                  <div className="flex items-center gap-1">
                                    <div>
                                      {data?.observationName}
                                    </div>

                                  </div>
                                </td>

                                {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
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
                                </td> */}


                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                  <div className="relative w-40">
                                    <CustomDropdown
                                      key={index}
                                      name={`rerunbyid_${index}`}  // Unique name for each dropdown
                                      label="Select Doctor"
                                      value={resonForReRunData.rerunbyid.find(item => item.index === index)?.rerunbyid || 0}  // Access rerunbyid by index
                                      options={[
                                        { label: 'Select Rerun Reason', value: 0, disabled: true },
                                        ...allSampleRerunData?.data?.map((option) => ({
                                          label: option.reason,
                                          value: parseInt(option.id),
                                        })),
                                      ]}
                                      onChange={(e) => handelOnChangeReRun(e, index)}  // Pass index to handler
                                      defaultIndex={0}
                                      activeTheme={activeTheme}
                                      showLabel={false}
                                    />

                                  </div>
                                </td>
                              </tr >

                            )

                          )
                        }
                        )}
                      </tbody>
                    </CustomDynamicTable >

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

                      <div className="flex gap-[0.25rem]">
                        <div className="relative flex-1">
                          <CustomFormButton activeTheme={activeTheme} icon={FaSpinner} text={'Save'}
                            isButtonClick={isButtonClick}
                            loadingButtonNumber={5} // Unique number for the first button
                            onClick={() => saveReasionRerunData()}
                          />
                        </div>
                        <div className="relative flex-1">

                        </div>
                      </div>

                    </div>
                  </>
                )
              }


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
                  fileType={'pdf'}
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
                {
                  allFileAttachementData?.loading ?
                    <CustomLoadingPage />
                    :
                    <CustomDynamicTable activeTheme={activeTheme} columns={['Path', 'Action']} height="80px">
                      <tbody>
                        {
                          allFileAttachementData?.data?.map((item, index) => (
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
                                {item?.attachment}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                <div className="flex gap-2 items-center text-base">
                                  <div>
                                    <FaEye className="text-blue-500"
                                      onClick={() => viewResultData(item?.attachment)}
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
                }

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

                {
                  allReportFileData?.loading ?
                    <CustomLoadingPage />
                    :
                    <CustomDynamicTable activeTheme={activeTheme} columns={['Path', 'Action']} height="80px">
                      <tbody>
                        {
                          allReportFileData?.data?.map((item, index) => (
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
                                {item?.attachment}
                              </td>

                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                                <div className="flex gap-2 items-center text-base">
                                  <div>
                                    <FaEye className="text-blue-500"
                                      onClick={() => viewResultData(item?.attachment)}
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
                }

              </div>

            </CustomSmallPopup>
          )
        }


        {
          showPopup === 9 && (
            <CustomPopup
              headerData={'Comment'}
              activeTheme={activeTheme}
              setShowPopup={setShowPopup} // Pass the function, not the value
            >

              <FormHeader title={'Comment'} />


              {
                allCommentData?.loading ?
                  <CustomLoadingPage />
                  :
                  <>
                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

                      {
                        editorContent?.commentDataExit === false && (
                          <div className="absolute w-48 ">
                            <CustomDropdown
                              name="tempName"
                              label="Select Template Name"
                              value={editorContent?.tempName || ''}
                              options={[
                                { label: 'Select Option', value: 0, disabled: true },
                                ...allCommentData?.data?.map((item, index) => ({
                                  label: item.templateName,
                                  value: index + 1,
                                })),
                              ]}
                              onChange={(e) => handleContentChange(e)}
                              defaultIndex={0}
                              activeTheme={activeTheme}
                              showLabel={false}
                            />
                          </div>
                        )
                      }



                      <div className={`flex gap-[0.25rem] w-32 h-[1.6rem] ${editorContent?.commentDataExit === false ? 'ml-60' : 'ml-0'}`}>
                        <div className="relative flex-1">
                          <CustomFormButton activeTheme={activeTheme} icon={FaSpinner} text={'Save'}
                            isButtonClick={isButtonClick}
                            loadingButtonNumber={4} // Unique number for the first button
                            onClick={() => onSubmitCommentData()}
                          />
                        </div>

                        <div className="relative flex-1">
                        </div>
                      </div>


                    </div>

                    <div className="my-2">
                      <CustomeEditor
                        value={editorContent?.template} // Controlled value for the editor
                        onContentChange={handleContentChangeForEditor} />
                    </div>
                  </>
              }




            </CustomPopup>

          )
        }

      </>
    </div >
  );
}
