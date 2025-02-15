import React, { useEffect, useState } from "react";
import DynamicTable, {
  TableHeader,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { useGetData } from "../../../../service/apiService";
import { ImCross } from "react-icons/im";
import { FaPlus, FaPrint } from "react-icons/fa";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import CustomeEditor from "../../../sharecomponent/CustomeEditor";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import CustomHandsontable from "../../../../Custom Components/CustomHandsontable";

export default function ResultTrack() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [Organism, setOrganism] = useState([]);
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);
  const [UserObj, setUserObj] = useState(null);
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
      field: `SampleRecDate`,
      headerName: `Sample Rec. Date`,
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
      field: `Barcode`,
      headerName: `Barcode No.`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params.row)
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text={params?.row?.TestName}
              callBack={() => {
                setUserObj(params?.row);
              }}
              style={{
                width: "30px",
                fontSize: "0.75rem",
                padding: "0px 20px",
                height: "20px",
              }}
            />
          </div>
        );
      },
    },
    {
      field: `Comments`,
      headerName: `Comments`,
      flex: 1,
    },
    {
      field: `ApprovedDate`,
      headerName: `Approved Date`,
      flex: 1,
    },
    {
      field: `Remark`,
      headerName: `Remark`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params.row)
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text={"+"}
              callBack={() => {
                setLocal("testName", params?.row?.TestName);
                setRemarkPopup(true);
              }}
              style={{ width: "30px", fontSize: "0.75rem", height: "20px" }}
            />
          </div>
        );
      },
    },
    {
      field: `Info`,
      headerName: `Info`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params.row)
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text={"i"}
              style={{ width: "30px", fontSize: "0.75rem", height: "20px" }}
            />
          </div>
        );
      },
    },
  ];
  const row = [
    {
      id: 1,
      Centre: "105 - center 1",
      Department: "Nursing",
      PatientName: "John, 50032",
      Barcode: "10993",
      SampleRecDate: "10-02-2025",
      VisitId: "302",
      ApprovedDate: "12-Feb-25",
      SampleType: "Blood",
      Comments: "Lorem Ipsum",
      TestName: "CBC",
      AgeGender: "25/male",
      TransferDate: "15-Feb-2025",
      BookingDate: "11-Feb-2025",
      ToCentre: "New-Delhi",
      FromCentre: "Ayodhya",
    },
  ];

  //accept child to parent in editor
  const handleContentChange = (content) => {
    // Update editor content
    setCommentMasterData((preventDefault) => ({
      ...preventDefault,
      template: content,
    }));
    //setEditorContent(content);
  };

  // -------------------------------------------------------------
  const [tableData, setTableData] = useState([
    {
      id: 2,
      Test: "Thyroid - T3 T4 & TSH",
      R: true,
      name: "John",
      age: 28,
      role: "Developer",
    }
  ]);

  const columns1 = [
    {
      field: "c",
      headerName: "C",
      flex: 1,
      editable: true,
      width: "10px",
      renderCell: ({ row }) => <input type="checkbox" />,
    },
    {
      field: "Test",
      headerName: "Test Name",
      flex: 1,
      editable: true,
      renderCell: ({ row }) => (
        <div className="flex gap-2 text-center">
          {row?.Test}{" "}
          {row?.R && (
            <SubmitButton
              submit={false}
              text={"R"}
              style={{ width: "30px", fontSize: "0.75rem", height: "20px" }}
            />
          )}
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
      editable: false,
      type: "number",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      editable: false,
      options: ["Developer", "Designer", "Manager"], // Dropdown options
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <button onClick={() => alert(`Editing ${row.name}`)}>Edit</button>
      ),
    },
  ];

  const handleSubmit = () => {};
  const statuses = [
    "Collected",
    "Reject",
    "Pending",
    "Tested",
    "Report Hold",
    "Approved",
    "Report Print",
    "Sample-Rerun",
  ];
  return (
    <div>
      <>
        {/* <div style={{ position: "fixed", top: "100px", maxHeight: "200px", overflowY: "auto", width: "100%",backgroundColor:"white" }}> */}
        <div>
          {/* Header Section */}
          <FormHeader title="Result Track" />
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <MultiSelectDropdown
                field={{
                  label: "Centre",
                  name: "CentreMode",
                  keyField: "centreId",
                  selectedValues: selectedCenter,
                  showValueField: "companyName",
                  dataOptions: AllCenterData?.data,
                  callBack: (selected) => setSelectedCenter(selected),
                }}
              />
              <InputGenerator
                inputFields={[
                  {
                    label: "From Date",
                    type: "customDateField",
                    name: "FromDate",
                  },
                  {
                    label: "To Date",
                    type: "customDateField",
                    name: "ToDate",
                  },
                  {
                    label: "Search",
                    type: "select",
                    name: "Search1",
                    defaultView: true,
                    dataOptions: [
                      { id: 1, data: "Sample Received Date" },
                      { id: 2, data: "Sample Collection Date" },
                      { id: 3, data: "Booking Date" },
                      { id: 4, data: "Delivery Date" },
                    ],
                  },
                ]}
              />
              <div className="flex gap-[0.25rem]">
                <InputGenerator
                  inputFields={[
                    {
                      label: "Status",
                      type: "select",
                      name: "Status",
                      defaultView: true,
                      dataOptions: [
                        { id: 1, status: "Pending" },
                        { id: 2, status: "Tested" },
                        { id: 3, status: "Approved" },
                        { id: 4, status: "Urgent" },
                        { id: 5, status: "Machine Result" },
                      ],
                    },
                    {
                      label: "Order By",
                      type: "select",
                      name: "OrderBy",
                      defaultView: true,
                      dataOptions: [
                        { id: 1, OrderBy: "Reg. Date" },
                        { id: 2, OrderBy: "Work Order" },
                        { id: 3, OrderBy: "Barcode No." },
                        { id: 4, OrderBy: "Dept. Received" },
                        { id: 5, OrderBy: "Test Name" },
                      ],
                    },
                  ]}
                />
              </div>
              <InputGenerator
                inputFields={[
                  {
                    label: "Search Barcode,Batch No.",
                    type: "text",
                    name: "Search",
                  },
                  {
                    label: "Test",
                    type: "select",
                    name: "Test",
                    dataOptions: [],
                  },
                  {
                    label: "Department",
                    type: "select",
                    name: "Department",
                    dataOptions: [],
                  },
                ]}
              />

              <SubmitButton text={"Search"} />
            </div>

            <LegendButtons statuses={statuses} />
          </form>
          <div style={{ maxHeight: "200px" }}>
            <DynamicTable
              rows={row}
              name="Result Track Details"
              //   loading={loading}
              tableStyle={{ marginBottom: "-10px" }}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div>
        </div>
        {UserObj && (
          <CustomHandsontable
            columns={columns1}
            rows={tableData}
            onEdit={setTableData}
            name="User Table"
          />
        )}
      </>
    </div>
  );
}
