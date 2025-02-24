import { getData } from "./apiService";
import { getAllCentreApi } from "./service";

// Wrap the top-level await in an async function
export const fetchAllCenterData = async () => {
  try {
    const AllCenterData = await getData(
      "/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)"
    );
    // You can use AllCenterData here or return it
    return AllCenterData;
  } catch (error) {
    console.log(error);
  }
};

export const addObjectId = (arr) => {
  return arr.map((item, index) => ({
    ...item,
    id: index + 1, // Adding objId starting from 1
  }));
};

export const SampleCollectionStatus = [
  { id: 1, data: "Sample Not Collected", value: "N" },
  { id: 2, data: "Sample Collected", value: "S" },
  { id: 1, data: "Sample Received", value: "Y" },
  { id: 1, data: "Sample Reject", value: "R" },
];
