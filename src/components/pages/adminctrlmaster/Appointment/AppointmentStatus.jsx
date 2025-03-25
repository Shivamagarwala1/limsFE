import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal, getSession, setSession } from "usehoks";
import { AssignPopup } from "../../../../Custom Components/PopupModal";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import toast from "react-hot-toast";
import { addRandomObjectId } from "../../../../service/RedendentData";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import {
  CancelPopupModal,
  ReschedulePopupModal,
} from "../../../../Custom Components/NewPopups";
import { usePostData, useRetrieveData } from "../../../../service/service";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import CustomPopupWithResponsive from "../../../global/CustomPopupWithResponsive";
import FormHeader from "../../../global/FormHeader";
import { CustomNumberInput } from "../../../global/CustomNumberInput";
import CustomDropdown from "../../../global/CustomDropdown";
import { CustomTextBox } from "../../../global/CustomTextBox";
import { DatePicker } from "../../../global/DatePicker";
import { CustomEmailInput } from "../../../global/CustomEmailInput";
import CustomSearchInputFields from "../../../global/CustomSearchDropdown";
import { IoMdAdd } from "react-icons/io";
import CustomFileUpload from "../../../global/CustomFileUpload";
import CustomFormButtonWithLoading from "../../../global/CustomFormButtonWithLoading";
import { FaSpinner } from "react-icons/fa";
import GridDataDetails from "../../../global/GridDataDetails";
import { patientRegistrationInvestigation } from "../../../listData/listData";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function AppointmentStatus() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.userSliceName?.user || null);
  const { formRef, getValues, setValues } = useFormHandler();

  // const PostData = usePostData();
  const { fetchData, response, data, loading, error } = useGetData();

  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState("");
  const [CenterDropDown, setCenterDropDown] = useState(false);
  const [CenterHoveIndex, setCenterHoveIndex] = useState(null);
  const [CenterSelectedOption, setCenterSelectedOption] = useState("");

  const [isButtonClick, setIsButtonClick] = useState(0);

  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [AssignedPopup, setAssignedPopup] = useState(false);

  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showTestData, setShowTestData] = useState(0);
  const [Params, setParams] = useState(null);
  const AllCenterData = useGetData();
  const [groupedRows, setGroupedRows] = useState([]);
  const [Row, setRow] = useState([]);
  const getData = useGetData();
  useEffect(() => {
    getData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1)"
    );
  }, []);
  useEffect(() => {
    getReason();
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);
  useEffect(() => {
    getGrid();
  }, [showPopup1, showPopup2]);
  useEffect(() => {
    const mergeByWorkOrderId = (Row) => {
      const grouped = (Row || []).reduce((acc, curr) => {
        const existing = acc.find(
          (item) => item.workOrderId === curr.workOrderId
        );

        if (existing) {
          existing.investigationName.push(curr.investigationName);
        } else {
          acc.push({
            ...curr,
            investigationName: [curr.investigationName], // Store as an array
          });
        }

        return acc;
      }, []);

      return grouped;
    };

    // Update state with the grouped data
    setGroupedRows(mergeByWorkOrderId(Row));
  }, [Row]); // Runs when `rows` change

  const getGrid = async () => {
    const values = await getSession("appointmentBooking");
    if (!values?.CenterId) {
      return;
    }
    setCenterValue(values?.CenterValue);
    setCenterId(values?.CenterId);
    setValues([{ from: values?.from }]);
    setValues([{ Todate: values?.to }]);
    const get = await fetchData(
      `/appointmentBooking/GetAppointmentData?FromDate=${values?.from}&Todate=${values?.to}&CentreID=${values?.CenterId}`
    );
    setRow(addRandomObjectId(get?.data?.data));
  };

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    {
      field: `bookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `sceduleDate`,
      headerName: `Sechduled Date`,
      flex: 1,
    },
    {
      field: `workOrderId`,
      headerName: `Visit Id`,
      flex: 1,
    },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `age`,
      headerName: `Age`,
      flex: 1,
    },
    {
      field: `status`,
      headerName: `Status`,
      flex: 1,
    },
    {
      field: `assinedphelebo`,
      headerName: `Assined Phelebo`,
      flex: 1,
    },
    ,
    {
      field: `investigationName`,
      headerName: `Investigation`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="relative group flex gap-5">
            {params?.row?.investigationName[0]}...
            {/* Tooltip */}
            <span
              style={{ height: "fit-content", top: "1.5rem" }}
              className="w-[500px] bg-gray-300 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 
              hidden gap-1 p-3 group-hover:flex flex-wrap justify-start 
              text-xs px-2 py-1 rounded-md shadow-lg 
              z-[9999] whitespace-normal pointer-events-none"
            >
              {params?.row?.investigationName.map((item, index) => (
                <SubmitButton
                  key={index}
                  text={item}
                  submit={false}
                  callBack={() => {
                    // setAssignedPopup(true);
                  }}
                  style={{
                    height: "1.05rem",
                    padding: "0px 5px",
                  }}
                />
              ))}
            </span>
          </div>
        );
      },
    },
    {
      field: `address`,
      headerName: `Address`,
      flex: 1,
    },
    {
      field: "",
      width: 200,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <LegendButtons
              callBack={() => {
                setParams(params);
              }}
              style={{ flexDirection: "row", flexWrap: "nowrap", gap: "5px" }}
              btnStyle={{ height: "1.05rem", marginTop: "2px" }}
              statuses={[
                {
                  Data: 23,
                  name: "Assign Phelebomist",
                  disabled:
                    params?.row?.isSampleCollected == "Y" ? true : false,
                  CallBack: () => {
                    setAssignedPopup(true);
                  },
                },
                {
                  Data: 21,
                  name: "Reschedule",
                  disabled:
                    params?.row?.isSampleCollected == "Y" ? true : false,
                  CallBack: () => {
                    setShowPopup1(true);
                  },
                },
                {
                  Data: 22,
                  name: "Cancel",
                  disabled:
                    params?.row?.isSampleCollected == "Y" ? true : false,
                  CallBack: () => {
                    setShowPopup2(true);
                  },
                },
                {
                  Data: 27,
                  name: "Add Test",
                  // disabled:
                  //   params?.row?.isSampleCollected == "Y" ? true : false,
                  CallBack: () => {
                    // alert('hii')
                    handleAddTest(params?.row);
                    // setShowTestData(2);
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setCenterValue(e.target.value);
    setCenterDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setCenterValue(name);
    setCenterId(id);
    setCenterSelectedOption(name);
    setCenterDropDown(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    if (!CenterId) {
      toast.error("Center is Required");
      return;
    }
    if (!values?.from) {
      toast.error("From Date is Required");
      return;
    }

    const get = await fetchData(
      `/appointmentBooking/GetAppointmentData?FromDate=${values?.from}&Todate=${values?.Todate}&CentreID=${CenterId}&status=0`
    );
    setSession("appointmentBooking", {
      CenterId: CenterId,
      CenterValue: CenterValue,
      from: values?.from,
      to: values?.Todate,
      status: values?.status,
    });
    setRow(addRandomObjectId(get?.data?.data));
  };

  //searching legends button
  const handleSubmitForLegent = async (status) => {
    //event.preventDefault();
    const values = getValues();
    if (!CenterId) {
      toast.error("Center is Required");
      return;
    }
    if (!values?.from) {
      toast.error("From Date is Required");
      return;
    }

    const get = await fetchData(
      `/appointmentBooking/GetAppointmentData?FromDate=${values?.from}&Todate=${values?.Todate}&CentreID=${CenterId}&status=${status}`
    );
    setSession("appointmentBooking", {
      CenterId: CenterId,
      CenterValue: CenterValue,
      from: values?.from,
      to: values?.Todate,
      status: values?.status,
    });
    setRow(addRandomObjectId(get?.data?.data));
  };

  const getReason = async () => {
    // const get = await fetchData(tabs[activeTab]?.getApi);
    // console.log(get);
  };

  const handleTheUpdateStatusMenu = async () => {
    const lsData = getLocal("imarsar_laboratory");
    const payload = {
      ...clickedRowId,
      updateById: lsData?.user?.employeeId,
      isActive: clickedRowId?.isActive === 1 ? 0 : 1,
    };
    // const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
    if (data1?.success) {
      toast.success("Status Updated Successfully");
      getReason();
      setShowPopup(false);
    }
  };

  //   const InputFileds = [{ label: "", type: "" }];
  const statuses = [
    {
      Data: 21,
      CallBack: () => {
        // Pending
        handleSubmitForLegent(0);
      },
    },
    {
      Data: 20,
      CallBack: () => {
        // Collected
        handleSubmitForLegent(2);
      },
    },
    {
      Data: 22,
      CallBack: () => {
        // cancle
        handleSubmitForLegent(3);
      },
    },
    {
      Data: 23,
      CallBack: () => {
        // Collected
        handleSubmitForLegent(1);
      },
    },
  ];

  // !=================anil code add test data=============

  const [testData, setTestData] = useState({});
  const [rateId, setRateId] = useState(0);
  const postDataForPhlebotomyCollection = usePostData();
  const allTitleData = useRetrieveData();
  const allReferData = useRetrieveData();
  const allTestData = useRetrieveData();
  const allEditTestDataForInvasticationName = useRetrieveData();
  const selectedInvatigationData = useRetrieveData();
  const [isHoveredTablePopup, setIsHoveredTablePopup] = useState(null);

  const handleAddTest = async (data) => {

    setIsButtonClick(3);
    if (!data?.investigationName || data.investigationName.length === 0) {
      console.error("No investigation names available");
      return;
    }

    setRateId(data?.rateId);

    try {
      await allTitleData.fetchDataFromApi(
        "/titleMaster?select=id,title&$filter=(isActive eq 1)"
      );

      await allReferData.fetchDataFromApi(
        "/doctorReferalMaster?select=doctorId,doctorName&$filter=(isActive eq 1 and type eq 1)"
      );

      const response = await allTestData.fetchDataFromApi(
        `/tnx_BookingItem/GetPatientEditTest?searchValue=${data?.workOrderId}`
      );
     

      const matchedDoctor1 = allReferData?.data?.find(
        (data) => data?.doctorId === response?.data?.data?.refID1
      );


      const matchedDoctor2 = allReferData?.data?.find(
        (data) => data?.doctorId === response?.data?.data?.refID2
      );

      setTestData((prevData) => ({
        ...prevData,
        ...response?.data?.data,
        refID1: matchedDoctor1
          ? {
            doctorId: matchedDoctor1?.doctorId,
            doctorName: matchedDoctor1?.doctorName,
          }
          : null,
        refID2: matchedDoctor2
          ? {
            doctorId: matchedDoctor2?.doctorId,
            doctorName: matchedDoctor2?.doctorName,
          }
          : null,
      }));

      await allEditTestDataForInvasticationName.fetchDataFromApi(
        `/tnx_BookingItem/GetitemDetailRate?ratetype=${response?.data?.data?.rateId}`
      );
    } catch (error) {
      toast.error(error?.message);
    }

    setShowTestData(2);
    setIsButtonClick(0);
  };

  const handelOnChangeEditTest = (e) => {
    setTestData((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value,
    }));
  };

  //func to check or uncheck a specific investigation
  //check box
  const handleCheckboxChangeEditTestCheckBo = (index, isChecked) => {
    setTestData((prevData) => {
      // Ensure prevData.testData exists and is an array
      const updatedTestData = Array.isArray(prevData?.itemdetail)
        ? prevData.itemdetail.map((item, idx) =>
          idx === index ? { ...item, isUrgent: isChecked ? 1 : 0 } : item
        )
        : [];

      return {
        ...prevData, // Keep other properties intact
        itemdetail: updatedTestData,
      };
      // });
    });
  };

  const handelOnChangePatientRegistrationSelect = async (selectedItem) => {
    const response = await selectedInvatigationData.fetchDataFromApi(
      `/tnx_BookingItem/GetitemDetail?ratetype=${rateId}&itemId=${selectedItem.target.value.itemId}`
    );

    setTestData((prevState) => {
      const existingTestData = prevState?.itemdetail || [];

      const newTestData = Array.isArray(response?.data?.data)
        ? response.data?.data.map(
          ({
            itemName,
            mrp,
            netAmt,
            deliveryDate,
            isUrgent,
            itemId,
            discount,
            id,
            itemType,
            grosss,
            sampleTypeName,
            sortName,
            testcode,
            defaultsampletype,
            departmentname,
            deptId,
            gender,
            sampleTypeId,
            approvedDate,
            departmentReceiveDate,
            invoiceDate,
            notApprovedDate,
            outhouseDoneOn,
            resultDate,
            sampleCollectionDate,
            sampleReceiveDate,
            sampleRecollectedDate,
            holdDate,
            unHoldDate,
            sampleRejectionOn,
            showonReportdate,
          }) => ({
            investigationName: itemName,
            mrp,
            netAmount: netAmt,
            rate: grosss,
            isUrgent: isUrgent || 0,
            deliveryDate,
            discount,
            id: id || 0,
            defaultsampletype,
            departmentName: departmentname,
            sampleTypeName,
            gender,
            sampleTypeId,
            sortName,
            createdById: parseInt(user?.employeeId) || 0,
            createdDateTime: new Date().toISOString(),
            isActive: 1,
            updateById: 0,
            updateDateTime: new Date(
              "1888-03-01T10:22:20.044Z"
            ).toISOString(),
            workOrderId: testData?.workOrderId || 0,
            transactionId: testData?.transactionId || 0,
            testcode,
            itemId: itemId || 0,
            packageID: 0,
            deptId,
            barcodeNo: "",
            isPackage: 0,
            packageName: "",
            itemType,
            packMrp: 0,
            packItemRate: 0,
            packItemDiscount: 0,
            packItemNet: 0,
            reportType: 0,
            centreId: testData?.centreId || 0,
            sessionCentreid: 0,
            isSra: 0,
            isMachineOrder: 0,
            isEmailsent: 0,
            sampleCollectionDate:
              sampleCollectionDate || new Date().toISOString(),
            sampleReceiveDate: sampleReceiveDate || new Date().toISOString(),
            resultDate: resultDate || new Date().toISOString(),
            approvedDate: approvedDate || new Date().toISOString(),
            notApprovedDate: notApprovedDate || new Date().toISOString(),
            deliveryDate: deliveryDate || new Date().toISOString(),
            departmentReceiveDate:
              departmentReceiveDate || new Date().toISOString(),
            sampleRejectionOn: sampleRejectionOn || new Date().toISOString(),
            outhouseDoneOn: outhouseDoneOn || new Date().toISOString(),
            sampleRecollectedDate:
              sampleRecollectedDate || new Date().toISOString(),
            invoiceDate: invoiceDate || new Date().toISOString(),
            showonReportdate: showonReportdate || new Date().toISOString(),
            holdDate: holdDate || new Date().toISOString(),
            unHoldDate: unHoldDate || new Date().toISOString(),
          })
        )
        : [];

      let duplicateFound = false; // Flag to track if any duplicates exist

      const uniqueNewData = newTestData.filter((newItem) => {
        const isDuplicate = existingTestData.some(
          (existingItem) => existingItem.itemId === newItem.itemId
        );
        if (isDuplicate) {
          duplicateFound = true; // Set flag if at least one duplicate is found
        }
        return !isDuplicate;
      });

      // Show toast only once if any duplicates exist
      if (duplicateFound) {
        toast.error("Some tests already exist and were not added!");
      }

      return {
        ...prevState,
        itemdetail: [...existingTestData, ...uniqueNewData], // Append only unique new data
      };
    });
  };

  // Function to delete a specific investigation by index
  const deleteinvestigationGridDataByForEditTestDataUsingItemId = (
    indexToDelete
  ) => {
    const updatedData = [...testData?.itemdetail]; // Create a copy of the array to avoid mutating the original

    // Check if the item exists at the specified index
    if (updatedData[indexToDelete]) {
      updatedData[indexToDelete] = {
        ...updatedData[indexToDelete],
        isRemoveItem: updatedData[indexToDelete]?.isRemoveItem === 1 ? 0 : 1, // Set isRemoveItem to 1
      };
    }

    setTestData((prevData) => ({
      ...prevData,
      itemdetail: updatedData,
    }));
  };

  //update test data
  const onSubmitForSaveEditTestData = async (e) => {
    e.preventDefault();

    setIsButtonClick(2);

    // Generate the transformed list based on testData
    const transformedList = testData?.itemdetail.map((data) => ({
      isActive: 1,
      createdById: data?.createdById,
      createdDateTime: data?.createdDateTime,
      updateById: parseInt(user?.employeeId),
      updateDateTime: new Date()
        .toLocaleString("en-US", { hour12: true })
        .replace(",", "")
        .replace(
          /(\d+)\/(\d+)\/(\d+)/,
          (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
        ),
      id: data?.id || 0,
      workOrderId: data?.workOrderId,
      transactionId: data?.transactionId,
      testcode: data?.testcode, //need to check
      itemId: parseInt(data?.itemId),
      packageID: data?.itemType === 3 ? parseInt(data?.itemType) : 0,
      deptId: data?.deptId,

      // barcodeNo: gridDataBarCodeandSampleType.barCode.find(barcode => barcode.itemId === data.itemId)?.name || '',

      // barcodeNo: checkedItems.find(barcode => barcode.itemId === data.itemId)?.name ||
      //   checkedItems.find(barcode => barcode.sampleTypeName === data.sampleTypeName)?.name || '',
      barcodeNo: "",

      departmentName: data?.departmentName || "",
      // investigationName: investigationGridData?.find(barcode => barcode.itemId === data.itemId)?.itemName || '',
      investigationName: data?.investigationName,
      isPackage: data?.itemType === 3 ? 1 : 0,
      // packageName: data?.itemType === 3 ? selectedInvastigationList?.find(barcode => barcode.itemId === data.itemId)?.
      //itemName : '',
      packageName: "",
      itemType: data?.itemType,

      mrp: data?.mrp,
      rate: data?.rate,
      discount: data?.discount,
      netAmount: data?.netAmount,

      packMrp: data?.itemType === 3 ? data?.mrp : 0,
      packItemRate: data?.rate === 3 ? data?.rate : 0,
      packItemDiscount: data?.itemType === 3 ? data?.discount : 0,
      packItemNet: data?.itemType === 3 ? data?.netAmt : 0,
      reportType: 0,

      centreId: parseInt(testData?.centreId), //
      sessionCentreid: parseInt(user?.defaultCenter),
      isSra: 0,
      isMachineOrder: 0,
      isEmailsent: 0,
      sampleTypeId: 0,
      // sampleTypeName: gridDataBarCodeandSampleType?.sampleType?.length !== 0 ? gridDataBarCodeandSampleType?.sampleType?.find(barcode => barcode.itemType === data.itemType)?.name : '',
      sampleTypeName: data?.sampleTypeName,

      sampleCollectionDate:
        data?.sampleCollectionDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      sampleCollectedby: "",
      sampleCollectedID: 0,
      sampleReceiveDate:
        data?.sampleReceiveDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      sampleReceivedBY: "",
      resultDate:
        data?.resultDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      resultDoneByID: 0,
      resutDoneBy: "0",
      isResultDone: 0,
      isApproved: 0,
      approvedDate:
        data?.approvedDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      approvedByID: 0,
      approvedbyName: "0",
      notApprovedBy: "0",
      notApprovedDate:
        data?.notApprovedDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      isReporting: 0,
      isCritical: 0,
      deliveryDate:
        data?.deliveryDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      isInvoiceCreated: 0,
      invoiceNumber: 0,
      isUrgent: data?.isUrgent,
      isSampleCollected: data?.id !== 0 ? data?.isSampleCollected : "N",
      samplecollectionremarks: "",
      departmentReceiveRemarks: "",
      departmentReceiveDate:
        data?.departmentReceiveDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      departmentReceiveBy: "",
      departmentReceiveByID: 0,
      isRemoveItem: data?.isRemoveItem,
      sampleRejectionBy: 0,
      sampleRejectionByName: "",
      sampleRejectionOn:
        data?.sampleRejectionOn ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      interpretationId: 0,
      approvalDoctor: 0,
      isOuthouse: 0,
      outhouseLab: 0,
      labName: "",
      outhouseDoneBy: 0,
      outhouseDoneOn:
        data?.outhouseDoneOn ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      sampleRecollectedby: 0,
      sampleRecollectedDate:
        data?.sampleCollectionDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      isrerun: 0,
      invoiceNo: "0",
      invoiceDate:
        data?.invoiceDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      invoiceCycle: "",
      invoiceAmount: 0,
      invoiceCreatedBy: 0,
      invoiceNoOld: "",
      remarks: "",
      showonReportdate:
        data?.showonReportdate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      hold: 0,
      holdById: 0,
      holdDate:
        data?.holdDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      unholdById: 0,
      unHoldDate:
        data?.unHoldDate ||
        new Date()
          .toLocaleString("en-US", { hour12: true })
          .replace(",", "")
          .replace(
            /(\d+)\/(\d+)\/(\d+)/,
            (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
          ),
      doctorSignId: 0,
      holdReason: "",
    }));

    try {
      const response = await postDataForPhlebotomyCollection.postRequestData(
        `/tnx_BookingItem/UpdatePatientTest`,
        transformedList
      );

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.error);
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
    setIsButtonClick(0);
  };

  //!======================end anil code================

  return (
    <div>
      <AssignPopup
        setShowPopup={setAssignedPopup}
        Params={Params}
        showPopup={AssignedPopup}
      />
      <ReschedulePopupModal
        showPopup={showPopup1}
        setShowPopup={setShowPopup1}
        Params={Params}
      />
      <CancelPopupModal
        showPopup={showPopup2}
        setShowPopup={setShowPopup2}
        Params={Params}
      />
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Appointment Status</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <SearchBarDropdown
            id="search-bar"
            name="Center"
            value={CenterValue}
            onChange={handleSearchChange2}
            label="Center"
            placeholder="Serch Center"
            options={getData?.data}
            isRequired={false}
            showSearchBarDropDown={CenterDropDown}
            setShowSearchBarDropDown={setCenterDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setCenterHoveIndex}
            isHovered={CenterHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <InputGenerator
            inputFields={[
              { label: "From Date", type: "customDateField", name: "from" },
              { label: "To Date", type: "customDateField", name: "Todate" },
            ]}
          />
          {/* <SubmitButton text={"Search"} /> */}
          <TwoSubmitButton options={[{ label: "Search", submit: true }]} />
        </div>

        <LegendButtons statuses={statuses} />
      </form>
      <div className="w-full">
        <UpdatedDynamicTable
          rows={groupedRows}
          name="Phlebotomy Collection Details"
          loading={loading}
          columns={columns}
          viewKey="Random"
        />
      </div>

      {showTestData === 2 && (
        <>
          <CustomPopupWithResponsive
            activeTheme={activeTheme}
            heading={"Test Data Details"}
            setShowPopup={setShowTestData}
            popuptype="mediumUpper"
          >
            <FormHeader headerData={"Test Data"} />

            {testData?.investigationData?.length !== 0 && (
              <form autoComplete="off" onSubmit={onSubmitForSaveEditTestData}>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">

                      <div className="flex gap-[0.25rem]">
                        <div className='relative flex-1'>
                          <CustomNumberInput
                            type="phoneNumber"
                            name="mobileNo"
                            value={testData[0]?.mobileNo || ''}
                            onChange={(e) => {
                              handelOnChangeEditTest(e)
                            }}
                            maxLength={10}
                            label="Mobile No."
                            readOnly={true}
                          />
                        </div>

                        <div className='relative flex-1'>
                          <CustomNumberInput
                            type="pincode"
                            name="pincode"
                            value={testData[0]?.pincode || ''}
                            onChange={(e) => {
                              handelOnChangeEditTest(e)
                            }}
                            maxLength={10}
                            label="Pin Code"
                            readOnly={true}
                          />
                        </div>
                      </div>

                      <div className='relative flex-1'>
                        <CustomTextBox
                          type="propercase"
                          name="name"
                          value={testData[0]?.name || ''}
                          onChange={(e) => handelOnChangeEditTest(e)}
                          label="Name"
                          readOnly={true}
                        />
                      </div>

                      <div className='flex gap-[0.25rem]'>


                        <div className='relative flex-1'>
                          <CustomTextBox
                            type="years"
                            name="age"
                            value={testData[0]?.age.split(" ")[0] || ''}
                            onChange={(e) => handelOnChangeEditTest(e)}
                            label="Years"
                            isDisabled={false}
                            maxLength={3}
                            allowSpecialChars={false}
                            readOnly={true}


                          />
                        </div>

                        <div className='relative flex-1'>
                          <CustomTextBox
                            type="years"
                            name="age"
                            value={testData[0]?.age.split(" ")[2] || ''}
                            onChange={(e) => handelOnChangeEditTest(e)}
                            label="Month"
                            isDisabled={false}
                            maxLength={3}
                            allowSpecialChars={false}
                            readOnly={true}
                          />
                        </div>


                        <div className='relative flex-1'>
                          <CustomTextBox
                            type="years"
                            name="age"
                            value={testData[0]?.age.split(" ")[2] || ''}
                            onChange={(e) => handelOnChangeEditTest(e)}
                            label="Day"
                            isDisabled={false}
                            maxLength={3}
                            allowSpecialChars={false}
                            readOnly={true}
                          />
                        </div>

                      </div>

                      <div className="relative flex-1">
                        <CustomTextBox
                          // type="text", name, id, value, placeholder, onChange, label
                          type='allCharacters'
                          name='address'
                          allowSpecialChars={true}
                          value={testData[0]?.address}
                          placeholder=' '
                          onChange={(e) => handelOnChangeEditTest(e)}
                          label='Address'
                          readOnly={true}
                        />
                      </div>

                      <div className='relative flex-1'>
                        <DatePicker
                          id="dob"
                          name="bookingDate"
                          value={testData[0]?.bookingDate || ''}
                          onChange={(e) => handelOnChangeEditTest(e)}
                          placeholder=" "
                          label="Booking Data"
                          activeTheme={activeTheme}
                          //isDisabled={false}
                          currentDate={new Date()} // Current date: today
                          maxDate={new Date(2025, 11, 31)} // Maximum date: December 31, 2025
                          readOnly={true}
                          showTime={false}
                          showBigerCalandar={true}

                        />

                      </div>


                      <div className='relative flex-1'>
                        <DatePicker
                          id="dob"
                          name="scheduleDate"
                          value={testData[0]?.scheduleDate || ''}
                          onChange={(e) => handelOnChangeEditTest(e)}
                          placeholder=" "
                          label="Schedule Date"
                          activeTheme={activeTheme}
                          //isDisabled={false}
                          currentDate={new Date()} // Current date: today
                          maxDate={new Date(2025, 11, 31)} // Maximum date: December 31, 2025
                          readOnly={true}
                          showTime={false}
                          showBigerCalandar={true}

                        />

                      </div>

                    </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">
                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1">
                      <CustomNumberInput
                        type="phoneNumber"
                        name="mobileNo"
                        value={testData?.mobileNo || ""}
                        onChange={(e) => {
                          handelOnChangeEditTest(e);
                        }}
                        maxLength={10}
                        label="Mobile No."
                        readOnly={true}
                      // isMandatory={patientRegistrationForEditTestDataError?.mobileNo}
                      />
                    </div>

                    <div className="relative flex-1 ">
                      <CustomDropdown
                        name="title_id"
                        label="Select Title"
                        value={testData?.title_id}
                        options={[
                          { label: "Select Option", value: 0, disabled: true },
                          ...allTitleData?.data?.map((item) => ({
                            label: item.title,
                            value: item.id,
                          })),
                        ]}
                        onChange={(e) => handelOnChangeEditTest(e)}
                        defaultIndex={0}
                        activeTheme={activeTheme}
                        readOnly={true}
                      //isMandatory={patientRegistrationForEditTestDataError?.title_id}
                      />
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <CustomTextBox
                      type="propercase"
                      name="name"
                      value={testData?.name || ""}
                      onChange={(e) => handelOnChangeEditTest(e)}
                      label="Name"
                      readOnly={true}
                    //isMandatory={patientRegistrationForEditTestDataError?.name}
                    />
                  </div>

                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1">
                      <CustomTextBox
                        type="years"
                        name="ageYear"
                        value={testData?.ageYear || ""}
                        onChange={(e) => handelOnChangeEditTest(e)}
                        label="Years"
                        isDisabled={false}
                        maxLength={3}
                        allowSpecialChars={false}
                        readOnly={true}
                      //isMandatory={patientRegistrationForEditTestDataError?.ageYear}
                      />
                    </div>

                    <div className="relative flex-1">
                      <CustomTextBox
                        type="months"
                        name="ageMonth"
                        value={testData?.ageMonth || ""}
                        onChange={(e) => handelOnChangeEditTest(e)}
                        label="Months"
                        isDisabled={false}
                        maxLength={2}
                        allowSpecialChars={false}
                        readOnly={true}
                      //isMandatory={patientRegistrationForEditTestDataError?.ageMonth}
                      />
                    </div>

                    <div className="relative flex-1">
                      <CustomTextBox
                        type="days"
                        name="ageDay"
                        value={testData?.ageDay || ""}
                        onChange={(e) => handelOnChangeEditTest(e)}
                        label="Days"
                        isDisabled={false}
                        maxLength={2}
                        readOnly={true}
                      //isMandatory={patientRegistrationForEditTestDataError?.ageDay}
                      />
                    </div>
                  </div>

                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1">
                      <DatePicker
                        id="dob"
                        name="dob"
                        value={testData?.dob || ""}
                        onChange={(e) => handelOnChangeEditTest(e)}
                        placeholder=" "
                        label="DOB"
                        activeTheme={activeTheme}
                        //isDisabled={false}
                        //isMandatory={!Boolean(patientRegistrationData?.dob)}
                        currentDate={new Date()} // Current date: today
                        maxDate={new Date(2025, 11, 31)} // Maximum date: December 31, 2025
                        readOnly={true}
                        showTime={false}
                        showBigerCalandar={true}
                      />
                      {/* </div> */}
                    </div>

                    <div className="relative flex-1 ">
                      <CustomDropdown
                        name="gender"
                        label="Select Gender"
                        value={testData?.gender || ""}
                        options={[
                          { label: "Select Option", value: "", disabled: true },
                          { label: "Male", value: "M" },
                          { label: "Female", value: "F" },
                          { label: "Transgender", value: "T" },
                        ]}
                        onChange={(e) => handelOnChangeEditTest(e)}
                        defaultIndex={0}
                        activeTheme={activeTheme}
                        readOnly={true}
                      //isMandatory={patientRegistrationForEditTestDataError?.gender}
                      />
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <CustomEmailInput
                      name="emailId"
                      value={testData?.emailId}
                      onChange={(e) => handelOnChangeEditTest(e)}
                      label="Email"
                      readOnly={true}
                    // isMandatory={patientRegistrationForEditTestDataError?.emailId}
                    />
                  </div>

                  <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
                    <div className="relative flex-1">
                      <CustomSearchInputFields
                        id="refID1"
                        name="refID1"
                        label="Refer Dr."
                        value={testData?.refID1}
                        options={allReferData?.data}
                        onChange={handelOnChangeEditTest}
                        filterText="No records found"
                        placeholder=" "
                        searchWithName="doctorName"
                        readOnly={true}
                        uniqueKey="doctorId"
                        activeTheme={activeTheme}
                      //isMandatory={patientRegistrationForEditTestDataError?.refID1}
                      />
                    </div>

                    <div>
                      <div
                        className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                        onClick={() => {
                          setShowPopup(1);
                          // setIdentifyAddReferDrOrReferLab(1)
                        }}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        <IoMdAdd className="w-4 h-4 font-semibold" />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <CustomSearchInputFields
                      id="refID2"
                      name="refID2"
                      label="Refer Dr2"
                      value={testData?.refID2}
                      options={allReferData?.data}
                      onChange={handelOnChangeEditTest}
                      filterText="No records found"
                      placeholder=" "
                      searchWithName="doctorName"
                      uniqueKey="doctorId"
                      readOnly={true}
                      activeTheme={activeTheme}
                    //isMandatory={patientRegistrationForEditTestDataError?.refID2}
                    />
                  </div>

                  {/* <div className='relative flex-1'>
                                            <DatePicker
                                                id="collectionDateAndTime"
                                                name="collectionDateAndTime"
                                                value={patientRegistrationData?.collectionDateAndTime || ''}
                                                onChange={(e) => handelOnChangeEditTest(e)}
                                                placeholder=" "
                                                label="Collection Date & Time"
                                                activeTheme={activeTheme}
                                                //isDisabled={false}
                                                isMandatory={!Boolean(patientRegistrationData?.dob)}
                                                currentDate={new Date()} // Current date: today

                                                showTime={true}
                                                showBigerCalandar={false}
                                            />


                                        </div> */}

                  <div className="relative flex-1">
                    <CustomTextBox
                      // type="text", name, id, value, placeholder, onChange, label
                      type="allCharacters"
                      name="address"
                      allowSpecialChars={true}
                      value={testData?.address}
                      placeholder=" "
                      onChange={(e) => handelOnChangeEditTest(e)}
                      label="Address"
                      readOnly={true}
                    //isMandatory={patientRegistrationForEditTestDataError?.address}
                    />
                  </div>

                  <div className="relative flex-1">
                    <CustomNumberInput
                      type="pinCode"
                      name="pinCode"
                      value={testData?.pinCode || ""}
                      onChange={(e) => {
                        handelOnChangeEditTest(e);
                      }}
                      maxLength={6}
                      label="Pin Code"
                      readOnly={true}
                    // isMandatory={patientRegistrationForEditTestDataError?.pinCode}
                    />
                  </div>

                  {/* Refer Lab/Hospital */}
                  <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
                    <div className="relative flex-1">
                      <CustomSearchInputFields
                        id="otherLabReferID"
                        name="otherLabReferID"
                        label="Refer Lab/Hospital"
                        value={testData?.otherLabReferID || null} // Pass the selected object instead of just ID
                        options={[
                          { otherLabRefer: "test", otherLabReferID: 1 },
                        ]}
                        onChange={(e) => handelOnChangeEditTest(e)}
                        filterText="No records found"
                        placeholder=" "
                        searchWithName="otherLabRefer"
                        uniqueKey="otherLabReferID"
                        readOnly={true}
                        activeTheme={activeTheme}
                      //isMandatory={patientRegistrationForEditTestDataError?.otherLabReferID}
                      />
                    </div>

                    <div>
                      <div
                        className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                        onClick={() => {
                          setShowPopup(1), setIdentifyAddReferDrOrReferLab(0);
                        }}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        <IoMdAdd className="w-4 h-4 font-semibold" />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <CustomFileUpload
                      value={testData?.uploadDocument}
                      // handelImageChange={handelImageChangeForEditTest}
                      activeTheme={activeTheme}
                      readOnly={true}
                    />
                  </div>

                  {/* <div className="relative flex-1">

                                            <CustomSearchInputFields
                                                id="itemId"
                                                name="itemId"
                                                label="Test Search By Name Or Code"
                                                value={testData?.itemId}
                                                options={allInvastigationData}
                                                onChange={handelOnChangePatientRegistration}
                                                filterText="No records found"
                                                placeholder=" "
                                                searchWithName='itemName'
                                                uniqueKey='itemId'
                                                activeTheme={activeTheme}
                                            />

                                        </div> */}

                  <div className="relative flex-1">
                    <CustomSearchInputFields
                      id="itemId"
                      name="itemId"
                      label="Test Search By Name Or Code"
                      value={testData?.itemId}
                      options={allEditTestDataForInvasticationName?.data?.data}
                      onChange={handelOnChangePatientRegistrationSelect}
                      filterText="No records found"
                      placeholder=" "
                      readOnly={false}
                      searchWithName="itemName"
                      uniqueKey="itemId"
                      activeTheme={activeTheme}
                    />
                  </div>

                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1">
                      {/* <CustomFormButton
                            activeTheme={activeTheme}
                            text="Update"
                            icon={FaSpinner}
                            isButtonClick={isButtonClick}

                            loadingButtonNumber={4} // Unique number for the first button
                            // onClick={() => onSubmitForSaveEditTestData()} // Pass button number to handler
                          /> */}
                      <CustomFormButtonWithLoading
                        activeTheme={activeTheme}
                        text="Update"
                        icon={FaSpinner}
                        isButtonClick={isButtonClick}
                        loadingButtonNumber={2} // Unique number for the first button
                      />
                    </div>

                    <div className="relative flex-1"></div>
                  </div>

                  {/* </div> */}

                  {/* <CustomeNormalButton
                                            activeTheme={activeTheme}
                                            text="Open Popup"

                                            onClick={buttonClick}
                                        /> */}
                </div>

                {/* grid data */}
                <GridDataDetails gridDataDetails={"Test Data Details"} />

                <CustomDynamicTable
                  height={"20vh"}
                  activeTheme={activeTheme}
                  columns={patientRegistrationInvestigation}
                >
                  <tbody>
                    {testData?.itemdetail?.map((data, rowIndex) => {
                      return (
                        <tr
                          key={`${rowIndex}`}
                          className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                          onMouseEnter={() => setIsHoveredTablePopup(rowIndex)}
                          onMouseLeave={() => setIsHoveredTablePopup(null)}
                          style={{
                            background:
                              isHoveredTablePopup === rowIndex
                                ? activeTheme?.subMenuColor
                                : undefined,
                          }}
                        >
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            {data?.investigationName}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            <FontAwesomeIcon icon="fas fa-info-circle" />
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            {data?.mrp}
                          </td>
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            {data?.rate}
                          </td>
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor w-24">
                            {/* <input
                                    type="text"
                                    className="border-[1.5px] rounded outline-none px-1 w-full bg-gray-100 cursor-not-allowed"

                                    value={editTestData?.testData?.find((item) => item?.itemId === data?.itemId)?.discount ?? 0}

                                    readOnly

                                    onChange={(e) =>
                                      handleInputChangeEditTestDsicount(data?.itemId, e.target.value, "1")
                                    }
                                  /> */}
                            {data?.discount}
                          </td>
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            {/* {(
                                    (data?.netAmount || 0) -
                                    parseFloat(
                                      gridDataBarCodeandSampleType?.discount.find(
                                        (item) => item.itemId === data?.itemId
                                      )?.discount || 0
                                    )
                                  ).toFixed(2)} */}
                            {data?.netAmount}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            {data?.deliveryDate}
                          </td>
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor text-center pt-1">
                            <input
                              type="checkbox"
                              id={`checkbox-${rowIndex}`}
                              checked={data?.isUrgent === 1} // Checkbox checked if isUrgent is 1
                              onChange={(e) =>
                                handleCheckboxChangeEditTestCheckBo(
                                  rowIndex,
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            {(data?.isSampleCollected === "N" ||
                              data?.isSampleCollected === "R") && (
                                <RiDeleteBin2Fill
                                  onClick={() =>
                                    deleteinvestigationGridDataByForEditTestDataUsingItemId(
                                      rowIndex
                                    )
                                  }
                                  className={`cursor-pointer ${data?.isRemoveItem === 1
                                    ? "text-gray-300"
                                    : "text-red-500"
                                    }  text-base`}
                                />
                              )}
                          </td>

                          {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                  <MdDelete className="w-4 h-4 text-red-500" onClick={() => handleDelete(rowIndex)} />
                                </td> */}
                        </tr>
                      );
                    })}
                    {/* Footer Row */}
                    <tr
                      style={{
                        background: activeTheme?.menuColor,
                        color: activeTheme?.iconColor,
                      }}
                    >
                      <td className="px-4 h-5 text-xxs font-semibold">
                        Test Count: {testData?.itemdetail?.length}
                      </td>
                      <td className="px-4 h-5 text-xxs font-semibold">
                        Total Amt.
                      </td>
                      <td className="px-4 h-5 text-xxs font-semibold">
                        {(testData?.itemdetail || []).reduce(
                          (sum, data) => sum + (data?.mrp || 0),
                          0
                        )}
                      </td>

                      <td className="px-4 h-5 text-xxs font-semibold">
                        {testData?.itemdetail.reduce(
                          (sum, data) => sum + (data?.rate || 0),
                          0
                        )}
                      </td>
                      <td className="px-4 h-5 text-xxs font-semibold">
                        {testData?.itemdetail?.reduce(
                          (sum, item) => sum + (item?.discount || 0),
                          0
                        )}
                      </td>
                      <td className="px-4 h-5 text-xxs font-semibold">
                        {testData?.itemdetail.reduce(
                          (sum, data) => sum + (data?.netAmount || 0),
                          0
                        )}
                      </td>
                      <td className="px-4 h-5 text-xxs font-semibold"></td>
                      <td className="px-4 h-5 text-xxs font-semibold"></td>
                      <td className="px-4 h-5 text-xxs font-semibold"></td>
                      {/* <td className="px-4 h-5 text-xxs font-semibold"></td>
                                                                    <td className="px-4 h-5 text-xxs font-semibold"></td> */}
                    </tr>
                  </tbody>
                </CustomDynamicTable>
              </form>
            )}
          </CustomPopupWithResponsive>
        </>
      )}
    </div>
  );
}
