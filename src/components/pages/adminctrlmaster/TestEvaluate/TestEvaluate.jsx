import React, { useEffect, useState } from "react";
import DynamicTable, {
  StyledHr,
  TableHeader,
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
  ViewOrDownloandPDF,
} from "../../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../../Custom Components/SearchBarDropdown";
import {
  UploadAgreementPopupModal,
  UploadCertificatePopupModal,
} from "../../../../Custom Components/NewPopups";
import axios from "axios";
import { getLocal } from "usehoks";

// Main Component
export default function TestEvaluate() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  const [VisitorId, setVisitorId] = useState("");
  const [UpdatedBarcode, setUpdatedBarcode] = useState([]);

  const [Indicator, setIndicator] = useState(false);
  const [ShowPopup, setShowPopup] = useState(false);
  const [ShowPopup1, setShowPopup1] = useState(false);
  // ------------------ Test1 -------------------------------
  const [Test1Id, setTest1Id] = useState(null);
  const [Test1Value, setTest1Value] = useState("");
  const [Test1DropDown, setTest1DropDown] = useState(false);
  const [Test1HoveIndex, setTest1HoveIndex] = useState(null);
  const [Test1SelectedOption, setTest1SelectedOption] = useState("");
  // ------------------ Test2 -------------------------------
  const [Test2Id, setTest2Id] = useState(null);
  const [Test2Value, setTest2Value] = useState("");
  const [Test2DropDown, setTest2DropDown] = useState(false);
  const [Test2HoveIndex, setTest2HoveIndex] = useState(null);
  const [Test2SelectedOption, setTest2SelectedOption] = useState("");
  // ------------------ Test3 -------------------------------
  const [Test3Id, setTest3Id] = useState(null);
  const [Test3Value, setTest3Value] = useState("");
  const [Test3DropDown, setTest3DropDown] = useState(false);
  const [Test3HoveIndex, setTest3HoveIndex] = useState(null);
  const [Test3SelectedOption, setTest3SelectedOption] = useState("");

  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);
  const [isHoveredTable2, setIsHoveredTable2] = useState(null);
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();
  const AllTestData = useGetData();
  const GridData = useGetData();
  useEffect(() => {
    AllTestData?.fetchData(
      "/itemMaster?Select=itemId,itemName&$filter=(itemType eq 3)"
    );
    // console.log(AllTestData);
  }, []);

  // Columns for the table
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 5 },
    // { field: "itemId", headerName: "Item Id", flex: 1 },
    { field: "testName", headerName: "Test Name", flex: 1 },
    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            {params?.row?.Random == 1 && <div>{params?.row?.rate}</div>}
          </div>
        );
      },
    },
  ];

  const handleSearch = async () => {
    if (!Test1Id) {
      toast.error("Test 1 is Required");
      return;
    }
    if (!Test2Id) {
      toast.error("Test 2 is Required");
      return;
    }
    if (!Test3Id) {
      toast.error("Test 3 is Required");
      return;
    }
    await GridData?.fetchData(
      `/itemMaster/EvaluateTest?itemid1=${Test1Id}&itemid2=${Test2Id}&itemid3=${Test3Id}`
    );
  };
  useEffect(() => {
    const AddRandom = () => {
      if (GridData?.data?.data) {
        const row1Data = addRandomObjectId(GridData?.data?.data?.item1);
        const row2Data = addRandomObjectId(GridData?.data?.data?.item2);
        const row3Data = addRandomObjectId(GridData?.data?.data?.item3);
        setRow1(row1Data);
        setRow2(row2Data);
        setRow3(row3Data);
      }
    };
    AddRandom();
  }, [GridData?.data?.data]);
  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setTest2Value(e.target.value);
    setTest2DropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick2 = (name, id) => {
    setTest2Value(name);
    setTest2Id(id);
    setTest2SelectedOption(name);
    setTest2DropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setTest1Value(e.target.value);
    setTest1DropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick1 = (name, id) => {
    setTest1Value(name);
    setTest1Id(id);
    setTest1SelectedOption(name);
    setTest1DropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setTest3Value(e.target.value);
    setTest3DropDown(true); // Show dropdown when typing
  };

  // Function to handle selection from the dropdown
  const handleOptionClick3 = (name, id) => {
    setTest3Value(name);
    setTest3Id(id);
    setTest3SelectedOption(name);
    setTest3DropDown(false);
  };
  return (
    <>
      <div>
        <FormHeader title="Test Evaluate" />
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
            <SearchBarDropdown
              id="search-bar"
              name="Test1"
              value={Test1Value}
              onChange={handleSearchChange1}
              label="Test1"
              placeholder="Serch Test1"
              options={AllTestData?.data}
              isRequired={false}
              showSearchBarDropDown={Test1DropDown}
              setShowSearchBarDropDown={setTest1DropDown}
              handleOptionClickForCentre={handleOptionClick1}
              setIsHovered={setTest1HoveIndex}
              isHovered={Test1HoveIndex}
              style={{ marginTop: "0.1rem" }}
            />
            <SearchBarDropdown
              id="search-bar"
              name="Test2"
              value={Test2Value}
              onChange={handleSearchChange2}
              label="Test2"
              placeholder="Serch Test2"
              options={AllTestData?.data}
              isRequired={false}
              showSearchBarDropDown={Test2DropDown}
              setShowSearchBarDropDown={setTest2DropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setTest2HoveIndex}
              isHovered={Test2HoveIndex}
              style={{ marginTop: "0.1rem" }}
            />
            <SearchBarDropdown
              id="search-bar"
              name="Test3"
              value={Test3Value}
              onChange={handleSearchChange3}
              label="Test3"
              placeholder="Serch Test3"
              options={AllTestData?.data}
              isRequired={false}
              showSearchBarDropDown={Test3DropDown}
              setShowSearchBarDropDown={setTest3DropDown}
              handleOptionClickForCentre={handleOptionClick3}
              setIsHovered={setTest3HoveIndex}
              isHovered={Test3HoveIndex}
              style={{ marginTop: "0.1rem" }}
            />

            <TwoSubmitButton
              options={[
                {
                  label: "Search",
                  submit: false,
                  callBack: () => {
                    handleSearch();
                  },
                },
              ]}
            />
          </div>
        </form>
        <div style={{ height: "300px" }}>
          <StyledHr />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 w-full">
            {/* Table 1 */}
            <div className="w-full flex flex-col">
              {/* {row2?.length > 0 ? ( */}
                <TableHeader title={"Test1 Details"} />
              {/* ) : ( */}
                {/* <TableHeader title={"Test Details"} /> */}
              {/* )} */}
              <table className="table-auto border-collapse w-full text-xxs text-left min-w-max">
                <thead
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <tr>
                    {columns?.map((col, index) => (
                      <th
                        key={index}
                        className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
                        style={{
                          width: col?.width ? `${col?.width}px` : "",
                          flex: col?.flex || "",
                        }}
                      >
                        {col?.renderHeaderCell
                          ? col?.renderHeaderCell({ row: {} })
                          : col?.headerName}
                      </th>
                    ))}
                  </tr>
                </thead>

                {row1?.length !== 0 ? (
                  <tbody>
                    {row1?.map((row, index) => (
                      <tr
                        key={row?.Random || index} // Ensure a valid key
                        className={`cursor-pointer ${
                          isHoveredTable === row?.Random
                            ? ""
                            : index % 2 === 0
                            ? "bg-gray-100"
                            : "bg-white"
                        }`}
                        onMouseEnter={() => setIsHoveredTable(row?.Random)}
                        onMouseLeave={() => setIsHoveredTable(null)}
                        style={{
                          background:
                            isHoveredTable === row?.Random
                              ? activeTheme?.subMenuColor
                              : "",
                        }}
                      >
                        {columns?.map((col, idx) => (
                          <td
                            key={idx}
                            className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                          >
                            {col?.renderCell
                              ? col?.renderCell({ row })
                              : row[col?.field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={columns.length} className="text-center py-4">
                        {""}
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>

            {/* Table 2 */}
            {/* {row2?.length > 0 && ( */}
              <div className="w-full flex flex-col">
                <TableHeader title={"Test2 Details"} />
                <table className="table-auto border-collapse w-full text-xxs text-left min-w-max">
                  <thead
                    style={{
                      background: activeTheme?.menuColor,
                      color: activeTheme?.iconColor,
                    }}
                  >
                    <tr>
                      {columns?.map((col, index) => (
                        <th
                          key={index}
                          className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
                          style={{
                            width: col?.width ? `${col?.width}px` : "",
                            flex: col?.flex || "",
                          }}
                        >
                          {col?.renderHeaderCell
                            ? col?.renderHeaderCell({ row: {} })
                            : col?.headerName}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {row2?.map((row, index) => (
                      <tr
                        key={row?.Random || index}
                        className={`cursor-pointer ${
                          isHoveredTable1 === row?.Random
                            ? ""
                            : index % 2 === 0
                            ? "bg-gray-100"
                            : "bg-white"
                        }`}
                        onMouseEnter={() => setIsHoveredTable1(row?.Random)}
                        onMouseLeave={() => setIsHoveredTable1(null)}
                        style={{
                          background:
                            isHoveredTable1 === row?.Random
                              ? activeTheme?.subMenuColor
                              : "",
                        }}
                      >
                        {columns?.map((col, idx) => (
                          <td
                            key={idx}
                            className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                          >
                            {col?.renderCell
                              ? col?.renderCell({ row })
                              : row[col?.field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            {/* )} */}

            {/* Table 3 */}
            {/* {row3?.length > 0 && ( */}
              <div className="w-full flex flex-col">
                <TableHeader title={"Test3 Details"} />
                <table className="table-auto border-collapse w-full text-xxs text-left min-w-max">
                  <thead
                    style={{
                      background: activeTheme?.menuColor,
                      color: activeTheme?.iconColor,
                    }}
                  >
                    <tr>
                      {columns?.map((col, index) => (
                        <th
                          key={index}
                          className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
                          style={{
                            width: col?.width ? `${col?.width}px` : "",
                            flex: col?.flex || "",
                          }}
                        >
                          {col?.renderHeaderCell
                            ? col?.renderHeaderCell({ row: {} })
                            : col?.headerName}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {row3?.map((row, index) => (
                      <tr
                        key={row?.Random || index}
                        className={`cursor-pointer ${
                          isHoveredTable2 === row?.Random
                            ? ""
                            : index % 2 === 0
                            ? "bg-gray-100"
                            : "bg-white"
                        }`}
                        onMouseEnter={() => setIsHoveredTable2(row?.Random)}
                        onMouseLeave={() => setIsHoveredTable2(null)}
                        style={{
                          background:
                            isHoveredTable2 === row?.Random
                              ? activeTheme?.subMenuColor
                              : "",
                        }}
                      >
                        {columns?.map((col, idx) => (
                          <td
                            key={idx}
                            className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                          >
                            {col?.renderCell
                              ? col?.renderCell({ row })
                              : row[col?.field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
}
