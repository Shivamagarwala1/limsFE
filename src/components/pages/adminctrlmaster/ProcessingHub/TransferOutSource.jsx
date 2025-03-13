import React, { useEffect, useState } from "react";
import InputGenerator, {
  ClickChangeButton,
  getFormattedDate,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addObjectId,
  addRandomObjectId,
} from "../../../../service/RedendentData";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { getLocal } from "usehoks";
import axios from "axios";
import toast from "react-hot-toast";

const SelectInputCell = ({ initialTime, setRow, params, DepartmentData }) => {
  const [Edited, setEdited] = useState(initialTime ?? true); // Default to true
  const [DepartmentId, setDepartmentId] = useState(params?.row?.outsourceLabId);
  const [DepartmentValue, setDepartmentValue] = useState(
    params?.row?.outsourceLabName
  );
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");

  useEffect(() => {
    const isEdited =
      DepartmentId !== params?.row?.outsourceLabId ||
      DepartmentValue !== params?.row?.outsourceLabName;

    setRow((prev) =>
      prev.some((item) => item.Random === params?.row.Random)
        ? prev.map((item) =>
            item.Random === params?.row.Random
              ? {
                  ...item,
                  outSourceLab: { Id: DepartmentId, Name: DepartmentValue },
                  edited: isEdited, // ✅ Mark as edited only if department changed
                }
              : item
          )
        : [
            ...prev,
            {
              ...params?.row,
              outSourceLab: { Id: DepartmentId, Name: DepartmentValue },
              edited: isEdited, // ✅ Mark as edited only if department changed
            },
          ]
    );
  }, [DepartmentValue, DepartmentId]);

  // Handle input change
  const handleSearchChange1 = (e) => {
    setDepartmentValue(e.target.value);
    setDepartmentDropDown(true);
  };

  // Handle dropdown selection
  const handleOptionClick1 = (name, id) => {
    setDepartmentValue(name);
    setDepartmentId(id);
    setDepartmentSelectedOption(name);
    setDepartmentDropDown(false);
  };

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <SearchBarDropdown
        id="search-bar"
        name="Department"
        value={DepartmentValue}
        onChange={handleSearchChange1}
        options={DepartmentData?.data}
        isRequired={false}
        showSearchBarDropDown={DepartmentDropDown}
        setShowSearchBarDropDown={setDepartmentDropDown}
        handleOptionClickForCentre={handleOptionClick1}
        setIsHovered={setDepartmentHoveIndex}
        isHovered={DepartmentHoveIndex}
        style={{
          height: "1rem",
          border: "none",
          borderRadius: "2px",
          margin: "0px",
        }}
        Inputstyle={{ borderRadius: "2px" }}
      />
    </div>
  );
};
const CheckboxInputCell = ({ params, setSelectedData }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(params?.row?.edited === true); // ✅ Listen for changes in `edited`
  }, [params?.row?.edited]); // ✅ Checkbox updates dynamically

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="checkbox"
        disabled={!enabled} // ✅ Disable if not edited
        onClick={() =>
          setSelectedData(
            (prev) =>
              prev.some((item) => item.Random === params?.row.Random)
                ? prev.filter((item) => item.Random !== params?.row.Random) // Remove if exists
                : [...prev, { ...params?.row }] // Add if not
          )
        }
      />
    </div>
  );
};
const RateInputCell = ({ params, initialQuantity = "", setRow }) => {
  const [Quantity, setQuantity] = useState(initialQuantity);
  useEffect(() => {
    const isEdited = Quantity !== params?.row?.outSourceRate;
    setRow((prev) =>
      prev.map((item) =>
        item.Random === params?.row.Random
          ? {
              ...item,
              outSourceRate: parseInt(Quantity),
              edited: isEdited,
            }
          : item
      )
    );
  }, [Quantity, setRow]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={Quantity}
        maxLength={8}
        name="Quantity"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
          setQuantity(newValue);
        }}
      />
    </div>
  );
};
export default function TransferOutSource() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();
  const [SelectedData, setSelectedData] = useState([]);
  const todayDate = getFormattedDate();
  const [row, setRow] = useState([]);
  const [fromDate, setFromDate] = useState(todayDate);
  const [toDate, setToDate] = useState(todayDate);
  const [VisitorId, setVisitorId] = useState("");
  const GridData = useGetData();
  const AllCenterData = useGetData();
  const DepartmentData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    DepartmentData?.fetchData(
      "/outSourcelabmaster?select=id,labName&$filter=(isactive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);
  useEffect(() => {
    const row = addRandomObjectId(GridData?.data?.data || []);
    setRow(row);
  }, [GridData?.data]);
  const handleSearch = () => {
    if (!VisitorId) {
      GridData?.fetchData(
        `/tnx_OutsourceDetail/GetOutsourceData?FromDate=${fromDate}&Todate=${toDate}&SearchValue=""`
      );
    } else {
      GridData?.fetchData(
        `/tnx_OutsourceDetail/GetOutsourceData?FromDate=${fromDate}&Todate=${toDate}&SearchValue=${VisitorId}`
      );
    }
  };
  const ExportExcel = () => {
    downloadExcel(
      `/tnx_OutsourceDetail/GetOutsourceReportExcel?FromDate=${fromDate}&Todate=${toDate}`,
      "Transfer Out Source"
    );
  };
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    {
      field: `workOrderId`,
      headerName: `Visit Id`,
      flex: 1,
    },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `age`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `barcodeNo`,
      headerName: `Barcode`,
      flex: 1,
    },
    {
      field: `investigationName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `rate`,
      headerName: `Booking Rate`,
      flex: 1,
    },
    {
      field: `outSourceRate`,
      headerName: `Out Source Rate`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params?.row?.id," ",params?.row)
        return (
          <RateInputCell
            params={params}
            initialQuantity={params?.row?.outSourceRate}
            setRow={setRow}
          />
        );
      },
    },
    {
      field: `outSourcelabs`,
      headerName: `Out Source Lab`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params?.row?.id," ",params?.row)
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            {params?.row?.isApprove == 0 ? (
              <SelectInputCell
                setRow={setRow}
                params={params}
                initialTime={params?.row?.outSourcelabs}
                DepartmentData={DepartmentData}
              />
            ) : (
              <input
                style={{ borderRadius: "3px" }}
                value={params?.row?.outsourceLabName}
                className="w-full  border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
              />
            )}
          </div>
        );
      },
    },
    {
      field: `Action`,
      headerName: `Action`,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <CheckboxInputCell
              setSelectedData={setSelectedData}
              initialTime={params?.row}
              row={row}
              params={params}
            />
          </>
        );
      },
    },
  ];
  console.log(row);
  const handleSubmit = async () => {
    if (SelectedData?.length === 0) {
      toast.error("Add Some Data to Update");
      return;
    }
    // Transform SelectedData to match the required format
    const formattedData = SelectedData.map((item) => ({
      isActive: item?.isActive || 0,
      createdById: lsData?.user?.employeeId,
      createdDateTime: new Date().toISOString(),
      // id: item?.id || 0,
      testId: item?.testId || 0,
      itemId: item?.itemId || 0,
      itemName: item?.investigationName || "string",
      centreId: item?.centreId || 0,
      transactionId: item?.transactionId || 0,
      workOrderId: item?.workOrderId || "string",
      bookingRate: item?.rate || 0,
      outSourceLabID: item?.outSourceLab?.Id || 0,
      outSourceLabName: item?.outSourceLab?.Name || "string",
      outSourceRate: item?.outSourceRate,
      remarks: "string",
    }));
    // console.log(formattedData,);
    try {
      const response = await axios.post(
        `${BASE_URL}/tnx_OutsourceDetail/SaveUpdateOutsourceData`,
        formattedData
      );
      // console.log("Data submitted successfully:", response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(error?.response?.data?.message || "Submission failed");
    }
  };
  console.log(SelectedData);
  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Transfer Out Source" />
          <form autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
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
                  {
                    type: "text",
                    label: "Search by Name/Visitor Id",
                    name: "search",
                    onChange: (e) => {
                      setVisitorId(e);
                    },
                  },
                ]}
              />
              <TwoSubmitButton
                options={[
                  {
                    submit: false,
                    label: "Save",
                    callBack: () => {
                      handleSubmit();
                      // alert('hii')
                    },
                  },
                  {
                    submit: false,
                    label: "Search",
                    callBack: () => {
                      handleSearch();
                    },
                  },
                ]}
              />
              <TwoSubmitButton
                options={[
                  {
                    submit: false,
                    label: "Export to Excel",
                    callBack: () => {
                      ExportExcel();
                    },
                  },
                ]}
              />
            </div>
          </form>
          <div style={{ maxHeight: "200px" }}>
            <UpdatedDynamicTable
              rows={row}
              name="Transfer Out Source Details"
              //   loading={loading}
              tableStyle={{ marginBottom: "-10px" }}
              columns={columns}
              viewKey="Random"
            />
          </div>
        </div>
      </>
    </div>
  );
}
