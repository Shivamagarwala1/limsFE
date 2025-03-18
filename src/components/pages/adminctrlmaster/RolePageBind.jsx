import React, { useEffect, useState } from 'react'
import FormHeader from '../../global/FormHeader'
import CustomSearchInputFields from '../../global/CustomSearchDropdown'
import CustomMultiSelectDropdown from '../../global/CustomMultiSelectDropdown'
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import GridDataDetails from '../../global/GridDataDetails';
import CustomDynamicTable from '../../global/CustomDynamicTable';
import { usePostData, useRetrieveData } from '../../../service/service';
import { toast } from 'react-toastify';
import CustomFormButtonWithLoading from '../../global/CustomFormButtonWithLoading';
import { useFormattedDate } from '../../customehook/useDateTimeFormate';
import CustomLoadingPage from '../../global/CustomLoadingPage'
import { MdDelete } from 'react-icons/md';
import { IoAlertCircleOutline } from 'react-icons/io5';
import CustomeNormalButton from '../../global/CustomeNormalButton';
import CustomFormButton from '../../global/CustomFormButton';

export default function RolePageBind() {


    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);
    const [isHoveredTable, setIsHoveredTable] = useState(null);

    const [isButtonClick, setIsButtonClick] = useState(0);
    const [rolePageBindData, setRolePageBindData] = useState({
        roleId: '',
        menuId: '',
        subMenuId: [],
        createdDateTime: useFormattedDate()
    });
    const [showPopup, setShowPopup] = useState(0);
    const [selectedId, setSelectedId] = useState(0)
    const allRoleData = useRetrieveData();
    const allSubMenuData = useRetrieveData();
    const allMenuData = useRetrieveData();
    const allGridMenuData = useRetrieveData();
    const getData = useRetrieveData();
    const postData = usePostData();

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


        const updatedData = rolePageBindData?.subMenuId?.map((data) => (
            {
                "isActive": 1,
                "createdById": parseInt(user?.employeeId),
                "createdDateTime": rolePageBindData?.createdDateTime,
                "updateById": 0,
                "updateDateTime": new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z'))
                    .toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
                "id": 0,
                "roleid": rolePageBindData?.roleId?.id,
                "parentmenuid": rolePageBindData?.menuId?.id,
                "submenuId": data?.id
            }
        ))


        try {
            const response = await postData.postRequestData(`/roleMenuAccess/SaveRolePageAccess`, updatedData);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message);
            }

        } catch (error) {
            toast.error(error?.message);
        }

        setIsButtonClick(0)

    }


    useEffect(() => {

        const getAllData = async () => {
            await allGridMenuData?.fetchDataFromApi(`/roleMenuAccess/RolePagebindData?roleid=${parseInt(user?.defaultRole)}`)
        }
        getAllData();

    }, [isButtonClick])

    //delete menu
    const deleteRolePageBindData = async () => {
        setIsButtonClick(2);
        try {
            const response = await getData.fetchDataFromApi(`/roleMenuAccess/RolePageAccessRemove?Id=${selectedId}`);

            if (response?.success) {
                toast.success(response?.message);
            } else {
                toast.error(response?.message)
            }
        } catch (error) {
            toast.error(error?.message);
        }
        setShowPopup(0);
        setIsButtonClick(0);
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
            {
                allGridMenuData?.loading ?
                    <CustomLoadingPage />
                    :
                    <CustomDynamicTable activeTheme={activeTheme} columns={['SR. No.', 'Role Name', 'Menu Name', 'Sub Menu Name',  'Actions']}>
                        <tbody >
                            {
                                allGridMenuData?.data?.data?.map((data, index) => (
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


                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.roleName}
                                        </td>


                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.menuMame}
                                        </td>



                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            {data?.subMenuName}
                                        </td>

                                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                            <MdDelete className='text-red-500 w-4 h-4'
                                                onClick={() => { setShowPopup(1), setSelectedId(data?.id) }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </CustomDynamicTable>
            }

            {
                showPopup === 1 && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50">
                            <div className="flex mt-3 items-center">
                                <IoAlertCircleOutline
                                    className="w-8 h-8"
                                    style={{ color: activeTheme?.menuColor }}
                                />
                            </div>

                            <div className="text-xs font-semibold text-textColor/50">
                                Are you sure want to Delete ?
                            </div>

                            <div className="flex items-end gap-5 my-5">
                                <div className="w-20">
                                    <CustomeNormalButton activeTheme={activeTheme} onClick={() => setShowPopup(0)} text={'Cencle'} />
                                </div>


                                <div className="w-20">
                                    <CustomFormButton
                                        activeTheme={activeTheme}
                                        text="Yes"
                                        icon={FaSpinner}
                                        isButtonClick={isButtonClick}
                                        loadingButtonNumber={2} // Unique number for the first button
                                        onClick={deleteRolePageBindData}
                                    />
                                </div>

                            </div>



                        </div>
                    </div>
                )
            }
        </>
    )
}
