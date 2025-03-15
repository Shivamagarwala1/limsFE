
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useImageFetcher from "../../../../../Custom Components/useImageFetcher";
import { adjustStringLength, ViewOrDownloandPDF } from "../../../../../service/RedendentData";
export default function PackagesSpotlight({ packages }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredArr = packages?.filter((item) => item?.isActive === 1);
    setData(filteredArr);
  }, [packages]);
  return (
    <div className="p-4 pt-0">
      <h2 className="text-xl font-semibold mb-0 text-[20px]">Packages in Spotlight</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((pkg, index) => (
          <Card index={index} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}

const Card = ({ index, pkg }) => {
  const { imageSrc, loading, error, fetchImage } = useImageFetcher();

  useEffect(() => {
    const handleShowImage = async () => {
      await fetchImage(
        `/tnx_InvestigationAttchment/ViewDocument?Documentpath=${pkg?.image}`
      );
    };
    handleShowImage();
  }, []);

  const str = adjustStringLength(pkg?.description, 711);

  return (
    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Fixed image container */}
      <div className="w-full h-40 flex justify-center items-center bg-white-200">
        <img
          src={imageSrc}
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
  );
};

