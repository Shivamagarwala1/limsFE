import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllMenuApi, getAllMenuDataWithChildApi, saveMenuData, updateMenuStatusApi } from '../../../service/service';
import toast from 'react-hot-toast';
import { FaArrowDown, FaArrowUp, FaRegEdit, FaSpinner } from "react-icons/fa";
import { menuDataHeaderList } from '../../listData/listData';
import { IoMdMenu } from "react-icons/io";
import { ImSwitch } from 'react-icons/im';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useRippleEffect from '../../customehook/useRippleEffect';


export default function PatientRegistration() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.userSliceName?.user || null);
  useRippleEffect();


  const [formData, setFormData] = useState({
    isActive: 1, // Default value for Active dropdown
    createdById: parseInt(user?.employeeId),
    createdDateTime: '',
    updateById: '',
    updateDateTime: '',
    id: 0,
    menuName: '',
    displaySequence: '',
    navigationUrl: '',
    parentId: '',
    isHide: false, // Default value for Hide dropdown
  });

  const [isParentMenu, setIsParentMenu] = useState('');
  const [clickedRowId, setClickedRowId] = useState(null);
  const [allMenuData, setAllMenuData] = useState([]);
  const [allMenuDataWithChildData, setAllMenuDataWithChildData] = useState([]);
  const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(false);
  const [selectedMenuName, setSelectedMenuName] = useState('')
  const [isHovered, setIsHovered] = useState(null);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [isButtonClickForMenuUpdate, setIsButtonClickForMenuUpdate] = useState(false);
  const [showActivePopup, setShowActivePopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);

  const [isValid, setIsValid] = useState({
    menuName: true,
    displaySequence: true,
    navigationUrl: true,
    parentId: true,
  });



  // Refactored change handlers as constants
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prevData) => {
      const newData = { ...prevData, [field]: value };
      return newData;
    });
    validateField(field, value);
  };

  const handleParentMenuChange = (e) => {
    const selectedValue = e.target.value;
    // setFormData((prevData) => ({ ...prevData, isParentMenu: selectedValue }));
    setIsParentMenu(selectedValue)
    setIsValid({
      menuName: !!formData.menuName.trim(),
      displaySequence: !!formData.displaySequence.trim(),
      parentId: selectedValue === 'Yes' || !!formData.parentId.trim(),
      navigationUrl: selectedValue === 'Yes' || !!formData.navigationUrl.trim(),
    });
  };

  const handleDropdownChange = (field) => (e) => {
    setFormData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleOptionClickForCentre = (menuName, menuId) => {
    setSelectedMenuName(menuName); // Store the selected menu name
    setFormData((prevData) => ({ ...prevData, parentId: menuId })); // Store the selected menu ID in formData
    setShowSearchBarDropDown(false); // Hide the dropdown after selection
  };



  const openShowSearchBarDropDown = () => {
    setShowSearchBarDropDown((prevState) => !prevState);
  };

  const validateField = (field, value) => {
    const newIsValid = { ...isValid };

    if (isParentMenu === 'Yes') {
      if (field === 'menuName' || field === 'displaySequence') {
        newIsValid[field] = !!value.trim();
      }
    } else {
      if (field === 'parentId') {
        newIsValid[field] = !!value.trim();
      } else {
        newIsValid[field] = !!value.trim();
      }
    }

    setIsValid(newIsValid);
  };


  const filteredDataForMenu = allMenuData?.filter((data) =>
    data?.menuName.toLowerCase().includes(String(formData?.parentId || '').toLowerCase()
    )
  );


  //get all menu data
  useEffect(() => {

    async function getAllMenu() {

      await getAllMenuApi().then((resp) => {

        //console.log(resp);

        setAllMenuData(resp);

      }).catch((err) => {

        toast.error('Getting menu data error')

      })
    }

    getAllMenu();


    async function getAllMenuWithChildData() {

      await getAllMenuDataWithChildApi().then((resp) => {
        setAllMenuDataWithChildData(resp);
      }).catch((err) => {

        toast.error('Getting menu data error')

      })
    }

    getAllMenuWithChildData();

  }, [isButtonClickForMenuUpdate, isButtonClick])


  const saveMasterData = async (event) => {

    event.preventDefault();
    setIsButtonClick(true);

    // Check if the form is valid before proceeding
    const updatedFormData = {
      ...formData,
      createdDateTime: new Date().toLocaleString('en-US', { hour12: true }).replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`)
    };


    if (isParentMenu === 'No') {
      if (updatedFormData?.menuName === '' || updatedFormData?.displaySequence === '' || updatedFormData?.parentId === '' || updatedFormData?.navigationUrl === '') {
        setIsValid({
          ...isValid,
          menuName: updatedFormData?.menuName !== '', // Set to false if there's a value
          displaySequence: updatedFormData?.displaySequence !== '', // Set to false if there's a value
          parentId: updatedFormData?.parentId !== '', // Set to false if there's a value
          navigationUrl: updatedFormData?.navigationUrl !== '', // Set to false if there's a value
        });
        //toast.error('Please fill in all required fields');
        return;
      }
    } else {
      if (updatedFormData?.menuName === '' || updatedFormData?.displaySequence === '') {
        setIsValid({
          ...isValid,
          menuName: updatedFormData?.menuName !== '', // Set to false if there's a value
          displaySequence: updatedFormData?.displaySequence !== '', // Set to false if there's a value
        });
        return;
      }
    }


    if (isParentMenu === 'Yes') {
      updatedFormData.parentId = 0;
      updatedFormData.navigationUrl = '';
    }


    // Proceed with your API call or other logic to save the data

    await saveMenuData(updatedFormData).then((resp) => {

      if (resp?.success) {

        toast.success(resp?.message);

        setFormData(
          {
            isActive: 1, // Default value for Active dropdown
            createdById: parseInt(user?.employeeId),
            createdDateTime: '',
            updateById: '',
            updateDateTime: '',
            id: 0,
            menuName: '',
            displaySequence: '',
            navigationUrl: '',
            parentId: '',
            isHide: false,
          }
        )
      } else {
        toast.error(resp?.message);
      }

    }).catch((err) => {
      toast.error(err?.message);
    });

    setIsButtonClick(false);
  };

  //update menu is active or inactive
  const handleTheUpdateStatusMenu = async () => {

    setIsButtonClickForMenuUpdate(true);

    const newValue = clickedRowId?.isActive === 1 ? 0 : 1;

    await updateMenuStatusApi(clickedRowId?.id, newValue).then((resp) => {

      if (resp?.success) {
        toast.success(resp?.message)
      } else {
        toast.error(resp?.message);
      }

    }).catch((err) => {
      toast.error(err?.message)
    })

    setIsButtonClickForMenuUpdate(false);
    setShowActivePopup(false);
  }


  //get single menu data for update
  const getSingleMenuDataForUpDate = async (data) => {
    const menuNameFilter = allMenuData?.filter((menu) => data?.parentId === menu?.id);
    const selectedMenu = menuNameFilter[0]?.menuName || "";
    setSelectedMenuName(selectedMenu)
    setFormData(data);
  }



  //update all menu data
  const updateMasterData = async (event) => {
    event.preventDefault();
    setIsButtonClick(true);

    const updatedFormData = {
      ...formData,
      updateById: parseInt(user?.employeeId),
      updateDateTime: new Date().toLocaleString('en-US', { hour12: true }).replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`)
    };

    if (isParentMenu === 'No') {
      if (updatedFormData?.menuName === '' || updatedFormData?.displaySequence === '' || updatedFormData?.parentId === '' || updatedFormData?.navigationUrl === '') {
        setIsValid({
          ...isValid,
          menuName: updatedFormData?.menuName !== '', // Set to false if there's a value
          displaySequence: updatedFormData?.displaySequence !== '', // Set to false if there's a value
          parentId: updatedFormData?.parentId !== '', // Set to false if there's a value
          navigationUrl: updatedFormData?.navigationUrl !== '', // Set to false if there's a value
        });
        //toast.error('Please fill in all required fields');
        return;
      }
    } else {
      if (updatedFormData?.menuName === '' || updatedFormData?.displaySequence === '') {
        setIsValid({
          ...isValid,
          menuName: updatedFormData?.menuName !== '', // Set to false if there's a value
          displaySequence: updatedFormData?.displaySequence !== '', // Set to false if there's a value
        });
        return;
      }
    }


    if (isParentMenu === 'Yes') {
      updatedFormData.parentId = 0;
      updatedFormData.navigationUrl = '';
    }


    // Proceed with your API call or other logic to save the data

    await saveMenuData(updatedFormData).then((resp) => {

      if (resp?.success) {

        toast.success(resp?.message);

        setFormData(
          {
            isActive: 1, // Default value for Active dropdown
            createdById: parseInt(user?.employeeId),
            createdDateTime: '',
            updateById: '',
            updateDateTime: '',
            id: 0,
            menuName: '',
            displaySequence: '',
            navigationUrl: '',
            parentId: '',
            isHide: false,
          }
        );

        setIsParentMenu('');
        setSelectedMenuName('');
        setIsEditData(false);
      } else {
        toast.error(resp?.message);
      }

    }).catch((err) => {
      toast.error('Save menudata error');
      console.log(err);

    });
    setIsButtonClick(false);
  }


  return (
    <>
      <div>
        {/* Header Section */}
        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
          style={{ background: activeTheme?.blockColor }}
        >
          <div>
            <FontAwesomeIcon icon="fa-solid fa-house" />
          </div>
          <div>Master Menu</div>
        </div>

        {/* Input Section */}

        <form autoComplete='off'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">

            {/* Parent Menu Dropdown */}
            <div className="relative flex-1">
              <select
                id="parent-menu"
                value={isParentMenu}
                onChange={handleParentMenuChange}
                className={`inputPeerField cursor-pointer peer  focus:outline-none ${isParentMenu === '' ? 'border-b-red-500' : 'border-borderColor'}`}

              // defaultValue={0}
              >
                <option value="" disabled hidden className='text-gray-400'>
                  Select Option
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label htmlFor="parent-menu" className="menuPeerLevel">
                Parent Menu
              </label>
            </div>


            <div className="relative flex-1">
              <input
                type="text"
                id="menuName"
                name="menuName"
                value={formData.menuName}
                onChange={handleInputChange('menuName')}
                placeholder=" "
                className={`inputPeerField peer  ${isValid.menuName ? 'border-borderColor' : 'border-b-red-500'
                  } focus:outline-none`}
              />
              <label htmlFor="menuName" className="menuPeerLevel">
                Menu Name
              </label>
            </div>

            <div className="relative flex-1">
              <input
                type="number"
                id="displaySequence"
                name="displaySequence"
                value={formData.displaySequence}
                onChange={handleInputChange('displaySequence')}
                placeholder=" "
                className={`inputPeerField peer  ${isValid.displaySequence ? 'border-borderColor' : 'border-b-red-500'
                  } focus:outline-none`}
              />
              <label htmlFor="displaySequence" className="menuPeerLevel">
                Display Seq.
              </label>
            </div>

            <div className="relative flex-1">
              <div
                className={`flex peer items-center border-[1.5px] rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white ${isValid.parentId ? 'border-borderColor' : 'border-b-red-500'}`}
              >
                <input
                  type="search"
                  id="parentId"
                  name="parentId"
                  value={selectedMenuName || formData.parentId || ''}  // Display selected menu name   or the value from formData.menu                                                     
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      parentId: e.target.value, // Update formData with search input
                    }));
                    setShowSearchBarDropDown(true);
                    setSelectedMenuName('')
                  }}
                  autoComplete="off"
                  className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1  focus:outline-none"
                  placeholder='Search Data'
                  onClick={openShowSearchBarDropDown}
                  required
                  disabled={isParentMenu === 'Yes'}  // Disable if Parent Menu is Yes
                />

                <label htmlFor="parentId" className="menuPeerLevel">
                  Search Type Here
                </label>
              </div>

              {/* Dropdown to select the menu */}
              {showSearchBarDropDown && isParentMenu === 'No' && (
                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                  <ul>
                    {filteredDataForMenu.length > 0 ? (
                      filteredDataForMenu.map((data, index) => (
                        <li
                          key={data.id}
                          className="my-1 py-1 px-2 cursor-pointer"
                          onClick={() => handleOptionClickForCentre(data?.menuName, data?.id)} // Update menu on click
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
              <input
                type="text"
                id="navigationUrl"
                name="navigationUrl"
                value={formData.navigationUrl}
                onChange={handleInputChange('navigationUrl')}
                placeholder=" "
                className={`inputPeerField peer  ${isValid.navigationUrl
                  ? 'border-borderColor bg-white'
                  : 'border-b-red-500'
                  } focus:outline-none`}
                disabled={isParentMenu === 'Yes'}
              />
              <label htmlFor="navigationUrl" className="menuPeerLevel">
                Menu URL
              </label>
            </div>

            {/* Active Dropdown */}
            <div className="relative flex-1">
              <select
                id="isActive"
                name='isActive'
                value={formData.isActive}
                onChange={handleDropdownChange('isActive')}
                className="inputPeerField peer  border-borderColor focus:outline-none"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              <label htmlFor="isActive" className="menuPeerLevel">
                Active
              </label>
            </div>

            {/* Hide Dropdown */}
            <div className="relative flex-1">
              <select
                id="isHide"
                value={formData.isHide}
                onChange={handleDropdownChange('isHide')}
                className="inputPeerField peer  border-borderColor focus:outline-none"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <label htmlFor="isHide" className="menuPeerLevel">
                DND
              </label>
            </div>

            <div className="relative flex-1 flex justify-start items-center">
              {
                isEditData ?

                  <button
                    type='button'
                    data-ripple-light="true"
                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-20 rounded-md flex justify-center items-center ${isParentMenu === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{
                      background: isParentMenu === "" ? activeTheme?.headerColor : activeTheme?.menuColor, color: activeTheme?.iconColor
                    }}
                    disabled={isParentMenu === ""}  // Disable button if parentMenu is empty
                    onClick={updateMasterData}
                  >
                    {
                      isButtonClick ? <FaSpinner className='text-xl animate-spin' /> : 'Update'
                    }

                  </button>

                  :

                  <button
                    type='button'
                    data-ripple-light="true"
                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-20 rounded-md flex justify-center items-center ${isParentMenu === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{
                      background: isParentMenu === "" ? activeTheme?.headerColor : activeTheme?.menuColor, color: activeTheme?.iconColor
                    }}
                    disabled={isParentMenu === ""}  // Disable button if parentMenu is empty
                    onClick={saveMasterData}
                  >
                    {
                      isButtonClick ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                    }

                  </button>
              }

            </div>

          </div>
        </form>
      </div>


      {/* display the data */}
      <div className='w-full'>
        <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
          style={{ background: activeTheme?.blockColor }}
        >
          <div>
            <IoMdMenu className='font-semibold text-lg' />
          </div>
          <div>Menu Details</div>
        </div>

        <div className="mb-2">
          <table className="table-auto border-collapse w-full text-xxs text-left">
            <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
              <tr>
                {menuDataHeaderList.map((data, index) => (
                  <td
                    key={index}
                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                    style={{ width: index === 0 ? '0%' : index === 1 ? '20%' : '15%' }} // Customize width here
                  >
                    <div className="flex gap-1">
                      <div>{data}</div>
                      {data !== 'Action' && (
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
            <tbody>
              {allMenuDataWithChildData?.map((data) => (
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
                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                    {data?.id}
                  </td>
                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '20%' }}>
                    {data?.menuName}
                  </td>
                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '30%' }}>
                    {data?.navigationUrl}
                  </td>
                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '10%' }}>
                    {data?.displaySequence}
                  </td>
                  <td
                    className={`border-b px-4 h-5 text-xxs font-semibold ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'
                      }`}
                    style={{ width: '10%' }}
                  >
                    {data?.isActive === 1 ? 'Yes' : 'No'}
                  </td>
                  <td
                    className={`border-b px-4 h-5 text-xxs font-semibold ${data?.parentId === 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    style={{ width: '10%' }}
                  >
                    {data?.parentId === 0 ? 'Yes' : 'No'}
                  </td>
                  <td className="border-b px-4 h-5 flex items-center text-xxs font-semibold gap-2">
                    <button
                      type='button'
                      data-ripple-light="true"
                      className="relative overflow-hidden w-4 h-4 flex justify-center items-center">
                      <FaRegEdit className="w-full h-full text-blue-500"
                        onClick={() => {
                          getSingleMenuDataForUpDate(data)
                          setIsParentMenu(data?.parentId === 0 ? "Yes" : "No");
                          setIsEditData(true);
                        }}
                      />
                    </button>
                    <button
                      type='button'
                      data-ripple-light="true"
                      className={`relative overflow-hidden w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'
                        }`}
                    >

                      <ImSwitch className="w-full h-full"
                        onClick={() => {
                          setClickedRowId(data);
                          setShowActivePopup(true);
                        }} />
                      {/* )} */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>


      </div >


      {/* popup for active and deactive status */}
      {
        showActivePopup && (
          <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
            <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50"
            >

              <div className="flex mt-3 items-center">
                <IoAlertCircleOutline className="w-8 h-8" style={{ color: activeTheme?.menuColor }} />
              </div>

              <div className="text-xxxs font-semibold text-textColor/50">
                Are you sure want to update ?
              </div>

              <div className="flex items-end gap-5 my-5">

                <div>
                  <button
                    type='button'
                    data-ripple-light="true"

                    className="relative overflow-hidden border-[1.5px] w-16 h-8 rounded-md font-semibold text-textColor transition-all duration-300 text-sm "
                    // className="relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
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
                  onClick={handleTheUpdateStatusMenu}>
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
          </div >
        )
      }


      {/* editmenu popup */}

    </>
  );
}
