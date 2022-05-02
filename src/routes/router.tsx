import React from "react";
const Account = React.lazy(() => import("../pages/authorize/account"));
const Columns = React.lazy(() => import("../pages/authorize/columns")); 
const Menus = React.lazy(() => import("../pages/authorize/menus"));
const Competence = React.lazy(() => import("../pages/authorize/competence"));
const Permission = React.lazy(() => import("../pages/authorize/permission"));

let routes: Server.Routes[] = [
  {
    path: "/authorize/account",
    component: Account,
    children: [
      {
        path: "/authorize/account/:method",
        children: [
          { path: "/authorize/account/:method/:id" }
        ],
      },
    ],
  },
  {
    path: "/authorize/columns",
    component: Columns,
    children: [
      {
        path: "/authorize/columns/:method",
        children: [{ path: "/authorize/columns/:method/:id" }],
      },
    ],
  },
  {
    path: "/authorize/competence",
    component: Competence,
    children: [
      {
        path: "/authorize/competence/:method",

        children: [{ path: "/authorize/competence/:method/:id" }],
      },
    ],
  },
  {
    path: "/authorize/permission",
    component: Permission,
    children: [
      {
        path: "/authorize/permission/:method",

        children: [{ path: "/authorize/permission/:method/:id" }],
      },
    ],
  },
  {
    path: "/authorize/menus",
    component: Menus,
    children: [
      {
        path: "/authorize/menus/:method",

        children: [{ path: "/authorize/menus/:method/:id" }],
      },
    ],
  },
];

export default routes;
