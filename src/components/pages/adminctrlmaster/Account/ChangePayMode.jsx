import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
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
import { addRandomObjectId } from "../../../../service/RedendentData";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";

const PaymentDropDown = ({ setPymentDetails, params,BankData,UPIData }) => {
  // ------------------ PaymentType -------------------------------
  const [PaymentTypeId, setPaymentTypeId] = useState("");
  const [PaymentTypeValue, setPaymentTypeValue] = useState("");
  const [PaymentTypeDropDown, setPaymentTypeDropDown] = useState(false);
  const [PaymentTypeHoveIndex, setPaymentTypeHoveIndex] = useState(null);
  const [PaymentTypeSelectedOption, setPaymentTypeSelectedOption] =
    useState("");

  // ------------------ UPI -------------------------------
  const [UPIId, setUPIId] = useState("");
  const [UPIValue, setUPIValue] = useState("");
  const [UPIDropDown, setUPIDropDown] = useState(false);
  const [UPIHoveIndex, setUPIHoveIndex] = useState(null);
  const [UPISelectedOption, setUPISelectedOption] = useState("");
  // ------------------ Bank -------------------------------
  const [BankId, setBankId] = useState("");
  const [BankValue, setBankValue] = useState("");
  const [BankDropDown, setBankDropDown] = useState(false);
  const [BankHoveIndex, setBankHoveIndex] = useState(null);
  const [BankSelectedOption, setBankSelectedOption] = useState("");

  const [FDigitValue, setFDigitValue] = useState("");



  // useEffect(() => {
  //   setPymentDetails(
  //     (prev) =>
  //       prev.some((item) => item.Random === params?.row.Random)
  //         ? prev.map((item) =>
  //             item.Random === params?.row.Random
  //               ? {
  //                   ...item,
  //                   UPIId: UPIId,
  //                   UPIValue: UPIValue,
  //                   BankId: BankId,
  //                   BankValue: BankValue,
  //                   FDigitValue: FDigitValue,
  //                   PaymentTypeId: PaymentTypeId,
  //                   PaymentTypeValue: PaymentTypeValue,
  //                   edited: item?.paymentModeId != PaymentTypeId,
  //                 }
  //               : item
  //           ) // Update if exists
  //         : [
  //             ...prev,
  //             {
  //               ...params?.row,
  //               UPIId: UPIId,
  //               UPIValue: UPIValue,
  //               BankId: BankId,
  //               BankValue: BankValue,
  //               FDigitValue: FDigitValue,
  //               PaymentTypeId: PaymentTypeId,
  //               PaymentTypeValue: PaymentTypeValue,
  //               edited: item?.paymentModeId != PaymentTypeId,
  //             },
  //           ] // Add if not
  //   );
  // }, [FDigitValue, BankValue, UPIValue, PaymentTypeValue]);

  useEffect(() => {
    if (PaymentTypeId != "") {
      setPymentDetails(
        (prev) =>
          prev.some((item) => item.Random === params?.row.Random)
            ? prev.map((item) =>
                item.Random === params?.row.Random
                  ? {
                      ...item,
                      UPIId,
                      UPIValue,
                      BankId,
                      BankValue,
                      FDigitValue,
                      PaymentTypeId,
                      PaymentTypeValue,
                      edited:
                        params?.row?.paymentModeId != PaymentTypeId
                          ? true
                          : false,
                    }
                  : item
              ) // Update if exists
            : [
                ...prev,
                {
                  ...params?.row,
                  UPIId,
                  UPIValue,
                  BankId,
                  BankValue,
                  FDigitValue,
                  PaymentTypeId,
                  PaymentTypeValue,
                  edited: params?.row?.paymentModeId != PaymentTypeId,
                },
              ] // Add if not exists
      );
    }
  }, [
    FDigitValue,
    BankValue,
    UPIValue,
    PaymentTypeValue,
    UPIId,
    BankId,
    PaymentTypeId,
  ]);
  console.log(params?.row?.paymentModeId, " ", PaymentTypeId);

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
      setPaymentTypeValue(e.target.value);
      setPaymentTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    if (params?.row?.paymentModeId != id) {
      setPaymentTypeValue(name);
      setPaymentTypeId(id);
      setPaymentTypeSelectedOption(name);
      setPaymentTypeDropDown(false);
    }else{
      toast.error("Plese Select Another Method")
    }
  };

  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setUPIValue(e.target.value);
    setUPIDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setUPIValue(name);
    setUPIId(id);
    setUPISelectedOption(name);
    setUPIDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange = (e) => {
    setBankValue(e.target.value);
    setBankDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick = (name, id) => {
    setBankValue(name);
    setBankId(id);
    setBankSelectedOption(name);
    setBankDropDown(false);
  };

  return (
    <div className="flex flex-row gap-1">
      <SearchBarDropdown
        id="search-bar"
        name="PaymentType"
        value={PaymentTypeValue}
        onChange={handleSearchChange2}
        label=""
        placeholder="Serch Payment Type"
        options={[
          { id: 1, data: "Cash" },
          { id: 3, data: "UPI" },
          { id: 2, data: "Credit/Debit Card" },
        ]}
        isRequired={false}
        showSearchBarDropDown={PaymentTypeDropDown}
        setShowSearchBarDropDown={setPaymentTypeDropDown}
        handleOptionClickForCentre={handleOptionClick2}
        setIsHovered={setPaymentTypeHoveIndex}
        isHovered={PaymentTypeHoveIndex}
        style={{
          width: "100px",
          height: "1rem",
          border: "none",
          borderRadius: "2px",
          margin: "0px",
        }}
        Inputstyle={{ borderRadius: "2px" }}
      />
      {PaymentTypeValue == "UPI" && (
        <SearchBarDropdown
          id="search-bar"
          name="UPI"
          value={UPIValue}
          onChange={handleSearchChange1}
          label=""
          placeholder="Serch UPI"
          options={UPIData?.data}
          isRequired={false}
          showSearchBarDropDown={UPIDropDown}
          setShowSearchBarDropDown={setUPIDropDown}
          handleOptionClickForCentre={handleOptionClick1}
          setIsHovered={setUPIHoveIndex}
          isHovered={UPIHoveIndex}
          style={{
            width: "100px",
            height: "1rem",
            border: "none",
            borderRadius: "2px",
            margin: "0px",
          }}
          Inputstyle={{ borderRadius: "2px" }}
        />
      )}
      {PaymentTypeValue == "Credit/Debit Card" && (
        <div className="flex flex-row gap-1">
          <input
            style={{
              height: "1.1rem",
              width: "100px",
              borderWidth: "0px",
              borderRadius: "0px",
            }}
            type="text"
            className={`inputPeerField peer focus:outline-none`}
            value={FDigitValue}
            placeholder="Enter 4 Digit"
            name="mins"
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, "");
              setFDigitValue(newValue);
            }}
          />
          <SearchBarDropdown
            id="search-bar"
            name="Bank"
            value={BankValue}
            onChange={handleSearchChange}
            label=""
            placeholder="Serch Bank"
            options={BankData?.data}
            isRequired={false}
            showSearchBarDropDown={BankDropDown}
            setShowSearchBarDropDown={setBankDropDown}
            handleOptionClickForCentre={handleOptionClick}
            setIsHovered={setBankHoveIndex}
            isHovered={BankHoveIndex}
            style={{
              width: "100px",
              height: "1rem",
              border: "none",
              borderRadius: "2px",
              margin: "0px",
            }}
            Inputstyle={{ borderRadius: "2px" }}
          />
        </div>
      )}
    </div>
  );
};
const PaymentRemark = ({ initialTime, setPymentDetails, params }) => {
  const [startTime, setStartTime] = useState(initialTime);

  useEffect(() => {
    setPymentDetails(
      (prev) =>
        prev.some((item) => item.Random === params?.row.Random)
          ? prev.map((item) =>
              item.Random === params?.row.Random
                ? {
                    ...item,
                    cancelReason: startTime,
                    // edited: params?.row.cancelReason != startTime,
                  }
                : item
            ) // Update if exists
          : [
              ...prev,
              {
                ...params?.row,
                cancelReason: startTime,
                // edited: params?.row.cancelReason != startTime,
              },
            ] // Add if not
    );
  }, [startTime]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{
          height: "1.1rem",
          width: "100px",
          borderWidth: "0px",
          borderRadius: "0px",
        }}
        type="text"
        className={`inputPeerField peer border-borderColor focus:outline-none`}
        value={startTime}
        placeholder="Enter Remark"
        name="mins"
        onChange={(e) => {
          const newValue = e.target.value; // Remove non-numeric characters
          setStartTime(newValue);
        }}
      />
    </div>
  );
};
export default function ChangePayMode() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const lsData = getLocal("imarsar_laboratory");
  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [PatientDetails, setPatientDetails] = useState([]);
  const [PymentDetails, setPymentDetails] = useState([]);
  const [Visitor, setVisitor] = useState("");
  const [PaymentMode, setPaymentMode] = useState(1);
  const [className, setClassName] = useState("");
  console.log(PymentDetails);

  const BankData = useGetData();
  const UPIData = useGetData();

  
  useEffect(() => {
    BankData?.fetchData("/bank_master");
    UPIData?.fetchData(
      "/bank_master?id,bankName&$filter=(isactive eq 1 and type eq 1)"
    );
  }, []);

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
  }, [PaymentMode]);

  const columns = [
    // {
    //   field: "check",
    //   headerName: "",
    //   width: 20,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px" }}>
    //         <input type="checkbox" />
    //       </div>
    //     );
    //   },
    // },
    { field: "Random", headerName: "Sr. No", width: 10 },
    {
      field: `workOrderId`,
      headerName: `Visitor Id`,
      flex: 1,
    },
    {
      field: `paymentmode`,
      headerName: `Payment Mode`,
      flex: 1,
    },
    {
      field: `amount`,
      headerName: `Amount`,
      flex: 1,
    },

    {
      field: "",
      width: 200,
      headerName: "Change Payment Mode",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <PaymentDropDown
              setPymentDetails={setPymentDetails}
              params={params}
              BankData={BankData}
              UPIData={UPIData}
            />
          </div>
        );
      },
    },
    {
      field: "",
      width: 150,
      headerName: "Remark",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <PaymentRemark
              setPymentDetails={setPymentDetails}
              params={params}
              initialTime={params?.row?.cancelReason}
            />
          </div>
        );
      },
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
  };

  const getReason = async () => {
    const get = await fetchData(
      `/CentrePayment/GetPatientpaymentDetail?Workorderid=${Visitor}`
    );
    console.log(get?.data?.data?.patientdetail);
    if (get?.data?.success) {
      setPatientDetails(addRandomObjectId(get?.data?.data?.patientdetail));
      setPymentDetails(addRandomObjectId(get?.data?.data?.paymentdetail));
    }
  };

  // const handleTheUpdateStatusMenu = async () => {
  //   const Payload = await PymentDetails.filter((item) => item.edited) // Only include objects where edited is true
  //     .map((item) => ({
  //       id: item?.id || 0,
  //       transactionId: item?.transactionId || 0,
  //       transactionType: item?.PaymentTypeValue,
  //       workOrderId: item?.workOrderId,
  //       receivedAmt: item?.amount || 0,
  //       cashAmt: item?.PaymentTypeId == 1 ? item?.amount : 0,
  //       creditCardAmt: item?.PaymentTypeId == 2 ? item?.amount : 0,
  //       creditCardNo: item?.FDigitValue,
  //       chequeAmt: 0,
  //       chequeNo: "",
  //       onlinewalletAmt: item?.PaymentTypeId == 3 ? item?.amount : 0,
  //       walletno: item?.UPIId ? `${item?.UPIId}` : "0",
  //       nefTamt: 0,
  //       bankName: item?.BankValue,
  //       paymentModeId: item?.PaymentTypeId || 0,
  //       isCancel: 0,
  //       cancelDate: new Date().toISOString(), // Current timestamp
  //       canceledBy: `${lsData?.user?.employeeId}`,
  //       cancelReason: item?.cancelReason,
  //       bookingCentreId: 0,
  //       settlementCentreID: 0,
  //       receivedBy: "",
  //       receivedID: 0,
  //       receiptNo: 0,
  //     }));
  //   if (Payload.length == 0) {
  //     toast.error("No Data to Update");
  //     return;
  //   }
  //   // const validation = await Payload?.map((item) => {
  //   //   if (!item?.cancelReason) {
  //   //     toast.error("Remark is Required");
  //   //     return;
  //   //   }
  //   // });
  //   if (Payload.length == 0) {
  //     toast.error("No Data to Update");
  //     return;
  //   }
  //   console.log(Payload);
  //   const data1 = await PostData?.postRequest(
  //     "/CentrePayment/ChangePatientpaymentDetail",
  //     Payload
  //   );
  //   console.log(data1);
  //   if (data1?.success) {
  //     toast.success("Status Updated Successfully");

  //     getReason();
  //     setShowPopup(false);
  //   }
  // };

  //   const InputFileds = [{ label: "", type: "" }];
  const handleTheUpdateStatusMenu = async () => {
    const Payload = await PymentDetails.filter((item) => item.edited) // Only include objects where edited is true
      .map((item) => ({
        id: item?.id || 0,
        transactionId: item?.transactionId || 0,
        transactionType: item?.PaymentTypeValue,
        workOrderId: item?.workOrderId,
        receivedAmt: item?.amount || 0,
        cashAmt: item?.PaymentTypeId == 1 ? item?.amount : 0,
        creditCardAmt: item?.PaymentTypeId == 2 ? item?.amount : 0,
        creditCardNo: item?.FDigitValue,
        chequeAmt: 0,
        chequeNo: "",
        onlinewalletAmt: item?.PaymentTypeId == 3 ? item?.amount : 0,
        walletno: item?.UPIId ? `${item?.UPIId}` : "0",
        nefTamt: 0,
        bankName: item?.BankValue,
        paymentModeId: item?.PaymentTypeId || 0,
        isCancel: 0,
        cancelDate: new Date().toISOString(), // Current timestamp
        canceledBy: `${lsData?.user?.employeeId}`,
        cancelReason: item?.cancelReason,
        bookingCentreId: 0,
        settlementCentreID: 0,
        receivedBy: "",
        receivedID: 0,
        receiptNo: 0,
      }));

    if (Payload.length === 0) {
      toast.error("No Data to Update");
      return;
    }

    // Validation: Ensure every item has a cancelReason
    const missingReason = Payload.some((item) => !item.cancelReason?.trim());
    if (missingReason) {
      toast.error("Remark is required for all edited records.");
      return;
    }

    console.log(Payload);

    const data1 = await PostData?.postRequest(
      "/CentrePayment/ChangePatientpaymentDetail",
      Payload
    );

    console.log(data1);

    if (data1?.success) {
      toast.success("Status Updated Successfully");
      getReason();
    }
  };

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
        <div>Change PayMode</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-2  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Visitor Id",
                type: "text",
                name: "Visitor Id",
                onChange: (e) => {
                  setVisitor(e);
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
              {
                label: "Save",
                submit: false,
                style: { marginTop: "0px" },
                callBack: () => {
                  handleTheUpdateStatusMenu();
                },
              },
            ]}
          />
        </div>
      </form>
      {PatientDetails.length > 0 && (
        <>
          <div
            className="w-full h-[0.06rem]"
            style={{ background: activeTheme?.menuColor }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <div className="grid rounded-md grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <div className={`relative flex-1 `}>
                <span className={className}>
                  <b>Name</b>
                </span>
                : {PatientDetails[0]?.name}
              </div>
              <div className="relative flex-1">
                <span className={className}>
                  <b>Age</b>
                </span>{" "}
                : {PatientDetails[0]?.age},{PatientDetails[0]?.gender}
              </div>

              <div className="relative flex-1">
                <span className={className}>
                  <b>Mobile No.</b>
                </span>{" "}
                : {PatientDetails[0]?.mobileNo || ""}
              </div>
            </div>
            <div className="relative flex-1">
              <span className={className}>
                <b>Booking Centre</b>
              </span>{" "}
              : {PatientDetails[0]?.centrename}
            </div>
          </div>
        </>
      )}
      <UpdatedDynamicTable
        rows={PymentDetails}
        name="Payment Mode Details"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
        viewKey="Random"
      />
    </div>
  );
}
