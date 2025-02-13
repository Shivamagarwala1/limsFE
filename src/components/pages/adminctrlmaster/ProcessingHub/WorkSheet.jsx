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

export default function ResultTrack() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchValue1, setSearchValue1] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [hoveredIndex1, setHoveredIndex1] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [hoveredIndex2, setHoveredIndex2] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [searchValue4, setSearchValue4] = useState("");
  const [showDropdown4, setShowDropdown4] = useState(false);
  const [hoveredIndex4, setHoveredIndex4] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState("");

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
      field: `BookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `Barcode`,
      headerName: `Barcode No.`,
      flex: 1,
    },
    {
      field: `PatientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `AgeGender`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
      //   renderCell: (params) => {
      //     // console.log(params.row)
      //     return (
      //       <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      //         <SubmitButton
      //           submit={false}
      //           text={params?.row?.TestName}
      //           callBack={() => {
      //             // setUserObj(params?.row);
      //           }}
      //           style={{
      //             width: "30px",
      //             fontSize: "0.75rem",
      //             padding: "0px 20px",
      //           }}
      //         />
      //       </div>
      //     );
      //   },
    },
    {
      field: `Centre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `Select All`,
      renderHeaderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onClick={() => {
                setSelectAll(!SelectAll);
              }}
              checked={SelectAll}
            />{" "}
            Select All
          </div>
        );
      },
      headerName: `Select All`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <input type="checkbox" checked={SelectAll} />
          </div>
        );
      },
    },
  ];
  const row = [
    {
      id: 1,
      Centre: "105 - center 1",
      Department: "Nursing",
      PatientName: "John, 50032",
      Barcode: "10993",
      SampleRecDate: "10-02-2025",
      VisitId: "302",
      ApprovedDate: "12-Feb-25",
      SampleType: "Blood",
      Comments: "Lorem Ipsum",
      TestName: "CBC",
      AgeGender: "25/male",
      TransferDate: "15-Feb-2025",
      BookingDate: "11-Feb-2025",
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
    setSearchValue1(e.target.value);
    setShowDropdown1(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setSearchValue1(name);
    setSelectedOption1(name);
    setShowDropdown1(false);
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
    setSearchValue4(e.target.value);
    setShowDropdown4(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick4 = (name, id) => {
    setSearchValue4(name);
    setSelectedOption4(name);
    setShowDropdown4(false);
  };
  const handleSubmit = () => {};

  const statuses = [
    "Collected",
    "Reject",
    "Pending",
    "Tested",
    "Report Hold",
    "Approved",
    "Report Print",
    "Machine Data",
    "Sample-Rerun",
  ];
  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Result Track" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <SearchBarDropdown
                id="search-bar"
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
                  { type: "customDateField", label: "From" },
                  { type: "customDateField", label: "To" },
                ]}
              />

              <div className="flex flex-row gap-2">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={searchValue4}
                  onChange={handleSearchChange4}
                  label="Department"
                  options={[
                    { id: 1, status: "Department 1" },
                    { id: 2, status: "Department 2" },
                    { id: 3, status: "Department 3" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={showDropdown4}
                  setShowSearchBarDropDown={setShowDropdown4}
                  handleOptionClickForCentre={handleOptionClick4}
                  setIsHovered={setHoveredIndex4}
                  isHovered={hoveredIndex4}
                />
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={searchValue1}
                  onChange={handleSearchChange1}
                  label="Test"
                  options={[
                    { id: 1, status: "CBC" },
                    { id: 2, status: "CT Scan" },
                    { id: 3, status: "X ray" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={showDropdown1}
                  setShowSearchBarDropDown={setShowDropdown1}
                  handleOptionClickForCentre={handleOptionClick1}
                  setIsHovered={setHoveredIndex1}
                  isHovered={hoveredIndex1}
                />
              </div>
              <div className="flex flex-row gap-2">
                <InputGenerator
                  inputFields={[{ type: "text", label: "Barcode" }]}
                />
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={searchValue2}
                  onChange={handleSearchChange2}
                  label="Status"
                  options={[
                    { id: 1, status: "Pending" },
                    { id: 2, status: "Tested" },
                    { id: 3, status: "Approved" },
                    { id: 4, status: "Urgent" },
                    { id: 5, status: "Machine Result" },
                  ]}
                  isRequired={false}
                  showSearchBarDropDown={showDropdown2}
                  setShowSearchBarDropDown={setShowDropdown2}
                  handleOptionClickForCentre={handleOptionClick2}
                  setIsHovered={setHoveredIndex2}
                  isHovered={hoveredIndex2}
                />
              </div>
              <TwoSubmitButton
                options={[
                  { label: "Search", submit: false },
                  { label: "Print", submit: false },
                ]}
              />
            </div>
            <LegendButtons
              statuses={statuses}
              callBack={(status) => {
                if (status?.contantName === "Rejected") {
                  console.log("Rejected clicked!");
                } else {
                  console.log(`You clicked on ${status?.contantName}`);
                }
              }}
            />
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="Result Track Details"
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
