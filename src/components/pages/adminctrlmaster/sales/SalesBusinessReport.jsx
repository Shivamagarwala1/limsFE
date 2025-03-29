import React, { useEffect, useState } from "react";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  getFormattedDate,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import {
  addRandomObjectId,
  getFirstDateOfMonth,
} from "../../../../service/RedendentData";
import { getLocal } from "usehoks";
import toast from "react-hot-toast";
import PopupModal from "../../../../Custom Components/PopupModal";

export default function SalesBusinessReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();
  const todayDate = getFormattedDate();
  const FirstDateofMonth = getFirstDateOfMonth();
  const [FromDate, setFromDate] = useState(FirstDateofMonth);
  const [ToDate, setToDate] = useState(todayDate);

  const [CenterId, setCenterId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [TypeValue, setTypeValue] = useState("");
  const [TypeDropDown, setTypeDropDown] = useState(false);
  const [TypeHoveredIndex, setTypeHoveredIndex] = useState(null);
  const [TypeSelectedOption, setTypeSelectedOption] = useState("");

  const [GeneralManagerId, setGeneralManagerId] = useState("");
  const [GeneralManagerValue, setGeneralManagerValue] = useState("");
  const [GeneralManagerDropDown, setGeneralManagerDropDown] = useState(false);
  const [GeneralManagerHoverIndex, setGeneralManagerHoverIndex] =
    useState(null);
  const [GeneralManagerSelectedOption, setGeneralManagerSelectedOption] =
    useState("");
  const [ZonalManagerId, setZonalManagerId] = useState("");
  const [ZonalManagerValue, setZonalManagerValue] = useState("");
  const [ZonalManagerDropDown, setZonalManagerDropDown] = useState(false);
  const [ZonalManagerHoverIndex, setZonalManagerHoverIndex] = useState(null);
  const [ZonalManagerSelectedOption, setZonalManagerSelectedOption] =
    useState("");
  const [RegionalManagerId, setRegionalManagerId] = useState("");
  const [RegionalManagerValue, setRegionalManagerValue] = useState("");
  const [RegionalManagerDropDown, setRegionalManagerDropDown] = useState(false);
  const [RegionalManagerHoverIndex, setRegionalManagerHoverIndex] =
    useState(null);
  const [RegionalManagerSelectedOption, setRegionalManagerSelectedOption] =
    useState("");
  const [AreaMagangerValue, setAreaMagangerValue] = useState("");
  const [AreaMagangerDropDown, setAreaMagangerDropDown] = useState(false);
  const [AreaMagangerHoverIndex, setAreaMagangerHoverIndex] = useState(null);
  const [AreaMagangerSelectedOption, setAreaMagangerSelectedOption] =
    useState("");
  const [SalesMagangerId, setSalesMagangerId] = useState("");
  const [SalesMagangerValue, setSalesMagangerValue] = useState("");
  const [SalesMagangerDropDown, setSalesMagangerDropDown] = useState(false);
  const [SalesMagangerHoverIndex, setSalesMagangerHoverIndex] = useState(null);
  const [SalesMagangerSelectedOption, setSalesMagangerSelectedOption] =
    useState("");

  const [SalesExcutiveValue, setSalesExcutiveValue] = useState("");
  const [SalesExcutiveDropDown, setSalesExcutiveDropDown] = useState(false);
  const [SalesExcutiveHoverIndex, setSalesExcutiveHoverIndex] = useState(null);
  const [SalesExcutiveSelectedOption, setSalesExcutiveSelectedOption] =
    useState("");

  const [ClientValue, setClientValue] = useState("");
  const [ClientDropDown, setClientDropDown] = useState(false);
  const [ClientHoverIndex, setClientHoverIndex] = useState(null);
  const [ClientSelectedOption, setClientSelectedOption] = useState("");

  const { fetchData, response, data, loading } = useGetData();
  const [showPopup, setShowPopup] = useState(false);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [Row, setRow] = useState([]);
  const [SelectAll, setSelectAll] = useState(false);
  const AllCenterData = useGetData();
  const DesignationData = useGetData();
  const TypeData = useGetData();
  const GeneralManagerData = useGetData();
  const RegionalManagerData = useGetData();
  const ZonalManagerData = useGetData();
  const ClientData = useGetData();
  const SalesExData = useGetData();
  const AreaManagerData = useGetData();
  const SalesManagerData = useGetData();
  // const PostDoctorData = usePostData();
  // const PostDoctorData = usePostData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1)"
    );

    DesignationData?.fetchData(
      `/designationMaster?select= id,designationname&$filter=(id lt 6 or (id gt 9 and id lt 13))`
    );
  }, []);
  useEffect(() => {
    TypeData?.fetchData("");
    ZonalManagerData?.fetchData(
      "/empmaster?select=empid,fname,lname&$filter=(designationId eq 4 and isactive eq 1)"
    );
    GeneralManagerData?.fetchData(
      "/empmaster?select=empid,fname,lname&$filter=(designationId eq 3 and isactive eq 1)"
    );
    RegionalManagerData?.fetchData(
      "/empmaster?select=empid,fname,lname&$filter=(designationId eq 5 and isactive eq 1)"
    );
    SalesManagerData?.fetchData(
      "/empmaster?select=empid,fname,lname&$filter=(designationId eq 11 and isactive eq 1)"
    );
    ClientData?.fetchData(
      "/empmaster?select=empid,fname,lname&$filter=(designationId eq 51 and isactive eq 1)"
    );
    SalesExData?.fetchData(
      "/empmaster?select=empid,fname,lname&$filter=(designationId eq 12 and isactive eq 1)"
    );
    AreaManagerData?.fetchData(
      "/empmaster?select=empid,fname,lname&$filter=(designationId eq 10 and isactive eq 1)"
    );
    // console.log(AllCenterData);
  }, [DesignationData?.loading]);
  useEffect(() => {
    getReason();
  }, []);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    // {
    //   field: `imaRegistartionNo`,
    //   headerName: `Registartion No.`,
    //   flex: 1,
    // },
    // {
    //   field: `title`,
    //   headerName: `Title`,
    //   flex: 1,
    // },
    // {
    //   field: `doctorName`,
    //   headerName: `Doctor Name`,
    //   flex: 1,
    // },
    // {
    //   field: `address1`,
    //   headerName: `Address`,
    //   flex: 1,
    // },
    // {
    //   field: `mobileNo`,
    //   headerName: `Mobile No.`,
    //   flex: 1,
    // },
    // {
    //   field: `degreeName`,
    //   headerName: `Degree`,
    //   flex: 1,
    // },
    // {
    //   field: `Action`,
    //   headerName: `Action`,
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px" }}>
    //         <button className="w-4 h-4 flex justify-center items-center">
    //           <FaRegEdit
    //             className={`w-full h-full
    //               ${
    //                 params?.row?.isActive === 1
    //                   ? "text-blue-500 cursor-pointer"
    //                   : "text-gray-400 cursor-not-allowed"
    //               }
    //             `}
    //             onClick={() => {
    //               handleFinds(params);
    //               setClickedRowId(params?.row);
    //               setIsButtonClick(1);
    //               setTypeValue(params?.row?.title || "");
    //               setMobile(params?.row?.mobileNo || "");
    //               setGeneralManagerValue(params?.row?.degreeName || "");
    //               setSpecializationValue(params?.row?.specialization || "");
    //               setSalesMagangerValue(
    //                 params?.row?.allowsharing == 0 ? "No" : "Yes"
    //               );
    //               setReferMasterValue(
    //                 params?.row?.referMasterShare == 0 ? "No" : "Yes"
    //               );
    //               setAreaMagangerValue(params?.row?.opdFee == 0 ? "No" : "Yes");
    //               setClientValue(params?.row?.discount == 0 ? "No" : "Yes");
    //               setAllowOPDValue(params?.row?.allowOPD == 0 ? "No" : "Yes");
    //               setOnlineLoginValue(
    //                 params?.row?.onlineLogin == 0 ? "No" : "Yes"
    //               );
    //               setSalesExcutiveValue(params?.row?.emailReport);
    //               setValues([{ pinCode: params?.row?.pinCode }]);
    //               setValues([{ doctorName: params?.row?.doctorName }]);
    //               setValues([{ address1: params?.row?.address1 }]);
    //               setValues([{ address2: params?.row?.address2 }]);
    //               setValues([
    //                 { imaRegistartionNo: params?.row?.imaRegistartionNo },
    //               ]);
    //               setValues([{ reportEmail: params?.row?.reportEmail }]);
    //               setValues([{ email: params?.row?.email }]);
    //               setValues([{ userId: params?.row?.userId }]);
    //               setValues([{ password: params?.row?.password }]);
    //               setValues([
    //                 { imaRegistartionNo: params?.row?.imaRegistartionNo },
    //               ]);
    //               setValues([
    //                 { imaRegistartionNo: params?.row?.imaRegistartionNo },
    //               ]);
    //             }}
    //           />
    //         </button>
    //         <button
    //           className={`w-4 h-4 flex justify-center items-center ${
    //             params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
    //           }`}
    //         >
    //           <ImSwitch
    //             className="w-full h-full"
    //             onClick={() => {
    //               setClickedRowId(params?.row);
    //               setShowPopup(true);
    //             }}
    //           />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const handleFinds = async (params) => {
    setSearchValue(filteredCenter?.companyName || "");
    setCenterId(params?.row?.centreID || 0);
    setRegionalManagerValue(filteredRegionalManager?.fName || "");
    setRegionalManagerId(params?.row?.proId || 0);
  };

  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setTypeValue(e.target.value);
    setTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setTypeValue(name);
    setTypeSelectedOption(name);
    setTypeDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange4 = (e) => {
    setGeneralManagerValue(e.target.value);
    setGeneralManagerDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick4 = (name, id) => {
    setGeneralManagerId(id);
    setGeneralManagerValue(name);
    setGeneralManagerSelectedOption(name);
    setGeneralManagerDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange5 = (e) => {
    setZonalValue(e.target.value);
    setZonalDropDown(true); // Show dropdown when typing
  };
  // Function to handle selection from the dropdown
  const handleOptionClick5 = (name, id) => {
    setZonalManagerId(id);
    setZonalManagerValue(name);
    setZonalManagerSelectedOption(name);
    setZonalManagerDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange6 = (e) => {
    setRegionalMagangerValue(e.target.value);
    setRegionalMagangerDropDown(true); // Show dropdown when typing
  };
  // Function to handle selection from the dropdown
  const handleOptionClick6 = (name, id) => {
    setRegionalManagerId(id);
    setRegionalManagerValue(name);
    setRegionalManagerSelectedOption(name);
    setRegionalManagerDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange7 = (e) => {
    setAreaMagangerValue(e.target.value);
    setAreaMagangerDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick7 = (name, id) => {
    setAreaMagangerValue(name);
    setAreaMagangerSelectedOption(name);
    setAreaMagangerDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange8 = (e) => {
    setSalesMagangerValue(e.target.value);
    setSalesMagangerDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick8 = (name, id) => {
    setSalesMagangerId(id);
    setSalesMagangerValue(name);
    setSalesMagangerSelectedOption(name);
    setSalesMagangerDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange10 = (e) => {
    setSalesExcutiveValue(e.target.value);
    setSalesExcutiveDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick10 = (name, id) => {
    setSalesExcutiveValue(name);
    setSalesExcutiveSelectedOption(name);
    setSalesExcutiveDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange11 = (e) => {
    setClientValue(e.target.value);
    setClientDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick11 = (name, id) => {
    setClientValue(name);
    setClientSelectedOption(name);
    setClientDropDown(false);
  };

  const getReason = async () => {
    const get = await fetchData("/doctorReferalMaster");
    setRow(addRandomObjectId(get?.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = getValues();
    console.log(values);
    const payload = {};
    try {
      const response = await PostDoctorData?.postRequest(``, payload);
      if (response?.success) {
        toast.success(response?.message);
        getReason();
        setIsButtonClick(0);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast?.error(response?.message);
    }
  };
  const handleDelete = async () => {
    const lsData = getLocal("imarsar_laboratory");
    const data1 = await PostDoctorData?.postRequest(
      `/doctorReferalMaster/UpdateReferDoctorStatus?DoctorId=${
        clickedRowId?.doctorId
      }&status=${clickedRowId?.isActive == 1 ? 0 : 1}&UserId=${
        lsData?.user?.employeeId
      }`
    );
    if (data1?.success) {
      toast.success(data1?.message);
      getReason();
      setIsButtonClick(0);
      setShowPopup(false);
    } else {
      toast.success(data1?.message);
    }
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <PopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        activeTheme={activeTheme}
        handleTheUpdateStatusMenu={handleDelete}
        isButtonClick={isButtonClick}
        message="Are you sure you want to proceed with the action?"
        cancelText="Cancel"
        confirmText="Yes"
      />
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div style={{ overflow: "hidden" }}>
          {/* Header Section */}
          <FormHeader title="Sales Business Report" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-2 mx-1 lg:mx-2">
              <InputGenerator
                inputFields={[
                  {
                    label: "From Date",
                    type: "customDateField",
                    name: "FromDate",
                    ShowDate: getFirstDateOfMonth(),
                    // minDate: new Date(2000, 0, 1),
                    // tillDate: new Date(2100, 0, 1),
                    customOnChange: (e) => {
                      console.log(e);
                      setFromDate(e);
                    },
                  },
                  {
                    label: "To Date",
                    type: "customDateField",
                    name: "ToDate",
                    // minDate: new Date(2000, 0, 1),
                    // tillDate: new Date(2100, 0, 1),
                    customOnChange: (e) => {
                      console.log(e);
                      setToDate(e);
                    },
                  },
                ]}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={TypeValue}
                onChange={handleSearchChange1}
                label="Type"
                options={TypeData?.data}
                isRequired={false}
                showSearchBarDropDown={TypeDropDown}
                setShowSearchBarDropDown={setTypeDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setTypeHoveredIndex}
                isHovered={TypeHoveredIndex}
                style={{ marginTop: "0.1rem", marginBottom: "0px" }}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={GeneralManagerValue}
                onChange={handleSearchChange4}
                label="General Manager"
                options={GeneralManagerData?.data}
                isRequired={false}
                showSearchBarDropDown={GeneralManagerDropDown}
                setShowSearchBarDropDown={setGeneralManagerDropDown}
                handleOptionClickForCentre={handleOptionClick4}
                setIsHovered={setGeneralManagerHoverIndex}
                isHovered={GeneralManagerHoverIndex}
                style={{ marginTop: "0.1rem", marginBottom: "0px" }}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={ZonalManagerValue}
                onChange={handleSearchChange5}
                label="Zonal Manager"
                options={ZonalManagerData?.data}
                isRequired={false}
                showSearchBarDropDown={ZonalManagerDropDown}
                setShowSearchBarDropDown={setZonalManagerDropDown}
                handleOptionClickForCentre={handleOptionClick5}
                setIsHovered={setZonalManagerHoverIndex}
                isHovered={ZonalManagerHoverIndex}
                style={{ marginTop: "0.1rem", marginBottom: "0px" }}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={RegionalManagerValue}
                onChange={handleSearchChange6}
                label="Regional Manager"
                options={RegionalManagerData?.data}
                isRequired={false}
                showSearchBarDropDown={RegionalManagerDropDown}
                setShowSearchBarDropDown={setRegionalManagerDropDown}
                handleOptionClickForCentre={handleOptionClick6}
                setIsHovered={setRegionalManagerHoverIndex}
                isHovered={RegionalManagerHoverIndex}
                style={{ marginTop: "0.1rem" }}
              />{" "}
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={AreaMagangerValue}
                onChange={handleSearchChange7}
                label="Area Maganger"
                options={AreaManagerData?.data}
                isRequired={false}
                showSearchBarDropDown={AreaMagangerDropDown}
                setShowSearchBarDropDown={setAreaMagangerDropDown}
                handleOptionClickForCentre={handleOptionClick7}
                setIsHovered={setAreaMagangerHoverIndex}
                isHovered={AreaMagangerHoverIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={SalesMagangerValue}
                onChange={handleSearchChange8}
                label="Sales Maganger"
                options={SalesManagerData?.data}
                isRequired={false}
                showSearchBarDropDown={SalesMagangerDropDown}
                setShowSearchBarDropDown={setSalesMagangerDropDown}
                handleOptionClickForCentre={handleOptionClick8}
                setIsHovered={setSalesMagangerHoverIndex}
                isHovered={SalesMagangerHoverIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={SalesExcutiveValue}
                onChange={handleSearchChange10}
                label="Sales Excutive"
                options={SalesExData?.data}
                isRequired={false}
                showSearchBarDropDown={SalesExcutiveDropDown}
                setShowSearchBarDropDown={setSalesExcutiveDropDown}
                handleOptionClickForCentre={handleOptionClick10}
                setIsHovered={setSalesExcutiveHoverIndex}
                isHovered={SalesExcutiveHoverIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={ClientValue}
                onChange={handleSearchChange11}
                label="Client"
                options={ClientData?.data}
                isRequired={false}
                showSearchBarDropDown={ClientDropDown}
                setShowSearchBarDropDown={setClientDropDown}
                handleOptionClickForCentre={handleOptionClick11}
                setIsHovered={setClientHoverIndex}
                isHovered={ClientHoverIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <TwoSubmitButton
                options={[
                  {
                    label: "Export PDF",
                    submit: false,
                  },
                  {
                    label: "Export Excel",
                    submit: false,
                  },
                ]}
              />
            </div>
          </form>
          <div style={{ height: "500px" }}>
            <UpdatedDynamicTable
              // rows={Row}
              name="Sales Business Report Details"
              loading={loading}
              extraBr={1}
              tableStyle={{ marginBottom: "-10px" }}
              columns={columns}
              viewKey="Random"
            />
          </div>
        </div>
      </>
    </div>
  );
}
