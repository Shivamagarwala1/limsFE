import React, { useEffect, useState } from "react";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
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
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { use } from "react";
import { getLocal } from "usehoks";

// BarcodeInputCell Component
const SelectInputCell = ({
  initialTime,
  setRow,
  data,
  params,
  placeholder = "",
  IniId = 0,
  IniVal = "",
}) => {
  const [Edited, setEdited] = useState(initialTime ?? true); // Default to true
  const [DepartmentId, setDepartmentId] = useState(IniId);
  const [DepartmentValue, setDepartmentValue] = useState(IniVal);
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
                  method: DepartmentValue,
                  edited: isEdited, // ✅ Mark as edited only if department changed
                }
              : item
          )
        : [
            ...prev,
            {
              ...params?.row,
              method: DepartmentValue,
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
        placeholder={placeholder}
        options={data}
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
const SelectInputCell1 = ({
  initialTime,
  setRow,
  data,
  params,
  placeholder = "",
  IniId = 0,
  IniVal = "",
}) => {
  const [Edited, setEdited] = useState(initialTime ?? true); // Default to true
  const [DepartmentId, setDepartmentId] = useState(IniId);
  const [DepartmentValue, setDepartmentValue] = useState(IniVal);
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
                  reporttype: DepartmentId,
                  sampleTypeName1: DepartmentValue,
                  sampleTypeId1: DepartmentId,
                  edited: isEdited, // ✅ Mark as edited only if department changed
                }
              : item
          )
        : [
            ...prev,
            {
              ...params?.row,
              reporttype: DepartmentId,
              sampleTypeName1: DepartmentValue,
              sampleTypeId1: DepartmentId,
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
        placeholder={placeholder}
        options={data}
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
const SelectInputCell2 = ({
  initialTime,
  setRow,
  data,
  params,
  placeholder = "",
  IniId = 0,
  IniVal = "",
}) => {
  const [Edited, setEdited] = useState(initialTime ?? true); // Default to true
  const [DepartmentId, setDepartmentId] = useState(IniId);
  const [DepartmentValue, setDepartmentValue] = useState('');
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");

  useEffect(() => {
    const filteredVal = data?.filter((item) => item?.id === IniId);
    if(filteredVal[0]?.value){
      setDepartmentValue(filteredVal[0]?.value);
    }
  }, [IniId]);

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
                  reporttype: DepartmentId,
                  edited: isEdited, // ✅ Mark as edited only if department changed
                }
              : item
          )
        : [
            ...prev,
            {
              ...params?.row,
              reporttype: DepartmentId,
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
        placeholder={placeholder}
        options={data}
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
// Main Component
export default function ChangeReportType() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const [VisitorId, setVisitorId] = useState("");
  const [UpdatedBarcode, setUpdatedBarcode] = useState([]);
  // ------------------ Item -------------------------------
  const [ItemId, setItemId] = useState(0);
  const [ItemValue, setItemValue] = useState("Method");
  const [ItemDropDown, setItemDropDown] = useState(false);
  const [ItemHoveIndex, setItemHoveIndex] = useState(null);
  const [ItemSelectedOption, setItemSelectedOption] = useState("");

  const [row, setRow] = useState([]);
  const getData = useGetData();
  const getMethod = useGetData();
  const PostData = usePostData();
  console.log(row);
  useEffect(() => {
    getMethod?.fetchData("/TestMethodMaster?select=id,method,isactive");
  }, []);

  useEffect(() => {
    setRow([]);
  }, [ItemValue]);

  useEffect(() => {
    if (getData?.data?.data) {
      setRow(addRandomObjectId(getData.data.data));
    }
  }, [getData?.data]);

  // Columns for the table
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "workOrderId", headerName: "Visiter Id", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "investigationName", headerName: "Test Name", flex: 1 },
    { field: "observationName", headerName: "Observation Name", flex: 1 },
    { field: "testMethod", headerName: "Test Method", flex: 1 },
    { field: "barcodeNo", headerName: "Barcode", flex: 1 },
    {
      headerName: "Method",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <SelectInputCell
              setRow={setRow}
              row={row}
              data={getMethod?.data}
              placeholder="Search Method"
              initialTime={params?.row?.Barcode}
              params={params}
            />
          </>
        );
      },
    },
  ];
  const columns2 = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "registrationDate", headerName: "Booking Date", flex: 1 },
    { field: "workOrderId", headerName: "Visiter Id", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "investigationName", headerName: "Test Name", flex: 1 },
    { field: "barcodeNo", headerName: "Barcode", flex: 1 },
    {
      headerName: "Report Type",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <SelectInputCell2
              setRow={setRow}
              row={row}
              data={[
                { id: 1, value: "Numeric" },
                { id: 2, value: "TextReport" },
                { id: 3, value: "Radiology" },
                { id: 4, value: "Microbiology" },
                { id: 5, value: "HistoReport" },
                { id: 6, value: "Not Require" },
              ]}
              placeholder="Search Report Type"
              initialTime={params?.row?.Barcode}
              params={params}
              IniId={params?.row?.reportType}
            />
          </>
        );
      },
    },
    {
      headerName: "Sample Type",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <SelectInputCell1
              setRow={setRow}
              row={row}
              data={params?.row?.sampletypeData}
              placeholder="Search Sample Type"
              initialTime={params?.row?.Barcode}
              params={params}
              IniId={params?.row?.sampleTypeId}
              IniVal={params?.row?.sampleTypeName}
            />
          </>
        );
      },
    },
  ];
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

  // Handle form submission
  const handleSubmit = async () => {
    if (ItemValue === "Method") {
      await getData?.fetchData(
        `/tnx_Booking/GetMethodChangedetail?WorkOrderId=${VisitorId}`
      );
    } else if (ItemValue === "Sample Type") {
      await getData?.fetchData(
        `/tnx_Booking/GetSampleTypedetail?WorkOrderId=${VisitorId}`
      );
    }
  };

  const handleSave = async () => {
    let api = "";
    let dataToSend = [];

    if (ItemValue === "Method") {
      api = "/tnx_Booking/UpdateMethod";
      dataToSend = row
        ?.filter((item) => item?.method) // Ensure only valid items are processed
        ?.map((item) => ({
          id: item?.observationdataid,
          method: item.method,
          empid: lsData?.user?.employeeId,
          changeDate: new Date().toISOString(), // Current date & time
        }));
    } else if (ItemValue === "Sample Type") {
      api = "/tnx_Booking/UpdateSampleType";
      dataToSend = row
        ?.filter((item) => item?.sampleTypeName1) // Filter items with a valid testid
        ?.map((item) => ({
          testid: item?.testid,
          sampletypeId: item?.sampleTypeId1 || 0,
          sampletypename: item?.sampleTypeName1 || "string",
          reporttype: item?.reporttype || 0,
          changeDate: new Date().toISOString(),
        }));
    }

    if (!api) {
      toast.error("Invalid selection. Please choose a valid update option.");
      console.warn("No API selected. Check ItemValue:", ItemValue);
      return;
    }

    if (!dataToSend.length) {
      toast.error("No data to update.");
      console.warn("No valid data to send for", ItemValue);
      return;
    }

    console.log("Sending Data to API:", api, dataToSend);

    try {
      const res = await PostData?.postRequest(api, dataToSend);

      if (res?.success) {
        toast.success(res?.message);
        // window.location.reload();
      } else {
        toast.error(res?.message || "Update failed.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div>
      <FormHeader title="Report Type" />
      <form autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
          <SearchBarDropdown
            id="search-bar"
            name="Item"
            value={ItemValue}
            onChange={handleSearchChange2}
            label="Report Type"
            options={[{ data: "Method" }, { data: "Sample Type" }]}
            isRequired={false}
            showSearchBarDropDown={ItemDropDown}
            setShowSearchBarDropDown={setItemDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setItemHoveIndex}
            isHovered={ItemHoveIndex}
            style={{ marginTop: "0.15rem" }}
          />
          <InputGenerator
            inputFields={[
              {
                label: "Visit Id",
                type: "text",
                name: "VisitId",
                onChange: (e) => {
                  setVisitorId(e);
                },
              },
            ]}
          />
          <TwoSubmitButton
          style={{marginTop:"1px"}}
            options={[
              {
                label: "Search",
                submit: false,
                callBack: () => {
                  handleSubmit();
                },
              },
              {
                label: "Save",
                submit: false,
                callBack: () => {
                  handleSave();
                },
              },
            ]}
          />
        </div>
      </form>
      <div style={{ height: "300px" }}>
        <UpdatedDynamicTable
          rows={row}
          name="Report Type Details"
          loading={getData?.loading}
          columns={ItemValue === "Method" ? columns : columns2}
          activeTheme={activeTheme}
          viewKey="Random"
        />
      </div>
    </div>
  );
}
