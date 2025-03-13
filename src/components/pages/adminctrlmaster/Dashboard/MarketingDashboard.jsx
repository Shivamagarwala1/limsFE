import React, { useEffect, useState } from "react";
import { useGetData, usePostData } from "../../../../service/apiService";
import UpdatesCarousel from "./Components/UpdatesCarousel";
import PackagesSpotlight from "./Components/PackagesSpotlight";

// Main Component
export default function MarketingDashboard() {
  // ------------------ Marketing -------------------------------
  const [MarketingId, setMarketingId] = useState(null);
  const [MarketingValue, setMarketingValue] = useState("New Updates");
  const [MarketingDropDown, setMarketingDropDown] = useState(false);
  const [MarketingHoveIndex, setMarketingHoveIndex] = useState(null);
  const [MarketingSelectedOption, setMarketingSelectedOption] = useState("");

  const [row, setRow] = useState([]);
  const getData = useGetData();
  const spotLightData = useGetData();
  const PostData = usePostData();
  const DocumentData = usePostData();
  const UpdateData = usePostData();
  useEffect(() => {
    if (MarketingValue != "") {
      getData?.fetchData(
        `/MarketingDashBoard/GetDashBoardData?type=${MarketingValue}`
      );
    }
    spotLightData?.fetchData(
      `/MarketingDashBoard/GetDashBoardData?type=Packages%20in%20Spotlight`
    );
  }, [MarketingValue, UpdateData?.loading, PostData?.loading]);
  console.log(getData?.data?.data);
  return (
    <>
      <div>
        <UpdatesCarousel updates={getData?.data?.data || []} />
        <PackagesSpotlight packages={spotLightData?.data?.data || []} />
      </div>
    </>
  );
}
