import React, { useEffect, useState } from "react";
import { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  getFormattedDate,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addRandomObjectId,
  downloadPostExcel,
  ViewOrDownloadPostPDF,
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import { getLocal } from "usehoks";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";

// Main Component
export default function DiscountReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const todayDate = getFormattedDate();
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();

  // ------------------ Type -------------------------------
  const [TypeId, setTypeId] = useState(null);
  const [TypeValue, setTypeValue] = useState("Details");
  const [TypeDropDown, setTypeDropDown] = useState(false);
  const [TypeHoveIndex, setTypeHoveIndex] = useState(null);
  const [TypeSelectedOption, setTypeSelectedOption] = useState("");

  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [UserValue, setUserValue] = useState([]);
  const [CenterValue, setCenterValue] = useState([]);
  const [row, setRow] = useState([]);

  const getData = useGetData();
  const PostData = usePostData();
  const GridData = useGetData();
  const UserData = useGetData();
  const RoleData = useGetData();
  useEffect(() => {
    getData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1 )"
    );
    RoleData?.fetchData(
      `/roleMaster?select=id,rolename&$filter=(isactive eq 1)`
    );
    UserData?.fetchData(
      `/empMaster?select=empid,fName,lName&$filter=(isActive eq 1)`
    );
  }, []);
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "workOrderId", headerName: "Visit Id", flex: 1 },
    { field: "companyName", headerName: "Centre Name", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "receivedBy", headerName: "Received By", flex: 1 },
    { field: "grossAmount", headerName: "Gross Amount", flex: 1 },
    { field: "discount", headerName: "Discount", flex: 1 },
    { field: "netAmount", headerName: "Net Amount", flex: 1 },
  ];
  const columns1 = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "empCode", headerName: "Employee Code", flex: 1 },
    { field: "employeeName", headerName: "Employee Name", flex: 1 },
    { field: "grossAmountSum", headerName: "Gross Amount", flex: 1 },
    { field: "discountSum", headerName: "Discount", flex: 1 },
    { field: "netAmountSum", headerName: "Net Amount", flex: 1 },
  ];

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    const values = getValues();
    console.log(values);

    if (!values?.FromDate) {
      toast.error("From Date is required");
      return;
    }
    if (!values?.ToDate) {
      toast.error("To Date is required");
      return;
    }

    const payload = {
      empIds: UserValue,
      centreIds: CenterValue,
      fromDate: values?.FromDate,
      toDate: values?.ToDate,
    };
    const api =
      TypeValue == "Summary"
        ? "/tnx_Booking/DiscountReportDataSummury"
        : "/tnx_Booking/DiscountReportData";
    try {
      const res = await PostData?.postRequest(`${api}`, payload);
      setRow(addRandomObjectId(res?.data));
    } catch (error) {
      toast?.error(res?.data?.message);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!FromDate) {
      toast.error("From Date is required");
      return;
    }
    if (!ToDate) {
      toast.error("To Date is required");
      return;
    }
    const payload = {
      empIds: UserValue,
      centreIds: CenterValue,
      fromDate: FromDate,
      toDate: ToDate,
    };
    console.log("Payload ", payload);
    const api =
      TypeValue == "Summary"
        ? "/tnx_Booking/DiscountReportSummury"
        : "/tnx_Booking/DiscountReport";
    try {
      const res = await ViewOrDownloadPostPDF(`${api}`, payload);
    } catch (error) {
      toast?.error(res?.data?.message);
    }
  };
  // Handle form submission
  const handleDownloadExcel = async () => {
    if (!FromDate) {
      toast.error("From Date is required");
      return;
    }
    if (!ToDate) {
      toast.error("To Date is required");
      return;
    }
    const payload = {
      empIds: UserValue,
      centreIds: CenterValue,
      fromDate: FromDate,
      toDate: ToDate,
    };
    console.log("Payload ", payload);
    const api =
      TypeValue == "Summary"
        ? "/tnx_Booking/DiscountReportExcelSummury"
        : "/tnx_Booking/DiscountReportExcel";

    try {
      const res = await downloadPostExcel(
        `${api}`,
        payload,
        "CollectionReport.xlsx"
      );
    } catch (error) {
      toast?.error(res?.data?.message);
    }
  };
  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setRow([]);
    setTypeValue(e.target.value);
    setTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setRow([]);
    setTypeValue(name);
    setTypeId(id);
    setTypeSelectedOption(name);
    setTypeDropDown(false);
  };

  // Summing all objects in the row array
  const totalRow = row.reduce((acc, curr) => {
    Object.keys(curr).forEach((key) => {
      if (typeof curr[key] === "number") {
        // Sum numeric values
        acc[key] = (acc[key] || 0) + curr[key];
      } else if (!acc[key]) {
        // Keep the first occurrence of string values
        acc[key] = curr[key];
      }
    });
    return acc;
  }, {});

  return (
    <>
      <div>
        <FormHeader title="Discount Report" />
        <form autoComplete="off" ref={formRef} onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
            <InputGenerator
              inputFields={[
                {
                  label: "From Date",
                  type: "customDateField",
                  name: "FromDate",
                  customOnChange: (e) => {
                    console.log(e);
                    setFromDate(e);
                  },
                },
                {
                  label: "To Date",
                  type: "customDateField",
                  name: "ToDate",
                  customOnChange: (e) => {
                    setToDate(e);
                  },
                },
              ]}
            />
            <UpdatedMultiSelectDropDown
              id="Center"
              name="serachCenter"
              label="Center"
              placeHolder="Search Center"
              options={getData?.data}
              isMandatory={false}
              isDisabled={false}
              optionKey="centreId"
              optionValue={["companyName"]}
              selectedValues={CenterValue}
              setSelectedValues={setCenterValue}
            />
            <UpdatedMultiSelectDropDown
              id="User"
              name="serachUser"
              label="User"
              placeHolder="Search User"
              options={UserData?.data}
              isMandatory={false}
              isDisabled={false}
              optionKey="empId"
              optionValue={["fName", "lName"]}
              selectedValues={UserValue}
              setSelectedValues={setUserValue}
            />
            <div className="flex flex-row gap-2">
              <SearchBarDropdown
                id="search-bar"
                name="Type"
                value={TypeValue}
                onChange={handleSearchChange2}
                label="Type"
                placeholder="Serch Type"
                options={[{ data: "Details" }, { data: "Summary" }]}
                isRequired={false}
                showSearchBarDropDown={TypeDropDown}
                setShowSearchBarDropDown={setTypeDropDown}
                handleOptionClickForCentre={handleOptionClick2}
                setIsHovered={setTypeHoveIndex}
                isHovered={TypeHoveIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <SubmitButton
                text="Search"
                style={{ width: "100px", marginTop: "-4px" }}
              />
            </div>
            <TwoSubmitButton
              options={[
                {
                  label: "Print",
                  submit: false,
                  callBack: () => {
                    handleSubmit();
                  },
                },
                {
                  label: "Export to Excel",
                  submit: true,
                  callBack: () => {
                    handleDownloadExcel();
                  },
                },
              ]}
            />
          </div>
        </form>
        <div className="h-[300px] w-full">
          <UpdatedDynamicTable
            rows={row}
            extraRow={[
              {
                ...totalRow,
                Random: "Total",
                companyName: "",
                workOrderId: "",
                name: "",
                receivedBy: "",
                centrecode: "",
                employeeName: "",
                empCode: "",
                // cashAmt:`₹ ${totalRow?.cashAmt}`
              },
            ]}
            name="Discount Report Details"
            loading={PostData?.loading}
            columns={TypeValue == "Summary" ? columns1 : columns}
            viewKey="Random"
          />
        </div>
      </div>
    </>
  );
}
