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
export default function UniversalMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [ColumnTab, setColumnTab] = useState({
    field: "discountReasonName",
    header: "Discount Reason Name",
  });
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getReason();
    if (activeTab === 0) {
      setColumnTab({
        field: "discountReasonName",
        header: "Discount Reason Name",
      });
    } else if (activeTab === 1) {
      setColumnTab({
        field: "degreeName",
        header: "Doctor Degree Master",
      });
    } else if (activeTab === 2) {
      setColumnTab({
        field: "designationName",
        header: "Designation Master",
      });
    } else if (activeTab === 5) {
      setColumnTab({
        field: "bankName",
        header: "Bank Name",
      });
    } else if (activeTab === 7) {
      setColumnTab({
        field: "type",
        header: "Type",
      });
    } else if (activeTab === 8) {
      setColumnTab({
        field: "roleName",
        header: "Role Name",
      });
    } else if (activeTab === 4) {
      setColumnTab({
        field: "title",
        header: "Title",
      });
    } else if (activeTab === 3) {
      setColumnTab({
        field: "documentType",
        header: "Document Type",
      });
    }

    console.log(activeTab);
  }, [activeTab]);
  console.log(data);
  const tabs = [
    {
      name: "Discount Reason Master",
      fname: "discountReasonName",
      api: "/discountReasonMaster/SaveUpdateDiscountReason",
      getApi: "/discountReasonMaster",
    },
    {
      name: "Doctor Degree Master",
      fname: "degreeName",
      api: "/degreeMaster/SaveUpdateDegree",
      getApi: "/degreeMaster",
    },
    {
      name: "Designation Master",
      fname: "designationName",
      api: "/designationMaster/SaveUpdateDesignation",
      getApi: "/designationMaster",
    },
    {
      name: "Patient Document Master",
      fname: "documentType",
      api: "/documentTypeMaster/SaveUpdateDocumentType",
      getApi: "/documentTypeMaster",
    },
    {
      name: "Title Master",
      fname: "title",
      api: "/titleMaster/SaveUpdateTitle",
      getApi: "/titleMaster",
    },
    {
      name: "Bank Master",
      fname: "bankName",
      api: "/bank_master/SaveUpdateBankMaster",
      getApi: "/bank_master",
    },
    { name: "Discount Approval Master", fname: "lab-department-master" },
    {
      name: "Discount Type Master",
      fname: "type",
      api: "/discountTypeMaster/SaveUpdateDiscountType",
      getApi: "/discountTypeMaster",
    },
    {
      name: "Role Master",
      fname: "roleName",
      api: "/roleMaster/SaveUpdateRole",
      getApi: "/roleMaster",
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
                          params?.row?.discountReasonName,
                      },
                    ]);
                  } else if (activeTab === 1) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.degreeName,
                      },
                    ]);
                  } else if (activeTab === 2) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.designationName,
                      },
                    ]);
                  } else if (activeTab === 5) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.bankName,
                      },
                    ]);
                  } else if (activeTab === 7) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.type,
                      },
                    ]);
                  } else if (activeTab === 8) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.roleName,
                      },
                    ]);
                  } else if (activeTab === 4) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.title,
                      },
                    ]);
                  } else if (activeTab === 3) {
                    setValues([
                      {
                        [tabs[activeTab]?.fname]: params?.row?.documentType,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    const lsData = getLocal("imarsar_laboratory");
    const payload =
      isButtonClick === 0
        ? { ...values, createdById: lsData?.user?.employeeId }
        : {
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
    const lsData = getLocal("imarsar_laboratory");
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
          <div>Universal Master</div>
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
      </div>
      <DynamicTable
        rows={data || []}
        loading={loading}
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
