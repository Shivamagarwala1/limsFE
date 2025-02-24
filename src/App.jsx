import React, { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import useSessionExpiration from "./components/private/useSessionExpiration";
import { useSelector } from "react-redux";
import { getAllMenus } from "./service/service";
import LoadingPage from "./components/public/LoadingPage";
import { Suspense } from "react";
import { allRoutes } from "./components/private/AllRouterData";
import ChartBoatApp from "./components/chartboat/ChartBoatApp";
import FeedBackPopup from "./components/pages/feedback/FeedBackPopup";
import HelpAndSupprot from "./components/pages/helpandsupport/HelpAndSupprot";
import TicketsPopup from "./components/pages/tickets/TicketsPopup";

const Login = lazy(() => import("./components/public/Login"));
const Base = lazy(() => import("./components/base/Base"));
const PrivateRouter = lazy(() => import("./components/private/PrivateRouter"));

const App = () => {

  const user = useSelector((state) => state?.userSliceName?.user || null);

  const [allMenuData, setAllMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function featchAllMenu() {

      await getAllMenus().then((resp) => {

        if (resp.success) {
          const urls = resp?.data?.map((child) => ({
            path: child,
            //component: lazy(() => import(`./components/pages/master/MenuMaster`)),
          }));
          setAllMenuData(urls);
          setIsLoading(false);
        } else {
          toast.error('Error with get all menu');
          setIsLoading(false);
        }

      }).catch((err) => {
        toast.error('Error with get all menus');
        console.log(err);
        setIsLoading(false);
      })
    }

    if (user !== null) {
      featchAllMenu();
    }

  }, [user]);

  const mergedRoutes = allMenuData?.map((menu) => {
    const matchedRoute = allRoutes?.find((route) => route.path === menu.path);
    return {
      ...menu,
      component: matchedRoute?.component || null, // Use the matched component if available
      exact: matchedRoute?.exact || false, // Get the 'exact' value if available
    };
  });


  //!Session expiration
  useSessionExpiration();

  if (isLoading && location.pathname !== "/LIMS/login") {
    return <div className="text-center font-semibold text-sm">
      <LoadingPage width={'10px'} height={'10px'} isItemShow={false} />
    </div>;
  }


  return (
    <>
      <Toaster position="top-right" />

      {
        user && (
          <ChartBoatApp />
        )
      }

      {
        user && (
          <FeedBackPopup />
        )
      }


      {
        user && (
          <HelpAndSupprot />
        )
      }


      {
        user && (
          <TicketsPopup />
        )
      }

      <Routes>

        {/* Redirect from root to /login if not logged in */}
        <Route
          path="/"
          element={<Navigate to="/LIMS/login" replace />}
        />

        {/* Login Route */}
        <Route path="/LIMS/login" element={<Login />} />


        <Route path="/" element={<Base />}>

          <Route path="/" element={<PrivateRouter />}>

            {mergedRoutes.map((route, index) => {
              const Component = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  element={
                    <Suspense fallback={<LoadingPage width={10} height={10} />}>
                      {Component ? <Component /> : <div>Component not found</div>}
                    </Suspense>
                  }
                />
              );
            })}

          </Route>
        </Route>


      </Routes>
    </>
  );
};

export default App;