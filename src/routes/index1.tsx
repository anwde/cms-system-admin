import React, { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import {  useRoutes } from "react-router-dom";
const Auth = lazy(() => import("../layouts/auth"));
const Security = lazy(() => import("../layouts/security"));

export default function App() {
  let routes: RouteObject[] = [
    { 
      path: "*",
      element: <React.Suspense fallback={<>...</>}><Security /></React.Suspense>,
    },
    {
      path: "/authorize/auth/:method",
      element: <React.Suspense fallback={<>...</>}><Auth /></React.Suspense>,
    },
  ];
  let element = useRoutes(routes); 
  return <>{element}</>;
}
