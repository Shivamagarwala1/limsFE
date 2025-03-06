import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { rateListUploadByExcelHeader } from "../../listData/listData";
import FormHeader from "../../../components/global/FormHeader";
import useRippleEffect from "../../customehook/useRippleEffect";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { useGetData, usePostData } from "../../../service/apiService";
import FileUpload from "../../../Custom Components/FileUpload";
import { TwoSubmitButton } from "../../../Custom Components/InputGenerator";
import axios from "axios";
import toast from "react-hot-toast";
import { addObjectId, downloadExcel } from "../../../service/RedendentData";
import { FaRegEdit } from "react-icons/fa";
import { UpdatedDynamicTable } from "../../../Custom Components/DynamicTable";
import { getLocal } from "usehoks";

const MrpInputCell = ({ params, initialTime, setRow }) => {
  const [mrp, setMrp] = useState(initialTime || "");

  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.id === params?.row.id
          ? {
              ...item,
              mrp: parseInt(mrp),
              edited: parseInt(mrp) !== initialTime,
            }
          : item
      )
    );
  }, [mrp]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="text"
        style={{ height: "1rem" }}
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={mrp}
        name="mrp"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
          setMrp(newValue);
        }}
      />
    </div>
  );
};

const RateInputCell = ({ params, initialTime, setRow }) => {
  const [rate, setRate] = useState(initialTime || "");

  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.id === params?.row.id
          ? {
              ...item,
              rate: parseInt(rate),
              edited: parseInt(rate) !== initialTime,
            }
          : item
      )
    );
  }, [rate]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="text"
        style={{ height: "1rem" }}
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={rate}
        name="rate"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
          setRate(newValue);
        }}
      />
    </div>
  );
};

const CheckboxInputCell = ({ params, setSelectedData, row }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (params?.row?.mrp == 0.0) {
      setEnabled(false);
    } else {
      // Enable checkbox only if the row is edited
      setEnabled(params?.row?.edited === true);
    }
  }, [row]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        type="checkbox"
        disabled={!enabled} // Disable if not edited
        onClick={() =>
          setSelectedData(
            (prev) =>
              prev.some((item) => item.id === params?.row.id)
                ? prev.filter((item) => item.id !== params?.row.id) // Remove if exists
                : [...prev, { ...params?.row }] // Add if not
          )
        }
      />
    </div>
  );
};
export default function RateListUploadByExcel() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  useRippleEffect();

  const [FileData, setFileData] = useState({ fileName: "" });
  const [SelectedData, setSelectedData] = useState([]);
  const [row, setRow] = useState([]);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  //   --------------------- RateType ------------------------------
  const [RateTypeId, setRateTypeId] = useState("");
  const [RateTypeValue, setRateTypeValue] = useState("");
  const [RateTypeDropDown, setRateTypeDropDown] = useState(false);
  const [RateTypeHoveIndex, setRateTypeHoveIndex] = useState(null);
  const [RateTypeSelectedOption, setRateTypeSelectedOption] = useState("");

  const RateTypeData = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    const fetchedData = async () => {
      await RateTypeData?.fetchData(
        "/rateTypeMaster?select=id,ratename&$filter=(isActive eq 1)"
      );
    };
    fetchedData();
  }, []);
  const handleOptionClick1 = (name, id) => {
    setRateTypeValue(name);
    setRateTypeId(id);
    setRateTypeSelectedOption(name);
    setRateTypeDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setRateTypeValue(e.target.value);
    setRateTypeDropDown(true); // Show dropdown when typing
  };

  const downloadRateListExcel = async () => {
    if (!RateTypeId) {
      toast.error("Rate Type is Required");
      return;
    }
    downloadExcel(
      `/rateTypeWiseRateList/GetRateListExcel?RatetypeId=${RateTypeId}`
    );
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("ratelistexcel", FileData?.fileData); // Attach file

    try {
      const response = await axios.post(
        `${BASE_URL}/rateTypeWiseRateList/SaveRateListFromExcel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept:
              "application/json;odata.metadata=minimal;odata.streaming=true",
          },
        }
      );
      const rows = addObjectId(response?.data?.data || []);
      setRow(rows); // Store the response JSON in state
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  const handleSubmit = async () => {
    if (SelectedData.length === 0) {
      toast.error("No data selected for submission.");
      return;
    }

    const formattedData = SelectedData.map((item) => ({
      isActive: 1,
      createdById: parseInt(lsData?.user?.employeeId),
      createdDateTime: new Date().toISOString(),
      id: 0,
      deptId: item?.deptId,
      rateTypeId: RateTypeId,
      mrp: item?.mrp,
      discount: 0,
      rate: item?.rate,
      itemid: item?.itemId,
      itemCode: item?.itemCode,
      transferRemarks: "string",
      transferDate: new Date().toISOString(),
    }));
    console.log(formattedData);
    const res = await PostData?.postRequest(
      "/rateTypeWiseRateList/SaveRateList",
      formattedData
    );

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  console.log(SelectedData);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    { field: "itemCode", headerName: "Item Code", flex: 1 },
    { field: "itemId", headerName: "Item Id", flex: 1 },
    { field: "investigationName", headerName: "Item Name", flex: 1 },
    {
      field: "mrp",
      headerName: "MRP",
      flex: 1,
      renderCell: (params) => {
        return (
          <MrpInputCell
            setRow={setRow}
            initialTime={params?.row?.mrp}
            params={params}
          />
        );
      },
    },
    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
      renderCell: (params) => {
        return (
          <RateInputCell
            setRow={setRow}
            initialTime={params?.row?.rate}
            params={params}
          />
        );
      },
    },
    {
      field: `select`,
      headerName: `Select`,
      flex: 1,
      renderCell: (params) => {
        return (
          <CheckboxInputCell
            setSelectedData={setSelectedData}
            initialTime={params?.row}
            row={row}
            params={params}
          />
        );
      },
    },
  ];
  return (
    <>
      <div>
        {/* Header Section */}
        <FormHeader headerData="RateList Upload By Excel" />

        {/* form data */}
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            {/* Rate Type */}
            <SearchBarDropdown
              id="search-bar"
              name="RateType"
              value={RateTypeValue}
              onChange={handleSearchChange1}
              label="Rate Type"
              options={RateTypeData?.data}
              isRequired={false}
              showSearchBarDropDown={RateTypeDropDown}
              setShowSearchBarDropDown={setRateTypeDropDown}
              handleOptionClickForCentre={handleOptionClick1}
              setIsHovered={setRateTypeHoveIndex}
              isHovered={RateTypeHoveIndex}
            />
            {/* <div className="relative flex-1 flex justify-start items-center">
              {
                <button
                  type="button"
                  data-ripple-light="true"
                  className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                  // onClick={onSubmitSaveEmployeeMaster}
                >
                  Download
                </button>
              }
            </div> */}
            {/* File Upload */}
            <FileUpload
              FileData={FileData}
              setFileData={setFileData}
              placeholder="Upload Excel"
              accept=".xls,.xlsx"
              inputFields={{
                label: "Add Attachment",
                Size: "10",
              }}
            />
            <TwoSubmitButton
              options={[
                {
                  label: "Download",
                  submit: false,
                  callBack: () => {
                    downloadRateListExcel();
                  },
                },
                {
                  label: "Upload",
                  submit: false,
                  callBack: () => {
                    handleFileUpload();
                  },
                },
              ]}
            />
            <TwoSubmitButton
              options={[
                {
                  label: "Save",
                  submit: false,
                  callBack: () => {
                    handleSubmit();
                  },
                },
              ]}
            />
          </div>
        </form>
      </div>

      {/* grid data */}
      <UpdatedDynamicTable rows={row} columns={columns} />
    </>
  );
}
