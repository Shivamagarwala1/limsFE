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
import CustomFormButtonWithLoading from '../../../global/CustomFormButtonWithLoading'
import FormHeader from "../../../global/FormHeader";
import { CustomNumberInput } from "../../../global/CustomNumberInput";
import { DatePicker } from "../../../global/DatePicker";
import { MdDelete } from "react-icons/md";


export default function PhlebotomyCollection() {

  const user = useSelector((state) => state.userSliceName?.user || null);
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const { fetchData, data, } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);

  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(0);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [AddTest, setAddTest] = useState(false);
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
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [isHoveredTablePopup, setIsHoveredTablePopup] = useState(null);
  const [checkedItems, setCheckedItems] = useState();
  const [testData, setTestData] = useState({
    name: '',
    mobileNo: '',
    address: '',
    age: '',
    scheduleDate: '',
    bookingDate: '',
    investigationData: [],
  });

  const postDataForPhlebotomyCollection = usePostData();

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
    const get = await fetchData(
      `/appointmentBooking/GetAppointmentData?FromDate=${values?.from}&Todate=${values?.To}&CentreID=${CenterId}`
    );
    setRow(addRandomObjectId(get?.data?.data));
    //console.log(get);

    //! anil code
    await allPhlebotomyCollection.fetchDataFromApi(
      `/appointmentBooking/GetAppointmentData?FromDate=${values?.from}&Todate=${values?.To}&CentreID=${CenterId}`
    );

  };


  //!=============anil code===============

  const handleSampleTypeChange = (selectedValue, sampleTypeData, investigationName) => {
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
    const firstBarcode = checkedItems.find((item) => item.barcode !== "")?.barcode || "";

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

    const updatedData = checkedItems
      ?.filter((data) => data?.isChecked === true)
      .map((item) => ({
        testid: item?.testId,
        barcodeno: item?.barcode,
        iscamplecollected: "Y",
        collectedBy: parseInt(user?.employeeId),
      }));

    try {
      const response = await postDataForPhlebotomyCollection.postRequestData(`/appointmentBooking/UpdateSamplestatus`, updatedData);

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }

    } catch (error) {
      toast.error(error?.message);
    }

    setIsButtonClick(0);

  }

  // !=================add test data=============
  const handleAddTest = (data) => {

    if (!data?.investigationName || data.investigationName.length === 0) {
      console.error("No investigation names available");
      return;
    }




    // Create an array of investigation objects
    const investigations = data?.investigationName.map((name) => ({
      investigationName: name,
      // mrp: data?.mrp,
      grossAmount: data?.grossAmount,
      discount: data?.discount,
      netAmount: data?.netAmount,
      deliveryDate: data?.bookingDate,
    }));

    // Create a single object with multiple investigations
    const newTestData = {
      name: data?.patientName,
      mobileNo: data?.mobileNo,
      address: data?.address,
      age: data?.age,
      pincode:data?.pinCode,
      scheduleDate: data?.sceduleDate,
      bookingDate: data?.bookingDate,
      investigationData: investigations, // Store all investigations in a single array
    };

    // Update testData and immediately open the popup
    setTestData((prevData) => {
      const updatedData = Array.isArray(prevData)
        ? [...prevData, newTestData]
        : [newTestData];

      // ✅ Check if investigationData is not empty and open popup immediately
      if (updatedData?.[0]?.investigationData.length !== 0) {
        setShowPopup(2);
      }

      return updatedData; // Return updated data to setTestData
    });
  };

  console.log(allPhlebotomyCollection);


  console.log(testData);


  const handelOnChangeEditTest = (e) => {
    setAddTest((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    }))
  }


  // Function to delete a specific investigation by index
  const handleDelete = (index) => {
    // Get the first object in the array
    const updatedInvestigations = testData[0].investigationData.filter(
      (_, i) => i !== index
    );

    // Update the first object in the array with the new investigation data
    const updatedData = [
      {
        ...testData[0],
        investigationData: updatedInvestigations,
      },
    ];

    // Set the updated data
    setTestData(updatedData);
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
      <GridDataDetails gridDataDetails={'Phlebotomy Collection Details'} />
      {
        allPhlebotomyCollection?.loading ?
          <div className="flex items-center justify-center w-full">
            <CustomLoadingPage />
          </div>
          :
          <CustomDynamicTable activeTheme={activeTheme} columns={["Sr. No", 'Booking Date', 'Sechduled Date', 'Visit Id', 'Patient Name', 'Age', 'Mobile No.', 'Status', 'Investigation', 'Address', 'Action']} >
            <tbody >
              {
                allPhlebotomyCollection?.data?.data
                  ?.reduce((uniqueData, currentData) => {
                    // Check if mobileNo already exists
                    const existingData = uniqueData.find(
                      (item) => item.mobileNo === currentData.mobileNo
                    );

                    if (existingData) {
                      // Check if the investigation name does not already exist in the array
                      if (!existingData.investigationName.includes(currentData.investigationName)) {
                        // Push the new investigation name into the array
                        existingData.investigationName.push(currentData.investigationName);
                      }
                    } else {
                      // Initialize investigationName as an array with the current investigation
                      uniqueData.push({ ...currentData, investigationName: [currentData.investigationName] });
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
                          isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
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

                      <td
                        className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                        style={{ width: "0%" }}
                      >

                        {data?.investigationName.map((name, idx) => (
                          <div key={idx}>{name}</div>
                        ))}


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
                            className={`rounded-md ${data?.investigationName.length >= 2 ? 'h-7' : 'h-4'}  w-24 text-xxxs`}
                            style={{
                              background: activeTheme?.menuColor,
                              color: activeTheme?.iconColor,
                            }}
                            onClick={() => {
                              // Get all data matching the current mobileNo
                              const filteredData = allPhlebotomyCollection?.data?.data?.filter(
                                (item) => item.mobileNo === data.mobileNo
                              );

                              // Store the filtered data
                              setShowPopup(1);
                              setinvestigationGridData(filteredData);

                              // ✅ Update checkedItems based on filteredData
                              const updatedCheckedItems =
                                filteredData?.map((data) => ({
                                  investigationName: data?.investigationName || "",
                                  sampleTypeName: data?.sampletypedata?.[0]?.sampleTypeId || "",
                                  barcode: "",
                                  isChecked: false,
                                  testId: data?.testId
                                })) || [];

                              setCheckedItems(updatedCheckedItems);
                            }}

                          >
                            Sample Collections
                          </button>


                          <button
                            type="button"
                            className={`rounded-md ${data?.investigationName.length >= 2 ? 'h-7' : 'h-4'} w-20 text-xxxs`}
                            style={{
                              background: activeTheme?.menuColor,
                              color: activeTheme?.iconColor,
                            }}

                            onClick={() => handleAddTest(data)} // Pass data to function
                          >
                            Add Test
                          </button>

                          <button
                            type="button"
                            className={`rounded-md ${data?.investigationName.length >= 2 ? 'h-7' : 'h-4'} w-28 text-xxxs`}
                            style={{
                              background: activeTheme?.menuColor,
                              color: activeTheme?.iconColor,
                            }}
                          >
                            Payment Settlement
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              }


            </tbody>

          </CustomDynamicTable>
      }


      {
        showPopup === 1 && (

          <>
            <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Sample Collection Details'} setShowPopup={setShowPopup} popuptype="mediumUpper">

              <GridDataDetails gridDataDetails={'Sammple Collection Details'} />

              <form autoComplete="off" onSubmit={updateSampleStatus}>


                <CustomDynamicTable height={'25vh'} activeTheme={activeTheme} columns={['Investigation', 'Sample Type', 'Bar Code', 'Collect']}>
                  <tbody>
                    {
                      checkedItems !== undefined && (
                        investigationGridData?.map((data, rowIndex) => {

                          const matchedItem = checkedItems.find(
                            (item) => item.investigationName === data?.investigationName
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
                                  isHoveredTable === rowIndex ? activeTheme?.subMenuColor : undefined,
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
                                    value={data?.selectedSampleTypeId?.target.value || data?.sampletypedata?.[0]?.sampleTypeId || 0} // Use updated value
                                    options={
                                      data?.sampletypedata?.map((item) => ({
                                        label: item?.sampleTypeName,
                                        value: parseInt(item?.sampleTypeId),
                                      })) || []
                                    }
                                    onChange={(e) => handleSampleTypeChange(e, data?.sampletypedata, data?.investigationName)} // Pass investigationName
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
                                      checkedItems.find((item) => item.investigationName === data.investigationName)
                                        ?.barcode || ""
                                    }
                                    onChange={(e) =>
                                      handleInputChangeForPopUpGridData(
                                        data.investigationName,
                                        e.target.value,
                                        data?.selectedSampleTypeId?.target.value || data?.sampletypedata?.[0]?.sampleTypeId
                                      )
                                    }
                                  />
                                </div>

                              </td>

                              {/* Checkbox - Auto-Check Based on investigationName */}
                              <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                <input
                                  type="checkbox"
                                  checked={matchedItem?.isChecked || false}
                                  onChange={() => handleCheckboxChange(data?.investigationName)}
                                />

                              </td>
                            </tr>
                          )
                        })
                      )
                    }
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
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
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
                    <div className=''>
                      Patient wise barcode
                    </div>
                  </div>
                </div>
              </form>
            </CustomPopupWithResponsive>
          </>

        )
      }


      {
        showPopup === 2 && (
          <>
            <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Test Data Details'} setShowPopup={setShowPopup} popuptype="mediumUpper">

              <FormHeader headerData={'Test Data'} />

              {
                testData?.investigationData?.length !== 0 && (
                  <form autoComplete='off'>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">

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

                    </div>


                    {/* grid data */}
                    <GridDataDetails gridDataDetails={'Test Data Details'} />

                    <CustomDynamicTable height={'20vh'} activeTheme={activeTheme} columns={["Investigation Name", "Delivery Date", "Discount", "Gross Amt", , "Net Amt", 'Action']}>
                      <tbody>
                        {
                          testData[0]?.investigationData?.map((data, rowIndex) => {
                            return (
                              <tr
                                key={`${rowIndex}`}
                                className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                                  }`}
                                onMouseEnter={() => setIsHoveredTablePopup(rowIndex)}
                                onMouseLeave={() => setIsHoveredTablePopup(null)}
                                style={{
                                  background:
                                    isHoveredTablePopup === rowIndex ? activeTheme?.subMenuColor : undefined,
                                }}
                              >
                                {/* Investigation Name */}
                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                  {data?.investigationName}
                                </td>

                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                  {data?.deliveryDate}
                                </td>

                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                  {data?.discount}
                                </td>

                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                  {data?.grossAmount}
                                </td>

                                {/* <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                  {data?.mrp}
                                </td> */}

                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                  {data?.netAmount}
                                </td>

                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                  <MdDelete className="w-4 h-4 text-red-500" onClick={() => handleDelete(rowIndex)} />
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>


                    </CustomDynamicTable>
                  </form>
                )
              }


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2 ">
                <CustomFormButtonWithLoading
                  activeTheme={activeTheme}
                  text="Update"
                  icon={FaSpinner}
                  isButtonClick={isButtonClick}
                  loadingButtonNumber={2} // Unique number for the first button
                />
              </div>
            </CustomPopupWithResponsive>
          </>
        )
      }

    </div>
  );
}
