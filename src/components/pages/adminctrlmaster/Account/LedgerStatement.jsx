import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  getFormattedDate,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import toast from "react-hot-toast";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import { addRandomObjectId } from "../../../../service/RedendentData";

export default function LedgerStatement() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);

  const todayDate = getFormattedDate();
  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [Row, setRow] = useState([]);
  const AllCenterData = useGetData();
  const LegendColor = useGetData();

  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreid,companyName&$filter=( centretypeid eq 2 or centretypeid eq 3 )"
    );
  }, []);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 10 },
    {
      field: `centrecode`,
      headerName: `Centre Code`,
      flex: 1,
    },
    {
      field: `centretype`,
      headerName: `Type`,
      flex: 1,
    },
    {
      field: `creditLimit`,
      headerName: `Credit Limit`,
      flex: 1,
    },
    {
      field: `openingAmt`,
      headerName: `Opening Amt.`,
      width: 10,
    },
    {
      field: `depositeAmt`,
      headerName: `Deposite Amt.`,
      width: 10,
    },
    {
      field: `closingAmt`,
      headerName: `Closing Amt.`,
      width: 10,
    },
    {
      field: `currentMonthBussiness`,
      headerName: `Current Month Bussiness`,
      width: 10,
    },
    {
      field: `currentmonthDeposit`,
      headerName: `Current Month Deposit`,
      width: 10,
    },
    {
      field: `yesterDayBussiness`,
      headerName: `Yester Day Bussiness`,
      width: 10,
    },
    {
      field: `creditDays`,
      headerName: `Credit Days`,
      width: 10,
    },
    {
      field: `openDate`,
      headerName: `Open Date`,
      width: 10,
    },
    {
      field: `lockDate`,
      headerName: `Lock Date`,
      width: 10,
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
    const res = await PostData?.postRequest(
      `/CentrePayment/ClientLedgerStatus?FromDate=${FromDate}&ToDate=${ToDate}`,
      selectedCenter
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
        <div>Ledger Statement</div>
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
          <InputGenerator
            inputFields={[
              {
                label: "From Date",
                type: "customDateField",
                name: "FromDate",
                customOnChange: (e) => {
                  console.log(e);
                  setFromDate(e);
                },
              },
              {
                label: "To Date",
                type: "customDateField",
                name: "ToDate",
                customOnChange: (e) => {
                  console.log(e);
                  setToDate(e);
                },
              },
            ]}
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
      <UpdatedDynamicTable
        rows={Row}
        name="Ledger Details"
        loading={PostData?.loading}
        columns={columns}
        viewKey="Random"
      />
    </div>
  );
}
