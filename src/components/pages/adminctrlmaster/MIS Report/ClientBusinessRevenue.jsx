import React, { useEffect, useState } from "react";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  getFormattedDate,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addRandomObjectId,
  downloadExcel,
  downloadPostExcel,
  ViewOrDownloadPostPDF,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";

// Main Component
export default function ClientBusinessRevenue() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  const todayDate = getFormattedDate();
  // ------------------ Type -------------------------------
  const [TypeId, setTypeId] = useState(null);
  const [TypeValue, setTypeValue] = useState("Details");
  const [TypeDropDown, setTypeDropDown] = useState(false);
  const [TypeHoveIndex, setTypeHoveIndex] = useState(null);
  const [TypeSelectedOption, setTypeSelectedOption] = useState("");

  // ------------------ Doctor -------------------------------
  const [DoctorId, setDoctorId] = useState(null);
  const [DoctorValue, setDoctorValue] = useState([]);
  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState([]);
  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [UpdatedBarcode, setUpdatedBarcode] = useState([]);
  const [row, setRow] = useState([]);
  const DoctorData = useGetData();
  const CenterData = useGetData();
  const getData = usePostData();
  const PostData = usePostData();

  useEffect(() => {
    DoctorData?.fetchData("/doctorReferalMaster");
    CenterData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1 )"
    );
  }, []);

  useEffect(() => {
    if (getData?.data) {
      setRow(addRandomObjectId(getData?.data));
    }
  }, [getData?.data]);

  // Columns for the table
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "workOrderId", headerName: "Visit Id", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "centrecode", headerName: "Centre Code", flex: 1 },
    { field: "companyName", headerName: "Centre Name", flex: 1 },
    { field: "collectionDate", headerName: "Collection Date", flex: 1 },
    { field: "receivedBy", headerName: "Received By", flex: 1 },
    { field: "grossAmount", headerName: "Gross Amount", flex: 1 },
    { field: "discount", headerName: "Discount", flex: 1 },
    { field: "netAmount", headerName: "Net Amount", flex: 1 },
    { field: "cashAmt", headerName: "Cash Amount", flex: 1 },
    { field: "onlinewalletAmt", headerName: "Online Wallet Amount", flex: 1 },
    { field: "nefTamt", headerName: "NEFT Amount", flex: 1 },
    { field: "chequeAmt", headerName: "Cheque Amount", flex: 1 },
  ];
  const columns1 = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "centreCode", headerName: "Centre Code", flex: 1 },
    { field: "companyName", headerName: "Centre Name", flex: 1 },
    { field: "totalGrossAmount", headerName: "Total Gross Amount", flex: 1 },
    { field: "totalDiscount", headerName: "Total Discount", flex: 1 },
    { field: "totalNetAmount", headerName: "Total Net Amount", flex: 1 },
    { field: "totalCashAmount", headerName: "Total Cash Amount", flex: 1 },
    { field: "totalOnlineWalletAmount", headerName: "Total Online Wallet Amount", flex: 1 },
    { field: "totalNEFTAmount", headerName: "Total NEFT Amount", flex: 1 },
    { field: "totalChequeAmount", headerName: "Total Cheque Amount", flex: 1 },
    { field: "totalTransactions", headerName: "Total Transactions", flex: 1 },
  ];
  // Handle form submission
  const handleSubmit = async () => {
    if (CenterValue.length == 0) {
      toast.error("Center is Required");
      return;
    }
    const payload = {
      empIds: [],
      centreIds: CenterValue,
      fromDate: FromDate,
      toDate: ToDate,
    };
    if (TypeValue == "Details") {
      await getData?.postRequest(
        `/tnx_Booking/ClientRevenueReportData`,
        payload
      );
    } else {
      await getData?.postRequest(
        `/tnx_Booking/ClientRevenueReportDataSummury`,
        payload
      );
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

  // Handle form submission
  const handleExcel = async () => {
    if (CenterValue.length == 0) {
      toast.error("Center is Required");
      return;
    }
    const payload = {
      empIds: [],
      centreIds: CenterValue,
      fromDate: FromDate,
      toDate: ToDate,
    };
    try {
      if (TypeValue == "Details") {
        const res = await downloadPostExcel(
          `/tnx_Booking/ClientRevenueReportExcel`,
          payload,
          "ClientBusinessRevenue.xlsx"
        );
        console.log("res => ", res);
        // if (res?.status !== 200) {
        //   toast?.error(res?.statusText);
        // }
      } else {
        const res = await downloadPostExcel(
          `/tnx_Booking/ClientRevenueReportExcelSummury`,
          payload,
          "ClientBusinessRevenueSummary.xlsx"
        );
        console.log("res => ", res);
        // if (res?.status !== 200) {
        //   toast?.error(res?.statusText);
        // }
      }
    } catch (error) {
      toast?.error(res?.message);
    }
  };

  const handlePDF = async () => {
    if (CenterValue.length == 0) {
      toast.error("Center is Required");
      return;
    }
    const payload = {
      empIds: [],
      centreIds: CenterValue,
      fromDate: FromDate,
      toDate: ToDate,
    };
    try {
      if (TypeValue == "Details") {
        const res = await ViewOrDownloadPostPDF(
          `/tnx_Booking/ClientRevenueReport`,
          payload
        );
        console.log("res => ", res);
      } else {
        const res = await ViewOrDownloadPostPDF(
          `/tnx_Booking/ClientRevenueReportSummury`,
          payload
        );
      }
    } catch (error) {
      toast?.error(res?.message);
    }
  };
  return (
    <div>
      <FormHeader title="Doctor Business Report" />
      <form autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
          <UpdatedMultiSelectDropDown
            id="Center"
            name="serachCenter"
            label="Center"
            placeHolder="Search Center"
            options={CenterData?.data}
            isMandatory={false}
            isDisabled={false}
            optionKey="centreId"
            optionValue={["companyName"]}
            selectedValues={CenterValue}
            setSelectedValues={setCenterValue}
          />
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
          <TwoSubmitButton
            options={[
              {
                label: "Search",
                submit: false,
                callBack: () => {
                  handleSubmit();
                },
              },
              {
                label: "Excel",
                submit: false,
                callBack: () => {
                  handleExcel();
                },
              },
            ]}
          />
          <TwoSubmitButton
            options={[
              {
                label: "Print",
                submit: false,
                callBack: () => {
                  handlePDF();
                },
              },
            ]}
          />
        </div>
      </form>
      <div style={{ height: "300px" }}>
        <UpdatedDynamicTable
          rows={row}
          name="Doctor Business Report Details"
          loading={getData?.loading}
          columns={TypeValue == "Summary" ? columns1 : columns}
          viewKey="Random"
        />
      </div>
    </div>
  );
}
