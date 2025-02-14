import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import { fetchAllCenterData } from "../../../../service/RedendentData";

export default function CreateInvoice() {
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
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);
  // const AllCenterData = fetchAllCenterData();
  useEffect(() => {
    getReason();
    // console.log(AllCenterData);
  }, [activeTab]);
  console.log(data);
  const rows = [
    { id: 1, client: "client 1" },
    { id: 2, client: "client 2" },
  ];
  const tabs = [
    {
      name: "Discount Reason Master",
      fname: "discountReasonName",
      api: "/discountReasonMaster/SaveUpdateDiscountReason",
      getApi: "/discountReasonMaster",
    },
    {
      name: "Doctor Degree Master",
      fname: "degreeName",
      api: "/degreeMaster/SaveUpdateDegree",
      getApi: "/degreeMaster",
    },
    {
      name: "Designation Master",
      fname: "designationName",
      api: "/designationMaster/SaveUpdateDesignation",
      getApi: "/designationMaster",
    },
    {
      name: "Patient Document Master",
      fname: "documentType",
      api: "/documentTypeMaster/SaveUpdateDocumentType",
      getApi: "/documentTypeMaster",
    },
    {
      name: "Title Master",
      fname: "title",
      api: "/titleMaster/SaveUpdateTitle",
      getApi: "/titleMaster",
    },
    {
      name: "Bank Master",
      fname: "bankName",
      api: "/bank_master/SaveUpdateBankMaster",
      getApi: "/bank_master",
    },
    { name: "Discount Approval Master", fname: "lab-department-master" },
    {
      name: "Discount Type Master",
      fname: "type",
      api: "/discountTypeMaster/SaveUpdateDiscountType",
      getApi: "/discountTypeMaster",
    },
    {
      name: "Role Master",
      fname: "roleName",
      api: "/roleMaster/SaveUpdateRole",
      getApi: "/roleMaster",
    },
  ];

  const columns = [
    { field: "id", headerName: "Sr. No", width: 100 },
    {
      field: `client`,
      headerName: `Client`,
      flex: 1,
    },
    {
      field: "",
      width: 200,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="w-4 h-4 flex justify-center items-center">
              <FaRegEdit
                className={`w-full h-full ${
                  params?.row?.isActive === 1
                    ? "text-blue-500 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  setClickedRowId(params?.row);
                  setIsButtonClick(1);
                  setValues([
                    {
                      [tabs[activeTab]?.fname]: params?.row?.discountReasonName,
                    },
                  ]);
                }}
              />
            </button>
            <button
              className={`w-4 h-4 flex justify-center items-center ${
                params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              <ImSwitch
                className="w-full h-full"
                onClick={() => {
                  setClickedRowId(params?.row);
                  setShowPopup(true);
                }}
              />
            </button>
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
    const get = await fetchData(tabs[activeTab]?.getApi);
    console.log(get);
  };

  const handleTheUpdateStatusMenu = async () => {
    const lsData = getLocal("imarsar_laboratory");
    const payload = {
      ...clickedRowId,
      updateById: lsData?.user?.employeeId,
      isActive: clickedRowId?.isActive === 1 ? 0 : 1,
    };
    const data1 = await PostData?.postRequest(tabs[activeTab]?.api, payload);
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
        <div>Create Invoice</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              { label: "State", type: "select", name: "" },
              {
                label: "Centre",
                type: "select",
                name: "",
                // dataOptions: AllCenterData,
                keyField: "centreId",
                showValueField: "companyName",
              },
              { label: "From Date", type: "customDateField", name: "from" },
              { label: "To Date", type: "customDateField", name: "to" },
              {
                label: "Invoice Date",
                type: "customDateField",
                name: "invoice",
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
                Search
              </button>
            </div>
          </div>
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
          <div className="flex flex-col md:flex-row justify-start items-center w-full gap-2">
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
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`cursor-pointer ${
                      isHoveredTable1 === row.id
                        ? ""
                        : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                    onMouseEnter={() => setIsHoveredTable1(row.id)}
                    onMouseLeave={() => setIsHoveredTable1(null)}
                    style={{
                      background:
                        isHoveredTable1 === row.id
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
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`cursor-pointer ${
                      isHoveredTable === row.id
                        ? ""
                        : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                    onMouseEnter={() => setIsHoveredTable(row.id)}
                    onMouseLeave={() => setIsHoveredTable(null)}
                    style={{
                      background:
                        isHoveredTable === row.id
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
        )}
      </div>
    </div>
  );
}
