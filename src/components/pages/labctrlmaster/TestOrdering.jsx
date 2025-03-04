import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { useGetData, usePostData } from "../../../service/apiService";
import { TwoSubmitButton } from "../../../Custom Components/InputGenerator";
import { TableHeader } from "../../../Custom Components/DynamicTable";
import TestMappingTable from "../../../Custom Components/TestMappingTable";
import toast from "react-hot-toast";
export default function TestOrdering() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [OrderTypeValue, setOrderTypeValue] = useState("Department");
  const [OrderSequance, setOrderSequance] = useState([]);
  const [OrderTypeDropDown, setOrderTypeDropDown] = useState(false);
  const [OrderTypeHoveIndex, setOrderTypeHoveIndex] = useState(null);
  const [OrderTypeSelectedOption, setOrderTypeSelectedOption] = useState("");
  //   --------------- Departmnt -------------------
  const [DepartmentId, setDepartmentId] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");

  const DepartmentData = useGetData();
  const ItemData = useGetData();
  const PostData = usePostData();
  const ItemData1 = useGetData();
  useEffect(() => {
    if (OrderTypeValue !== "Department" && DepartmentId !== "") {
      DepartmentData?.fetchData(
        "/labDepartment?select=id,deptname&$orderby=printSequence"
      );
      ItemData1?.fetchData(
        `/itemMaster?select=itemId,ItemName&$filter=(deptId eq ${DepartmentId})&$OrderBy=displaySequence`
      );
    } else {
      ItemData?.fetchData(
        "/labDepartment?select=id,deptname&$orderby=printSequence"
      );
      DepartmentData?.fetchData(
        "/labDepartment?select=id,deptname&$orderby=printSequence"
      );
    }
  }, [OrderTypeValue, DepartmentValue]);

  const handleOptionClick3 = (name, id) => {
    setOrderTypeValue(name);
    setOrderTypeSelectedOption(name);
    setOrderTypeDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setOrderTypeValue(e.target.value);
    setOrderTypeDropDown(true); // Show dropdown when typing
  };
  const handleOptionClick = (name, id) => {
    setDepartmentValue(name);
    setDepartmentId(id);
    setDepartmentSelectedOption(name);
    setDepartmentDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange = (e) => {
    setDepartmentValue(e.target.value);
    setDepartmentDropDown(true); // Show dropdown when typing
  };

  const handleSubmit = async () => {
    const res = await PostData?.postRequest(
      `/labDepartment/UpdateDepartmentOrder?type=${OrderTypeValue}`,
      OrderSequance
    );
    console.log(PostData?.response);
    if (res?.success) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };
  // const handleSubmit = async () => {
  //   const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  //   try {
  //     const response = await axios.post(
  //       `${BASE_URL}/labDepartment/UpdateDepartmentOrder?type=${OrderTypeValue}`,
  //       OrderSequance
  //     );

  //     if (response?.data?.success) {
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Something went wrong!");
  //   }
  // };
  console.log(OrderSequance);
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
          <div>NABL Master</div>
        </div>

        {/* form data */}
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            <SearchBarDropdown
              id="search-bar"
              name="OrderTypeValue"
              value={OrderTypeValue}
              onChange={handleSearchChange3}
              label="Order Type"
              options={[{ data: "Test" }, { data: "Department" }]}
              isRequired={false}
              showSearchBarDropDown={OrderTypeDropDown}
              setShowSearchBarDropDown={setOrderTypeDropDown}
              handleOptionClickForCentre={handleOptionClick3}
              setIsHovered={setOrderTypeHoveIndex}
              isHovered={OrderTypeHoveIndex}
            />
            {OrderTypeValue !== "Department" && (
              <SearchBarDropdown
                id="search-bar"
                name="Department"
                value={DepartmentValue}
                onChange={handleSearchChange}
                label="Department"
                options={DepartmentData?.data}
                isRequired={false}
                keyField="id"
                showSearchBarDropDown={DepartmentDropDown}
                setShowSearchBarDropDown={setDepartmentDropDown}
                handleOptionClickForCentre={handleOptionClick}
                setIsHovered={setDepartmentHoveIndex}
                isHovered={DepartmentHoveIndex}
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
      </div>

      {/* grid data */}
      <div>
        <div
          className="w-full h-[0.10rem]"
          style={{ background: activeTheme?.menuColor }}
        ></div>
        <TableHeader title="Test Ordering Details" />
        {OrderTypeValue === "Department" && (
          <TestMappingTable
            OrderTypeValue={OrderTypeValue}
            allTestMappingGridData={ItemData?.data}
            setOrderSequance={setOrderSequance}
            headers={["Dept. Name"]}
            dataKeys={["deptName"]}
          />
        )}
        {ItemData1?.data.length > 0 && OrderTypeValue === "Test" && (
          <TestMappingTable
            OrderTypeValue={OrderTypeValue}
            allTestMappingGridData={ItemData1?.data}
            setOrderSequance={setOrderSequance}
            headers={["Item ID", "Item Name"]}
            dataKeys={["itemId", "itemName"]}
          />
        )}
      </div>
    </>
  );
}
