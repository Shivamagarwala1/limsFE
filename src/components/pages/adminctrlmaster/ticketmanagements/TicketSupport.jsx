import React, { useState } from 'react'
import FormHeader from '../../../global/FormHeader'
import { DatePicker } from '../../../global/DatePicker'
import { useFormattedDate } from '../../../customehook/useDateTimeFormate'
import { useSelector } from 'react-redux';
import CustomDropdown from '../../../global/CustomDropdown';
import CustomeNormalButton from '../../../global/CustomeNormalButton';

export default function TicketSupport() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);

    const [ticketSupportFilterData, setticketSupportFilterData] = useState({

        ticketAssignType: '',
        assignedDate: useFormattedDate(),
        deliveryDate: useFormattedDate(),
        holdDate: useFormattedDate(),
        closeDate: useFormattedDate(),
        fromDate: useFormattedDate(),
        toDate: useFormattedDate(),
        assignedEngineer: '',
        ticketStatus: ''
    })

    const handelOnChnageTicketSupportFilterData = (e) => {
        setticketSupportFilterData((preventData) => ({
            ...preventData,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <FormHeader headerData='Search Ticket Support' />

            <form autoComplete='off'>
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


                    <div className='relative flex-1 mt-[1.9px]'>
                        <CustomDropdown
                            name="ticketAssignType"
                            label="Date Type"
                            value={ticketSupportFilterData?.ticketAssignType || ''}
                            options={[
                                { label: 'Select Option', value: '', disabled: true },
                                { label: 'Created Date', value: '1' },
                                { label: 'Assign Date', value: '2' },
                                { label: 'Delivery Date', value: '3' },
                                { label: 'Comleted Date', value: '4' },
                            ]}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                            isMandatory={false}
                        />
                    </div>



                    {/* <div className='relative flex-1'>
                        <DatePicker
                            id="deliveryDate"
                            name="deliveryDate"
                            value={ticketSupportFilterData?.deliveryDate || ''}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            placeholder=" "
                            label="Delivery Date"
                            activeTheme={activeTheme}
                            //isDisabled={false}
                            isMandatory={!Boolean(ticketSupportFilterData?.deliveryDate)}
                            currentDate={new Date()} // Current date: today
                            showTime={false}
                            showBigerCalandar={false}
                        />
                    </div>


                    <div className='relative flex-1'>
                        <DatePicker
                            id="holdDate"
                            name="holdDate"
                            value={ticketSupportFilterData?.holdDate || ''}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            placeholder=" "
                            label="Hold Date"
                            activeTheme={activeTheme}
                            //isDisabled={false}
                            isMandatory={!Boolean(ticketSupportFilterData?.holdDate)}
                            currentDate={new Date()} // Current date: today
                            showTime={false}
                            showBigerCalandar={false}
                        />
                    </div>



                    <div className='relative flex-1'>
                        <DatePicker
                            id="closeDate"
                            name="closeDate"
                            value={ticketSupportFilterData?.closeDate || ''}
                            onChange={(e) => handelOnChnageTicketSupportFilterData(e)}
                            placeholder=" "
                            label="Close Date"
                            activeTheme={activeTheme}
                            //isDisabled={false}
                            isMandatory={!Boolean(ticketSupportFilterData?.closeDate)}
                            currentDate={new Date()} // Current date: today
                            showTime={false}
                            showBigerCalandar={false}
                        />
                    </div> */}


                    <div className='relative flex-1 mt-[1.9px]'>
                        <CustomDropdown
                            name="assignedEngineer"
                            label="Assigned Engineer"
                            value={ticketSupportFilterData?.assignedEngineer || ''}
                            options={[
                                { label: 'Select Option', value: '', disabled: true },
                                { label: 'Eng.1', value: '1' },
                                { label: 'Eng.2', value: '2' },
                                { label: 'Eng.3', value: '3' },
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
                                { label: 'Open', value: '1' },
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
                            <CustomeNormalButton activeTheme={activeTheme} text={'Search'} />
                        </div>

                        <div className='relative flex-1'>
                        </div>
                    </div>

                </div>
            </form>
        </>
    )
}
