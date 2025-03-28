import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  getFormattedDate,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import toast from "react-hot-toast";
import { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import {
  addRandomObjectId,
  getFirstDateOfMonth,
} from "../../../../service/RedendentData";

export default function UpdateRateAfterBooking() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();
  // ------------------ Client -------------------------------
  const [ClientId, setClientId] = useState("");
  const [ClientValue, setClientValue] = useState("");
  const [ClientDropDown, setClientDropDown] = useState(false);
  const [ClientHoveIndex, setClientHoveIndex] = useState(null);
  const [ClientSelectedOption, setClientSelectedOption] = useState("");
  const todayDate = getFormattedDate();
  const FirstDateofMonth = getFirstDateOfMonth();
  const [FromDate, setFromDate] = useState(FirstDateofMonth);
  const [ToDate, setToDate] = useState(todayDate);
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState([]);

  const [Row, setRow] = useState([]);
  const ClientData = useGetData();
  const NewRateData = useGetData();
  const RateTypeData = useGetData();
  useEffect(() => {
    ClientData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1 )"
    );
  }, []);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 100 },
    {
      field: `centreName`,
      headerName: `Centre Name`,
      flex: 1,
    },
    {
      field: `bookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `workOrderId`,
      headerName: `Visitor Id`,
      flex: 1,
    },
    {
      field: `pateintName`,
      headerName: `Pateint Name`,
      flex: 1,
    },
    {
      field: `age`,
      headerName: `Age`,
      flex: 1,
    },
    {
      field: `mobileNo`,
      headerName: `Mobile No`,
      flex: 1,
    },
    {
      field: `netAmount`,
      headerName: `Net Amount`,
      flex: 1,
    },
  ];

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setClientValue(e.target.value);
    setClientId(null);
    setClientDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setClientValue(name);
    setClientId(id);
    setClientSelectedOption(name);
    setClientDropDown(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
  };

  const getReason = async () => {
    const get = await fetchData(
      `/CentrePayment/GetPatientForRateChange?CentreId=${ClientId}&FromDate=${FromDate}&ToDate=${ToDate}`
    );
    console.log(get);
    if (get?.data?.success) {
      setRow(addRandomObjectId(get?.data?.data));
    }
  };

  const handleTheUpdateStatusMenu = async () => {
    if (!ClientId) {
      toast(`Centre is required`);
      return;
    }
    const data1 = await PostData?.postRequest(
      `/CentrePayment/CentreRateChange?Centre=${ClientId}&FromDate=${FromDate}&ToDate=${ToDate}`
    );
    console.log(data1)
    if (data1?.success) {
      toast.success(data1?.message);
      setIsButtonClick(0);
      getReason();
    }
  };

  //   const InputFileds = [{ label: "", type: "" }];

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
        <div>Update Rate After Booking</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "From Date",
                type: "customDateField",
                ShowDate: getFirstDateOfMonth(),
                name: "FromDate",
                customOnChange: (e) => {
                  console.log(e);
                  setFromDate(e);
                },
              },
              {
                label: "To Date",
                type: "customDateField",
                name: "toDate",
                customOnChange: (e) => {
                  console.log(e);
                  setToDate(e);
                },
              },
            ]}
          />
          <SearchBarDropdown
            id="search-bar"
            name="Client"
            value={ClientValue}
            onChange={handleSearchChange2}
            label="Center"
            placeholder="Serch Center"
            options={ClientData?.data}
            isRequired={false}
            showSearchBarDropDown={ClientDropDown}
            setShowSearchBarDropDown={setClientDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setClientHoveIndex}
            isHovered={ClientHoveIndex}
            style={{
              marginTop: "2px",
            }}
          />
          <TwoSubmitButton
            options={[
              {
                label: "Search",
                submit: false,
                style: { marginTop: "0px" },
                callBack: () => {
                  getReason();
                },
              },
              {
                label: "Save",
                submit: false,
                style: { marginTop: "0px" },
                callBack: () => {
                  handleTheUpdateStatusMenu();
                },
              },
            ]}
          />
        </div>
      </form>
      <UpdatedDynamicTable
        rows={Row}
        name="Booking Details"
        loading={loading}
        columns={columns}
        viewKey="Random"
      />
    </div>
  );
}
