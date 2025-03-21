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

const AmountInputCell = ({ params, initialTime, setRow }) => {
  const [rate, setRate] = useState(initialTime || 0);

  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.Random === params?.row.Random
          ? {
              ...item,
              amount: parseInt(rate),
              edited: parseInt(rate) !== initialTime,
            }
          : item
      )
    );
  }, [rate]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={rate}
        maxLength={8}
        name="rate"
        onChange={(e) => {
          if (params?.row?.percentage > 0) {
            return;
          } else {
            const newValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
            setRate(newValue);
          }
        }}
      />
    </div>
  );
};

const PerInputCell = ({ params, initialTime, setRow }) => {
  const [rate, setRate] = useState(initialTime || 0);

  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.Random === params?.row.Random
          ? {
              ...item,
              percentage: parseInt(rate),
              edited: parseInt(rate) !== initialTime,
            }
          : item
      )
    );
  }, [rate]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={rate}
        maxLength={8}
        name="rate"
        onChange={(e) => {
          if (params?.row?.amount > 0) {
            return;
          } else {
            const newValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
            setRate(newValue);
          }
        }}
      />
    </div>
  );
};

const SelectInputCell = ({ initialTime, setRow, params, DepartmentData }) => {
  const [Edited, setEdited] = useState(initialTime ?? true); // Default to true
  const [DepartmentId, setDepartmentId] = useState(initialTime);
  const [DepartmentValue, setDepartmentValue] = useState(
    initialTime == 0 ? "Lab" : "Doctor"
  );
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");

  useEffect(() => {
    const isEdited =
      DepartmentId !== params?.row?.outsourceLabId ||
      DepartmentValue !== params?.row?.outsourceLabName;
    const findedValue = params?.row?.outSourcelabs?.find(
      (item) => item?.id == DepartmentId
    );

    console.log("DepartmentData => ", findedValue);
    setRow((prev) =>
      prev.some((item) => item.Random === params?.row.Random)
        ? prev.map((item) =>
            item.Random === params?.row.Random
              ? {
                  ...item,
                  absorbedBy: DepartmentId,
                  edited: isEdited, // ✅ Mark as edited only if department changed
                }
              : item
          )
        : [
            ...prev,
            {
              ...params?.row,
              absorbedBy: DepartmentId,
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
        options={[
          { id: 0, data: "Lab" },
          { id: 1, data: "Doctor" },
        ]}
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
export default function DiscountReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const todayDate = getFormattedDate();
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();
  // ------------------ ShareType -------------------------------
  const [ShareTypeId, setShareTypeId] = useState(0);
  const [ShareTypeValue, setShareTypeValue] = useState("Default");
  const [ShareTypeDropDown, setShareTypeDropDown] = useState(false);
  const [ShareTypeHoveIndex, setShareTypeHoveIndex] = useState(null);
  const [ShareTypeSelectedOption, setShareTypeSelectedOption] = useState("");
  // ------------------ Type -------------------------------
  const [TypeId, setTypeId] = useState(null);
  const [TypeValue, setTypeValue] = useState("Department");
  const [TypeDropDown, setTypeDropDown] = useState(false);
  const [TypeHoveIndex, setTypeHoveIndex] = useState(null);
  const [TypeSelectedOption, setTypeSelectedOption] = useState("");

  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState("");
  const [CenterDropDown, setCenterDropDown] = useState(false);
  const [CenterHoveIndex, setCenterHoveIndex] = useState(null);
  const [CenterSelectedOption, setCenterSelectedOption] = useState("");

  // ------------------ Doctor -------------------------------
  const [DoctorId, setDoctorId] = useState(0);
  const [DoctorValue, setDoctorValue] = useState("");
  const [DoctorDropDown, setDoctorDropDown] = useState(false);
  const [DoctorHoveIndex, setDoctorHoveIndex] = useState(null);
  const [DoctorSelectedOption, setDoctorSelectedOption] = useState("");

  // ------------------ Lab -------------------------------
  const [LabId, setLabId] = useState(0);
  const [LabValue, setLabValue] = useState("");
  const [LabDropDown, setLabDropDown] = useState(false);
  const [LabHoveIndex, setLabHoveIndex] = useState(null);
  const [LabSelectedOption, setLabSelectedOption] = useState("");

  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [UserValue, setUserValue] = useState([]);
  const [row, setRow] = useState([]);

  const { fetchData, response, data, loading } = useGetData();
  const getData = useGetData();
  const PostData = usePostData();
  const GridData = useGetData();
  const LabData = useGetData();
  const DoctorData = useGetData();
  useEffect(() => {
    getData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1 )"
    );
    DoctorData?.fetchData(
      `/doctorReferalMaster?select=doctorId,doctorName&$filter=(isActive eq 1 and type eq 1)`
    );
    LabData?.fetchData(
      `/labDepartment?select=id,deptname&$filter=(isactive eq 1 and id ne 16)`
    );
  }, []);

  useEffect(() => {
    getReason();
  }, [LabId, CenterId, DoctorId, TypeValue, ShareTypeId]);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    {
      field: "name",
      headerName: "Department",
      flex: 1,
      renderCell: (params) => {
        const findData = LabData?.data?.find(
          (item) => item?.id == params?.row?.deptId
        );
        return <div>{findData?.deptName}</div>;
      },
    },
    {
      field: "",
      headerName: "Discount Observed By",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <SelectInputCell
              params={params}
              setRow={setRow}
              initialTime={params?.row?.absorbedBy}
            />
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <AmountInputCell
              params={params}
              setRow={setRow}
              initialTime={params?.row?.amount}
            />
          </div>
        );
      },
    },
    {
      field: "percentage",
      headerName: "Percentage",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <PerInputCell
              params={params}
              setRow={setRow}
              initialTime={params?.row?.percentage}
            />
          </div>
        );
      },
    },
  ];
  const columns1 = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "itemId", headerName: "Item Id", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    {
      field: "",
      headerName: "Discount Observed By",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <SelectInputCell
              params={params}
              setRow={setRow}
              initialTime={params?.row?.absorbedBy}
            />
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <AmountInputCell
              params={params}
              setRow={setRow}
              initialTime={params?.row?.amount}
            />
          </div>
        );
      },
    },
    {
      field: "percentage",
      headerName: "Percentage",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <PerInputCell
              params={params}
              setRow={setRow}
              initialTime={params?.row?.percentage}
            />
          </div>
        );
      },
    },
  ];
  // Handle form submission
  const handleSubmit = async () => {
    const filteredRows = await row.filter((item) => item.edited);

    if (filteredRows.length < 1) {
      toast.error("Not Data For Save");
      return;
    }

    const payload = await filteredRows.map((item) => ({
      id: item?.id || 0,
      doctorid: DoctorId || 0, // Default value
      deptid: item.deptId || 0,
      itemID: item.itemId || 0,
      centreid: CenterId, // Default value
      percentage: item.percentage || 0,
      amount: item.amount || 0,
      type: ShareTypeId, // Default value
      absorbedBy: item.absorbedBy,
      createdBYID: parseInt(lsData?.user?.employeeId), // Default value
      createdbyName: lsData?.user?.name, // Default value, replace if needed
      createdDate: new Date().toISOString(), // Default to current timestamp
    }));

    try {
      const res = await PostData?.postRequest(
        `/doctorShareMaster/SaveUpdateDoctorShareData`,
        payload
      );
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast?.error(res?.data?.message);
    }
  };

  const getReason = async () => {
    const get = await fetchData(
      `/doctorShareMaster/GetDoctorShareData?DoctorId=${DoctorId}&DepartMentId=${LabId}&CentreId=${CenterId}&type=${ShareTypeId}&typeWise=${
        TypeValue == "Department" ? "Department" : "item"
      }`
    );
    setRow(addRandomObjectId(get?.data?.data));
  };

  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setDoctorValue(e.target.value);
    setDoctorDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setDoctorValue(name);
    setDoctorId(id);
    setDoctorSelectedOption(name);
    setDoctorDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setCenterValue(e.target.value);
    setCenterDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setCenterValue(name);
    setCenterId(id);
    setCenterSelectedOption(name);
    setCenterDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setLabValue(e.target.value);
    setLabDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick3 = (name, id) => {
    setLabValue(name);
    setLabId(id);
    setLabSelectedOption(name);
    setLabDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange4 = (e) => {
    setRow([]);
    setShareTypeValue(e.target.value);
    setShareTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick4 = (name, id) => {
    setRow([]);
    setShareTypeValue(name);
    setShareTypeId(id);
    setShareTypeSelectedOption(name);
    setShareTypeDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange5 = (e) => {
    setTypeValue(e.target.value);
    setTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick5 = (name, id) => {
    setTypeValue(name);
    setTypeId(id);
    setTypeSelectedOption(name);
    setTypeDropDown(false);
  };
  return (
    <>
      <div>
        <FormHeader title="Doctor Share Master" />
        <form autoComplete="off" ref={formRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
            <SearchBarDropdown
              id="search-bar"
              name="ShareType"
              value={ShareTypeValue}
              onChange={handleSearchChange4}
              label="ShareType"
              placeholder="Serch ShareType"
              options={[
                { id: 0, data: "Default" },
                { id: 1, data: "Special" },
              ]}
              isRequired={false}
              showSearchBarDropDown={ShareTypeDropDown}
              setShowSearchBarDropDown={setShareTypeDropDown}
              handleOptionClickForCentre={handleOptionClick4}
              setIsHovered={setShareTypeHoveIndex}
              isHovered={ShareTypeHoveIndex}
              style={{ marginTop: "0.1rem" }}
            />
            <SearchBarDropdown
              id="search-bar"
              name="Type"
              value={TypeValue}
              onChange={handleSearchChange5}
              label="Type"
              placeholder="Serch Type"
              options={[{ data: "Department" }, { data: "Item" }]}
              isRequired={false}
              showSearchBarDropDown={TypeDropDown}
              setShowSearchBarDropDown={setTypeDropDown}
              handleOptionClickForCentre={handleOptionClick5}
              setIsHovered={setTypeHoveIndex}
              isHovered={TypeHoveIndex}
              style={{ marginTop: "0.1rem" }}
            />
            <SearchBarDropdown
              id="search-bar"
              name="Center"
              value={CenterValue}
              onChange={handleSearchChange2}
              label="Center"
              placeholder="Serch Center"
              options={getData?.data}
              isRequired={false}
              showSearchBarDropDown={CenterDropDown}
              setShowSearchBarDropDown={setCenterDropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setCenterHoveIndex}
              isHovered={CenterHoveIndex}
              style={{ marginTop: "0.1rem" }}
            />{" "}
            {TypeValue == "Item" && (
              <SearchBarDropdown
                id="search-bar"
                name="Department"
                value={LabValue}
                onChange={handleSearchChange3}
                label="Department"
                placeholder="Serch Department"
                options={LabData?.data}
                isRequired={false}
                showSearchBarDropDown={LabDropDown}
                setShowSearchBarDropDown={setLabDropDown}
                handleOptionClickForCentre={handleOptionClick3}
                setIsHovered={setLabHoveIndex}
                isHovered={LabHoveIndex}
                style={{ marginTop: "0.1rem" }}
              />
            )}
            {ShareTypeValue == "Special" && (
              <SearchBarDropdown
                id="search-bar"
                name="Doctor"
                value={DoctorValue}
                onChange={handleSearchChange1}
                label="Doctor"
                placeholder="Serch Doctor"
                options={DoctorData?.data}
                isRequired={false}
                showSearchBarDropDown={DoctorDropDown}
                setShowSearchBarDropDown={setDoctorDropDown}
                handleOptionClickForCentre={handleOptionClick1}
                setIsHovered={setDoctorHoveIndex}
                isHovered={DoctorHoveIndex}
                style={{ marginTop: "0.1rem" }}
              />
            )}
            <TwoSubmitButton
              options={[
                {
                  label: "Save",
                  submit: false,
                  callBack: () => {
                    handleSubmit();
                  },
                },
              ]}
            />
          </div>
        </form>
        <div className="h-[300px] w-full">
          <UpdatedDynamicTable
            rows={row}
            name="Doctor Share Master Details"
            loading={loading}
            columns={TypeValue == "Department" ? columns : columns1}
            viewKey="Random"
          />
        </div>
      </div>
    </>
  );
}
