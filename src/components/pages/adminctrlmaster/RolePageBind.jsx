import React, { useState } from 'react'
import FormHeader from '../../global/FormHeader'
import CustomSearchInputFields from '../../global/CustomSearchDropdown'
import CustomMultiSelectDropdown from '../../global/CustomMultiSelectDropdown'
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import CustomFormButton from '../../global/CustomFormButton';
import GridDataDetails from '../../global/GridDataDetails';
import CustomDynamicTable from '../../global/CustomDynamicTable';

export default function RolePageBind() {


    const headers = ["Name", "Age", "Email"];
    const bodyData = [
        ["John Doe", 25, "john@example.com"],
        ["Jane Smith", 30, "jane@example.com"],
        ["Alice Johnson", 35, "alice@example.com"],
    ];
    const label = "User Information";

    const activeTheme = useSelector((state) => state.theme.activeTheme);

    const [rolePageBindData, setRolePageBindData] = useState({
        role: '',
        menu: '',
        subMenu: []
    })
    const [isButtonClick, setIsButtonClick] = useState(0);

    const handelOnChangePageBindData = (event) => {

        setRolePageBindData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


    const handelOnChangeRolePageBindForMultiSelect = (updatedSelectedItems) => {
        setRolePageBindData((prevData) => ({
            ...prevData,
            subMenu: updatedSelectedItems, // Update the array of selected items
        }));
    };

    const onSubmitForSaveRolePageBindData = async () => {

        setIsButtonClick(1);

        console.log(rolePageBindData);

        setTimeout(() => {
            setIsButtonClick(0)
        }, 2000);
    }

    return (
        <>
            <FormHeader
                headerData='Role Page Bind'
            />

            <form autoComplete='off'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">

                    <div className="relative flex-1">
                        <CustomSearchInputFields
                            id="role"
                            name="role"
                            label="Role"
                            value={rolePageBindData?.role}
                            options={[{ id: 1, label: 'Label1' }, { id: 2, label: 'Label1' }, { id: 3, label: 'Label1' }, { id: 4, label: 'Label1' },]}
                            onChange={handelOnChangePageBindData}
                            filterText="No records found"
                            placeholder=" "
                            searchWithName='label'
                            uniqueKey='id'
                            activeTheme={activeTheme}
                        />
                    </div>

                    <div className="relative flex-1">
                        <CustomSearchInputFields
                            id="menu"
                            name="menu"
                            label="Menu"
                            value={rolePageBindData?.menu}
                            options={[{ id: 1, label: 'Label1' }, { id: 2, label: 'Label1' }, { id: 3, label: 'Label1' }, { id: 4, label: 'Label1' },]}
                            onChange={handelOnChangePageBindData}
                            filterText="No records found"
                            placeholder=" "
                            searchWithName='label'
                            uniqueKey='id'
                            activeTheme={activeTheme}
                        />
                    </div>


                    <div className="relative flex-1">
                        <CustomMultiSelectDropdown
                            id="subMenu"
                            name="subMenu"
                            label="Submenu"
                            options={[
                                { id: 1, deptName: "HR", departmentId: "HR001" },
                                { id: 2, deptName: "Engineering", departmentId: "ENG001" },
                                { id: 4, deptName: "Sales", departmentId: "SAL001" },
                                { id: 5, deptName: "Sales", departmentId: "SAL001" },
                                { id: 6, deptName: "Sales", departmentId: "SAL001" },
                                { id: 7, deptName: "Sales", departmentId: "SAL001" },
                                { id: 8, deptName: "Sales", departmentId: "SAL001" },
                                { id: 9, deptName: "Sales", departmentId: "SAL001" },
                                { id: 10, deptName: "Sales", departmentId: "SAL001" },
                                { id: 11, deptName: "Sales", departmentId: "SAL001" },
                            ]}
                            selectedItems={rolePageBindData?.subMenu}
                            onSelectionChange={handelOnChangeRolePageBindForMultiSelect}
                            placeholder=" "
                            activeTheme={activeTheme}
                            searchWithName={'deptName'}
                        />
                    </div>


                    <div className='flex  gap-[0.25rem]'>
                        <div className="relative flex-1">
                            <CustomFormButton
                                activeTheme={activeTheme}
                                text="Save"
                                icon={FaSpinner}
                                isButtonClick={isButtonClick}
                                loadingButtonNumber={1} // Unique number for the first button
                                onClick={() => onSubmitForSaveRolePageBindData()} // Pass button number to handler
                            />
                        </div>

                        <div className="relative flex-1"></div>

                    </div>

                </div>
            </form>

            <GridDataDetails gridDataDetails={'Role Page Bind Details'} />
            <CustomDynamicTable headers={headers} bodyData={bodyData} label={label} activeTheme={activeTheme} />
        </>
    )
}
