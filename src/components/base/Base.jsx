import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import DynamicMenu from "../private/DynamicMenu";
import { getMenuDataBasedOnEmpIdAndRoleIdAndCentreId } from "../../service/service";
import toast from "react-hot-toast";
import { getLocalStroageData } from "../../service/localstroageService";
import { loginUser } from "../../redux/userSlices";
import Footer from "../public/Footer";
import LoadingPage from "../public/LoadingPage";

export default function Base() {

    const screenRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [routes, setRoutes] = useState([]);
    const user = useSelector((state) => state.userSliceName?.user || null);
    const dispatch = useDispatch();


    const toggleFullScreen = () => {
        try {
            if (!isFullScreen) {
                if (screenRef.current.requestFullscreen) {
                    screenRef.current.requestFullscreen();
                } else if (screenRef.current.webkitRequestFullscreen) {
                    screenRef.current.webkitRequestFullscreen();
                } else if (screenRef.current.msRequestFullscreen) {
                    screenRef.current.msRequestFullscreen();
                }
                setIsFullScreen(true);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                setIsFullScreen(false);
            }
        } catch (error) {
            console.error("Fullscreen Error:", error);
        }
    };



    const prevUser = useRef(null);

    useEffect(() => {
        if (JSON.stringify(prevUser.current) !== JSON.stringify(user)) {

            prevUser.current = user;

            async function getAllMenusDataBasedOnEmpIdAndRoleIdAndCenterId() {
                if (!user) return;

                try {
                    const resp = await getMenuDataBasedOnEmpIdAndRoleIdAndCentreId(               
                        user?.employeeId,                                                         
                        user?.defaultRole,                                                        
                        user?.defaultCenter                                                       
                    );                                                                            

                    if (resp?.success) {
                        setRoutes(resp?.data);

                        const userData = getLocalStroageData();
                        userData.token = resp?.token;

                        localStorage.setItem("imarsar_laboratory", JSON.stringify(userData));
                        dispatch(loginUser(userData));
                    } else {
                        toast.error();
                    }
                } catch (err) {
                    toast.error('Error while fetching menu data based on user details.');
                    console.error(err);
                }
            }

            getAllMenusDataBasedOnEmpIdAndRoleIdAndCenterId();
        }
    }, [user, dispatch]);


    return (
        <div ref={screenRef} className="flex flex-col h-screen">

            <Navbar toggleFullScreen={toggleFullScreen} routes={routes} />

            {user && routes.length > 0 ? (
                <>
                    <DynamicMenu routes={routes} />

                    <div className="flex-1 bg-white pb-4 overflow-y-auto">
                        <Outlet />
                    </div>

                    <Footer />
                </>
            ) : (
                <LoadingPage width={"2.5rem"} height={"2.5rem"} isItemShow={true} />
            )}

        </div>
    );
}