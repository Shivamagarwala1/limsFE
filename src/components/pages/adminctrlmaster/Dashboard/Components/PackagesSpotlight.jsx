import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useImageFetcher from "../../../../../Custom Components/useImageFetcher";
import {
  adjustStringLength,
  ViewOrDownloandPDF,
} from "../../../../../service/RedendentData";
export default function PackagesSpotlight({ packages, title }) {
  return (
    <>
      {packages?.length > 0 ? (
        <div className="p-4 pt-0">
          <h2 className="text-xl font-semibold mb-0 text-[20px]">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card index={index} pkg={pkg} title={title} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 pt-3">
          {/* <div className="w-1/3 h-6 bg-gray-300 rounded mb-4 animate-pulse" /> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const Card = ({ index, pkg, title }) => {
  const str = adjustStringLength(pkg?.description, 711);

  return (
    <>
      {pkg?.image && (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          {/* Fixed image container */}
          <div className="w-full h-40 flex justify-center items-center bg-white-200">
            <img
              src={`data:image/png;base64,${pkg?.image}`}
              alt={pkg.subject}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-bold">Here's Our {pkg.subject}</h3>
            <button
              onClick={() => {
                ViewOrDownloandPDF(
                  `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${pkg?.pdf}`
                );
              }}
              style={{
                border: `1px solid gray`,
              }}
              className="mt-2 px-2 py-1 rounded-lg text-[12px]"
            >
              Download Handbills
            </button>
            <p className="mt-3 text-gray-600 text-[12px]">
              <strong>Value Deal:</strong> {str}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const SkeletonCard = () => {
  return (
    <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden animate-pulse">
      {/* Fixed image container */}
      <div className="w-full h-40 bg-gray-300" />
      <div className="p-4">
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2" />
        <div className="w-1/2 h-3 bg-gray-300 rounded mb-4" />
        <div className="w-full h-3 bg-gray-300 rounded mb-2" />
        <div className="w-2/3 h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

const UpdatesCarouselSkeleton = () => {
  return (
    <div className="relative w-full px-4">
      {[...Array(3)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
