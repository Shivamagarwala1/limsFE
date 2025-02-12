
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdImages, IoMdMenu } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { uploadReportLetterHead } from '../../listData/listData';
import toast from 'react-hot-toast';
import { getAllUploadReportLetterHeadApi, getCenterDataForUploadReportLetterHeadApi, saveUploadReportLetterHeadApi } from '../../../service/service';
import { FaSpinner } from 'react-icons/fa';
import useRippleEffect from '../../customehook/useRippleEffect';


export default function UploadReportLetterHead() {


    const activeTheme = useSelector((state) => state.theme.activeTheme);
    useRippleEffect();

    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
    const [uploadReportLetterHeadData, setUploadReportLetterHeadData] = useState({
        centreId: 0,
        reporrtHeaderHeightY: 0,
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
        reportHeader: '',
        reciptHeader: '',
        reciptFooter: '',
        rWaterMark: ''
    });

    const [gridData, setGridData] = useState([]);
    const [allCentreData, setAllCentreData] = useState([]);
    const [singleCentreData, setSingleCentreData] = useState('');
    const [isHovered, setIsHovered] = useState(null);
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const imgRef = useRef();
    const imgRefForReciptHeader = useRef();
    const imgRefForReciptFooter = useRef();
    const imgRefForRWaterMark = useRef();

    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
    }

    useEffect(() => {

        const getAllCentreData = async () => {

            try {

                const response = await getCenterDataForUploadReportLetterHeadApi();
                console.log(response);

                setAllCentreData(response);

            } catch (error) {
                toast.error(error?.message);
            }
        }

        getAllCentreData();

    }, [])


    const handelOnChangeuploadReportLetterHeadData = (event) => {

        setUploadReportLetterHeadData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))

    }

    const handelImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract Base64
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


    const handelImageChangeForReceiptHeader = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract Base64
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
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract Base64
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
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract Base64
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

        toast.success('ghjkl')
        // Convert Base64 to a Blob
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Create a URL for the Blob and open it in a new tab
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
    };

    //save upload report letter
    const onSubmitUploadReportLetterHead = async () => {

        setIsButtonClick(1);

        try {

            const response = await saveUploadReportLetterHeadApi(uploadReportLetterHeadData);

            if (response?.success) {
                toast.success(response?.message);
                setUploadReportLetterHeadData({
                    centreId: 0,
                    reporrtHeaderHeightY: 0,
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
                    reportHeader: '',
                    reciptHeader: '',
                    reciptFooter: '',
                    rWaterMark: ''
                });
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0);
    }


    useEffect(() => {

        const getAllData = async () => {
            try {
                const response = await getAllUploadReportLetterHeadApi(uploadReportLetterHeadData.centreId);
                console.log(response);
                setGridData(response);
            } catch (error) {
                toast.error(error);
            }
        }

        if (uploadReportLetterHeadData?.centreId !== 0) {
            getAllData();
        }

    }, [uploadReportLetterHeadData.centreId])
    const filterCentreData = allCentreData.filter((data) => (data?.companyName?.toLowerCase() || '').includes(String(singleCentreData?.toLowerCase() || '')));


    return (
        <>
            <div>
                {/* Header Section */}
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                    </div>
                    <div>Upload Report Letter Head</div>
                </div>

                {/* form data */}
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

                        {/* Centre */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="centreId"
                                name="centreId"
                                value={singleCentreData || uploadReportLetterHeadData?.centreId || ''}
                                onChange={(e) => {
                                    handelOnChangeuploadReportLetterHeadData(e)
                                    setSingleCentreData('')
                                }}
                                onClick={() => openShowSearchBarDropDown(1)}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="centreId" className="menuPeerLevel">
                                Centre
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 1 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>
                                        {filterCentreData?.length > 0 ? (
                                            filterCentreData.map((data, index) => (
                                                <li
                                                    key={data?.centreId}
                                                    name="centreId"
                                                    className="my-1 px-2 cursor-pointer"
                                                    onClick={() => {
                                                        openShowSearchBarDropDown(0);
                                                        handelOnChangeuploadReportLetterHeadData({
                                                            target: { name: "centreId", value: data?.centreId },
                                                        });
                                                        setSingleCentreData(data?.companyName)
                                                    }}
                                                    onMouseEnter={() => setIsHovered(index)}
                                                    onMouseLeave={() => setIsHovered(null)}
                                                    style={{
                                                        background:
                                                            isHovered === index ? activeTheme?.subMenuColor : "transparent",
                                                    }}
                                                >
                                                    {data?.companyName}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="py-4 text-gray-500 text-center">
                                                {import.meta.env.VITE_API_RECORD_NOT_FOUND || "No records found"}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className='flex gap-[0.25rem]'>
                            {/* Report HdrH. Y */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="reporrtHeaderHeightY"
                                    name="reporrtHeaderHeightY"
                                    value={uploadReportLetterHeadData?.reporrtHeaderHeightY || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
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
                                    type="number"
                                    id="patientYHeader"
                                    name="patientYHeader"
                                    value={uploadReportLetterHeadData?.patientYHeader || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="patientYHeader" className="menuPeerLevel">
                                    Patient Y H
                                </label>

                            </div>
                        </div>


                        <div className='flex gap-[0.25rem]'>

                            {/* Barcode X Po. */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="barcodeXPosition"
                                    name="barcodeXPosition"
                                    value={uploadReportLetterHeadData?.barcodeXPosition || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
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
                                    type="search"
                                    id="barcodeYPosition"
                                    name="barcodeYPosition"
                                    value={uploadReportLetterHeadData?.barcodeYPosition || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="barcodeYPosition" className="menuPeerLevel">
                                    Barcode Y Po.
                                </label>

                            </div>

                        </div>

                        <div className='flex gap-[0.25rem]'>

                            {/* QR Code X Po. */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="qrCodeXPosition"
                                    name="qrCodeXPosition"
                                    value={uploadReportLetterHeadData?.qrCodeXPosition || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
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
                                    type="search"
                                    id="qrCodeYPosition"
                                    name="qrCodeYPosition"
                                    value={uploadReportLetterHeadData?.qrCodeYPosition || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="qrCodeYPosition" className="menuPeerLevel">
                                    QR Code Y Po.
                                </label>

                            </div>
                        </div>

                        <div className='flex gap-[0.25rem]'>

                            {/* QR Header */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="isQRheader"
                                    name="isQRheader"
                                    value={uploadReportLetterHeadData?.isQRheader || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
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
                                    type="number"
                                    id="isBarcodeHeader"
                                    name="isBarcodeHeader"
                                    value={uploadReportLetterHeadData?.isBarcodeHeader || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="isBarcodeHeader" className="menuPeerLevel">
                                    Barcode HY
                                </label>

                            </div>

                        </div>

                        <div className='flex gap-[0.25rem]'>
                            {/* Footer Height */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="footerHeight"
                                    name="footerHeight"
                                    value={uploadReportLetterHeadData?.footerHeight || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
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
                                    type="number"
                                    id="docSignYPosition"
                                    name="docSignYPosition"
                                    value={uploadReportLetterHeadData?.docSignYPosition || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
                                    }}

                                    placeholder=" "
                                    className={`inputPeerField peer border-borderColor focus:outline-none`}
                                />
                                <label htmlFor="docSignYPosition" className="menuPeerLevel">
                                    Dr Sign Y Position
                                </label>

                            </div>
                        </div>


                        <div className='flex gap-[0.25rem]'>
                            {/* nabLxPosition */}
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    id="nabLxPosition"
                                    name="nabLxPosition"
                                    value={uploadReportLetterHeadData?.nabLxPosition || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)

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
                                    type="number"
                                    id="nabLyPosition"
                                    name="nabLyPosition"
                                    value={uploadReportLetterHeadData?.nabLyPosition || ''}
                                    onChange={(e) => {
                                        handelOnChangeuploadReportLetterHeadData(e)
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
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
                            <div className="relative flex-1">

                                <div
                                    name="reportHeader"
                                    className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                                    onClick={handelClickImage}
                                >
                                    {
                                        uploadReportLetterHeadData.reportHeader === '' ? (
                                            <div className="pt-2 z-40 font-semibold text-center">
                                                Upload Image
                                            </div>
                                        ) : (
                                            <div className="pt-2 z-40 text-center">
                                                Image uploaded Successfully
                                            </div>
                                        )
                                    }

                                    <input
                                        type="file"
                                        id="reportHeader"
                                        name="reportHeader"
                                        ref={imgRef}
                                        onChange={handelImageChange}
                                        style={{ display: 'none' }}
                                        accept=".pdf"
                                    />

                                </div>



                                <label htmlFor="reportHeader" className="menuPeerLevel">
                                    Letter Head
                                </label>

                            </div>

                            {
                                uploadReportLetterHeadData?.reportHeader && (
                                    <div
                                        className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                        onClick={() => openPDF(uploadReportLetterHeadData.reportHeader)}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <IoMdImages className="w-4 h-4 font-semibold" />
                                    </div>
                                )
                            }


                        </div>

                        {/* Receipt Header */}
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
                            <div className="relative flex-1">
                                <div
                                    className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                                    onClick={() => imgRefForReciptHeader.current.click()}
                                >
                                    {
                                        uploadReportLetterHeadData.reciptHeader === '' ? (
                                            <div className="pt-2 z-40 font-semibold text-center">
                                                Upload Image
                                            </div>
                                        ) : (
                                            <div className="pt-2 z-40 text-center">
                                                Image uploaded Successfully
                                            </div>
                                        )
                                    }
                                </div>

                                <input
                                    type="file"
                                    id="reciptHeader"
                                    name="reciptHeader"
                                    ref={imgRefForReciptHeader}
                                    onChange={handelImageChangeForReceiptHeader}
                                    style={{ display: 'none' }}
                                    accept=".pdf"
                                />

                                <label htmlFor="reciptHeader" className="menuPeerLevel">
                                    Receipt Header
                                </label>
                            </div>

                            {
                                uploadReportLetterHeadData?.reciptHeader && (
                                    <div
                                        className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                        onClick={() => openPDF(uploadReportLetterHeadData.reciptHeader)}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <IoMdImages className="w-4 h-4 font-semibold" />
                                    </div>
                                )
                            }
                        </div>


                        {/* Receipt Footer */}
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
                            <div className="relative flex-1">
                                <div
                                    className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                                    onClick={() => imgRefForReciptFooter.current.click()}
                                >
                                    {
                                        uploadReportLetterHeadData.reciptFooter === '' ? (
                                            <div className="pt-2 z-40 font-semibold text-center">
                                                Upload Image
                                            </div>
                                        ) : (
                                            <div className="pt-2 z-40 text-center">
                                                Image uploaded Successfully
                                            </div>
                                        )
                                    }
                                </div>

                                <input
                                    type="file"
                                    id="reciptFooter"
                                    name="reciptFooter"
                                    ref={imgRefForReciptFooter}
                                    onChange={handelImageChangeForReceiptFooter}
                                    style={{ display: 'none' }}
                                    accept=".pdf"
                                />

                                <label htmlFor="reciptFooter" className="menuPeerLevel">
                                    Receipt Footer
                                </label>
                            </div>

                            {
                                uploadReportLetterHeadData?.reciptFooter && (
                                    <div
                                        className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                        onClick={() => openPDF(uploadReportLetterHeadData.reciptFooter)}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <IoMdImages className="w-4 h-4 font-semibold" />
                                    </div>
                                )
                            }
                        </div>


                        {/* R Water Mark */}
                        <div className='relative flex-1 flex items-center gap-[0.20rem] w-full justify-between'>
                            <div className="relative flex-1">
                                <div
                                    className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                                    onClick={() => imgRefForRWaterMark.current.click()}
                                >
                                    {
                                        uploadReportLetterHeadData.rWaterMark === '' ? (
                                            <div className="pt-2 z-40 font-semibold text-center">
                                                Upload Image
                                            </div>
                                        ) : (
                                            <div className="pt-2 z-40 text-center">
                                                Image uploaded Successfully
                                            </div>
                                        )
                                    }
                                </div>

                                <input
                                    type="file"
                                    id="rWaterMark"
                                    name="rWaterMark"
                                    ref={imgRefForRWaterMark}
                                    onChange={handelImageChangeForRwaterMark}
                                    style={{ display: 'none' }}
                                    accept=".pdf"
                                />

                                <label htmlFor="rWaterMark" className="menuPeerLevel">
                                    R Water Mark
                                </label>
                            </div>

                            {
                                uploadReportLetterHeadData?.rWaterMark && (
                                    <div
                                        className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                                        onClick={() => openPDF(uploadReportLetterHeadData.rWaterMark)}
                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    >
                                        <IoMdImages className="w-4 h-4 font-semibold" />
                                    </div>
                                )
                            }
                        </div>

                        <div className='flex gap-[0.25rem]'>

                            <div className="relative flex-1 flex justify-start items-center">

                                {
                                    // isEditData ? <button
                                    //     className={`font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    //     style={{
                                    //          background: activeTheme?.menuColor, color:      activeTheme?.iconColor
                                    //     }}
                                    //     onClick={onSubmitUpdateEmployeeMaster}
                                    // >

                                    //     {
                                    //         isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Update'
                                    //     }

                                    // </button>
                                    //     :
                                    <button
                                        type='button'
                                        data-ripple-light="true"
                                        className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                        style={{
                                            background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                        }}
                                        onClick={onSubmitUploadReportLetterHead}
                                    >

                                        {
                                            isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                        }
                                    </button>
                                }

                            </div>

                            <div className="relative flex-1"></div>
                        </div>
                    </div>
                </form>
            </div>

            {/* grid data */}
            <div>
                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Upload Report Letter Head Details</div>
                </div>

                <div className="w-full overflow-auto"> {/* Wrapper for horizontal scroll */}
                    <table className="table-auto border-collapse w-full text-xxs text-left ">
                        {/* Table Header */}
                        <thead
                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                            className="w-full"
                        >
                            <tr>
                                {uploadReportLetterHead.map((data, index) => (
                                    <th
                                        key={index}
                                        className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap overflow-hidden truncate min-w-[150px]"
                                        title={data}
                                    >
                                        {data}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {gridData?.map((data, index) => (
                                <tr
                                    className={`cursor-pointer ${isHoveredTable === index
                                        ? ""
                                        : index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                        }`}
                                    key={index}
                                    onMouseEnter={() => setIsHoveredTable(index)}
                                    onMouseLeave={() => setIsHoveredTable(null)}
                                    style={{
                                        background:
                                            isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                                    }}
                                >
                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {index + 1}
                                    </td>
                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" onClick={() => {
                                        if (uploadReportLetterHeadData?.reportHeader) {
                                            openPDF(uploadReportLetterHeadData.reportHeader);
                                        } else {
                                            console.warn("No PDF available to open");
                                        }
                                    }}>
                                        {/* {data?.reportHeader !== '' ? 'View' : ''} */}
                                        {data?.reportHeader}
                                    </td>

                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" onClick={() => openPDF(uploadReportLetterHeadData.reciptHeader)}>
                                        {data?.reciptHeader !== '' ? 'View' : ''}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" onClick={() => openPDF(uploadReportLetterHeadData.reciptFooter)}>
                                        {data?.reciptFooter !== '' ? 'View' : ''}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.reporrtHeaderHeightY}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.patientYHeader}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.barcodeXPosition}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.barcodeYPosition}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.qrCodeXPosition}
                                    </td>



                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.qrCodeYPosition}
                                    </td>



                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.isQRheader}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.isBarcodeHeader}
                                    </td>



                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.footerHeight}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.nabLxPosition}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.nabLyPosition}
                                    </td>

                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.docSignYPosition}
                                    </td>


                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                        {data?.receiptHeaderY}
                                    </td>

                                    {/* <td className="border-b px-4 h-5 flex items-center text-xxs font-semibold gap-2">
                                        <button className="w-4 h-4 flex justify-center items-center">
                                            <FaRegEdit
                                                className={`w-full h-full ${data?.isActive === 1
                                                    ? "text-blue-500 cursor-pointer"
                                                    : "text-gray-400 cursor-not-allowed"
                                                    }`}
                                                onClick={() => {
                                                    if (data?.isActive === 1) {
                                                        getSingleMenuDataForUpDate(index);
                                                        setIsEditData(true);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            className={`w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? "text-green-500" : "text-red-500"
                                                }`}
                                        >
                                            <ImSwitch
                                                className="w-full h-full"
                                                onClick={() => {
                                                    setClickedRowId(data);
                                                    setShowPopup(true);
                                                }}
                                            />
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
