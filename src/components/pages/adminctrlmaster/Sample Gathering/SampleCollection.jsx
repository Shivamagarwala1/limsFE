import React, { useEffect, useState } from "react";
import DynamicTable from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import UrgentGif from "../../../../assets/UrgentGif.gif";
import RemarkGif from "../../../../assets/RemarkGif.gif";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import { useGetData, usePostData } from "../../../../service/apiService";
import {
  SampleCollectionCommentPopupModal,
  SampleCollectionRejectPopupModal,
  SampleCollectionRemarkPopupModal,
} from "../../../../Custom Components/PopupModal";
import { Clipboard, getLocal, setLocal } from "usehoks";
import {
  addObjectId,
  SampleCollectionStatus,
} from "../../../../service/RedendentData";
import { LegendButtons } from "../../../../Custom Components/LegendButtons";
import toast from "react-hot-toast";
import { FaCommentDots, FaRegCopy } from "react-icons/fa";

export default function SampleCollection() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [RejectPopup, setRejectPopup] = useState(false);
  const [RemarkPopup, setRemarkPopup] = useState(false);
  const [AllCollected, setAllCollected] = useState([]);
  const [AllReceived, setAllReceived] = useState([]);
  const [SampleType, setSampleType] = useState({});
  const [Row, setRow] = useState({});
  const AllCenterData = useGetData();
  const BulkPostData = usePostData();
  const PostData = usePostData();
  const [dynamicSampleTypeIds, setDynamicSampleTypeIds] = useState({});
  const { copied, copyToClipboard } = Clipboard();
  const [showStates, setShowStates] = useState({});

  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
  }, []);
  console.log(AllCollected);
  const updatedArray = addObjectId(PostData?.data);
  let PayloadData = getLocal("payload");
  const columns = [
    {
      field: "id",
      headerName: "Sr. No",
      width: 20,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>{params?.row?.id}</div>
            {params?.row?.urgent == 1 && (
              <img style={{ width: "20px" }} src={UrgentGif} alt="Urgent Gif" />
            )}
          </div>
        );
      },
    },
    {
      field: `centreName`,
      headerName: `Centre Code`,
      flex: 1,
    },
    {
      field: `departmentName`,
      headerName: `Department`,
      flex: 1,
    },
    {
      field: `patientId`,
      headerName: `Visit Id`,
      flex: 1,
    },
    {
      field: `patientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `age`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `investigationName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `Barcode`,
      headerName: `Barcode No.`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <SubmitButton
              callBack={() => {
                alert("Printing");
              }}
              style={{ width: "70px" }}
              submit={false}
              text={params?.row?.barcodeNo}
            />
            <div
              onClick={() => {
                copyToClipboard(params?.row?.barcodeNo);
                toast.success("Copied");
              }}
              className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
              style={{
                background: activeTheme?.menuColor,
                color: activeTheme?.iconColor,
              }}
            >
              <FaRegCopy />
            </div>
          </div>
        );
      },
    },
    {
      field: `Sample Type`,
      headerName: `Sample Type`,
      flex: 1,
      renderCell: (params) => {
        const sampleTypeData = params?.row?.sampletypedata;
        const sampleTypeId =
          dynamicSampleTypeIds[params.row.id] || params.row.sampleTypeId;

        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <InputGenerator
              inputFields={[
                {
                  defaultView:true,
                  type: "select",
                  value: sampleTypeId,
                  callBack: (e) => {
                    const id = e.target.value;
                    const filterType = sampleTypeData?.filter(
                      (item) => item?.sampleTypeId == id
                    );
                    setSampleType(filterType[0]);
                    // {
                    //   params?.row?.isSampleCollected !== "S" &&
                    setDynamicSampleTypeIds((prev) => ({
                      ...prev,
                      [params.row.id]: id,
                    }));
                    // }
                    params.row.sampleTypeId = id;
                    setRow((prevRow) => ({ ...prevRow, sampleTypeId: id }));
                  },
                  dataOptions: sampleTypeData,
                },
              ]}
            />
            <div
              onClick={() => {
                copyToClipboard(params?.row?.barcodeNo);
                toast.success("Copied");
              }}
              className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
              style={{
                background: params?.row?.containercolor,
              }}
            >
              {/* <FaRegCopy /> */}
            </div>
          </div>
        );
      },
    },
    {
      headerName: `Sample Coll.`,
      flex: 1,
      renderCell: (params) => {
        const lsData = getLocal("imarsar_laboratory");
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <input
              type="checkbox"
              checked={
                params?.row?.isSampleCollected === "S" ||
                params?.row?.isSampleCollected === "Y"
                  ? false
                  : AllCollected.some((item) => item.id === params?.row.id)
              }
              disabled={
                params?.row?.isSampleCollected === "S" ||
                params?.row?.isSampleCollected === "Y"
              }
              onClick={() =>
                setAllCollected(
                  (prev) =>
                    prev.some((item) => item.id === params?.row.id)
                      ? prev.filter((item) => item.id !== params?.row.id) // Remove if exists
                      : [
                          ...prev,
                          {
                            ...params?.row,
                            isSampleCollected: "S",
                            empId: lsData?.user?.employeeId,
                          },
                        ] // Add if not
                )
              }
            />
            {params?.row?.isSampleCollected === "S" ||
            params?.row?.isSampleCollected === "Y"
              ? "Collected"
              : "Not Collected"}
          </div>
        );
      },
      renderHeaderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <p>Sample Collected</p> {/* <input type="checkbox" /> */}
          </div>
        );
      },
    },
    {
      field: `Sample Rec.`,
      headerName: `Sample Rec.`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <input
              type="checkbox"
              disabled={params?.row?.isSampleCollected !== "S"}
              checked={
                params?.row?.isSampleCollected === "Y"
                  ? false
                  : AllReceived.some((item) => item.id === params?.row.id)
              }
              onClick={() => {
                const lsData = getLocal("imarsar_laboratory");
                setAllReceived(
                  (prev) =>
                    prev.some((item) => item.id === params?.row.id)
                      ? prev.filter((item) => item.id !== params?.row.id) // Remove if exists
                      : [
                          ...prev,
                          {
                            ...params?.row,
                            isSampleCollected: "Y",
                            empId: lsData?.user?.employeeId,
                          },
                        ] // Add if not
                );
              }}
            />
            {params?.row?.isSampleCollected === "Y"
              ? "Received"
              : "Not Received"}
          </div>
        );
      },
    },
    {
      field: `Reject`,
      headerName: `Reject`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <SubmitButton
              submit={false}
              text={"R"}
              callBack={() => {
                setRow({ ...params?.row, ...SampleType });
                setRejectPopup(true);
              }}
              style={{ width: "30px", fontSize: "0.75rem" }}
            />
            {/* <ImCross /> */}
          </div>
        );
      },
    },
    {
      field: `Remark`,
      headerName: `Remark`,
      flex: 1,
      renderCell: (params) => {
        // console.log(params.row)
        return (
          <div
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "15px",
              alignItems: "center",
            }}
          >
            <SubmitButton
              submit={false}
              text={"+"}
              callBack={() => {
                setRow({ ...params?.row, ...SampleType });
                setRemarkPopup(true);
              }}
              style={{ width: "30px", fontSize: "0.75rem" }}
            />
            {params?.row?.isremark > 0 && (
              <img style={{ width: "20px" }} src={RemarkGif} alt="Remark Gif" />
            )}
          </div>
        );
      },
    },
    {
      field: `comment`,
      headerName: `Comments`,
      flex: 1,
      renderCell: (params) => {
        const rowId = params.row.id;
        const isShown = showStates[rowId] || false;

        const hideComment = ()=>{
          setShowStates((prev) => ({
            ...prev,
            [rowId]: !isShown,
          }));
        }
        return (
          <>
            <SampleCollectionCommentPopupModal
              setShowPopup={hideComment}
              showPopup={isShown}
              comment={params?.row?.comment}
            />
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {params?.row?.comment?.slice(0, 10)}...
              {/* {isShown && <>{params?.row?.comment?.slice(10)}</>} */}
              {params?.row?.comment.length > 0 && (
                <div
                  onClick={() => {
                    setShowStates((prev) => ({
                      ...prev,
                      [rowId]: !isShown,
                    }));
                  }}
                  className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <FaCommentDots />
                </div>
              )}
            </div>
          </>
        );
      },
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = getValues();
    const lsData = getLocal("imarsar_laboratory");
    const payload = {
      ...values,
      empId: lsData?.user?.employeeId,
      createdById: lsData?.user?.employeeId,
      centreId: values?.centreId || "0",
    };
    setLocal("payload", payload);
    console.log(payload);
    PostData?.postRequest("/tnx_BookingItem/GetSampleProcessingData", payload);
    console.log(PostData?.data);
  };

  const statuses = [
    {
      Data: 11,
      CallBack: () => {
        // Pending
        const data = { ...PayloadData, status: "N" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 1,
      CallBack: () => {
        // Collected
        const data = { ...PayloadData, status: "S" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 24,
      CallBack: () => {
        // Received
        const data = { ...PayloadData, status: "Y" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 3,
      CallBack: () => {
        // Rejected
        const data = { ...PayloadData, status: "R" };
        LegendButtonSearch(data);
      },
    },
    {
      Data: 25,
      CallBack: () => {
        // Urgent
        const data = { ...PayloadData, status: "U" };
        LegendButtonSearch(data);
      },
    },
  ];

  const update = async () => {
    try {
      const res = await BulkPostData?.postRequest(
        "/tnx_BookingItem/UpdateSampleStatus",
        AllCollected
      );
      if (res?.success) {
        toast.success(res?.message);
        setAllCollected([]);
      } else {
        toast.error(res?.message);
      }
      PostData?.postRequest(
        "/tnx_BookingItem/GetSampleProcessingData",
        PayloadData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const recieveUpdate = async () => {
    try {
      const res = await BulkPostData?.postRequest(
        "/tnx_BookingItem/UpdateSampleStatus",
        AllReceived
      );
      if (res?.success) {
        toast.success(res?.message);
        setAllReceived([]);
      } else {
        toast.error(res?.message);
      }
      PostData?.postRequest(
        "/tnx_BookingItem/GetSampleProcessingData",
        PayloadData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const LegendButtonSearch = async (Data) => {
    try {
      PostData?.postRequest("/tnx_BookingItem/GetSampleProcessingData", Data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <SampleCollectionRemarkPopupModal
        setShowPopup={setRemarkPopup}
        showPopup={RemarkPopup}
        rowData={Row}
      />
      <SampleCollectionRejectPopupModal
        rowData={Row}
        setShowPopup={setRejectPopup}
        showPopup={RejectPopup}
      />

      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Sample Collection</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Centre",
                type: "select",
                name: "centreId",
                dataOptions: AllCenterData?.data,
              },
              {
                label: "From Date",
                type: "customDateField",
                name: "fromDate",
              },
              {
                label: "To Date",
                type: "customDateField",
                name: "toDate",
              },
              {
                label: "Barcode",
                type: "text",
                name: "barcodeNo",
              },
              {
                label: "Status",
                type: "select",
                name: "status",
                keyField: "value",
                defaultView: true,
                dataOptions: SampleCollectionStatus,
              },
            ]}
          />
          <TwoSubmitButton options={[{ label: "Search", submit: true }]} />
          {/* <SubmitButton text={"Search"} /> */}
        </div>
        <LegendButtons statuses={statuses} />
      </form>
      <div style={{ maxHeight: "350px", overflowY: "auto" }}>
        <DynamicTable
          rows={updatedArray}
          name="Sample Details"
          loading={PostData?.loading}
          columns={columns}
          legendColors={true}
        />
      </div>

      {PostData?.data.length !== 0 && (
        <div className="flex gap-3 mb-4 flex-row items-end justify-end mx-2">
          <TwoSubmitButton
            options={[
              {
                submit: false,
                label: "Sample Collection",
                style: { width: "120px" },
                callBack: () => {
                  update();
                },
              },
              {
                submit: false,
                label: "Sample Receive",
                style: { width: "120px" },
                callBack: () => {
                  recieveUpdate();
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
