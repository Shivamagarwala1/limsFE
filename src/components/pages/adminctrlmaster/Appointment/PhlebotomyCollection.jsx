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
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import { addRandomObjectId, fetchAllCenterData } from "../../../../service/RedendentData";
import { MdDelete } from "react-icons/md";
import DynamicTable, { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import {
  AddTestPopup,
  SampleCollectionPopup,
} from "../../../../Custom Components/PopupModal";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";

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
                setSampleCollection(true);
              }}
              style={{height:"1.05rem", padding: "0px 5px", width: "100px" }}
            />
            <SubmitButton
              text={"Add Test"}
              submit={false}
              callBack={() => {
                setAddTest(true);
              }}
              style={{height:"1.05rem", padding: "0px 5px", width: "100px" }}
            />
            <SubmitButton
              text={"Payment Sattlement"}
              submit={false}
              callBack={() => {
                toast("Coming Soon");
              }}
              style={{height:"1.05rem", padding: "0px 5px", width: "100px" }}
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
    console.log(get);
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
      <SampleCollectionPopup
        setShowPopup={setSampleCollection}
        showPopup={SampleCollection}
        heading={"Sample Collection"}
        rows={rows}
        columns={popupColumns}
      />
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
      <div className="w-full">
        <UpdatedDynamicTable
          rows={Row}
          name="Phlebotomy Collection Details"
          loading={loading}
          columns={columns}
          viewKey="Random"
        />
      </div>
    </div>
  );
}
