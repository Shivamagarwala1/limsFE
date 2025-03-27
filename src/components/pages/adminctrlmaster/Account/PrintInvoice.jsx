import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  getFormattedDate,
  IconButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import { FaFileExcel, FaRegEdit, FaRegFileExcel } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { GiCancel } from "react-icons/gi";
import { FaEye } from "react-icons/fa6";
import { VscFilePdf } from "react-icons/vsc";
import toast from "react-hot-toast";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import {
  addRandomObjectId,
  downloadExcel,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";
import { CancelInvoicePopupModal } from "../../../../Custom Components/NewPopups";
import { FormHeader } from "../../../../Custom Components/FormGenerator";

export default function PrintInvoice() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const todayDate = getFormattedDate();
  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [Grid2, setGrid2] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState([]);
  const AllCenterData = useGetData();
  const getData = usePostData();
  const StateData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);
  useEffect(() => {
    if (selectedCenter.length != 0) {
      getReason();
    }
  }, [showPopup]);
  console.log(selectedCenter);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 100 },
    {
      field: `invoiceNo`,
      headerName: `Invoice No`,
      flex: 1,
    },
    {
      field: `rate`,
      headerName: `Rate`,
      flex: 1,
    },
    {
      field: `invoiceDate`,
      headerName: `Invoice Date`,
      flex: 1,
    },
    {
      field: `createdBy`,
      headerName: `Created By`,
      flex: 1,
    },
    {
      field: `createDate`,
      headerName: `Create Date`,
      flex: 1,
    },
    {
      field: `Cancel`,
      headerName: `Cancel`,
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-start gap-1 items-center">
            {params?.row?.isCancel != 1 && (
              <IconButton
                icon={GiCancel}
                onClick={() => {
                  setClickedRowId(params?.row);
                  setShowPopup(true);
                }}
                className={"h-4 w-4"}
                title="View Reciept"
              />
            )}
          </div>
        );
      },
    },
    {
      field: `Invoice`,
      headerName: `View Invoice`,
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-start gap-1 items-center">
            <IconButton
              icon={FaEye}
              onClick={() =>
                ViewOrDownloandPDF(
                  `/centreInvoice/PrintInvoice?InvoiceNo=${params?.row?.invoiceNo}`
                )
              }
              className={"h-4 w-4"}
              title="View Reciept"
            />
          </div>
        );
      },
    },
    {
      field: "",
      width: 100,
      headerName: "View Report",
      renderCell: (params) => {
        return (
          <div className="flex justify-start gap-1 items-center">
            <IconButton
              icon={VscFilePdf}
              onClick={() =>
                ViewOrDownloandPDF(
                  `/centreInvoice/PrintInvoiceData?InvoiceNo=${params?.row?.invoiceNo}`
                )
              }
              className={"h-4 w-4"}
              title="View Reciept"
            />
            <IconButton
              icon={FaRegFileExcel}
              onClick={() =>
                downloadExcel(
                  `/centreInvoice/PrintInvoiceDataExcel?InvoiceNo=${params?.row?.invoiceNo}`,
                  `${params?.row?.invoiceNo}-Invoice.xlsx`
                )
              }
              className={"h-4 w-4"}
              title="View Reciept"
            />
          </div>
        );
      },
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
    // const requiredFields = ["CentreMode", "FromDate", "toDate"];
    // const missingFields = requiredFields.filter((field) => !values[field]);

    // if (missingFields.length > 0) {
    //   toast(`The following fields are required: ${missingFields[0]}`);
    //   return;
    // }

    if (selectedCenter.length === 0) {
      toast(`Centre is required`);
      return;
    }

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
    if (selectedCenter.length == 0) {
      toast.error("Center is Rquired");
      return;
    }
    const get = await getData?.postRequest(
      `/centreInvoice/GetInvoices?FromDate=${FromDate} 12:01 AM&Todate=${ToDate} 11:59 PM`,
      selectedCenter
    );
    setGrid2(addRandomObjectId(get?.data));
    console.log(get);
  };

  return (
    <div>
      <CancelInvoicePopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        Params={clickedRowId}
      />
      {/* Header Section */}
      <FormHeader title="Print Invoice" />
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "From Date",
                type: "customDateField",
                name: "fromDate",
                customOnChange: (e) => {
                  console.log(e);
                  setFromDate(e);
                },
              },
              {
                label: "To Date",
                type: "customDateField",
                name: "toDate",
                // minDate: new Date(2000, 0, 1),
                // tillDate: new Date(2100, 0, 1),
                customOnChange: (e) => {
                  console.log(e);
                  setToDate(e);
                },
              },
            ]}
          />
          <UpdatedMultiSelectDropDown
            id="Center"
            name="serachCenter"
            label="Center"
            placeHolder="Search Center"
            options={AllCenterData?.data}
            isMandatory={false}
            isDisabled={false}
            optionKey="centreId"
            optionValue={["companyName"]}
            selectedValues={selectedCenter}
            setSelectedValues={setSelectedCenter}
          />
          <TwoSubmitButton
            options={[
              {
                label: "Search",
                submit: false,
                callBack: () => {
                  getReason();
                },
              },
            ]}
          />
        </div>
      </form>
      <UpdatedDynamicTable
        rows={Grid2}
        name="Print Invoice Details"
        loading={Grid2?.loading}
        columns={columns}
        viewKey="Random"
      />
    </div>
  );
}
