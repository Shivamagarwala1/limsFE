import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit, FaSpinner } from "react-icons/fa";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import InputGenerator, {
  ButtonWithImage,
  SubmitButton,
} from "./InputGenerator";
import DynamicTable from "./DynamicTable";
import { PopupTable } from "./PopupTable";
import { getLocal } from "usehoks";
import { useFormHandler } from "./useFormHandler";
import { MdDelete } from "react-icons/md";

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
          className="flex rounded-md justify-between items-center p-3 "
        >
          <span className="text-sm font-semibold">Remakrs</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <div className="p-4 pb-2 border-none">
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
      </div>
    </div>
  );
};

export const HourPopupModal = ({
  showPopup,
  setShowPopup,
  handleSubmit,
  handleTheUpdateStatusMenu,
}) => {
  const [remark, setRemark] = useState("");
  const [time, setTime] = useState(true);
  const [timeUnit, setTimeUnit] = useState("Hour"); // Default value for dropdown
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

export const AssignPopup = ({
  showPopup,
  setShowPopup,
  handleSubmit,
  handleTheUpdateStatusMenu,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const data = Array(6).fill({ name: "Dummy User", count: 0 }); // Example data
  const otherData = Array(3).fill({ name: "Dummy User", count: 0 }); // Example data

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
            <span className="text-base font-semibold">Assign Phlebotomist</span>
            <IoMdCloseCircleOutline
              className="text-xl cursor-pointer"
              style={{ color: activeTheme?.iconColor }}
              onClick={() => setShowPopup(false)}
            />
          </div>
          {/* Content */}
          <div
            className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
            style={{ background: activeTheme?.blockColor }}
          >
            {/* <IoMdMenu className="font-semibold text-lg" /> */}
            <div>Phlebo From Mapped Location</div>
          </div>
          <div
            style={{ maxHeight: "100px", paddingBottom: "0.40rem" }}
            className=" p-4 pt-1 overflow-y-auto"
          >
            <div className="grid grid-cols-3 gap-1 overflow-y-auto">
              {data?.map((item, index) => (
                <ButtonWithImage
                  img={""}
                  key={index}
                  text={item?.name}
                  submit={false}
                  callBack={() => {}}
                  style={{ padding: "5px 10px", width: "100px" }}
                />
              ))}
            </div>
          </div>{" "}
          <div
            className="w-full h-[0.10rem]"
            style={{ background: activeTheme?.menuColor }}
          ></div>
          <div
            className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
            style={{ background: activeTheme?.blockColor }}
          >
            <div>Phlebo From Other Location</div>
          </div>
          <div
            style={{ maxHeight: "100px", paddingBottom: "0.40rem" }}
            className=" p-4 pt-1 overflow-y-auto"
          >
            {data.length > 0 ? (
              <div className="grid grid-cols-3 gap-1 overflow-y-auto">
                {otherData?.map((item, index) => (
                  <ButtonWithImage
                    img={""}
                    key={index}
                    text={item?.name}
                    submit={false}
                    callBack={() => {}}
                    style={{ padding: "5px 10px", width: "100px" }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No data available.</p>
            )}
          </div>
        </div>
      </div>
    )
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
  const [remark, setRemark] = useState("");
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
          className="flex rounded-md justify-between items-center p-3 "
        >
          <span className="text-sm font-semibold">Sample Rejection Reason</span>
          <IoMdCloseCircleOutline
            className="text-xl cursor-pointer"
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setShowPopup(false)}
          />
        </div>

        {/* Input Field */}
        <div className="p-4 pb-2 border-none">
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
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 p-3 pt-0 ">
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded"
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
          >
            Save
          </button>
        </div>
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

  if (testName && typeof testName === 'string') {
    testName = testName.replace(/"/g, "");
  }

  console.log(testName);
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
      </div>
    </div>
  );
};
