import React, { useEffect, useState } from "react";
import InputGenerator, {
  ClickChangeButton,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { FormHeader } from "../../../../Custom Components/FormGenerator";

export default function TATReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");
  // ------------------ Item -------------------------------
  const [ItemValue, setItemValue] = useState("");
  const [ItemDropDown, setItemDropDown] = useState(false);
  const [ItemHoveIndex, setItemHoveIndex] = useState(null);
  const [ItemSelectedOption, setItemSelectedOption] = useState("");

  // ------------------ TatType -------------------------------
  const [TatTypeValue, setTatTypeValue] = useState("");
  const [TatTypeDropDown, setTatTypeDropDown] = useState(false);
  const [TatTypeHoveIndex, setTatTypeHoveIndex] = useState(null);
  const [TatTypeSelectedOption, setTatTypeSelectedOption] = useState("");

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
      field: `VisitId`,
      headerName: `Visit Id`,
      flex: 1,
    },
    {
      field: `PatientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `RefDoc`,
      headerName: `Ref. Doc.`,
      flex: 1,
    },
    {
      field: `Department`,
      headerName: `Department`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `FromCentre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `SampleCollDate`,
      headerName: `Sample Collection Date`,
      flex: 1,
    },
    {
      field: `DepartmentRecieveDate`,
      headerName: `Dep. Rec. Date`,
      flex: 1,
    },
    {
      field: `ResultDate`,
      headerName: `Result Date`,
      flex: 1,
    },
    {
      field: `ApproveDate`,
      headerName: `Approve Date`,
      flex: 1,
    },
    {
      field: `BTOS`,
      headerName: `BTOS`,
      flex: 1,
    },
    {
      field: `STOD`,
      headerName: `STOD`,
      flex: 1,
    },
    {
      field: `DTOR`,
      headerName: `DTOR`,
      flex: 1,
    },
  ];
  const row = [
    {
      id: 1,
      Centre: "105 - center 1",
      Department: "Nursing",
      PatientName: "John Snow",
      Barcode: "10993",
      SampleRecDate: "10-02-2025",
      VisitId: "302",
      ApprovedDate: "12-Feb-25",
      Reading: "Lorem Ipsum",
      DepartmentComment: "Lorem Ipsum",
      Remark: "Lorem Ipsum",
      NotApprovedBy: "Tyron",
      Params: "Alpu",
      RefDoc:"Tyron",
      CollRec: "0",
      RegColl: "0",
      TestName: "CBC",
      AgeGender: "25/male",
      TransferDate: "15-Feb-2025",
      BookingDate: "11-Feb-2025",
      SampleCollDate: "15-Feb-2025",
      DepartmentRecieveDate: "15-Feb-2025",
      ApproveDate: "15-Feb-2025",
      ResultDate: "15-Feb-2025",
      BTOS:"0",
      DTOR:"0",
      STOD:"0",
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
    setDepartmentValue(e.target.value);
    setDepartmentDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setDepartmentValue(name);
    setDepartmentSelectedOption(name);
    setDepartmentDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setItemValue(e.target.value);
    setItemDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setItemValue(name);
    setItemSelectedOption(name);
    setItemDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setTatTypeValue(e.target.value);
    setTatTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick3 = (name, id) => {
    setTatTypeValue(name);
    setTatTypeSelectedOption(name);
    setTatTypeDropDown(false);
  };

  const handleSubmit = () => {};

  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="TAT Report" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <SearchBarDropdown
                id="search-bar"
                name="Centre"
                value={searchValue}
                onChange={handleSearchChange}
                label="Centre"
                options={AllCenterData?.data}
                isRequired={false}
                showSearchBarDropDown={showDropdown}
                showValueField="companyName"
                keyField="centreId"
                setShowSearchBarDropDown={setShowDropdown}
                handleOptionClickForCentre={handleOptionClick}
                setIsHovered={setHoveredIndex}
                isHovered={hoveredIndex}
              />
              <SearchBarDropdown
                id="search-bar"
                name="Department"
                value={DepartmentValue}
                onChange={handleSearchChange1}
                label="Department"
                options={[]}
                isRequired={false}
                showSearchBarDropDown={DepartmentDropDown}
                setShowSearchBarDropDown={setDepartmentDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setDepartmentHoveIndex}
                isHovered={DepartmentHoveIndex}
              />
              <SearchBarDropdown
                id="search-bar"
                name="Item"
                value={ItemValue}
                onChange={handleSearchChange2}
                label="Item"
                options={[]}
                isRequired={false}
                showSearchBarDropDown={ItemDropDown}
                setShowSearchBarDropDown={setItemDropDown}
                handleOptionClickForCentre={handleOptionClick2}
                setIsHovered={setItemHoveIndex}
                isHovered={ItemHoveIndex}
              />
              <SearchBarDropdown
                id="search-bar"
                name="TatType"
                value={TatTypeValue}
                onChange={handleSearchChange3}
                label="TAT Type"
                options={[
                  { id: 1, data: "Select All" },
                  { id: 2, data: "Within TAT" },
                  { id: 3, data: "TAT Failed" },
                ]}
                isRequired={false}
                showSearchBarDropDown={TatTypeDropDown}
                setShowSearchBarDropDown={setTatTypeDropDown}
                handleOptionClickForCentre={handleOptionClick3}
                setIsHovered={setTatTypeHoveIndex}
                isHovered={TatTypeHoveIndex}
              />
               <InputGenerator
                inputFields={[
                  { type: "customDateField", label: "From", name: "from" },
                  { type: "customDateField", label: "To", name: "to" },
                ]}
              />
              <TwoSubmitButton
                options={[
                  { submit: false, label: "Search" },
                  { submit: false, label: "Export to Excel" },
                ]}
              />
               <TwoSubmitButton
                options={[
                  { submit: false, label: "Export to PDF" },
                ]}
              />
            </div>
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="TAT Report Details"
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
