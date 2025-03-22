import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getAllDepartmentApi,
  getAllTestNameUsingDeptId,
  getCenterDataForReferanceRangeApi,
  saveInterpreationDataApi,
  updateInterPreationDataApi,
} from "../../../service/service";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import useRippleEffect from "../../customehook/useRippleEffect";
import CustomeEditor from "../../sharecomponent/CustomeEditor";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";

export default function InterpretationMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  useRippleEffect();

  const [interpretationMasterData, setInterpretationMasterData] = useState({
    isActive: 0,
    createdById: 0,
    createdDateTime: new Date(
      "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
    ).toISOString(),
    updateById: 0,
    updateDateTime: new Date(
      "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
    ).toISOString(),
    id: 0,
    itemId: 0,
    interpretation: "",
    centreId: 0,
    showInReport: 1,
    showinPackages: 1,
  });
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [selectInterpreationMaster, setSelectInterpreationMaster] = useState({
    centreId: "",
    itemId: "",
  });
  //   const [department, setDepartment] = useState("");
  const [allcenterData, setAllCenterData] = useState([]);
  const [allDepartementData, setAllDepartementData] = useState([]);
  const [allTestName, setAllTestName] = useState([]);
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [singleInterpreationData, setSingleInterpreationData] = useState("");

  // ------------------ Department -------------------------------
  const [department, setDepartment] = useState(null);
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");

  const user = useSelector((state) => state.userSliceName?.user || null);
  console.log("department => ", department, " ");
  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await getCenterDataForReferanceRangeApi();
        setAllCenterData(response);
      } catch (error) {
        toast.error(error?.message);
      }
    };
    getCenterData();

    const getAllDepartement = async () => {
      try {
        const response = await getAllDepartmentApi();
        setAllDepartementData(response);
      } catch (err) {
        toast.error(err?.message);
      }
    };
    getAllDepartement();
  }, []);

  useEffect(() => {
    const getAllTestName = async () => {
      try {
        const response = await getAllTestNameUsingDeptId(department);
        setAllTestName(response);
      } catch (error) {
        toast.error(error?.message);
      }
    };
    if (department !== "") {
      getAllTestName();
    }
  }, [department]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await updateInterPreationDataApi(
          interpretationMasterData?.itemId || 0,
          interpretationMasterData?.centreId || 0
        );
        // if (response?.length == 0) {
        //   setContent("");
        // }
        if (response && response[0]) {
          setInterpretationMasterData(response[0]);
          setSingleInterpreationData(response[0]);
          setContent(response[0]?.interpretation || "");
        } else {
          setContent("");
        }
        console.log("response => ", response);
      } catch (error) {
        toast.error(error?.message || "Error fetching interpretation data");
      }
    };

    if (
      interpretationMasterData?.centreId &&
      department &&
      interpretationMasterData?.itemId &&
      singleInterpreationData === ""
    ) {
      getData();
    }
  }, [interpretationMasterData, department]);

  // Add this effect to handle department changes
  useEffect(() => {
    setContent("");
    setSingleInterpreationData("");
    setAllTestName([]); // Clear test list when department changes
    setSearchTest(""); // Clear test search field
  }, [department]);

  // Add this effect to handle item changes
  useEffect(() => {
    if (interpretationMasterData.itemId !== singleInterpreationData?.itemId) {
      setContent("");
      setSingleInterpreationData("");
    }
  }, [interpretationMasterData.itemId]);

  const openShowSearchBarDropDown = (val) => {
    setShowSearchBarDropDown(val);
  };

  const handelOnChangeInterpretationMasterData = (event) => {
    if (!event?.target) return;

    setInterpretationMasterData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value || "",
    }));
  };

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setDepartmentValue(e.target.value);
    setDepartmentDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setDepartmentValue(name);
    setDepartment(id);
    setDepartmentSelectedOption(name);
    setDepartmentDropDown(false);
    // Clear content and related data when department changes
    setContent("");
    setSingleInterpreationData("");
    setInterpretationMasterData(prev => ({
      ...prev,
      itemId: 0
    }));
    setSearchTest("");
  };

  // Handle content change from the editor
  const handleContentChange = (newContent) => {
    setContent(newContent); // Update the state with the new content
  };

  const onSubmitSaveInterpretationData = async (event) => {
    event.preventDefault();
    setIsButtonClick(1);
    const updatedData = {
      ...interpretationMasterData,
      interpretation: content,
      createdById: parseInt(user?.employeeId),
      createdDateTime: new Date().toISOString(),
      showInReport: 1,
      showinPackages: 1,
    };

    console.log(updatedData);

    // try {
    //     const response = await saveInterpreationDataApi(updatedData);

    //     if (response?.success) {

    //         toast.success(response?.message);

    //         setInterpretationMasterData({
    //             isActive: 0,
    //             createdById: 0,
    //             createdDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
    //             updateById: 0,
    //             updateDateTime: new Date('1970-01-01T00:00:00:00Z'.replace(/:\d+Z$/, 'Z')).toISOString(),
    //             id: 0,
    //             itemId: 0,
    //             interpretation: '',
    //             centreId: 0,
    //             showInReport: 0,
    //             showinPackages: 0
    //         });

    //         setSelectInterpreationMaster({
    //             centreId: '',
    //             itemId: ''
    //         });

    //         setContent('');

    //     } else {
    //         toast.error(response?.message);
    //     }

    // } catch (error) {
    //     toast.error(error?.message);
    // }

    setIsButtonClick(0);
  };

  const onSubmitUpdateInterpretationData = async (event) => {
    event.preventDefault();
    setIsButtonClick(1);
    const updatedData = {
      ...interpretationMasterData,
      interpretation: content,
      updateById: parseInt(user?.employeeId),
      updateDateTime: new Date().toISOString(),
    };

    try {
      const response = await saveInterpreationDataApi(updatedData);

      if (response?.success) {
        toast.success(response?.message);

        setInterpretationMasterData({
          isActive: 0,
          createdById: 0,
          createdDateTime: new Date(
            "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
          ).toISOString(),
          updateById: 0,
          updateDateTime: new Date(
            "1970-01-01T00:00:00:00Z".replace(/:\d+Z$/, "Z")
          ).toISOString(),
          id: 0,
          itemId: 0,
          interpretation: "",
          centreId: 0,
          showInReport: 1,
          showinPackages: 1,
        });

        setSelectInterpreationMaster({
          centreId: "",
          itemId: "",
        });

        setContent("");
        setSingleInterpreationData("");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }

    setIsButtonClick(0);
  };

  // 1. First, add a search input state
  const [searchCentre, setSearchCentre] = useState("");
  const [searchTest, setSearchTest] = useState("");

  // 2. Modify the filter functions to use the search states
  const filterAllCentreData = useMemo(() => {
    if (!searchCentre) return allcenterData;
    return (
      allcenterData?.filter((data) =>
        data?.companyName?.toLowerCase().includes(searchCentre.toLowerCase())
      ) || []
    );
  }, [allcenterData, searchCentre]);

  const filterAllTestData = useMemo(() => {
    if (!searchTest) return allTestName;
    return (
      allTestName?.filter((data) =>
        data?.itemName?.toLowerCase().includes(searchTest.toLowerCase())
      ) || []
    );
  }, [allTestName, searchTest]);

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
        <div>Interpretation Master</div>
      </div>

      {/* form data */}
      <form autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          {/* centre name */}
          <div className="relative flex-1">
            <div className="relative flex-1">
              <input
                type="search"
                id="centreId"
                name="centreId"
                value={searchCentre}
                onChange={(e) => {
                  setSearchCentre(e.target.value);
                  openShowSearchBarDropDown(1);
                }}
                onClick={() => openShowSearchBarDropDown(1)}
                placeholder=" "
                className={`inputPeerField peer border-borderColor focus:outline-none`}
              />
              <label htmlFor="centreId" className="menuPeerLevel">
                Centre Name
              </label>

              {/* Dropdown to select the menu */}
              {showSearchBarDropDown === 1 && (
                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                  <ul>
                    {filterAllCentreData?.length > 0 ? (
                      filterAllCentreData?.map((data, index) => (
                        <li
                          key={data?.centreId}
                          name="centreId"
                          className="my-1 px-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            openShowSearchBarDropDown(0);
                            setSearchCentre(data?.companyName || "");
                            handelOnChangeInterpretationMasterData({
                              target: {
                                name: "centreId",
                                value: data?.centreId,
                              },
                            });
                            setSelectInterpreationMaster((prevData) => ({
                              ...prevData,
                              centreId: data?.companyName,
                            }));
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
                        No records found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Departement */}
          <SearchBarDropdown
            id="search-bar"
            name="Department"
            value={DepartmentValue}
            onChange={handleSearchChange2}
            label="Department"
            placeholder="Serch Department"
            options={allDepartementData}
            isRequired={false}
            showSearchBarDropDown={DepartmentDropDown}
            setShowSearchBarDropDown={setDepartmentDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setDepartmentHoveIndex}
            isHovered={DepartmentHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />

          {/* item name */}
          <div className="relative flex-1">
            <div className="relative flex-1">
              <input
                type="search"
                id="itemId"
                name="itemId"
                value={searchTest}
                onChange={(e) => {
                  setSearchTest(e.target.value);
                  openShowSearchBarDropDown(2);
                }}
                onClick={() => openShowSearchBarDropDown(2)}
                placeholder=" "
                className={`inputPeerField peer border-borderColor focus:outline-none`}
              />
              <label htmlFor="itemId" className="menuPeerLevel">
                Test Name
              </label>

              {/* Dropdown to select the menu */}
              {showSearchBarDropDown === 2 && (
                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                  <ul>
                    {filterAllTestData?.length > 0 ? (
                      filterAllTestData.map((data, index) => (
                        <li
                          key={data?.itemId}
                          name="itemId"
                          className="my-1 px-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            openShowSearchBarDropDown(0);
                            setSearchTest(data?.itemName || "");
                            setContent(""); // Clear content when new test is selected
                            setSingleInterpreationData(""); // Reset interpretation data
                            handelOnChangeInterpretationMasterData({
                              target: {
                                name: "itemId",
                                value: data?.itemId,
                              },
                            });
                            setSelectInterpreationMaster((prevData) => ({
                              ...prevData,
                              itemId: data?.itemName,
                            }));
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
                          {data?.itemName || "Unnamed Test"}
                        </li>
                      ))
                    ) : (
                      <li className="py-4 text-gray-500 text-center">
                        No records found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-[0.25rem]">
            {/* Print on Report */}
            <div className="relative flex-1">
              <select
                id="showInReport"
                name="showInReport"
                value={interpretationMasterData?.showInReport}
                onChange={handelOnChangeInterpretationMasterData}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              <label htmlFor="showInReport" className="menuPeerLevel">
                Print on Report
              </label>
            </div>

            {/* print on package */}
            <div className="relative flex-1 ">
              <select
                id="showinPackages"
                name="showinPackages"
                value={interpretationMasterData.showinPackages}
                onChange={handelOnChangeInterpretationMasterData}
                className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none `}
              >
                <option value="" disabled hidden className="text-gray-400">
                  Select Option
                </option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              <label htmlFor="showinPackages" className="menuPeerLevel">
                Print on Package
              </label>
            </div>
          </div>

          <div className="flex gap-[0.25rem]">
            <div className="relative flex-1 flex justify-start items-center">
              {singleInterpreationData === "" ? (
                <button
                  type="button"
                  data-ripple-light="true"
                  className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                  onClick={onSubmitSaveInterpretationData}
                >
                  {isButtonClick === 1 ? (
                    <FaSpinner className="text-xl animate-spin" />
                  ) : (
                    "Save"
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
                  onClick={onSubmitUpdateInterpretationData}
                >
                  {isButtonClick === 1 ? (
                    <FaSpinner className="text-xl animate-spin" />
                  ) : (
                    "Update"
                  )}
                </button>
              )}
            </div>
            <div className="relative flex-1 flex justify-start items-center"></div>
          </div>
        </div>

        <div className="">
          {/* <JoditEditor
                        ref={editor}
                        value={content}

                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { setContent(newContent) }}
                    /> */}

          <CustomeEditor
            value={content} // Controlled value for the editor
            // onContentChange={setContent}
            onContentChange={handleContentChange} // Callback to update content
          />
        </div>
      </form>
    </>
  );
}
