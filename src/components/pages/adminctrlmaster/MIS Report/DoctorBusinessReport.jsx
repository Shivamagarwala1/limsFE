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
  addObjectId,
  addRandomObjectId,
  downloadExcel,
  ViewOrDownloadPostPDF,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";

// Main Component
export default function DoctorBusinessReport() {
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
  const getData = useGetData();
  const PostData = usePostData();

  useEffect(() => {
    DoctorData?.fetchData("/doctorReferalMaster");
    CenterData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1 )"
    );
  }, []);

  useEffect(() => {
    if (getData?.data?.data) {
      setRow(addRandomObjectId(getData.data.data));
    }
  }, [getData?.data]);

  // Columns for the table
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "bookingDate", headerName: "Booking Date", flex: 1 },
    { field: "workOrderId", headerName: "Visit Id", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "doctorName", headerName: "Doctor Name", flex: 1 },
    { field: "grossAmount", headerName: "Gross Amount", flex: 1 },
    { field: "discount", headerName: "Discount", flex: 1 },
    { field: "netAmount", headerName: "Net Amount", flex: 1 },
    { field: "paidAmount", headerName: "Paid Amount", flex: 1 },
  ];

  // Handle form submission
  const handleSubmit = async () => {
    if (CenterValue.length == 0) {
      toast.error("Center is Required");
      return;
    }
    if (DoctorValue.length == 0) {
      toast.error("Doctor is Required");
      return;
    }
    const doctorString = await DoctorValue.join(",");
    const CenterString = await CenterValue.join(",");
    await getData?.fetchData(
      `/doctorReferalMaster/DoctorBussinessReport?DoctorId=${doctorString}&centreID=${CenterString}&FromDate=${FromDate}&ToDate=${ToDate}`
    );
  };

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setTypeValue(e.target.value);
    setTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
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
    if (DoctorValue.length == 0) {
      toast.error("Doctor is Required");
      return;
    }
    const doctorString = await DoctorValue.join(",");
    const CenterString = await CenterValue.join(",");
    try {
      if (TypeValue == "Details") {
        const res = await downloadExcel(
          `/doctorReferalMaster/DoctorBussinessReportExcel?DoctorId=${doctorString}&centreID=${CenterString}&FromDate=${FromDate}&ToDate=${ToDate}`,
          "DoctorBusinessReport.xlsx"
        );
        console.log("res => ", res);
        if (res?.status !== 200) {
          toast?.error(res?.statusText);
        }
      } else {
        const res = await downloadExcel(
          `/doctorReferalMaster/DoctorBussinessReportSummuryExcel?DoctorId=${doctorString}&centreID=${CenterString}&FromDate=${FromDate}&ToDate=${ToDate}`,
          "DoctorBusinessReport.xlsx"
        );
        console.log("res => ", res);
        if (res?.status !== 200) {
          toast?.error(res?.statusText);
        }
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
    if (DoctorValue.length == 0) {
      toast.error("Doctor is Required");
      return;
    }
    const doctorString = await DoctorValue.join(",");
    const CenterString = await CenterValue.join(",");
    try {
      if (TypeValue == "Details") {
        const res = await ViewOrDownloandPDF(
          `/doctorReferalMaster/DoctorBussinessReportPdf?DoctorId=${doctorString}&centreID=${CenterString}&FromDate=${FromDate}&ToDate=${ToDate}`
        );
        console.log("res => ", res);
      
      } else {
        const res = await ViewOrDownloandPDF(
          `/doctorReferalMaster/DoctorBussinessReportSummuryPdf?DoctorId=${doctorString}&centreID=${CenterString}&FromDate=${FromDate}&ToDate=${ToDate}`
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
            selectAll={false}
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
          <UpdatedMultiSelectDropDown
            id="Doctor"
            name="serachDoctor"
            label="Doctor"
            placeHolder="Search Doctor"
            options={DoctorData?.data}
            isMandatory={false}
            isDisabled={false}
            selectAll={false}
            optionKey="doctorId"
            optionValue={["doctorName"]}
            selectedValues={DoctorValue}
            setSelectedValues={setDoctorValue}
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
              style={{ width: "100px", marginTop: "-5px" }}
              submit={false}
              callBack={() => {
                handleSubmit();
              }}
            />
          </div>
          <TwoSubmitButton
            options={[
              {
                label: "Excel",
                submit: false,
                callBack: () => {
                  handleExcel();
                },
              },
              {
                label: "Print",
                submit: false,
                callBack: () => {
                  handlePDF();
                },
              },
            ]}
          />{" "}
          {/* <TwoSubmitButton
            options={[
              {
                label: "Print",
                submit: false,
                callBack: () => {
                  // handleSubmit();
                },
              },
            ]}
          /> */}
        </div>
      </form>
      <div style={{ height: "300px" }}>
        <UpdatedDynamicTable
          rows={row}
          name="Doctor Business Report Details"
          loading={getData?.loading}
          columns={columns}
          viewKey="Random"
        />
      </div>
    </div>
  );
}
