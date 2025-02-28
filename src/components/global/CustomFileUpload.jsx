// import React, { useRef } from "react";
// import { IoMdImages } from "react-icons/io";

// const UploadButton = ({ onClick, uploadDocument }) => {
//     console.log(uploadDocument);

//     return (
//         <div
//             name="uploadDocument"
//             className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
//             onClick={onClick}
//         >
//             {uploadDocument === "" ? (
//                 <div className="pt-2 z-40 font-semibold text-center">
//                     Upload Document
//                 </div>
//             ) : (
//                 <div className="pt-2 z-40 text-center">
//                     Upload Document Successfully
//                 </div>
//             )}
//         </div>
//     );
// };

// const FileInput = ({ imgRef, onChange }) => {
//     return (
//         <input
//             type="file"
//             id="uploadDocument"
//             name="uploadDocument"
//             ref={imgRef}
//             onChange={onChange}
//             style={{ display: "none" }}
//         />
//     );
// };

// const PreviewIcon = ({ isVisible, onClick, theme }) => {
//     if (!isVisible) return null;

//     return (
//         <div
//             className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
//             onClick={onClick}
//             style={{ background: theme?.menuColor, color: theme?.iconColor }}
//         >
//             <IoMdImages className="w-4 h-4 font-semibold" />
//         </div>
//     );
// };

// const CustomFileUpload = ({
//     patientRegistrationData,
//     handelImageChange,
//     activeTheme,
// }) => {
//     const imgRef = useRef(null);

//     const handelClickImage = () => {
//         if (imgRef.current) {
//             imgRef.current.click();
//         }
//     };

//     return (
//         <div className="relative flex-1 flex gap-[0.10rem]">
//             {/* Upload Button */}
//             <UploadButton
//                 onClick={handelClickImage}
//                 uploadDocument={value}
//             />

//             {/* File Input */}
//             <FileInput imgRef={imgRef} onChange={handelImageChange} />

//             {/* Label */}
//             <label htmlFor="uploadDocument" className="menuPeerLevel">
//                 Upload Document
//             </label>

//             {/* Preview Icon */}
//             <PreviewIcon
//                 isVisible={!!patientRegistrationData?.uploadDocument}
//                 onClick={() => console.log("Preview clicked")} // Replace with your preview logic
//                 theme={activeTheme}
//             />
//         </div>
//     );
// };

// export default CustomFileUpload;


import React, { useRef } from 'react'
import { IoMdImages } from 'react-icons/io'

export default function CustomFileUpload({
    value,
    label = 'Upload Document',
    handelImageChange,
    readOnly = false,
    activeTheme
}) {

    const imgRef = useRef();
    const handelClickImage = () => {
        if (imgRef.current) {
            imgRef.current.click();
        }
    };

    return (
        <div className="relative flex-1 flex gap-[0.10rem]">
            <div
                name="uploadDocument"
                className="inputPeerField peer h-5 border-borderColor focus:outline-none cursor-pointer"
                onClick={handelClickImage}
                readOnly={readOnly}
            >
                {
                    value === '' ? (
                        <div className="pt-2 z-40 font-semibold text-center">
                            {label}
                        </div>
                    ) : (
                        <div className="pt-2 z-40 text-center">
                            {label} Successfully
                        </div>
                    )
                }

                <input
                    type="file"
                    id="uploadDocument"
                    name="uploadDocument"
                    ref={imgRef}
                    onChange={handelImageChange}
                    style={{ display: 'none' }}
                    // accept=".jpg, .jpeg, .png"
                    max={'150px/150px'}
                />
            </div>

            <label htmlFor="uploadDocument" className="menuPeerLevel">
                {label}
            </label>

            {
                value && (
                    <div className="h-[1.6rem] flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                        // onClick={() => setImageView(true)}
                        style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
                        <IoMdImages className="w-4 h-4 font-semibold" />
                    </div>
                )
            }
        </div>
    )
}
