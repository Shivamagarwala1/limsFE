import React, { useEffect, useState } from "react";
import { useGetData } from "../../../../service/apiService";
import UpdatesCarousel from "./Components/UpdatesCarousel";
import PackagesSpotlight from "./Components/PackagesSpotlight";
import { StyledHr } from "../../../../Custom Components/DynamicTable";

// Main Component
export default function MarketingDashboard() {
  const [NewUpdates, setNewUpdates] = useState([]);
  const [LabOffer, setLabOffer] = useState([]);
  const [PackageInSpotlight, setPackageInSpotlight] = useState([]);
  const [RewardProgram, setRewardProgram] = useState([]);
  const [MonthlySlab, setMonthlySlab] = useState([]);
  const getData = useGetData();

  useEffect(() => {
    getAllData();
  }, []); // Removed getData?.loading to avoid unnecessary re-renders

  const getAllData = async () => {
    try {
      const resNewUpdates = await getData?.fetchData(
        `/MarketingDashBoard/ViewMarketingDashboard?type=New Updates`
      );
      if (resNewUpdates?.data?.success) {
        setNewUpdates(resNewUpdates?.data?.data);
      }
      const resPackagesinSpotlight = await getData?.fetchData(
        `/MarketingDashBoard/ViewMarketingDashboard?type=Packages in Spotlight`
      );
      if (resPackagesinSpotlight?.data?.success) {
        setPackageInSpotlight(resPackagesinSpotlight?.data?.data);
      }
      const resLabOffer = await getData?.fetchData(
        `/MarketingDashBoard/ViewMarketingDashboard?type=Lab Offer`
      );
      if (resLabOffer?.data?.success) {
        setLabOffer(resLabOffer?.data?.data);
      }
      const resRewardProgram = await getData?.fetchData(
        `/MarketingDashBoard/ViewMarketingDashboard?type=Reward Program`
      );
      if (resRewardProgram?.data?.success) {
        setRewardProgram(resRewardProgram?.data?.data);
      }
      const resMonthlySlab = await getData?.fetchData(
        `/MarketingDashBoard/ViewMarketingDashboard?type=Monthly Slab`
      );
      if (resMonthlySlab?.data?.success) {
        setMonthlySlab(resMonthlySlab?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching marketing dashboard data:", error);
    }
  };

  console.log(NewUpdates);
  return (
    <div>
      <UpdatesCarousel updates={NewUpdates} />
      <StyledHr style={{ marginTop: "1px" }} />
      <PackagesSpotlight
        packages={PackageInSpotlight}
        title={"Package In Spotlight"}
      />
      <StyledHr style={{ marginTop: "1px" }} />
       <PackagesSpotlight
        packages={LabOffer}
        title={"Lab Offer"}
      />
      <StyledHr style={{ marginTop: "1px" }} />
       <PackagesSpotlight
        packages={RewardProgram}
        title={"Reward Program"}
      />
      <StyledHr style={{ marginTop: "1px" }} />
       <PackagesSpotlight
        packages={MonthlySlab}
        title={"Monthly Slab"}
      />
      <StyledHr style={{ marginTop: "30px" }} />
    </div>
  );
}
