import { getData } from "./apiService";
import { getAllCentreApi } from "./service";

// Wrap the top-level await in an async function
export const fetchAllCenterData =async ()=> {
  try {
    const AllCenterData = await getData('/centreMaster?select=centreId,companyName&$filter=(isActive eq 1)');
  // You can use AllCenterData here or return it
  return AllCenterData;
  } catch (error) {
    console.log(error)
  }
}
