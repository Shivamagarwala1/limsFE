import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import { FaRegEdit } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import MultiSelectDropdown from "../../../../Custom Components/MultiSelectDropdown";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import {
  addRandomObjectId,
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";

export default function RateList() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  const { fetchData, response, data, loading } = useGetData();
  const lsData = getLocal("imarsar_laboratory");
  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState("");
  const [CenterDropDown, setCenterDropDown] = useState(false);
  const [CenterHoveIndex, setCenterHoveIndex] = useState(null);
  const [CenterSelectedOption, setCenterSelectedOption] = useState("");

  const [isButtonClick, setIsButtonClick] = useState(0);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCenter, setSelectedCenter] = useState([]);
  const [FileData, setFileData] = useState({ fileName: "" });
  const [PaymentMode, setPaymentMode] = useState(1);
  const [Row, setRow] = useState([]);
  const AllCenterData = useGetData();
  const GridData = useGetData();

  useEffect(() => {
    AllCenterData?.fetchData(
      `/rateTypeWiseRateList/GetRateType?employeeId=${lsData?.user?.employeeId}`
    );
  }, []);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 100 },
    {
      field: `itemName`,
      headerName: `Item Name`,
      flex: 1,
    },
    {
      field: `mrp`,
      headerName: `MRP`,
      flex: 1,
    },
    {
      field: `rate`,
      headerName: `Rate`,
      flex: 1,
    },
  ];

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setCenterValue(e.target.value);
    setCenterDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setCenterValue(name);
    setCenterId(id);
    setCenterSelectedOption(name);
    setCenterDropDown(false);
  };

  const handleSubmit = async () => {
    if (!CenterId) {
      toast.error("Rate List is Required");
      return;
    }

    const res = await GridData?.fetchData(
      `/CentrePayment/GetRateList?ratetypeID=${CenterId}`
    );

    // Ensure that the latest GridData.data is used after fetchData
    setTimeout(() => {
      setRow(addRandomObjectId(res?.data?.data));
    }, 10);
  };

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
        <div>Rate List</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <SearchBarDropdown
            id="search-bar"
            name="Center"
            value={CenterValue}
            onChange={handleSearchChange2}
            label="Rate List"
            placeholder="Serch Rate List"
            options={AllCenterData?.data?.data}
            isRequired={false}
            showSearchBarDropDown={CenterDropDown}
            setShowSearchBarDropDown={setCenterDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setCenterHoveIndex}
            isHovered={CenterHoveIndex}
            style={{ marginTop: "0.1rem" }}
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
              {
                label: "Export PDF",
                submit: false,
                callBack: () => {
                  if (!CenterId) {
                    toast.error("Rate List is Required");
                    return;
                  }
                  ViewOrDownloandPDF(
                    `/CentrePayment/GetRateListPdf?ratetypeID=${CenterId}`
                  );
                },
              },
            ]}
          />
        </div>
      </form>
      <UpdatedDynamicTable
        rows={Row}
        name="Rate List Details"
        loading={GridData?.loading}
        columns={columns}
        viewKey="Random"
      />
    </div>
  );
}
