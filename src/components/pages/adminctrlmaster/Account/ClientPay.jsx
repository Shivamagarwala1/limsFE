import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import FileUpload from "../../../../Custom Components/FileUpload";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";

export default function ClientPay() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const lsData = getLocal("imarsar_laboratory");
  const PostData = usePostData();
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
  const [PaymentTypeId, setPaymentTypeId] = useState(null);
  const [PaymentTypeValue, setPaymentTypeValue] = useState("");
  const [PaymentTypeDropDown, setPaymentTypeDropDown] = useState(false);
  const [PaymentTypeHoveIndex, setPaymentTypeHoveIndex] = useState(null);
  const [PaymentTypeSelectedOption, setPaymentTypeSelectedOption] =
    useState("");

  const [FileData, setFileData] = useState({ fileName: "" });
  const [PDFPath, setPDFPath] = useState("");
  const [PaymentMode, setPaymentMode] = useState(1);

  const AllCenterData = useGetData();
  const BankData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreid,companyName&$filter=( centretypeid eq 2 or centretypeid eq 3 )"
    );
    BankData?.fetchData("/bank_master");
    // console.log(AllCenterData);
  }, []);
  useEffect(() => {
    getReason();
  }, [PaymentMode]);

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
    console.log(values);
    const payload =
      isButtonClick === 0
        ? {
            ...values,
            paymentMode: PaymentModeValue,
            bank: BankValue,
            tnxNo: "12345",
            tnxDate: new Date().toISOString(),
            paymentType: PaymentTypeValue,
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
    // if (data1?.success) {
    //   toast.success(
    //     isButtonClick === 0 ? data1?.message : "Updated Successfull"
    //   );
    //   setIsButtonClick(0);
    //   getReason();
    // }
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
  const statuses = [
    {
      Data: 17,
      CallBack: () => {
        // Pending
      },
    },
    {
      Data: 18,
      CallBack: () => {
        // Collected
      },
    },
    {
      Data: 19,
      CallBack: () => {
        // Collected
      },
    },
  ];
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
                label: "Payment Date",
                type: "customDateField",
                name: "paymentDate",
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
                    name: "ChequeNo",
                  },
                  {
                    label: "Cheque Date",
                    type: "customDateField",
                    name: "ChequeDate",
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
            </>
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
            inputFields={[{ label: "Remarks", type: "text", name: "remarks" }]}
          />
          <TwoSubmitButton
            options={[
              {
                label: "Save",
                submit: true,
                // callBack: () => {
                //   handleSubmit();
                // },
              },
            ]}
          />
        </div>
        <LegendButtons statuses={statuses} />
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
