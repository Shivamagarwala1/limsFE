import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "./localstroageService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Axios instance
const privateAxios = axios.create({
  baseURL: BASE_URL,
});

// Add an interceptor to include the token in requests
privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Function to make a GET request with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} params - Query parameters (optional)
 * @returns {Promise} - Resolves to API response
 */
export const getData = async (url, params = {}) => {
  try {
    const response = await privateAxios.get(url, { params });
    return response;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

/**
 * Function to make a POST request with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} body - Request payload
 * @returns {Promise} - Resolves to API response
 */
export const postData = async (url, body) => {
  try {
    const response = await privateAxios.post(url, body);
    return response.data;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

/**
 * Function to make a PUT request with authentication
 * @param {string} url - API endpoint
 * @param {object} body - Request payload
 * @returns {Promise} - Resolves to API response
 */
export const putData = async (url, body) => {
  try {
    const response = await privateAxios.put(url, body);
    return response.data;
  } catch (error) {
    console.error("Error in PUT request:", error);
    throw error;
  }
};

/**
 * Function to make a DELETE request with authentication
 * @param {string} url - API endpoint
 * @returns {Promise} - Resolves to API response
 */
export const deleteData = async (url) => {
  try {
    const response = await privateAxios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error in DELETE request:", error);
    throw error;
  }
};

/**
 * Custom hook to fetch data with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} params - Query parameters (optional)
 */
export const useGetData = (url, params = {}) => {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url, params = {}) => {
    setLoading(true);
    try {
      const result = await getData(url, params);
      setData(result?.data);
      setResponse(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setData([]);
  };

  useEffect(() => {
    console.log(BASE_URL.length);
    // Check if BASE_URL is the restricted URL
    if (BASE_URL > 28) {
      fetchData();
    } else {
      setLoading(false); // Set loading to false if the URL is restricted
    }
  }, [url, JSON.stringify(params)]);

  return { fetchData, response, data, loading, error, resetData };
};

/**
 * Custom hook to send a POST request with authentication
 * @returns {function} postRequest - Function to trigger POST request
 */
export const usePostData = () => {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = async (url, body) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postData(url, body);
      setData(result?.data);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setData([]);
  };

  return { postRequest, response, data, loading, error, resetData };
};

export const StatusUpdater = async (payload, api, fetchedData) => {
  const data1 = await postData(api, payload);
  if (data1?.success) {
    toast.success("Status Updated Successfully");
    console.log(payload);
    fetchedData();
  }
};
