import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import FormHeader from '../../../global/FormHeader';
import { DatePicker } from '../../../global/DatePicker';
import CustomeNormalButton from '../../../global/CustomeNormalButton';
import { useFormattedDate } from '../../../customehook/useDateTimeFormate';
import CustomSearchInputFields from '../../../global/CustomSearchInputField';
import GridDataDetails from '../../../global/GridDataDetails';

export default function DoctorIPreport() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const [doctorIpReportData, setDoctorIpReportData] = useState({
        fromDateFilterData: useFormattedDate(),
        toDate: useFormattedDate(),
        doctor: '',
        pro: ''
    })

    const handelOnChangeFilterFeedbackData = (e) => {
        setDoctorIpReportData((preventData) => ({
            ...preventData,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>

            <FormHeader
                headerData='Doctor IP Report'
            />

            <form autoComplete='off'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">
                    <div className='relative flex-1'>
                        <DatePicker
                            id="fromDateFilterData"
                            name="fromDateFilterData"
                            value={doctorIpReportData?.fromDateFilterData || ''}
                            onChange={(e) => handelOnChangeFilterFeedbackData(e)}
                            placeholder=" "
                            label="From Date"
                            activeTheme={activeTheme}
                            //isDisabled={false}
                            isMandatory={false}
                            currentDate={new Date()} // Current date: today

                            showTime={false}
                            showBigerCalandar={false}
                        />
                    </div>


                    <div className='relative flex-1'>
                        <DatePicker
                            id="toDate"
                            name="toDate"
                            value={doctorIpReportData?.toDate || ''}
                            onChange={(e) => handelOnChangeFilterFeedbackData(e)}
                            placeholder=" "
                            label="To Date"
                            activeTheme={activeTheme}
                            //isDisabled={false}
                            isMandatory={false}
                            currentDate={new Date()} // Current date: today

                            showTime={false}
                            showBigerCalandar={false}
                        />
                    </div>


                    <div className="relative flex-1">
                        <CustomSearchInputFields
                            id="doctor"
                            name="doctor"
                            label="Doctor"
                            value={doctorIpReportData?.doctor}
                            options={[{ id: 1, label: 'Label1' }, { id: 2, label: 'Label1' }, { id: 3, label: 'Label1' }, { id: 4, label: 'Label1' },]}
                            onChange={handelOnChangeFilterFeedbackData}
                            filterText="No records found"
                            placeholder=" "
                            searchWithName='label'
                            uniqueKey='id'
                            activeTheme={activeTheme}
                        />
                    </div>


                    <div className="relative flex-1">
                        <CustomSearchInputFields
                            id="pro"
                            name="pro"
                            label="Pro"
                            value={doctorIpReportData?.pro}
                            options={[{ id: 1, label: 'Label1' }, { id: 2, label: 'Label1' }, { id: 3, label: 'Label1' }, { id: 4, label: 'Label1' },]}
                            onChange={handelOnChangeFilterFeedbackData}
                            filterText="No records found"
                            placeholder=" "
                            searchWithName='label'
                            uniqueKey='id'
                            activeTheme={activeTheme}
                        />
                    </div>


                    <div className='flex  gap-[0.25rem]'>
                        <div className="relative flex-1">
                            <CustomeNormalButton

                                activeTheme={activeTheme}
                                text='Get PDF'
                            // onClick={exportDataInExcelFormate}
                            />
                        </div>

                        <div className="relative flex-1">
                            <CustomeNormalButton

                                activeTheme={activeTheme}
                                text='New Excel'
                            // onClick={exportDataInExcelFormate}
                            />
                        </div>
                    </div>


                    <div className='flex  gap-[0.25rem]'>
                        <div className="relative flex-1">
                            <CustomeNormalButton

                                activeTheme={activeTheme}
                                text='Search'
                            // onClick={exportDataInExcelFormate}
                            />
                        </div>

                        <div className="relative flex-1"></div>

                    </div>
                </div>
            </form>


            <GridDataDetails
                gridDataDetails='Doctor IP Report Details'
            />
        </>
    )
}
