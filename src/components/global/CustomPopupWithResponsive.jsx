import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'

export default function CustomPopupWithResponsive({ activeTheme, heading, popuptype = 'small', children, setShowPopup }) {
    return (
        <>
            <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
                <div className={`${popuptype === "medium" ? "w-80 md:w-[500px] max-h-[75vh]" : popuptype === "large" ? "w-80 md:w-[900px] max-h-[75vh]" : popuptype === "extralarge" ? "w-80 md:w-[1200px] max-h-[75vh]" : popuptype === 'mediumUpper' ? 'w-80 md:w-[700px] max-h-[75vh]' : "w-80 max-h-[50vh]"} z-50 shadow-2xl bg-white rounded-lg animate-slideDown flex flex-col`}>

                    {/* Header */}
                    <div className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
                        style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}>
                        <div className="font-semibold text-xxs md:text-sm" style={{ color: activeTheme?.iconColor }}>
                            {heading}
                        </div>
                        <IoMdCloseCircleOutline
                            className="text-xl cursor-pointer"
                            style={{ color: activeTheme?.iconColor }}
                            onClick={() => setShowPopup(0)}
                        />
                    </div>

                    <div className='overflow-scroll relative' style={{ scrollbarWidth: "none" }}>
                        {children}
                    </div>

                    {/* footer */}
                    <div
                        className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
                        style={{
                            borderImage: activeTheme?.menuColor,
                            background: activeTheme?.menuColor,
                            color: activeTheme?.iconColor,
                        }}
                    ></div>
                </div>

            </div>

        </>
    )
}


// !=================================find child data max height or not===============

// import React, { useEffect, useRef, useState } from "react";
// import { IoMdCloseCircleOutline } from "react-icons/io";

// export default function CustomPopupWithResponsive({
//     activeTheme,
//     heading,
//     popuptype = "small",
//     children,
//     setShowPopup,
// }) {
//     const contentRef = useRef(null);
//     const [isScrollable, setIsScrollable] = useState(false);

//     useEffect(() => {
//         // Check if content exceeds 60vh
//         if (contentRef.current) {
//             const contentHeight = contentRef.current.scrollHeight; // Actual content height
//             const maxHeight = window.innerHeight * 0.6; // 60vh in pixels
//             setIsScrollable(contentHeight > maxHeight);
//         }
//     }, [children]);

//     return (
//         <>
//             <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
//                 <div
//                     className={`${popuptype === "medium"
//                         ? "w-80 md:w-[500px] max-h-[60vh]"
//                         : popuptype === "large"
//                             ? "w-80 md:w-[900px] max-h-[60vh]"
//                             : popuptype === "mediumUpper"
//                                 ? "w-80 md:w-[700px] max-h-[60vh]"
//                                 : "w-80 max-h-[50vh]"
//                         } z-50 shadow-2xl bg-white rounded-lg animate-slideDown flex flex-col`}
//                 >
//                     {/* Header */}
//                     <div
//                         className="border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md"
//                         style={{
//                             borderImage: activeTheme?.menuColor,
//                             background: activeTheme?.menuColor,
//                         }}
//                     >
//                         <div
//                             className="font-semibold text-xxs md:text-sm"
//                             style={{ color: activeTheme?.iconColor }}
//                         >
//                             {heading}
//                         </div>
//                         <IoMdCloseCircleOutline
//                             className="text-xl cursor-pointer"
//                             style={{ color: activeTheme?.iconColor }}
//                             onClick={() => setShowPopup(0)}
//                         />
//                     </div>

//                     {/* Content with scroll only when needed */}
//                     <div
//                         ref={contentRef}
//                         className={`relative ${isScrollable ? "overflow-auto" : "overflow-visible"
//                             }`}
//                         style={{
//                             scrollbarWidth: "none",
//                             maxHeight: "60vh",
//                         }}
//                     >
//                         {children}
//                     </div>

//                     {/* Footer */}
//                     <div
//                         className="border-t-[1px] flex justify-center items-center py-[10px] rounded-b-md text-xs font-semibold"
//                         style={{
//                             borderImage: activeTheme?.menuColor,
//                             background: activeTheme?.menuColor,
//                             color: activeTheme?.iconColor,
//                         }}
//                     ></div>
//                 </div>
//             </div>
//         </>
//     );
// }
