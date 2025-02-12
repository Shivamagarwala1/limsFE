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
import { fetchAllCenterData } from "../../../../service/RedendentData";
import { MdDelete } from "react-icons/md";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import {
  AddTestPopup,
  SampleCollectionPopup,
} from "../../../../Custom Components/PopupModal";
import toast from "react-hot-toast";

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
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);
  const [checkedStates, setCheckedStates] = useState({});
  const [rows, setRows] = useState([
    { id: 1, Investigation: "Amylase Urine", checked: true },
    { id: 2, Investigation: "Peripheral - GBP", checked: true },
    // { id: 3, Investigation: "TSH", checked: true },
    { id: 4, Investigation: "Xray", checked: true },
    { id: 5, Investigation: "CBC (Complete Blood Count)", checked: true },
  ]);

  // const AllCenterData = fetchAllCenterData();
  useEffect(() => {
    getReason();
    // console.log(AllCenterData);
  }, [activeTab]);
  console.log(data);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `AppointmentNo`,
      headerName: `Appointment No.`,
      flex: 1,
    },
    {
      field: `BookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `SechduleDateTime`,
      headerName: `Sechduled Date Time`,
      flex: 1,
    },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `AgeSex`,
      headerName: `Age/Sex`,
      flex: 1,
    },
    {
      field: `mobileNo`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    {
      field: `investigation`,
      headerName: `Investigation`,
      flex: 1,
    },
    {
      field: `Address`,
      headerName: `Address`,
      flex: 1,
    },
    {
      field: "",
      width: 200,
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
              style={{ padding: "5px 10px", width: "100px" }}
            />
            <SubmitButton
              text={"Add Test"}
              submit={false}
              callBack={() => {
                setAddTest(true);
              }}
              style={{ padding: "5px 10px", width: "100px" }}
            />
            <SubmitButton
              text={"Payment Sattlement"}
              submit={false}
              callBack={() => {toast('Coming Soon')}}
              style={{ padding: "5px 10px", width: "100px" }}
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    const lsData = getLocal("imarsar_laboratory");
    const payload =
      isButtonClick === 0
        ? { ...values, createdById: lsData?.user?.employeeId }
        : {
            ...values,
            updateById: lsData?.user?.employeeId,
            id: clickedRowId?.id,
            isActive: clickedRowId?.isActive,
          };
    // const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
    console.log(payload);
    // if (data1?.success) {
    //   toast.success(
    //     isButtonClick === 0 ? data1?.message : "Updated Successfull"
    //   );
    //   setIsButtonClick(0);
    //   getReason();
    // }
  };

  const getReason = async () => {
    // const get = await fetchData(tabs[activeTab]?.getApi);
    console.log(get);
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
      />
      <SampleCollectionPopup
        setShowPopup={setSampleCollection}
        showPopup={SampleCollection}
        heading={'Sample Collection'}
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
          <InputGenerator
            inputFields={[
              { label: "From", type: "customDateField", name: "from" },
              { label: "To", type: "customDateField", name: "To" },
            ]}
          />
          <SubmitButton text={"Search"} />
        </div>
      </form>
      <div className="pt-1 w-full">
        <DynamicTable
          rows={[
            {
              id: 1,
              appointmentDate: "12-05-25",
              patientName: "Jon Snow",
              AgeSex: "male/25",
              mobileNo: "1234567890",
              Address: "Poket 4 Noida Uttar Pradesh, 301712",
              BookingDate: "12-02-25,  12:05 PM",
              SechduleTime: "03:45 PM",
              SechduleDateTime: "15-02-25,  03:45 PM",
              investigation: "CBC (Complete Blood Count)",
              AppointmentNo: "54321",
            },
          ]}
          name="Phlebotomy Collection Details"
          loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>
    </div>
  );
}
