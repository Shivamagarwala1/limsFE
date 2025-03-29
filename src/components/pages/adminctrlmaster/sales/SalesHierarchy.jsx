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
import { useGetData, usePostData } from "../../../../service/apiService";
import { FormHeader } from "../../../../Custom Components/FormGenerator";
import {
  addObjectId,
  addRandomObjectId,
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import { SalesHierarchyPopupModal } from "../../../../Custom Components/NewPopups";

// Main Component
export default function SalesHierarchy() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  const [DesignationId, setDesignationId] = useState("");
  const [DesignationValue, setDesignationValue] = useState("");
  const [DesignationDropDown, setDesignationDropDown] = useState(false);
  const [DesignationHoverIndex, setDesignationHoverIndex] = useState(null);
  const [DesignationSelectedOption, setDesignationSelectedOption] =
    useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [Params, setParams] = useState({});
  const [row, setRow] = useState([]);
  const getData = useGetData();
  const DesignationData = useGetData();
  const PostData = usePostData();

  useEffect(() => {
    DesignationData?.fetchData(
      `/designationMaster?select= id,designationname&$filter=(id lt 6 or (id gt 9 and id lt 13))`
    );
    if (getData?.data) {
      setRow(addRandomObjectId(getData.data));
    }
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
    setDesignationId(id);
    setDesignationValue(name);
    setDesignationSelectedOption(name);
    setDesignationDropDown(false);
  };
  // Handle form submission
  const handleSubmit = async () => {
    await getData?.fetchData(
      `/empmaster?select=empid,fname,lname&$filter=(designationId eq ${DesignationId} and isactive eq 1)`
    );
  };

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
      <SalesHierarchyPopupModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        Params={Params}
        EmployeeData={row}
      />
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
      <StyledHr />
      <div className="w-full md:w-1/2 h-[300px]">
        <UpdatedDynamicTable
          rows={row}
          name="Sales Hierarchy Details"
          loading={getData?.loading}
          columns={columns}
          viewKey="Random"
          showHr={false}
        />
      </div>
    </div>
  );
}
