export const toCamelCase = (str) => {
    return str
        .toLowerCase()
        .replace(/\b\w/g, (match) => match.toUpperCase()) // Capitalize first letter of each word
        .replace(/\s+/g, ' '); // Ensure that spaces are allowed and normalized to a single space
};

