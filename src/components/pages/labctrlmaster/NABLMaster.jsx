import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormHeader } from "../../../Custom Components/FormGenerator";
import { TwoSubmitButton } from "../../../Custom Components/InputGenerator";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import { useGetData, usePostData } from "../../../service/apiService";
import FileUpload from "../../../Custom Components/FileUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { getLocal } from "usehoks";
import DynamicTable from "../../../Custom Components/DynamicTable";
import { MdDelete } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { use } from "react";
import { CiImageOn } from "react-icons/ci";
import { ImagePopup } from "../../../Custom Components/PopupModal";
import { addRandomObjectId, ViewImage } from "../../../service/RedendentData";
import { UpdatedMultiSelectDropDown } from "../../../Custom Components/UpdatedMultiSelectDropDown";

export default function NABLMaster() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  const [ImgData, setImgData] = useState("");
  const [Flag, setFlag] = useState(false);
  const [ShowRow, setShowRow] = useState(false);
  const [imageView, setImageView] = useState(false);
  const [Img, setImg] = useState("");
  const [FileData, setFileData] = useState({ fileName: "" });
  const [BookingId, setBookingId] = useState("");
  const [BookingValue, setBookingValue] = useState("");
  const [BookingDropDown, setBookingDropDown] = useState(false);
  const [BookingHoveIndex, setBookingHoveIndex] = useState(null);
  const [BookingSelectedOption, setBookingSelectedOption] = useState("");
  //   --------------- Departmnt -------------------
  const [DepartmentId, setDepartmentId] = useState("");
  const [DepartmentValue, setDepartmentValue] = useState("");
  const [DepartmentDropDown, setDepartmentDropDown] = useState(false);
  const [DepartmentHoveIndex, setDepartmentHoveIndex] = useState(null);
  const [DepartmentSelectedOption, setDepartmentSelectedOption] = useState("");

  // ----------------------- Investigation -----------------------
  const [InvestigationValue, setInvestigationValue] = useState("");
  const [InvestigationDropDown, setInvestigationDropDown] = useState(false);
  const [InvestigationHoveIndex, setInvestigationHoveIndex] = useState(null);
  const [InvestigationSelectedOption, setInvestigationSelectedOption] =
    useState("");
  // ----------------------- Observation -----------------------
  const [ObservationId, setObservationId] = useState("");
  const [ObservationId1, setObservationId1] = useState("");
  const [ObservationValue, setObservationValue] = useState("");
  const [ObservationArr, setObservationArr] = useState([]);
  const [ObservationDropDown, setObservationDropDown] = useState(false);
  const [ObservationHoveIndex, setObservationHoveIndex] = useState(null);
  const [ObservationSelectedOption, setObservationSelectedOption] =
    useState("");
  // ----------------------- Use Default Logo -----------------------
  const [DefaultLogoId, setDefaultLogoId] = useState("");
  const [DefaultLogoValue, setDefaultLogoValue] = useState("");
  const [DefaultLogoDropDown, setDefaultLogoDropDown] = useState(false);
  const [DefaultLogoHoveIndex, setDefaultLogoHoveIndex] = useState(null);
  const [DefaultLogoSelectedOption, setDefaultLogoSelectedOption] =
    useState("");

    
  const [row, setRow] = useState([]);

  const PostData = usePostData();
  const ItemData = useGetData();
  const DepartmentData = useGetData();
  const TestData = useGetData();
  const GridData = usePostData();
  const ObservationData = useGetData();
  useEffect(() => {
    fetchedData();
  }, [InvestigationValue,DepartmentId]);
  useEffect(() => {
    if (FileData?.fileName === "") return;
    console.log(FileData);
    handleImageUpload();
  }, [FileData]);

  useEffect(() => {
    fetchGrid();
  }, [Flag, BookingId, ObservationId]);

  const fetchGrid = async () => {
    const Booking = BookingId;
    const Observation = ObservationId;
    if (!Booking || !Observation) return;
    await GridData?.postRequest(
      `/itemObservation_isnabl/GetNablData?CentreId=${Booking}&itemId=${Observation}`
    );
    const grid = await addRandomObjectId(GridData?.data);
    setRow(grid); // Store API response in the state
    setShowRow(true);
  };
  const fetchedData = async () => {
    await TestData?.fetchData(
      `/itemMaster?select=itemId,ItemName&$filter=(deptId eq ${DepartmentId})&$OrderBy=itemName`
    );
    await ItemData?.fetchData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1 and centreTypeId le 2)"
    );
    await DepartmentData?.fetchData(
      "/labDepartment?select=id,deptname&$orderby=printSequence"
    );
    await ObservationData?.fetchData(
      `/itemMaster/GetProfileObservation?itemId=${ObservationId}`
    );
  };
  console.log(BookingId, ObservationId);

  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "centrename", headerName: "Centre Name", flex: 1 },
    { field: "itemid", headerName: "Item Id", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "observationName", headerName: "Oservation Name", flex: 1 },
    {
      field: "nablLogo",
      headerName: "NABL Logo",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <div
              onClick={() => {
                PathtoImg(params?.row?.nablLogo);
              }}
              className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
              style={{
                background: activeTheme?.menuColor,
                color: activeTheme?.iconColor,
              }}
            >
              <CiImageOn style={{ fontSize: "15px" }} />
            </div>
          </div>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <div
              onClick={() => handleDelete(params?.row?.id)}
              className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
              style={{
                background: activeTheme?.menuColor,
                color: activeTheme?.iconColor,
              }}
            >
              <AiFillDelete style={{ color: "red", fontSize: "15px" }} />
            </div>
          </div>
        );
      },
    },
  ];

  const PathtoImg = async (path) => {
    const img = await ViewImage(
      `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${path}`
    );
    if (img) {
      setImg(img);
      setImageView(true);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid item ID");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/itemObservation_isnabl/RemoveNabl?id=${id}`
      );

      console.log("Delete Response:", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Delete Error:", error.response);

      if (error.response) {
        toast.error(error.response.data?.message || "Failed to delete item");
      } else {
        toast.error("Network error or no response received");
      }
    } finally {
      setFlag(!Flag);
    }
  };

  const handleOptionClick3 = async (name, id) => {
    setBookingValue(name);
    setBookingId(id);
    await fetchGrid();
    await sessionStorage.setItem("BookingId", JSON.stringify(id));
    setBookingSelectedOption(name);
    setBookingDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange3 = (e) => {
    setBookingValue(e.target.value);
    setBookingDropDown(true); // Show dropdown when typing
  };
  const handleOptionClick = (name, id) => {
    setDepartmentValue(name);
    setDepartmentId(id);
    setDepartmentSelectedOption(name);
    setDepartmentDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange = (e) => {
    setDepartmentValue(e.target.value);
    setDepartmentDropDown(true); // Show dropdown when typing
  };
  const handleOptionClick1 = async (name, id) => {
    setInvestigationValue(name);
    setObservationId(id);
    await fetchGrid();
    await sessionStorage.setItem("ObservationId", JSON.stringify(id));
    setInvestigationSelectedOption(name);
    setInvestigationDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange1 = (e) => {
    setInvestigationValue(e.target.value);
    setInvestigationDropDown(true); // Show dropdown when typing
  };

  const handleOptionClick2 = (name, id) => {
    setObservationValue(name);
    setObservationId1(id);
    setObservationSelectedOption(name);
    setObservationDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange2 = (e) => {
    setObservationValue(e.target.value);
    setObservationDropDown(true); // Show dropdown when typing
  };
  const handleOptionClick4 = (name, id) => {
    setDefaultLogoValue(name);
    setDefaultLogoId(id);
    setDefaultLogoSelectedOption(name);
    setDefaultLogoDropDown(false);
  };
  // Function to handle input changes
  const handleSearchChange4 = (e) => {
    setDefaultLogoValue(e.target.value);
    setDefaultLogoDropDown(true); // Show dropdown when typing
  };

  const handleImageUpload = async () => {
    if (!BookingId) {
      toast.error("Please select Booking Center");
      return;
    }
    if (!FileData?.fileData) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("NablLogo", FileData.fileData);

    try {
      const res = await axios({
        method: "post",
        url: `${BASE_URL}/itemObservation_isnabl/UploadNablLogo?centreId=${BookingId}`,
        data: formData,
        headers: {
          Accept:
            "application/json;odata.metadata=minimal;odata.streaming=true",
          "Content-Type": "multipart/form-data", // Ensures correct format
        },
      });

      console.log("Upload Response:", res);
      if (res.status === 200) {
        toast.success("Image uploaded successfully!");
        setImgData(res?.data?.data?.filePath);
      }
    } catch (error) {
      console.error("Upload Error:", error.response);

      if (error.response) {
        toast.error(
          error.response.data?.errors?.NablLogo?.[0] ||
            error.response.data?.message ||
            "Upload failed"
        );
        setFileData({ fileName: "" });
      } else {
        toast.error("Network error or no response received");
        setFileData({ fileName: "" });
      }
    }
    //  finally {
    //   setFileData({ fileName: "" });
    // }
  };

  const handleSubmit = async () => {
    try {
      const Payload = {
        createdById: parseInt(lsData?.user?.employeeId),
        createdDateTime: new Date().toISOString(),
        observationId: ObservationArr,
        itemid: ObservationId,
        centreId: BookingId,
        nablLogo: ImgData,
        isDefaultLogo: DefaultLogoValue === "Yes" ? 1 : 0,
      };

      const res = await PostData?.postRequest(
        `/itemObservation_isnabl/SaveUpdateNabl`,
        Payload
      );
      console.log(PostData?.response);
      if (res?.success) {
        toast.success(res?.message);
        GridData?.postRequest(
          `/itemObservation_isnabl/GetNablData?CentreId=${BookingId}&itemId=${ObservationId}`
        );
        const grid = await addRandomObjectId(GridData?.data);
        setRow(grid); // Store API response in the state
        setShowRow(true);
        sessionStorage.setItem("BookingId", JSON.stringify(BookingId));
        sessionStorage.setItem("ObservationId", JSON.stringify(ObservationId));
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div>
        <ImagePopup
          Img={Img}
          setImageView={setImageView}
          imageView={imageView}
        />
        {/* Header Section */}
        <FormHeader title="NABL Master" />

        {/* form data */}
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  mt-2 mb-1  mx-1 lg:mx-2">
            {/* booking center */}
            <SearchBarDropdown
              id="search-bar"
              name="BookingValue"
              value={BookingValue}
              onChange={handleSearchChange3}
              label="Booking Center"
              options={ItemData?.data || []}
              isRequired={false}
              showSearchBarDropDown={BookingDropDown}
              setShowSearchBarDropDown={setBookingDropDown}
              handleOptionClickForCentre={handleOptionClick3}
              setIsHovered={setBookingHoveIndex}
              isHovered={BookingHoveIndex}
            />
            {/* Department */}
            <SearchBarDropdown
              id="search-bar"
              name="Department"
              value={DepartmentValue}
              onChange={handleSearchChange}
              label="Department"
              options={DepartmentData?.data}
              isRequired={false}
              showSearchBarDropDown={DepartmentDropDown}
              setShowSearchBarDropDown={setDepartmentDropDown}
              handleOptionClickForCentre={handleOptionClick}
              setIsHovered={setDepartmentHoveIndex}
              isHovered={DepartmentHoveIndex}
            />
            {/* Investigation */}
            <SearchBarDropdown
              id="search-bar"
              name="Investigation"
              value={InvestigationValue}
              onChange={handleSearchChange1}
              label="Investigation"
              options={TestData?.data}
              isRequired={false}
              showSearchBarDropDown={InvestigationDropDown}
              setShowSearchBarDropDown={setInvestigationDropDown}
              handleOptionClickForCentre={handleOptionClick1}
              setIsHovered={setInvestigationHoveIndex}
              isHovered={InvestigationHoveIndex}
            />
            {/* Observation */}
            {/* <SearchBarDropdown
              id="search-bar"
              name="Observation"
              value={ObservationValue}
              onChange={handleSearchChange2}
              label="Observation"
              options={ObservationData?.data?.data}
              isRequired={false}
              showSearchBarDropDown={ObservationDropDown}
              setShowSearchBarDropDown={setObservationDropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setObservationHoveIndex}
              isHovered={ObservationHoveIndex}
            /> */}

            <UpdatedMultiSelectDropDown
              id="Observation"
              name="serachObservation"
              label="Observation"
              placeHolder="Search Observation"
              options={ObservationData?.data?.data || []}
              isMandatory={false}
              isDisabled={false}
              optionKey="id"
              optionValue={["labObservationName"]}
              selectedValues={ObservationArr}
              setSelectedValues={setObservationArr}
            />
            {/* use default icon */}
            <SearchBarDropdown
              id="search-bar"
              name="DefaultLogo"
              value={DefaultLogoValue}
              onChange={handleSearchChange4}
              label="Use Default Logo"
              options={[{ data: "Yes" }, { data: "No" }]}
              isRequired={false}
              showSearchBarDropDown={DefaultLogoDropDown}
              setShowSearchBarDropDown={setDefaultLogoDropDown}
              handleOptionClickForCentre={handleOptionClick4}
              setIsHovered={setDefaultLogoHoveIndex}
              isHovered={DefaultLogoHoveIndex}
            />

            <div
              style={{ display: "flex", gap: "5px" }}
              className="relative flex-1 flex-row"
            >
              {/* image */}
              <FileUpload
                FileData={FileData}
                text="Uploaded"
                accept=".jpg, .jpeg, .png"
                setFileData={setFileData}
                inputFields={{ Size: 10, label: "NABL Image" }}
              />
              <TwoSubmitButton
                options={[
                  {
                    label: "Save",
                    submit: false,
                    style: { width: "100px" },
                    callBack: () => {
                      handleSubmit();
                    },
                  },
                ]}
              />
            </div>
          </div>
        </form>
      </div>

      {/* grid data */}
      <DynamicTable rows={ShowRow ? row : []} columns={columns} />
    </>
  );
}
