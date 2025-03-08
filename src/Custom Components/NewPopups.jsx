import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../service/apiService";
import { getLocal } from "usehoks";
import FileUpload from "./FileUpload";
import { TableHeader } from "./DynamicTable";
import { SubmitButton } from "./InputGenerator";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

export const UploadCertificatePopupModal = ({
  showPopup,
  setShowPopup,
  rowData,
  centerId,
  setFlag = () => {},
  Flag,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [FileData, setFileData] = useState({ fileName: "" });
  const PostData = usePostData();
  const AddPathPostData = usePostData();
  const handleSubmit = async () => {
    if (!FileData || !FileData.fileData) {
      toast.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("Document", FileData.fileData);

    try {
      const response = await PostData.postRequest(
        `/CentreCertificate/UploadDocument`,
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
  const handleUpload = async (data) => {
    const res = await AddPathPostData?.postRequest(
      `/CentreCertificate/UploadCertificate?CentreId=${centerId}&Certificate=${data}`
    );
    console.log(res);
    if (res?.success) {
      toast.success(res?.message);
    } else {
      toast.success(res?.message);
    }
  };
  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-96 bg-white rounded-md ">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center px-2 py-1 "
        >
          <span className="text-sm font-semibold">Upload Certificate</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <TableHeader title={"Upload Certificate"} />
        <form autoComplete="off">
          <div className="p-2 flex flex-row gap-1 border-none">
            <FileUpload
              FileData={FileData}
              setFileData={setFileData}
              accept=".png, .jpg"
              inputFields={{
                label: "Upload",
                Size: "10",
              }}
            />
            <SubmitButton
              submit={false}
              callBack={() => {
                handleSubmit();
              }}
              text={"Save"}
              style={{
                width: "80px",
                fontSize: "0.75rem",
                backgroundColor: "red !important",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export const UploadAgreementPopupModal = ({
  showPopup,
  setShowPopup,
  rowData,
  centerId,
  setFlag = () => {},
  Flag,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [FileData, setFileData] = useState({ fileName: "" });
  const PostData = usePostData();
  const AddPathPostData = usePostData();
  const handleSubmit = async () => {
    if (!FileData || !FileData.fileData) {
      toast.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("Document", FileData.fileData);

    try {
      const response = await PostData.postRequest(
        `/CentreCertificate/UploadDocument`,
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
  const handleUpload = async (data) => {
    const res = await AddPathPostData?.postRequest(
      `/CentreCertificate/UploadAggreement?CentreId=${centerId}&AggrimenstDocumnet=${data}`
    );
    console.log(res);
    if (res?.success) {
      toast.success(res?.message);
    } else {
      toast.success(res?.message);
    }
  };
  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-96 bg-white rounded-md ">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center px-2 py-1 "
        >
          <span className="text-sm font-semibold">Upload Certificate</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <TableHeader title={"Upload Certificate"} />
        <form autoComplete="off">
          <div className="p-2 flex flex-row gap-1 border-none">
            <FileUpload
              FileData={FileData}
              setFileData={setFileData}
              accept=".pdf"
              inputFields={{
                label: "Upload",
                Size: "10",
              }}
            />
            <SubmitButton
              submit={false}
              callBack={() => {
                handleSubmit();
              }}
              text={"Save"}
              style={{
                width: "80px",
                fontSize: "0.75rem",
                backgroundColor: "red !important",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
