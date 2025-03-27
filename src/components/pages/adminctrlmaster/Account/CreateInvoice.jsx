import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  getFormattedDate,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import {
  addRandomObjectId,
  fetchAllCenterData,
} from "../../../../service/RedendentData";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";
import toast from "react-hot-toast";

export default function CreateInvoice() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const FirstGrid = usePostData();
  const SecondGrid = usePostData();
  const { fetchData, response, data, loading } = useGetData();

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const todayDate = getFormattedDate();
  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [InvoiceDate, setInvoiceDate] = useState(todayDate);
  const [CenterValue, setCenterValue] = useState([]);
  const [Grid1, setGrid1] = useState([]);
  const [Grid2, setGrid2] = useState([]);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);
  // const AllCenterData = fetchAllCenterData();
  const AllCenterData = useGetData();
  const StateData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);
  // useEffect(() => {
  //   getReason();
  // }, [FromDate, ToDate, CenterValue]);

  const columns = [
    { field: "Random", headerName: "Sr. No", flex: 1 },

    {
      field: `centre`,
      headerName: `Centre Name`,
      flex: 1,
    },
    {
      field: `netAmount`,
      headerName: `Net Amt.`,
      flex: 1,
    },
    {
      field: `discount`,
      headerName: `Discount`,
      flex: 1,
    },

    {
      field: `creditAmount`,
      headerName: `Credit Amt.`,
      flex: 1,
    },
    {
      field: `Action`,
      headerName: `Action`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <SubmitButton
              text="Create"
              submit={false}
              callBack={() => {
                setClickedRowId(params?.row);
                handleSubmit(params?.row)
              }}
              style={{ height: "1.05rem" }}
            />
          </div>
        );
      },
    },
  ];
  const columns1 = [
    { field: "Random", headerName: "Sr. No", flex: 1 },
    {
      field: `centreId`,
      headerName: `Centre Id`,
      flex: 1,
    },
    {
      field: `companyName`,
      headerName: `Centre Name`,
      flex: 1,
    },
    {
      field: `invoiceNo`,
      headerName: `Invoice No.`,
      flex: 1,
    },
    {
      field: `invoiceDate`,
      headerName: `Invoice Date`,
      flex: 1,
    },
   
  ];

  const handleSubmit = async (clickedRowId) => {
    // event.preventDefault();
    // const values = getValues();
    console.log(clickedRowId);
    const lsData = getLocal("imarsar_laboratory");
    const payload = {
      invoiceNo: "",
      centreid: parseInt(clickedRowId?.companyID),
      rate: parseInt(clickedRowId?.netAmount),
      fromDate: FromDate,
      toDate: ToDate,
      invoiceDate: InvoiceDate,
      createdBy: parseInt(lsData?.user?.employeeId),
      createDate: new Date().toISOString(),
      cancelReason: "",
      cancelByID: 0,
      isCancel: 0,
      labNo: clickedRowId?.transactionId,
    };
    // : {
    //     ...values,
    //     updateById: lsData?.user?.employeeId,
    //     id: clickedRowId?.id,
    //     isActive: clickedRowId?.isActive,
    //   };
    const data1 = await PostData?.postRequest(
      "/centreInvoice/CreateInvoice",
      payload
    );
    console.log(data1);
    if (data1?.success) {
      toast.success("Invoice Created Successfully");
      setIsButtonClick(0);
      getReason();
    }
  };

  const getReason = async () => {
    const get = await FirstGrid?.postRequest(
      `/centreInvoice/SearchInvoiceData?FromDate=${FromDate}&Todate=${ToDate}`,
      CenterValue
    );
    const get1 = await SecondGrid?.postRequest(
      `/centreInvoice/GetLastInvoiceData`,
      CenterValue
    );
    setGrid1(addRandomObjectId(get?.data));
    setGrid2(addRandomObjectId(get1?.data));
    console.log(get, " ", get1);
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
        <div>Create Invoice</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
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
            selectedValues={CenterValue}
            setSelectedValues={setCenterValue}
          />
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
                customOnChange: (e) => {
                  console.log(e);
                  setFromDate(e);
                },
              },
              {
                label: "Invoice Date",
                type: "customDateField",
                name: "invoiceDate",
                customOnChange: (e) => {
                  console.log(e);
                  setInvoiceDate(e);
                },
              },
            ]}
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
      <div className="pt-1 w-full">
        <div
          className="w-full h-[0.10rem]"
          style={{ background: activeTheme?.menuColor }}
        ></div>
        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
          style={{ background: activeTheme?.blockColor }}
        >
          <IoMdMenu className="font-semibold text-lg" />
          <div>Invoice Details</div>
        </div>

        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading...</div>
        ) : (
          <div className="flex flex-col md:flex-row justify-start  w-full gap-2">
            <div className="w-full">
              <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
                <thead
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <tr>
                    {columns.map((col, index) => (
                      <th
                        key={index}
                        className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                        style={{
                          width: col.width ? `${col.width}px` : "",
                          flex: col.flex ? col.flex : "",
                        }}
                      >
                        {col.headerName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Grid1.map((row, index) => (
                    <tr
                      key={row.Random}
                      className={`cursor-pointer ${
                        isHoveredTable1 === row.Random
                          ? ""
                          : index % 2 === 0
                          ? "bg-gray-100"
                          : "bg-white"
                      }`}
                      onMouseEnter={() => setIsHoveredTable1(row.Random)}
                      onMouseLeave={() => setIsHoveredTable1(null)}
                      style={{
                        background:
                          isHoveredTable1 === row.Random
                            ? activeTheme?.subMenuColor
                            : undefined,
                      }}
                    >
                      {columns.map((col, idx) => (
                        <td
                          key={idx}
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                        >
                          {col.renderCell
                            ? col.renderCell({ row })
                            : row[col.field]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full">
              <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
                <thead
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <tr>
                    {columns1.map((col, index) => (
                      <th
                        key={index}
                        className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                        style={{
                          width: col.width ? `${col.width}px` : "",
                          flex: col.flex ? col.flex : "",
                        }}
                      >
                        {col.headerName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Grid2.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`cursor-pointer ${
                        isHoveredTable === row.Random
                          ? ""
                          : index % 2 === 0
                          ? "bg-gray-100"
                          : "bg-white"
                      }`}
                      onMouseEnter={() => setIsHoveredTable(row.Random)}
                      onMouseLeave={() => setIsHoveredTable(null)}
                      style={{
                        background:
                          isHoveredTable === row.Random
                            ? activeTheme?.subMenuColor
                            : undefined,
                      }}
                    >
                      {columns1.map((col, idx) => (
                        <td
                          key={idx}
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                        >
                          {col.renderCell
                            ? col.renderCell({ row })
                            : row[col.field]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
