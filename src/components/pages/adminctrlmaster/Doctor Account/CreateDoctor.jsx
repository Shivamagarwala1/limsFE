import React, { useEffect, useState } from "react";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";

export default function CreateDoctor() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
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
  const [DegreeValue, setDegreeValue] = useState("");
  const [DegreeDropDown, setDegreeDropDown] = useState(false);
  const [DegreeHoverIndex, setDegreeHoverIndex] = useState(null);
  const [DegreeSelectedOption, setDegreeSelectedOption] = useState("");
  const [SpecializationValue, setSpecializationValue] = useState("");
  const [SpecializationDropDown, setSpecializationDropDown] = useState(false);
  const [SpecializationHoverIndex, setSpecializationHoverIndex] =
    useState(null);
  const [SpecializationSelectedOption, setSpecializationSelectedOption] =
    useState("");
  const [ProValue, setProValue] = useState("");
  const [ProDropDown, setProDropDown] = useState(false);
  const [ProHoverIndex, setProHoverIndex] = useState(null);
  const [ProSelectedOption, setProSelectedOption] = useState("");
  const [OPDValue, setOPDValue] = useState("");
  const [OPDDropDown, setOPDDropDown] = useState(false);
  const [OPDHoverIndex, setOPDHoverIndex] = useState(null);
  const [OPDSelectedOption, setOPDSelectedOption] = useState("");
  const [SharingValue, setSharingValue] = useState("");
  const [SharingDropDown, setSharingDropDown] = useState(false);
  const [SharingHoverIndex, setSharingHoverIndex] = useState(null);
  const [SharingSelectedOption, setSharingSelectedOption] = useState("");

  const [ReferMasterValue, setReferMasterValue] = useState("");
  const [ReferMasterDropDown, setReferMasterDropDown] = useState(false);
  const [ReferMasterHoverIndex, setReferMasterHoverIndex] = useState(null);
  const [ReferMasterSelectedOption, setReferMasterSelectedOption] =
    useState("");

  const [EmailReportValue, setEmailReportValue] = useState("");
  const [EmailReportDropDown, setEmailReportDropDown] = useState(false);
  const [EmailReportHoverIndex, setEmailReportHoverIndex] = useState(null);
  const [EmailReportSelectedOption, setEmailReportSelectedOption] =
    useState("");

  const [DiscountValue, setDiscountValue] = useState("");
  const [DiscountDropDown, setDiscountDropDown] = useState(false);
  const [DiscountHoverIndex, setDiscountHoverIndex] = useState(null);
  const [DiscountSelectedOption, setDiscountSelectedOption] = useState("");

  const [OnlineLoginValue, setOnlineLoginValue] = useState("");
  const [OnlineLoginDropDown, setOnlineLoginDropDown] = useState(false);
  const [OnlineLoginHoverIndex, setOnlineLoginHoverIndex] = useState(null);
  const [OnlineLoginSelectedOption, setOnlineLoginSelectedOption] =
    useState("");

  const [AllowOPDValue, setAllowOPDValue] = useState("");
  const [AllowOPDDropDown, setAllowOPDDropDown] = useState(false);
  const [AllowOPDHoverIndex, setAllowOPDHoverIndex] = useState(null);
  const [AllowOPDSelectedOption, setAllowOPDSelectedOption] = useState("");

  const [SelectAll, setSelectAll] = useState(false);
  const AllCenterData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },

    {
      field: `Title`,
      headerName: `Title`,
      flex: 1,
    },
    {
      field: `DoctorName`,
      headerName: `Doctor Name`,
      flex: 1,
    },
    {
      field: `Address`,
      headerName: `Address`,
      flex: 1,
    },
    {
      field: `MobileNo`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    {
      field: `PRO`,
      headerName: `PRO`,
      flex: 1,
    },
    {
      field: `Email`,
      headerName: `Email`,
      flex: 1,
    },
    {
      field: `Degree`,
      headerName: `Degree`,
      flex: 1,
    },
    {
      field: `UserId`,
      headerName: `User Id`,
      flex: 1,
    },
    {
      field: `Active`,
      headerName: `Active`,
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
                    className={`w-full h-full ${
                      params?.row?.isActive === 1
                        ? "text-blue-500 cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (params?.row?.isActive === 1) {
                      }
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
                    }}
                  />
                </button>
              </div>
            );
          },
      },
   
  ];
  const row = [
    {
      id: 1,
      Email: "temp@gmail.com",
      Department: "Nursing",
      DoctorName: "John, 50032",
      Address: "Sector 21 Delhi",
      SampleRecDate: "10-02-2025",
      VisitId: "302",
      ApprovedDate: "12-Feb-25",
      SampleType: "Blood",
      Degree: "MBBS",
      UserId:"user101",
      Active:"Yes",
      PRO: "Emidas Team",
      MobileNo: "9999999912",
      TransferDate: "15-Feb-2025",
      Title: "Mr.",
      ToCentre: "New-Delhi",
      FromCentre: "Ayodhya",
    },
  ];

  // Function to handle input changes
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick = (name, id) => {
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
  const handleSubmit = () => {};

  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Create Doctor" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={TitleValue}
                onChange={handleSearchChange1}
                label="Title"
                options={
                  [
                    // { id: 1, status: "CBC" },
                    // { id: 2, status: "CT Scan" },
                    // { id: 3, status: "X ray" },
                  ]
                }
                isRequired={false}
                showSearchBarDropDown={TitleDropDown}
                setShowSearchBarDropDown={setTitleDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setTitleHoveredIndex}
                isHovered={TitleHoveredIndex}
              />
              <InputGenerator
                inputFields={[
                  { type: "text", label: "Doctor Name", name: "DoctorName" },
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
              />
              <InputGenerator
                inputFields={[
                  { type: "text", label: "Address", name: "Address" },
                  { type: "number", label: "Mobile No.", name: "MobileNo" },
                  { type: "number", label: "Pin Code", name: "PinCode" },
                  {
                    type: "number",
                    label: "Registeration Number",
                    name: "RegisterationNumber",
                  },
                  
                ]}
              />
              <div className="flex flex-row gap-2">
                <InputGenerator
                  inputFields={[
                    { type: "email", label: "Email", name: "Email" },
                    { type: "email", label: "Report Mail", name: "ReportMail" },
                  ]}
                />
              </div>
              <InputGenerator inputFields={[{
                    type: "text",
                    label: "Clinic Address",
                    name: "ClinicAddress",
                  },]} />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={DegreeValue}
                onChange={handleSearchChange4}
                label="Degree"
                options={
                  [
                    // { id: 1, status: "Department 1" },
                    // { id: 2, status: "Department 2" },
                    // { id: 3, status: "Department 3" },
                  ]
                }
                isRequired={false}
                showSearchBarDropDown={DegreeDropDown}
                setShowSearchBarDropDown={setDegreeDropDown}
                handleOptionClickForCentre={handleOptionClick4}
                setIsHovered={setDegreeHoverIndex}
                isHovered={DegreeHoverIndex}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={SpecializationValue}
                onChange={handleSearchChange5}
                label="Specialization"
                options={
                  [
                    // { id: 1, status: "CBC" },
                    // { id: 2, status: "CT Scan" },
                    // { id: 3, status: "X ray" },
                  ]
                }
                isRequired={false}
                showSearchBarDropDown={SpecializationDropDown}
                setShowSearchBarDropDown={setSpecializationDropDown}
                handleOptionClickForCentre={handleOptionClick5}
                setIsHovered={setSpecializationHoverIndex}
                isHovered={SpecializationHoverIndex}
              />
              <div className="flex flex-row gap-2">
                <InputGenerator
                  inputFields={[
                    { type: "text", label: "UserId", name: "userId" },
                    { type: "password", label: "Password", name: "Password" },
                  ]}
                />
              </div>
              <div className="flex flex-row gap-2">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={ProValue}
                  onChange={handleSearchChange6}
                  label="PRO"
                  options={
                    [
                      // { id: 1, status: "CBC" },
                      // { id: 2, status: "CT Scan" },
                      // { id: 3, status: "X ray" },
                    ]
                  }
                  isRequired={false}
                  showSearchBarDropDown={ProDropDown}
                  setShowSearchBarDropDown={setProDropDown}
                  handleOptionClickForCentre={handleOptionClick6}
                  setIsHovered={setProHoverIndex}
                  isHovered={ProHoverIndex}
                />{" "}
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={OPDValue}
                  onChange={handleSearchChange7}
                  label="OPD Fee"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 2, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={OPDDropDown}
                  setShowSearchBarDropDown={setOPDDropDown}
                  handleOptionClickForCentre={handleOptionClick7}
                  setIsHovered={setOPDHoverIndex}
                  isHovered={OPDHoverIndex}
                />
              </div>
              <div className="flex flex-row gap-2">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={SharingValue}
                  onChange={handleSearchChange8}
                  label="Allow Sharing"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 2, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={SharingDropDown}
                  setShowSearchBarDropDown={setSharingDropDown}
                  handleOptionClickForCentre={handleOptionClick8}
                  setIsHovered={setSharingHoverIndex}
                  isHovered={SharingHoverIndex}
                />
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={EmailReportValue}
                  onChange={handleSearchChange10}
                  label="Email Report"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 2, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={EmailReportDropDown}
                  setShowSearchBarDropDown={setEmailReportDropDown}
                  handleOptionClickForCentre={handleOptionClick10}
                  setIsHovered={setEmailReportHoverIndex}
                  isHovered={EmailReportHoverIndex}
                />
              </div>
              <div className="flex flex-row gap-2">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={DiscountValue}
                  onChange={handleSearchChange11}
                  label="Discount"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 2, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={DiscountDropDown}
                  setShowSearchBarDropDown={setDiscountDropDown}
                  handleOptionClickForCentre={handleOptionClick11}
                  setIsHovered={setDiscountHoverIndex}
                  isHovered={DiscountHoverIndex}
                />
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={OnlineLoginValue}
                  onChange={handleSearchChange12}
                  label="Online Login"
                  options={[
                    { id: 1, data: "Yes" },
                    { id: 2, data: "No" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={OnlineLoginDropDown}
                  setShowSearchBarDropDown={setOnlineLoginDropDown}
                  handleOptionClickForCentre={handleOptionClick12}
                  setIsHovered={setOnlineLoginHoverIndex}
                  isHovered={OnlineLoginHoverIndex}
                />
              </div>
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={ReferMasterValue}
                onChange={handleSearchChange9}
                label="Refer Master Share"
                options={[
                  { id: 1, data: "Yes" },
                  { id: 2, data: "No" },
                ]}
                isRequired={false}
                showSearchBarDropDown={ReferMasterDropDown}
                setShowSearchBarDropDown={setReferMasterDropDown}
                handleOptionClickForCentre={handleOptionClick9}
                setIsHovered={setReferMasterHoverIndex}
                isHovered={ReferMasterHoverIndex}
              />
              <SearchBarDropdown
                id="search-bar"
                name="search"
                value={AllowOPDValue}
                onChange={handleSearchChange13}
                label="Allow OPD"
                options={[
                  { id: 1, data: "Yes" },
                  { id: 2, data: "No" },
                ]}
                isRequired={false}
                showSearchBarDropDown={AllowOPDDropDown}
                setShowSearchBarDropDown={setAllowOPDDropDown}
                handleOptionClickForCentre={handleOptionClick13}
                setIsHovered={setAllowOPDHoverIndex}
                isHovered={AllowOPDHoverIndex}
              />
              <SubmitButton
               text={'Save'} submit={false}
              />
            </div>
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="Create Doctor Details"
              //   loading={loading}
              tableStyle={{ marginBottom: "-10px" }}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div>
        </div>
      </>
    </div>
  );
}
