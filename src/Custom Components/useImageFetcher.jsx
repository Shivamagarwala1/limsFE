import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useImageFetcher = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = useCallback(async (url, params = {}) => {
    if (!url) return;

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}${url}`, {
        params,
        responseType: "blob", // Get binary data
      });

      const imageUrl = URL.createObjectURL(response.data);
      setImageSrc(imageUrl);
    } catch (err) {
      setError(err.message || "Failed to load image");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  return { imageSrc, loading, error, fetchImage };
};

export default useImageFetcher;
