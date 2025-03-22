import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../service/apiService";
import { getLocal } from "usehoks";
import FileUpload from "./FileUpload";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { TableHeader, UpdatedDynamicTable } from "./DynamicTable";
import InputGenerator, {
  getFormattedDate,
  SubmitButton,
  TwoSubmitButton,
} from "./InputGenerator";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { useFormHandler } from "./useFormHandler";
import axios from "axios";
import {
  addRandomObjectId,
  convertDateTimeFormat,
} from "../service/RedendentData";
import { MdPadding } from "react-icons/md";
import { DatePickerWithTime } from "./DatePickerWithTime";

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
export const RejectPopupModal = ({
  showPopup,
  setShowPopup,
  Params,
  UserId,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();
  if (!showPopup) return null;

  const handleReject = async (e) => {
    if (e) e.preventDefault(); // Prevents default form submission

    const values = getValues();
    if (!values?.RejectionReason) {
      toast.error("Rejection Reason is required");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/Indent/RejectIndent?indentId=${Params?.indentId}&UserId=${lsData?.user?.employeeId}&rejectionReason=${values?.RejectionReason}`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
      setShowPopup(false); // Close modal on success
    } catch (error) {
      console.error("Error rejecting indent:", error);
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
          <span className="text-sm font-semibold">Indent Rejection Reason</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form autoComplete="off" ref={formRef} onSubmit={handleReject}>
          {/* Input Field */}
          <div className="p-4 pb-2 pt-2 flex flex-row gap-1 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: "Rejection Reason",
                  type: "text",
                  name: "RejectionReason",
                },
              ]}
            />
            <SubmitButton
              submit={false}
              text={"Save"}
              callBack={() => {
                handleReject();
              }}
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
const ApproveInputCell = ({ params, initialQuantity = "", setRow }) => {
  const [Quantity, setQuantity] = useState(params?.row?.approvedQuantity);
  const lsData = getLocal("imarsar_laboratory");
  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.itemId === params?.row.itemId
          ? {
              ...item,
              createdById: parseInt(lsData?.user?.employeeId),
              approvedQuantity: parseInt(Quantity) || 0,
              issueDateTime: new Date().toISOString(),
            }
          : item
      )
    );
  }, [Quantity, setRow]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={Quantity}
        maxLength={8}
        name="Quantity"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
          if (newValue <= initialQuantity) {
            setQuantity(newValue);
          }
        }}
      />
    </div>
  );
};
const IssueInputCell = ({ params, initialQuantity = "", setRow }) => {
  const [Quantity, setQuantity] = useState(initialQuantity);
  const lsData = getLocal("imarsar_laboratory");
  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.itemId === params?.row.itemId
          ? {
              ...item,
              createdById: parseInt(lsData?.user?.employeeId),
              issuedQuantity: parseInt(Quantity) || 0,
              issueDateTime: new Date().toISOString(),
            }
          : item
      )
    );
  }, [Quantity, setRow]);

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={Quantity}
        maxLength={8}
        name="Quantity"
        onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
          if (newValue <= params?.row?.pendingissue) {
            setQuantity(newValue);
          }
        }}
      />
    </div>
  );
};
export const IndentIssuePopupModal = ({ showPopup, setShowPopup, Params }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [row, setRow] = useState([]);
  const viewKey = "Random";
  useEffect(() => {
    if (showPopup) {
      handleGet();
    }
  }, [showPopup]);

  const handleGet = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/Indent/GetDetail?indentId=${Params?.indentId}`
      );
      if (res?.data?.success) {
        setRow(addRandomObjectId(res?.data?.data)); // Ensure unique IDs are set
      }
    } catch (error) {
      console.error("Error rejecting indent:", error);
    }
  };

  if (!showPopup) return null;

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "quantity", headerName: "Requested Quantity", flex: 1 },
    { field: "approvedQuantity", headerName: "Approved Quantity", flex: 1 },
    // { field: "roleName", headerName: "Role Name", flex: 1 },
    { field: "createdBy", headerName: "Created By", flex: 1 },
    { field: "createdDateTime", headerName: "Created Date", flex: 1 },
    {
      field: "createdDateTime",
      headerName: "Issued Quantity",
      flex: 1,
      renderCell: (params) => {
        return (
          <IssueInputCell
            params={params}
            initialQuantity={params?.row?.issuedQuantity}
            setRow={setRow}
          />
        );
      },
    },
  ];

  const handleSubmit = async () => {
    const payload = row.map((item) => ({
      id: 0,
      indentId: item?.indentId,
      itemId: item?.itemId,
      requestedQuantity: item?.quantity,
      issuedQuantity: item?.issuedQuantity,
      issueById: item?.createdById,
      issueDateTime: item?.issueDateTime,
    }));
    try {
      const res = await axios.post(
        `${BASE_URL}/indentIssueDetail/IssueIndent`,
        payload
      );
      console.error("res ", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setShowPopup(false);
        window?.location?.reload();
      }
    } catch (error) {
      console.error("Error rejecting indent:", error);
    }
  };

  console.log(row);
  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-96 md:w-[45rem] bg-white rounded-md">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center px-2 py-1"
        >
          <span className="text-sm font-semibold">Issue Indent</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <TableHeader title={"Indent Details"} />
        <div
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="overflow-x-auto w-full"
        >
          <table className="table-auto border-collapse w-full text-xxs text-left min-w-max">
            <thead
              style={{
                background: activeTheme?.menuColor,
                color: activeTheme?.iconColor,
              }}
            >
              <tr>
                {columns?.map((col, index) => (
                  <th
                    key={index}
                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
                    style={{
                      width: col?.width ? `${col?.width}px` : "",
                      flex: col?.flex || "",
                    }}
                  >
                    {col?.renderHeaderCell
                      ? col?.renderHeaderCell({ row: {} })
                      : col?.headerName}
                  </th>
                ))}
              </tr>
            </thead>

            {row?.length !== 0 ? (
              <tbody>
                {row?.map((row, index) => (
                  <tr
                    key={row?.[viewKey] || index} // Ensure a valid key
                    className={`cursor-pointer ${
                      isHoveredTable === row?.[viewKey]
                        ? ""
                        : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                    onMouseEnter={() => setIsHoveredTable(row?.[viewKey])}
                    onMouseLeave={() => setIsHoveredTable(null)}
                    style={{
                      background:
                        isHoveredTable === row?.[viewKey]
                          ? activeTheme?.subMenuColor
                          : "",
                    }}
                  >
                    {columns?.map((col, idx) => (
                      <td
                        key={idx}
                        className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                      >
                        {col?.renderCell
                          ? col?.renderCell({ row })
                          : row[col?.field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4"
                  ></td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div className="flex items-end float-end">
          <TwoSubmitButton
            options={[
              {
                label: "Save",
                style: {
                  width: "100px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                },
                callBack: () => {
                  handleSubmit();
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
export const IndentApprovePopupModal = ({
  showPopup,
  setShowPopup,
  Params,
  UserId,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [row, setRow] = useState([]);
  const viewKey = "Random";
  useEffect(() => {
    if (showPopup) {
      handleGet();
    }
  }, [showPopup]);

  const handleGet = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/Indent/GetDetail?indentId=${Params?.indentId}`
      );
      if (res?.data?.success) {
        setRow(addRandomObjectId(res?.data?.data)); // Ensure unique IDs are set
      }
    } catch (error) {
      console.error("Error rejecting indent:", error);
    }
  };

  if (!showPopup) return null;

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "quantity", headerName: "Requested Quantity", flex: 1 },
    // { field: "roleName", headerName: "Role Name", flex: 1 },
    { field: "createdBy", headerName: "Created By", flex: 1 },
    { field: "createdDateTime", headerName: "Created Date", flex: 1 },
    {
      field: "createdDateTime",
      headerName: "Approved Quantity",
      flex: 1,
      renderCell: (params) => {
        return (
          <ApproveInputCell
            params={params}
            initialQuantity={params?.row?.quantity}
            setRow={setRow}
          />
        );
      },
    },
  ];

  const handleSubmit = async () => {
    const payload = row.map((item) => ({
      indentId: item.indentId,
      itemid: item.itemId,
      approvedQuantity: item?.approvedQuantity,
      userid: UserId,
    }));
    try {
      const res = await axios.post(`${BASE_URL}/Indent/Approveindent`, payload);
      console.error("res ", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setShowPopup(false);
        window?.location?.reload();
      }
    } catch (error) {
      console.error("Error rejecting indent:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-96 md:w-[45rem] bg-white rounded-md">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center px-2 py-1"
        >
          <span className="text-sm font-semibold">Issue Indent</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <TableHeader title={"Indent Details"} />
        <div
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="overflow-x-auto w-full"
        >
          <table className="table-auto border-collapse w-full text-xxs text-left min-w-max">
            <thead
              style={{
                background: activeTheme?.menuColor,
                color: activeTheme?.iconColor,
              }}
            >
              <tr>
                {columns?.map((col, index) => (
                  <th
                    key={index}
                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
                    style={{
                      width: col?.width ? `${col?.width}px` : "",
                      flex: col?.flex || "",
                    }}
                  >
                    {col?.renderHeaderCell
                      ? col?.renderHeaderCell({ row: {} })
                      : col?.headerName}
                  </th>
                ))}
              </tr>
            </thead>

            {row?.length !== 0 ? (
              <tbody>
                {row?.map((row, index) => (
                  <tr
                    key={row?.[viewKey] || index} // Ensure a valid key
                    className={`cursor-pointer ${
                      isHoveredTable === row?.[viewKey]
                        ? ""
                        : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                    onMouseEnter={() => setIsHoveredTable(row?.[viewKey])}
                    onMouseLeave={() => setIsHoveredTable(null)}
                    style={{
                      background:
                        isHoveredTable === row?.[viewKey]
                          ? activeTheme?.subMenuColor
                          : "",
                    }}
                  >
                    {columns?.map((col, idx) => (
                      <td
                        key={idx}
                        className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                      >
                        {col?.renderCell
                          ? col?.renderCell({ row })
                          : row[col?.field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4"
                  ></td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div className="flex items-end float-end">
          <TwoSubmitButton
            options={[
              {
                label: "Save",
                style: {
                  width: "100px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                },
                callBack: () => {
                  handleSubmit();
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export const ReschedulePopupModal = ({
  showPopup,
  setShowPopup,
  Params,
  UserId,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();
  const [selectedDate, setSelectedDate] = useState("");
  if (!showPopup) return null;

  const handleReject = async (e) => {
    if (e) e.preventDefault(); // Prevents default form submission

    const values = getValues();
    if (!selectedDate) {
      toast.error("Reschedule Date is required");
      return;
    }
    if (!values?.RescheduleReason) {
      toast.error("Reschedule Reason is required");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/appointmentBooking/rescheduleAppointment?AppointmentId=${Params?.row?.appointmentId}&userid=${lsData?.user?.employeeId}&RescheduleDate=${selectedDate}&rescheduleReson=${values?.RescheduleReason}`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
      setShowPopup(false); // Close modal on success
    } catch (error) {
      console.error("Error rejecting indent:", error);
    }
  };
  const todayDate = getFormattedDate();
  const handleDateChange = (date) => {
    setSelectedDate(date);
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
          <span className="text-sm font-semibold">Reschedule Reason</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form autoComplete="off" ref={formRef} onSubmit={handleReject}>
          {/* Input Field */}
          <div className="p-4 pb-2 pt-2 flex flex-row gap-1 border-none">
            <DatePickerWithTime
              id="datepicker"
              name="datepicker"
              value={selectedDate}
              currentDate={todayDate}
              tillDate={new Date(2099, 11, 31)}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholder="Reschedule Date"
              label={""}
              isMandatory={true}
              editable={false}
              labelStyle={{ marginLeft: "-4px" }}
              inputStyle={{ height: "1.05rem" }}
              iconStyle={{ height: "1.05rem", borderRadius: "5px" }}
              calenderStyle={{
                width: "250px",
                marginLeft: "-275px",
                marginTop: "-100px",
              }}
              showTime={true}
            />
            <InputGenerator
              inputFields={[
                {
                  label: "Reschedule Reason",
                  type: "text",
                  name: "RescheduleReason",
                },
              ]}
            />
            <SubmitButton
              submit={false}
              text={"Reschedule"}
              callBack={() => {
                handleReject();
              }}
              style={{
                width: "80px",
                fontSize: "0.75rem",
                backgroundColor: "red !important",
              }}
            />
          </div>
        </form>
        {/* <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center px-2 py-2 "
        >
          {" "}
         
        </div> */}
      </div>
    </div>
  );
};

export const CancelPopupModal = ({
  showPopup,
  setShowPopup,
  Params,
  UserId,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();
  const [selectedDate, setSelectedDate] = useState("");
  if (!showPopup) return null;

  const handleReject = async (e) => {
    if (e) e.preventDefault(); // Prevents default form submission

    const values = getValues();
    if (!values?.CancelReason) {
      toast.error("Cancel Reason is required");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/appointmentBooking/CancelAppointment?AppointmentId=${Params?.row?.appointmentId}&isCancel=1&userid=${lsData?.user?.employeeId}&Reason=${values?.CancelReason}`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        window?.location?.reload();
      } else {
        toast.error(res?.data?.message);
      }
      setShowPopup(false); // Close modal on success
    } catch (error) {
      console.error("Error rejecting indent:", error);
    }
  };
  const todayDate = getFormattedDate();
  const handleDateChange = (date) => {
    setSelectedDate(date);
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
          <span className="text-sm font-semibold">Cancel Reason</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form autoComplete="off" ref={formRef} onSubmit={handleReject}>
          {/* Input Field */}
          <div className="p-4 pb-2 pt-2 flex flex-row gap-1 border-none">
            {/* <DatePickerWithTime
              id="datepicker"
              name="datepicker"
              value={selectedDate}
              currentDate={todayDate}
              onChange={handleDateChange}
              placeholder="Reschedule Date"
              label={""}
              isMandatory={true}
              editable={false}
              labelStyle={{ marginLeft: "-4px" }}
              inputStyle={{ height: "1.05rem" }}
              iconStyle={{ height: "1.05rem", borderRadius: "5px" }}
              calenderStyle={{
                width: "250px",
                marginLeft: "-275px",
                marginTop: "-100px",
              }}
              showTime={true}
            /> */}
            <InputGenerator
              inputFields={[
                {
                  label: "Cancel Reason",
                  type: "text",
                  name: "CancelReason",
                },
              ]}
            />
            <SubmitButton
              submit={false}
              text={"Save"}
              callBack={() => {
                handleReject();
              }}
              style={{
                width: "80px",
                fontSize: "0.75rem",
                backgroundColor: "red !important",
              }}
            />
          </div>
        </form>
        {/* <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center px-2 py-2 "
        >
          {" "}
         
        </div> */}
      </div>
    </div>
  );
};
