import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { getLocal } from "usehoks";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import {
  addRandomObjectId,
  fetchAllCenterData,
} from "../../../../service/RedendentData";
import { MdDelete } from "react-icons/md";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import toast from "react-hot-toast";
import PopupModal from "../../../../Custom Components/PopupModal";

export default function TimeSlotMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);
  const [Row, setRow] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    getData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1)"
    );
  }, []);
  useEffect(() => {
    getReason();
  }, []);

  console.log(Row);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 100 },
    {
      field: `centrecode`,
      headerName: `Centre Code`,
      flex: 1,
    },
    {
      field: `companyName`,
      headerName: `Centre Name`,
      flex: 1,
    },
    {
      field: `timeslot`,
      headerName: `Time Slot`,
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
                  setSelectedCenter([`${params?.row?.centreId}`]);
                  setValues([{ time: params?.row?.timeslot }]);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    const lsData = getLocal("imarsar_laboratory");
    if(selectedCenter.length == 0){
      toast.error('Center is Required');
      return;
    }
    if(!values?.time){
      toast.error('Time is Required');
      return;
    }
    const data = selectedCenter?.map((item) => {
      return {
        isActive: 1,
        createdById: parseInt(lsData?.user?.employeeId),
        createdDateTime: new Date().toISOString(),
        centreId: item,
        timeslot: values?.time,
      };
    });
    const data2 = selectedCenter?.map((item) => {
      return {
        ...clickedRowId,
        updateById: parseInt(lsData?.user?.employeeId),
        updateDateTime: new Date().toISOString(),
        centreId: item,
        timeslot: values?.time,
      };
    });
    const payload = isButtonClick === 0 ? data : data2;
    const data1 = await PostData?.postRequest(
      "/timeSlotMaster/SaveUpdateTimeSlot",
      payload
    );
    console.log(data1);
    if (data1?.success) {
      toast.success(data1?.message);
      setIsButtonClick(0);
      getReason();
    }
  };

  const getReason = async () => {
    const get = await fetchData("/timeSlotMaster/GetTimeSlotData");
    const filteredArr = await get?.data?.data?.filter(
      (item) => item?.isActive == 1
    );
    setRow(addRandomObjectId(get?.data?.data));
  };

  const handleDelete = async () => {
    const lsData = getLocal("imarsar_laboratory");
    const data1 = await PostData?.postRequest(
      `/timeSlotMaster/UpdateTimeSlotStatus?id=${clickedRowId?.id}&status=${
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
        <div>Time Slot Master</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <UpdatedMultiSelectDropDown
            id="Center"
            name="serachCenter"
            label="Center"
            placeHolder="Search Center"
            options={getData?.data}
            isMandatory={false}
            isDisabled={false}
            selectAll={false}
            optionKey="centreId"
            optionValue={["companyName"]}
            selectedValues={selectedCenter}
            setSelectedValues={setSelectedCenter}
          />
          <InputGenerator
            inputFields={[{ label: "Time Slot", type: "time", name: "time" }]}
          />
          <SubmitButton text={isButtonClick == 0 ? "Save" : "Update"} />
        </div>
      </form>
      <div className="pt-1 w-full">
        <UpdatedDynamicTable
          rows={Row}
          name="Time Slot Details"
          loading={loading}
          columns={columns}
          viewKey="Random"
        />
      </div>
    </div>
  );
}
