import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import {
  postData,
  useGetData,
  usePostData,
} from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable, { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import toast from "react-hot-toast";
import PopupModal, {
  HourPopupModal,
  RemarkPopupModal,
} from "../../../../Custom Components/PopupModal";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import { addRandomObjectId } from "../../../../service/RedendentData";

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
  const [Row, setRow] = useState([]);
  const [Lock, setLock] = useState(true);
  const [Remark, setRemark] = useState(false);
  const [HourModel, setHourModel] = useState(false);
  const AllCenterData = useGetData();
  const LegendColor = useGetData();

  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreid,companyName&$filter=( centretypeid eq 2 or centretypeid eq 3 )"
    );
  }, []);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 70 },
    {
      field: `centreCode`,
      headerName: `Centre Code`,
      flex: 1,
    },
    {
      field: `companyName`,
      headerName: `Client Name`,
      flex: 1,
    },
    {
      field: `centreType`,
      headerName: `Type`,
      flex: 1,
    },
    {
      field: `createdDate`,
      headerName: `Created Date`,
      flex: 1,
    },
    {
      field: `invoiceAmt`,
      headerName: `Invoice Amount`,
      flex: 1,
    },
    {
      field: `unPaid`,
      headerName: `Opening Balance`,
      flex: 1,
    },
    {
      field: `approvedPayment`,
      headerName: `Deposit Amt.`,
      flex: 1,
    },
    {
      field: `remainingPayment`,
      headerName: `Closing Bal.`,
      flex: 1,
    },
    {
      field: `ccreditLimt`,
      headerName: `Cre. Limit`,
      flex: 1,
    },
    {
      field: `currentBuss`,
      headerName: `Curr. Month Business`,
      flex: 1,
    },
    {
      field: `currentMPayment`,
      headerName: `Curr. Month Deposit`,
      flex: 1,
    },
    {
      field: `todayBussiness`,
      headerName: `Today Business`,
      flex: 1,
    },
    {
      field: `yesterDayBussiness`,
      headerName: `Yesterday Business`,
      flex: 1,
    },
    {
      field: `creditPeridos`,
      headerName: `Cre. Days`,
      flex: 1,
    },
    {
      field: `isLock`,
      headerName: `Status`,
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center">
            <button
              className={`w-4 h-4 flex justify-center items-center ${
                params?.row?.isLock ? "text-red-500" : "text-green-500"
              }`}
            >
              {params?.row?.isLock ? (
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
      field: `unlockBy`,
      headerName: `Open By`,
      flex: 1,
    },
    {
      field: `unlockDate`,
      headerName: `Open Date`,
      flex: 1,
    },
    {
      field: `lockDate`,
      headerName: `Lock Date`,
      flex: 1,
    },
    {
      field: `remarks`,
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
    const center = await selectedCenter.join(",");
    const res = await PostData?.postRequest(
      `/CentrePayment/LedgerStatus?CentreId=${center}`
    );
    if (res?.success) {
      setRow(addRandomObjectId(res?.data));
    } else {
      toast.error(res?.message);
    }
    console.log(res);
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
        rowData={""}
      />
      <HourPopupModal
        showPopup={HourModel}
        setShowPopup={setHourModel}
        handleTheUpdateStatusMenu={() => {
          setLock(!Lock);
        }}
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
          <UpdatedMultiSelectDropDown
            id="Center"
            name="serachCenter"
            label="Center"
            placeHolder="Search Center"
            options={AllCenterData?.data}
            isMandatory={false}
            isDisabled={false}
            optionKey="centreId"
            optionValue={["companyName"]}
            selectedValues={selectedCenter}
            setSelectedValues={setSelectedCenter}
          />
          <TwoSubmitButton
            options={[
              {
                label: "Search",
                submit: false,
                style: { marginTop: "0px" },
                callBack: () => {
                  getReason();
                },
              },
            ]}
          />
        </div>
      </form>
      <div className="flex flex-col justify-start items-center w-full gap-2">
        <UpdatedDynamicTable
          rows={Row}
          name="Ledger Details"
          loading={PostData?.loading}
          columns={columns}
          viewKey="Random"
        />
      </div>
    </div>
  );
}
