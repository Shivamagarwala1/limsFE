import React, { useEffect, useState } from "react";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";

export default function AmendmentReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  
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
      field: `VisitId`,
      headerName: `Visit Id`,
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
      field: `OldValue`,
      headerName: `Old Value`,
      flex: 1,
    },
    {
      field: `CurrValue`,
      headerName: `Current Value`,
      flex: 1,
    },
    {
      field: `NotApprovedBy`,
      headerName: `Not Approved By`,
      flex: 1,
    }
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
      SampleType: "Blood",
      OldValue: "Lorem Ipsum",
      CurrValue: "Lorem Ipsum",
      NotApprovedBy: "Tyron",
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

  const handleSubmit = () => {};

  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Amendment Report" />
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
              <SubmitButton submit={false} text={"Search"} />
            </div>
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="Amendment Report Details"
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
