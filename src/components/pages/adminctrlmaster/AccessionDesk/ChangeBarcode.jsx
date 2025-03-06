import React, { useEffect, useState } from "react";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import "./ReportDispatch.css";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import { addObjectId } from "../../../../service/RedendentData";
import toast from "react-hot-toast";

// BarcodeInputCell Component
const BarcodeInputCell = ({
  params,
  initialTime,
  setRow,
  setUpdatedBarcode,
  row,
}) => {
  // Get the barcode value from the row state
  const barcodeValue =
    row.find((item) => item.sampleTypeName === params?.row?.sampleTypeName)
      ?.Barcode || "";

  const handleChange = (e) => {
    const newBarcode = e.target.value;

    // Update row state for all rows with the same sampleTypeName
    setRow((prev) =>
      prev.map((item) =>
        item.sampleTypeName === params?.row?.sampleTypeName
          ? {
              ...item,
              Barcode: newBarcode,
              edited: parseInt(newBarcode) !== initialTime,
            }
          : item
      )
    );

    // Update setUpdatedBarcode with new barcode and corresponding testIds
    setUpdatedBarcode((prev) => {
      const testIds = row
        .filter((item) => item.sampleTypeName === params?.row?.sampleTypeName)
        .map((item) => item.testId);

      // Create an object to add
      const newEntry = {
        testIds,
        barcodeNoNew: newBarcode,
      };

      // Remove any existing entry with the same testIds
      const filteredData = prev.filter(
        (item) => !testIds.some((id) => item.testIds.includes(id))
      );

      return [...filteredData, newEntry];
    });
  };

  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
      <input
        style={{ height: "1rem" }}
        type="text"
        className="inputPeerField peer border-borderColor focus:outline-none"
        value={barcodeValue} // Controlled input based on state
        name="Barcode"
        onChange={(e) => {
          const newValue = e.target.value;

          // Ensure only alphanumeric characters and dashes (-) are allowed
          if (/^[a-zA-Z0-9-]*$/.test(newValue)) {
            handleChange({ target: { value: newValue } }); // Update state with valid input
          }
        }}
      />
    </div>
  );
};

// Main Component
export default function ChangeBarcode() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [VisitorId, setVisitorId] = useState("");
  const [UpdatedBarcode, setUpdatedBarcode] = useState([]);
  const [row, setRow] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();

  useEffect(() => {
    if (getData?.data?.data) {
      setRow(addObjectId(getData.data.data));
    }
  }, [getData?.data]);

  // Columns for the table
  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    { field: "workOrderId", headerName: "Visiter Id", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "investigationName", headerName: "Test Name", flex: 1 },
    { field: "sampleTypeName", headerName: "Sample Type", flex: 1 },
    { field: "barcodeNo", headerName: "Old Barcode", flex: 1 },
    {
      headerName: "New Barcode",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <BarcodeInputCell
              setRow={setRow}
              row={row}
              setUpdatedBarcode={setUpdatedBarcode}
              initialTime={params?.row?.Barcode}
              params={params}
            />
          </>
        );
      },
    },
  ];

  // Handle form submission
  const handleSubmit = async () => {
    await getData?.fetchData(
      `/tnx_Booking/GetbarcodeChangedetail?WorkOrderId=${VisitorId}`
    );
  };

  // Handle form submission
  const handleSave = async () => {
    try {
      const res = await PostData?.postRequest(
        `/tnx_Booking/UpdateBarcode`,
        UpdatedBarcode
      );
      if (res?.success) {
        toast?.success(res?.message);
        window.location.reload();
      } else {
        toast?.error(res?.message);
      }
    } catch (error) {
      toast?.error(res?.message);
    }
  };

  return (
    <div>
      <FormHeader title="Change Barcode" />
      <form autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
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
          <TwoSubmitButton
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
        <DynamicTable
          rows={row}
          name="Barcode Details"
          loading={getData?.loading}
          columns={columns}
          activeTheme={activeTheme}
        />
      </div>
    </div>
  );
}
