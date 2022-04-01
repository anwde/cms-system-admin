import React, { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Account = lazy(() => import("../pages/authorize/account"));
const Columns = lazy(() => import("../pages/authorize/columns"));
const Menus = lazy(() => import("../pages/authorize/menus"));
const Competence = lazy(() => import("../pages/authorize/menus"));
const Permission = lazy(() => import("../pages/authorize/menus"));
let routes: RouteObject[] = [
  {
    path: "/authorize/account",
    element: Account,
    children: [
      {
        path: "/authorize/account/:method",
        children: [{ path: "/authorize/account/:method/:id" }],
      },
    ],
  },
  {
    path: "/authorize/columns",
    element: Columns,
    children: [
      {
        path: "/authorize/columns/:method",
        children: [{ path: "/authorize/columns/:method/:id" }],
      },
    ],
  },
  {
    path: "/authorize/competence",
    element: Competence,
    children: [
      {
        path: "/authorize/competence/:method",

        children: [{ path: "/authorize/competence/:method/:id" }],
      },
    ],
  },
  {
    path: "/authorize/permission",
    element: Permission,
    children: [
      {
        path: "/authorize/permission/:method",

        children: [{ path: "/authorize/permission/:method/:id" }],
      },
    ],
  },
  {
    path: "/authorize/menus",
    element: Menus,
    children: [
      {
        path: "/authorize/menus/:method",
        element: Menus,
        children: [{ path: "/authorize/menus/:method/:id", element: Menus }],
      },
    ],
  },
];

export default routes;
