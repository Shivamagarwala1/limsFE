import React, { useEffect, useState } from "react";
import DynamicTable from "../../../Custom Components/DynamicTable";
import InputGenerator, {
  ClickChangeButton,
  SubmitButton,
  TwoSubmitButton,
} from "../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../Custom Components/useFormHandler";
import { useGetData } from "../../../service/apiService";
import { FormHeader } from "../../../Custom Components/FormGenerator";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { LegendButtons } from "../../../Custom Components/LegendButtons";

export default function TATMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [MachineValue, setMachineValue] = useState("");
  const [MachineDropDown, setMachineDropDown] = useState(false);
  const [MachineHoveIndex, setMachineHoveIndex] = useState(null);
  const [MachineSelectedOption, setMachineSelectedOption] = useState("");
  // ------------------ Register -------------------------------
  const [RegisterValue, setRegisterValue] = useState("");
  const [RegisterDropDown, setRegisterDropDown] = useState(false);
  const [RegisterHoveIndex, setRegisterHoveIndex] = useState(null);
  const [RegisterSelectedOption, setRegisterSelectedOption] = useState("");

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
      field: `StartTime`,
      headerName: `Start Time`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator
              inputFields={[{ type: "time", name: "startTime" }]}
            />
          </div>
        );
      },
    },
    {
      field: `EndTime`,
      headerName: `End Time`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator inputFields={[{ type: "time", name: "endTime" }]} />
          </div>
        );
      },
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `RegColl`,
      headerName: `Reg. Coll.`,
      flex: 1,
    },
    {
      field: `CollRec`,
      headerName: `Coll. Rec.`,
      flex: 1,
    },
    // {
    //   field: `TatType`,
    //   headerName: `Params`,
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
    //         <InputGenerator
    //           inputFields={[
    //             {
    //               type: "select",
    //               dataOptions: [
    //                 { id: 1, data: "Mins" },
    //                 { id: 2, data: "Days" },
    //               ],
    //               name: "endTime",
    //             },
    //           ]}
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      field: `Mins`,
      headerName: `Mins`,
      flex: 1,  
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator inputFields={[{ type: "number", name: "mins" }]} />
          </div>
        );
      },
    },
    {
      field: `Days`,
      headerName: `Days`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator inputFields={[{ type: "number", name: "days" }]} />
          </div>
        );
      },
    },
    {
      field: `Week`,
      headerName: `Week Days`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params.row)
        return (
          <div style={{ display: "flex", gap: "3px", fontSize: "15px" }}>
            <ClickChangeButton
              submit={false}
              text={"Sun"}
              style={{ width: "40px", fontSize: "0.75rem", height: "20px" }}
            />
            <ClickChangeButton
              submit={false}
              text={"Mon"}
              style={{ width: "40px", fontSize: "0.75rem", height: "20px" }}
            />
            <ClickChangeButton
              submit={false}
              text={"Tue"}
              style={{ width: "40px", fontSize: "0.75rem", height: "20px" }}
            />
            <ClickChangeButton
              submit={false}
              text={"Wed"}
              style={{ width: "40px", fontSize: "0.75rem", height: "20px" }}
            />
            <ClickChangeButton
              submit={false}
              text={"Thu"}
              style={{ width: "40px", fontSize: "0.75rem", height: "20px" }}
            />
            <ClickChangeButton
              submit={false}
              text={"Fri"}
              style={{ width: "40px", fontSize: "0.75rem", height: "20px" }}
            />
            <ClickChangeButton
              submit={false}
              text={"Sat"}
              style={{ width: "40px", fontSize: "0.75rem", height: "20px" }}
            />
          </div>
        );
      },
    },
    {
      field: `Select`,
      headerName: `Select`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
           <input type="checkbox" />
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
      PatientName: "John Snow",
      Barcode: "10993",
      SampleRecDate: "10-02-2025",
      VisitId: "302",
      ApprovedDate: "12-Feb-25",
      Reading: "Lorem Ipsum",
      MachineComment: "Lorem Ipsum",
      Remark: "Lorem Ipsum",
      NotApprovedBy: "Tyron",
      Machine: "Machine 1",
      Params: "Alpu",
      CollRec:"0",
      RegColl:"0",
      TestName: "CBC",
      AgeGender: "25/male",
      TransferDate: "15-Feb-2025",
      Date: "11-Feb-2025",
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
    setMachineValue(e.target.value);
    setMachineDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setMachineValue(name);
    setMachineSelectedOption(name);
    setMachineDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setRegisterValue(e.target.value);
    setRegisterDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setRegisterValue(name);
    setRegisterSelectedOption(name);
    setRegisterDropDown(false);
  };

  const handleSubmit = () => {};

  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="TAT Master" />
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
                name="Machine"
                value={MachineValue}
                onChange={handleSearchChange1}
                label="Machine"
                options={[]}
                isRequired={false}
                showSearchBarDropDown={MachineDropDown}
                setShowSearchBarDropDown={setMachineDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setMachineHoveIndex}
                isHovered={MachineHoveIndex}
              />
              <SearchBarDropdown
                id="search-bar"
                name="Register"
                value={RegisterValue}
                onChange={handleSearchChange2}
                label="Sample Not Register"
                options={[
                  { id: 1, data: "Yes" },
                  { id: 2, data: "No" },
                ]}
                isRequired={false}
                showSearchBarDropDown={RegisterDropDown}
                setShowSearchBarDropDown={setRegisterDropDown}
                handleOptionClickForCentre={handleOptionClick2}
                setIsHovered={setRegisterHoveIndex}
                isHovered={RegisterHoveIndex}
              />
              <TwoSubmitButton
                options={[
                  { submit: false, label: "Search" },
                  { submit: false, label: "Save" },
                ]}
              />
            </div>
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="TAT Master Details"
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
