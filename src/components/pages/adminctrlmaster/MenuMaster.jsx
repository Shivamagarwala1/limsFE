import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  getAllMenuApi,
  getAllMenuDataWithChildApi,
  saveMenuData,
  updateMenuStatusApi,
} from "../../../service/service";
import toast from "react-hot-toast";
import { FaArrowDown, FaArrowUp, FaRegEdit, FaSpinner } from "react-icons/fa";
import { menuDataHeaderList } from "../../listData/listData";
import { IoMdMenu } from "react-icons/io";
import { ImSwitch } from "react-icons/im";
import { IoAlertCircleOutline } from "react-icons/io5";
import useRippleEffect from "../../customehook/useRippleEffect";


export default function MenuMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.userSliceName?.user || null);
  useRippleEffect();

  const [formData, setFormData] = useState({
    isActive: 1,
    createdById: parseInt(user?.employeeId),
    createdDateTime: "",
    updateById: "",
    updateDateTime: "",
    id: 0,
    menuName: "",
    displaySequence: "",
    navigationUrl: "",
    parentId: "",
    isHide: false,
  });

  const [isParentMenu, setIsParentMenu] = useState("");
  const [clickedRowId, setClickedRowId] = useState(null);
  const [allMenuData, setAllMenuData] = useState([]);
  const [allMenuDataWithChildData, setAllMenuDataWithChildData] = useState([]);
  const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(false);
  const [selectedMenuName, setSelectedMenuName] = useState("");
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

  // Fetch all menu data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuData, menuDataWithChild] = await Promise.all([
          getAllMenuApi(),
          getAllMenuDataWithChildApi(),
        ]);
        setAllMenuData(menuData);
        setAllMenuDataWithChildData(menuDataWithChild);
      } catch (err) {
        toast.error("Error fetching menu data");
      }
    };

    fetchData();
  }, [isButtonClickForMenuUpdate, isButtonClick]);

  // Handle input changes
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    validateField(field, value);
  };

  // Handle parent menu change
  const handleParentMenuChange = (e) => {
    const selectedValue = e.target.value;
    setIsParentMenu(selectedValue);
    setIsValid({
      menuName: false,// !!formData.menuName.trim(),
      displaySequence: false, //!!String(formData.displaySequence).trim(),
      parentId: selectedValue === "Yes" ? true : false,//|| selectedValue === true || !!String(formData.parentId).trim(),
      navigationUrl: selectedValue === "Yes" ? true : false//selectedValue === "Yes" || !!String(formData.navigationUrl).trim(),
    });
  };

  // Handle dropdown changes
  const handleDropdownChange = (field) => (e) => {
    setFormData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  // Handle option click for center
  const handleOptionClickForCentre = (menuName, menuId) => {
    setSelectedMenuName(menuName);
    setFormData((prevData) => ({ ...prevData, parentId: menuId }));
    setShowSearchBarDropDown(false);
  };

  // Validate field
  const validateField = (field, value) => {
    const newIsValid = { ...isValid };
    const stringValue = String(value).trim();

    if (isParentMenu === "Yes") {
      if (field === "menuName" || field === "displaySequence") {
        newIsValid[field] = !!stringValue;
      }
    } else {
      if (field === "parentId") {
        newIsValid[field] = !!stringValue;
      } else {
        newIsValid[field] = !!stringValue;
      }
    }

    setIsValid(newIsValid);
  };

  // Filtered data for menu
  const filteredDataForMenu = allMenuData?.filter((data) =>
    data?.menuName.toLowerCase().includes(String(formData?.parentId || "").toLowerCase())
  );

  // Save master data
  const saveMasterData = async (event) => {
    event.preventDefault();
    setIsButtonClick(true);

    const updatedFormData = {
      ...formData,
      createdDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
    };

    if (isParentMenu === "No") {
      if (
        updatedFormData?.menuName === "" ||
        updatedFormData?.displaySequence === "" ||
        updatedFormData?.parentId === "" ||
        updatedFormData?.navigationUrl === ""
      ) {
        setIsValid({
          ...isValid,
          menuName: updatedFormData?.menuName !== "",
          displaySequence: updatedFormData?.displaySequence !== "",
          parentId: updatedFormData?.parentId !== "",
          navigationUrl: updatedFormData?.navigationUrl !== "",
        });
        toast.error('Please fill in all mandatory fields correctly.')
        setIsButtonClick(false);
        return;
      }
    } else {
      if (updatedFormData?.menuName === "" || updatedFormData?.displaySequence === "") {
        setIsValid({
          ...isValid,
          menuName: updatedFormData?.menuName !== "",
          displaySequence: updatedFormData?.displaySequence !== "",
        });
        toast.error('Please fill in all mandatory fields correctly.');
        setIsButtonClick(false);
        return;
      }
    }

    if (isParentMenu === "Yes") {
      updatedFormData.parentId = 0;
      updatedFormData.navigationUrl = "";
    }

    try {
      const resp = await saveMenuData(updatedFormData);
      if (resp?.success) {
        toast.success(resp?.message);
        setFormData({
          isActive: 1,
          createdById: parseInt(user?.employeeId),
          createdDateTime: "",
          updateById: "",
          updateDateTime: "",
          id: 0,
          menuName: "",
          displaySequence: "",
          navigationUrl: "",
          parentId: "",
          isHide: false,
        });
      } else {
        toast.error(resp?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }

    setIsButtonClick(false);
  };

  // Update menu status
  const handleTheUpdateStatusMenu = async () => {
    setIsButtonClickForMenuUpdate(true);

    const newValue = clickedRowId?.isActive === 1 ? 0 : 1;

    try {
      const resp = await updateMenuStatusApi(clickedRowId?.id, newValue);
      if (resp?.success) {
        toast.success(resp?.message);
      } else {
        toast.error(resp?.message);
      }
    } catch (err) {
      toast.error(err?.message);
    }

    setIsButtonClickForMenuUpdate(false);
    setShowActivePopup(false);
  };

  // Get single menu data for update
  const getSingleMenuDataForUpDate = async (data) => {
    const menuNameFilter = allMenuData?.filter((menu) => data?.parentId === menu?.id);
    const selectedMenu = menuNameFilter[0]?.menuName || "";
    setSelectedMenuName(selectedMenu);
    setFormData(data);
  };

  // Update master data
  const updateMasterData = async (event) => {
    event.preventDefault();
    setIsButtonClick(true);

    const updatedFormData = {
      ...formData,
      updateById: parseInt(user?.employeeId),
      updateDateTime: new Date().toLocaleString("en-US", { hour12: true }).replace(",", "").replace(/(\d+)\/(\d+)\/(\d+)/, (_, m, d, y) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`),
    };

    if (isParentMenu === "No") {
      if (
        updatedFormData?.menuName === "" ||
        updatedFormData?.displaySequence === "" ||
        updatedFormData?.parentId === "" ||
        updatedFormData?.navigationUrl === ""
      ) {
        setIsValid({
          ...isValid,
          menuName: updatedFormData?.menuName !== "",
          displaySequence: updatedFormData?.displaySequence !== "",
          parentId: updatedFormData?.parentId !== "",
          navigationUrl: updatedFormData?.navigationUrl !== "",
        });
        return;
      }
    } else {
      if (updatedFormData?.menuName === "" || updatedFormData?.displaySequence === "") {
        setIsValid({
          ...isValid,
          menuName: updatedFormData?.menuName !== "",
          displaySequence: updatedFormData?.displaySequence !== "",
        });
        return;
      }
    }

    if (isParentMenu === "Yes") {
      updatedFormData.parentId = 0;
      updatedFormData.navigationUrl = "";
    }

    try {
      const resp = await saveMenuData(updatedFormData);
      if (resp?.success) {
        toast.success(resp?.message);
        setFormData({
          isActive: 1,
          createdById: parseInt(user?.employeeId),
          createdDateTime: "",
          updateById: "",
          updateDateTime: "",
          id: 0,
          menuName: "",
          displaySequence: "",
          navigationUrl: "",
          parentId: "",
          isHide: false,
        });
        setIsParentMenu("Select");
        setSelectedMenuName("");
        setIsEditData(false);
      } else {
        toast.error(resp?.message);
      }
    } catch (err) {
      toast.error("Save menu data error");
      console.log(err);
    }

    setIsButtonClick(false);
  };

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
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">

            <div className="flex gap-[0.25rem]">

              {/* Parent Menu Dropdown */}
              <CustomDropdown
                id="parent-menu"
                name="parent-menu"
                value={isParentMenu}
                onChange={handleParentMenuChange}
                label="Parent Menu"
                options={[
                  // { value: "Select", label: "Select", disabled: true },
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                activeTheme={activeTheme}
                defaultIndex={0}
              />

              <CustomDropdown
                id="isHide"
                name="isHide"
                value={formData.isHide}
                onChange={handleDropdownChange("isHide")}
                label="Allow Ph App"
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
                activeTheme={activeTheme}
                defaultIndex={0}
              />
            </div>


            <div className="relative flex-1 -mt-[1.9px]">
              <input
                type="text"
                id="menuName"
                name="menuName"
                value={formData.menuName}
                onChange={handleInputChange("menuName")}
                placeholder=" "
                className={`inputPeerField peer ${isValid.menuName ? "border-borderColor" : "border-b-red-500"
                  } focus:outline-none`}
              />
              <label htmlFor="menuName" className="menuPeerLevel">
                Menu Name
              </label>
            </div>

            <div className="relative flex-1 -mt-[1.9px]">
              <input
                type="number"
                id="displaySequence"
                name="displaySequence"
                value={formData.displaySequence}
                onChange={handleInputChange("displaySequence")}
                placeholder=" "
                className={`inputPeerField peer ${isValid.displaySequence ? "border-borderColor" : "border-b-red-500"
                  } focus:outline-none`}
              />
              <label htmlFor="displaySequence" className="menuPeerLevel">
                Display Seq.
              </label>
            </div>

            <div className="">
              <SearchBarDropdown
                id="parentId"
                name="parentId"
                value={selectedMenuName || formData.parentId || ""}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    parentId: e.target.value,
                  }));
                  setShowSearchBarDropDown(true);
                  setSelectedMenuName("");
                }}
                label="Search Type Here"
                options={filteredDataForMenu}
                activeTheme={activeTheme}
                isValid={isValid}
                isParentMenu={isParentMenu}
                showSearchBarDropDown={showSearchBarDropDown}
                setShowSearchBarDropDown={setShowSearchBarDropDown}
                handleOptionClickForCentre={handleOptionClickForCentre}
                setIsHovered={setIsHovered}
                isHovered={isHovered}
              />
            </div>


            <div className="relative flex-1 -mt-[1.9px]">
              <input
                type="text"
                id="navigationUrl"
                name="navigationUrl"
                value={formData.navigationUrl}
                onChange={handleInputChange("navigationUrl")}
                placeholder=" "
                className={`inputPeerField peer ${isValid.navigationUrl ? "border-borderColor bg-white" : "border-b-red-500"
                  } focus:outline-none`}
                disabled={isParentMenu === "Yes"}
              />
              <label htmlFor="navigationUrl" className="menuPeerLevel">
                Menu URL
              </label>
            </div>

            <div className="flex gap-[0.25rem]">

              {/* Active Dropdown */}
              <CustomDropdown
                id="isActive"
                name="isActive"
                value={formData.isActive}
                onChange={handleDropdownChange("isActive")}
                label="Active"
                options={[
                  { value: 1, label: "Yes" },
                  { value: 0, label: "No" },
                ]}
                activeTheme={activeTheme}
                defaultIndex={0}
              />

              {/* Hide Dropdown */}
              {/* <CustomDropdown
              id="isHide"
              name="isHide"
              value={formData.isHide}
              onChange={handleDropdownChange("isHide")}
              label="DND"
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              activeTheme={activeTheme}
              defaultIndex={0}
            /> */}

              <div className="relative flex-1 flex justify-start items-center -mt-2">
                {isEditData ? (
                  <button
                    type="button"
                    data-ripple-light="true"
                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-20 rounded-md flex justify-center items-center ${isParentMenu === "Select" ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    style={{
                      background: isParentMenu === "Select" ? activeTheme?.headerColor : activeTheme?.menuColor,
                      color: activeTheme?.iconColor,
                    }}
                    disabled={isParentMenu === "Select"}
                    onClick={updateMasterData}
                  >
                    {isButtonClick ? <FaSpinner className="text-xl animate-spin" /> : "Update"}
                  </button>
                ) : (
                  <button
                    type="button"
                    data-ripple-light="true"
                    className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-20 rounded-md flex justify-center items-center ${isParentMenu === "Select" ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    style={{
                      background: isParentMenu === "" ? activeTheme?.headerColor : activeTheme?.menuColor,
                      color: activeTheme?.iconColor,
                    }}
                    disabled={isParentMenu === "Select"}
                    onClick={saveMasterData}
                  >
                    {isButtonClick ? <FaSpinner className="text-xl animate-spin" /> : "Save"}
                  </button>
                )}
              </div>

            </div>
          </div>
        </form>
      </div>

      {/* Display the data */}
      <div className="w-full">
        <div
          className="w-full h-[0.10rem]"
          style={{ background: activeTheme?.menuColor }}
        ></div>

        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
          style={{ background: activeTheme?.blockColor }}
        >
          <div>
            <IoMdMenu className="font-semibold text-lg" />
          </div>
          <div>Menu Details</div>
        </div>

        <div className="mb-2">
          <div className="w-full">
            <table className="table-auto border-collapse w-full text-xxs text-left">
              <thead
                // className="sticky top-0 z-10"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <tr>
                  {menuDataHeaderList.map((data, index) => (
                    <td
                      key={index}
                      className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
                      style={{
                        width: index === 0 ? "0%" : index === 1 ? "20%" : "15%",
                      }}
                    >
                      <div className="flex gap-1">
                        <div>{data}</div>
                        {data !== "Action" && (
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
            </table>

            {/* Scrollable tbody */}
            <div className="max-h-96 overflow-y-auto w-full">
              <table className="table-auto border-collapse w-full text-xxs text-left">
                <tbody>
                  {allMenuDataWithChildData?.map((data) => (
                    <tr
                      className={`cursor-pointer ${isHoveredTable === data?.id
                        ? ""
                        : data?.id % 2 === 0
                          ? "bg-gray-100"
                          : "bg-white"
                        }`}
                      key={data?.id}
                      onMouseEnter={() => setIsHoveredTable(data?.id)}
                      onMouseLeave={() => setIsHoveredTable(null)}
                      style={{
                        background:
                          isHoveredTable === data?.id ? activeTheme?.subMenuColor : undefined,
                      }}
                    >
                      <td
                        className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                        style={{ width: "0%" }}
                      >
                        {data?.id}
                      </td>
                      <td
                        className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                        style={{ width: "20%" }}
                      >
                        {data?.menuName}
                      </td>
                      <td
                        className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                        style={{ width: "30%" }}
                      >
                        {data?.navigationUrl}
                      </td>
                      <td
                        className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor"
                        style={{ width: "10%" }}
                      >
                        {data?.displaySequence}
                      </td>
                      <td
                        className={`border-b px-4 h-5 text-xxs font-semibold ${data?.isActive === 1 ? "text-green-500" : "text-red-500"
                          }`}
                        style={{ width: "10%" }}
                      >
                        {data?.isActive === 1 ? "Yes" : "No"}
                      </td>
                      <td
                        className={`border-b px-4 h-5 text-xxs font-semibold ${data?.parentId === 0 ? "text-green-500" : "text-red-500"
                          }`}
                        style={{ width: "10%" }}
                      >
                        {data?.parentId === 0 ? "Yes" : "No"}
                      </td>
                      <td className="border-b px-4 h-5 flex items-center text-xxs font-semibold gap-2">
                        <button
                          type="button"
                          data-ripple-light="true"
                          className="relative overflow-hidden w-4 h-4 flex justify-center items-center"
                        >
                          <FaRegEdit
                            className="w-full h-full text-blue-500"
                            onClick={() => {
                              getSingleMenuDataForUpDate(data);
                              setIsParentMenu(data?.parentId === 0 ? "Yes" : "No");
                              setIsEditData(true);
                              setIsValid({
                                menuName: false,
                                displaySequence: false,
                                parentId: data?.parentId === 0 ? true : false,
                                navigationUrl: data?.parentId === 0 ? true : false,
                              });
                            }}
                          />
                        </button>
                        <button
                          type="button"
                          data-ripple-light="true"
                          className={`relative overflow-hidden w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? "text-green-500" : "text-red-500"
                            }`}
                        >
                          <ImSwitch
                            className="w-full h-full"
                            onClick={() => {
                              setClickedRowId(data);
                              setShowActivePopup(true);
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Popup for active and deactive status */}
      {showActivePopup && (
        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
          <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50">
            <div className="flex mt-3 items-center">
              <IoAlertCircleOutline
                className="w-8 h-8"
                style={{ color: activeTheme?.menuColor }}
              />
            </div>

            <div className="text-xxxs font-semibold text-textColor/50">
              Are you sure want to update ?
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

              <div
                className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
                onClick={handleTheUpdateStatusMenu}
              >
                <div>
                  {isButtonClickForMenuUpdate ? (
                    <FaSpinner className="w-full h-full animate-spin text-textColor" />
                  ) : (
                    "Yes"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const CustomDropdown = ({
  id,
  name,
  value,
  onChange,
  label,
  options,
  activeTheme,
  defaultIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (defaultIndex !== undefined && value === "") {
      const defaultOption = options[defaultIndex];
      if (defaultOption) {
        onChange({ target: { name, value: defaultOption.value } });
      }
    }
  }, [defaultIndex, name, onChange, options, value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div
        className={`inputPeerField cursor-pointer peer focus:outline-none ${value === "" ? "border-b-red-500" : "border-borderColor"
          } bg-blue-100 p-2`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value !== ""
          ? options.find((opt) => opt.value === value)?.label
          : options[defaultIndex]?.label || label}
      </div>

      {isOpen && (
        <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
          {options.map((option, index) => (
            <div
              key={index}
              className="my-1 py-1 px-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              style={{
                background:
                  isHovered === index ? activeTheme?.subMenuColor : "transparent",
              }}
              onClick={() => {
                if (!option.disabled) {
                  onChange({ target: { name, value: option.value } });
                  setIsOpen(false);
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      <label htmlFor={id} className="menuPeerLevel">
        {label}
      </label>
    </div>
  );
};

const SearchBarDropdown = ({
  id,
  name,
  value,
  onChange,
  label,
  options,
  activeTheme,
  isValid,
  isParentMenu,
  showSearchBarDropDown,
  setShowSearchBarDropDown,
  handleOptionClickForCentre,
  setIsHovered,
  isHovered,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearchBarDropDown(false);
      }
    };

    if (showSearchBarDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchBarDropDown, setShowSearchBarDropDown]);

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div
        className={`flex peer items-center  -mt-[0.5px] border-[1.5px] rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white ${isValid.parentId ? "border-borderColor" : "border-b-red-500"
          }`}
      >
        <input
          type="search"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
          placeholder="Search Data"
          onClick={() => setShowSearchBarDropDown(true)}
          required
          disabled={isParentMenu === "Yes"}
        />
        <label htmlFor={id} className="menuPeerLevel">
          {label}
        </label>
      </div>

      {showSearchBarDropDown && isParentMenu === "No" && (
        <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
          <ul>
            {options.length > 0 ? (
              options.map((data, index) => (
                <li
                  key={data.id}
                  className="my-1 py-1 px-2 cursor-pointer"
                  onClick={() => handleOptionClickForCentre(data?.menuName, data?.id)}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    background:
                      isHovered === index ? activeTheme?.subMenuColor : "transparent",
                  }}
                >
                  {data?.menuName}
                </li>
              ))
            ) : (
              <li className="py-4 text-gray-500 text-center">
                {import.meta.env.VITE_API_RECORD_NOT_FOUND || "No records found"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};