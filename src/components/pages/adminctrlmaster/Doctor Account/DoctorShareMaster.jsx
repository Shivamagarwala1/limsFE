import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CustomDropdown from '../../../global/CustomDropdown';
import FormHeader from '../../../global/FormHeader';
import GridDataDetails from '../../../global/GridDataDetails';
import CustomDynamicTable from '../../../global/CustomDynamicTable';
import { doctorShareMasterHeaderApi } from '../../../listData/listData';

export default function DoctorShareMaster() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const [doctorShareMasterData, setDoctorShareMasterData] = useState({
        shareCategory: '1',
        shareType: '1'

    })


    const handelOnChangeDoctorShareMaster = (event) => {
        setDoctorShareMasterData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <>
            <div>

                <FormHeader headerData='Doctor Share Master' activeTheme={activeTheme} />

                <form autoComplete='off'>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">

                        <div className='relative flex-1 mt-[1.9px]'>
                            <CustomDropdown
                                name="shareCategory"
                                label="Share Category"
                                value={doctorShareMasterData?.shareCategory || ''}
                                options={[
                                    { label: 'Default', value: '1' },
                                    { label: 'Special', value: '2' },
                                ]}
                                onChange={(e) => handelOnChangeDoctorShareMaster(e)}
                                defaultIndex={0}
                                activeTheme={activeTheme}
                                isMandatory={false}
                            />
                        </div>


                        <div className='relative flex-1 mt-[1.9px]'>
                            <CustomDropdown
                                name="shareType"
                                label="Share Type"
                                value={doctorShareMasterData?.shareType || ''}
                                options={[
                                    { label: 'Dept. Wise', value: '1' },
                                    { label: 'Test Wise', value: '2' },
                                ]}
                                onChange={(e) => handelOnChangeDoctorShareMaster(e)}
                                defaultIndex={0}
                                activeTheme={activeTheme}
                                isMandatory={false}
                            />
                        </div>


                        {/* data comes from api */}
                        <div className='relative flex-1 mt-[1.9px]'>
                            <CustomDropdown
                                name="centre"
                                label="Centre"
                                value={doctorShareMasterData?.centre || ''}
                                options={[
                                    { label: 'Dept. Wise', value: '1' },
                                    { label: 'Test Wise', value: '2' },
                                ]}
                                onChange={(e) => handelOnChangeDoctorShareMaster(e)}
                                defaultIndex={0}
                                activeTheme={activeTheme}
                                isMandatory={false}
                            />
                        </div>

                        {/* Data comes from api */}
                        <div className='relative flex-1 mt-[1.9px]'>
                            <CustomDropdown
                                name="departement"
                                label="Departement"
                                value={doctorShareMasterData?.centre || ''}
                                options={[
                                    { label: 'Dept. Wise', value: '1' },
                                    { label: 'Test Wise', value: '2' },
                                ]}
                                onChange={(e) => handelOnChangeDoctorShareMaster(e)}
                                defaultIndex={0}
                                activeTheme={activeTheme}
                                isMandatory={false}
                            />
                        </div>

                    </div>
                </form>
            </div>



            <div>
                <GridDataDetails
                    gridDataDetails='Client Master Details'
                    activeTheme={activeTheme}
                />

                <CustomDynamicTable
                    headerData={doctorShareMasterHeaderApi}
                    activeTheme={activeTheme}
                />
            </div>

        </>
    )
}
