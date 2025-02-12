import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import toast from "react-hot-toast";

export default function PaymentDepositeReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [FileData, setFileData] = useState({ fileName: "" });
  const [PaymentMode, setPaymentMode] = useState(1);
  const [className, setClassName] = useState("");
  useEffect(() => {
    if (activeTheme) {
      const style = document.createElement("style");
      style.innerHTML = `
        .gradientText {
          background: ${activeTheme.menuColor};
          -webkit-background-clip: text;
          color: transparent;
        }
      `;
      document.head.appendChild(style);
      setClassName("gradientText");
    }
  }, [activeTheme]);

  useEffect(() => {
    getReason();
    console.log(activeTab);
  }, [PaymentMode]);
  console.log(FileData);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 70 },
    {
      field: `Deposit Date`,
      headerName: `Deposit Date`,
      flex: 1,
    },
    {
      field: `Approved Date`,
      headerName: `Approved Date`,
      flex: 1,
    },
    {
      field: `Client Name`,
      headerName: `Client Name`,
      flex: 1,
    },
    {
      field: `Deposit Amount`,
      headerName: `Deposit Amount`,
      flex: 1,
    },
    {
      field: `Payment Type`,
      headerName: `Payment Type`,
      flex: 1,
    },
    {
      field: `Deposit By`,
      headerName: `Deposit By`,
      flex: 1,
    },
    {
      field: `Approved By`,
      headerName: `Approved By`,
      flex: 1,
    },
    {
      field: `Transition Type`,
      headerName: `Transition Type`,
      flex: 1,
    },
    {
      field: `Remarks`,
      headerName: `Remarks`,
      flex: 1,
    },
    // {
    //   field: "",
    //   width: 200,
    //   headerName: "Action",
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px" }}>
    //         <button className="w-4 h-4 flex justify-center items-center">
    //           <FaRegEdit
    //             className={`w-full h-full ${
    //               params?.row?.isActive === 1
    //                 ? "text-blue-500 cursor-pointer"
    //                 : "text-gray-400 cursor-not-allowed"
    //             }`}
    //             onClick={() => {
    //               setClickedRowId(params?.row);
    //               setIsButtonClick(1);
    //               if (activeTab === 0) {
    //                 setValues([
    //                   {
    //                     // [tabs[activeTab]?.fname]:
    //                     //   params?.row?.discountReasonName,
    //                   },
    //                 ]);
    //               }
    //             }}
    //           />
    //         </button>
    //         <button
    //           className={`w-4 h-4 flex justify-center items-center ${
    //             params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
    //           }`}
    //         >
    //           <ImSwitch
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

    // Check for required fields
    // const requiredFields = ["Payment Date", "Payment Mode", "Payment Type", "Advance"];

    // const missingFields = requiredFields.filter(field => !values[field]);

    // if (missingFields.length > 0) {
    //   toast(`${missingFields[0]} is required`);
    //   return;
    // }

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
    // const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
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
        <div>Payment Deposit Report</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Client",
                type: "select",
                name: "FromDate",
                required: true,
              },
              {
                label: "From Date",
                type: "customDateField",
                name: "fromDate",
                required: true,
              },
              {
                label: "To Date",
                type: "customDateField",
                name: "ToDate",
                required: true,
              },
              {
                label: "Payment Type",
                type: "select",
                name: "paymentType",
                required: true,
                dataOptions: [
                  { id: 1, Type: "Deposit" },
                  { id: 2, Type: "Credit Note" },
                  { id: 3, Type: "Debit Note" },
                ],
              },
            ]}
          />

          <SubmitButton text={"Search"} />
          <div className="flex gap-[0.25rem]">
            <div className="relative flex-1 gap-1 flex justify-start items-center">
              <button
                type="submit" // Corrected type handling
                className="font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                Export to PDF
              </button>
              <button
                type="submit" // Corrected type handling
                className="font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                Export to Excel
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-col justify-start items-center w-full gap-2">
        <DynamicTable
          rows={[
            { id: 1, client: "client 1" },
            { id: 2, client: "client 2" },
          ]}
          name="Report Details"
          loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
        <div>
          <span className={className}>
            <b>Total Deposit Amount</b>{" "}
          </span>{" "}
          : 9330
        </div>
      </div>
    </div>
  );
}
