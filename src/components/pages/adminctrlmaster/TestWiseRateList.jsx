import React,{useEffect,useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { testWiseRateListHeader } from "../../listData/listData";
import useRippleEffect from "../../customehook/useRippleEffect";
import { TwoSubmitButton } from "../../../Custom Components/InputGenerator";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { useGetData, usePostData } from "../../../service/apiService";
import DynamicTable from "../../../Custom Components/DynamicTable";
import { addObjectId } from "../../../service/RedendentData";
import { getLocal } from "usehoks";
import toast from "react-hot-toast";

const MrpInputCell = ({ params, initialTime, setRow }) => {
  const [mrp, setMrp] = useState(params?.row?.mrp || initialTime || "");
  const [initialMrp] = useState(params?.row?.mrp || initialTime || ""); // Store initial value

  useEffect(() => {
    setMrp(params?.row?.mrp || initialTime || "");
  }, [params?.row?.mrp, initialTime]);

  const handleMrpChange = (newValue) => {
    setMrp(newValue);
    setRow((prev) =>
      prev.map((item) =>
        item.id === params?.row.id
          ? {
              ...item,
              mrp: parseInt(newValue) || 0,
              edited: (parseInt(newValue) || 0) !== (parseInt(initialMrp) || 0), // Compare with initial value
            }
          : item
      )
    );
  };

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={mrp}
        maxLength={8}
        name="mrp"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, "");
          handleMrpChange(newValue);
        }}
      />
    </div>
  );
};

const AddAllMrpInputCell = ({ initialTime, setRow, placeholder }) => {
  const [mrp, setMrp] = useState(initialTime ? initialTime.toString() : "");

  const handleGlobalMrpChange = (newValue) => {
    setMrp(newValue);
    setRow((prev) =>
      prev.map((item) => ({
        ...item,
        mrp: parseInt(newValue) || 0,
        edited: true,
      }))
    );
  };

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem",width:"60px" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={mrp}
        placeholder={placeholder}
        maxLength={8}
        name="mrp"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, "");
          handleGlobalMrpChange(newValue);
        }}
      />
    </div>
  );
};

const RateInputCell = ({ params, initialTime, setRow }) => {
  const [rate, setRate] = useState(params?.row?.rate || initialTime || "");
  const [initialRate] = useState(params?.row?.rate || initialTime || ""); // Store initial value

  useEffect(() => {
    setRate(params?.row?.rate || initialTime || "");
  }, [params?.row?.rate, initialTime]);

  const handleRateChange = (newValue) => {
    setRate(newValue);
    setRow((prev) =>
      prev.map((item) =>
        item.id === params?.row.id
          ? {
              ...item,
              rate: parseInt(newValue) || 0,
              edited:
                (parseInt(newValue) || 0) !== (parseInt(initialRate) || 0), // Compare with initial value
            }
          : item
      )
    );
  };

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
          const newValue = e.target.value.replace(/[^0-9]/g, "");
          handleRateChange(newValue);
        }}
      />
    </div>
  );
};

const AddAllRateInputCell = ({ initialTime, setRow, placeholder }) => {
  const [rate, setRate] = useState(initialTime ? initialTime.toString() : "");

  const handleGlobalMrpChange = (newValue) => {
    setRate(newValue);
    setRow((prev) =>
      prev.map((item) => ({
        ...item,
        rate: parseInt(newValue) || 0,
        edited: true,
      }))
    );
  };

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem",width:"60px" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={rate}
        placeholder={placeholder}
        maxLength={8}
        name="rate"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, "");
          handleGlobalMrpChange(newValue);
        }}
      />
    </div>
  );
};

const CheckboxInputCell = ({ params, setSelectedData, row }) => {
  const [enabled, setEnabled] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Enable checkbox if row is edited or SelectAll is true
    setEnabled(params?.row?.edited === true);
    // Set checked state based on SelectAll or edited status
    setChecked(params?.row?.SelectAll === true && params?.row?.edited === true);
  }, [row, params?.row?.SelectAll, params?.row?.edited]);

  useEffect(() => {
    // Add to selected data if checked
    if (checked && params?.row?.edited) {
      setSelectedData(prev => {
        // Only add if not already present
        if (!prev.some(item => item.id === params?.row.id)) {
          return [...prev, { ...params?.row }];
        }
        return prev;
      });
    } else {
      // Remove from selected data if unchecked
      setSelectedData(prev => prev.filter(item => item.id !== params?.row.id));
    }
  }, [checked]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="checkbox"
        disabled={!enabled}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </div>
  );
};

const CheckboxSelectAllInputCell = ({ params, setSelectedData, row, setRow }) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    // Update all rows with new SelectAll status
    setRow(prev =>
      prev.map(item => ({
        ...item,
        SelectAll: newSelectAll
      }))
    );

    // Update selected data
    if (newSelectAll) {
      // Add all edited rows to selected data
      const editedRows = row.filter(item => item.edited === true);
      setSelectedData(editedRows);
    } else {
      // Clear selected data
      setSelectedData([]);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="checkbox"
        checked={selectAll}
        onChange={handleSelectAll}
      />
    </div>
  );
};

export default function TestWiseRateList() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const [SelectedData, setSelectedData] = useState([]);
  const [row, setRow] = useState([]);
  //   --------------------- Department ------------------------------
  const [DepartmentId, setDepartmentId] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");
  //   ---------------------Sub Department ------------------------------
  const [SubDepartmentId, setSubDepartmentId] = useState("");
  const [SubDepartmentValue, setSubDepartmentValue] = useState("");
  const [SubDepartmentDropDown, setSubDepartmentDropDown] = useState(false);
  const [SubDepartmentHoveIndex, setSubDepartmentHoveIndex] = useState(null);
  const [SubDepartmentSelectedOption, setSubDepartmentSelectedOption] =
    useState("");
  //   ---------------------Investigation ------------------------------
  const [InvestigationId, setInvestigationId] = useState("");
  const [InvestigationValue, setInvestigationValue] = useState("");
  const [InvestigationDropDown, setInvestigationDropDown] = useState(false);
  const [InvestigationHoveIndex, setInvestigationHoveIndex] = useState(null);
  const [InvestigationSelectedOption, setInvestigationSelectedOption] =
    useState("");
  const SubDepartmentData = useGetData();
  const ItemData = useGetData();
  const GridData = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    const fetchedData = async () => {
      await ItemData?.fetchData(
        `/itemMaster?select=itemId,ItemName&$filter=(deptId eq ${SubDepartmentId})&$OrderBy=itemName`
      );
      await SubDepartmentData?.fetchData(
        `/labDepartment?select=id,deptname&$filter=(isactive eq 1 and subDeptName eq '${DepartmentValue}')`
      );
    };
    fetchedData();
  }, [DepartmentId, SubDepartmentId, row]);
  useEffect(() => {
    const fetchedData = async () => {
      await GridData?.fetchData(
        `/rateTypeWiseRateList/GetItemrateListData?itemid=${InvestigationId}`
      );
    };
    fetchedData();
  }, [InvestigationId]);
  useEffect(() => {
    const rows = addObjectId(GridData?.data?.data || []);
    setRow(rows);
  }, [GridData?.data?.data]);
  console.log(row);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    { field: "itemCode", headerName: "Item Code", flex: 1 },
    { field: "itemid", headerName: "Item Id", flex: 1 },
    { field: "itemname", headerName: "Item Name", flex: 1 },
    { field: "rateTypeId", headerName: "Rate Type Id", flex: 1 },
    { field: "ratetype", headerName: "Rate Type", flex: 1 },
    {
      field: "mrp",
      headerName: "MRP",
      renderHeaderCell: (params) => {
        return (
          <div className="flex gap-1">
            MRP
            <AddAllMrpInputCell
              setRow={setRow}
              initialTime={""}
              params={params}
              placeholder="Add MRP"
            />
          </div>
        );
      },
      width: 120,
      renderCell: (params) => {
        return (
          <MrpInputCell
            setRow={setRow}
            initialTime={params?.row?.mrp}
            params={params}
          />
        );
      },
    },
    {
      field: "rate",
      headerName: "Rate",
      renderHeaderCell: (params) => {
        return (
          <div className="flex gap-1">
            Rate
            <AddAllRateInputCell
              setRow={setRow}
              initialTime={""}
              params={params}
              placeholder="Add Rate"
            />
          </div>
        );
      },
      width: 120,
      renderCell: (params) => {
        return (
          <RateInputCell
            setRow={setRow}
            initialTime={params?.row?.rate}
            params={params}
          />
        );
      },
    },
    {
      field: `select`,
      headerName: `Select`,
      renderHeaderCell: (params) => {
        return (
          <div className="flex gap-1">
            Select All
            <CheckboxSelectAllInputCell
              setSelectedData={setSelectedData}
              row={row}
              setRow={setRow}
              params={params}
            />
          </div>
        );
      },
      with: 10,
      renderCell: (params) => {
        return (
          <CheckboxInputCell
            setSelectedData={setSelectedData}
            row={row}
            params={params}
          />
        );
      },
    },
  ];

  const handleOptionClick3 = (name, id) => {
    setInvestigationValue(name);
    setInvestigationId(id);
    setInvestigationSelectedOption(name);
    setInvestigationDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setInvestigationValue(e.target.value);
    setInvestigationDropDown(true); // Show dropdown when typing
  };

  const handleOptionClick2 = (name, id) => {
    setSubDepartmentValue(name);
    setSubDepartmentId(id);
    setSubDepartmentSelectedOption(name);
    setSubDepartmentDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setSubDepartmentValue(e.target.value);
    setSubDepartmentDropDown(true); // Show dropdown when typing
  };

  const handleOptionClick1 = (name, id) => {
    setDepartmentValue(name);
    setDepartmentId(id);
    setDepartmentSelectedOption(name);
    setDepartmentDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setDepartmentValue(e.target.value);
    setDepartmentDropDown(true); // Show dropdown when typing
  };

  const handleSubmit = async () => {
    if (SelectedData.length === 0) {
      toast.error("No data selected for submission.");
      return;
    }

    const formattedData = SelectedData.map((item) => ({
      isActive: 1,
      createdby: parseInt(lsData?.user?.employeeId),
      createdDateTime: new Date().toISOString(),
      id: 0,
      deptId: DepartmentId,
      rateTypeId: item?.rateTypeId,
      mrp: item?.mrp,
      discount: 0,
      rate: item?.rate,
      itemid: item?.itemid,
      itemCode: item?.itemCode,
      transferRemarks: "string",
      transferDate: new Date().toISOString(),
    }));
    console.log(formattedData);
    const res = await PostData?.postRequest(
      "/rateTypeWiseRateList/SaveRateListitemWise",
      formattedData
    );

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  console.log(SelectedData);
  return (
    <>
      <div>
        {/* Header Section */}
        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
          style={{ background: activeTheme?.blockColor }}
        >
          <div>
            <FontAwesomeIcon icon="fa-solid fa-house" />
          </div>
          <div>Test Wise RateList</div>
        </div>

        {/* form data */}
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            {/* Departement */}
            <SearchBarDropdown
              id="search-bar"
              name="Department"
              value={DepartmentValue}
              onChange={handleSearchChange1}
              label="Department"
              options={[
                { id: 1, data: "Pathology" },
                { id: 2, data: "Radiology" },
              ]}
              isRequired={false}
              showSearchBarDropDown={DepartmentDropDown}
              setShowSearchBarDropDown={setDepartmentDropDown}
              handleOptionClickForCentre={handleOptionClick1}
              setIsHovered={setDepartmentHoveIndex}
              isHovered={DepartmentHoveIndex}
            />
            {/* SubDepartement */}
            <SearchBarDropdown
              id="search-bar"
              name="SubDepartment"
              value={SubDepartmentValue}
              onChange={handleSearchChange2}
              label="Sub-Department"
              options={SubDepartmentData?.data}
              isRequired={false}
              showSearchBarDropDown={SubDepartmentDropDown}
              setShowSearchBarDropDown={setSubDepartmentDropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setSubDepartmentHoveIndex}
              isHovered={SubDepartmentHoveIndex}
            />

            {/* Item */}
            <SearchBarDropdown
              id="search-bar"
              name="Investigation"
              value={InvestigationValue}
              onChange={handleSearchChange3}
              label="Investigation"
              options={ItemData?.data}
              isRequired={false}
              showSearchBarDropDown={InvestigationDropDown}
              setShowSearchBarDropDown={setInvestigationDropDown}
              handleOptionClickForCentre={handleOptionClick3}
              setIsHovered={setInvestigationHoveIndex}
              isHovered={InvestigationHoveIndex}
            />
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
      </div>

      {/* grid data */}
      <DynamicTable rows={row} columns={columns} />
    </>
  );
}
