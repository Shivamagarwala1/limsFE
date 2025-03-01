import axios from "axios";
import { getData } from "./apiService";
import { getAllCentreApi } from "./service";
import { getLocal } from "usehoks";

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
  { id: 3, data: "Sample Received", value: "Y" },
  { id: 4, data: "Sample Reject", value: "R" },
  { id: 5, data: "Urgent", value: "U" },
];

export const splitArrayInTwo = (arr) => {
  const FirstHalf = [];
  const SecondHalf = [];

  arr.forEach((item, index) => {
    if (index % 2 === 0) {
      FirstHalf.push(item);
    } else {
      SecondHalf.push(item);
    }
  });

  return { FirstHalf, SecondHalf };
};

// const { FirstHalf, SecondHalf } = splitArrayInTwo(splitArrayInTwo);

export const ViewOrDownloandPDF = async (api) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const lsData = getLocal("imarsar_laboratory");
  try {
    // Retrieve the token from localStorage
    const token = lsData?.token;

    if (!token) {
      console.error("Token not found. Please log in.");
      return;
    }

    // Perform the GET request to download the PDF
    const response = await axios.get(`${BASE_URL}${api}`, {
      responseType: "blob", // To handle binary response
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`, // Add the token to Authorization header
      },
    });

    // Check if the content type is PDF
    const contentType = response.headers["content-type"];
    if (contentType === "application/pdf") {
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");
      console.log("PDF downloaded successfully.");
    } else {
      console.error(
        `Unexpected content type: ${contentType}. Unable to download PDF.`
      );
    }
  } catch (error) {
    console.error("Error downloading PDF:", error);

    if (error.response?.status === 401) {
      console.error("Unauthorized. Token might be invalid or expired.");
    } else if (error.response) {
      console.error(
        "Unexpected response from server:",
        error.response.data || error.response.statusText
      );
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
};

export function mergeArrays(arrayOne, arrayTwo) {
  return arrayTwo.map((item) => {
    // Find a matching object in arrayOne based on id === antibiticId
    const match = arrayOne.find((obj) => obj.antibiticId === item.id);
    return {
      ...item,
      // mic: match ? match.mic : "", // Assign mic value if matched, otherwise empty string
      interpretation: match ? match.interpretation : "",
    };
  });
}
