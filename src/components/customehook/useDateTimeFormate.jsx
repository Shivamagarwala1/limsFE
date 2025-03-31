import { useMemo } from "react";

export const useFormattedDate = (date = new Date()) => {
    // const formattedDate = useMemo(() => {
    //     return `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString("default", {
    //         month: "short",
    //     })}-${date.getFullYear()}`;
    // }, [date]);

    // return formattedDate;

    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString(
        "default",
        { month: "short" }
    )}-${date.getFullYear()}`;

    return formattedDate;
};





export const useFormattedDateTime = (date = new Date()) => {
    // const formattedDateTime = useMemo(() => {
    //     const day = String(date.getDate()).padStart(2, "0");
    //     const month = date.toLocaleString("default", { month: "short" });
    //     const year = date.getFullYear();

    //     const hours = date.getHours();
    //     const minutes = String(date.getMinutes()).padStart(2, "0");
    //     const period = hours >= 12 ? "PM" : "AM";
    //     const formattedHours = String(hours % 12 || 12).padStart(2, "0");

    //     return `${day}-${month}-${year} ${formattedHours}:${minutes} ${period}`;
    // }, [date]);

    // return formattedDateTime;

    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = String(hours % 12 || 12).padStart(2, "0");

    return `${day}-${month}-${year} ${formattedHours}:${minutes} ${period}`;

};


export const generateRandomString = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};