import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegEdit, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { ImSwitch } from "react-icons/im";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import TabComponent from "../../../../Custom Components/TabComponent";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import PopupModal from "../../../../Custom Components/PopupModal";
import { useGetData, usePostData } from "../../../../service/apiService";
import { getLocal } from "usehoks";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";

export default function LabUniversalMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const lsData = getLocal("imarsar_laboratory");
  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [ColumnTab, setColumnTab] = useState({
    field: "discountReasonName",
    header: "Discount Reason Name",
  });
  const [allRateTypeMaster, setAllRateTypeMaster] = useState([]);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  // ---------------------------------------------------------------
  const [BookingId, setBookingId] = useState("");
  const [BookingValue, setBookingValue] = useState("");
  const [BookingDropDown, setBookingDropDown] = useState(false);
  const [BookingHoveIndex, setBookingHoveIndex] = useState(null);
  const [BookingSelectedOption, setBookingSelectedOption] = useState("");
  const ItemData = useGetData();
  useEffect(() => {
    ItemData?.fetchData("/centreMaster?select=centreid,companyName");
    getReason();
    if (activeTab === 0) {
      setColumnTab({
        field: "remark",
        header: "Remark",
      });
    } else if (activeTab === 1) {
      setColumnTab({
        field: "rejectionReason",
        header: "Rejection Reason",
      });
    } else if (activeTab === 2) {
      setColumnTab({
        field: "reason",
        header: "Reason",
      });
    } else if (activeTab === 5) {
      setColumnTab({
        field: "labName",
        header: "Lab Name",
      });
    } else if (activeTab === 6) {
      setColumnTab({
        field: "deptName",
        header: "Dept. Name",
      });
    } else if (activeTab === 7) {
      setColumnTab({
        field: "method",
        header: "Method",
      });
    } else if (activeTab === 8) {
      setColumnTab({
        field: "roleName",
        header: "Role Name",
      });
    } else if (activeTab === 4) {
      setColumnTab({
        field: "footerText",
        header: "Footer Text",
      });
    } else if (activeTab === 3) {
      setColumnTab({
        field: "sampleTypeName",
        header: "Sample Type Name",
      });
    }

    console.log(activeTab);
  }, [activeTab]);

  const tabs = [
    {
      name: "Sample Remarks Master",
      fname: "remark",
      api: "/SampleremarkMaster/SaveUpdatesampleRemark",
      getApi: "/SampleremarkMaster?select=id,remark,isActive",
    },
    {
      name: "Sample Rejection Master",
      fname: "rejectionReason",
      api: "/sampleRejectionReason/SaveUpdateRejectionReason",
      getApi: "/sampleRejectionReason?select=id,rejectionReason,isactive",
    },
    {
      name: "Sample Re-Rerun Remarks",
      fname: "reason",
      api: "/SampleRerunReason/SaveUpdateSampleRerunReason",
      getApi: "/SampleRerunReason?select=id,Reason,isactive",
    },
    {
      name: "Sample Type Master",
      fname: "sampleTypeName",
      api: "/sampletype_master/SaveUpdateSampletype",
      getApi: "/sampletype_master?select=id,sampleTypeName,isactive",
    },
    {
      name: "Report Footer Remarks",
      fname: "footerText",
      api: "/labReportFooterText/SaveUpdateFooterText",
      getApi: "/labReportFooterText/GetFooterText",
    },
    {
      name: "Out SourceLab Master",
      fname: "labName",
      api: "/outSourcelabmaster/SaveUpdateOutsourceLab",
      getApi: "/outSourcelabmaster?select=id,labname,isactive",
    },
    {
      name: "Lab Department Master",
      fname: "deptName",
      api: "/labDepartment/SaveUpdateLabDepartment",
      getApi:
        "/labDepartment?select=id,deptcode,deptname,subdeptName,abbreviation,isactive",
    },
    {
      name: "Test Method Master",
      fname: "method",
      api: "/TestMethodMaster/SaveUpdateTestMethod",
      getApi: "/TestMethodMaster?select=id,method,isactive",
    },
  ];

  const columns = [
    { field: "id", headerName: "Sr. No", width: 100 },
    {
      field: `${ColumnTab.field}`,
      headerName: `${ColumnTab.header}`,
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
                  if (activeTab === 0) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]:
                          params?.row?.remark,
                      },
                    ]);
                  } else if (activeTab === 1) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.rejectionReason,
                      },
                    ]);
                  } else if (activeTab === 2) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.reason,
                      },
                    ]);
                  } else if (activeTab === 5) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.labName,
                      },
                    ]);
                  } else if (activeTab === 7) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.method,
                      },
                    ]);
                  } else if (activeTab === 8) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.roleName,
                      },
                    ]);
                  } else if (activeTab === 4) {
                    const name = ItemData?.data?.find(
                      (item) => item?.centreId == params?.row?.centreId
                    );
                    setBookingId(params?.row?.centreId);
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.footerText,
                      },
                    ]);
                    setBookingValue(name?.companyName);
                  } else if (activeTab === 3) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.sampleTypeName,
                      },
                    ]);
                  } else if (activeTab === 6) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.deptName,
                      },
                    ]);
                  }
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

  const handleOptionClick3 = async (name, id) => {
    setBookingValue(name);
    setBookingId(id);
    await fetchGrid();
    await sessionStorage.setItem("BookingId", JSON.stringify(id));
    setBookingSelectedOption(name);
    setBookingDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setBookingValue(e.target.value);
    setBookingDropDown(true); // Show dropdown when typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    const payload =
      isButtonClick === 0
        ? {
            ...values,
            createdById: lsData?.user?.employeeId,
            centreId: BookingId,
            id: 0,
            isActive: 1,
          }
        : {
            ...clickedRowId,
            ...values,
            updateById: lsData?.user?.employeeId,
            id: clickedRowId?.id,
            isActive: clickedRowId?.isActive,
          };
    const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
    console.log(payload);
    if (data1?.success) {
      toast.success(
        isButtonClick === 0 ? data1?.message : "Updated Successfull"
      );
      setIsButtonClick(0);
      getReason();
    }
  };
  const getReason = async () => {
    const get = await fetchData(tabs[activeTab]?.getApi);
    console.log(get);
  };
  const handleTheUpdateStatusMenu = async () => {
    const payload = {
      ...clickedRowId,
      updateById: lsData?.user?.employeeId,
      isActive: clickedRowId?.isActive === 1 ? 0 : 1,
    };
    const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
    if (data1?.success) {
      toast.success("Status Updated Successfully");
      console.log(payload);
      getReason();
      setShowPopup(false);
    }
  };
  console.log(data);
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
          <div>Lab Universal Master</div>
        </div>
        <TabComponent
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {/* form data */}
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            {/* Rate Type */}
            {activeTab === 4 && (
              <SearchBarDropdown
                id="search-bar"
                name="BookingValue"
                value={BookingValue}
                onChange={handleSearchChange3}
                label="Booking Center"
                options={ItemData?.data || []}
                isRequired={false}
                showSearchBarDropDown={BookingDropDown}
                setShowSearchBarDropDown={setBookingDropDown}
                handleOptionClickForCentre={handleOptionClick3}
                setIsHovered={setBookingHoveIndex}
                isHovered={BookingHoveIndex}
              />
            )}
            <div className="relative flex-1">
              <input
                type="text"
                name={tabs[activeTab].fname}
                placeholder=" "
                className={`inputPeerField peer border-borderColor focus:outline-none`}
              />
              <label htmlFor="rateTypeName" className="menuPeerLevel">
                {tabs[activeTab].name}
              </label>
            </div>
            <div className="flex gap-[0.25rem]">
              <div className="relative flex-1 flex justify-start items-center">
                <button
                  type="submit"
                  className={`font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  {isButtonClick === 1 ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
        {/* <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
   
            <div className="relative flex-1">
              <input
                type="text"
                id="rateTypeName"
                name={tabs[activeTab].fname}
                placeholder=" "
                className={`inputPeerField peer border-borderColor focus:outline-none`}
              />
              <label htmlFor="rateTypeName" className="menuPeerLevel">
                {tabs[activeTab].name}
              </label>
            </div>
            <div className="flex gap-[0.25rem]">
              <div className="relative flex-1 flex justify-start items-center">
                <button
                  type="submit"
                  className={`font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  {isEditData ? (
                    isButtonClick === 1 ? (
                      <FaSpinner className="text-xl animate-spin" />
                    ) : (
                      "Update"
                    )
                  ) : isButtonClick === 1 ? (
                    <FaSpinner className="text-xl animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
              
              </div>
            </div>
          </div>
        </form> */}
        {/* <button
                  onClick={() =>
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: "John Doe",
                      },
                    ])
                  }
                >
                  Set Form Values
                </button> */}
      </div>
      <DynamicTable
        rows={!data?.length ? data?.data : data}
        loading={false}
        columns={columns}
        activeTheme={activeTheme}
      />

      {/* popup for active and deactive status */}
      <PopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        activeTheme={activeTheme}
        handleTheUpdateStatusMenu={handleTheUpdateStatusMenu}
        isButtonClick={isButtonClick}
        message="Are you sure you want to proceed with the action?"
        cancelText="Cancel"
        confirmText="Yes"
      />
    </>
  );
}
