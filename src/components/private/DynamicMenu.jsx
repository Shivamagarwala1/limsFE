import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Solid icons
import { far } from '@fortawesome/free-regular-svg-icons'; // Regular icons
import { fab } from '@fortawesome/free-brands-svg-icons'; // Brand icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

// Add all free icons to the library
library.add(fas, far, fab);

const DynamicMenu = ({ routes }) => {
    const location = useLocation(); // Access current path
    const navigate = useNavigate(); // For programmatic navigation
    const [activeParent, setActiveParent] = useState(null); // Active parent menu
    const [activeChild, setActiveChild] = useState(null); // Active child menu
    const [currentParentIndex, setCurrentParentIndex] = useState(0); // Parent pagination index
    const [currentChildIndex, setCurrentChildIndex] = useState(0); // Child pagination index
    const [activeRoute, setActiveRoute] = useState('');
    const visibleParentCount = 7; // Number of parent items to display at a time
    const visibleChildCount = 8; // Number of child items to display at a time
    const newItemsCount = 2; // Number of items to scroll for both parent and child

    const activeTheme = useSelector((state) => state.theme.activeTheme);

    useEffect(() => {

        // Retrieve the saved state from localStorage
        const storedActiveParent = localStorage.getItem("activeParent");
        const storedActiveChild = localStorage.getItem("activeChild");
        const storedActiveUrl = localStorage.getItem("activeUrl");

        // Determine if the user is visiting for the first time or refreshing the page
        if (!activeParent || !activeChild) {
            if (storedActiveParent && storedActiveChild && storedActiveUrl) {
                // Use the saved state from localStorage
                setActiveParent(storedActiveParent);
                setActiveChild(storedActiveChild);
                navigate(storedActiveUrl);
            } else {
                // Default behavior for the first login
                const firstRoute = routes[0];
                if (firstRoute?.children && firstRoute.children.length > 0) {
                    setActiveParent(firstRoute.parentMenuId);
                    setActiveChild(firstRoute.children[0].childMenuId);
                    navigate(firstRoute.children[0].navigationURL);

                    // Save the default route to localStorage
                    localStorage.setItem("activeParent", firstRoute.parentMenuId);
                    localStorage.setItem("activeChild", firstRoute.children[0].childMenuId);
                    localStorage.setItem("activeUrl", firstRoute.children[0].navigationURL);
                }
            }
        }

        // Update active parent and child based on the current location
        const activeRoute = routes.find((route) =>
            route.children.some((child) => location.pathname.startsWith(child.navigationURL))
        );

        if (activeRoute) {
            setActiveParent(activeRoute.parentMenuId);

            const activeChildRoute = activeRoute.children.find(
                (child) => location.pathname === child.navigationURL
            );

            setActiveChild(activeChildRoute ? activeChildRoute.childMenuId : null);

            // Save the current active route to localStorage
            if (activeChildRoute) {
                localStorage.setItem("activeParent", activeRoute.parentMenuId);
                localStorage.setItem("activeChild", activeChildRoute.childMenuId);
                localStorage.setItem("activeUrl", activeChildRoute.navigationURL);
            }
        }
    }, [location, routes, activeParent, activeChild, navigate]);


    // Handle parent menu click
    const handleParentClick = (data) => {
        if (data?.children && data?.children.length > 0) {
            const firstChildUrl = data?.children[0]?.navigationURL;

            navigate(firstChildUrl);
            setActiveParent(data?.parentMenuId);
            setActiveChild(data?.children[0]?.childMenuId); // Set first child as active when parent is clicked

        }
    };





    // Pagination controls for parents
    const handleParentNext = () => {
        const maxIndex = routes.length - visibleParentCount;
        setCurrentParentIndex((prev) => Math.min(prev + newItemsCount, maxIndex));
    };

    const handleParentPrevious = () => {
        setCurrentParentIndex((prev) => Math.max(prev - newItemsCount, 0));
    };

    const visibleParentItems = routes.slice(currentParentIndex, currentParentIndex + visibleParentCount);

    // Pagination controls for children
    const handleChildNext = () => {
        const activeRoute = routes.find((route) => route.parentMenuId === activeParent);
        const maxChildIndex = activeRoute?.children.length - visibleChildCount; // Calculate the last index

        setCurrentChildIndex((prev) => Math.min(prev + newItemsCount, maxChildIndex));
    };

    const handleChildPrevious = () => {
        setCurrentChildIndex((prev) => Math.max(prev - newItemsCount, 0));
    };

    // Get visible child items
    const visibleChildItems = routes
        .find((route) => route.parentMenuId === activeParent)
        ?.children.slice(currentChildIndex, currentChildIndex + visibleChildCount);

    // Check if there are more child items available
    const hasNextChildPage = currentChildIndex + visibleChildCount < routes
        .find((route) => route.parentMenuId === activeParent)
        ?.children.length;

    const hasPreviousChildPage = currentChildIndex > 0;

    return (
        <div className="w-full">
            {/* Parent menu: Horizontal layout */}
            <div
                className={`hidden lg:flex gap-4 justify-between items-center h-[32px] px-12`}
                style={{ background: activeTheme?.menuColor, borderImage: activeTheme?.menuColor }}
            >
                <button
                    onClick={handleParentPrevious}
                    disabled={currentParentIndex === 0}
                    className={`disabled:opacity-50`}
                >
                    <FaArrowLeft style={{ color: activeTheme?.iconColor }} />
                </button>

                <div className="flex gap-9 justify-center items-center w-full">
                    {visibleParentItems.map((data) => (
                        <button
                            key={data.parentMenuId}
                            onClick={() => handleParentClick(data)}
                            className={`flex justify-center font-semibold h-[32px] items-center gap-1 text-xs ${activeParent === data.parentMenuId
                                ? 'font-bold rounded-t-xl h-[32px] px-2 bg-white'
                                : ''
                                }`}
                            style={{ color: activeParent === data.parentMenuId ? activeTheme?.textColor : 'white' }}
                        >
                            <FontAwesomeIcon icon={data.parentIcons} />
                            <span>{data.parentMenuName}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleParentNext}
                    disabled={currentParentIndex + visibleParentCount >= routes.length}
                    className="disabled:opacity-50"
                >
                    <FaArrowRight style={{ color: activeTheme?.iconColor }} />
                </button>
            </div>


            {/* Child menu: Horizontal layout */}
            <div
                className="hidden lg:flex gap-4 justify-between items-center h-5 border-t-[1px] px-12"
                style={{ background: activeTheme?.subMenuColor, borderImage: activeTheme?.subMenuColor }}
            >
                {/* Previous Button */}
                <button
                    onClick={handleChildPrevious}
                    disabled={!hasPreviousChildPage} // Use hasPreviousChildPage here
                    className="disabled:opacity-50"
                >
                    <FaArrowLeft style={{ color: activeTheme?.iconColor }} />
                </button>

                <div className="flex gap-4 justify-center items-center">
                    {visibleChildItems?.map((child) => (
                        <Link
                            key={child.childMenuId}
                            to={child.navigationURL}
                            className={`flex justify-center font-semibold h-5 items-center gap-1 text-xs ${activeChild === child.childMenuId
                                ? 'rounded-t-xl h-5 px-2 bg-white'
                                : ''
                                }`}
                            onClick={() => setActiveChild(child.childMenuId)}
                            style={{
                                borderTopColor: activeTheme?.subMenuColor,
                                color: activeChild === child.childMenuId ? activeTheme?.textColor : 'white',
                            }}
                        >
                            <FontAwesomeIcon icon={child.childIcons} />
                            <span>{child.childMenuName}</span>
                        </Link>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleChildNext}
                    disabled={!hasNextChildPage} // Use hasNextChildPage here
                    className="disabled:opacity-50"
                >
                    <FaArrowRight style={{ color: activeTheme?.iconColor }} />
                </button>
            </div>
        </div>
    );
};

export default DynamicMenu;