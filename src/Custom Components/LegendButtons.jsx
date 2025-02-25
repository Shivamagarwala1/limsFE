import { useEffect, useRef, useState } from "react";
import { useGetData } from "../service/apiService";
import { useSelector } from "react-redux";

export const LegendButtons = ({ statuses, callBack }) => {
  const [buttons, setButtons] = useState([]);
  const { data, fetchData, loading } = useGetData();
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const buttonRef = useRef(null); // Added ref for the button

  const handleClick = (e) => {
    const button = buttonRef.current;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    button.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600); // Duration of the ripple effect
  };
  useEffect(() => {
    fetchData("/LegendColorMaster");
  }, []);

  useEffect(() => {
    if (!loading && data?.length) {
      // Filter only the items that match status names from the passed statuses array
      const filteredData = data.filter((item) =>
        statuses.some((status) => status.Data === item?.id)
      );
      setButtons(filteredData);
    }
  }, [loading, data, statuses]);

  return (
    <div className="flex flex-wrap items-center">
      {buttons.map((status, index) => (
        <div
          key={index}
          // style={{display:"flex",alignItems:"center",}}
          className="relative flex-1 flex justify-center items-center"
        >
          <button
            type="button"
            ref={buttonRef}
            data-ripple-light="true"
            onClick={(e) => {
              handleClick(e);
              const matchedStatus = statuses?.find(
                (s) => s?.Data === status?.id
              );
              matchedStatus?.CallBack();
              // callBack?.(status);
            }}
            className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-[100px] rounded-md flex justify-center items-center cursor-pointer mb-1"
            style={{
              backgroundColor: status?.colourCode || "#ccc",
              color: activeTheme?.iconColor || "#000",
              ...status?.style,
            }}
          >
            {status?.contantName || "Unknown"}
          </button>
          <style jsx>{`
            .ripple {
              position: absolute;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.6); // Adjust color as needed
              transform: scale(0);
              animation: ripple-animation 0.6s linear;
              pointer-events: none;
            }

            @keyframes ripple-animation {
              to {
                transform: scale(4);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
};
