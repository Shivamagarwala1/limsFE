import React, { useEffect, useState } from "react";
import DynamicTable from "../../../../Custom Components/DynamicTable";
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
import {
  addObjectId,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";
import { getLocal } from "usehoks";

const CheckboxInputCell = ({
  params,
  setTestIds,
  TestIds,
  SelectAll1,
  CheckboxDisable,
}) => {
  const [enabled, setEnabled] = useState(false);
  // console.log(TestIds);
  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      {SelectAll1 ? (
        <input
          type="checkbox"
          disabled={CheckboxDisable}
          checked={SelectAll1}
        />
      ) : (
        <input
          type="checkbox"
          disabled={CheckboxDisable}
          onClick={() =>
            setTestIds(
              (prev) =>
                prev.some((item) => item.id === params?.row.id)
                  ? prev.filter((item) => item.id !== params?.row.id) // Remove if exists
                  : [...prev, { ...params?.row }] // Add if not
            )
          }
        />
      )}
    </div>
  );
};

export default function WorkSheet() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const lsData = getLocal("imarsar_laboratory");

  const todayDate = getFormattedDate();
  const [row, setRow] = useState([]);
  const [TestIds, setTestIds] = useState([]);
  const [fromDate, setFromDate] = useState(todayDate);
  const [toDate, setToDate] = useState(todayDate);
  const [searchId, setSearchId] = useState(1);
  const [searchValue, setSearchValue] = useState(
    "GENERIC DIAGNOSTIC PVT. LTD."
  );
  const [CheckboxDisable, setCheckboxDisable] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [ItemId, setItemId] = useState(0);
  const [searchValue1, setSearchValue1] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [hoveredIndex1, setHoveredIndex1] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [Barcode, setBarcode] = useState("");
  const [StatusId, setStatusId] = useState("");
  const [searchValue2, setSearchValue2] = useState("Pending");
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [hoveredIndex2, setHoveredIndex2] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [DepartmentId, setDepartmentId] = useState(0);
  const [searchValue4, setSearchValue4] = useState("");
  const [showDropdown4, setShowDropdown4] = useState(false);
  const [hoveredIndex4, setHoveredIndex4] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState("");

  const [SelectAll1, setSelectAll1] = useState(false);
  const [SelectAll, setSelectAll] = useState(false);
  const GridData = usePostData();
  const AllCenterData = useGetData();
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
  }, []);
  useEffect(() => {
    const row = addObjectId(GridData?.data || []);
    setRow(row);
  }, [GridData?.data]);

  useEffect(() => {
    if (searchValue2 == "Pending") {
      setCheckboxDisable(false);
    } else {
      setCheckboxDisable(true);
    }
  }, [searchValue2]);

  const handlePrint = async () => {
    const allIds = await TestIds?.map((obj) => obj.testid).join(",");
    // console.log(allIds); // Output: "59,58"
    ViewOrDownloandPDF(`/tnx_Booking/PrintWorkSheet?TestIds=${allIds}`);
  };

  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },

    {
      field: `bookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `departmentName`,
      headerName: `Department`,
      flex: 1,
    },
    {
      field: `centreName`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `barcodeNo`,
      headerName: `Barcode No.`,
      flex: 1,
    },
    {
      field: `age`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `investigationName`,
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
      field: "Select All",
      headerName: "Select All",
      flex: 1,
      renderHeaderCell: () => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              checked={SelectAll}
              disabled={CheckboxDisable}
              onChange={() => {
                setSelectAll(!SelectAll);
                if (!SelectAll) {
                  // Select all test IDs from row data
                  setSelectAll1(true);
                  setTestIds(row.map((r) => r));
                } else {
                  setTestIds([]);
                  setSelectAll1(false);
                }
              }}
            />
            Select All
          </div>
        );
      },
      renderCell: (params) => (
        <CheckboxInputCell
          params={params}
          CheckboxDisable={CheckboxDisable}
          setTestIds={setTestIds}
          TestIds={TestIds}
          SelectAll1={SelectAll1}
        />
      ),
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
    setSearchId(id);
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
    setItemId(id);
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
    setStatusId(id);
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
    setDepartmentId(id);
    setSelectedOption4(name);
    setShowDropdown4(false);
  };

  const handleSearch = async () => {
    const payload = {
      centreId: searchId,
      fromDate: fromDate, // Dynamic current timestamp
      toDate: toDate, // Dynamic current timestamp
      deptId: DepartmentId,
      itemId: ItemId,
      barcodeNo: Barcode,
      status: searchValue2,
      empid: lsData?.user?.employeeId,
    };
    const res = await GridData?.postRequest(
      `/tnx_Booking/GetWorkSheetData`,
      payload
    );
    if (res?.success && searchValue2 == "Pending") {
      setCheckboxDisable(false);
    } else {
      setCheckboxDisable(true);
    }
    console.log("res =>", res);
  };

  const handleSubmit = () => {};

  const statuses = [
    {
      Data: 1,
      CallBack: () => {
        // Sample Collected
      },
    },
    {
      Data: 3,
      CallBack: () => {
        // Reject-Sample
      },
    },
    {
      Data: 11,
      CallBack: () => {
        // Pending Report
      },
    },
    {
      Data: 5,
      CallBack: () => {
        // Report Hold
      },
    },
    {
      Data: 4,
      CallBack: () => {
        // Approved Report
      },
    },
    {
      Data: 7,
      CallBack: () => {
        // Report Print
      },
    },
    {
      Data: 9,
      CallBack: () => {
        // Sample Rerun
      },
    },
  ];
  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Work Sheet" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 items-center  mt-2 mb-1  mx-1 lg:mx-2">
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

              <div className="flex flex-row gap-2">
                <SearchBarDropdown
                  id="search-bar"
                  name="search"
                  value={searchValue4}
                  onChange={handleSearchChange4}
                  label="Department"
                  options={DepartmentData?.data}
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
                  options={TestData?.data}
                  isRequired={false}
                  showSearchBarDropDown={showDropdown1}
                  setShowSearchBarDropDown={setShowDropdown1}
                  handleOptionClickForCentre={handleOptionClick1}
                  setIsHovered={setHoveredIndex1}
                  isHovered={hoveredIndex1}
                />
              </div>
              <div
                style={{ marginTop: "-3px" }}
                className="flex flex-row gap-2"
              >
                <div style={{ marginTop: "3px" }}>
                  {" "}
                  <InputGenerator
                    inputFields={[
                      {
                        type: "text",
                        label: "Barcode",
                        onChange: (e) => {
                          setBarcode(e);
                        },
                      },
                    ]}
                  />
                </div>
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
                style={{ marginTop: "-4px" }}
                options={[
                  {
                    label: "Search",
                    submit: false,
                    callBack: () => {
                      handleSearch();
                    },
                  },
                  {
                    label: "Print",
                    submit: false,
                    callBack: () => {
                      handlePrint();
                    },
                  },
                ]}
              />
            </div>
            {/* <LegendButtons
              statuses={statuses}
              callBack={(status) => {
                if (status?.contantName === "Rejected") {
                  console.log("Rejected clicked!");
                } else {
                  console.log(`You clicked on ${status?.contantName}`);
                }
              }}
            /> */}
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="Work Sheet Details"
              tableStyle={{ marginBottom: "-10px" }}
              columns={columns}
              loading={GridData?.loading}
              activeTheme={activeTheme}
            />
          </div>
        </div>
      </>
    </div>
  );
}
