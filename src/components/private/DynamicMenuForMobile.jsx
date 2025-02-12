import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Solid icons
import { far } from '@fortawesome/free-regular-svg-icons'; // Regular icons
import { fab } from '@fortawesome/free-brands-svg-icons'; // Brand icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

// Add all free icons to the library
library.add(fas, far, fab);

const DynamicMenu = ({ routes, setIsSidebarOpen }) => {
    const location = useLocation(); // Access current path
    const navigate = useNavigate(); // For programmatic navigation
    const [activeParent, setActiveParent] = useState(null); // Active parent menu
    const [activeChild, setActiveChild] = useState(null); // Active child menu

    const [expandedMenuId, setExpandedMenuId] = useState(null); // Tracks which menu is expanded

    const toggleMenu = (menuId) => {
        setExpandedMenuId((prev) => (prev === menuId ? null : menuId)); // Toggle the menu
    };

    const activeTheme = useSelector((state) => state.theme.activeTheme);

    // Set active parent and child based on the current location
    useEffect(() => {
        if (!activeParent || !activeChild) {
            const firstRoute = routes[0];
            if (firstRoute?.children && firstRoute.children.length > 0) {
                setActiveParent(firstRoute.parentMenuId);
                setActiveChild(firstRoute.children[0].childMenuId);
                navigate(firstRoute.children[0].navigationURL);
            }
        }

        const activeRoute = routes.find((route) =>
            route.children.some((child) => location.pathname.startsWith(child.navigationURL))
        );
        setActiveParent(activeRoute ? activeRoute.parentMenuId : null);
        setExpandedMenuId(activeRoute ? activeRoute.parentMenuId : null);

        if (activeRoute) {
            const activeChildRoute = activeRoute.children.find(
                (child) => location.pathname === child.navigationURL
            );
            setActiveChild(activeChildRoute ? activeChildRoute.childMenuId : null);
        }
    }, [location, routes, activeParent, activeChild, navigate]);


    // Handle parent menu click
    const handleParentClick = (data) => {
        if (data?.children && data.children.length > 0) {
            const firstChildUrl = data.children[0]?.navigationURL;
            navigate(firstChildUrl);
        }
    };





    return (
        <div className="w-full">


            <div className="flex flex-col px-1 text-xs font-semibold justify-between w-full"
                style={{ color: activeTheme?.iconColor }} >

                {routes.map((data) => (
                    <div key={data.parentMenuId}>
                        {/* Parent Menu */}
                        <div
                            onClick={() => { handleParentClick(data), toggleMenu(data.parentMenuId) }}
                            className={`flex justify-between items-center cursor-pointer py-1  text-xs rounded-md px-2 
                                ${activeParent === data.parentMenuId
                                    ? 'bg-white text-textColor'
                                    : ''
                                }`}
                        >
                            <div className='flex justify-start items-center gap-1'>

                                <FontAwesomeIcon icon={data.parentIcons} />

                                {data.parentMenuName}

                            </div>

                            {expandedMenuId === data.parentMenuId ? (
                                <RiArrowDropUpLine
                                    className="text-2xl"

                                />
                            ) : (
                                <RiArrowDropDownLine
                                    className="text-2xl"

                                />
                            )}
                        </div>

                        {/* Child Menu */}
                        {expandedMenuId === data.parentMenuId && (
                            <ul className="ml-2 border-gray-200 py-3 pl-2 space-y-2">
                                {data.children.map((child) => (
                                    <Link
                                        key={child.childMenuId}
                                        to={child.navigationURL}
                                        className={` rounded-md cursor-pointer flex items-center gap-2 text-xs ${activeChild === child.childMenuId
                                            ? 'text-black'
                                            : ''
                                            }`}
                                        onClick={() => { setActiveChild(child.childMenuId), setIsSidebarOpen(false) }}
                                    >
                                        <FontAwesomeIcon icon={child.childIcons} />
                                        {child.childMenuName}
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>


        </div>
    );
};

export default DynamicMenu;
