import React, { useEffect, useState } from "react";
import InputGenerator, {
  ClickChangeButton,
  getFormattedDate,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addObjectId,
  downloadExcel,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";

export default function TATReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const todayDate = getFormattedDate();

  const [fromDate, setFromDate] = useState(todayDate);
  const [toDate, setToDate] = useState(todayDate);

  const [row, setRow] = useState([]);
  const [CenterId, setCenterId] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [DepartmentId, setDepartmentId] = useState(0);
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");
  // ------------------ Item -------------------------------
  const [ItemId, setItemId] = useState(0);
  const [ItemValue, setItemValue] = useState("");
  const [ItemDropDown, setItemDropDown] = useState(false);
  const [ItemHoveIndex, setItemHoveIndex] = useState(null);
  const [ItemSelectedOption, setItemSelectedOption] = useState("");

  // ------------------ TatType -------------------------------
  const [TatId, setTatId] = useState(1);
  const [TatTypeValue, setTatTypeValue] = useState("");
  const [TatTypeDropDown, setTatTypeDropDown] = useState(false);
  const [TatTypeHoveIndex, setTatTypeHoveIndex] = useState(null);
  const [TatTypeSelectedOption, setTatTypeSelectedOption] = useState("");

  const [SelectAll, setSelectAll] = useState(false);
  const AllCenterData = useGetData();
  const GridData = useGetData();
  const DepartmentData = useGetData();
  const TestData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    DepartmentData?.fetchData(
      "/labDepartment?select=id,deptname&$orderby=printSequence"
    );
    TestData?.fetchData(
      `/itemMaster?select=itemId,ItemName&$filter=(deptId eq ${DepartmentId})&$OrderBy=itemName`
    );
    // console.log(AllCenterData);
  }, [DepartmentId]);
  const handleSearch = () => {
    GridData?.fetchData(
      `/tnx_Booking/TatReport?FromDate=${fromDate}&ToDate=${toDate}&centreId=${CenterId}&departmentId=${DepartmentId}&itemid=${ItemId}&TatType=${TatId}`
    );
  };
  useEffect(() => {
    const row = addObjectId(GridData?.data?.data || []);
    setRow(row);
  }, [GridData?.data]);

  const ExportPdf = () => {
    ViewOrDownloandPDF(
      `/tnx_Booking/TatReportpdf?FromDate=${fromDate}&ToDate=${toDate}&centreId=${CenterId}&departmentId=${DepartmentId}&itemid=${ItemId}&TatType=${TatId}`
    );
  };
  const ExportExcel = () => {
    downloadExcel(
      `/tnx_Booking/TatReportExcel?FromDate=${fromDate}&ToDate=${toDate}&centreId=${CenterId}&departmentId=${DepartmentId}&itemid=${ItemId}&TatType=${TatId}`,
      "Tat Report"
    );
  };
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `bookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `workorderId`,
      headerName: `Visit Id`,
      flex: 1,
    },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `testName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `refDoctor`,
      headerName: `Ref. Doc.`,
      flex: 1,
    },
    {
      field: `department`,
      headerName: `Department`,
      flex: 1,
    },
    {
      field: `centreName`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `sampleCollectionDate`,
      headerName: `Sample Collection Date`,
      flex: 1,
    },
    {
      field: `sampleReceivedDate`,
      headerName: `Dep. Rec. Date`,
      flex: 1,
    },
    {
      field: `resultDate`,
      headerName: `Result Date`,
      flex: 1,
    },
    {
      field: `approveDate`,
      headerName: `Approve Date`,
      flex: 1,
    },
    {
      field: `btos`,
      headerName: `BTOS`,
      flex: 1,
    },
    {
      field: `stod`,
      headerName: `STOD`,
      flex: 1,
    },
    {
      field: `dtor`,
      headerName: `DTOR`,
      flex: 1,
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
    setCenterId(id);
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
    setDepartmentId(id);
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
    setItemId(id);
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
    setTatId(id);
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
            <div className="flex flex-row gap-2">
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
                options={DepartmentData?.data}
                isRequired={false}
                showSearchBarDropDown={DepartmentDropDown}
                setShowSearchBarDropDown={setDepartmentDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setDepartmentHoveIndex}
                isHovered={DepartmentHoveIndex}
              />
              </div>
              <div className="flex flex-row gap-2">
                <SearchBarDropdown
                  id="search-bar"
                  name="Item"
                  value={ItemValue}
                  onChange={handleSearchChange2}
                  label="Item"
                  options={TestData?.data}
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
              </div>
              {/* <div className="flex flex-row gap-2"> */}
                <InputGenerator
                  inputFields={[
                    {
                      type: "customDateField",
                      label: "From",
                      name: "from",
                      customOnChange: (e) => {
                        setFromDate(e);
                      },
                    },
                    {
                      type: "customDateField",
                      label: "To",
                      name: "to",
                      customOnChange: (e) => {
                        setToDate(e);
                      },
                    },
                  ]}
                />
              {/* </div> */}
              <TwoSubmitButton
                options={[
                  {
                    submit: false,
                    label: "Search",
                    callBack: () => {
                      handleSearch();
                    },
                  },
                  {
                    submit: false,
                    label: "Export to Excel",
                    callBack: () => {
                      ExportExcel();
                    },
                  },
                ]}
              />
              <TwoSubmitButton
                options={[
                  {
                    submit: false,
                    label: "Export to PDF",
                    callBack: () => {
                      ExportPdf();
                    },
                  },
                ]}
              />
            </div>
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row || []}
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
