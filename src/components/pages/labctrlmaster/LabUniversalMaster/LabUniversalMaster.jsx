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

export default function LabUniversalMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [allRateTypeMaster, setAllRateTypeMaster] = useState([]);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Sample Remarks Master", fname: "sample-remarks-master" },
    { name: "Sample Rejection Master", fname: "sample-rejection-master" },
    { name: "Sample Re-Rerun Remarks", fname: "sample-rererun-master" },
    { name: "Sample Type Master", fname: "sample-type-master" },
    { name: "Report Footer Remarks", fname: "report-footer-remarks" },
    { name: "Out SourceLab Master", fname: "out-sourceLab-master" },
    { name: "Lab Department Master", fname: "lab-department-master" },
    { name: "Test Method Master", fname: "test-method-master" },
  ];

  const columns = [
    { field: "id", headerName: "Sr. No", width: 100 },
    { field: "rateName", headerName: "Rate Type", flex: 1 },
    { field: "centreName", headerName: "Centre", flex: 1 },
    {
      field: "centreId",
      headerName: "Centre IDs",
      flex: 1,
    },
    {
      field: "",
      flex: 1,
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
                  if (params?.row?.isActive === 1) {
                    getSingleRateTypeDataForUpDate(data);
                    setIsEditData(true);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = getValues();
    console.log("Form values:", values);
  };

  const handleTheUpdateStatusMenu = ()=>{
    toast.info('button clicked')
  }

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
                  // onClick={onSubmitRateTypeMaster}
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
            </div>
          </div>
        </form>
      </div>
      <DynamicTable
        rows={allRateTypeMaster}
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
