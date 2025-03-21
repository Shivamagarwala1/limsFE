import React, { useEffect, useState } from 'react'
import FormHeader from '../../../global/FormHeader'
import { DatePicker } from '../../../global/DatePicker'
import { useFormattedDate } from '../../../customehook/useDateTimeFormate'
import { useSelector } from 'react-redux';
import CustomDropdown from '../../../global/CustomDropdown';
import CustomeNormalButton from '../../../global/CustomeNormalButton';
import GridDataDetails from '../../../global/GridDataDetails';
import CustomDynamicTable from '../../../global/CustomDynamicTable'
import { useRetrieveData } from '../../../../service/service';
import CustomFormButtonWithLoading from '../../../global/CustomFormButtonWithLoading';
import { FaSpinner } from 'react-icons/fa6';
import CustomLoadingPage from '../../../global/CustomLoadingPage';
import CustomPopupWithResponsive from "../../../global/CustomPopupWithResponsive";

import { MdAssignmentTurnedIn } from 'react-icons/md';

export default function TicketSupport() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);

    const [ticketSupportFilterData, setticketSupportFilterData] = useState({
        fromDate: useFormattedDate(),
        toDate: useFormattedDate(),
        assignedEngineer: 0,
        ticketStatus: 0
    });
    const [isButtonClick, setIsButtonClick] = useState(0);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [showPopup, setShowPopup] = useState(0);

    const allAssignedEng = useRetrieveData();
    const allTicketSupportData = useRetrieveData();

    useEffect(() => {

        const getAllData = async () => {

            await allAssignedEng.fetchDataFromApi(`/empMaster?select=empid,fname,lname&$filter=(isactive eq 1)`)
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

        console.log(ticketSupportFilterData);

        await allTicketSupportData.fetchDataFromApi(`/supportTicket/GetTicketDetails?FromDate=${ticketSupportFilterData?.fromDate}&Todate=${ticketSupportFilterData?.toDate}&Status=${ticketSupportFilterData?.ticketStatus}&assingedto=${ticketSupportFilterData?.assignedEngineer}`);

        setIsButtonClick(0);
    }

    console.log(allTicketSupportData);


    return (
        <>
            <FormHeader headerData='Search Ticket Support' />

            <form autoComplete='off' onSubmit={onSubmitSearchData}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 items-center  mx-1">


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



                    <div className='relative flex-1 mt-[1.9px]'>
                        <CustomDropdown
                            name="ticketStatus"
                            label="Ticket Status"
                            value={ticketSupportFilterData?.ticketStatus || ''}
                            options={[
                                { label: 'Select Option', value: '', disabled: true },
                                { label: 'Open', value: '0' },
                                { label: 'Hold', value: '2' },
                                { label: 'Reject', value: '3' },
                                { label: 'Delivered', value: '4' },
                                { label: 'Close', value: '5' },
                                { label: 'Re-Open', value: '6' },
                            ]}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                            isMandatory={false}
                        />
                    </div>

                    <div className='flex gap-[0.25rem]'>

                        <div className='relative flex-1'>
                            <CustomFormButtonWithLoading
                                activeTheme={activeTheme}
                                text="Send"
                                icon={FaSpinner}
                                isButtonClick={isButtonClick}
                                loadingButtonNumber={1} // Unique number for the first button
                            />
                        </div>

                        <div className='relative flex-1'>
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
                        <CustomDynamicTable activeTheme={activeTheme} columns={['SR. NO.', "Client Name", "Ticket Type", "Task", "Created Date", , "Action Taken", "Assigned To", "Action"]} >
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
                                                {data?.clientName}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.ticketType}
                                            </td>

                                            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                                                {data?.task}
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
                                                        onClick={() => setShowPopup(1)}
                                                    >
                                                        <MdAssignmentTurnedIn />
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

                    <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Assign Ticket'} setShowPopup={setShowPopup}>

                       
                        <form autoComplete='off' >
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mx-1 lg:mx-2 items-center relative my-2">
                                <div className='relative flex-1 '>
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
                                    <CustomFormButtonWithLoading
                                        activeTheme={activeTheme}
                                        text="Send"
                                        icon={FaSpinner}
                                        isButtonClick={isButtonClick}
                                        loadingButtonNumber={2} // Unique number for the first button
                                    />
                                </div>

                            </div>

                        </form>
                    </CustomPopupWithResponsive>
                )
            }
        </>
    )
}
