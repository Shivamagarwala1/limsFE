import { useState } from "react";
import { useSelector } from "react-redux";

export default function TabComponent({ tabs,activeTab,setActiveTab }) {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  return (
    <>
    <div className="relative flex p-1 w-full overflow-x-auto">
      <div className="flex space-x-2">
        {" "}
        {/* Added space between tabs */}
        {tabs.map((tab, index) => (
          <button
            style={{
              background: activeTab === index ? activeTheme?.menuColor : "",
              color:
                activeTab === index
                  ? activeTheme?.iconColor
                  : activeTheme?.textColor,
            }}
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-shrink-0 text-center p-1 text-sm font-small text-white transition-all rounded-lg ${
              activeTab === index ? "bg-white shadow" : ""
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
    <div className="w-full h-[0.10rem]" style={{ background: activeTheme?.menuColor }}></div>
    </>

    // <div className="relative flex flex-col items-center">
    //   <div className="relative flex bg-gray-300 rounded-lg p-1 w-full">
    //     {tabs.map((tab, index) => (
    //       <button
    //         style={{
    //           background: activeTab === index ? activeTheme?.menuColor : "",
    //           color: activeTab === index ? activeTheme?.iconColor : activeTheme?.textColor,
    //         }}
    //         key={index}
    //         onClick={() => setActiveTab(index)}
    //         className={`flex-1 text-center py-1 text-sm font-small text-white transition-all rounded-lg ${
    //           activeTab === index ? "bg-white shadow" : ""
    //         }`}
    //       >
    //         {tab.name}
    //       </button>
    //     ))}
    //   </div>
    // </div>
  );
}
