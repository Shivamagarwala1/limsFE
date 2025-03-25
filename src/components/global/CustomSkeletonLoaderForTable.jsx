import React from "react";

const CustomSkeletonLoaderForTable = ({ rows = 10, columns = 1000 }) => {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse bg-gray-100">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <td key={colIndex} className="border px-4 py-2">
                            <div className="h-3 bg-gray-300 rounded w-full"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default CustomSkeletonLoaderForTable;
