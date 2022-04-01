import React, { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Routes, Route, Outlet,useRoutes } from "react-router-dom";
import Loading from "../components/loading/loading";
import routers from "./router";
const Auth = lazy(() => import("../layouts/auth"));
const Security = lazy(() => import("../layouts/security"));
const Irouters = (routes: RouteObject[]) => {
  return routes.map((prop, key) => {
    return (
      <Route
        path={prop.path}
        key={key}
        element={
          <React.Suspense fallback={<Loading />}>
            <Security />
          </React.Suspense>
        }>{prop.children?(Irouters(prop.children)):''}</Route>
      
    );
  });
};
// console.log(Irouters(routers))
const Layout1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {Irouters(routers)}
        <Route
          path="/authorize/auth/:method"
          element={
            <React.Suspense fallback={<Loading />}>
              <Auth />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
const Layout=()=> {
  let routes: RouteObject[] = [
    { 
      path: "*",
      element: <React.Suspense fallback={<Loading />}><Security /></React.Suspense>,
    },
    {
      path: "/authorize/auth/:method",
      element: <React.Suspense fallback={<Loading />}><Auth /></React.Suspense>,
    },
  ];
  let element = useRoutes(routes); 
  return <>{element}</>;
}
export default Layout;
