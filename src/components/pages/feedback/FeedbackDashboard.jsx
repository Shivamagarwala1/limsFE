import React, { useState } from 'react'
import FormHeader from '../../global/FormHeader'
import FeedbackDashboardCard from './FeedbackDashboardCard'

import { IconData } from './FeedBackPopup'
import GridDataDetails from '../../global/GridDataDetails'
import { DatePicker } from '../../global/DatePicker'
import { useFormattedDate } from '../../customehook/useDateTimeFormate'
import { useSelector } from 'react-redux'
import CustomSearchInputFields from '../../global/CustomSearchInputField'
import CustomeNormalButton from '../../global/CustomeNormalButton'

export default function FeedbackDashboard() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);

    const [filterFeedbackGridData, setFilterFeedbackGridData] = useState({
        fromDateFilterData: useFormattedDate(),
        toDate: useFormattedDate(),
        centre: '',
        filterWithTitle: ''
    })


    const handelOnChangeFilterFeedbackData = (e) => {

        setFilterFeedbackGridData((preventData) => ({
            ...preventData,
            [e.target.name]: e.target.value
        }))
    }


    const exportDataInExcelFormate = () => {
        console.log('export data');

    }

    return (
        <>
            <FormHeader headerData='Feedback DashBoard' />

            {/* feedback card */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 my-2 items-center  mx-1 lg:mx-2'>

                {
                    IconData?.map((data, index) => {
                        // Define the number of feedback dynamically inside the map
                        const numberOfFeedbacks = [12, 8, 15, 25, 30]; // Corresponding feedback numbers
                        const numberOfFeedback = numberOfFeedbacks[index]; // Get the number based on the index

                        return (
                            <FeedbackDashboardCard
                                key={index}
                                icon={data.icon}
                                color={data?.color}
                                title={data?.title}
                                numberOfFeedback={numberOfFeedback} // Pass the number dynamically
                            />
                        );
                    })
                }

            </div>

            <GridDataDetails gridDataDetails='Filter Feedback Data' />


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 my-2 items-center  mx-1 lg:mx-2'>

                <div className='relative flex-1'>
                    <DatePicker
                        id="fromDateFilterData"
                        name="fromDateFilterData"
                        value={filterFeedbackGridData?.fromDateFilterData || ''}
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
                        value={filterFeedbackGridData?.toDate || ''}
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
                        id="centre"
                        name="centre"
                        label="Centre"
                        value={filterFeedbackGridData?.centre}
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
                    <CustomeNormalButton

                        activeTheme={activeTheme}
                        text='Export Data In Excel'
                        onClick={exportDataInExcelFormate}
                    />
                </div>
            </div>


            <GridDataDetails gridDataDetails='Feedback Details' />
        </>
    )
}
