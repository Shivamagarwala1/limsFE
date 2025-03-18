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
import toast from "react-hot-toast";
import PopupModal from "../../../../Custom Components/PopupModal";

export default function PheleboRouteMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);

  const [Row, setRow] = useState([]);
  // const AllCenterData = fetchAllCenterData();
  useEffect(() => {
    getReason();
    // console.log(AllCenterData);
  }, []);
  console.log(data);
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 100 },
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
      field: `createdDateTime`,
      headerName: `Created At`,
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
                  setValues([{ routeName: params?.row?.routeName }]);
                  setValues([{ pincode: params?.row?.pincode }]);
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
    if (!values?.routeName && isButtonClick === 0) {
      toast.error("Route Name is Required");
      return;
    }
    if (!values?.pincode && isButtonClick === 0) {
      toast.error("Pincode is Required");
      return;
    }
    const payload =
      isButtonClick === 0
        ? {
            ...values,
            isActive: 1,
            createdById: lsData?.user?.employeeId,
            createdDateTime: new Date().toISOString(),
          }
        : {
            ...clickedRowId,
            ...values,
            updateById: lsData?.user?.employeeId,
            id: clickedRowId?.id,
            isActive: clickedRowId?.isActive,
          };
    const data1 = await PostData?.postRequest(
      `/routeMaster/SaveUpdateRoute`,
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
    const get = await fetchData("/routeMaster");
    setRow(addRandomObjectId(get?.data));
  };

  console.log(Row);
  const handleDelete = async () => {
    const lsData = getLocal("imarsar_laboratory");
    const data1 = await PostData?.postRequest(
      `/routeMaster/UpdateRouteStatus?id=${clickedRowId?.id}&status=${
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
  //   const InputFileds = [{ label: "", type: "" }];

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
        <div>Phelebo Route Master</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              { label: "Name", type: "text", name: "routeName" },
              { label: "Pin Code", type: "number", name: "pincode" },
            ]}
          />
          <SubmitButton
            text={isButtonClick == 0 ? "Save" : "Update"}
            style={{ marginTop: "1px" }}
          />
        </div>
      </form>
      <div className="w-full">
        <UpdatedDynamicTable
          rows={Row}
          name="Phelebo Route Master Details"
          loading={loading}
          columns={columns}
          viewKey="Random"
        />
      </div>
    </div>
  );
}
