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

export default function HistoResultTrack() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [editorContent1, setEditorContent1] = useState("");
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
  //accept child to parent in editor
  const handleContentChange1 = (content) => {
    // Update editor content
    setCommentMasterData((preventDefault) => ({
      ...preventDefault,
      template: content,
    }));
    //setEditorContent(content);
  };
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
        {/* Header Section */}
        <div>
          <FormHeader title="Histo Result Track" />
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
              name="Patient Information"
              //   loading={loading}
              tableStyle={{ marginBottom: "-6px" }}
              columns={columns}
              activeTheme={activeTheme}
            />
          </div>
        </div>
        {UserObj && (
          <div>
            <FormHeader title="Report Details" />
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-2 mt-2 mb-1 mx-1 lg:mx-2 items-end">
                  {/* Specimen Field */}
                  <div className="w-full sm:w-[48%] md:w-[15%]">
                    <InputGenerator
                      inputFields={[
                        { label: "Specimen", type: "text", name: "Specimen" },
                      ]}
                    />
                  </div>

                  {/* Biospy No. Field */}
                  <div className="w-full sm:w-[48%] md:w-[15%]">
                    <InputGenerator
                      inputFields={[
                        {
                          label: "Biospy No.",
                          type: "number",
                          name: "BiospyNo",
                        },
                      ]}
                    />
                  </div>

                  {/* Clinical History Field */}
                  <div className="w-full md:w-[30%]">
                    <InputGenerator
                      inputFields={[
                        {
                          label: "Clinical History",
                          type: "text",
                          name: "ClinicalHistory",
                        },
                      ]}
                    />
                  </div>
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Fixative Types",
                        type: "text",
                        name: "FixativeTypes",
                      },
                      { label: "Block Keys", type: "text", name: "BlockKeys" },
                      {
                        label: "Stains Performed",
                        type: "text",
                        name: "StainsPerformed",
                      },
                    ]}
                  />
                </div>
              </form>
              <TableHeader title="Gross" />
              <CustomeEditor
                value={editorContent} // Controlled value for the editor
                onContentChange={handleContentChange}
              />
              <TableHeader title="Microscopy" />
              <CustomeEditor
                value={editorContent1} // Controlled value for the editor
                onContentChange={handleContentChange1}
              />
              <TableHeader title="Final Impression" />
              <CustomeEditor
                value={editorContent1} // Controlled value for the editor
                onContentChange={handleContentChange1}
              />
              <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-2 mt-2 mb-1 mx-1 lg:mx-2 items-end">
                  {/* Specimen Field */}
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Comments",
                        type: "text",
                        name: "Comments",
                      },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-4  mx-1 lg:mx-2">
                  {/* Specimen Field */}
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Select Dr. Signature",
                        type: "select",
                        name: "Dr",
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Save",
                        submit: true,
                        callBack: () => console.log("Save clicked"),
                      },
                      {
                        label: "Hold",
                        submit: false,
                        callBack: () => console.log("Hold clicked"),
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Approve",
                        submit: true,
                        callBack: () => console.log("Approve clicked"),
                      },
                      {
                        label: "Print Report",
                        submit: false,
                        callBack: () => console.log("Print Report clicked"),
                      },
                    ]}
                  />

                  <TwoSubmitButton
                    options={[
                      {
                        label: "Add Report",
                        submit: true,
                        callBack: () => console.log("Add Report clicked"),
                      },
                      {
                        label: "Add Attachment",
                        submit: false,
                        callBack: () => console.log("Add Attachment clicked"),
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Main List",
                        submit: true,
                        callBack: () => console.log("Main List clicked"),
                      },
                      {
                        label: "Previous",
                        submit: false,
                        callBack: () => console.log("Previous clicked"),
                      },
                    ]}
                  />
                  <TwoSubmitButton
                    options={[
                      {
                        label: "Next",
                        submit: true,
                        callBack: () => console.log("Next clicked"),
                      },
                    ]}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
