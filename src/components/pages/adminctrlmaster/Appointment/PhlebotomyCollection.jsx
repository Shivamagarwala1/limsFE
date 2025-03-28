import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { FaSpinner } from "react-icons/fa";

import { addRandomObjectId } from "../../../../service/RedendentData";

import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { useRetrieveData, usePostData } from "../../../../service/service";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import CustomLoadingPage from "../../../global/CustomLoadingPage";
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomPopupWithResponsive from "../../../global/CustomPopupWithResponsive";
import CustomDropdown from "../../../global/CustomDropdown";
import CustomFormButtonWithLoading from "../../../global/CustomFormButtonWithLoading";
import FormHeader from "../../../global/FormHeader";
import { CustomNumberInput } from "../../../global/CustomNumberInput";
import { DatePicker } from "../../../global/DatePicker";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CustomEmailInput } from "../../../global/CustomEmailInput";
import CustomSearchInputFields from "../../../global/CustomSearchDropdown";
import CustomFileUpload from "../../../global/CustomFileUpload";
import { patientRegistrationInvestigation } from "../../../listData/listData";
import { RiDeleteBin2Fill } from "react-icons/ri";
import AppointmentBooking from "./AppointmentBooking";

export default function PhlebotomyCollection() {
  const user = useSelector((state) => state.userSliceName?.user || null);
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const { fetchData, data } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);

  const [showPopup, setShowPopup] = useState(0);
  // const [AddTest, setAddTest] = useState(false);
  // const [ShowPopup, setShowPopup] = useState(0);
  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState("");
  const [CenterDropDown, setCenterDropDown] = useState(false);
  const [CenterHoveIndex, setCenterHoveIndex] = useState(null);
  const [CenterSelectedOption, setCenterSelectedOption] = useState("");
  const getData = useGetData();

  // !=====anil code==================
  const [investigationGridData, setinvestigationGridData] = useState();
  const allPhlebotomyCollection = useRetrieveData();
  const allTestData = useRetrieveData();
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [isHoveredTablePopup, setIsHoveredTablePopup] = useState(null);
  const [checkedItems, setCheckedItems] = useState();
  // const [testData, setTestData] = useState({
  //   name: '',
  //   mobileNo: '',
  //   address: '',
  //   age: '',
  //   scheduleDate: '',
  //   bookingDate: '',
  //   investigationData: [],
  // });

  const [testData, setTestData] = useState({});
  const [rateId, setRateId] = useState(0);
  const postDataForPhlebotomyCollection = usePostData();
  const allTitleData = useRetrieveData();
  const allReferData = useRetrieveData();
  const allEditTestDataForInvasticationName = useRetrieveData();
  const selectedInvatigationData = useRetrieveData();

  // const [rows, setRows] = useState([
  //   { id: 1, Investigation: "Amylase Urine", checked: true },
  //   { id: 2, Investigation: "Peripheral - GBP", checked: true },
  //   // { id: 3, Investigation: "TSH", checked: true },
  //   { id: 4, Investigation: "Xray", checked: true },
  //   { id: 5, Investigation: "CBC (Complete Blood Count)", checked: true },
  // ]);
  const [Row, setRow] = useState([]);

  useEffect(() => {
    getData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1)"
    );
  }, []);

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
    if (!values?.To) {
      toast.error("To Date is Required");
      return;
    }
    // const get = await fetchData(
    //   `/appointmentBooking/GetAppointmentData?FromDate=${values?.from}&Todate=${values?.To}&CentreID=${CenterId}&status=0`
    // );
    // setRow(addRandomObjectId(get?.data?.data));

    //! anil code
    await allPhlebotomyCollection.fetchDataFromApi(
      `/appointmentBooking/GetAppointmentData?FromDate=${values?.from}&Todate=${values?.To}&CentreID=${CenterId}&status=5`
    );
  };

  //!=============anil code===============

  const handleSampleTypeChange = (
    selectedValue,
    sampleTypeData,
    investigationName
  ) => {
    // ✅ Update investigationGridData with the new selected sample type
    setinvestigationGridData((prevData) =>
      prevData.map((item) =>
        item.investigationName === investigationName
          ? { ...item, selectedSampleTypeId: selectedValue } // Update selected sample type
          : item
      )
    );

    // ✅ Update checkedItems with the new sample type
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.map((item) =>
        item.investigationName === investigationName
          ? {
            ...item,
            sampleTypeName: selectedValue?.target?.value, // Update sampleTypeName in checkedItems
          }
          : item
      )
    );
  };

  const handleInputChangeForPopUpGridData = (
    investigationName,
    value,
    sampleTypeId
  ) => {
    let updatedCheckedItems;

    // ✅ Update barcode and isChecked for matching sampleTypeId
    updatedCheckedItems = checkedItems.map((item) =>
      item.sampleTypeName === Number(sampleTypeId)
        ? {
          ...item,
          barcode: value, // ✅ Same barcode for all matching sampleTypeId
          isChecked: value !== "", // ✅ Auto-check if barcode is filled
        }
        : item
    );

    // ✅ Check if investigationName already exists
    const itemExists = updatedCheckedItems.some(
      (item) => item.investigationName === investigationName
    );

    if (!itemExists) {
      // ✅ If investigationName doesn't exist, push a new item
      updatedCheckedItems = [
        ...updatedCheckedItems,
        {
          investigationName: investigationName,
          barcode: value, // ✅ Store the value properly
          isChecked: value !== "", // ✅ Auto-check if barcode is filled
          sampleTypeName: Number(sampleTypeId),
        },
      ];
    }

    // ✅ Update the state with modified data
    setCheckedItems(updatedCheckedItems);

    // ✅ Debug to check the updated values
  };

  const handleCheckboxChange = (investigationName) => {
    const updatedCheckedItems = checkedItems.map((item) =>
      item.investigationName === investigationName
        ? { ...item, isChecked: !item.isChecked }
        : item
    );
    setCheckedItems(updatedCheckedItems);
  };

  // State to track if patient-wise barcode is enabled or not
  const [patientWiseBarcode, setPatientWiseBarcode] = useState(false);

  const handelToUpdatePatientWiseBarcode = () => {
    // ✅ Get the first non-empty barcode value to apply to all items
    const firstBarcode =
      checkedItems.find((item) => item.barcode !== "")?.barcode || "";

    // ✅ Update all items to have the same barcode and mark them as checked
    const updatedCheckedItems = checkedItems.map((item) => ({
      ...item,
      barcode: firstBarcode, // ✅ Apply the same barcode to all
      isChecked: firstBarcode !== "", // ✅ Auto-check if barcode is not empty
    }));

    // ✅ Update the state with the new checkedItems
    setCheckedItems(updatedCheckedItems);
    // ✅ Toggle patientWiseBarcode state
    setPatientWiseBarcode(!patientWiseBarcode);
  };

  //update sample status
  const updateSampleStatus = async (e) => {
    e.preventDefault();
    setIsButtonClick(1);

    console.log(checkedItems);

    const updatedData = checkedItems
      ?.filter((data) => data?.isChecked === true)
      .map((item) => ({
        testid: item?.testId,
        barcodeno: item?.barcode,
        isSampleCollected: "Y",
        collectedBy: parseInt(user?.employeeId),
      }));

    try {
      const response = await postDataForPhlebotomyCollection.postRequestData(
        `/appointmentBooking/UpdateSamplestatus`,
        updatedData
      );

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }

    setIsButtonClick(0);
  };

  // !=================add test data=============
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
      // console.log(response);

      //       console.log(allReferData?.data?.find((item) => item?.doctorId === response?.data?.data?.refID1).doctorId);

      const matchedDoctor1 = allReferData?.data?.find(
        (data) => data?.doctorId === response?.data?.data?.refID1
      );

      console.log(matchedDoctor1);

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

    setShowPopup(2);
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

  // !=================end anil code================

  return (
    <div>
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Phlebotomy Collection</div>
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
              {
                label: "From",
                type: "customDateField",
                name: "from",
                customOnChange: (e) => {
                  // setToDate(e);
                },
              },
              {
                label: "To",
                type: "customDateField",
                name: "To",
                customOnChange: (e) => {
                  // setToDate(e);
                },
              },
            ]}
          />

          <div className="flex gap-[[0.25rem]">
            <div className="relative flex-1">
              <SubmitButton text={"Search"} />
            </div>

            <div className="relative flex-1">
              {/* <SubmitButton text={"Search"} /> */}
            </div>
          </div>
        </div>
      </form>

      {/* ==================== my code =================== */}
      <GridDataDetails gridDataDetails={"Phlebotomy Collection Details"} />
      {allPhlebotomyCollection?.loading ? (
        <div className="flex items-center justify-center w-full">
          <CustomLoadingPage />
        </div>
      ) : (
        <CustomDynamicTable
          activeTheme={activeTheme}
          columns={[
            "Sr. No",
            "Booking Date",
            "Sechduled Date",
            "Visit Id",
            "Patient Name",
            "Age",
            "Mobile No.",
            "Status",
            "Investigation",
            "Address",
            "Action",
          ]}
        >
          <tbody>
            {allPhlebotomyCollection?.data?.data
              ?.reduce((uniqueData, currentData) => {
                // Check if mobileNo already exists
                const existingData = uniqueData.find(
                  (item) => item.mobileNo === currentData.mobileNo
                );

                if (existingData) {
                  // Check if the investigation name does not already exist in the array
                  if (
                    !existingData.investigationName.includes(
                      currentData.investigationName
                    )
                  ) {
                    // Push the new investigation name into the array
                    existingData.investigationName.push(
                      currentData.investigationName
                    );
                  }
                } else {
                  // Initialize investigationName as an array with the current investigation
                  uniqueData.push({
                    ...currentData,
                    investigationName: [currentData.investigationName],
                  });
                }

                return uniqueData;
              }, [])

              .map((data, index) => (
                <tr
                  className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                    ? ""
                    : index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-white"
                    }`}
                  key={index}
                  onMouseEnter={() => setIsHoveredTable(index)}
                  onMouseLeave={() => setIsHoveredTable(null)}
                  style={{
                    background:
                      isHoveredTable === index
                        ? activeTheme?.subMenuColor
                        : undefined,
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
                    {data?.bookingDate}
                  </td>

                  <td
                    className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                    style={{ width: "0%" }}
                  >
                    {data?.sceduleDate}
                  </td>

                  <td
                    className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                    style={{ width: "0%" }}
                  >
                    {data?.workOrderId}
                  </td>

                  <td
                    className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                    style={{ width: "0%" }}
                  >
                    {data?.patientName}
                  </td>

                  <td
                    className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                    style={{ width: "0%" }}
                  >
                    {data?.age}
                  </td>

                  <td
                    className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                    style={{ width: "0%" }}
                  >
                    {data?.mobileNo}
                  </td>

                  <td
                    className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                    style={{ width: "0%" }}
                  >
                    {data?.status}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor ">
                    <div className="relative group flex gap-5">
                      {data?.investigationName[0]}...
                      {/* Tooltip / Dropdown */}
                      <div
                        style={{ height: "fit-content", top: "25px" }}
                        className="w-[500px] h-[500px] bg-gray-300 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 
                hidden gap-1 p-3 group-hover:flex flex-wrap justify-start 
                text-xs px-2 py-1 rounded-md shadow-lg 
                z-[9999] whitespace-normal overflow-visible"
                      >
                        {data?.investigationName.map((item, index) => (
                          <SubmitButton
                            key={index}
                            text={item}
                            submit={false}
                            callBack={() => {
                              // Callback when item is clicked
                            }}
                            style={{
                              height: "1.05rem",
                              padding: "0px 5px",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </td>

                  <td
                    className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                    style={{ width: "0%" }}
                  >
                    {data?.address}
                  </td>

                  <td
                    className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                    style={{ width: "0%" }}
                  >
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className={`rounded-md ${data?.investigationName.length >= 2 ? "h-7" : "h-4"
                          }  w-24 text-xxxs`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                        onClick={() => {
                          // Get all data matching the current mobileNo
                          const filteredData =
                            allPhlebotomyCollection?.data?.data?.filter(
                              (item) => item.mobileNo === data.mobileNo
                            );

                          // Store the filtered data
                          setShowPopup(1);
                          setinvestigationGridData(filteredData);

                          // ✅ Update checkedItems based on filteredData
                          const updatedCheckedItems =
                            filteredData?.map((data) => ({
                              investigationName: data?.investigationName || "",
                              sampleTypeName:
                                data?.sampletypedata?.[0]?.sampleTypeId || "",
                              barcode: data?.barcodeNo,
                              isChecked: data?.barcodeNo !== "" ? true : false,
                              testId: data?.testId,
                            })) || [];

                          setCheckedItems(updatedCheckedItems);
                        }}
                      >
                        Sample Collections
                      </button>

                      <button
                        type="button"
                        className={`rounded-md ${data?.investigationName.length >= 2 ? "h-7" : "h-4"
                          } w-20 text-xxxs flex justify-center items-center`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                        onClick={() => handleAddTest(data)} // Pass data to function
                      >
                        {isButtonClick === 3 ? (
                          <FaSpinner className="animate-spin w-4 h-4" />
                        ) : (
                          "Add Test"
                        )}
                      </button>

                      <button
                        type="button"
                        className={`rounded-md ${data?.investigationName.length >= 2 ? "h-7" : "h-4"
                          } w-28 text-xxxs`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Payment Settlement
                      </button>
                      <button
                        type="button"
                        className={`rounded-md ${data?.investigationName.length >= 2 ? "h-7" : "h-4"
                          } w-28 text-xxxs`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                        // title="Comming soon!"
                        onClick={() => setShowPopup(3)}
                      >
                        New Appointment
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </CustomDynamicTable>
      )}

      {showPopup === 1 && (
        <>
          <CustomPopupWithResponsive
            activeTheme={activeTheme}
            heading={"Sample Collection Details"}
            setShowPopup={setShowPopup}
            popuptype="mediumUpper"
          >
            <GridDataDetails gridDataDetails={"Sammple Collection Details"} />

            <form autoComplete="off" onSubmit={updateSampleStatus}>
              <CustomDynamicTable
                height={"25vh"}
                activeTheme={activeTheme}
                columns={[
                  "Investigation",
                  "Sample Type",
                  "Bar Code",
                  "Collect",
                ]}
              >
                <tbody>
                  {checkedItems !== undefined &&
                    investigationGridData?.map((data, rowIndex) => {
                      const matchedItem = checkedItems.find(
                        (item) =>
                          item.investigationName === data?.investigationName
                      );
                      return (
                        <tr
                          key={`${rowIndex}`}
                          className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                          onMouseEnter={() => setIsHoveredTable(rowIndex)}
                          onMouseLeave={() => setIsHoveredTable(null)}
                          style={{
                            background:
                              isHoveredTable === rowIndex
                                ? activeTheme?.subMenuColor
                                : undefined,
                          }}
                        >
                          {/* Investigation Name */}
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            {data?.investigationName}
                          </td>

                          {/* CustomDropdown for Sample Type */}
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            <div className="relative w-32">
                              <CustomDropdown
                                label="Select Sample Type"
                                value={
                                  data?.selectedSampleTypeId?.target.value ||
                                  data?.sampletypedata?.[0]?.sampleTypeId ||
                                  0
                                } // Use updated value
                                options={
                                  data?.sampletypedata?.map((item) => ({
                                    label: item?.sampleTypeName,
                                    value: parseInt(item?.sampleTypeId),
                                  })) || []
                                }
                                onChange={(e) =>
                                  handleSampleTypeChange(
                                    e,
                                    data?.sampletypedata,
                                    data?.investigationName
                                  )
                                } // Pass investigationName
                                defaultIndex={0}
                                activeTheme={activeTheme}
                                showLabel={false}
                              />
                            </div>
                          </td>

                          {/* CustomTextBox for Barcode */}
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            <div className="w-32">
                              <CustomTextBox
                                type="barcode"
                                name="barCode"
                                maxLength={12}
                                placeholder=" "
                                label="Barcode"
                                showLabel="false"
                                value={
                                  checkedItems.find(
                                    (item) =>
                                      item.investigationName ===
                                      data.investigationName
                                  )?.barcode || ""
                                }
                                onChange={(e) =>
                                  handleInputChangeForPopUpGridData(
                                    data.investigationName,
                                    e.target.value,
                                    data?.selectedSampleTypeId?.target.value ||
                                    data?.sampletypedata?.[0]?.sampleTypeId
                                  )
                                }
                              />
                            </div>
                          </td>

                          {/* Checkbox - Auto-Check Based on investigationName */}
                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            {data?.barcodeNo === "" ? (
                              <input
                                type="checkbox"
                                checked={matchedItem?.isChecked || false}
                                onChange={() =>
                                  handleCheckboxChange(data?.investigationName)
                                }
                              />
                            ) : (
                              data?.barcodeNo !== "" &&
                              data?.isSampleCollected !== "Y" && (
                                <input
                                  type="checkbox"
                                  checked={matchedItem?.isChecked || false}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      data?.investigationName
                                    )
                                  }
                                />
                              )
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </CustomDynamicTable>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2 ">
                <CustomFormButtonWithLoading
                  activeTheme={activeTheme}
                  text="Collect & Save"
                  icon={FaSpinner}
                  isButtonClick={isButtonClick}
                  loadingButtonNumber={1} // Unique number for the first button
                />

                <div
                  className="relative flex-1 overflow-hidden cursor-pointer flex items-center gap-1 w-full rounded-md pl-2 text-xxxs h-[1.6rem] font-semibold lg:w-36"
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                  type="button"
                  data-ripple-light="true"
                  onClick={() => handelToUpdatePatientWiseBarcode()} // Toggle state on div click
                >
                  <input
                    type="checkbox"
                    name="patientWiseBarcode"
                    checked={patientWiseBarcode} // Bind checked state
                    readOnly // Prevent direct interaction with the checkbox
                  />
                  <div className="">Patient wise barcode</div>
                </div>
              </div>
            </form>
          </CustomPopupWithResponsive>
        </>
      )}

      {showPopup === 2 && (
        <>
          <CustomPopupWithResponsive
            activeTheme={activeTheme}
            heading={"Test Data Details"}
            setShowPopup={setShowPopup}
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
                  {console.log(testData)}

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
                  height={"30vh"}
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

      {showPopup === 3 && (
        <CustomPopupWithResponsive
          activeTheme={activeTheme}
          heading={"New Appointment"}
          setShowPopup={setShowPopup}
          popuptype="extralarge"
        >
          <AppointmentBooking />
        </CustomPopupWithResponsive>
      )}
    </div>
  );
}
