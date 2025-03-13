import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { IoMdImages, IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { uploadReportLetterHead } from "../../listData/listData";
import toast from "react-hot-toast";
import { FaRegEdit, FaSpinner } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import useRippleEffect from "../../customehook/useRippleEffect";
import { useGetData, usePostData } from "../../../service/apiService";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { FormHeader } from "../../../Custom Components/FormGenerator";
import { TwoSubmitButton } from "../../../Custom Components/InputGenerator";
import DynamicTable, {
  TableHeader,
  UpdatedDynamicTable,
} from "../../../Custom Components/DynamicTable";
import { ImagePopup } from "../../../Custom Components/PopupModal";
import { addObjectId, addRandomObjectId } from "../../../service/RedendentData";
import { MdDelete } from "react-icons/md";

export default function UploadReportLetterHead() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  useRippleEffect();

  const [isEdit, setIsEdit] = useState(false);
  const [Img, setImg] = useState("");
  const [Img1, setImg1] = useState("");
  const [Img2, setImg2] = useState("");
  const [Img3, setImg3] = useState("");
  const [Img4, setImg4] = useState("");
  const [imageView, setImageView] = useState(false);
  const [IsBase64, setIsBase64] = useState(false);
  const [BookingId, setBookingId] = useState("");
  const [BookingValue, setBookingValue] = useState("");
  const [BookingDropDown, setBookingDropDown] = useState(false);
  const [BookingHoveIndex, setBookingHoveIndex] = useState(null);
  const [BookingSelectedOption, setBookingSelectedOption] = useState("");
  const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
  const [uploadReportLetterHeadData, setUploadReportLetterHeadData] = useState({
    centreId: BookingId,
    reporrtHeaderHeightY: 0,
    receiptHeaderY: 0,
    patientYHeader: 0,
    barcodeXPosition: 0,
    barcodeYPosition: 0,
    qrCodeXPosition: 0,
    qrCodeYPosition: 0,
    isQRheader: 0,
    isBarcodeHeader: 0,
    footerHeight: 0,
    nabLxPosition: 0,
    nabLyPosition: 0,
    docSignYPosition: 0,
    receiptHeaderY: 0,
    reportHeader: "",
    reciptHeader: "",
    reciptFooter: "",
    rWaterMark: "",
  });

  //   const [FillerData, setFillerData] = useState([]);
  const [allCentreData, setAllCentreData] = useState([]);
  const [singleCentreData, setSingleCentreData] = useState("");
  const [isHovered, setIsHovered] = useState(null);
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [flag, setFlag] = useState(false);
  const imgRef = useRef();
  const imgRefForReciptHeader = useRef();
  const imgRefForReciptFooter = useRef();
  const imgRefForRWaterMark = useRef();

  const CenterData = useGetData();
  const FillerData = useGetData();
  const GridData = useGetData();
  const PostData = usePostData();
  const DeleteData = usePostData();
  const openShowSearchBarDropDown = (val) => {
    setShowSearchBarDropDown(val);
  };

  useEffect(() => {
    const getAllCentreData = async () => {
      await CenterData?.fetchData("centreMaster");
      await GridData?.fetchData("/centreMaster/GetLetterHeaddetailall");
    };

    getAllCentreData();
  }, [BookingId, flag]);

  const handleOptionClick3 = async (name, id) => {
    setBookingValue(name);
    setBookingId(id);
    setIsEdit(true);
    await sessionStorage.setItem("BookingId", JSON.stringify(id));
    setBookingSelectedOption(name);
    setBookingDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setBookingValue(e.target.value);
    setBookingDropDown(true); // Show dropdown when typing
  };

  const handelOnChangeuploadReportLetterHeadData = (event) => {
    setUploadReportLetterHeadData((preventData) => ({
      ...preventData,
      [event.target.name]: event.target.value,
    }));
  };

  const handelImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL
      setUploadReportLetterHeadData({ reportHeader: imageUrl }); // Set the image for preview
      setImg1(imageUrl);
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Extract Base64
        setUploadReportLetterHeadData((prevData) => ({
          ...prevData,
          reportHeader: base64String, // Store Base64 string
        }));
      };

      reader.readAsDataURL(file); // Convert PDF to Base64
    }
  };

  const handelClickImage = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const handelImageChangeForLetterHead = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg1(imageUrl); // Set the image for preview
      setIsBase64(false);
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Extract Base64
        setUploadReportLetterHeadData((prevData) => ({
          ...prevData,
          reportHeader: base64String, // Store Base64 string
        }));
      };

      reader.readAsDataURL(file); // Convert PDF to Base64
    }
  };

  const handelImageChangeForReceiptHeader = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg2(imageUrl); // Set the image for preview
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Extract Base64
        setUploadReportLetterHeadData((prevData) => ({
          ...prevData,
          reciptHeader: base64String, // Store Base64 string
        }));
      };

      reader.readAsDataURL(file); // Convert PDF to Base64
    }
  };

  const handelImageChangeForReceiptFooter = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg3(imageUrl); // Set the image for preview
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Extract Base64
        setUploadReportLetterHeadData((prevData) => ({
          ...prevData,
          reciptFooter: base64String, // Store Base64 string
        }));
      };

      reader.readAsDataURL(file); // Convert PDF to Base64
    }
  };

  const handelImageChangeForRwaterMark = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg4(imageUrl);
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Extract Base64
        setUploadReportLetterHeadData((prevData) => ({
          ...prevData,
          rWaterMark: base64String, // Store Base64 string
        }));
      };

      reader.readAsDataURL(file); // Convert PDF to Base64
    }
  };

  const openPDF = (base64String) => {
    if (!base64String) return;

    toast.success("ghjkl");
    // Convert Base64 to a Blob
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a URL for the Blob and open it in a new tab
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  //save upload report letter
  const onSubmitUploadReportLetterHead = async () => {
    setIsButtonClick(1);

    console.log(uploadReportLetterHeadData);
    const transformedData = {
      centreId: uploadReportLetterHeadData.centreId || 0,
      reporrtHeaderHeightY:
        parseInt(uploadReportLetterHeadData.reporrtHeaderHeightY) || 0,
      receiptHeaderY: parseInt(uploadReportLetterHeadData.receiptHeaderY),
      patientYHeader: parseInt(uploadReportLetterHeadData.patientYHeader) || 0,
      barcodeXPosition:
        parseInt(uploadReportLetterHeadData.barcodeXPosition) || 0,
      barcodeYPosition:
        parseInt(uploadReportLetterHeadData.barcodeYPosition) || 0,
      qrCodeXPosition:
        parseInt(uploadReportLetterHeadData.qrCodeXPosition) || 0,
      qrCodeYPosition:
        parseInt(uploadReportLetterHeadData.qrCodeYPosition) || 0,
      isQRheader: parseInt(uploadReportLetterHeadData.isQRheader) || 0,
      isBarcodeHeader:
        parseInt(uploadReportLetterHeadData.isBarcodeHeader) || 0,
      footerHeight: parseInt(uploadReportLetterHeadData.footerHeight) || 0,
      nabLxPosition: parseInt(uploadReportLetterHeadData.nabLxPosition) || 0,
      nabLyPosition: parseInt(uploadReportLetterHeadData.nabLyPosition) || 0,
      docSignYPosition:
        parseInt(uploadReportLetterHeadData.docSignYPosition) || 0,
      receiptHeaderY: parseInt(uploadReportLetterHeadData.receiptHeaderY) || 0,
      reportHeader: uploadReportLetterHeadData.reportHeader || "string",
      reciptHeader: uploadReportLetterHeadData.reciptHeader || "string",
      reciptFooter: uploadReportLetterHeadData.reciptFooter || "string",
      waterMarkImage: uploadReportLetterHeadData.rWaterMark || "string",
      nablImage: "", // Since nablImage is missing in input, setting it to an empty string
    };

    try {
      //   const response = await saveUploadReportLetterHeadApi(
      //     uploadReportLetterHeadData
      //   );
      const response = await PostData?.postRequest(
        "/centreMaster/SaveLetterHead",
        transformedData
      );

      if (response?.success) {
        toast.success(response?.message);
        setUploadReportLetterHeadData({
          centreId: 0,
          reporrtHeaderHeightY: 0,
          receiptHeaderY: 0,
          patientYHeader: 0,
          barcodeXPosition: 0,
          barcodeYPosition: 0,
          qrCodeXPosition: 0,
          qrCodeYPosition: 0,
          isQRheader: 0,
          isBarcodeHeader: 0,
          footerHeight: 0,
          nabLxPosition: 0,
          nabLyPosition: 0,
          docSignYPosition: 0,
          receiptHeaderY: 0,
          reportHeader: "",
          reciptHeader: "",
          reciptFooter: "",
          rWaterMark: "",
        });
        setFlag(!flag);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }

    setIsButtonClick(0);
  };

  useEffect(() => {
    const getAllData = async () => {
      let res = await FillerData?.fetchData(
        `/centreMaster/GetLetterHeaddetails?CentreId=${BookingId}`
      );
      
      if (!CenterData?.data) {
        console.error("CenterData is undefined or empty.");
        return;
      }
      
      if (res?.data?.data.length === 0) {
        res = await FillerData?.fetchData(
          `/centreMaster/GetLetterHeaddetails?CentreId=1`
        );
      }
            
      const data = CenterData.data.find((item) => item?.centreId === BookingId);
      console.log(data);
      setBookingValue(data?.companyName || "");
      
      await setUploadReportLetterHeadData({
        centreId: BookingId,
        reporrtHeaderHeightY: res?.data?.data[0]?.reporrtHeaderHeightY,
        patientYHeader: res?.data?.data[0]?.patientYHeader,
        barcodeXPosition: res?.data?.data[0]?.barcodeXPosition,
        barcodeYPosition: res?.data?.data[0]?.barcodeYPosition,
        qrCodeXPosition: res?.data?.data[0]?.qrCodeXPosition,
        qrCodeYPosition: res?.data?.data[0]?.qrCodeYPosition,
        isQRheader: res?.data?.data[0]?.isQRheader,
        isBarcodeHeader: res?.data?.data[0]?.isBarcodeHeader,
        footerHeight: res?.data?.data[0]?.footerHeight,
        nabLxPosition: res?.data?.data[0]?.nabLxPosition,
        nabLyPosition: res?.data?.data[0]?.nabLyPosition,
        docSignYPosition: res?.data?.data[0]?.docSignYPosition,
        receiptHeaderY: res?.data?.data[0]?.receiptHeaderY,
        reportHeader: res?.data?.data[0]?.reportHeader,
        reciptHeader: res?.data?.data[0]?.reciptHeader,
        reciptFooter: res?.data?.data[0]?.reciptFooter,
        rWaterMark: res?.data?.data[0]?.waterMarkImage,
      });
      setImg1(res?.data?.data[0]?.reportHeader);
      setImg2(res?.data?.data[0]?.reciptHeader);
      setImg3(res?.data?.data[0]?.reciptFooter);
      setImg4(res?.data?.data[0]?.waterMarkImage);
      setIsBase64(true);
      setFlag(!flag);
    };

    if (BookingId !== "") {
      getAllData();
      const data = {
        target: {
          name: "centreId",
          value: BookingId,
        },
      };
      handelOnChangeuploadReportLetterHeadData(data);
    }
  }, [BookingId]);

  const columns = [
    {
      field: "Random",
      headerName: "Sr. No.",
      flex: 1,
    },

    {
      field: "",
      width: 100,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="w-4 h-4 flex justify-center items-center">
              <FaRegEdit
                className={`w-full h-full ${
                  true
                    ? "text-blue-500 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  setBookingId(params?.row?.centreId);
                  // setBookingId(11);
                  setIsEdit(true);
                }}
              />
            </button>
            <button
              className={`w-4 h-4 flex justify-center items-center ${
                params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              <MdDelete
                className="w-full h-full"
                onClick={() => {
                  handleDelete(params?.row?.centreId);
                }}
              />
            </button>
          </div>
        );
      },
    },
    {
      field: "companyName",
      headerName: "Center Name",
      flex: 1,
    },
    {
      field: "reporrtHeaderHeightY",
      headerName: "Report Header Height Y",
      flex: 1,
    },
    { field: "patientYHeader", headerName: "Patient Y Header", flex: 1 },
    { field: "barcodeXPosition", headerName: "Barcode X Position", flex: 1 },
    { field: "barcodeYPosition", headerName: "Barcode Y Position", flex: 1 },
    { field: "qrCodeXPosition", headerName: "QR Code X Position", flex: 1 },
    { field: "qrCodeYPosition", headerName: "QR Code Y Position", flex: 1 },
    { field: "isQRheader", headerName: "Is QR Header", flex: 1 },
    { field: "isBarcodeHeader", headerName: "Is Barcode Header", flex: 1 },
    { field: "footerHeight", headerName: "Footer Height", flex: 1 },
    { field: "nabLxPosition", headerName: "NABL X Position", flex: 1 },
    { field: "nabLyPosition", headerName: "NABL Y Position", flex: 1 },
    { field: "docSignYPosition", headerName: "Doc Sign Y Position", flex: 1 },
    { field: "receiptHeaderY", headerName: "Receipt Header Y", flex: 1 },
    {
      field: "reportHeader",
      headerName: "Report Header",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.reportHeader && params?.row?.reportHeader !== "" && (
              <div
                className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                onClick={() => {
                  setImg(`data:image/png;base64,${params?.row?.reportHeader}`);
                  setImageView(true);
                }}
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <IoMdImages
                  style={{ fontSize: "10px" }}
                  className="w-4 h-4 font-semibold"
                />
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "reciptHeader",
      headerName: "Receipt Header",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.reciptHeader && params?.row?.reciptHeader !== "" && (
              <div
                className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                onClick={() => {
                  setImg(`data:image/png;base64,${params?.row?.reciptHeader}`);
                  setImageView(true);
                }}
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <IoMdImages className="w-4 h-4 font-semibold" />
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "reciptFooter",
      headerName: "Receipt Footer",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.reciptFooter && params?.row?.reciptFooter !== "" && (
              <div
                className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                onClick={() => {
                  setImg(`data:image/png;base64,${params?.row?.reciptFooter}`);
                  setImageView(true);
                }}
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <IoMdImages className="w-4 h-4 font-semibold" />
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "waterMarkImage",
      headerName: "Watermark Image",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.waterMarkImage &&
              params?.row?.waterMarkImage !== "" && (
                <div
                  className="h-[1.05rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  onClick={() => {
                    setImg(
                      `data:image/png;base64,${params?.row?.waterMarkImage}`
                    );
                    setImageView(true);
                  }}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <IoMdImages className="w-4 h-4 font-semibold" />
                </div>
              )}
          </>
        );
      },
    },
    // { field: "nablImage", headerName: "NABL Image", flex:1 },
  ];

  const handleDelete = async (id) => {
    const res = await DeleteData?.postRequest(
      `/centreMaster/DeleteLetterHeadDetail?CentreId=${id}`
    );
    if (res?.success) {
      setFlag(!flag);
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };
  const GridShow = addRandomObjectId(GridData?.data?.data || []);

  // console.log("img1 ", GridShow);
  return (
    <>
      <div>
        <ImagePopup
          Img={Img}
          setImageView={setImageView}
          imageView={imageView}
        />{" "}
        {/* Header Section */}
        <FormHeader title={"Upload Report Letter Head"} />
        {/* form data */}
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            <div className="flex gap-[0.25rem]">
              {/* Centre */}
              <SearchBarDropdown
                id="search-bar"
                name="BookingValue"
                value={BookingValue}
                onChange={handleSearchChange3}
                placeholder="Search Center"
                label="Booking Center"
                options={CenterData?.data}
                showValueField="companyName"
                keyField="centreId"
                isRequired={false}
                showSearchBarDropDown={BookingDropDown}
                setShowSearchBarDropDown={setBookingDropDown}
                handleOptionClickForCentre={handleOptionClick3}
                setIsHovered={setBookingHoveIndex}
                isHovered={BookingHoveIndex}
                style={{ marginTop: "2px" }}
              />
              <div className="relative flex-1">
                <input
                  type="text"
                  id="receiptHeaderY"
                  name="receiptHeaderY"
                  value={uploadReportLetterHeadData?.receiptHeaderY || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="receiptHeaderY" className="menuPeerLevel">
                  Receipt Header Y
                </label>
              </div>
            </div>

            <div className="flex gap-[0.25rem]">
              {/* Report HdrH. Y */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="reporrtHeaderHeightY"
                  name="reporrtHeaderHeightY"
                  value={uploadReportLetterHeadData?.reporrtHeaderHeightY || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="reporrtHeaderHeightY" className="menuPeerLevel">
                  Report HdrH. Y
                </label>
              </div>
              {/* Patient Y H */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="patientYHeader"
                  name="patientYHeader"
                  value={uploadReportLetterHeadData?.patientYHeader || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="patientYHeader" className="menuPeerLevel">
                  Patient Y H
                </label>
              </div>
            </div>

            <div className="flex gap-[0.25rem]">
              {/* Barcode X Po. */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="barcodeXPosition"
                  name="barcodeXPosition"
                  value={uploadReportLetterHeadData?.barcodeXPosition || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="barcodeXPosition" className="menuPeerLevel">
                  Barcode X Po.
                </label>
              </div>

              {/* Barcode Y Po. */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="barcodeYPosition"
                  name="barcodeYPosition"
                  value={uploadReportLetterHeadData?.barcodeYPosition || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="barcodeYPosition" className="menuPeerLevel">
                  Barcode Y Po.
                </label>
              </div>
            </div>

            <div className="flex gap-[0.25rem]">
              {/* QR Code X Po. */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="qrCodeXPosition"
                  name="qrCodeXPosition"
                  value={uploadReportLetterHeadData?.qrCodeXPosition || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="qrCodeXPosition" className="menuPeerLevel">
                  QR Code X Po.
                </label>
              </div>

              {/* QR Code Y Po. */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="qrCodeYPosition"
                  name="qrCodeYPosition"
                  value={uploadReportLetterHeadData?.qrCodeYPosition || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="qrCodeYPosition" className="menuPeerLevel">
                  QR Code Y Po.
                </label>
              </div>
            </div>

            <div className="flex gap-[0.25rem]">
              {/* QR Header */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="isQRheader"
                  name="isQRheader"
                  value={uploadReportLetterHeadData?.isQRheader || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="isQRheader" className="menuPeerLevel">
                  QR Header
                </label>
              </div>

              {/* Barcode HY */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="isBarcodeHeader"
                  name="isBarcodeHeader"
                  value={uploadReportLetterHeadData?.isBarcodeHeader || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="isBarcodeHeader" className="menuPeerLevel">
                  Barcode HY
                </label>
              </div>
            </div>

            <div className="flex gap-[0.25rem]">
              {/* Footer Height */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="footerHeight"
                  name="footerHeight"
                  value={uploadReportLetterHeadData?.footerHeight || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="footerHeight" className="menuPeerLevel">
                  Footer Height
                </label>
              </div>

              {/* Doc Sign Y Position */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="docSignYPosition"
                  name="docSignYPosition"
                  value={uploadReportLetterHeadData?.docSignYPosition || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="docSignYPosition" className="menuPeerLevel">
                  Dr Sign Y Position
                </label>
              </div>
            </div>

            <div className="flex gap-[0.25rem]">
              {/* nabLxPosition */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="nabLxPosition"
                  name="nabLxPosition"
                  value={uploadReportLetterHeadData?.nabLxPosition || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="nabLxPosition" className="menuPeerLevel">
                  NABL X Position
                </label>
              </div>

              {/* nabLyPosition */}
              <div className="relative flex-1">
                <input
                  type="text"
                  id="nabLyPosition"
                  name="nabLyPosition"
                  value={uploadReportLetterHeadData?.nabLyPosition || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    handelOnChangeuploadReportLetterHeadData({
                      target: { name: e.target.name, value },
                    });
                  }}
                  placeholder=" "
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
                <label htmlFor="nabLyPosition" className="menuPeerLevel">
                  NABL Y Position
                </label>
              </div>
            </div>

            {/* Letter Head */}
            <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
              <div className="relative flex-1">
                <div
                  name="reportHeader"
                  className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                  onClick={handelClickImage}
                >
                  {uploadReportLetterHeadData.reportHeader === "" ? (
                    <div className="pt-2 z-40 font-semibold text-center">
                      Upload Image
                    </div>
                  ) : (
                    <div className="pt-2 z-40 text-center">
                      Image uploaded Successfully
                    </div>
                  )}

                  <input
                    type="file"
                    id="reportHeader"
                    name="reportHeader"
                    ref={imgRef}
                    onChange={handelImageChangeForLetterHead}
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>

                <label htmlFor="reportHeader" className="menuPeerLevel">
                  Letter Head
                </label>
              </div>

              {uploadReportLetterHeadData?.reportHeader && (
                <div
                  className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  onClick={() => {
                    // openPDF(uploadReportLetterHeadData.reportHeader)
                    {
                      setImg(
                        IsBase64 ? `data:image/png;base64,${Img1}` : `${Img1}`
                      );
                      setImageView(true);
                    }
                  }}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <IoMdImages className="w-4 h-4 font-semibold" />
                </div>
              )}
            </div>

            {/* Receipt Header */}
            <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
              <div className="relative flex-1">
                <div
                  className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                  onClick={() => imgRefForReciptHeader.current.click()}
                >
                  {uploadReportLetterHeadData.reciptHeader === "" ? (
                    <div className="pt-2 z-40 font-semibold text-center">
                      Upload Image
                    </div>
                  ) : (
                    <div className="pt-2 z-40 text-center">
                      Image uploaded Successfully
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="reciptHeader"
                  name="reciptHeader"
                  ref={imgRefForReciptHeader}
                  onChange={handelImageChangeForReceiptHeader}
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/jpg"
                />

                <label htmlFor="reciptHeader" className="menuPeerLevel">
                  Receipt Header
                </label>
              </div>

              {uploadReportLetterHeadData?.reciptHeader && (
                <div
                  className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  onClick={() => {
                    setImg(
                      IsBase64 ? `data:image/png;base64,${Img2}` : `${Img2}`
                    );
                    setImageView(true);
                  }}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <IoMdImages className="w-4 h-4 font-semibold" />
                </div>
              )}
            </div>

            {/* Receipt Footer */}
            <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
              <div className="relative flex-1">
                <div
                  className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                  onClick={() => imgRefForReciptFooter.current.click()}
                >
                  {uploadReportLetterHeadData.reciptFooter === "" ? (
                    <div className="pt-2 z-40 font-semibold text-center">
                      Upload Image
                    </div>
                  ) : (
                    <div className="pt-2 z-40 text-center">
                      Image uploaded Successfully
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="reciptFooter"
                  name="reciptFooter"
                  ref={imgRefForReciptFooter}
                  onChange={handelImageChangeForReceiptFooter}
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/jpg"
                />

                <label htmlFor="reciptFooter" className="menuPeerLevel">
                  Receipt Footer
                </label>
              </div>

              {uploadReportLetterHeadData?.reciptFooter && (
                <div
                  className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  onClick={() => {
                    setImg(
                      IsBase64 ? `data:image/png;base64,${Img3}` : `${Img3}`
                    );
                    setImageView(true);
                  }}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <IoMdImages className="w-4 h-4 font-semibold" />
                </div>
              )}
            </div>

            {/* R Water Mark */}
            <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
              <div className="relative flex-1">
                <div
                  className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                  onClick={() => imgRefForRWaterMark.current.click()}
                >
                  {uploadReportLetterHeadData.rWaterMark === "" ? (
                    <div className="pt-2 z-40 font-semibold text-center">
                      Upload Image
                    </div>
                  ) : (
                    <div className="pt-2 z-40 text-center">
                      Image uploaded Successfully
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="rWaterMark"
                  name="rWaterMark"
                  ref={imgRefForRWaterMark}
                  onChange={handelImageChangeForRwaterMark}
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/jpg"
                />

                <label htmlFor="rWaterMark" className="menuPeerLevel">
                  R Water Mark
                </label>
              </div>

              {uploadReportLetterHeadData?.rWaterMark && (
                <div
                  className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  onClick={() => {
                    setImg(
                      IsBase64 ? `data:image/png;base64,${Img4}` : `${Img4}`
                    );
                    setImageView(true);
                  }}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <IoMdImages className="w-4 h-4 font-semibold" />
                </div>
              )}
            </div>

            <TwoSubmitButton
              options={[
                {
                  label: isEdit ? "Update" : "Save",
                  submit: false,
                  callBack: () => {
                    onSubmitUploadReportLetterHead();
                  },
                },
              ]}
            />
          </div>
        </form>
      </div>

      {/* grid data */}
      <UpdatedDynamicTable
        viewKey="Random"
        loading={GridData?.loading}
        rows={GridShow}
        columns={columns}
      />
    </>
  );
}
