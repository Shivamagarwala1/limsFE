import React, { useEffect, useState } from "react";
import DynamicTable, {
  StyledHr,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  NumericInput,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import { addObjectId, addRandomObjectId } from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { getLocal } from "usehoks";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";

const QuantityInputCell = ({ params, initialQuantity = "", setRow }) => {
  const [Quantity, setQuantity] = useState(initialQuantity);
  const lsData = getLocal("imarsar_laboratory");
  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.itemId === params?.row.itemId
          ? {
              ...item,
              isActive: 1,
              createdById: parseInt(lsData?.user?.employeeId),
              createdDateTime: new Date().toISOString(),
              quantity: parseInt(Quantity) || 0,
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

// Main Component
export default function Indent() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();
  const [VisitorId, setVisitorId] = useState("");
  const [UpdatedBarcode, setUpdatedBarcode] = useState([]);

  // ------------------ User -------------------------------
  const [UserId, setUserId] = useState(null);
  const [UserValue, setUserValue] = useState("");
  const [UserDropDown, setUserDropDown] = useState(false);
  const [UserHoveIndex, setUserHoveIndex] = useState(null);
  const [UserSelectedOption, setUserSelectedOption] = useState("");

  // ------------------ Role -------------------------------
  const [RoleId, setRoleId] = useState(null);
  const [RoleValue, setRoleValue] = useState("");
  const [RoleDropDown, setRoleDropDown] = useState(false);
  const [RoleHoveIndex, setRoleHoveIndex] = useState(null);
  const [RoleSelectedOption, setRoleSelectedOption] = useState("");

  const [SelectedItem, setSelectedItem] = useState([]);

  const [row, setRow] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();
  const CategoryData = useGetData();
  const UserData = useGetData();
  const RoleData = useGetData();
  useEffect(() => {
    getData?.fetchData("/itemMasterStore");
    RoleData?.fetchData(
      `/empMaster/EmployeeWiseRole?EmplyeeId=${parseInt(
        lsData?.user?.employeeId
      )}`
    );
    UserData?.fetchData(
      `/empMaster?select=empid,fName,lName&$filter=(empid eq ${parseInt(
        lsData?.user?.employeeId
      )})`
    );
    setUserId(parseInt(lsData?.user?.employeeId));
    setUserValue(lsData?.user?.name);
  }, []);

  // console.log(getData?.data)
  // Columns for the table
  useEffect(() => {
    if (!getData?.data?.length) return; // Ensure data exists

    // Convert SelectedItem IDs to numbers (since getData?.data uses numbers)
    const selectedIds = SelectedItem.map((id) => Number(id));

    // Filter the data to only include selected items
    const updatedRows = getData.data.filter((item) =>
      selectedIds.includes(item.itemId)
    );

    setRow(addRandomObjectId(updatedRows)); // Ensure unique IDs are set
  }, [SelectedItem, getData?.data]);

  console.log(row, SelectedItem);
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "itemName", headerName: " Item Name", flex: 1 },
    {
      headerName: "Quantity",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <QuantityInputCell
              setRow={setRow}
              row={row}
              setUpdatedBarcode={setUpdatedBarcode}
              initialTime={params?.row?.Quantity}
              params={params}
            />
          </>
        );
      },
    },
  ];

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setUserValue(e.target.value);
    setUserDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setUserValue(name);
    setUserId(id);
    setUserSelectedOption(name);
    setUserDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setRoleValue(e.target.value);
    setRoleDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick3 = (name, id) => {
    setRoleValue(name);
    setRoleId(id);
    setRoleSelectedOption(name);
    setRoleDropDown(false);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = getValues();
    console.log(values);
    if (!RoleId) {
      toast.error("Role is required");
      return;
    }
    if (!UserId) {
      toast.error("User is required");
      return;
    }
    if (row?.length == 0) {
      toast.error("No Item Selected");
      return;
    }
    const payload = {
      isActive: 1,
      createdById: parseInt(lsData?.user?.employeeId),
      createdDateTime: new Date().toISOString(),
      indentId: 0,
      roleId: RoleId,
      indentBy: UserValue,
      indentById: UserId,
      indentStatus: 0,
      isrejected: 0,
      rejectedBy: 0,
      rejectDatetime: "0001-01-01",
      addIndentDetail: row,
    };

    try {
      const res = await PostData?.postRequest(`/Indent/CreateIndent`, payload);
      if (res?.success) {
        toast?.success(res?.message);
      } else {
        toast?.error(res?.message);
      }
    } catch (error) {
      toast?.error(res?.message);
    }
  };

  return (
    <div>
      <FormHeader title="Indent" />
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
          <SearchBarDropdown
            id="search-bar"
            name="Role"
            value={RoleValue}
            onChange={handleSearchChange3}
            label="Role"
            placeholder="Serch Role"
            options={RoleData?.data?.data}
            isRequired={false}
            showSearchBarDropDown={RoleDropDown}
            setShowSearchBarDropDown={setRoleDropDown}
            handleOptionClickForCentre={handleOptionClick3}
            setIsHovered={setRoleHoveIndex}
            isHovered={RoleHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <SearchBarDropdown
            id="search-bar"
            name="User"
            value={UserValue}
            onChange={handleSearchChange2}
            label="User"
            placeholder="Serch User"
            options={UserData?.data}
            isRequired={false}
            showSearchBarDropDown={UserDropDown}
            setShowSearchBarDropDown={setUserDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setUserHoveIndex}
            isHovered={UserHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <UpdatedMultiSelectDropDown
            id="ItemMode"
            name="serachItemMode"
            label="Item"
            placeHolder="Search Item"
            options={getData?.data}
            isMandatory={false}
            isDisabled={false}
            selectAll={false}
            optionKey="itemId"
            optionValue={["itemName"]}
            selectedValues={SelectedItem}
            setSelectedValues={setSelectedItem}
          />

          <TwoSubmitButton
            options={[
              {
                label: "Save",
                submit: true,
              },
            ]}
          />
        </div>
      </form>
      <StyledHr />
      <div className="h-[300px] w-full md:w-1/2">
        <DynamicTable
          rows={row}
          name="Indent Details"
          loading={getData?.loading}
          columns={columns}
          activeTheme={activeTheme}
          showHr={false}
        />
      </div>
    </div>
  );
}
