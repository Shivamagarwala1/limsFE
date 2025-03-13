import React, { useEffect, useState } from "react";
import InputGenerator, {
  ClickChangeButton,
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
// import CustomHandsontable from "../../../../Custom Components/CustomHandsontable";

export default function ReportDateChange() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");
  // ------------------ Item -------------------------------
  const [ItemValue, setItemValue] = useState("");
  const [ItemDropDown, setItemDropDown] = useState(false);
  const [ItemHoveIndex, setItemHoveIndex] = useState(null);
  const [ItemSelectedOption, setItemSelectedOption] = useState("");

  // ------------------ TatType -------------------------------
  const [TatTypeValue, setTatTypeValue] = useState("");
  const [TatTypeDropDown, setTatTypeDropDown] = useState(false);
  const [TatTypeHoveIndex, setTatTypeHoveIndex] = useState(null);
  const [TatTypeSelectedOption, setTatTypeSelectedOption] = useState("");

  const [SelectAll, setSelectAll] = useState(false);
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

  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `BookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `VisitId`,
      headerName: `Visit Id`,
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
      field: `RefDoc`,
      headerName: `Ref. Doc.`,
      flex: 1,
    },
    {
      field: `Department`,
      headerName: `Department`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `FromCentre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `SampleCollDate`,
      headerName: `Sample Collection Date`,
      flex: 1,
    },
    {
      field: `DepartmentRecieveDate`,
      headerName: `Dep. Rec. Date`,
      flex: 1,
    },
    {
      field: `ResultDate`,
      headerName: `Result Date`,
      flex: 1,
    },
    {
      field: `ApproveDate`,
      headerName: `Approve Date`,
      flex: 1,
    },
    {
      field: `BTOS`,
      headerName: `BTOS`,
      flex: 1,
    },
    {
      field: `STOD`,
      headerName: `STOD`,
      flex: 1,
    },
    {
      field: `DTOR`,
      headerName: `DTOR`,
      flex: 1,
    },
  ];



  const handleSubmit = () => {};

  // -------------------------------------------------

  const [tableData, setTableData] = useState([
    { id: 1, name: "Alice", age: 25, gender: "Female" },
    { id: 2, name: "Bob", age: 30, gender: "Male" },
  ]);

  const columns1 = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      options: ["Male", "Female", "Other"], // Dropdown options
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      ),
      width: 100,
    },
  ];

  const handleEdit = (updatedData) => {
    setTableData(updatedData);
  };

  const handleDelete = (id) => {
    setTableData((prevData) => prevData.filter((row) => row.id !== id));
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
        </>
      )}
    </div>
  );
}
