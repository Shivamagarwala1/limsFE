import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { deleteEmpPageAccessApi, getAllEmployeeApi, getAllEmployeePageAccessApi, getAllMenuApi, getAllRoleApi, getAllSubMenuData, saveEmployeePageAccessApi } from '../../../../service/service';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaArrowDown, FaArrowUp, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { IoMdMenu } from 'react-icons/io';
import { employeePageAccessData } from '../../../listData/listData';
import { IoAlertCircleOutline, IoClose } from 'react-icons/io5';
import useRippleEffect from '../../../customehook/useRippleEffect';
import CustomDynamicTable from '../../../global/CustomDynamicTable';
import { CustomTextBox } from '../../../global/CustomTextBox';

export default function EmployeePageAccess() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    useRippleEffect();

    const [formData, setFormData] = useState({
        roleId: '',
        menuId: '',
        employeeId: '',
        subMenuId: ''
    });
    const [searchDropwDownMenuList, setSearchDropwDownMenuList] = useState({
        serachEmployeeList: '',
        searchSubMenuList: ''
    });
    const [showSearchBarRoleDropDown, setShowSearchBarRoleDropDown] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
    const [isButtonClick, setIsButtonClick] = useState(false);
    const [showActivePopup, setShowActivePopup] = useState(false);
    const [removePageAccessId, setremovePageAccessId] = useState(null);
    const [allRoleData, setAllRoleData] = useState([]);
    const [allMenuData, setAllMenuData] = useState([]);
    const [isButtonClickForMenuUpdate, setIsButtonClickForMenuUpdate] = useState(false);
    const [allEmployeeData, setAllEmployeeData] = useState([]);
    const [allSubMenuData, setAllSubMenuData] = useState([]);
    const [allPageAccessData, setAllPageAccessData] = useState([]);
    const [allPageAccessPaginationData, setAllPageAccessPaginationData] = useState({
        top: 100, //total number of page 
        skip: 0,
        totalColum: 0
    });

    const [expandedEmpId, setExpandedEmpId] = useState(null);
    const [isHoveredTableChild, setIsHoveredTableChild] = useState(null);
    const [clientSearchData, setClientSearchData] = useState('');

    const groupedData = Object.groupBy(allPageAccessData, (data) => data?.empId);
    const [filterAllCentreData, setFilterAllCentreData] = useState(groupedData || []);


    //itemtype,itemname,test code,departement,gender,record type
    const [selectedValue, setSelectedValue] = useState({
        selectedRoleData: '',
        selectedMenuData: ''
    });
    const [isValid, setIsValid] = useState({
        roleId: true,
        menuId: true,
        employeeId: true,
        subMenuId: true,
    });




    useEffect(() => {

        async function getRoleData() {
            await getAllRoleApi().then((resp) => {
                setAllRoleData(resp);
            }).catch((err) => {
                console.log(err);

            })
        }
        getRoleData();

        async function getAllMenu() {

            await getAllMenuApi().then((resp) => {

                setAllMenuData(resp);

            }).catch((err) => {

                toast.error('Getting menu data error')

            })
        }
        getAllMenu();


        async function getAllEmployee() {

            await getAllEmployeeApi().then((resp) => {

                setAllEmployeeData(resp);

            }).catch((err) => {

                toast.error('Getting menu data error')

            })
        }
        getAllEmployee();



    }, [])


    useEffect(() => {
        async function getAllEmpPageAccessName() {
            await getAllEmployeePageAccessApi(allPageAccessPaginationData.top, allPageAccessPaginationData.skip).then((resp) => {
                if (resp?.success) {
                    setAllPageAccessPaginationData((data) => ({ ...data, totalColum: resp?.count }))
                    setAllPageAccessData(resp?.data);
                    setFilterAllCentreData(Object.groupBy(resp?.data, (data) => data?.empId))
                }
            }).catch((err) => {
                console.log(err);

            })
        }

        getAllEmpPageAccessName();
    }, [allPageAccessPaginationData.top, allPageAccessPaginationData.skip, isButtonClickForMenuUpdate, isButtonClick])


    const openShowSearchBarDropDown = (value) => {
        setShowSearchBarRoleDropDown(value);
    }

    const handleOptionClickForCentre = async (roleName, id, value) => {
        if (value === 1) {
            setSelectedValue({ ...selectedValue, selectedRoleData: roleName });
            setFormData((prevData) => ({ ...prevData, roleId: id }));
        } else {
            setSelectedValue({ ...selectedValue, selectedMenuData: roleName });
            setFormData((prevData) => ({ ...prevData, menuId: id }));

            //get all sub menu based on 
            await getAllSubMenuData(id).then((resp) => {
                setAllSubMenuData(resp);
            }).catch((err) => {
                console.log(err);
            })
        }
        setShowSearchBarRoleDropDown(0);
    }

    const filterRoleData = allRoleData?.filter((data) =>
        data?.roleName.toLowerCase().includes(String(formData?.roleId || '').toLowerCase()
        )
    );

    const filterMenuData = allMenuData?.filter((data) =>
        data?.menuName.toLowerCase().includes(String(formData?.menuId || '').toLowerCase()
        )
    );

    const validateFormData = (formData) => {
        const updatedIsValid = {
            roleId: formData.roleId ? true : false,
            menuId: formData.menuId ? true : false,
            employeeId: formData.employeeId ? true : false,
            subMenuId: formData.subMenuId ? true : false,
        };

        // Check if any field is invalid
        return !Object.values(updatedIsValid).includes(false); // Returns true if all fields are valid, otherwise false
    };

    const onSubmitEmployeeData = async (event) => {
        event.preventDefault();
        setIsButtonClick(true);

        const isValid = validateFormData(formData); // Use the validation function

        if (isValid) {
            try {
                const resp = await saveEmployeePageAccessApi(formData);
                if (resp?.success) {
                    toast.success(resp?.message);
                    setFormData({
                        roleId: '',
                        menuId: '',
                        employeeId: '',
                        subMenuId: ''
                    })
                }
            } catch (err) {
                console.error(err);
            }
        }

        setIsButtonClick(false);
    };


    //delete active menu
    const handleDeleteEmpPageAccess = async () => {

        setIsButtonClickForMenuUpdate(true);

        await deleteEmpPageAccessApi(removePageAccessId).then((resp) => {
            if (resp?.success) {
                toast.success(resp?.message)
            } else {
                toast.error(resp?.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err?.message);
        })

        setShowActivePopup(false)
        setIsButtonClickForMenuUpdate(false);
    }


    //handleing search menu data
    const handleSearchMultiSelectDropDown = (event) => {
        setSearchDropwDownMenuList({ ...searchDropwDownMenuList, [event.target.name]: event.target.value });
    }

    const filterSubMenuList = allSubMenuData.filter((data) => data?.menuName.toLowerCase().includes(searchDropwDownMenuList.searchSubMenuList.toLowerCase()));

    const filterEmployeeList = allEmployeeData.filter((data) => data?.fName.toLowerCase().includes(searchDropwDownMenuList.serachEmployeeList.toLowerCase()));

    // console.log(Object.entries(groupedData));

    // //search employee data
    const handelOnChangeForClientSearchData = (e) => {
        const searchValue = e.target.value.toLowerCase(); // Get lowercase search value
        setClientSearchData(searchValue);

        // Filter groupedData based on client name
        const filteredResults = Object.entries(groupedData) // Assuming allCentreData is your groupedData
            .map(([key, values]) => [
                key,
                values.filter((item) =>
                    item?.name?.toLowerCase().includes(searchValue)
                )
            ])
            .filter(([key, values]) => values.length > 0); // Remove empty groups

        // Convert back to object if needed
        const filteredObject = Object.fromEntries(filteredResults);

        // Set the filtered data
        setFilterAllCentreData(filteredObject);
    };


    return (
        <>
            <div
                className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
                style={{ background: activeTheme?.blockColor }}
            >
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                </div>
                <div>Employee Page Access</div>
            </div>


            {/* form data */}
            <div>
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">


                        <div className="relative flex-1">
                            <div
                                className={`flex peer items-center border-[1.5px] border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white ${isValid.roleId ? '' : 'border-b-red-500'}`}
                            >
                                <input
                                    type="search"
                                    id="roleId"
                                    name="roleId"
                                    value={selectedValue?.selectedRoleData
                                        || formData.roleId || ''
                                    }
                                    onChange={(e) => {
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            roleId: e.target.value, // Update formData with search input
                                        }));
                                        //setShowSearchBarRoleDropDown(true);
                                        setSelectedValue((prevState) => ({
                                            ...prevState,  // Spread the previous state to retain other properties
                                            selectedRoleData: '',  // Update only the specific property
                                        }));
                                    }}
                                    autoComplete="off"
                                    className=" w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                    placeholder='Search Data'
                                    onClick={() => openShowSearchBarDropDown(1)}
                                    required

                                />

                                <label htmlFor="roleId" className="menuPeerLevel">
                                    Role
                                </label>
                            </div>

                            {/* Dropdown to select the menu */}
                            {showSearchBarRoleDropDown === 1 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>
                                        {filterRoleData?.length > 0 ? (
                                            filterRoleData?.map((data, index) => (
                                                <li
                                                    key={data?.id}

                                                    className="my-1 px-2 cursor-pointer"
                                                    onClick={() => {
                                                        handleOptionClickForCentre(data?.roleName, data?.id, 1),
                                                            setIsValid((prevState) => ({
                                                                ...prevState,
                                                                roleId: true,
                                                            }))
                                                    }}
                                                    onMouseEnter={() => setIsHovered(index)}
                                                    onMouseLeave={() => setIsHovered(null)}
                                                    style={{
                                                        background: isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                    }}
                                                >
                                                    {data?.roleName}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="py-4 text-gray-500 text-center">
                                                {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                            </li>
                                        )}

                                    </ul>
                                </div>
                            )}

                        </div>

                        <div className="relative flex-1">
                            <div
                                className={`flex justify-between pl-2 items-center border-[1.5px] border-borderColor font-semibold rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white 
                                ${isValid.employeeId === true ? '' : 'border-b-red-500'}`}
                                onClick={() => showSearchBarRoleDropDown !== 3 ? openShowSearchBarDropDown(3) : openShowSearchBarDropDown(0)}
                            >

                                <div>
                                    Employee List
                                </div>
                                <div>
                                    {
                                        showSearchBarRoleDropDown === 3 ? <RiArrowDropUpLine className='text-xl cursor-pointer' /> : <RiArrowDropDownLine className='text-xl cursor-pointer' />
                                    }
                                </div>
                            </div>

                            {/* Dropdown to select the menu */}
                            {showSearchBarRoleDropDown === 3 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>
                                        {/* Select All Checkbox */}
                                        {allEmployeeData?.length > 0 && (
                                            <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full">
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            formData.employeeId.split(',').length === allEmployeeData?.length && allEmployeeData?.length > 0
                                                        } // Check if all are selected
                                                        onChange={(e) => {
                                                            const allIds = allEmployeeData?.map((data) => data.id.toString());
                                                            if (e.target.checked) {
                                                                // Select all checkboxes
                                                                setFormData((prevFormData) => ({
                                                                    ...prevFormData,
                                                                    employeeId: allIds.join(','),
                                                                }));
                                                                setIsValid((prevState) => ({
                                                                    ...prevState,
                                                                    employeeId: allIds.length > 0,
                                                                }));
                                                            } else {
                                                                // Deselect all checkboxes
                                                                setFormData((prevFormData) => ({
                                                                    ...prevFormData,
                                                                    employeeId: '',
                                                                }));
                                                                setIsValid((prevState) => ({
                                                                    ...prevState,
                                                                    employeeId: false,
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <input
                                                        type="search"
                                                        name="serachEmployeeList"
                                                        id="serachEmployeeList"
                                                        className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.5rem]"
                                                        onChange={handleSearchMultiSelectDropDown}
                                                        placeholder="Search..."
                                                    />
                                                </div>
                                            </li>
                                        )}

                                        {/* Individual Employee Checkboxes */}
                                        {filterEmployeeList?.length > 0 ? (
                                            filterEmployeeList?.map((data, index) => (
                                                <li
                                                    key={data?.empId}
                                                    className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2"
                                                    onMouseEnter={() => setIsHovered(index)}
                                                    onMouseLeave={() => setIsHovered(null)}
                                                    style={{
                                                        background: isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                    }}
                                                >
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.employeeId.split(',').includes(data?.empId?.toString())}
                                                            onChange={(e) => {
                                                                const idsArray = formData.employeeId ? formData.employeeId.split(',') : [];
                                                                if (e.target.checked) {
                                                                    const updatedIds = [...idsArray, data?.empId.toString()].join(',');
                                                                    setFormData((prevFormData) => {
                                                                        const newFormData = {
                                                                            ...prevFormData,
                                                                            employeeId: updatedIds,
                                                                        };
                                                                        setIsValid((prevState) => ({
                                                                            ...prevState,
                                                                            employeeId: newFormData.employeeId !== '' && newFormData.employeeId.split(',').length > 0,
                                                                        }));
                                                                        return newFormData;
                                                                    });
                                                                } else {
                                                                    const updatedIds = idsArray.filter((id) => id !== data?.empId.toString()).join(',');
                                                                    setFormData((prevFormData) => {
                                                                        const newFormData = {
                                                                            ...prevFormData,
                                                                            employeeId: updatedIds,
                                                                        };
                                                                        setIsValid((prevState) => ({
                                                                            ...prevState,
                                                                            employeeId: newFormData.employeeId !== '' && newFormData.employeeId.split(',').length > 0,
                                                                        }));
                                                                        return newFormData;
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div>{`${data?.fName} ${data?.lName}`}</div>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="py-4 text-gray-500 text-center">
                                                {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                            </li>
                                        )}
                                    </ul>

                                </div>
                            )}

                        </div>

                        <div className="relative flex-1">
                            <div
                                className={`flex peer items-center border-[1.5px] border-borderColor rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white ${isValid.menuId === true ? '' : 'border-b-red-500'}`}
                            >
                                <input
                                    type="search"
                                    id="menuId"
                                    name="menuId"
                                    value={selectedValue?.selectedMenuData
                                        || formData.menuId || ''
                                    }  // Display selected menu name or the value from formData.menu
                                    onChange={(e) => {
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            menuId: e.target.value, // Update formData with search input
                                        }));
                                        //setShowSearchBarRoleDropDown(true);
                                        setSelectedValue((prevState) => ({
                                            ...prevState,
                                            selectedMenuData: '',
                                        }));
                                    }}
                                    autoComplete="off"
                                    className=" w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
                                    placeholder='Search Data'
                                    onClick={() => openShowSearchBarDropDown(2)}
                                    required

                                />

                                <label htmlFor="menuId" className="menuPeerLevel">
                                    Menu
                                </label>
                            </div>

                            {/* Dropdown to select the menu */}
                            {showSearchBarRoleDropDown === 2 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>
                                        {filterMenuData?.length > 0 ? (
                                            filterMenuData?.map((data, index) => (
                                                <li
                                                    key={data?.id}

                                                    className="my-1 px-2 cursor-pointer"
                                                    onClick={() => {
                                                        handleOptionClickForCentre(data?.menuName, data?.id, 2),
                                                            setIsValid((prevState) => ({
                                                                ...prevState, menuId: true,
                                                            }))
                                                    }
                                                    }
                                                    onMouseEnter={() => setIsHovered(index)}
                                                    onMouseLeave={() => setIsHovered(null)}
                                                    style={{
                                                        background: isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                    }}
                                                >
                                                    {data?.menuName}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="py-4 text-gray-500 text-center">
                                                {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                            </li>
                                        )}

                                    </ul>
                                </div>
                            )}

                        </div>


                        <div className="relative flex-1">
                            <div
                                className={`flex justify-between pl-2 items-center border-[1.5px] border-borderColor font-semibold rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white 
                                    ${isValid.subMenuId === true ? '' : 'border-b-red-500'}`}
                                onClick={() => showSearchBarRoleDropDown !== 4 ? openShowSearchBarDropDown(4) : openShowSearchBarDropDown(0)}
                            >

                                <div>
                                    Submenu List
                                </div>
                                <div>
                                    {
                                        showSearchBarRoleDropDown === 4 ? <RiArrowDropUpLine className='text-xl cursor-pointer' /> : <RiArrowDropDownLine className='text-xl cursor-pointer' />
                                    }
                                </div>
                            </div>

                            {/* Dropdown to select the menu */}
                            {showSearchBarRoleDropDown === 4 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">

                                    {
                                        allSubMenuData?.length === 0 ?

                                            <div className='py-4 text-gray-500 text-center'>
                                                {import.meta.env.VITE_API_SELECT_MENU}
                                            </div>
                                            :
                                            <ul className='w-full'>
                                                {/* Select All Checkbox */}
                                                <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full h-full">
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.subMenuId.split(',').length === allSubMenuData?.length && allSubMenuData?.length > 0}
                                                            onChange={(e) => {
                                                                const allIds = allSubMenuData?.map((data) => data.id.toString());
                                                                if (e.target.checked) {
                                                                    // Select all checkboxes
                                                                    setFormData((prevFormData) => ({
                                                                        ...prevFormData,
                                                                        subMenuId: allIds.join(','),
                                                                    }));
                                                                    setIsValid((prevState) => ({
                                                                        ...prevState,
                                                                        subMenuId: allIds.length > 0,
                                                                    }));
                                                                } else {
                                                                    // Deselect all checkboxes
                                                                    setFormData((prevFormData) => ({
                                                                        ...prevFormData,
                                                                        subMenuId: '',
                                                                    }));
                                                                    setIsValid((prevState) => ({
                                                                        ...prevState,
                                                                        subMenuId: false,
                                                                    }));
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <input
                                                            type="search"
                                                            name="searchSubMenuList"
                                                            id="searchSubMenuList"
                                                            className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.6rem]"
                                                            onChange={handleSearchMultiSelectDropDown}
                                                            placeholder="Search..."
                                                        />
                                                    </div>
                                                </li>


                                                {/* Individual Checkboxes */}
                                                {filterSubMenuList?.length > 0 ? (
                                                    filterSubMenuList?.map((data, index) => (
                                                        <li
                                                            key={data?.id}
                                                            className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2"
                                                            onMouseEnter={() => setIsHovered(index)}
                                                            onMouseLeave={() => setIsHovered(null)}
                                                            style={{
                                                                background: isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                            }}
                                                        >
                                                            <div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.subMenuId.split(',').includes(data?.id.toString()) || false}
                                                                    onChange={(e) => {
                                                                        const idsArray = formData.subMenuId ? formData.subMenuId.split(',') : [];

                                                                        if (e.target.checked) {
                                                                            // Add the user's ID to the string
                                                                            const updatedIds = [...idsArray, data?.id.toString()].join(',');
                                                                            setFormData((prevFormData) => {
                                                                                const newFormData = {
                                                                                    ...prevFormData,
                                                                                    subMenuId: updatedIds,
                                                                                };
                                                                                setIsValid((prevState) => ({
                                                                                    ...prevState,
                                                                                    subMenuId: newFormData.subMenuId !== '' && newFormData.subMenuId.split(',').length > 0,
                                                                                }));
                                                                                return newFormData;
                                                                            });
                                                                        } else {
                                                                            // Remove the user's ID from the string
                                                                            const updatedIds = idsArray.filter((id) => id !== data?.id.toString()).join(',');
                                                                            setFormData((prevFormData) => {
                                                                                const newFormData = {
                                                                                    ...prevFormData,
                                                                                    subMenuId: updatedIds,
                                                                                };
                                                                                setIsValid((prevState) => ({
                                                                                    ...prevState,
                                                                                    subMenuId: newFormData.subMenuId !== '' && newFormData.subMenuId.split(',').length > 0,
                                                                                }));
                                                                                return newFormData;
                                                                            });
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>{data?.menuName}</div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="py-4 text-gray-500 text-center">
                                                        {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                                                    </li>
                                                )}
                                            </ul>
                                    }



                                </div>
                            )}

                        </div>


                        <div className='flex gap-[0.25rem]'>
                            <div className="relative flex-1 flex justify-start items-center">
                                <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-20 rounded-md flex justify-center items-center 'cursor-pointer`}
                                    style={{
                                        background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    }}
                                    onClick={onSubmitEmployeeData}
                                >
                                    {
                                        isButtonClick ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                    }

                                </button>
                            </div>

                            <div className="relative flex-1"></div>
                        </div>

                        {/* search employee */}
                        <div className="relative flex-1">
                            <CustomTextBox
                                type="allCharacters"
                                name="clientSearchData"
                                value={clientSearchData || ''}
                                onChange={(e) => handelOnChangeForClientSearchData(e)}
                                label="Search Employee"
                            // showLabel={true}
                            />
                        </div>

                    </div >
                </form>
            </div>


            {/* page details */}
            <div>
                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-bold border-b-2  text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Employee Page Details</div>
                </div>
            </div>

            {/* table data */}
            {/* <div className='mb-2'>

                <table className="table-auto border-collapse w-full text-sm text-left">
                    <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <tr>
                            {employeePageAccessData?.map((data, index) => (
                                <td
                                    key={index}
                                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                                    style={{ width: index === 0 ? '0%' : index === 1 ? '20%' : '15%' }} // Customize width here
                                >
                                    <div className="flex gap-1">
                                        <div>{data}</div>
                                        {data !== 'Remove Access' && (
                                            <div className="flex items-center gap-1">
                                                <div>
                                                    <FaArrowUp className="text-xxs cursor-pointer" />
                                                </div>
                                                <div>
                                                    <FaArrowDown className="text-xxs cursor-pointer" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {allPageAccessData?.map((data) => (
                            <tr
                                className={`cursor-pointer ${isHoveredTable === data?.id
                                    ? ''
                                    : data?.id % 2 === 0
                                        ? 'bg-gray-100'
                                        : 'bg-white'
                                    }`}
                                key={data?.id}
                                onMouseEnter={() => setIsHoveredTable(data?.id)}
                                onMouseLeave={() => setIsHoveredTable(null)}
                                style={{
                                    background:
                                        isHoveredTable === data?.id ? activeTheme?.subMenuColor : undefined,                                               
                                }}
                            >
                                <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '0%' }}>
                                    {data?.id}
                                </td>
                                <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '20%' }}>
                                    {data?.roleName}
                                </td>
                                <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '30%' }}>
                                    {data?.name}
                                </td>
                                <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '10%' }}>
                                    {data?.menuMame}
                                </td>

                                <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '10%' }}>
                                    {data?.subMenuName}
                                </td>


                                <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold">

                                    <button
                                        type="button"
                                        data-ripple-light="true"
                                        className={`relative overflow-hidden w-5 h-4 flex justify-center items-center text-red-500`}
                                    >

                                        <IoClose className="w-full h-full"
                                            onClick={() => {
                                                setremovePageAccessId(data?.id);
                                                setShowActivePopup(true);
                                            }} />
                                        {/* )} *
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div > */}


            <CustomDynamicTable activeTheme={activeTheme} columns={employeePageAccessData} >

                {/* <tbody >
                    {allPageAccessData?.map((data) => (
                        <tr
                            className={`cursor-pointer ${isHoveredTable === data?.id
                                ? ''
                                : data?.id % 2 === 0
                                    ? 'bg-gray-100'
                                    : 'bg-white'
                                }`}
                            key={data?.id}
                            onMouseEnter={() => setIsHoveredTable(data?.id)}
                            onMouseLeave={() => setIsHoveredTable(null)}
                            style={{
                                background:
                                    isHoveredTable === data?.id ? activeTheme?.subMenuColor : undefined,
                            }}
                        >
                            <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '0%' }}>
                                {data?.id}
                            </td>
                            <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '20%' }}>
                                {data?.roleName}
                            </td>
                            <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '30%' }}>
                                {data?.name}
                            </td>
                            <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '10%' }}>
                                {data?.menuMame}
                            </td>

                            <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold" style={{ width: '10%' }}>
                                {data?.subMenuName}
                            </td>


                            <td className="border-b px-4 h-4 text-gridTextColor text-xxs font-semibold">

                                <button
                                    type="button"
                                    data-ripple-light="true"
                                    className={`relative overflow-hidden w-5 h-4 flex justify-center items-center text-red-500`}
                                >

                                    <IoClose className="w-full h-full"
                                        onClick={() => {
                                            setremovePageAccessId(data?.id);
                                            setShowActivePopup(true);
                                        }} />
                                    {/* )} *
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody> */}

                <tbody>
                    {Object.entries(filterAllCentreData).map(([empId, records], index) => (
                        <React.Fragment key={empId}>
                            {/* Render only first record by default */}
                            <tr
                                // className={`cursor-pointer ${records[0]?.id % 2 === 0 ? "bg-gray-100" : "bg-white"}`}

                                className={`cursor-pointer ${isHoveredTable === index
                                    ? ''
                                    : index % 2 === 0
                                        ? 'bg-gray-100'
                                        : 'bg-white'
                                    }`}

                                onMouseEnter={() => setIsHoveredTable(index)}
                                onMouseLeave={() => setIsHoveredTable(null)}
                                style={{
                                    background:
                                        isHoveredTable === index ? activeTheme?.subMenuColor : undefined,
                                }}
                            >
                                <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                    {index + 1}
                                </td>
                                <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                    {records[0]?.roleName}
                                </td>
                                <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                    {records[0]?.name}
                                </td>
                                <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                    {records[0]?.menuMame}
                                </td>
                                <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                    {records[0]?.subMenuName}
                                </td>
                                <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                    <button
                                        onClick={() =>
                                            setExpandedEmpId(expandedEmpId === empId ? null : empId)
                                        }
                                        className="font-semibold text-blue-400"
                                    >
                                        {expandedEmpId === empId ?
                                            "View Less"
                                            : "View More"}
                                    </button>
                                </td>
                            </tr>

                            {/* Show remaining records when expanded */}
                            {expandedEmpId === empId &&
                                records.map((data, index) => (
                                    <tr
                                        key={data?.id}
                                        // className={`${index === 0
                                        //         ? records[0]?.id % 2 === 0
                                        //             ? "bg-gray-100"
                                        //             : "bg-white"
                                        //         : "bg-gray-50"
                                        //     }`}

                                        className={`cursor-pointer ${isHoveredTableChild === index
                                            ? ''
                                            : index % 2 === 0
                                                ? 'bg-gray-100'
                                                : 'bg-white'
                                            }`}
                                        //key={index}
                                        onMouseEnter={() => setIsHoveredTableChild(index)}
                                        onMouseLeave={() => setIsHoveredTableChild(null)}
                                        style={{
                                            background:
                                                isHoveredTableChild === index ? activeTheme?.subMenuColor : undefined,
                                        }}
                                    >
                                        <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                            {data?.roleName}
                                        </td>
                                        <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                            {data?.name}
                                        </td>
                                        <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                            {data?.menuMame}
                                        </td>
                                        <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                            {data?.subMenuName}
                                        </td>
                                        <td className="border px-4 h-4 text-gridTextColor text-xxs font-semibold">
                                            {/* <button
                                                type="button"
                                                className="text-red-500"
                                                onClick={() => {
                                                    console.log(`Removing access for ${data?.id}`);
                                                }}
                                            >
                                                <IoClose className="w-4 h-4" />
                                            </button> */}

                                            <button
                                                type="button"
                                                data-ripple-light="true"
                                                className={`relative overflow-hidden w-5 h-4 flex justify-center items-center text-red-500`}
                                            >

                                                <IoClose className="w-full h-full"
                                                    onClick={() => {
                                                        setremovePageAccessId(data?.id);
                                                        setShowActivePopup(true);
                                                    }} />
                                                {/* )} */}
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                        </React.Fragment>
                    ))}

                </tbody>

            </CustomDynamicTable>




            {/* popup for active and deactive status */}
            {
                showActivePopup && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50"
                        >

                            <div className="flex mt-3 items-center">
                                <IoAlertCircleOutline className="w-8 h-8" style={{ color: activeTheme?.menuColor }} />
                            </div>



                            <div className="text-xxs font-semibold text-textColor/50">
                                Are you sure want to remove Access ?
                            </div>

                            <div className="flex items-end gap-5 my-5">

                                <div>
                                    <button
                                        type="button"
                                        data-ripple-light="true"
                                        className="relative overflow-hidden border-[1.5px] w-16 h-8 rounded-md font-semibold text-textColor transition-all duration-300 text-sm "
                                        style={{
                                            borderImageSource: activeTheme?.menuColor,
                                            borderImageSlice: 1,

                                        }}
                                        onClick={() => setShowActivePopup(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                                    onClick={handleDeleteEmpPageAccess}>
                                    <div>
                                        {
                                            isButtonClickForMenuUpdate ?
                                                <FaSpinner className="w-full h-full animate-spin text-textColor" />
                                                :
                                                'Yes'
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
