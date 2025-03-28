import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/clientlogonav.png";
// import logo from "../../assets/logo.png";
import {
  IoIosColorPalette,
  IoMdNotifications,
  IoMdLogOut,
} from "react-icons/io";
import { IoAlertCircleOutline, IoMenu } from "react-icons/io5";
import {
  FaHome,
  FaArrowsAlt,
  FaFlagCheckered,
  FaUserCircle,
  FaArrowRight,
  FaEdit,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  doActiveTheame,
  dologout,
  getDefaultCentreId,
  getLocalStroageData,
  isActiveTheme,
  isloggedin,
} from "../../service/localstroageService";
import { loginUser, logout } from "../../redux/userSlices";
import { useNavigate } from "react-router-dom";
import {
  employeeWiseCentre,
  employeeWiseRole,
  getThemeColor,
  useRetrieveData,
} from "../../service/service";
import toast from "react-hot-toast";
import ChangePassword from "../security/ChangePassword";
import { setActiveTheme } from "../../redux/themeSlice";
import DynamicMenu2 from "../private/DynamicMenuForMobile";
import Notification from "../pages/Notification";
import useOutsideClick from "../customehook/useOutsideClick";
import CustomPopupWithResponsive from "../global/CustomPopupWithResponsive";
import Payment from "../pages/payment/Payment";

export default function Navbar({ toggleFullScreen, routes }) {
  const [employeeWiseCentreData, setEmployeeWiseCentreData] = useState([]);
  const [employeeWiseRoleData, setEmployeeWiseRoleData] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [typedValueForEmployeeCentre, setTypedValueForEmployeeCentre] =
    useState("");
  const [typedValueForEmployeeRole, setTypedValueForEmployeeRole] =
    useState("");
  const [listOfTheme, setListOfTheme] = useState([]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCloseIconInChangePassword, setshowCloseIconInChangePassword] =
    useState(false);
  const [showThemePopUp, setShowThemePopup] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotiFicationPopup, setShowNotificationPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(0);
  const ammountData = useRetrieveData();

  const navigation = useNavigate();

  const user = useSelector((state) => state.userSliceName?.user || null);
  const showChangePasswordOption = useSelector(
    (state) => state?.updatePasswordSlicesName || false
  );
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  const dispatch = useDispatch();

  // Initialize screenRef with useRef
  const screenRef = useRef(null);

  const [showCentreDropdown, setShowCentreDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const openCentreDropdown = () => {
    setShowCentreDropdown(true);
    setShowRoleDropdown(false); // Close the other dropdown
  };

  const openRoleDropdown = () => {
    setShowRoleDropdown(true);
    setShowCentreDropdown(false); // Close the other dropdown
  };

  const closeCentreDropdown = () => setShowCentreDropdown(false);
  const closeRoleDropdown = () => setShowRoleDropdown(false);
  const centreDropdownRef = useOutsideClick(closeCentreDropdown);
  const roleDropdownRef = useOutsideClick(closeRoleDropdown);

  const handleLogout = () => {
    dologout(() => {
      localStorage.removeItem("activeParent");
      localStorage.removeItem("activeChild");
      localStorage.removeItem("activeUrl");
      navigation("/LIMS/login");
      dispatch(logout());
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await employeeWiseCentre(user?.employeeId)
        .then((resp) => {
          if (resp?.success) {
            setEmployeeWiseCentreData(resp?.data);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something wrong with Employee wise centre");
        });

      await employeeWiseRole(user?.employeeId)
        .then((resp) => {
          if (resp?.success) {
            setEmployeeWiseRoleData(resp?.data);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something wrong with Employee wise role");
        });
    };

    if (isloggedin()) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (employeeWiseCentreData.length > 0) {
      let selectedValue = employeeWiseCentreData.filter(
        (data) => data?.centreId === parseInt(user?.defaultCenter)
      );
      setSelectedCentre(selectedValue[0]?.centreName);
    } else {
      setSelectedCentre("Centre Data Not Found");
    }
  }, [employeeWiseCentreData, showCentreDropdown]);

  useEffect(() => {
    if (employeeWiseRoleData.length > 0) {
      let selectedValue = employeeWiseRoleData.filter(
        (data) => data?.roleId === parseInt(user?.defaultRole)
      );
      setSelectedRole(selectedValue[0]?.roleName);
      localStorage.setItem("RoleDetails", JSON.stringify(selectedValue[0]));
    } else {
      setSelectedRole("Role Data Not Found");
    }
  }, [employeeWiseRoleData, showRoleDropdown]);

  const handleOptionClickForCentre = (centreName, centreId) => {
    const userData = getLocalStroageData();
    userData.user.defaultCenter = centreId.toString();
    localStorage.setItem("imarsar_laboratory", JSON.stringify(userData));
    dispatch(loginUser(userData));

    setSelectedCentre(centreName);
    setTypedValueForEmployeeCentre("");
    setShowCentreDropdown(false);
    setShowRoleDropdown(false);
  };

  const handleOptionClickForRole = (roleName, roleId) => {
    const userData = getLocalStroageData();
    userData.user.defaultRole = roleId.toString();
    localStorage.setItem("imarsar_laboratory", JSON.stringify(userData));
    dispatch(loginUser(userData));

    const RoleDetails = {
      roleId,
      roleName,
    };
    localStorage.setItem("RoleDetails", JSON.stringify(RoleDetails));
    setSelectedRole(roleName);
    setTypedValueForEmployeeRole("");
    setShowCentreDropdown(false);
    setShowRoleDropdown(false);
  };

  const handleInputChangeFoeEmployeeCentre = (e) => {
    setTypedValueForEmployeeCentre(e.target.value);
    setSelectedCentre("");
  };

  const handleInputChangeFoeEmployeeRole = (e) => {
    setTypedValueForEmployeeRole(e.target.value);
    setSelectedRole("");
  };

  const filteredDataForCentre = employeeWiseCentreData.filter((data) =>
    data.centreName
      .toLowerCase()
      .includes(typedValueForEmployeeCentre.toLowerCase())
  );

  const filteredDataForRole = employeeWiseRoleData.filter((data) =>
    data.roleName
      .toLowerCase()
      .includes(typedValueForEmployeeRole.toLowerCase())
  );
  //show the popup for change password
  const handleShowChangePassword = () => {
    if (showCloseIconInChangePassword === false) {
      setShowProfileMenu(false);
      setshowCloseIconInChangePassword(true);
    } else {
      setShowProfileMenu(false);
      setshowCloseIconInChangePassword(false);
    }
  };

  //store theme color in the state
  useEffect(() => {
    async function getAllThemeColor() {
      await getThemeColor()
        .then((resp) => {
          const filterDataTheme = resp.filter((data) => data?.isActive === 1);

          setListOfTheme(filterDataTheme);

          if (!isActiveTheme()) {
            const filterColor = resp.filter(
              (themeColor) => themeColor?.isdefault === 1
            );
            doActiveTheame(filterColor[0], () => {
              // Call doActiveTheame with callback
              dispatch(setActiveTheme(filterColor[0])); // Dispatch the entire theme object
            });
          } else {
            const activeTheme = JSON.parse(localStorage.getItem("activeTheme"));
            dispatch(setActiveTheme(activeTheme)); // Dispatch the entire theme object from localStorage
          }
        })
        .catch((err) => {
          toast.error("Getting theme color error");
          console.log(err);
        });
    }

    getAllThemeColor();
  }, []);

  const handleThemeChange = (id) => {
    const filterColor = listOfTheme.filter(
      (themeColor) => themeColor?.id === id
    );
    doActiveTheame(filterColor[0], () => {
      dispatch(setActiveTheme(filterColor[0])); // Dispatch the entire theme object
    });
  };

  //!==============payment data==============
  // const getAmmountData = async () => {

  //   try {
  //     const response = await ammountData.fetchDataFromApi(`/tnx_Booking/GetPendingPayment?workOrderId=${getDefaultCentreId()}`);
  //     console.log(response);

  //     if (response?.data?.success) {
  //       setShowPopup(1);
  //     }
  //   } catch (error) {
  //     toast.error(error?.message);
  //   }
  // }


  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Dynamically load the Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const saveData = () => {
    alert('okkk');
  }

  return (
    <div>
      {/* ==========================for desktop================== */}
      <div
        className="h-12 hidden lg:flex justify-between items-center px-4"
        style={{
          background: activeTheme?.headerColor,
          borderImage: activeTheme?.headerColor,
        }}
      >
        <div>
          <img
            src={logo}
            alt="path not found"
            className="w-28 cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center gap-8">
          {/* employee wise centre */}
          <div className="relative" ref={centreDropdownRef}>
            <input
              type="search"
              value={typedValueForEmployeeCentre || selectedCentre}
              onChange={handleInputChangeFoeEmployeeCentre} // Handle typing
              name="employeeCenter"
              autoComplete="off"
              className="border-[1.5px] w-64 rounded-md outline-none font-semibold h-7 text-xs  pl-2 text-textColor"
              style={{ borderImage: activeTheme?.headerColor }}
              title="Select Centre"
              onClick={() => openCentreDropdown(true)}
              id="asas"
            />
            {showCentreDropdown === true && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xs">
                <ul>
                  {filteredDataForCentre.length > 0 ? (
                    filteredDataForCentre.map((data, index) => (
                      <li
                        key={data.centreId}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        className="my-1 py-1 px-2 cursor-pointer"
                        onClick={() =>
                          handleOptionClickForCentre(
                            data.centreName,
                            data?.centreId
                          )
                        }
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {data?.centreName}
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-gray-500 text-center">
                      {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* employee wise role */}
          <div className="relative" ref={roleDropdownRef}>
            <input
              type="search"
              value={typedValueForEmployeeRole || selectedRole} // Prioritize typed value over selected value
              onChange={handleInputChangeFoeEmployeeRole} // Handle typing
              name="employeeRole"
              autoComplete="off"
              className="border-[1.5px] w-64 rounded-md outline-none font-semibold h-7 text-xs  pl-2 text-textColor"
              style={{ borderImage: activeTheme?.headerColor }}
              title="Select Role"
              onClick={() => openRoleDropdown(true)}
            />
            {showRoleDropdown === true && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xs">
                <ul>
                  {filteredDataForRole.length > 0 ? (
                    filteredDataForRole.map((data, index) => (
                      <li
                        key={data.roleId}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        className="my-1 py-1 px-2 cursor-pointer"
                        onClick={() =>
                          handleOptionClickForRole(data.roleName, data.roleId)
                        }
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {data?.roleName}
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-gray-500 text-center">
                      {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* icons */}
          <div className="flex items-center gap-2">

            <div className="flex items-centre">
              <FaMoneyBillAlt
                className="text-xl cursor-pointer "
                title="Recharge Account"
                style={{ color: activeTheme?.iconColor }}
                onClick={() =>
                  // getAmmountData()
                  setShowPopup(1)
                }
              />
            </div>

            <div
              className="flex items-center justify-center relative"
            // ref={dropdownRefTheme}
            >




              <IoIosColorPalette
                className="text-xl cursor-pointer "
                title="Theme"
                style={{ color: activeTheme?.iconColor }}
                onClick={() => setShowThemePopup(!showThemePopUp)}
              />

              {showThemePopUp === true && (
                <div className="absolute border-[1.5px]  w-48 border-white bg-white shadow-2xl rounded-md h-auto  top-7  z-10 max-h-96 overflow-scroll mx-2 ">
                  {listOfTheme.map((themeColor) => {
                    return (
                      <div
                        key={themeColor?.id}
                        className={`flex items-center  gap-2 cursor-pointer pl-2 py-1 rounded-md  ${themeColor?.id === activeTheme?.id
                          ? "bg-gray-300"
                          : "bg-transparent"
                          }`}
                        style={{ color: themeColor?.headerColor }}
                        onClick={() => {
                          handleThemeChange(themeColor?.id); // Handle theme change
                          setShowThemePopup(!showThemePopUp); // Toggle the theme popup
                        }}
                      >
                        <div
                          className="w-5 h-5  mt-1 rounded-full cursor-pointer "
                          style={{
                            background: themeColor?.headerColor,
                          }}
                        ></div>

                        <div className="text-xs font-semibold">
                          {themeColor?.color}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <FaHome
                className="text-lg cursor-pointer"
                style={{ color: activeTheme?.iconColor }}
                title="Home"
              />
            </div>

            <div className="flex items-center">
              <IoMdNotifications
                className="text-lg cursor-pointer"
                style={{ color: activeTheme?.iconColor }}
                title="Notifications"
                onClick={() => setShowNotificationPopup(true)}
              />
            </div>

            <div className="flex items-center">
              <FaFlagCheckered
                className="text-lg cursor-pointer"
                style={{ color: activeTheme?.iconColor }}
                title="News"
              />
            </div>

            <div className="flex items-center">
              <FaArrowsAlt
                className="text-lg cursor-pointer"
                style={{ color: activeTheme?.iconColor }}
                title="Full Screen"
                onClick={toggleFullScreen}
              />
            </div>

            <div className="flex items-center">
              <IoMdLogOut
                className="text-lg cursor-pointer"
                style={{ color: activeTheme?.iconColor }}
                title="Logout"
                onClick={() => setShowLogoutPopup(true)}
              />
            </div>

            <div className="flex flex-col relative ">
              <div
                className="flex items-center gap-1 font-semibold cursor-pointer"
                title="Profile"
                style={{ color: activeTheme?.iconColor }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt="path not found"
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <FaUserCircle />
                )}
                <div className="text-sm">{user?.name}</div>
              </div>

              {showProfileMenu && (
                <div
                  className="absolute border-[1.5px]  w-28 bg-white shadow-2xl rounded-md h-auto  top-6 z-10 right-0"
                  style={{ borderImage: activeTheme?.subMenuColor }}
                >
                  <ul className="list-none text-xs font-semibold space-y-1">
                    <li
                      className="p-1 cursor-pointer rounded-md"
                      onMouseEnter={(e) =>
                        (e.target.style.background = activeTheme?.subMenuColor)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "transparent")
                      }
                    >
                      Profile
                    </li>

                    <li
                      className="p-1 cursor-pointer rounded-md"
                      onMouseEnter={(e) =>
                        (e.target.style.background = activeTheme?.subMenuColor)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "transparent")
                      }
                      onClick={handleShowChangePassword}
                    >
                      Change Password
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* responsive view */}
      <div
        className="h-12 lg:hidden flex justify-between items-center px-1 sm:px-4 "
        style={{
          background: activeTheme?.headerColor,
          borderImage: activeTheme?.headerColor,
        }}
      >
        <div>
          <IoMenu
            style={{ color: activeTheme?.iconColor }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
          />
        </div>

        {/* employee wise centre */}
        <div
          className="relative"
        //  ref={dropdownRef}
        >
          <input
            type="search"
            value={typedValueForEmployeeCentre || selectedCentre}
            onChange={handleInputChangeFoeEmployeeCentre} // Handle typing
            name="employeeCenter"
            autoComplete="off"
            className="border-[1.5px] w-52 sm:w-64 rounded-md outline-none font-semibold h-7 text-xs  pl-2 text-textColor"
            style={{ borderImage: activeTheme?.headerColor }}
            title="Select Centre"
            onClick={() => openCentreDropdown(true)}
          />
          {showCentreDropdown === true && (
            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xs">
              <ul>
                {filteredDataForCentre.length > 0 ? (
                  filteredDataForCentre.map((data, index) => (
                    <li
                      key={data.centreId}
                      onTouchStart={() => setIsHovered(index)}
                      onTouchEnd={() =>
                        handleOptionClickForCentre(
                          data.centreName,
                          data.centreId
                        )
                      }
                      className="my-1 py-1 px-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event propagation
                        handleOptionClickForCentre(
                          data.centreName,
                          data.centreId
                        );
                      }}
                      style={{
                        background:
                          isHovered === index
                            ? activeTheme?.subMenuColor
                            : "transparent",
                      }}
                    >
                      {data?.centreName}
                    </li>
                  ))
                ) : (
                  <li className="py-4 text-gray-500 text-center">
                    {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* icons */}
        <div className="flex items-center gap-2">

          <div className="flex items-centre">
            <FaMoneyBillAlt
              className="cursor-pointer w-4 h-4 sm:w-6 sm:h-6"
              title="Recharge Account"
              style={{ color: activeTheme?.iconColor }}
              onClick={() =>
                // getAmmountData()
                setShowPopup(1)
              }
            />
          </div>

          <div className="relative">
            <IoIosColorPalette
              className="cursor-pointer w-5 h-5 sm:w-7 sm:h-7"
              title="Theme"
              style={{ color: activeTheme?.iconColor }}
              onClick={() => setShowThemePopup(!showThemePopUp)}
            />

            {showThemePopUp && (
              <div className="fixed inset-0 flex top-11 justify-end mr-2 z-10">
                <div
                  className="absolute border-[1.5px] w-48 bg-white shadow-2xl rounded-md h-auto max-h-96 overflow-scroll"
                  style={{ borderColor: activeTheme?.headerColor }}
                >
                  {listOfTheme.map((themeColor) => (
                    <div
                      key={themeColor?.id}
                      className={`flex items-center gap-2 cursor-pointer pl-2 py-1 rounded-md ${themeColor?.id === activeTheme?.id
                        ? "bg-gray-300"
                        : "bg-transparent"
                        }`}
                      style={{ color: themeColor?.headerColor }}
                      onClick={() => {
                        handleThemeChange(themeColor?.id);
                        setShowThemePopup(!showThemePopUp);
                      }}
                    >
                      <div
                        className="w-5 h-5 mt-1 rounded-full cursor-pointer"
                        style={{
                          background: themeColor?.headerColor,
                        }}
                      ></div>
                      <div className="text-xs font-semibold">
                        {themeColor?.color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <FaFlagCheckered
              className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer"
              style={{ color: activeTheme?.iconColor }}
              title="News"
            />
          </div>

          <div className="flex flex-col relative ">
            <div
              className="flex items-center gap-1 font-semibold cursor-pointer"
              title="Profile"
              style={{ color: activeTheme?.iconColor }}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {user?.image ? (
                <img
                  src={user?.image}
                  alt="path not found"
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <FaUserCircle />
              )}
            </div>

            {showProfileMenu && (
              <div className="absolute block  w-36 bg-white shadow-2xl rounded-md h-auto  top-7 z-10 right-0">
                <ul className="list-none text-xs font-semibold space-y-1 space-x-1">
                  <li
                    className="p-1 cursor-pointer rounded-md flex items-center gap-2"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <div>
                      {user?.image ? (
                        <img
                          src={user?.image}
                          alt="path not found"
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <FaUserCircle />
                      )}
                    </div>
                    <div>{user?.name}</div>
                  </li>

                  <li
                    className="p-1 cursor-pointer rounded-md flex items-center gap-2"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <div>
                      <FaHome />
                    </div>
                    <div>Home</div>
                  </li>

                  <li
                    className="p-1 cursor-pointer rounded-md flex items-center gap-2"
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu),
                        setShowNotificationPopup(true);
                    }}
                  >
                    <div>
                      <IoMdNotifications />
                    </div>
                    <div>Notifications</div>
                  </li>

                  <li
                    className="p-1 cursor-pointer rounded-md flex items-center gap-2"
                    onClick={() => {
                      toggleFullScreen(), setShowProfileMenu(!showProfileMenu);
                    }}
                  >
                    <div>
                      <FaArrowsAlt />
                    </div>
                    <div>Full Screen</div>
                  </li>

                  <li
                    className="p-1 cursor-pointer rounded-md flex items-center gap-2"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <div>
                      <FaEdit />
                    </div>
                    <div>Update Profile Pic</div>
                  </li>

                  <li
                    className="p-1 cursor-pointer rounded-md flex items-center gap-2"
                    onClick={() => {
                      handleShowChangePassword(),
                        setShowProfileMenu(!showProfileMenu);
                    }}
                  >
                    <div>
                      <RiLockPasswordFill />
                    </div>
                    <div>Change Password</div>
                  </li>

                  <li
                    className="p-1 cursor-pointer rounded-md flex items-center gap-2"
                    onClick={() => {
                      setShowLogoutPopup(true),
                        setShowProfileMenu(!showProfileMenu);
                    }}
                  >
                    <div>
                      <IoMdLogOut />
                    </div>
                    <div>Logout</div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* side bar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg overflow-y-scroll transition-transform duration-300 z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ width: "250px", background: activeTheme?.headerColor }}
      >
        <div className="px-2 py-2 flex items-center justify-between">
          {/* <h2 className="text-base font-bold text-white">iMarsar</h2>
           */}
          <img src={logo} alt="path not found" className="w-15 h-6" />

          <IoMenu
            className="text-white cursor-pointer text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <ul className="list-none  space-y-2 ">
          {/* employee wise role */}
          <div className="relative p-1">
            <input
              type="search"
              value={typedValueForEmployeeRole || selectedRole} // Prioritize typed value over selected value
              onChange={handleInputChangeFoeEmployeeRole} // Handle typing
              name="employeeRole"
              autoComplete="off"
              className="border-[1.5px] w-full rounded-md outline-none font-semibold h-7 text-xs pl-2 text-textColor"
              style={{ borderImage: activeTheme?.headerColor }}
              title="Select Role"
              onClick={() => openRoleDropdown(true)}
            />
            {showRoleDropdown === true && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 bg-white overflow-y-auto  text-xs w-[14.7rem] mt-1">
                <ul>
                  {filteredDataForRole.length > 0 ? (
                    filteredDataForRole.map((data, index) => (
                      <li
                        key={data.roleId}
                        onTouchStart={() => setIsHovered(index)}
                        onTouchEnd={() =>
                          handleOptionClickForRole(data.roleName, data.roleId)
                        }
                        className="my-1 py-1 px-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event propagation
                          handleOptionClickForRole(data.roleName, data.roleId);
                        }}
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {data?.roleName}
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-gray-500 text-center">
                      {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <DynamicMenu2 routes={routes} setIsSidebarOpen={setIsSidebarOpen} />
        </ul>
      </div>

      {showNotiFicationPopup && (
        <Notification setShowNotificationPopup={setShowNotificationPopup} />
      )}

      {showLogoutPopup && (
        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
          <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50">
            <div className="flex mt-3 items-center">
              <IoAlertCircleOutline
                className="w-8 h-8"
                style={{ color: activeTheme?.menuColor }}
              />
            </div>

            <div className="text-xs text-center font-semibold text-textColor/70">
              Are you leaving ?
            </div>

            <div className="text-xs font-semibold text-textColor/50">
              Are you sure want to logout ?
            </div>

            <div className="flex items-end gap-5 my-5">
              <div>
                <button
                  className="border-[1.5px] w-16 h-8 rounded-md font-semibold text-textColor transition-all duration-300 text-sm "
                  style={{
                    borderImageSource: activeTheme?.menuColor,
                    borderImageSlice: 1,
                  }}
                  onClick={() => setShowLogoutPopup(false)}
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
                onClick={handleLogout}
              >
                <div>Yes </div>

                <div>
                  <FaArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showChangePasswordOption === true && <ChangePassword />}

      {showCloseIconInChangePassword === true && (
        <ChangePassword
          showCloseIconInChangePassword={showCloseIconInChangePassword}
          handleShowChangePassword={handleShowChangePassword}
        />
      )}

      {/* {
        console.log(ammountData?.data?.data)

      } */}

      {
        showPopup === 1 && (
          <>
            <CustomPopupWithResponsive activeTheme={activeTheme} heading={'Recharge your wallet'} setShowPopup={setShowPopup} popuptype={'medium'} >
              <Payment lable={'Available Balance :'} amount={0} saveData={saveData}
                headerLable={'Wallet Recharge'}
              />
            </CustomPopupWithResponsive>
          </>
        )
      }
    </div>
  );
}
