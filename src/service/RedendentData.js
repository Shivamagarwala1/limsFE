import axios from "axios";
import { getData } from "./apiService";
import { getAllCentreApi } from "./service";
import { getLocal } from "usehoks";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export const addRandomObjectId = (arr) => {
  return arr.map((item, index) => ({
    ...item,
    Random: index + 1, // Adding objId starting from 1
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

export const ViewImage = async (api) => {
  const lsData = getLocal("imarsar_laboratory");

  try {
    // Retrieve the token from localStorage
    const token = lsData?.token;

    if (!token) {
      console.error("Token not found. Please log in.");
      return null;
    }

    // Perform the GET request to fetch the image
    const response = await axios.get(`${BASE_URL}${api}`, {
      responseType: "blob", // To handle binary response
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`, // Add the token to Authorization header
      },
    });

    // Convert the response into a Blob URL
    const imageBlob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const imageUrl = URL.createObjectURL(imageBlob);

    console.log(imageBlob);
    return imageUrl; // Return image URL to be used in <img> tag
  } catch (error) {
    console.error("Error fetching image:", error);

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

    return null; // Return null in case of an error
  }
};

export const downloadExcel = async (api, name = "RateList.xlsx") => {
  try {
    const response = await axios.get(`${BASE_URL}${api}`, {
      responseType: "blob", // Ensure binary data is handled correctly
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    // Create a blob from the response
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = name; // Set the filename
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading Excel file:", error);
  }
};

export function convertToISO(dateStr, fieldId = "from") {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [day, month, year] = dateStr.split("-");
  const formattedDate = `${year}-${months[month]}-${day.padStart(2, "0")}`;

  const time = fieldId === "from" ? "00:00:00.000Z" : "23:59:59.000Z";

  return `${formattedDate}T${time}`;
}

export function convertToCustomFormat(isoDateStr) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(isoDateStr);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

export const adjustStringLength = (input, targetLength) => {
  if (input.length > targetLength) {
    return input.slice(0, targetLength - 3) + "..."; // Trim and add "..."
  } else {
    return input.padEnd(targetLength, " "); // Add spaces to match length
  }
};

export const convertDateTimeFormat = (dateTimeStr) => {
  if (!dateTimeStr) return "";

  // Check if the format is already "YYYY-MMM-DD HH:mm AM/PM"
  const regexPattern = /^\d{4}-[A-Za-z]{3}-\d{2} \d{2}:\d{2} (AM|PM)$/;
  if (regexPattern.test(dateTimeStr)) {
    return dateTimeStr; // Return as is if already in the correct format
  }

  // Convert "YYYY-MM-DD HH:mm:ss" format
  const dateObj = new Date(dateTimeStr.replace(" ", "T"));

  if (isNaN(dateObj)) return "Invalid Date";

  // Format day, month, and year
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleString("en-GB", { month: "short" });
  const year = dateObj.getFullYear();

  // Format hours and minutes
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

// export const convertDateTimeFormat = (dateTimeStr) => {
//   if (!dateTimeStr) return "";

//   // Parse the input date string into a Date object
//   const dateObj = new Date(dateTimeStr.replace(" ", "T"));

//   if (isNaN(dateObj)) return "Invalid Date";

//   // Format day, month, and year
//   const day = dateObj.getDate().toString().padStart(2, "0");
//   const month = dateObj.toLocaleString("en-GB", { month: "short" });
//   const year = dateObj.getFullYear();

//   // Format hours and minutes
//   const hours = dateObj.getHours().toString().padStart(2, "0");
//   const minutes = dateObj.getMinutes().toString().padStart(2, "0");

//   return `${day}-${month}-${year} ${hours}:${minutes}`;
// };
