import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { getLocal } from "usehoks";
import toast from "react-hot-toast";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import DynamicTable from "../../../../Custom Components/DynamicTable";

export default function ShowCommission() {
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
  const cards = [
    {
      id: 1,
      title: "Today Commission",
      amount: "Rs. 0",
      bgColor: "from-[#f0466b] to-orange-500",
    },
    {
      id: 2,
      title: "This Month",
      amount: "Rs. 0",
      bgColor: "from-green-400 to-teal-500",
    },
    {
      id: 3,
      title: "Total Commission",
      amount: "Rs. 0",
      bgColor: "from-blue-400 to-sky-500",
    },
  ];
  const columns = [
    { field: "id", headerName: "Sr. No", width: 100 },
    {
      field: `CommissinonDate`,
      headerName: `Commissinon Date`,
      flex: 1,
    },
    {
      field: `VisitorId`,
      headerName: `Visitor Date`,
      flex: 1,
    },
    {
      field: `BookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `BookingAmount`,
      headerName: `Booking Amount`,
      flex: 1,
    },

    {
      field: `Commission`,
      headerName: `Commission`,
      flex: 1,
    },
    {
      field: `BookedBy`,
      headerName: `Booked By`,
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
        <div>Show Commission</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 mb-2 mx-2"> */}
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-60 h-24 rounded-2xl p-4 bg-gradient-to-r ${card.bgColor} shadow-lg relative`}
            >
              <h3 className="text-white font-semibold text-lg">{card.title}</h3>
              <p className="text-white font-bold text-2xl mt-2">
                {card.amount}
              </p>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-white/20"></div>
              <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full bg-white/10"></div>
            </div>
          ))}
          {/* </div> */}
        </div>
        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
          style={{ background: activeTheme?.blockColor }}
        >
          <div>
            <FontAwesomeIcon icon="fa-solid fa-house" />
          </div>
          <div>Filter Commission</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 mb-2 mx-2">
          <InputGenerator
            inputFields={[
              { label: "From Date", type: "customDateField", name: "from" },
              { label: "To Date", type: "customDateField", name: "to" },
            ]}
          />
          <SubmitButton text={"Search"} />
        </div>
      </form>
      <DynamicTable
        rows={[
          { id: 1, BookedBy: "Jon Snow",Commission:"2000",BookingAmount:"5000",VisitorId:"567831",BookingDate:"10-02-25",CommissinonDate:"10-02-25", },
        ]}
        name="Commission Details"
        loading={loading}
        columns={columns}
        activeTheme={activeTheme}
      />
    </div>
  );
}
