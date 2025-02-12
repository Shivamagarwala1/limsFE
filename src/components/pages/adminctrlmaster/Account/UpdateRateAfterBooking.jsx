import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, { SubmitButton } from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { GiCancel } from "react-icons/gi";
import { FaEye } from "react-icons/fa6";
import { VscFilePdf } from "react-icons/vsc";
import toast from "react-hot-toast";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";

export default function UpdateRateAfterBooking() {
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
  const [selectedCenter, setSelectedCenter] = useState([]);

  useEffect(() => {
    getReason();
  }, []);
  console.log(selectedCenter);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 100 },
    {
      field: `Client`,
      headerName: `Client`,
      flex: 1,
    },
    {
      field: `Booking Date`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `Visitor ID`,
      headerName: `Visitor ID`,
      flex: 1,
    },
    {
      field: `Patient Name`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `Age/Gender`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `Mobile No.`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    {
      field: `Amount`,
      headerName: `Amount`,
      flex: 1,
    },
    // {
    //   field: "",
    //   width: 100,
    //   headerName: "View Report",
    //   renderCell: (params) => {
    //     return (
    //       <div className="flex justify-center items-center">
    //         <button
    //           className={`w-4 h-4 flex justify-center items-center text-red-500`}
    //         >
    //           <VscFilePdf
    //             className="w-full h-full"
    //             onClick={() => {
    //               setClickedRowId(params?.row);
    //               setShowPopup(true);
    //             }}
    //           />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    // const requiredFields = ["CentreMode", "FromDate", "toDate"];
    // const missingFields = requiredFields.filter((field) => !values[field]);

    // if (missingFields.length > 0) {
    //   toast(`The following fields are required: ${missingFields[0]}`);
    //   return;
    // }

    if (selectedCenter.length === 0) {
      toast(`Centre is required`);
      return;
    }

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
    console.log(payload);
    // if (data1?.success) {
    //   toast.success(
    //     isButtonClick === 0 ? data1?.message : "Updated Successfull"
    //   );
    //   setIsButtonClick(0);
    //   getReason();
    // }
  };

  const getReason = async () => {
    // const get = await fetchData(tabs[activeTab]?.getApi);
    console.log(get);
  };

  const handleTheUpdateStatusMenu = async () => {
    const lsData = getLocal("imarsar_laboratory");
    const payload = {
      ...clickedRowId,
      updateById: lsData?.user?.employeeId,
      isActive: clickedRowId?.isActive === 1 ? 0 : 1,
    };
    // const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
    if (data1?.success) {
      toast.success("Status Updated Successfully");
      console.log(payload);
      getReason();
      setShowPopup(false);
    }
  };

  //   const InputFileds = [{ label: "", type: "" }];

  return (
    <div>
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Update Rate After Booking</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "From Date",
                type: "customDateField",
                name: "FromDate",
              },
              {
                label: "To Date",
                type: "customDateField",
                name: "toDate",
              },
              { label: "Client/Panel", type: "select", name: "remark" }
            ]}
          />
          <SubmitButton text={"Search"} />
        </div>
      </form>
      <DynamicTable
        rows={[
          { id: 1, client: "client 1" },
          { id: 2, client: "client 2" },
        ]}
        name="Booking Details"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
      />
    </div>
  );
}
