import React, { useEffect, useState } from "react";
import InputGenerator, {
  DateInputWithTime,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addRandomObjectId,
  convertDateTimeFormat,
} from "../../../../service/RedendentData";
import { getLocal } from "usehoks";
import toast from "react-hot-toast";
import { DatePickerWithTimeInTable } from "../../../../Custom Components/DatePickerWithTime";

const BarcodeInputCell = ({
  params,
  initialTime,
  name,
  setRow,
  row,
  fieldKey,
}) => {
  function formatDate(dateString) {
    if (!dateString) return "";

    const months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
      Jan: "Jan",
      Feb: "Feb",
      Mar: "Mar",
      Apr: "Apr",
      May: "May",
      Jun: "Jun",
      Jul: "Jul",
      Aug: "Aug",
      Sep: "Sep",
      Oct: "Oct",
      Nov: "Nov",
      Dec: "Dec",
    };

    let parts;

    if (dateString.includes("-")) {
      parts = dateString.split(" ");

      if (parts.length >= 2) {
        let dateParts = parts[0].split("-");

        if (dateParts.length === 3) {
          let [year, month, day] = dateParts;

          // If month is a number (YYYY-MM-DD format)
          if (!isNaN(month)) {
            month = months[month];
          }

          // If already in YYYY-MMM-DD format
          return `${parseInt(day)}-${month}-${year}`;
        }
      }
    }

    return dateString; // Return original if format doesn't match expected patterns
  }
  const [Date, setDate] = useState(formatDate(initialTime) || "");
  const [editable, setEditable] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setRow((prev) =>
      prev.map((item) =>
        item.Random === params?.row?.Random
          ? {
              ...item,
              editable: true,
              [fieldKey]: selectedDate, // ✅ Now using fieldKey instead of key
            }
          : item
      )
    );
  }, [selectedDate, setRow, fieldKey, params?.row?.Random]);

  useEffect(() => {
    let isEditable = false;

    if (params?.row?.isApproved === 1) {
      isEditable = [
        "Sample Collection",
        "Received Date",
        "Result Date",
        "Approval Date",
      ].includes(name);
    } else if (params?.row?.isResultDone === 1) {
      isEditable = [
        "Sample Collection",
        "Received Date",
        "Result Date",
      ].includes(name);
    } else if (params?.row?.isSampleCollected === "Y") {
      isEditable = ["Sample Collection", "Received Date"].includes(name);
    }

    setEditable(isEditable);
  }, [
    params?.row?.isSampleCollected,
    params?.row?.isResultDone,
    params?.row?.isApproved,
    name,
  ]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  console.log(selectedDate);
  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "-0px" }}>
      <DatePickerWithTimeInTable
        id="datepicker"
        name="datepicker"
        value={selectedDate}
        currentDate={convertDateTimeFormat(initialTime)}
        onChange={handleDateChange}
        placeholder="Select Date"
        label={""}
        isMandatory={true}
        editable={editable}
        labelStyle={{ marginLeft: "-4px" }}
        inputStyle={{ height: "1.05rem" }}
        iconStyle={{ height: "1.05rem", borderRadius: "5px" }}
        calenderStyle={{ width: "220px", marginLeft: "-70px" }}
        showTime={true}
      />
    </div>
  );
};

export default function ReportDateChange() {
  const lsData = getLocal("imarsar_laboratory");
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    // Default Format date as "DD-MMM-YYYY"
    return `${String(currentDate.getDate()).padStart(
      2,
      "0"
    )}-${currentDate.toLocaleString("default", {
      month: "short",
    })}-${currentDate.getFullYear()}`;
    //Default Format date as "DD-MMM-YYYY HH:mm" (24-hour format)
    // return `${String(currentDate.getDate()).padStart(2,"0")}-${currentDate.toLocaleString("default", {month: "short",})}-${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2,"0")}:${String(currentDate.getMinutes()).padStart(2, "0")}`;
  });
  const [UpdatedBarcode, setUpdatedBarcode] = useState([]);
  const [VisitorId, setVisitorId] = useState("");
  const [row, setRow] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();
  const AllCenterData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    // console.log(AllCenterData);
  }, []);

  useEffect(() => {
    const row = addRandomObjectId(getData?.data?.data || []);
    setRow(row);
  }, [getData?.data]);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "workOrderId", headerName: "Visiter Id", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "investigationName", headerName: "Test Name", flex: 1 },
    { field: "barcodeNo", headerName: "Barcode", flex: 1 },
    {
      field: "registrationDate",
      headerName: "Registration Date",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <BarcodeInputCell
              setRow={setRow}
              row={row}
              setUpdatedBarcode={setUpdatedBarcode}
              initialTime={params?.row?.registrationDate}
              fieldKey="registrationDate" // ✅ Changed 'key' to 'fieldKey'
              params={params}
            />
          </>
        );
      },
    },
    {
      field: "approvedDate",
      headerName: "Approved Date",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <BarcodeInputCell
              setRow={setRow}
              row={row}
              name={"Approval Date"}
              setUpdatedBarcode={setUpdatedBarcode}
              initialTime={params?.row?.approvedDate}
              fieldKey="approvedDate"
              params={params}
            />
          </>
        );
      },
    },
    {
      field: "sampleCollectionDate",
      headerName: "Sample Collection Date",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <BarcodeInputCell
              setRow={setRow}
              row={row}
              name={"Sample Collection"}
              setUpdatedBarcode={setUpdatedBarcode}
              initialTime={params?.row?.sampleCollectionDate}
              fieldKey="sampleCollectionDate"
              params={params}
            />
          </>
        );
      },
    },
    {
      field: "sampleReceiveDate",
      headerName: "Sample Receive Date",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <BarcodeInputCell
              setRow={setRow}
              row={row}
              name={"Received Date"}
              setUpdatedBarcode={setUpdatedBarcode}
              initialTime={params?.row?.sampleReceiveDate}
              fieldKey="sampleReceiveDate"
              params={params}
            />
          </>
        );
      },
    },
    {
      field: "resultDate",
      headerName: "Result Date",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <BarcodeInputCell
              setRow={setRow}
              row={row}
              name={"Result Date"}
              setUpdatedBarcode={setUpdatedBarcode}
              initialTime={params?.row?.resultDate}
              fieldKey="resultDate"
              params={params}
            />
          </>
        );
      },
    },
  ];

  // const columns = [
  //   { field: "Random", headerName: "Sr. No", width: 20 },
  //   {
  //     field: `BookingDate`,
  //     headerName: `Booking Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `VisitId`,
  //     headerName: `Visit Id`,
  //     flex: 1,
  //   },
  //   {
  //     field: `PatientName`,
  //     headerName: `Patient Name`,
  //     flex: 1,
  //   },
  //   {
  //     field: `TestName`,
  //     headerName: `Test Name`,
  //     flex: 1,
  //   },
  //   {
  //     field: `RefDoc`,
  //     headerName: `Ref. Doc.`,
  //     flex: 1,
  //   },
  //   {
  //     field: `Department`,
  //     headerName: `Department`,
  //     flex: 1,
  //   },
  //   {
  //     field: `TestName`,
  //     headerName: `Test Name`,
  //     flex: 1,
  //   },
  //   {
  //     field: `FromCentre`,
  //     headerName: `Centre`,
  //     flex: 1,
  //   },
  //   {
  //     field: `SampleCollDate`,
  //     headerName: `Sample Collection Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `DepartmentRecieveDate`,
  //     headerName: `Dep. Rec. Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `ResultDate`,
  //     headerName: `Result Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `ApproveDate`,
  //     headerName: `Approve Date`,
  //     flex: 1,
  //   },
  //   {
  //     field: `BTOS`,
  //     headerName: `BTOS`,
  //     flex: 1,
  //   },
  //   {
  //     field: `STOD`,
  //     headerName: `STOD`,
  //     flex: 1,
  //   },
  //   {
  //     field: `DTOR`,
  //     headerName: `DTOR`,
  //     flex: 1,
  //   },
  // ];

  // Handle form submission
  const handleSubmit = async () => {
    await getData?.fetchData(
      `/tnx_Booking/GetReportDateChangeData?WorkOrderId=${VisitorId}`
    );
  };

  const handleSave = async () => {
    // const payload = row
    //   .filter((item) => item.editable) // Include only objects where editable is true
    //   .map((item) => ({
    //     testId: item.testId || 0,
    //     samplecollectedDate: item.sampleCollectionDate
    //       ? new Date(item.sampleCollectionDate).toISOString()
    //       : null,
    //     samplerecievedDate: item.sampleReceiveDate
    //       ? new Date(item.sampleReceiveDate).toISOString()
    //       : null,
    //     resultdate: item.resultDate
    //       ? new Date(item.resultDate).toISOString()
    //       : null,
    //     approveDate: item.approvedDate
    //       ? new Date(item.approvedDate).toISOString()
    //       : null,
    //     userId: parseInt(lsData?.user?.employeeId),
    //   }));
    const payload = row
      .filter((item) => item.editable) // Include only objects where editable is true
      .map((item) => ({
        testId: item.testId || 0,
        samplecollectedDate: item.sampleCollectionDate,
        samplerecievedDate: item.sampleReceiveDate,
        resultdate: item.resultDate,
        approveDate: item.approvedDate,
        userId: parseInt(lsData?.user?.employeeId),
      }));
    try {
      if (payload.length == 0) {
        toast.error("No Data For Update");
        return;
      }
      const res = await PostData?.postRequest(
        `/tnx_Booking/ReportDateChange`,
        payload
      );

      console.log(payload, " ", res);
      if (res?.success) {
        toast?.success(res?.message);
        // window.location.reload();
      } else {
        toast?.error(res?.message);
      }
    } catch (error) {
      toast?.error(res?.message);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      {false ? (
        <div>
          <h2>Coming Soon</h2>
          {/* <CustomHandsontable columns={columns1} rows={tableData} onEdit={handleEdit} /> */}
        </div>
      ) : (
        <>
          {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
          <div>
            <FormHeader title="Change Barcode" />
            <form autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-2 mx-1 lg:mx-2">
                <InputGenerator
                  inputFields={[
                    {
                      label: "Visit Id",
                      type: "text",
                      name: "VisitId",
                      onChange: (e) => {
                        setVisitorId(e);
                      },
                    },
                  ]}
                />
                {/* <DatePickerWithTime
                  id="datepicker"
                  name="datepicker"
                  value={selectedDate}
                  onChange={handleDateChange}
                  placeholder="Select Date"
                  label="Date of Birth"
                  isMandatory={true}
                  showTime={true}
                /> */}
                <TwoSubmitButton
                  style={{ marginTop: "1px" }}
                  options={[
                    {
                      label: "Search",
                      submit: false,
                      callBack: () => {
                        handleSubmit();
                      },
                    },
                    {
                      label: "Save",
                      submit: false,
                      callBack: () => {
                        handleSave();
                      },
                    },
                  ]}
                />
              </div>
            </form>
            <div style={{ height: "300px" }}>
              <UpdatedDynamicTable
                rows={row}
                name="Barcode Details"
                loading={getData?.loading}
                columns={columns}
                viewKey="Random"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
