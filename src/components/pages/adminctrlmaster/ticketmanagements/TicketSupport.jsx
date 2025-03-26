import React, { useEffect, useState } from 'react'
import FormHeader from '../../../global/FormHeader'
import { DatePicker } from '../../../global/DatePicker'
import { useFormattedDate } from '../../../customehook/useDateTimeFormate'
import { useSelector } from 'react-redux';
import CustomDropdown from '../../../global/CustomDropdown';
import GridDataDetails from '../../../global/GridDataDetails';
import CustomDynamicTable from '../../../global/CustomDynamicTable'
import { usePostData, useRetrieveData } from '../../../../service/service';
import CustomFormButtonWithLoading from '../../../global/CustomFormButtonWithLoading';
import CustomPopupWithResponsive from '../../../global/CustomPopupWithResponsive';
import { FaBookOpen, FaSpinner } from 'react-icons/fa6';
import CustomLoadingPage from '../../../global/CustomLoadingPage';
// import { IoMdCloseCircleOutline } from "react-icons/io";
import FromHeader from '../../../global/FormHeader'


import { MdAssignmentTurnedIn, MdModeEditOutline, MdOutlineClose, MdOutlineCreditScore, } from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowUp, IoIosEye, IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import { FaPauseCircle, } from 'react-icons/fa';

import CustomSearchInputFields from '../../../global/CustomSearchDropdown';
import { getDefaultCentreId } from '../../../../service/localstroageService';
import { CustomTextBox } from '../../../global/CustomTextBox';
import CustomFileUpload from '../../../global/CustomFileUpload';
import {RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'

export default function TicketSupport() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [ticketSupportFilterData, setticketSupportFilterData] = useState({
        fromDate: useFormattedDate(),
        toDate: useFormattedDate(),
        assignedEngineer: 0,
        ticketStatus: 0,
        centreId: 1,
        dateType: 'CreateDate',

        //assign ticket
        ticketAssignedEng: 0,
        daliveryDate: useFormattedDate(),
        ticketId: 0,

        ticketDesc: ''
    });
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [showPopup, setShowPopup] = useState(0);
    const [ticketsPopupData, setTicketsPopupData] = useState(null);
    const [ticketPopupError, setTicketPopupError] = useState([]);

    const allAssignedEng = useRetrieveData();
    const allTicketSupportData = useRetrieveData();
    const postDataForTicketsAssign = usePostData();
    const getDataForTicketsAssign = useRetrieveData();
    const allCentreData = useRetrieveData();
    const allTicketType = useRetrieveData();
    const [getReasonDataFromPopup, setReasonDataFromPopup] = useState({
        fieldName: '',
        reasonData: []
    })

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


    const onSubmitSearchData = async (e = null) => {
        // Prevent default only if the event is passed and has preventDefault
        if (e?.preventDefault) {
            e.preventDefault();
        }
        setIsButtonClick(1);

        if (ticketSupportFilterData?.dateType === '') {
            toast.info('Please select Date Type');
            setIsButtonClick(0);
            return;
        }



        try {
            const response = await allTicketSupportData.fetchDataFromApi(`/supportTicket/GetTicketDetails?FromDate=${ticketSupportFilterData?.fromDate + " " + '00:00:00'}&Todate=${ticketSupportFilterData?.toDate + " " + '23:59:59'}&Status=${ticketSupportFilterData?.ticketStatus}&assingedto=${ticketSupportFilterData?.assignedEngineer}&Datetype=${ticketSupportFilterData?.dateType}$roleid=${getDefaultCentreId()}`);

            if (!response?.data?.success && e?.preventDefault) {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            toast.error(error?.message);
        }

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


    useEffect(() => {

        const getAllData = async () => {
            try {
                await allTicketType.fetchDataFromApi('/SupportTicketType?select=id,ticketType&$filter=(isActive eq 1)')
            } catch (error) {
                toast.error(error?.message);
            }
        }

        if (showPopup === 7) {
            getAllData()
        }

    }, [showPopup])

    //get single ticket data for updated
    const getSingleTicketData = async (ticketId, loading, openPopUp) => {
        setIsButtonClick(loading);
        const response = await getDataForTicketsAssign.fetchDataFromApi(`/supportTicket?$filter=(id eq ${ticketId})`);

        setTicketsPopupData(response?.data[0]);

        setShowPopup(openPopUp);

        setIsButtonClick(0);
    }

    const handelOnChangeTicketPopup = (e) => {
        setTicketsPopupData((preventData) => ({
            ...preventData,
            [e.target.name]: e.target.value
        }))
    }

    const handelImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileType = file.type;

            // Handle image files
            // if (fileType.startsWith("image/")) {
            //     const reader = new FileReader();
            //     reader.onloadend = () => {
            //         setPatientRegistrationData((prevData) => ({
            //             ...prevData,
            //             uploadDocument: reader.result, // Store base64 image
            //             fileType: "image", // Store file type
            //         }));
            //     };
            //     reader.readAsDataURL(file);
            // }
            // Handle PDF files
            if (fileType === "application/pdf") {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setTicketsPopupData((prevData) => ({
                        ...prevData,
                        uploadDocument: reader.result, // Store base64 PDF
                        fileType: "pdf", // Store file type
                    }));
                };
                reader.readAsDataURL(file);
            }
            // Handle unsupported files
            else {
                toast.info("Please upload a valid PDF file.")
            }
        }
    };

    //validations
    const validateForm = () => {

        const errors = {};

        // Check for  fields
        if (!ticketsPopupData?.task) errors.task = true;

        // Update state with errors
        setTicketPopupError(errors);
        //console.log(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {

        if (!validateForm()) {
            setIsButtonClick(0);
        }
    }, [ticketsPopupData]);


    const onSubmitForSaveRolePageBindData = async (e = null) => {

        // Prevent default only if the event is passed and has preventDefault
        if (e?.preventDefault) {
            e.preventDefault();
        }
        setIsButtonClick(8);

        if (!validateForm()) {
            toast.info("Please fill in all mandatory fields.");
            setIsButtonClick(0);
            return;
        }

        try {
            const response = await postDataForTicketsAssign.postRequestData('/supportTicket/saveUpdateSupportTicket', ticketsPopupData);

            if (response?.success) {
                toast.success(response?.message);
                onSubmitSearchData();
                setShowPopup(0);
                setTicketsPopupData({});
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error(error?.message)
        }

        setIsButtonClick(0);
        setShowPopup(0);
    }


    //assigned ticket
    const submitAssignTicketData = async (e = null) => {
        // Prevent default only if the event is passed and has preventDefault
        if (e?.preventDefault) {
            e.preventDefault();
        }
        setIsButtonClick(2);

        if (ticketSupportFilterData?.ticketDesc === '') {
            toast.warning('Please provide a reason.!');
            setIsButtonClick(0);
            return;
        }

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/AssignTicket?ticketId=${ticketSupportFilterData?.ticketId}&AssigneTo=${ticketSupportFilterData?.ticketAssignedEng}&DeliveryDate=${ticketSupportFilterData?.daliveryDate}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            setticketSupportFilterData((preventData) => ({
                ...preventData,
                ticketAssignedEng: 0,
                ticketId: 0,
                deliveryDate: useFormattedDate()
            }))
            onSubmitSearchData();
            setShowPopup(0);
        } else {
            toast.error(response?.message);
        }

        setIsButtonClick(0);
        setShowPopup(0);
    }


    //close ticket
    const submitCloseTicketData = async (e = null) => {
        // Prevent default only if the event is passed and has preventDefault
        if (e?.preventDefault) {
            e.preventDefault();
        }
        setIsButtonClick(3);

        if (ticketSupportFilterData?.ticketDesc === '') {
            toast.warning('Please provide a reason.!');
            setIsButtonClick(0);
            return;
        }

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/closeTicket?ticketId=${ticketSupportFilterData?.ticketId}&closeRemark=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            onSubmitSearchData();
            setShowPopup(0);
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
    const submitReOpenTicketData = async (e = null) => {
        // Prevent default only if the event is passed and has preventDefault
        if (e?.preventDefault) {
            e.preventDefault();
        }
        setIsButtonClick(4);

        if (ticketSupportFilterData?.ticketDesc === '') {
            toast.warning('Please provide a reason.!');
            setIsButtonClick(0);
            return;
        }

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/ReOpenTicket?ticketId=${ticketSupportFilterData?.ticketId}&reOpenReason=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            onSubmitSearchData();
            setShowPopup(0);
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
    const submitHoldTicketData = async (e = null) => {
        // Prevent default only if the event is passed and has preventDefault
        if (e?.preventDefault) {
            e.preventDefault();
        }
        setIsButtonClick(5);

        if (ticketSupportFilterData?.ticketDesc === '') {
            toast.warning('Please provide a reason.!');
            setIsButtonClick(0);
            return;
        }

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/HoldTicket?ticketId=${ticketSupportFilterData?.ticketId}&HoldReason=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            onSubmitSearchData();
            setShowPopup(0);
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
    const submitRejectTicketData = async (e = null) => {
        // Prevent default only if the event is passed and has preventDefault
        if (e?.preventDefault) {
            e.preventDefault();
        }
        setIsButtonClick(6);

        if (ticketSupportFilterData?.ticketDesc === '') {
            toast.warning('Please provide a reason.!');
            setIsButtonClick(0);
            return;
        }

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/RejectTicket?ticketId=${ticketSupportFilterData?.ticketId}&rejectedReason=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (response?.success) {
            toast.success(response?.message);
            onSubmitSearchData();
            setShowPopup(0);
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
    const submitCompleteTicketData = async (e = null) => {
        e.preventDefault();
        setIsButtonClick(7);

        const response = await postDataForTicketsAssign.postRequestData(`/supportTicket/CompleteTicket?ticketId=${ticketSupportFilterData?.ticketId}&ActionTaken=${ticketSupportFilterData?.ticketDesc}&UserId=${parseInt(user?.employeeId)}`);

        if (ticketSupportFilterData?.ticketDesc === '') {
            toast.warning('Please provide a reason.!');
            setIsButtonClick(0);
            return;
        }

        if (response?.success) {
            toast.success(response?.message);
            onSubmitSearchData();
            setShowPopup(0);
        } else {
            toast.error(response?.message);
        }

        setIsButtonClick(0);

    }


    //open the popup based on reason
    const handelforGetReasonData = (data, fieldName) => {
        console.log(fieldName);
        setReasonDataFromPopup({
            fieldName: fieldName,
            reasonData: data
        })
        setShowPopup(9);
    }

    console.log(getReasonDataFromPopup);

    const [selected, setSelected] = useState(null);

    const trogole = (i) => {

        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
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
                                // { label: 'Select Option', value: '', disabled: true },
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

                    {
                        user?.defaultCenter === '1' && (
                            <>
                                <div className="relative flex-1">

                                    <CustomSearchInputFields
                                        id="centreId"
                                        name="centreId"
                                        label="Centre"
                                        value={ticketSupportFilterData?.centreId}
                                        options={allCentreData?.data}
                                        onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
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
                            </>
                        )
                    }


                    <div className='flex gap-[0.25rem] items-center'>
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


            {
                console.log(allTicketSupportData)
            }

            <div>
                <GridDataDetails gridDataDetails={'Ticket Details'} />
                {
                    allTicketSupportData?.loading ?
                        <div className='flex justify-center items-center'>
                            <CustomLoadingPage />
                        </div>
                        :
                        <CustomDynamicTable activeTheme={activeTheme} columns={['SR. NO.', ' Ticket ID', "Ticket Type", "Ticket Details", 'Action', "Client Name", 'Assign Date', 'Delivered Date', 'Delivery date', 'Ticket Status', 'Hold ticket', 'Document View', "Created Date", , "Action Taken", "Assigned To", "Assigned", "Re Open", 'Close', 'Hold', 'Reject', 'Complete']} >
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

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }} title={data?.task}
                                                onClick={() => {
                                                    if (data?.task) {
                                                        navigator.clipboard.writeText(data.task);
                                                        toast.success('Task copied to clipboard!');
                                                    }
                                                }}
                                            >

                                                {data?.task?.length >= 30
                                                    ? data?.task.substring(0, 30) + "..."
                                                    : data?.task}

                                            </td>


                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                <div className="flex justify-start items-center">
                                                    <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.isCompleted === 0 && data?.isAssigned === 0 ? 'opacity-100' : 'opacity-60 cursor-not-allowed'}`}
                                                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                        onClick={() => {
                                                            if (data?.isCompleted === 0 || data?.isAssigned === 0) {

                                                                getSingleTicketData(data?.ticketId, data?.ticketId * 2, 7)
                                                            }
                                                        }}

                                                        title='Edit Ticket'
                                                    >
                                                        {
                                                            isButtonClick === (data?.ticketId, data?.ticketId * 2) ?
                                                                <FaSpinner className='h-4 w-4' /> :
                                                                <MdModeEditOutline className='h-4 w-4' />
                                                        }

                                                    </div>
                                                </div>
                                            </td>


                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.clientName}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.isAssigned === 1 && data?.assigneDate}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.isAssigned === 1 && data?.completedDate}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {
                                                    data?.isAssigned === 1 && (
                                                        <div className='flex items-center gap-2 cursor-pointer justify-between'>
                                                            <div>
                                                                {data?.deliveryDate}
                                                            </div>
                                                            <div>

                                                                {
                                                                    user?.defaultCenter === '1' && (
                                                                        <div className="flex justify-start items-center">
                                                                            <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.isCompleted === 0 ? 'opacity-100' : 'opacity-60 cursor-not-allowed'}`}
                                                                                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                                                onClick={() => {
                                                                                    if (data?.isCompleted === 0) {

                                                                                        getSingleTicketData(data?.ticketId, data?.ticketId * 2, 8)

                                                                                    }
                                                                                }}

                                                                                title='Edit Delivery Date'
                                                                            >
                                                                                {
                                                                                    isButtonClick === (data?.ticketId, data?.ticketId * 2) ?
                                                                                        <FaSpinner className='h-4 w-4' /> :
                                                                                        <MdModeEditOutline className='h-4 w-4' />
                                                                                }

                                                                            </div>
                                                                        </div>

                                                                    )
                                                                }




                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.ticketstatus}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.isHold === 1 ? 'Yes' : 'No'}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {
                                                    data?.document && (
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
                                                    )
                                                }
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
                                                {
                                                    user?.defaultCenter === '1' && (
                                                        <div className="flex justify-start items-center">
                                                            <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.isCompleted === 1 ? ' opacity-60 cursor-not-allowed' : 'opacity-100'}`}
                                                                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                                onClick={() => {
                                                                    if (data?.isCompleted === 0) {
                                                                        setShowPopup(1)
                                                                            , setticketSupportFilterData((preventData) => ({
                                                                                ...preventData,
                                                                                ticketId: data?.ticketId
                                                                            }))
                                                                    }
                                                                }}

                                                                title='Assign Ticket'
                                                            >
                                                                <MdAssignmentTurnedIn className='h-4 w-4' />
                                                            </div>
                                                        </div>
                                                    )

                                                }
                                            </td>


                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>

                                                <div className='flex justify-between'>
                                                    <div className="flex justify-start items-center">
                                                        <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.isCompleted === 1 || data?.isReopen === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100'}`}
                                                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                            onClick={() => {
                                                                if (data?.isCompleted === 0 && data?.isReopen !== 1) {
                                                                    setShowPopup(2), setticketSupportFilterData((preventData) => ({
                                                                        ...preventData,
                                                                        ticketId: data?.ticketId
                                                                    }))
                                                                }

                                                            }}

                                                            title='Re Open'
                                                        >
                                                            <FaBookOpen className='h-4 w-4' />
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-start items-center">
                                                        <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                            onClick={() => {
                                                                handelforGetReasonData(data?.reopenReasons, 'ReOpen')
                                                            }}

                                                            title='View Data'
                                                        >

                                                            <IoIosEye className='h-4 w-4' />


                                                        </div>
                                                    </div>
                                                </div>
                                            </td>


                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>

                                                <div className="flex justify-between gap-1">
                                                    <div className="flex justify-start items-center">
                                                        <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.isCompleted === 1 || data?.isClosed === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100'}`}
                                                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                            onClick={() => {
                                                                if (data?.isCompleted === 0 && data?.isClosed !== 1) {
                                                                    setShowPopup(3), setticketSupportFilterData((preventData) => ({
                                                                        ...preventData,
                                                                        ticketId: data?.ticketId
                                                                    }))
                                                                }

                                                            }}


                                                            title='Close'
                                                        >
                                                            <IoMdCloseCircleOutline className='h-4 w-4' />
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-start items-center">
                                                        <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                            onClick={() => {
                                                                handelforGetReasonData(data?.closedRemarks, 'Closed')
                                                            }}

                                                            title='View Data'
                                                        >

                                                            <IoIosEye className='h-4 w-4' />


                                                        </div>
                                                    </div>
                                                </div>

                                            </td>


                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {
                                                    user?.defaultCenter === '1' && (
                                                        <div className='flex justify-between gap-1'>
                                                            <div className="flex justify-start items-center">
                                                                <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.isCompleted === 1 || data?.isHold === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100'}`}
                                                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                                    onClick={() => {
                                                                        if (data?.isCompleted === 0 && data?.isHold !== 1) {
                                                                            setShowPopup(4), setticketSupportFilterData((preventData) => ({
                                                                                ...preventData,
                                                                                ticketId: data?.ticketId
                                                                            }))
                                                                        }

                                                                    }}

                                                                    title='Hold'
                                                                >
                                                                    <FaPauseCircle className='h-4 w-4' />
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-start items-center">
                                                                <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                                    onClick={() => {
                                                                        handelforGetReasonData(data?.holdRemarks, 'Hold')
                                                                    }}

                                                                    title='View Data'
                                                                >

                                                                    <IoIosEye className='h-4 w-4' />


                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </td>


                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>

                                                {
                                                    user?.defaultCenter === '1' && (

                                                        <div className='flex justify-between gap-1'>
                                                            <div className="flex justify-start items-center">
                                                                <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.isCompleted === 1 || data?.isRejected === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100'}`}
                                                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                                    onClick={() => {
                                                                        if (data?.isCompleted === 0 && data?.isRejected !== 1) {
                                                                            setShowPopup(5), setticketSupportFilterData((preventData) => ({
                                                                                ...preventData,
                                                                                ticketId: data?.ticketId
                                                                            }))
                                                                        }

                                                                    }}

                                                                    title='Reject'
                                                                >
                                                                    <MdOutlineClose className='h-4 w-4' />
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-start items-center">
                                                                <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                                    onClick={() => {
                                                                        handelforGetReasonData(data?.rejectedRemarks, 'Reject')
                                                                    }}

                                                                    title='View Data'
                                                                >

                                                                    <IoIosEye className='h-4 w-4' />


                                                                </div>
                                                            </div>
                                                        </div>

                                                    )}
                                            </td>


                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {
                                                    user?.defaultCenter === '1' && (

                                                        <div className='flex justify-between'>
                                                            <div className="flex justify-start items-center">
                                                                <div className={`w-5 h-5 flex justify-center items-center rounded-sm ${data?.isCompleted === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100'}`}
                                                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                                    onClick={() => {
                                                                        if (data?.isCompleted !== 1) {
                                                                            setShowPopup(6), setticketSupportFilterData((preventData) => ({
                                                                                ...preventData,
                                                                                ticketId: data?.ticketId
                                                                            }))
                                                                        }

                                                                    }}

                                                                    title='Complete'
                                                                >
                                                                    <MdOutlineCreditScore className='h-4 w-4' />
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-start items-center">
                                                                <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                                                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                                    onClick={() => {
                                                                        handelforGetReasonData(data?.completeRemarks, 'Completed')
                                                                    }}

                                                                    title='View Data'
                                                                >

                                                                    <IoIosEye className='h-4 w-4' />


                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                }
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
                                    Reject Ticket
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


            {/* edit ticket */}
            {
                showPopup === 7 && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                        <div className="w-80 md:w-[500px] max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                            {/* Header */}
                            <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                                    Edit Ticket
                                </div>
                                <IoMdCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>

                            <FromHeader
                                headerData='Support Ticket'
                            />

                            <form autoComplete='off' onSubmit={onSubmitForSaveRolePageBindData}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-2 mb-1 items-center  mx-1">

                                    <div className='relative flex-1 mt-[1.9px]'>
                                        <CustomDropdown
                                            name="ticketTypeId"
                                            label="Ticket Type"
                                            value={ticketsPopupData?.ticketTypeId || ''}
                                            options={[
                                                { label: 'Select Ticket Type', value: '', disabled: true },
                                                ...allTicketType?.data?.map(item => ({
                                                    label: item?.ticketType,
                                                    value: parseInt(item?.id),
                                                })),
                                            ]}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            defaultIndex={0}
                                            activeTheme={activeTheme}
                                            isMandatory={!Boolean(ticketsPopupData?.ticketTypeId)}
                                        />

                                    </div>


                                    <div className='relative flex-1 mt-[1.9px]'>
                                        <CustomDropdown
                                            name="priority"
                                            label="Select Priority"
                                            value={ticketsPopupData?.priority || ''}
                                            options={[
                                                { label: 'Select Option', value: '', disabled: true },
                                                { label: 'Normal', value: 1 },
                                                { label: 'Medium', value: 2 },
                                                { label: 'High', value: 3 },
                                            ]}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            defaultIndex={0}
                                            activeTheme={activeTheme}
                                            isMandatory={!Boolean(ticketsPopupData?.priority)}
                                        />

                                    </div>

                                    <div className="relative flex-1 ">
                                        <CustomTextBox
                                            type="alphabetandcharWithSpace"
                                            name="ticketSubject"
                                            value={ticketsPopupData?.ticketSubject || ''}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            label="Ticket Subject"
                                            isDisabled={false}
                                            maxLength={50}
                                            allowSpecialChars={false}
                                            isMandatory={!Boolean(ticketsPopupData?.ticketSubject)}
                                            decimalPrecision={4}
                                        />
                                    </div>

                                    <div className="relative flex-1 flex gap-1">
                                        <CustomFileUpload
                                            value={ticketsPopupData?.uploadDocument}
                                            handelImageChange={handelImageChange}
                                            activeTheme={activeTheme}
                                            fileType="pdf"
                                        />
                                        <div className="flex justify-start items-center">
                                            <div className="w-6 h-full flex justify-center items-center rounded-sm cursor-pointer"
                                                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                                onClick={() => {
                                                    openDocument(ticketsPopupData?.document)
                                                }}

                                                title='View Documents'
                                            >
                                                <IoIosEye className='h-4 w-4' />
                                            </div>
                                        </div>
                                    </div>


                                    <div className='flex gap-[0.25rem]'>
                                        <div className="relative flex-1">
                                            <CustomFormButtonWithLoading
                                                activeTheme={activeTheme}
                                                text="Update"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={8} // Unique number for the first button
                                            />
                                        </div>

                                        <div className="relative flex-1">
                                        </div>
                                    </div>

                                </div>

                                <div className='mx-1 mb-2'>
                                    <textarea
                                        rows={4}
                                        maxLength={500}
                                        value={ticketsPopupData?.task}
                                        name='task'
                                        onChange={handelOnChangeTicketPopup}
                                        className={`w-full rounded border-[1.5px] px-1 text-sm font-semibold h-[5.4rem] outline-none bg-white text-[#795548] ${ticketPopupError?.task ? 'border-b-red-500' : 'border-b-borderColor'}`}
                                    />

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


            {/* edit deliverydate */}
            {
                showPopup === 8 && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                        <div className="w-80  max-h-[50vh] z-50 shadow-2xl bg-white rounded-lg animate-slideDown  flex flex-col">

                            {/* Header */}
                            <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                                    Edit Delivery Date
                                </div>
                                <IoMdCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowPopup(0)}
                                />
                            </div>

                            <FromHeader
                                headerData='Edit Ticket Delivery Date '
                            />

                            <form autoComplete='off' onSubmit={onSubmitForSaveRolePageBindData}>
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 mt-2 mb-1 items-center  mx-1">

                                    <div className="relative flex-1">
                                        <DatePicker
                                            id="deliverydate"
                                            name="deliverydate"
                                            value={ticketsPopupData?.deliverydate || ''}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            placeholder=" "
                                            label="DeliveryDate"
                                            activeTheme={activeTheme}
                                            //isDisabled={false}
                                            isMandatory={!Boolean(ticketsPopupData?.deliverydate)}
                                            currentDate={new Date()} // Current date: today
                                            showTime={false}
                                            showBigerCalandar={false}
                                        />
                                    </div>


                                    <div className='flex gap-[0.25rem]'>
                                        <div className="relative flex-1">
                                            <CustomFormButtonWithLoading
                                                activeTheme={activeTheme}
                                                text="Update"
                                                icon={FaSpinner}
                                                isButtonClick={isButtonClick}
                                                loadingButtonNumber={8} // Unique number for the first button
                                            />
                                        </div>

                                        <div className="relative flex-1">
                                        </div>
                                    </div>

                                    <div className="">
                                        {/* <CustomTextBox
                                            type="alphabetandchar"
                                            name="ticketDescription"
                                            value={ticketsPopupData?.ticketDescription || ''}
                                            onChange={(e) => handelOnChangeTicketPopup(e)}
                                            label="Ticket Description"
                                            isDisabled={false}
                                            maxLength={2}
                                            allowSpecialChars={false}
                                            isMandatory={!Boolean(ticketsPopupData?.ticketDescription)}
                                            decimalPrecision={4}
                                        /> */}
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

            {/* reason show popupdata */}
            {
                showPopup === 9 && (
                    <CustomPopupWithResponsive activeTheme={activeTheme} heading={`${getReasonDataFromPopup?.fieldName} Ticket Data`} setShowPopup={setShowPopup} popuptype='medium'>
                        {

                            getReasonDataFromPopup?.reasonData?.map((item, i) => {
                                return (
                                    <div key={i} className='border-[1px] border-[#004B75] bg-white rounded-md' >
                                        <div onClick={() => trogole(i)} className='border-b flex border-[#004B75] justify-between items-center px-2 py-3 cursor-pointer rounded-md'>
                                            <div className='text-xl font-semibold'>{item.addedDate}</div>
                                            <div>
                                                {selected === i ?
                                                    <RiArrowDropUpLine className='text-3xl' />
                                                    :
                                                    <RiArrowDropDownLine className='text-3xl' />
                                                }

                                            </div>
                                        </div>
                                        <div className={` ${selected === i ? 'h-auto px-3 py-2' : 'max-h-0 overflow-hidden'} grid grid-cols-2`}>

                                            {item?.remarks}

                                        </div>


                                    </div>

                                )
                            })
                        }


                    </CustomPopupWithResponsive>
                )
            }

        </>
    )
}
