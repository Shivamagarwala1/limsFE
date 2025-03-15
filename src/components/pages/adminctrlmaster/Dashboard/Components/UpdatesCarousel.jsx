import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // React Icons
import useImageFetcher from "../../../../../Custom Components/useImageFetcher";
import {
  adjustStringLength,
  ViewOrDownloandPDF,
} from "../../../../../service/RedendentData";

const UpdatesCarousel = ({ updates }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredArr = updates?.filter((item) => item?.isActive === 1);
    setData(filteredArr);
  }, [updates]);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft + carouselRef.current.clientWidth <
          carouselRef.current.scrollWidth
      );
    }
  };

  useEffect(() => {
    updateScrollButtons();
    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  console.log(updates);
  return (
    <div className="relative w-full px-4">
      <h2 className="text-xl font-semibold mb-3 text-[20px]">New Updates</h2>
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Cards Container */}
        <motion.div
          ref={carouselRef}
          style={{ scrollbarWidth: "none" }}
          className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory px-10"
        >
          {data.length > 0 && (
            <>
              {data.map((update, index) => (
                <Card update={update} index={index} />
              ))}
            </>
          )}
        </motion.div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-10"
            onClick={() => scroll("right")}
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdatesCarousel;

const Card = ({ index, update }) => {
  const { imageSrc, loading, error, fetchImage } = useImageFetcher();

  useEffect(() => {
    const handleShowImage = async () => {
      await fetchImage(
        `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${update?.image}`
      );
      setShowPopup(true);
    };
    handleShowImage();
  }, []);

  const str = adjustStringLength(update.description, 71);

  return (
    <div
      key={index}
      className="min-w-[300px] bg-green-100 p-4 rounded-md gap-2 shadow-md snap-center flex items-start"
    >
      <img
        style={{ height: "80px" }}
        src={imageSrc}
        alt={update.subject}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex flex-col items-start">
        <h3 className="font-bold text-[12px]">{update.subject}</h3>
        <p className=" text-gray-700 text-[10px]">{str}</p>
        <span
          onClick={() => {
            ViewOrDownloandPDF(
              `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${update?.pdf}`
            );
          }}
          className="text-blue-600 font-semibold block cursor-pointer text-[12px]"
        >
          Read More
        </span>
      </div>
    </div>
  );
};
