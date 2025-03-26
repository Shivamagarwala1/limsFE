import { useEffect, useState } from "react";
import { FaRegEdit, FaSpinner } from "react-icons/fa";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import InputGenerator, {
  ButtonWithImage,
  SubmitButton,
  TwoSubmitButton,
} from "./InputGenerator";
import DynamicTable, { TableHeader } from "./DynamicTable";
import { PopupTable } from "./PopupTable";
import { Clipboard, getLocal } from "usehoks";
import { useFormHandler } from "./useFormHandler";
import { MdDelete } from "react-icons/md";
import { NewPopupTable } from "./NewPopupTable";
import { useGetData, usePostData } from "../service/apiService";
import FileUpload from "./FileUpload";
import { ViewOrDownloandPDF } from "../service/RedendentData";
import toast from "react-hot-toast";
import { PopupFooter } from "./NewPopups";

const PopupModal = ({
  showPopup,
  setShowPopup,
  handleTheUpdateStatusMenu,
  isButtonClick,
  message = "Are you sure you want to update?",
  cancel = "Cancel",
  confirmText = "Yes",
  spinnerColor = "text-textColor",
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  if (!showPopup) return null;

  return (
    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
      <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50">
        <div className="flex mt-3 items-center">
          <IoAlertCircleOutline
            className="w-8 h-8"
            style={{ color: activeTheme?.menuColor }}
          />
        </div>

        <div className="text-xxxs font-semibold text-textColor/50">
          {message}
        </div>

        <div className="flex items-end gap-5 my-5">
          <div>
            <button
              className="border-[1px] w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
              style={{
                borderImageSource: activeTheme?.menuColor,
                borderImageSlice: 1,
              }}
              onClick={() => setShowPopup(false)}
            >
              {cancel}
            </button>
          </div>

          <div
            className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
            onClick={handleTheUpdateStatusMenu}
          >
            <div>
              {isButtonClick === 3 ? (
                <FaSpinner className="w-full h-full animate-spin text-textColor" />
              ) : (
                `${confirmText}`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;

export const RemarkPopupModal = ({
  showPopup,
  setShowPopup,
  handleTheUpdateStatusMenu,
}) => {
  const [remark, setRemark] = useState("");
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-96  bg-white rounded-md ">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center p-3 h-6 "
        >
          <span className="text-sm font-semibold">Remakrs</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <div className="p-3 pb-2 border-none">
          <InputGenerator
            inputFields={[
              {
                label: "Remark",
                type: "text",
                name: "remark",
                onChange: (data) => {
                  setRemark(data);
                },
              },
            ]}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 p-3 pt-0 ">
          <button
            onClick={() => {
              if (remark !== "") {
                handleTheUpdateStatusMenu(remark);
              } else {
                toast.error("Remark is Needed");
              }
            }}
            className="px-4 py-1 bg-blue-600 text-white rounded"
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
          >
            Add
          </button>
        </div>
        <PopupFooter />
      </div>
    </div>
  );
};

export const HourPopupModal = ({
  showPopup,
  setShowPopup,
  handleSubmit,
  handleTheUpdateStatusMenu,
  rowData,
}) => {
  const [remark, setRemark] = useState("");
  const [time, setTime] = useState(true);
  const [timeUnit, setTimeUnit] = useState("Hour"); // Default value for dropdown
  const [hold, setHold] = useState(rowData?.hold === 1 ? "0" : "1"); // State for hold
  const [title, setTitle] = useState(
    hold === "1" ? "Hold Reason" : "Un-Hold Reason"
  ); // State for title
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-[350px] bg-white rounded-md shadow-lg">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex justify-between items-center p-1 border-b"
        >
          <span className="text-base font-semibold">Unlock</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <div className="p-4 pb-2">
          <InputGenerator
            inputFields={[
              {
                label: "Remark",
                type: "text",
                name: "Remark",
                onChange: (data) => {
                  setRemark(data);
                },
              },
            ]}
          />
          {/* <InputGenerator inputFields={[{label:"",type:"select",name:"time-format",dataOptions:[{id:1,mode:"Hour"},{id:2,mode:"Day"}]}]} /> */}
          <div className="flex items-center gap-[0.25rem] mt-1">
            <div className="relative flex-1">
              <select
                // style={{ fontSize: "0.7rem", fontWeight: "500" }}
                name={"timeFormat"}
                className={`inputPeerField peer ${
                  false ? "border-b-red-500" : "border-borderColor"
                } focus:outline-none`}
              >
                <option value={""} hidden>
                  Select Option
                </option>
                <option value={1}>Hour</option>
                <option value={2}>Day</option>
              </select>
              <label htmlFor="Time Format" className="menuPeerLevel">
                Time Format
              </label>
            </div>
            {/* <br /> */}
            <div className="relative flex-1">
              <input
                // type={showPass ? "text" : "password"}
                id="confirmPass"
                name="confirmPass"
                // value={confirmPass}
                // onChange={(e) => setConfirmPass(e.target.value)}
                placeholder=" "
                className={`inputPeerField peer ${
                  false ? "border-b-red-500" : "border-borderColor"
                }  focus:outline-none`}
              />
              <label htmlFor="Time" className="menuPeerLevel">
                Time
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 p-3 pt-0 ">
          <button
            onClick={() => {
              handleTheUpdateStatusMenu();
              setShowPopup(false);
              handleSubmit(remark, timeUnit);
            }}
            className="px-4 py-1 rounded"
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
          >
            Add
          </button>
        </div>
        <PopupFooter />
      </div>
    </div>
  );
};

export const RemarkPopupModal1 = ({
  showPopup,
  setShowPopup,
  handleTheUpdateStatusMenu,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  return (
    <>
      {showPopup && (
        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
          <div className="w-96 h-auto z-50 shadow-2xl bg-white rounded-lg    animate-slideDown pb-3">
            <div
              className="border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md"
              style={{
                borderImage: activeTheme?.menuColor,
                background: activeTheme?.menuColor,
              }}
            >
              <div
                className=" font-semibold"
                style={{ color: activeTheme?.iconColor }}
              >
                Create Observation
              </div>

              <IoMdCloseCircleOutline
                className="text-xl cursor-pointer"
                style={{ color: activeTheme?.iconColor }}
                onClick={() => setShowPopup(false)}
              />
            </div>

            <form
              // onSubmit={onSumitUserChangePassword}
              autoComplete="off"
            >
              <div className="mx-1 mt-2 grid grid-cols-1 gap-2">
                {/* labObservationName */}
                <div className="relative flex-1 ">
                  <input
                    type="text"
                    id="labObservationName"
                    name="labObservationName"
                    // onChange={handelChangeOnNewObseravationData}
                    placeholder=" "
                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                  />
                  <label htmlFor="labObservationName" className="menuPeerLevel">
                    Observation Name
                  </label>
                </div>
              </div>
              <div
                className="flex items-stretch justify-end text-white  rounded-md"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                  width: "100px",
                }}
              >
                <button
                  className="font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer"
                  // onClick={handelOnSaveNewMapping}
                >
                  {4 === 3 ? (
                    <FaSpinner className="text-xl animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export const AssignPopup = ({ showPopup, setShowPopup, Params }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const lsData = getLocal("imarsar_laboratory");
  const [OutSideLocation, setOutSideLocation] = useState([]);
  const [InSideLocation, setInSideLocation] = useState([]);
  const getData = useGetData();
  const postData = usePostData();

  useEffect(() => {
    FetchPhlebo();
  }, [showPopup]);

  useEffect(() => {
    if (getData?.data?.data) {
      const outSide = getData?.data?.data?.filter(
        (item) => item?.status === "OutSideLocation"
      );
      const inSide = getData?.data?.data?.filter(
        (item) => item?.status !== "OutSideLocation"
      );

      setOutSideLocation(outSide);
      setInSideLocation(inSide);
    }
  }, [getData?.data?.data]);

  const FetchPhlebo = async () => {
    await getData?.fetchData(
      `/appointmentBooking/GetPhelebo?pincode=${Params?.row?.pinCode}`
    );
  };

  if (!showPopup) return null; // Avoid unnecessary rendering

  const handleAssign = async (pheleboId) => {
    const res = await postData?.postRequest(
      `/appointmentBooking/AssignAppointment?AppointmentId=${Params?.row?.appointmentId}&pheleboid=${pheleboId}&userid=${lsData?.user?.employeeId}`
    );
    if (res?.success) {
      toast.success(res?.message);
      window?.location?.reload();
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex justify-between items-center p-1 border-b"
        >
          <span className="text-base font-semibold">Assign Phlebotomist</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Inside Location */}
        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
          style={{ background: activeTheme?.blockColor }}
        >
          <div>Phlebo From Mapped Location</div>
        </div>
        <div
          style={{ maxHeight: "100px", paddingBottom: "0.40rem" }}
          className="p-4 pt-1 overflow-y-auto"
        >
          {getData?.loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : InSideLocation.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 overflow-y-auto">
              {InSideLocation?.map((item, index) => (
                <ButtonWithImage
                  key={index}
                  text={item?.pheleboname}
                  submit={false}
                  callBack={() => {
                    handleAssign(item?.pheleboId);
                  }}
                  style={{ padding: "5px 10px", width: "100px" }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No data available.</p>
          )}
        </div>

        {/* Divider */}
        <div
          className="w-full h-[0.10rem]"
          style={{ background: activeTheme?.menuColor }}
        ></div>

        {/* Outside Location */}
        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
          style={{ background: activeTheme?.blockColor }}
        >
          <div>Phlebo From Other Location</div>
        </div>
        <div
          style={{ maxHeight: "100px", paddingBottom: "0.40rem" }}
          className="p-4 pt-1 overflow-y-auto"
        >
          {getData?.loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : OutSideLocation.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 overflow-y-auto">
              {OutSideLocation?.map((item, index) => (
                <ButtonWithImage
                  key={index}
                  text={item?.pheleboname}
                  submit={false}
                  callBack={() => {
                    handleAssign(item?.pheleboId);
                  }}
                  style={{ padding: "5px 10px", width: "100px" }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No data available.</p>
          )}
        </div>
        <PopupFooter />
      </div>
    </div>
  );
};

export const SampleCollectionPopup = ({
  showPopup,
  setShowPopup,
  rows = [],
  heading = "",
  columns = [],
  handleSubmit,
  handleTheUpdateStatusMenu,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  return (
    showPopup && (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl">
          {/* Header */}
          <div
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
              borderRadius: "5px",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            className="flex justify-between items-center p-1 border-b"
          >
            <span className="text-base font-semibold">{heading}</span>
            <IoMdCloseCircleOutline
              className="text-xl cursor-pointer"
              style={{ color: activeTheme?.iconColor }}
              onClick={() => setShowPopup(false)}
            />
          </div>
          {/* Content */}

          <div className=" p-0 pt-0 overflow-y-auto max-h-[250px] pb-1.5 flex items-end justify-end flex-col">
            <PopupTable
              rows={rows}
              // trstyle={{ height: "40px" }}
              showDetails={false}
              columns={columns}
              activeTheme={activeTheme}
            />
            <div style={{ display: "flex" }}>
              <SubmitButton
                text={"Barcode No. for All"}
                submit={false}
                callBack={() => {
                  // setSampleCollection(true);
                }}
                style={{
                  padding: "5px 10px",
                  maxWidth: "150px",
                  marginRight: "5px",
                }}
              />
              <SubmitButton
                text={"Collect Sample"}
                submit={false}
                callBack={() => {
                  // setSampleCollection(true);
                }}
                style={{
                  padding: "5px 10px",
                  width: "100px",
                  marginRight: "5px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export const AddTestPopup = ({
  showPopup,
  setShowPopup,
  rows = [],
  columns = [],
  heading = "",
  handleSubmit,
  handleTheUpdateStatusMenu,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  return (
    showPopup && (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl">
          {/* Header */}
          <div
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
              borderRadius: "5px",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            className="flex justify-between items-center p-1 border-b"
          >
            <span className="text-base font-semibold">{heading}</span>
            <IoMdCloseCircleOutline
              className="text-xl cursor-pointer"
              style={{ color: activeTheme?.iconColor }}
              onClick={() => setShowPopup(false)}
            />
          </div>
          {/* Content */}

          <div className=" p-0 pt-0 overflow-y-auto max-h-[250px] pb-1.5 flex items-end justify-end flex-col">
            <PopupTable
              rows={rows}
              // trstyle={{ height: "40px" }}
              showDetails={false}
              columns={columns}
              activeTheme={activeTheme}
            />
            <div style={{ display: "flex" }}>
              <SubmitButton
                text={"Barcode No. for All"}
                submit={false}
                callBack={() => {
                  // setSampleCollection(true);
                }}
                style={{
                  padding: "5px 10px",
                  maxWidth: "150px",
                  marginRight: "5px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export const RejectPopupModal = ({
  showPopup,
  setShowPopup,
  handleTheUpdateStatusMenu,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  if (!showPopup) return null;

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
          <span className="text-sm font-semibold">Sample Rejection Reason</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <div className="p-4 pb-2 pt-2 flex flex-row gap-1 border-none">
          <InputGenerator
            inputFields={[
              {
                label: "Rejection Reason",
                type: "select",
                name: "Rejection Reason",
                dataOptions: [],
              },
            ]}
          />
          <SubmitButton
            submit={false}
            text={"Save"}
            callBack={() => {}}
            style={{
              width: "80px",
              fontSize: "0.75rem",
              backgroundColor: "red !important",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const ResultTrackRejectPopupModal = ({
  showPopup,
  setShowPopup,
  handleTheUpdateStatusMenu,
  rowData,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues } = useFormHandler();
  const AllCenterData = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "https://imarsar.com:8084/api/sampleRejectionReason?select=id,rejectionreason&$filter=(isactive eq 1)"
    );
  }, []);

  if (!showPopup) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = getValues();
    const lsData = getLocal("imarsar_laboratory");

    const payload = {
      ...rowData,
      rejectionReason: values?.RejectionReason,
      isSampleCollected: "R",
      empId: parseInt(lsData?.user?.employeeId),
    };
    PostData?.postRequest("/tnx_BookingItem/UpdateSampleStatus", [payload]);
    console.log(values);
    if (PostData?.response?.success) {
      toast.success(PostData?.response?.message);
      setReason(null);
    } else {
      toast.error(PostData?.response?.message);
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
          <span className="text-sm font-semibold">Sample Rejection Reason</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <TableHeader title={"Rejection Reason"} />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="p-4 pb-2 pt-2 flex flex-row gap-1 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: "RejectionReason",
                  type: "select",
                  name: "Rejection Reason",
                  keyField: "rejectionReason",
                  // required: true,
                  dataOptions: AllCenterData?.data,
                },
              ]}
            />
            <SubmitButton
              submit={true}
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

export const HistoHoldUnholdPopupModal = ({
  showPopup,
  setShowPopup,
  retreveTestData,
  rowData,
  setFlag = () => {},
  Flag,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues } = useFormHandler();
  const PostData = usePostData();
  const hold = rowData?.hold === 1 ? "0" : "1";
  useEffect(() => {}, [PostData?.loading]);
  console.log(rowData);
  if (!showPopup) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = await getValues();
    const lsData = await getLocal("imarsar_laboratory");

    await PostData?.postRequest(
      `/tnx_Observations/ReportHoldUnHold?TestId=${rowData?.testId}&isHold=${hold}&holdBy=${lsData?.user?.employeeId}&holdReason=${values?.HoldReason}`
    );
    console.log(
      values?.HoldReason,
      `/tnx_Observations/ReportHoldUnHold?TestId=${rowData?.testId}&isHold=${hold}&holdBy=${lsData?.user?.employeeId}&holdReason=${values?.HoldReason}`
    );
    if (PostData?.response && PostData.response.success) {
      toast.success(PostData.response.message);
      retreveTestData(rowData?.testId);
      setFlag(!Flag);
      hide();
    } else {
      hide();
      console(PostData?.response?.message || "An error occurred.");
    }
  };
  const hide = () => {
    setShowPopup(false);
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
          <span className="text-sm font-semibold">
            {rowData?.bool ? "Hold" : "Un-Hold"}
          </span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <TableHeader title={rowData?.bool ? "Hold Reason" : "Un-Hold Reason"} />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="p-2 flex flex-row gap-1 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: `${rowData?.bool ? "Hold Reason" : "Un-Hold Reason"}`,
                  type: "text",
                  name: "HoldReason",
                  required: true,
                },
              ]}
            />
            <SubmitButton
              submit={true}
              text={"Save"}
              style={{
                width: "80px",
                fontSize: "0.75rem",
                backgroundColor: "red !important",
              }}
            />
          </div>
          <PopupFooter />
        </form>
      </div>
    </div>
  );
};

export const HistoApprovedPopupModal = ({
  showPopup,
  setShowPopup,
  retreveTestData,
  rowData,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues } = useFormHandler();
  const PostData = usePostData();
  const hold = rowData?.hold === 1 ? "0" : "1";
  useEffect(() => {}, [PostData?.loading]);

  if (!showPopup) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = await getValues();
    const lsData = await getLocal("imarsar_laboratory");

    await PostData?.postRequest(
      `/tnx_Observations/ReportHoldUnHold?TestId=${rowData?.testId}&isHold=${hold}&holdBy=${lsData?.user?.employeeId}&holdReason=${values?.HoldReason}`
    );
    console.log(values?.HoldReason);
    if (PostData?.response && PostData.response.success) {
      toast.success(PostData.response.message);
      retreveTestData(rowData?.testId);
      hide();
    } else {
      toast.error(PostData?.response?.message || "An error occurred.");
    }
  };
  const hide = () => {
    setShowPopup(false);
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
          <span className="text-sm font-semibold">
            {rowData?.bool ? "Hold" : "Un-Hold"}
          </span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <TableHeader title={rowData?.bool ? "Hold Reason" : "Un-Hold Reason"} />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="p-2 flex flex-row gap-1 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: `${rowData?.bool ? "Hold Reason" : "Un-Hold Reason"}`,
                  type: "text",
                  name: "HoldReason",
                  required: true,
                },
              ]}
            />
            <SubmitButton
              submit={true}
              text={"Save"}
              style={{
                width: "80px",
                fontSize: "0.75rem",
                backgroundColor: "red !important",
              }}
            />
          </div>
          <PopupFooter />
        </form>
      </div>
    </div>
  );
};

// export const HistoFileUploadPopupModal = ({
//   showPopup,
//   setShowPopup,
//   retreveTestData,
//   rowData,
// }) => {
//   const activeTheme = useSelector((state) => state.theme.activeTheme);
//   const [FileData, setFileData] = useState({ fileName: "" });
//   const { formRef, getValues } = useFormHandler();
//   const PostData = usePostData();
//   const AddReportPostData = usePostData();
//   const [show, setShow] = useState(false);
//   const GetData = useGetData();
//   const { copyToClipboard } = Clipboard();
//   const lsData = getLocal("imarsar_laboratory");

//   // Ensure hooks are called unconditionally
//   useEffect(() => {
//     if (showPopup) {
//       GetData.fetchData(
//         `/tnx_InvestigationAddReport?$filter=(testid eq ${rowData?.testId} and isactive eq 1)`
//       );
//     }
//   }, [showPopup, rowData?.testId, show]); // Add dependencies to useEffect

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!FileData || !FileData.fileData) {
//       toast.error("No file selected!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("Document", FileData.fileData);

//     try {
//       const response = await PostData.postRequest(
//         `/empMaster/UploadDocument`,
//         formData
//       );
//       if (response?.success) {
//         toast.success(response.message);
//         const filePath = response?.data?.filePath;
//         if (filePath) {
//           hide(filePath);
//         } else {
//           toast.error("File path missing in response.");
//         }
//         setShow(!show);
//       } else {
//         toast.error(response?.message || "An error occurred.");
//       }
//     } catch (error) {
//       toast.error("Upload failed!");
//       console.error("Upload Error:", error);
//     }
//   };

//   const hide = async (filePath) => {
//     setTimeout(() => {
//       const payloadData = {
//         testId: parseInt(rowData?.testId),
//         attachment: filePath,
//         isActive: 1,
//         id: 0,
//         createdById: parseInt(lsData?.user?.employeeId),
//         createdDateTime: new Date().toISOString(),
//       };

//       AddReportPostData.postRequest(
//         `/tnx_InvestigationAttchment/AddReport`,
//         payloadData
//       );
//       setShow(!show);
//     }, 100);
//   };
//   const columns = [
//     {
//       field: `attachment`,
//       headerName: `Path`,
//       // flex: 1,
//       width: 100,
//       renderCell: (params) => {
//         return (
//           <div
//             onClick={() => {
//               copyToClipboard(params?.row?.attachment);
//               toast.success("Path Copied");
//             }}
//             style={{ justifyContent: "flex-start" }}
//             className="flex justify-start items-start"
//           >
//             {params?.row?.attachment?.slice(0, 40)}
//           </div>
//         );
//       },
//     },
//     {
//       field: `id`,
//       headerName: `Actions`,
//       flex: 1,
//       renderCell: (params) => {
//         return (
//           <div
//             style={{ justifyContent: "flex-start" }}
//             className="flex justify-center items-center"
//           >
//             <TwoSubmitButton
//               options={[
//                 {
//                   callBack: () => {
//                     ViewOrDownloandPDF(
//                       `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.attachment}`
//                     );
//                   },
//                   submit: false,
//                   label: "View",
//                   style: { width: "50px" },
//                 },
//                 {
//                   callBack: () => {
//                     HandleDelete(params?.row);
//                   },
//                   submit: false,
//                   label: "Delete",
//                   style: { width: "50px" },
//                 },
//               ]}
//             />
//           </div>
//         );
//       },
//     },
//   ];

//   const HandleDelete = async (params) => {
//     // setShowPopup(false);
//     setTimeout(() => {
//       const payloadData = {
//         ...params,
//         isActive: 0,
//         updateById: parseInt(lsData?.user?.employeeId),
//         updateDateTime: new Date().toISOString(),
//       };

//       AddReportPostData.postRequest(
//         `/tnx_InvestigationAttchment/AddReport`,
//         payloadData
//       );
//       setShow(!show);
//     }, 100);
//   };
//   return (
//     <>
//       {showPopup && (
//         <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="w-96 bg-white rounded-md ">
//             {/* Header */}
//             <div
//               style={{
//                 background: activeTheme?.menuColor,
//                 color: activeTheme?.iconColor,
//                 borderRadius: "5px",
//                 borderBottomLeftRadius: "0px",
//                 borderBottomRightRadius: "0px",
//               }}
//               className="flex rounded-md justify-between items-center px-2 py-1 "
//             >
//               <span className="text-sm font-semibold">Add Report</span>
//               <IoMdCloseCircleOutline
//                 className="text-xl cursor-pointer"
//                 style={{ color: activeTheme?.iconColor }}
//                 onClick={() => setShowPopup(false)}
//               />
//             </div>

//             {/* Input Field */}
//             <TableHeader title={"Add Report"} />
//             <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
//               <div className="p-2 flex flex-row gap-1 border-none">
//                 <FileUpload
//                   FileData={FileData}
//                   setFileData={setFileData}
//                   accept=".pdf"
//                   inputFields={{
//                     label: "Upload PDF",
//                     Size: "10",
//                   }}
//                 />
//                 <SubmitButton
//                   submit={true}
//                   text={"Save"}
//                   style={{
//                     width: "80px",
//                     fontSize: "0.75rem",
//                     backgroundColor: "red !important",
//                   }}
//                 />
//               </div>
//             </form>
//             <DynamicTable
//               rows={GetData?.data}
//               name="Attchment Information"
//               loading={GetData?.loading}
//               tableStyle={{ marginBottom: "-25px" }}
//               columns={columns}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

export const HistoFileUploadPopupModal = ({
  showPopup,
  setShowPopup,
  retreveTestData,
  rowData,
  setFlag = () => {},
  Flag,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [FileData, setFileData] = useState({ fileName: "" });
  const { formRef, getValues } = useFormHandler();
  const PostData = usePostData();
  const AddReportPostData = usePostData();
  const [show, setShow] = useState(false);
  const GetData = useGetData();
  const { copyToClipboard } = Clipboard();
  const lsData = getLocal("imarsar_laboratory");

  // Function to toggle 'show'
  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    if (showPopup) {
      GetData.fetchData(
        `/tnx_InvestigationAddReport?$filter=(testid eq ${rowData?.testId} and isactive eq 1)`
      );
    }
  }, [showPopup, rowData?.testId, show]); // Dependency on 'show' to trigger re-fetch

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FileData || !FileData.fileData) {
      toast.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("Document", FileData.fileData);

    try {
      const response = await PostData.postRequest(
        `/empMaster/UploadDocument`,
        formData
      );
      if (response?.success) {
        toast.success(response.message);
        setFlag(!Flag);
        const filePath = response?.data?.filePath;
        if (filePath) {
          await hide(filePath);
        } else {
          toast.error("File path missing in response.");
        }
      } else {
        toast.error(response?.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Upload failed!");
      console.error("Upload Error:", error);
    }
  };

  const hide = async (filePath) => {
    setTimeout(async () => {
      const payloadData = {
        testId: parseInt(rowData?.testId),
        attachment: filePath,
        isActive: 1,
        id: 0,
        createdById: parseInt(lsData?.user?.employeeId),
        createdDateTime: new Date().toISOString(),
      };

      await AddReportPostData.postRequest(
        `/tnx_InvestigationAttchment/AddReport`,
        payloadData
      );
      toggleShow(); // Trigger re-fetch after adding report
    }, 10);
  };

  const HandleDelete = async (params) => {
    setTimeout(async () => {
      const payloadData = {
        ...params,
        isActive: 0,
        updateById: parseInt(lsData?.user?.employeeId),
        updateDateTime: new Date().toISOString(),
      };

      await AddReportPostData.postRequest(
        `/tnx_InvestigationAttchment/AddReport`,
        payloadData
      );
      toggleShow(); // Trigger re-fetch after deleting
    }, 10);
  };
  console.log(rowData);
  const Buttons = [
    {
      callBack: () => {
        ViewOrDownloandPDF(
          `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.attachment}`
        );
      },
      submit: false,
      label: "View",
      style: { width: "50px" },
    },
    {
      callBack: () => {
        HandleDelete(params?.row);
      },
      submit: false,
      label: "Delete",
      style: { width: "50px" },
    },
  ];
  const Buttons1 = [
    {
      callBack: () => {
        ViewOrDownloandPDF(
          `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.attachment}`
        );
      },
      submit: false,
      label: "View",
      style: { width: "50px" },
    },
  ];
  return (
    <>
      {showPopup && (
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
              <span className="text-sm font-semibold">Add Report</span>
              <IoMdCloseCircleOutline
                className="text-xl cursor-pointer"
                style={{ color: activeTheme?.iconColor }}
                onClick={() => setShowPopup(false)}
              />
            </div>

            {/* Input Field */}
            <TableHeader title={"Add Report"} />
            <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
              <div className="p-2 flex flex-row gap-1 border-none">
                <FileUpload
                  FileData={FileData}
                  setFileData={setFileData}
                  accept=".pdf"
                  inputFields={{
                    label: "Upload PDF",
                    Size: "10",
                  }}
                />
                <SubmitButton
                  submit={true}
                  text={"Save"}
                  disabled={rowData?.isApproved == 1 ? true : false}
                  style={{
                    width: "80px",
                    fontSize: "0.75rem",
                    backgroundColor: "red !important",
                  }}
                />
              </div>
            </form>
            <DynamicTable
              rows={GetData?.data}
              name="Attchment Information"
              loading={GetData?.loading}
              tableStyle={{ marginBottom: "-25px" }}
              columns={[
                {
                  field: `attachment`,
                  headerName: `Path`,
                  width: 100,
                  renderCell: (params) => (
                    <div
                      title="Copy Path"
                      onClick={() => {
                        copyToClipboard(params?.row?.attachment);
                        toast.success("Path Copied");
                      }}
                      className="flex justify-start items-start"
                    >
                      {params?.row?.attachment?.slice(0, 40)}
                    </div>
                  ),
                },
                {
                  field: `id`,
                  headerName: `Actions`,
                  flex: 1,
                  renderCell: (params) => (
                    <div className="flex justify-center items-center">
                      <TwoSubmitButton
                        options={rowData?.isApproved == 1 ? Buttons1 : Buttons}
                      />
                    </div>
                  ),
                },
              ]}
            />
          <PopupFooter />
          </div>
        </div>
      )}
    </>
  );
};

export const HistoAddAttachmentPopupModal = ({
  showPopup,
  setShowPopup,
  retreveTestData,
  rowData,
  setFlag = () => {},
  Flag,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [FileData, setFileData] = useState({ fileName: "" });
  const { formRef, getValues } = useFormHandler();
  const [apiTrigger, setApiTrigger] = useState(false); // New state to track API calls
  const PostData = usePostData();
  const GetData = useGetData();
  const AddReportPostData = usePostData();
  const { copyToClipboard } = Clipboard();
  const lsData = getLocal("imarsar_laboratory");

  // Fetch Data Whenever 'showPopup' or 'apiTrigger' changes
  useEffect(() => {
    if (showPopup) {
      GetData.fetchData(
        `/tnx_InvestigationAttchment?$filter=(testid eq ${rowData?.testId} and isactive eq 1)`
      );
    }
  }, [showPopup, rowData?.testId, apiTrigger]); // Re-run when apiTrigger changes

  if (!showPopup) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FileData || !FileData.fileData) {
      toast.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("Document", FileData.fileData);

    try {
      const response = await PostData.postRequest(
        `/empMaster/UploadDocument`,
        formData
      );

      if (response?.success) {
        setFlag(!Flag);
        toast.success(response.message);
        const filePath = response?.data?.filePath;
        if (filePath) {
          await hide(filePath);
        } else {
          toast.error("File path missing in response.");
        }
      } else {
        toast.error(response?.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Upload failed!");
      console.error("Upload Error:", error);
    }
  };

  const hide = async (filePath) => {
    console.log(rowData);
    setTimeout(async () => {
      const payloadData = {
        testId: parseInt(rowData?.testId),
        attachment: filePath,
        isActive: 1,
        id: 0,
        createdById: parseInt(lsData?.user?.employeeId),
        createdDateTime: new Date().toISOString(),
      };

      await AddReportPostData.postRequest(
        `/tnx_InvestigationAttchment/AddAttchment`,
        payloadData
      );
      setApiTrigger((prev) => !prev); // Trigger API refresh
    }, 10);
  };
  const HandleDelete = async (params) => {
    setTimeout(async () => {
      const payloadData = {
        ...params,
        isActive: 0,
        updateById: parseInt(lsData?.user?.employeeId),
        updateDateTime: new Date().toISOString(),
      };

      await AddReportPostData.postRequest(
        `/tnx_InvestigationAttchment/AddAttchment`,
        payloadData
      );
      setApiTrigger((prev) => !prev); // Trigger API refresh
    }, 10);
  };

  const getButtons = (params) => [
    {
      callBack: () => {
        ViewOrDownloandPDF(
          `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.attachment}`
        );
      },
      submit: false,
      label: "View",
      style: { width: "50px" },
    },
    {
      callBack: () => {
        HandleDelete(params?.row);
      },
      submit: false,
      label: "Delete",
      style: { width: "50px" },
    },
  ];

  const getButtons1 = (params) => [
    {
      callBack: () => {
        ViewOrDownloandPDF(
          `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.attachment}`
        );
      },
      submit: false,
      label: "View",
      style: { width: "50px" },
    },
  ];

  const columns = [
    {
      field: `attachment`,
      headerName: `Path`,
      width: 100,
      renderCell: (params) => (
        <div
          onClick={() => {
            copyToClipboard(params?.row?.attachment);
            toast.success("Path Copied");
          }}
          className="flex justify-start items-start"
        >
          {params?.row?.attachment?.slice(0, 40)}
        </div>
      ),
    },
    {
      field: `id`,
      headerName: `Actions`,
      flex: 1,
      renderCell: (params) => (
        <div className="flex justify-center items-center">
          <TwoSubmitButton
            options={
              params?.row?.isApproved ? getButtons1(params) : getButtons(params)
            }
          />
        </div>
      ),
    },
  ];

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
          <span className="text-sm font-semibold">Add Attachment</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <TableHeader title={"Add Attachment"} />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
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
              submit={true}
              text={"Save"}
              disabled={rowData?.isApproved == 1 ? true : false}
              style={{
                width: "80px",
                fontSize: "0.75rem",
                backgroundColor: "red !important",
              }}
            />
          </div>
        </form>
        <DynamicTable
          rows={GetData?.data}
          name="Attachment Information"
          loading={GetData?.loading}
          tableStyle={{ marginBottom: "-25px" }}
          columns={columns}
        />
          <PopupFooter />
      </div>
    </div>
  );
};

// export const HistoAddAttachmentPopupModal = ({
//   showPopup,
//   setShowPopup,
//   retreveTestData,
//   rowData,
// }) => {
//   const activeTheme = useSelector((state) => state.theme.activeTheme);
//   const [FileData, setFileData] = useState({ fileName: "" });
//   const { formRef, getValues } = useFormHandler();
//   const [show, setShow] = useState(false);
//   const PostData = usePostData();
//   const GetData = useGetData();
//   const AddReportPostData = usePostData();
//   const { copyToClipboard } = Clipboard();
//   const lsData = getLocal("imarsar_laboratory");

//   // Function to toggle 'show'
//   const toggleShow = () => {
//     setShow((prev) => !prev);
//   };
//   // Ensure hooks are called unconditionally
//   useEffect(() => {
//     if (showPopup) {
//       GetData.fetchData(
//         `/tnx_InvestigationAttchment?$filter=(testid eq ${rowData?.testId} and isactive eq 1)`
//       );
//     }
//   }, [showPopup, rowData?.testId, show]); // Add dependencies to useEffect

//   if (!showPopup) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!FileData || !FileData.fileData) {
//       toast.error("No file selected!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("Document", FileData.fileData);

//     try {
//       const response = await PostData.postRequest(
//         `/empMaster/UploadDocument`,
//         formData
//       );

//       if (response?.success) {
//         toast.success(response.message);
//         const filePath = response?.data?.filePath;
//         if (filePath) {
//          await hide(filePath);
//         } else {
//           toast.error("File path missing in response.");
//         }
//       } else {
//         toast.error(response?.message || "An error occurred.");
//       }
//     } catch (error) {
//       toast.error("Upload failed!");
//       console.error("Upload Error:", error);
//     }
//   };

//   const hide = async (filePath) => {
//     // setShowPopup(false);
//     console.log(rowData);
//     setTimeout(() => {
//       const payloadData = {
//         testId: parseInt(rowData?.testId),
//         attachment: filePath,
//         isActive: 1,
//         id: 0,
//         createdById: parseInt(lsData?.user?.employeeId),
//         createdDateTime: new Date().toISOString(),
//       };

//       AddReportPostData.postRequest(
//         `/tnx_InvestigationAttchment/AddAttchment`,
//         payloadData
//       );
//       toggleShow();
//     }, 10);
//   };

//   const HandleDelete = async (params) => {
//     // setShowPopup(false);
//     setTimeout(() => {
//       const payloadData = {
//         ...params,
//         isActive: 0,
//         updateById: parseInt(lsData?.user?.employeeId),
//         updateDateTime: new Date().toISOString(),
//       };

//       AddReportPostData.postRequest(
//         `/tnx_InvestigationAttchment/AddAttchment`,
//         payloadData
//       );
//       toggleShow();
//     }, 10);
//   };
//   const columns = [
//     {
//       field: `attachment`,
//       headerName: `Path`,
//       // flex: 1,
//       width: 100,
//       renderCell: (params) => {
//         return (
//           <div
//             onClick={() => {
//               copyToClipboard(params?.row?.attachment);
//               toast.success("Path Copied");
//             }}
//             style={{ justifyContent: "flex-start" }}
//             className="flex justify-start items-start"
//           >
//             {params?.row?.attachment?.slice(0, 40)}
//           </div>
//         );
//       },
//     },
//     {
//       field: `id`,
//       headerName: `Actions`,
//       flex: 1,
//       renderCell: (params) => {
//         return (
//           <div
//             style={{ justifyContent: "flex-start" }}
//             className="flex justify-center items-center"
//           >
//             <TwoSubmitButton
//               options={[
//                 {
//                   callBack: () => {
//                     ViewOrDownloandPDF(
//                       `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${params?.row?.attachment}`
//                     );
//                   },
//                   submit: false,
//                   label: "View",
//                   style: { width: "50px" },
//                 },
//                 {
//                   callBack: () => {
//                     HandleDelete(params?.row);
//                   },
//                   submit: false,
//                   label: "Delete",
//                   style: { width: "50px" },
//                 },
//               ]}
//             />
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
//       <div className="w-96 bg-white rounded-md ">
//         {/* Header */}
//         <div
//           style={{
//             background: activeTheme?.menuColor,
//             color: activeTheme?.iconColor,
//             borderRadius: "5px",
//             borderBottomLeftRadius: "0px",
//             borderBottomRightRadius: "0px",
//           }}
//           className="flex rounded-md justify-between items-center px-2 py-1 "
//         >
//           <span className="text-sm font-semibold">Add Attachment</span>
//           <IoMdCloseCircleOutline
//             className="text-xl cursor-pointer"
//             style={{ color: activeTheme?.iconColor }}
//             onClick={() => setShowPopup(false)}
//           />
//         </div>

//         {/* Input Field */}
//         <TableHeader title={"Add Attachment"} />
//         <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
//           <div className="p-2 flex flex-row gap-1 border-none">
//             <FileUpload
//               FileData={FileData}
//               setFileData={setFileData}
//               accept=".pdf"
//               inputFields={{
//                 label: "Upload",
//                 Size: "10",
//               }}
//             />
//             <SubmitButton
//               submit={true}
//               text={"Save"}
//               style={{
//                 width: "80px",
//                 fontSize: "0.75rem",
//                 backgroundColor: "red !important",
//               }}
//             />
//           </div>
//         </form>
//         <DynamicTable
//           rows={GetData?.data}
//           name="Attchment Information"
//           loading={GetData?.loading}
//           tableStyle={{ marginBottom: "-25px" }}
//           columns={columns}
//         />
//       </div>
//     </div>
//   );
// };

export const SampleCollectionRejectPopupModal = ({
  showPopup,
  setShowPopup,
  handleTheUpdateStatusMenu,
  rowData,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues } = useFormHandler();
  const AllCenterData = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "https://imarsar.com:8084/api/sampleRejectionReason?select=id,rejectionreason&$filter=(isactive eq 1)"
    );
  }, []);

  if (!showPopup) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = getValues();
    const lsData = getLocal("imarsar_laboratory");
    console.log(values);
    const payload = {
      ...rowData,
      rejectionReason: values?.RejectionReason,
      isSampleCollected: "R",
      empId: parseInt(lsData?.user?.employeeId),
    };
    PostData?.postRequest("/tnx_BookingItem/UpdateSampleStatus", [payload]);
    console.log(values);
    if (PostData?.response?.success) {
      toast.success(PostData?.response?.message);
      // alert(values?.RejectionReason)
      setReason(null);
    } else {
      toast.error(PostData?.response?.message);
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
          <span className="text-sm font-semibold">Sample Rejection Reason</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <TableHeader title={"Rejection Reason"} />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="p-4 pb-2 pt-2 flex flex-row gap-1 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: "RejectionReason",
                  type: "select",
                  name: "RejectionReason",
                  keyField: "rejectionReason",
                  required: true,
                  dataOptions: AllCenterData?.data,
                },
              ]}
            />
            <SubmitButton
              submit={true}
              text={"Save"}
              style={{
                width: "80px",
                fontSize: "0.75rem",
                backgroundColor: "red !important",
              }}
            />
          </div>
          <PopupFooter />
        </form>
      </div>
    </div>
  );
};

export const InvestigationRemarkPopupModal = ({
  showPopup,
  setShowPopup,
  handleTheUpdateStatusMenu,
}) => {
  const [rows, setRows] = useState([]); // Proper state name
  const { formRef, getValues, setValues } = useFormHandler();
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const storedTestName = localStorage.getItem("testName");
  let testName = storedTestName;

  if (testName && typeof testName === "string") {
    testName = testName.replace(/"/g, "");
  }

  // console.log(testName);
  if (!showPopup) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = getValues();
    console.log("Form values:", values);
    setRows((prevRows) => [
      ...prevRows,
      {
        ...values,
        id: prevRows.length + 1,
        RemarkDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      },
    ]); // Update to append new values to the existing rows with id and RemarkDate
  };
  console.log(rows);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `testname`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `Remark`,
      headerName: `Remark`,
      flex: 1,

      renderCell: (params) => {
        return <div style={{ display: "flex", gap: "20px" }}>Wrong Sample</div>;
      },
    },
    {
      field: `RemarkDate`,
      headerName: `Remark Date`,
      flex: 1,
    },
    {
      field: `AddedBy`,
      headerName: `Added By`,
      flex: 1,
      renderCell: (params) => {
        const user = getLocal("imarsar_laboratory");
        console.log(user?.user);
        return (
          <div style={{ display: "flex", gap: "20px" }}>{user?.user?.name}</div>
        );
      },
    },
    {
      field: `InHouse`,
      headerName: `In-House`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            {params?.row?.inHouse === "on" ? "Yes" : "No"}
          </div>
        );
      },
    },
    {
      field: ``,
      headerName: `Action`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="w-4 h-4 flex justify-center items-center">
              <FaRegEdit />
            </button>
            <button className="w-4 h-4 flex justify-center items-center">
              <MdDelete />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-120 bg-white rounded-md ">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center py-1 px-2 "
        >
          <span className="text-sm font-semibold">Test Remark</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="p-2 pb-0  flex gap-2 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: "Test Name",
                  type: "text",
                  name: "testname",
                  readOnly: true,
                  value: `${testName}`,
                },
                {
                  label: "Rejection Reason",
                  type: "select",
                  name: "Rejection Reason",
                  dataOptions: [{ id: 1, reason: "Wrong Sample" }],
                },
                {
                  label: "Show In-House",
                  type: "select",
                  required: true,
                  name: "Show In-House",
                  dataOptions: [
                    { id: 1, key: "Yes" },
                    { id: 2, key: "No" },
                  ],
                },
              ]}
            />
            <SubmitButton
              text={"Save"}
              style={{ padding: "5px 10px", width: "100px" }}
            />
            {/* <div className="flex items-center gap-1"><input type="checkbox" /> Show In House</div>  */}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end mr-2 mb-2">
            {/* <SubmitButton
              text={"Save"}
              style={{ padding: "5px 10px", width: "100px" }}
            /> */}
          </div>
        </form>
        <DynamicTable name="Test Details" rows={rows} columns={columns} />
        <PopupFooter />
      </div>
    </div>
  );
};

export const SampleCollectionRemarkPopupModal = ({
  showPopup,
  setShowPopup,
  rowData,
  handleTheUpdateStatusMenu,
}) => {
  const { formRef, getValues, setValues } = useFormHandler();
  const [refreshData, setRefreshData] = useState(false); // New state to trigger re-fetch
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const GetRemark = useGetData();
  const Remark = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    Remark?.fetchData(
      "/LabRemarkMaster?select=id,remark&$filter=(isactive eq 1 and type eq 'LabRemark')"
    );
    GetRemark?.fetchData(
      `/tnx_InvestigationRemarks/GetSampleremark?transacctionId=${rowData?.transactionId}&WorkOrderId=${rowData?.workOrderId}&itemId=${rowData?.itemId}`
    );
  }, [showPopup, refreshData]);

  if (!showPopup) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = getValues();
    const lsData = getLocal("imarsar_laboratory");
    const payload = {
      itemName: rowData?.investigationName,
      isActive: 0,
      id: 0,
      itemId: rowData?.itemId,
      workOrderId: rowData?.workOrderId,
      transactionId: rowData?.transactionId,
      invRemarks: values?.invRemarks,
      isInternal: parseInt(values?.isInternal),
      remark: values?.invRemarks,
      createdById: parseInt(lsData?.user?.employeeId),
      createdDateTime: new Date().toISOString(),
    };
    console.log("Form values:", values);
    PostData?.postRequest("/tnx_InvestigationRemarks/AddSampleremark", [
      payload,
    ]);
    if (PostData?.response?.success) {
      toast.success(PostData?.response?.message);
      setRefreshData((prev) => !prev); // Trigger re-fetching of data
    } else {
      toast.error(PostData?.response?.message);
    }
  };

  console.log(GetRemark);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `invRemarks`,
      headerName: `Remark`,
      flex: 1,
    },
    {
      field: `isInternal`,
      headerName: `In-House`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            {params?.row?.isInternal == 0 ? "In-House" : "In-Out Both"}
          </div>
        );
      },
    },
  ];

  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-120 bg-white rounded-md ">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center py-1 px-2 "
        >
          <span className="text-sm font-semibold">Test Remark</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="p-2 pb-2  flex gap-2 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: "Test Name",
                  type: "text",
                  name: "testname",
                  readOnly: true,
                  value: `${rowData?.investigationName}`,
                },
                {
                  label: "Remark",
                  type: "select",
                  name: "invRemarks",
                  keyField: "remark",
                  dataOptions: Remark?.data,
                },
                {
                  label: "In-House",
                  type: "select",
                  name: "isInternal",
                  keyField: "id",
                  dataOptions: [
                    { id: 0, data: "Yes" },
                    { id: 1, data: "No" },
                  ],
                },
              ]}
            />
            <SubmitButton
              text={"Save"}
              style={{ padding: "5px 10px", width: "100px" }}
            />
          </div>
        </form>
        <DynamicTable
          name="Test Details"
          rows={GetRemark?.data?.data}
          columns={columns}
        />
          <PopupFooter />
      </div>
    </div>
  );
};

export const ResultTrackRemarkPopupModal = ({
  showPopup,
  setShowPopup,
  rowData,
  handleTheUpdateStatusMenu,
}) => {
  const { formRef, getValues, setValues } = useFormHandler();
  const [refreshData, setRefreshData] = useState(false); // New state to trigger re-fetch
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const GetRemark = useGetData();
  const Remark = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    Remark?.fetchData(
      "/LabRemarkMaster?select=id,remark&$filter=(isactive eq 1 and type eq 'LabRemark')"
    );
    GetRemark?.fetchData(
      `/tnx_InvestigationRemarks/GetSampleremark?transacctionId=${rowData?.transactionId}&WorkOrderId=${rowData?.workOrderId}&itemId=${rowData?.itemId}`
    );
  }, [showPopup, refreshData]);

  if (!showPopup) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = await getValues();
    const lsData = await getLocal("imarsar_laboratory");
    const payload = {
      itemName: rowData?.investigationName,
      isActive: 1,
      id: 0,
      itemId: rowData?.itemId,
      workOrderId: rowData?.workOrderId,
      transactionId: rowData?.transactionId,
      invRemarks: values?.invRemarks,
      isInternal: parseInt(values?.isInternal),
      remark: values?.invRemarks,
      createdById: parseInt(lsData?.user?.employeeId),
    };
    console.log("Form values:", values);
    const response = await PostData?.postRequest(
      "/tnx_InvestigationRemarks/AddSampleremark",
      payload
    );
    if (response?.success) {
      toast.success(response?.message);
      setRefreshData((prev) => !prev);
    } else {
      toast.error(response?.message);
    }
  };

  console.log(GetRemark);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `invRemarks`,
      headerName: `Remark`,
      flex: 1,
    },
    {
      field: `isInternal`,
      headerName: `In-House`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            {params?.row?.isInternal == 0 ? "In-House" : "In-Out Both"}
          </div>
        );
      },
    },
  ];

  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-120 bg-white rounded-md ">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center py-1 px-2 "
        >
          <span className="text-sm font-semibold">Test Remark</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="p-2 pb-2  flex gap-2 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: "Test Name",
                  type: "text",
                  name: "testname",
                  readOnly: true,
                  value: `${rowData?.investigationName}`,
                },
                {
                  label: "Remark",
                  type: "select",
                  name: "invRemarks",
                  keyField: "remark",
                  dataOptions: Remark?.data,
                },
                {
                  label: "In-House",
                  type: "select",
                  name: "isInternal",
                  keyField: "id",
                  dataOptions: [
                    { id: 0, data: "Yes" },
                    { id: 1, data: "No" },
                  ],
                },
              ]}
            />
            <SubmitButton
              text={"Save"}
              style={{ padding: "5px 10px", width: "100px" }}
            />
          </div>
        </form>
        <DynamicTable
          name="Test Details"
          rows={GetRemark?.data?.data}
          columns={columns}
        />
          <PopupFooter />
      </div>
    </div>
  );
};

export const HistoResultTrackRemarkPopupModal = ({
  showPopup,
  setShowPopup,
  rowData,
  setFlag = () => {},
  Flag,
  handleTheUpdateStatusMenu,
}) => {
  const { formRef, getValues, setValues } = useFormHandler();
  const [refreshData, setRefreshData] = useState(false); // New state to trigger re-fetch
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const GetRemark = useGetData();
  const Remark = useGetData();
  const PostData = usePostData();
  useEffect(() => {
    Remark?.fetchData(
      "/LabRemarkMaster?select=id,remark&$filter=(isactive eq 1 and type eq 'LabRemark')"
    );
    GetRemark?.fetchData(
      `/tnx_InvestigationRemarks/GetSampleremark?transacctionId=${rowData?.transactionId}&WorkOrderId=${rowData?.workOrderId}&itemId=${rowData?.itemId}`
    );
  }, [showPopup, refreshData]);

  if (!showPopup) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = await getValues();
    const lsData = await getLocal("imarsar_laboratory");
    const payload = {
      itemName: rowData?.investigationName,
      isActive: 1,
      id: 0,
      itemId: rowData?.itemId,
      workOrderId: rowData?.workOrderId,
      transactionId: rowData?.transactionId,
      invRemarks: values?.invRemarks,
      isInternal: parseInt(values?.isInternal),
      remark: values?.invRemarks,
      createdById: parseInt(lsData?.user?.employeeId),
    };
    console.log("Form values:", values);
    const response = await PostData?.postRequest(
      "/tnx_InvestigationRemarks/AddSampleremark",
      [payload]
    );
    if (response?.success) {
      toast.success(response?.message);
      setRefreshData((prev) => !prev);
      setFlag(!Flag);
    } else {
      toast.error(response?.message);
    }
  };

  console.log(GetRemark);
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `invRemarks`,
      headerName: `Remark`,
      flex: 1,
    },
    {
      field: `isInternal`,
      headerName: `In-House`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            {params?.row?.isInternal == 0 ? "In-House" : "In-Out Both"}
          </div>
        );
      },
    },
  ];

  return (
    <div className="fixed inset-0 flex rounded-md justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-120 bg-white rounded-md ">
        {/* Header */}
        <div
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
            borderRadius: "5px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="flex rounded-md justify-between items-center py-1 px-2 "
        >
          <span className="text-sm font-semibold">Test Remark</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="p-2 pb-2  flex gap-2 border-none">
            <InputGenerator
              inputFields={[
                {
                  label: "Test Name",
                  type: "text",
                  name: "testname",
                  readOnly: true,
                  value: `${rowData?.investigationName}`,
                },
                {
                  label: "Remark",
                  type: "select",
                  name: "invRemarks",
                  keyField: "remark",
                  dataOptions: Remark?.data,
                },
                {
                  label: "In-House",
                  type: "select",
                  name: "isInternal",
                  keyField: "id",
                  dataOptions: [
                    { id: 0, data: "Yes" },
                    { id: 1, data: "No" },
                  ],
                },
              ]}
            />
            <SubmitButton
              text={"Save"}
              style={{ padding: "5px 10px", width: "100px" }}
            />
          </div>
        </form>
        <DynamicTable
          name="Test Details"
          rows={GetRemark?.data?.data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export const InfoPopup = ({
  showPopup,
  setShowPopup,
  rows = [],
  columns = [],
  heading = "",
  handleSubmit,
  handleTheUpdateStatusMenu,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  return (
    showPopup && (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl">
          {/* Header */}
          <div
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
              borderRadius: "5px",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            className="flex justify-between items-center px-2 py-1 border-b"
          >
            <span className="text-base font-semibold">{heading}</span>
            <IoMdCloseCircleOutline
              className="text-xl cursor-pointer"
              style={{ color: activeTheme?.iconColor }}
              onClick={() => setShowPopup(false)}
            />
          </div>
          {/* Content */}

          <div className=" p-0 pt-0 overflow-y-auto max-h-[250px] pb-1.5 flex items-end justify-end flex-col">
            <TableHeader title="Patient Details" />
            <NewPopupTable
              rows={rows}
              // trstyle={{ height: "40px" }}
              showDetails={false}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div>
        </div>
      </div>
    )
  );
};

export const ReRunPopup = ({
  showPopup,
  setShowPopup,
  rows = [],
  columns = [],
  heading = "",
  handleSubmit,
  handleTheUpdateStatusMenu,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  return (
    showPopup && (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl">
          {/* Header */}
          <div
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
              borderRadius: "5px",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            className="flex justify-between items-center px-2 py-1 border-b"
          >
            <span className="text-base font-semibold">{heading}</span>
            <IoMdCloseCircleOutline
              className="text-xl cursor-pointer"
              style={{ color: activeTheme?.iconColor }}
              onClick={() => setShowPopup(false)}
            />
          </div>
          {/* Content */}

          <div className=" p-0 pt-0 overflow-y-auto max-h-[250px] pb-1.5 flex items-end justify-end flex-col">
            <TableHeader title="Re-Run Remark" />
            <NewPopupTable
              rows={rows}
              // trstyle={{ height: "40px" }}
              showDetails={false}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div>
        </div>
      </div>
    )
  );
};

export const SampleCollectionCommentPopupModal = ({
  showPopup,
  setShowPopup,
  comment = "",
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  if (!showPopup) return null;

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
          <span className="text-sm font-semibold">Comment</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup()}
          />
        </div>

        {/* Input Field */}
        <TableHeader title={"Comment"} />
        <div className="p-2 flex text-wrap ">
          <span>{comment}</span>
        </div>
        <PopupFooter />
      </div>
    </div>
  );
};

export const ImagePopup = ({ imageView, setImageView, Img }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  // console.log(Img);
  return (
    <>
      {imageView && (
        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
          <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50">
            <div className="flex flex-col items-center gap-5 my-2">
              <div>
                <img src={Img} alt="" />
              </div>

              <div>
                <TwoSubmitButton
                  options={[
                    {
                      label: "Close",
                      submit: false,
                      style: { width: "60px" },
                      callBack: () => {
                        setImageView(false);
                      },
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
