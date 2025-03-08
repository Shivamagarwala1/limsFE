import React, { useEffect, useState } from "react";
import DynamicTable, { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  getFormattedDate,
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import { getLocal } from "usehoks";
import toast from "react-hot-toast";
import { addRandomObjectId } from "../../../../service/RedendentData";

export default function MachineResult() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const lsData = getLocal("imarsar_laboratory");

  const todayDate = getFormattedDate();

  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [Barcode, setBarcode] = useState("");

  const [CenterId, setCenterId] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  // ------------------ Machine -------------------------------
  const [MachineId, setMachineId] = useState(0);
  const [MachineValue, setMachineValue] = useState("");
  const [MachineDropDown, setMachineDropDown] = useState(false);
  const [MachineHoveIndex, setMachineHoveIndex] = useState(null);
  const [MachineSelectedOption, setMachineSelectedOption] = useState("");
  // ------------------ Register -------------------------------
  const [RegisterValue, setRegisterValue] = useState("");
  const [RegisterDropDown, setRegisterDropDown] = useState(false);
  const [RegisterHoveIndex, setRegisterHoveIndex] = useState(null);
  const [RegisterSelectedOption, setRegisterSelectedOption] = useState("");

  const [row, setRow] = useState([]);
  const [SelectAll, setSelectAll] = useState(false);
  const AllCenterData = useGetData();
  const MachineData = useGetData();
  const GridData = usePostData();
  useEffect(() => {
    const row = addRandomObjectId(GridData?.data || []);
    setRow(row);
  }, [GridData?.data]);
  useEffect(() => {
    AllCenterData?.fetchData("/centreMaster/GetProcesiongLab");
    MachineData?.fetchData(
      "/machineMaster?select=id,machineName&$filter=(isactive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    {
      field: `visitId`,
      headerName: `Visit Id`,
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
      field: `investigationName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `labObservationName`,
      headerName: `Lab Observation Name`,
      flex: 1,
    },
    {
      field: `machineName1`,
      headerName: `Machine Name`,
      flex: 1,
    },
    {
      field: `reading`,
      headerName: `Reading`,
      flex: 1,
    },
    {
      field: `machineComments`,
      headerName: `Machine Comment`,
      flex: 1,
    },
    // {
    //   field: `Remark`,
    //   headerName: `Remark`,
    //   flex: 1,
    // },
    // {
    //   field: `Date`,
    //   headerName: `Date`,
    //   flex: 1,
    // },
  ];
  // const row = [
  //   {
  //     id: 1,
  //     Centre: "105 - center 1",
  //     Department: "Nursing",
  //     PatientName: "John Snow",
  //     Barcode: "10993",
  //     SampleRecDate: "10-02-2025",
  //     VisitId: "302",
  //     ApprovedDate: "12-Feb-25",
  //     Reading: "Lorem Ipsum",
  //     MachineComment: "Lorem Ipsum",
  //     Remark: "Lorem Ipsum",
  //     NotApprovedBy: "Tyron",
  //     Machine:"Machine 1",
  //     Params:"Alpu",
  //     TestName: "CBC",
  //     AgeGender: "25/male",
  //     TransferDate: "15-Feb-2025",
  //     Date: "11-Feb-2025",
  //     ToCentre: "New-Delhi",
  //     FromCentre: "Ayodhya",
  //   },
  // ];

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
    setMachineValue(e.target.value);
    setMachineDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setMachineValue(name);
    setMachineId(id);
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

  const handleSubmit = () => {
    if (MachineId === 0) {
      toast.error("Machine is Required");
      return;
    }
    const payload = {
      centreId: CenterId,
      machineId: MachineId,
      fromDate: FromDate,
      toDate: ToDate,
      barcodeNo: Barcode || "",
      empId: lsData?.user?.employeeId,
    };
    GridData?.postRequest("/tnx_Booking/MachineResult", payload);
  };

  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Machine Result" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <SearchBarDropdown
                id="search-bar"
                name="Centre"
                value={searchValue}
                onChange={handleSearchChange}
                label="Centre"
                options={AllCenterData?.data?.data}
                isRequired={false}
                showSearchBarDropDown={showDropdown}
                showValueField="companyName"
                keyField="centreId"
                setShowSearchBarDropDown={setShowDropdown}
                handleOptionClickForCentre={handleOptionClick}
                setIsHovered={setHoveredIndex}
                isHovered={hoveredIndex}
                style={{ marginTop: "2px" }}
              />
              <SearchBarDropdown
                id="search-bar"
                name="Machine"
                value={MachineValue}
                onChange={handleSearchChange1}
                label="Machine"
                options={MachineData?.data}
                isRequired={false}
                showSearchBarDropDown={MachineDropDown}
                setShowSearchBarDropDown={setMachineDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setMachineHoveIndex}
                isHovered={MachineHoveIndex}
                style={{ marginTop: "2px" }}
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
              {/* <SearchBarDropdown
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
              /> */}

              <InputGenerator
                inputFields={[
                  {
                    type: "text",
                    label: "Barcode",
                    name: "barcode",
                    onChange: (e) => {
                      setBarcode(e);
                    },
                  },
                ]}
              />
              <SubmitButton
                style={{ width: "100px", marginTop: "-5px" }}
                submit={false}
                text={"Search"}
                callBack={() => {
                  handleSubmit();
                }}
              />
            </div>
          </form>
          <div style={{ maxHeight: "200px" }}>
            <UpdatedDynamicTable
              rows={row}
              name="Machine Result Details"
              viewKey="Random"
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
