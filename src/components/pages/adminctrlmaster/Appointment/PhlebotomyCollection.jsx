import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { getLocal } from "usehoks";
import { FaRegEdit, FaSpinner } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { IoMdCloseCircleOutline, IoMdMenu } from "react-icons/io";
import { addRandomObjectId, fetchAllCenterData } from "../../../../service/RedendentData";
import { MdDelete } from "react-icons/md";
import DynamicTable, { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import {
  AddTestPopup,
  SampleCollectionPopup,
} from "../../../../Custom Components/PopupModal";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import CustomFormButton from "../../../global/CustomFormButton";
import PopupFooter from "../../../global/PopupFooter";
import { useRetrieveData } from "../../../../service/service";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import CustomLoadingPage from "../../../global/CustomLoadingPage";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import { CustomTextBox } from "../../../global/CustomTextBox";

export default function PhlebotomyCollection() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);

  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [AddTest, setAddTest] = useState(false);
  const [SampleCollection, setSampleCollection] = useState(false);
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


  const [rows, setRows] = useState([
    { id: 1, Investigation: "Amylase Urine", checked: true },
    { id: 2, Investigation: "Peripheral - GBP", checked: true },
    // { id: 3, Investigation: "TSH", checked: true },
    { id: 4, Investigation: "Xray", checked: true },
    { id: 5, Investigation: "CBC (Complete Blood Count)", checked: true },
  ]);
  const [Row, setRow] = useState([]);
  useEffect(() => {
    getData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1)"
    );
  }, []);

  // const AllCenterData = fetchAllCenterData();
  useEffect(() => {
    getReason();
    // console.log(AllCenterData);
  }, [activeTab]);
  console.log(data);

  const getSingleInvastiGation = (id) => {
    console.log(id);

    setSampleCollection(true);
  }

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
      field: `investigationName`,
      headerName: `Investigation`,
      flex: 1,
    },
    {
      field: `address`,
      headerName: `Address`,
      flex: 1,
    },
    {

      field: "",
      width: 150,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <SubmitButton
              text={"Sample Collection"}
              submit={false}
              callBack={() => {
                getSingleInvastiGation(data?.id)
              }}
              style={{ height: "1.05rem", padding: "0px 5px", width: "100px" }}
            />
            <SubmitButton
              text={"Add Test"}
              submit={false}
              callBack={() => {
                setAddTest(true);
              }}
              style={{ height: "1.05rem", padding: "0px 5px", width: "100px" }}
            />
            <SubmitButton
              text={"Payment Sattlement"}
              submit={false}
              callBack={() => {
                toast("Coming Soon");
              }}
              style={{ height: "1.05rem", padding: "0px 5px", width: "100px" }}
            />
          </div>
        );
      },
    },
  ];
  const popupColumns = [
    { field: "Investigation", headerName: "Investigation", flex: 1 },
    {
      field: `SampleTypeBarcode`,
      headerName: `Sample Type`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <InputGenerator
              inputFields={[
                {
                  label: "",
                  type: "select",
                  dataOptions: [
                    { id: 1, test: "URINE" },
                    { id: 2, test: "WB EDTA" },
                    { id: 3, test: "Whole Body" },
                    { id: 4, test: "Serum" },
                  ],
                  style: { height: "2rem" },
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      field: `Barcode`,
      headerName: `Barcode`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <InputGenerator
              inputFields={[
                {
                  label: "Enter Barcode No.",
                  type: "text",
                  style: { height: "2rem" },
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      field: "",
      width: 50,
      headerName: "Collection",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              checked={params.row.checked}
              type="checkbox"
              onChange={() => {
                const updatedRows = rows.map((row) =>
                  row.id === params.row.id
                    ? { ...row, checked: !row.checked }
                    : row
                );
                setRows(updatedRows);
              }}
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


  const handleSampleTypeChange = (event, index, itemId) => {
    const selectedOption = event.target.value;


    // Create the updated sample type object based on the selected option
    const updatedSampleType = {
      // Get the id based on selected option
      name: selectedOption,  // The name is the selected value
      id: itemId      // Assuming itemType comes from props or state
    };

    // setGridDataBarCodeandSampleType((prevState) => {
    //   // Check if the updatedSampleType.id already exists in the sampleType array
    //   const existingSampleTypeIndex = prevState.sampleType.findIndex(item => item.id === updatedSampleType.id);

    //   if (existingSampleTypeIndex !== -1) {
    //     // If the id exists, update the sampleTypeName for that item
    //     const updatedSampleTypes = prevState.sampleType.map((item, idx) =>
    //       idx === existingSampleTypeIndex ? { ...item, name: selectedOption } : item
    //     );

    //     return {
    //       ...prevState,
    //       sampleType: updatedSampleTypes,
    //     };
    //   } else {
    //     // If the id does not exist, push the new sampleType
    //     return {
    //       ...prevState,
    //       sampleType: [...prevState.sampleType, updatedSampleType],
    //     };
    //   }
    // });
  };


  const handleInputChangeForPopUpGridData = (rowId, value) => {
    // setGridDataBarCodeandSampleType((prevState) => {
    //   // Get the sampleTypeName of the current row being updated
    //   const currentSampleTypeName = prevState.barCode?.find(
    //     (item) => item.itemId === rowId
    //   )?.sampleTypeName;

    //   // Update barCode values where sampleTypeName matches
    //   const updatedBarCode = prevState.barCode.map((item) =>
    //     item.sampleTypeName === currentSampleTypeName
    //       ? { ...item, name: value } // Update all matching sampleTypeName
    //       : item
    //   );

    //   return { ...prevState, barCode: updatedBarCode };
    // });

    // // Optional: Update checkedItems if needed
    // setCheckedItems((prev) => ({
    //   ...prev,
    //   [rowId]: value.length > 0, // Check if barcode is not empty
    // }));
  };



  const getReason = async () => {
    // const get = await fetchData(`/appointmentBooking/GetAppointmentData?FromDate=18-Mar-2025&Todate=23-Mar-2025&CentreID=1`);
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
      console.log(payload);
      getReason();
      setShowPopup(false);
    }
  };

  //   const InputFileds = [{ label: "", type: "" }];

  return (
    <div>
      <AddTestPopup
        setShowPopup={setAddTest}
        showPopup={AddTest}
        heading="Add Test"
        rows={rows}
        columns={popupColumns}
      />
      {/* <SampleCollectionPopup
        setShowPopup={setSampleCollection}
        showPopup={SampleCollection}
        heading={"Sample Collection"}
        rows={rows}
        columns={popupColumns}
      /> */}
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
          <SubmitButton text={"Search"} />
        </div>
      </form>
      {/* <div className="w-full">
        <UpdatedDynamicTable
          rows={Row}
          name="Phlebotomy Collection Details"
          loading={loading}
          columns={columns}
          viewKey="Random"
        />
      </div> */}


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
                            className="rounded-md h-4 w-24 text-xxxs"
                            style={{
                              background: activeTheme?.menuColor,
                              color: activeTheme?.iconColor,
                            }}
                            onClick={() => {
                              // Get all data matching the current mobileNo
                              const filteredData = allPhlebotomyCollection?.data?.data.filter(
                                (item) => item.mobileNo === data.mobileNo
                              );

                              // Store the filtered data
                              setinvestigationGridData(filteredData);
                              setSampleCollection(true);
                            }}
                          >
                            Sample Collections
                          </button>


                          <button
                            type="button"
                            className="rounded-md h-4 w-20 text-xxxs"
                            style={{
                              background: activeTheme?.menuColor,
                              color: activeTheme?.iconColor,
                            }}
                          >
                            Add Test
                          </button>

                          <button
                            type="button"
                            className="rounded-md h-4 w-28 text-xxxs"
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
        console.log(investigationGridData)

      }
      {
        SampleCollection && (
          <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
            <div className="w-full mx-2 lg:mx-60 h-auto z-50 shadow-2xl bg-white rounded-lg  animate-slideDown">

              <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md'
                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
              >
                <div className=" font-semibold"
                  style={{ color: activeTheme?.iconColor }}
                >
                  Sample Collection Details
                </div>

                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                  style={{ color: activeTheme?.iconColor }}
                  onClick={() => { setSampleCollection(false) }}
                />
              </div>

              <div className=''>

                <div
                  className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                  style={{ background: activeTheme?.blockColor }}
                >
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                  </div>
                  <div>Old Patient Info.</div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-[2px]  mx-1 mb-1 bg-white">
                  <div className="col-span-12 bg-white">
                    <div className="max-h-96 overflow-y-auto ">
                      {/* Table */}
                      <table className="table-auto border-collapse w-full text-xxs text-left ">
                        <thead
                          style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            background: activeTheme?.menuColor,
                            color: activeTheme?.iconColor,
                          }}
                        >
                          <tr>
                            <td className="border-b font-semibold border-gray-300 px-4 text-xxs" style={{ width: "10%" }}>
                              Investigation
                            </td>

                            <td className="border-b font-semibold border-gray-300 px-4 text-xxs" style={{ width: "3%" }}>
                              Sample Type
                            </td>

                            <td className="border-b font-semibold border-gray-300 px-4 text-xxs" style={{ width: "3%" }}>
                              Barcode
                            </td>

                            <td className="border-b font-semibold border-gray-300 px-4 text-xxs" style={{ width: "3%" }}>
                              Collect
                            </td>
                          </tr>
                        </thead>

                        <tbody>
                          {investigationGridData?.map((data, rowIndex) => {
                            // Declare barcodeValue inside the map function
                            // const barcodeValue =
                            //   gridDataBarCodeandSampleType?.barCode.find(
                            //     (item) => item.itemId === data?.itemId
                            //   )?.name || "";

                            return (
                              <tr
                                key={rowIndex}
                                className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                                onMouseEnter={() => setIsHoveredTable(rowIndex)}
                                onMouseLeave={() => setIsHoveredTable(null)}
                                style={{
                                  background: isHoveredTable === rowIndex ? activeTheme?.subMenuColor : undefined,
                                }}
                              >
                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "10%" }}>
                                  {data?.investigationName}
                                </td>

                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "3%" }}>
                                  <select
                                    className="border rounded px-1 w-full outline-none"
                                    onChange={(e) => handleSampleTypeChange(e, rowIndex, data?.itemId)}
                                    defaultValue={data?.sampletypedata?.[0] || 0} // Set to the first value in the array
                                  >
                                    <option value={0} disabled hidden className="text-gray-400">
                                      Select Option
                                    </option>
                                    {data?.sampletypedata?.map((item, index) => (
                                      <option key={index} value={item?.sampleTypeId}>
                                        {item?.sampleTypeName}
                                      </option>
                                    ))}
                                  </select>

                                </td>

                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "3%" }}>
                                  <form autoComplete='off'>
                                    <CustomTextBox
                                      type="barcode"
                                      name="barCode"
                                      maxLength={12}
                                      // value={barcodeValue || ""}

                                      // readOnly={patientWiseBarcode}

                                      onChange={(e) => handleInputChangeForPopUpGridData(data?.itemId, e.target.value)}
                                      placeholder=" "
                                      label="Barcode"
                                      showLabel='false'
                                    />
                                  </form>
                                </td>

                                <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: "3%" }}>
                                  <input
                                    type="checkbox"
                                  // checked={checkedItems[data?.itemId] || false} // Use updated state
                                  // onChange={() => handleCheckboxChange123(data?.itemId)} // Allow manual toggle
                                  />
                                </td>


                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                    </div>
                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mb-1 mx-1">
                  <div className="relative flex-1"></div>
                  <div className="relative flex-1"></div>
                  <div className="relative flex-1"></div>
                  <div className="relative flex-1"></div>
                  <div
                    className="relative flex-1 overflow-hidden cursor-pointer flex items-center gap-1 w-full rounded-md pl-2 text-xxxs h-[1.6rem] font-semibold"
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                    type="button"
                    data-ripple-light="true"
                    onClick={() => handelToUpdatePatientWiseBarcode()} // Toggle state on div click
                  >
                    <input
                      type="checkbox"
                      name="patientWiseBarcode"
                      // checked={patientWiseBarcode} // Bind checked state
                      readOnly // Prevent direct interaction with the checkbox
                    />
                    <div className=''>
                      Patient wise barcode
                    </div>
                  </div>

                  <div className="relative flex-1">
                    {/* <CustomeNormalButton activeTheme={activeTheme} text='' /> */}
                    <CustomFormButton
                      activeTheme={activeTheme}
                      text="Collect"
                      icon={FaSpinner}
                      isButtonClick={isButtonClick}
                      loadingButtonNumber={5} // Unique number for the first button
                      onClick={() => onSubmitForSavePatientRegistrationData(1)} // Pass button number to handler
                    />
                  </div>

                  {/* <div className="relative flex-1">
                    <CustomFormButton
                      activeTheme={activeTheme}
                      text="Recive & Save"
                      icon={FaSpinner}
                      isButtonClick={isButtonClick}
                      loadingButtonNumber={5} // Unique number for the first button
                      onClick={() => onSubmitForSavePatientRegistrationData(2)} // Pass button number to handler
                    />
                  </div> */}
                </div>


                <PopupFooter />
              </div>

            </div>
          </div>
        )
      }
    </div>
  );
}
