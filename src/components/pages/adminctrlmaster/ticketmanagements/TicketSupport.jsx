import React, { useEffect, useState } from 'react'
import FormHeader from '../../../global/FormHeader'
import { DatePicker } from '../../../global/DatePicker'
import { useFormattedDate } from '../../../customehook/useDateTimeFormate'
import { useSelector } from 'react-redux';
import CustomDropdown from '../../../global/CustomDropdown';
import CustomeNormalButton from '../../../global/CustomeNormalButton';
import GridDataDetails from '../../../global/GridDataDetails';
import CustomDynamicTable from '../../../global/CustomDynamicTable'
import { usePostData, useRetrieveData } from '../../../../service/service';
import CustomFormButtonWithLoading from '../../../global/CustomFormButtonWithLoading';
import { FaBookOpen, FaDeleteLeft, FaSpinner } from 'react-icons/fa6';
import CustomLoadingPage from '../../../global/CustomLoadingPage';
// import { IoMdCloseCircleOutline } from "react-icons/io";


import { MdAssignmentTurnedIn, MdOutlineClose, MdOutlineCreditScore, } from 'react-icons/md';
import { IoIosEye, IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import { FaPauseCircle } from 'react-icons/fa';
import CustomSearchInputFields from '../../../global/CustomSearchDropdown';

export default function TicketSupport() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [ticketSupportFilterData, setticketSupportFilterData] = useState({
        fromDate: useFormattedDate(),
        toDate: useFormattedDate(),
        assignedEngineer: 0,
        ticketStatus: 0,
        centreId: 1,
        dateType: '',

        //assign ticket
        ticketAssignedEng: 0,
        daliveryDate: useFormattedDate(),
        ticketId: 0,

        ticketDesc: ''
    });
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [showPopup, setShowPopup] = useState(0);

    const allAssignedEng = useRetrieveData();
    const allTicketSupportData = useRetrieveData();
    const postDataForTicketsAssign = usePostData();
    const allCentreData = useRetrieveData();


    useEffect(() => {

        const getAllData = async () => {

            await allAssignedEng.fetchDataFromApi(`/empMaster?select=empid,fname,lname&$filter=(isactive eq 1)`)

            await allCentreData.fetchDataFromApi(`/centreMaster?select=centreid,companyName&$filter=(centreid eq 1)`);
        }

        getAllData();
    }, [])

    const handelOnChnageTicketSupportFilterData = (e) => {
        setticketSupportFilterData((preventData) => ({
            ...preventData,
            [e.target.name]: e.target.value
        }))
    }


    const onSubmitSearchData = async (e) => {

        e.preventDefault();
        setIsButtonClick(1);

        if (ticketSupportFilterData?.dateType === '') {
            toast.info('Please select Date Type');
            setIsButtonClick(0);
            return;
        }

        await allTicketSupportData.fetchDataFromApi(`/supportTicket/GetTicketDetails?FromDate=${ticketSupportFilterData?.fromDate + " " + '00:00:00'}&Todate=${ticketSupportFilterData?.toDate + " " + '23:59:59'}&Status=${ticketSupportFilterData?.ticketStatus}&assingedto=${ticketSupportFilterData?.assignedEngineer}&Datetype=${ticketSupportFilterData?.dateType}`);

        setIsButtonClick(0);
    }

    const openDocument = async (documentUrl) => {
        try {
            if (documentUrl) {
                const response = await fetch(documentUrl);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank'); // Open PDF directly in a new tab
            } else {
                toast.error('Data not Found')
            }

        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };


    //assigned ticket
    const submitAssignTicketData = async (e) => {
        e.preventDefault();
        setIsButtonClick(2);

        const response = await postDataForTicketsAssign.postRequestData(`supportTicket/AssignTicket?ticketId=${ticketSupportFilterData?.ticketId}&AssigneTo=${ticketSupportFilterData?.ticketAssignedEng}&DeliveryDate=${ticketSupportFilterData?.daliveryDate}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
        } else {
            toast.error(response?.message);
        }

        setIsButtonClick(0);
    }


    //close ticket
    const submitCloseTicketData = async (e) => {
        e.preventDefault();
        setIsButtonClick(3);

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/closeTicket?ticketId=${ticketSupportFilterData?.ticketId}&closeRemark=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            // setticketSupportFilterData({
            //     fromDate: useFormattedDate(),
            //     toDate: useFormattedDate(),
            //     assignedEngineer: 0,
            //     ticketStatus: 0,

            //     //assign ticket
            //     ticketAssignedEng: 0,
            //     daliveryDate: useFormattedDate(),
            //     ticketId: 0,
            //     ticketDesc: ''
            // })
        } else {
            toast.error(response?.message);
        }

        setIsButtonClick(0);

    }


    //reopen ticket
    const submitReOpenTicketData = async (e) => {
        e.preventDefault();
        setIsButtonClick(4);

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/ReOpenTicket?ticketId=${ticketSupportFilterData?.ticketId}&reOpenReason=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            // setticketSupportFilterData({
            //     fromDate: useFormattedDate(),
            //     toDate: useFormattedDate(),
            //     assignedEngineer: 0,
            //     ticketStatus: 0,

            //     //assign ticket
            //     ticketAssignedEng: 0,
            //     daliveryDate: useFormattedDate(),
            //     ticketId: 0,
            //     ticketDesc: ''
            // })
        } else {
            toast.error(response?.message);
        }

        setIsButtonClick(0);

    }

    //hold ticket
    const submitHoldTicketData = async (e) => {
        e.preventDefault();
        setIsButtonClick(5);

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/HoldTicket?ticketId=${ticketSupportFilterData?.ticketId}&HoldReason=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            // setticketSupportFilterData({
            //     fromDate: useFormattedDate(),
            //     toDate: useFormattedDate(),
            //     assignedEngineer: 0,
            //     ticketStatus: 0,

            //     //assign ticket
            //     ticketAssignedEng: 0,
            //     daliveryDate: useFormattedDate(),
            //     ticketId: 0,
            //     ticketDesc: ''
            // })
        } else {
            toast.error(response?.message);
        }

        setIsButtonClick(0);

    }

    //rectct 
    const submitRejectTicketData = async (e) => {
        e.preventDefault();
        setIsButtonClick(6);

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/RejectTicket?ticketId=${ticketSupportFilterData?.ticketId}&rejectedReason=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            // setticketSupportFilterData({
            //     fromDate: useFormattedDate(),
            //     toDate: useFormattedDate(),
            //     assignedEngineer: 0,
            //     ticketStatus: 0,

            //     //assign ticket
            //     ticketAssignedEng: 0,
            //     daliveryDate: useFormattedDate(),
            //     ticketId: 0,
            //     ticketDesc: ''
            // })
        } else {
            toast.error(response?.message);
        }

        setIsButtonClick(0);

    }



    //complete 
    const submitCompleteTicketData = async (e) => {
        e.preventDefault();
        setIsButtonClick(7);

        const response = await postDataForTicketsAssign.postRequestData(`//supportTicket/CompleteTicket?ticketId=${ticketSupportFilterData?.ticketId}&ActionTaken=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            // setticketSupportFilterData({
            //     fromDate: useFormattedDate(),
            //     toDate: useFormattedDate(),
            //     assignedEngineer: 0,
            //     ticketStatus: 0,

            //     //assign ticket
            //     ticketAssignedEng: 0,
            //     daliveryDate: useFormattedDate(),
            //     ticketId: 0,
            //     ticketDesc: ''
            // })
        } else {
            toast.error(response?.message);
        }

        setIsButtonClick(0);

    }




    return (
        <>
            <FormHeader headerData='Search Ticket Support' />

            <form autoComplete='off' onSubmit={onSubmitSearchData}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 items-center  mx-1">

                    <div className='relative flex-1'>
                        <CustomDropdown
                            name="dateType"
                            label="Date Type"
                            value={ticketSupportFilterData?.dateType || ''}
                            options={[
                                { label: 'Select Option', value: '', disabled: true },
                                { label: 'Created Date', value: 'CreateDate' },
                                { label: 'Assigned Date', value: 'AssignedDate' },
                                { label: 'Delivery Date', value: 'Deliverydate' },
                            ]}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                            isMandatory={false}
                        />
                    </div>

                    <div className='relative flex-1'>
                        <DatePicker
                            id="fromDate"
                            name="fromDate"
                            value={ticketSupportFilterData?.fromDate || ''}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            placeholder=" "
                            label="From Date"
                            activeTheme={activeTheme}
                            //isDisabled={false}
                            isMandatory={!Boolean(ticketSupportFilterData?.fromDate)}
                            currentDate={new Date()} // Current date: today
                            showTime={false}
                            showBigerCalandar={false}
                        />
                    </div>


                    <div className='relative flex-1'>
                        <DatePicker
                            id="toDate"
                            name="toDate"
                            value={ticketSupportFilterData?.toDate || ''}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            placeholder=" "
                            label="To Date"
                            activeTheme={activeTheme}
                            //isDisabled={false}
                            isMandatory={!Boolean(ticketSupportFilterData?.toDate)}
                            currentDate={new Date()} // Current date: today
                            showTime={false}
                            showBigerCalandar={false}
                        />
                    </div>


                    <div className="relative flex-1">

                        <CustomSearchInputFields
                            id="centreId"
                            name="centreId"
                            label="Centre"
                            value={ticketSupportFilterData?.centreId}
                            options={allCentreData?.data}
                            onChange={(e) => handelOnChangeForReportDispatch(e)}
                            filterText="No records found"
                            placeholder=" "
                            searchWithName="companyName"
                            uniqueKey="centreId"
                            activeTheme={activeTheme}
                        />

                    </div>



                    <div className='relative flex-1'>
                        <CustomDropdown
                            name="assignedEngineer"
                            label="Assigned Engineer"
                            value={ticketSupportFilterData?.assignedEngineer || ''}
                            options={[
                                { label: 'Select Option', value: '', disabled: true },
                                ...allAssignedEng?.data?.map(item => ({
                                    label: `${item?.fName} ${item?.lName}`,
                                    value: parseInt(item?.empId),
                                })),
                            ]}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                            isMandatory={false}
                        />
                    </div>


                    <div className='flex gap-[0.25rem]'>
                        <div className='relative flex-1 '>
                            <CustomDropdown
                                name="ticketStatus"
                                label="Ticket Status"
                                value={ticketSupportFilterData?.ticketStatus || ''}
                                options={[
                                    // { label: 'Select Option', value: '', disabled: true },
                                    { label: 'Open', value: 0 },
                                    { label: 'Assigned', value: 1 },
                                    { label: 'Delivered', value: 2 },
                                    { label: 'Hold', value: 3 },
                                    { label: 'Rejected', value: 4 },
                                    { label: 'Close', value: 7 },
                                    { label: 'Reopen', value: 8 },
                                ]}
                                onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                                defaultIndex={0}
                                activeTheme={activeTheme}
                                isMandatory={false}
                            />
                        </div>



                        <div className='relative flex-1'>
                            <CustomFormButtonWithLoading
                                activeTheme={activeTheme}
                                text="Search"
                                icon={FaSpinner}
                                isButtonClick={isButtonClick}
                                loadingButtonNumber={1} // Unique number for the first button
                            />
                        </div>



                    </div>


                </div>
            </form>

            <div>
                <GridDataDetails gridDataDetails={'Ticket Details'} />
                {
                    allTicketSupportData?.loading ?
                        <div className='flex justify-center items-center'>
                            <CustomLoadingPage />
                        </div>
                        :
                        <CustomDynamicTable activeTheme={activeTheme} columns={['SR. NO.', ' Ticket ID', "Ticket Type", "Ticket Details", "Client Name", 'Assign Date', 'Delivered Date', 'Delivery date', 'Ticket Status', 'Hold ticket', 'Document View', "Created Date", , "Action Taken", "Assigned To", "Assigned", "Re Open", 'Close', 'Hold', 'Reject', 'Complete']} >
                            <tbody>
                                {
                                    allTicketSupportData?.data?.data?.map((data, index) => (
                                        <tr
                                            className={`cursor-pointer whitespace-nowrap ${isHoveredTable === index
                                                ? ''
                                                : index % 2 === 0
                                                    ? 'bg-gray-100'
                                                    : 'bg-white'
                                                }`}
                                            key={index}
                                            onMouseEnter={() => setIsHoveredTable(index)}
                                            onMouseLeave={() => setIsHoveredTable(null)}
                                            style={{
                                                background:
                                                    isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                                                // Hides scrollbar for IE/Edge
                                            }}
                                        >
                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {index + 1}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.ticketId}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.ticketType}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.task}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.clientName}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.assigneDate}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.completedDate}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.deliveryDate}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.ticketstatus}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.isHold === 1 ? 'Yes' : 'No'}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                <div className="flex justify-start items-center">
                                                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                        onClick={() => {
                                                            openDocument(data?.document)
                                                        }}

                                                        title='View Documents'
                                                    >
                                                        <IoIosEye className='h-4 w-4' />
                                                    </div>
                                                </div>
                                            </td>



                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.createdDate}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.actionTaken}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.assinedToname}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                <div className="flex justify-start items-center">
                                                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                        onClick={() => {
                                                            setShowPopup(1)
                                                                , setticketSupportFilterData((preventData) => ({
                                                                    ...preventData,
                                                                    ticketId: data?.ticketId
                                                                }))
                                                        }}

                                                        title='Assign Ticket'
                                                    >
                                                        <MdAssignmentTurnedIn className='h-4 w-4' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                <div className="flex justify-start items-center">
                                                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                        onClick={() => {
                                                            setShowPopup(2), setticketSupportFilterData((preventData) => ({
                                                                ...preventData,
                                                                ticketId: data?.ticketId
                                                            }))
                                                        }}

                                                        title='Re Open'
                                                    >
                                                        <FaBookOpen className='h-4 w-4' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                <div className="flex justify-start items-center">
                                                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}

                                                        onClick={() => {
                                                            setShowPopup(3),
                                                                setticketSupportFilterData((preventData) => ({
                                                                    ...preventData,
                                                                    ticketId: data?.ticketId
                                                                }))
                                                        }}

                                                        title='Close'
                                                    >
                                                        <IoMdCloseCircleOutline className='h-4 w-4' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                <div className="flex justify-start items-center">
                                                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                        onClick={() => {
                                                            setShowPopup(4), setticketSupportFilterData((preventData) => ({
                                                                ...preventData,
                                                                ticketId: data?.ticketId
                                                            }))
                                                        }}

                                                        title='Hold'
                                                    >
                                                        <FaPauseCircle className='h-4 w-4' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                <div className="flex justify-start items-center">
                                                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                        onClick={() => {
                                                            setShowPopup(5), setticketSupportFilterData((preventData) => ({
                                                                ...preventData,
                                                                ticketId: data?.ticketId
                                                            }))
                                                        }}

                                                        title='Reject'
                                                    >
                                                        <MdOutlineClose className='h-4 w-4' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                <div className="flex justify-start items-center">
                                                    <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                        onClick={() => {
                                                            setShowPopup(6), setticketSupportFilterData((preventData) => ({
                                                                ...preventData,
                                                                ticketId: data?.ticketId
                                                            }))
                                                        }}

                                                        title='Complete'
                                                    >
                                                        <MdOutlineCreditScore className='h-4 w-4' />
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>
                                    ))

                                }
                            </tbody>
                        </CustomDynamicTable>
                }
            </div>



            {
                showPopup === 1 && (

                    // <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Assign Ticket'} setShowPopup={setShowPopup}>

                    // </CustomPopupWithResponsive>
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                        <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                            {/* Header */}
                            <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                                    Assign Ticket
                                </div>
                                <IoMdCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>


                            <form autoComplete='off' onSubmit={submitAssignTicketData}>
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mx-1 lg:mx-2 items-center relative my-2">
                                    <div className='relative flex-1 '>
                                        <CustomDropdown
                                            name="ticketAssignedEng"
                                            label="Assigned Engineer"
                                            value={ticketSupportFilterData?.ticketAssignedEng || ''}
                                            options={[
                                                { label: 'Select Option', value: '', disabled: true },
                                                ...allAssignedEng?.data?.map(item => ({
                                                    label: `${item?.fName} ${item?.lName}`,
                                                    value: parseInt(item?.empId),
                                                })),
                                            ]}
                                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                                            defaultIndex={0}
                                            activeTheme={activeTheme}
                                            isMandatory={false}
                                        />
                                    </div>

                                    <div className='relative flex-1'>
                                        <DatePicker
                                            id="daliveryDate"
                                            name="daliveryDate"
                                            value={ticketSupportFilterData?.daliveryDate || ''}
                                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                                            placeholder=" "
                                            label="DeliveryDate"
                                            activeTheme={activeTheme}
                                            //isDisabled={false}
                                            isMandatory={!Boolean(ticketSupportFilterData?.fromDate)}
                                            currentDate={new Date()} // Current date: today
                                            showTime={false}
                                            showBigerCalandar={false}
                                        />
                                    </div>

                                    <div className='flex gap-[0.25rem]'>
                                        <div className='relative flex-1'>
                                            <CustomFormButtonWithLoading
                                                activeTheme={activeTheme}
                                                text="Send"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={2} // Unique number for the first button
                                            />
                                        </div>

                                        <div className="relative flex-1"></div>
                                    </div>

                                </div>

                            </form>

                            {/* footer */}
                            <div
                                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                                style={{
                                    borderImage: activeTheme?.menuColor,
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            ></div>
                        </div>
                    </div>
                )
            }

            {/* re open */}
            {
                showPopup === 2 && (

                    // <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Assign Ticket'} setShowPopup={setShowPopup}>

                    // </CustomPopupWithResponsive>
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                        <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                            {/* Header */}
                            <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                                    Re Open Ticket
                                </div>
                                <IoMdCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>


                            <form autoComplete='off' onSubmit={submitReOpenTicketData}>

                                <div className='m-2'>
                                    <textarea
                                        rows={4}
                                        maxLength={500}
                                        name='ticketDesc'
                                        onChange={handelOnChnageTicketSupportFilterData}
                                        className='w-full rounded border-[1.5px] px-1 text-sm  p-2  font-semibold h-[5.4rem] outline-none bg-white text-[#795548]'
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mx-1 lg:mx-2 items-center relative my-2">

                                    <div className='flex gap-[0.25rem]'>
                                        <div className='relative flex-1'>
                                            <CustomFormButtonWithLoading
                                                activeTheme={activeTheme}
                                                text="Re Open"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={4} // Unique number for the first button
                                            />
                                        </div>

                                        <div className="relative flex-1"></div>
                                    </div>
                                </div>



                            </form>

                            {/* footer */}
                            <div
                                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                                style={{
                                    borderImage: activeTheme?.menuColor,
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            ></div>
                        </div>
                    </div>
                )

            }

            {/* close ticket */}
            {
                showPopup === 3 && (

                    // <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Assign Ticket'} setShowPopup={setShowPopup}>

                    // </CustomPopupWithResponsive>
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                        <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                            {/* Header */}
                            <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                                    Close Ticket
                                </div>
                                <IoMdCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>

                            <form autoComplete='off' onSubmit={submitCloseTicketData}>

                                <div className='m-2'>
                                    <textarea
                                        rows={4}
                                        maxLength={500}
                                        name='ticketDesc'
                                        onChange={handelOnChnageTicketSupportFilterData}
                                        className='w-full rounded border-[1.5px] px-1 text-sm  p-2  font-semibold h-[5.4rem] outline-none bg-white text-[#795548]'
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mx-1 lg:mx-2 items-center relative my-2">

                                    <div className='flex gap-[0.25rem]'>
                                        <div className='relative flex-1'>
                                            <CustomFormButtonWithLoading
                                                activeTheme={activeTheme}
                                                text="Reject"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={3} // Unique number for the first button
                                            />
                                        </div>

                                        <div className="relative flex-1"></div>
                                    </div>
                                </div>



                            </form>

                            {/* footer */}
                            <div
                                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                                style={{
                                    borderImage: activeTheme?.menuColor,
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            ></div>
                        </div>
                    </div>
                )

            }


            {/* hold ticket */}
            {
                showPopup === 4 && (

                    // <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Assign Ticket'} setShowPopup={setShowPopup}>

                    // </CustomPopupWithResponsive>
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                        <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                            {/* Header */}
                            <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                                    Hold Ticket
                                </div>
                                <IoMdCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>

                            <form autoComplete='off' onSubmit={submitHoldTicketData}>

                                <div className='m-2'>
                                    <textarea
                                        rows={4}
                                        maxLength={500}
                                        name='ticketDesc'
                                        onChange={handelOnChnageTicketSupportFilterData}
                                        className='w-full rounded border-[1.5px] px-1 text-sm  p-2  font-semibold h-[5.4rem] outline-none bg-white text-[#795548]'
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mx-1 lg:mx-2 items-center relative my-2">

                                    <div className='flex gap-[0.25rem]'>
                                        <div className='relative flex-1'>
                                            <CustomFormButtonWithLoading
                                                activeTheme={activeTheme}
                                                text="Hold"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={5} // Unique number for the first button
                                            />
                                        </div>

                                        <div className="relative flex-1"></div>
                                    </div>
                                </div>



                            </form>

                            {/* footer */}
                            <div
                                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                                style={{
                                    borderImage: activeTheme?.menuColor,
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            ></div>
                        </div>
                    </div>
                )

            }

            {/* reject ticket */}
            {
                showPopup === 5 && (

                    // <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Assign Ticket'} setShowPopup={setShowPopup}>

                    // </CustomPopupWithResponsive>
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                        <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                            {/* Header */}
                            <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                                    Hold Ticket
                                </div>
                                <IoMdCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>

                            <form autoComplete='off' onSubmit={submitRejectTicketData}>

                                <div className='m-2'>
                                    <textarea
                                        rows={4}
                                        maxLength={500}
                                        name='ticketDesc'
                                        onChange={handelOnChnageTicketSupportFilterData}
                                        className='w-full rounded border-[1.5px] px-1 text-sm  p-2  font-semibold h-[5.4rem] outline-none bg-white text-[#795548]'
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mx-1 lg:mx-2 items-center relative my-2">

                                    <div className='flex gap-[0.25rem]'>
                                        <div className='relative flex-1'>
                                            <CustomFormButtonWithLoading
                                                activeTheme={activeTheme}
                                                text="Reject"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={6} // Unique number for the first button
                                            />
                                        </div>

                                        <div className="relative flex-1"></div>
                                    </div>
                                </div>



                            </form>

                            {/* footer */}
                            <div
                                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                                style={{
                                    borderImage: activeTheme?.menuColor,
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            ></div>
                        </div>
                    </div>
                )

            }


            {/* complete ticket */}
            {
                showPopup === 6 && (

                    // <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Assign Ticket'} setShowPopup={setShowPopup}>

                    // </CustomPopupWithResponsive>
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                        <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                            {/* Header */}
                            <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                                    Complete Ticket
                                </div>
                                <IoMdCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>

                            <form autoComplete='off' onSubmit={submitCompleteTicketData}>

                                <div className='m-2'>
                                    <textarea
                                        rows={4}
                                        maxLength={500}
                                        name='ticketDesc'
                                        onChange={handelOnChnageTicketSupportFilterData}
                                        className='w-full rounded border-[1.5px] px-1 text-sm  p-2  font-semibold h-[5.4rem] outline-none bg-white text-[#795548]'
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mx-1 lg:mx-2 items-center relative my-2">

                                    <div className='flex gap-[0.25rem]'>
                                        <div className='relative flex-1'>
                                            <CustomFormButtonWithLoading
                                                activeTheme={activeTheme}
                                                text="Complete"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={7} // Unique number for the first button
                                            />
                                        </div>

                                        <div className="relative flex-1"></div>
                                    </div>
                                </div>



                            </form>

                            {/* footer */}
                            <div
                                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                                style={{
                                    borderImage: activeTheme?.menuColor,
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                            ></div>
                        </div>
                    </div>
                )

            }

        </>
    )
}
