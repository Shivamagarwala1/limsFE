import React, { useEffect, useState } from "react";
import { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  getFormattedDate,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addRandomObjectId,
  ViewOrDownloadPostPDF,
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import { getLocal } from "usehoks";
import { UpdatedMultiSelectDropDown } from "../../../../Custom Components/UpdatedMultiSelectDropDown";

// Main Component
export default function DiscountReport() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const todayDate = getFormattedDate();
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();

  const [FromDate, setFromDate] = useState(todayDate);
  const [ToDate, setToDate] = useState(todayDate);
  const [UserValue, setUserValue] = useState([]);
  const [CenterValue, setCenterValue] = useState([]);
  const [row, setRow] = useState([]);

  const getData = useGetData();
  const PostData = usePostData();
  const GridData = useGetData();
  const UserData = useGetData();
  const RoleData = useGetData();
  useEffect(() => {
    getData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1 )"
    );
    RoleData?.fetchData(
      `/roleMaster?select=id,rolename&$filter=(isactive eq 1)`
    );
    UserData?.fetchData(
      `/empMaster?select=empid,fName,lName&$filter=(isActive eq 1)`
    );
  }, []);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "workOrderId", headerName: "Visit Id", flex: 1 },
    { field: "companyName", headerName: "Centre Name", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "receivedBy", headerName: "Received By", flex: 1 },
    { field: "grossAmount", headerName: "Gross Amount", flex: 1 },
    { field: "discount", headerName: "Discount", flex: 1 },
    { field: "netAmount", headerName: "Net Amount", flex: 1 },
  ];

  // Handle form submission
  const handleSearch = async () => {
    if (!FromDate) {
      toast.error("From Date is required");
      return;
    }
    if (!ToDate) {
      toast.error("To Date is required");
      return;
    }
    const payload = {
      empIds: UserValue,
      centreIds: CenterValue,
      fromDate: FromDate,
      toDate: ToDate,
    };
    try {
      const res = await PostData?.postRequest(
        `/tnx_Booking/DiscountReportData`,
        payload
      );
      setRow(addRandomObjectId(res?.data));
    } catch (error) {
      toast?.error(res?.data?.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = getValues();
    console.log(values);

    if (!values?.FromDate) {
      toast.error("From Date is required");
      return;
    }
    if (!values?.ToDate) {
      toast.error("To Date is required");
      return;
    }
    const payload = {
      empIds: UserValue,
      centreIds: CenterValue,
      fromDate: values?.FromDate,
      toDate: values?.ToDate,
    };
    console.log("Payload ", payload);
    try {
      const res = await ViewOrDownloadPostPDF(
        `/tnx_Booking/DiscountReportData`,
        payload
      );
    } catch (error) {
      toast?.error(res?.data?.message);
    }
  };

  // Summing all objects in the row array
  const totalRow = row.reduce((acc, curr) => {
    Object.keys(curr).forEach((key) => {
      if (typeof curr[key] === "number") {
        // Sum numeric values
        acc[key] = (acc[key] || 0) + curr[key];
      } else if (!acc[key]) {
        // Keep the first occurrence of string values
        acc[key] = curr[key];
      }
    });
    return acc;
  }, {});

  return (
    <>
      <div>
        <FormHeader title="Discount Report" />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
            <InputGenerator
              inputFields={[
                {
                  label: "From Date",
                  type: "customDateField",
                  name: "FromDate",
                  customOnChange: (e) => {
                    console.log(e);
                    setFromDate(e);
                  },
                },
                {
                  label: "To Date",
                  type: "customDateField",
                  name: "ToDate",
                  customOnChange: (e) => {
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
              options={getData?.data}
              isMandatory={false}
              isDisabled={false}
              selectAll={false}
              optionKey="centreId"
              optionValue={["companyName"]}
              selectedValues={CenterValue}
              setSelectedValues={setCenterValue}
            />
            <UpdatedMultiSelectDropDown
              id="User"
              name="serachUser"
              label="User"
              placeHolder="Search User"
              options={UserData?.data}
              isMandatory={false}
              isDisabled={false}
              selectAll={false}
              optionKey="empId"
              optionValue={["fName", "lName"]}
              selectedValues={UserValue}
              setSelectedValues={setUserValue}
            />

            <TwoSubmitButton
              options={[
                {
                  label: "Search",
                  submit: false,
                  callBack: () => {
                    handleSearch();
                  },
                },
                // {
                //   label: "Print",
                //   submit: true,
                // },
              ]}
            />
          </div>
        </form>
        <div className="h-[300px] w-full">
          <UpdatedDynamicTable
            rows={row}
            extraRow={[
              {
                ...totalRow,
                Random: "Total",
                companyName: "",
                workOrderId: "",
                name: "",
                receivedBy: "",
                // cashAmt:`₹ ${totalRow?.cashAmt}`
              },
            ]}
            name="Discount Report Details"
            loading={PostData?.loading}
            columns={columns}
            viewKey="Random"
          />
        </div>
      </div>
    </>
  );
}
