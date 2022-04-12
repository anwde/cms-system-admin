import React, { useState, lazy, useEffect } from "react";
import { Button, Descriptions, Result, Avatar, Space, Statistic } from "antd";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import "@/App.css";
import type { ProSettings } from "@ant-design/pro-layout";
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from "@ant-design/pro-layout";
import defaultProps from "./_defaultProps";
import routers from "../routes/router";
import webapi from "../utils/webapi";
import { RightContent } from "../components/header/index";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import Loading from "../components/loading/loading";
import type { MenuDataItem } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
const Columns = lazy(() => import("../pages/authorize/columns"));
const Account = lazy(() => import("../pages/authorize/account"));
const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国</Descriptions.Item>
  </Descriptions>
);
const loopMenuItem = (columns: []): MenuDataItem[] =>{
  console.log("props=>", columns);
  return columns.map(({ icon, children, name, url }) => ({
    name, 
    icon,
    path: url,
    routes: children && loopMenuItem(children),
  }));
}
  ;
const Layout1 = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const [server, setServer] = useState<{columns:[]}>({columns:[]});

  const [pathname, setPathname] = useState("/welcome");
  const p = useParams();
  console.log("Params=>", p);
  useEffect(() => {
    console.log("props=>", server.columns);
    webapi.store.subscribe(() => {
      const d = webapi.store.getState();
      setServer(d.server);
      console.log("props=>", server.columns);
    });
  },[]);
  // server?.server?.columns
  return (
    <>
      <ProLayout
        {...defaultProps}
        title="编辑后台"
        location={{
          pathname,
        }}
        menu={{ request: async () => loopMenuItem(server.columns) }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => {
          return (
            <Link
              to={`${item.path}`}
              onClick={() => {
                setPathname(item.path || "/welcome");
              }}
            >
              {dom}
            </Link>
          );
        }}
        rightContentRender={() => <RightContent />}
        {...settings}
      >
         
          <div
            style={{
              height: "120vh",
            }}
          >
            <Outlet />
          </div>
         
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById("container")}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={false}
      />
    </>
  );
};

const Irouters = (
  routes: Server.Routes[],
  pprop: Server.Routes = { path: "" }
) => {
  console.log("useParams=>", useParams());
  return routes.map((prop, key) => {
    let { Component, path } = prop;
    if (!Component && pprop.Component) {
      Component = prop.Component = pprop.Component;
    }
    // console.log("Component", Component);
    return (
      <Route
        path={path}
        key={key}
        element={
          <React.Suspense fallback={<Loading />}>
            <Component />
          </React.Suspense>
        }
      >
        {prop.children ? Irouters(prop.children, prop) : ""}
      </Route>
    );
  });
};
const Security = () => {
  const Element_Columns = (
    <React.Suspense fallback={<>...</>}>
      <Columns />
    </React.Suspense>
  );
  // useEffect(()=>{
  // console.log("useParams=>", useParams());
  // },[])
  console.log("useParams=>", useParams());
  return (
    <React.Suspense fallback={<>...</>}>
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route path="/authorize/columns" element={Element_Columns}>
            <Route path="/authorize/columns/:method" element={Element_Columns}>
              <Route
                path="/authorize/columns/:method/:id"
                element={Element_Columns}
              />
            </Route>
          </Route>
          {Irouters(routers)}
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default Security;
