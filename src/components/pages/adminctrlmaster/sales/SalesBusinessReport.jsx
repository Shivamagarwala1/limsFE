import React from 'react'
import FormHeader from '../../../global/FormHeader'

export default function SalesBusinessReport() {
    return (
        <>
            <FormHeader headerData={'Sales Business Report'} />
            {/* <form autoComplete="off" onSubmit={searchReportDispatchData}>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  my-2  mx-1 lg:mx-2 items-center">

                    <div className="relative flex-1">

                        <CustomSearchInputFields
                            id="centreId"
                            name="centreId"
                            label="Centre"
                            value={reportDispatchData?.centreId}
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
                        <DatePicker
                            id="fromDate"
                            name="fromDate"
                            value={reportDispatchData?.fromDate || ''}
                            onChange={(e) => handelOnChangeForReportDispatch(e)}
                            placeholder=" "
                            label="From Date"
                            activeTheme={activeTheme}
                            currentDate={new Date()} // Current date: today
                            maxDate={new Date(2025, 11, 31)}

                        />
                    </div>

                    <div className='relative flex-1'>
                        <DatePicker
                            id="toDate"
                            name="toDate"
                            value={reportDispatchData?.toDate || ''}
                            onChange={(e) => handelOnChangeForReportDispatch(e)}
                            placeholder=" "
                            label="To Date"
                            activeTheme={activeTheme}
                            currentDate={new Date()} // Current date: today
                            maxDate={new Date(2025, 11, 31)}

                        />
                    </div>


                    <div className="relative flex-1">

                        <CustomDropdown
                            name="searchType"
                            label="Search Type"
                            value={reportDispatchData?.searchType}
                            options={[
                                // { label: 'Select Search Type ', value: 0, disabled: true },
                                { label: 'Sample Recived Date', value: 'tbi.sampleReceiveDate' },
                                { label: 'Sample Collection Date', value: 'tbi.sampleCollectionDate' },
                                { label: 'Booking Date', value: 'tb.bookingDate' },
                                { label: 'Dalivery Date', value: 'tbi.deliveryDate' },
                            ]}
                            onChange={(e) => handelOnChangeForReportDispatch(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                        />
                    </div>

                    <div className="relative flex-1">
                        <CustomTextBox
                            type="charNumberWithSpace"
                            name="barcodeNo"
                            value={reportDispatchData?.barcodeNo || ''}
                            onChange={(e) => handelOnChangeForReportDispatch(e)}
                            label="Barcode No."
                        // showLabel={true}
                        />

                    </div>


                    <div className="relative flex-1">


                        <CustomMultiSelectDropdown
                            id="department"
                            name="department"
                            label="Select Departement"
                            options={allDepartementData?.data}
                            selectedItems={reportDispatchData?.department}
                            onSelectionChange={handelOnChangedepartment}
                            placeholder=" "
                            activeTheme={activeTheme}
                            uniqueId={'id'}
                            searchWithName={'deptName'}
                        />
                    </div>


                    <div className="relative flex-1">

                        <CustomMultiSelectDropdown
                            id="test"
                            name="test"
                            label="Select Test"
                            options={allTestData?.data}
                            selectedItems={reportDispatchData?.test}
                            onSelectionChange={handelOnChangetest}
                            placeholder=" "
                            activeTheme={activeTheme}
                            uniqueId={'itemId'}
                            searchWithName={'itemName'}
                        />
                    </div>


                    <div className="relative flex-1">

                        <CustomSearchInputFields
                            id="user"
                            name="user"
                            label="Search User"
                            value={reportDispatchData?.user}
                            options={allUserData?.data}
                            onChange={(e) => handelOnChangeForReportDispatch(e)}
                            filterText="No records found"
                            placeholder=" "
                            searchWithName="fName"
                            uniqueKey="empid"
                            activeTheme={activeTheme}
                        />

                    </div>

                    <div className="flex gap-[0.25rem]">
                        <div className="relative flex-1">
                            <CustomDropdown
                                name="header"
                                label="Select Header"
                                value={reportDispatchData?.header}
                                options={[
                                    // { label: 'Select Header ', value: 0, disabled: true },
                                    { label: 'Yes ', value: 1 },
                                    { label: 'No', value: 0 },

                                ]}
                                onChange={(e) => handelOnChangeForReportDispatch(e)}
                                defaultIndex={0}
                                activeTheme={activeTheme}
                            />
                        </div>

                        <div className="relative flex-1">
                            <CustomNormalFormButton activeTheme={activeTheme} text={'Search'} />
                        </div>
                    </div>

                    <div className="flex gap-[0.25rem]">

                        <div className="relative flex-1">
                            {/* <CustomeNormalButton activeTheme={activeTheme} text={'Print'}
      
      /> *

                            <CustomFormButton
                                activeTheme={activeTheme}
                                text="Print"
                                icon={FaSpinner}
                                isButtonClick={isButtonClick}
                                loadingButtonNumber={4} // Unique number for the first button
                                onClick={printData}
                            />
                        </div>

                        <div className="relative flex-1">
                        </div>
                    </div>
                </div>


            </form> */}
        </>
    )
}
