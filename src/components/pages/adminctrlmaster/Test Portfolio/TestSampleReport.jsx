import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLocal } from "usehoks";
import { TwoSubmitButton } from "../../../../Custom Components/InputGenerator";
import {
  addRandomObjectId,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import { FaDownload } from "react-icons/fa";
import FileUpload from "../../../../Custom Components/FileUpload";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import toast from "react-hot-toast";

export default function TestSampleReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const RoleData = getLocal("RoleDetails");
  const { fetchData, response, data, loading } = useGetData();

  const [isEditData, setIsEditData] = useState(false);
  const [FileData, setFileData] = useState({ fileName: "" });

  // ------------------ Item -------------------------------
  const [ItemId, setItemId] = useState(null);
  const [ItemValue, setItemValue] = useState("");
  const [ItemDropDown, setItemDropDown] = useState(false);
  const [ItemHoveIndex, setItemHoveIndex] = useState(null);
  const [ItemSelectedOption, setItemSelectedOption] = useState("");

  const [Row, setRow] = useState([]);
  const AllTestData = useGetData();
  const PostData = usePostData();
  const AddPathPostData = usePostData();
  useEffect(() => {
    AllTestData?.fetchData(
      "/itemMaster?select= itemId,ItemName&$filter=(itemType le 2 and isactive eq 1)"
    );
  }, []);
  useEffect(() => {
    handleSubmit();
  }, [ItemId, isEditData]);

  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setItemValue(e.target.value);
    setItemDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setItemValue(name);
    setItemId(id);
    setItemSelectedOption(name);
    setItemDropDown(false);
  };

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 100 },
    {
      field: `investigationName`,
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
            <button
              onClick={() => {
                ViewOrDownloandPDF(
                  `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.formatUrl}`
                );
              }}
              style={{ display: "contents" }}
              className="w-4 h-4 flex justify-center items-center"
            >
              <FaDownload
                style={{ fontSize: "15px" }}
                className={`cursor-pointer`}
                onClick={() => {}}
              />
              Download Sample Report
            </button>
          </div>
        );
      },
    },
  ];

  const handleSubmit = async () => {
    try {
      const response = await fetchData(
        `/InvestigationMasterUD?select=id,InvestigationId,InvestigationName,FormatUrl&$filter=(investigationId eq ${ItemId})`
      );
      console.log(response);
      if (response) {
        const rowData = addRandomObjectId(response?.data); // Assuming response contains the fetched data
        setRow(rowData);
      } else {
        console.error("No data returned from fetchData");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const UploadPdf = async () => {
    if (!FileData || !FileData.fileData) {
      toast.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("Document", FileData.fileData);

    try {
      const response = await PostData.postRequest(
        `/InvestigationMasterUD/UploadDocument`,
        formData
      );
      if (response?.success) {
        const filePath = response?.data?.filePath;
        if (!filePath) {
          toast.error("File path missing in response.");
        } else {
          handleUpload(filePath);
        }
      } else {
        toast.error(response?.message || "An error occurred.");
      }
    } catch (error) {
      //   toast.error("Upload failed!");
      //   console.error("Upload Error:", error);
    }
  };

  console.log(Row);
  const handleUpload = async (data) => {
    const payload = {
      isActive: 1,
      createdById: lsData?.user?.employeeId,
      createdDateTime: new Date().toISOString(),
      investigationId: ItemId,
      investigationName: ItemValue,
      formatUrl: data,
    };
    const res = await AddPathPostData?.postRequest(
      `/InvestigationMasterUD/UpdateInvestigationFormat`,
      payload
    );
    if (res?.success) {
      toast.success(res?.message);
      setIsEditData(!isEditData);
      setFileData({ fileName: "" });
    } else {
      toast.success(res?.message);
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
        <div>Test Sample Report</div>
      </div>

      <form autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-2 mb-2 mx-2">
          <SearchBarDropdown
            id="search-bar"
            name="Item"
            value={ItemValue}
            onChange={handleSearchChange1}
            label="Item"
            placeholder="Serch Item"
            options={AllTestData?.data}
            isRequired={false}
            showSearchBarDropDown={ItemDropDown}
            setShowSearchBarDropDown={setItemDropDown}
            handleOptionClickForCentre={handleOptionClick1}
            setIsHovered={setItemHoveIndex}
            isHovered={ItemHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          {(RoleData?.roleId == 1 ||
            RoleData?.roleId == 6 ||
            RoleData?.roleId == 7) && (
            <>
              <div style={{ marginTop: "1px" }}>
                <FileUpload
                  FileData={FileData}
                  setFileData={setFileData}
                  inputFields={{
                    label: "Add File",
                    Size: "100",
                  }}
                  accept=".pdf"
                />
              </div>
              <TwoSubmitButton
                options={[
                  {
                    label: "Save",
                    submit: false,
                    callBack: () => {
                      if (!ItemId) {
                        toast.error("Item is required");
                        return;
                      }
                      UploadPdf();
                    },
                  },
                ]}
              />
            </>
          )}
        </div>
      </form>
      <UpdatedDynamicTable
        rows={Row}
        name="Test Sample Report Details"
        loading={loading}
        columns={columns}
        viewKey={"Random"}
      />
    </div>
  );
}
