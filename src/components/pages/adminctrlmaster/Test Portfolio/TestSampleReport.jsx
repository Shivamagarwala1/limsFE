import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLocal } from "usehoks";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { FaDownload } from "react-icons/fa";
import FileUpload from "../../../../Custom Components/FileUpload";

export default function TestSampleReport() {
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
      field: `Test`,
      headerName: `Test Name`,
      flex: 1,
    },
     {
      field: "",
      width: 250,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <button style={{display:"contents"}} className="w-4 h-4 flex justify-center items-center">
              <FaDownload style={{fontSize:"20px"}}
                className={`cursor-pointer`}
                onClick={() => {

                }}
              />
              Download Sample Report
            </button>
          </div>
        );
      },
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();

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

  // const handleTheUpdateStatusMenu = async () => {
  const lsData = getLocal("imarsar_laboratory");
  const payload = {
    ...clickedRowId,
    updateById: lsData?.user?.employeeId,
    isActive: clickedRowId?.isActive === 1 ? 0 : 1,
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
        <div>Test Sample Report</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-2 mb-2 mx-2">
          <InputGenerator
            inputFields={[
              { label: "Search Test", type: "text", name: "from" },
            ]}
          />
             <FileUpload
            FileData={FileData}
            setFileData={setFileData}
            inputFields={{
              label: "Add File",
              Size: "100",
            }}
            accept=".xls, .xlsx"
          />
          <SubmitButton text={"Search"} />
       
          {/* <SubmitButton text={"Upload"} /> */}
        </div>
      </form>
      <DynamicTable
        rows={[
          {
            id: 1,
            Test:"CBC Complete Blood Count"
          },
        ]}
        name="Test Sample Report Details"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
      />
    </div>
  );
}
