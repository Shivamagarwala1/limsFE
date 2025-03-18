import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import { AssignPopup } from "../../../../Custom Components/PopupModal";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import toast from "react-hot-toast";
import { addRandomObjectId } from "../../../../service/RedendentData";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";

export default function AppointmentStatus() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
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
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [AssignedPopup, setAssignedPopup] = useState(false);
  const AllCenterData = useGetData();
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
  }, [activeTab]);
  console.log(data);
  const rows = [
    { id: 1, client: "client 1" },
    { id: 2, client: "client 2" },
  ];

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
      width: 200,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <SubmitButton
              text={"Assign Phelebomist"}
              submit={false}
              callBack={() => {
                setAssignedPopup(true);
              }}
               style={{height:"1.05rem", padding: "0px 5px", width: "100px" }}
            />
            <SubmitButton
              text={"Reschedule"}
              submit={false}
              callBack={() => {}}
               style={{height:"1.05rem", padding: "0px 5px", width: "100px" }}
            />
            <SubmitButton
              text={"Cancel"}
              submit={false}
              callBack={() => {}}
               style={{height:"1.05rem", padding: "0px 5px", width: "100px" }}
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
      `/appointmentBooking/GetAppointmentData?FromDate=${values?.from}&Todate=${values?.Todate}&CentreID=${CenterId}`
    );
    setRow(addRandomObjectId(get?.data?.data));
    console.log(get);
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
      console.log(payload);
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
      },
    },
    {
      Data: 20,
      CallBack: () => {
        // Collected
      },
    },
    {
      Data: 22,
      CallBack: () => {
        // Collected
      },
    },
    {
      Data: 23,
      CallBack: () => {
        // Collected
      },
    },
  ];
  return (
    <div>
      <AssignPopup setShowPopup={setAssignedPopup} showPopup={AssignedPopup} />
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
          <SubmitButton text={"Search"} />
        </div>

        <LegendButtons statuses={statuses} />
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
