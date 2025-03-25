import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGenerator, {
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { getLocal } from "usehoks";
import {
  StyledHr,
  UpdatedDynamicTable,
} from "../../../../Custom Components/DynamicTable";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { addRandomObjectId } from "../../../../service/RedendentData";
import { PopupModal } from "../../../../Custom Components/NewPopups";

export default function TransferRatelist() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { formRef, getValues, setValues } = useFormHandler();

  const PostData = usePostData();
  // ------------------ FromRate -------------------------------
  const [FromRateId, setFromRateId] = useState(null);
  const [FromRateValue, setFromRateValue] = useState("");
  const [FromRateDropDown, setFromRateDropDown] = useState(false);
  const [FromRateHoveIndex, setFromRateHoveIndex] = useState(null);
  const [FromRateSelectedOption, setFromRateSelectedOption] = useState("");
  // ------------------ ToRate -------------------------------
  const [ToRateId, setToRateId] = useState(null);
  const [ToRateValue, setToRateValue] = useState("");
  const [ToRateDropDown, setToRateDropDown] = useState(false);
  const [ToRateHoveIndex, setToRateHoveIndex] = useState(null);
  const [ToRateSelectedOption, setToRateSelectedOption] = useState("");
  // ------------------ PlusMinus -------------------------------
  const [PlusMinusId, setPlusMinusId] = useState(null);
  const [PlusMinusValue, setPlusMinusValue] = useState("");
  const [PlusMinusDropDown, setPlusMinusDropDown] = useState(false);
  const [PlusMinusHoveIndex, setPlusMinusHoveIndex] = useState(null);
  const [PlusMinusSelectedOption, setPlusMinusSelectedOption] = useState("");

  const [PlusMinus, setPlusMinus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [Row, setRow] = useState([]);
  const AllFromRateData = useGetData();
  const GridData = useGetData();

  useEffect(() => {
    AllFromRateData?.fetchData(
      `/rateTypeMaster?Select=id,rateName&$filter=(isactive eq 1) `
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
  const handleSearchChange = (e) => {
    setPlusMinusValue(e.target.value);
    setPlusMinusDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick = (name, id) => {
    setPlusMinusValue(name);
    setPlusMinusId(id);
    setPlusMinusSelectedOption(name);
    setPlusMinusDropDown(false);
  };

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setFromRateValue(e.target.value);
    setFromRateDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    if (ToRateId == id) {
      toast.error("From Rate & To Date Should be Diffrent");
    } else {
      setFromRateValue(name);
      setFromRateId(id);
      setFromRateSelectedOption(name);
      setFromRateDropDown(false);
    }
  };
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setToRateValue(e.target.value);
    setToRateDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection To the dropdown
  const handleOptionClick1 = (name, id) => {
    if (FromRateId == id) {
      toast.error("From Rate & To Date Should be Diffrent");
    } else {
      setToRateValue(name);
      setToRateId(id);
      setToRateSelectedOption(name);
      setToRateDropDown(false);
    }
  };
  const handleSubmit = async () => {
    if (!FromRateId) {
      toast.error("Rate List is Required");
      return;
    }

    const res = await GridData?.fetchData(
      `/CentrePayment/GetRateList?ratetypeID=${FromRateId}`
    );

    // Ensure that the latest GridData.data is used after fetchData
    setTimeout(() => {
      setRow(addRandomObjectId(res?.data?.data));
    }, 10);
  };

  const handleTheUpdateStatusMenu = async () => {
    if (!FromRateId) {
      toast.error("From Rate is Required");
      return;
    }
    if (!ToRateId) {
      toast.error("To Rate is Required");
      return;
    }
    if (!PlusMinusValue) {
      toast.error("Plus Minus is Required");
      return;
    }
    if (!PlusMinus) {
      toast.error(`${PlusMinusValue} % is Required`);
      return;
    }
    const res = await PostData?.postRequest(
      `/CentrePayment/TransferRateToRate?FromRatetypeid=${FromRateId}&ToRatetypeid=${ToRateId}&type=${PlusMinusValue}&Percentage=${PlusMinus}`
    );
    if (res?.success) {
      toast?.success(res?.message);
      setShowPopup(false);
    } else {
      toast?.error(res?.message);
    }
    console.log(res);
  };

  return (
    <div>
      <PopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        activeTheme={activeTheme}
        handleTheUpdateStatusMenu={handleTheUpdateStatusMenu}
        message={`Do you want to transfer rate from  ${FromRateValue} to ${ToRateValue}`}
        cancelText="Cancel"
        confirmText="Yes"
      />
      {/* Header Section */}
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
        style={{ background: activeTheme?.blockColor }}
      >
        <div>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </div>
        <div>Transfer Rate List</div>
      </div>

      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
          <SearchBarDropdown
            id="search-bar"
            name="FromRate"
            value={FromRateValue}
            onChange={handleSearchChange2}
            label="From Rate"
            placeholder="Serch From Rate"
            options={AllFromRateData?.data}
            isRequired={false}
            showSearchBarDropDown={FromRateDropDown}
            setShowSearchBarDropDown={setFromRateDropDown}
            handleOptionClickForCentre={handleOptionClick2}
            setIsHovered={setFromRateHoveIndex}
            isHovered={FromRateHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <SearchBarDropdown
            id="search-bar"
            name="ToRate"
            value={ToRateValue}
            onChange={handleSearchChange1}
            label="To Rate"
            placeholder="Serch To Rate"
            options={AllFromRateData?.data}
            isRequired={false}
            showSearchBarDropDown={ToRateDropDown}
            setShowSearchBarDropDown={setToRateDropDown}
            handleOptionClickForCentre={handleOptionClick1}
            setIsHovered={setToRateHoveIndex}
            isHovered={ToRateHoveIndex}
            style={{ marginTop: "0.1rem" }}
          />
          <div style={{display:"flex"}} className="relative flex-1 flex-row gap-2">
            <SearchBarDropdown
              id="search-bar"
              name="PlusMinus"
              value={PlusMinusValue}
              onChange={handleSearchChange}
              label="Plus Minus"
              placeholder="Serch Plus Minus"
              options={[{ data: "Plus" }, { data: "Minus" }]}
              isRequired={false}
              showSearchBarDropDown={PlusMinusDropDown}
              setShowSearchBarDropDown={setPlusMinusDropDown}
              handleOptionClickForCentre={handleOptionClick}
              setIsHovered={setPlusMinusHoveIndex}
              isHovered={PlusMinusHoveIndex}
              style={{ marginTop: "0.1rem" }}
            />
            {PlusMinusValue != "" && (
              <InputGenerator
                inputFields={[
                  {
                    label: `${PlusMinusValue} %`,
                    type: "text",
                    name: `plusMinus`,
                    onChange: (e) => {
                      setPlusMinus(e);
                    },
                  },
                ]}
              />
            )}
          </div>
          <TwoSubmitButton
            options={[
              {
                label: "Transfer",
                submit: false,
                callBack: () => {
                  if (!FromRateId) {
                    toast.error("From Rate is Required");
                    return;
                  }
                  if (!ToRateId) {
                    toast.error("To Rate is Required");
                    return;
                  }
                  if (!PlusMinusValue) {
                    toast.error("Plus Minus is Required");
                    return;
                  }
                  if (!PlusMinus) {
                    toast.error(`${PlusMinusValue} % is Required`);
                    return;
                  }
                  setShowPopup(true);
                },
              },
            ]}
          />
        </div>
      </form>
      <StyledHr />
      {/* <UpdatedDynamicTable
        rows={Row}
        name="Transfer Rate List Details"
        loading={GridData?.loading}
        columns={columns}
        viewKey="Random"
      /> */}
    </div>
  );
}
