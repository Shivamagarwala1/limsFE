import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  getFormattedDate,
  IconButton,
  SubmitButton,
  TwoLegendButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import FileUpload from "../../../../Custom Components/FileUpload";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import {
  addRandomObjectId,
  getFirstDateOfMonth,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";
import { IoIosEye } from "react-icons/io";

export default function ClientPay() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const lsData = getLocal("imarsar_laboratory");
  const PostData = usePostData();
  const getData = usePostData();
  const DocumentData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);

  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState("");
  const [CenterDropDown, setCenterDropDown] = useState(false);
  const [CenterHoveIndex, setCenterHoveIndex] = useState(null);
  const [CenterSelectedOption, setCenterSelectedOption] = useState("");
  // ------------------ PaymentMode -------------------------------
  const [PaymentModeId, setPaymentModeId] = useState(null);
  const [PaymentModeValue, setPaymentModeValue] = useState("");
  const [PaymentModeDropDown, setPaymentModeDropDown] = useState(false);
  const [PaymentModeHoveIndex, setPaymentModeHoveIndex] = useState(null);
  const [PaymentModeSelectedOption, setPaymentModeSelectedOption] =
    useState("");
  // ------------------ Bank -------------------------------
  const [BankId, setBankId] = useState(null);
  const [BankValue, setBankValue] = useState("");
  const [BankDropDown, setBankDropDown] = useState(false);
  const [BankHoveIndex, setBankHoveIndex] = useState(null);
  const [BankSelectedOption, setBankSelectedOption] = useState("");
  // ------------------ PaymentType -------------------------------
  const [PaymentTypeId, setPaymentTypeId] = useState(0);
  const [PaymentTypeValue, setPaymentTypeValue] = useState("");
  const [PaymentTypeDropDown, setPaymentTypeDropDown] = useState(false);
  const [PaymentTypeHoveIndex, setPaymentTypeHoveIndex] = useState(null);
  const [PaymentTypeSelectedOption, setPaymentTypeSelectedOption] =
    useState("");
  const [PDFPath, setPDFPath] = useState("");
  const todayDate = getFormattedDate();
  const FirstDateofMonth = getFirstDateOfMonth();
  const [FromDate, setFromDate] = useState(FirstDateofMonth);
  const [ToDate, setToDate] = useState(todayDate);
  const [FileData, setFileData] = useState({ fileName: "" });
  const [PaymentMode, setPaymentMode] = useState(1);
  const [status, setStatus] = useState(2);
  const [Row, setRow] = useState([]);
  const AllCenterData = useGetData();
  const BankData = useGetData();
  const LegendColor = useGetData();

  useEffect(() => {
    LegendColor?.fetchData("/LegendColorMaster");
  }, []);

  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreid,companyName&$filter=( centretypeid eq 2 or centretypeid eq 3 )"
    );
    BankData?.fetchData("/bank_master");
    // console.log(AllCenterData);
  }, []);
  useEffect(() => {
    getReason();
  }, [PaymentTypeId, CenterId, FromDate, ToDate, status]);

  useEffect(() => {
    if (FileData.fileData) {
      if (!FileData || !FileData.fileData) {
        toast.error("No PDF selected!");
        return;
      } else {
        handlePdfUpload();
      }
    }
  }, [FileData]);

  // console.log(Row);

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
      field: `View`,
      headerName: `View Reciept`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex justify-start items-center">
            <IconButton
              icon={IoIosEye}
              onClick={() =>
                ViewOrDownloandPDF(
                  `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.documentName}`
                )
              }
              title="View Reciept"
            />
          </div>
        );
      },
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    console.log(values);
    if (!CenterId) {
      toast.error("Center is Required");
      return;
    }
    if (!values?.paymentDate) {
      toast.error("Payment Date is Required");
      return;
    }
    if (!PaymentModeValue) {
      toast.error("Payment Mode is Required");
      return;
    }
    if (!PaymentTypeId) {
      toast.error("Payment Type is Required");
      return;
    }
    if (!values?.advancePaymentAmt) {
      toast.error("Advance Amount is Required");
      return;
    }
    if (!values?.PayNo && PaymentModeValue != "Cash") {
      if (PaymentMode == 2) {
        toast.error("Cheque No. is Required");
      } else if (PaymentMode == 3) {
        toast.error("Neft No. is Required");
      } else if (PaymentMode == 4) {
        toast.error("Rtgs No. is Required");
      } else if (PaymentMode == 5) {
        toast.error("Online No. is Required");
      }
      return;
    }
    if (!PDFPath) {
      toast.error("Recipt is Required");
      return;
    }
    const payload =
      isButtonClick === 0
        ? {
            paymentDate: values?.paymentDate,
            paymentMode: PaymentModeValue,
            centreId: parseInt(CenterId),
            advancePaymentAmt: parseInt(values?.advancePaymentAmt),
            bank: BankValue,
            tnxNo: "",
            chequeNo: values?.PayNo || "",
            chequeDate: values?.PayDate,
            tnxDate: new Date().toISOString(),
            remarks: values?.remarks,
            rejectRemarks: "",
            approved: 0,
            apprvoedByID: 0,
            paymentType: parseInt(PaymentTypeId),
            fileName: PDFPath,
            createdBy: lsData?.user?.employeeId,
            createdDate: new Date().toISOString(),
          }
        : {
            ...values,
            ...clickedRowId,
            updateByID: lsData?.user?.employeeId,
            updateDate: new Date().toISOString(),
          };
    const data1 = await PostData?.postRequest(
      "/CentrePayment/SubmitPayment",
      payload
    );
    console.log(payload);
    if (data1?.success) {
      toast.success(
        isButtonClick === 0 ? data1?.message : "Updated Successfull"
      );
      setIsButtonClick(0);
      // getReason();
    }
  };

  const handlePdfUpload = async () => {
    const formData = new FormData();
    formData.append("paymentReciept", FileData.fileData);

    try {
      const response = await DocumentData.postRequest(
        `/CentrePayment/paymentRecieptUpload`,
        formData
      );
      if (response?.success) {
        const filePath = response?.message;
        if (!filePath) {
          toast.error("File path missing in response.");
        } else {
          setPDFPath(filePath);
        }
      } else {
        toast.error(response?.message || "An error occurred.");
      }
    } catch (error) {
      //   toast.error("Upload failed!");
      //   console.error("Upload Error:", error);
    }
  };

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
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setPaymentModeValue(e.target.value);
    setPaymentModeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setPaymentMode(id);
    setPaymentModeValue(name);
    setPaymentModeId(id);
    setPaymentModeSelectedOption(name);
    setPaymentModeDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange = (e) => {
    setPaymentTypeValue(e.target.value);
    setPaymentTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick = (name, id) => {
    setPaymentTypeValue(name);
    setPaymentTypeId(id);
    setPaymentTypeSelectedOption(name);
    setPaymentTypeDropDown(false);
  };
  console.log(status);
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setBankValue(e.target.value);
    setBankDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick3 = (name, id) => {
    setBankValue(name);
    setBankId(id);
    setBankSelectedOption(name);
    setBankDropDown(false);
  };
  const getReason = async () => {
    const payload = [CenterId];
    const get = await getData?.postRequest(
      `/CentrePayment/ClientDeposit?centreid=${CenterId}&Paymenttype=${PaymentTypeId}&status=${status}`,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-2  mx-1 lg:mx-2">
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
          {/* <InputGenerator
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
          /> */}
          <InputGenerator
            inputFields={[
              {
                label: "Payment Date",
                type: "customDateField",
                name: "paymentDate",
                minDate: new Date(2000, 0, 1),
                tillDate: new Date(2100, 0, 1),
              },
            ]}
          />
          <SearchBarDropdown
            id="search-bar"
            name="PaymentMode"
            value={PaymentModeValue}
            onChange={handleSearchChange1}
            label="Payment Mode"
            placeholder="Serch PaymentMode"
            options={[
              { id: 1, mode: "Cash" },
              { id: 2, mode: "Cheque" },
              { id: 3, mode: "Neft" },
              { id: 4, mode: "Rtgs" },
              { id: 5, mode: "Online" },
            ]}
            isRequired={false}
            showSearchBarDropDown={PaymentModeDropDown}
            setShowSearchBarDropDown={setPaymentModeDropDown}
            handleOptionClickForCentre={handleOptionClick1}
            setIsHovered={setPaymentModeHoveIndex}
            isHovered={PaymentModeHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <SearchBarDropdown
            id="search-bar"
            name="PaymentType"
            value={PaymentTypeValue}
            onChange={handleSearchChange}
            label="Payment Type"
            placeholder="Serch PaymentType"
            options={[
              { id: 1, Type: "Deposit" },
              { id: 2, Type: "Credit Note" },
              { id: 3, Type: "Debit Note" },
            ]}
            isRequired={false}
            showSearchBarDropDown={PaymentTypeDropDown}
            setShowSearchBarDropDown={setPaymentTypeDropDown}
            handleOptionClickForCentre={handleOptionClick}
            setIsHovered={setPaymentTypeHoveIndex}
            isHovered={PaymentTypeHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <InputGenerator
            inputFields={[
              {
                label: "Advance Amount",
                type: "number",
                name: "advancePaymentAmt",
              },
            ]}
          />

          {PaymentMode == 2 && (
            <>
              <SearchBarDropdown
                id="search-bar"
                name="Bank"
                value={BankValue}
                onChange={handleSearchChange3}
                label="Bank"
                placeholder="Serch Bank"
                options={BankData?.data}
                isRequired={false}
                showSearchBarDropDown={BankDropDown}
                setShowSearchBarDropDown={setBankDropDown}
                handleOptionClickForCentre={handleOptionClick3}
                setIsHovered={setBankHoveIndex}
                isHovered={BankHoveIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <InputGenerator
                inputFields={[
                  {
                    label: "Cheque No.",
                    type: "number",
                    name: "PayNo",
                  },
                  {
                    label: "Cheque Date",
                    type: "customDateField",
                    name: "PayDate",
                    minDate: new Date(2000, 0, 1),
                    tillDate: new Date(2100, 0, 1),
                  },
                ]}
              />
            </>
          )}
          {PaymentMode == 3 && (
            <>
              <SearchBarDropdown
                id="search-bar"
                name="Bank"
                value={BankValue}
                onChange={handleSearchChange3}
                label="Bank"
                placeholder="Serch Bank"
                options={BankData?.data}
                isRequired={false}
                showSearchBarDropDown={BankDropDown}
                setShowSearchBarDropDown={setBankDropDown}
                handleOptionClickForCentre={handleOptionClick3}
                setIsHovered={setBankHoveIndex}
                isHovered={BankHoveIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <InputGenerator
                inputFields={[
                  {
                    label: "Neft No.",
                    type: "number",
                    name: "PayNo",
                  },
                  {
                    label: "Neft Date",
                    type: "customDateField",
                    name: "PayDate",
                    minDate: new Date(2000, 0, 1),
                    tillDate: new Date(2100, 0, 1),
                  },
                ]}
              />
            </>
          )}
          {PaymentMode == 4 && (
            <>
              <SearchBarDropdown
                id="search-bar"
                name="Bank"
                value={BankValue}
                onChange={handleSearchChange3}
                label="Bank"
                placeholder="Serch Bank"
                options={BankData?.data}
                isRequired={false}
                showSearchBarDropDown={BankDropDown}
                setShowSearchBarDropDown={setBankDropDown}
                handleOptionClickForCentre={handleOptionClick3}
                setIsHovered={setBankHoveIndex}
                isHovered={BankHoveIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <InputGenerator
                inputFields={[
                  {
                    label: "Rtgs No.",
                    type: "number",
                    name: "PayNo",
                  },
                  {
                    label: "Rtgs Date",
                    type: "customDateField",
                    name: "PayDate",
                    minDate: new Date(2000, 0, 1),
                    tillDate: new Date(2100, 0, 1),
                  },
                ]}
              />
            </>
          )}
          {PaymentMode == 5 && (
            <>
              <SearchBarDropdown
                id="search-bar"
                name="Bank"
                value={BankValue}
                onChange={handleSearchChange3}
                label="Bank"
                placeholder="Serch Bank"
                options={BankData?.data}
                isRequired={false}
                showSearchBarDropDown={BankDropDown}
                setShowSearchBarDropDown={setBankDropDown}
                handleOptionClickForCentre={handleOptionClick3}
                setIsHovered={setBankHoveIndex}
                isHovered={BankHoveIndex}
                style={{ marginTop: "0.1rem" }}
              />
              <InputGenerator
                inputFields={[
                  {
                    label: "Online No.",
                    type: "number",
                    name: "PayNo",
                  },
                  {
                    label: "Online Date",
                    type: "customDateField",
                    name: "PayDate",
                    minDate: new Date(2000, 0, 1),
                    tillDate: new Date(2100, 0, 1),
                  },
                ]}
              />
            </>
          )}
          <FileUpload
            FileData={FileData}
            setFileData={setFileData}
            accept=".pdf"
            inputFields={{
              label: "Upload Reciept",
              Size: "100",
              required: true,
            }}
          />
          <InputGenerator
            inputFields={[{ label: "Remarks", type: "text", name: "remarks" }]}
          />
          <TwoLegendButton
            options={[
              {
                label: "Save",
                submit: true,
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
        name="Client Payment Details"
        loading={getData?.loading}
        columns={columns}
        viewKey="Random"
      />
    </div>
  );
}
