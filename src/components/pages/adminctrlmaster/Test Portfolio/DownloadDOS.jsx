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
import { ExcelToJson } from "../../../../Custom Components/ExcelToJson";

export default function DownloadDOS() {
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
  const [FileData, setFileData] = useState({ fileName: "", fileData: null });
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    if (FileData?.fileData) {
      ExcelToJson(FileData.fileData)
        .then((data) => {
          const updatedData = data.map((item, index) => ({ ...item, id: index + 1 }));
          console.log("Parsed JSON with IDs:", updatedData);
          setJsonData(updatedData);
        })
        .catch((error) => console.error("Error parsing Excel:", error));
    }
  }, [FileData]);

  console.log("FileData:", FileData);

  const columns = [
    { field: "id", headerName: "Sr. No.", flex:1 },
    {
      field: `Test`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `Test MRP`,
      headerName: `Test MRP`,
      flex: 1,
    },
    {
      field: `Test Price`,
      headerName: `Test Price`,
      flex: 1,
    },
    {
      field: `Type of Sample`,
      headerName: `Type of Sample`,
      flex: 1,
    },
    {
      field: `Expected TAT`,
      headerName: `Expected TAT`,
      flex: 1,
    },
    // {
    //   field: "",
    //   width: 250,
    //   headerName: "Action",
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "5px" }}>
    //         <button
    //           style={{ display: "contents" }}
    //           className="w-4 h-4 flex justify-center items-center"
    //         >
    //           <FaDownload
    //             style={{ fontSize: "20px" }}
    //             className={`cursor-pointer`}
    //             onClick={() => {}}
    //           />
    //           Download Sample Report
    //         </button>
    //       </div>
    //     );
    //   },
    // },
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

    console.log(payload);
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
        <div>Download DOS</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-2 mb-2 mx-2">
          <FileUpload
            FileData={FileData}
            setFileData={setFileData}
            inputFields={{
              label: "Add Excel",
              Size: "100",
            }}
            accept=".xls, .xlsx"
          />
           <InputGenerator
            inputFields={[
              { label: "Search", type: "text", name: "from" },
            ]}
          />
          {/* <SubmitButton text={"Search"} /> */}
        </div>
      </form>
      <DynamicTable
        rows={jsonData || []}
        name="DOS Details"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
      />
    </div>
  );
}
