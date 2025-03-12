import React, { useEffect, useState } from "react";
import { UpdatedDynamicTable } from "../../../Custom Components/DynamicTable";
import InputGenerator, {
  TwoSubmitButton,
} from "../../../Custom Components/InputGenerator";
import { ImSwitch } from "react-icons/im";
import { useFormHandler } from "../../../Custom Components/useFormHandler";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../../../service/apiService";
import { FormHeader } from "../../../Custom Components/FormGenerator";
import {
  addRandomObjectId,
  ViewOrDownloandPDF,
} from "../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { getLocal } from "usehoks";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import PopupModal, { ImagePopup } from "../../../Custom Components/PopupModal";
import FileUpload from "../../../Custom Components/FileUpload";
import { IoMdImages } from "react-icons/io";
import useImageFetcher from "../../../Custom Components/useImageFetcher";

// Main Component
export default function MarketingDashboardMaster() {
  const lsData = getLocal("imarsar_laboratory");
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const { imageSrc, loading, error, fetchImage } = useImageFetcher();

  const [Min, setMin] = useState("");
  const [Max, setMax] = useState("");
  const [IsEdit, setIsEdit] = useState(true);
  const [ClickedRow, setClickedRow] = useState(false);
  const [PDFPath, setPDFPath] = useState("");
  const [ImagePath, setImagePath] = useState("");

  const [FileData, setFileData] = useState({ fileName: "" });
  const [FileData1, setFileData1] = useState({ fileName: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  // ------------------ Marketing -------------------------------
  const [MarketingId, setMarketingId] = useState(null);
  const [MarketingValue, setMarketingValue] = useState("");
  const [MarketingDropDown, setMarketingDropDown] = useState(false);
  const [MarketingHoveIndex, setMarketingHoveIndex] = useState(null);
  const [MarketingSelectedOption, setMarketingSelectedOption] = useState("");

  const [row, setRow] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();
  const DocumentData = usePostData();
  const UpdateData = usePostData();
  useEffect(() => {
    if (MarketingValue != "") {
      getData?.fetchData(
        `/MarketingDashBoard/GetDashBoardData?type=${MarketingValue}`
      );
    }
  }, [MarketingValue,UpdateData?.loading,PostData?.loading]);
  useEffect(() => {
    if (getData?.data?.data) {
      setRow(addRandomObjectId(getData?.data?.data));
    }
  }, [getData?.data?.data]);

  useEffect(() => {
    if (FileData1.fileData) {
      if (!FileData1 || !FileData1.fileData) {
        toast.error("No Pdf selected!");
        return;
      } else {
        handlePdfUpload();
      }
    }
  }, [FileData1]);
  useEffect(() => {
    if (FileData.fileData) {
      if (!FileData || !FileData.fileData) {
        toast.error("No Image selected!");
        return;
      } else {
        handleImageUpload();
      }
    }
  }, [FileData]);
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "",
      width: 200,
      headerName: "Pdf/Image",
      renderCell: (params) => {
        return (
          <>
            <div className="flex gap-1">
              {params?.row?.pdf && (
                <div
                  onClick={() => {
                    ViewOrDownloandPDF(
                      `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.pdf}`
                    );
                  }}
                  className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <FaRegFilePdf />
                </div>
              )}
              {params?.row?.image && (
                <div
                  onClick={() => {
                    const handleShowImage = async () => {
                      await fetchImage(
                        `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.image}`
                      );
                      setShowPopup(true);
                    };
                    handleShowImage();
                  }}
                  className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <IoMdImages />
                </div>
              )}
            </div>
          </>
        );
      },
    },
    {
      field: "",
      width: 100,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              className={`w-4 h-4 flex justify-center items-center ${
                params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              <ImSwitch
                className="w-full h-full"
                onClick={() => {
                  setClickedRow(params?.row);
                  setShowPopup1(true);
                }}
              />
            </button>
          </div>
        );
      },
    },
  ];
  console.log(PDFPath, " ", ImagePath);
  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setMarketingValue(e.target.value);
    setMarketingDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setMarketingValue(name);
    setMarketingId(id);
    setMarketingSelectedOption(name);
    setMarketingDropDown(false);
  };
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("Document", FileData.fileData);

    try {
      const response = await DocumentData.postRequest(
        `/MarketingDashBoard/UploadDocument`,
        formData
      );
      if (response?.success) {
        const filePath = response?.data?.filePath;
        if (!filePath) {
          toast.error("File path missing in response.");
        } else {
          setImagePath(filePath);
        }
      } else {
        toast.error(response?.message || "An error occurred.");
      }
    } catch (error) {
      //   toast.error("Upload failed!");
      //   console.error("Upload Error:", error);
    }
  };
  const handlePdfUpload = async () => {
    const formData = new FormData();
    formData.append("Document", FileData1.fileData);

    try {
      const response = await DocumentData.postRequest(
        `/MarketingDashBoard/UploadDocument`,
        formData
      );
      if (response?.success) {
        const filePath = response?.data?.filePath;
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = getValues();
    console.log(values);
    const payload = IsEdit
      ? {
          isActive: 1,
          createdById: parseInt(lsData?.user?.employeeId),
          createdDateTime: new Date().toISOString(),
          id: 0,
          type: MarketingValue,
          subject: values?.subject,
          description: values?.description,
          image: ImagePath,
          pdf: PDFPath,
        }
      : {};
    if (!MarketingValue) {
      toast.error("Marketing is required");
      return;
    }
    if (!values?.subject) {
      toast.error("Subject is required");
      return;
    }
    try {
      const res = await PostData?.postRequest(
        `/MarketingDashBoard/SaveUpdateDashboard`,
        payload
      );
      if (res?.success) {
        toast?.success(res?.message);
      } else {
        toast?.error(res?.message);
      }
    } catch (error) {
      toast?.error(res?.message);
    }
  };

  const handleTheUpdateStatusMenu = async () => {
    const res = await UpdateData?.postRequest(
      `/MarketingDashBoard/DeactiveDashboardImage?id=${ClickedRow?.id}&userid=${
        lsData?.user?.employeeId
      }&status=${ClickedRow?.isActive == 1 ? 0 : 1}`
    );
    if (res?.success) {
      toast.success(res?.message);
      setShowPopup1(false);
    } else {
      toast.success(res?.message);
    }
  };

  return (
    <>
      <ImagePopup
        Img={imageSrc}
        setImageView={setShowPopup}
        imageView={showPopup}
      />
      <PopupModal
        showPopup={showPopup1}
        setShowPopup={setShowPopup1}
        handleTheUpdateStatusMenu={handleTheUpdateStatusMenu}
        isButtonClick={IsEdit ? 1 : 0}
        message="Are you sure you want to proceed with the action?"
        cancelText="Cancel"
        confirmText="Yes"
      />
      <div>
        <FormHeader title="Marketing Dashboard" />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
            <SearchBarDropdown
              id="search-bar"
              name="Marketing"
              value={MarketingValue}
              onChange={handleSearchChange2}
              label="Marketing"
              placeholder="Serch Marketing"
              options={[
                { id: 1, data: "Reward Program" },
                { id: 2, data: "Lab Offer" },
                { id: 3, data: "Monthly Slab" },
                { id: 4, data: "New Updates" },
                { id: 5, data: "Packages in Spotlight" },
              ]}
              isRequired={false}
              showSearchBarDropDown={MarketingDropDown}
              setShowSearchBarDropDown={setMarketingDropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setMarketingHoveIndex}
              isHovered={MarketingHoveIndex}
              style={{ marginTop: "0.1rem" }}
            />
            <InputGenerator
              inputFields={[
                {
                  label: "Subject",
                  type: "text",
                  name: "subject",
                  maxLength: 50,
                },
                {
                  label: "Discription",
                  type: "text",
                  name: "description",
                  maxLength: 500,
                },
              ]}
            />
            <FileUpload
              FileData={FileData}
              text="Uploaded"
              accept=".jpg, .jpeg, .png"
              setFileData={setFileData}
              inputFields={{ Size: 10, label: "Image" }}
            />
            <FileUpload
              FileData={FileData1}
              text="Uploaded"
              accept=".pdf"
              setFileData={setFileData1}
              inputFields={{ Size: 10, label: "PDF" }}
            />
            <TwoSubmitButton
              options={[
                {
                  label: "Save",
                  submit: true,
                },
              ]}
            />
          </div>
        </form>
        <div style={{ height: "300px" }}>
          <UpdatedDynamicTable
            rows={row}
            name="Marketing Dashboard Details"
            loading={getData?.loading}
            columns={columns}
            viewKey="Random"
          />
        </div>
      </div>
    </>
  );
}
