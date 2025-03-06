import React, { useEffect, useState } from "react";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../Custom Components/DynamicTable";
import InputGenerator, {
  ClickChangeButton,
  SubmitButton,
  TwoSubmitButton,
  WeekdayToggle,
} from "../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../service/apiService";
import { FormHeader } from "../../../Custom Components/FormGenerator";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { LegendButtons } from "../../../Custom Components/LegendButtons";
import toast from "react-hot-toast";
import { addObjectId, addRandomObjectId } from "../../../service/RedendentData";
import axios from "axios";
import { getLocal } from "usehoks";
import { UpdatedMultiSelectDropDown } from "../../../Custom Components/UpdatedMultiSelectDropDown";

// Create a separate component for the time input cell
const TimeInputCell = ({ params, initialTime, setRow }) => {
  const [startTime, setStartTime] = useState(initialTime || "");

  useEffect(() => {
    setRow(
      (prev) =>
        prev.some((item) => item.itemId === params?.row.itemId)
          ? prev.map((item) =>
              item.itemId === params?.row.itemId
                ? { ...item, startTime: startTime }
                : item
            ) // Update if exists
          : [
              ...prev,
              {
                ...params?.row,
                startTime: startTime,
              },
            ] // Add if not
    );
  }, [startTime]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="time"
        className={`inputPeerField peer border-borderColor focus:outline-none`}
        value={startTime}
        name="startTime"
        onChange={(e) => setStartTime(e.target.value)}
      />
    </div>
  );
};
const EndTimeInputCell = ({ initialTime, setRow, params }) => {
  const [startTime, setStartTime] = useState(initialTime || "");

  useEffect(() => {
    setRow(
      (prev) =>
        prev.some((item) => item.itemId === params?.row.itemId)
          ? prev.map((item) =>
              item.itemId === params?.row.itemId
                ? { ...item, endTime: startTime }
                : item
            ) // Update if exists
          : [
              ...prev,
              {
                ...params?.row,
                endTime: startTime,
              },
            ] // Add if not
    );
  }, [startTime]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="time"
        className={`inputPeerField peer border-borderColor focus:outline-none`}
        value={startTime}
        name="endTime"
        onChange={(e) => setStartTime(e.target.value)}
      />
    </div>
  );
};
const MinInputCell = ({ initialTime, setRow, params }) => {
  const [startTime, setStartTime] = useState(initialTime);

  useEffect(() => {
    setRow(
      (prev) =>
        prev.some((item) => item.itemId === params?.row.itemId)
          ? prev.map((item) =>
              item.itemId === params?.row.itemId
                ? { ...item, mins: startTime }
                : item
            ) // Update if exists
          : [
              ...prev,
              {
                ...params?.row,
                mins: parseInt(startTime),
              },
            ] // Add if not
    );
  }, [startTime]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className={`inputPeerField peer border-borderColor focus:outline-none`}
        value={startTime}
        disabled={!params?.row?.isMins} // Disable when isMins is false
        name="mins"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
          setStartTime(newValue);
        }}
      />
    </div>
  );
};
const MinDayInputCell = ({ initialTime, setRow, params }) => {
  const [isMins, setIsMins] = useState(initialTime ?? true); // Default to true ("Min")

  useEffect(() => {
    setRow(
      (prev) =>
        prev.some((item) => item.itemId === params?.row.itemId)
          ? prev.map((item) =>
              item.itemId === params?.row.itemId
                ? { ...item, isMins: isMins }
                : item
            ) // Update if exists
          : [
              ...prev,
              {
                ...params?.row,
                isMins: isMins,
              },
            ] // Add if not
    );
  }, [isMins]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <select
        style={{ height: "1rem" }}
        className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none`}
        value={isMins ? "Min" : "Day"} // Show "Min" when true, "Day" when false
        onChange={(e) => setIsMins(e.target.value === "Min")} // Convert selection to boolean
      >
        <option value="Min">Min</option>
        <option value="Day">Day</option>
      </select>
    </div>
  );
};

const DayInputCell = ({ initialTime, setRow, params }) => {
  const [startTime, setStartTime] = useState(initialTime);

  useEffect(() => {
    setRow(
      (prev) =>
        prev.some((item) => item.itemId === params?.row.itemId)
          ? prev.map((item) =>
              item.itemId === params?.row.itemId
                ? { ...item, days: startTime }
                : item
            ) // Update if exists
          : [
              ...prev,
              {
                ...params?.row,
                days: parseInt(startTime),
              },
            ] // Add if not
    );
  }, [startTime]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className={`inputPeerField peer border-borderColor focus:outline-none`}
        value={startTime}
        disabled={params?.row?.isMins}
        name="mins"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
          setStartTime(newValue);
        }}
      />
    </div>
  );
};

const WeekInputCell = ({ params, setRow }) => {
  const [days, setDays] = useState({
    sun: params?.row?.sun,
    mon: params?.row?.mon,
    tue: params?.row?.tue,
    wed: params?.row?.wed,
    thu: params?.row?.thu,
    fri: params?.row?.fri,
    sat: params?.row?.sat,
  });

  useEffect(() => {
    setRow(
      (prev) =>
        prev.some((item) => item.itemId === params?.row.itemId)
          ? prev.map((item) =>
              item.itemId === params?.row.itemId ? { ...item, ...days } : item
            ) // Update if exists
          : [
              ...prev,
              {
                ...params?.row,
                ...days,
              },
            ] // Add if not
    );
  }, [days]);

  return (
    <div style={{ display: "flex", gap: "3px", fontSize: "15px" }}>
      <WeekdayToggle setDays={setDays} days={days} />
    </div>
  );
};
export default function TATMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();
  const [SelectedData, setSelectedData] = useState([]);
  // --------------------------------------------------------------
  const [searchId, setSearchId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  // ------------------------- Department ------------------------------
  const [DepartmentId, setDepartmentId] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");

  const [SelectedInvestigation, setSelectedInvestigation] = useState([]);

  const AllCenterData = useGetData();
  const DepartmentData = useGetData();
  const GridData = useGetData();
  const ItemData = useGetData();
  const PostData = usePostData();
  const [row, setRow] = useState([]);
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster/GetProcesiongLab"
    );
    DepartmentData?.fetchData(
      "/labDepartment?select=id,deptname&$orderby=printSequence"
    );
    ItemData?.fetchData(
      `/itemMaster?select=itemId,ItemName&$filter=(deptId eq ${DepartmentId})&$OrderBy=itemName`
    );
    // console.log(AllCenterData);
  }, [DepartmentId]);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `startTime`,
      headerName: `Start Time`,
      flex: 1,
      renderCell: (params) => {
        return (
          <TimeInputCell
            setRow={setRow}
            initialTime={params?.row?.startTime}
            params={params}
          />
        );
      },
    },
    {
      field: `endTime`,
      headerName: `End Time`,
      flex: 1,
      renderCell: (params) => {
        return (
          <EndTimeInputCell
            params={params}
            setRow={setRow}
            initialTime={params?.row?.endTime}
          />
        );
      },
    },
    {
      field: `itemId`,
      headerName: `Test Id`,
      flex: 1,
    },
    {
      field: `itemName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `regcoll`,
      headerName: `Reg. Coll.`,
      flex: 1,
    },
    {
      field: `collrecv`,
      headerName: `Coll. Rec.`,
      flex: 1,
    },
    {
      field: `TatType`,
      headerName: `Mins/Date`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <MinDayInputCell
              setRow={setRow}
              params={params}
              initialTime={params?.row?.mins}
            />
          </div>
        );
      },
    },
    {
      field: `mins`,
      headerName: `Mins`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <MinInputCell
              setRow={setRow}
              params={params}
              initialTime={params?.row?.mins}
            />
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
            <DayInputCell
              setRow={setRow}
              params={params}
              initialTime={params?.row?.days}
            />
          </div>
        );
      },
    },
    {
      field: `Week`,
      headerName: `Week Days`,
      flex: 1,
      renderCell: (params) => {
        return <WeekInputCell setRow={setRow} params={params} />;
      },
    },
    {
      field: `select`,
      headerName: `Select`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <input
              type="checkbox"
              onClick={() =>
                setSelectedData(
                  (prev) =>
                    prev.some((item) => item.itemId === params?.row.itemId)
                      ? prev.filter(
                          (item) => item.itemId !== params?.row.itemId
                        ) // Remove if exists
                      : [
                          ...prev,
                          {
                            ...params?.row,
                            centreid: searchId,
                            id: params?.row?.id,
                            // id:0,
                            deptid: DepartmentId,
                            regcoll: 0,
                            createdOn: new Date().toISOString(),
                            createdby: lsData?.user?.employeeId,
                            createdByName: lsData?.user?.name,
                            itemid: params?.row?.itemId,
                          },
                        ] // Add if not
                )
              }
            />
          </div>
        );
      },
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues(); // Getting form values
    console.log(values);

    // Transform SelectedData to match the required format
    const formattedData = SelectedData.map((item) => ({
      id: item.id || 0,
      centreid: item.centreid || 0,
      deptid: item.deptid || 0,
      itemid: item.itemid || item.itemId || 0, // Ensures `itemid` is correctly mapped
      startTime: item.startTime || "00:00",
      endTime: item.endTime || "00:00",
      mins: Number(item.mins) || 0, // Ensures numeric value
      days: Number(item.days) || 0,
      sun: item.sun || 0,
      mon: item.mon || 0,
      tue: item.tue || 0,
      wed: item.wed || 0,
      thu: item.thu || 0,
      fri: item.fri || 0,
      sat: item.sat || 0,
      regcoll: item.regcoll || 0,
      collrecv: item.collrecv || 0,
      createdOn: item.createdOn || new Date().toISOString(), // Ensures ISO format
      createdby: item.createdby || "string",
      createdByName: item.createdByName || "string",
      tatType: item.tatType || "string",
    }));

    try {
      const response = await axios.post(
        `${BASE_URL}/tat_master/SaveUpdateTatMaster`,
        formattedData
      );
      console.log("Data submitted successfully:", response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(error?.response?.data?.message || "Submission failed");
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/tat_master/GetTatMaster?centreId=${searchId}&departmentId=${DepartmentId}`,
        SelectedInvestigation
      );

      if (response?.data) {
        // const grid = await addRandomObjectId(response?.data?.data);
        setRow(response?.data?.data); // Store API response in the state
      } else {
        setRow([]); // Clear row if no data is returned
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  console.log("SelectedData ", SelectedData);
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
                options={AllCenterData?.data?.data}
                isRequired={false}
                placeholder="Search Centre"
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
                placeholder="Search Department"
                showSearchBarDropDown={DepartmentDropDown}
                setShowSearchBarDropDown={setDepartmentDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setDepartmentHoveIndex}
                isHovered={DepartmentHoveIndex}
              />
              <UpdatedMultiSelectDropDown
                id="Investigation"
                name="Investigation"
                label="Investigation"
                placeHolder="Search Investigation"
                options={ItemData?.data}
                isMandatory={false}
                isDisabled={false}
                optionKey="itemId"
                optionValue={["itemName"]}
                selectedValues={SelectedInvestigation}
                setSelectedValues={setSelectedInvestigation}
              />
              <TwoSubmitButton
                options={[
                  {
                    submit: false,
                    label: "Search",
                    callBack: () => {
                      handleSearch();
                    },
                  },
                  { submit: true, label: "Save" },
                ]}
              />
            </div>
          </form>
          <div style={{ maxHeight: "200px", marginBottom: "10px" }}>
            <UpdatedDynamicTable
              rows={row}
              name="TAT Master Details"
              loading={GridData?.loading}
              viewKey="itemId"
              tableStyle={{ marginBottom: "-10px" }}
              columns={columns}
            />
          </div>
        </div>
      </>
    </div>
  );
}
