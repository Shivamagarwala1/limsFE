import React, { useEffect, useState } from "react";
import DynamicTable, {
  UpdatedDynamicTable,
} from "../../../Custom Components/DynamicTable";
import InputGenerator, {
  SubmitButton,
  TwoSubmitButton,
} from "../../../Custom Components/InputGenerator";
import { useSelector } from "react-redux";
import { useGetData, usePostData } from "../../../service/apiService";
import { FormHeader } from "../../../Custom Components/FormGenerator";
import {
  addObjectId,
  addRandomObjectId,
  ViewOrDownloandPDF,
} from "../../../service/RedendentData";
import toast from "react-hot-toast";
import SearchBarDropdown from "../../../Custom Components/SearchBarDropdown";
import {
  UploadAgreementPopupModal,
  UploadCertificatePopupModal,
} from "../../../Custom Components/NewPopups";
import axios from "axios";
import { getLocal } from "usehoks";

// Main Component
export default function GenerateCertificate() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  const RoleData = getLocal("RoleDetails");
  const [VisitorId, setVisitorId] = useState("");
  const [UpdatedBarcode, setUpdatedBarcode] = useState([]);

  const [Indicator, setIndicator] = useState(false);
  const [ShowPopup, setShowPopup] = useState(false);
  const [ShowPopup1, setShowPopup1] = useState(false);
  // ------------------ Center -------------------------------
  const [CenterId, setCenterId] = useState(null);
  const [CenterValue, setCenterValue] = useState("");
  const [CenterDropDown, setCenterDropDown] = useState(false);
  const [CenterHoveIndex, setCenterHoveIndex] = useState(null);
  const [CenterSelectedOption, setCenterSelectedOption] = useState("");

  const [row, setRow] = useState([]);
  const getData = useGetData();
  const PostData = usePostData();
  const AllCenterData = useGetData();
  const GridData = useGetData();
  useEffect(() => {
    AllCenterData?.fetchData(
      "/centreMaster?select=centreid,companyname&$filter=(isactive eq 1 )"
    );
    // console.log(AllCenterData);
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/CentreCertificate/GetAggreement?centreId=${CenterId}`
        );
        console.log("API Response:", response.data);

        if (response?.data?.data) {
          setRow(addRandomObjectId(response.data.data));
        } else {
          console.warn("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (CenterId) {
      getData();
    }
  }, [CenterId, Indicator]);

  // Columns for the table
  const columns = [
    { field: "Random", headerName: "Sr. No", width: 20 },
    { field: "centreId", headerName: "Centre Id", flex: 1 },
    { field: "centreName", headerName: "Centre Name", flex: 1 },
    { field: "certificateDate", headerName: "Certificate Date", flex: 1 },
    {
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <SubmitButton
              style={{ width: "120px", padding: "0px 5px", height: "1.05rem" }}
              text="Download Certificate"
              callBack={() => {
                handleCertificateDownload(params?.row?.certificateID);
              }}
            />
            <SubmitButton
              style={{ width: "120px", padding: "0px 5px", height: "1.05rem" }}
              text="Download Agreement"
              callBack={() => {
                handleAgreementDownload(params?.row?.aggrement);
              }}
            />
          </div>
        );
      },
    },
  ];
  const handleGenerateCertificate = async () => {
    if (!CenterId) {
      toast.error("Center is Required");
      return;
    }
    const payload = {
      isActive: 1,
      createdById: lsData?.user?.employeeId,
      createdDateTime: new Date().toISOString(),
      id: 0,
      centreId: CenterId,
      centreName: CenterValue,
      certificateDate: new Date().toISOString(),
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/CentreCertificate/GenerateCertificate`,
        payload
      );
      console.log("API Response:", response.data);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setIndicator(!Indicator);
      } else {
        console.warn("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleCertificateDownload = async (data = 1) => {
    ViewOrDownloandPDF(`/CentreCertificate/DownloadCertificate?Id=${data}`);
  };
  const handleAgreementDownload = async (data) => {
    ViewOrDownloandPDF(
      `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${data}`
    );
  };

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

  return (
    <>
      {ShowPopup && (
        <UploadCertificatePopupModal
          showPopup={ShowPopup}
          setShowPopup={setShowPopup}
          centerId={CenterId}
        />
      )}
      {ShowPopup1 && (
        <UploadAgreementPopupModal
          showPopup={ShowPopup1}
          setShowPopup={setShowPopup1}
          centerId={CenterId}
        />
      )}
      <div>
        <FormHeader title="Generate Certificate/Agreement" />
        <form autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
            <SearchBarDropdown
              id="search-bar"
              name="Center"
              value={CenterValue}
              onChange={handleSearchChange2}
              label="Center"
              placeholder="Serch Center"
              options={AllCenterData?.data}
              isRequired={false}
              showSearchBarDropDown={CenterDropDown}
              setShowSearchBarDropDown={setCenterDropDown}
              handleOptionClickForCentre={handleOptionClick2}
              setIsHovered={setCenterHoveIndex}
              isHovered={CenterHoveIndex}
              style={{ marginTop: "0.1rem" }}
            />
            {(RoleData?.roleId == 1 ||
              RoleData?.roleId == 6 ||
              RoleData?.roleId == 7) && (
              <>
                <TwoSubmitButton
                  options={[
                    {
                      label: "Upload Aggrement",
                      submit: false,
                      callBack: () => {
                        if (CenterId !== null) {
                          setShowPopup1(true);
                        } else {
                          toast.error("Center is Required");
                        }
                      },
                    },
                    {
                      label: "Upload Certificate",
                      submit: false,
                      callBack: () => {
                        if (CenterId !== null) {
                          setShowPopup(true);
                        } else {
                          toast.error("Center is Required");
                        }
                      },
                    },
                  ]}
                />
                <TwoSubmitButton
                  options={[
                    {
                      label: "Generate Certificate",
                      submit: false,
                      callBack: () => {
                        if (CenterId !== null) {
                          handleGenerateCertificate();
                        } else {
                          toast.error("Center is Required");
                        }
                      },
                    },
                  ]}
                />
              </>
            )}
          </div>
        </form>
        <div style={{ height: "300px" }}>
          <UpdatedDynamicTable
            rows={row}
            name="Download Certificate/Agreement"
            loading={getData?.loading}
            columns={columns}
            viewKey="Random"
          />
        </div>
      </div>
    </>
  );
}
