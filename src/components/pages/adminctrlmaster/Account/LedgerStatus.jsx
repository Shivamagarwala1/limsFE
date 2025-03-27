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
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
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
import { FormHeader } from "../../../../Custom Components/FormGenerator";

export default function LedgerStatus() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const lsData = getLocal("imarsar_laboratory");
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

  useEffect(() => {
    if (selectedCenter?.length > 0) {
      getReason();
    }
  }, [showPopup, HourModel]);

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
        const handleRowClick = (rowData) => {
          console.log("Clicked Row Data:", rowData); // Debug log
          setClickedRowId(rowData);
          setShowPopup(true);
        };
        const handleRowClick1 = (rowData) => {
          console.log("Clicked Row Data:", rowData); // Debug log
          setClickedRowId(rowData);
          setHourModel(true);
        };
        return (
          <div className="flex justify-center items-center">
            <button
              className={`w-4 h-4 flex justify-center items-center ${
                params?.row?.isLock ? "text-red-500" : "text-green-500"
              }`}
            >
              {params?.row?.isLock ? (
                <FaLock
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleRowClick1(params?.row);
                  }}
                  className="w-full h-full cursor-pointer"
                />
              ) : (
                <FaLockOpen
                  className="w-full h-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleRowClick(params?.row);
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

  const handleLock = async () => {
    const res = await PostData?.postRequest(
      `/CentrePayment/LockCentre?CentreId=${
        clickedRowId?.lCentreId
      }&UserId=${parseInt(lsData?.user?.employeeId)}`
    );
    if (res?.success) {
      toast.success(res?.message);
      window.location.reload();
    } else {
      toast.success(res?.message);
    }
    setShowPopup(false);
  };

  const handleUnLock = async (date) => {
    console.log(date);
    const res = await PostData?.postRequest(
      `/CentrePayment/UnlockCentre?CentreId=${
        clickedRowId?.lCentreId
      }&UserId=${parseInt(lsData?.user?.employeeId)}&unlocktime=${date}`
    );
    if (res?.success) {
      toast.success(res?.message);
      window.location.reload();
    } else {
      toast.success(res?.message);
    }
    setHourModel(false);
  };

  useEffect(() => {
    console.log("Updated clickedRowId:", clickedRowId); // Debug log
  }, [clickedRowId]);

  return (
    <div>
      {/* Header Section */}
      {/* {true && ( */}
      {showPopup && (
        <PopupModal
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          handleTheUpdateStatusMenu={() => {
            // Handle your popup action here
            console.log("Processing row:", clickedRowId); // Debug log
            // Your action logic here
            handleLock();
          }}
          message={`Are you sure you want to ${
            clickedRowId?.isLock ? "unlock" : "lock"
          } this record?`}
        />
      )}
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
        clickedRowId={clickedRowId}
        setShowPopup={setHourModel}
        handleTheUpdateStatusMenu={(date) => {
          handleUnLock(date);
        }}
      />

      {/* )} */}

      <FormHeader title="Ledger Status" />
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
