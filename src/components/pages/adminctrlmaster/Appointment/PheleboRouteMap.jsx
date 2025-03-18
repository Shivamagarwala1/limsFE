import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";

import { getLocal } from "usehoks";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import { addRandomObjectId, fetchAllCenterData } from "../../../../service/RedendentData";
import { MdDelete } from "react-icons/md";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import PopupModal from "../../../../Custom Components/PopupModal";
import toast from "react-hot-toast";

export default function PheleboRouteMap() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const getData = useGetData();
  const PheleboData = useGetData();
  const { fetchData, response, data, loading } = useGetData();
  // ------------------ Phelebo -------------------------------
  const [PheleboId, setPheleboId] = useState(null);
  const [PheleboValue, setPheleboValue] = useState("");
  const [PheleboDropDown, setPheleboDropDown] = useState(false);
  const [PheleboHoveIndex, setPheleboHoveIndex] = useState(null);
  const [PheleboSelectedOption, setPheleboSelectedOption] = useState("");

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRoutes, setselectedRoutes] = useState([]);
  const [Row, setRow] = useState([]);
  useEffect(() => {
    PheleboData?.fetchData(
      "/empMaster?select=empid,fname,lname&$filter=(isactive eq 1 and employeeType eq 1)"
    );
    getData?.fetchData("/routeMaster");
    getReason();
  }, [PheleboId]);
  console.log(data);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 100 },
    {
      field: `phelebo`,
      headerName: `Phelebo Name`,
      flex: 1,
    },
    {
      field: `routeName`,
      headerName: `Route Name`,
      flex: 1,
    },
    {
      field: `pincode`,
      headerName: `Pin Code`,
      flex: 1,
    },
    {
      field: "",
      width: 200,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="w-4 h-4 flex justify-center items-center">
              <FaRegEdit
                className={`w-full h-full ${
                  params?.row?.isActive === 1
                    ? "text-blue-500 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  setClickedRowId(params?.row);
                  setIsButtonClick(1);
                  setPheleboValue(params?.row?.phelebo)
                  setselectedRoutes([`${params?.row?.routeId}`])
                }}
              />
            </button>
            <button
              className={`w-4 h-4 flex justify-center items-center ${
                params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              <ImSwitch
                className="w-full h-full"
                onClick={() => {
                  setClickedRowId(params?.row);
                  setShowPopup(true);
                }}
              />
            </button>
          </div>
        );
      },
    },
  ];

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setPheleboValue(e.target.value);
    setPheleboDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setPheleboValue(name);
    setPheleboId(id);
    setPheleboSelectedOption(name);
    setPheleboDropDown(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    if(selectedRoutes.length == 0){
      toast.error('Routes Are Required');
      return;
    }
    if(!PheleboId){
      toast.error('Phelebo is Required');
      return;
    }
    const lsData = getLocal("imarsar_laboratory");
    const data = selectedRoutes?.map((item) => {
      return {
        isActive: 1,
        createdById: parseInt(lsData?.user?.employeeId),
        createdDateTime: new Date().toISOString(),
        pheleboId: PheleboId,
        routeId: item,
      };
    });
    const data2 = selectedRoutes?.map((item) => {
      return {
        ...clickedRowId,
        updateById: parseInt(lsData?.user?.employeeId),
        updateDateTime: new Date().toISOString(),
        pheleboId: PheleboId,
        routeId: item,
      };
    });
    const payload = isButtonClick === 0 ? data : data2;
    const data1 = await PostData?.postRequest(
      `/RouteMapping/SaveUpdateRouteMapping`,
      payload
    );
    console.log(payload);
    if (data1?.success) {
      toast.success(data1?.message);
      setIsButtonClick(0);
      getReason();
    } else {
      toast.success(data1?.message);
    }
  };
  const getReason = async () => {
    const get = await fetchData(
      `/RouteMapping/GetRouteMapping?PheleboId=${PheleboId}`
    );
    setRow(addRandomObjectId(get?.data?.data));
  };

  const handleDelete = async () => {
    const lsData = getLocal("imarsar_laboratory");
    const data1 = await PostData?.postRequest(
      `/RouteMapping/UpdateRouteMappingStatus?id=${clickedRowId?.id}&status=${
        clickedRowId?.isActive == 1 ? 0 : 1
      }&UserId=${lsData?.user?.employeeId}`
    );
    if (data1?.success) {
      toast.success(data1?.message);
      getReason();
      setShowPopup(false);
    } else {
      toast.success(data1?.message);
    }
  };

  return (
    <div>
      <PopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        activeTheme={activeTheme}
        handleTheUpdateStatusMenu={handleDelete}
        isButtonClick={isButtonClick}
        message="Are you sure you want to proceed with the action?"
        cancelText="Cancel"
        confirmText="Yes"
      />
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Phelebo Route Map</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <UpdatedMultiSelectDropDown
            id="Routes"
            name="serachRoutes"
            label="Routes"
            placeHolder="Search Routes"
            options={getData?.data}
            isMandatory={false}
            isDisabled={false}
            selectAll={false}
            optionKey="id"
            optionValue={["routeName"]}
            selectedValues={selectedRoutes}
            setSelectedValues={setselectedRoutes}
          />
          <SearchBarDropdown
            id="search-bar"
            name="Phelebo"
            value={PheleboValue}
            onChange={handleSearchChange2}
            label="Phelebo"
            placeholder="Serch Phelebo"
            options={PheleboData?.data}
            isRequired={false}
            showSearchBarDropDown={PheleboDropDown}
            setShowSearchBarDropDown={setPheleboDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setPheleboHoveIndex}
            isHovered={PheleboHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <SubmitButton
            style={{ marginTop: "-2px" }}
            text={isButtonClick == 0 ? "Save" : "Update"}
          />
        </div>
      </form>
      <div className="w-full">
        <UpdatedDynamicTable
          viewKey="Random"
          rows={Row}
          name="Phelebo Route Map Details"
          loading={loading}
          columns={columns}
        />
      </div>
    </div>
  );
}
