import React, { useEffect, useState } from "react";
import { UpdatedDynamicTable } from "../../../../Custom Components/DynamicTable";
import InputGenerator, {
  TwoSubmitButton,
} from "../../../../Custom Components/InputGenerator";
import { ImSwitch } from "react-icons/im";
import { useFormHandler } from "../../../../Custom Components/useFormHandler";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import { addRandomObjectId } from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { getLocal } from "usehoks";
import { FaRegEdit } from "react-icons/fa";
import PopupModal from "../../../../Custom Components/PopupModal";

// Main Component
export default function StoreItemMaster() {
  const lsData = getLocal("imarsar_laboratory");
  const { formRef, getValues, setValues } = useFormHandler();

  const [Min, setMin] = useState("");
  const [Max, setMax] = useState("");
  const [IsEdit, setIsEdit] = useState(true);
  const [ClickedRow, setClickedRow] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  // ------------------ Category -------------------------------
  const [CategoryId, setCategoryId] = useState(null);
  const [CategoryValue, setCategoryValue] = useState("");
  const [CategoryDropDown, setCategoryDropDown] = useState(false);
  const [CategoryHoveIndex, setCategoryHoveIndex] = useState(null);
  const [CategorySelectedOption, setCategorySelectedOption] = useState("");

  const [row, setRow] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();
  const UpdateData = usePostData();
  useEffect(() => {
    getData?.fetchData("/itemMasterStore");
    // console.log(CategoryData);
  }, [PostData?.loading, UpdateData?.loading]);
  useEffect(() => {
    if (getData?.data) {
      setRow(addRandomObjectId(getData?.data));
    }
  }, [getData?.data]);
  // console.log(getData?.data)
  // Columns for the table
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "minQuantity", headerName: "Min Quantity", flex: 1 },
    { field: "maxQuantity", headerName: "Max Quantity", flex: 1 },
    {
      field: "",
      width: 200,
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="w-4 h-4 flex justify-center items-center">
              <FaRegEdit
                className={`w-full h-full ${
                  params?.row?.isActive === 1
                    ? "text-blue-500 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  const category = params?.row?.category;
                  setClickedRow(params?.row);
                  setIsEdit(false);
                  setCategoryValue(category === 1 ? "Medical" : "General");
                  setCategoryId(category || 0);
                  setMin(params?.row?.minQuantity);
                  setMax(params?.row?.maxQuantity);
                  setValues([
                    {
                      ItemName: params?.row?.itemName,
                    },
                  ]);
                }}
              />
            </button>

            <button
              className={`w-4 h-4 flex justify-center items-center ${
                params?.row?.isActive === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              <ImSwitch
                className="w-full h-full"
                onClick={() => {
                  setClickedRow(params?.row);
                  setShowPopup(true);
                }}
              />
            </button>
          </div>
        );
      },
    },
  ];

  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setCategoryValue(e.target.value);
    setCategoryDropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setCategoryValue(name);
    setCategoryId(id);
    setCategorySelectedOption(name);
    setCategoryDropDown(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = getValues();
    console.log(values);
    const payload = IsEdit
      ? {
          isActive: 1,
          createdById: parseInt(lsData?.user?.employeeId),
          createdDateTime: new Date().toISOString(),
          itemId: 0,
          itemName: values?.ItemName,
          category: CategoryId,
          minQuantity: values?.minQuantity,
          maxQuantity: values?.maxQuantity,
        }
      : {
          isActive: ClickedRow?.isActive,
          updateById: parseInt(lsData?.user?.employeeId),
          updateDateTime: new Date().toISOString(),
          itemId: ClickedRow?.itemId,
          itemName: values?.ItemName,
          category: CategoryId,
          minQuantity: values?.minQuantity,
          maxQuantity: values?.maxQuantity,
        };

    try {
      const res = await PostData?.postRequest(
        `itemMasterStore/SaveUpdateItemStore`,
        payload
      );
      if (res?.success) {
        toast?.success(res?.message);
        setCategoryValue("");
        setCategoryId("");
        setMin("");
        setMax("");
        setValues([
          {
            ItemName: "",
          },
        ]);
      } else {
        toast?.error(res?.message);
      }
    } catch (error) {
      toast?.error(res?.message);
    }
  };

  const handleTheUpdateStatusMenu = async () => {
    const res = await UpdateData?.postRequest(
      `/itemMasterStore/UpdateItemStatus?id=${ClickedRow?.itemId}&status=${
        ClickedRow?.isActive == 1 ? 0 : 1
      }&userId=${lsData?.user?.employeeId}`
    );
    if (res?.success) {
      toast.success(res?.message);
      setShowPopup(false);
    } else {
      toast.success(res?.message);
    }
  };
  return (
    <>
      <PopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        handleTheUpdateStatusMenu={handleTheUpdateStatusMenu}
        isButtonClick={IsEdit ? 1 : 0}
        message="Are you sure you want to proceed with the action?"
        cancelText="Cancel"
        confirmText="Yes"
      />
      <div>
        <FormHeader title="Store Item Master" />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
            <InputGenerator
              inputFields={[
                {
                  label: "Item Name",
                  type: "text",
                  name: "ItemName",
                },
              ]}
            />
            <SearchBarDropdown
              id="search-bar"
              name="Category"
              value={CategoryValue}
              onChange={handleSearchChange2}
              label="Category"
              placeholder="Serch Category"
              options={[
                { id: 1, data: "Medical" },
                { id: 2, data: "General" },
              ]}
              isRequired={false}
              showSearchBarDropDown={CategoryDropDown}
              setShowSearchBarDropDown={setCategoryDropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setCategoryHoveIndex}
              isHovered={CategoryHoveIndex}
              style={{ marginTop: "0.1rem" }}
            />
            <InputGenerator
              inputFields={[
                {
                  label: "Min",
                  value: Min,
                  type: "number",
                  onChange: (e, numericRegex) => {
                    setMin(numericRegex);
                  },
                  name: "minQuantity",
                },
              ]}
            />
            <InputGenerator
              inputFields={[
                {
                  label: "Max",
                  value: Max,
                  type: "number",
                  onChange: (e, numericRegex) => {
                    setMax(numericRegex);
                  },
                  name: "maxQuantity",
                },
              ]}
            />

            <TwoSubmitButton
              options={[
                {
                  label: "Save",
                  submit: true,
                },
              ]}
            />
          </div>
        </form>
        <div style={{ height: "300px" }}>
          <UpdatedDynamicTable
            rows={row}
            name="Store Item's Details"
            loading={getData?.loading}
            columns={columns}
            viewKey="Random"
          />
        </div>
      </div>
    </>
  );
}
