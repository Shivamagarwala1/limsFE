import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import toast from "react-hot-toast";

export default function ChangeBillingCentre() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const formHandler = useFormHandler();
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCenter, setSelectedCenter] = useState([]);
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
    { field: "id", headerName: "Sr. No", width: 70 },
    {
      field: `Test Code`,
      headerName: `Test Code`,
      flex: 1,
    },
    {
      field: `Investigation Name`,
      headerName: `Investigation Name`,
      flex: 1,
    },
    {
      field: `Current Amount`,
      headerName: `Current Amount`,
      flex: 1,
    },
    {
      field: `New Amount`,
      headerName: `New Amount`,
      flex: 1,
    },
    // {
    //   field: "",
    //   width: 200,
    //   headerName: "Action",
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px" }}>
    //         <button className="w-4 h-4 flex justify-center items-center">
    //           <FaRegEdit
    //             className={`w-full h-full ${
    //               params?.row?.isActive === 1
    //                 ? "text-blue-500 cursor-pointer"
    //                 : "text-gray-400 cursor-not-allowed"
    //             }`}
    //             onClick={() => {
    //               setClickedRowId(params?.row);
    //               setIsButtonClick(1);
    //               if (activeTab === 0) {
    //                 setValues([
    //                   {
    //                     // [tabs[activeTab]?.fname]:
    //                     //   params?.row?.discountReasonName,
    //                   },
    //                 ]);
    //               }
    //             }}
    //           />
    //         </button>
    //         <button
    //           className={`w-4 h-4 flex justify-center items-center ${
    //             params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
    //           }`}
    //         >
    //           <ImSwitch
    //             className="w-full h-full"
    //             onClick={() => {
    //               setClickedRowId(params?.row);
    //               setShowPopup(true);
    //             }}
    //           />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const handleVisitor = (event) => {
    event.preventDefault();
    const values = formHandler?.getValues();
    if (values?.Visitor_Id === "") {
      toast("Visitor Id is required");
      return;
    }
    setShowDetails(true);
    console.log(values);
  };

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
        <div>Change Billing Centre</div>
      </div>
      <form
        // className="flex items-center justify-center"
        autoComplete="off"
        ref={formHandler?.formRef}
        onSubmit={handleVisitor}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Search Visit ID",
                type: "text",
                name: "Visitor_Id",
                required: true,
              },
            ]}
          />

          {/* <SubmitButton text={"Search"} /> */}
        </div>
      </form>
      {ShowDetails && (
       <>
        <div className="w-full h-[0.10rem]" style={{ background: activeTheme?.menuColor }}></div>
        <div style={{display:"flex",alignItems:"center",flexDirection:"row",gap:"20px"}}>
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
        <div className="w-full h-[0.10rem]" style={{ background: activeTheme?.menuColor }}></div>
        </>
      )}
      {ShowDetails && (
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            <InputGenerator
              inputFields={[
                {
                  label: "New Centre",
                  type: "select",
                  name: "NewCentre",
                },
                // {
                //   label: "To Date",
                //   type: "select",
                //   name: "ToDatfrome",
                // },
                {
                  label: "New Rate Type",
                  type: "select",
                  name: "NewRateType",
                  // dataOptions: [
                  //   { id: 1, Type: "Deposit" },
                  //   { id: 2, Type: "Credit Note" },
                  //   { id: 3, Type: "Debit Note" },
                  // ],
                },
                {
                  label: "Remarks",
                  type: "text",
                  name: "Remark",
                },
              ]}
            />

            <SubmitButton text={"Change Centre"} />
          </div>
        </form>
      )}
      <DynamicTable
        rows={[
          { id: 1, client: "client 1" },
          { id: 2, client: "client 2" },
        ]}
        name="Billing Centre Details"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
      />
    </div>
  );
}
