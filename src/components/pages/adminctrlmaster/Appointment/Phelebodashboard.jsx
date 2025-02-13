import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Phelebodashboard.css";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  UserGroupIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
// import {
//   UserGroupIcon,
//   LockClosedIcon,
//   ClockIcon,
// } from "@heroicons/react/24/solid";
import { getLocal } from "usehoks";
import toast from "react-hot-toast";

export default function Phelebodashboard() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [ColumnTab, setColumnTab] = useState({
    field: "discountReasonName",
    header: "Discount Reason Name",
  });
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [FileData, setFileData] = useState({ fileName: "" });
  const [PaymentMode, setPaymentMode] = useState(1);

  useEffect(() => {
    getReason();
    console.log(activeTab);
  }, [PaymentMode]);
  console.log(FileData);
  const cardData = [
    {
      id: 1,
      title: "Assigned Patients",
      count: 0,
      bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
      icon: <UserGroupIcon className="h-12 w-12 text-white" />, // User Group Icon
    },
    {
      id: 2,
      title: "Pending",
      count: 0,
      bgColor: "bg-gradient-to-r from-teal-500 to-blue-600",
      icon: <LockClosedIcon className="h-12 w-12 text-white" />, // Lock Icon
    },
    {
      id: 3,
      title: "Collected",
      count: 0,
      bgColor: "bg-gradient-to-r from-violet-300 to-violet-500",
      icon: <CheckCircleIcon className="h-12 w-12 text-white" />, // Check Circle Icon
    },
    {
      id: 4,
      title: "Cancelled",
      count: 0,
      bgColor: "bg-gradient-to-r from-red-400 to-red-600",
      icon: <XCircleIcon className="h-12 w-12 text-white" />, // Cross Circle Icon
    },
    {
      id: 5,
      title: "Payment Received",
      count: 0,
      bgColor: "bg-gradient-to-r from-green-300 to-green-500",
      icon: <CurrencyDollarIcon className="h-12 w-12 text-white" />, // Dollar Icon
    },
  ];

  // const columns = [
  //   { field: "id", headerName: "Sr. No", width: 100 },
  //   {
  //     field: `client`,
  //     headerName: `Client`,
  //     flex: 1,
  //   },
  //   {
  //     field: "",
  //     width: 200,
  //     headerName: "Action",
  //     renderCell: (params) => {
  //       return (
  //         <div style={{ display: "flex", gap: "20px" }}>
  //           <button className="w-4 h-4 flex justify-center items-center">
  //             <FaRegEdit
  //               className={`w-full h-full ${
  //                 params?.row?.isActive === 1
  //                   ? "text-blue-500 cursor-pointer"
  //                   : "text-gray-400 cursor-not-allowed"
  //               }`}
  //               onClick={() => {
  //                 setClickedRowId(params?.row);
  //                 setIsButtonClick(1);
  //                 if (activeTab === 0) {
  //                   setValues([
  //                     {
  //                       // [tabs[activeTab]?.fname]:
  //                       //   params?.row?.discountReasonName,
  //                     },
  //                   ]);
  //                 }
  //               }}
  //             />
  //           </button>
  //           <button
  //             className={`w-4 h-4 flex justify-center items-center ${
  //               params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
  //             }`}
  //           >
  //             <ImSwitch
  //               className="w-full h-full"
  //               onClick={() => {
  //                 setClickedRowId(params?.row);
  //                 setShowPopup(true);
  //               }}
  //             />
  //           </button>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();

    // Check for required fields
    // const requiredFields = ["Payment Date", "Payment Mode", "Payment Type", "Advance"];

    // const missingFields = requiredFields.filter(field => !values[field]);

    // if (missingFields.length > 0) {
    //   toast(`${missingFields[0]} is required`);
    //   return;
    // }

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

  // const handleTheUpdateStatusMenu = async () => {
  const lsData = getLocal("imarsar_laboratory");
  const payload = {
    ...clickedRowId,
    updateById: lsData?.user?.employeeId,
    isActive: clickedRowId?.isActive === 1 ? 0 : 1,
  };
  // const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);

  // };

  //   const InputFileds = [{ label: "", type: "" }];

  // const handleRippleEffect = (e) => {
  //   const target = e.currentTarget;
  //   const circle = document.createElement("span");
  //   const rect = target.getBoundingClientRect();
  //   const size = Math.max(rect.width, rect.height);

  //   circle.style.width = circle.style.height = `${size}px`;
  //   circle.style.left = `${e.clientX - rect.left - size / 2}px`;
  //   circle.style.top = `${e.clientY - rect.top - size / 2}px`;
  //   circle.className =
  //     "absolute bg-white opacity-50 rounded-full pointer-events-none animate-ping";

  //   target.appendChild(circle);

  //   setTimeout(() => {
  //     circle.remove();
  //   }, 500); // Removes the ripple after animation ends
  // };
  const handleRippleEffect = (e, bgColor) => {
    const target = e.currentTarget;
    const circle = document.createElement("span");
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    // Set circle styles
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;
    circle.style.backgroundColor = bgColor;

    // Add the ripple effect styles
    circle.className = `absolute rounded-full pointer-events-none animate-ripple`;

    target.appendChild(circle);

    // Remove the circle after animation
    setTimeout(() => {
      circle.remove();
    }, 1000);
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
        <div>Phelebo Dashboard</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 mb-2 mx-2">
          {cardData.map((card) => (
            <div
              key={card.id}
              className={`relative overflow-hidden flex flex-row items-center rounded-lg shadow-md p-4 cursor-pointer ${card.bgColor}`}
              // onClick={(e) =>
              //   handleRippleEffect(e, "rgba(255, 255, 255, 0.5)")
              // }
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white">
                {React.cloneElement(card.icon, {
                  className: "h-6 w-6 text-gray-800",
                })}
              </div>
              <div className="ml-4">
                <p className="text-xl font-bold text-white">{card.count}</p>
                <p className="text-sm font-medium text-white">{card.title}</p>
              </div>
            </div>
          ))}
        </div>
      </form>
      {/* <DynamicTable
        rows={[
          { id: 1, client: "client 1" },
          { id: 2, client: "client 2" },
        ]}
        name="Phelebo"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
      /> */}
    </div>
  );
}
