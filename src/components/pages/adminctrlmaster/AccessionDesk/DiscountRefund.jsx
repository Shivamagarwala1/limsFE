import React, { useEffect, useState } from "react";
import DynamicTable, {
  TableHeader,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import "./ReportDispatch.css";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import { MdPadding } from "react-icons/md";
import { toast } from "react-toastify";

export default function DiscountRefund() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [type, setType] = useState(0);

  useEffect(() => {
    const toastId = toast.info('Please Select a Type');
    return () => {
      toast.dismiss(toastId); // Dismiss the toast when the component unmounts
    };
  }, []);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `BookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `PatientId`,
      headerName: `Patient Id`,
      flex: 1,
    },
    {
      field: `PatientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `AgeGender`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `MobileNo`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    {
      field: `Centre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `NetAmount`,
      headerName: `Net. Amount`,
      flex: 1,
    },
    {
      field: `Status`,
      headerName: `Status`,
      flex: 1,
    },
    {
      headerName: `Remark`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator
              inputFields={[
                {
                  type: "text",
                  placeholder: "Remark",
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      headerName: `Refund`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text="Refund"
              style={{ width: "50px" }}
            />
          </div>
        );
      },
    },
  ];
  const columns1 = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `PatientId`,
      headerName: `Patient Id`,
      flex: 1,
    },
    {
      field: `PatientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `MRP`,
      headerName: `MRP`,
      flex: 1,
    },
    {
      field: `GrossAmount`,
      headerName: `Gross Amount`,
      flex: 1,
    },
    {
      field: `Discount`,
      headerName: `Discount`,
      flex: 1,
    },
    {
      field: `NetAmount`,
      headerName: `Net. Amount`,
      flex: 1,
    },
    // {
    //   headerName: `Remark`,
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
    //         <InputGenerator
    //           inputFields={[
    //             {
    //               type: "text",
    //               placeholder: "Remark",
    //             },
    //           ]}
    //         />
    //       </div>
    //     );
    //   },
    // },
    // {
    //   headerName: `Refund`,
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
    //        <SubmitButton submit={false} text='Refund' style={{width:"50px"}} />
    //       </div>
    //     );
    //   },
    // }
  ];
  const row = [
    {
      id: 1,
      PatientId: "302",
      PatientName: "John Doe",
      TestName: "CBC",
      Centre: "Ayodhya",
      AgeGender: "23/male",
      BookingDate: "11-Feb-2025",
      MobileNo: "123456",
      NetAmount: "5000",
      Status: "Booked",
      GrossAmount: "7500",
      Discount: "2500",
      MRP: "10000",
      SampleType: "Blood",
    },
  ];

  const handleSubmit = () => {};

  return (
    <div>
      <FormHeader title="Discount/Refund" />
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          {type === 0 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Select Type",
                  type: "select",
                  name: "Select Type",
                  callBack: (e) => {
                    setType(e.target.value);
                  },
                  dataOptions: [
                    { id: 1, option: "Refund" },
                    { id: 2, option: "Discount" },
                  ],
                },
              ]}
            />
          )}
          {type == 1 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Visit Id",
                  type: "text",
                  name: "visitId",
                },
              ]}
            />
          )}
          {type == 2 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Search",
                  type: "text",
                  name: "search",
                },
              ]}
            />
          )}
          {type !== 0 && <SubmitButton text="Search" />}
        </div>
      </form>
      {type === 0 && <TableHeader title="Discount/Refund Details" />}
      {type == 1 && (
        <div style={{ height: "300px" }}>
          <DynamicTable
            rows={row}
            name="Refund Details"
            //   loading={loading}
            columns={columns}
            activeTheme={activeTheme}
          />
        </div>
      )}
      {type == 2 && (
        <DynamicTable
          rows={row}
          name="Discount Details"
          //   loading={loading}
          columns={columns1}
          activeTheme={activeTheme}
        />
      )}
      {type == 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Discount Type",
                type: "select",
                name: "Discount Type",
                dataOptions:[]
              },
              {
                label: "Discount Reason",
                type: "select",
                name: "Discount Reason",
                dataOptions:[]
              },
              {
                label: "Discount Amount",
                type: "text",
                name: "Discount",
              },
              {
                label: "Discount %",
                type: "text",
                name: "DiscountPercent",
              },
              {
                label: "Discount Approved By",
                type: "select",
                name: "DiscountApprovedBy",
                dataOptions:[]
              },
            ]}
          />
          <SubmitButton text='Save' />
        </div>
      )}
    </div>
  );
}
