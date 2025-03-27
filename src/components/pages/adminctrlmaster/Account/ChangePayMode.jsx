import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable, { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import toast from "react-hot-toast";
import { addRandomObjectId } from "../../../../service/RedendentData";

export default function ChangePayMode() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [Row, setRow] = useState([]);
  const [Visitor, setVisitor] = useState("");
  const [PaymentMode, setPaymentMode] = useState(1);
  const [className, setClassName] = useState("");
  const [ShowDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (activeTheme) {
      const style = document.createElement("style");
      style.innerHTML = `
        .gradientText {
          background: ${activeTheme.menuColor};
          -webkit-background-clip: text;
          color: transparent;
        }
      `;
      document.head.appendChild(style);
      setClassName("gradientText");
    }
  }, [activeTheme]);

  useEffect(() => {
    getReason();
    console.log(activeTab);
  }, [PaymentMode]);

  const columns = [
    // {
    //   field: "check",
    //   headerName: "",
    //   width: 20,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px" }}>
    //         <input type="checkbox" />
    //       </div>
    //     );
    //   },
    // },
    { field: "Random", headerName: "Sr. No", width: 10 },
    {
      field: `workOrderId`,
      headerName: `Visitor Id`,
      flex: 1,
    },
    {
      field: `centrename`,
      headerName: `Centre Name`,
      flex: 1,
    },
    {
      field: `title`,
      headerName: `Title`,
      flex: 1,
    },
    {
      field: `name`,
      headerName: `Payment Mode`,
      flex: 1,
    },
    {
      field: `mobileNo`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    {
      field: `age`,
      headerName: `Age`,
      flex: 1,
    },
    {
      field: `gender`,
      headerName: `Gender`,
      flex: 1,
    },
    {
      field: `mobileNo`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    // {
    //   field: "",
    //   width: 200,
    //   headerName: "Action",
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px" }}>
    //         <select
    //           name={""}
    //           className={`inputPeerField cursor-pointer ${
    //             false ? "border-b-red-500" : "border-borderColor"
    //           } peer border-borderColor focus:outline-none`}
    //         >
    //           <option value="" hidden>
    //             Select Option
    //           </option>

    //           <option value={1}>Deposit</option>
    //           <option value={2}>Debit Note</option>
    //           <option value={3}>Credit Note</option>
    //         </select>
    //       </div>
    //     );
    //   },
    // },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    setShowDetails(true);
  };

  const getReason = async () => {
    const get = await fetchData(
      `/CentrePayment/GetPatientpaymentDetail?Workorderid=${Visitor}`
    );
    console.log(get?.data?.data?.patientdetail)
    if (get?.data?.success) {
      setRow(addRandomObjectId(get?.data?.data?.patientdetail));
    }
  };

  const handleTheUpdateStatusMenu = async () => {
    const lsData = getLocal("imarsar_laboratory");
    const payload = {
      ...clickedRowId,
      updateById: lsData?.user?.employeeId,
      isActive: clickedRowId?.isActive === 1 ? 0 : 1,
    };
    // const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
    if (data1?.success) {
      toast.success("Status Updated Successfully");
      console.log(payload);
      getReason();
      setShowPopup(false);
    }
  };

  //   const InputFileds = [{ label: "", type: "" }];

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
        <div>Change PayMode</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-2  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Visitor Id",
                type: "text",
                name: "Visitor Id",
                onChange: (e) => {
                  setVisitor(e);
                },
              },
            ]}
          />

          <TwoSubmitButton
            options={[
              {
                label: "Search",
                submit: false,
                style: { marginTop: "0px" },
                callBack: () => {
                  getReason();
                },
              },
            ]}
          />
        </div>
      </form>
      {ShowDetails && (
        <>
          <div
            className="w-full h-[0.10rem]"
            style={{ background: activeTheme?.menuColor }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <div className="grid rounded-md grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <div className={`relative flex-1 `}>
                <span className={className}>
                  <b>Name</b>
                </span>
                : Mr. Dummy
              </div>
              <div className="relative flex-1">
                <span className={className}>
                  <b>Age</b>
                </span>{" "}
                : 23,male
              </div>
              {/* <div className="relative flex-1">
            {" "}
            <span className={className}>
              <b>Gender</b>
            </span>{" "}
            : 
          </div> */}

              <div className="relative flex-1">
                <span className={className}>
                  <b>Mobile No.</b>
                </span>{" "}
                : 1234567890
              </div>
              {/* <div className="relative flex-1">
            <span className={className}>
              <b>Address</b>
            </span>{" "}
            : Poket 4 Noida Uttar Pradesh
          </div> */}
            </div>
            <div className="relative flex-1">
              <span className={className}>
                <b>Booking Centre</b>
              </span>{" "}
              : Life Care Hospital & Trauma Centre
            </div>
          </div>
          <div
            className="w-full h-[0.10rem]"
            style={{ background: activeTheme?.menuColor }}
          ></div>
        </>
      )}
      <UpdatedDynamicTable
        rows={Row}
        name="Payment Mode Details"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
      />
      {/* <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Remarks",
                type: "text",
                name: "Remarks",
                required: true,
              },
            ]}
          />

          <div className="flex gap-[0.25rem]">
            <div className="relative flex-1 gap-1 flex justify-start items-center">
              <button
                type="submit"
                className={`font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
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
      </form> */}
    </div>
  );
}
