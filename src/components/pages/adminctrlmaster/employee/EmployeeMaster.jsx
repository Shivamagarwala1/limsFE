import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaRegEdit, FaSpinner } from "react-icons/fa";
import {
  IoMdAdd,
  IoMdCloseCircleOutline,
  IoMdImages,
  IoMdMenu,
} from "react-icons/io";
import { useSelector } from "react-redux";
import { CiCalendarDate } from "react-icons/ci";
import { employeeMasterHeaderList } from "../../../listData/listData";
import {
  getAllCentreApi,
  getAllCityApi,
  getAllDepartmentApi,
  getAllDistrictApi,
  getAllEmployeeDataApi,
  getAllEmpTitleApi,
  getAllRoleApi,
  getAllStateApi,
  getAllZoneApi,
  getDesignationApi,
  getSingleEmployeeDataUsingEmpId,
  saveCityApi,
  saveDistrictApi,
  saveEmployeeDataApi,
  saveStateApi,
  updateEmployeeStatusDataApi,
} from "../../../../service/service";
import toast from "react-hot-toast";
import UserCalendar from "../../../public/UserCalendar";

import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing the eye icons

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { ImSwitch } from "react-icons/im";
import { IoAlertCircleOutline } from "react-icons/io5";
import useRippleEffect from "../../../customehook/useRippleEffect";
import { CustomTextBox } from "../../../global/CustomTextBox";
import { generateRandomString } from "../../../customehook/useDateTimeFormate";
// import { ImSwitch } from 'react-icons/im';

export default function EmployeeMaster() {
  const user = useSelector((state) => state.userSliceName?.user || null);
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  useRippleEffect();

  const [employeeData, setEmployeeData] = useState({
    isActive: 1,
    indentIssue: 1,
    indentApprove: 1,
    createdById: 0,
    createdDateTime: new Date(
      "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
    ).toISOString(),
    updateById: 0,
    updateDateTime: new Date(
      "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
    ).toISOString(),
    empId: 0,
    empCode: "",
    title: "",
    fName: "",
    lName: "",
    address: "",
    pinCode: 0,
    email: "",
    mobileNo: "",
    dob: new Date(
      "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
    ).toISOString(),
    qualification: "",
    bloodGroup: "",
    designationId: 0,
    userName: "",
    password: "",
    zone: 0,
    state: 0,
    city: 0,
    district: 0,
    area: 0,
    defaultcentre: 0,
    pro: 0,
    defaultrole: 0,
    allowTicketRole: 0,
    rate: 0,
    fileName: "",
    autoCreated: 0,
    centreId: 0,
    allowDueReport: 0,
    employeeType: 0,
    isSalesTeamMember: 0,
    isDiscountAppRights: 0,
    isPwdchange: 0,
    isemailotp: 0,
    fromIP: "",
    toIP: "",
    isdeviceAuthentication: 0,
    adminPassword: "",
    tempPassword: "",
    allowTicket: 0,
    addEmpCentreAccess: [],
    addEmpRoleAccess: [],
    addEmpDepartmentAccess: [],
  });

  const [selectedSearchDropDownData, setSelectedSearchDropDownData] = useState({
    designationId: "",
    state: "",
    district: "",
    city: "",
    defaultcentre: "",
    defaultrole: "",
    allowTicketRole: ''
  });

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [
    openModelForStateOrDistrictOrCityData,
    setopenModelForStateOrDistrictOrCityData,
  ] = useState("");
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [isEditData, setIsEditData] = useState(false);
  const [inputFieldForSateCityDistrict, setInputFieldForStateCityDistrict] =
    useState("");
  const [formErrors, setFormErrors] = useState({}); // State to track validation errors
  const [isErrorForAddSateCityDistrict, setisErrorForAddSateCityDistrict] =
    useState("");
  const [showPass, setShowPass] = useState(false);
  const [allStateData, setAllStateData] = useState([]);
  const [allDistrictData, setAllDistrictData] = useState([]);
  const [allCityData, setAllCityData] = useState([]);
  const [allEmpMasterData, setAllEmpMasterData] = useState([]);
  const [filterAllEmpMasterData, setFilterAllEmpMasterData] = useState(allEmpMasterData || []);
  const [searchEmpData, setSearchEmpData] = useState('');
  const [allTitle, setTitle] = useState([]);
  const [allDesignation, setDesignation] = useState([]);
  const [allCenterData, setAllcenterData] = useState([]);
  const [allDefaultCenter, setDefaultCenter] = useState([]);
  const [allRoleData, setAllRoleData] = useState([]);
  const [allDefaultRole, setDefaultRole] = useState([]);
  const [allDefaultRoleForTicket, setDefaultRoleForTicket] = useState([]);
  const [allZoneData, setAllZoneData] = useState([]);
  const [allDepartmentData, setAllDepartmentData] = useState([]);
  const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
  const [showCalander, setShowCalander] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [imageView, setImageView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    async function getAllEmp() {
      await getAllEmployeeDataApi()
        .then((resp) => {
          if (parseInt(user?.employeeId) === parseInt(1)) {

            //need to show all data to admin
            setAllEmpMasterData(resp);
            setFilterAllEmpMasterData(resp);
          } else {
            //no need to show admin detais to other
            setAllEmpMasterData(
              resp?.filter((data) => parseInt(data?.empId) !== parseInt(1))
            );
            setFilterAllEmpMasterData(resp?.filter((data) => parseInt(data?.empId) !== parseInt(1)));
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    getAllEmp();

    async function getStateData() {
      await getAllStateApi()
        .then((resp) => {
          setAllStateData(resp);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    getStateData();

    async function getDistrictData() {
      await getAllDistrictApi()
        .then((resp) => {
          setAllDistrictData(resp);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    getDistrictData();

    async function getCityData() {
      await getAllCityApi()
        .then((res) => {
          setAllCityData(res);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    getCityData();
  }, [isButtonClick]);

  useEffect(() => {
    async function getAllEmpTitle() {
      await getAllEmpTitleApi()
        .then((resp) => {
          setTitle(resp);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    getAllEmpTitle();

    async function getDesignation() {
      await getDesignationApi()
        .then((resp) => {
          setDesignation(resp);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    getDesignation();

    async function getAllZone() {
      await getAllZoneApi()
        .then((resp) => {
          setAllZoneData(resp);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }

    getAllZone();

    async function getAllDepartment() {
      await getAllDepartmentApi()
        .then((resp) => {
          setAllDepartmentData(resp);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    getAllDepartment();

    async function getAllCentre() {
      await getAllCentreApi()
        .then((resp) => {
          setAllcenterData(resp);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    getAllCentre();

    async function getAllRole() {
      await getAllRoleApi()
        .then((resp) => {
          setAllRoleData(resp);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    getAllRole();
  }, []);

  useEffect(() => {
    setEmployeeData((prevData) => ({
      ...prevData,
      empCode: `IMS${allEmpMasterData?.length + 1 < 10 ? "0" : ""}${allEmpMasterData?.length + 1
        }`,
    }));
  }, [allEmpMasterData]);

  const openModelForStateOrDistrictOrCity = (value) => {
    setopenModelForStateOrDistrictOrCityData(value);
  };

  //saveStateOrCityOrDistrict
  const saveStateOrCityOrDistrict = async () => {
    setIsButtonClick(2);

    const fieldMapping = {
      State: { dependency: "zone", errorMessage: "Please Select zone" },
      District: { dependency: "state", errorMessage: "Please Select state" },
      City: { dependency: "district", errorMessage: "Please Select district" },
    };

    const currentField = fieldMapping[openModelForStateOrDistrictOrCityData];

    if (currentField) {
      const dependencyValue = employeeData[currentField.dependency];

      if (!dependencyValue) {
        setisErrorForAddSateCityDistrict(currentField.errorMessage);
        setIsButtonClick(0);
        return;
      } else {
        if (currentField.dependency === "zone") {
          const stateData = {
            createdById: user?.employeeId,
            createdDateTime: new Date()
              .toLocaleString("en-US", { hour12: true })
              .replace(",", "")
              .replace(
                /(\d+)\/(\d+)\/(\d+)/,
                (_, m, d, y) =>
                  `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
              ),
            state: inputFieldForSateCityDistrict,
            zoneId: employeeData?.zone,
            isActive: 1,
          };

          await saveStateApi(stateData)
            .then((resp) => {
              if (resp.success) {
                toast.success(resp?.message);

                setopenModelForStateOrDistrictOrCityData("");
                setInputFieldForStateCityDistrict("");
              } else {
                toast.success(resp.message);
                return;
              }
            })
            .catch((err) => {
              toast.error(err?.message);
            });
        } else if (currentField.dependency === "state") {
          const districtData = {
            createdById: user?.employeeId,
            createdDateTime: new Date()
              .toLocaleString("en-US", { hour12: true })
              .replace(",", "")
              .replace(
                /(\d+)\/(\d+)\/(\d+)/,
                (_, m, d, y) =>
                  `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
              ),
            district: inputFieldForSateCityDistrict,
            stateId: employeeData?.state,
            isActive: 1,
          };

          await saveDistrictApi(districtData)
            .then((resp) => {
              if (resp?.success) {
                toast.success(resp?.message);

                setopenModelForStateOrDistrictOrCityData("");
                setInputFieldForStateCityDistrict("");
              } else {
                toast.success(resp.message);
                return;
              }
            })
            .catch((err) => {
              toast.error(err?.message);
            });
        } else {
          const cityData = {
            cityName: inputFieldForSateCityDistrict,
            districtid: employeeData?.district,
          };

          await saveCityApi(cityData)
            .then((resp) => {
              if (resp?.success) {
                toast.success(resp?.message);

                setopenModelForStateOrDistrictOrCityData("");
                setInputFieldForStateCityDistrict("");
              } else {
                toast.success(resp.message);
                return;
              }
            })
            .catch((err) => {
              toast.error(err?.message);
            });
        }
      }
    }

    setIsButtonClick(0);
  };

  //handel calander data click
  const handleDateClick = (date) => {
    const formatDate = (date) => {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
    };

    const dob = formatDate(date);
    setEmployeeData((prevData) => ({
      ...prevData,
      dob, // Set formatted date in searchData
    }));
    setShowCalander(false);
  };

  const openShowSearchBarDropDown = (val) => {
    setShowSearchBarDropDown(val);
  };

  const handelImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          // Check if the image dimensions are less than or equal to 150px by 150px
          if (img.width <= 150 && img.height <= 150) {
            setEmployeeData((prevData) => ({
              ...prevData,
              fileName: reader.result, // Store the base64 image
            }));
          } else {
            toast.error(
              "Please upload an image with dimensions 150px by 150px"
            );
          }
        };
      };

      reader.readAsDataURL(file); // Read the image file as a data URL (base64)
    }
  };

  const handelClickImage = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const handelChangeEmployeeDetails = (event) => {

    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };

  //!=============before adding select all================
  // const handleCheckboxChange = (e, data, checkBoxName) => {
  //   const isChecked = e.target.checked;

  //   if (checkBoxName === "deptName") {
  //     setEmployeeData((prevData) => {
  //       const updatedAccess = [...prevData.addEmpDepartmentAccess];

  //       if (isChecked) {
  //         // Add the department data
  //         updatedAccess.push({
  //           isActive: 1,

  //           createdById: parseInt(user?.employeeId),
  //           createdDateTime: new Date().toISOString(),
  //           // updateById: 0,
  //           // updateDateTime: new Date().toISOString(),
  //           id: 0,
  //           empId: 0,
  //           departmentId: data.id,
  //         });
  //       } else {
  //         // Remove the department data
  //         const index = updatedAccess.findIndex(
  //           (item) => item.departmentId === data.id
  //         );
  //         if (index !== -1) {
  //           updatedAccess.splice(index, 1);
  //         }
  //       }

  //       return {
  //         ...prevData,
  //         addEmpDepartmentAccess: updatedAccess,
  //       };
  //     });
  //   } else if (checkBoxName === "centerData") {
  //     //store the defaultdepartment
  //     setDefaultCenter((prev) => {
  //       if (isChecked) {
  //         // Add the new data to the state
  //         return [...prev, data];
  //       } else {
  //         // Remove the data from the state if unchecked
  //         return prev.filter((item) => item.id !== data.id);
  //       }
  //     });

  //     setEmployeeData((prevData) => {
  //       const updatedAccess = [...prevData.addEmpCentreAccess];

  //       if (isChecked) {
  //         // Add the department data
  //         updatedAccess.push({
  //           isActive: 1,
  //           createdById: parseInt(user?.employeeId),
  //           createdDateTime: new Date().toISOString(),
  //           // updateById: 0,
  //           // updateDateTime: new Date().toISOString(),
  //           id: 0,
  //           empId: 0,
  //           centreId: data.centreId,
  //         });
  //       } else {
  //         // Remove the department data
  //         const index = updatedAccess.findIndex(
  //           (item) => item.centreId === data.centreId
  //         );
  //         if (index !== -1) {
  //           updatedAccess.splice(index, 1);
  //         }
  //       }

  //       return {
  //         ...prevData,
  //         addEmpCentreAccess: updatedAccess,
  //       };
  //     });
  //   } else if (checkBoxName === "roleData") {
  //     //store the defaultdepartment
  //     setDefaultRole((prev) => {
  //       if (isChecked) {
  //         // Add the new data to the state
  //         return [...prev, data];
  //       } else {
  //         // Remove the data from the state if unchecked
  //         return prev.filter((item) => item.id !== data.id);
  //       }
  //     });

  //     setEmployeeData((prevData) => {
  //       const updatedAccess = [...prevData.addEmpRoleAccess];

  //       if (isChecked) {
  //         // Add the department data
  //         updatedAccess.push({
  //           isActive: 1,
  //           createdById: parseInt(user?.employeeId),
  //           createdDateTime: new Date().toISOString(),
  //           // updateById: 0,
  //           // updateDateTime: new Date().toISOString(),
  //           id: 0,
  //           empId: 0,
  //           roleId: data.id,
  //         });
  //       } else {
  //         // Remove the department data
  //         const index = updatedAccess.findIndex(
  //           (item) => item.roleId === data.id
  //         );
  //         if (index !== -1) {
  //           updatedAccess.splice(index, 1);
  //         }
  //       }

  //       return {
  //         ...prevData,
  //         addEmpRoleAccess: updatedAccess,
  //       };
  //     });
  //   }
  // };
  //!=============end before adding select all================


  const [isAllDeptSelected, setIsAllDeptSelected] = useState(false);
  const [isAllCenterSelected, setIsAllCenterSelected] = useState(false);
  const [isAllRoleSelected, setIsAllRoleSelected] = useState(false);

  // Handle Select All for Departments, Centers, and Roles
  const handleSelectAll = (e, checkBoxName) => {
    const isChecked = e.target.checked;

    if (checkBoxName === "deptName") {
      setIsAllDeptSelected(isChecked);
      setEmployeeData((prevData) => ({
        ...prevData,
        addEmpDepartmentAccess: isChecked
          ? allDepartmentData.map((data) => ({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            id: 0,
            empId: 0,
            departmentId: data.id,
          }))
          : [],
      }));
    } else if (checkBoxName === "centerData") {
      setIsAllCenterSelected(isChecked);
      setEmployeeData((prevData) => ({
        ...prevData,
        addEmpCentreAccess: isChecked
          ? allCenterData.map((data) => ({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            id: 0,
            empId: 0,
            centreId: data.centreId,
          }))
          : [],
      }));
      setDefaultCenter(isChecked ? allCenterData : []);
    } else if (checkBoxName === "roleData") {
      setIsAllRoleSelected(isChecked);
      setEmployeeData((prevData) => ({
        ...prevData,
        addEmpRoleAccess: isChecked
          ? allRoleData.map((data) => ({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            id: 0,
            empId: 0,
            roleId: data.id,
          }))
          : [],
      }));
      setDefaultRole(isChecked ? allRoleData : []);
      setDefaultRoleForTicket(isChecked ? allRoleData : []);
    }
  };

  // Handle Individual Checkbox Change
  const handleCheckboxChange = (e, data, checkBoxName) => {
    const isChecked = e.target.checked;

    if (checkBoxName === "deptName") {
      setEmployeeData((prevData) => {
        const updatedAccess = [...prevData.addEmpDepartmentAccess];
        if (isChecked) {
          updatedAccess.push({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            id: 0,
            empId: 0,
            departmentId: data.id,
          });
        } else {
          const index = updatedAccess.findIndex(
            (item) => item.departmentId === data.id
          );
          if (index !== -1) {
            updatedAccess.splice(index, 1);
          }
        }

        setIsAllDeptSelected(updatedAccess.length === allDepartmentData.length);

        return {
          ...prevData,
          addEmpDepartmentAccess: updatedAccess,
        };
      });
    } else if (checkBoxName === "centerData") {
      setDefaultCenter((prev) => {
        if (isChecked) {
          return [...prev, data];
        } else {
          return prev.filter((item) => item.id !== data.id);
        }
      });

      setEmployeeData((prevData) => {
        const updatedAccess = [...prevData.addEmpCentreAccess];
        if (isChecked) {
          updatedAccess.push({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            id: 0,
            empId: 0,
            centreId: data.centreId,
          });
        } else {
          const index = updatedAccess.findIndex(
            (item) => item.centreId === data.centreId
          );
          if (index !== -1) {
            updatedAccess.splice(index, 1);
          }
        }

        setIsAllCenterSelected(updatedAccess.length === allCenterData.length);

        return {
          ...prevData,
          addEmpCentreAccess: updatedAccess,
        };
      });
    } else if (checkBoxName === "roleData") {
      setDefaultRole((prev) => {
        if (isChecked) {
          return [...prev, data];
        } else {
          return prev.filter((item) => item.id !== data.id);
        }
      });

      setDefaultRoleForTicket((prev) => {
        if (isChecked) {
          return [...prev, data];
        } else {
          return prev.filter((item) => item.id !== data.id);
        }
      });

      setEmployeeData((prevData) => {
        const updatedAccess = [...prevData.addEmpRoleAccess];
        if (isChecked) {
          updatedAccess.push({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date().toISOString(),
            id: 0,
            empId: 0,
            roleId: data.id,
          });
        } else {
          const index = updatedAccess.findIndex(
            (item) => item.roleId === data.id
          );
          if (index !== -1) {
            updatedAccess.splice(index, 1);
          }
        }

        setIsAllRoleSelected(updatedAccess.length === allRoleData.length);

        return {
          ...prevData,
          addEmpRoleAccess: updatedAccess,
        };
      });
    }
  };



  const validateForm = () => {
    const errors = {};

    // Check for  fields
    if (!employeeData.title) errors.title = true;
    if (!employeeData.fName) errors.fName = true;
    if (!employeeData.lName) errors.lName = true;
    if (!employeeData.mobileNo || !/^\d{10}$/.test(employeeData.mobileNo)) {
      errors.mobileNo = true;
    }
    if (!employeeData.email) errors.email = true;

    if (!employeeData.designationId) errors.designationId = true;

    // if (!employeeData.userName) errors.userName = true;
    if (!employeeData.password) errors.password = true;

    if (!confirmPass) errors.confirmPass = true;

    if (
      !employeeData.addEmpDepartmentAccess ||
      employeeData.addEmpDepartmentAccess.length === 0
    ) {
      errors.addEmpDepartmentAccess = true;
    }

    if (
      !employeeData.addEmpCentreAccess ||
      employeeData.addEmpCentreAccess.length === 0
    ) {
      errors.addEmpCentreAccess = true;
    }

    if (
      !employeeData.addEmpRoleAccess ||
      employeeData.addEmpRoleAccess.length === 0
    ) {
      errors.addEmpRoleAccess = true;
    }
    if (!employeeData.defaultcentre) errors.defaultcentre = true;

    if (!employeeData.defaultrole) errors.defaultrole = true;

    // if (employeeData.allowTicket===1) {
    if (employeeData.allowTicket === '1' && !employeeData?.allowTicketRole) {
      errors.allowTicketRole = true;
    }


    // }
    // Update state with errors
    setFormErrors(errors);
    //console.log(errors);

    // Return true if no errors exist
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (!validateForm()) {
      setIsButtonClick(0);
    }
  }, [employeeData, confirmPass]);





  //save client master
  const onSubmitSaveEmployeeMaster = async (event) => {
    event.preventDefault();
    setIsButtonClick(1);

    // Validate form before submitting
    if (!validateForm()) {
      toast.error("Please fill in all mandatory fields correctly.");
      setIsButtonClick(0);
      return;
    }

    // check the 2 password
    // if (employeeData?.password !== confirmPass) {
    //   toast.error("The passwords do not match");
    //   setIsButtonClick(0);
    //   return;
    // }

    const passData = generateRandomString();

    const updatedFormData = {
      ...employeeData,
      userName: employeeData?.email,
      createdDateTime: new Date().toISOString(),
      createdById: parseInt(user?.employeeId),
      password: passData,
      tempPassword: passData
    };

    await saveEmployeeDataApi(updatedFormData)
      .then((resp) => {
        if (resp?.success) {
          toast.success(resp?.message);

          setEmployeeData({
            isActive: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date(
              "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
            ).toISOString(),
            updateById: 0,
            updateDateTime: new Date(
              "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
            ).toISOString(),
            empId: 0,
            empCode: "",
            title: "",
            fName: "",
            lName: "",
            address: "",
            pinCode: 0,
            email: "",
            mobileNo: "",
            dob: new Date(
              "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
            ).toISOString(),
            qualification: "",
            bloodGroup: "",
            designationId: 0,
            userName: "",
            password: "",
            zone: 0,
            state: 0,
            city: 0,
            district: 0,
            area: 0,
            defaultcentre: 0,
            pro: 0,
            defaultrole: 0,
            rate: 0,
            fileName: "",
            autoCreated: 0,
            centreId: 0,
            allowDueReport: 0,
            employeeType: 0,
            isSalesTeamMember: 0,
            isDiscountAppRights: 0,
            isPwdchange: 0,
            isemailotp: 0,
            fromIP: "",
            toIP: "",
            isdeviceAuthentication: 0,
            adminPassword: "",
            tempPassword: "",
            addEmpCentreAccess: [],
            addEmpRoleAccess: [],
            addEmpDepartmentAccess: [],
          });

          setSelectedSearchDropDownData({
            designationId: "",
            state: "",
            district: "",
            city: "",
            defaultcentre: "",
            defaultrole: "",
          });

          setConfirmPass("");
        } else {
          toast.error(resp?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });

    setIsButtonClick(0);
  };

  //update employee status
  const handleTheUpdateStatusMenu = async () => {
    setIsButtonClick(3);
    const userId = user?.employeeId;

    const newValue = clickedRowId?.isActive === 1 ? 0 : 1;

    await updateEmployeeStatusDataApi(clickedRowId?.empId, newValue, userId)
      .then((resp) => {
        if (resp?.success) {
          toast.success(resp?.message);
        } else {
          toast.error("Menu status not update");
        }
      })
      .catch((err) => {
        toast.error("Menu status not update error");
      });

    setIsButtonClick(0);
    setShowPopup(false);
  };

  const getSingleMenuDataForUpDate = async (empId) => {
    await getSingleEmployeeDataUsingEmpId(empId)
      .then((resp) => {
        if (resp?.success) {
          // set confirmPass data
          setConfirmPass(
            // Retain existing state values
            resp?.data?.password || "" // Update password if available
          );

          // Filter all centers based on matching centreId
          const filteredCenters = allCenterData?.filter((center) =>
            resp?.data?.addEmpCentreAccess?.some(
              (access) => access.centreId === center.centreId
            )
          );
          setDefaultCenter(filteredCenters);

          //fiter all role based on match id with resp?.data?.addEmpRoleAccess?.roleId
          const filteredRoles = allRoleData?.filter((center) =>
            resp?.data?.addEmpRoleAccess?.some(
              (access) => access.roleId === center.id
            )
          );


          console.log(resp);


          const filterTicket = allRoleData?.filter((center) =>
            resp?.data?.addEmpRoleAccess?.some(
              (access) => access.roleId === center.id
            )
          );

          console.log(filterTicket);

          setDefaultRole(filteredRoles);
          setDefaultRoleForTicket(filterTicket);
          //set selecet value state
          setSelectedSearchDropDownData((preventData) => ({
            ...preventData,
            designationId: allDesignation.filter(
              (item) => item?.id === resp?.data?.designationId
            )[0]?.designationName,
            state:
              allStateData.filter((item) => item?.id === resp?.data?.state)[0]
                ?.state || 0,
            district:
              allDistrictData.filter(
                (item) => item?.id === resp?.data?.district
              )[0]?.district || 0,
            city:
              allCityData.filter((item) => item?.id === resp?.data?.city)[0]
                ?.cityName || 0,
            defaultcentre:
              filteredCenters.filter(
                (item) => item?.centreId === resp?.data?.defaultcentre
              )[0]?.companyName || 0,
            defaultrole:
              filteredRoles.filter(
                (item) => item?.id === resp?.data?.defaultcentre
              )[0]?.roleName || 0,
          }));

          //set employee data
          setEmployeeData((prevData) => ({
            ...prevData, // Retain existing state values
            ...resp.data, // Merge new data from response
          }));
        }
      })
      .catch((err) => {
        toast.success(err?.message);
      });
  };

  //update employee data
  const onSubmitUpdateEmployeeMaster = async (event) => {
    event.preventDefault();
    setIsButtonClick(1);

    // Validate form before submitting
    if (!validateForm()) {
      toast.error("Please fill in all mandatory fields correctly.");
      setIsButtonClick(0);
      return;
    }

    // check the 2 password
    if (employeeData?.password !== confirmPass) {
      toast.error("The passwords do not match");
      setIsButtonClick(0);
      return;
    }

    const updatedFormData = {
      ...employeeData,
      //addEmpCenterAccess: [],//selectedSearchDropDownData?.addEmpCenterAccess,
      indentApprove: parseInt(employeeData?.indentApprove),
      indentIssue: parseInt(employeeData?.indentIssue),
      updateDateTime: new Date().toISOString(),
      updateById: parseInt(user?.employeeId),
    };

    await saveEmployeeDataApi(updatedFormData)
      .then((resp) => {
        if (resp?.success) {
          toast.success(resp?.message);

          setEmployeeData({
            isActive: 1,
            indentApprove: 1,
            indentIssue: 1,
            createdById: parseInt(user?.employeeId),
            createdDateTime: new Date(
              "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
            ).toISOString(),
            updateById: 0,
            updateDateTime: new Date(
              "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
            ).toISOString(),
            empId: 0,
            empCode: "",
            title: "",
            fName: "",
            lName: "",
            address: "",
            pinCode: 0,
            email: "",
            mobileNo: "",
            dob: new Date(
              "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
            ).toISOString(),
            qualification: "",
            bloodGroup: "",
            designationId: 0,
            userName: "",
            password: "",
            zone: 0,
            state: 0,
            city: 0,
            district: 0,
            area: 0,
            defaultcentre: 0,
            pro: 0,
            defaultrole: 0,
            rate: 0,
            fileName: "",
            autoCreated: 0,
            centreId: 0,
            allowDueReport: 0,
            employeeType: 0,
            isSalesTeamMember: 0,
            isDiscountAppRights: 0,
            isPwdchange: 0,
            isemailotp: 0,
            fromIP: "",
            toIP: "",
            isdeviceAuthentication: 0,
            adminPassword: "",
            tempPassword: "",
            addEmpCentreAccess: [],
            addEmpRoleAccess: [],
            addEmpDepartmentAccess: [],
          });

          setSelectedSearchDropDownData({
            designationId: "",
            state: "",
            district: "",
            city: "",
            defaultcentre: "",
            defaultrole: "",
          });
          setConfirmPass("");
        } else {
          toast.error(resp?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });

    setIsButtonClick(0);
  };


  //search employee
  const handelOnChangeForEmployeeSearchData = (e) => {

    const searchValue = e.target.value.toLowerCase();
    setSearchEmpData(searchValue);

    // Filter data based on client name (case-insensitive)
    const filteredResults = allEmpMasterData.filter((data) =>
      data?.fName?.toLowerCase().includes(searchValue)
    );

    setFilterAllEmpMasterData(filteredResults);

  }


  //filter data
  const filterAllDesignationData = allDesignation?.filter((data) =>
    data?.designationName
      ?.toLowerCase()
      .includes(String(employeeData?.designationId || "").toLowerCase())
  );

  const filterAllStateData = allStateData?.filter((data) =>
    data?.state
      ?.toLowerCase()
      .includes(String(employeeData?.state || "").toLowerCase())
  );

  const filterAllDistrictData = allDistrictData?.filter((data) =>
    data?.district
      ?.toLowerCase()
      .includes(String(employeeData?.district || "").toLowerCase())
  );

  const filterAllCityData = allCityData?.filter((data) =>
    data?.cityName
      ?.toLowerCase()
      .includes(String(employeeData?.city || "").toLowerCase())
  );

  const filterAllDefaultCenterData = allDefaultCenter?.filter((data) =>
    (data?.companyName?.toLowerCase() || "").includes(
      String(employeeData?.defaultcentre || "").toLowerCase()
    )
  );

  const filterAllDefaultRoleData = allDefaultRole?.filter((data) =>
    data?.roleName
      ?.toLowerCase()
      .includes(String(employeeData?.defaultrole || "").toLowerCase())
  );





  // const filterAllDefaultRoleAssignTicketData = allDefaultRoleForTicket?.filter((data) =>
  //   data?.roleName
  //     ?.toLowerCase()
  //     .includes(String(employeeData?.allowTicketRole || "").toLowerCase())
  // );

  return (
    <>
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Employee Master</div>
      </div>

      {/* from data */}
      <form autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <div className="flex gap-[0.25rem]">
            <div className="relative flex-1">
              <input
                type="text"
                id="empCode"
                name="empCode"
                value={employeeData.empCode}
                onChange={handelChangeEmployeeDetails}
                placeholder=" "
                readOnly
                className={`inputPeerField peer border-borderColor                  focus:outline-none`}
              />
              <label htmlFor="empCode" className="menuPeerLevel">
                Employee code
              </label>
            </div>

            <div className="relative flex-1">
              <select
                id="title"
                value={employeeData.title}
                onChange={handelChangeEmployeeDetails}
                name="title"
                className={`inputPeerField cursor-pointer peer ${formErrors.title ? "border-b-red-500" : "border-borderColor"
                  } focus:outline-none `}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                {allTitle?.map((data) => (
                  <option key={data?.id} value={data?.title}>
                    {data?.title}
                  </option>
                ))}
              </select>
              <label htmlFor="title" className="menuPeerLevel">
                Title
              </label>
            </div>
          </div>

          {/* First name */}
          <div className="relative flex-1">
            <input
              type="text"
              id="fName"
              name="fName"
              value={employeeData.fName}
              onChange={handelChangeEmployeeDetails}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.fName ? "border-b-red-500" : "border-borderColor"
                }                  focus:outline-none`}
            />
            <label htmlFor="fName" className="menuPeerLevel">
              First Name
            </label>
          </div>

          {/* Last Name */}
          <div className="relative flex-1">
            <input
              type="text"
              id="lName"
              name="lName"
              value={employeeData.lName}
              onChange={handelChangeEmployeeDetails}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.lName ? "border-b-red-500" : "border-borderColor"
                } focus:outline-none`}
            />
            <label htmlFor="lName" className="menuPeerLevel">
              Last Name
            </label>
          </div>

          {/* Ph No */}
          <div className="relative flex-1">
            <input
              type="number"
              id="mobileNo"
              name="mobileNo"
              value={employeeData.mobileNo}
              onChange={handelChangeEmployeeDetails}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.mobileNo ? "border-b-red-500" : "border-borderColor"
                } focus:outline-none`}
            />
            <label htmlFor="mobileNo" className="menuPeerLevel">
              Phone No.
            </label>
          </div>

          {/* Email */}
          <div className="relative flex-1">
            <input
              type="email"
              id="email"
              name="email"
              value={employeeData.email}
              onChange={handelChangeEmployeeDetails}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.email ? "border-b-red-500" : "border-borderColor"
                }  focus:outline-none`}
            />
            <label htmlFor="email" className="menuPeerLevel">
              Email
            </label>
          </div>

          {/* DOB */}
          <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                id="dob"
                name="dob"
                value={employeeData?.dob ? employeeData.dob.split("T")[0] : ""}
                onChange={handelChangeEmployeeDetails}
                placeholder=" "
                className={`inputPeerField peer border-borderColor                  focus:outline-none`}
              />
              <label htmlFor="dob" className="menuPeerLevel">
                DOB
              </label>
            </div>

            <div>
              <div
                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                onClick={() => setShowCalander(!showCalander)}
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <CiCalendarDate className="w-5 h-5 font-semibold" />
              </div>
            </div>

            {/* Calendar Popup */}
            {showCalander && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                <UserCalendar onDateClick={handleDateClick} />
              </div>
            )}
          </div>

          {/* Address */}
          <div className="relative flex-1">
            <input
              type="text"
              id="address"
              name="address"
              value={employeeData.address}
              onChange={handelChangeEmployeeDetails}
              placeholder=" "
              className={`inputPeerField peer border-borderColor                  focus:outline-none`}
            />
            <label htmlFor="address" className="menuPeerLevel">
              Address
            </label>
          </div>

          {/* Pincode */}
          <div className="relative flex-1">
            <input
              type="number"
              id="pinCode"
              name="pinCode"
              value={employeeData.pinCode}
              onChange={handelChangeEmployeeDetails}
              placeholder=" "
              className={`inputPeerField peer border-borderColor                  focus:outline-none`}
            />
            <label htmlFor="pinCode" className="menuPeerLevel">
              Pin Code
            </label>
          </div>

          {/* Qualification */}
          <div className="relative flex-1">
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={employeeData.qualification}
              onChange={handelChangeEmployeeDetails}
              placeholder=" "
              className={`inputPeerField peer border-borderColor                  focus:outline-none`}
            />
            <label htmlFor="qualification" className="menuPeerLevel">
              Qualification
            </label>
          </div>

          {/* Designation */}
          <div className="relative flex-1">
            <input
              type="search"
              id="designationId"
              name="designationId"
              value={
                selectedSearchDropDownData?.designationId ||
                employeeData?.designationId ||
                ""
              }
              onChange={(e) => {
                handelChangeEmployeeDetails(e),
                  setSelectedSearchDropDownData((preventData) => ({
                    ...preventData,
                    designationId: "",
                  }));
              }}
              onClick={() => openShowSearchBarDropDown(1)}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.designationId
                ? "border-b-red-500"
                : "border-borderColor"
                }  focus:outline-none`}
            />
            <label htmlFor="designationId" className="menuPeerLevel">
              Designation
            </label>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 1 && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                <ul>
                  {filterAllDesignationData?.length > 0 ? (
                    filterAllDesignationData?.map((data, index) => (
                      <li
                        key={data.id}
                        name="designationId"
                        className="my-1 px-2 cursor-pointer"
                        onClick={() => {
                          setSelectedSearchDropDownData((preventData) => ({
                            ...preventData,
                            designationId: data?.designationName,
                          }));
                          openShowSearchBarDropDown(0);
                          handelChangeEmployeeDetails({
                            target: { name: "designationId", value: data?.id },
                          }); // Simulated event

                          //     setShoRateTypeData((preventData) => ({
                          //         ...preventData,
                          //         parentCentreId: data?.centreId
                          //     }))
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {data?.designationName}
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-gray-500 text-center">
                      {import.meta.env.VITE_API_RECORD_NOT_FOUND ||
                        "No records found"}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* username */}
          <div className="relative flex-1">
            <input
              type="text"
              id="userName"
              name="userName"
              value={employeeData.email}
              onChange={handelChangeEmployeeDetails}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.email ? "border-b-red-500" : "border-borderColor"
                } focus:outline-none`}
            />
            <label htmlFor="userName" className="menuPeerLevel">
              User Name
            </label>
          </div>

          {/* passowrd */}
          {/* <div className="flex items-center gap-[0.25rem]">
            <div className="relative flex-1">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                value={employeeData.password}
                onChange={handelChangeEmployeeDetails}
                placeholder=" "
                className={`inputPeerField peer ${formErrors.password
                  ? "border-b-red-500"
                  : "border-borderColor"
                  } focus:outline-none`}
              />
              <label htmlFor="password" className="menuPeerLevel">
                Password
              </label>
            </div>

            <div className="relative flex-1">
              <input
                type={showPass ? "text" : "password"}
                id="confirmPass"
                name="confirmPass"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder=" "
                className={`inputPeerField peer ${formErrors.confirmPass
                  ? "border-b-red-500"
                  : "border-borderColor"
                  }  focus:outline-none`}
              />
              <label htmlFor="confirmPass" className="menuPeerLevel">
                C. Password
              </label>
            </div>

            {!isEditData && (
              <div
                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <FaEyeSlash className="w-3 h-3" />
                ) : (
                  <FaEye className="w-3 h-3" />
                )}
              </div>
            )}
          </div> */}

          {/* Zone */}
          <div className="relative flex-1">
            <select
              id="zone"
              name="zone"
              value={employeeData?.zone || ""}
              onChange={handelChangeEmployeeDetails}
              className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
            >
              <option value="" disabled hidden className="text-gray-400">
                Select Option
              </option>

              {allZoneData?.map((data) => (
                <option key={data?.id} value={data?.id}>
                  {data?.zone}
                </option>
              ))}
            </select>
            <label htmlFor="zone" className="menuPeerLevel">
              Zone
            </label>
          </div>

          {/* state */}
          <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
            <div className="relative flex-1">
              <input
                type="search"
                id="state"
                name="state"
                value={
                  selectedSearchDropDownData?.state || employeeData.state || ""
                }
                onChange={(e) => {
                  handelChangeEmployeeDetails(e);

                  setSelectedSearchDropDownData((preventData) => ({
                    ...preventData,
                    state: "",
                  }));
                }}
                onClick={() => openShowSearchBarDropDown(2)}
                className={`inputPeerField peer border-borderColor                  focus:outline-none`}
                placeholder=""
              />

              <label htmlFor="state" className="menuPeerLevel">
                State
              </label>
            </div>

            <div>
              <div
                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                onClick={() => openModelForStateOrDistrictOrCity("State")}
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <IoMdAdd className="w-4 h-4 font-semibold" />
              </div>
            </div>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 2 && (
              <div
                className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs"
                style={{ top: "100%", left: 0 }}
              >
                <ul>
                  {filterAllStateData?.length > 0 ? (
                    filterAllStateData?.map((data, index) => (
                      <li
                        key={data.id}
                        name="state"
                        className="my-1 px-2 cursor-pointer"
                        onClick={() => {
                          setSelectedSearchDropDownData((preventData) => ({
                            ...preventData,
                            state: data?.state,
                          }));
                          openShowSearchBarDropDown(0);
                          handelChangeEmployeeDetails({
                            target: { name: "state", value: data?.id },
                          });
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {data?.state}
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-gray-500 text-center">
                      {import.meta.env.VITE_API_RECORD_NOT_FOUND ||
                        "No records found"}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* District */}
          <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
            <div className="relative flex-1">
              <input
                type="search"
                id="district"
                name="district"
                value={
                  selectedSearchDropDownData?.district ||
                  employeeData.district ||
                  ""
                }
                onChange={(e) => {
                  handelChangeEmployeeDetails(e);

                  setSelectedSearchDropDownData((preventData) => ({
                    ...preventData,
                    district: "",
                  }));
                }}
                onClick={() => openShowSearchBarDropDown(3)}
                placeholder=" "
                className={`inputPeerField peer border-borderColor                  focus:outline-none`}
              />
              <label htmlFor="district" className="menuPeerLevel">
                District
              </label>
            </div>

            <div>
              <div
                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                onClick={() => openModelForStateOrDistrictOrCity("District")}
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <IoMdAdd className="w-4 h-4 font-semibold" />
              </div>
            </div>

            {showSearchBarDropDown === 3 && (
              <div
                className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs"
                style={{ top: "100%", left: 0 }}
              >
                <ul>
                  {filterAllDistrictData?.length > 0 ? (
                    filterAllDistrictData?.map((data, index) => (
                      <li
                        key={data.id}
                        name="district"
                        className="my-1 px-2 cursor-pointer"
                        onClick={() => {
                          setSelectedSearchDropDownData((preventData) => ({
                            ...preventData,
                            district: data?.district,
                          }));
                          openShowSearchBarDropDown(0);
                          handelChangeEmployeeDetails({
                            target: { name: "district", value: data?.id },
                          });
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {data?.district}
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-gray-500 text-center">
                      {import.meta.env.VITE_API_RECORD_NOT_FOUND ||
                        "No records found"}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* City */}
          <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                id="city"
                name="city"
                value={
                  selectedSearchDropDownData?.city || employeeData.city || ""
                }
                onChange={(e) => {
                  handelChangeEmployeeDetails(e);

                  setSelectedSearchDropDownData((preventData) => ({
                    ...preventData,
                    city: "",
                  }));
                }}
                onClick={() => openShowSearchBarDropDown(4)}
                placeholder=" "
                className={`inputPeerField peer border-borderColor                  focus:outline-none`}
              />
              <label htmlFor="city" className="menuPeerLevel">
                City
              </label>
            </div>

            <div>
              <div
                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                onClick={() => openModelForStateOrDistrictOrCity("City")}
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <IoMdAdd className="w-4 h-4 font-semibold" />
              </div>
            </div>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 4 && (
              <div
                className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs"
                style={{ top: "100%", left: 0 }}
              >
                <ul>
                  {filterAllCityData?.length > 0 ? (
                    filterAllCityData?.map((data, index) => (
                      <li
                        key={data.id}
                        name="city"
                        className="my-1 px-2 cursor-pointer"
                        onClick={() => {
                          setSelectedSearchDropDownData((preventData) => ({
                            ...preventData,
                            city: data?.cityName,
                          }));
                          openShowSearchBarDropDown(0);
                          handelChangeEmployeeDetails({
                            target: { name: "city", value: data?.id },
                          });
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {data?.cityName}
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-gray-500 text-center">
                      {import.meta.env.VITE_API_RECORD_NOT_FOUND ||
                        "No records found"}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Department */}
          <div className="relative flex-1">
            <div
              className={`flex peer items-center border-[1.5px] ${formErrors.addEmpDepartmentAccess
                ? "border-b-red-500"
                : "border-borderColor"
                } rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
              onClick={() =>
                showSearchBarDropDown !== 5
                  ? openShowSearchBarDropDown(5)
                  : openShowSearchBarDropDown(0)
              }
            >
              <input
                type="text"
                id="addEmpDepartmentAccess"
                name="addEmpDepartmentAccess"
                value={
                  employeeData?.addEmpDepartmentAccess?.length === 0
                    ? ""
                    : employeeData?.addEmpDepartmentAccess
                      ?.map((data) => data.departmentId) // Extract departmentId
                      .join(", ") // Join the array into a string separated by commas
                }
                onChange={handelChangeEmployeeDetails}
                onClick={() => setShowSearchBarDropDown(5)}
                placeholder="Search Data"
                className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
              />

              <div>
                {showSearchBarDropDown === 5 ? (
                  <RiArrowDropUpLine className="text-xl cursor-pointer" />
                ) : (
                  <RiArrowDropDownLine className="text-xl cursor-pointer" />
                )}
              </div>

              <label htmlFor="addEmpDepartmentAccess" className="menuPeerLevel">
                Department
              </label>
            </div>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 5 && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                {allDepartmentData?.length === 0 ? (
                  <div className="py-4 text-gray-500 text-center">
                    {import.meta.env.VITE_API_SELECT_MENU}
                  </div>
                ) : (
                  <ul className="w-full">
                    {/* Select All Checkbox */}
                    <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full h-full">
                      <div>
                        {/* <input
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
                        /> */}
                        <input
                          type="checkbox"
                          checked={isAllDeptSelected}
                          onChange={(e) => handleSelectAll(e, "deptName")}
                        />
                      </div>
                      <div className="w-full">
                        <input
                          type="search"
                          name="searchSubMenuList"
                          id="searchSubMenuList"
                          className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.6rem]"
                          // onChange={handleSearchMultiSelectDropDown}
                          placeholder="Search..."
                        />
                      </div>
                    </li>

                    {/* Individual Checkboxes */}
                    {allDepartmentData?.length > 0 ? (
                      allDepartmentData?.map((data, index) => (
                        <li
                          key={data?.id}
                          className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2"
                          onMouseEnter={() => setIsHovered(index)}
                          onMouseLeave={() => setIsHovered(null)}
                          style={{
                            background:
                              isHovered === index
                                ? activeTheme?.subMenuColor
                                : "transparent",
                          }}
                        >
                          <div>
                            <input
                              type="checkbox"
                              checked={employeeData?.addEmpDepartmentAccess?.some(
                                (item) => item.departmentId === data.id
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(e, data, "deptName")
                              }
                            />
                          </div>
                          <div>{data?.deptName}</div>
                        </li>
                      ))
                    ) : (
                      <li className="py-4 text-gray-500 text-center">
                        {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Center */}
          <div className="relative flex-1">
            <div
              className={`flex peer items-center border-[1.5px] ${formErrors.addEmpCentreAccess
                ? "border-b-red-500"
                : "border-borderColor"
                } rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
              onClick={() =>
                showSearchBarDropDown !== 6
                  ? openShowSearchBarDropDown(6)
                  : openShowSearchBarDropDown(0)
              }
            >
              <input
                type="text"
                id="centreId"
                name="centreId"
                value={
                  employeeData?.addEmpCentreAccess?.length === 0
                    ? ""
                    : employeeData?.addEmpCentreAccess
                      ?.map((data) => data.centreId) // Extract departmentId
                      .join(", ") // Join the array into a string separated by commas
                }
                onChange={handelChangeEmployeeDetails}
                onClick={() => setShowSearchBarDropDown(6)}
                placeholder="Search Data"
                className={`w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none`}
              />
              <label htmlFor="centreId" className="menuPeerLevel">
                Center
              </label>

              <div>
                {showSearchBarDropDown === 6 ? (
                  <RiArrowDropUpLine className="text-xl cursor-pointer" />
                ) : (
                  <RiArrowDropDownLine className="text-xl cursor-pointer" />
                )}
              </div>
            </div>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 6 && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                {allCenterData?.length === 0 ? (
                  <div className="py-4 text-gray-500 text-center">
                    {import.meta.env.VITE_API_SELECT_MENU}
                  </div>
                ) : (
                  <ul className="w-full">
                    {/* Select All Checkbox */}
                    <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full h-full">
                      <div>
                        {/* <input
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
                        /> */}
                        <input
                          type="checkbox"
                          checked={isAllCenterSelected}
                          onChange={(e) => handleSelectAll(e, "centerData")}
                        />
                      </div>
                      <div className="w-full">
                        <input
                          type="search"
                          name="searchSubMenuList"
                          id="searchSubMenuList"
                          className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.6rem]"
                          // onChange={handleSearchMultiSelectDropDown}
                          placeholder="Search..."
                        />
                      </div>
                    </li>

                    {/* Individual Checkboxes */}
                    {allCenterData?.length > 0 ? (
                      allCenterData?.map((data, index) => (
                        <li
                          key={data?.centreId}
                          className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2"
                          onMouseEnter={() => setIsHovered(index)}
                          onMouseLeave={() => setIsHovered(null)}
                          style={{
                            background:
                              isHovered === index
                                ? activeTheme?.subMenuColor
                                : "transparent",
                          }}
                        >
                          <div>
                            <input
                              type="checkbox"
                              checked={employeeData?.addEmpCentreAccess?.some(
                                (item) => item.centreId === data.centreId
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(e, data, "centerData")
                              }
                            />
                          </div>
                          <div>{data?.companyName}</div>
                        </li>
                      ))
                    ) : (
                      <li className="py-4 text-gray-500 text-center">
                        {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>


          {/* Default Centre */}
          <div className="relative flex-1">
            <input
              type="search"
              id="defaultcentre"
              name="defaultcentre"
              // value={employeeData.defaultcentre}
              // onChange={handelChangeEmployeeDetails}
              value={
                selectedSearchDropDownData?.defaultcentre ||
                employeeData?.defaultcentre ||
                ""
              }
              onChange={(e) => {
                handelChangeEmployeeDetails(e),
                  setSelectedSearchDropDownData((preventData) => ({
                    ...preventData,
                    defaultcentre: "",
                  }));
              }}
              onClick={() => openShowSearchBarDropDown(8)}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.defaultcentre
                ? "border-b-red-500"
                : "border-borderColor"
                } focus:outline-none`}
            />
            <label htmlFor="defaultcentre" className="menuPeerLevel">
              Default Centre
            </label>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 8 && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                <ul className="w-full">

                  {/* <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full h-full">
                    <div>
                      {/* <input
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
                        /> *
                      <input
                        type="checkbox"
                        checked={isAllRoleSelected}
                        onChange={(e) => handleSelectAll(e, "roleData")}
                      />
                    </div>
                    <div className="w-full">
                      <input
                        type="search"
                        name="searchSubMenuList"
                        id="searchSubMenuList"
                        className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.6rem]"
                        // onChange={handleSearchMultiSelectDropDown}
                        placeholder="Search..."
                      />
                    </div>
                  </li> */}


                  {filterAllDefaultCenterData?.length > 0 ? (
                    filterAllDefaultCenterData?.map((data, index) => (
                      <li
                        key={data.centreId}
                        name="defaultcentre"
                        className="my-1 px-2 cursor-pointer"
                        onClick={(e) => {
                          setSelectedSearchDropDownData((preventData) => ({
                            ...preventData,
                            defaultcentre: data?.companyName,
                          }));
                          openShowSearchBarDropDown(0);
                          //handelChangeEmployeeDetails(e)
                          handelChangeEmployeeDetails({
                            target: {
                              name: "defaultcentre",
                              value: data?.centreId,
                            },
                          });
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {data?.companyName}
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-gray-500 text-center">
                      {import.meta.env.VITE_API_SELECT_CENTRE ||
                        "No records found"}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>


          {/* Access Role */}
          <div className="relative flex-1">
            <div
              className={`flex peer items-center border-[1.5px] ${formErrors.addEmpRoleAccess
                ? "border-b-red-500"
                : "border-borderColor"
                } rounded text-xxxs h-[1.6rem] text-[#495057] bg-white`}
              onClick={() =>
                showSearchBarDropDown !== 7
                  ? openShowSearchBarDropDown(7)
                  : openShowSearchBarDropDown(0)
              }
            >
              <input
                type="text"
                id="addEmpRoleAccess"
                name="addEmpRoleAccess"
                value={
                  employeeData?.addEmpRoleAccess?.length === 0
                    ? ""
                    : employeeData?.addEmpRoleAccess
                      ?.map((data) => data.roleId)
                      .join(", ")
                }
                onChange={handelChangeEmployeeDetails}
                placeholder="Search Data"
                className={`w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none`}
              />
              <label htmlFor="addEmpRoleAccess" className="menuPeerLevel">
                Access Role
              </label>

              <div>
                {showSearchBarDropDown === 7 ? (
                  <RiArrowDropUpLine className="text-xl cursor-pointer" />
                ) : (
                  <RiArrowDropDownLine className="text-xl cursor-pointer" />
                )}
              </div>
            </div>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 7 && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                {allRoleData?.length === 0 ? (
                  <div className="py-4 text-gray-500 text-center">
                    {import.meta.env.VITE_API_SELECT_MENU}
                  </div>
                ) : (
                  <ul className="w-full">
                    {/* Select All Checkbox */}
                    <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full h-full">
                      <div>
                        {/* <input
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
                        /> */}
                        <input
                          type="checkbox"
                          checked={isAllRoleSelected}
                          onChange={(e) => handleSelectAll(e, "roleData")}
                        />
                      </div>
                      <div className="w-full">
                        <input
                          type="search"
                          name="searchSubMenuList"
                          id="searchSubMenuList"
                          className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.6rem]"
                          // onChange={handleSearchMultiSelectDropDown}
                          placeholder="Search..."
                        />
                      </div>
                    </li>

                    {/* Individual Checkboxes */}
                    {allRoleData?.length > 0 ? (
                      allRoleData?.map((data, index) => {
                        return (
                          <li
                            key={data?.id}
                            className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2"
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(null)}
                            style={{
                              background:
                                isHovered === index
                                  ? activeTheme?.subMenuColor
                                  : "transparent",
                            }}
                          >
                            <div>
                              <input
                                type="checkbox"
                                checked={employeeData?.addEmpRoleAccess?.some(
                                  (item) => item.roleId === data.id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, data, "roleData")
                                }
                              />
                            </div>
                            <div>{data?.roleName}</div>
                          </li>
                        );
                      })
                    ) : (
                      <li className="py-4 text-gray-500 text-center">
                        {import.meta.env.VITE_API_RECORD_NOT_FOUND}
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>



          {/* Default Role */}
          <div className="relative flex-1">
            <input
              type="search"
              id="defaultrole"
              name="defaultrole"
              value={
                selectedSearchDropDownData?.defaultrole ||
                employeeData?.defaultrole ||
                ""
              }
              onChange={(e) => {
                handelChangeEmployeeDetails(e),
                  setSelectedSearchDropDownData((preventData) => ({
                    ...preventData,
                    defaultrole: "",
                  }));
              }}
              onClick={() => openShowSearchBarDropDown(9)}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.defaultrole
                ? "border-b-red-500"
                : "border-borderColor"
                } focus:outline-none`}
            />
            <label htmlFor="defaultrole" className="menuPeerLevel">
              Default Role
            </label>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 9 && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                <ul>
                  {filterAllDefaultRoleData?.length > 0 ? (
                    filterAllDefaultRoleData?.map((data, index) => (
                      <li
                        key={data.id}
                        name="defaultrole"
                        className="my-1 px-2 cursor-pointer"
                        onClick={() => {
                          setSelectedSearchDropDownData((preventData) => ({
                            ...preventData,
                            defaultrole: data?.roleName,
                          }));
                          openShowSearchBarDropDown(0);
                          //handelChangeEmployeeDetails(e)
                          handelChangeEmployeeDetails({
                            target: { name: "defaultrole", value: data?.id },
                          });
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
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
                      {import.meta.env.VITE_API_SELECT_ROLE ||
                        "No records found"}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Employee Type */}
          <div className="relative flex-1">
            <select
              id="employeeType"
              value={employeeData.employeeType}
              name="employeeType"
              onChange={handelChangeEmployeeDetails}
              className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

            // defaultValue={0}
            >
              <option value="" disabled hidden className="text-gray-400">
                Select Option
              </option>
              <option value={0}>None</option>
              <option value={1}>Phlebotomist</option>
              <option value={2}>Radiologist</option>
              <option value={3}>Consultant Doctor</option>
            </select>
            <label htmlFor="employeeType" className="menuPeerLevel">
              Employee Type
            </label>
          </div>


          <div className="flex gap-[0.25rem]">
            {/* Sales Team */}
            <div className="relative flex-1">
              <select
                id="isSalesTeamMember"
                value={employeeData.isSalesTeamMember}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <label htmlFor="isSalesTeamMember" className="menuPeerLevel">
                Sales Team
              </label>
            </div>

            {/* Pro */}
            <div className="relative flex-1">
              <select
                id="pro"
                value={employeeData.pro}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <label htmlFor="pro" className="menuPeerLevel">
                Pro
              </label>
            </div>
          </div>



          <div className="flex gap-[0.25rem]">
            {/* Allow Due Report */}
            <div className="relative flex-1">
              <select
                id="allowDueReport"
                value={employeeData.allowDueReport}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <label htmlFor="allowDueReport" className="menuPeerLevel">
                Allow Due Report
              </label>
            </div>


            {/* Disscount Approved */}
            <div className="relative flex-1">
              <select
                id="isDiscountAppRights"
                value={employeeData.isDiscountAppRights}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <label htmlFor="isDiscountAppRights" className="menuPeerLevel">
                Dis. Approved
              </label>
            </div>
          </div>






          {/* emp image */}
          <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
            <div className="relative flex-1">
              <div
                name="fileName"
                className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                onClick={handelClickImage}
              >
                {employeeData.fileName === "" ? (
                  <div className="pt-2 z-40 font-semibold text-center">
                    Upload Image
                  </div>
                ) : (
                  <div className="pt-2 z-40 text-center">
                    Image uploaded Successfully
                  </div>
                )}

                <input
                  type="file"
                  id="fileName"
                  name="fileName"
                  ref={imgRef}
                  onChange={handelImageChange}
                  style={{ display: "none" }}
                  accept=".jpg, .jpeg, .png"
                  max={"150px/150px"}
                />
              </div>

              <label htmlFor="fileName" className="menuPeerLevel">
                Employee Image
              </label>
            </div>

            {employeeData?.fileName && (
              <div
                className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                onClick={() => setImageView(true)}
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              >
                <IoMdImages className="w-4 h-4 font-semibold" />
              </div>
            )}
          </div>

          <div className="flex gap-[0.25rem]">

            {/* Hide Rate */}
            <div className="relative flex-1">
              <select
                id="hidden"
                value={employeeData.hidden}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <label htmlFor="hidden" className="menuPeerLevel">
                Hide Rate
              </label>
            </div>

            {/* Is Ticket Allowed */}
            <div className="relative flex-1">
              <select
                id="allowTicket"
                name="allowTicket"
                value={employeeData.allowTicket}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                {/* <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option> */}
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
              <label htmlFor="allowTicket" className="menuPeerLevel">
                Allow Ticket
              </label>
            </div>
          </div>

          {/* allow ticket Role */}
          <div className="relative flex-1">
            <input
              type="search"
              id="allowTicketRole"
              name="allowTicketRole"
              value={
                selectedSearchDropDownData?.allowTicketRole ||

                ""
              }
              onChange={(e) => {
                //handelChangeEmployeeDetails(e),
                setSelectedSearchDropDownData((preventData) => ({
                  ...preventData,
                  allowTicketRole: e.target.value,
                }));
              }}
              onClick={() => openShowSearchBarDropDown(10)}
              placeholder=" "
              className={`inputPeerField peer ${formErrors.allowTicketRole
                ? "border-b-red-500"
                : "border-borderColor"
                } focus:outline-none`}
            />
            <label htmlFor="allowTicketRole" className="menuPeerLevel">
              Allow Ticket For Role
            </label>

            {/* Dropdown to select the menu */}
            {showSearchBarDropDown === 10 && (
              <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                <ul>
                  {allDefaultRoleForTicket?.length > 0 ? (
                    allDefaultRoleForTicket?.map((data, index) => (
                      <li
                        key={data.id}
                        name="allowTicketRole"
                        className="my-1 px-2 cursor-pointer"
                        onClick={() => {
                          setSelectedSearchDropDownData((preventData) => ({
                            ...preventData,
                            allowTicketRole: data?.roleName,
                          }));
                          openShowSearchBarDropDown(0);
                          //handelChangeEmployeeDetails(e)
                          handelChangeEmployeeDetails({
                            target: { name: "allowTicketRole", value: data?.id },
                          });
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
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
                      {import.meta.env.VITE_API_SELECT_ROLE ||
                        "No records found"}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>



          <div className="flex gap-[0.25rem]">
            {/* Active */}
            <div className="relative flex-1">
              <select
                id="isActive"
                name="isActive"
                value={employeeData.isActive}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              <label htmlFor="isActive" className="menuPeerLevel">
                Active
              </label>
            </div>

            {/* indent issue */}
            <div className="relative flex-1">
              <select
                id="indentIssue"
                name="indentIssue"
                value={employeeData.indentIssue}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              <label htmlFor="indentIssue" className="menuPeerLevel">
                Indent Issue
              </label>
            </div>
          </div>
          <div className="flex gap-[0.25rem]">
            {/* Indent Approve */}
            <div className="relative flex-1">
              <select
                id="indentApprove"
                name="indentApprove"
                value={employeeData.indentApprove}
                onChange={handelChangeEmployeeDetails}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}

              // defaultValue={0}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              <label htmlFor="indentApprove" className="menuPeerLevel">
                Indent Approve
              </label>
            </div>
            <div className="relative flex-1 flex justify-start items-center">
              {isEditData ? (
                <button
                  type="button"
                  data-ripple-light="true"
                  className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                  onClick={onSubmitUpdateEmployeeMaster}
                >
                  {isButtonClick === 1 ? (
                    <FaSpinner className="text-xl animate-spin" />
                  ) : (
                    "Update"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  data-ripple-light="true"
                  className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                  onClick={onSubmitSaveEmployeeMaster}
                >
                  {isButtonClick === 1 ? (
                    <FaSpinner className="text-xl animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
              )}
            </div>
          </div>


          {/* search employee data */}
          <div className="relative flex-1">
            <CustomTextBox
              type="allCharacters"
              name="searchEmpData"
              value={searchEmpData || ''}
              onChange={(e) => handelOnChangeForEmployeeSearchData(e)}
              label="Search Employee Data"
            // showLabel={true}
            />

          </div>

        </div>
      </form>

      {/* show list of data */}
      <div>
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
          <div>Employee Details</div>
        </div>

        <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
          <thead
            style={{
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
          >
            <tr>
              {employeeMasterHeaderList.map((data, index) => (
                <td
                  key={index}
                  className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
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

          <tbody>
            {filterAllEmpMasterData?.map((data) => {
              return (
                <tr
                  className={`cursor-pointer 
                                            ${isHoveredTable === data?.empId
                      ? ""
                      : data?.empId % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                  key={data?.empId}
                  onMouseEnter={() => setIsHoveredTable(data?.empId)}
                  onMouseLeave={() => setIsHoveredTable(null)}
                  style={{
                    background:
                      isHoveredTable === data?.empId
                        ? activeTheme?.subMenuColor
                        : undefined,
                  }}
                >
                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                    {data?.empId}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                    {data?.empCode}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                    {data?.title + " " + data?.fName + " " + data?.lName}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                    {data?.mobileNo}
                  </td>

                  <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                    {data?.email}
                  </td>

                  <td className="border-b px-4 h-5 flex items-center text-xxs font-semibold gap-2">
                    <button
                      type="button"
                      data-ripple-light="true"
                      className="relative overflow-hidden w-4 h-4 flex justify-center items-center"
                    >
                      <FaRegEdit
                        className={`w-full h-full ${data?.isActive === 1
                          ? "text-blue-500 cursor-pointer"
                          : "text-gray-400 cursor-not-allowed"
                          }`}
                        onClick={() => {
                          if (data?.isActive === 1) {
                            getSingleMenuDataForUpDate(data?.empId);
                            setIsEditData(true);
                          }
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
                          setShowPopup(true);
                        }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {openModelForStateOrDistrictOrCityData !== "" && (
        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
          <div className="border-[1px] w-72 flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50">
            <div
              className="border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md"
              style={{
                borderImage: activeTheme?.menuColor,
                background: activeTheme?.menuColor,
              }}
            >
              <div
                className=" font-semibold"
                style={{ color: activeTheme?.iconColor }}
              >
                Add {openModelForStateOrDistrictOrCityData}
              </div>

              <IoMdCloseCircleOutline
                className="text-xl cursor-pointer"
                style={{ color: activeTheme?.iconColor }}
                onClick={() => {
                  setopenModelForStateOrDistrictOrCityData(""),
                    setisErrorForAddSateCityDistrict("");
                }}
              />
            </div>

            <div>
              <div className="text-center text-xs mt-3 font-semibold text-red-500">
                {isErrorForAddSateCityDistrict}
              </div>

              <div className="relative flex-1 mt-5 mx-3">
                <input
                  type="text"
                  id={`${openModelForStateOrDistrictOrCityData}`}
                  autoComplete="off"
                  name={`${openModelForStateOrDistrictOrCityData}`}
                  value={inputFieldForSateCityDistrict}
                  onChange={(event) =>
                    setInputFieldForStateCityDistrict(event.target.value)
                  }
                  required
                  placeholder={`Enter ${openModelForStateOrDistrictOrCityData}`}
                  className={`w-full font-semibold outline-none pl-2 text-sm  border-[1.5px] bg-white h-9 rounded-md`}
                />
              </div>

              <div
                className=" w-16 h-8 my-3 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer ml-3"
                style={{
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
                onClick={saveStateOrCityOrDistrict}
              >
                {isButtonClick === 2 ? (
                  <FaSpinner className="text-xl animate-spin" />
                ) : (
                  "Save"
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* popup for active and deactive status */}
      {showPopup && (
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
                  onClick={() => setShowPopup(false)}
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
                  {isButtonClick === 3 ? (
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

      {imageView && (
        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
          <div className="border-[1px] w-60 flex justify-center items-center flex-col h-auto shadow-2xl bg-white rounded-md animate-slideDown z-50">
            <div className="flex flex-col items-center gap-5 my-2">
              <div>
                <img src={employeeData?.fileName} alt="path not found" />
              </div>

              <div>
                <button
                  type="button"
                  data-ripple-light="true"
                  className="relative overflow-hidden border-[1.5px] w-16 h-8 rounded-md font-semibold text-textColor transition-all duration-300 text-sm "
                  style={{
                    borderImageSource: activeTheme?.menuColor,
                    borderImageSlice: 1,
                    borderRadius: "5px",
                    overflow: "hidden",
                    WebkitMaskImage:
                      "radial-gradient(circle, white 90%, transparent 100%)", // Optional for additional support
                  }}
                  onClick={() => setImageView(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
