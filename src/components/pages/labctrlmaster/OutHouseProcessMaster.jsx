import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { outHouseProcessMasterHeader } from "../../listData/listData";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import useRippleEffect from "../../customehook/useRippleEffect";
import { FormHeader } from "../../../Custom Components/FormGenerator";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { useGetData, usePostData } from "../../../service/apiService";
import { TwoSubmitButton } from "../../../Custom Components/InputGenerator";
import toast from "react-hot-toast";
import { getLocal } from "usehoks";
import { AiFillDelete } from "react-icons/ai";
import DynamicTable from "../../../Custom Components/DynamicTable";
import axios from "axios";
import { UpdatedMultiSelectDropDown } from "../../../Custom Components/UpdatedMultiSelectDropDown";

export default function OutHouseProcessMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  const [Flag, setFlag] = useState(false);
  const [ShowRow, setShowRow] = useState(false);
  const [BookingId, setBookingId] = useState("");
  const [BookingValue, setBookingValue] = useState("");
  const [BookingDropDown, setBookingDropDown] = useState(false);
  const [BookingHoveIndex, setBookingHoveIndex] = useState(null);
  const [BookingSelectedOption, setBookingSelectedOption] = useState("");
  //   --------------- Processing Centre -------------------
  const [ProcessingId, setProcessingId] = useState("");
  const [ProcessingValue, setProcessingValue] = useState("");
  const [ProcessingDropDown, setProcessingDropDown] = useState(false);
  const [ProcessingHoveIndex, setProcessingHoveIndex] = useState(null);
  const [ProcessingSelectedOption, setProcessingSelectedOption] = useState("");
  //   --------------- Departmnt -------------------
  const [DepartmentId, setDepartmentId] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");
  // ----------------------- Investigation -----------------------
  const [InvestigationId, setInvestigationId] = useState("");
  const [InvestigationValue, setInvestigationValue] = useState([]);

  const ItemData = useGetData();
  const TestData = useGetData();
  const ProcessingData = useGetData();
  const DepartmentData = useGetData();
  const PostData = usePostData();
  const GridData = useGetData();
  useEffect(() => {
    if (BookingId !== "" || ProcessingId !== "") {
      if (BookingId === ProcessingId) {
        setProcessingId("");
        setProcessingValue("");
        setProcessingDropDown(false);
        setProcessingHoveIndex(null);
        setProcessingSelectedOption("");
        toast.error("Processing Center & Booking Center Cannot Be Same");
      }
    }
  }, [BookingId, ProcessingId]);
  useEffect(() => {
    fetchedData();
  }, [DepartmentId]);
  useEffect(() => {
    fetchGrid();
  }, [ProcessingId, DepartmentId, BookingId, Flag]);
  const fetchedData = async () => {
    await TestData?.fetchData(
      `/itemMaster?select=itemId,ItemName&$filter=(deptId eq ${DepartmentId})&$OrderBy=itemName`
    );
    await ItemData?.fetchData("/centreMaster?select=centreid,companyName");
    await ProcessingData?.fetchData(`/centreMaster/GetProcesiongLab`);
    await DepartmentData?.fetchData(
      "/labDepartment?select=id,deptname&$orderby=printSequence"
    );
    // await ObservationData?.fetchData(
    //   `/itemMaster/GetProfileObservation?itemId=${ObservationId}`
    // );
  };

  console.log(InvestigationValue);
  const handleOptionClick = (name, id) => {
    setProcessingValue(name);
    setProcessingId(id);
    setProcessingSelectedOption(name);
    setProcessingDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange = (e) => {
    setProcessingValue(e.target.value);
    setProcessingDropDown(true); // Show dropdown when typing
  };
  const handleOptionClick3 = async (name, id) => {
    setBookingValue(name);
    setBookingId(id);
    // await fetchGrid();
    await sessionStorage.setItem("BookingId", JSON.stringify(id));
    setBookingSelectedOption(name);
    setBookingDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setBookingValue(e.target.value);
    setBookingDropDown(true); // Show dropdown when typing
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

  const fetchGrid = async () => {
    if (!BookingId || !ProcessingId || !DepartmentId) return;
    GridData?.fetchData(
      `/item_OutHouseMaster/GetOutHouseMapping?BookingCentre=${BookingId}&ProcessingCentre=${ProcessingId}&DeptId=${DepartmentId}`
    );
    setShowRow(true);
  };

  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    { field: "bookingCentre", headerName: "Centre Name", flex: 1 },
    { field: "processingCentre", headerName: "Processing Centre", flex: 1 },
    { field: "deptName", headerName: "Dept Name", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <div
              onClick={() => handleDelete(params?.row?.id)}
              className="h-[1rem] flex justify-center items-center cursor-pointer rounded font-semibold w-4"
              style={{
                background: activeTheme?.menuColor,
                color: activeTheme?.iconColor,
              }}
            >
              <AiFillDelete style={{ color: "red", fontSize: "10px" }} />
            </div>
          </div>
        );
      },
    },
  ];

  const handleSubmit = async () => {
    try {
      const Payload = await InvestigationValue?.map((item) => {
        return {
          createdById: parseInt(lsData?.user?.employeeId),
          createdDateTime: new Date().toISOString(),
          processingLabId: ProcessingId,
          bookingCentreId: BookingId,
          itemId: item,
          departmentId: DepartmentId,
        };
      });

      const res = await PostData?.postRequest(
        `/item_OutHouseMaster/SaveOutHouseMapping`,
        Payload
      );
      console.log(PostData?.response);
      if (res?.success) {
        toast.success(res?.message);
        GridData?.fetchData(
          `/item_OutHouseMaster/GetOutHouseMapping?BookingCentre=${BookingId}&ProcessingCentre=${ProcessingId}&DeptId=${DepartmentId}`
        );
        // /item_OutHouseMaster/GetOutHouseMapping?BookingCentre=1&ProcessingCentre=1&DeptId=1
        setShowRow(true);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid item ID");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/item_OutHouseMaster/RemoveOutHouseMapping?id=${id}`
      );

      console.log("Delete Response:", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Delete Error:", error.response);

      if (error.response) {
        toast.error(error.response.data?.message || "Failed to delete item");
      } else {
        toast.error("Network error or no response received");
      }
    } finally {
      setFlag(!Flag);
    }
  };
  return (
    <>
      <div>
        {/* Header Section */}
        <FormHeader title="Out House Process Master" />

        {/* form data */}
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            {/* Booking Centre */}
            <SearchBarDropdown
              id="search-bar"
              name="BookingValue"
              value={BookingValue}
              onChange={handleSearchChange3}
              label="Booking Center"
              options={ProcessingData?.data?.data}
              isRequired={false}
              showValueField="companyName"
              keyField="centreId"
              showSearchBarDropDown={BookingDropDown}
              setShowSearchBarDropDown={setBookingDropDown}
              handleOptionClickForCentre={handleOptionClick3}
              setIsHovered={setBookingHoveIndex}
              isHovered={BookingHoveIndex}
            />
            {/* Processing Centre */}
            <SearchBarDropdown
              id="search-bar"
              name="Processing"
              value={ProcessingValue}
              onChange={handleSearchChange}
              label="Processing Center"
              options={ProcessingData?.data?.data}
              isRequired={false}
              showValueField="companyName"
              keyField="centreId"
              showSearchBarDropDown={ProcessingDropDown}
              setShowSearchBarDropDown={setProcessingDropDown}
              handleOptionClickForCentre={handleOptionClick}
              setIsHovered={setProcessingHoveIndex}
              isHovered={ProcessingHoveIndex}
            />
            {/* Department */}
            <SearchBarDropdown
              id="search-bar"
              name="Department"
              value={DepartmentValue}
              onChange={handleSearchChange1}
              label="Department"
              options={DepartmentData?.data}
              isRequired={false}
              showSearchBarDropDown={DepartmentDropDown}
              setShowSearchBarDropDown={setDepartmentDropDown}
              handleOptionClickForCentre={handleOptionClick1}
              setIsHovered={setDepartmentHoveIndex}
              isHovered={DepartmentHoveIndex}
            />
            {/* Investigation */}
            {/* <SearchBarDropdown
              id="search-bar"
              name="Investigation"
              value={InvestigationValue}
              onChange={handleSearchChange2}
              label="Investigation"
              options={TestData?.data}
              isRequired={false}
              showSearchBarDropDown={InvestigationDropDown}
              setShowSearchBarDropDown={setInvestigationDropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setInvestigationHoveIndex}
              isHovered={InvestigationHoveIndex}
            /> */}
            <UpdatedMultiSelectDropDown
              id="Investigation"
              name="serachInvestigation"
              label="Investigation"
              placeHolder="Search Investigation"
              options={TestData?.data || []}
              isMandatory={false}
              isDisabled={false}
              optionKey="itemId"
              optionValue={["itemName"]}
              selectedValues={InvestigationValue}
              setSelectedValues={setInvestigationValue}
            />
            <TwoSubmitButton
              options={[
                {
                  label: "Save",
                  submit: false,
                  style: { width: "100px" },
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
        <DynamicTable
          name="Out House Process Master Details"
          rows={ShowRow ? GridData?.data?.data : []}
          columns={columns}
        />
      </div>
    </>
  );
}
