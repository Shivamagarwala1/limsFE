import React, { useEffect, useState } from "react";
import { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  getFormattedDate,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addRandomObjectId,
  convertToCustomFormat,
  convertToISO,
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { getLocal, getSession, setSession } from "usehoks";
import {
  IndentApprovePopupModal,
  IndentIssuePopupModal,
  RejectPopupModal,
} from "../../../../Custom Components/NewPopups";

// Main Component
export default function ViewIndent() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const todayDate = getFormattedDate();
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();

  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [Params, setParams] = useState({});
  const [ShowPopup, setShowPopup] = useState(false);
  const [ShowPopup1, setShowPopup1] = useState(false);
  const [ShowPopup2, setShowPopup2] = useState(false);
  // ------------------ User -------------------------------
  const [UserId, setUserId] = useState(0);
  const [UserValue, setUserValue] = useState("");
  const [UserDropDown, setUserDropDown] = useState(false);
  const [UserHoveIndex, setUserHoveIndex] = useState(null);
  const [UserSelectedOption, setUserSelectedOption] = useState("");

  // ------------------ Role -------------------------------
  const [RoleId, setRoleId] = useState(0);
  const [RoleValue, setRoleValue] = useState("");
  const [RoleDropDown, setRoleDropDown] = useState(false);
  const [RoleHoveIndex, setRoleHoveIndex] = useState(null);
  const [RoleSelectedOption, setRoleSelectedOption] = useState("");

  // ------------------ Item -------------------------------
  const [ItemId, setItemId] = useState(0);
  const [ItemValue, setItemValue] = useState("");
  const [ItemDropDown, setItemDropDown] = useState(false);
  const [ItemHoveIndex, setItemHoveIndex] = useState(null);
  const [ItemSelectedOption, setItemSelectedOption] = useState("");

  const [SelectedItem, setSelectedItem] = useState([]);

  const [row, setRow] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();
  const GridData = useGetData();
  const UserData = useGetData();
  const RoleData = useGetData();
  useEffect(() => {
    getData?.fetchData("/itemMasterStore");
    RoleData?.fetchData(
      `/roleMaster?select=id,rolename&$filter=(isactive eq 1)`
    );
    UserData?.fetchData(
      `/empMaster?select=empid,fName,lName&$filter=(isActive eq 1)`
    );
    getGridData();
  }, [ShowPopup, ShowPopup2, ShowPopup1]);

  const getGridData = async () => {
    const key = "indentItem";
    const value = getSession(key);
    if (!value) {
      return;
    }
    await GridData?.fetchData(
      `/Indent/GetIndentDetails?roleId=${RoleId}&empId=${UserId}&fromDate=${value?.from}&todate=${value?.to}&UserId=${UserId}&itemId=${ItemId}`
    );
    // `/Indent/GetIndentDetails?roleId=1&empId=2&fromDate=3&todate=4&UserId=5`
  };
  // console.log(getData?.data)
  // Columns for the table
  useEffect(() => {
    if (!GridData?.data?.data?.length) return; // Ensure data exists
    setRow(addRandomObjectId(GridData?.data?.data)); // Ensure unique IDs are set
  }, [SelectedItem, GridData?.data?.data, ShowPopup, ShowPopup2, ShowPopup1]);

  console.log(row, SelectedItem);
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "centrename", headerName: "Centre Name", flex: 1 },
    { field: "roleName", headerName: " Role Name", flex: 1 },
    { field: "createdBy", headerName: " Created By", flex: 1 },
    {
      field: "createdDateTime",
      headerName: " Created Date",
      flex: 1,
      renderCell: (params) => {
        const date = convertToCustomFormat(params?.row?.createdDateTime);
        return <div className="flex gap-1">{date}</div>;
      },
    },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    {
      field: "approvedQuantity",
      headerName: "Approved Quantity",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-1">{params?.row?.approvedQuantity || 0}</div>
        );
      },
    },
    { field: "issuedQuantity", headerName: "Issued Quantity", flex: 1 },
    {
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.status != -1 && (
              <>
                <div className="flex gap-1">
                  {params?.row?.status === 1 ? (
                    <div
                      onClick={() => {
                        setParams(params?.row);
                        setShowPopup1(true);
                      }}
                      className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                      style={{
                        background: activeTheme?.menuColor,
                        color: activeTheme?.iconColor,
                      }}
                    >
                      <svg
                        fill="#fff"
                        width="800px"
                        height="1.05rem"
                        viewBox="-1 0 19 19"
                        xmlns="http://www.w3.org/2000/svg"
                        class="cf-icon-svg"
                      >
                        <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zM5.85 3.309a6.833 6.833 0 1 0 2.65-.534 6.787 6.787 0 0 0-2.65.534zm2.654 1.336A1.136 1.136 0 1 1 7.37 5.78a1.136 1.136 0 0 1 1.135-1.136zm.792 9.223V8.665a.792.792 0 1 0-1.583 0v5.203a.792.792 0 0 0 1.583 0z" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setParams(params?.row);
                        setShowPopup2(true);
                      }}
                      className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                      style={{
                        background: activeTheme?.menuColor,
                        color: activeTheme?.iconColor,
                      }}
                    >
                      <svg
                        width="14px"
                        height="1.05rem"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="48"
                          height="48"
                          fill="white"
                          fill-opacity="0.01"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4 24L9 19L19 29L39 9L44 14L19 39L4 24Z"
                          fill="#fff"
                          stroke="#fff"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      setParams(params?.row);
                      setShowPopup(true);
                    }}
                    className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                    style={{
                      background: activeTheme?.menuColor,
                      color: activeTheme?.iconColor,
                    }}
                  >
                    R
                  </div>
                </div>
              </>
            )}
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

  // Function to handle input changes
  const handleSearchChange4 = (e) => {
    setItemValue(e.target.value);
    setItemDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick4 = (name, id) => {
    setItemValue(name);
    setItemId(id);
    setItemSelectedOption(name);
    setItemDropDown(false);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
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
    const from = await convertToISO(values?.FromDate, "from");
    const to = await convertToISO(values?.ToDate, "to");
    console.log(from, " ", FromDate);
    try {
      const res = await GridData?.fetchData(
        `/Indent/GetIndentDetails?roleId=${RoleId}&empId=${UserId}&fromDate=${from}&todate=${to}&UserId=${UserId}&itemId=${ItemId}`
      );
      // ?roleId=1&empId=2&fromDate=3&todate=4&UserId=5&itemId=6
      if (res?.data?.success) {
        // toast?.success(res?.data?.message);
        const key = "indentItem";
        const value = { from: from, to: to, };
        setSession(key, value);
      } else {
        toast?.error(res?.data?.message);
      }
    } catch (error) {
      toast?.error(res?.data?.message);
    }
  };

  return (
    <>
      <RejectPopupModal
        Params={Params}
        setShowPopup={setShowPopup}
        showPopup={ShowPopup}
        UserId={UserId}
      />
      <IndentIssuePopupModal
        Params={Params}
        setShowPopup={setShowPopup1}
        showPopup={ShowPopup1}
        UserId={UserId}
      />
      <IndentApprovePopupModal
        Params={Params}
        setShowPopup={setShowPopup2}
        showPopup={ShowPopup2}
        UserId={UserId}
      />
      <div>
        <FormHeader title="View Indent" />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
            <InputGenerator
              inputFields={[
                {
                  label: "From Date",
                  type: "customDateField",
                  name: "FromDate",
                  onChange: (e) => {
                    console.log(e);
                    setFromDate(e);
                  },
                },
                {
                  label: "To Date",
                  type: "customDateField",
                  name: "ToDate",
                  onChange: (e) => {
                    setToDate(e);
                  },
                },
              ]}
            />

            <SearchBarDropdown
              id="search-bar"
              name="Role"
              value={RoleValue}
              onChange={handleSearchChange3}
              label="Role"
              placeholder="Serch Role"
              options={RoleData?.data}
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
            <SearchBarDropdown
              id="search-bar"
              name="Item"
              value={ItemValue}
              onChange={handleSearchChange4}
              label="Item"
              placeholder="Serch Item"
              options={getData?.data}
              isRequired={false}
              showSearchBarDropDown={ItemDropDown}
              setShowSearchBarDropDown={setItemDropDown}
              handleOptionClickForCentre={handleOptionClick4}
              setIsHovered={setItemHoveIndex}
              isHovered={ItemHoveIndex}
              style={{ marginTop: "0.1rem" }}
            />

            <TwoSubmitButton
              options={[
                {
                  label: "Search",
                  submit: true,
                },
              ]}
            />
          </div>
        </form>
        <div className="h-[300px] w-full">
          <UpdatedDynamicTable
            rows={row}
            name="View Indent Details"
            loading={GridData?.loading}
            columns={columns}
            viewKey="Random"
          />
        </div>
      </div>
    </>
  );
}
