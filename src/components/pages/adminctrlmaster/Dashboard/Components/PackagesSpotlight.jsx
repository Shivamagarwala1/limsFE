const packages = [
  {
    title: "Aarogyam Menu",
    description:
      "Range of 27 exclusive Aarogyam packages - Preventive full-body comprehensive health checkups recommended for prevention & early diagnosis of multiple health issues.",
    imgSrc: "./lab.png",
  },
  {
    title: "Jaanch Menu",
    description:
      "Jaanch brings all doctor-curated specialized packages under one roof for timely diagnosis and management of lifestyle disorders/diseases.",
    imgSrc: "/images/jaanch.png",
  },
  {
    title: "HerCheck Menu",
    description:
      "Check out HerCheck - An extensive range of 30+ packages for women’s reproductive health issues occurring in different phases of her life.",
    imgSrc: "/images/hercheck.png",
  },
  {
    title: "140+ Tests & Profiles",
    description:
      "Explore our wide range of test menus. Reach out to General Physicians who recommend these tests.",
    imgSrc: "/images/tests140.png",
  },
  {
    title: "85+ Tests & Profiles",
    description:
      "Explore our wide range of test menus. Reach out to Orthopedics, Immunologists, Rheumatologists & General Physicians who recommend these tests.",
    imgSrc: "/images/tests85.png",
  },
  {
    title: "125+ Tests & Profiles",
    description:
      "Explore our wide range of test menus. Reach out to Nutritionists & General Physicians who recommend these tests.",
    imgSrc: "/images/tests125.png",
  },
];
import { useSelector } from "react-redux";
import Img from "./lab.png";
export default function PackagesSpotlight() {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  return (
    <div className="p-4">
      <h2 className="font-semibold mb-4 text-[20px]">Packages in Spotlight</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="relative w-full h-28">
              <img src={Img} alt={pkg.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold">Here's Our {pkg.title}</h3>
              <button
                style={{
                  border: `1px solid gray`,
                }}
                className="mt-2 px-2 py-1 rounded-lg text-[12px]"
              >
                Download Handbills
              </button>
              <p className="mt-3 text-gray-600 text-[12px]">
                <strong>Value Deal:</strong> {pkg.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
