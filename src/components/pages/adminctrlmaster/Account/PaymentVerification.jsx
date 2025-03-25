import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  getFormattedDate,
  SubmitButton,
  TwoLegendButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { getFirstDateOfMonth } from "../../../../service/RedendentData";
import { PaymentVarificationPopupModal } from "../../../../Custom Components/NewPopups";

export default function PaymentVerification() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState("");
  const [CenterDropDown, setCenterDropDown] = useState(false);
  const [CenterHoveIndex, setCenterHoveIndex] = useState(null);
  const [CenterSelectedOption, setCenterSelectedOption] = useState("");

  const todayDate = getFormattedDate();
  const FirstDateofMonth = getFirstDateOfMonth();
  const [FromDate, setFromDate] = useState(FirstDateofMonth);
  const [ToDate, setToDate] = useState(todayDate);

  const [ShowPopup, setShowPopup] = useState(false);
  const [Params, setParams] = useState(null);
  const [status, setStatus] = useState(2);
  const getData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [Row, setRow] = useState([]);
  const AllCenterData = useGetData();
  const LegendColor = useGetData();

  useEffect(() => {
    LegendColor?.fetchData("/LegendColorMaster");
  }, []);
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreid,companyName&$filter=( centretypeid eq 2 or centretypeid eq 3 )"
    );
  }, []);

  useEffect(() => {
    getReason();
  }, [CenterId, FromDate, ToDate, status,ShowPopup]);
  console.log(data);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 100 },
    {
      field: `centreName`,
      headerName: `Center Name`,
      flex: 1,
    },
    {
      field: `advancePaymentAmt`,
      headerName: `Advance Payment`,
      flex: 1,
    },
    {
      field: `paymentMode`,
      headerName: `Payment Mode`,
      flex: 1,
    },
    {
      field: `paymentType`,
      headerName: `Payment Type`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            {params?.row?.paymentType == 1 && "Deposit"}
            {params?.row?.paymentType == 2 && "Credit Note"}
            {params?.row?.paymentType == 3 && "Debit Note"}
          </div>
        );
      },
    },
    {
      field: `status`,
      headerName: `Status`,
      flex: 1,
    },
    {
      field: `remarks`,
      headerName: `Remarks`,
      flex: 1,
    },
    {
      field: `paymentDate`,
      headerName: `Payment Date`,
      flex: 1,
    },
    {
      field: `Change`,
      headerName: `Action`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <SubmitButton
              submit={false}
              style={{ width: "100px", height: "1.05rem" }}
              text={params?.row?.approved === 0 || params?.row?.approved === -1 ? "Approve" : "Reject"}
              callBack={() => {
                setParams(params?.row);
                setShowPopup(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setCenterValue(e.target.value);
    setCenterDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setCenterValue(name);
    setCenterId(id);
    setCenterSelectedOption(name);
    setCenterDropDown(false);
  };

  const getReason = async () => {
    if (CenterId == null) {
      return;
    }
    const payload = [CenterId];
    const get = await getData?.postRequest(
      `/CentrePayment/ClientDepositReport?FromDate=${FromDate}&ToDate=${ToDate}&Paymenttype=0&status=${status}`,
      payload
    );
    if (get?.success) {
      setRow(
        get?.data?.map((item, index, arr) => {
          // Find matching object in 'data' array based on status
          const matchingData = LegendColor?.data?.find(
            (d) => d.contantName === item.status
          );

          return {
            ...item,
            Random: index + 1, // Assigns a sequential number
            rowcolor: matchingData?.colourCode || "", // Uses matched color or defaults to empty
          };
        })
      );
    } else {
      toast.error(get?.message);
    }
    console.log(get);
  };



  return (
    <div>
      <PaymentVarificationPopupModal
        showPopup={ShowPopup}
        setShowPopup={setShowPopup}
        row={Params}
        activeTheme={activeTheme}
        // message="Are you sure you want to proceed with the action?"
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
        <div>Payment Verification</div>
      </div>

      <form autoComplete="off" ref={formRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <SearchBarDropdown
            id="search-bar"
            name="Center"
            value={CenterValue}
            onChange={handleSearchChange2}
            label="Center"
            placeholder="Serch Center"
            options={AllCenterData?.data}
            isRequired={false}
            showSearchBarDropDown={CenterDropDown}
            setShowSearchBarDropDown={setCenterDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setCenterHoveIndex}
            isHovered={CenterHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <InputGenerator
            inputFields={[
              {
                label: "From Date",
                type: "customDateField",
                name: "FromDate",
                ShowDate: getFirstDateOfMonth(),
                minDate: new Date(2000, 0, 1),
                tillDate: new Date(2100, 0, 1),
                customOnChange: (e) => {
                  console.log(e);
                  setFromDate(e);
                },
              },
              {
                label: "To Date",
                type: "customDateField",
                name: "ToDate",
                minDate: new Date(2000, 0, 1),
                tillDate: new Date(2100, 0, 1),
                customOnChange: (e) => {
                  console.log(e);
                  setToDate(e);
                },
              },
            ]}
          />
          {/* <TwoLegendButton
            options={[
              {
                label: "Search",
                submit: true,
              },
              {
                label: "Bulk Settlement",
                submit: false,
                callBack: () => {
                  // Pending
                },
              },
            ]}
          /> */}
          <TwoLegendButton
            options={[
              {
                id: 17,
                submit: false,
                callBack: () => {
                  // Pending
                  setStatus("0");
                },
              },
              {
                id: 18,
                submit: false,
                callBack: () => {
                  // Pending
                  setStatus("1");
                },
              },
            ]}
          />
          <TwoLegendButton
            options={[
              {
                id: 19,
                submit: false,
                callBack: () => {
                  // Pending
                  setStatus("-1");
                },
              },
            ]}
          />
        </div>
      </form>
      <UpdatedDynamicTable
        rows={Row}
        name="Payment Verification Details"
        loading={getData?.loading}
        columns={columns}
        viewKey="Random"
      />
    </div>
  );
}
