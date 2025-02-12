import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { IoMdMenu } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { testOrderingHeader } from '../../listData/listData';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function TestOrdering() {
    // const user = useSelector((state) => state.userSliceName?.user || null);
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(0);

    const openShowSearchBarDropDown = (val) => {
        setShowSearchBarDropDown(val);
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
                    <div>NABL Master</div>
                </div>

                {/* form data */}
                <form autoComplete='off'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">


                        {/* Department */}
                        <div className="relative flex-1">
                            <input
                                type="search"
                                id="testName"
                                name="testName"
                                // value={selectedDropDown?.testName || testMappingData?.testName || ''}
                                // onChange={(e) => {
                                //     handelOnChangeTestMappingData(e),
                                //         setSeleDropDown((preventData) => ({
                                //             ...preventData,
                                //             testName: ''
                                //         }))
                                // }}
                                onClick={() => openShowSearchBarDropDown(1)}

                                placeholder=" "
                                className={`inputPeerField peer border-borderColor focus:outline-none`}
                            />
                            <label htmlFor="testName" className="menuPeerLevel">
                                Department
                            </label>

                            {/* Dropdown to select the menu */}
                            {showSearchBarDropDown === 1 && (
                                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                                    <ul>

                                        {
                                            /* {filterAlltestNameData?.length > 0 ? (
                                                filterAlltestNameData?.map((data, index) => (
                                                    <li
                                                        key={data?.itemId}
                                                        name="testName"
                                                        className="my-1 px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            openShowSearchBarDropDown(0);
                                                            handelOnChangeTestMappingData({
                                                                target: { name: 'testName', value: data?.itemId },
                                                            });
                                                            setSeleDropDown((preventData) => ({
                                                                ...preventData,
                                                                testName: data?.itemName
                                                            }))
                                                        }}
                                                        onMouseEnter={() => setIsHovered(index)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                        style={{
                                                            background:
                                                                isHovered === index ? activeTheme?.subMenuColor : 'transparent',
                                                        }}
                                                    >
                                                        {data?.itemName}
                                                    </li>
    
                                                ))
                                            )  */

                                        }

                                                        // : (
                                                        // <li className="py-4 text-gray-500 text-center">
                                                        //     {import.meta.env.VITE_API_RECORD_NOT_FOUND || 'No records found'}
                                                        // </li>
                                                        // )

                                        <div>Under Processing</div>

                                    </ul>
                                </div>
                            )}
                        </div>



                        <div className='flex gap-[0.25rem]'>

                            <div className="relative flex-1 flex justify-start items-center">

                                {
                                    // isEditData ? <button
                                    //     className={`font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                    //     style={{
                                    //         background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                    //     }}
                                    //     onClick={onSubmitUpdateEmployeeMaster}
                                    // >

                                    //     {
                                    //         isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Update'
                                    //     }

                                    // </button>
                                    //     :
                                    <button
                                        className={`font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                        style={{
                                            background: activeTheme?.menuColor, color: activeTheme?.iconColor
                                        }}
                                    // onClick={onSubmitSaveEmployeeMaster}
                                    >

                                        {/* {
                                                            isButtonClick === 1 ? <FaSpinner className='text-xl animate-spin' /> : 'Save'
                                                        } */}
                                        Save
                                    </button>
                                }

                            </div>

                            <div className="relative flex-1"></div>
                        </div>
                    </div>
                </form>
            </div>


            {/* grid data */}
            <div>
                <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>
                <div
                    className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
                    style={{ background: activeTheme?.blockColor }}
                >
                    <div>
                        <IoMdMenu className='font-semibold text-lg' />
                    </div>
                    <div>Test Ordering Details</div>
                </div>

                <table className="table-auto border-collapse w-full text-xxs text-left mb-2">

                    <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <tr>
                            {testOrderingHeader.map((data, index) => (
                                <td
                                    key={index}
                                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"

                                    style={{
                                        width: index % 2 === 0 ? '50px' : '',
                                    }}
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

                        {/* {
                                       allEmpMasterData?.map((data) => {
           
                                           return (
                                               <tr
                                                   className={`cursor-pointer 
                                                       ${isHoveredTable === data?.empId
                                                           ? ''
                                                           : data?.empId % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                                       }`}
                                                   key={data?.empId}
                                                   onMouseEnter={() => setIsHoveredTable(data?.empId)}
                                                   onMouseLeave={() => setIsHoveredTable(null)}
                                                   style={{
                                                       background:
                                                           isHoveredTable === data?.empId ? activeTheme?.subMenuColor : undefined,
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
                                                       <button className="w-4 h-4 flex justify-center items-center">
                                                           <FaRegEdit
                                                               className={`w-full h-full ${data?.isActive === 1 ? "text-blue-500 cursor-pointer" : "text-gray-400 cursor-not-allowed"
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
                                                           className={`w-4 h-4 flex justify-center items-center ${data?.isActive === 1 ? 'text-green-500' : 'text-red-500'
                                                               }`}
                                                       >
           
                                                           <ImSwitch className="w-full h-full"
                                                               onClick={() => {
                                                                   setClickedRowId(data);
                                                                   setShowPopup(true);
                                                               }}
                                                           />
           
                                                       </button>
                                                   </td>
                                               </tr>
                                           )
                                       })
                                   } */}

                    </tbody>
                </table>
            </div>
        </>
    )
}
