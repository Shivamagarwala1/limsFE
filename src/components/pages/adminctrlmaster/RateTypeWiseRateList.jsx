import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import FormHeader from "../../../components/global/FormHeader";
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
  const [mrp, setMrp] = useState(initialTime || "");

  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.id === params?.row.id
          ? {
              ...item,
              mrp: parseInt(mrp),
              edited: parseInt(mrp) !== initialTime,
            }
          : item
      )
    );
  }, [mrp]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="number"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={mrp}
        name="mrp"
        onChange={(e) => setMrp(e.target.value)}
      />
    </div>
  );
};

const RateInputCell = ({ params, initialTime, setRow }) => {
  const [rate, setRate] = useState(initialTime || "");

  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.id === params?.row.id
          ? {
              ...item,
              rate: parseInt(rate),
              edited: parseInt(rate) !== initialTime,
            }
          : item
      )
    );
  }, [rate]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="number"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={rate}
        name="rate"
        onChange={(e) => setRate(e.target.value)}
      />
    </div>
  );
};

const CheckboxInputCell = ({ params, setSelectedData, row }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (params?.row?.mrp == 0.0) {
      setEnabled(false);
    } else {
      // Enable checkbox only if the row is edited
      setEnabled(params?.row?.edited === true);
    }
  }, [row]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="checkbox"
        disabled={!enabled} // Disable if not edited
        onClick={() =>
          setSelectedData(
            (prev) =>
              prev.some((item) => item.id === params?.row.id)
                ? prev.filter((item) => item.id !== params?.row.id) // Remove if exists
                : [...prev, { ...params?.row }] // Add if not
          )
        }
      />
    </div>
  );
};

export default function RateTypeWiseRateList() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const [SelectedData, setSelectedData] = useState([]);
  const [row, setRow] = useState([]);
  //   --------------------- RateType ------------------------------
  const [RateTypeId, setRateTypeId] = useState("");
  const [RateTypeValue, setRateTypeValue] = useState("");
  const [RateTypeDropDown, setRateTypeDropDown] = useState(false);
  const [RateTypeHoveIndex, setRateTypeHoveIndex] = useState(null);
  const [RateTypeSelectedOption, setRateTypeSelectedOption] = useState("");
  //   ---------------------Department ------------------------------
  const [DepartmentId, setDepartmentId] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");
  //   ---------------------Investigation ------------------------------
  const [InvestigationId, setInvestigationId] = useState("");
  const [InvestigationValue, setInvestigationValue] = useState("");
  const [InvestigationDropDown, setInvestigationDropDown] = useState(false);
  const [InvestigationHoveIndex, setInvestigationHoveIndex] = useState(null);
  const [InvestigationSelectedOption, setInvestigationSelectedOption] =
    useState("");
  const DepartmentData = useGetData();
  const ItemData = useGetData();
  const GridData = useGetData();
  const RateTypeData = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    const fetchedData = async () => {
      await RateTypeData?.fetchData(
        "/rateTypeMaster?select=id,ratename&$filter=(isActive eq 1)"
      );
      await ItemData?.fetchData(
        `/itemMaster?select=itemId,ItemName&$filter=(deptId eq ${DepartmentId})&$OrderBy=itemName`
      );
      await DepartmentData?.fetchData(`/labDepartment?select=id,deptname`);
    };
    fetchedData();
  }, [DepartmentId, DepartmentId, row]);
  useEffect(() => {
    const fetchedData = async () => {
      await GridData?.fetchData(
        `/rateTypeWiseRateList/GetRateTypeRateListData?ratetypeid=${RateTypeId}&deptId=${DepartmentId}`
      );
    };
    fetchedData();
  }, [DepartmentId]);
  useEffect(() => {
    const rows = addObjectId(GridData?.data?.data || []);
    setRow(rows);
  }, [GridData?.data?.data]);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    { field: "itemCode", headerName: "Item Code", flex: 1 },
    { field: "itemId", headerName: "Item Id", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    {
      field: "mrp",
      headerName: "MRP",
      flex: 1,
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
      flex: 1,
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
      flex: 1,
      renderCell: (params) => {
        return (
          <CheckboxInputCell
            setSelectedData={setSelectedData}
            initialTime={params?.row}
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
    setDepartmentValue(name);
    setDepartmentId(id);
    setDepartmentSelectedOption(name);
    setDepartmentDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setDepartmentValue(e.target.value);
    setDepartmentDropDown(true); // Show dropdown when typing
  };

  const handleOptionClick1 = (name, id) => {
    setRateTypeValue(name);
    setRateTypeId(id);
    setRateTypeSelectedOption(name);
    setRateTypeDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setRateTypeValue(e.target.value);
    setRateTypeDropDown(true); // Show dropdown when typing
  };

//   const handleSubmit = async () => {
//     if (SelectedData.length === 0) {
//       toast.error("No data selected for submission.");
//       return;
//     }

//     const formattedData = SelectedData.map((item) => ({
//       isActive: 1,
//       createdby: parseInt(lsData?.user?.employeeId),
//       createdDateTime: new Date().toISOString(),
//       id: 0,
//       deptId: DepartmentId,
//       rateTypeId: item?.rateTypeId,
//       mrp: item?.mrp,
//       discount: 0,
//       rate: item?.rate,
//       itemid: item?.itemid,
//       itemCode: item?.itemCode,
//       transferRemarks: "string",
//       transferDate: new Date().toISOString(),
//     }));
//     console.log(formattedData);
//     const res = await PostData?.postRequest(
//       "/rateTypeWiseRateList/SaveRateListitemWise",
//       formattedData
//     );

//     if (res.success) {
//       toast.success(res.message);
//     } else {
//       toast.error(res.message);
//     }
//   };

  console.log(SelectedData);
  return (
    <>
      <div>
        {/* Header Section */}
        <FormHeader headerData="Rate Type Wise RateList" />
        {/* form data */}
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            {/* Departement */}
            <SearchBarDropdown
              id="search-bar"
              name="RateType"
              value={RateTypeValue}
              onChange={handleSearchChange1}
              label="Rate Type"
              options={RateTypeData?.data}
              isRequired={false}
              showSearchBarDropDown={RateTypeDropDown}
              setShowSearchBarDropDown={setRateTypeDropDown}
              handleOptionClickForCentre={handleOptionClick1}
              setIsHovered={setRateTypeHoveIndex}
              isHovered={RateTypeHoveIndex}
            />
            {/* SubDepartement */}
            <SearchBarDropdown
              id="search-bar"
              name="Department"
              value={DepartmentValue}
              onChange={handleSearchChange2}
              label="Department"
              options={DepartmentData?.data}
              isRequired={false}
              showSearchBarDropDown={DepartmentDropDown}
              setShowSearchBarDropDown={setDepartmentDropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setDepartmentHoveIndex}
              isHovered={DepartmentHoveIndex}
            />
            {/* Item */}
            <SearchBarDropdown
              id="search-bar"
              name="Investigation"
              value={InvestigationValue}
              onChange={handleSearchChange3}
              label="Search By Test Name"
              options={ItemData?.data}
              isRequired={false}
              showSearchBarDropDown={InvestigationDropDown}
              setShowSearchBarDropDown={setInvestigationDropDown}
              handleOptionClickForCentre={handleOptionClick3}
              setIsHovered={setInvestigationHoveIndex}
              isHovered={InvestigationHoveIndex}
            />
            {/* Rate Type */}

            {/* Departement */}

            {/* Search By Test Name */}

            {/* Search By Item Code */}

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
