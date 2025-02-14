import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, { SubmitButton } from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import {AssignPopup} from '../../../../Custom Components/PopupModal'
import DynamicTable from "../../../../Custom Components/DynamicTable";

export default function AppointmentStatus() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading, error, getData } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [ColumnTab, setColumnTab] = useState({
    field: "discountReasonName",
    header: "Discount Reason Name",
  });
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);
  const [AssignedPopup, setAssignedPopup] = useState(false);
  const AllCenterData = useGetData();
  useEffect(() => {
    getReason();
    AllCenterData?.fetchData('/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)');
    // console.log(AllCenterData);
  }, [activeTab]);
  console.log(data);
  const rows = [
    { id: 1, client: "client 1" },
    { id: 2, client: "client 2" },
  ];

  const columns = [
    { field: "id", headerName: "Sr. No", width: 30 },
    {
      field: `centre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `bookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `appointmentDate`,
      headerName: `Appointment Date`,
      flex: 1,
    },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `AgeSex`,
      headerName: `Age/Sex`,
      flex: 1,
    },
    {
      field: `investigation`,
      headerName: `investigation`,
      flex: 1,
    },
    {
      field: `mobileNo`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    {
      field: `assignedPhelebomist`,
      headerName: `Assigned Phelebo`,
      flex: 1,
    },

    {
      field: "",
      width: 200,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
           <SubmitButton text={'Assign Phelebomist'} submit={false} callBack={() => {setAssignedPopup(true)}} style={{ padding: "5px 10px",width:"100px" }} />
           <SubmitButton text={'Reschedule'} submit={false} callBack={() => {}} style={{ padding: "5px 10px",width:"100px" }} />
           <SubmitButton text={'Cancel'} submit={false} callBack={() => {}} style={{ padding: "5px 10px",width:"100px" }} />
          </div>
        );
      },
    },
  ];

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
      <AssignPopup setShowPopup={setAssignedPopup} showPopup={AssignedPopup} />
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Appointment Status</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              { label: "Centre", type: "select", name: "centre",dataOptions:AllCenterData?.data },
              { label: "From Date", type: "customDateField", name: "from" },
              { label: "To Date", type: "customDateField", name: "to" },
            ]}
          />
           <div className="flex gap-3">
            <div class="relative flex-1 gap-3 flex justify-center items-center">
              <div class="relative flex-1 gap-1 flex justify-center items-center text-xs">
                <div class="w-6 h-6 bg-pink-300 rounded-full"></div>
                Scheduled
              </div>
              <div class="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div class="w-6 h-6 bg-green-300 rounded-full"></div>
                Confirmed
              </div>
              <div class="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                Cancel
              </div>
              <div class="relative flex-1 gap-1 flex justify-start items-center text-xs">
                <div class="w-6 h-6 bg-violet-500 rounded-full"></div>
                Assigned
              </div>
            </div>
          </div>
          <div className="flex gap-[0.25rem]"></div>
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
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="pt-1 w-full">
    

        <DynamicTable
          rows={[
            {
              id: 1,
              centre: "iMS",
              bookingDate:"11-05-25",
              appointmentDate:"12-05-25",
              patientName:"Jon Snow",
              AgeSex:"male/25",
              investigation:"CBC (complete blood count)",
              mobileNo: "1234567890",
              assignedPhelebomist:"Phelebomist 1",
            },
          ]}
          name="Appointment Status Details"
          loading={loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>
    </div>
  );
}
