
import React, { useEffect, useState } from "react";
import DynamicTable, {
  TableHeader,
} from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import "./ReportDispatch.css";
import { MdPadding } from "react-icons/md";
import FormHeader from '../../../global/FormHeader'
import { toast } from "react-toastify";
import CustomDropdown from "../../../global/CustomDropdown";
import { CustomTextBox } from "../../../global/CustomTextBox";
import CustomNormalFormButton from "../../../global/CustomNormalFormButton";
import CustomeNormalButton from "../../../global/CustomeNormalButton";
import GridDataDetails from "../../../global/GridDataDetails";
import CustomDynamicTable from "../../../global/CustomDynamicTable";
import { disountHeaderData, refundHeaderData } from "../../../listData/listData";
import CustomFormButtonWithLoading from "../../../global/CustomFormButtonWithLoading";
import { FaSpinner } from "react-icons/fa";
import { getAllDisCountType, useRetrieveData } from "../../../../service/service";
import CustomLoadingPage from "../../../global/CustomLoadingPage";
import { MdAssignmentReturn } from "react-icons/md";

export default function DiscountRefund() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();
  const [type, setType] = useState(0);

  useEffect(() => {
    const toastId = toast.info("Please Select a Type");
    return () => {
      toast.dismiss(toastId); // Dismiss the toast when the component unmounts
    };
  }, []);

  const columns = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `BookingDate`,
      headerName: `Booking Date`,
      flex: 1,
    },
    {
      field: `PatientId`,
      headerName: `Patient Id`,
      flex: 1,
    },
    {
      field: `PatientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `AgeGender`,
      headerName: `Age/Gender`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `MobileNo`,
      headerName: `Mobile No.`,
      flex: 1,
    },
    {
      field: `Centre`,
      headerName: `Centre`,
      flex: 1,
    },
    {
      field: `NetAmount`,
      headerName: `Net. Amount`,
      flex: 1,
    },
    {
      field: `Status`,
      headerName: `Status`,
      flex: 1,
    },
    {
      headerName: `Remark`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <InputGenerator
              inputFields={[
                {
                  type: "text",
                  placeholder: "Remark",
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      headerName: `Refund`,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
            <SubmitButton
              submit={false}
              text="Refund"
              style={{ width: "50px" }}
            />
          </div>
        );
      },
    },
  ];
  const columns1 = [
    { field: "id", headerName: "Sr. No", width: 20 },
    {
      field: `PatientId`,
      headerName: `Patient Id`,
      flex: 1,
    },
    {
      field: `PatientName`,
      headerName: `Patient Name`,
      flex: 1,
    },
    {
      field: `TestName`,
      headerName: `Test Name`,
      flex: 1,
    },
    {
      field: `MRP`,
      headerName: `MRP`,
      flex: 1,
    },
    {
      field: `GrossAmount`,
      headerName: `Gross Amount`,
      flex: 1,
    },
    {
      field: `Discount`,
      headerName: `Discount`,
      flex: 1,
    },
    {
      field: `NetAmount`,
      headerName: `Net. Amount`,
      flex: 1,
    },
    // {
    //   headerName: `Remark`,
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
    //         <InputGenerator
    //           inputFields={[
    //             {
    //               type: "text",
    //               placeholder: "Remark",
    //             },
    //           ]}
    //         />
    //       </div>
    //     );
    //   },
    // },
    // {
    //   headerName: `Refund`,
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
    //        <SubmitButton submit={false} text='Refund' style={{width:"50px"}} />
    //       </div>
    //     );
    //   },
    // }
  ];
  const row = [
    {
      id: 1,
      PatientId: "302",
      PatientName: "John Doe",
      TestName: "CBC",
      Centre: "Ayodhya",
      AgeGender: "23/male",
      BookingDate: "11-Feb-2025",
      MobileNo: "123456",
      NetAmount: "5000",
      Status: "Booked",
      GrossAmount: "7500",
      Discount: "2500",
      MRP: "10000",
      SampleType: "Blood",
    },
  ];

  const handleSubmit = () => { };

  //!============anil code=========
  const [discountRefundData, setDiscountRefundData] = useState({
    selectType: 0,
    visitId: '',
    discountSearchValue: ''
  })

  const [discountTypeData, setDiscountTypeData] = useState({
    discountApprovedBy: '',
    discountReason: '',
    discountType: '',
    discountAmmount: '',
    discountPer: '',
    discountAmmount: '',
    discountPercentage: ''
  })

  const allRefundsData = useRetrieveData();
  const allDiscountData = useRetrieveData();
  const allDiscountApprovedBy = useRetrieveData();
  const allDiscountReasonData = useRetrieveData();
  const allDicountTypeData = useRetrieveData();
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
        await allDiscountData.fetchDataFromApi(`/tnx_Booking/patientDataDiscount?workorderId=${discountRefundData?.discountSearchValue}`)
      } catch (error) {
        toast.error(error?.message);
      }
    }

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
    setDiscountTypeData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }


  return (
    <div>
      {/* <FormHeader title="Discount/Refund" /> */}
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          {type === 0 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Select Type",
                  type: "select",
                  name: "Select Type",
                  callBack: (e) => {
                    setType(e.target.value);
                  },
                  dataOptions: [
                    { id: 1, option: "Refund" },
                    { id: 2, option: "Discount" },
                  ],
                },
              ]}
            />
          )}
          {type == 1 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Visit Id",
                  type: "text",
                  name: "visitId",
                },
              ]}
            />
          )}
          {type == 2 && (
            <InputGenerator
              inputFields={[
                {
                  label: "Search",
                  type: "text",
                  name: "search",
                },
              ]}
            />
          )}
          {type !== 0 && (
            <>
              <SubmitButton text="Search" />
              <SubmitButton
                callBack={() => {
                  setType(0);
                }}
                submit={false}
                text="Reset"
              />
            </>
          )}
        </div>
      </form>
      {type === 0 && <TableHeader title="Discount/Refund Details" />}
      {type == 1 && (
        <div style={{ height: "300px" }}>
          <DynamicTable
            rows={row}
            name="Refund Details"
            //   loading={loading}
            columns={columns}
            activeTheme={activeTheme}
          />
        </div>
      )}
      {type == 2 && (
        <DynamicTable
          rows={row}
          name="Discount Details"
          //   loading={loading}
          columns={columns1}
          activeTheme={activeTheme}
        />
      )}
      {type == 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Discount Type",
                type: "select",
                name: "Discount Type",
                dataOptions: [],
              },
              {
                label: "Discount Reason",
                type: "select",
                name: "Discount Reason",
                dataOptions: [],
              },
              {
                label: "Discount Amount",
                type: "text",
                name: "Discount",
              },
              {
                label: "Discount %",
                type: "text",
                name: "DiscountPercent",
              },
              {
                label: "Discount Approved By",
                type: "select",
                name: "DiscountApprovedBy",
                dataOptions: [],
              },
            ]}
          />
          <SubmitButton text="Save" />
        </div>
      )}



      {/* ==============Anil Code=================== */}
      {/* Header data */}
      <div>
        <FormHeader headerData={'Discount or Refund'} />

        <form autoComplete="off" ref={formRef}>
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
        <GridDataDetails gridDataDetails={'Refund Details'} />
        {

          allRefundsData?.loading ?
            <div className="w-full flex justify-center items-center">
              <CustomLoadingPage />
            </div>
            :

            discountRefundData?.selectType === 1 && (

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
                          {data?.patientId}
                        </td>

                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                          {data?.patientName}
                        </td>

                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                          000000000
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

                          <div className="w-32">
                            <form autoComplete='off'>
                              <CustomTextBox
                                type="barcode"
                                name="barCode"
                                maxLength={12}
                                // value={barcodeValue || ""}

                                // readOnly={patientWiseBarcode}

                                // onChange={(e) => handleInputChangeForPopUpGridData(data?.itemId, e.target.value)}
                                placeholder=" "
                                label="Barcode"
                                showLabel='false'
                              />
                            </form>
                          </div>


                        </td>

                        <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor" style={{ width: '0%' }}>
                          <div className="w-5 h-5 flex justify-center items-center rounded-sm"
                            style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}

                          >
                            <MdAssignmentReturn className="w-4 h-4" />
                          </div>
                        </td>

                      </tr>
                    ))
                  }
                </tbody>
              </CustomDynamicTable>
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

                            0000000

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
                    <form autoComplete="off" ref={formRef}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2 items-center">

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

                        <div className="flex gap-[0.25rem]">
                          <div className="relative flex-1">
                            <CustomFormButtonWithLoading
                              activeTheme={activeTheme}
                              text="Save"
                              icon={FaSpinner}
                              // isButtonClick={isButtonClick}
                              loadingButtonNumber={3} // Unique number for the first button
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
