import React, { useEffect, useState } from "react";
import DynamicTable, {
  TableHeader,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
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
              style={{ width: "30px", fontSize: "0.75rem" }}
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
              style={{ width: "30px", fontSize: "0.75rem" }}
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
  const columns1 = [
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
      field: `FromCentre`,
      headerName: `From Centre`,
      flex: 1,
    },
    {
      field: `VisitId`,
      headerName: `Visit Id`,
      flex: 1,
    },

    {
      field: `Barcode`,
      headerName: `Barcode No.`,
      flex: 1,
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
  console.log(UserObj);
  return (
    <div>
      <>
        {/* Header Section */}
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
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
              <div
                style={{ backgroundColor: "#6595ed" }}
                className="w-6 h-6 bg-grey-300 rounded-full "
              ></div>
              Collected
            </div>
            <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
              <div
                style={{ backgroundColor: "#ff6349" }}
                className="w-6 h-6 bg-grey-300 rounded-full "
              ></div>
              Rejected
            </div>

            <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
              <div
                style={{ backgroundColor: "rgb(74 74 74)" }}
                className="w-6 h-6 bg-grey-300 rounded-full "
              ></div>
              Pending
            </div>
            <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
              <div
                style={{ backgroundColor: "#ffb6c1" }}
                className="w-6 h-6 bg-grey-300 rounded-full "
              ></div>
              Tested
            </div>
            <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
              <div
                style={{ backgroundColor: "#ffff01" }}
                className="w-6 h-6 bg-grey-300 rounded-full "
              ></div>
              Hold
            </div>
            <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
              <div
                style={{ backgroundColor: "#05ca67" }}
                className="w-6 h-6 bg-grey-300 rounded-full "
              ></div>
              Approved
            </div>
            <div className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs">
              <div
                style={{ backgroundColor: "#bbf1f3" }}
                className="w-6 h-6 bg-grey-300 rounded-full "
              ></div>
              Printed
            </div>
          </div>
        </form>
        <div style={{ maxHeight: "200px" }}>
          <DynamicTable
            rows={row}
            name="Patient Information"
            //   loading={loading}
            tableStyle={{ marginBottom: "-10px" }}
            columns={columns}
            activeTheme={activeTheme}
          />
        </div>
        {UserObj && (
          <>
            <div
              className="w-full h-[0.10rem]"
              style={{ background: activeTheme?.menuColor }}
            ></div>
            <FormHeader title="Report Details" />
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-2 mt-2 mb-1 mx-1 lg:mx-2 items-end">
                  {/* Specimen Field */}
                  <div className="w-full sm:w-[48%] md:w-[15%]">
                    <InputGenerator
                      inputFields={[{ label: "Specimen", type: "text", name: "Specimen" }]}
                    />
                  </div>

                  {/* Biospy No. Field */}
                  <div className="w-full sm:w-[48%] md:w-[15%]">
                    <InputGenerator
                      inputFields={[{ label: "Biospy No.", type: "number", name: "BiospyNo" }]}
                    />
                  </div>

                  {/* Clinical History Field */}
                  <div className="w-full md:w-[30%]">
                    <InputGenerator
                      inputFields={[{ label: "Clinical History", type: "text", name: "ClinicalHistory" }]}
                    />
                  </div>
                  <InputGenerator
                    inputFields={[
                      { label: "Fixative Types", type: "text", name: "FixativeTypes" },
                      { label: "Block Keys", type: "text", name: "BlockKeys" },
                      { label: "Stains Performed", type: "text", name: "StainsPerformed" },
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
                  {/* <div className="flex gap-[0.25rem]">
                      
                    </div> */}
                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Save
                      </button>
                    </div>

                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Hold
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Approve
                      </button>
                    </div>

                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Print Report 
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Add Report 
                      </button>
                    </div>

                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Add Attachment
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Main List
                      </button>
                    </div>

                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Previous
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-[0.25rem]">
                    <div className="relative flex-1 flex justify-start items-center">
                      <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Next
                      </button>
                    </div>

                    <div className="relative flex-1 flex justify-start items-center">
                      {/* <button
                        type="button"
                        data-ripple-light="true"
                        className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                        style={{
                          background: activeTheme?.menuColor,
                          color: activeTheme?.iconColor,
                        }}
                      >
                        Clear
                      </button> */}
                    </div>
                  </div>
                  {/* <SubmitButton submit={false} text="Save" />
                  <SubmitButton submit={false} text="Hold" />
                  <SubmitButton submit={false} text="Approve" />
                  <SubmitButton submit={false} text="Print Report" />
                  <SubmitButton submit={false} text="Add Report" />
                  <SubmitButton submit={false} text="Add Attachment" />
                  <SubmitButton submit={false} text="Main List" />
                  <SubmitButton submit={false} text="Previous" />
                  <SubmitButton submit={false} text="Next" /> */}
                </div>
              </form>
            </div>
          </>
        )}
      </>
    </div>
  );
}
