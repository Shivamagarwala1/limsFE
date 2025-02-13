import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function FileUpload({ FileData, setFileData,accept = "*/*", inputFields }) {
  const imgRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > inputFields?.Size * 1024 * 1024) {
        toast.info(`File size exceeds ${inputFields?.Size}MB limit!`);
        return;
      }
      setFileData({ ...FileData, fileName: file.name,fileData: file, });
    }
  };

  return (
    <div className="relative flex-1">
      {/* File Upload Button */}
      <div
        name="fileName"
        className={`inputPeerField peer h-5 ${
          inputFields?.required ? "border-b-red-500" : "border-b-green-300"
        } cursor-pointer`}
        onClick={() => imgRef.current.click()} // Trigger file input when clicked
      >
        {FileData.fileName === "" ? (
          <div className="pt-2 z-40 font-semibold text-center">Upload</div>
        ) : (
          <div className="pt-2 z-40 text-center text-green-600">
            Uploaded Successfully
          </div>
        )}
      </div>
      {/* accept=".xls, .xlsx" */}
      {/* Hidden File Input */}
      <input
        type="file"
        id="fileName"
        name="fileName"
        ref={imgRef}
        accept={accept}
        style={{ display: "none" }}
        className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none`}
        onChange={handleFileChange} // Handle file selection
      />

      {/* Label */}
      <label htmlFor="fileName" className="menuPeerLevel">
        {inputFields?.label}
      </label>
    </div>
  );
}
