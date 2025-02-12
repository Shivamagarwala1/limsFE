import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../service/localstroageService';

const checkSessionExpiration = () => {
    const token = getToken();
    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        // Check if token is expired
        if (decodedToken.exp < currentTime) {
            // Token expired
            localStorage.removeItem('imarsar_laboratory'); // Remove expired token
            return false; // Session is expired
        }
        return true; // Session is still valid
    }

    return false; // No token found
};

const useSessionExpiration = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check for session expiration on each page load
        const isSessionValid = checkSessionExpiration();

        if (!isSessionValid) {
            navigate('/LIMS/login'); // Redirect to login if session expired
        }
    }, [navigate]);

    // You can add additional checks or cleanup here if needed
};

export default useSessionExpiration;