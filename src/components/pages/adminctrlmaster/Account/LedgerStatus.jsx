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
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import toast from "react-hot-toast";
import PopupModal, {
  HourPopupModal,
  RemarkPopupModal,
  RemarkPopupModal1,
} from "../../../../Custom Components/PopupModal";

export default function LedgerStatus() {
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
  const [PaymentMode, setPaymentMode] = useState(1);
  const [Lock, setLock] = useState(true);
  const [Remark, setRemark] = useState(false);
  const [HourModel, setHourModel] = useState(false);

  useEffect(() => {
    getReason();
    console.log(activeTab);
  }, [PaymentMode]);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 70 },
    {
      field: `ClientCode`,
      headerName: `Client Code`,
      flex: 1,
    },
    {
      field: `Type`,
      headerName: `Type`,
      flex: 1,
    },
    {
      field: `ClientName`,
      headerName: `Client Name`,
      flex: 1,
    },
    {
      field: `InvoiceCreDate`,
      headerName: `Invoice Cre. Date`,
      flex: 1,
    },
    {
      field: `LastInvAmount`,
      headerName: `Last Inv. Amount`,
      flex: 1,
    },
    {
      field: `OpeningBalance`,
      headerName: `Opening Balance`,
      flex: 1,
    },
    {
      field: `DepositAmt`,
      headerName: `Deposit Amt.`,
      flex: 1,
    },
    {
      field: `ClosingBal`,
      headerName: `Closing Bal.`,
      flex: 1,
    },
    {
      field: `CreLimit`,
      headerName: `Cre. Limit`,
      flex: 1,
    },
    {
      field: `CurrMonthBusiness`,
      headerName: `Curr. Month Business`,
      flex: 1,
    },
    {
      field: `CurrMonthDeposit`,
      headerName: `Curr. Month Deposit`,
      flex: 1,
    },
    {
      field: `TodayBusiness`,
      headerName: `Today Business`,
      flex: 1,
    },
    {
      field: `YesterdayBusiness`,
      headerName: `Yesterday Business`,
      flex: 1,
    },
    {
      field: `CreDays`,
      headerName: `Cre. Days`,
      flex: 1,
    },
    {
      field: `Status`,
      headerName: `Status`,
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center">
            <button
              className={`w-4 h-4 flex justify-center items-center ${
                Lock ? "text-red-500" : "text-green-500"
              }`}
            >
              {Lock ? (
                <FaLock
                  onClick={() => {
                    setShowPopup(true);
                  }}
                  className="w-full h-full"
                />
              ) : (
                <FaLockOpen
                  className="w-full h-full"
                  onClick={() => {
                    setShowPopup(true);
                  }}
                />
              )}
            </button>
          </div>
        );
      },
    },
    {
      field: `OpenBy`,
      headerName: `Open By`,
      flex: 1,
    },
    {
      field: `OpenDate`,
      headerName: `Open Date`,
      flex: 1,
    },
    {
      field: `LockDate`,
      headerName: `Lock Date`,
      flex: 1,
    },
    {
      field: `Remark`,
      headerName: `Remark`,
      width: 100,
      renderCell: (params) => {
        return (
          <div
            className="flex justify-center items-center"
            title={params?.row?.Remark}
          >
            <button
              onClick={() => setRemark(true)}
              className={`w-4 h-4 flex justify-center items-center text-blue-500`}
            >
              <MdMessage className="w-full h-full" />
            </button>
          </div>
        );
      },
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
      // setShowPopup(false);
    }
  };

  //   const InputFileds = [{ label: "", type: "" }];

  return (
    <div>
      {/* Header Section */}
      {/* {true && ( */}
      <PopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        message={
          Lock ? "You Want to Unlock this Panel" : "You Want to Lock this Panel"
        }
        handleTheUpdateStatusMenu={() => {
          setShowPopup(false);
          {
            Lock ? setHourModel(true) : setLock(!Lock);
          }
        }}
      />
      <RemarkPopupModal
        showPopup={Remark}
        setShowPopup={setRemark}
        handleTheUpdateStatusMenu={() => {
          setRemark(!Remark);
        }}
      />
      <HourPopupModal
        showPopup={HourModel}
        setShowPopup={setHourModel}
        handleTheUpdateStatusMenu={() => {setLock(!Lock)}}
      />

      {/* )} */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Ledger Status</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Sales Person",
                type: "select",
                name: "FromDate",
                required: true,
              },
            ]}
          />
          <MultiSelectDropdown
            field={{
              label: "Centre",
              name: "CentreMode",
              keyField: "id",
              required: true,
              selectedValues: selectedCenter,
              showValueField: "mode",
              dataOptions: [
                { id: 1, mode: "Cash" },
                { id: 2, mode: "Cheque" },
                { id: 3, mode: "Neft" },
                { id: 4, mode: "Rtgs" },
                { id: 5, mode: "Online" },
              ],
              callBack: (selected) => setSelectedCenter(selected),
            }}
          />

          <SubmitButton text={"Search"} />
        </div>
      </form>
      <div className="flex flex-col justify-start items-center w-full gap-2">
        <DynamicTable
          rows={[
            {
              id: 1,
              ClientCode: "1234",
              Type: "Owner",
              ClientName: "XYZ",
              InvoiceCreDate: "11-01-25",
              LastInvAmount: "1599",
              OpeningBalance: "3000",
              DepositAmt: "2500",
              ClosingBal: "500",
              CreLimit: "5000",
              CurrMonthBusiness: "500000",
              CurrMonthDeposit: "240000",
              TodayBusiness: "25000",
              YesterdayBusiness: "34000",
              CreDays: "5",
              OpenBy: "Admin",
              OpenDate: "12-12-24",
              LockDate: "05-02-25",
              Remark: "This is Remark",
            },
          ]}
          name="Ledger Details"
          loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>
    </div>
  );
}
