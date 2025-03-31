import React, { useEffect, useState } from "react";
import DynamicTable, {
  StyledHr,
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useGetData } from "../../../../service/apiService";
import { usePostData } from "../../../../service/service";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addObjectId,
  addRandomObjectId,
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { SalesHierarchyPopupModal } from "../../../../Custom Components/NewPopups";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import CustomLoadingPage from "../../../global/CustomLoadingPage";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import useRippleEffect from "../../../customehook/useRippleEffect";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRetrieveData } from "../../../../service/service";
import CustomMultiSelectDropdown from '../../../global/CustomMultiSelectDropdown'
import CustomFormButtonWithLoading from "../../../global/CustomFormButtonWithLoading";
import { FaSpinner } from "react-icons/fa";
import { useFormattedDateTime } from "../../../customehook/useDateTimeFormate";
import { IoAlertCircleOutline } from "react-icons/io5";


// Main Component
export default function SalesHierarchy() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.userSliceName?.user || null);

  const [DesignationId, setDesignationId] = useState("");
  const [DesignationValue, setDesignationValue] = useState("");
  const [showPopup, setShowPopup] = useState(0);
  const [DesignationDropDown, setDesignationDropDown] = useState(false);
  const [DesignationHoverIndex, setDesignationHoverIndex] = useState(null);
  const [DesignationSelectedOption, setDesignationSelectedOption] = useState("");
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  //const [showPopup, setShowPopup] = useState(false);
  const [Params, setParams] = useState({});
  const [row, setRow] = useState([]);
  const getData = useGetData();
  const DesignationData = useGetData();
  //const PostData = usePostData();


  // !========anil code===========
  const [allDesignationData, setAllDesignationData] = useState([]);
  const [selectedDesignationIdData, setselectedDesignationIdData] = useState(0);
  const [selecetEmployeeData, setSelecetEmployeeData] = useState([]);
  const [isButtonClick, setIsButtonClick] = useState(0);
  const [tagButtonEmpId, setTagButtonEmpId] = useState(0);
  const [deleteEmpId, setdeleteEmpId] = useState(0);
  const [isHoveredPopupTable, setIsHoveredPopupTable] = useState(0);
  const allEmployeeData = useRetrieveData();
  const allEmployeeDataBasedOnEmpId = useRetrieveData();
  const postSalesHierarchy = usePostData();
  const getSalesHierarchy = useRetrieveData();


  useEffect(() => {

    async function getAllData() {
      const response = await DesignationData?.fetchData(
        `/designationMaster?select= id,designationname&$filter=(id lt 6 or (id gt 9 and id lt 13))`
      );



      if (getData?.data) {
        setRow(addRandomObjectId(getData.data));
        setAllDesignationData(response?.data)
      }
    }
    getAllData()
  }, [getData?.data]);


  // Columns for the table
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    {
      field: "fName",
      headerName: "Employee",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.fName} {params.row.lName}
          </>
        );
      },
    },
    {
      field: "investigationName",
      headerName: "Tag",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <SubmitButton
              text="Tag"
              submit={false}
              callBack={() => {
                setParams(params);
                setShowPopup(true);
              }}
              style={{ width: "100px", height: "1.05rem" }}
            />
          </>
        );
      },
    },
  ];

  // Function to handle input changes
  const handleSearchChange4 = (e) => {
    setDesignationValue(e.target.value);
    setDesignationDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick4 = (name, id) => {

    //!=======anil code=========
    setselectedDesignationIdData(id)
    //!====== end anil code======

    setDesignationId(id);
    setDesignationValue(name);
    setDesignationSelectedOption(name);
    setDesignationDropDown(false);
  };


  // Handle form submission
  const handleSubmit = async () => {
    await getData?.fetchData(
      `/empmaster?select=empid,fname,lname&$filter=(designationId eq ${DesignationId} and isactive eq 1 and isSalesTeamMember eq 1)`
    );
  };

  const getNextIndex = (id) => {
    // Find the index of the given id
    const currentIndex = allDesignationData.findIndex((item) => item.id === id);

    // Check if the current index is valid and not the last item
    if (currentIndex !== -1 && currentIndex < allDesignationData.length - 1) {
      return currentIndex + 1;
    } else {
      return -1; // No next index found or last item
    }
  };


  //handel click for tagbutton
  const handelTagData = async (empId) => {

    setTagButtonEmpId(empId);
    const nextIndexData = getNextIndex(selectedDesignationIdData);

    const nextId = allDesignationData[nextIndexData].id;

    try {
      await allEmployeeData?.fetchDataFromApi(`/empmaster?select=empid,fname,lname&$filter=(designationId eq ${nextId} and isactive eq 1 and isSalesTeamMember eq 1)`);

      await getAllEmployeeBasedOnSelecteId(empId);

      setShowPopup(1);
    } catch (error) {
      toast.error(error?.message);
    }

  }

  const getAllEmployeeBasedOnSelecteId = async (empId) => {
    await allEmployeeDataBasedOnEmpId?.fetchDataFromApi(`/SalesEmployeeTagging/GetSalesTagging?tagged=${empId}`);
  }

  const handelOnChangeSelecetEmpMode = (updatedSelectedItems) => {
    setSelecetEmployeeData(updatedSelectedItems);
  };

  useRippleEffect()

  const submitEmployeeData = async (e) => {

    e.preventDefault();
    setIsButtonClick(1);

    const timeData = useFormattedDateTime();

    const updatedData = selecetEmployeeData.map((data) => (
      {
        "id": 0,
        "salesEmployeeId": data?.empId,
        "taggedToId": tagButtonEmpId,
        "taggedById": parseInt(user?.employeeId),
        "taggedDate": timeData
      }
    ))

    try {

      const response = await postSalesHierarchy.postRequestData('/SalesEmployeeTagging/CreateSalestagging', updatedData);                                                          


      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message)
      }

    } catch (error) {
      toast.error(error)
    }

    await getAllEmployeeBasedOnSelecteId(tagButtonEmpId);

    setIsButtonClick(0);
    setSelecetEmployeeData([]);
    setTagButtonEmpId(0);
  }


  //delete  meployee data
  const handleDeleteEmpData = async () => {
    setIsButtonClick(2);
   

    try {
      const response = await getSalesHierarchy?.fetchDataFromApi(`/SalesEmployeeTagging/RemoveSalesTagging?id=${deleteEmpId}`);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }

    } catch (error) {
      toast.error(error?.message);
    }

    setShowPopup(0);
    setdeleteEmpId(0);
    setIsButtonClick(0);
  }
  // Handle form submission
  // const handleSave = async () => {
  //   try {
  //     const res = await PostData?.postRequest(
  //       `/tnx_Booking/UpdateBarcode`,
  //       UpdatedBarcode
  //     );
  //     if (res?.success) {
  //       toast?.success(res?.message);
  //       window.location.reload();
  //     } else {
  //       toast?.error(res?.message);
  //     }
  //   } catch (error) {
  //     toast?.error(res?.message);
  //   }
  // };



  return (
    <div>
      {/* <SalesHierarchyPopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        Params={Params}
        EmployeeData={row}
      /> */}
      <FormHeader title="Sales Hierarchy" />

      <form autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-2 mx-1 lg:mx-2">
          <SearchBarDropdown
            id="search-bar"
            name="search"
            value={DesignationValue}
            onChange={handleSearchChange4}
            label="Designation"
            options={DesignationData?.data}
            isRequired={false}
            showSearchBarDropDown={DesignationDropDown}
            setShowSearchBarDropDown={setDesignationDropDown}
            handleOptionClickForCentre={handleOptionClick4}
            setIsHovered={setDesignationHoverIndex}
            isHovered={DesignationHoverIndex}
            style={{ marginTop: "0.1rem", marginBottom: "0px" }}
          />

          <TwoSubmitButton
            options={[
              {
                label: "Search",
                submit: false,
                callBack: () => {
                  handleSubmit();
                },
              },
              // {
              //   label: "Save",
              //   submit: false,
              //   callBack: () => {
              //     handleSave();
              //   },
              // },
            ]}
          />
        </div>
      </form>

      {/* <StyledHr />
      <div className="w-full md:w-1/2 h-[300px]">
        <UpdatedDynamicTable
          rows={row}
          name="Sales Hierarchy Details"
          loading={getData?.loading}
          columns={columns}
          viewKey="Random"
          showHr={false}
        />
      </div> */}

      {/* !========================Anil Code==================== */}
      <div className="w-full md:w-1/2">
        <GridDataDetails gridDataDetails={'Sales Hierarchy Details'} />

        {
          getData?.loading ?
            <div className="flex items-center justify-center w-full">
              <CustomLoadingPage />
            </div>
            :
            <CustomDynamicTable activeTheme={activeTheme} columns={['SR.NO.', 'Employee', 'Tag']}>
              <tbody >
                {
                  getData?.data?.map((data, index) => {

                    return (
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

                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                          {`${data?.fName} ${data?.lName}`}
                        </td>

                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" >
                          {
                            selectedDesignationIdData !== 12 && (
                              <button
                                type="button"
                                data-ripple-light="true"
                                onClick={() => handelTagData(data?.empId)} // Trigger the onClick callback when button is clicked
                                className={`overflow-hidden relative font-semibold text-xxxs w-20 h-full rounded-md flex justify-center items-center  cursor-pointer px-2`}
                                style={{
                                  background: activeTheme?.menuColor,
                                  color: activeTheme?.iconColor,
                                }}
                              // disabled={disabled}
                              >
                                Tag
                              </button>
                            )
                          }


                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </CustomDynamicTable>
        }

      </div>

      {
        showPopup === 1 && (
          <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
            <div className={` z-50 w-96 max-h-[40vh] shadow-2xl bg-white rounded-lg animate-slideDown flex flex-col`}>

              {/* Header */}
              <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                  Sales Hierarchy
                </div>
                <IoMdCloseCircleOutline
                  className="text-xl cursor-pointer"
                  style={{ color: activeTheme?.iconColor }}
                  onClick={() => setShowPopup(0)}
                />
              </div>

              <FormHeader title={'Sales Hierarchy Employee'} />

              {
                allEmployeeData?.loading ?
                  <CustomLoadingPage />
                  :
                  <>
                    <form autoComplete="off" onSubmit={submitEmployeeData}>
                      <div className="m-2 flex gap-2 w-full">

                        <div className="relative w-72">
                          <CustomMultiSelectDropdown
                            id="selecetEmployeeData"
                            name="selecetEmployeeData"
                            label="Select Employee"
                            options={allEmployeeData?.data}
                            selectedItems={selecetEmployeeData}
                            onSelectionChange={handelOnChangeSelecetEmpMode}
                            placeholder=" "
                            activeTheme={activeTheme}
                            uniqueId={'empId'}
                            searchWithName={'fName'}
                          />
                        </div>

                        <div className="relative w-[4.5rem]">
                          <CustomFormButtonWithLoading
                            text={'Save'}
                            activeTheme={activeTheme}
                            icon={FaSpinner}
                            isButtonClick={isButtonClick}
                            loadingButtonNumber={1} // Unique number for the first button
                          // onClick={() => onSubmitForSaveEditInfoData()}
                          />
                        </div>
                      </div>
                    </form>


                    <GridDataDetails gridDataDetails={'Sales Hierarchy Employee Details'} />

                    {
                      allEmployeeDataBasedOnEmpId?.loading ?
                        <CustomLoadingPage />
                        :
                        <CustomDynamicTable activeTheme={activeTheme} height={'10px'} columns={['Name', 'Action']}>
                          <tbody>
                            {/* {Array.from({ length: 10 }).map((_, i) => ( */}
                            {
                              allEmployeeDataBasedOnEmpId?.data?.data?.map((data, index) => {
                                return (
                                  <tr
                                    className={`cursor-pointer whitespace-nowrap ${isHoveredPopupTable === index
                                      ? ''
                                      : index % 2 === 0
                                        ? 'bg-gray-100'
                                        : 'bg-white'
                                      }`}
                                    key={`${index}-${index}`}
                                    onMouseEnter={() => setIsHoveredPopupTable(index)}
                                    onMouseLeave={() => setIsHoveredPopupTable(null)}
                                    style={{
                                      background:
                                        isHoveredPopupTable === index ? activeTheme?.subMenuColor : undefined,
                                    }}
                                  >
                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                      {data?.employeeName}
                                    </td>
                                    <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                                      <IoMdCloseCircleOutline
                                        onClick={() => { setdeleteEmpId(data?.id), setShowPopup(2) }}
                                        className="h-4 w-4 text-red-500" />
                                    </td>
                                  </tr>
                                );
                              })
                            }
                            {/* ))} */}

                          </tbody>
                        </CustomDynamicTable>
                    }
                  </>
              }



              {/* footer */}
              <div
                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                style={{
                  borderImage: activeTheme?.menuColor,
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              ></div>
            </div>

          </div>
        )
      }


      {/* delete employee data */}
      {
        showPopup == 2 && (
          <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
            <div className={` z-50 w-72 max-h-[40vh] shadow-2xl bg-white rounded-lg animate-slideDown flex flex-col`}>

              <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                  Delete Employee Data
                </div>
                <IoMdCloseCircleOutline
                  className="text-xl cursor-pointer"
                  style={{ color: activeTheme?.iconColor }}
                  onClick={() => setShowPopup(0)}
                />
              </div>



              <div className="flex flex-col justify-center items-center mt-4">
                <div className="text-xxs font-bold text-textColor/50">
                  Are you sure want to remove Data ?
                </div>

                <div className="flex items-end gap-5 my-4">

                  <div>
                    <button
                      type="button"
                      data-ripple-light="true"
                      className="relative overflow-hidden border-[1.5px] w-16 h-8 rounded-md font-semibold text-textColor transition-all duration-300 text-sm "
                      style={{
                        borderImageSource: activeTheme?.menuColor,
                        borderImageSlice: 1,

                      }}
                      onClick={() => setShowPopup(0)}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className=" w-16 h-8 rounded-md font-semibold  text-sm flex justify-center items-center gap-2 cursor-pointer"
                    style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                    onClick={handleDeleteEmpData}>
                    <div>
                      {
                        isButtonClick === 2 ?
                          <FaSpinner className="w-full h-full animate-spin text-textColor" />
                          :
                          'Yes'
                      }
                    </div>
                  </div>

                </div>
              </div>

              {/* footer */}
              <div
                className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                style={{
                  borderImage: activeTheme?.menuColor,
                  background: activeTheme?.menuColor,
                  color: activeTheme?.iconColor,
                }}
              ></div>
            </div>
          </div>
        )
      }
    </div >
  );
}
