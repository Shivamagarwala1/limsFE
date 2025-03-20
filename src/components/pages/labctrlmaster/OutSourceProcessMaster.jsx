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
import DynamicTable, {
  StyledHr,
  UpdatedDynamicTable,
} from "../../../Custom Components/DynamicTable";
import axios from "axios";
import { UpdatedMultiSelectDropDown } from "../../../Custom Components/UpdatedMultiSelectDropDown";
import { addRandomObjectId } from "../../../service/RedendentData";

const RateInputCell = ({ params, initialQuantity = "", setRow }) => {
  const [Quantity, setQuantity] = useState(initialQuantity);
  useEffect(() => {
    const isEdited = Quantity !== params?.row?.rate;
    setRow((prev) =>
      prev.map((item) =>
        item.index === params?.row.index
          ? {
              ...item,
              rate: parseInt(Quantity),
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

export default function OutSourceProcessMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  const [Flag, setFlag] = useState(false);
  const [BookingId, setBookingId] = useState("");
  const [BookingValue, setBookingValue] = useState("");
  const [BookingDropDown, setBookingDropDown] = useState(false);
  const [BookingHoveIndex, setBookingHoveIndex] = useState(null);
  const [BookingSelectedOption, setBookingSelectedOption] = useState("");
  //   --------------- Lab Centre -------------------
  const [LabId, setLabId] = useState("");
  const [LabValue, setLabValue] = useState("");
  const [LabDropDown, setLabDropDown] = useState(false);
  const [LabHoveIndex, setLabHoveIndex] = useState(null);
  const [LabSelectedOption, setLabSelectedOption] = useState("");
  //   --------------- Departmnt -------------------
  const [DepartmentId, setDepartmentId] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");
  // ----------------------- Investigation -----------------------
  const [InvestigationId, setInvestigationId] = useState("");
  const [InvestigationValue, setInvestigationValue] = useState([]);
  const [FilteredItems, setFilteredItems] = useState([]);

  const [row, setRow] = useState([]);
  const ItemData = useGetData();
  const TestData = useGetData();
  const LabData = useGetData();
  const DepartmentData = useGetData();
  const PostData = usePostData();
  const GridData = useGetData();
  const ProcessingData = useGetData();
  useEffect(() => {
    fetchedData();
  }, [DepartmentId]);
  useEffect(() => {
    const filteredItems = TestData?.data
      ?.filter((item) => InvestigationValue.includes(item.itemId.toString()))
      .map((item, index) => ({ ...item, index: index + 1 }));
    setFilteredItems(filteredItems);
  }, [InvestigationValue]);
  useEffect(() => {
    fetchGrid();
  }, [LabId, DepartmentId, BookingId, Flag]);
  const fetchedData = async () => {
    await ProcessingData?.fetchData(`/centreMaster/GetProcesiongLab`);
    await TestData?.fetchData(
      `/itemMaster?select=itemId,ItemName&$filter=(deptId eq ${DepartmentId})&$OrderBy=itemName`
    );
    await ItemData?.fetchData("/centreMaster?select=centreid,companyName");
    await LabData?.fetchData(`outSourcelabmaster?select=id,labname`);
    await DepartmentData?.fetchData(
      "/labDepartment?select=id,deptname&$orderby=printSequence"
    );
    // await ObservationData?.fetchData(
    //   `/itemMaster/GetProfileObservation?itemId=${ObservationId}`
    // );
  };

  console.log(InvestigationValue);
  const handleOptionClick = (name, id) => {
    setLabValue(name);
    setLabId(id);
    setLabSelectedOption(name);
    setLabDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange = (e) => {
    setLabValue(e.target.value);
    setLabDropDown(true); // Show dropdown when typing
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
    if (!BookingId || !LabId || !DepartmentId) return;
    const res = await GridData?.fetchData(
      `/item_outsourcemaster/GetOutSourceMapping?BookingCentre=${BookingId}&OutSourceLab=${LabId}&DeptId=${DepartmentId}`
    );
    console.log(res?.data?.data);
    const grid = await addRandomObjectId(res?.data?.data);
    setRow(grid); // Store API response in the state
  };

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "bookingCentre", headerName: "Centre Name", flex: 1 },
    { field: "processingCentre", headerName: "Lab Centre", flex: 1 },
    { field: "deptName", headerName: "Dept Name", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    {
      field: `rate`,
      headerName: `Rate`,
      flex: 1,
    },
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
  const columns1 = [
    { field: "index", headerName: "Sr. No", width: 20 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    {
      field: `rate`,
      headerName: `Rate`,
      width: 120,
      renderCell: (params) => {
        // console.log(params?.row?.id," ",params?.row)
        return <RateInputCell params={params} setRow={setFilteredItems} />;
      },
    },
  ];
  const handleSubmit = async () => {
    try {
      const Payload = await FilteredItems?.map((item) => {
        return {
          createdById: parseInt(lsData?.user?.employeeId),
          createdDateTime: new Date().toISOString(),
          labId: LabId,
          bookingCentreId: BookingId,
          itemId: item?.itemId,
          departmentId: DepartmentId,
          rate: item?.rate,
        };
      });
      console.log(Payload, " mm ", FilteredItems);
      const res = await PostData?.postRequest(
        `/item_outsourcemaster/SaveOutSourceMapping`,
        Payload
      );
      console.log(PostData?.response);
      if (res?.success) {
        toast.success(res?.message);
        setFilteredItems([]);
        const res1 = await GridData?.fetchData(
          `/item_outsourcemaster/GetOutSourceMapping?BookingCentre=${BookingId}&OutSourceLab=${LabId}&DeptId=${DepartmentId}`
        );
        // /item_OutHouseMaster/GetOutHouseMapping?BookingCentre=1&LabCentre=1&DeptId=1
        const grid = await addRandomObjectId(res1?.data?.data);
        setRow(grid); // Store API response in the state
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
        `${BASE_URL}/item_outsourcemaster/RemoveOutSourceMapping?id=${id}`
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
        <FormHeader title="Out Source Process Master" />

        {/* form data */}
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            {/* Booking Centre */}
            <SearchBarDropdown
              id="search-bar"
              name="BookingValue"
              value={BookingValue}
              onChange={handleSearchChange3}
              placeholder="Search Booking Center"
              label="Booking Center"
              options={ProcessingData?.data?.data}
              showValueField="companyName"
              keyField="centreId"
              isRequired={false}
              showSearchBarDropDown={BookingDropDown}
              setShowSearchBarDropDown={setBookingDropDown}
              handleOptionClickForCentre={handleOptionClick3}
              setIsHovered={setBookingHoveIndex}
              isHovered={BookingHoveIndex}
            />
            {/* Lab Centre */}
            <SearchBarDropdown
              id="search-bar"
              name="Lab"
              value={LabValue}
              onChange={handleSearchChange}
              label="Lab"
              placeholder="Search Lab"
              options={LabData?.data}
              isRequired={false}
              showValueField="labName"
              keyField="id"
              showSearchBarDropDown={LabDropDown}
              setShowSearchBarDropDown={setLabDropDown}
              handleOptionClickForCentre={handleOptionClick}
              setIsHovered={setLabHoveIndex}
              isHovered={LabHoveIndex}
            />
            {/* Department */}
            <SearchBarDropdown
              id="search-bar"
              name="Department"
              value={DepartmentValue}
              onChange={handleSearchChange1}
              label="Department"
              placeholder="Search Department"
              options={DepartmentData?.data}
              isRequired={false}
              showSearchBarDropDown={DepartmentDropDown}
              setShowSearchBarDropDown={setDepartmentDropDown}
              handleOptionClickForCentre={handleOptionClick1}
              setIsHovered={setDepartmentHoveIndex}
              isHovered={DepartmentHoveIndex}
            />
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

      {FilteredItems?.length > 0 && (
        <>
          <StyledHr style={{ height: "0.05rem" }} />
          <div className="w-full md:w-[50%]">
            <DynamicTable
              name="Add Items"
              rows={FilteredItems}
              columns={columns1}
              viewKey="Random"
              showHr={false}
            />
          </div>
        </>
      )}
      {/* grid data */}
      <div>
        <UpdatedDynamicTable
          name="Out House Process Master Details"
          rows={row}
          columns={columns}
          viewKey="Random"
        />
      </div>
    </>
  );
}
