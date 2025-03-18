import React, { useEffect, useState } from 'react'
import FormHeader from '../../global/FormHeader'
import CustomSearchInputFields from '../../global/CustomSearchDropdown'
import CustomMultiSelectDropdown from '../../global/CustomMultiSelectDropdown'
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import CustomFormButton from '../../global/CustomFormButton';
import GridDataDetails from '../../global/GridDataDetails';
import CustomDynamicTable from '../../global/CustomDynamicTable';
import { useRetrieveData } from '../../../service/service';
import { toast } from 'react-toastify';
import CustomFormButtonWithLoading from '../../global/CustomFormButtonWithLoading';

export default function RolePageBind() {


    const activeTheme = useSelector((state) => state.theme.activeTheme);

    const [isButtonClick, setIsButtonClick] = useState(0);
    const [rolePageBindData, setRolePageBindData] = useState({
        roleId: '',
        menuId: '',
        subMenuId: []
    });

    const allRoleData = useRetrieveData();
    const allSubMenuData = useRetrieveData();
    const allMenuData = useRetrieveData();

    useEffect(() => {

        const getAllData = async () => {

            try {
                await allRoleData.fetchDataFromApi('/roleMaster?select=id,roleName&$filter=(isActive eq 1)');

                await allMenuData.fetchDataFromApi(`/menuMaster?select=id,menuName&$filter=(isActive eq 1 and parentId eq 0)`);

            } catch (error) {
                toast.error(error?.message)
            }
        }

        getAllData();

    }, [])


    useEffect(() => {

        const getData = async () => {
            try {
                await allSubMenuData.fetchDataFromApi(`/menuMaster?select=id,menuName&$filter=(isActive eq 1 and parentId eq ${rolePageBindData?.menuId?.id})`)
            } catch (error) {
                toast.error(error?.message);
            }
        }

        if (rolePageBindData?.menuId !== '') {
            getData();
        }

    }, [rolePageBindData?.menuId])

    const handelOnChangePageBindData = (event) => {

        setRolePageBindData((preventData) => ({
            ...preventData,
            [event.target.name]: event.target.value
        }))
    }


    const handelOnChangeRolePageBindForMultiSelect = (updatedSelectedItems) => {
        setRolePageBindData((prevData) => ({
            ...prevData,
            subMenuId: updatedSelectedItems, // Update the array of selected items
        }));
    };


    const onSubmitForSaveRolePageBindData = async (event) => {

        event.preventDefault();

        setIsButtonClick(1);

        console.log(rolePageBindData);

        setTimeout(() => {
            setIsButtonClick(0)
        }, 2000);
    }


    return (
        <>
            <FormHeader headerData='Role Page Bind' />

            <form autoComplete='off' onSubmit={onSubmitForSaveRolePageBindData}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mt-2 mb-1 items-center  mx-1 lg:mx-2">

                    <div className="relative flex-1">
                        <CustomSearchInputFields
                            id="roleId"
                            name="roleId"
                            label="Role"
                            value={rolePageBindData?.roleId}
                            options={allRoleData?.data}
                            onChange={(e) => handelOnChangePageBindData(e)}
                            filterText="No records found"
                            placeholder=" "
                            searchWithName="roleName"
                            uniqueKey="id"
                            activeTheme={activeTheme}
                        />

                    </div>

                    <div className="relative flex-1">
                        <CustomSearchInputFields
                            id="menuId"
                            name="menuId"
                            label="Menu"
                            value={rolePageBindData?.menuId}
                            options={allMenuData?.data}
                            onChange={(e) => handelOnChangePageBindData(e)}
                            filterText="No records found"
                            placeholder=" "
                            searchWithName="menuName"
                            uniqueKey="id"
                            activeTheme={activeTheme}
                        />

                    </div>


                    <div className="relative flex-1">


                        <CustomMultiSelectDropdown
                            id="subMenuId"
                            name="subMenuId"
                            label="Select Submenu"
                            options={allSubMenuData?.data}
                            selectedItems={rolePageBindData?.subMenuId}
                            onSelectionChange={handelOnChangeRolePageBindForMultiSelect}
                            placeholder=" "
                            activeTheme={activeTheme}
                            uniqueId={'id'}
                            searchWithName={'menuName'}
                        />
                    </div>

                    <div className='flex  gap-[0.25rem]'>
                        <div className="relative flex-1">
                            <CustomFormButtonWithLoading
                                activeTheme={activeTheme}
                                text="Save"
                                icon={FaSpinner}
                                isButtonClick={isButtonClick}
                                loadingButtonNumber={1} // Unique number for the first button
                            />
                        </div>

                        <div className="relative flex-1"></div>

                    </div>
                </div>
            </form>

            <GridDataDetails gridDataDetails={'Role Page Bind Details'} />
            {/* <CustomDynamicTable headers={headers} bodyData={bodyData} label={label} activeTheme={activeTheme} /> */}
        </>
    )
}
