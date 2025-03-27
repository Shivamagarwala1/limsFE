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
import {
  downloadPostExcel,
  getFirstDateOfMonth,
  ViewOrDownloadPostPDF,
} from "../../../../service/RedendentData";
import { PaymentVarificationPopupModal } from "../../../../Custom Components/NewPopups";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";

export default function PaymentVerification() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState([]);

  const todayDate = getFormattedDate();
  const FirstDateofMonth = getFirstDateOfMonth();
  const [FromDate, setFromDate] = useState(FirstDateofMonth);
  const [ToDate, setToDate] = useState(todayDate);

  const [ShowPopup, setShowPopup] = useState("");
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
  }, [status, ShowPopup]);

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
          <div className="flex gap-1">
            <SubmitButton
              submit={false}
              style={{ width: "100px", height: "1.05rem" }}
              text={"Approve"}
              disabled={params?.row?.approved == 1}
              callBack={() => {
                setParams(params?.row);
                setShowPopup("A");
              }}
            />
            <SubmitButton
              submit={false}
              style={{ width: "100px", height: "1.05rem" }}
              text={"Reject"}
              disabled={params?.row?.approved == -1}
              callBack={() => {
                setParams(params?.row);
                setShowPopup("R");
              }}
            />
          </div>
        );
      },
    },
  ];

  const getReason = async () => {
    if (CenterValue == null) {
      return;
    }
    const payload = CenterValue;
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
        rejectOrApprove={true}
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
            selectedValues={CenterValue}
            setSelectedValues={setCenterValue}
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
          <TwoLegendButton
            options={[
              {
                label: "Search",
                submit: false,
                callBack: () => {
                  // Pending
                  if (CenterValue.length == 0) {
                    toast.error("Please Select Center.");
                    return;
                  }
                  setStatus(2);
                  getReason();
                },
              },
              {
                label: "PDF",
                submit: false,
                callBack: () => {
                  // Pending
                  if (CenterValue.length == 0) {
                    toast.error("Please Select Center.");
                    return;
                  }
                  ViewOrDownloadPostPDF(
                    `/CentrePayment/ClientDepositReportPdf?FromDate=${FromDate}&ToDate=${ToDate}&Paymenttype=0&status=${status}`,
                    CenterValue
                  );
                },
              },
            ]}
          />
          <TwoLegendButton
            options={[
              {
                label: "Excel",
                submit: false,
                callBack: () => {
                  // Pending
                  if (CenterValue.length == 0) {
                    toast.error("Please Select Center.");
                    return;
                  }
                  downloadPostExcel(
                    `/CentrePayment/ClientDepositReportExcel?FromDate=${FromDate}&ToDate=${ToDate}&Paymenttype=0&status=${status}`,
                    CenterValue,
                    "PaymentVerification.xlsx"
                  );
                },
              },
              {
                id: 17,
                submit: false,
                callBack: () => {
                  // Pending
                  setStatus("0");
                },
              },
            ]}
          />
          <TwoLegendButton
            options={[
              {
                id: 18,
                submit: false,
                callBack: () => {
                  // Pending
                  setStatus("1");
                },
              },
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
