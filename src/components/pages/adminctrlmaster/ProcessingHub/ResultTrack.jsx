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
                // setUserObj(params?.row);
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
          <div>
            <FormHeader title="Result Track" />
            <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-2 mt-2 mb-1 mx-1 lg:mx-2 items-end">
                {/* Specimen Field */}
                <div className="w-full sm:w-[48%] md:w-[15%]">
                  <InputGenerator
                    inputFields={[
                      { label: "Intrim", type: "select", name: "Intrim" },
                    ]}
                  />
                </div>
                {/* Biospy No. Field */}
                <div className="w-full sm:w-[48%] md:w-[15%]">
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Select Template",
                        type: "select",
                        name: "Template",
                      },
                    ]}
                  />
                </div>
                <div className="w-full sm:w-[48%] md:w-[15%]">
                  <InputGenerator
                    inputFields={[
                      {
                        label: "Colony Counts",
                        type: "text",
                        name: "ColonyCounts",
                      },
                    ]}
                  />
                </div>
                <InputGenerator
                  inputFields={[
                    {
                      label: "Enter Comments",
                      type: "text",
                      name: "Enter Comments",
                    },
                  ]}
                />
              </div>
            </form>
            <TableHeader title="" />
            <CustomeEditor
              value={editorContent} // Controlled value for the editor
              onContentChange={handleContentChange}
            />
            <FormHeader title="Organism" />
            <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-4 mx-1 lg:mx-2">
                <InputGenerator
                  inputFields={[
                    {
                      label: "Organism",
                      type: "select",
                      name: "Organism",
                      callBack: (e) => {
                        setOrganism((prev) => [...prev, e.target.value]);
                      },
                      dataOptions: [
                        { id: "E.coli", data: "E.coli" },
                        { id: "B.coli", data: "B.coli" },
                      ],
                    },
                  ]}
                />
                {Organism.reduce((acc, _, index, array) => {
                  if (index % 2 === 0) {
                    acc.push(array.slice(index, index + 2)); // Group every two items
                  }
                  return acc;
                }, []).map((pair, idx) => (
                  <TwoSubmitButton
                    key={idx}
                    options={pair.map((item) => ({
                      label: `Delete ${item}`,
                      submit: false,
                      callBack: () => console.log(`${item} clicked`),
                    }))}
                  />
                ))}
              </div>
            </form>
            <div className="flex flex-col md:flex-row justify-start items-center w-full gap-2">
              <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
                <thead
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <tr>
                    {[
                      {
                        field: "Antibiotic",
                        headerName: "Antibiotic",
                        flex: 1,
                      },
                      {
                        field: "Interpretation",
                        headerName: "Interpretation",
                        width: 170,
                        renderCell: (params) => {
                          // console.log(params.row)
                          return (
                            <div
                              style={{
                                display: "flex",
                                gap: "20px",
                                fontSize: "15px",
                              }}
                            >
                              <InputGenerator
                                inputFields={[
                                  {
                                    label: "",
                                    type: "select",
                                    dataOptions: [
                                      { id: 1, data: "Option A" },
                                      { id: 2, data: "Option B" },
                                      { id: 3, data: "Option C" },
                                    ],
                                  },
                                ]}
                              />
                            </div>
                          );
                        },
                      },
                      {
                        field: "Mic",
                        headerName: "Mic",
                        width: 150,
                        renderCell: (params) => {
                          // console.log(params.row)
                          return (
                            <div
                              style={{
                                display: "flex",
                                gap: "20px",
                                fontSize: "15px",
                              }}
                            >
                              <InputGenerator
                                inputFields={[
                                  {
                                    label: "",
                                    type: "text",
                                  },
                                ]}
                              />
                            </div>
                          );
                        },
                      },
                    ].map((col, index) => (
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
                  {[{ Antibiotic: "Amicasin" }].map((row, index) => (
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
                      {[
                        {
                          field: "Antibiotic",
                          headerName: "Antibiotic",
                          flex: 1,
                        },
                        {
                          field: "Interpretation",
                          headerName: "Interpretation",
                          width: 170,
                          renderCell: (params) => {
                            // console.log(params.row)
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  fontSize: "15px",
                                }}
                              >
                                <InputGenerator
                                  inputFields={[
                                    {
                                      label: "",
                                      type: "select",
                                      dataOptions: [
                                        { id: 1, data: "Option A" },
                                        { id: 2, data: "Option B" },
                                        { id: 3, data: "Option C" },
                                      ],
                                    },
                                  ]}
                                />
                              </div>
                            );
                          },
                        },
                        {
                          field: "Mic",
                          headerName: "Mic",
                          width: 150,
                          renderCell: (params) => {
                            // console.log(params.row)
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  fontSize: "15px",
                                }}
                              >
                                <InputGenerator
                                  inputFields={[
                                    {
                                      label: "",
                                      type: "text",
                                    },
                                  ]}
                                />
                              </div>
                            );
                          },
                        },
                      ].map((col, idx) => (
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
                    {[
                      {
                        field: "Antibiotic",
                        headerName: "Antibiotic",
                        flex: 1,
                      },
                      {
                        field: "Interpretation",
                        headerName: "Interpretation",
                        width: 170,
                        renderCell: (params) => {
                          // console.log(params.row)
                          return (
                            <div
                              style={{
                                display: "flex",
                                gap: "20px",
                                fontSize: "15px",
                              }}
                            >
                              <InputGenerator
                                inputFields={[
                                  {
                                    label: "",
                                    type: "select",
                                    dataOptions: [
                                      { id: 1, data: "Option A" },
                                      { id: 2, data: "Option B" },
                                      { id: 3, data: "Option C" },
                                    ],
                                  },
                                ]}
                              />
                            </div>
                          );
                        },
                      },
                      {
                        field: "Mic",
                        headerName: "Mic",
                        width: 150,
                        renderCell: (params) => {
                          // console.log(params.row)
                          return (
                            <div
                              style={{
                                display: "flex",
                                gap: "20px",
                                fontSize: "15px",
                              }}
                            >
                              <InputGenerator
                                inputFields={[
                                  {
                                    label: "",
                                    type: "text",
                                  },
                                ]}
                              />
                            </div>
                          );
                        },
                      },
                    ].map((col, index) => (
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
                  {[{ Antibiotic: "Amicasin" }].map((row, index) => (
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
                      {[
                        {
                          field: "Antibiotic",
                          headerName: "Antibiotic",
                          flex: 1,
                        },
                        {
                          field: "Interpretation",
                          headerName: "Interpretation",
                          width: 170,
                          renderCell: (params) => {
                            // console.log(params.row)
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  fontSize: "15px",
                                }}
                              >
                                <InputGenerator
                                  inputFields={[
                                    {
                                      label: "",
                                      type: "select",
                                      dataOptions: [
                                        { id: 1, data: "Option A" },
                                        { id: 2, data: "Option B" },
                                        { id: 3, data: "Option C" },
                                      ],
                                    },
                                  ]}
                                />
                              </div>
                            );
                          },
                        },
                        {
                          field: "Mic",
                          headerName: "Mic",
                          width: 150,
                          renderCell: (params) => {
                            // console.log(params.row)
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  fontSize: "15px",
                                }}
                              >
                                <InputGenerator
                                  inputFields={[
                                    {
                                      label: "",
                                      type: "text",
                                    },
                                  ]}
                                />
                              </div>
                            );
                          },
                        },
                      ].map((col, idx) => (
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
            {/* Scrollable section starts here */}
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-4 mx-1 lg:mx-2">
                  {/* Specimen Field */}
                  <InputGenerator
                    inputFields={[
                      { label: "Signature", type: "select", name: "Signature" },
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
            {/* Scrollable section ends here */}
          </div>
        )}
      </>
    </div>
  );
}
