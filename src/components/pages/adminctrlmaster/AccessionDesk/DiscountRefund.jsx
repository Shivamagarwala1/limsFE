
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import "./ReportDispatch.css";
import FormHeader from '../../../global/FormHeader'
import { toast } from "react-toastify";
import CustomDropdown from "../../../global/CustomDropdown";
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import { disountHeaderData, refundHeaderData } from "../../../listData/listData";
import CustomFormButtonWithLoading from "../../../global/CustomFormButtonWithLoading";
import { FaSpinner } from "react-icons/fa";
import { usePostData, useRetrieveData } from "../../../../service/service";
import CustomLoadingPage from "../../../global/CustomLoadingPage";
import { MdAssignmentReturn } from "react-icons/md";
import { useFormattedDateTime } from "../../../customehook/useDateTimeFormate";

export default function DiscountRefund() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.userSliceName?.user || null);

  const [discountRefundData, setDiscountRefundData] = useState({
    selectType: 0,
    visitId: '',
    discountSearchValue: ''
  })
  const [barcodeData, setBarcodeData] = useState([]);

  const [discountTypeData, setDiscountTypeData] = useState({
    discountApprovedBy: '',
    discountReason: '',
    discountType: '',
    discountAmmount: '',
    discountPer: '',
    discountAmmount: '',
    discountPercentage: '',
    dicountDateTime: useFormattedDateTime(),
    grossAmount: 0
  })
  const [isButtonClick, setIsButtonClick] = useState(0);
  const allRefundsData = useRetrieveData();
  const allDiscountData = useRetrieveData();
  const allDiscountApprovedBy = useRetrieveData();
  const allDiscountReasonData = useRetrieveData();
  const allDicountTypeData = useRetrieveData();
  const postData = usePostData();
  // const allDiscountApprovedBy = useRetrieveData();

  const [isHoveredTable, setIsHoveredTable] = useState(null);

  const handelOnChangeDiscoundReundData = (e) => {

    setDiscountRefundData((preventData) => ({
      ...preventData,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmitRefundData = async () => {

    if (discountRefundData?.selectType === 1) {
      try {
        await allRefundsData.fetchDataFromApi(`/tnx_Booking/GetPatientDetail?workorderId=${discountRefundData?.visitId}`)
      } catch (error) {
        toast.error(error?.message);
      }
    } else {
      try {
        const response = await allDiscountData.fetchDataFromApi(
          `/tnx_Booking/patientDataDiscount?workorderId=${discountRefundData?.discountSearchValue}`
        );

        // Check if the response has data
        if (response?.data?.length !== 0) {
          setDiscountTypeData((prvdata) => ({
            ...prvdata,
            grossAmount: response?.data?.data[0]?.grossAmount
          }))
        }

      } catch (error) {
        toast.error(error?.message);
      }
    }

  }

  const handleInputChangeForPopUpGridData = (testId, value) => {
    setBarcodeData((prevData) => {
      // Check if the testId already exists
      const existingIndex = prevData.findIndex((item) => item.testId === testId);

      if (existingIndex !== -1) {
        // Update the existing object
        const updatedData = [...prevData];
        updatedData[existingIndex] = { ...updatedData[existingIndex], reason: value };
        return updatedData;
      } else {
        // Add a new object if testId is not found
        return [...prevData, { testId, reason: value }];
      }
    });
  };

  // console.log(barcodeData);


  //save refault reasion
  const saveRefundsData = async (testId) => {

    setIsButtonClick(testId * 10);

    const updatedData = {
      "testIds": [testId],
      "refundBy": parseInt(user?.employeeId),
      "refundReason": barcodeData.find((data) => data?.testId === testId)?.reason
    }

    try {
      const response = await postData.postRequestData(`/tnx_Booking/TestRefund`, updatedData);

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



  //dicount data
  useEffect(() => {
    const getAllData = async () => {
      await allDiscountApprovedBy.fetchDataFromApi(`empMaster?select=empId,fName,lName&$filter=(isDiscountAppRights eq 1)`);

      await allDiscountReasonData.fetchDataFromApi(`/discountReasonMaster?select=id,discountReasonName&$filter=(isActive eq 1)`);

      await allDicountTypeData.fetchDataFromApi(`/discountTypeMaster?select=id,type&$filter=(isActive eq 1)`);
    }
    if (discountRefundData?.selectType === 2) {
      getAllData();
    }
  }, [discountRefundData?.selectType])


  const handelOnChangeForDiscountType = (e) => {
    const { name, value } = e.target;
    const inputValue = parseFloat(value) || 0; // Convert value to float or default to 0
    const grossAmount = parseFloat(discountTypeData?.grossAmount) || 0; // Ensure grossAmount is valid

    setDiscountTypeData((prevData) => {
      let updatedData = { ...prevData, [name]: value };

      if (name === 'discountPercentage' && grossAmount > 0) {
        // Calculate discount amount when percentage changes
        const discountAmt = ((inputValue / 100) * grossAmount).toFixed(2);
        updatedData.discountAmmount = discountAmt;
      } else if (name === 'discountAmmount' && grossAmount > 0) {
        // Calculate discount percentage when amount changes
        const discountPercent = ((inputValue / grossAmount) * 100).toFixed(2);
        updatedData.discountPercentage = discountPercent;
      }

      return updatedData;
    });
  };


  const saveDiscountData = async (e) => {
    e.preventDefault();

    setIsButtonClick(1);

    const singleData = allDiscountData?.data?.data[0];

    const updatedData = {
      "workOrderId": singleData?.workOrderId,
      "transactionId": singleData?.transactionId,
      "discounttype": discountTypeData?.discountType,
      "discountAmt": discountTypeData?.discountAmmount,
      "discountReason": discountTypeData?.discountReason,
      "discountApprovedBy": discountTypeData?.discountApprovedBy,
      "userId": parseInt(user?.employeeId),
      "dicountDateTime": discountTypeData?.dicountDateTime
    }


    try {

      const response = await postData?.postRequestData('/tnx_Booking/DiscountAfterBill', updatedData);

      if (response?.success) {
        toast.success(response?.message);
        await onSubmitRefundData();
      } else {
        toast.error(response?.message)
      }

    } catch (error) {
      toast.error(error?.message);
    }
    setIsButtonClick(0);

  }

  return (
    <div>

      {/* Header data */}
      <div>
        <FormHeader headerData={'Discount or Refund'} />

        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2 items-center">

            {
              discountRefundData.selectType === 0 && (
                <div className="relative flex-1">
                  <CustomDropdown
                    name="selectType"
                    label="Select Type"
                    value={discountRefundData.selectType}
                    options={[
                      { label: 'Select Type ', value: 0, disabled: true },
                      { label: 'Refund', value: 1 },
                      { label: 'Discount', value: 2 },

                    ]}
                    onChange={(e) => handelOnChangeDiscoundReundData(e)}
                    defaultIndex={0}
                    activeTheme={activeTheme}
                  />
                </div>
              )
            }

            {
              discountRefundData?.selectType === 1 && (
                <div className="relative flex-1">
                  <CustomTextBox
                    type="charNumber"
                    name="visitId"
                    value={discountRefundData?.visitId || ''}
                    onChange={(e) => handelOnChangeDiscoundReundData(e)}
                    label="Visit Id"
                  // showLabel={true}
                  />

                </div>
              )
            }


            {
              discountRefundData?.selectType === 2 && (
                <div className="relative flex-1">
                  <CustomTextBox
                    type="charNumber"
                    name="discountSearchValue"
                    value={discountRefundData?.discountSearchValue || ''}
                    onChange={(e) => handelOnChangeDiscoundReundData(e)}
                    label="Search"
                  // showLabel={true}
                  />

                </div>
              )
            }

            {
              discountRefundData?.selectType !== 0 && (
                <div className="flex gap-[0.25rem]">
                  <div className="relative flex-1">

                    <CustomeNormalButton activeTheme={activeTheme} text={'Search'}

                      onClick={onSubmitRefundData}

                    />
                  </div>

                  <div className="relative flex-1">
                    <CustomeNormalButton activeTheme={activeTheme} text={'Reset'}
                      onClick={(e) => {
                        e.preventDefault(); // Optional, but good practice
                        setDiscountRefundData((prevData) => ({ ...prevData, selectType: 0 }));
                      }}
                    />
                  </div>
                </div>
              )
            }



          </div>
        </form>
      </div>


      {/* grid data */}
      <div>

        {

          allRefundsData?.loading ?
            <div className="w-full flex justify-center items-center">
              <CustomLoadingPage />
            </div>
            :

            discountRefundData?.selectType === 1 && (
              <>
                <GridDataDetails gridDataDetails={'Refund Details'} />
                <CustomDynamicTable activeTheme={activeTheme} columns={refundHeaderData}>

                  <tbody >
                    {
                      allRefundsData?.data?.data?.map((data, index) => (
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

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.bookingDate}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.workOrderId}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.patientName}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.age}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.investigationName}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.mobileNo}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.centrecode}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.netAmount}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.status}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
                            <div className="w-64">
                              <form autoComplete="off">
                                <CustomTextBox
                                  type="charNumberWithSpace"
                                  name="barCode"
                                  maxLength={50}
                                  value={
                                    barcodeData.find((item) => item.testId === data?.testid)?.reason || "" // Get the value if exists
                                  }
                                  onChange={(e) => handleInputChangeForPopUpGridData(data?.testid, e.target.value)}
                                  placeholder=" "
                                  label="Barcode"
                                  showLabel="false"
                                  isDisabled={data?.isSampleCollected === "Y"}
                                />

                              </form>
                            </div>
                          </td>


                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            <div className={`w-5 h-5 flex justify-center items-center rounded-sm 
                          ${data?.isSampleCollected === 'Y' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                              style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
                              onClick={() => saveRefundsData(data?.testid)}
                            >
                              {
                                isButtonClick === (data?.testid * 10) ?
                                  <FaSpinner className="animate-spin w-4 h-4" />
                                  :
                                  <MdAssignmentReturn className="w-4 h-4" />
                              }

                            </div>
                          </td>

                        </tr>
                      ))
                    }
                  </tbody>
                </CustomDynamicTable>
              </>

            )
        }

        {

          allDiscountData?.loading ?
            <div className="w-full flex justify-center items-center">
              <CustomLoadingPage />
            </div>
            :
            discountRefundData?.selectType === 2 && (
              <>

                <GridDataDetails gridDataDetails={'Discount Details'} />


                <CustomDynamicTable activeTheme={activeTheme} columns={disountHeaderData}>
                  <tbody >
                    {
                      allDiscountData?.data?.data?.map((data, index) => (
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

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>

                            {data?.patientId}

                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>

                            {data?.patientName}

                          </td>


                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>

                            {data?.companyName}

                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>

                            {data?.paidAmount}

                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.grossAmount}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.discount}
                          </td>

                          <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                            {data?.netAmount}
                          </td>
                        </tr>

                      ))
                    }
                  </tbody>
                </CustomDynamicTable>

                {
                  allDiscountData?.data?.length !== 0 && (
                    <form autoComplete="off" onSubmit={saveDiscountData}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2 items-center">

                        <div className="relative flex-1">
                          <CustomDropdown
                            name="discountType"
                            label="Discount Type"
                            value={discountTypeData?.discountType}
                            options={[
                              { label: 'Discount Type', value: 0, disabled: true },
                              ...allDicountTypeData?.data?.map(item => ({
                                label: item.type,
                                value: parseInt(item.id),
                              })),
                            ]}
                            onChange={(e) => handelOnChangeForDiscountType(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                          // isMandatory={discountTypeDataError?.discountType}
                          />
                        </div>


                        <div className="relative flex-1">
                          <CustomTextBox
                            type="decimalpositive"
                            name="discountPercentage"
                            value={discountTypeData?.discountPercentage || ''}
                            onChange={(e) => handelOnChangeForDiscountType(e)}
                            label="Discount %"
                          // readOnly={discountTypeData?.cashAmt || discountTypeData?.creditCardAmt || discountTypeData?.onlinewalletAmt}
                          // isMandatory={discountTypeDataError.discountPercentage}
                          />
                        </div>

                        <div className="relative flex-1">
                          <CustomTextBox
                            type="decimalpositive"
                            name="discountAmmount"
                            value={discountTypeData?.discountAmmount || ''}
                            onChange={(e) => handelOnChangeForDiscountType(e)}
                            label="Discount Ammount"
                          // readOnly={discountTypeData?.cashAmt || discountTypeData?.creditCardAmt || discountTypeData?.onlinewalletAmt}
                          // isMandatory={discountTypeDataError.discountAmmount}
                          />
                        </div>


                        <div className="relative flex-1">
                          <CustomDropdown
                            name="discountReason"
                            label="Discount Reason"
                            value={discountTypeData?.discountReason}
                            options={[
                              { label: 'Select Discount Reason', value: 0, disabled: true },
                              ...allDiscountReasonData?.data?.map(item => ({
                                label: item.discountReasonName,
                                value: item.id,
                              })),
                            ]}
                            onChange={(e) => handelOnChangeForDiscountType(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                          // isMandatory={discountTypeDataError?.discountid}
                          />
                        </div>


                        <div className="relative flex-1">
                          <CustomDropdown
                            name="discountApprovedBy"
                            label="Discount Approved By"
                            value={discountTypeData?.discountApprovedBy}
                            options={[
                              { label: 'Select Discount Approved By', value: 0, disabled: true },
                              ...allDiscountApprovedBy?.data?.map(item => ({
                                label: `${item?.fName} ${item?.lName}`,
                                value: item.empId,
                              })),
                            ]}
                            onChange={(e) => handelOnChangeForDiscountType(e)}
                            defaultIndex={0}
                            activeTheme={activeTheme}
                          // isMandatory={discountTypeDataError?.discountApproved}
                          />
                        </div>



                        <div className="flex gap-[0.25rem]">
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
                  )
                }

              </>
            )
        }

      </div>
    </div>
  );
}
