import React, { useEffect, useState } from "react";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
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
import { addRandomObjectId } from "../../../../service/RedendentData";
import { getLocal } from "usehoks";
import toast from "react-hot-toast";
import PopupModal from "../../../../Custom Components/PopupModal";

export default function DrConsultantMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();

  const [CenterId, setCenterId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [TitleValue, setTitleValue] = useState("");
  const [TitleDropDown, setTitleDropDown] = useState(false);
  const [TitleHoveredIndex, setTitleHoveredIndex] = useState(null);
  const [TitleSelectedOption, setTitleSelectedOption] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [hoveredIndex2, setHoveredIndex2] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [DegreeId, setDegreeId] = useState("");
  const [DegreeValue, setDegreeValue] = useState("");
  const [DegreeDropDown, setDegreeDropDown] = useState(false);
  const [DegreeHoverIndex, setDegreeHoverIndex] = useState(null);
  const [DegreeSelectedOption, setDegreeSelectedOption] = useState("");
  const [SpecializationId, setSpecializationId] = useState("");
  const [SpecializationValue, setSpecializationValue] = useState("");
  const [SpecializationDropDown, setSpecializationDropDown] = useState(false);
  const [SpecializationHoverIndex, setSpecializationHoverIndex] =
    useState(null);
  const [SpecializationSelectedOption, setSpecializationSelectedOption] =
    useState("");
  const [ProId, setProId] = useState("");
  const [ProValue, setProValue] = useState("");
  const [ProDropDown, setProDropDown] = useState(false);
  const [ProHoverIndex, setProHoverIndex] = useState(null);
  const [ProSelectedOption, setProSelectedOption] = useState("");
  const [OPDValue, setOPDValue] = useState("Yes");
  const [OPDDropDown, setOPDDropDown] = useState(false);
  const [OPDHoverIndex, setOPDHoverIndex] = useState(null);
  const [OPDSelectedOption, setOPDSelectedOption] = useState("");
  const [SharingId, setSharingId] = useState("");
  const [SharingValue, setSharingValue] = useState("Yes");
  const [SharingDropDown, setSharingDropDown] = useState(false);
  const [SharingHoverIndex, setSharingHoverIndex] = useState(null);
  const [SharingSelectedOption, setSharingSelectedOption] = useState("");

  const [ReferMasterId, setReferMasterId] = useState("");
  const [ReferMasterValue, setReferMasterValue] = useState("Yes");
  const [ReferMasterDropDown, setReferMasterDropDown] = useState(false);
  const [ReferMasterHoverIndex, setReferMasterHoverIndex] = useState(null);
  const [ReferMasterSelectedOption, setReferMasterSelectedOption] =
    useState("");

  const [EmailReportValue, setEmailReportValue] = useState("Yes");
  const [EmailReportDropDown, setEmailReportDropDown] = useState(false);
  const [EmailReportHoverIndex, setEmailReportHoverIndex] = useState(null);
  const [EmailReportSelectedOption, setEmailReportSelectedOption] =
    useState("");

  const [DiscountValue, setDiscountValue] = useState("Yes");
  const [DiscountDropDown, setDiscountDropDown] = useState(false);
  const [DiscountHoverIndex, setDiscountHoverIndex] = useState(null);
  const [DiscountSelectedOption, setDiscountSelectedOption] = useState("");

  const [OnlineLoginValue, setOnlineLoginValue] = useState("Yes");
  const [OnlineLoginDropDown, setOnlineLoginDropDown] = useState(false);
  const [OnlineLoginHoverIndex, setOnlineLoginHoverIndex] = useState(null);
  const [OnlineLoginSelectedOption, setOnlineLoginSelectedOption] =
    useState("");

  const [AllowOPDValue, setAllowOPDValue] = useState("Yes");
  const [AllowOPDDropDown, setAllowOPDDropDown] = useState(false);
  const [AllowOPDHoverIndex, setAllowOPDHoverIndex] = useState(null);
  const [AllowOPDSelectedOption, setAllowOPDSelectedOption] = useState("");
  const [Mobile, setMobile] = useState("");
  const [PinCode, setPinCode] = useState("");

  const { fetchData, response, data, loading } = useGetData();
  const [showPopup, setShowPopup] = useState(false);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [Row, setRow] = useState([]);
  const [SelectAll, setSelectAll] = useState(false);
  const AllCenterData = useGetData();
  const TitleData = useGetData();
  const DegreeData = useGetData();
  const ProData = useGetData();
  const SpecData = useGetData();
  const PostDoctorData = usePostData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1)"
    );
    TitleData?.fetchData(
      "/titleMaster?select=id,title&$filter=(isactive eq 1)"
    );
    SpecData?.fetchData("/DoctorSpecialization");
    DegreeData?.fetchData("/degreeMaster");
    ProData?.fetchData(
      "/empMaster?Select=empId,fName,lName&$filter=(isactive eq 1 and pro eq 1)"
    );
    // console.log(AllCenterData);
  }, []);
  useEffect(() => {
    getReason();
  }, []);
  console.log(SharingValue);
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    {
      field: `imaRegistartionNo`,
      headerName: `Registartion No.`,
      flex: 1,
    },
    {
      field: `title`,
      headerName: `Title`,
      flex: 1,
    },
    {
      field: `doctorName`,
      headerName: `Doctor Name`,
      flex: 1,
    },
    {
      field: `address1`,
      headerName: `Address`,
      flex: 1,
    },
    {
      field: `mobileNo`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    {
      field: `degreeName`,
      headerName: `Degree`,
      flex: 1,
    },
    {
      field: `Action`,
      headerName: `Action`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="w-4 h-4 flex justify-center items-center">
              <FaRegEdit
                className={`w-full h-full 
                  ${
                    params?.row?.isActive === 1
                      ? "text-blue-500 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }
                `}
                onClick={() => {
                  handleFinds(params);
                  setClickedRowId(params?.row);
                  setIsButtonClick(1);
                  setTitleValue(params?.row?.title || "");
                  setMobile(params?.row?.mobileNo || "");
                  setDegreeValue(params?.row?.degreeName || "");
                  setSpecializationValue(params?.row?.specialization || "");
                  setSharingValue(
                    params?.row?.allowsharing == 0 ? "No" : "Yes"
                  );
                  setReferMasterValue(
                    params?.row?.referMasterShare == 0 ? "No" : "Yes"
                  );
                  setOPDValue(params?.row?.opdFee == 0 ? "No" : "Yes");
                  setDiscountValue(params?.row?.discount == 0 ? "No" : "Yes");
                  setAllowOPDValue(params?.row?.allowOPD == 0 ? "No" : "Yes");
                  setOnlineLoginValue(
                    params?.row?.onlineLogin == 0 ? "No" : "Yes"
                  );
                  setEmailReportValue(params?.row?.emailReport);
                  setValues([{ pinCode: params?.row?.pinCode }]);
                  setValues([{ doctorName: params?.row?.doctorName }]);
                  setValues([{ address1: params?.row?.address1 }]);
                  setValues([{ address2: params?.row?.address2 }]);
                  setValues([
                    { imaRegistartionNo: params?.row?.imaRegistartionNo },
                  ]);
                  setValues([{ reportEmail: params?.row?.reportEmail }]);
                  setValues([{ email: params?.row?.email }]);
                  setValues([{ userId: params?.row?.userId }]);
                  setValues([{ password: params?.row?.password }]);
                  setValues([
                    { imaRegistartionNo: params?.row?.imaRegistartionNo },
                  ]);
                  setValues([
                    { imaRegistartionNo: params?.row?.imaRegistartionNo },
                  ]);
                }}
              />
            </button>
            <button
              className={`w-4 h-4 flex justify-center items-center ${
                params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              <ImSwitch
                className="w-full h-full"
                onClick={() => {
                  setClickedRowId(params?.row);
                  setShowPopup(true);
                }}
              />
            </button>
          </div>
        );
      },
    },
  ];

  const handleFinds = async (params) => {
    const filteredCenter = await AllCenterData?.data?.find(
      (item) => item?.centreId == params?.row?.centreID
    );
    const filteredPro = await ProData?.data?.find(
      (item) => item?.empId == params?.row?.proId
    );
    setSearchValue(filteredCenter?.companyName || "");
    setCenterId(params?.row?.centreID || 0);
    setProValue(filteredPro?.fName || "");
    setProId(params?.row?.proId || 0);
  };

  // Function to handle input changes
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick = (name, id) => {
    setCenterId(id);
    setSearchValue(name);
    setSelectedOption(name);
    setShowDropdown(false);
  };
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setTitleValue(e.target.value);
    setTitleDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setTitleValue(name);
    setTitleSelectedOption(name);
    setTitleDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setSearchValue2(e.target.value);
    setShowDropdown2(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setSearchValue2(name);
    setSelectedOption2(name);
    setShowDropdown2(false);
  };
  // Function to handle input changes
  const handleSearchChange4 = (e) => {
    setDegreeValue(e.target.value);
    setDegreeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick4 = (name, id) => {
    setDegreeId(id);
    setDegreeValue(name);
    setDegreeSelectedOption(name);
    setDegreeDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange5 = (e) => {
    setSpecializationValue(e.target.value);
    setSpecializationDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick5 = (name, id) => {
    setSpecializationId(id);
    setSpecializationValue(name);
    setSpecializationSelectedOption(name);
    setSpecializationDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange6 = (e) => {
    setProValue(e.target.value);
    setProDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick6 = (name, id) => {
    setProId(id);
    setProValue(name);
    setProSelectedOption(name);
    setProDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange7 = (e) => {
    setOPDValue(e.target.value);
    setOPDDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick7 = (name, id) => {
    setOPDValue(name);
    setOPDSelectedOption(name);
    setOPDDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange8 = (e) => {
    setSharingValue(e.target.value);
    setSharingDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick8 = (name, id) => {
    setSharingId(id);
    setSharingValue(name);
    setSharingSelectedOption(name);
    setSharingDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange9 = (e) => {
    setReferMasterValue(e.target.value);
    setReferMasterDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick9 = (name, id) => {
    setReferMasterId(id);
    setReferMasterValue(name);
    setReferMasterSelectedOption(name);
    setReferMasterDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange10 = (e) => {
    setEmailReportValue(e.target.value);
    setEmailReportDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick10 = (name, id) => {
    setEmailReportValue(name);
    setEmailReportSelectedOption(name);
    setEmailReportDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange11 = (e) => {
    setDiscountValue(e.target.value);
    setDiscountDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick11 = (name, id) => {
    setDiscountValue(name);
    setDiscountSelectedOption(name);
    setDiscountDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange12 = (e) => {
    setOnlineLoginValue(e.target.value);
    setOnlineLoginDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick12 = (name, id) => {
    setOnlineLoginValue(name);
    setOnlineLoginSelectedOption(name);
    setOnlineLoginDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange13 = (e) => {
    setAllowOPDValue(e.target.value);
    setAllowOPDDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick13 = (name, id) => {
    setAllowOPDValue(name);
    setAllowOPDSelectedOption(name);
    setAllowOPDDropDown(false);
  };

  const getReason = async () => {
    const get = await fetchData("/doctorReferalMaster");
    setRow(addRandomObjectId(get?.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = getValues();
    console.log(values);
    const payload =
      isButtonClick == 0
        ? {
            ...values,
            isActive: 1,
            mobileNo: Mobile.toString(),
            pinCode: PinCode,
            createdById: parseInt(lsData?.user?.employeeId),
            createdDateTime: new Date().toISOString(),
            title: TitleValue,
            degreeId: DegreeId,
            degreeName: DegreeValue,
            specializationID: SpecializationId,
            specialization: SpecializationValue,
            allowsharing: SharingId == "Yes" ? 1 : 0,
            referMasterShare: ReferMasterValue == "Yes" ? 1 : 0,
            proId: ProId,
            centreID: CenterId,
            emailReport: EmailReportValue,
            opdFee: parseInt(values?.opdFee),
            type: OPDValue == "Yes" ? 1 : 0,
            discount: DiscountValue == "Yes" ? 1 : 0,
            allowOPD: AllowOPDValue == "Yes" ? 1 : 0,
            onlineLogin: OnlineLoginValue == "Yes" ? 1 : 0,
          }
        : {
            ...clickedRowId,
            ...values,
            mobileNo: Mobile.toString(),
            pinCode: PinCode,
            updateById: parseInt(lsData?.user?.employeeId),
            updateDateTime: new Date().toISOString(),
            title: TitleValue,
            degreeId: DegreeId,
            degreeName: DegreeValue,
            specializationID: SpecializationId,
            specialization: SpecializationValue,
            allowsharing: SharingId == "Yes" ? 1 : 0,
            referMasterShare: ReferMasterValue == "Yes" ? 1 : 0,
            proId: ProId,
            centreID: CenterId,
            emailReport: EmailReportValue,
            opdFee: parseInt(values?.opdFee),
            type: OPDValue == "Yes" ? 1 : 0,
            discount: DiscountValue == "Yes" ? 1 : 0,
            allowOPD: AllowOPDValue == "Yes" ? 1 : 0,
            onlineLogin: OnlineLoginValue == "Yes" ? 1 : 0,
          };
    try {
      const response = await PostDoctorData?.postRequest(
        `/doctorReferalMaster/SaveUpdateReferDoctor`,
        payload
      );
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
          <FormHeader title="Dr Consultant Master" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-2 mx-1 lg:mx-2">
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={TitleValue}
                onChange={handleSearchChange1}
                label="Title"
                options={TitleData?.data}
                isRequired={false}
                showSearchBarDropDown={TitleDropDown}
                setShowSearchBarDropDown={setTitleDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setTitleHoveredIndex}
                isHovered={TitleHoveredIndex}
                style={{ marginTop: "0.1rem", marginBottom: "0px" }}
              />
              <InputGenerator
                inputFields={[
                  { type: "text", label: "Doctor Name", name: "doctorName" },
                ]}
              />
              <SearchBarDropdown
                name="search"
                value={searchValue}
                onChange={handleSearchChange}
                label="Centre"
                options={AllCenterData?.data}
                activeTheme={{ subMenuColor: "#f0f0f0" }} // Pass your theme object
                isRequired={false}
                showSearchBarDropDown={showDropdown}
                showValueField="companyName"
                keyField="centreId"
                setShowSearchBarDropDown={setShowDropdown}
                handleOptionClickForCentre={handleOptionClick}
                setIsHovered={setHoveredIndex}
                isHovered={hoveredIndex}
                style={{ marginTop: "0.1rem", marginBottom: "0px" }}
              />
              <InputGenerator
                inputFields={[
                  { type: "text", label: "Address", name: "address1" },
                  {
                    type: "number",
                    label: "Mobile No.",
                    name: "mobileNo",
                    maxLength: 10,
                    value: Mobile,
                    onChange: (e) => {
                      setMobile(e);
                    },
                  },
                  {
                    type: "number",
                    label: "Pin Code",
                    name: "pinCode",
                    maxLength: 6,
                    value: PinCode,
                    onChange: (e) => {
                      setPinCode(e);
                    },
                  },
                  {
                    type: "number",
                    label: "Registeration Number",
                    name: "imaRegistartionNo",
                  },
                ]}
              />
              {/* <div className="flex flex-row gap-1"> */}
              <InputGenerator
                inputFields={[
                  { type: "email", label: "Email", name: "email" },
                  {
                    type: "email",
                    label: "Report Mail",
                    name: "reportEmail",
                  },
                ]}
              />
              {/* </div> */}
              <InputGenerator
                inputFields={[
                  {
                    type: "text",
                    label: "Clinic Address",
                    name: "address2",
                  },
                ]}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={DegreeValue}
                onChange={handleSearchChange4}
                label="Degree"
                options={DegreeData?.data}
                isRequired={false}
                showSearchBarDropDown={DegreeDropDown}
                setShowSearchBarDropDown={setDegreeDropDown}
                handleOptionClickForCentre={handleOptionClick4}
                setIsHovered={setDegreeHoverIndex}
                isHovered={DegreeHoverIndex}
                style={{ marginTop: "0.1rem", marginBottom: "0px" }}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={SpecializationValue}
                onChange={handleSearchChange5}
                label="Specialization"
                options={SpecData?.data}
                isRequired={false}
                showSearchBarDropDown={SpecializationDropDown}
                setShowSearchBarDropDown={setSpecializationDropDown}
                handleOptionClickForCentre={handleOptionClick5}
                setIsHovered={setSpecializationHoverIndex}
                isHovered={SpecializationHoverIndex}
                style={{ marginTop: "0.1rem", marginBottom: "0px" }}
              />
              <div className="flex flex-row gap-1">
                <InputGenerator
                  inputFields={[
                    { type: "text", label: "UserId", name: "userId" },
                    { type: "password", label: "Password", name: "password" },
                  ]}
                />
              </div>
              <div className="flex flex-row gap-1">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={ProValue}
                  onChange={handleSearchChange6}
                  label="PRO"
                  options={ProData?.data}
                  isRequired={false}
                  showSearchBarDropDown={ProDropDown}
                  setShowSearchBarDropDown={setProDropDown}
                  handleOptionClickForCentre={handleOptionClick6}
                  setIsHovered={setProHoverIndex}
                  isHovered={ProHoverIndex}
                  style={{ marginTop: "0.1rem" }}
                />{" "}
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={OPDValue}
                  onChange={handleSearchChange7}
                  label="OPD Fee"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 0, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={OPDDropDown}
                  setShowSearchBarDropDown={setOPDDropDown}
                  handleOptionClickForCentre={handleOptionClick7}
                  setIsHovered={setOPDHoverIndex}
                  isHovered={OPDHoverIndex}
                  style={{ marginTop: "0.1rem" }}
                />
              </div>
              <div className="flex flex-row gap-1">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={SharingValue}
                  onChange={handleSearchChange8}
                  label="Allow Sharing"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 0, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={SharingDropDown}
                  setShowSearchBarDropDown={setSharingDropDown}
                  handleOptionClickForCentre={handleOptionClick8}
                  setIsHovered={setSharingHoverIndex}
                  isHovered={SharingHoverIndex}
                  style={{ marginTop: "0.1rem" }}
                />
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={EmailReportValue}
                  onChange={handleSearchChange10}
                  label="Email Report"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 0, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={EmailReportDropDown}
                  setShowSearchBarDropDown={setEmailReportDropDown}
                  handleOptionClickForCentre={handleOptionClick10}
                  setIsHovered={setEmailReportHoverIndex}
                  isHovered={EmailReportHoverIndex}
                  style={{ marginTop: "0.1rem" }}
                />
              </div>
              <div className="flex flex-row gap-1">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={DiscountValue}
                  onChange={handleSearchChange11}
                  label="Discount"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 0, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={DiscountDropDown}
                  setShowSearchBarDropDown={setDiscountDropDown}
                  handleOptionClickForCentre={handleOptionClick11}
                  setIsHovered={setDiscountHoverIndex}
                  isHovered={DiscountHoverIndex}
                  style={{ marginTop: "0.1rem" }}
                />
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={OnlineLoginValue}
                  onChange={handleSearchChange12}
                  label="Online Login"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 0, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={OnlineLoginDropDown}
                  setShowSearchBarDropDown={setOnlineLoginDropDown}
                  handleOptionClickForCentre={handleOptionClick12}
                  setIsHovered={setOnlineLoginHoverIndex}
                  isHovered={OnlineLoginHoverIndex}
                  style={{ marginTop: "0.1rem" }}
                />
              </div>

              <div className="flex flex-row gap-1">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={ReferMasterValue}
                  onChange={handleSearchChange9}
                  label="Refer Master Share"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 0, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={ReferMasterDropDown}
                  setShowSearchBarDropDown={setReferMasterDropDown}
                  handleOptionClickForCentre={handleOptionClick9}
                  setIsHovered={setReferMasterHoverIndex}
                  isHovered={ReferMasterHoverIndex}
                  style={{ marginTop: "0.1rem" }}
                />
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={AllowOPDValue}
                  onChange={handleSearchChange13}
                  label="Allow OPD"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 0, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={AllowOPDDropDown}
                  setShowSearchBarDropDown={setAllowOPDDropDown}
                  handleOptionClickForCentre={handleOptionClick13}
                  setIsHovered={setAllowOPDHoverIndex}
                  isHovered={AllowOPDHoverIndex}
                  style={{ marginTop: "0.1rem" }}
                />
              </div>
              <div className="flex flex-row gap-1">
                <InputGenerator
                  inputFields={[
                    { type: "text", label: "OPD Rate", name: "opdFee" },
                  ]}
                />
                <SubmitButton
                  text={isButtonClick == 0 ? "Save" : "Update"}
                  submit={true}
                  style={{ width: "100px" }}
                />
              </div>
            </div>
          </form>
          <div style={{ height: "500px" }}>
            <UpdatedDynamicTable
              rows={Row}
              name="Consultant Details"
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
