import { lazy } from "react";
const Account = lazy(() => import("../pages/authorize/account"));
const Columns = lazy(() => import("../pages/authorize/columns"));
const Menus = lazy(() => import("../pages/authorize/menus"));
const Competence = lazy(() => import("../pages/authorize/competence"));
const Permission = lazy(() => import("../pages/authorize/permission"));
const Customer = lazy(() => import("../pages/authorize/customer/customer"));
const Customer_applications = lazy(
  () => import("../pages/authorize/customer/applications")
);
const Customer_applications_channel = lazy(
  () => import("../pages/authorize/customer/applications_channel")
);
const Customer_applications_extend = lazy(
  () => import("../pages/authorize/customer/applications_extend")
);
const Customer_applications_extend_items = lazy(
  () => import("../pages/authorize/customer/applications_extend_items")
);
const Customer_competence_user = lazy(
  () => import("../pages/authorize/customer/competence_user")
);

const Books = lazy(
  () => import("../pages/books/books")
);

let routes: Server.Routes[] = [
  {
    path: "/authorize/account",
    component: Account,
    children: [
      {
        path: "/authorize/account/:method",
        children: [{ path: "/authorize/account/:method/:id" }],
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
  {
    path: "/authorize/customer",
    component: Customer,
    children: [
      {
        path: "/authorize/customer/applications",
        component: Customer_applications,
        children: [
          {
            path: "/authorize/customer/applications/:method",
            children: [
              { path: "/authorize/customer/applications/:method/:id" },
            ],
          },
        ],
      },
      {
        path: "/authorize/customer/applications_channel/:method",
        component: Customer_applications_channel,
        children: [
          { path: "/authorize/customer/applications_channel/:method/:id" },
        ],
      },
      {
        path: "/authorize/customer/applications_channel/:method",
        component: Customer_applications_channel,
        children: [
          { path: "/authorize/customer/applications_channel/:method/:id" },
        ],
      },
      {
        path: "/authorize/customer/applications_extend/:method/:applications_id",
        component: Customer_applications_extend,
        children: [
          {
            path: "/authorize/customer/applications_extend/:method/:applications_id/:id",
          },
        ],
      },
      {
        path: "/authorize/customer/applications_extend_items/:method/:extend_id",
        component: Customer_applications_extend_items,
        children: [
          {
            path: "/authorize/customer/applications_extend_items/:method/:extend_id/:id",
          },
        ],
      },
      {
        path: "/authorize/customer/competence_user/:method",
        component: Customer_competence_user,
        children: [{ path: "/authorize/customer/competence_user/:method/:id" }],
      },
    ],
  },
  {
    path: "/books",
    component: Books,
    children: [
      {
        path: "/books/books/:method/:id", 
        component: Books,
        children: [
          {
            path: "/books/volume/:method/:book_id/:id?",
            component: Books,
          }, 
          {
            path: "/books/chapter/:method/:book_id/:id?",
            component: Books,
          },
        ],
      },
      
    ],
  },
];

export default routes;
