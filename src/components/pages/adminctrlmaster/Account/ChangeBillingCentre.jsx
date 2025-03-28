import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import toast from "react-hot-toast";
import { addRandomObjectId } from "../../../../service/RedendentData";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";

export default function ChangePayMode() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const lsData = getLocal("imarsar_laboratory");
  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();
  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState("");
  const [CenterValue, setCenterValue] = useState("");
  const [CenterDropDown, setCenterDropDown] = useState(false);
  const [CenterHoveIndex, setCenterHoveIndex] = useState(null);
  const [CenterSelectedOption, setCenterSelectedOption] = useState("");
  // ------------------ RateType -------------------------------
  const [RateTypeId, setRateTypeId] = useState("");
  const [RateTypeValue, setRateTypeValue] = useState("");
  const [RateTypeDropDown, setRateTypeDropDown] = useState(false);
  const [RateTypeHoveIndex, setRateTypeHoveIndex] = useState(null);
  const [RateTypeSelectedOption, setRateTypeSelectedOption] = useState("");

  const [Row, setRow] = useState([]);
  const [PymentDetails, setPymentDetails] = useState([]);
  const [Visitor, setVisitor] = useState("");
  const [PaymentMode, setPaymentMode] = useState(1);
  const [className, setClassName] = useState("");
  console.log(PymentDetails);

  const CenterData = useGetData();
  const NewRateData = useGetData();
  const RateTypeData = useGetData();
  useEffect(() => {
    CenterData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1 )"
    );
  }, []);
  useEffect(() => {
    RateTypeData?.fetchData(
      `/centreMaster/GetRatetypeCentreWise?CentreId=${CenterId}`
    );
    NewRateData?.fetchData(
      `/CentrePayment/GetWorkOrderNewRate?WorkOrderid=ims59&RatetypeId=${RateTypeId}`
    );
  }, [CenterId, RateTypeId]);

  useEffect(() => {
    if (activeTheme) {
      const style = document.createElement("style");
      style.innerHTML = `
        .gradientText {
          background: ${activeTheme.menuColor};
          -webkit-background-clip: text;
          color: transparent;
        }
      `;
      document.head.appendChild(style);
      setClassName("gradientText");
    }
  }, [activeTheme]);


  const columns = [
    { field: "Random", headerName: "Sr. No", width: 10 },
    {
      field: `ratetype`,
      headerName: `Rate Type`,
      flex: 1,
    },
    {
      field: `itemId`,
      headerName: `Item Id`,
      flex: 1,
    },
    {
      field: `investigationName`,
      headerName: `InvestigationName`,
      flex: 1,
    },
    {
      field: `rate`,
      headerName: `Old Rate`,
      flex: 1,
    },
    {
      field: `1`,
      headerName: `New Rate`,
      flex: 1,
      renderCell: (params) => {
        const data = NewRateData?.data?.data?.find(
          (item) => item?.itemId == params?.row?.itemId
        );
        return <>{data?.rate}</>;
      },
    },
  ];

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setCenterValue(e.target.value);
    setCenterId(null);
    setCenterDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setCenterValue(name);
    setCenterId(id);
    setCenterSelectedOption(name);
    setCenterDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setRateTypeValue(e.target.value);
    setRateTypeId(null);
    setRateTypeDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setRateTypeValue(name);
    setRateTypeId(id);
    setRateTypeSelectedOption(name);
    setRateTypeDropDown(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = getValues();
  };

  const getReason = async () => {
    if (!Visitor) {
      toast.error("Visitor is Required");
      return;
    }
    // if (!CenterId) {
    //   toast.error("Center is Required");
    //   return;
    // }
    // if (!RateTypeId) {
    //   toast.error("RateType is Required");
    //   return;
    // }
    const get = await fetchData(
      `/CentrePayment/GetWorkOrderdetailCentreChange?WorkOrderid=${Visitor}`
    );
    console.log(get?.data?.data?.patientdetail);
    if (get?.data?.success) {
      setRow(addRandomObjectId(get?.data?.data));
      // setPymentDetails(addRandomObjectId(get?.data?.data?.paymentdetail));
    }
  };

  const handleTheUpdateStatusMenu = async () => {
    if (!Visitor) {
      toast.error("Visitor is Required");
      return;
    }
    if (!CenterId) {
      toast.error("Center is Required");
      return;
    }
    if (!RateTypeId) {
      toast.error("RateType is Required");
      return;
    }

    const data1 = await PostData?.postRequest(
      `/CentrePayment/ChangeBillingCentre?WorkOrderId=${Visitor}&Centre=${CenterId}&RateType=${RateTypeId}`
    );

    console.log(data1);

    if (data1?.success) {
      toast.success(data1?.message);
      getReason();
    }
  };
  console.log(Row);
  return (
    <div>
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Change Billing Center</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-2  mx-1 lg:mx-2">
          <InputGenerator
            inputFields={[
              {
                label: "Visitor Id",
                type: "text",
                name: "Visitor Id",
                onChange: (e) => {
                  setVisitor(e);
                },
              },
            ]}
          />
          <SearchBarDropdown
            id="search-bar"
            name="Center"
            value={CenterValue}
            onChange={handleSearchChange2}
            label="Center"
            placeholder="Serch Center"
            options={CenterData?.data}
            isRequired={false}
            showSearchBarDropDown={CenterDropDown}
            setShowSearchBarDropDown={setCenterDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setCenterHoveIndex}
            isHovered={CenterHoveIndex}
            style={{
              marginTop: "2px",
            }}
          />
          <SearchBarDropdown
            id="search-bar"
            name="RateType"
            value={RateTypeValue}
            onChange={handleSearchChange1}
            label="RateType"
            placeholder="Serch RateType"
            options={RateTypeData?.data?.data}
            isRequired={false}
            showSearchBarDropDown={RateTypeDropDown}
            setShowSearchBarDropDown={setRateTypeDropDown}
            handleOptionClickForCentre={handleOptionClick1}
            setIsHovered={setRateTypeHoveIndex}
            isHovered={RateTypeHoveIndex}
            style={{
              marginTop: "2px",
            }}
          />
          <TwoSubmitButton
            options={[
              {
                label: "Search",
                submit: false,
                style: { marginTop: "0px" },
                callBack: () => {
                  getReason();
                },
              },
              {
                label: "Save",
                submit: false,
                style: { marginTop: "0px" },
                callBack: () => {
                  handleTheUpdateStatusMenu();
                },
              },
            ]}
          />
        </div>
      </form>
      {Row.length > 0 && (
        <>
          <div
            className="w-full h-[0.06rem]"
            style={{ background: activeTheme?.menuColor }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <div className="grid rounded-md grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2  mt-2 mb-1  mx-1 lg:mx-2">
              <div className={`relative flex-1 `}>
                <span className={className}>
                  <b>Name</b>
                </span>
                : {Row[0]?.title} {Row[0]?.name}
              </div>
              <div className="relative flex-1">
                <span className={className}>
                  <b>Age</b>
                </span>{" "}
                : {Row[0]?.age},{Row[0]?.gender}
              </div>

              <div className="relative flex-1">
                <span className={className}>
                  <b>Mobile No.</b>
                </span>{" "}
                : {Row[0]?.mobileNo || ""}
              </div>
            </div>
            <div className="relative flex-1">
              <span className={className}>
                <b>Booking Centre</b>
              </span>{" "}
              : {Row[0]?.centre}
            </div>
          </div>
        </>
      )}
      <UpdatedDynamicTable
        rows={Row}
        name="Billing Center Details"
        loading={loading}
        columns={columns}
        viewKey="Random"
      />
    </div>
  );
}
