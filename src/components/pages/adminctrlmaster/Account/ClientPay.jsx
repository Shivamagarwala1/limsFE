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
import FileUpload from "../../../../Custom Components/FileUpload";
import toast from "react-hot-toast";

export default function ClientPay() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [FileData, setFileData] = useState({ fileName: "" });
  const [PaymentMode, setPaymentMode] = useState(1);

  useEffect(() => {
    getReason();
    console.log(activeTab);
  }, [PaymentMode]);
  console.log(FileData);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 100 },
    {
      field: `client`,
      headerName: `Client`,
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

    // Check for required fields
    const requiredFields = ["Payment Date", "Payment Mode", "Payment Type", "Advance"];

    // Add additional required fields based on PaymentMode
    if (PaymentMode === 2) {
      requiredFields.push("Bank", "Cheque No.", "Cheque Date");
    } else if (PaymentMode === 3) {
      requiredFields.push("Bank", "Neft No.", "Neft Date");
    } else if (PaymentMode === 4) {
      requiredFields.push("Bank", "Rtgs No.", "Rtgs Date");
    } else if (PaymentMode === 5) {
      requiredFields.push("Bank", "Online No.", "Online Date");
    }

    const missingFields = requiredFields.filter(field => !values[field]);

    if (missingFields.length > 0) {
      toast(`${missingFields[0]} is required`);
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
    console.log(get);
  };

  // const handleTheUpdateStatusMenu = async () => {
  //   const lsData = getLocal("imarsar_laboratory");
  //   const payload = {
  //     ...clickedRowId,
  //     updateById: lsData?.user?.employeeId,
  //     isActive: clickedRowId?.isActive === 1 ? 0 : 1,
  //   };
  //   const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
  //   if (data1?.success) {
  //     toast.success("Status Updated Successfully");
  //     console.log(payload);
  //     getReason();
  //     setShowPopup(false);
  //   }
  // };

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
        <div>Client Pay</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Client",
                type: "select",
                name: "",
                dataOptions: [{ id: 1 }],
              },
              {
                label: "Payment Date",
                type: "customDateField",
                name: "paymentDate",
                required: true,
              },
              {
                label: "Payment Mode",
                type: "select",
                name: "paymentMode",
                required: true,
                dataOptions: [
                  { id: 1, mode: "Cash" },
                  { id: 2, mode: "Cheque" },
                  { id: 3, mode: "Neft" },
                  { id: 4, mode: "Rtgs" },
                  { id: 5, mode: "Online" },
                ],
                callBack: (e) => {
                  e.preventDefault();
                  setPaymentMode(e.target.value);
                },
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
              {
                label: "Advance Amount",
                type: "number",
                name: "advance",
                required: true,
              },
            ]}
          />
          {PaymentMode == 2 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Bank",
                  type: "select",
                  name: "Bank",
                  required: true,
                  dataOptions: [
                    // { id: 1, Type: "Deposit" },
                    // { id: 2, Type: "Credit Note" },
                    // { id: 3, Type: "Debit Note" },
                  ],
                },
                {
                  label: "Cheque No.",
                  type: "number",
                  name: "ChequeNo",
                },
                {
                  label: "Cheque Date",
                  type: "customDateField",
                  name: "ChequeDate",
                  required: true,
                },
              ]}
            />
          )}
          {PaymentMode == 3 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Bank",
                  type: "select",
                  name: "Bank",
                  required: true,
                  dataOptions: [
                    // { id: 1, Type: "Deposit" },
                    // { id: 2, Type: "Credit Note" },
                    // { id: 3, Type: "Debit Note" },
                  ],
                },
                {
                  label: "Neft No.",
                  type: "number",
                  name: "NeftNo",
                },
                {
                  label: "Neft Date",
                  type: "customDateField",
                  name: "NeftDate",
                  required: true,
                },
              ]}
            />
          )}
          {PaymentMode == 4 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Bank",
                  type: "select",
                  name: "Bank",
                  required: true,
                  dataOptions: [
                    // { id: 1, Type: "Deposit" },
                    // { id: 2, Type: "Credit Note" },
                    // { id: 3, Type: "Debit Note" },
                  ],
                },
                {
                  label: "Rtgs No.",
                  type: "number",
                  name: "RtgsNo",
                },
                {
                  label: "Rtgs Date",
                  type: "customDateField",
                  name: "RtgsDate",
                  required: true,
                },
              ]}
            />
          )}
          {PaymentMode == 5 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Bank",
                  type: "select",
                  name: "Bank",
                  required: true,
                  dataOptions: [
                    // { id: 1, Type: "Deposit" },
                    // { id: 2, Type: "Credit Note" },
                    // { id: 3, Type: "Debit Note" },
                  ],
                },
                {
                  label: "Online No.",
                  type: "number",
                  name: "OnlineNo",
                },
                {
                  label: "Online Date",
                  type: "customDateField",
                  name: "OnlineDate",
                  required: true,
                },
              ]}
            />
          )}
          <FileUpload
            FileData={FileData}
            setFileData={setFileData}
            inputFields={{
              label: "Add Attachment",
              Size: "10",
              required: true,
            }}
          />
          <InputGenerator
            inputFields={[{ label: "Remarks", type: "text", name: "remark" }]}
          />
           <SubmitButton text={'Save'} />
           
          <div className="flex gap-[0.25rem]">
            <div class="relative flex-1 gap-1 flex justify-center items-center">
              <div class="relative flex-1 gap-1 flex justify-center items-center text-xs">
                <div class="w-5 h-5 bg-blue-300 rounded-full"></div>
                Pending
              </div>
              <div class="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div class="w-5 h-5 bg-green-300 rounded-full"></div>
                Approved
              </div>
              <div class="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div class="w-5 h-5 bg-red-500 rounded-full"></div>
                Reject
              </div>
            </div>
          </div>
        </div>
      </form>
      <DynamicTable
        rows={[
          { id: 1, client: "client 1" },
          { id: 2, client: "client 2" },
        ]}
        name="Client Payment Details"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
      />
    </div>
  );
}
